---
title: "Master Sequence Page: One Page That Sequences Every Instruction Page"
description: "The page I hand Claude at the start of every session on a big project: current phase, status legend, instruction page sequence, write-back protocol, benchmarks."
category: agent-briefs
date: 2026-09-25T09:00:00Z
format: markdown
source:
  permalink: "2026/09/25/context-harness-execution-harness"
draft: false
---

Once a project has more than a handful of instructions pages, somebody has to track which one is next. My agents keep this page current in the context harness, and every execution session gets handed this one page. The kickoff is one line: "Look at the master sequence page for this project, get on the same page, then start on the active item."

Below is the shape of the real Northside Baseball page. I left the project specifics in where they show what goes in each section.

```markdown
# 📋 Agent Instructions: <Project> Master Sequence

> 📍 Current Phase: <Phase N, name, wave>. Focus on <page> first.
> - Done: <what shipped, with the verified numbers>
> - Gap (<date> scan): <what the last recon found that contradicts
>   the plan, e.g. "published model has 2 of 9 tables, never refreshed">
> - Focus on this, in order:
>   1. <step>
>   2. <step>
>   3. <step>
> - Do not start <later phases / waves> until they show ▶️ below.

---

## How to Use This Page
This is the master sequencing document for every Claude instruction
page on <Project>. Hand Claude this one page at the start of a
session instead of choosing individual instruction pages.

- ▶️ ACTIVE / NEXT: work on this page now
- ✅ COMPLETE: done; go back to it only if new context comes up
- ⏸️ PAUSED: in the sequence, waiting on an earlier phase
- 🔴 DEFERRED: not in scope right now
- 📝 PLANNED: the deliverable is scoped but the instruction page
  hasn't been written yet. The technical body gets written from a
  context brief and reviewed before it is linked here.
  Do not start work on a PLANNED item.

Read the active page and its reference pages, do the work, write
back (see the Context Write-Back Protocol), then come back here and
update the status.

---

## Instruction Page Sequence

### Phase 0: Discovery & Data Platform ✅
*Pattern: <earlier engagement that did this phase well, e.g. API
discovery, then bronze/serve build>.*
1. ✅ COMPLETE: <API Discovery instructions>
   - Base URL confirmed, endpoints documented, incremental query
     pattern identified. Closed out <date>.
2. ✅ COMPLETE: <Fabric Notebook instructions>
   - 8 notebooks: bronze 32 / silver 31 / gold 8. 75 FK checks and
     23 grain checks, zero orphans. Closed out <date>.

### Phase 1: Semantic Model ▶️
1. ✅ COMPLETE: <Semantic Model Build instructions>
   - v1: 9 tables, 9 relationships, 25 measures, audited.
   - Still open from the audit: <items>, carried forward to <pages>.
2. 📝 PLANNED: <Model Publish & Direct Lake Cutover>
   - Deploy, set credentials, refresh. Build the Direct Lake variant
     and prove parity against the Validation Benchmarks below.

### Phase 2: Report Design ▶️
1. ▶️ ACTIVE / NEXT: <Desktop Bridge Report Design instructions>
   - The master report-design page. Wave A runs from this page.
   **Wave A (▶️ NOW)**
   1. ▶️ <Executive Summary page>. Spec: Page 1.
   2. ▶️ <Game-Day Revenue page>. Spec: Page 2.
   3. 📝 PLANNED <Calculation Reference document>
   **Wave B (⏸️ PAUSED until Wave A is approved)**
   1. 📝 PLANNED <model extension>
   2. 📝 PLANNED <page>

### Phase 3: Platform Hardening & Handover ⏸️
1. 📝 PLANNED <Orchestrated Refresh Pipeline>
2. 📝 PLANNED <Deployment Pipeline (dev/test/prod)>
3. 📝 PLANNED <Knowledge Transfer Reference Guide>

### Phase 4: MCP Integration & AI Tooling 🟡
1. 📝 PLANNED <Fabric Data Agent configuration>

### Consulting track (no Claude instruction page)
- <Roadmap / governance deliverables drafted by the planning agent>

---

## Context Write-Back Protocol
After finishing work on any instruction page:
1. Write back on the instruction page with four parts: what was
   found, what was done, results (with validation numbers), and
   open items. Date-stamp it.
2. Update this Master Sequence: flip the status icon (▶️ → ✅), add a
   one-line completion note, and update the Current Phase callout if
   the focus has moved.
3. Update the Data Resource Index: set 🔴 / 🟡 / ✅ markers on
   affected pages and list any new files or artifacts.
4. Update the milestone page: tick completed deliverable checkboxes
   on the matching milestone, using the exact deliverable names.
5. Flag discrepancies: if a table, column, measure, or number
   contradicts the Data Dictionary or this page, note it on both
   pages. Don't overwrite silently.
6. Stop at scope edges: anything outside the active item's
   deliverable gets documented on its page as an open item, and
   work stops there.

---

## Key Reference Pages
- <Data Dictionary>: source of truth for tables and columns
- <Workspace scan>: live item inventory and findings
- <Data Resource Index>: hub for all resources and instruction pages
- <Project page>: Latest News & Review, Suggested Next Steps
- Milestones: <links>

---

## Validation Benchmarks
| Metric                 | Expected                                   | Source               |
| Lakehouse tables       | 71 (bronze 32, silver 31, gold 8)          | Data Dictionary      |
| FK / grain checks      | 75 / 23, zero orphans                      | Notebook instructions|
| FactTicketSales rows   | 7,271,674                                  | Semantic Model Build |
| Gross ticket revenue   | $236,175,062                               | Semantic Model Build |
| No-filter anchor       | Latest game 2026-07-23, This Game $288,799 | <date> recap         |
| Semantic model v1      | 9 tables / 9 relationships / 25 measures   | Semantic Model Build |
```

## Adapting it

- **Date the Current Phase callout and put the last scan's gaps in it.** Without the gap line, the agent assumes "published" means "done." The Northside one caught a model with 2 of 9 tables that had never been refreshed.
- **Keep PLANNED as a hard stop.** It stops an agent from building off a page nobody has written or reviewed yet.
- **Keep steps 5 and 6 of the write-back protocol.** "Don't overwrite silently" keeps the docs honest when the build finds they were wrong. "Stop at scope edges" keeps a session on its one deliverable.
- **Write the benchmarks before the build, with a source column.** Then "done" means the numbers match. Numbers with no date or source turn into a trap later.
- **Put the pattern source in each phase header** (for example, "Pattern: API discovery, then bronze/serve build") when the phase repeats something that worked on an earlier project. That's how lessons from one engagement carry into the next.
