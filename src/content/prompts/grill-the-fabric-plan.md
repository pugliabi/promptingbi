---
title: "Grill the Fabric Plan"
description: "A one-page skill that interrogates a Fabric build before anything gets created, by naming the design tree and delegating the interview."
category: agent-skills
date: 2026-09-21T09:00:00Z
format: markdown
source:
  permalink: "2026/09/21/a-skill-md-is-not-wisdom"
draft: false
---

First, credit: the interview technique this page depends on is **not mine**. It is the `grilling` primitive from [Matt Pocock's skills repo](https://github.com/mattpocock/skills), the thing behind `grill-me` and `grill-with-docs`, documented at [aihero.dev/skills](https://www.aihero.dev/skills). Install the set before this page is worth anything: `claude plugins install mattpocock-skills` in Claude Code, or `npx skills@latest add mattpocock/skills` anywhere else. `grill-me` on its own is a one-line wrapper and does nothing without the primitive.

This page is the Fabric-shaped wrapper around it. It deliberately contains **no interview**. His docs are explicit that a skill needing an interview should invoke the primitive rather than write another one, and copying five good sentences into your own file and then editing them is how you end up maintaining a worse version of somebody else's skill. What a Fabric wrapper adds is the part the primitive cannot know: the design tree for a lakehouse build, in dependency order, and which branches are decisions rather than facts.

Run it in a fresh conversation, with your house skills already loaded and no plan pre-written.

## The skill

```markdown
---
name: grill-the-fabric-plan
description: Interrogate a Fabric build plan before anything gets created. Use
  when starting a new lakehouse, pipeline, or semantic model effort, or when a
  project's purpose has changed and the old plan has not.
disable-model-invocation: true
---

Run a `grilling` session over this Fabric plan. Do not write the plan, do not
create items, do not open a notebook, and do not run a pipeline until I confirm
we have reached a shared understanding.

## Read before the first round

Facts are yours to find. Everything in this list is something you can answer
without asking me, so answer it before the first round and bring what you
learned into the questions.

| Source | What you are looking for |
|---|---|
| Project brief, SOW, meeting notes in context | Scope, who asked, what changed recently |
| House skills already loaded | Lakehouse layout, naming, notebook patterns |
| The tenant, read only | What workspaces, lakehouses, models already exist |
| Existing notebooks and pipelines | What is already running that this touches |
| Source system docs or samples | Shape, paging, keys, refresh windows |

If a source in this list is missing, say which one and ask for it once. Do not
infer a source system's behavior from its name.

## The design tree, in dependency order

Work these as frontiers, not as a checklist. A branch whose answer depends on
an unsettled branch above it belongs in a later round.

1. **Purpose.** Analytical, operational, agentic, or feeding an application.
   Every branch below reads differently depending on this, so settle it first
   and say out loud what it rules out.
2. **Consumers.** Who or what reads the output: people in reports, an
   application over an endpoint, an agent, another team's pipeline. Name them.
3. **Sources and landing.** What lands raw, who owns it upstream, whether we
   ingest or consume what they hand us, what the refresh window is, and what
   happens when their API pages or their schema moves.
4. **Layer boundaries.** What each medallion layer is responsible for here,
   and which layer owns conformance. For any transformation we discuss, name
   the layer it belongs in before we discuss how it works.
5. **Grain.** One row per what. Ask it per fact table in scope, separately.
   A grain nobody stated is the single most common cause of a number that is
   quietly double what it should be.
6. **Keys and history.** Reliable business keys or surrogates. Slowly changing
   or not, and for each answer, how we would KNOW rather than what we assume.
   Which column decides the current row.
7. **Semantic model shape.** One model or several. Direct lake or import, and
   why. What stays out of the model on purpose. Whether an existing model gets
   extended instead of a new one created.
8. **Orchestration.** What triggers what. What is allowed to fail. What must
   not run twice. Who finds out when it breaks, through what channel.
9. **Definitions and ownership.** Which numbers in scope already have a named
   owner, and which ones two people used differently in the same meeting.
   An unowned definition is a blocker, not a detail.
10. **Validation.** What we will assert before this is called done: row counts
    at each hop, bounded value sets, one number a stakeholder would recognize
    on sight. If nobody can name the expected value, that is a finding.
11. **Capacity and cost.** What this is expected to cost to run, what we would
    turn off first, and whether anything here competes with an existing
    workload for the same capacity.

## Rules

- **Facts are yours. Decisions are mine.** Read the tenant, the notes, and the
  loaded skills. Never ask me something the environment can answer. Dispatch a
  sub-agent for a lookup and keep asking the rest of the frontier while it runs.
- **Recommend an answer to every question**, then wait. I answer by number.
- **Ungrillable questions are out of scope here.** How a page should look or
  feel, one report or three, cannot be settled by talking. Name it, skip it,
  and we prototype it instead.
- **Note every override.** When I reject your recommendation, record the
  question and my answer verbatim. That list is the output I care most about.
- **Do not collapse the tree to be helpful.** Two questions in one round must
  not depend on each other. If you realize mid-session that one answer should
  have changed another, reopen that branch in the next round and say so.
- **End with what is still assumed.** List every branch nobody settled and
  label it unverified. Silence is not agreement.

## When the frontier is empty

Wait for me to confirm. Then, in this order:

1. Write the build instructions from this conversation, not from a fresh start.
2. Turn them into issues or tasks, one per deliverable, with the validation
   from branch 10 attached to each.
3. Hand me the override list separately. Those go into the house skills.
```

## Adapting it

- **Do not rewrite the interview.** The single highest-value line in this page is `Run a grilling session`. Every hour spent tuning your own interview loop is an hour spent maintaining a worse copy of a skill somebody else updates for free.
- **Branch 1 is not a formality.** Analytical, operational, agentic, or application-backing changes the correct answer to every branch below it. Sessions that go sideways almost always skipped it and defaulted to "reporting" silently.
- **Grain gets asked per table, never once.** "What is the grain" answered at project level is the answer to nothing. Ask it of each fact in scope and write each answer down.
- **"How would we KNOW" is the load-bearing phrase in branch 6.** It converts an assumption into either a fact somebody can check or an admission that nobody knows. Both are useful. An unqualified "yes it's slowly changing" is neither.
- **Keep facts on the agent's side of the line.** A session that asks you what tables exist has spent your attention on something a read-only tenant sweep answers, and attention is the scarce input here. This is also why a [recon pass](/prompts/fabric-recon-brief/) pairs well in front of it.
- **The override list is the actual deliverable.** The plan is nice. The list of places you rejected the recommendation is your judgment made visible, and it belongs in your house skills that same afternoon. Anything you override three times was never judgment, it was context you had not written down.
- **Branch 10 feeds a real gate.** The expected values you name during grilling are what an [interrogation gate](/prompts/pipeline-interrogation-gate/) checks against later. Naming them before the build is what makes the gate answerable after it.
- **Cut branches you do not own.** If capacity is somebody else's decision at your org, delete branch 11 rather than grilling yourself about it. A branch you cannot decide is a question that wastes a round.
- **Give it your best model.** The quality of the questions depends on the model's own sense of how systems break, which is not something your context supplies.

The argument for why a skill file cannot hold the judgment this page extracts: [A skill.md Is Not Wisdom](/2026/09/21/a-skill-md-is-not-wisdom/).
