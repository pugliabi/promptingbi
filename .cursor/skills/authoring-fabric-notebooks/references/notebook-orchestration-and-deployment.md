# Notebook Orchestration & Deployment

## Running Notebooks

### Execution Methods
1. **Interactive**: Manual run via UI or REST API, runs under your identity
2. **Pipeline Activity**: Triggered from Fabric Data Factory pipeline
3. **Scheduler**: Built-in notebook scheduler for batch jobs
4. **Reference Run**: Called from another notebook via `notebookutils.notebook.run()`
5. **Public API**: REST API for on-demand execution

### Pipeline Notebook Activity
In Fabric Data Factory, the **Notebook activity** orchestrates notebook execution:
- Supports both Python and PySpark notebooks
- Passes parameters to notebooks
- Captures exit values
- Runs under the pipeline's last-modified user identity

### Reference Runs (Chaining Notebooks)

#### Run a Single Child Notebook
```python
# Basic call — default params, 90s timeout per cell
exitVal = notebookutils.notebook.run("ChildNotebook")

# With parameters and timeout
exitVal = notebookutils.notebook.run("ChildNotebook", 300, {"date": "2024-01-01", "mode": "full"})

# Cross-workspace
exitVal = notebookutils.notebook.run("ChildNotebook", 300, {"p1": "v1"}, "other_workspace_id")
```

#### Run Multiple Notebooks in Parallel (DAG)
```python
DAG = {
    "activities": [
        {
            "name": "load_sales",
            "path": "Bronze/Load_Sales",
            "timeoutPerCellInSeconds": 90,
            "args": {"source": "files/sales/*.csv"}
        },
        {
            "name": "load_products",
            "path": "Bronze/Load_Products",
            "timeoutPerCellInSeconds": 90
        },
        {
            "name": "transform_sales",
            "path": "Silver/Clean_Sales",
            "timeoutPerCellInSeconds": 120,
            "dependencies": ["load_sales"]
        },
        {
            "name": "build_summary",
            "path": "Gold/Sales_Summary",
            "timeoutPerCellInSeconds": 120,
            "dependencies": ["transform_sales", "load_products"]
        }
    ],
    "timeoutInSeconds": 43200,   # 12 hours for entire DAG
    "concurrency": 50            # Max concurrent notebooks
}

# Validate before running
notebookutils.notebook.validateDAG(DAG)

# Execute
result = notebookutils.notebook.runMultiple(DAG)
```

**Limits**:
- Max 50 concurrent notebooks for Spark, 25 for Python
- Default DAG timeout: 12 hours
- Default cell timeout: 90 seconds

#### Exit Values
```python
# In child notebook — return a value
notebookutils.notebook.exit("200 rows processed")

# In parent notebook — capture the value
result = notebookutils.notebook.run("ChildNotebook")
print(result)  # "200 rows processed"
```

### %run Magic (Alternative to Reference Run)
```python
# Run another notebook inline (shares Spark session and variables)
%run ChildNotebook
```
- Max nesting depth: 5 levels
- Max total referenced cells: 1000
- Shares variables between parent and child (unlike `notebookutils.notebook.run()`)

## High Concurrency Sessions

### What It Is
Run multiple notebooks within the same Spark session to save costs and reduce startup time.

### Configure
```python
%%configure
{
    "conf": {
        "spark.fabric.session.highConcurrency.enabled": "true"
    }
}
```

### In Pipelines
Configure high-concurrency notebook activities to share compute across multiple notebooks in the same pipeline run.

## Git Integration

### Setup
1. Go to **Workspace Settings** → **Git Integration**
2. Connect to Azure DevOps repo
3. Commit and sync notebooks through the **Source Control** panel

### Notebook Representation in Git
- Notebook code converts to a **source code file** (e.g., `notebook-content.py` for PySpark)
- NOT saved as `.ipynb` format
- Metadata (default lakehouse, environment) is preserved in the file
- **Cell outputs are NOT included** in Git
- **Notebook Resources files are NOT committed** (upcoming feature)
- Easier code reviews with built-in diff

### Best Practices for Git
- Manage notebooks and their dependent Environment items in the same workspace
- Use Git to version control both notebook and environment items together
- The default lakehouse ID persists in metadata — manually re-bind after syncing to new workspace
- Starting October 2024: Environment mapping is preserved when syncing to new workspace

## Deployment Pipelines

### How It Works
Deploy notebooks across Development → Test → Production stages:

1. Create a deployment pipeline (or use existing)
2. Assign workspaces to stages
3. Compare items between stages
4. Select notebooks and click **Deploy**

### Deployment Rules
- Parameterize the **default lakehouse** per notebook per stage
- Options: Same as source, N/A (no default), or specify a different lakehouse
- Lakehouse ID required when setting deployment rules
- Deployment rules override auto-binding

### Auto-Binding (Since October 2024)
When deploying notebooks:
- Default lakehouse is automatically replaced by matching item in target workspace
- Attached environment is auto-bound within the same workspace
- Deployment rules take priority over auto-binding

### Known Issues
- Frozen cell status is lost during deployment

## Notebook Public API

### Run a Notebook On-Demand
```
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances?jobType=RunNotebook
```

### Key API Operations
- List notebooks in workspace
- Get/create/update/delete notebooks
- Run notebooks on-demand
- Get run status/history

### For Python Notebooks via API
Ensure the `language` and `kernel` properties in notebook metadata are set correctly in the API payload.

## Event Stream Integration

Fabric notebooks can consume events from Eventstreams:
- Add a **Spark Notebook** as a destination in an Eventstream
- Process real-time events in micro-batches
- Write results to Lakehouse tables

## Fabric Connection Integration (Preview)

Use external data sources directly in notebooks via Fabric Connections:
1. Create connection in notebook → **Connections** pane → **Add connection**
2. Or use existing connections from Data Source Management
3. Enable "Allow this connection to be used in Code-First Artifact"
4. Auto-generates code snippets for data access

### Supported Auth Methods:
- Basic Authentication
- Account Key
- Token Authentication
- Workspace Identity
- Service Principal (SPN)

> OAuth2.0 is NOT supported for Fabric Connection in notebooks.

## Migration from Azure Synapse

### Key Differences:
- Fabric uses OneLake instead of Azure Storage linked services
- `mssparkutils` → `notebookutils` (backward compatible)
- Runtime versions may differ
- Some Synapse-specific features may not be available

### Steps:
1. Export notebooks from Synapse
2. Import into Fabric workspace
3. Update storage paths to OneLake/ABFS format
4. Update any `mssparkutils` references to `notebookutils`
5. Test with Fabric Spark runtime
