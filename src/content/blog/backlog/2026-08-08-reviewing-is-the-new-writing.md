---
title: "Reviewing Is the New Writing: Power BI's Quiet Shift to Professional QA"
date: 2026-08-08T09:00:00Z
permalink: "2026/08/08/reviewing-is-the-new-writing"
description: "AI agents now write the DAX and build the models. The Power BI skill that pays is reviewing their work, and most of us never trained for it."
featured: /images/2026/08/reviewing-is-the-new-writing-banner.png
draft: true
tags:
  - ai-agents
  - mcp
  - dax
  - power-bi
  - prompt-engineering
  - microsoft-fabric
source:
  episode: 537
  title: "Are We Now Professional QA?"
  notion: "https://app.notion.com/p/cbfc083d03ef4d6e90aee5b32de69c65"
---

I did an honest audit of my own work recently, and it stung a little. The DAX, the model changes, the notebook code, the pipeline logic... almost none of it started life under my fingers. It started in an agent, running against an MCP server, guided by skills and a harness I set up months ago. My direct, hands-on-keyboard building has dropped off a cliff. And I know I'm not the only one, because every practitioner I talk to who has leaned into agentic tooling says the same thing.

So here's the uncomfortable question I've been sitting with: if the agents are doing the writing, what exactly am I doing? My answer, and I mean this as a real job description and not a joke, is **professional quality assurance**. The core skill in Power BI and Fabric is shifting from writing the work to reviewing the work. And reviewing well is a much harder, much rarer skill than we're giving it credit for.

![A stream of AI-generated BI artifacts flowing from an agent node on the left through a human reviewer's magnifying lens into an approved dashboard on the right](/images/2026/08/reviewing-is-the-new-writing-banner.png)

## The Doing Moved. The Accountability Didn't.

Let me be precise about what changed. It used to be that a Power BI developer's day was mostly production: write the measures, build the relationships, shape the Power Query, wire the pipeline. The plan lived in your head and the code came out of your hands.

Now? The plan still lives in your head. The code comes out of an agent. Whether it's a semantic model edited through an MCP server, DAX drafted from a one-line request, or Python in a Fabric notebook that I never could have typed from a blank cell, the doing has moved to the machine. Here's the part that hasn't moved an inch: when that model ships to a stakeholder, the agent isn't accountable. YOU are.

That gap between who does the work and who answers for the work is where professional QA lives. Somebody has to look at what came back and decide, with confidence, that it's right. Not "it runs." Not "the numbers look plausible." Right. Optimized. Built the way an experienced modeler would have built it.

![A hand-typing node on the left fading to dotted lines while an agent node produces model and code artifacts that pass through a human checkpoint gate before reaching a finished report](/images/2026/08/reviewing-is-the-new-writing-shift.png)

## Studying Code Is Not the Same as Writing Code

There's a distinction hiding in here that I think most teams are blowing right past. The ability to **study** code and the ability to **write** code are two different skills. Writing is going from white space to a working measure, from a blank script to a running notebook. Studying is looking at something that already exists and understanding what it does, why it does it that way, and whether it should.

For years those two skills traveled together, because the only way you ever got good at reading code was by writing a mountain of it. That link just broke. I can now produce a working solution in a language I am not competent in. That's a fundamental shift, and it cuts both ways. On one side, it's incredible leverage. On the other side, it means the skill I actually need every single day, the studying skill, no longer comes free with the job.

And no, asking the agent "what did you do here?" doesn't close the gap by itself. A general question gets a general answer. The review that protects your stakeholders requires something sharper.

## The "Looks Italian to Me" Problem

Here's how I explain this to people, and yes, of course it involves Italy.

Imagine you ask an agent to write a data governance document in Italian. It comes back, you scan it, and what's your review? "Looks good. Looks Italian." Maybe you took a semester once, so you recognize a word here and there. Okay, I know that word, I know that word... approved! Now hand that same document to a senior Italian writer. Their first question is "which region is this for?" They know that a sentence that lands in Rome reads differently in the south. They know what's formal, what's sloppy, and what's accidentally offensive. Same document, wildly different review.

![One document passing two reviewer lenses: a shallow lens that stamps a quick approval, and a deep lens that reveals hidden flaws inside the same document](/images/2026/08/reviewing-is-the-new-writing-lens.png)

That's the exact situation a lot of us are in with AI-generated BI work. If you don't know the language, your QA is "looks Italian to me." The measure returns a number, the visual renders, ship it. And we all know these tools hallucinate. A review from someone who can't read the code isn't a review. It's a vibe check with extra steps.

## The Questions Only Experience Knows to Ask

So what does the real review look like? It looks like questions that only exist because you've seen the failure before.

If you don't know why a many-to-many relationship is a conflict waiting to happen, you will never ask about it. You'll see the relationship, it works, moving on. If you don't know that bidirectional cross-filtering is a decision and not a default, you won't challenge it. If you can't look at a measure and notice it's stacking three FILTER functions inside itself, you'll never say "can we think of a different way to write this?" The agent gave you something that works. Only experience tells you it's not something that's GOOD.

That's the difference between generic QA and professional QA. Generic QA asks "what are you doing here?" Professional QA asks "do we have to do many-to-many here?" One of those questions comes with any curious human. The other one comes with years of blood stains from models you built, broke, and fixed yourself.

Which brings me to the part of this that genuinely keeps me thinking.

## My MCP Server Is My Junior Developer

I said this out loud recently and it stopped me cold: my MCP server is my junior developer. It does the tedious work. It writes the measures. It builds the relationships. It takes the requirements and grinds through the implementation. That is exactly the work I would have handed a junior five years ago, and it's exactly the work that turned ME from a junior into a senior. I got my review instincts by doing the reps. Model after model, measure after measure, learning not just how to write DAX but which measures were worth writing at all.

So here's the conundrum. The senior already has the skill to review. The junior was supposed to acquire it by doing... and the doing is now done by something else. Why would I pay a junior to spend five hours building something an agent starts in minutes? And honestly, I don't want a junior spending five hours on something I can review and fix in thirty. But if nobody does the reps, where does the next generation of reviewers come from?

![A career ladder with its lower rungs drawn as broken dotted lines while an agent node occupies the bottom of the climb, leaving a gap below the senior figure at the top](/images/2026/08/reviewing-is-the-new-writing-ladder.png)

I don't have a clean answer, and I'm suspicious of anyone who claims they do. But I know what I'd tell an analyst early in their career right now, because the ladder didn't disappear. It changed shape. You probably don't need to write a lot of DAX anymore, and that's okay. You DO need to read it, relentlessly. Study the fundamentals so you know what good looks like. Read the books, try things out, verify everything the agent hands you. Your reps are review reps now.

And one more thing separates the senior from everyone else holding the same tools: **trust**. When a senior talks to a client or a stakeholder, that person has to be able to trust what they're hearing. You can prompt your way to an artifact. You cannot prompt your way to being trusted in the room, because eventually you're going to be talking to a human who asks a follow-up question. The ability to talk to the business, understand their problem, and translate it into data is the one skill in this whole story that is not changing.

## How to Become the Reviewer Worth Paying For

If review is the job, then train for the job. Here's what that actually looks like this quarter:

1. **Review everything like a pull request.** No AI-generated measure, relationship, or notebook goes into a model you own without you reading it line by line. It runs is not a review standard.
2. **Build your question bank.** Start a running list of expert questions for each artifact type. Models: why this cardinality, why this filter direction, where are the many-to-many risks? DAX: how many FILTER functions, is there a simpler pattern, does this survive a dynamic requirement? Every failure you catch becomes a new question on the list.
3. **Make the agent explain itself, specifically.** Don't ask "what did you do?" Ask it to walk the sequence of changes it made, justify each relationship choice, and flag anything that deviates from best practices. You're not learning to write the code. You're learning to interrogate it.
4. **Do deliberate reps on fundamentals.** Pick one area a month, semantic model relationships, filter context, storage modes, and go deep with the definitive resources. The goal isn't writing fluency. It's knowing what the right answer looks like when it's sitting in front of you.
5. **Spend the saved time upstream.** The thirty minutes you didn't spend on a conversion function goes into requirements, into asking the business why they need the number, into deciding which measures deserve to exist. That's the strategic work the review role buys you.

## Takeaways

- The doing has moved to agents; the accountability hasn't. Somebody has to certify the work is right, and that somebody is you.
- Studying code and writing code are different skills, and the link between them just broke. Review skill no longer comes free with the job.
- A review without fundamentals is "looks Italian to me." The expert questions, many-to-many, filter direction, stacked FILTERs, only exist because you know what failure looks like.
- The MCP server took the junior's reps. If you're early career, your reps are review reps now: read relentlessly, verify everything, build the question bank.
- Trust is the final differentiator. You can prompt an artifact into existence. You can't prompt your way into being believed by a stakeholder.

I'll close with a prediction: within a few years, the most valuable line on a BI resume won't be "wrote complex DAX." It will be some version of "reviewed and certified agent-built solutions at scale," and the people who can do it credibly will be worth more than the best pure authors ever were. The writing got cheap. The judgment got expensive. If you're working through what this shift means for your own team, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.

<!--
Meta description: AI agents now write the DAX and build the models. The Power BI skill that pays is reviewing their work, and most of us never trained for it.
Topic tags: Power BI, Agentic AI, Semantic Models, Prompting, Adoption, Data Culture, Microsoft Fabric
-->
