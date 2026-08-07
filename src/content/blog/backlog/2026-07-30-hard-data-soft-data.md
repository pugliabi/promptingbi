---
title: "Hard Data, Soft Data: The Layer Your AI Agent Is Missing"
date: 2026-07-30T09:00:00Z
permalink: "2026/07/30/hard-data-soft-data"
description: "Your semantic model is only half your data. Why soft data, the decision logs and business context behind your tables, decides if AI agents work."
featured: /images/2026/07/hard-data-soft-data-banner.png
draft: true
tags:
  - ai-agents
  - semantic-models
  - claude
  - context-engineering
  - governance
  - microsoft-fabric
source:
  episode: 539
  title: "Self Service Analytics with AI"
  notion: "https://app.notion.com/p/376e74c69c18807faf53e555c51e6545"
---

Picture the cleanest semantic model you've ever shipped. Star schema, documented measures, certified, refreshing on schedule. Wire an agent to it and let a business user ask how the Q2 launch did. The agent sums revenue for calendar Q2. At this company, "the Q2 launch" is the nickname for one specific product, the question is really about that product's first ninety days, and the person is asking because there's a board meeting Thursday. The agent answered the question it was handed. It had no way to know the question that was meant.

Nothing in your semantic model can fix that.

We've spent fifteen years getting very good at **hard data**, the relational, tabular, modeled world that lives in Power BI and Fabric. Whether agentic analytics works at your company gets decided by the other kind, what I call **soft data**: the decision logs, the org structure, the roadmaps, the meeting notes, the pile of context that explains what your hard data means. Almost every team skips it, because it never shows up as a deliverable. It became part of the BI estate anyway.

![Two parallel streams flowing left to right into one dashboard: the top stream is structured table cards and star schema shapes, the bottom stream is loose documents, chat bubbles, and org chart nodes, and the two merge at a single node before the chart](/images/2026/07/hard-data-soft-data-banner.png)

## Two Kinds of Data

**Hard data** is everything we already treat as our job. Fact tables, dimensions, relationships, measures. Modeled, refreshed, secured, living in a semantic model where every column has a place. When someone says "data," this is what BI professionals picture.

**Soft data** is everything else the business runs on. The metric definitions sitting in a SharePoint doc. The org chart. The product roadmap deck. The decision log from the meeting where two teams finally agreed what counts as an active member. The Teams thread explaining why the west region numbers look weird for March. None of it is tabular, none of it is in your model, and all of it is still data.

![Structured table cards on one path and documents, chat threads, and org chart nodes on another, both feeding a single node that produces one dashboard answer](/images/2026/07/hard-data-soft-data-two-streams.png)

Think about a restaurant. The menu is hard data: structured, versioned, every dish with a price, a description, and an allergen note. Then a regular sits down, doesn't open the menu, and says "I'll have the usual." The menu is now useless. What "the usual" means lives with the waiter who has worked that section for three years, along with the fact that this guy never wants the special and always takes the sauce on the side.

A brand new waiter can memorize every item and every price on that menu and still put the wrong plate on the table. He isn't undertrained on the menu. He's never met the guy. Your agent is the new waiter. It's read every table in your model, and it's never sat in one of your meetings.

## What the User Asked vs. What They Meant

Anthropic published a piece on their engineering blog about how they run self-service analytics internally with Claude, and one section stopped me. Ranking the layers that make their agents accurate, they called business context the layer most teams skip, and the one they underrated the longest themselves.

Their framing is blunt. An agent that doesn't understand your business answers what the user asked, not what they meant. It won't know that "Q2 launch" is a product. It won't know that two teams define the same term differently. It won't know that Thursday's board meeting is the reason the question exists at all. So they piped company knowledge into the system: indexed documentation, roadmaps, decision logs, and their organizational structure, so the agent can resolve ambiguous references and ask better clarifying questions.

Documentation, roadmaps, decision logs, org structure. Not one item on that list is a table. The most agent-forward company on the planet went looking for what makes analytics answers trustworthy and came back with a corpus of soft data.

![Documents, an org chart, and a decision log feeding a central knowledge hub, which passes to an agent that resolves an ambiguous question into one dashboard answer](/images/2026/07/hard-data-soft-data-context-graph.png)

Most organizations already have this information. It's scattered across SharePoint, Teams, someone's OneDrive, and the heads of four senior people. It exists. It's not curated, not owned, and not reachable by anything, human or agent, at the moment a question gets asked.

## Why Nobody Builds This Layer

So why does everyone skip it? Because it's invisible. Nobody gets promoted for a decision log. You can demo a dashboard; you cannot demo a well-maintained glossary. Soft data work doesn't generate revenue on its own, it isn't a deliverable you can hold up in a steering committee, and you don't see the flowers from doing it. It loses the prioritization fight every single quarter. I get it. I've watched it happen at client after client.

I've also been beating this drum for years, so I'm going to allow myself a small told-you-so. When automated insights first showed up in Power BI, the feature that scanned a page and surfaced anomalies and trends, I said on day one it would disappoint people. It looked at everything equally. There was no way to guide it, no way to tell it which tables mattered for which questions, no weighting and no steering. It had all the hard data in the world and none of the soft data, and it produced insights nobody asked for. That's the same gap Anthropic is describing a full generation of technology later. The models got dramatically better and the missing layer stayed missing.

This was never a model problem. It's a curation problem, and curation is OUR job.

## AI Writes the Docs. Humans Own the Definitions.

The most common failure across every layer of an agentic analytics stack is poor or stale documentation, and we finally have tools that are good at producing documentation. Claude and Copilot will draft table descriptions, summarize a decision thread, and turn a rambling meeting into a clean decision log entry in seconds. I run this on my own project work out of [a single project hub](/2026/07/29/anatomy-of-a-project-hub/), where meeting notes become logged decisions and the agents read those decisions before they touch anything.

Can AI close the soft data gap by itself? Well, of course it can't. Generation is cheap now; ownership is the scarce thing. An agent can write a beautiful definition of "active member," and it will be beautifully wrong if nobody accountable signs off on it. The arbitration between two teams who define a term differently, the call on which document is the current one, the sign-off: that stays human. That is the job of [data governance](/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/), ownership and accountability over what things mean.

![A loop between a person and an agent: the agent drafts document cards, the person reviews and stamps them, and the approved documents flow into a governed library the agent reads from on the next question](/images/2026/07/hard-data-soft-data-ownership-loop.png)

Soft data also rots faster than hard data. Your fact table gets refreshed nightly by a pipeline. Your metric glossary gets refreshed never, by nobody. A context layer describing the business as it existed eighteen months ago is worse than no context layer at all, because the agent will use it at full confidence.

## Start Treating Soft Data Like Data

If I were standing this layer up at your company, here's the workstream, and every step is doable this quarter.

- **Inventory where meaning lives.** For your highest-traffic domain, list where the definitions, caveats, and tribal knowledge sit today. SharePoint, Teams threads, deck appendices, people's heads. You can't curate what you haven't located.
- **Start a decision log.** One page, append-only, capturing every call the business makes about data: what "active" means, why March is restated, which system wins when two disagree. Let AI draft the entries from meeting notes and make a named human approve each one.
- **Write one page of business context per domain.** What the domain is, the terms people use and what they resolve to, the nicknames like "the Q2 launch," and the questions this data can and cannot answer. Write it like an agent is reading it, because one will be.
- **Make the org structure machine-readable.** Who owns which metric, and which team asks which questions. When an agent knows who's asking, it answers better. So do your analysts, by the way.
- **Assign owners and a review cadence.** Every context page gets a name and a review date. Staleness is the failure mode and a cadence is the fix.
- **Point your agents at the curated set, not the wilderness.** Don't aim Copilot at all of SharePoint and hope. Aim it at the small, owned, current corpus you just built. Microsoft is clearly moving this direction with grounding and skills, so meet it halfway with context worth grounding on.

## The Semantic Model Was Never the Whole Model

For years the semantic model has been the heart and soul of what we do, and it still is. The name always promised more than the tables delivered. The semantics of your business were never fully in there. They were in hallway conversations, onboarding decks, and the argument about what counts as a lead. Agents are the first consumer that refuses to work around the gap, so we're finally going to write all of it down.

## Takeaways

- Your agent fails on nicknames, restatements, and disputed definitions long before it fails on DAX. Debug the context, not the measure.
- Start a decision log this week for your busiest domain and put three entries in it that currently live only in someone's head.
- Write one page of business context per domain: the terms, the nicknames, and the questions the data cannot answer.
- Let AI draft the documentation and make a named human approve it. Generation is cheap, ownership is not.
- Give every context page an owner and a review date. Stale context is worse than none, because the agent uses it at full confidence.
- Point agents at the small curated corpus you own instead of at all of SharePoint.

Give it a few years and the BI team's estate won't stop at the semantic model. A governed context corpus will sit right next to it, with owners, review cadences, and the same rigor we give a fact table today, maintained by the same team that maintains the tables. Until that exists at your company, every page you write is one more thing your agent doesn't have to guess about. If the line between hard data and soft data sparked something, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
