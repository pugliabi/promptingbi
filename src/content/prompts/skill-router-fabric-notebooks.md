---
title: "Skill Router: Fabric Notebooks"
description: "The router on every Fabric notebook instructions page: hands-on or Project Osmos, live cell tests with FNTK, and a gate that trusts no green light."
category: agent-skills
date: 2026-11-24T09:00:00Z
format: markdown
source:
  permalink: "2026/11/24/the-notebook-isnt-what-you-built"
draft: false
---

This is the router my Fabric Advisor Notion agent attaches to every notebook instructions page. The advisor picks the route and writes it into the handoff, and the build agent outside Notion (Claude Code, Copilot CLI) loads the skills and runs it. Skill names are the canonical names in my library; Notion page links are replaced with plain names.

```markdown
> Execution target: the external build agent. Fabric Advisor writes the
> route; the external agent invokes it.

## Skill selection and harness-first handoff

Use this router as a selection guide, not a command to load the whole
catalog. Read only the synced Notion methods needed to understand the
task, applicability, inputs and gates. Fabric Advisor selects and reviews
the route; it does not perform the external workflow or pre-generate
skill-owned plans/specs/design contracts/code while writing a handoff.

Provide project intent, approved choices, resources, constraints,
canonical skill names, exact Notion references, purpose and required
evidence. Choose only skills applicable to the active authorized work and
dependencies required by those methods. Declare additions conditionally.
Delegate detailed procedures, artifact generation, approvals and
validation to the executing agent's loaded skills; preserve
project-specific safeguards.

Instruct the executor: search your own harness registry and project skill
libraries first for matching names and purpose; resolve the actual
registered name, verify conflicting source/version matches, then load and
apply the full suitable skill and its resources. Do not assume a Claude
namespace or download a Notion copy when a suitable skill already exists.
Only when no suitable existing copy is found, retrieve the complete
linked Notion skill, package/install through the supported mechanism,
re-discover, load and verify. Keep the Skill Load Gate and honest
evidence requirements.

## Mandatory harness-aware load and recovery

Before executing this route, read "Skill Router: General & Cross-Domain"
and pass the instruction page's §0 gate. Resolve canonical names against
the actual registry. Use full registered names for Claude account/plugin
skills; use native loader/names for other harnesses and local imports.
If absent, retrieve the full Notion skill plus dependencies,
package/install/enable into the actual harness, then load and verify. If
user action is required, provide the package and exact steps and keep
affected work pending. Notion agents select/review methods; external
agents execute. Require installation and session load evidence, not
metadata, a download, MCP success or self-review. This requirement
applies to all future drafts and reviews. Preserve the route and
project-specific approval gates below.

## Notebook workflow selection

Pick ONE route per authorized workstream: Route A, hands-on
authoring/engineering (default), or Route B, autonomous delegation to
Project Osmos. Within Route A, start with the notebook-authoring method
appropriate to the task. Add CLI authoring when used, engineering methods
for transformations, live testing when notebook cells are written or
changed, consumption methods for required data checks, and operations
methods when monitoring/failure handling applies. Medallion, optimization
and tenant methods are conditional. Do not require every notebook skill
for a read-only review or simple notebook edit. The executor follows the
selected methods for code and validation.

Spark CLI family: spark-cli is Microsoft's consolidated Spark skill, with
authoring, consumption, operations and MLV modes. If the harness resolves
it, use its matching mode in place of the legacy split skills
(spark-authoring-cli, spark-consumption-cli, spark-operations-cli,
mlv-operations-cli). Otherwise use the legacy skills. Resolve one family
per session and don't load both for the same mode. Instruction pages that
name the legacy skills stay valid.

### Route A: authoring/engineering (default)

1. spark-authoring-cli (or spark-cli authoring mode) plus
   authoring-fabric-notebooks for notebook structure, PySpark or Python
   choice, NotebookUtils, lakehouse I/O and pipeline integration.
2. spark-engineer for data-engineering patterns.
3. Live test: fntk-notebooks. This is the default whenever notebook cells
   are written or changed and FNTK can run: test each new or changed cell
   against real data in the target notebook's session before persisting
   it. It needs FNTK in the harness and a user identity signed in to the
   target tenant. If FNTK can't run (service principal only, no user
   present, unsupported host), log the reason in the Status log, use
   step 4 for data checks, and do not report the code as live-tested.
4. spark-consumption-cli (or spark-cli consumption mode) for read-only
   validation and completion-gate data checks.
5. spark-operations-cli (or spark-cli operations mode) for failed,
   throttled or slow notebook, pipeline or Livy runs.

How the execution skills divide:

| Need | Skill |
| --- | --- |
| Iterate on, debug or edit cells inside a specific notebook | fntk-notebooks |
| Run ad-hoc code with no notebook artifact (one-off probe or ETL) | executing-spark |
| Read-only data checks for the completion gate | spark-consumption-cli / spark-cli consumption |
| Persist a full .ipynb, bulk deploy, or start a named/scheduled run | Tenant API skill, or spark-cli authoring |
| Diagnose a failed or slow run | spark-operations-cli / spark-cli operations |

FNTK safeguards: it needs a user identity (sessions reject service
principals). For client tenants, sign in with that tenant's account,
never your own firm's identity, and set FNTK_TELEMETRY_DISABLED=1 before
the first command. Always delete the session and stop the FNTK server
when finished. Judge success from the cell result, not the top-level
command status. `fntk init` installs Microsoft's fabric-notebook-workflow
skill and the fabric-skills plugin. Treat those as harness copies during
discovery and don't install duplicates.

### Route B: autonomous delegation (Project Osmos)

project-osmos hands one complete data-engineering outcome to Microsoft's
remote, long-running Osmos agent. Use it instead of Route A for a
workstream, not as a step inside Route A.

Choose Route B only when all of these are true:

- The outcome is Spark, Lakehouse or OneLake data engineering (ingest,
  transform, tables, notebooks) and can be stated in full as one
  instruction with its sources, outputs and validations.
- The brief does not need phased gates, cell-by-cell review, in-place
  edits to an existing house-pattern notebook, or non-Spark items
  (semantic models, reports, warehouses, pipelines, Eventhouse). Those go
  to Route A or the matching router.
- The executor is a local agent (such as Claude Code or GitHub Copilot
  CLI) with a user Azure CLI session. Osmos can't be used from Copilot in
  the Fabric portal.
- The approval below is recorded.

Otherwise use Route A.

Route B rules:

- Send the full scope as ONE Osmos task. Never split it into phases or
  multiple tasks. Put the Notebook requirements and Completion gate below
  inside that instruction. Follow-ups continue the same task.
- Approval: before dispatch, record Tommy's explicit approval in the
  instruction page's Status log. This is required for every Osmos task on
  a client tenant and for any task that writes to production tables. The
  approval names the exact instruction, workspace, default lakehouse,
  write targets and write mode, and confirms the client allows processing
  by the remote Osmos service. Earlier project or client approval does
  not count.
- Workspace and Lakehouse discovery uses search-consumption-cli. Direct,
  non-Osmos Spark work goes back to Route A. Cancel and delete follow the
  skill's confirmation gates.
- Osmos output is accepted only after Route A's validation step (step 4)
  checks it independently, and only after any notebooks it produced are
  reviewed against the Notebook requirements. That review happens before
  the notebooks are scheduled or promoted.

## Conditional skills

- Medallion layer writes: add e2e-medallion-architecture.
- Slow or expensive Spark: add spark-optimization.
- Ad-hoc execution without a notebook artifact: add executing-spark.
- Materialized lake views: add mlv-operations-cli, or use spark-cli
  (authoring mode for MLV definitions, MLV mode for existing MLVs).
- Tenant operations: add the correct tenant API skill (one per tenant,
  <tenant>-fabric-api) and fabric-cli when appropriate.

## Notebook requirements

Every notebook route includes a header, environment or Key Vault
authentication, thin orchestration with shared utilities, extract and
type-map logic, Delta write pattern, validation, pipeline logging,
idempotency and a failure path. These also apply to notebooks produced
by Osmos.

## Completion gate

Require row counts, schema checks, key uniqueness, null-key checks, date
ranges, source-to-target parity and documented run results. A successful
execution status alone does not pass. The same goes for an FNTK "success"
or a completed Osmos task.

- FNTK work also records: the notebook and session used, the cells
  changed, the cell results, and confirmation that the session was
  deleted.
- Osmos runs also record: the task ID, workspace, default lakehouse, task
  page link, final task status and the approved instruction; every table,
  notebook or file created or changed, with its write mode; and the
  literal count and mutation outputs from the Osmos message stream. The
  checks above are then verified independently.
```

## Adapting it

- **"A selection guide, not a command to load the whole catalog."** This is the line that keeps sessions narrow. Without it, an agent reading a router loads every skill it names, and a simple notebook edit starts with the whole notebook catalog in context.
- **One route per workstream.** Osmos gets a whole outcome or nothing. The all-must-be-true list is what stops "just let the remote agent do it" on work that needs phased review or touches non-Spark items.
- **The approval names the exact target.** Instruction, workspace, default lakehouse, write targets, write mode, and client consent to remote processing. "Earlier project or client approval does not count" closes the loophole where one yes from last month covers a production write today. Put your own approver in place of mine.
- **Live-tested means live-tested.** If FNTK can't run, the agent logs why and is barred from calling the code live-tested. Agents will otherwise report validation they never ran.
- **Harness-first loading.** The executor checks its own registry before pulling a Notion copy of a skill. That's what prevents duplicate, stale installs once you work across more than one harness.
- **The gate trusts no green light.** Execution status, an FNTK "success," and a completed Osmos task all fail on their own. Osmos runs also have to report literal counts from the message stream, which then get checked independently.
- **Copy the spark-cli paragraph pattern.** When a vendor consolidates skills, say "use the new one if it resolves, otherwise the legacy ones, never both for the same mode." Every older instructions page that names the legacy skills keeps working.
- **Swap in your own names.** Tenant API skills (one per tenant), the client-tenant rule for FNTK sign-in, and the approver are the parts that are mine.
