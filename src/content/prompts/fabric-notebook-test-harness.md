---
title: "Fabric Notebook Test Harness: NB_TEST and the Validation Cell"
description: "The PySpark header that lets a notebook prove itself locally before it touches OneLake, and the asserts that gate every run after."
category: notebooks
date: 2026-08-17T09:00:00Z
format: python
source:
  permalink: "2026/08/17/dont-let-your-agent-touch-fabric"
---

An agent's bad PySpark doesn't get a red squiggly line. It gets you data. So every transform notebook on the project opens with one environment switch and closes with a validation cell, and a notebook without the second one is not done regardless of how good its output looks.

## The header: one switch, two helpers

```python
import os
from pyspark.sql import functions as F

LOCAL = os.environ.get("NB_TEST") == "1"
WS = "<workspace-guid>"
BRONZE = "<bronze-lakehouse-guid>"
BR = f"abfss://{WS}@onelake.dfs.fabric.microsoft.com/{BRONZE}/Tables/"

def br(t):
    return spark.table(t) if LOCAL else spark.read.format("delta").load(BR + t)

def save(df, name):
    df.write.mode("overwrite").option("overwriteSchema", "true").format("delta").saveAsTable(name)
    print(f"  wrote {name}")
```

Every read goes through `br()`, every write goes through `save()`, so the whole notebook has exactly one switch. Flipping `NB_TEST` moves it off your real lakehouses and onto local tables where a wrong answer costs nothing. Same notebook, same asserts, no throwaway test script that drifts out of sync with the real one.

There's a side benefit: an agent that has to route every read and write through two helpers can't casually scatter side effects through a notebook. It has to declare its writes.

## Referential integrity

A left anti join is the cheapest lie detector in data engineering.

```python
# ---- Validation ----
sth = spark.table("dim_sth_account")
orphans = {
    "fact_tix.STH_ID->dim_sth": spark.table("fact_ticket_sales")
        .where(F.col("STH_ID").isNotNull()).join(sth, "STH_ID", "left_anti").count(),
    "fact_tix.EventID->dim_event": spark.table("fact_ticket_sales")
        .join(spark.table("dim_event"), "EventID", "left_anti").count(),
    "fact_merch.ProductKey->dim_product": spark.table("fact_merchandise_sales")
        .join(spark.table("dim_product"), "ProductKey", "left_anti").count(),
    "dim_event.OpponentID->dim_opponent": spark.table("dim_event")
        .join(spark.table("dim_opponent"), "OpponentID", "left_anti").count(),
}
print("=== REFERENTIAL INTEGRITY (orphan counts, expect 0) ===")
for k, v in orphans.items(): print(f"{k}: {v}")
assert all(v == 0 for v in orphans.values()), f"RI violations: {orphans}"
```

The `assert` is doing the work on that last line. A printed warning gets narrated past and a log row gets ignored, but an exception stops the notebook cold, and the dictionary tells you exactly which relationship broke.

## Domain asserts

These are the ones only you can write, and they only work if you recorded the numbers before the build.

```python
SEASON_YEARS = [2021, 2022, 2023, 2024, 2025, 2026]

seasons = sorted(r[0] for r in spark.table("fact_ticket_sales")
                 .select("SeasonYear").distinct().collect())
assert seasons == SEASON_YEARS, f"unexpected seasons {seasons}"

yrs = sorted(r[0] for r in spark.table("fact_survey_nps")
             .select("SeasonYear").distinct().collect())
assert max(yrs) == 2025, "future-dated NPS survey present"
```

The NPS check encodes something no model could infer. Surveys are observed history, so a survey dated in a future season isn't a data quality quirk, it's a fabrication, and it means something upstream is generating rows instead of reading them.

## Coverage and shape, not just counts

"It ran" and "it covered everything it should have" are different claims.

```python
ch = spark.table("gold_sth_churn_features")

# Coverage: every active account must get a score, no silent drops
assert ch.count() == sl("dim_sth_account").where("AccountStatus='Active'").count(), \
    "churn features must cover every ACTIVE account"

# Shape: a risk model that tiers everyone the same way is broken, not confident
tiers = {r["RiskTier"]: r["n"] for r in ch.groupBy("RiskTier")
         .agg(F.count("*").alias("n")).collect()}
tot = sum(tiers.values())
assert set(tiers) == {"High", "Moderate", "Likely Renew"}, f"missing tiers: {tiers}"
assert 0.15 <= tiers["High"] / tot <= 0.35, f"High tier share off: {tiers['High']/tot:.0%}"
```

A row count can't catch a model that quietly collapsed into one bucket. A percentage band can, and it catches it the first time rather than in the meeting where someone asks why every account is suddenly high risk.

## Every bug becomes a permanent assert

`TotalCost` on the event cost table was summing `StaffingCost` and `PayrollCost`, two views of the same labor. Every event carried its labor twice, and the margins were wrong in a direction that looked believable. The fix produced three artifacts: corrected logic, a note in the notebook header, and an assert that outlives everyone's memory of the bug.

```python
# nb_gold_transform - analytics-ready gold tables (gold_lakehouse default).
# FIXES SHIPPED HERE: (1) event P&L uses the corrected TotalCost (no labor
# double-count), (2) churn model consumes the MEASURED payment rate, (3) risk
# tiers are cut at score quantiles computed from the live distribution instead
# of stale hard-coded thresholds.
```

```python
ep = spark.table("gold_event_pnl")

# TotalCost must exclude PayrollCost. This assert exists because it did not, once.
bad_tc = ep.where(F.abs(F.col("TotalCost") - (F.col("StaffingCost") + F.col("ConcessionCost")
                        + F.col("OperationalOverhead") + F.col("BaseballOpsCost"))) > 0.02).count()
assert bad_tc == 0, "labor double-count regression in gold"
```

And the one I'd hand anyone working with agents on a star schema. A dimension attribute derived from a fact must still equal that fact:

```python
real = (spark.table("fact_sth_payments").groupBy("STH_ID")
        .agg(F.round(F.avg(F.col("OnTime").cast("double")), 3).alias("RealOnTimeRate")))
mismatch = (real.join(sth.select("STH_ID", "PaymentOnTimeRate"), "STH_ID")
            .where(F.abs(F.col("RealOnTimeRate") - F.col("PaymentOnTimeRate")) > 0.001).count())
assert mismatch == 0, "PaymentOnTimeRate is not the measured rate"
```

`PaymentOnTimeRate` used to be a synthetic value from a scaffolding pass, it looked completely reasonable, and it was feeding a churn model. That assert makes the substitution impossible to repeat.

## Adapting it

- **Put the reason in the failure message.** `"labor double-count regression in gold"` tells the next person, or the next agent, exactly what it's guarding.
- **Write the expected counts, ranges, and boundaries down before the build.** Ask clients for a slice of real data up front so the numbers are real.
- **Put `NB_TEST` in your standards page**, not just in one notebook, so every agent writing a notebook writes it the same way.

Run [the recon brief](/prompts/fabric-recon-brief/) before any of this.
