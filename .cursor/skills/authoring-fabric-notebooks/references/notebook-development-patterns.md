# Notebook Development Patterns & Best Practices

## Magic Commands

### Language Switching (PySpark Notebooks)
```
%%pyspark    — Python (default for PySpark notebooks)
%%spark      — Scala
%%sql        — SparkSQL
%%html       — HTML
%%sparkr     — R
```

### T-SQL Magic (Query Warehouses/SQL Endpoints)
```sql
%%tsql
-- Connect to a Warehouse or SQL endpoint
-- Available in both PySpark and Python notebooks
SELECT TOP 10 * FROM dbo.SalesTable
```

### Session Configuration (Must Be First Cell)
```json
%%configure
{
    "defaultLakehouse": {
        "name": "MyLakehouse",
        "id": "<lakehouse-guid>",
        "workspaceId": "<workspace-guid>"
    },
    "driverMemory": "28g",
    "driverCores": 4,
    "executorMemory": "28g",
    "executorCores": 4,
    "numExecutors": 2
}
```

**For Python notebooks**, `%%configure` supports:
- Custom compute node size
- Mount points
- Default lakehouse

**Executor size options**: (4, 28g), (8, 56g), (16, 112g), (32, 224g), (64, 400g)
**Rule**: driverMemory must equal executorMemory; driverCores must equal executorCores.
**Capacity formula**: (NumExecutors + 1) × ExecutorCores must stay within capacity limits.

## Library Management

### PySpark Notebooks
```python
# Inline install (session-scoped)
%pip install great-expectations
%pip install /path/to/custom_package.whl

# Conda (alternative)
%conda install -c conda-forge plotly
```

### Python Notebooks
```python
# %pip and !pip behave identically in Python notebooks
%pip install polars
!pip install duckdb

# Restart kernel after install if needed (RECOMMENDED method)
notebookutils.session.restartPython()

# NOT recommended (but works):
# import sys; sys.exit(0)
```

### Notebook Resources Folder
Upload small files (scripts, CSVs, configs) to the built-in Resources folder:
- Max storage: 500 MB total
- Max single file: 100 MB
- Drag-and-drop from local machine
- Access via local path in code
- Files are tied to the notebook, separate from OneLake

## Best Practices for Power BI Pros

### 1. Use Markdown Cells for Documentation
Like adding descriptions to Power Query steps — document what each cell does:
```markdown
## Step 1: Load Raw Sales Data
Load the monthly sales CSV files from the Bronze layer
and perform initial data type conversions.
```

### 2. Modularize with Functions
Like reusable Power Query functions:
```python
def clean_column_names(df):
    """Standardize column names — lowercase, replace spaces with underscores."""
    for col_name in df.columns:
        new_name = col_name.lower().replace(" ", "_").replace("-", "_")
        df = df.withColumnRenamed(col_name, new_name)
    return df

def cast_date_columns(df, date_cols):
    """Cast string columns to date type."""
    from pyspark.sql.functions import to_date
    for col_name in date_cols:
        df = df.withColumn(col_name, to_date(col_name, "yyyy-MM-dd"))
    return df
```

### 3. Separate Notebooks by Layer (Bronze/Silver/Gold)
Like separating Dataflows for staging vs. transformation:
```
📁 Bronze/
  📓 Load_Sales_Raw.py
  📓 Load_Products_Raw.py
📁 Silver/
  📓 Clean_Sales.py
  📓 Clean_Products.py
📁 Gold/
  📓 Build_Sales_Summary.py
📁 Orchestration/
  📓 Run_All.py          ← calls others via notebookutils.notebook.run()
```

### 4. Define Schemas as Code
Like defining column types in Power Query:
```python
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, DoubleType, DateType

sales_schema = StructType([
    StructField("OrderID", StringType(), False),
    StructField("ProductName", StringType(), True),
    StructField("Quantity", IntegerType(), True),
    StructField("UnitPrice", DoubleType(), True),
    StructField("OrderDate", DateType(), True),
])

df = spark.read.format("csv") \
    .option("header", "true") \
    .schema(sales_schema) \
    .load("Files/raw/sales.csv")
```

### 5. Use Parameters for Reusability
Like Power Query parameters:
```python
# Define at top of notebook (can be overridden by pipeline or reference run)
source_folder = "Files/raw/2024/"
target_table = "silver_sales"
write_mode = "overwrite"

# Use throughout
df = spark.read.parquet(source_folder)
df.write.mode(write_mode).format("delta").saveAsTable(target_table)
```

### 6. Error Handling
```python
try:
    df = spark.read.parquet("Files/data.parquet")
    df.write.mode("overwrite").format("delta").saveAsTable("output_table")
    notebookutils.notebook.exit("SUCCESS")
except Exception as e:
    print(f"Error: {str(e)}")
    notebookutils.notebook.exit(f"FAILED: {str(e)}")
```

## Security Best Practices

### Before Running a Notebook Manually:
- Check who last modified the notebook
- Use version history to review content changes before executing

### Execution Identity:
- **Interactive run**: Runs under YOUR identity
- **Pipeline activity**: Runs under the pipeline's LAST MODIFIED user identity
- **Scheduled run**: Runs under whoever created/last updated the schedule

### Secret Management:
- Never hardcode credentials in notebook code
- Use `notebookutils.credentials.getSecret()` with Azure Key Vault
- Notebook outputs automatically redact secrets

## Visualization in Notebooks

### Built-in Table Display
```python
display(df)          # Rich table with sorting, filtering, aggregation
df.show()            # Simple text output
```
> Table output limited to 10K rows or 5 MB.

### Built-in Chart
```python
display(df)          # Then click the Chart icon in the output toolbar
# Supports: bar, line, area, scatter, pie, donut, map
```

### Matplotlib / Seaborn
```python
import matplotlib.pyplot as plt
import seaborn as sns

fig, ax = plt.subplots(figsize=(10, 6))
pdf = df.toPandas()
sns.barplot(data=pdf, x="category", y="total_sales", ax=ax)
plt.title("Sales by Category")
display(fig)
```

## Copilot in Notebooks

Fabric Notebooks include AI-powered Copilot features:
- **Inline code completion**: Suggests Python code as you type
- **Chat pane**: Ask questions about your data or get code suggestions
- **Chat magics**: Use `%%chat` magic to interact with Copilot directly in code cells

## Cell Operations Quick Reference

| Operation | Shortcut (Command Mode) |
|---|---|
| Insert cell above | A |
| Insert cell below | B |
| Delete cell | DD (press D twice) |
| Cut cell | X |
| Copy cell | C |
| Paste cell | V |
| Move cell up | Ctrl+Alt+↑ |
| Move cell down | Ctrl+Alt+↓ |
| Toggle line numbers | L |
| Undo | Z |
| Convert to Code | Y |
| Convert to Markdown | M |
| Run cell | Shift+Enter |
| Run cell, stay | Ctrl+Enter |
| Run all | Run All button or Ctrl+Shift+Enter |
