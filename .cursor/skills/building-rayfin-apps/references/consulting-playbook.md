# Rayfin Consulting Playbook — Puglia BI Alignment

How Rayfin work gets pitched, scoped, and priced for Puglia BI Consulting clients. Use alongside the `building-puglia-sow` skill: this file feeds Phase 2 (pattern), Phase 3 (deliverables), and Phase 5 (hours).

## Positioning: Why Clients Should Care

Rayfin gives clients an app/write-back/agent-backend layer that lives INSIDE their governed Fabric estate:

- **Write-back without Power Apps licensing or custom connectors.** App data lands in a SQL database in Fabric → directly in OneLake → queryable by the lakehouse and semantic models with zero ETL.
- **One governance story.** Same workspace, same Entra ID SSO, same item permissions, same capacity. No app platform sitting outside the data estate.
- **Agent-ready.** Purpose-built backend for AI agents needing persistent state (`@microsoft/rayfin-mcp` lets coding agents drive it). Pairs with Fabric data agent engagements.
- **Speed.** TypeScript decorators → DB + GraphQL API + auth + hosting in one `rayfin up`. Internal tools in days, not weeks.

### Rayfin vs Power Apps (the conversation clients will start)

| Factor | Rayfin | Power Apps |
| ------ | ------ | ---------- |
| Where data lands | SQL DB in Fabric → OneLake natively | Dataverse / connectors; ETL needed for analytics |
| Auth | Fabric SSO (Entra ID) only | Entra ID + broader connector auth options |
| Licensing | Fabric capacity CUs | Per-user/per-app Power Apps licensing |
| External/anonymous users | No | Possible (portals/pages) |
| Maker experience | Code-first (TypeScript), agent-friendly | Low-code canvas/model-driven |
| Complex business logic | Limited (no stored procs/multi-step txns) | Power Automate / plugins ecosystem |
| Maturity | Preview (Build 2026) | GA, mature |

**Honest guidance:** Rayfin for developer-built internal tools tightly coupled to Fabric analytics; Power Apps for citizen-developer scenarios, external users, or heavy workflow logic. Existing Power App Integration clients (e.g., Harmony) are candidates for a Rayfin comparison/POC conversation, not an automatic rip-and-replace.

## Discovery Questions (ask before scoping)

1. Is Fabric capacity assigned to the target workspace? Which SKU? (CU consumption is real.)
2. Will the tenant admin enable **Fabric Apps (preview)**? How long does that approval take?
3. Are all app users internal Entra ID identities? (External users = stop, Rayfin won't work.)
4. Tolerance for preview-status features in production? Get explicit sign-off; record in assumptions.
5. What's the write-back target? New operational data, or annotations on existing analytical data?
6. Does business logic need multi-step transactions or stored procedures? (If yes, Rayfin alone won't cut it.)
7. Who maintains the app post-handoff — do they have a TypeScript-capable dev, or is a maintenance retainer needed?

## SOW Deliverable Menu (Rayfin components)

Format follows building-puglia-sow Phase 3 rules: concrete output + quantity + completion criteria. Hour ranges are calibrated against the Harmony Data Infrastructure SOW scale (121 hrs total across 5 components) — **treat as starting points and tinker per the SOW wizard's Phase 5; recalibrate after the first 2–3 real Rayfin projects.**

| Deliverable | Description / Output | Completion Criteria | Hours |
| ----------- | -------------------- | ------------------- | ----- |
| Rayfin Environment Enablement (1 session + 1 doc) | Tenant setting verification, workspace + capacity setup, CLI/auth validation, enablement guide (2–3 pages) | Successful `rayfin up` of a template app to client workspace | 4–8 |
| Data Model & API Design (1 design doc + entity codebase) | Entity model with decorators, relationships, schema.ts; design doc (3–5 pages) mapping entities to business process | All entities deployed via `db apply`; GraphQL API returning data | 8–16 per ~5–8 entities |
| Security & Permissions Implementation (@role layer) | Row-level + field-level rules per entity; permissions matrix doc (1–2 pages) | Policies enforced and validated per role with test accounts | 4–10 |
| Write-Back Application (1 deployed app) | Frontend (template-derived or custom) + backend for data entry/annotation against operational data | App deployed, client users access via Run-and-interact, writes land in SQL DB in Fabric | 24–50 (simple form app low end; multi-entity custom UI high end) |
| Lakehouse Integration of App Data (pipeline/shortcut + validation doc) | App SQL DB surfaced into Lakehouse gold layer; refresh/latency documented (1 page) | App-originated rows queryable from semantic model | 6–12 |
| Semantic Model + Report over App Data | Standard PBIC semantic modeling + dashboard component (price via existing cost-estimation-guide) | Per existing SOW standards | use existing guide |
| Agent Backend Provisioning (1 deployed backend + integration doc) | Rayfin backend providing persistent state/APIs for an AI agent (pairs with Data Agents component) | Agent reads/writes state through GraphQL API; integration doc (2–3 pages) | 12–24 |
| Rayfin Handoff & Training (1–2 sessions + runbook) | Deployment runbook (3–5 pages): CLI workflow, schema-change process, the "never edit the DB in portal" rule; 1–2 training sessions (2 hrs each) | Client dev performs a supervised `rayfin up` end-to-end | 6–10 |
| Rayfin POC / Feasibility Spike (1 working POC + recommendation memo) | Time-boxed proof against one client use case; memo (2–3 pages) with go/no-go and Power Apps comparison | Demo delivered; written recommendation accepted | 12–20 fixed box |

## SOW Pattern Fit

- **Implementation pattern** (default) — Rayfin lands as a numbered component inside a broader Fabric build, exactly like Harmony's "Write-Back & Automation" and "Data Agents" components. Use narrative "Overview:" descriptions per component.
- **Simple Retainer** — post-handoff Rayfin maintenance (schema changes, redeploys, preview-churn fixes). Suggest a monthly cap; preview products generate unplanned work.
- **POC engagements** — fixed-scope spike from the menu above; good wedge for existing Power BI clients curious about write-back.

## Assumptions Boilerplate (include in every Rayfin SOW)

- Client tenant admin will enable the Fabric Apps (preview) workload prior to development start; delays in enablement shift the timeline.
- Fabric capacity is provisioned and assigned by the client; capacity consumption (CU) costs are the client's responsibility.
- Fabric Apps is a Microsoft preview feature; PBIC will accommodate reasonable Microsoft-driven changes during the engagement, but material platform changes may require a change order.
- All application users hold Entra ID identities in the client tenant; external/anonymous access is out of scope.
- Application schema is managed exclusively in source control; direct modification of the app's SQL database by client staff voids related support items.
- Secrets, keys, and sensitive values are excluded from frontend assets and repository; static content is served from a public URL.

## Cross-Skill Wiring

- **building-puglia-sow** — pull deliverables/hours from this file into Phases 3–5; pattern recommendation per above.
- **semantic-models:\* / reports:\* plugins** — for the analytics layer over app data.
- **fabric-tmdl-semantic-models** — when app data feeds git-integrated semantic models.
- **tracking-documentation-updates** — enable during Rayfin builds; schema and CLI workflows change fast in preview.
