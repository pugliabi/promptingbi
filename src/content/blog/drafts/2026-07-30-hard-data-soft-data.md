---
title: "Hard Data, Soft Data: The Layer Your AI Agent Is Missing"
date: 2026-07-30T09:00:00Z
permalink: "2026/07/30/hard-data-soft-data"
draft: true
description: "Your semantic model is only half your data. Why soft data, the decision logs and business context around your tables, decides if agentic analytics works."
featured: /images/2026/07/hard-data-soft-data-banner.png
---

Picture the cleanest semantic model you've ever shipped. Star schema, documented measures, certified, refreshing on schedule. Now wire an agent to it and let a business user ask, "How did the Q2 launch do?" The agent confidently sums revenue for calendar Q2. Except at this company, "the Q2 launch" is the nickname for one specific product, the question is really about that product's first ninety days, and the person is asking because a board meeting is on Thursday. The agent answered what the user asked. It had no way to know what they meant.

Nothing in your semantic model can fix that. And that's the point of this post.

Here's my position: we've spent the last fifteen years getting really good at **hard data**, the relational, tabular, modeled world that lives in Power BI and Fabric. The layer that will decide whether agentic analytics actually works at your company is the other kind, what I call **soft data**: the decision logs, the org structure, the roadmaps, the meeting notes, the pile of context that explains what your hard data means. It's the layer almost every team skips, because it never shows up as a deliverable. And I think it just became part of the BI estate whether we like it or not.

## Two Kinds of Data

Let me define my terms, because this split has been rattling around in my head for a while.

**Hard data** is everything we already treat as our job. Fact tables, dimensions, relationships, measures. It's modeled, refreshed, secured, and it lives in a semantic model where every column has a place. When someone says "data," this is what BI professionals picture.

**Soft data** is everything else the business runs on. The metric definitions sitting in a SharePoint doc. The org chart. The product roadmap deck. The decision log from the meeting where two teams finally agreed what counts as an active member. The Slack thread explaining why the west region numbers look weird for March. None of it is in tabular format. None of it is in your model. All of it is still data.

![Two streams flowing into one dashboard: structured table cards on the top path and loose documents, chat bubbles, and org chart nodes on the bottom path, merging at a central node before reaching the chart](/images/2026/07/hard-data-soft-data-two-streams.png)

Think about a restaurant. The menu is hard data: structured, versioned, every dish with a price and a description. But when a regular sits down and says "I'll have the usual," the menu is useless. The knowledge of what "the usual" means lives with the waiter who's served that table for three years. A brand new waiter can memorize the entire menu and still fail that order. Your agent is the new waiter. It has read every table in your model, and it has never sat in a single one of your meetings.

## What the User Asked vs. What They Meant

Anthropic published a piece on their engineering blog about how they enable self-service analytics internally with Claude, and one section stopped me cold. Ranking the layers that make their agents accurate, they called business context **the layer most teams skip**, and the one they themselves underrated the longest.

Their framing is blunt: an agent that doesn't understand your business will answer what the user asked, not what they meant. It won't know that "Q2 launch" refers to a specific product. It won't know that two teams define the same term differently. It won't know the question is urgent because of Thursday's board meeting. So what did they do about it? They piped company knowledge into the system: indexed documentation, roadmaps, decision logs, and their organizational structure, so the agent can resolve ambiguous references and, just as important, ask better clarifying questions.

Read that list again. Documentation. Roadmaps. Decision logs. Org structure. Not one item on it is a table. The most agent-forward company on the planet looked at what makes analytics answers trustworthy and landed on a corpus of soft data.

![Documents, an org chart, and a decision log feeding into a central knowledge hub node, which connects onward to an agent resolving a question into a dashboard answer](/images/2026/07/hard-data-soft-data-context-graph.png)

And this is where I'll make the uncomfortable observation: most organizations have this information. It's scattered across SharePoint, Teams, someone's OneDrive, and the heads of four senior people. It exists. It's just not curated, not owned, and not reachable by anything, human or agent, that needs it at the moment a question gets asked.

## Why Nobody Builds This Layer

So if the context layer matters this much, why does everyone skip it?

Because it's invisible. Nobody gets promoted for a decision log. You can demo a dashboard; you cannot demo a well-maintained glossary. Soft data work doesn't generate revenue on its own, it isn't a tangible deliverable you can hold up in a steering committee, and you don't see the flowers from doing it. So it loses the prioritization fight every single quarter. I get it. I've watched it happen at client after client.

But I've also been beating this drum for years, and I'm going to allow myself a small told-you-so. When automated insights first showed up in Power BI, the feature that scanned a page and surfaced anomalies and trends, I said on day one that it would disappoint people. Why? It looked at everything equally. There was no way to guide it, no way to say "when someone asks about members, the customer table matters more than the location table." No weighting, no steering, no context. The feature had all the hard data in the world and none of the soft data, and it produced insights nobody asked for. That exact gap is what Anthropic is describing a generation of technology later. The models got dramatically better. The missing layer stayed missing.

That should tell you something. This was never a model problem. It's a curation problem, and curation is OUR job.

## AI Writes the Docs. Humans Own the Definitions.

Here's the part that makes this practical rather than depressing: the single most common failure pattern across every layer of an agentic analytics stack is poor or stale documentation, and we now have tools that are genuinely good at producing documentation. Claude and Copilot can draft table descriptions, summarize a decision thread, and turn a rambling meeting into a clean decision log entry in seconds.

Can AI close the soft data gap by itself? Of course it can't. Generation is cheap now; ownership is the scarce thing. An agent can write a beautiful definition of "active member" and it will be beautifully wrong if nobody accountable signs off on it. The curation, the arbitration between two teams who define a term differently, the call on which document is the current one, that stays human. It has to. That's not a limitation of the technology, it's literally the job of data governance: ownership and accountability over what things mean.

![A cycle between a human figure and an agent: the agent drafts document cards, the human reviews and stamps them, and the approved documents flow into a governed library that the agent reads from](/images/2026/07/hard-data-soft-data-ownership-loop.png)

And watch out for staleness, because soft data rots faster than hard data. Your fact table gets refreshed nightly by a pipeline. Your metric glossary gets refreshed never, by nobody. A context layer that described the business as it existed eighteen months ago is arguably worse than no context layer, because the agent will use it with full confidence.

## Start Treating Soft Data Like Data

If I were standing up this layer at your company, here's the workstream. Notice that every step is unglamorous, and every step is doable this quarter.

- **Inventory where meaning lives.** For your highest-traffic domain, list where the definitions, caveats, and tribal knowledge actually sit today. SharePoint, Teams threads, deck appendices, people's heads. You can't curate what you haven't located.
- **Start a decision log.** One page, append-only, capturing every call the business makes about data: what "active" means, why March is restated, which system wins when two disagree. Let AI draft the entries from meeting notes; make a named human approve each one.
- **Write one page of business context per domain.** What this domain is, the terms people use and what they resolve to, the nicknames ("the Q2 launch"), the questions this data can and cannot answer. Write it like an agent is reading it, because one will be.
- **Make the org structure machine-readable.** Who owns which metric, which team asks which questions. When an agent knows who's asking, it answers better. So do your analysts, by the way.
- **Assign owners and a review cadence.** Every context page gets a name and a review date. Staleness is the failure mode; a cadence is the fix.
- **Point your agents at the curated set, not the wilderness.** Don't aim Copilot at all of SharePoint and hope. Aim it at the small, owned, current corpus you just built. Microsoft is clearly moving this direction with grounding and skills; meet it halfway with context worth grounding on.

## The Semantic Model Was Never the Whole Model

For years the semantic model has been the heart and soul of what we do, and it still is. But the name always promised more than the tables delivered. The semantics of your business were never fully in the model. They were in the hallway conversations, the onboarding decks, the arguments about what counts as a lead. Agents are simply the first consumer demanding that we finally write all of that down.

So here's my prediction: within a few years, the BI team's estate won't stop at the semantic model. It will include a governed context corpus, the soft data, sitting right next to it, with owners and refresh cadences and the same rigor we give a fact table today. The teams who start building that corpus now will be the ones whose agents people actually trust.

**Key Takeaway:** This week, create a decision log for your busiest data domain and add its first three entries: three definitions or business calls that currently live only in someone's head. That single page is the first brick in your soft data layer, and it makes every future agent you deploy a little less like a brand new waiter guessing at "the usual."

If the line between hard data and soft data sparked something, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.

<!--
Meta description: Your semantic model is only half your data. Why soft data, the decision logs and business context around your tables, decides if agentic analytics works.

Topic tags: Agentic AI, Data Governance, Semantic Models, Power BI, Microsoft Fabric, Data Culture, Adoption
-->
