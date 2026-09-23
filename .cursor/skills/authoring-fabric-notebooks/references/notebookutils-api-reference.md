# NotebookUtils API Reference

> **IMPORTANT**: MSSparkUtils has been renamed to **NotebookUtils**. The `mssparkutils` namespace is backward compatible but deprecated. Always use `notebookutils.*` for new code. Works with Spark 3.4 (Runtime v1.2) and above.

## Getting Help

```python
notebookutils.help()                           # List all modules
notebookutils.fs.help()                        # Help for file system module
notebookutils.fs.help("methodName")            # Help for specific method
```

## File System Utilities (`notebookutils.fs`)

### List Files
```python
# Spark notebook — relative path is relative to default Lakehouse ABFS
notebookutils.fs.ls("Files/tmp")

# Python notebook — relative path is relative to /home/trusted-service-user/work
# Use full path instead:
notebookutils.fs.ls("/lakehouse/default/Files")

# ABFS path (works everywhere)
notebookutils.fs.ls("abfss://<container>@<storage>.dfs.core.windows.net/<path>")

# View file properties
files = notebookutils.fs.ls('Files/')
for file in files:
    print(file.name, file.isDir, file.isFile, file.path, file.size)
```

### Create Directory
```python
notebookutils.fs.mkdirs("Files/new_folder")
```

### Copy File
```python
notebookutils.fs.cp("source_path", "dest_path", recurse=True)
```

### Fast Copy (Large Data)
```python
# Uses azcopy under the hood — much faster for large volumes
notebookutils.fs.fastcp("source_path", "dest_path", recurse=True)
```
> `fastcp` does NOT support cross-region OneLake copies. Use `cp` for those.

### Move File
```python
notebookutils.fs.mv("source", "dest", True)           # createPath=True
notebookutils.fs.mv("source", "dest", True, True)     # createPath=True, overwrite=True
```

### Write File
```python
notebookutils.fs.put("Files/output.txt", "content here", True)  # overwrite=True
```

### Append to File
```python
notebookutils.fs.append("Files/log.txt", "new line\n", True)  # createIfNotExists=True
```
> `put()` and `append()` do NOT support concurrent writes to the same file.

### Read File Head
```python
content = notebookutils.fs.head("Files/sample.txt", 1024 * 100)  # first 100KB
```

### Delete
```python
notebookutils.fs.rm("Files/old_data", recurse=True)
```

### Check Existence
```python
exists = notebookutils.fs.exists("Files/myfile.csv")
```

## Mount / Unmount (`notebookutils.fs`)

### Mount ADLS Gen2
```python
# Using account key (store in Key Vault)
accountKey = notebookutils.credentials.getSecret("<vaultURI>", "<secretName>")
notebookutils.fs.mount(
    "abfss://mycontainer@storageaccount.dfs.core.windows.net",
    "/test",
    {"accountKey": accountKey}
)

# Using SAS token
sasToken = notebookutils.credentials.getSecret("<vaultURI>", "<secretName>")
notebookutils.fs.mount(
    "abfss://mycontainer@storageaccount.dfs.core.windows.net",
    "/test",
    {"sasToken": sasToken}
)
```

### Mount a Lakehouse
```python
notebookutils.fs.mount(
    "abfss://<workspace>@onelake.dfs.fabric.microsoft.com/<lakehouse>.Lakehouse",
    "/my_mount"
)
```

### Mount Parameters
- `fileCacheTimeout`: Default 120 seconds. Set to 0 to always fetch latest.
- `timeout`: Default 120 seconds. Increase for many executors.

```python
notebookutils.fs.mount("abfss://...", "/test", {"fileCacheTimeout": 0, "timeout": 300})
```

### Access Mounted Files
```python
# Via notebookutils
path = notebookutils.fs.getMountPath("/test")
notebookutils.fs.ls(f"file://{path}")

# Via local filesystem
with open(notebookutils.fs.getMountPath('/test') + "/myFile.txt", "r") as f:
    print(f.read())
```

### Unmount
```python
notebookutils.fs.unmount("/test")
```

### List Mounts
```python
notebookutils.fs.mounts()
```

## Notebook Utilities (`notebookutils.notebook`)

### Reference Run (Call Another Notebook)
```python
# Run with default parameters, 90-second timeout
exitVal = notebookutils.notebook.run("ChildNotebook")

# Run with parameters and custom timeout (seconds)
exitVal = notebookutils.notebook.run("ChildNotebook", 300, {"param1": "value1"})

# Run notebook in another workspace
exitVal = notebookutils.notebook.run("ChildNotebook", 300, {"p1": "v1"}, "other_workspace_id")
```

### Run Multiple Notebooks in Parallel (DAG)
```python
DAG = {
    "activities": [
        {"name": "nb_A", "path": "NotebookA", "timeoutPerCellInSeconds": 90},
        {"name": "nb_B", "path": "NotebookB", "timeoutPerCellInSeconds": 90, "dependencies": ["nb_A"]},
        {"name": "nb_C", "path": "NotebookC", "timeoutPerCellInSeconds": 90, "dependencies": ["nb_A"]},
        {"name": "nb_D", "path": "NotebookD", "timeoutPerCellInSeconds": 90, "dependencies": ["nb_B", "nb_C"]},
    ],
    "timeoutInSeconds": 43200,   # 12 hours max for whole DAG
    "concurrency": 50            # max concurrent (default 50 Spark, 25 Python)
}

result = notebookutils.notebook.runMultiple(DAG)

# Validate DAG before running
notebookutils.notebook.validateDAG(DAG)
```

### Exit Notebook with Value
```python
notebookutils.notebook.exit("success")   # Return value to caller
```

### Manage Notebooks Programmatically
```python
# Create
notebookutils.notebook.create("name", "description", "content", "lakehouse_name", "lakehouse_ws_id")

# Get
nb = notebookutils.notebook.get("name")

# Update
notebookutils.notebook.update("old_name", "new_name", "description")

# Delete
notebookutils.notebook.delete("name")

# List
notebooks = notebookutils.notebook.list()  # or with workspace_id
```

## Credentials Utilities (`notebookutils.credentials`)

### Get Azure Key Vault Secret
```python
secret = notebookutils.credentials.getSecret("https://myvault.vault.azure.net/", "secretName")
```

### Get Access Token
```python
# Available audience keys: "storage", "pbi", "keyvault", "kusto"
token = notebookutils.credentials.getToken("storage")
pbi_token = notebookutils.credentials.getToken("pbi")
```

### Get Connection Credentials (Fabric Connection)
```python
import json
connection_id = "9d405da3-3d11-481a-9022-xxxxx"
credential = notebookutils.connections.getCredential(connection_id)
cred_dict = json.loads(credential['credential'])
```

## Lakehouse Utilities (`notebookutils.lakehouse`)

```python
# Create
notebookutils.lakehouse.create("MyLakehouse", "description")

# Create with schema support
notebookutils.lakehouse.create("MyLakehouse", "", {"enableSchemas": True})

# Get
lh = notebookutils.lakehouse.get("MyLakehouse")

# List all
lakehouse_list = notebookutils.lakehouse.list()

# List tables
tables = notebookutils.lakehouse.listTables("MyLakehouse")

# Load table from file
notebookutils.lakehouse.loadTable(
    {
        "relativePath": "Files/myFile.csv",
        "pathType": "File",
        "mode": "Overwrite",
        "recursive": False,
        "formatOptions": {"format": "Csv", "header": True, "delimiter": ","}
    },
    "target_table", "lakehouse_name"
)

# Delete
notebookutils.lakehouse.delete("MyLakehouse")
```

## Runtime Context (`notebookutils.runtime`)

```python
ctx = notebookutils.runtime.context

# Key properties:
ctx["currentNotebookName"]           # Notebook name
ctx["currentWorkspaceName"]          # Workspace name
ctx["defaultLakehouseName"]          # Default Lakehouse name
ctx["defaultLakehouseId"]            # Default Lakehouse ID
ctx["isForPipeline"]                 # True if running from pipeline
ctx["isReferenceRun"]                # True if called via notebook.run()
ctx["userId"]                        # Current user ID
ctx["userName"]                      # Current user name
```

## Variable Library Utilities (`notebookutils.variableLibrary`)

```python
# Get entire library
vl = notebookutils.variableLibrary.getLibrary("myVariableLib")
print(vl.my_variable_name)

# Get single variable by reference
val = notebookutils.variableLibrary.get("$(/**/myVariableLib/my_variable)")

# Dynamic path construction
file_path = f"abfss://{vl.Workspace_name}@onelake.dfs.fabric.microsoft.com/{vl.Lakehouse_name}.Lakehouse/Files/data.csv"
```
> Variable Library only supports same-workspace access. Cross-workspace not supported in child reference runs.

## Session Management

```python
# Stop interactive session (releases resources)
notebookutils.session.stop()

# Restart Python interpreter (keeps Spark session)
notebookutils.session.restartPython()
```

## User Data Functions (UDF)

```python
# Get functions from a UDF item
myFunctions = notebookutils.udf.getFunctions("UDFItemName")

# Invoke a function
result = myFunctions.functionName("value1", "value2")

# View function details
display(myFunctions.functionDetails)
```
