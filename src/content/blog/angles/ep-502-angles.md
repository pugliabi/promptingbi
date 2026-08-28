# Ep 502 angles — Trusting In Microsoft Fabric

Ore file. Draft later from `transcripts/ep-502.txt`. Do not treat this as the article.

- Episode: 502
- YouTube: https://www.youtube.com/watch?v=90svovLaJPM
- Notion: https://app.notion.com/p/303e74c69c18800ca2e1e06287d2d66e
- Transcript: `transcripts/ep-502.txt`
- Source: YouTube auto (no speaker labels)

No published/draft post from this episode.

## ★ Write first: Power BI Was Five Minutes to Wow. Fabric Isn’t.

**Thesis:** Fabric is trustworthy for people already in it. The 25-person shop that could run Power BI on a laptop will bounce off cloud capacity, skill ramp, and “put it in a lakehouse.”

**Material (Tommy):**
- Power BI’s original sell: 5x5, five minutes to wow. Fabric’s notebooks/warehouse story is the opposite of that simplicity.
- Wife’s small design company: one system, Power Query, one report, done. Not a demo. That is the actual job.
- Same job in Fabric: no access, can’t really share the file, Python notebook, lakehouse. Barrier is the ramp, not the SKU chart.
- Hardest trust problem is not Excel-macro silos (Mike). It’s the cloud-capacity environment: data leaves the device, harder to scale up.
- For a company trying to ramp, the skill tax is “barely even worth the time.” He and Mike are already knee-deep. That is not the buyer.

**Freshness:** fresh. Adjacent to “You’re AI Ready. Your Organization Isn’t” (org readiness) but this is the small-shop Fabric on-ramp, not AI theater.

## Other angles

### I Reach for the Lakehouse Before Power Query
**Thesis:** Trust flipped in the last 3–6 months from “beta, be careful” to “this is how I actually want to work,” including Python before Power Query.
- Usability: Dataflow-in-browser bugs that made you go “I don’t know what it’s doing” have receded.
- Wife’s Clockify timesheets: company was Excel-manual. He skipped a semantic model and landed API → lakehouse.
- Mindset he would not have had “back in the day”: Python before Power Query. Mike had called that shift on him.
- Git: used to get merge errors with no why. Now it’s the preferred workflow (Mike: first commit on a packed workspace still pukes).
**Attribution:** mixed.

### Lakehouse First, Everything Else Is a Tool
**Thesis:** If you ask what part of Fabric is solid enough to bet on, the answer is the lakehouse as source of truth, especially with Direct Lake.
- Asked “which parts do you trust,” he did not pick Spark, Copilot, or warehouse UX.
- Lakehouse = number one: source of truth, quality of the Direct Lake path, core of what he builds.
- Mike’s picks (Spark/Python notebooks, Fabric SQL, Autoscale, F2+PPU) are Mike’s. Don’t merge them into this thesis.

### You Can’t Hide a CSV Under the Rock Anymore
**Thesis:** Power BI let central BI get data in sideways. Fabric only works if connections and process are actually configured, so immature shops get left behind.
- Reacting to item ownership / connections / service principals: unless you know what you’re doing, it just doesn’t happen.
- Power BI’s little shortcuts kept consultants employed: peek under the rock, find the random CSV reference table, mash it in.
- Fabric: you have to do everything right. Systems that “aren’t set up that way” stall.
- Incremental pitch: you do not have to reorg the whole team on day one. Midsize shops with legacy Microsoft stacks can move jobs they already run (his last company still had SSIS).
**Attribution:** mixed (service-principal friction is Mike’s setup).
