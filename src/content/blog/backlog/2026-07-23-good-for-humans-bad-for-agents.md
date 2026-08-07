---
title: "Good for Humans, Bad for Agents: The Gold Semantic Model Meets Its Match"
date: 2026-07-23T09:00:00Z
permalink: "2026/07/23/good-for-humans-bad-for-agents"
description: "One gold semantic model is right for humans and wrong for AI agents. Why perspectives are the curated layer that makes agentic analytics work."
featured: /images/2026/07/good-for-humans-banner.png
draft: true
tags:
  - semantic-models
  - ai-agents
  - governance
  - power-bi
  - claude
  - microsoft-fabric
source:
  episode: 539
  title: "Self Service Analytics with AI"
  notion: "https://app.notion.com/p/376e74c69c18807faf53e555c51e6545"
---

Ten years ago I watched a company stop trusting every dashboard it owned because marketing and sales couldn't agree on what a lead was. Last week I read Anthropic's engineering post on running self-service data analytics with Claude and scribbled one line in my notes before I finished the page: gold model, thin reports... good for humans, bad for agents. Same problem, ten years apart, except the thing asking the question now is an agent.

The architecture rule we've preached for a decade in Power BI, one governed enterprise semantic model feeding thin reports, is the right answer for humans and the wrong answer for agents. The obvious fix, a small targeted model per use case, flips the problem instead of solving it. The way out has been sitting inside our tabular models for years and almost nobody touches it: **perspectives**.

![One large enterprise semantic model on the left, drawn as a dense grid of tables, feeding a neat row of report pages, while on the right a single agent stands in front of that same grid facing dozens of near-identical candidate fields](/images/2026/07/good-for-humans-banner.png)

## The First Groundbreaking Read in a Long Time

I don't hand out that word often. Anthropic published a post on their engineering blog about how they run self-service data analytics with Claude, and it's the first thing I've read in a long time that genuinely provoked me.

Their core claim is that analytics accuracy is a **context and verification** problem rather than a code generation problem. Code is open ended. It rewards a model's creativity, and a plausible implementation is usually a valid one. Analytics runs the other way. The query is often five to ten lines and trivial to write, but there is usually only ONE correct answer, and no compiler or unit test is waiting to tell the agent it missed.

Their most common failure was concept mapping. The agent couldn't get from a word like revenue to the right table and column, because too many candidates looked plausible. They fixed it with fewer, more heavily governed **canonical datasets** rather than a bigger model or a cleverer prompt: a small set of source-of-truth datasets, clearly owned, with near duplicates aggressively deprecated. Add skills and business context on top of that and, by their numbers, accuracy on their evals went from roughly 21 percent to between 95 and 100 percent on certain domains.

Fewer datasets, heavily governed, clearly owned. That prescription picked a fight with ten years of my own best practices.

## Good for Humans, Bad for Agents

The **gold semantic model** with thin reports is one of the great wins of the Power BI era. One place to define every measure. One model to refresh, secure, and certify. Thin reports inherit all of it for free, with no duplicated DAX, no drift, and no arguing over whose number is right. For the humans building and maintaining the estate, it's close to perfect.

Now put an agent in front of that same model. Hundreds of fields across dozens of tables. Several places where some notion of revenue lives, more than a few of them poorly documented. The right answer is almost certainly in there, and every extra candidate is another chance to pick wrong. Users already feel this with massive models; they open one and have no idea where to start. The agent hits the same wall and clears it with a confident, well-formatted, wrong answer.

So flip the coin. Build one small semantic model per report and the agent is thrilled: tight context, one meaning per term, one obvious table for every question. Now every metric is defined in six places by six people, and the humans maintaining that estate are drowning. Gold model with thin reports is good for humans and bad for agents. One model per use case is good for agents and bad for humans. Both sides of that coin are true at once, which is why nobody has talked their way out of it yet.

![Left side: one big enterprise model feeding a row of thin report pages that share a single measure definition. Right side: a scatter of small separate models, each feeding one report, with the same measure redefined slightly differently in every one](/images/2026/07/good-for-humans-tradeoff.png)

## Three Dashboards, Three Numbers

Concept ambiguity isn't a new AI problem. It's the oldest BI problem there is. Back in 2016 I was building Power BI reports for a marketing team when I hit the seminal moment of this career: sales had a completely different definition of a lead. The company ended up with three dashboards showing three different numbers, and everything stopped while everyone worked out how that happened. The rework wasn't the damage. People stopped trusting all three.

Humans survived that era because humans can ask around. Walk to a desk, find out which number the CFO actually uses, move on. An agent has nobody to ask. It sees three plausible paths from the word lead to a number, picks one, and reports it with total confidence.

Organizations aren't going to be successful with AI agents running over their data, chatbot or full agentic solution, until they've actually accomplished **data governance**. Who owns the definition of a lead, and who is accountable when two teams disagree? I've taken that question far enough to argue an agent belongs on [your data governance committee](/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/). This is the modeling side of the same fight.

![The single business term "revenue" on the left branching into four candidate paths across different tables and measures, three of them ending in question marks and one marked as the correct answer](/images/2026/07/good-for-humans-ambiguity.png)

## Perspectives Are the Agent Layer

So how do you keep one governed enterprise model for the humans and still hand agents the small, targeted world they need? I wrote the answer in the margin mid-read and I keep coming back to it. Perspectives.

A **perspective** is a named, curated view of a tabular model: a defined slice of tables, columns, and measures scoped to a domain or a use case. They've been in our models for years and most teams have never created one. Look at what a perspective buys you now. The enterprise model stays whole, with one set of definitions owned and maintained in one place by people. The agent gets pointed at a slice built to answer a specific set of questions, roughly one perspective per report or two. Small context for the agent, single source of truth for the humans, both sides of the coin at once.

Can you do this end to end today? Not really. You can define perspectives with external tools, but there's no first-class experience where you aim an agent at a perspective and it treats that scope as its entire world. Microsoft, if you're listening: that's the dream. Make perspectives the agent-facing layer over the enterprise semantic model and the whole tradeoff dissolves.

A perspective without documentation is a shorter list of undocumented fields, so treat **metadata** as part of the build. Descriptions, canonical metric definitions, grain, and explicit weighting all belong in the model. If someone asks about members or revenue, the model itself should say to weight the customer table over the location table. None of that work demos well, and it's a real part of the distance between 21 percent and 95.

![A full enterprise semantic model drawn as a grid of tables with most of the grid greyed out, one highlighted slice of tables and measures connected by a single line to an agent node](/images/2026/07/good-for-humans-perspectives.png)

## One Question, One Answer

One more line I've drawn, because it changes how you deploy any of this. Having an agent generate six or eight candidate visuals so a developer picks the winner is a useful technique during development. As production self-service, it's a trap. Confused users voting on candidates feed noise back into the system, and a business user asking what their members did in Q2 isn't shopping for a gallery. There is one answer.

Users give you one shot at that answer, maybe two. If the second one is wrong they don't troubleshoot. They go back to the report they already trust, and they don't ask 18 more times.

I've been reading *The Greatest Story Ever Sold*, a book about the dot-com bubble, and the parallel is hard to ignore. The barrier to entry for e-commerce collapsed, and anyone with a small warehouse and a website could sell online. Adoption didn't follow, because users wouldn't relearn a new site, a new account, and a new interface for every store. They went back to the name they already knew. Analytics agents are standing at that same fork. The low barrier to standing one up is not the win. The one-shot right answer is the win, and one-shot right answers come from curated scope, owned definitions, and documented metadata.

## Make Your Model Agent-Ready This Month

You don't need to wait on Microsoft for any of this. Every step here works today.

- **Audit the gold model for ambiguity debt.** Take the ten terms your business actually asks about (leads, members, revenue, whatever yours are) and trace each one through the model. Every term that plausibly resolves to more than one table, column, or measure is a place where an agent will eventually answer wrong.
- **Name your canonical datasets and their owners.** Decide which model is the source of truth for each domain, put a human name next to it, and deprecate the near duplicates aggressively. That word is Anthropic's, and they meant it.
- **Write the model metadata for a reader who can't ask you a follow-up question.** Table and column descriptions, canonical metric definitions, grain, synonyms, and plain-language weighting guidance.
- **Pilot one perspective per domain.** Take your highest-traffic domain, define a perspective holding only its tables and fields, then run your agent experiences against that scoped view and against the full model. Measure which one lands the right answer more often.
- **Settle ownership before you wire anything up.** Every canonical definition needs an accountable owner before an agent starts answering questions with it.

## Takeaways

- Any business term that resolves to more than one table in your gold model is a future wrong answer. Find those terms before an agent does.
- Fewer, owned, heavily governed canonical datasets beat more models. Deprecate the near duplicates instead of maintaining them.
- One model per use case fixes the agent and breaks the humans. Don't trade one problem for the other.
- Perspectives give you both: a whole enterprise model for people, a scoped slice for the agent. Pilot one on your busiest domain this month.
- Column descriptions, grain, and weighting guidance are part of the build now, not cleanup for a slow week.
- Ship one answer, not a gallery of candidates. Users give you two tries before they go back to the report they already trust.

The gold semantic model isn't dead. It's about to matter more than it ever has, and it just picked up a consumer that reads differently than we do. So the most valuable modeling skill in Power BI and Fabric is about to stop being clever DAX. It will be curation: shaping small, documented, owned slices of an enterprise model where an agent walks in and finds exactly one answer. If that tension between building for humans and building for agents is the kind of thing you chew on, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
