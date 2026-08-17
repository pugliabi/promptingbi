---
name: pugliabi-fabric-api
description: Authenticate to Tommy's Microsoft Fabric tenant (pugliabi.com) as the Claude-Fabric-MCP service principal and perform full item CRUD via the Fabric REST API — including creating AND populating notebooks (updateDefinition), which the local Fabric MCP server cannot do. Use whenever a Fabric task needs item definitions read or written, notebook content deployed, or any Fabric REST call the connected MCP tools don't cover. Triggers on "notebook project", "deploy notebook", "update notebook definition", "push code to Fabric", "create and populate", "Fabric API", or when core_create-item succeeds but content must be added.
---

# Puglia BI — Fabric API Access (Service Principal)

Zero-input authentication to Tommy's Fabric tenant for full REST API access.
No need to ask Tommy for tenant/client IDs — everything is in `credentials.env`
in this skill folder. If auth fails with invalid_client, the secret was rotated:
ask Tommy for the new secret and update `credentials.env`.

## Credentials

Read `credentials.env` (same folder). Contains TENANT_ID, CLIENT_ID, CLIENT_SECRET.
SP name: **Claude-Fabric-MCP** (principal id 96bc6091-cbd2-4e71-9be1-529c55964379).

## Auth pattern (client credentials)

```bash
TOKEN=$(curl -s -X POST "https://login.microsoftonline.com/$TENANT_ID/oauth2/v2.0/token" \
  -d "grant_type=client_credentials&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&scope=https://api.fabric.microsoft.com/.default" \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['access_token'])")
```

Use `scripts/fabric_api.py` for ready-made helpers (token, LRO polling, get/update
notebook definition). Run: `python3 scripts/fabric_api.py --help`.

## Key facts learned the hard way

- The SP's API access is gated by tenant setting **"Service principals can call
  Fabric public APIs"**, scoped to security groups (PBITenant, PBIScanner, PBIAdmin,
  *ADMIN PBI). The SP is a member of one; if API calls return
  `Unauthorized / "caller is not authenticated"`, membership or the setting changed.
  Propagation after changes takes ~15 min.
- The SP also needs a workspace role (Admin on "Puglia BI Consulting").
- The connected **local** Fabric MCP server (`@microsoft/fabric-mcp`) has only
  `core_create-item` + docs + OneLake tools — it CANNOT read/update item
  definitions. Use this skill's REST approach for that.
- Notebook definitions: `POST .../notebooks/{id}/getDefinition?format=ipynb` and
  `POST .../notebooks/{id}/updateDefinition?updateMetadata=false`. Both are LRO:
  202 + Location header -> poll until Succeeded -> for get, fetch `{op}/result`.
  Parts: `notebook-content.ipynb` (InlineBase64) + preserve `.platform` part.
- **ipynb gotcha:** cell `source` MUST be a list of strings (`splitlines(keepends=True)`),
  not a single string — otherwise updateDefinition fails with `InvalidNotebookContent`.
- Default lakehouse binding lives BOTH in notebook metadata
  (`metadata.dependencies.lakehouse`) and a first `%%configure -f` cell with
  `defaultLakehouse {name, id, workspaceId}`.
- Fabric CLI alternative in sandbox: `pip install ms-fabric-cli --break-system-packages`,
  then `fab config set encryption_fallback_enabled true`, `export FAB_TENANT_ID=...`,
  `fab auth login -u $CLIENT_ID -p $CLIENT_SECRET --tenant $TENANT_ID`.

## Direct Core MCP endpoint access (no connector needed)

The remote Fabric Core MCP (`https://api.fabric.microsoft.com/v1/mcp/core`) accepts
SP bearer tokens with scope `https://analysis.windows.net/powerbi/api/.default`
(NOT the fabric scope). It is **stateless** — no session ID needed. POST JSON-RPC:
`initialize`, `tools/list`, `tools/call`. Responses may be SSE (`data:` lines —
take the last one). Headers: Authorization Bearer, Content-Type application/json,
Accept `application/json, text/event-stream`.

Useful tools there that REST/local MCP lack convenient forms of: `create_folder`,
`bulk_move_items` (args: `{WorkspaceId, Details:{items:[ids], targetFolderId}}`),
`list_folders`, `update_item_definition`, `get_knowledge`.

Note: Claude Desktop's custom connector CANNOT connect to this endpoint (Entra
serves no RFC 8414 `/.well-known/oauth-authorization-server` metadata -> instant
"couldn't connect"). Direct token calls like above are the workaround.

## Known IDs

| Item | ID |
|---|---|
| Tenant (pugliabi.com) | 4510a959-aa93-4f35-a3f5-e2249f4d35f6 |
| Workspace: Puglia BI Consulting | 64bfe9b7-d4d8-4c1f-bf92-6a1b2cdd3ab3 |
| Folder: UsageTracking | 57b6538f-e870-4a85-b46a-99b92ae7490f |
| Lakehouse: UsageTracking_LH | 0bfb4c19-eb6e-4efc-8476-6e7cc417cbf6 |
| Notebook: Load_ActivityEvents_NB | 4a26985a-eaff-48f0-a035-33c285b5ff2a |
| Notebook: Backfill_ActivityEvents_NB | ea0cf6a3-144e-42c5-9503-e2032acff5d2 |
| Notebook: Transform_AppUsage_NB | 542dd8ec-68e0-4d50-b31d-e8cbe8633de7 |
| Notebook: Monitor_AppUsage_NB | 13c8a66f-090a-4dcd-80e3-bead55051e13 |

All of the above live in the UsageTracking folder in Puglia BI Consulting.
Tables: raw `app_activity_events`, silver `app_activity_events_clean`,
gold `gold_app_usage_daily`.

Other workspaces: fabricDev cc8c1b7e-194e-457c-a610-1553ec4dc268, BI@PugliaBI
3f5c22d5-9d54-4d39-b676-ee41ecd1b5df, ExpTesting 1ce134a2-6c1e-439d-b4aa-9aa8360916bd.

## Security

The secret is stored in plaintext in `credentials.env` on Tommy's machine — his
informed choice. Never echo the secret into chat output. If Tommy rotates it,
update the file. Prefer the Fabric Core MCP connector when connected
(`update_item_definition` etc. via his own identity).
