---
name: fabric-prompt-builder
description: >
  Compose a high-signal, paste-ready intake prompt for the fabric-task-flows
  pipeline (@fabric-advisor / run-pipeline.py start) from whatever context the
  user supplies — Notion pages, conversation history, architecture documents,
  meeting notes, source-to-gold mappings, or verbal instructions. Use whenever
  the user wants to feed a project into the task-flows pipeline: "build a task
  flows prompt", "turn this into a fabric-advisor prompt", "prep this project
  for the pipeline", "generate a problem statement from this doc", "start a
  task flow from this", "make me a prompt for fabric task flows", or when they
  hand over project context and ask how to run it through fabric-task-flows.
  Do NOT use for running the pipeline itself (that is @fabric-advisor's job)
  or for designing architecture directly (use fabric-design).
---
 
# Fabric Prompt Builder
 
Turns arbitrary project context into the single most consequential artifact in
this repo: the **intake prompt** for the fabric-task-flows pipeline. Everything
downstream — signal mapping, task-flow candidates, capability inference, the
4 V's, the architecture handoff — is derived from the problem statement this
skill produces.
 
## Why wording matters (read before drafting)
 
The discovery phase is **deterministic and lexical**, not conversational:
 
1. `signal-mapper.py` scores the problem text against weighted keyword tiers
   and regex patterns per category. Quantified natural language scores highest
   — phrases shaped like "every 15 minutes", "50 GB per day", "within 5
   minutes", "500 events per second", "24/7" hit high-weight regex signals.
   Vague prose ("lots of data, fairly often") scores nothing.
2. `capability-mapper.py` maps expressed **intent** to required Fabric items
   ("data scientists need to explore it" → Notebook + Lakehouse). State what
   people will *do* with the data, not just what the data is.
3. `fabric-discover` only asks 4 V's questions for values **not already stated
   in the problem statement**. A statement that embeds all four V's in natural
   language skips the entire intake Q&A loop.
Therefore: the prompt this skill writes is engineered text. Every sentence
should either carry a signal, state a V, name a source/consumer, or declare a
constraint. No filler.
 
## Workflow
 
### Step 0 — Locate the repo
 
Default root: `C:\Github\fabric-task-flows`. All relative paths below are from
that root. If the user is working from a different clone, ask once.
 
### Step 1 — Gather and distill context
 
Pull from whatever the user pointed at: Notion pages (fetch them — do not work
from memory of them), conversation history, uploaded documents, prior
architecture/mapping docs. Extract into a working fact sheet:
 
- **Business problem** — what decision or outcome is blocked today
- **Sources** — systems, APIs, files; count them; note auth/access constraints
- **Volume** — rows/GB per load or per day (quantify; estimate with a source
  citation if the context supports it)
- **Velocity** — batch cadence, near-real-time, or streaming; state the cadence
  numerically ("daily", "every 15 minutes")
- **Variety** — structured/semi-structured/files/APIs/streaming mix
- **Versatility** — team skillset: code-first, low-code, or mixed
- **Consumers** — who uses the output and how (reports, SQL, data science,
  natural-language Q&A, writeback)
- **Existing Fabric items** — anything already built (integration-first: the
  pipeline assumes coexistence unless told to migrate)
- **Constraints** — scope boundaries, phase limits (e.g., "bronze only"),
  security/compliance requirements, capacity SKU
Anything genuinely unknown stays unknown — mark it `TBD` (see Truthfulness).
 
### Step 2 — Ground against the repo
 
Read `task-flows.md` (Quick Reference table only) to know the 13 task flows
and what each is best for. If the user named a target pattern (e.g.,
"medallion", "translytical"), read that flow's section and its linked decision
guides in `decisions/` so the drafted statement naturally expresses the
requirements that flow serves. Do **not** read
`_shared/registry/signal-categories.json` directly — the registry header
forbids it; validate wording via the dry-run in Step 4 instead.
 
### Step 3 — Draft the prompt package
 
Produce, in this order:
 
1. **Project name** — 2–3 short, descriptive candidates (the pipeline
   hard-gates on an explicitly confirmed name; the user picks).
2. **Problem statement** — one paragraph, roughly 120–200 words, written in
   the business's own vocabulary, that embeds:
   - the business problem and blocked outcome (first sentence),
   - every source by name and type,
   - quantified volume and cadence in regex-friendly phrasing,
   - what consumers will do with the result (drives capability mapping),
   - the team skillset,
   - existing items and integration posture,
   - hard constraints and scope boundaries.
3. **4 V's block** — explicit one-liners for Volume, Velocity, Variety,
   Versatility, each tagged `(stated)` or `(TBD — let discovery ask)`.
4. **Acceptance criteria** — 3–7 testable statements derived from context
   (these seed the test plan; never invent them).
5. **Out of scope** — explicit exclusions, if the context defines any.
Constraint honesty: the prompt may state architectural *requirements* the
context supports ("raw data must be retained for reprocessing", "results
served to Power BI via Direct Lake") but must **not** dictate the final task
flow — discovery suggests candidates; design decides.
 
### Step 4 — Validate with a dry run (when shell execution is available)
 
From the repo root:
 
```bash
python .github/skills/fabric-discover/scripts/signal-mapper.py --intake --text "<draft problem statement>" --format json --top 3
```
 
Check that the top task-flow candidates match the intent distilled in Step 1.
If they don't, adjust *vocabulary and quantification* — never fabricate
requirements — and re-run. Maximum 3 revision passes; if still mismatched,
deliver the best draft and flag the gap to the user.
 
If shell execution is not available (e.g., Claude Desktop chat with
Filesystem MCP only), skip the dry run, cross-check the statement's key terms
against the `task-flows.md` Quick Reference "Best For" column, and include the
command above in the deliverable so the user can validate locally.
 
### Step 5 — Deliver
 
Output the package in this exact shape:
 
```markdown
## Task Flows Intake — <Project Name candidates>
 
### Paste into @fabric-advisor chat
> <problem statement paragraph>
 
### Or start via CLI
python _shared/scripts/run-pipeline.py start "<Chosen Name>" --problem "<problem statement paragraph>"
 
### 4 V's (pre-answered for discovery)
- Volume: <value> (stated | TBD)
- Velocity: <value> (stated | TBD)
- Variety: <value> (stated | TBD)
- Versatility: <value> (stated | TBD)
 
### Acceptance criteria
1. ...
 
### Out of scope
- ...
 
### Signal check
Top candidates from dry run: <flows + scores> — matches intent: yes/no
(or: dry run not executed; validate with: <command>)
```
 
The problem statement paragraph must be self-sufficient — the CLI command and
the paste-ready block use the identical text.
 
## Truthfulness rules (non-negotiable)
 
- Never invent volumes, cadences, sources, skillsets, or requirements absent
  from the supplied context. Wordsmithing is allowed; fabrication is not.
- Every quantity in the statement must trace to the context (or to the user's
  explicit answer when you ask). If unknown, mark the V as `TBD` and let
  discovery ask — a short honest prompt beats a complete false one.
- If the user's desired task flow conflicts with what the context supports,
  say so before drafting, and draft to the context.
## Bundled references
 
- `references/prompt-anatomy.md` — sentence-level anatomy of a high-signal
  problem statement, regex-friendly phrasing patterns, and two worked
  examples (batch medallion, streaming). Read it the first time this skill is
  used in a session, or whenever a draft scores poorly on the dry run.
