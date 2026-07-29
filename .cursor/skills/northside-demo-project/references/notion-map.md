# NB Notion Map — Page IDs, Databases, Scenarios, Schema

All IDs verified 2026-07-29 via Notion MCP (post NBC→NB rebrand). Fetch any page with `notion-fetch` using the ID. Page IDs did not change in the rebrand — only titles did.

## Core pages

| Page | ID | What's on it |
|---|---|---|
| ⚾ NB — Northside Baseball (Demo) — **project hub** | `a0bc8520-34de-483e-97a5-61cb80707d58` | Latest News & Review callout, Suggested Next Steps callout, inline Milestones/Meetings/Deliverables/Time Entries views, Project Updates toggle, Project Overview callout |
| Northside Baseball Club LLC — **client page** | `25e11df7-b2b1-4274-910e-f7b73034c9c6` | Client record in Clients DB; parent of the Demo Playbook |
| 🎬 NBC Demo Playbook & Reset Guide *(title kept legacy "NBC")* | `e6e8430a-c5fc-46a4-97b3-04f1e1c1c18b` | 6 demo scenarios, reusability rules, quick reset reference table, **🎬 Staging Log section at the bottom** (snapshot entries written/consumed by the Stage and Strike workflows) — read before/after any demo that changes state. Its "What's in Here" status column is prose and can drift — trust the SQL query below instead |
| 💽 Data Resource Index — NB | `3abe74c6-9c18-8196-8dd4-e97a8b0141d9` | Source status table (AXS/Salesforce/QuickBooks/Sponsorship), links to all agent instruction pages (body text still says NBC in places) |
| 🤖 Claude Agent Instructions — NB Semantic Model Build | `3abe74c6-9c18-81f3-871c-ed7762cc2030` | Priority callouts, DAX autonomy directive, **Verified Model State (the de facto data dictionary)**, MCP tool table, validation DAX queries |
| Claude Chrome Extension Instructions — AXS API Discovery (Postman) | `3abe74c6-9c18-818f-bbb9-f795a7eb96c1` | API discovery workflow example |
| Fabric Notebook Instructions — NBC PySpark *(title kept legacy "NBC")* | `3abe74c6-9c18-8118-a66b-c69f0bd23eb3` | Bronze/silver/gold notebook standards |
| Semantic Model Foundation (sub-milestone example) | `306e74c6-9c18-80e3-8f64-d7bd6f8edbfc` | Table rename / fact-dim convention work |
| ⚾ NBC Demo Sub-Milestones (block) | `c13e796e-db0c-4fb0-a5d4-bac9ca28da49` | Sub-milestone breakdown |

Note: there is no standalone "NB Data Dictionary" page — the verified 18-table model state lives in the Agent Instructions page above.

## Milestones (P1–P7)

Rows in the shared 🌎 Milestones database, related to the NB hub. All titles carry the "NB —" prefix (P6 "NBT" typo and P7 blank title were repaired 2026-07-29). Default demo statuses below; if a fetch shows something else, a demo probably wasn't reset.

| # | Milestone | Page ID | Default status | Best for demoing |
|---|---|---|---|---|
| P1 | NB — Semantic Model & Power BI Reporting | `4ad32eae-c9d2-49c8-ae1d-ef147d84da49` | Active/Ongoing | Semantic modeling, DAX measures, Power BI sandbox sessions |
| P2 | NB — Fabric Data Platform | `08ba18dd-9197-4b19-a4f4-8709196649f0` | Active | Fabric lakehouse, pipeline ingestion, multi-source architecture |
| P3 | NB — BI Modernization Roadmap | `649c7def-66ec-48ff-a1af-8fd9fa5f1c2b` | **NOW** | Discovery phase, architecture decisions, 3-year roadmap story |
| P4 | NB — Operations & Event P&L Dashboard | `7e62df11-05fd-43c5-b3f5-c5ea128460ea` | Active | Financial dashboard, event-level P&L, ops reporting |
| P5 | NB — MCP Integration & AI Tooling | `638ecf0a-64f4-441e-90dd-519c8524347a` | Active | MCP server build, Notion AI agent setup, NLQ→DAX |
| P6 | NB — Season Ticket Holder CRM Analytics | `0a55bfd5-3f39-4989-b63b-6912aa39a371` | Ongoing | CRM analytics, churn prediction, renewal pipeline |
| P7 | NB — Fabric Notebooks & Medallion Architecture | `4bb16c87-b0ac-4f47-abc5-bcb429ba1dd2` | Active | Bronze/silver/gold layers, PySpark notebooks, DirectLake |

## Databases and data sources

These are shared workspace databases; NB views filter on the relation `⚾ ProjectsConsulting` containing the hub URL. The inline view names on the hub still say "NBC" (legacy — leave them).

| Database (hub view name) | Database ID | Data source (SQL table name) |
|---|---|---|
| NBC Milestones (🌎 Milestones) | `a22f6ad0-e7c0-4555-b122-b17e5267ff95` | `collection://09af373c-e566-4ef3-85ca-2ce777b8975b` |
| NBC Meetings (🎙️ AI Meeting Notes) | `faa0828e-f304-42a7-a3fd-c1b775fdda46` | `collection://1f5d53e1-6ec1-47c6-ac7f-58f5c3c2b2e8` |
| NBC Deliverables (⏰ ConsultingTracker) | `a6e60ebe-19c4-43ba-9778-ad8e62f17055` | `collection://92f91025-ce45-48a7-bdc8-06a54d410176` |
| NBC Time Entries (Consulting Actuals) | `fb1bb5a8-f2cb-400b-8266-a00ced226a55` | fetch DB to confirm data source |
| ProjectsConsulting (parent of hub) | — | `collection://5923ec88-6ba2-4992-98d0-7eb77f84e1ce` |
| Clients (parent of client page) | — | `collection://b824361d-6267-44d0-abda-a9d3f1cdf70a` |

### SQL query patterns (`notion-query-data-sources`, SQL mode)

NB milestones with status, in priority order:

```sql
SELECT url, "Milestone /  Phase" AS name, Status, MilestonePrioirty, Description
FROM "collection://09af373c-e566-4ef3-85ca-2ce777b8975b"
WHERE "⚾ ProjectsConsulting" LIKE '%a0bc852034de483e97a561cb80707d58%'
ORDER BY MilestonePrioirty
```

Gotchas:
- The milestone title column is `"Milestone /  Phase"` — **two spaces** after the slash. Priority column is misspelled `MilestonePrioirty`.
- Milestone Status options: Prospect, On Hold, Not started, NOW, Ongoing, Pending, Active, Terminated, Done, Inactive.
- Meetings table: title = `"Meeting Title"`, plus `Summary`, `"Key Points"`, `"Action Items"`, `"date:Meeting Date:start"`, `MeetingRelevance`. Filter the same way on `"⚾ ProjectsConsulting"`.
- Rollup/formula columns (%Complete, ActualHours, Client, etc.) are **not** SQL-queryable.
- When editing page content with `update_content`, fetch the page first and copy `old_str` from the fetched output exactly — Notion normalizes markdown on save (e.g. inline code spans inside italics gain `**` bold markers), so the text you wrote is not always the text stored.
- SQL `url` values use the bare form `https://app.notion.com/<id>` (no `/p/`).

## Demo scenarios (from the Demo Playbook)

Full reset checklists live on the Playbook page (`e6e8430a-c5fc-46a4-97b3-04f1e1c1c18b`).

| Scenario | Best milestones | Reset to |
|---|---|---|
| 1. "How We Run Projects in Notion" | P1-M2 Ticket Sales Dashboard, P2-M1 AXS Ingestion, P5-M3 Notion AI Agent | P1-M2→Ongoing, P5-M3→Active |
| 2. "Notion + Meetings → MCP Build" | P5-M2 MCP Server, P5-M3 Notion AI Agent | P5-M2→NOW, P5-M3→Active; delete test deliverables |
| 3. "Fabric Notebooks & Medallion" | P7-M2 Salesforce Sync, P7-M3 Silver Layer, P2-M1 AXS Ingestion | P7-M2→NOW, P7-M3→Active |
| 4. "Semantic Model + Power BI End-to-End" | P1-M2, P1-M3 STH Insights, P6-M3 Churn Prediction | P1-M2→Ongoing, P1-M3→Active, P6-M3→Ongoing |
| 5. "BI Modernization Discovery & Roadmap" | P3-M0 Discovery, P3-M1 Architecture & Roadmap | P3-M0→NOW, P3-M1+→Not started |
| 6. "CRM Analytics & Churn Prediction" | P6-M3 Churn Prediction, P6-M4 Renewal Pipeline | P6-M3→Ongoing, P6-M4→Active |

Status conventions: NOW/Active/Ongoing = live-demo ready; Pending = "what's next" story; Done = sparingly, prior work only; Not started = roadmap/pipeline story.

## Verified semantic model (for consistent example content)

18 data tables (10 Dim + 8 Fact), 63 relationships, primary source AXS ticketing CSV exports. Measure home table: `_Ticket Sales`.

**Dimensions:** DimDate, DimGame, DimOpponent, DimSection, DimPriceTier, DimCustomer, DimSTHAccount, DimChannel, DimPromotion, DimStaff

**Facts:** FactTicketSales (primary, transaction grain), FactAttendance, FactRefunds, FactSeatInventory, FactSTHRenewals, FactConcessionSales (deferred scope), FactSponsorship (deferred scope), FactGameOpsCosts

**Example measures used in NB content:** `This Game Revenue`, `Prior Game Revenue`, `Game over Game Revenue %`, `Season to Date Revenue`, `Section Utilization %`, `Yield per Seat`, `Trailing 5 Game Avg Attendance`. Currency = zero decimals; percentages = 1 decimal.

**Source systems:** AXS ticketing (CSV + REST API in discovery), Salesforce CRM (REST, Connected App), QuickBooks (exports), Sponsorship tracker (Excel, deferred).

**Fabric build state:** AXS bronze done (12 notebooks), Salesforce bronze in sprint (5 notebooks), silver layer active (17 notebooks), cross-source FK alignment is the key technical challenge; endgame is DirectLake repoint.
