---
title: "The Fabric Estate Audit: What Central BI Should Be Able to Answer Without a Meeting"
description: "A read-only notebook that inventories every workspace, item, domain, and admin in the tenant, then asserts the governance rules you claim to have."
category: notebooks
date: 2026-09-18T09:00:00Z
format: python
source:
  permalink: "2026/09/18/central-bi-is-a-tiger-team-now"
draft: false
---

Past a few dozen workspaces, the Fabric portal is a browsing tool, not a management tool. This is the audit I run instead. Every call is a GET, so it creates nothing and fixes nothing, and it's safe to schedule. The post shows the first half; this is the whole thing, including the per-workspace role checks that find the workspaces exactly one human can administer.

## The client

Two helpers carry the whole notebook: one that survives throttling, and one that actually finishes a list.

```python
# nb_estate_audit - central BI's read-only inventory of the Fabric estate.
# Creates nothing, fixes nothing. The asserts at the bottom are the deliverable.
import collections, json, time, urllib.error, urllib.parse, urllib.request
import notebookutils

API = "https://api.fabric.microsoft.com/v1"
TOKEN = notebookutils.credentials.getToken("https://api.fabric.microsoft.com")

def get(path, tries=6):
    """GET that honors Retry-After. The admin endpoints throttle, and they mean it."""
    for attempt in range(tries):
        req = urllib.request.Request(API + path, headers={"Authorization": f"Bearer {TOKEN}"})
        try:
            with urllib.request.urlopen(req) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < tries - 1:
                time.sleep(int(e.headers.get("Retry-After") or 2 ** attempt))
                continue
            raise

def page(path, key):
    """Admin list endpoints are paginated. An unpaginated call does not error, it lies."""
    out, token = [], None
    while True:
        sep = "&" if "?" in path else "?"
        suffix = f"{sep}continuationToken={urllib.parse.quote(token)}" if token else ""
        body = get(path + suffix)
        out += body.get(key, [])
        token = body.get("continuationToken")
        if not token:
            return out
```

Outside a Fabric notebook, swap the `notebookutils` line for a service principal client-credentials token against scope `https://api.fabric.microsoft.com/.default`. Nothing else changes.

## The inventory

```python
workspaces = page("/admin/workspaces?type=Workspace", "workspaces")
domains = {d["id"]: d["displayName"] for d in get("/admin/domains")["domains"]}
items = page("/admin/items", "itemEntities")

print(f"workspaces {len(workspaces)} | items {len(items)} | domains {len(domains)}")
print(collections.Counter(i["type"] for i in items).most_common())
```

The type counter is worth reading every single run. It's the fastest answer to "what kind of shop are we actually," and the number that matters is semantic models against reports.

## Who can administer what

This is the half the portal will genuinely never give you. One call per workspace, so pace it and let `Retry-After` do its job.

```python
no_group_admin, bus_factor_one, guests = [], [], []

for w in workspaces:
    access = get(f"/admin/workspaces/{w['id']}/users")["accessDetails"]
    admins = [a["principal"] for a in access
              if a["workspaceAccessDetails"]["workspaceRole"] == "Admin"]

    # An individual as sole admin is a person-shaped single point of failure.
    if not any(p["type"] == "Group" for p in admins):
        no_group_admin.append(w["name"])
    if len(admins) == 1 and admins[0]["type"] == "User":
        bus_factor_one.append(f"{w['name']} ({admins[0]['displayName']})")

    # Anyone outside the tenant holding a write role is a finding, always.
    guests += [f"{w['name']}: {a['principal'].get('displayName')}" for a in access
               if "#EXT#" in (a["principal"].get("userDetails", {})
                              .get("userPrincipalName") or "")
               and a["workspaceAccessDetails"]["workspaceRole"] != "Viewer"]
```

## Validation

The asserts are the point. Everything above is just collection.

```python
# ---- Validation ----
kind = collections.Counter(i["type"] for i in items)
per_ws = collections.Counter(i["workspaceId"] for i in items)

undomained = [w["name"] for w in workspaces if not w.get("domainId")]
empty = [w["name"] for w in workspaces if per_ws[w["id"]] == 0]
stale = [i for i in items if i.get("lastUpdatedDate", "")[:4] < "2025"]

print(f"undomained {len(undomained)} | empty {len(empty)} | stale {len(stale)}")
print(f"no group admin {len(no_group_admin)} | bus factor 1 {len(bus_factor_one)}")
print(f"semantic models {kind['SemanticModel']} vs reports {kind['Report']}")

assert not undomained, f"{len(undomained)} workspaces carry no domain: {undomained[:5]}"
assert not empty, f"empty workspaces, retire them or fill them: {empty}"
assert not guests, f"external principals with write access: {guests}"
assert not bus_factor_one, f"workspaces with a single human admin: {bus_factor_one[:5]}"
assert kind["SemanticModel"] <= kind["Report"] * 0.5, \
    f"model-per-report sprawl: {kind['SemanticModel']} models for {kind['Report']} reports"
assert len(stale) <= len(items) * 0.25, \
    f"{len(stale)} of {len(items)} items untouched since 2025, nobody is retiring anything"
```

Run against my own tenant, that block reports 40 workspaces, 816 items, 3 domains, 39 workspaces with no domain, 30 with no group admin, 18 administered by exactly one human, 529 items untouched since 2025, and 267 semantic models against 273 reports. Six of the seven asserts fail. That is the correct outcome for a first run and the reason to run it.

## Adapting it

- **Honor `Retry-After`, don't invent a backoff.** A plain `2 ** attempt` looks responsible and dies anyway. The tenant asked me for 55 seconds while my code slept for 8. The server knows; the code does not.
- **Never call a list endpoint without `page()`.** A bare `/admin/items` returned 96 items against a tenant holding 816. It did not throw and it did not warn. Governance numbers built on an unpaginated call are wrong in the direction that looks believable.
- **Tune the model-to-report ratio to your shop, then hold the line.** Roughly one model per report means near-identical tables are being rebuilt per report. The threshold is arguable; having no threshold is not.
- **`bus_factor_one` is the assert to run first at a client.** It names, in one list, every workspace that dies with one person's account. Groups as admins, always, even for a workspace of one.
- **Write asserts that fail on day one.** A governance report that passes immediately was not measuring anything. Fix the tenant until it passes; don't soften the rule until it passes.
- **Keep it read-only forever.** The moment this notebook can write, someone will schedule it to "clean up" and delete a workspace that mattered. It proposes. A human deletes.
