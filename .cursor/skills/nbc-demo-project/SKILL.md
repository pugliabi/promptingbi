---
name: nbc-demo-project
description: Reference and staging guide for the NBC — Northside Baseball Club (Demo) project in Notion, Tommy's fictional demo client used in place of real client data. This skill should be used when preparing demos, taking screenshots, writing blog posts or presentations that need realistic project examples, or when any task needs a safe demo project to reference or interact with (project hubs, milestones, agent instructions, semantic models, Fabric builds). Also use when the user mentions "NBC", "Northside Baseball Club", "the demo project", asks to "stage NBC" for a screenshot/demo, or asks to "reset NBC" / "strike the set" afterward.
---

# NBC Demo Project (Northside Baseball Club)

## Purpose

Northside Baseball Club LLC is a **fictional** independent league baseball franchise (Chicago north suburbs) living in Tommy's Notion workspace. It mirrors a real Puglia BI consulting engagement — 7 milestones, deliverables, time entries, meetings, agent instruction pages, a documented 18-table star schema — but every name, number, and milestone is fabricated. It exists so demos, screenshots, blog posts, and examples never expose real client data.

Use this skill to know **what exists, where it lives, and how to pull it** via the Notion MCP.

## Golden rules

1. **Never substitute real client data.** If a task needs "a project example," NBC is the answer.
2. **NBC is presentation-ready — keep it that way.** If a demo changes milestone statuses or adds test deliverables, reset them afterward using the **NBC Demo Playbook & Reset Guide** (page `e6e8430a-c5fc-46a4-97b3-04f1e1c1c18b`). The golden rule from that page: flip anything marked Done back to its pre-demo status so the environment stays perpetually "mid-stream."
3. **Milestone pages are self-sufficient.** Descriptions are written as work-in-progress, so an agent can pick up any milestone from page content alone — no meeting transcript needed.
4. When writing example content (DAX, table names, sources), stay consistent with the documented model: 18 tables (10 Dim + 8 Fact), 63 relationships, AXS ticketing / Salesforce CRM / QuickBooks sources. Table names are in `references/notion-map.md`.

## Workflow

1. **Start at the hub.** Fetch page `a0bc8520-34de-483e-97a5-61cb80707d58` ("NBC — Northside Baseball Club (Demo)") with `notion-fetch`. It contains Latest News & Review, Suggested Next Steps, and links to everything else.
2. **Pick the right milestone for the story.** Consult the scenario table in `references/notion-map.md` (mirrors the Demo Playbook). Example: Fabric/medallion story → P7; CRM churn story → P6; fresh-discovery story → P3.
3. **Fetch only what the task needs.** All page IDs, database IDs, and data source IDs are in `references/notion-map.md` — go direct instead of searching.
4. **For database queries** (milestone statuses, meetings, deliverables), use `notion-query-data-sources` in SQL mode with the collection URLs and query patterns in the reference file.
5. **For screenshots**, the visually rich pages are: the hub (two-column callout layout), the Demo Playbook, any P1–P7 milestone page, and the Claude Agent Instructions page (colored callouts, tables, code blocks).
6. **After a demo that mutated state**, walk the reset checklist for the scenario used (in the reference file and on the Playbook page).

## Stage workflow ("stage NBC for [topic]")

Get NBC camera-ready for a screenshot session or demo. **Hard rule: staging mutates ONLY milestone statuses and "as of <date>" strings. No new rows, no content edits, no artifact generation.**

1. Resolve the topic to a shot-list entry in `references/shot-list.md` (blog posts, demo scenarios, or the closest match).
2. Snapshot the current statuses of all 7 project milestones with the SQL query in `references/notion-map.md`.
3. Check the **🎬 Staging Log** section on the Demo Playbook page (`e6e8430a-c5fc-46a4-97b3-04f1e1c1c18b`). If an entry exists whose heading is not prefixed `✅ RESTORED`, warn the user that NBC is already staged and get confirmation before proceeding.
4. Write a new log entry at the top of the Staging Log via `notion-update-page` (insert after the section intro): a toggle titled `STAGED <ISO timestamp> — <topic>` containing a `Milestone | Prior Status` table of the snapshot.
5. Apply the shot-list's required statuses via `notion-update-page` (`update_properties`, `Status` field) — skip milestones already in the right state.
6. Freshness pass: on the hub page, update the `*(as of <date>)*` strings in the Latest News & Review and Suggested Next Steps callouts to today's date. Dates only — do not touch the callout content.
7. Reply with the camera-ready checklist: page URLs in capture order, what must be visible in each frame (from the shot list), and any LIVE/ARTIFACT shots the user must handle themselves.

## Strike workflow ("reset NBC" / "strike the set")

1. Read the Staging Log on the Demo Playbook page and find the newest entry not marked `✅ RESTORED`.
2. Restore each milestone's status to the `Prior Status` recorded in that entry (skip ones already matching).
3. Rename the entry's toggle heading to prefix it with `✅ RESTORED` (keep the original text).
4. If no unrestored entry exists, fall back to the Quick Reset Reference table on the Demo Playbook page and the default statuses in `references/notion-map.md`.
5. Leave freshened dates as-is — current dates are always correct.
6. Confirm to the user which statuses were restored.

## Bundled references

- `references/notion-map.md` — the full map: page IDs, database and data source IDs, milestone table with default demo statuses, demo scenarios with reset checklists, the 18-table schema, and ready-to-use SQL query patterns.
- `references/shot-list.md` — topic → shot mapping for blog posts and demo scenarios: pages in capture order, what belongs in each frame, required states, and prep notes (which toggles to expand, LIVE/ARTIFACT shot flags).
