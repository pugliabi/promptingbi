---
title: "Build the Thing That Creates the Thing"
date: 2026-09-16T09:00:00Z
permalink: "2026/09/16/build-the-thing-that-creates-the-thing"
description: "Stop prompting for the same notebook edit. Build the executor: an agent, its skills, and the context it reads, in a harness that reaches Fabric and Power BI."
featured: /images/2026/09/build-the-thing-banner.png
draft: false
tags:
  - agent-skills
  - ai-agents
  - context-engineering
  - microsoft-fabric
  - prompt-engineering
  - business-intelligence
source:
  episode: 540
  title: "Self Service with AI Part 2"
  notion: "https://app.notion.com/p/388e74c69c1880759ca5e5016e391f29"
  youtube: "https://www.youtube.com/watch?v=RcxzBjyxKmo"
  transcript: "transcripts/ep-540.txt"
---

Anthropic published the number that should stop your quarter. Their offline accuracy on agent-driven analytics started around 95% at launch. A month later it sat around 65%. Nobody broke anything, no model regressed. The skill documents describing the data fell behind the data, and the whole thing quietly slid thirty points.

Then the number I find even more useful: roughly 90% of the commits and pull requests on that system are skill changes. Not code. The written context.

So here is what I have stopped doing. The instruction page is not my deliverable and neither is the notebook. The statement of work, the skill file, the domain context page: none of those are the asset. **The thing that creates the thing is more important than the thing.**

In practice that means my build time moved. It does not go into prompting for the same notebook edit for the fourth time. It goes into **building the executors**: an agent, the context it needs, and the skills that tell it how we work here, sitting in a harness that can reach Fabric and Power BI. That thing gathers the requirements. It tells me what is going to break. Then it builds, and it reports back where it wrote things.

The instruction pages and the notebook scaffolds are what the system prints. What earns its keep is the executor that can print them again on Friday, correctly, after the data moved.

## Skills Are Recipes. Recipes Are Not Cooks.

If you had an agent for cooking, its skills would be your recipes.

Read a real sauce recipe and most of it is procedure. Always start with these base ingredients. When it comes out too sweet, add salt. If it is still too sweet and you refuse to add sugar, go get carrots. Never add celery, that is only for northern Italians. That is what a skill looks like, and it does a different job than your semantic model. Your sources of truth carry the **declarative** knowledge, what a metric means. The skill carries the **procedural** knowledge: which source to consult in what order, how to handle ambiguous data, and what a finished piece of work looks like.

Here is the part people skip. A recipe box does not make you a cook. Hand your recipe box to somebody who has to cook in a kitchen with no oven, on a budget, for someone with a dairy allergy, and the box is nearly useless. What you want is the cook. The cook can write the recipe for a kitchen he has never worked in.

Every skill file I have written is a recipe. The converter that rewrites those skills for a kitchen I have not worked in yet is the cook. Guess which one I want to own.

![A single recipe-style document card on the left flowing right through a circular processing node that emits three fanned-out document cards, each connecting onward to a small bar chart and a table card](/images/2026/09/build-the-thing-banner.png)

## Everything You Hand-Wrote Is Already Wrong

We have said for years that data is a living organism. Skills are living organisms now too. A skill document describes a data model that changes daily, so left alone it goes wrong in weeks. That is how you get from 95% to 65% with nobody doing anything wrong.

I have written about skill [drift](/2026/07/23/agent-skills-are-the-new-theme-files/) as a governance problem, and it is. Look at the maintenance load underneath it, though. If 90% of your commits are context edits, and your process for a context edit is a human opening a markdown file and retyping the parts that moved, you have built a job nobody will ever fully staff. The companies that fail here will have written their skills. They wrote them once, shipped them, and got asked in month three why the agent went stupid.

And nobody will be given time to look. That is the part I am most sure about. Skill maintenance has no ticket type, no story points, no place in a sprint. So it becomes the thing everyone agrees matters and nobody is scheduled to do.

Discipline will not fix that. Making the emit cheap will. If regenerating the instruction page takes one sentence and four minutes, it happens weekly. If it takes an afternoon of retyping, it happens never.

![A crisp document card on the left whose horizontal content lines progressively fade and fragment toward the right, with a dotted return path looping from the degraded card back through a node to the intact one](/images/2026/09/build-the-thing-drift.png)

## You Are Betting on the Harness, Not the Model

Here is the loop I ran for months. You open a session. You explain the lakehouse layout again. You paste the naming conventions again. You ask for the same notebook edit you asked for last Thursday, re-explain why the validation matters, then read the output and correct the same two things. Tomorrow you pay full price again. That is manual work with a chat window in front of it.

What I build instead is the **executor**. An agent with a defined job, carrying the skills that know Fabric, pointed at the project context: the statement of work, the meeting notes, the current milestones. Most people start with one general assistant they chat with about anything, and that version never gets good. Mine runs as [a small set of agents with real roles](/2026/08/03/meet-my-assistants/), instructed to hand work to each other, because a do-anything chat window has no idea what it is responsible for.

The skills are what make it work, and I learned that by not having them. I did not want some random model creating things for semantic models in Fabric. It does not know what it is looking at, so it is not going to do it right. Being intentional about which skills and instructions a given agent carries is the difference between output you can use and [output somebody senior has to fix](/2026/09/14/dont-hire-a-senior-to-qa-the-agent/).

Here is the session that made it concrete for me. During a discovery phase I needed to understand a client's API. My agents wrote the instructions for the interrogation, Claude ran the calls against it, worked through what came back, and wrote what it learned into the second brain. I was having coffee. It gathered the requirements, did the work, and reported back, and at no point did I re-explain the project. I run the same pattern on Fabric now: the Fabric MCP server, skills for Fabric, and the instructions I keep building on top of them. I open by [asking what it can see in the tenant](/2026/08/17/dont-let-your-agent-touch-fabric/) before I ask it to build anything. One of the better feelings in this job.

**It was never just the prompt. It is the harness behind it.** A harness is a workbench, and the executors are what you assemble on it, which makes the model the least interesting variable in the setup. What matters is whether **your harness carries the proper context**, and whether you know what that harness is best at.

Those two go together. One harness holds context beautifully, reasons over it, and cannot execute a line of code. Another executes against your tenant all day and knows nothing about the conversation you had on Tuesday. Both are useful. It is why the converter below starts from what the target cannot do: I am not hunting for one harness that does everything, I am matching each job to what a harness is good at, then handing off across the gap. Get that pairing right and the model underneath barely registers. Get it wrong and no model saves you.

Context is more than the prompt, too. It is the meetings, the statement of work, the tenant state, and [the decisions somebody made in April](/2026/08/26/hard-data-soft-data/). That has to live somewhere organized the harness can reach, shaped around how you work, because your workflow is not mine. Keep it somewhere your next harness can reach as well. The tool you use in a year may not be on your machine today. Your context should not care.

![A workbench frame containing a filled agent node with small skill cards and context cards docked to it, with connector lines running right out of the frame into a lakehouse cylinder, a code bracket block, and a dashboard panel](/images/2026/09/build-the-thing-executor.png)

## The Converter Is the Real Artifact

An executor is only as good as the skills it carries. Mine got tested the week the work moved.

I had a workflow I was happy with: [a second brain in Notion that writes the instructions](/2026/07/20/stop-re-prompting-second-brain-agent-instructions/), then [Claude executing against Power BI over MCP](/2026/08/05/inside-an-mcp-execution-session/). It works. Then the projects shifted toward data engineering and integration notebooks on the Fabric side, and I could not run that same workflow from the same place. Different execution surface, different tooling, same brain needing to drive it.

The obvious move is to rewrite everything for the new harness. I did not want to write it twice, and I really did not want to maintain it twice.

So I built a **skill converter**. It takes a skill written for Claude, including skills with scripts in them, and rewrites it into something Notion understands, because Notion does not run code or build applications. What it does do is hold context and reason over it. So the converter preserves the procedural knowledge and translates the execution assumptions around it. The Fabric skills I use came out of the Skills for Fabric repo, written for a coding harness. They run inside a Notion Fabric advisor today because a converter rewrote them, not because I retyped them.

Skills are interchangeable. That is the good news. The bad news is that **managing skills across harnesses is the hardest part of this whole practice**, and a converter is the only answer I have found that does not scale linearly with the number of tools I use.

```markdown
# Skill: Convert a Claude Skill into a Notion AI Skill

Trigger: "convert <skill> for Notion"

## The constraint that shapes everything
Notion cannot execute scripts. Convert the knowledge, the context, and the
decision logic. Never convert the mechanics.

## Classify before you write
- Workflow skill (interview processes, drafting wizards): the procedure is the
  value. Preserve the steps, the interaction contract, the output format.
- Technical skill (semantic models, DAX, notebooks): the knowledge is the
  value, because the target can never run the mechanics. Write a domain brief.

## Rewrite rules
1. A script the target cannot run becomes the reasoning that script encoded:
   the steps, the inputs, and the shape of the expected output. Never paste the
   code itself.
2. Never drop a step because the target cannot perform it. Convert it into a
   hand-off that names the harness that can, and what it needs handed over.
3. Preserve every guardrail verbatim. The guardrails are the part that cost
   someone a bad afternoon to learn.
4. Copy business facts exactly. Rates, hour estimates, naming conventions.
   A rephrased rate is a wrong rate.
5. Put the load-bearing rules at the very top and the very bottom. Attention is
   strongest at both ends.
6. Resolve nothing by guessing. If the source assumes a tool the target lacks
   and there is no hand-off available, say so and stop.

## Report back (required)
- What was kept, what was compressed, what was dropped
- Which steps became hand-offs back to a harness that can execute
- Any secret found in the source and refused
```

Read rule 2 again, because it is the one that keeps a converted skill honest. When a harness cannot do something, the temptation is to quietly drop the step. Six weeks later a validation pass is missing and nobody remembers deciding to skip it. A hand-off leaves the step visible and names who owns it.

![One skill document card on the left passing through a single conversion node and emerging as three differently shaped output cards on the right, each linked onward to a distinct destination icon: a code bracket block, a lakehouse cylinder, and a dashboard panel](/images/2026/09/build-the-thing-converter.png)

## Point It at a Meeting and It Writes the Page

The converter gets the skills into the harness. The generator turns those skills into today's brief, which is what the executor runs on.

The loop I run now: I have a meeting with a client team and they walk me through their data integration. Here is what matters to us, here is what we are trying to get to, the API comes back in this shape. Notes land in the second brain the way [everything else does](/2026/07/29/anatomy-of-a-project-hub/). Then I open the Fabric advisor, the one holding the converted Fabric skills, and I say one sentence.

Update the instructions for this project.

That is the whole prompt. What comes back is a fresh instructions page for the build session, written against notebook authoring patterns, lakehouse conventions, and the naming standards that agent already knows. Before I go near a notebook I ask the other question that earns its keep: we just talked to the source system team, are there any barriers here, anything that is going to pose a problem? It has the meeting and it has the skills, so it answers about this project instead of in general.

```markdown
# Agent: Project Instruction Writer

Trigger: "update the instructions for this project"

## What this agent is for
Emitting the instructions page a build session runs on. It writes the brief.
It does not build the thing. If you catch yourself authoring notebook code,
you are the wrong agent for this job.

## Read first, every run
| Source | Why |
|---|---|
| Project hub page and its relations | Scope, milestones, current priority |
| Meeting notes added since the last emit | What changed, in their words |
| Fabric skills: notebook authoring, lakehouse, naming | The house patterns |
| The previous instructions page | Diff against it, never start from zero |

## What to emit
- One page per job, not one page per project. Small enough to finish.
- A dated #1 priority at the top, taken from the hub, not from the last page.
- Verified state: what is confirmed to exist in the tenant right now, dated.
  If it was not confirmed this week, label it unverified.
- The validation the session must pass before it reports success.
- A report-back requirement naming where results are written when it finishes.

## Before you emit, raise the barriers
List anything in the new notes that will break this build: an API that pages,
a source with no reliable key, a definition two people used differently in the
same meeting, a date field nobody could explain. One line each. If the notes
contain no barriers, say that explicitly rather than staying quiet.

## Never
- Never invent a source system, a table, or a rule the notes do not support.
- Never carry a stale priority forward because it was in the last page.
- Never bundle two jobs into one page to save yourself an emit.
```

That page is output. If the project moves next week I regenerate it rather than edit it, and being disposable is what makes it trustworthy.

So the shape is four pieces. Skills carry the procedural knowledge. A converter moves them to whatever harness the job belongs in. A generator turns them plus this week's context into the brief. The executor runs the brief against Fabric or Power BI and reports back. None of the four is a document I maintain by hand.

If you want somebody else's version of that shape with the seams closed up, [Fabric Task Flow Studio](/2026/08/21/fabric-task-flow-studio/) is it. You describe the problem, it interrogates you, then it emits and deploys, and the artifacts come out the back end.

![A conference table with seated figure nodes on the left, connected by flowing lines through a processing node into a structured instruction document card, which continues right into a lakehouse cylinder and a bar chart](/images/2026/09/build-the-thing-meeting.png)

## Getting the Knowledge Out of Your Head

There is an organizational version of this that matters more than my personal workflow.

Ask what a great BI professional actually knows. Which fact table is the real one. That the member count everybody quotes is the one with the exclusion, not the one with the nice name. That marketing has to use a different date table. Where the bodies are buried, all of it. Right now that lives in a head, and the transfer mechanism is that person sitting next to somebody for two years.

Skills are the first real vehicle I have seen for getting head knowledge out into a company. Documentation gets written once and read never. A skill is procedural knowledge an agent applies every single time, in [the words that team actually uses](/2026/08/24/ai-coe-better-not-bigger/). And a generator keeps that knowledge current without the expert retyping it after every change, which is the step where every documentation effort in history has died.

That is the honest source of the speed, too. I can walk into a company now and say we start immediately and get somewhere in a quarter of the time it used to take, because the system is already standing. The executors and the converters exist, so the first week is about their business instead of my scaffolding. If you can work this way and you are not, I think you are behind. Not being harsh. That is the arithmetic on what a standing system does to a delivery timeline.

Two guardrails before anyone reads that as permission to go fast. Governance still applies. I will not roll agentic solutions onto a company's analytical data when [nobody owns the definitions](/2026/08/12/youre-ai-ready-your-organization-isnt/), because the generator will faithfully produce a beautifully structured artifact built on ambiguity. And a generator earns the same [certification rigor](/2026/09/02/write-the-contract-before-you-hire-the-watchdog/) as anything else you promote. If a domain owner is going to announce an agent to stakeholders, a frozen slice of evaluation should clear a threshold first, the same way a certified semantic model does.

## Build One Executor This Week

Pick one job you keep re-explaining and stand up the thing that does it.

- **Name the job before you name the tool.** One job, one agent, with the skills that job needs and nothing else. A do-anything assistant is a chat window sitting next to your calendar.
- **Find the artifact you have written three times.** Instruction pages, domain context pages, notebook scaffolds, statements of work. Third time is the signal. It was already worth building at the second.
- **Split what changes from what never does.** The parts that never change are the skill. The parts that change every project are what the generator reads. Mixing them is why your last template rotted.
- **Give it one trigger phrase and keep it forever.** Mine is "update the instructions for this project." A phrase you never change is what makes this a reflex.
- **Make it read the previous version and diff.** A generator that starts from zero every run will silently drop things you needed. Diffing is what makes regeneration safe.
- **Answer four questions before you convert anything.** Can the target execute code, can it reach your tenant, where does it read context from, can it write back. Those answers decide the entire shape of the converted skill.
- **Keep the canonical copy where more than one tool can reach it.** Every harness stores skills its own way, some on disk, some in your account, and that is fine. Just make sure the version you regenerate from lives somewhere versioned, so the next harness starts from your skill instead of a copy of a copy.
- **Make the executor gather before it builds.** Ask what it can see in the tenant, and what in this week's notes is going to be a problem. Both answers come before a line of code.
- **Change your measure of done.** The measure is "I can regenerate this page in under five minutes, hand it to an executor, and trust what comes back."

## Takeaways

- Opening a session to re-explain the lakehouse and ask for the same edit is manual work with a chat window in front of it. Build the executor: one agent, one job, carrying the skills and the project context, running against Fabric and Power BI on its own.
- It was never just the prompt, it is the harness behind it. Load your harness with the proper context, learn what it is best at, and hand off across the gap. The model is the least interesting variable in the setup.
- A random model pointed at your semantic model does not know what it is looking at. Be intentional about which skills each agent carries or you will spend your week fixing plausible output.
- Accuracy sliding from 95% to 65% in a month with nothing broken is what a hand-maintained context layer does on its own. Artifacts expire, which is why they cannot be the asset.
- When 90% of your commits are context edits, hand-editing context is a staffing plan you will never fund. Make the emit cheap and maintenance stops needing discipline.
- Skills are recipes: procedural knowledge sitting on top of the declarative knowledge in your model. A recipe box is not a cook, and the cook is what you want to own.
- Managing skills across harnesses is the hardest part of this practice. A converter that translates execution assumptions beats retyping the same skill per tool, and it should never drop a step the target cannot perform. Name a hand-off instead.
- Governance still applies. No ownership of definitions, no agentic rollout, and no announcement to stakeholders until a frozen evaluation slice clears a bar.

**Key takeaway:** this week, take the job you have re-explained to an agent three times and build the executor that does it: the agent, the skills, and the context it reads, in the harness that can reach your tenant. Then hand it a brief you generated instead of typed.

My prediction: within a year, the strongest data professionals will be judged less on the models and notebooks they built and more on the executors they own and the context they keep fed, and job descriptions will start asking for them by name. If you are working out where your first executor should sit, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
