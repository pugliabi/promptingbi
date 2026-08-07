---
title: "Your Semantic Model Needs a .ai Folder"
date: 2026-08-02T09:00:00Z
permalink: "2026/08/02/your-semantic-model-needs-a-dot-ai-folder"
draft: true
description: "AI context for your data should live inside the semantic model, not in a bolt-on agent. Why Power BI needs a .ai folder, and what to build today."
featured: /images/2026/08/dot-ai-folder-banner.png
tags:
  - ai-agents
  - semantic-models
  - power-bi
  - reporting
  - microsoft-fabric
  - business-intelligence
source:
  episode: 541
  title: "Helping Leaders Speak Data"
  notion: "https://app.notion.com/p/368e74c69c18804aa729d4a7e0f51e86"
---

If I could get one feature request in front of the Power BI team, it would be this: put a **.ai folder inside the semantic model**. A place in the model definition itself where instructions, skills, and business context for AI agents actually live. Markdown files. An agents file. Lightweight stuff. Nothing exotic.

I keep making this pitch because everything else in the agentic Power BI story has fallen into place except this one piece. Agents can edit models. Agents can now genuinely build reports. What they still can't do is open up YOUR semantic model and find the business context they need sitting where it belongs. That context is scattered across chat histories, personal skill folders, and increasingly, paid abstractions that sit on top of the model instead of inside it.

My position is simple. The semantic model is where meaning lives in the Microsoft data stack. So the context an agent needs to understand that meaning should live there too. Not next to it. Not on top of it. In it.

![A semantic model made of connected table cards with a glowing folder embedded at its center, receiving flowing context lines from an agent node on the left](/images/2026/08/dot-ai-folder-banner.png)

## Agents Can Finally Build. Context Is the Bottleneck.

Let me set the stage with what changed. Microsoft published agent skills in the Skills for Fabric repo on GitHub that can author PBIR files, capture screenshots, reload Power BI Desktop, and iteratively refine report pages. Alongside that, Power BI Desktop got a gateway: a command line interface that lets an agent tell Desktop to refresh itself and hand back screenshots. Between the two, the last big gap in agentic Power BI development, actually designing the report, is closing.

I've used these skills already, and I've been pretty astounded at how well they work. Not perfect. But not long ago the honest answer to "can an agent design my report?" was no, and now it's yes, with caveats.

Here's the caveat that matters. When I just said "here are the measures, go design a report," the results were sporadic. When I gave it real context, screenshots of a page I wanted to echo, the transcript of my last stakeholder meeting, the metrics that conversation surfaced, it did a nice job. It even handled conditional formatting, which remains one of the most tedious clicking exercises in all of Power BI (I don't do money visuals without conditional formatting, so believe me, this one hit home).

Notice what the difference was. Not the model. Not the skill. The **context**. Which raises the question every BI team is about to run into: where is that context supposed to live?

## Today the Answer Is "Somewhere Else," and That's the Problem

Right now, there is no structure inside a semantic model for any of this. Nothing in the TMDL. Nothing in the definition. The relationships and measures are there, and if you're disciplined, some descriptions. But the deeper business context, why these measures exist, how the dimensions are meant to be used, what a sane report against this model looks like, has no home in the model itself.

So where does Microsoft point you? At abstractions that sit on top. A data agent in Fabric is exactly that: a separate thing you configure, stacked on the model, running on Fabric compute. Ontologies are the same story, a second store of meaning living apart from the first one. Every one of these approaches takes knowledge that describes the model and moves it AWAY from the model, into something that costs more money to run.

![A semantic model of table cards with an external agent box hovering above it on a dotted line, contrasted with the same model holding a small folder nested inside its structure](/images/2026/08/dot-ai-folder-inside-outside.png)

Compare that to what happened in software development. Your repo has a .vscode folder. It has a .claude folder, an agents file, whatever your harness reads. The instructions travel WITH the code, in source control, versioned, reviewed, free. Nobody in software argued that project context should live in a separate paid service floating above the repository. It was obvious that the context belongs with the thing it describes.

It's the same logic my grandmother applied to recipes. The sauce recipe lives taped inside the kitchen cabinet, right where the cooking happens. It does not live in a safety deposit box downtown that charges you a fee every time you want to check the ingredients. When the knowledge lives with the work, anyone who walks into the kitchen can cook.

## What a .ai Folder Would Actually Hold

So make it concrete. A .ai folder in the semantic model definition, sitting in the PBIP structure the same way .vscode sits in a repo, holding:

- **An agents file.** The top-level brief: what this model is for, what business process it describes, what a correct answer looks like.
- **Skills scoped to this model.** When you build against this data, here's how we name measures, here's the report layout standard, here's what to validate. Skills that attach to the model, not to one developer's laptop.
- **Column, table, and model-level AI metadata.** And this part isn't hypothetical. The Open Semantic Interchange, an open spec, already includes an AI section with AI-specific fields at exactly those three levels. The industry has started writing this down. The metadata belongs in the model layer, and the OSI approach has the added virtue of being open: it works with anything, not just one vendor's compute.

None of this is heavy. We're talking about markdown files and metadata fields. Small weight, low cost, high leverage. Every agent that touches the model, whether it's building a report, writing a measure, or answering a business user's question, starts from the same brief instead of improvising from whatever happens to be in its context window.

![An open folder releasing document pages and script brackets that flow along connector lines into an agent node, which produces a bar chart and a measure card](/images/2026/08/dot-ai-folder-contents.png)

Can Microsoft build this? Of course they can! The team is famously protective of the semantic model layer, and I get it. But this is not a heaven-and-earth change. It's a folder.

## The Honest Counterargument Is About Money

Now let me steelman the other side, because there's a real reason this might not happen, and it has nothing to do with engineering.

Metadata stored inside the semantic model is portable and free. You can point any agent at it, from any provider, without spending a drop of Fabric compute. A data agent, on the other hand, requires Fabric compute to run. If you're the vendor, one of these drives consumption and the other doesn't. There are two goals in tension: add value to customers, and get more usage on the meter. Keeping the model "pure" while selling the AI layer as a separate compute-consuming product is the version that pays.

I understand the incentive. I still think it loses. Here's why: Microsoft already shipped skills, openly, on GitHub, in a format that works across harnesses. That tells me the people building this stuff understand that the agentic world runs on portable, inspectable context, and that fighting portability is a losing position when an open spec is already standardizing AI metadata at the model level.

So here's my prediction, and I'll stand behind it: **before the end of 2026, the semantic model definition gets a home for AI assets.** A folder for skills, instructions, and agent resources, per model. I'd bet a steak dinner on it.

## Don't Wait for the Folder

Here's the practical part, because you can capture most of the value today without waiting for Microsoft to make it official.

1. **Put the knowledge you already have into the model.** Descriptions on measures, tables, and columns are the one sanctioned place business context lives in the definition today, and agents read them. If you understand why a measure exists, write it down where the model stores it.
2. **Create the .ai folder yourself, in your PBIP repo.** The spec doesn't recognize it, but your repo doesn't care. Put a docs folder next to your .SemanticModel folder with the agents brief, the naming standards, the validation rules. Point your harness at it. When the official folder ships, you'll be moving files, not inventing content.
3. **Build a human-readable model skill.** This is one I'm actively working on: a skill that reads the semantic model and translates it for your center of excellence. Not just a strict list of columns, but "here's what you need to know before you touch this model." The same context that helps the agent helps the human who's about to make a request against it.
4. **Stop feeding model context into one-off chats.** Every time you paste an explanation of your model into a chat window, you're creating context that evaporates. Write it once, store it with the model, reference it forever. I hate redundancy.

![A semantic model flowing through a document lens into a clean readable page that reaches a row of people nodes on the right](/images/2026/08/dot-ai-folder-human-readable.png)

## Takeaways

- Agents can now author PBIR files, refresh Desktop, and iterate on report pages. The bottleneck has moved from tooling to context.
- There is currently no structure inside a semantic model for AI context. Data agents and ontologies store the model's meaning outside the model, on paid compute.
- Software solved this years ago: context travels with the artifact it describes, in source control. The semantic model deserves its .vscode moment.
- The Open Semantic Interchange already specs AI metadata at the column, table, and model level. The direction is set; the vendor implementation is the open question.
- Start now: descriptions in the model, a .ai docs folder in your PBIP repo, and a skill that makes your model human readable.

**Key takeaway:** this week, create one markdown file next to your most-used semantic model that explains what the model is for, how measures are named, and what to validate. Then point your agent at it before its next task. That file is your .ai folder, a year early.

The semantic model has always been the product in Power BI. In the agentic era, it's also the documentation, the training manual, and the instruction set, all in one place. Or at least it should be. If you're thinking through where your model context should live, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
