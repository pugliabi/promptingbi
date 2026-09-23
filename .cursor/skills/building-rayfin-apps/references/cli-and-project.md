# Rayfin CLI & Project Reference

## Command Cheat Sheet

| Command | Purpose |
| ------- | ------- |
| `npm create @microsoft/rayfin@latest -- <name> --workspace <ws>` | Scaffold new project from template |
| `npm create @microsoft/rayfin@latest -- "<name>" --template todoapp --workspace <ws>` | Scaffold with explicit template |
| `npx rayfin init .` | Add Rayfin to existing/empty folder (walks through services, DB dialect, static hosting) |
| `npm run dev` | Local frontend dev server + backend |
| `npx rayfin login` | Sign in to Fabric (re-run on 401/403) |
| `npx rayfin up` | Full deploy to Fabric |
| `npx rayfin up --dry-run` | Preview deployment without changes |
| `npx rayfin up --workspace <ws>` | Deploy to a different workspace |
| `npx rayfin up status [--json]` | Check deployment state; prints app URL + portal link |
| `npx rayfin up db apply [--force]` | Apply schema changes only (`--force` for destructive ops — data loss risk) |
| `npx rayfin up staticapp deploy` | Redeploy frontend assets only |
| `npx rayfin switch --workspace <ws>` | Switch active target workspace |

Templates at launch: **Blank App**, **To-Do App**, **Data App**. Gallery: `github.com/microsoft/awesome-rayfin`. Analytics apps over existing Fabric data: `github.com/microsoft/fabric-apps-analytic-templates`.

## Project Structure

```
my-app/
├── rayfin/
│   ├── rayfin.yml        # app services + deployment settings
│   ├── .env              # env values used by the CLI
│   ├── tsconfig.json     # project-reference config used by CLI to compile entities (don't edit)
│   ├── data/             # entity files (@entity classes) + schema.ts registration map
│   └── .temp/            # generated backend artifacts — ADD TO .gitignore
├── src/                  # frontend (React/Vue per template, Vite)
└── package.json
```

## Vite Environment Variables

| Variable | Purpose |
| -------- | ------- |
| `VITE_RAYFIN_API_URL` | Base URL pointing frontend at the backend (set before `npm run dev` to override) |
| `VITE_RAYFIN_PUBLISHABLE_KEY` | Publishable key for client auth |
| `VITE_FABRIC_ITEM_ID` | Set by `rayfin up`; written to `.env.fabric-<workspace>` and `.env.fabric`; used for brokered auth |
| `VITE_FABRIC_WORKSPACE_ID` | Set by `rayfin up` |

## App Endpoint Map

Single backend endpoint per app:

```
https://<your-app>-app.rayfin.windows.net/
├── /api/graphql   # Data API (used by RayfinClient for reads/writes)
├── /auth          # Authentication service
└── /storage       # File storage
```

## npm Packages (what's what)

| Package | Role |
| ------- | ---- |
| `@microsoft/create-rayfin` | Scaffolder |
| `@microsoft/rayfin-cli` | CLI (scaffold, deploy, manage) |
| `@microsoft/rayfin-core` | Entity decorators, schema definitions, core types |
| `@microsoft/rayfin-client` | Main client SDK |
| `@microsoft/rayfin-data` | Type-safe client for Data API Builder endpoints |
| `@microsoft/rayfin-auth` / `rayfin-auth-provider-fabric` | Auth utilities / Fabric brokered auth provider |
| `@microsoft/rayfin-functions` | Functions runtime (server-side logic) |
| `@microsoft/rayfin-storage` | Type-safe storage client |
| `@microsoft/rayfin-mcp` | Model Context Protocol tooling — lets coding agents drive Rayfin |

## Fabric Portal Behavior After Deploy

Deploying creates a **Fabric App** item with child items per `rayfin.yml`:

| Child service | Provides | Portal capabilities |
| ------------- | -------- | ------------------- |
| SQL database in Fabric | Managed SQL DB, schema from decorators | View, run read queries, copy connection string. **Read-only — schema changes only via code/`rayfin up`. Direct edits cause schema conflicts and can break the app.** |
| Authentication | Fabric brokered auth (Entra ID SSO) | View authenticated users |
| Static Content | Built frontend on OneLake at a public URL | View hosting URL; assets refresh each deploy |

Item properties show **App Backend URL** (services) and **App URL** (hosted frontend; Fabric SSO required to access).

## Item Permissions

| Permission | Allows |
| ---------- | ------ |
| Run and interact (default for workspace members) | Open the app, invoke backend APIs |
| Edit (Write) | Deploy code, apply schema, update settings, manage child services |
| Reshare | Grant access; requires workspace admin |

Workspace roles don't supersede item-level permissions.

## Local Development

- Full stack runs locally with **Docker** (frontend dev server, local database, auth emulation).
- Experimental pure-local mode (no cloud at all): see the `todo-local-experimental` template in awesome-rayfin.
- Local dev supports email/password auth; deployed apps are Fabric SSO only.

## Troubleshooting

| Symptom | Fix |
| ------- | --- |
| 401/403 on deploy | `npx rayfin login`, retry `npx rayfin up` |
| Unsure what deploy will change | `npx rayfin up --dry-run` |
| Schema apply refused | Destructive change detected; review ops, use `--force` only if data loss acceptable |
| Entity missing from API | Register in `rayfin/data/schema.ts`; verify `@one`/`@many` decorators present |
| App broken after portal DB edits | Schema drift — restore source-of-truth from code, redeploy `db apply` |
| Imports fail at runtime | Entity files need relative imports with `.js` extensions (ESM) |
