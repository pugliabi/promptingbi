---
name: fabric-tmdl-semantic-models
description: Expert guidance for working with Tabular Model Definition Language (TMDL) in Microsoft Fabric git-integrated workspaces. Use when working with Power BI semantic models in TMDL format (.tmdl files), converting between TMSL and TMDL, authoring DAX/M code in semantic model definitions, integrating with Fabric Lakehouses and OneLake, or implementing git-based collaboration workflows for Power BI projects. Triggered by phrases like "create TMDL", "modify semantic model", "add measure to TMDL", "TMDL syntax", "git Power BI project", "Fabric workspace git integration", "convert to TMDL format".
---

# Fabric TMDL Semantic Models Skill

Expert guidance for authoring and managing Power BI semantic models using Tabular Model Definition Language (TMDL) in Microsoft Fabric git-integrated workspaces.

## Quick Start

TMDL is a human-readable, git-friendly alternative to TMSL (model.bim JSON). Key characteristics:

- **Whitespace-based**: Uses tab indentation (like YAML) to denote hierarchy
- **File-per-object**: Each table, role, perspective gets its own .tmdl file
- **Two operators**: `=` for expressions (DAX/M), `:` for properties
- **camelCase**: Object types, keywords, enum values
- **Descriptions**: Use `///` triple-slash syntax above objects

## Folder Structure

```
<ProjectName>.SemanticModel/
├── definition/                 # TMDL format
│   ├── database.tmdl          # Database settings
│   ├── model.tmdl             # Model settings + ref declarations
│   ├── relationships.tmdl     # All relationships
│   ├── expressions.tmdl       # Shared expressions (M parameters)
│   ├── dataSources.tmdl       # Data sources
│   ├── functions.tmdl         # DAX functions
│   ├── tables/                # One file per table
│   ├── roles/                 # One file per role
│   ├── perspectives/          # One file per perspective
│   └── cultures/              # One file per translation
├── definition.pbism           # Core settings
└── .pbi/
    ├── localSettings.json     # Local-only (gitignore)
    └── cache.abf              # Local cache (gitignore)
```

## Core Syntax Patterns

### Indentation Rules
- Single tab per level (never spaces)
- Three levels max: 1) Object, 2) Properties, 3) Multi-line expressions
- Multi-line expressions indented deeper than properties

### Assignment Operators
- **Equals (`=`)**: Default properties, all expressions (DAX, M)
- **Colon (`:`)**: Non-expression properties, model references

### Object Declaration
```tmdl
objectType ObjectName [= defaultPropertyValue]
	property: value
	expressionProperty = expression
```

## Essential Patterns

### Table with Columns and Measures
```tmdl
/// Sales fact table
table Sales
	
	column SalesId
		dataType: int64
		isKey
		isHidden
		sourceColumn: SalesId
		summarizeBy: none
	
	column OrderDate
		dataType: dateTime
		formatString: Short Date
		sourceColumn: OrderDate
		summarizeBy: none
	
	/// Total sales amount
	measure 'Sales Amount' = SUM(Sales[Amount])
		formatString: $#,##0.00
		displayFolder: Base Measures
	
	/// Multi-line DAX with variables
	measure 'Sales YTD' = 
			VAR YTDFilter = DATESYTD(Calendar[Date])
			RETURN
			CALCULATE([Sales Amount], YTDFilter)
		formatString: $#,##0.00
		displayFolder: Time Intelligence
```

### Calculated Columns
```tmdl
table Customer
	
	column 'Full Name' = [FirstName] & " " & [LastName]
		dataType: string
		summarizeBy: none
	
	column 'Age Group' = 
			SWITCH(TRUE(),
				Customer[Age] < 18, "Under 18",
				Customer[Age] < 35, "18-34",
				"35+"
			)
		dataType: string
		summarizeBy: none
```

### M Query Partitions
```tmdl
table Sales
	
	partition Sales = m
		mode: import
		source =
			let
				Source = Sql.Database(Server, Database),
				dbo_Sales = Source{[Schema="dbo",Item="Sales"]}[Data],
				FilteredRows = Table.SelectRows(dbo_Sales, 
					each [OrderDate] >= StartDate)
			in
				FilteredRows
```

### Direct Lake (Fabric Lakehouse)
```tmdl
table Sales
	
	partition Sales = entity
		mode: directLake
		source
			entityName: Sales
			expressionSource: DatabaseQuery
			schemaName: dbo
```

### Relationships
```tmdl
/// In relationships.tmdl
relationship a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d
	fromColumn: Sales.'Customer Key'
	toColumn: Customer.CustomerKey
	crossFilteringBehavior: oneDirection
```

### Shared Expressions (M Parameters)
```tmdl
/// In expressions.tmdl
expression Server = "server.database.windows.net" meta 
	[IsParameterQuery=true, Type="Text", IsParameterQueryRequired=true]

expression StartDate = #date(2020, 1, 1) meta 
	[IsParameterQuery=true, Type="Date", IsParameterQueryRequired=true]
```

### Data Sources
```tmdl
/// In dataSources.tmdl
dataSource SqlServer
	type: structured
	provider: System.Data.SqlClient
	connectionString: Data Source=#(lf)Server;Initial Catalog=#(lf)Database

dataSource Lakehouse
	type: structured
	provider: Lakehouse
	connectionString: Data Source=powerbi://api.powerbi.com/v1.0/myorg/
		<WorkspaceName>;Initial Catalog=<LakehouseName>
```

### Roles and RLS
```tmdl
role RegionalAccess
	modelPermission: read
	
	tablePermission Sales = 
		Sales[Region] = LOOKUPVALUE(
			Users[Region],
			Users[Email], USERPRINCIPALNAME()
		)
	
	member 'user@company.com'
	member 'group@company.com' = group
```

### Hierarchies
```tmdl
table Product
	
	hierarchy 'Product Category'
		level Category
			column: Category
			ordinal: 0
		level Subcategory
			column: Subcategory
			ordinal: 1
		level Product
			column: ProductName
			ordinal: 2
```

### Translations
```tmdl
/// In cultures/es-ES.tmdl
culture es-ES
	translations
		table Sales
			caption: Ventas
			
			measure 'Sales Amount'
				caption: Importe de Ventas
				displayFolder: Medidas Base
```

## Key Properties Reference

### Common Data Types
`int64`, `double`, `decimal`, `string`, `boolean`, `dateTime`, `variant`

### Format Strings
- Currency: `$#,##0.00` or `"$"#,##0.00;-"$"#,##0.00`
- Integer: `#,##0`
- Percentage: `0.00%`
- Date: `Short Date`, `Long Date`, `mmm yyyy`

### Summarize By
`none`, `sum`, `min`, `max`, `count`, `average`

### Partition Modes
`import`, `directQuery`, `dual`, `directLake`

## Best Practices

### 1. Object Ordering with ref
Maintain consistent order in model.tmdl to prevent git diffs:

```tmdl
model Model
	ref table Calendar
	ref table Customer
	ref table Sales
	
	ref role ReadOnly
	ref role RegionalAccess
```

### 2. lineageTag for Tracking
Always include `lineageTag` GUIDs for object identity:

```tmdl
table Sales
	lineageTag: e4b3c8f1-a9d2-4e5b-8c7d-1f2e3d4a5b6c
	
	measure 'Sales Amount' = SUM(Sales[Amount])
		lineageTag: f5d7e9a2-b3c4-4f6a-9e1d-2a3b4c5d6e7f
```

### 3. Naming Conventions
- Spaces: Use single quotes `'Sales Amount'`
- Special chars: Use backticks `` `select` ``
- No quotes needed: `SalesAmount`

### 4. Partial Definitions
Split objects across files when helpful:

```tmdl
/// measures.tmdl - All measures in one file
table Sales
	measure 'Sales Amount' = SUM(Sales[Amount])
	measure 'Sales Count' = COUNTROWS(Sales)

table Customer  
	measure 'Customer Count' = COUNTROWS(Customer)
```

### 5. Git Workflow
Files to gitignore:
```gitignore
.pbi/localSettings.json
.pbi/cache.abf
.pbi/unappliedChanges.json  # Optional
```

## Common Time Intelligence Patterns

### Year-over-Year
```tmdl
table Sales
	measure 'Sales Amount' = SUM(Sales[Amount])
		formatString: $#,##0.00
	
	measure 'Sales LY' = 
			CALCULATE([Sales Amount], SAMEPERIODLASTYEAR(Calendar[Date]))
		formatString: $#,##0.00
	
	measure 'Sales YoY %' = 
			DIVIDE([Sales Amount] - [Sales LY], [Sales LY])
		formatString: 0.00%
```

### Period Comparisons
```tmdl
measure 'Sales YTD' = 
		CALCULATE([Sales Amount], DATESYTD(Calendar[Date]))
	formatString: $#,##0.00

measure 'Sales QTD' = 
		CALCULATE([Sales Amount], DATESQTD(Calendar[Date]))
	formatString: $#,##0.00

measure 'Sales MTD' = 
		CALCULATE([Sales Amount], DATESMTD(Calendar[Date]))
	formatString: $#,##0.00
```

## Fabric Lakehouse Integration

### Lakehouse Connection
```tmdl
/// dataSources.tmdl
dataSource Lakehouse
	type: structured
	provider: Lakehouse
	connectionString: 
		Data Source=powerbi://api.powerbi.com/v1.0/myorg/MyWorkspace;
		Initial Catalog=MyLakehouse
```

### Direct Lake Partition
```tmdl
table Sales
	partition Sales = entity
		mode: directLake
		source
			entityName: Sales
			expressionSource: DatabaseQuery
			schemaName: dbo
```

### M Query to Lakehouse
```tmdl
expression LakehousePath = 
	"abfss://workspace@onelake.dfs.fabric.microsoft.com/Lakehouse.Lakehouse/Tables/" meta
	[IsParameterQuery=true, Type="Text"]

table Sales
	partition Sales = m
		mode: import
		source =
			let
				Source = AzureStorage.DataLake(LakehousePath),
				Sales_Table = Source{[Name="Sales"]}[Data]
			in
				Sales_Table
```

## Troubleshooting

### TMDL Parsing Errors
1. **Check indentation**: Only tabs, consistent depth
2. **Verify operators**: `=` for expressions, `:` for properties  
3. **Validate syntax**: DAX/M expressions must be valid
4. **Check references**: All referenced objects must exist
5. **No duplicates**: Same property can't be declared twice

### Common Mistakes
- Mixing tabs and spaces (use tabs only)
- Wrong assignment operator (= vs :)
- Missing lineageTag on objects
- Whitespace before description (/// must be adjacent)
- Invalid multi-line expression indentation

## Transition Notes

### From TMSL (model.bim)
- TMDL = human-readable alternative to JSON
- File-per-object instead of single JSON file
- Much better git diffs and merge conflict resolution
- Same TOM properties, different syntax

### From Dataflows Gen1
- `expressions.tmdl` = M parameters from Dataflows
- Partition M queries = Dataflow transformations
- Lakehouse integration replaces repeated transformations

### From Power BI Desktop Only
- TMDL enables git version control
- Collaborative development with branches/PRs
- Text-based editing in VS Code
- Better code review capabilities

## Response Guidelines

When generating TMDL code:
1. Use correct syntax (`=` for expressions, `:` for properties)
2. Include `lineageTag` GUIDs for new objects
3. Use proper indentation (tabs only)
4. Add `///` descriptions when helpful
5. Follow naming conventions (quotes, backticks)
6. Consider git workflow (file organization)
7. Validate DAX/M expressions
8. Use camelCase for keywords/types
9. Provide complete, ready-to-use code
10. Explain differences from TMSL when relevant

## Additional Resources

- TOM API docs: https://learn.microsoft.com/en-us/dotnet/api/microsoft.analysisservices.tabular
- TMDL overview: https://learn.microsoft.com/en-us/analysis-services/tmdl/tmdl-overview
- VS Code TMDL extension: Search "TMDL" in VS Code marketplace
- Power BI Projects: https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview
