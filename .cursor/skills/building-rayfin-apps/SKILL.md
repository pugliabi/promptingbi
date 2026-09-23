---
name: building-rayfin-apps
description: "Build, scope, and deploy Microsoft Rayfin / Fabric Apps (preview) projects — TypeScript-decorator data models, @role row-level permissions, GraphQL APIs, Fabric SSO auth, and OneLake-hosted frontends deployed with the Rayfin CLI. Also covers consulting alignment: when to pitch Rayfin to clients, Rayfin SOW deliverables and hour estimates that plug into the building-puglia-sow skill. Use whenever the user mentions Rayfin, Fabric Apps, 'rayfin up', @entity decorators, write-back apps on Fabric, agent backends on Fabric, building an app on OneLake, a Fabric-native internal tool, or scoping/estimating a Rayfin project for a client. Trigger even for casual phrasing like 'build a quick app on Fabric', 'write-back without Power Apps', or 'can Rayfin do X'."
---

# Building Rayfin Apps (Fabric Apps Preview)

Rayfin is Microsoft's open-source SDK + CLI (announced Build 2026, public preview) for defining a complete application backend in TypeScript and deploying it as a first-class artifact in Microsoft Fabric. One deploy provisions: a SQL database in Fabric (schema generated from decorators), a GraphQL data API, Fabric brokered auth (Entra ID SSO), file storage, and static frontend hosting on OneLake. App data lands in OneLake — immediately queryable by the rest of the Fabric stack (lakehouse, semantic models, Power BI) with no ETL.

**Two hats this skill wears:**
1. **Builder** — scaffold, model, secure, and deploy Rayfin apps (Phases below).
2. **Consultant** — decide when Rayfin fits a client engagement and scope it into a SOW. For that, read `./references/consulting-playbook.md` and hand its deliverables/hours to the `building-puglia-sow` skill.

## Reference Files

- `./references/data-models.md` — Entity decorators, types, modifiers, relationships, schema registration. Read before writing any entity code.
- `./references/permissions.md` — `@role` decorator, policy expressions, field-level include/exclude, common RLS patterns. Read before writing auth rules.
- `./references/cli-and-project.md` — CLI command reference, project structure, deployment workflows, env vars, troubleshooting.
- `./references/consulting-playbook.md` — When to pitch Rayfin, discovery questions, SOW deliverable menu with hour estimates, positioning vs Power Apps. Read for ANY client-scoping or SOW conversation.

## Mental Model (memorize this)

```
TypeScript classes + decorators  ──rayfin up──▶  Fabric App item
  @entity / @text / @one / @many                  ├─ SQL database in Fabric (schema applied)
  @role (row + field level security)              ├─ GraphQL API  (/api/graphql)
                                                  ├─ Auth (Entra ID SSO)  (/auth)
                                                  ├─ Storage  (/storage)
                                                  └─ Static frontend on OneLake (public URL)
App endpoint: https://<app>-app.rayfin.windows.net/
```

The database is **read-only in the Fabric portal** — schema changes ONLY flow from code via `npx rayfin up db apply`. Editing the SQL DB directly causes schema conflicts and can break the app. Tell the user this early; it's the #1 gotcha for BI people used to touching databases directly.

## Prerequisites Checklist (verify before any build/deploy work)

1. **Fabric capacity** assigned to the target workspace (Fabric Apps consumes CUs).
2. **Fabric Apps (preview)** workload enabled by a tenant admin (Admin portal → Tenant settings).
3. **Contributor, Member, or Admin** role on the workspace.
4. **Node.js + npm** installed. Local full-stack dev additionally needs **Docker**.

On client engagements, items 1–2 are discovery questions — a tenant admin approval cycle can add days to a timeline. Flag it in assumptions.

## Build Workflow

### Phase 1: Scaffold

```bash
# New project from template (Blank App, To-Do App, or Data App)
npm create @microsoft/rayfin@latest -- my-app --workspace <workspacename>

# OR add Rayfin to an existing/empty folder
npx rayfin init .
```

Generated layout: `rayfin/rayfin.yml` (services + deployment config), `rayfin/.env`, `rayfin/data/` (entities), frontend in root (Vite + React/Vue per template). `rayfin/.temp/` is generated — gitignore it. Templates gallery: `microsoft/awesome-rayfin`; analytics-app templates over existing Fabric data: `microsoft/fabric-apps-analytic-templates`.

### Phase 2: Model the Data

Define entities in `rayfin/data/` per `./references/data-models.md`. Hard rules that differ from typical ORMs:

- PK is always a UUID `string` named `id` — no composite keys, no custom key names.
- No many-to-many — use an explicit join entity.
- FK convention is `{property}_id`; navigation via `@one(() => Parent)` / `@many(() => Child)`.
- No `@one()` to system entities (e.g. built-in USER) — store `user_id` as `@text()` populated from `claims.sub`.
- Register every entity in `rayfin/data/schema.ts` or it won't appear in the client/API.
- Use relative imports with `.js` extensions in entity files (ESM output).
- `?` on a TS property does NOT make the column nullable — only `{ optional: true }` does.

### Phase 3: Secure It

Apply `@role` decorators per `./references/permissions.md`. Default posture for client work: owner-only access (`policy: (claims, item) => claims.sub.eq(item.user_id)`) with an admin override pattern. Never ship an entity with no `@role` thinking about who reads/writes it. Production auth is Fabric SSO (Entra ID) ONLY — no custom providers. Email/password exists for local dev only.

### Phase 4: Run Locally, Then Deploy

```bash
npm run dev                      # local frontend + backend
npx rayfin login                 # auth to Fabric (re-run on 401/403)
npx rayfin up --dry-run          # preview what will change — ALWAYS before first deploy
npx rayfin up                    # full deploy
npx rayfin up status [--json]    # verify; prints hosted app URL + portal link
```

Partial deploys: `npx rayfin up db apply` (schema only), `npx rayfin up staticapp deploy` (frontend only). Destructive schema changes (drop/retype column) are refused unless `--force` — warn the user that forces can lose data. Switch target workspace with `npx rayfin switch --workspace <ws>`. Full command list: `./references/cli-and-project.md`.

### Phase 5: Wire to the BI Stack (the Puglia BI move)

The app's SQL database in Fabric is just another Fabric item — its data is queryable for analytics. Standard pattern for client deliverables:

1. Rayfin app captures operational/write-back data → SQL database in Fabric.
2. Mirror/shortcut into the Lakehouse or query directly for the gold layer.
3. Semantic model + Power BI reports on top (use the existing `semantic-models:*` and `reports:*` plugin skills).
4. Optionally surface the Power BI report and the Rayfin app side-by-side in a Fabric workspace app.

This closes the loop the old way needed Power Apps + custom connectors + dataflows to achieve.

## Sharing & Permissions (Fabric item level)

- **Run and interact** (default for workspace members) — use the app, invoke APIs.
- **Edit (Write)** — deploy code, apply schema, manage child services.
- **Reshare** — requires workspace admin.

Workspace roles don't supersede item-level permissions. For client handoff: client users get Run and interact; only the deploying consultant(s) need Edit.

## When Rayfin Is the WRONG Tool (steer the user away)

- Complex multi-step transactions or stored-procedure-heavy logic — not supported.
- Custom auth providers / external (non-Entra) users — Fabric SSO only after deploy.
- Anonymous/public apps — every user needs Fabric sign-in and item permission.
- Clients without Fabric capacity or unwilling to enable a preview workload.
- Anything mission-critical that can't tolerate preview-status churn — set expectations explicitly in SOW assumptions.

## Security Responsibilities (relay to clients)

Fabric provides SSO, RLS via `@role`, HTTPS, PKCE, workspace/item permissions. The builder is responsible for: no secrets in code or frontend assets (static content is served from a public URL), what authenticated users can see/do, least-privilege contributor access, and compliance accountability for collected data. Put this split in every Rayfin SOW's assumptions section.

## SOW Integration

When the conversation turns to scoping, pricing, or proposals: read `./references/consulting-playbook.md`, then invoke the `building-puglia-sow` workflow. Rayfin work usually lands as a component inside an Implementation-pattern SOW (like the Harmony Group Data Infrastructure build) rather than a standalone engagement. The playbook has the deliverable menu and hour heuristics formatted to drop straight into Phase 3/5 of the SOW wizard.

## Currency Warning

Rayfin is in **preview** (as of June 2026) and moving fast. Before relying on a specific CLI flag, decorator option, or limitation in production guidance, verify against live docs: https://learn.microsoft.com/en-us/fabric/apps/ and https://github.com/microsoft/rayfin. If web access is available and the detail matters, check; if not, caveat it.
