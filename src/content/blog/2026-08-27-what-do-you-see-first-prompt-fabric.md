---
title: '"What Do You See?" Is the Best First Prompt in Fabric'
date: 2026-08-27T16:00:00Z
permalink: "2026/08/27/what-do-you-see-first-prompt-fabric"
draft: true
description: 'Connect an agent to Microsoft Fabric and the first prompt matters more than the first build. Why "what do you see?" earns trust before you delegate.'
---

You finally connect an agent to your Fabric tenant. The MCP server handshakes, the tools light up, and every instinct you have says the same thing: build something. Spin up a lakehouse. Generate a notebook. Let it rip.

Can it start building immediately? Of course it can. That is exactly the problem.

## The Itch to Build

I will be honest with you. When I first connected the remote Fabric MCP server, I was hesitant. You are going remote now. This is not some local tool where you can instantly see every file it touches. This is an agent with hands inside YOUR tenant, and a quiet voice in the back of my head kept asking, how well is this actually going to work?

That hesitation gets treated like a flaw. Something to get over. I think it is the most useful instinct you have, as long as you point it somewhere productive. Because the worst thing you can do with a new agent is the thing all of us want to do first: delegate something big and hope.

Hope is not a validation strategy.

## One Question Changes the Whole Session

So instead of asking the agent to build, I asked it to look.

What do you see? What can you do? Give me your rundown of what the eyes of this MCP server are seeing.

And the session changed. The agent walked me through the workspaces it could reach, the items it recognized, the operations it could and could not perform. No artifacts created. No code written. Just a picture of the world as the agent understood it, laid out where I could check it against the world as I understood it.

That is mutual understanding. Not trust yet. Understanding. Trust comes later, and it has to be earned.

This is where the magic, to me, really is. Not in the moment the agent builds something. In the moment before, when you and the agent agree on what you are both looking at. Almost every disaster I have seen with AI tooling traces back to skipping that moment. The agent had one picture of the environment, the human had another, and nobody compared notes until something was already broken.

## The New Line Cook

Here is how I think about it. You just hired a line cook. Saturday night is coming, the board is going to fill up, and you need this person to perform.

You do not hand them the Saturday rush on day one. You walk the station together. You point at the lowboy, the mise en place, the ticket rail. You ask what they see. Then you have them plate ONE dish, and not a mystery dish either. A dish you already know the taste of, so when it comes off the pass you can judge it in two seconds.

You are not testing whether they can cook. You are testing whether you two see the same kitchen.

An agent connected to your Fabric tenant is a new line cook with incredible knife skills and zero context. "What do you see?" is walking the station. (And no, the agent does not need to taste everything in your walk-in to describe the station... give it a try.)

## Prove It Small

After the rundown, I did not point the agent at a client workload. I asked it to create a demo lakehouse, pull some data in, validate what landed, then clean it all up.

Small. Bounded. Reversible. And verifiable, because I knew what a healthy result looked like before I ever typed the prompt.

It worked, and I am not going to lie, watching it run was kind of incredible. But the incredible feeling was EARNED. It was backed by a checkpoint I could inspect, on a playground I could delete. That is a completely different feeling from "the agent did something big and the numbers look plausible." Plausible is where bad decisions go to hide.

## Where I Wanted This in 2017

Let me take you back. It is 2017 and a Power Query refresh just failed. The error message is technically English. A column conversion error, step 14 of 30, somewhere in a query you built eight months ago on a Tuesday you no longer remember.

You know the ritual. Walk the applied steps backwards one at a time. Question every decision your past self made. Lose the afternoon.

Now imagine an agent in that moment that reads the error, checks the metadata, and says: it is probably these two columns, here is why, look at this step first.

Notice what that agent needs to do its job. The error. The metadata. Not one row of your actual data. Bounded input, verifiable output, zero access to anything sensitive. That is the profile of a perfect agent job, and it is why I get genuinely excited about operations agents in pipeline monitoring. Nothing is more frustrating than a failure that hands you error code 33721 and wishes you luck. An agent that translates the failure and points at where to look first is not replacing your judgment. It is saving your judgment for the part that deserves it.

## The Loop That Keeps You Honest

Zoom out and there is a pattern here, and I want you to steal it.

Build something. Something breaks, because something always breaks. Bring in the agent and let it propose a fix. Then comes the step everyone underrates: validate the result against the reference you already have.

You knew what the output looked like when the pipeline was healthy. You knew the row counts, the boundaries, the shape of success. That reference is the guardrail that makes the whole loop safe. An agentic loop without a reference point is not automation; it is a horse running loose at the races, fast and impressive and headed wherever it wants.

With a reference, the loop is simple and honest. The agent proposes. The reference validates. If the output does not match your prior understanding of success, you do not argue with the agent about it. You go back with a better problem statement and run it again.

Having a reference before you delegate is not just a nice to have. It is a must have.

## The Human Version of the Same Question

One more thing, because this pattern did not start with agents.

Before you publish a report that measures someone's work, ask the people being measured what they see. Their context, their experiments, their definition of a good month. It is the same question you asked the MCP server, aimed at a person, and it prevents the same category of disaster: two parties acting on two different pictures of the world.

We spend a lot of energy teaching organizations to question dashboards. The better habit, for agents and for people, is to establish the shared picture BEFORE anything gets published or built. Question yourself first. Then delegate.

## Make It Part of Your Workstream

Here is exactly what I would do this week:

- Open every new agent or MCP session with "what do you see?" and read the rundown like a code review. Correct its picture before it acts.
- Hand the agent a bounded problem first. An error plus metadata is perfect. Your entire fact table is not.
- Write down what success looks like before you prompt. Row counts, boundaries, a known-good output. If you cannot define it, you are not ready to delegate it.
- Prove it small and reversible. A demo lakehouse the agent can create and destroy beats a production workspace every single time.
- Scale delegation only as fast as your ability to validate. Not one step faster.

## Takeaways

- The first prompt that matters is not a build request. It is "what do you see?"
- Hesitation about agents is healthy; aim it at validation instead of avoidance.
- Agents shine on bounded, verifiable problems: errors, metadata, diagnostics.
- No reference point, no delegation. Know what success looks like first.
- The same move works on humans. Shared picture first, publish second.

Here is my prediction: within a couple of years, "what do you see?" will be the SELECT TOP 100 of the agent era. The little query you run first, every single time, before you trust anything with the real work.

If this way of thinking about agents, Fabric, and BI is your kind of thing, stick around PromptingBI and subscribe. This conversation is just getting started.
