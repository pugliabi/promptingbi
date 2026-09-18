# nb_estate_audit - central BI's read-only inventory of the Fabric estate.
# Every call is a GET. This notebook creates nothing, fixes nothing, and is safe
# to schedule. The asserts at the bottom are the actual deliverable.
import collections, json, time, urllib.error, urllib.parse, urllib.request
import sys
sys.path.insert(0, r".cursor\skills\pugliabi-fabric-api\scripts")
import fabric_api

API = "https://api.fabric.microsoft.com/v1"
TOKEN = fabric_api.token()  # notebookutils.credentials.getToken(...) in Fabric

def get(path, tries=6):
    """GET with backoff. The admin endpoints throttle at 429 and they mean it."""
    for attempt in range(tries):
        req = urllib.request.Request(API + path, headers={"Authorization": f"Bearer {TOKEN}"})
        try:
            with urllib.request.urlopen(req) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < tries - 1:
                time.sleep(2 ** attempt)
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

workspaces = page("/admin/workspaces?type=Workspace", "workspaces")
domains = {d["id"]: d["displayName"] for d in get("/admin/domains")["domains"]}
items = page("/admin/items", "itemEntities")

# ---- Validation ----
kind = collections.Counter(i["type"] for i in items)
per_ws = collections.Counter(i["workspaceId"] for i in items)

undomained = [w["name"] for w in workspaces if not w.get("domainId")]
empty = [w["name"] for w in workspaces if per_ws[w["id"]] == 0]
stale = [i for i in items if i.get("lastUpdatedDate", "")[:4] < "2025"]

print(f"workspaces {len(workspaces)} | items {len(items)} | domains {len(domains)}")
print(f"undomained {len(undomained)} | empty {len(empty)} | untouched since 2025 {len(stale)}")
print(f"semantic models {kind['SemanticModel']} vs reports {kind['Report']}")

assert not undomained, f"{len(undomained)} workspaces carry no domain: {undomained[:5]}"
assert kind["SemanticModel"] <= kind["Report"] * 0.5, \
    f"model-per-report sprawl: {kind['SemanticModel']} models for {kind['Report']} reports"
assert not empty, f"empty workspaces, retire them or fill them: {empty}"
