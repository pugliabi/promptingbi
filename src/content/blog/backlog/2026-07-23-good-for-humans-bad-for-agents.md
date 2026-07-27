---
title: "Good for Humans, Bad for Agents: The Gold Semantic Model Meets Its Match"
date: 2026-07-23T09:00:00Z
permalink: "2026/07/23/good-for-humans-bad-for-agents"
draft: true
description: "The gold semantic model rule that made Power BI teams scalable is the same thing that makes AI agents fail. Perspectives might be the layer that saves both."
---

Ten years ago I watched a company stop trusting every dashboard it had because marketing and sales couldn't agree on what a lead was. Last week I read Anthropic's engineering blog post on enabling self-service data analytics with Claude and scribbled one line in my notes before I even finished it: gold model, thin reports... good for humans, bad for agents. Same problem, ten years apart, except now the thing asking the question is an agent.

So here's my thesis. The architecture rule we've preached for a decade in Power BI, one governed enterprise semantic model feeding thin reports, is the right answer for humans and the wrong answer for agents. The obvious fix, a small targeted model for every use case, flips the problem instead of solving it. The way out is a layer that's been sitting in our tabular models for years: **perspectives**.

## The First Groundbreaking Read in a Long Time

I don't hand out that word often. Anthropic published a post on their engineering blog about how they enable self-service data analytics with Claude, and it's the first piece I've read in a long time that genuinely challenged and provoked me. It's a strong statement about where the future lies for those of us in the data space.

The core insight is easy to say and brutal in its implications: analytics accuracy is a **context and verification problem**, not a code generation issue. Code is open ended. It rewards the model's creativity, and a plausible implementation is usually a valid one. Analytics is the opposite. The query itself is often five to ten lines and trivial to write, but there is usually only ONE correct answer, and no compiler or unit test is waiting to tell the agent it got that answer wrong.

So where do agents fail? Anthropic's most common failure: the agent couldn't map a concept like revenue to the right table and column because there were too many candidates. Their fix was not a bigger model or a cleverer prompt. It was fewer, more heavily governed **canonical datasets**: a small set of source-of-truth datasets, clearly owned, with near duplicates aggressively deprecated. Layer skills and business context on top and, by their own numbers, agent accuracy on their evals jumped from roughly 21 percent to between 95 and 100 percent on certain domains.

Read that fix again. Fewer datasets. Heavily governed. Clearly owned. That one sentence picked a fight with ten years of my own best practices.

## Good for Humans, Bad for Agents

The **gold semantic model** with thin reports is one of the great wins of the Power BI era. One place to define every measure. One model to refresh, secure, and certify. Thin reports inherit all of it for free. No duplicated DAX, no drift, no arguing over whose number is right. For the humans building and maintaining the estate, it's close to perfect.

Now put an agent in front of that same model. Hundreds of fields across dozens of tables. Several places where some notion of revenue lives, more than a few of them poorly documented. The right answer is almost certainly in there, but every extra candidate is another chance to pick wrong. Users already feel this with massive models; they don't know where to start. An agent hits the same wall, just confidently, with a well-formatted answer.

So flip the coin. Build one small semantic model per report or per use case and the agent is thrilled: tight context, one meaning per term, one obvious table for every question. But now every metric is defined in six places by six people, and the humans maintaining all of it are drowning. Gold model, thin reports: good for humans, bad for agents. One-to-one models: good for agents, bad for humans.

Both sides of that coin are true at the same time. That's the tension.

## Three Dashboards, Three Numbers

Concept ambiguity is not a new AI problem. It's the oldest BI problem there is. Back in 2016 I was building Power BI reports for a marketing team when I hit my seminal moment in this career: sales had a completely different definition of a lead. The company ended up with three dashboards showing three different numbers for leads, and everything stopped while everyone tried to work out how. The real damage wasn't the rework. It was that people stopped trusting all three.

Humans survived that era because humans could ask around. An agent can't. Anthropic puts it plainly: an agent that doesn't understand your business will answer what the user asked, not what they meant. It won't know that two teams define the same term differently. It will pick one and answer with total confidence.

Which brings me to my hot take, and I'll own it: organizations are not going to be successful with AI agents running over their data, whether that's a chatbot or a full agentic solution, until they have actually accomplished **data governance**. Ownership and accountability first. Who owns the definition of a lead? Who is accountable when two teams disagree? If you can't answer that today, no agent framework is going to save you.

## Perspectives Are the Agent Layer

So how do you keep one governed enterprise model for the humans and still give agents the small, targeted world they need? I wrote the answer down mid-read, and I keep coming back to it: perspectives.

A **perspective** is a named, curated view of a tabular model: a defined slice of tables, columns, and measures scoped to a domain or a use case. Perspectives have existed in our models for years, and most teams never touch them. Look at what one gives you. The enterprise model stays whole: one set of definitions, owned and maintained in one place by people. The agent gets pointed at a perspective that answers specific, targeted questions, roughly one perspective per report or two. Small context for the agent. Single source of truth for the humans. Both sides of the coin, at the same time.

Can you do this end to end today? Not really. You can define perspectives with external tools, but there's no first-class experience where you aim an agent at a perspective and it treats that scope as its entire world. Microsoft, if you're listening: that's the dream. Make perspectives the agent-facing layer over the enterprise semantic model, and the good-for-humans-bad-for-agents tradeoff dissolves.

One more thing, because a perspective without documentation is just a shorter list of fields. Anthropic says to treat **metadata** as a first-class product, and they're right. Descriptions, canonical metric definitions, grain, and explicit weighting all belong in the model: if someone asks about members or revenue, give more weight to the customer table than the location table. This is the layer where you don't see the flowers from doing the work (nobody has ever demoed a column description, and I suspect nobody ever will). But it's a real part of the difference between 21 percent and 95.

## One Question, One Answer

One more line I've drawn, because it changes how you deploy all of this. Having an agent generate six or eight or ten candidate visuals so a developer picks the winner is a useful technique. During development. As production self-service, it's a trap. Confused users voting on candidates feed noise back into the system, and a business user asking "what are my members in Q2" isn't looking for a gallery of options. There's only one answer.

Users give you one shot at that answer, maybe two. If the second one is wrong, they don't troubleshoot. They go back to the report they already trust, and they do not ask 18 more times.

I've been reading *The Greatest Story Ever Sold*, a book about the dot-com bubble, and the parallel is hard to ignore. The barrier to entry for e-commerce collapsed; anyone with a little warehouse and a website could sell online. Adoption didn't follow, because users weren't willing to relearn a new site, a new account, a new interface for every store. They went back to the name they already knew. Analytics agents sit at the same fork right now. The low barrier to building them is not the win. The one-shot right answer is the win, and one-shot right answers come from curated scope, owned definitions, and documented metadata, not from raw model access and optimism.

## Make Your Model Agent-Ready This Month

You don't need to wait on Microsoft to act on the dream. Every step below works today:

- **Audit the gold model for ambiguity debt.** Take the ten terms your business actually asks about (leads, members, revenue, whatever yours are) and trace each one through the model. Every term that plausibly resolves to more than one table, column, or measure is a spot where an agent will eventually answer wrong.
- **Name your canonical datasets and their owners.** Decide which model is the source of truth for each domain, put a human name next to it, and deprecate the near duplicates aggressively. That word is Anthropic's, and they meant it.
- **Document like an agent is reading it. Because it is.** Table and column descriptions, canonical metric definitions, grain, synonyms, and plain-language weighting guidance such as "questions about members resolve to the Customer table."
- **Pilot one perspective per domain.** Pick your highest-traffic domain, define a perspective holding only its tables and fields, and test your agent experiences against that scoped view versus the full model. Measure which one lands the right answer more often.
- **Settle ownership before you wire anything up.** Every canonical definition needs an accountable owner before an agent starts answering questions with it.

## Where This Goes

The gold semantic model is not dead. I think it's about to matter more than it ever has; it's just gaining a new consumer, and that consumer reads differently than we do. My prediction: within a few years, the most valuable modeling skill in Power BI and Fabric won't be writing clever DAX. It will be curation, shaping small, documented, owned slices of an enterprise model where an agent can walk in and find exactly one answer. The teams doing that unglamorous metadata-and-ownership work right now are the teams whose agents people will actually trust.

If the tension between building for humans and building for agents is the kind of thing you chew on, that's exactly what PromptingBI is here for. Subscribe and keep the conversation going.

**Key Takeaway:** This week, pick the five terms your business asks about most and trace each one through your gold semantic model. If any of them resolves to more than one place, you've found the exact spot where an agent will fail. Fix that before you point anything agentic at your data.
