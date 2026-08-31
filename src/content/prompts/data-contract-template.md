---
title: "Data Contract Template"
description: "The agreement humans sign before any agent gets to enforce anything: allowed values, definitions, timing, and the violation mode picked in advance."
category: playbooks
date: 2026-09-02T09:00:00Z
format: markdown
source:
  permalink: "2026/09/02/write-the-contract-before-you-hire-the-watchdog"
draft: false
---

There is zero AI inside a data contract. That's the whole point of it. The committee agrees you have seven sales regions, somebody writes it down, and only then does an agent have a standard worth checking. Set a watchdog on nothing and you've built a very fast way to generate alerts nobody reads.

Mine live as markdown next to the code, one file per producer-and-subject pair. The version in the post is trimmed to the load-bearing lines. This is the whole thing.

```markdown
# Data Contract: Sales Regions and Pipeline Stage

Producer: CRM Operations (owner: Dana R., backup: Marcus T.)
Consumer: Sales Analytics, Finance Reporting
Approver: Data Governance Committee
Agreed: 2026-07-22
Review: quarterly, or on any source system change
Version: 3 (see amendments at the bottom)

## Allowed values
- `Region` has exactly 7 values: Northeast, Southeast, Midwest,
  Southwest, West, Canada, International
  - Mode on violation: FLAG
- No blanks. No "Unknown". No "N/A". No "TBD".
  - Mode on violation: FLAG
- `Stage` has exactly 2 values: Prospect, Sale
  - Mode on violation: FAIL THE LOAD
- `ProductName` comes from the master product list. Free text is a
  violation even when it is spelled correctly.
  - Mode on violation: FLAG

## Definitions
- A "Sale" is a closed-won opportunity with a signed order date.
  Pipeline and verbal commitments are Prospect. A signed order with no
  date is Prospect until the date arrives.
- "Region" is the region of the SHIP-TO address, not the sales rep's
  territory. These disagree for roughly 4% of rows and that is expected.
- Finance reports on "recognized" revenue, which is not in this contract.
  If you need it, it comes from the GL feed, not from here.

## Grain and volume
- One row per opportunity per day of state change.
- Expected 400 to 1,200 rows per weekday load. Under 100 or over 3,000
  is itself a violation: something upstream changed.

## Timing
- Landed in the lakehouse by 6:00 AM Central, every weekday.
- No weekend load is expected. A weekend load is not an error.
- If the load fails, Dana posts to #sales-analytics before 7:00 AM.
- Acknowledged within 30 minutes of a failed load. Resolved within
  4 hours, or escalated to the committee with an ETA.

## On violation
- Honor the per-rule Mode above. Never substitute your own judgment.
  - FLAG: write the offending rows to the exceptions table, let the
    load complete. Do NOT silently filter them out.
  - FILTER: exclude the rows, and record what was excluded and why.
  - FAIL THE LOAD: stop, notify, leave yesterday's data in place.
- Notify the producer owner the same morning, offending records attached.
- More than 20 flagged rows in one load goes to the committee, not
  to Dana. That volume is a process problem, not a data entry problem.
- The same violation three loads in a row goes to the committee even
  under 20 rows. Repetition means the rule or the process is wrong.

## Out of scope
Anything not listed above is not governed by this contract. If a
consumer depends on it, that dependency is undocumented and unowned,
and the fix is to amend this file rather than to file a ticket.

## Amendments
| Date | Change | Agreed by |
| --- | --- | --- |
| 2026-05-04 | v1. Region and Stage values only. | Committee |
| 2026-06-11 | v2. Added ship-to clarification after the territory | Committee |
|            | mismatch surfaced in the Q2 forecast. | |
| 2026-07-22 | v3. Added grain, volume bands, and per-rule modes. | Committee |
```

## Adapting it

- **Start with almost none of this.** Version 1 of a real contract is the allowed values for one column. The file grows by discovery: every wall you hit becomes a clause both teams agree to. Trying to author the finished version up front is how it never gets written at all.
- **`Mode on violation` is the line people skip and then regret.** Flag, filter, or fail are your only three options, and the contract has to name one per rule. Filtering silently is how a number goes quietly wrong for a quarter. Failing the load over a cosmetic violation is how the data team becomes the reason sales has no report.
- **Put a name in `Producer`, never a team alias.** The point of the whole document is that a notification lands on a human who can fix the thing. `CRM Operations` is not a person and does not read Slack.
- **`Approver` is the role almost nobody assigns.** Not who writes the definition. Who signs off on it. That gap is why most organizations have four versions of everything.
- **The volume band catches what value rules cannot.** Every value can be legal while the row count quietly halves because an upstream filter changed. Bands are cheap and they catch the failures that don't look like failures.
- **`Out of scope` prevents the contract from being read as a warranty.** Without it, every consumer assumes their favorite column is covered, and the first time it breaks the contract gets blamed for a promise it never made.
- **The amendment log is what makes it a living document.** It also settles arguments six months later about whether something was agreed or assumed.

What checks this file every morning: [the data contract watchdog brief](/prompts/data-contract-watchdog-brief/).
