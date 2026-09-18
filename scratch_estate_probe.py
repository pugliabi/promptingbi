import sys, json, urllib.request
sys.path.insert(0, r".cursor\skills\pugliabi-fabric-api\scripts")
import fabric_api

tok = fabric_api.token()

def get(url):
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {tok}"})
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, json.load(r)
    except Exception as e:
        body = ""
        try:
            body = e.read().decode()[:300]
        except Exception:
            pass
        return getattr(e, "code", "ERR"), body

B = "https://api.fabric.microsoft.com/v1"
for path in ["/admin/workspaces?type=Workspace", "/admin/domains", "/admin/items?type=Lakehouse"]:
    s, d = get(B + path)
    print("==", path, "->", s)
    print(json.dumps(d, indent=1)[:900] if isinstance(d, (dict, list)) else d)
    print()
