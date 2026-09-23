# Notion Skill Page Template

Use this structure for every converted skill page. Section order matters: critical rules go first and last (AI attention is strongest at the beginning and end of a prompt).

## Section weighting by conversion profile

Same skeleton, different center of gravity:

- **Workflow skill** → "Workflow" and "Output format" dominate (60%+ of the page). "Core context" is a short orientation.
- **Technical/domain skill** → "Core context" dominates (50–60% of the page) and may split into sub-headings: *What it is*, *Key concepts & vocabulary*, *Conventions & patterns* (naming, structure, design rules — the "how Tommy does it" layer), *Gotchas*, *How it fits the client/BI stack*. "Workflow" shrinks to a brief "how an engagement/build proceeds" overview. "Output format" is optional — include only if the skill produces a standard deliverable. "What Claude automates" grows: every script, CLI flow, and code mechanic lands there as capability + decision logic.

The litmus test for a domain page: could Notion Agent use it to write a competent client-facing explanation, meeting prep doc, or project plan about the topic? If the page is all steps and no knowledge, it fails.

## Page structure

```markdown
> 💡 [Callout] One-sentence purpose + the single most important rule of this skill.

## When to use this skill
[2–4 bullets derived from the Claude skill's description frontmatter — the trigger
contexts, rewritten for Notion: "@mention this skill when..."]

## Core context
[The domain knowledge a cold reader needs: what the system/product/process IS,
key vocabulary, the mental model. This is usually distilled from the SKILL.md
intro + reference files. For consulting skills, include business facts: rates,
typical hour ranges, deliverable patterns.]

## Workflow
[Numbered steps in imperative voice. Each step: what to do, what decision to make,
what the output of the step looks like. Collapse Claude-specific tool mechanics
into their intent — "search the workspace for the client page" not
"call notion-search with query_type internal".]

## Output format
[Exact structure of the deliverable this skill produces — headings, tables,
required fields. Notion Agents follow explicit output specs far more reliably
than prose descriptions.]

## What Claude automates
> ⚠️ [Callout] The steps below are automated by scripts in the original Claude
> skill. They cannot run in Notion. To execute them, ask Claude (Desktop or Code)
> to "use the <skill-name> skill" — this page only explains what they do.

[Per script: **Name/purpose** — inputs → what it produces. One or two lines of
the decision logic if it matters for understanding.]

## Rules
[The non-negotiables from the source skill, max ~8 bullets. Repeat the single
most critical rule from the top callout here, phrased differently.]

---
*Converted from the Claude skill `<skill-name>` on <date>. Source of truth lives
in the Skill Vault (C:\Github\agent-skills). If this page and the Claude skill
disagree, the Claude skill wins — flag the drift to Tommy.*
```

## Notion formatting guidance

- Use callouts (`> emoji ...` style per Notion-flavored markdown — check the
  `notion://docs/enhanced-markdown-spec` MCP resource before writing) for the
  top rule and the "cannot run in Notion" warning.
- Use toggles (`<details><summary>...</summary>...</details>`) for any example
  longer than ~5 lines, so the page stays scannable without losing the content.
- Tables for structured facts (hour estimates, component lists, naming maps).
- No H1 headings in the body — the page title is the H1. Start sections at H2.
- Link real workspace pages/databases inline when the skill references them
  (fetch/search to confirm the URL first). Do not link local file paths — name
  them in code formatting instead, e.g. `C:\Github\agent-skills`.

## Title and icon conventions

- Title: human-readable Title Case from the skill name. Strip gerunds only if
  awkward — "building-puglia-sow" → "Building Puglia SOWs" is fine.
- Icon: pick something semantically fitting (🏗️ build skills, 📊 BI skills,
  📝 writing skills, 🤖 agent skills).

## Example conversion (abridged)

Source: `grill-me` skill — "Interview the user relentlessly about a plan until
reaching shared understanding."

Resulting page "Grill Me" body:

```markdown
> 💡 Interrogate, don't validate. Never accept a plan element at face value —
> every claim gets at least one follow-up question.

## When to use this skill
- @mention when you want a plan, design, or SOW stress-tested before committing
- Use on a page containing a draft plan to have it interrogated section by section

## Workflow
1. Read the entire plan first. Build a tree of every decision it contains.
2. Pick the highest-risk branch. Ask one pointed question about it. Wait.
3. ...
```

Note what happened: the Claude skill's tool mechanics disappeared, the
interaction contract (one question at a time, wait for answer) survived intact,
and the page works identically whether Notion Agent runs it or Claude reads it.
