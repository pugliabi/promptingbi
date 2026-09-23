# Lakehouse Data Operations

## Path Types (Critical Knowledge)

### Relative Paths (Default Lakehouse Only — PySpark Notebooks)
```
Files/mydata.csv                    → Files section of default Lakehouse
Tables/mytable                      → Tables section (Delta format)
```

### ABFS Absolute Paths (Any Lakehouse — Works Everywhere)
```
abfss://<workspace_name>@onelake.dfs.fabric.microsoft.com/<lakehouse_name>.Lakehouse/Files/mydata.csv
abfss://<workspace_name>@onelake.dfs.fabric.microsoft.com/<lakehouse_name>.Lakehouse/Tables/mytable
```
> Copy these from the Lakehouse explorer context menu: **Copy ABFS path**

### Pandas Mount Point (Default Lakehouse Only — Notebooks Only)
```
/lakehouse/default/Files/mydata.csv
/lakehouse/default/Tables/mytable
```
> The `/lakehouse/default/` mount is ONLY available in notebooks, NOT in Spark Job Definitions.

### File API Path (For Pandas in Notebooks)
```
# Copy from context menu: "Copy File API Path"
/lakehouse/default/Files/mydata.csv
```

## Reading Data with Spark API (PySpark Notebooks)

### Read CSV
```python
df = spark.read.format("csv") \
    .option("header", "true") \
    .option("inferSchema", "true") \
    .load("Files/mydata.csv")
```

### Read Parquet
```python
df = spark.read.parquet("Files/mydata.parquet")
```

### Read JSON
```python
df = spark.read.format("json").load("Files/mydata.json")
```

### Read Delta Table
```python
# From Tables section (relative path)
df = spark.read.format("delta").load("Tables/my_table")

# Using table name (if registered in metastore)
df = spark.table("lakehouse_name.table_name")

# From ABFS path
df = spark.read.format("delta").load("abfss://workspace@onelake.dfs.fabric.microsoft.com/lakehouse.Lakehouse/Tables/my_table")
```

### Read from Another Lakehouse (ABFS required)
```python
df = spark.read.parquet("abfss://WorkspaceName@onelake.dfs.fabric.microsoft.com/OtherLakehouse.Lakehouse/Files/data.parquet")
```

## Writing Data with Spark API (PySpark Notebooks)

### Write as Delta Table (Recommended for Lakehouse Tables)
```python
# Overwrite — full replace
df.write.mode("overwrite").format("delta").saveAsTable("my_table_name")

# Append — add rows to existing table
df.write.mode("append").format("delta").saveAsTable("my_table_name")
```

### Write as CSV to Files Section
```python
df.write.mode("overwrite").format("csv") \
    .option("header", "true") \
    .save("Files/output_csv")
```

### Write as Parquet to Files Section
```python
df.write.mode("overwrite").format("parquet") \
    .save("Files/output_parquet")
```

### Partitioned Write
```python
df.write.mode("overwrite") \
    .format("delta") \
    .partitionBy("year", "month") \
    .saveAsTable("partitioned_table")
```

## Reading Data with Pandas API (Both Notebook Types)

### Using Mount Point (Default Lakehouse)
```python
import pandas as pd

# CSV
df = pd.read_csv("/lakehouse/default/Files/mydata.csv")

# Parquet
df = pd.read_parquet("/lakehouse/default/Files/mydata.parquet")

# JSON
df = pd.read_json("/lakehouse/default/Files/mydata.json")

# Excel
df = pd.read_excel("/lakehouse/default/Files/mydata.xlsx")
```

### Using ABFS Path (Different Lakehouse)
```python
import pandas as pd
df = pd.read_parquet("abfss://WorkspaceName@onelake.dfs.fabric.microsoft.com/LakehouseName.Lakehouse/Files/sample.parquet")
```

## Reading Delta Tables in Python Notebooks

```python
# Using delta-rs (pre-installed in Python notebooks)
import deltalake
dt = deltalake.DeltaTable("/lakehouse/default/Tables/my_table")
df = dt.to_pandas()

# Using DuckDB (pre-installed in Python notebooks)
import duckdb
conn = duckdb.connect()
df = conn.execute("""
    SELECT * FROM delta_scan('/lakehouse/default/Tables/my_table')
""").fetchdf()
```

## Drag-and-Drop Code Generation

The notebook UI can auto-generate read code:
1. Open Lakehouse Explorer in the notebook sidebar
2. Right-click a file or table
3. Select **Load data** → choose **Spark** or **Pandas**
4. A code cell is automatically inserted with the correct read snippet

Alternatively, drag a file from the explorer directly onto a code cell.

## Common Patterns for Power BI Pros

### "Get Data" Equivalent — Loading External Data
```python
# Like "Get Data from Web" in Power BI
import requests
import pandas as pd

url = "https://api.example.com/data"
response = requests.get(url)
df = pd.DataFrame(response.json())

# Save to Lakehouse (like "Load" in Dataflow)
spark_df = spark.createDataFrame(df)
spark_df.write.mode("overwrite").format("delta").saveAsTable("api_data")
```

### "Applied Steps" Equivalent — DataFrame Transformations
```python
# Like renaming columns in Power Query
df = df.withColumnRenamed("old_name", "new_name")

# Like filtering rows
from pyspark.sql.functions import col
df = df.filter(col("status") == "Active")

# Like adding a calculated column
from pyspark.sql.functions import col, when, lit
df = df.withColumn("category", 
    when(col("amount") > 1000, lit("High"))
    .otherwise(lit("Low"))
)

# Like changing data types
from pyspark.sql.functions import col
df = df.withColumn("amount", col("amount").cast("double"))
df = df.withColumn("date", col("date").cast("date"))
```

### "Incremental Refresh" Equivalent — Append Mode
```python
# Read new data only
new_data = spark.read.format("csv").option("header", "true").load("Files/new_batch/*.csv")

# Append to existing table (like incremental refresh)
new_data.write.mode("append").format("delta").saveAsTable("my_table")
```

### Using SparkSQL (Familiar to SQL Users)
```sql
%%sql
-- Create a table from Files
CREATE TABLE IF NOT EXISTS my_table
USING DELTA
AS SELECT * FROM parquet.`Files/mydata.parquet`;

-- Query like you would in Power BI SQL endpoint
SELECT category, SUM(amount) as total
FROM my_table
GROUP BY category
ORDER BY total DESC;
```

## Writing Data Back — Load Table API (Programmatic)

```python
# Load a CSV file into a Lakehouse table programmatically
notebookutils.lakehouse.loadTable(
    {
        "relativePath": "Files/myFile.csv",
        "pathType": "File",
        "mode": "Overwrite",
        "recursive": False,
        "formatOptions": {
            "format": "Csv",
            "header": True,
            "delimiter": ","
        }
    }, 
    "target_table_name", 
    "lakehouse_name",       # optional, defaults to default lakehouse
    "workspace_id"          # optional
)
```
