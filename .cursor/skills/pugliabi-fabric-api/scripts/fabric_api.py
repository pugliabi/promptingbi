#!/usr/bin/env python3
"""Fabric REST API helper for Puglia BI. Auth via service principal in ../credentials.env.

Usage:
  python3 fabric_api.py token
  python3 fabric_api.py list-workspaces
  python3 fabric_api.py list-items <workspaceId>
  python3 fabric_api.py get-notebook <workspaceId> <notebookId> <out.ipynb>
  python3 fabric_api.py update-notebook <workspaceId> <notebookId> <in.ipynb>
  python3 fabric_api.py create-item <workspaceId> <type> <displayName>
"""
import json, base64, time, sys, os, urllib.request

def _creds():
    env = {}
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "credentials.env")
    with open(path) as f:
        for line in f:
            if "=" in line and not line.startswith("#"):
                k, v = line.strip().split("=", 1)
                env[k] = v
    return env

def token():
    c = _creds()
    body = (f"grant_type=client_credentials&client_id={c['CLIENT_ID']}"
            f"&client_secret={c['CLIENT_SECRET']}"
            f"&scope=https://api.fabric.microsoft.com/.default").encode()
    url = f"https://login.microsoftonline.com/{c['TENANT_ID']}/oauth2/v2.0/token"
    return json.load(urllib.request.urlopen(urllib.request.Request(url, data=body)))["access_token"]

BASE = "https://api.fabric.microsoft.com/v1"

def call(method, url, payload=None, tok=None):
    tok = tok or token()
    h = {"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}
    r = urllib.request.Request(url, method=method, headers=h,
                               data=json.dumps(payload).encode() if payload else None)
    resp = urllib.request.urlopen(r)
    return resp.status, dict(resp.headers), resp.read()

def lro(method, url, payload=None):
    """Call an endpoint; if 202, poll the LRO until done. Returns final bytes (result for gets)."""
    tok = token()
    st, hd, b = call(method, url, payload, tok)
    if st != 202:
        return b
    op = hd.get("Location") or hd.get("location")
    for _ in range(60):
        time.sleep(2)
        _, _, b2 = call("GET", op, tok=tok)
        s = json.loads(b2)
        if s.get("status") == "Succeeded":
            try:
                _, _, res = call("GET", op + "/result", tok=tok)
                return res
            except Exception:
                return b2
        if s.get("status") == "Failed":
            raise RuntimeError(f"LRO failed: {s}")
    raise TimeoutError("LRO polling timed out")

def get_notebook(ws, nb, out_path):
    res = json.loads(lro("POST", f"{BASE}/workspaces/{ws}/notebooks/{nb}/getDefinition?format=ipynb"))
    part = next(p for p in res["definition"]["parts"] if p["path"] == "notebook-content.ipynb")
    open(out_path, "wb").write(base64.b64decode(part["payload"]))
    return [p["path"] for p in res["definition"]["parts"]]

def update_notebook(ws, nb, in_path):
    # preserve .platform part
    cur = json.loads(lro("POST", f"{BASE}/workspaces/{ws}/notebooks/{nb}/getDefinition?format=ipynb"))
    parts = [{"path": "notebook-content.ipynb",
              "payload": base64.b64encode(open(in_path, "rb").read()).decode(),
              "payloadType": "InlineBase64"}]
    parts += [p for p in cur["definition"]["parts"] if p["path"] == ".platform"]
    lro("POST", f"{BASE}/workspaces/{ws}/notebooks/{nb}/updateDefinition?updateMetadata=false",
        {"definition": {"format": "ipynb", "parts": parts}})
    return "Succeeded"

if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] in ("-h", "--help"):
        print(__doc__)
    elif a[0] == "token":
        print(token())
    elif a[0] == "list-workspaces":
        print(json.dumps(json.loads(call("GET", f"{BASE}/workspaces")[2]), indent=1))
    elif a[0] == "list-items":
        print(json.dumps(json.loads(call("GET", f"{BASE}/workspaces/{a[1]}/items")[2]), indent=1))
    elif a[0] == "get-notebook":
        print("parts:", get_notebook(a[1], a[2], a[3]), "->", a[3])
    elif a[0] == "update-notebook":
        print(update_notebook(a[1], a[2], a[3]))
    elif a[0] == "create-item":
        print(call("POST", f"{BASE}/workspaces/{a[1]}/items",
                   {"type": a[2], "displayName": a[3]})[2].decode())
    else:
        print(__doc__)
