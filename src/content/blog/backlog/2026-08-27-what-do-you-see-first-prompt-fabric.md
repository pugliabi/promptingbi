---
title: '"What Do You See?" Is the Best First Prompt in Fabric'
date: 2026-08-27T09:00:00Z
permalink: "2026/08/27/what-do-you-see-first-prompt-fabric"
description: 'Connect an agent to Microsoft Fabric and the first prompt matters more than the first build. Why "what do you see?" earns trust before you delegate.'
featured: /images/2026/08/what-do-you-see-banner.png
draft: true
tags:
  - microsoft-fabric
  - mcp
  - ai-agents
  - prompt-engineering
  - context-engineering
source:
  episode: 546
  title: "Teaching Orgs to Question Themselves"
  notion: "https://app.notion.com/p/397e74c69c18807ba05ae8148ca8aab2"
---

You finally get an agent connected to your Fabric tenant. The MCP server handshakes, the tools light up, and every instinct you have says the same thing: build something. Spin up a lakehouse. Generate a notebook. Let it rip.

Can it start building immediately? Well, of course it can! That is exactly the problem.

Spend your first prompt on a question instead of a build. What do you see? Four words, zero artifacts, and they change everything that happens after.

![A large eye on the left casting dotted sight lines across a wired grid of Fabric items on the right: lakehouse cylinders, table cards, and notebook documents all connected to each other](/images/2026/08/what-do-you-see-banner.png)

## The Itch to Build

When I first connected the remote Fabric MCP server, I hesitated. This is not some local tool where I can instantly see every file it touches. You are going remote now. This is an agent with hands inside YOUR tenant, and a quiet voice in the back of my head kept asking the same question: how well is this actually going to work?

We treat that hesitation like a flaw. Something to push through, something to get over so you can be one of the cool kids doing agentic Fabric work. I think it's the most useful instinct you have, as long as you aim it somewhere productive, because the worst thing you can do with a new agent is the thing every single one of us wants to do first, which is to delegate something big and hope.

Hope is not a validation strategy.

## One Question Changes the Whole Session

So instead of asking the agent to build, I asked it to look.

What do you see? What can you do? Give me your rundown of what the eyes of this MCP server are actually seeing.

And the whole session changed. The agent walked me through the workspaces it could reach, the items it recognized, the operations it could and could not perform. No artifacts created. No code written. Just a picture of the world as the agent understood it, laid out where I could check it against the world as I understood it. That's **mutual understanding**, and it comes before trust, because trust has to be earned.

This is where the magic, to me, really is. The moment before the build, when you and the agent agree on what you are both looking at. Almost every disaster I have seen with AI tooling traces back to skipping it. The agent had one picture of the environment, the human had another, and nobody compared notes until something was already broken.

![A human head silhouette facing a robot head, with a shared panel of chart, table, and list tiles between them and a dotted line running straight through the panel to connect both sides](/images/2026/08/what-do-you-see-rundown.png)

## The New Line Cook

You just hired a line cook. Saturday night is coming, the board is going to fill up, and you need this person to perform.

You do not hand them the Saturday rush on day one. You walk the station together. You point at the lowboy, the mise en place, the ticket rail. You ask what they see. Then you have them plate ONE dish, and not a mystery dish either. A dish you already know the taste of, so when it comes off the pass you can judge it in two seconds.

You are not testing whether they can cook. You are testing whether you two see the same kitchen.

An agent connected to your Fabric tenant is a new line cook with incredible knife skills and zero context. It can julienne anything you put in front of it. It has no idea where you keep the sauce. "What do you see?" is walking the station. (And no, the agent does not need to taste everything in your walk-in to describe the station... give it a try.)

## Prove It Small

After the rundown, I still did not point the agent at a client workload. I asked it to create a demo lakehouse, pull some data in, validate what landed, then clean it all up behind itself. Small, bounded, reversible, and verifiable, because I knew what a healthy result looked like before I ever typed the prompt.

It worked, and I'm not going to lie, watching it run was kind of incredible. But the incredible feeling was EARNED. It was backed by a checkpoint I could inspect, on a playground I could delete. That is a completely different feeling from watching an agent do something big and deciding the numbers look about right. It's the same reason my [MCP modeling sessions](/2026/08/05/inside-an-mcp-execution-session/) end with a block of DAX validation queries the agent has to run before it's allowed to call anything done.

This is the dish you already know the taste of. You are not asking the agent to invent dinner. You are asking it to plate something you can judge in two seconds, in a corner of the kitchen where a dropped pan costs you nothing.

![Data points flowing into a single lakehouse cylinder inside a dashed sandbox boundary with a checkmark beside it, and a dotted loop wrapping the whole sandbox that ends in a broom sweeping it away](/images/2026/08/what-do-you-see-prove-small.png)

## Where I Wanted This in 2017

It's 2017 and a Power Query refresh just failed. The error message is technically English. A column conversion error, step 14 of 30, somewhere in a query you built eight months ago on a Tuesday you no longer remember.

You know the ritual. Walk the applied steps backwards one at a time. Question every decision your past self made. Lose the afternoon.

Now imagine an agent in that moment that reads the error, checks the metadata, and says it is probably these two columns, here is why, look at this step first. That agent needs the error and the metadata. It never touches a row of your actual data.

**Bounded input, verifiable output**, zero access to anything sensitive. That is the profile of a perfect agent job, and it is why operations agents in pipeline monitoring get me genuinely excited. Nothing is more frustrating than a failure that hands you error code 33721 and wishes you luck. An agent that translates the failure and points at where to look first saves your judgment for the part that deserves it. Same reason I'd [give an agent the governance committee's transparency work](/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/) before I'd give it anything else on that agenda, since the job is bounded and the output is checkable.

## The Loop That Keeps You Honest

There's a pattern under all of this, and you should steal it.

Build something. Something breaks, because something always breaks. Bring in the agent and let it propose a fix. Then validate the result against the **reference** you already have.

You knew what the output looked like when the pipeline was healthy. You knew the row counts, the boundaries, the shape of success. That reference is the guardrail that makes the whole loop safe. An agentic loop without a reference point is not automation; it is a horse running loose at the races, fast and impressive and headed wherever it wants.

With a reference, the loop is simple and honest. The agent proposes. The reference validates. If the output does not match your prior understanding of success, you do not argue with the agent about it. You go back with a better problem statement and run it again. No hard feelings. The loop does not care about feelings; it cares about the reference.

Having a reference before you delegate is not just a nice to have. It is a must have. And the same question works on humans, which is worth remembering before you publish a report that measures somebody's work. Ask the team what they see first and you skip the same failure, two parties acting on two different pictures of the world.

![A four-node cycle: a healthy pipeline running between two databases, the same pipe cracked open, a robot holding a replacement section of pipe, and a report card with a checkmark acting as the validation gate before the arrow returns to the start](/images/2026/08/what-do-you-see-loop.png)

## Make It Part of Your Workstream

Here is exactly what I would do this week:

- Open every new agent or MCP session with "what do you see?" and read the rundown like a code review. Correct its picture before it acts.
- Hand the agent a bounded problem first. An error plus metadata is perfect. Your entire fact table is not.
- Write down what success looks like before you prompt. Row counts, boundaries, a known-good output. If you cannot define it, you are not ready to delegate it.
- Prove it small and reversible. A demo lakehouse the agent can create and destroy beats a production workspace every single time.
- Scale delegation only as fast as your ability to validate. Not one step faster.

## Takeaways

- Spend the first prompt on "what do you see?" and read the answer like a code review before the agent touches anything.
- Keep the hesitation you feel about an agent with hands in your tenant, and point it at validation work.
- Give an agent bounded, verifiable work first: a refresh error plus metadata beats a whole workload, and it needs none of your data.
- Write down the row counts and boundaries that define success before you prompt. If you cannot define them, you are not ready to delegate.
- Run the first real job in a sandbox the agent can create and delete, so a bad result costs you a cleanup and nothing else.

Within a couple of years, "what do you see?" will be the SELECT TOP 100 of the agent era. The little query you run first, every single time, before you trust anything with the real work. If this way of thinking about agents and Fabric sparked something, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
