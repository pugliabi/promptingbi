---
title: "You're AI Ready. Your Organization Isn't."
date: 2026-08-05T09:00:00Z
permalink: "2026/08/05/youre-ai-ready-your-organization-isnt"
draft: true
description: "Individual AI skill doesn't scale into organizational adoption. Why AI adoption is a team language, and a 30-60-90 plan that starts with data quality."
featured: /images/2026/08/youre-ai-ready-your-organization-isnt-banner.png
tags:
  - ai-agents
  - adoption
  - reporting
  - governance
  - power-bi
  - microsoft-fabric
source:
  episode: 542
  title: "Orgs Slow on AI Adoption"
  notion: "https://app.notion.com/p/53db305e36494a35990f35c5d8e5682c"
---

I'll own something up front: I am AI ready. I can deploy agents, manage them, and wire them into just about every corner of my workflow. Research, documentation, semantic model work, project tracking... if there's a mundane loop in my day, there's probably an agent chewing on it. I can even measure whether it's working, for me.

None of that makes my organization AI ready. Not even close.

![A person at a desk surrounded by connected agent nodes on the left, separated by a long dotted gap from a team around a conference table whose dashboard sits unconnected on the right](/images/2026/08/youre-ai-ready-your-organization-isnt-banner.png)

That gap is the thing I keep running into with companies right now. **AI adoption is a culture thing.** It's a group of people coming together to use the same tooling and the same process. Individual AI skill does not scale one-to-one into organizational adoption, and every plan that assumes it does is going to stall out exactly where most of them are stalling right now.

## Investment Is Not Adoption

We have lived this movie before in Power BI. Just because you have 200 reports does not mean you're going to see exponential use of those reports. Building things and people using things are two different curves, and they have never been a one-to-one correlation.

AI is repeating the pattern. Organizations want AI, they're spending money on AI, they're building tools with AI. And adoption is still crawling. When I talk to organizations, I keep finding a difference between **AI strategy** and **AI theater**. Theater is reacting to headlines: Microsoft announced something, so we should do that too, let's spin up a Copilot agent and call it an initiative. Strategy starts from a completely different question: where are our biggest pain points, what are the goals of the company, and how do we pilot AI against those in small doses?

Right now I'm seeing a lot of theater. I'm not seeing a lot of strategy.

If your AI initiative can't name the team it serves and the pain it removes, it's a solution looking for a problem. And an agent is going to run on YOUR data, which means the honest starting question is rarely "which model" and almost always "what are we actually trying to achieve with our data?"

## The Author Splits in Two

Part of why this feels murky is that our old roles stopped mapping cleanly.

In the Power BI world we had a clear story: authors and consumers. Even when you split managed and self-service, everyone knew the path, the responsibilities, what I build and what you click. That clarity is a big reason Power BI adoption worked when it worked.

In the AI world, the author splits in two. Are you using AI to help you author things, meaning reports, apps, and solutions that people consume normally? Or are you building agents that other people will use directly? Those are two different creations, and I'd argue they eventually belong to different people or teams on an org chart. One produces an application. The other produces something closer to a coworker.

![One author's output splitting into two lanes: an app viewed passively by one person, and an agent node exchanging back-and-forth dotted messages with an engaged person](/images/2026/08/youre-ai-ready-your-organization-isnt-author-consumer.png)

The distinction matters because the consumer splits right along with it, and one of those consumers needs something the other never did.

## The Agent Consumer Is a New Role

When I ship someone an app, even one built almost entirely with AI, the consumer isn't "using AI" in any meaningful sense. They're using a user interface. They already know how to use a computer. No new skill required.

The consumer of an agent is different. They need to know what the agent can do, when to use it, how to prompt it, and where to find it. That's a real skill, the same way knowing your way around Outlook is a skill nobody teaches you in college but everybody needs on day one.

The platforms haven't solved this side either. When I publish a Power BI report, there's a clear story for placement and distribution: workspaces, apps, paths every consumer already knows. Publish an agent and the story goes fuzzy. Where does someone find it, and in what interface? A Fabric data agent, for instance, is only consumable in a handful of places today, the Fabric portal or wired into a Copilot agent. The delivery channel for agents is still being invented, which makes the training question even harder to skip.

I learned the training side the hard way with my own setup. I've built a pile of custom agents inside my Notion workspace. One organizes files and notes and surfaces status updates. Another carries a stack of Fabric skills. Some fire when I change the status of a meeting; another gets mentioned when work wraps up so it can pull everything together. It's a beautiful little machine.

For me.

Scale ONE new teammate onto that setup and none of it is obvious. They wouldn't know that flipping a status triggers an agent. They wouldn't know which agent to mention when a project closes. I know these things because I built them. That knowledge does not transfer by osmosis, and if you're building anything agentic for your department, you have to assume your users need training to be active players in it, not passive watchers. Otherwise you've built a private workflow and called it a rollout.

## Adoption Is a Company Language

At my first job out of college, I discovered there was no Outlook course in my degree. But Outlook was how the company communicated, so I got good at it fast. Same with Excel: I'd taken a course, but the files being sent to me were the company's dialect of Excel, and I had to learn to speak it. Every company has a language, and your job is partly learning to speak it.

Now compare that to search. Companies never paid for you to Google things, and no company ever mandated it (nobody was ever pulled into a meeting for using DuckDuckGo). Search stayed an individual skill. That's exactly where most AI usage sits today: individually valuable, organizationally invisible. If your ChatGPT habits make you better at your job, great, but there's no correlation between what you're doing with AI and what the person sitting next to you is doing. That's not adoption. That's a hobby the company happens to benefit from.

Power BI adoption at my old company didn't start with licenses. It started when the sales team's leadership told every rep: from now on, your quota lives in this report. Your targets, your goals, everything. Stop looking at the Excel files you made for yourself. If something's wrong, message Tommy. One sentence from leadership turned a report into the company language.

I have to be fair about what that story assumes, though. By the time leadership said those words, a stack of decisions had already been made. Someone had decided Power BI was worth the investment. Security had reviewed it and signed off. The report itself was built, validated, and had a clear purpose everyone understood. Most organizations are several decisions short of that moment with agents: IT is still working out what an agent even is, nobody has ruled on which tooling is acceptable, and the company hasn't agreed that agents add value at all. You can't skip to the leadership sentence. You have to earn it, decision by decision.

That's the bar for agents. Adoption happens when the agent becomes part of how a team talks: "did you ask the quota agent today?" the same way people say "check the sales report." Treat the agent like a first-class citizen of the department, closer to a hire than a license. If it isn't integrated into a team's normal workflow, it isn't adopted, no matter what the usage dashboard says.

I have to be honest about what that quota story assumes, though. By the time leadership said that sentence, a stack of decisions already existed underneath it. Someone had decided Power BI was valuable and bought the licensing. Security had reviewed it and signed off. The report itself was built, validated, and certified, with a purpose everyone understood before anyone was told to use it. One sentence from leadership only works when that stack exists. Most organizations are nowhere near it with AI: IT can't define what an agent is yet, nobody has ruled which tools are acceptable, and nobody has agreed where the value lives. If that's your company, the leadership sentence isn't your next step. Building the stack underneath it is.

## Watch the Patterns, Then Consolidate

So how do you get from scattered individual skill to a team language? There's a bottom-up path I genuinely like, with one warning attached.

Give people the freedom to build their own agents. Not a wild west, but real freedom for individuals to customize for their own needs. Then keep insight into what everyone is building, because the patterns are the whole prize. When you notice half the sales team has separately built some version of "which of my accounts reached out, and what should I prioritize against my targets," that's discovery, not sprawl. Consolidate it into one shared, supported agent, wire it to your sales model, and push it to the team with the same leadership sentence that launched the quota report.

![Four isolated people with their own small agents converging by dotted paths into one large shared agent hub that connects out to a whole team](/images/2026/08/youre-ai-ready-your-organization-isnt-shared-agent.png)

The warning: this costs something. A large company where everyone builds two or three agents is a lot of patterns to find, and someone has to own that consolidation work. Which is exactly why this can't float free as everyone's side project. Somebody owns it, and my strong opinion is that AI enablement starts with **data governance**, because that room already exists and already has the right people in it: IT, business intelligence, and leadership with actual purse strings. You don't need a new committee. You need the one you have to take agents seriously.

## A 30-60-90 That Starts With the Data

If an organization asked me tomorrow for a plan to get started, here's the shape of it. It will feel slow. It works because it's slow.

![Three stages along a dotted path: databases under a magnifying glass with a check mark, a magnifier over process nodes with people, and an agent node embedded in a small team at a table](/images/2026/08/youre-ai-ready-your-organization-isnt-roadmap.png)

**First 30 days: data quality.** Verify your data, both the hard data in your models and the soft data scattered across the org, and deliver findings on what's actually consistent. You cannot skip this. An agent runs on your data, and if everything lives in personal OneDrive folders and the semantic models are a mess, you will not have a great agent. You'll have a fast liar.

There's good news buried in that first month for anyone who has been doing BI seriously. Nobody building semantic models in 2019 was thinking "this will pay off when AI arrives." It did anyway. The semantic model turned out to be the foundation agents run on, and even Anthropic's write-up of how they do self-service analytics with Claude leans on a semantic layer, which is a semantic model wearing a different name badge. Keep doing what you've been doing, with some verification. The clean model you built for reporting is the same one your first agent needs.

For the BI crowd, there's good news buried in this step. Nobody doing semantic modeling in 2019 was doing it because AI was coming. But the semantic model turned out to be the layer agents run best on; even Anthropic's guidance for analytics points at a semantic layer. The work you've been doing IS the foundation, and the job doesn't change terribly. Verify it, clean it, keep going.

**Days 30 to 60: discovery.** Find the intersection of two things: who has the best data, and who has the biggest process pain. Look at where report requests still pile up, because the biggest reporting pain points bridge almost directly to agentic candidates. Maybe it's operations, drowning in the same forms week after week, and their data is already in decent shape. Now you have a candidate with a reason to exist.

**Days 60 to 90: one agent, one team, real reliance.** One agent that a real team uses as part of their normal workflow, announced from the top, with training on what it can do and when to use it. Resist the urge to launch a portfolio. Three months for a single agent sounds underwhelming until you remember the alternative: agents built on bad data with no clear purpose, which is just theater with a better demo.

## Takeaways

- Being individually AI ready and having an AI-ready organization are different problems. Solving the first does almost nothing for the second.
- Investment is not adoption. 200 reports never meant usage, and 200 agents won't either.
- The author role splits in AI: building things with AI versus building agents for others. Plan for both, separately.
- Agent consumers need training. Knowing what an agent can do and when to use it is a skill, like Outlook was.
- Adoption is language. You're done when "ask the quota agent" is just how the team talks.
- The leadership mandate only works on top of prior decisions: tools chosen, security signed off, purpose clear. Build that stack first.
- Let individuals build, watch for patterns, consolidate into shared team agents, and let data governance own the enablement.

**Key takeaway:** this week, find where report requests still pile up in your organization. That backlog is your discovery document; the team behind it is your first agent pilot.

If this got you thinking, stick around PromptingBI. And if you'd rather hear these arguments happen out loud, the Explicit Measures podcast is where they start.

<!--
Meta description: Individual AI skill doesn't scale into organizational adoption. Why AI adoption is a team language, and a 30-60-90 plan that starts with data quality.

Topic tags: Adoption, Data Culture, Agentic AI, Data Governance, Power BI, Microsoft Fabric
-->
