# Choosing Between Python and PySpark Notebooks

## Quick Decision Matrix

| Scenario | Recommended Notebook |
|---|---|
| Pre-installed DuckDB and Polars needed | Python Notebooks |
| Small to medium data (fits in memory) | Python Notebooks |
| Rapid exploration & prototyping | Python Notebooks |
| Large datasets (10GB+) exceeding memory | PySpark Notebooks |
| Complex data workflows or ETL pipelines | PySpark Notebooks |
| High-concurrency or parallel execution | PySpark Notebooks |
| Needs Spark-native APIs (MLlib, SQL, Streaming) | PySpark Notebooks |

## Python Notebooks (Lightweight)

**Compute**: 2-core VM (single node), ~5 second startup via starter pool
**Cost**: Lower — ideal for short tasks and prototyping
**Kernels**: Python 3.10 and Python 3.11
**Pre-installed**: DuckDB, Polars, Scikit-learn, delta-rs
**Delta Lake**: Partially compatible via delta-rs (some features unsupported)

### Choose Python When:
- Fast start-up needed (seconds)
- Minimizing compute cost is priority
- Want pip-installable libraries immediately
- Data fits in memory of a single node
- Need to test across Python runtime versions

### Key Differences from PySpark Notebooks:
- `notebookutils.fs.ls("Files")` uses local filesystem paths, NOT ABFS
  - In Python notebook: use `/lakehouse/default/Files` as base
  - In Spark notebook: `Files/` is relative to default Lakehouse ABFS
- No distributed compute — everything runs on single node
- No Spark session — use pandas, DuckDB, Polars instead
- Library install: `%pip install` and `!pip install` behave identically
- Restart kernel: use `notebookutils.session.restartPython()`

### Accessing Lakehouse Data in Python Notebooks:
```python
import pandas as pd

# Read from default Lakehouse (mount point)
df = pd.read_parquet("/lakehouse/default/Files/sample.parquet")

# Read delta table
import deltalake
dt = deltalake.DeltaTable("/lakehouse/default/Tables/my_table")
df = dt.to_pandas()

# Using DuckDB
import duckdb
conn = duckdb.connect()
df = conn.execute("SELECT * FROM read_parquet('/lakehouse/default/Files/sample.parquet')").fetchdf()
```

## PySpark Notebooks (Distributed)

**Compute**: Spark cluster (single-node or multi-node), starter pool ~5s or on-demand ~3min
**Cost**: Higher — minimum 4 vCores, suited for scalable workloads
**Languages**: PySpark, Scala, SparkSQL, SparkR
**Delta Lake**: Fully supported and optimized
**Features**: NEE, Autotune, VORDER, Vegas Cache, autoscaling

### Choose PySpark When:
- Workloads exceed single-node memory/compute
- Need high-concurrency pools for parallel jobs
- Orchestrating complex ETL with FAIR or FIFO scheduling
- Rely on Spark-native APIs (MLlib, Spark SQL, Streaming)
- Need production features (environment variables, item-based library management)

### Accessing Lakehouse Data in PySpark Notebooks:
```python
# Read from default Lakehouse (relative path)
df = spark.read.parquet("Files/sample.parquet")

# Read delta table
df = spark.read.format("delta").load("Tables/my_table")
# Or: 
df = spark.table("my_lakehouse.my_table")

# Write delta table
df.write.mode("overwrite").format("delta").saveAsTable("my_table")
```

## Evolution Path: Start Small, Scale Up

| Stage | Notebook | Trigger |
|---|---|---|
| **Start** | Python (2-core) | Small, interactive workloads |
| **Scale Up** | Python (larger VM via %%configure) | Approaching memory/CPU limits |
| **Scale Out** | PySpark (Spark cluster) | Need distributed compute or parallelism |

> **Tip**: When transitioning from Python to PySpark, ensure code uses Spark-compatible syntax. Validate workloads in Spark environment before deploying to production.

## Glossary

- **NEE (Native Execution Engine)**: Optimized query engine unique to Fabric Spark
- **VORDER**: Fabric optimization for vectorized query execution paths
- **Vegas Cache**: In-memory cache for faster repeated Spark data access
- **FAIR Scheduling**: Allocates resources fairly across concurrent Spark jobs
- **FIFO Scheduling**: First-In-First-Out execution order
- **Starter Pool**: Pre-warmed compute container for near-instant startup
