---
title: "You Can't Keep Up With AI. You Were Never Supposed To."
date: 2026-09-14T09:00:00Z
permalink: "2026/09/14/you-cant-keep-up-with-ai"
draft: true
description: "The AI feed is a show, and chasing it turns your work into theater. What the research says about these tools, and a simple strategy that holds up."
featured: /images/2026/09/you-cant-keep-up-with-ai-banner.png
tags:
  - ai-agents
  - adoption
  - agent-skills
  - mcp
  - power-bi
  - microsoft-fabric
source:
  episode: 530
  title: "Agentic Skill & Report Design"
  youtube: "https://www.youtube.com/watch?v=UR5eu50KLrw"
  transcript: "transcripts/ep-530.txt"
---

Open X or LinkedIn before your first coffee. A new MCP server. A skills repo that picked up a few thousand stars overnight. A model release that "changes everything." A Fabric feature with a demo GIF and a waitlist. By lunch there are six more, and at least one person has made $15,000 today by building 18 agents.

I know that feeling of falling behind. I've had it in my stomach on a Tuesday while a client's semantic model sat open in the other window, waiting for me to do the actual work.

Here's what I've landed on. The feed is a show. It's produced for an audience, on a schedule set by people whose job is the announcement. The moment you try to be IN the show, everything you do turns into theater, because you're performing "keeping up" instead of doing work that somebody is paying for.

I wrote about [the personal version of AI theater](/2026/09/09/you-dont-have-an-ai-strategy/) a few days ago: the tool list that grew faster than the jobs it was supposed to do. This post is about where that list came from. You didn't invent it. You were handed it, one scroll at a time.

## The Show Isn't For You

Keeping up with the Joneses only works if the Joneses live on your street. The people on the feed don't. Their output is the post. Yours is a model that has to refresh at 6 a.m. tomorrow.

The math makes it impossible on purpose. Power BI ships a monthly update, and in some months nearly half of it is about one feature. Fabric announces at Build, at FabCon, at Ignite, and in between. Every frontier lab ships something quarterly. Every skills repo forks into three. Even the vocabulary churns: the term was prompt engineering, and then it was context engineering. Whatever. Neither word builds a rolling 12-month measure.

![A treadmill conveyor belt carries an endless row of identical tool cards toward a running figure who stays in the same place, with a dotted loop showing the belt never ends](/images/2026/09/you-cant-keep-up-with-ai-treadmill.png)

Nobody is an expert in this yet. We're in 1999 of the internet era. One billionaire says there will only be five kinds of jobs left; the next post says every job gets better. I have no idea which is right, and neither do they. The confident forecast is a genre of content, and the forecaster is a performer.

I don't want to sound like those people. I also don't want to be their audience. So I set myself a rule I'd recommend to anyone in this space: **talk about today**. Not what agents might do in two years. What the thing on my screen does, right now, on this model, for this client. If a conversation about AI tooling can't survive that rule, it was a show.

## What the Research Actually Says

The show tells you to feel a certain way about these tools. The research tells you to check.

[METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) ran a randomized trial in 2025 with 16 experienced open-source developers and 246 real tasks on codebases they had maintained for years. With AI tools allowed, they took **19% longer**. The part that matters more: before starting, they predicted AI would make them 24% faster, and after finishing, they still believed it had made them 20% faster. They were slower and felt faster. In a [2026 follow-up](https://metr.org/blog/2026-02-24-uplift-update/) with newer tools and more developers, the slowdown disappeared and the estimates leaned toward a modest speedup, without statistical certainty either way. So the tools improved. The gap between feeling and measurement is the finding, and it didn't go anywhere.

![A thought bubble with a rising arrow above a head on the left, a stopwatch and a measuring ruler with a flat-to-falling arrow on the right, split by a dotted divider](/images/2026/09/you-cant-keep-up-with-ai-perception-gap.png)

MIT's [GenAI Divide report](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf) reviewed 300 enterprise deployments and found **95% delivered no measurable P&L impact**. One CIO in the report said it plainly: dozens of demos this year, maybe one or two genuinely useful, the rest wrappers or science projects. The same report found only 40% of companies had bought an official LLM subscription while workers at over 90% of them used personal AI tools regularly for real work. The tools people quietly rely on and the tools that get announced are not the same list.

Google's [2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report), from nearly 5,000 practitioners, found AI adoption is now associated with higher throughput and, at the same time, higher delivery instability. Their summary: AI doesn't fix a team, it amplifies what's already there. Good foundations get faster. Weak ones get faster at producing problems.

And a [study of Microsoft's own 2026 rollout](https://arxiv.org/abs/2607.01418) of command-line coding agents across tens of thousands of engineers found the strongest predictor of who tried the tool was whether their peers already had. Adopters merged roughly 24% more pull requests. Whether the software got better, the authors say, nobody has agreed how to measure.

Read those four together and the picture is consistent. These tools work. Your sense of whether they're working is unreliable. Adoption spreads socially, which is exactly why the show works on you. And the payoff depends almost entirely on what you already had in place before the tool arrived.

I've been reading more and more about AI slop, pull requests full of plausible code that needs a second pass to fix. Fabric will be no exception. The question I keep coming back to on my own work is a simple one: **can I prove it got better, and not just bigger?** More documentation nobody reads is bigger. More measures with the same three bugs is bigger. Bigger is what theater produces.

## The Things That Don't Churn

Every tool on the feed is built on the same three things, and none of them ship monthly.

**Prompting and context.** All the agentic things, all the MCPs, none of it matters if you can't tell an agent what to do, in what format, with what boundaries. Call it whatever the feed is calling it this quarter. It's the foundation, and it's the skill I see most people skip on their way to installing something.

**Your environment.** Know the platform you're in and what's actually available to you. A lot of practitioners can't touch an MCP server because IT hasn't approved one, and pretending otherwise is the enthusiast's blind spot. Strategy starts from what you can run.

**The subject itself.** I've said this to juniors and I'll say it here: prove you understand filter context before I hand you agentic tooling for DAX. I read the filter context chapter seven times before it clicked, and it only clicked because I was writing the DAX by hand. An agent [raises the floor and lowers the ceiling](/2026/08/28/agents-raise-the-floor-and-lower-the-ceiling/). The floor is nice. You will eventually need the ceiling.

Adoption is slower than the show admits, and that's normal. Fabric is three years past its Build announcement and organizations are only now moving from "what is Fabric" to "how do we do Fabric." The feed runs on a weekly clock. Your organization runs on a yearly one. Only one of them is yours.

## A Simple Strategy

The strategy I actually run is short, and short is the point. Anything longer becomes its own show.

![An open notebook with one list item circled feeds a stream of tool cards toward a single narrow gate with an hourglass; one card passes through to a dashboard with a check mark](/images/2026/09/you-cant-keep-up-with-ai-one-gate.png)

**Start from the pain, not the post.** I keep a running note of what was annoying this week. The measure I rewrote for the third client. The pipeline I babysat. Report request number fourteen for a filter the model already has. AI strategy is not "there's a new tool, there's a new model, let's incorporate it, let's build a Copilot agent." It's the biggest pain points, the goals of the business, and a pilot in small doses. The feed only gets opened with one of those pains in hand.

```text
This week's pain list
- Rewrote the rolling 12-month measure for the third client this quarter.
- Babysat the nightly refresh twice.
- Request #14 for a filter the model already has.
Rule: open the feed with one of these in hand, or don't open it.
```

**Say no by default.** Focusing is about saying no, and that has never been more true than right now. I try to be much more targeted about what I build and what I point AI at, because the alternative is spending a lot of time doing nothing that ships.

**Let it age.** Nothing gets tried the week it launches. I wait for a second release, real docs, and somebody else's post about what broke. The show moves on in days. The useful things are still there a month later, usually with the sharp edges filed down. Everything I rely on today passed through that gap. Nothing I abandoned did.

**Measure one thing.** Pick a task you do weekly. Time it without the tool this week and with it next week. Sixteen experts were off by nearly forty points about their own speed. You will be too. The stopwatch isn't optional.

**Watch the show as an audience.** I still read the feed. I read it for direction, not instructions. One heuristic I borrowed early on and still use: watch where Microsoft spends its words. When half of a month's reporting updates are about one capability, that's where the money is going, and that's the one thing worth understanding before the rest of the noise.

A pain list, a no, a waiting period, a stopwatch, and a reading habit. It fits on an index card, which is the point.

## Takeaways

- The feed is a show, produced on a schedule set by people whose output is the announcement. Trying to be in it turns your work into theater.
- Keeping up is impossible by design. Monthly updates, three conferences, quarterly models, and a vocabulary that renames itself. Stop treating that as a personal failure.
- The research is consistent: the tools work, your sense of whether they're working is unreliable, adoption is social, and results depend on the foundations you had before the tool arrived.
- Prompting, your environment, and the subject itself (filter context before agentic DAX) don't churn. Spend your learning there.
- Run a five-line strategy: start from the pain, say no by default, let a tool age, measure one task with a stopwatch, and read the feed for direction, not instructions.
- Ask of every addition: did it get better, or just bigger?

**Key takeaway:** this week, start the pain list. Three lines about what actually cost you time. Don't open the feed until you have one in hand, and when you do, you'll notice how little of it is about your problem.

My prediction: in a couple of years, most of what's on the feed today will be gone, and most of what's on your pain list will still be there in some form. The people who look sharpest by then won't be the ones who tried everything. They'll be the ones who can say what they were trying to fix, which is the same thing this job has always been about.

If you're stepping off the treadmill this week, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.

<!--
Meta description: The AI feed is a show, and chasing it turns your work into theater. What the research says about these tools, and a simple strategy that holds up.

Topic tags: AI Agents, Adoption, Agent Skills, MCP, Power BI, Microsoft Fabric
-->
