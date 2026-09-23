---
name: pbir-format
<<<<<<< HEAD
description: "This skill should be used when the user asks about 'PBIR format', 'PBIR JSON structure', 'what does this visual.json property mean', 'how do PBIR expressions work', 'objects vs visualContainerObjects', 'theme inheritance', 'conditional formatting pattern', 'extension measures', 'visual container formatting', 'how to create a visual in PBIR', 'PBIR page structure', 'visual.json format', 'PBIR sorting', 'report wallpaper', 'filter formatting', 'PBIR bookmarks', 'definition.pbir', 'query roles', 'field references in PBIR', 'change the theme', 'modify theme', 'update theme colors', 'push formatting to theme', 'theme fonts', 'theme text classes', 'set theme formatting', 'theme wildcards', 'visual type overrides in theme', 'filter pane theme styling', or needs to understand Power BI Enhanced Report metadata format idiosyncrasies. This is a format reference for understanding and authoring PBIR JSON schemas and patterns."
=======
version: 26.25
description: Format reference for Power BI Enhanced Report (PBIR) JSON schemas and patterns. Automatically invoke when the user asks about PBIR JSON structure, visual.json properties, PBIR expressions, objects vs visualContainerObjects, theme inheritance, conditional formatting patterns, extension measures, bookmarks, field references, filter formatting, query roles, PBIR page structure, report wallpaper, or any PBIR metadata format question.
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478
---

# PBIR Format Reference

Skill that teaches Claude about the Power BI Enhanced Report (PBIR) JSON format to read and use it. Doesn't support legacy `report.json` or `layout` report metadata. To convert from legacy to PBIR format, users have to open and save their reports in Power BI Desktop.

<<<<<<< HEAD
Ensure that you try to follow within reason the [agent tone guidelines](./important/AGENT-TONE.md) when working with reports.

**WARNING:** The PBIR format is brittle and easily corrupted. You should prefer to modify the PBIR files via the `pbir` command-line tool, because it has special tools and features to avoid breaking the report files. Only fall back to direct modification of the JSON files if the user explicitly requests it or if `pbir` is not available.
=======
Follow within reason the [mental model](./important/MENTAL-MODEL.md) when working with reports.

**WARNING:** The PBIR format is brittle and easily corrupted. Direct JSON file modification can lead to corruption. Prefer using the `pbir` CLI tool if available (`uv tool install pbir-cli` or `pip install pbir-cli`), as it has built-in safeguards against breaking report files. Only fall back to direct JSON modification if the user explicitly requests it or if `pbir` is not available.
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478

## General, critical guidance

- **Check examples:** Check [examples](./examples/) for a valid report
- **Take a backup:** Make a copy of the report before modifying it
<<<<<<< HEAD
- **PBIX vs PBIP vs PBIR:** So long as report metadata is in PBIR format, you can work with any of these formats. PBIX is just a zip file; unzip and rezip to work with it. You shouldn't work with PBIT (Power BI Template) file types. Note that PBIP and PBIX contain PBIR, but you can also have a "thin" report that is PBIR only.
- **Validate often:** Any time you change a JSON file you **must** validate it *IMMEDIATELY* after the modification to avoid "breaking" changes with `jq empty <file.json>`
- **Valid JSON vs. Rendering JSON:** Just because something is valid JSON doesn't mean it will render. A visual might not render if the bound field is invalid (missing, wrong table, or misspelled) in the visual.json, if the visual elements are cropped by their container, if a model performance issue causes the dax query to time out, if a model data quality issue results in (Blank) or empty values, etc. You can use tools like the chrome or chrome devTools MCP server to check whether a visual rendered if the report was published to Power BI, but it's often faster to just ask the user to check in Power BI Desktop or the browser.
- **Hierarchical formatting cascade:** In Power BI reports, formatting is determined by the following order of operations: defaults --> Theme wildcards (*) --> Theme visualTypes --> bespoke visual.json configuration. Theme overwrites defaults, visualType overrides wildcards in themes, and visual.json overrides all theme formatting. It's preferable to put as much of the formatting in the theme as possible over bespoke visual.json formatting because then changes only need to happen in one place
- **PBIR files are strict JSON:** No comments allowed
- **DON'T MAKE ASSUMPTIONS:** You can check the Microsoft documentation and other reputable resources to get context if you need, or ask the user. 
=======
- **PBIX vs PBIP vs PBIR:** So long as report metadata is in PBIR format, any of these formats works. PBIX is just a zip file; unzip and rezip to work with it. Do not work with PBIT (Power BI Template) file types. Note that PBIP and PBIX contain PBIR, but a "thin" report can be PBIR only.
- **Valid JSON vs. Rendering JSON:** Valid JSON does not guarantee rendering. A visual might not render if the bound field is invalid (missing, wrong table, or misspelled) in the visual.json, if the visual elements are cropped by their container, if a model performance issue causes the dax query to time out, if a model data quality issue results in (Blank) or empty values, etc. Check whether a visual rendered using tools like the chrome or chrome devTools MCP server if the report was published to Power BI, but it's often faster to just ask the user to check in Power BI Desktop or the browser.
- **Hierarchical formatting cascade:** In Power BI reports, formatting is determined by the following order of operations: defaults --> Theme wildcards (*) --> Theme visualTypes --> bespoke visual.json configuration. Theme overwrites defaults, visualType overrides wildcards in themes, and visual.json overrides all theme formatting. Prefer putting as much of the formatting in the theme as possible over bespoke visual.json formatting because then changes only need to happen in one place
- **PBIR files are strict JSON:** No comments allowed
- **DON'T MAKE ASSUMPTIONS:** Check the Microsoft documentation and other reputable resources for context if needed, or ask the user.
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478

## Report Structure

```
Report.Report/
+-- .pbi/localSettings.json                # Local-only, gitignored
+-- .platform                              # Fabric Git integration
+-- definition.pbir                        # Semantic model connection (byPath or byConnection) can open this file in Power BI Desktop to open the report
<<<<<<< HEAD
+-- mobileState.json                       # Mobile layout (niche)
=======
+-- mobileState.json                       # PBIR-Legacy artifact only; current PBIR stores phone layout per-visual in mobile.json
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478
+-- semanticModelDiagramLayout.json        # Model diagrams
+-- CustomVisuals/                         # Private custom visuals only
+-- definition/
|   +-- version.json                       # REQUIRED -- PBIR version
|   +-- report.json                        # REQUIRED -- report-level config, including theme, report filters, settings
|   +-- reportExtensions.json              # Extension measures and visual calculations (report- and visual-level DAX)
|   +-- pages/
|   |   +-- pages.json                     # Page order, active page
<<<<<<< HEAD
|   |   +-- [PageName]/                    # Letters, digits, underscores, hyphens ONLY
=======
|   |   +-- [PageName]/                    # Power BI Desktop may generate names with spaces; recommend no spaces for human-authored names
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478
|   |       +-- page.json                  # Page-level properties, including size, background, filters
|   |       +-- visuals/
|   |           +-- [VisualName]/
|   |               +-- visual.json        # Visual config, formatting, and field data bindings <-- most important and complex file for report dev and formatting
|   |               +-- mobile.json        # Mobile formatting of the visual (niche)
|   +-- bookmarks/                         # Bookmarks are a bad practice and should be avoided if possible!
|       +-- bookmarks.json                 # Bookmark order and groups
|       +-- [id].bookmark.json             # Individual bookmark state containing a snapshot of the report basically
+-- StaticResources/
    +-- RegisteredResources/               # Custom themes, images
        +-- [ThemeName].json               # Custom theme <-- second most important and complex file for formatting
    +-- SharedResources/BaseThemes/        # Microsoft base themes
```


## Rules

<<<<<<< HEAD
Here are some core rules to follow:

When you are reviewing someone's report you should be lighthearted and chipper but at the same time harsh and direct. Try to make them laugh but do so with the brutal truth.


### Modifying a report

1. First start by understanding the user's request. Ask questions if necessary and make sure you understand the context of their ask. Focus on the business process, and don't be afraid to push the user for additional information about the users, the report, the model, or the business. This information should all be in function of the report.
2. Explore the report efficiently to get a sense of its contents and where's-what.
3. Check the connected semantic model. Ideally the report is a thin-report with `byConnection`. If that's the case you can use the `fab`, `pbir`, or `te` command-line tools to explore the model. If those aren't available, you can use an MCP server. If it's `byPath` then you might be able to connect to and query the local model open in Power BI Desktop. Understanding the model helps you to know what fields are available for visuals and the business logic of calculations (in DAX expressions).
4. Find the appropriate visuals and pages that you need to modify. You might have to ask the user for clarification.
5. Plan the modifications ensuring that you know the appropriate structure and values
6. Validate the JSON files that you change IMMEDIATELY after changing them. Revise if necessary


### Creating a report

1. Same as the above, except you need to generate the appropriate files _de novo_ from scratch. You have to be careful to not miss anything; the best way to do this is just with the `pbir new` command if the `pbir` CLI is available. If not, then check the example reports thoroughly.
2. You have to make sure that the `definition.pbir` is set properly.
3. You should use a theme.json file. We recommend [the example theme from SQLBI and Data Goblins](./examples/K201-MonthSlicer.Report/StaticResources/RegisteredResources/SqlbiDataGoblinTheme.json).
4. Proceed as normal, validating each time you add a new JSON file.
5. Make sure that you add the appropriate filters to the `report.json` or `page.json`; see [the filter pane for more information](references/filter-pane.md)


### Additional validation

- A custom theme should be used, and formatting should be as much in the theme as possible unless the user specifies otherwise; ask before changing this
- Visuals SHOULD NOT overlap and there should be equal space between visuals on the canvas. This ensures a pleasant and professional layout
- Reports should have a title at the top. The title can be a textbox or it can be part of the background image. Ensure the textbox is sufficiently tall to render the text (24-28 pt)
- The most important information in cards or KPIs should be in the top, as well as possibly small or simple line / bar charts, or slicers
- **FOLLOW THE 3-30-300 RULE** There should not be more than 2-3 slicers on the page, and there shouldn't be macguyvered "slicer panes"; use the goddamn filter pane you savage animal
- Key breakdowns can be in the middle and left of the page
- Tables and matrixes can be on the right side of the page, or at the bottom. Occasionally, tables and matrixes can span the full page, but this is a bad practice, especially if there are more than 3-6 columns in the table or matrix
- Custom visuals (with Deneb, python, R, or with the pbiviz custom visuals) should be used instead of SVG visuals or heavily "macguyvered" core visuals... within reason. Sometimes a macguyvered visual or a simple SVG can be more elegant, but you want to avoid technical debt and unnecessary complexity
- Report extensions (thin report measures and visual calculations) should only be used if absolutely necessary over model measures
- Conditional formatting should ideally be centralized in extension or model measures rather than configured bespoke in the visual
- Conditional formatting measures should ideally reference theme colors like "bad" or "good" so that the theme centralizes colors and then conditional formatting logic is centralized in a measure
- Colors should be consistent and used to direct attention. Too much color creates difficulties reading and processing the report.
- Ensure that you ALWAYS sort visuals in a logical way; typically, descending by the measure
- Make good choices about visual types; don't use pie charts when there's over 5 categories, unless you want to be a donkey
- Chart axes should start at zero unless there's an explicit reason not to (e.g. a narrow variance range)
- Use consistent fonts across the report; don't mix font families unless there's a design rationale
- Set `altText` on visuals for accessibility (`visualContainerObjects.general`). Set tab order on interactive visuals
- Name visuals clearly in the selection pane (the visual folder name) so they're easy to find: `revenue_bar_chart` not `a1b2c3d4`
- Eliminate redundant visuals. If two visuals show the same thing, kill one
- Consider the "Apply" button on slicers with high cardinality to avoid excessive queries
- See the [Data Goblins report checklist](https://data-goblins.com/report-checklist) for a comprehensive pre-deployment checklist
=======
Follow within reason the [mental model](./important/MENTAL-MODEL.md) when reviewing or providing feedback on reports.

### Modifying a report

1. Understand the user's request. Ask questions if necessary to clarify the business context -- focus on the business process, the users, and the model
2. Explore the report efficiently to locate relevant pages and visuals
3. Check the connected semantic model. For thin reports (`byConnection`), use `fab`, `pbir`, or `te` CLI tools to explore the model. For `byPath`, connect to the local model in Power BI Desktop. Understanding the model reveals available fields and calculation logic
4. Identify the appropriate visuals and pages to modify. Ask the user for clarification if needed
5. Plan modifications with the correct PBIR structure and property values

### Creating a report

1. Same workflow as modifying, except files are generated from scratch. Use `pbir new` if the `pbir` CLI is available; otherwise, check the example reports thoroughly
2. Ensure `definition.pbir` is configured properly (byPath or byConnection)
3. Use a theme.json file. Recommended: [the SQLBI/Data Goblins theme](./examples/K201-MonthSlicer.Report/StaticResources/RegisteredResources/SqlbiDataGoblinTheme.json)
4. Add appropriate filters to `report.json` or `page.json`; see [filter pane reference](references/filter-pane.md)

### Additional validation

For detailed report design guidance (layout, spacing, visual hierarchy, color, accessibility), see the **`pbi-report-design`** skill. Key rules enforced during validation:

- Use a custom theme; push formatting to the theme over bespoke visual.json unless the user specifies otherwise
- Visuals must not overlap; maintain equal spacing between visuals and page edges
- Every page needs a title (textbox or background image). Ensure textboxes are tall enough to render (24-28 pt)
- Follow the 3-30-300 rule: KPIs/cards at top, breakdowns in middle, detail at bottom. Maximum 2-3 slicers per page; use the filter pane for additional filtering
- Prefer Deneb, Python, or R custom visuals over SVG or heavily customized core visuals -- balance elegance against technical debt
- Use report extensions (thin report measures, visual calculations) only when model measures are not feasible
- Centralize conditional formatting in extension or model measures referencing theme semantic colors (`"bad"`, `"good"`)
- Use consistent colors to direct attention, not to decorate. Avoid pie charts beyond 5 categories
- Sort visuals logically (typically descending by measure). Start chart axes at zero unless there is an explicit reason not to
- Use consistent fonts. Set `altText` for accessibility. Name visuals descriptively (`revenue_bar_chart` not `a1b2c3d4`)
- Eliminate redundant visuals. Consider the "Apply" button on high-cardinality slicers
- See the [Data Goblins report checklist](https://data-goblins.com/report-checklist) for pre-deployment validation
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478


## What to Read for Common Tasks

| Task | Read |
|------|------|
| Add or modify a visual | **`references/visual-json.md`** -- expression syntax, field references, query roles, position, objects vs visualContainerObjects, selectors |
| Change formatting or colors | **`references/visual-container-formatting.md`** (container chrome) + **`references/theme.md`** (theme-level formatting). Prefer theme changes over bespoke visual formatting |
| Add conditional formatting | **`references/schema-patterns/conditional-formatting.md`** + **`references/measures.md`** (extension measures for CF) |
| Add or configure filters | **`references/filter-pane.md`** -- all 7 filter types, default values, filter discovery |
| Work with the theme | **`references/theme.md`** -- inheritance, wildcards, visual-type overrides, filter pane styling, inspecting and modifying with jq |
| Push visual formatting to theme | **`references/theme.md`** -- promote bespoke visual formatting into theme defaults for that visual type (copy from visual.json `objects`/`visualContainerObjects` into theme `visualStyles`) |
| Change page layout/background | **`references/page.md`** -- dimensions, background, wallpaper, visualInteractions |
| Create a tooltip page | **`references/page.md`** -- tooltip page setup (type, size, visibility) + visualTooltip opt-in on visuals |
| Create a drillthrough page | **`references/page.md`** -- drillthrough filter in page filterConfig |
| Change report settings | **`references/report.md`** -- themeCollection, resourcePackages, settings, outspacePane |
| Add extension measures | **`references/measures.md`** -- reportExtensions.json structure, DAX patterns, referencing |
<<<<<<< HEAD
=======
| Add annotations / metadata | **`references/annotations.md`** -- custom name-value metadata on reports, pages, and visuals for deployment scripts, documentation, and external tooling |
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478
| Add images or SVGs | **`references/images.md`** -- RegisteredResources, base64 in themes, SVG measures |
| Add or modify textboxes | **`references/textbox.md`** -- paragraphs, textRuns, textStyle |
| Sort a visual | **`references/sort-visuals.md`** -- sortDefinition inside query |
| Sync slicers across pages | **`references/visual-json.md`** -- syncGroup (groupName, fieldChanges, filterChanges) |
| Edit visual interactions | **`references/visual-json.md`** + **`references/page.md`** -- visualInteractions in page.json (NoFilter, Filter, Highlight) |
| Change table/matrix column widths | **`references/visual-json.md`** -- columnWidth with metadata selector |
| Group visuals | **`references/visual-json.md`** -- visualGroup, parentGroupName, groupMode |
| Hide visuals or fields | **`references/visual-json.md`** -- isHidden at root level, query projection control |
| Format chart elements (labels, markers, lines) | **`references/visual-json.md`** -- labels, markers, lineStyles, dataPoint |
| Add analytics lines (reference, trend, error, forecast) | **`references/visual-json.md`** -- y1AxisReferenceLine, trend, error, forecast |
| Work with bookmarks | **`references/bookmarks.md`** -- bookmark state, filter snapshots, visual show/hide |
| Find model fields | **`references/semantic-model/finding-fields.md`** -- pbir model, te, fab commands |
| Rebind to different model | **`references/semantic-model/report-rebinding.md`** -- byPath vs byConnection conversion |
| Understand schema versions | **`references/schemas.md`** -- all schema types and current versions |
<<<<<<< HEAD
=======
| Validate or check conformance | **`references/validation.md`** -- conformance dimensions, `pbir validate` categories, name and required-field rules, audit and discovery commands |
| Understand how visuals generate DAX queries | **`references/semantic-model/inferring-queries-from-visuals.md`** -- visual metadata → SUMMARIZECOLUMNS mapping, data roles, IGNORE() context |
| Build or verify DAX query patterns | **`references/semantic-model/model-queries.md`** -- SUMMARIZECOLUMNS patterns, ROW(), query execution methods |
| Rename a table or field across visual JSON | **`references/rename-patterns.md`** -- Entity/Property/queryRef patterns in visual.json, filterConfig, reportExtensions |
| Fix broken field references after model changes | **`references/how-to/fix-broken-field-references.md`** -- diagnosis, repair workflow for renamed/moved/removed fields, slicer value pitfalls |
| Convert legacy report.json to PBIR format | **`references/how-to/convert-legacy-to-pbir.md`** -- format differences, step-by-step conversion, projections-to-queryState mapping, validation |
| Understand reportExtensions.json schema | **`references/report-extensions.md`** -- file schema structure, entities, visual calculations; see `references/measures.md` for DAX authoring patterns |
| Set dynamic (measure-driven) alt text | **`references/visual-container-formatting.md`** -- altText as a Measure expression under visualContainerObjects.general |
| Add a dynamic text run to a textbox | **`references/textbox.md`** -- measure-bound textRuns; round-trip from Desktop required |
| Understand drill-down cross-filter behavior | **`references/visual-json.md`** -- drillFilterOtherVisuals vs visualInteractions |
| Register a custom visual (AppSource, org-store, private .pbiviz) | **`references/report.md`** -- publicCustomVisuals, organizationCustomVisuals, resourcePackages |
| Understand schema version coupling | **`references/schemas.md`** -- parent/embedded schema sets, copying fragments between reports |
| Set up mobile (phone) layout | **`references/pbir-structure.md`** -- mobile.json per-visual, coordinate space, git hygiene |
| Git hygiene for a PBIR project | **`references/pbir-structure.md`** -- what to track, ignore, and leave to Desktop |
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478

## definition.pbir

A report must be connected to a semantic model. There are two ways to do this:

<<<<<<< HEAD
- **byPath** -- Local PBIP reference/thick report: `{"byPath": {"path": "../Model.SemanticModel"}}` (schema 1.0.0 or 2.0.0)
=======
- **byPath** -- Local PBIP reference/thick report: `{"byPath": {"path": "../Model.SemanticModel"}}` (schema 2.0.0)
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478
- **byConnection** -- Remote/thin report: `{"byConnection": {"connectionString": "Data Source=powerbi://..."}}` (schema 2.0.0)

## Related Skills

- **`pbip`** -- PBIP project operations: rename cascades, project forking, report JSON patterns
- **`tmdl`** -- TMDL file format, authoring, and editing

## References

<<<<<<< HEAD
**Examples:**
- **`examples/K201-MonthSlicer.Report/`** -- Real PBIR report with 7 visual types (slicer, advancedSlicerVisual, kpi, lineChart, scatterChart, tableEx, textbox), extension measures, bookmarks, conditional formatting

**Core references:**
- **`references/visual-json.md`** -- visual.json: expressions, field refs, query roles, position, objects vs vCO, selectors, sorting, filters
- **`references/pbir-structure.md`** -- PBIR folder structure details
- **`references/schemas.md`** -- Schema versions and URLs
=======
**Fetching Docs:** To retrieve current Power BI developer/report format docs, use `microsoft_docs_search` + `microsoft_docs_fetch` (MCP) if available, otherwise `mslearn search` + `mslearn fetch` (CLI). Search based on the user's request and run multiple searches as needed to ensure sufficient context before proceeding.

**Examples:**
- **`examples/K201-MonthSlicer.Report/`** -- Real PBIR report with 7 visual types (slicer, advancedSlicerVisual, kpi, lineChart, scatterChart, tableEx, textbox), extension measures, bookmarks, conditional formatting
- **`examples/visuals/`** -- 54 standalone visual.json examples; see `examples/visuals/__index.md` for a catalog. Split into `default/` (minimal, theme-only) and `formatted/` (bespoke formatting, conditional formatting, gradients, filters)

**Core references:**
- **`references/visual-json.md`** -- visual.json: expressions, field refs, query roles, position, objects vs vCO, selectors, sorting, filters, drill-down propagation
- **`references/desktop-bridge.md`** -- Verifying PBIR edits on the canvas via `pbir desktop` reload + screenshot; preview setting; locating the open PBIP
- **`references/pbir-structure.md`** -- PBIR folder structure, mobile.json storage mechanics, git hygiene
- **`references/schemas.md`** -- Schema versions, URLs, and embedded schema coupling
- **`references/validation.md`** -- Conformance dimensions and how to validate (schema, names and ids, required fields, fields, enums, roles, layout, theme, semantic); `pbir validate` categories; audit and discovery commands
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478
- **`references/enumerations.md`** -- Valid property enumerations
- **`references/version-json.md`** -- version.json format (concise)
- **`references/platform.md`** -- .platform file format (concise)
- **`references/bookmarks.md`** -- Bookmark structure and state snapshots

**Formatting & expressions:**
- **`references/theme.md`** -- Theme wildcards, inheritance, color system, filter pane styling, visual-type overrides. Includes jq patterns for inspecting and modifying theme JSON directly
- **`references/schema-patterns/`** -- Expressions, selectors, conditional formatting, visual calculations
<<<<<<< HEAD
- **`references/visual-container-formatting.md`** -- objects vs visualContainerObjects deep-dive
=======
- **`references/visual-container-formatting.md`** -- objects vs visualContainerObjects deep-dive; dynamic (measure-driven) altText
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478
- **`references/measures-vs-literals.md`** -- When to use measure expressions vs literal values
- **`references/measures.md`** -- Extension measure patterns

**Visual & page configuration:**
<<<<<<< HEAD
- **`references/textbox.md`** -- Textbox visual format
- **`references/page.md`** -- Page configuration and backgrounds
- **`references/report.md`** -- Report-level settings
=======
- **`references/textbox.md`** -- Textbox visual format; dynamic (measure-bound) text runs
- **`references/page.md`** -- Page configuration and backgrounds
- **`references/report.md`** -- Report-level settings; custom visual registration (AppSource, org-store, private .pbiviz)
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478
- **`references/wallpaper.md`** -- Report wallpaper/canvas background
- **`references/filter-pane.md`** -- Filter pane formatting
- **`references/sort-visuals.md`** -- Visual sort configuration
- **`references/images.md`** -- Static images, base64 in themes, SVG measures
- **`references/report-extensions.md`** -- reportExtensions.json format
<<<<<<< HEAD
=======
- **`references/annotations.md`** -- Custom metadata on reports, pages, and visuals
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478

**Semantic model integration:**
- **`references/semantic-model/`** -- Field references, model structure, report rebinding, query inference

**How-to guides:**
<<<<<<< HEAD
- **`references/how-to/`** -- Advanced conditional formatting, SVG in visuals
=======
- **`references/how-to/`** -- Advanced conditional formatting, SVG in visuals, fix broken field references, convert legacy to PBIR
>>>>>>> 9704f1d00f37f3d79a5d65b618571d0088ce6478
