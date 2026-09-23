# Power BI to Fabric Notebooks — Transition Guide

## The Big Picture

In Power BI, your data pipeline looks like:
```
Data Sources → Dataflow (Power Query) → Semantic Model → Reports
```

In Fabric with Notebooks, it becomes:
```
Data Sources → Notebook (PySpark/Python) → Lakehouse (Delta Tables) → Semantic Model → Reports
```

The **Lakehouse** replaces the implicit storage inside your semantic model. Data lives as Delta tables in OneLake, and your semantic model connects to them via Direct Lake mode.

## Concept Mapping

### Data Ingestion

| Power BI | Fabric Notebook |
|---|---|
| Get Data → Web connector | `requests.get()` or `spark.read.format("csv").load(url)` |
| Get Data → SQL Server | `spark.read.format("jdbc").option("url", ...).load()` |
| Get Data → Excel | `pd.read_excel("/lakehouse/default/Files/data.xlsx")` |
| Get Data → SharePoint | Use Fabric Connection or ABFS paths |
| Get Data → Folder | `spark.read.parquet("Files/folder_name/*.parquet")` |
| Dataflow Gen2 as source | Write to Lakehouse table, read from notebook |

### Data Transformation

| Power Query Step | PySpark Equivalent |
|---|---|
| Remove Columns | `df = df.drop("col1", "col2")` |
| Rename Columns | `df = df.withColumnRenamed("old", "new")` |
| Change Type | `df = df.withColumn("col", col("col").cast("integer"))` |
| Filter Rows | `df = df.filter(col("status") == "Active")` |
| Sort Rows | `df = df.orderBy(col("date").desc())` |
| Group By | `df = df.groupBy("category").agg(sum("amount").alias("total"))` |
| Merge Queries (Join) | `df = df1.join(df2, "key_column", "left")` |
| Append Queries (Union) | `df = df1.union(df2)` |
| Add Custom Column | `df = df.withColumn("new_col", col("a") + col("b"))` |
| Conditional Column | `df = df.withColumn("tier", when(col("amt") > 100, "High").otherwise("Low"))` |
| Replace Values | `df = df.withColumn("col", regexp_replace("col", "old", "new"))` |
| Pivot | `df = df.groupBy("row_key").pivot("pivot_col").agg(sum("value"))` |
| Unpivot | Use `stack()` function or pandas `melt()` |
| Fill Down | Use Window functions: `last("col", True).over(window_spec)` |
| Remove Duplicates | `df = df.dropDuplicates(["col1", "col2"])` |
| Remove Errors | `df = df.filter(col("col").isNotNull())` |

### Data Loading

| Power BI | Fabric Notebook |
|---|---|
| Enable Load (checkbox) | `df.write.format("delta").saveAsTable("table_name")` |
| Disable Load | Simply don't write the DataFrame to a table |
| Incremental Refresh | `df.write.mode("append").format("delta").saveAsTable("table")` |
| Staging Only (reference query) | Keep as DataFrame variable, don't persist |

### Scheduling & Refresh

| Power BI | Fabric Notebook |
|---|---|
| Scheduled refresh | Notebook scheduler or Pipeline with Notebook Activity |
| Refresh now | Run notebook interactively or via Public API |
| Refresh failure alerts | Pipeline failure notifications |
| Gateway | Not needed — Lakehouse is in OneLake (cloud-native) |

### Parameters

| Power BI | Fabric Notebook |
|---|---|
| Power Query parameters | Python variables at top of notebook |
| Dynamic M parameters | `notebookutils.notebook.run("nb", 300, {"date": "2024-01-01"})` |
| Deployment pipeline rules | Deployment pipeline rules for default lakehouse |
| Current date parameter | `from datetime import date; today = date.today()` |

## Common "How Do I..." Translations

### "How do I connect to my SQL database?"
```python
# Like SQL Server connector in Power BI
jdbc_url = "jdbc:sqlserver://server.database.windows.net:1433;database=mydb"
df = spark.read.format("jdbc") \
    .option("url", jdbc_url) \
    .option("dbtable", "dbo.MyTable") \
    .option("user", "username") \
    .option("password", notebookutils.credentials.getSecret("vault-url", "secret-name")) \
    .load()
```

### "How do I do a VLOOKUP / merge?"
```python
# Like Merge Queries in Power Query
sales_df = spark.table("sales")
products_df = spark.table("products")

# Left join (like Left Outer in Power Query)
result = sales_df.join(products_df, sales_df.ProductID == products_df.ProductID, "left")
```

### "How do I handle dates?"
```python
from pyspark.sql.functions import year, month, dayofmonth, date_format, current_date, datediff

df = df.withColumn("year", year("OrderDate"))
df = df.withColumn("month_name", date_format("OrderDate", "MMMM"))
df = df.withColumn("days_ago", datediff(current_date(), "OrderDate"))
```

### "How do I create a date dimension table?"
```python
from pyspark.sql.functions import explode, sequence, to_date, year, month, dayofmonth, date_format, dayofweek

# Generate date range
date_df = spark.sql("""
    SELECT explode(sequence(to_date('2020-01-01'), to_date('2030-12-31'), interval 1 day)) as Date
""")

# Add date attributes
date_df = date_df \
    .withColumn("Year", year("Date")) \
    .withColumn("Month", month("Date")) \
    .withColumn("Day", dayofmonth("Date")) \
    .withColumn("MonthName", date_format("Date", "MMMM")) \
    .withColumn("DayOfWeek", dayofweek("Date")) \
    .withColumn("DayName", date_format("Date", "EEEE")) \
    .withColumn("Quarter", ((month("Date") - 1) / 3 + 1).cast("integer")) \
    .withColumn("YearMonth", date_format("Date", "yyyy-MM"))

date_df.write.mode("overwrite").format("delta").saveAsTable("dim_date")
```

### "How do I see what's in my lakehouse?"
```python
# Like browsing tables in Power BI Desktop
# List all files
notebookutils.fs.ls("Files/")

# List all tables
notebookutils.fs.ls("Tables/")

# Or use the Lakehouse Explorer sidebar (visual, no code needed)
# Or use SQL:
```
```sql
%%sql
SHOW TABLES;
DESCRIBE TABLE my_table;
```

## Medallion Architecture (Bronze/Silver/Gold)

This is the Fabric-recommended pattern, analogous to staging queries in Power Query:

| Layer | Power BI Equivalent | Purpose |
|---|---|---|
| **Bronze** | Staging queries (no Load) | Raw data ingestion, minimal transformation |
| **Silver** | Transformation queries | Cleaned, typed, deduplicated, joined |
| **Gold** | Final loaded tables | Business-ready aggregations, metrics |
| **Semantic Model** | The dataset itself | DAX measures, relationships, RLS |

```python
# Bronze: Ingest raw data
raw_df = spark.read.format("csv").option("header", "true").load("Files/raw/sales*.csv")
raw_df.write.mode("overwrite").format("delta").saveAsTable("bronze_sales")

# Silver: Clean and transform
silver_df = spark.table("bronze_sales") \
    .dropDuplicates(["OrderID"]) \
    .withColumn("Amount", col("Amount").cast("double")) \
    .withColumn("OrderDate", to_date("OrderDate", "MM/dd/yyyy")) \
    .filter(col("Amount").isNotNull())
silver_df.write.mode("overwrite").format("delta").saveAsTable("silver_sales")

# Gold: Business aggregations
gold_df = spark.table("silver_sales") \
    .groupBy("ProductCategory", "Year") \
    .agg(
        sum("Amount").alias("TotalSales"),
        count("OrderID").alias("OrderCount"),
        avg("Amount").alias("AvgOrderValue")
    )
gold_df.write.mode("overwrite").format("delta").saveAsTable("gold_sales_summary")
```

## Key Mindset Shifts

1. **Data persists independently** — Unlike Power BI where data lives inside the semantic model, Lakehouse tables exist in OneLake and can be shared across workspaces.

2. **Code replaces clicks** — Instead of clicking through Power Query steps, you write PySpark or Python code. SparkSQL (`%%sql`) is a great stepping stone for SQL-comfortable users.

3. **Delta Lake is your table format** — Every table in the Lakehouse Tables section is a Delta table (versioned, ACID-compliant Parquet files). This gives you time travel, schema evolution, and merge operations.

4. **Notebooks are collaborative artifacts** — Like Power BI reports, notebooks can be shared, version-controlled via Git, and deployed across environments.

5. **Compute is separate from storage** — Unlike Power BI where refresh uses capacity tied to your workspace, notebooks use Spark compute that scales independently. You choose Python (2-core) or PySpark (full Spark cluster).
