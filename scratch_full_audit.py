import collections, json, time, urllib.error, urllib.parse, urllib.request, sys
sys.path.insert(0, r".cursor\skills\pugliabi-fabric-api\scripts")
import fabric_api

API = "https://api.fabric.microsoft.com/v1"
TOKEN = fabric_api.token()

def get(path, tries=6):
    for attempt in range(tries):
        req = urllib.request.Request(API + path, headers={"Authorization": f"Bearer {TOKEN}"})
        try:
            with urllib.request.urlopen(req) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < tries - 1:
                wait = int(e.headers.get("Retry-After") or 2 ** attempt)
                print(f"  429, Retry-After={e.headers.get('Retry-After')}, sleeping {wait}s")
                time.sleep(wait)
                continue
            raise

def page(path, key):
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
items = page("/admin/items", "itemEntities")

no_group_admin, bus_factor_one = [], []
for w in workspaces:
    admins = [a["principal"] for a in get(f"/admin/workspaces/{w['id']}/users")["accessDetails"]
              if a["workspaceAccessDetails"]["workspaceRole"] == "Admin"]
    if not any(p["type"] == "Group" for p in admins):
        no_group_admin.append(w["name"])
    if len(admins) == 1 and admins[0]["type"] == "User":
        bus_factor_one.append(f"{w['name']} ({admins[0]['displayName']})")

print("no group admin:", len(no_group_admin))
print("bus factor 1:", len(bus_factor_one))
print(bus_factor_one[:6])
