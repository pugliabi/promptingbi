# Fabric Notebook Known Limitations

## Notebook Sizing
- **Notebook content**: Max 32 MB
- **Notebook snapshot**: Max 32 MB
- **Rich table output**: Max 10K rows or 5 MB
- **Resource storage** (built-in + environment): Max 500 MB total, 100 MB per file

## Execution Limits
- **Max code cells per execution**: 256 cells
- **Max job duration**: 7 days
- **Max concurrent notebooks** in `notebookutils.notebook.runMultiple()`: 50 (Spark), 25 (Python)
- **%run nesting depth**: 5 levels, max 1000 referenced cells
- **Notebook job history retention**: 60 days

## Session Configuration Constraints
- `driverMemory` must equal `executorMemory`
- `driverCores` must equal `executorCores`
- Executor sizes: (4, 28g), (8, 56g), (16, 112g), (32, 224g), (64, 400g)
- Capacity formula: (NumExecutors + 1) × ExecutorCores ≤ capacity limit

## Python Notebook Specific
- Does NOT support `notebookutils.session.stop()` or `notebookutils.session.restartPython()` for session management (use kernel restart instead)
- Does NOT support environment variables
- Delta Lake via delta-rs is partially compatible (some features unsupported)
- OOM risk with large datasets — use DuckDB, Polars, or PyArrow instead of pandas
- `notebookutils.fs.ls()` relative paths are relative to local filesystem, not Lakehouse

## Git Integration
- Notebook Resources files are NOT committed to Git (upcoming feature)
- Default lakehouse ID persists in metadata — manual re-binding needed after sync to new workspace
- Cell outputs are NOT included in Git

## Deployment Pipelines
- Frozen cell status is lost during deployment

## File System
- `notebookutils.fs.append()` and `notebookutils.fs.put()` do NOT support concurrent writes
- `notebookutils.fs.fastcp()` does NOT support cross-region OneLake copies
- Mounting ADLS Gen1 is NOT supported
- Mount is job-level — must explicitly unmount to release disk space

## Connection (Preview)
- OAuth2.0 is NOT supported for Fabric Connection in notebooks
- Workspace Identity auth: "Check status" cannot validate online/offline status

## Other
- `fabricClient` and `PBIClient` APIs in notebookutils are not yet supported (runtime > 1.2)
- Credentials API not supported in Scala notebooks
- Variable Library: same-workspace only, not supported cross-workspace in child reference runs
