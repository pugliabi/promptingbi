---
title: "Fabric Session Map: Model and Effort per Session"
description: "The page I write before a multi-session Fabric build: which model and effort each session gets, and the rule that keeps the expensive model off the raw data."
category: agent-briefs
date: 2026-10-28T09:00:00Z
format: markdown
source:
  permalink: "2026/10/28/dont-spend-fable-on-the-schema"
draft: false
---

Before the first session on a discovery-heavy Fabric project, I write down which session gets which model and effort, and I keep it with the rest of the project context so every session reads it. The post shows the four-session slice. This is the full page, including the defaults I start from for the other jobs on the project.

```markdown
## Session Map: <Project / workstream>

> Rule: the high model reads the dictionary, never the raw data.
> Known unknowns get the higher model. Known knowns get the lower one.

### 1. Listen
- Model / effort: <Opus-class>, medium
- Job: connect to <source systems>, pull the data, land it in <lakehouse>.
- Do not reason about how the systems relate. Report what landed.

### 2. Dictionary
- Runs before any high-model session.
- Output: <Data Dictionary page>. Every table: columns, location, purpose.
- Later sessions read this page, not the source data.

### 3. Recommendations
- Model / effort: <higher model>, high. Only after step 2 is written.
- Reads: <Data Dictionary page>. Not the raw tables.
- Known unknowns to resolve:
  - <which keys join across systems>
  - <which tables merge, and the test that proves it>
  - <anything else we know we don't know>
- Output: one task document per step, with dependencies.

### 4. Execution
- Model / effort: <Opus-class> at medium, or a lower model at lower effort.
- Reads: the task documents, plus <an existing notebook that follows
  our connection and variable-library patterns>.
- No new design decisions. Stop at scope edges.
- Done means the validation cell passes. Write back anything the plan missed.

### Defaults for other jobs on this project
| Job                                                | Model / effort                 |
| Tenant inventory (list artifacts, no descriptions) | Low                            |
| Relationships, ~10 tables, clear requirements      | Medium                         |
| DAX measures                                       | High to plan, high to write    |
| Report design (skills / Desktop Bridge)            | Medium                         |
| Notebook into a lakehouse                          | Medium; low with good examples |
| Session names, tags                                | Haiku                          |
```

## Adapting it

- **Keep the rule line at the top.** It's the line that stops someone from connecting the top model at max effort to the lakehouse and letting it work out the schema.
- **Write the known unknowns as a real list.** If you can't name a single one, the job is known knowns and the recommendations session can drop a tier or disappear.
- **Name a real example notebook in step 4.** Missed house patterns (connections, variable libraries) are what push people to a bigger model. A good example fixes that more cheaply.
- **Don't move DAX down to save tokens.** A measure that runs with the wrong filter context costs you a refinement loop, which is worth more than the tokens you saved.
- **Change the defaults when a project proves them wrong.** Nobody has a tracker for prompt, refinements, and cost yet, so this page is the record of what worked.
