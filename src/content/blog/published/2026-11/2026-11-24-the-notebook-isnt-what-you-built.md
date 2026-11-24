---
title: "The Notebook Isn't What You Built"
date: 2026-11-24T09:00:00Z
permalink: "2026/11/24/the-notebook-isnt-what-you-built"
description: "When an agent writes your Fabric notebook, what you built is the blueprint behind it: the instructions, the dependencies, the skill route, and the gate."
featured: /images/2026/11/the-notebook-isnt-what-you-built-banner.jpg
draft: false
tags:
  - microsoft-fabric
  - ai-agents
  - agent-skills
  - context-engineering
  - governance
  - business-intelligence
source:
  episode: 585
  title: "Building Notebooks with Agents"
  notion: "https://app.notion.com/p/406e74c69c18806a90aad1e7d5aaa88b"
  transcript: "transcripts/ep-585.txt"
---

When was the last time you typed a cell into a Fabric notebook by hand?

I had to think about it. I'm building in Fabric most days right now, mostly new environments for teams standing up their first lakehouse, and I've rarely written a cell in the Fabric UI, even for my own internal work. The Fabric Notebook Toolkit is wired into all of my skills, so everything from the first cell to the validation runs outside the notebook editor. Not long ago my loop was: create the notebook in the UI, ask ChatGPT for the connection code, paste it, run it. That loop is gone.

If I were a director of BI, I'd go further. It makes less and less sense to me to pay someone to hand-write PySpark when they have the skill to drive an agent that writes it. (That one deserves its own post, and it'll get one.)

So if the agent wrote the notebook, what did I build?

**I built the blueprint.** The instructions the session ran on, the context those instructions point to, the route that picks which skill runs each step, and the gate that says when it's done. The notebook is what came out the other end. Hand someone the notebook without the rest and you've handed them a house with no plans.

![On the left, a large unrolled blueprint showing a house outline drawn from connected nodes, with a checklist card and a route symbol pinned to its corner. Flowing lines carry it through a small agent node to the right, where a single code notebook card sits on two lakehouse cylinders beside a small bar chart](/images/2026/11/the-notebook-isnt-what-you-built-banner.jpg)

## Who owns the build

When someone builds you a house, the builder owns the blueprint and the quality control, and hands you a place you can live in, built to the spec you asked for. The framing and the wood are the part you see from the street.

Agentic notebooks work the same way. When I build a notebook with an agent, the deliverable includes the instructions, the context I provided, the project brief, and the skills that did the work, along with the notebook itself. That's intellectual property, and it belongs in the handoff. If the person who built it disappears tomorrow, consultant or FTE, the team still has to live in that house.

## "The code is the documentation"

The strongest pushback is a good one: you don't need any of that, because the code is the documentation. Give an agent the Notebook Toolkit, point it at the notebooks, and ask it to explain the process. Agents are very good at reading code. Have it put a markdown cell in front of every function and build an outline with headers, and an old, undocumented notebook is readable in minutes. On that view, the skill worth protecting is your team's ability to get an agent to write the documentation on demand.

I agree with most of that. It works. It also misses the part of Fabric where things break.

## The agent can read the notebook. It can't see lakehouse B.

Most notebooks aren't siloed. A notebook reads from lakehouse A and writes to lakehouse B. What it reads has its own columns and a source that changes on its own schedule. What it writes has a schema in the data dictionary and consumers you can't see from inside a cell: other notebooks, shortcuts, an orchestration pipeline that calls it by name, a semantic model 2 hops downstream.

An agent reading one notebook cold can document every line and still have no idea what a change will break, because what depends on the notebook isn't in the notebook.

![A magnifying lens covers a single notebook card in the center. A lakehouse cylinder on the left feeds it, and on the right it writes to a second cylinder that branches through dotted lines to four folder shortcuts and a chain of connected cards beyond, all outside the lens](/images/2026/11/the-notebook-isnt-what-you-built-dependencies.jpg)

That's what my agent instructions are for. Every notebook session I run reads a standards page before it writes a line of code. Take Northside Baseball, the project I keep coming back to here. This is a trimmed slice of its notebook page:

```markdown
## Medallion architecture: layer scope
Bronze = raw data landed as-is from source systems. Typing, renaming,
null handling only. No business logic, no aggregations.
Silver = cleansed and conformed into the star schema. STH_ID is the
conformed season-ticket account key throughout. Business logic belongs here.
Gold = analytics-ready aggregates and feature tables, read by the
semantic model.
Department marts (tickets, crm, concessions, operations) contain NO
physical tables. They are OneLake shortcuts pointing at silver and gold,
scoped so each department sees only its own slice.

## Notebook naming
Ingestion notebooks: bronze_{source}_{table}
Transform notebooks: nb_{layer}_{purpose}, e.g. nb_silver_transform, nb_gold_transform
Do not rename existing notebooks to unify the two conventions. Both are
live and orchestration references them by name.

## Core principle: thin notebooks, shared functions
Each table notebook sets a small config block, then calls shared utils_*
notebooks. Adding a table = a new config block, never new plumbing.
A fix to pagination is made once, not seventeen times.
```

Now open `nb_gold_transform` cold and ask an agent to document it. You'll get an accurate description of every aggregation it computes. You won't learn that the semantic model reads its output, that 4 department lakehouses see those tables through shortcuts, or that renaming it to match the other convention breaks orchestration. Every line in that block describes something that lives outside the notebook.

The page is part of the build, so it can be wrong too. I found that out when [my own standards page](/2026/08/17/dont-let-your-agent-touch-fabric/) described a naming convention 3 of my shipped notebooks didn't follow. If the instructions drift, the next agent builds on the drift, so keep them current.

## My prompt is one line

When people hear "hand over the prompts," they picture a chat history. I've used the word that way myself. A prompt is what you type into the chat window. Agent instructions document the system, and they're what the team should share.

On a big project, this is the whole prompt I type to start a session:

> Read the Northside master sequence in Notion. Go.

Everything else is in the instructions: which page is active, what's already done, what has to wait for something else to finish, and which pages to read first. Even "before you start, read the schema of lakehouse A" lives on the instructions page. I've already written up [how the master sequence works](/2026/09/25/context-harness-execution-harness/), so I won't re-teach it here. If I saved only my prompts, I'd have saved one line.

## The router picks the skill, so I don't have to

This is the part I'm proud of. Every agent instructions page I write has a skill router. It tells the harness which skill to load for each kind of step, so I never type "use the modeling skill." The page decides. My Fabric Advisor agent in Notion writes the route into the handoff, and the build agent outside Notion loads the skills and runs it.

![An instructions page on the left connects to a router node that fans out to four skill cards. Only the path to the code skill is solid; the other three are dotted. The solid path continues through a checklist and a gate bar to a database cylinder on the right](/images/2026/11/the-notebook-isnt-what-you-built-router.jpg)

Here's a trimmed slice of my notebook router:

```markdown
## Notebook workflow selection
Pick ONE route per authorized workstream: Route A, hands-on
authoring/engineering (default), or Route B, autonomous delegation to
Project Osmos. Do not require every notebook skill for a read-only
review or simple notebook edit.

### Route A: authoring/engineering (default)
1. spark-authoring-cli (or spark-cli authoring mode) plus
   authoring-fabric-notebooks: structure, PySpark or Python choice,
   NotebookUtils, lakehouse I/O, pipeline integration
2. spark-engineer: data-engineering patterns
3. Live test: fntk-notebooks. Default whenever cells are written or
   changed: test each new or changed cell against real data in the
   target notebook's session before persisting it. If FNTK can't run,
   log the reason and do not report the code as live-tested.
4. spark-consumption-cli: read-only validation and completion-gate checks
5. spark-operations-cli: failed, throttled or slow runs

### Route B: autonomous delegation (Project Osmos)
Choose only when all are true: the outcome is Spark/Lakehouse data
engineering stated in full as one instruction; it needs no phased
gates or cell-by-cell review; the executor is a local agent with a
user Azure CLI session; the approval is recorded in the Status log.
Send the full scope as ONE Osmos task. Output is accepted only after
Route A step 4 checks it independently.

## Conditional skills
- Medallion layer writes: add e2e-medallion-architecture
- Slow or expensive Spark: add spark-optimization
- Ad-hoc execution without a notebook artifact: add executing-spark

## Completion gate
Require row counts, schema checks, key uniqueness, null-key checks,
date ranges, source-to-target parity and documented run results.
A successful execution status alone does not pass. The same goes for
an FNTK "success" or a completed Osmos task.
```

Remember the Notebook Toolkit I said is wired into all of my skills? Step 3 is where it shows up. Every cell the agent writes or changes runs against real data in the target notebook's session before it's saved. When the toolkit can't run, the agent logs why and isn't allowed to call the code live-tested.

Route B is newer. Project Osmos is Microsoft's remote, long-running data-engineering agent. The router gives it a whole outcome only when every condition holds: the job fits in one instruction, nobody needs to review cells along the way, and my approval is in the status log. Everything else stays on Route A, and when Osmos does take a job, Route A's validation step checks its output before anything is accepted.

"Do not require every notebook skill" keeps a simple edit from pulling the whole catalog into the session. The conditional list means the medallion skill shows up only when the notebook writes a layer.

If I could keep only one part, it'd be the **completion gate**. It passes on row counts, schema, keys, and parity. A green run, a toolkit "success," or a finished Osmos task doesn't count on its own.

That router belongs to the build too. Inherit the notebook without it and you inherit code that ran once, under rules you can't see.

## What I hand over now

When I finish agentic notebook work, for a client or for my own team, this goes over with the notebook:

1. **The instructions page** the sessions ran on, current, with its status log.
2. **The dependency context.** What the notebook reads, what it writes, and who consumes the output: the dictionary entries, the shortcuts, the pipeline, the semantic model.
3. **The skill route.** Which route ran, hands-on or delegated, and which skills ran which steps, by exact name.
4. **The completion gate and the numbers it passed with.** Row counts, parity, key checks, plus the task ID and literal counts when Osmos did the work.
5. **The write-back trail.** What each session found and what it left open.

![Two people on either side of a dotted line with an open folder between them. Fanned out of the folder are six cards: a small notebook card, an instructions page, a map of two cylinders linked to table cards, a branching route, a checklist, and a short stack of documents](/images/2026/11/the-notebook-isnt-what-you-built-handoff.jpg)

If you build this way, all 5 already exist, and the handoff just has to include them. Where they live is your call. Mine are in Notion; markdown files in a repo work fine too. Wherever they live, they go [into the client's library and into the scope](/2026/09/30/distribute-the-wisdom/), and the trail follows the rules from [No Black Boxes Either Way](/2026/11/10/no-black-boxes-either-way/).

## Start this week

- For every agent-built notebook, write down in one place what it reads, what it writes, and every consumer of its output: notebooks, shortcuts, pipelines, models.
- Add a "do not rename" line for anything orchestration calls by name. It costs one sentence.
- Put a skill router on your instructions pages. Name the route for each kind of work, list the conditional skills separately, and write down exactly when a remote agent gets a whole job.
- Write a completion gate with real checks, and say outright that "the run succeeded" doesn't pass.
- Next time someone asks for "the prompts," send them the instructions page.

## Takeaways

- When an agent writes the notebook, what you built is the instructions, context, route, and gate. The notebook is their output.
- Any agent can document a notebook after the fact. It still can't see what the notebook feeds, because those dependencies live outside the file.
- My session prompt is one line. The instructions page is the thing worth saving.
- Put a skill router on every instructions page and the prompt never has to name a skill.
- Write the completion gate down and hand over the numbers. A green run doesn't pass it.

**Key takeaway:** pick one agent-built notebook in your workspace and list who reads its output. If you can't, nobody else can either, and that notebook is a house with no plans.

That's what building means to me now. The notebook an agent produces looks a lot like one written by hand, and I own everything that went into it. My prediction: within a year, an agentic Fabric statement of work that lists notebooks as the deliverable and says nothing about the instructions behind them will read as incomplete. Keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
