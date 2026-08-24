---
title: "You're AI Ready. Your Organization Isn't."
date: 2026-08-12T09:00:00Z
permalink: "2026/08/12/youre-ai-ready-your-organization-isnt"
draft: false
description: "Nobody has defined what AI ready means for an organization. The roles and delivery gaps behind slow AI adoption, plus a 30-60-90 that starts with data quality."
featured: /images/2026/08/youre-ai-ready-your-organization-isnt-banner.png
tags:
  - ai-agents
  - adoption
  - data-culture
  - governance
  - semantic-models
  - microsoft-fabric
source:
  episode: 542
  title: "Orgs Slow on AI Adoption"
  notion: "https://app.notion.com/p/53db305e36494a35990f35c5d8e5682c"
  youtube: "https://www.youtube.com/watch?v=8ZJoatBkbAM"
---

I'll own something up front: I am AI ready. I can deploy agents, manage them, and wire them into just about every corner of my workflow. Research, documentation, semantic model work, project tracking... if there's a mundane loop in my day, there's probably an agent chewing on it. I can even measure whether it's working, for me.

None of that makes my organization AI ready. Not even close.

![A person at a desk surrounded by connected agent nodes on the left, separated by a long dotted gap from a team around a conference table whose dashboard sits unconnected on the right](/images/2026/08/youre-ai-ready-your-organization-isnt-banner.png)

**Nobody has defined what AI ready means for an organization.** We have a decent picture of what it means for a person. We have almost nothing for a group of people who have to produce something together. No roles, no delivery story, no training path, no shared idea of what done looks like. You cannot adopt something nobody has defined, and that, more than any tool gap, is why adoption is crawling.

## Four Blockers, and Only One Is Real

The question I get is always some version of this: why is my organization moving so slowly on AI when the platform is sitting right there? And it usually arrives with multiple choice attached. Is it skills? Data quality? Governance? Unclear ROI?

Data quality is the only one of the four I'd accept, and even that is a prerequisite rather than a blocker.

Skills aren't the blocker. Plenty of people inside these companies are clamoring to get their hands on this stuff, and the ones who got access figured it out by putting time in the seat. Governance is the vehicle, and I'll come back to that. ROI looks unclear because nothing has been piloted yet, which makes it a symptom.

The real blocker sits upstream of all four. IT can't define what an agent is yet. Nobody has ruled on which tooling is acceptable. The company hasn't agreed that agents add value in the first place. A training budget fixes none of that. These are decisions nobody has been asked to make.

We have lived this movie before in Power BI. Just because you have 200 reports does not mean you'll see exponential use of those reports. Building things and people using things are two different curves, and they have never correlated one to one. AI is running the same play: organizations want it, they're spending on it, they're building with it, and adoption is flat. It's the difference between an AI strategy and AI theater, and right now theater is winning.

## The Author Splits in Two

Part of why this feels so murky is that our old roles stopped mapping cleanly.

In the Power BI world we had a clear story: authors and consumers. Even when you split managed and self-service, everyone knew the path, the responsibilities, what I build and what you click. That clarity is a big reason Power BI adoption worked when it worked.

In the AI world, the author splits in two. Are you using AI to help you author things, meaning reports, apps, and solutions that people consume normally? Or are you building agents that other people use directly? Those are two different creations, and I'd argue they eventually belong to different people or teams on an org chart. One produces an application. The other produces something closer to a coworker.

![One author's output splitting into two lanes: an app viewed passively by one person, and an agent node exchanging back-and-forth dotted messages with an engaged person](/images/2026/08/youre-ai-ready-your-organization-isnt-author-split.png)

Underneath that, the build itself has layers, and I think that's where the job titles land. Think about how a semantic model actually gets made. There's a data engineer, someone shaping the model, someone designing the report. One output, distinct crafts, and every one of them is a line on somebody's resume. Agents work the same way: there's the model you picked, [the harness you built around it](/2026/07/20/stop-re-prompting-second-brain-agent-instructions/) (the skills, the instructions, the markdown, the memory), and the agent that results from all of it. My money is on the harness being the layer that shows up on job postings first, because that's where all the customization lives.

## The Agent Consumer Is a New Role

The consumer splits right along with the author, and one of those consumers needs something the other never did.

When I ship someone an app, even one built almost entirely with AI, the consumer isn't "using AI" in any meaningful sense. They're using a user interface. They already know how to use a computer. No new skill required.

The consumer of an agent is different. They need to know what the agent can do, when to use it, how to prompt it, and where to find it. That's a real skill.

There's a fair objection here, and I've had it thrown at me: agents are self-documenting. You don't need to know how an MCP server works, you just ask the agent what it does and it tells you, in plain English, better than most documentation would. That's true, and it's genuinely one of the more underrated things about this whole shift.

It also answers the wrong question. Self-documenting solves "how does this work." It does nothing for "does this exist," and nothing at all for "should I reach for this right now, in the middle of what I'm already doing." Nobody asks an agent what it can do if they don't know it's there. **Discoverability isn't documentation.**

I learned that the hard way on my own setup. I've built a pile of custom agents inside my Notion workspace and [written up what each one does](/2026/08/03/meet-my-assistants/). One organizes files and notes and surfaces status updates. Another carries a stack of Fabric skills. Some fire when I change the status of a meeting; another gets mentioned when work wraps up so it can pull everything together. It's a beautiful little machine.

For me.

Scale ONE new teammate onto that setup and none of it is obvious. They wouldn't know that flipping a status triggers an agent. They wouldn't know which agent to mention when a project closes. I know these things because I built them, and that knowledge does not transfer by osmosis. If you're building anything agentic for your department, you have to assume your users need training to be active players in it, not passive watchers. Otherwise you've built a private workflow and called it a rollout.

## Nobody Knows Where to Put an Agent

Delivery is the other half of this.

When I publish a Power BI report, the distribution story is boring, and I mean that as a compliment. Workspaces, apps, permissions, a link. There are several channels, but the setup is clear and consumers already know the path.

Publish an agent and it falls apart. Take Fabric data agents. The API went public, which is legitimately great: you can create, configure, update, and publish data agents programmatically now, from code, outside the portal, instead of clicking through the Fabric UI or living inside a notebook. That API serves the developer building the agent. The consuming side got nothing. How does a business person use that data agent once it's published? Today the honest answer is a short list: the Fabric portal, wired into a Copilot agent, or through Foundry.

![A report on the left flowing through a clear open path to a group of people, contrasted with an agent node on the right whose dotted paths end at three narrow closed doors](/images/2026/08/youre-ai-ready-your-organization-isnt-delivery-gap.png)

Three doors is not a distribution model, and your users have no habit of walking through any of them. We solved this for reports a decade ago, and for agents the channel is still being invented, which means every rollout today involves somebody hand-walking people to a URL. Hard to build a company habit out of that.

## The One Thing That Doesn't Split

Everything I've described splits in two or fragments. The author splits, the consumer splits, and delivery manages to be both fuzzy and scattered at once. One layer holds still.

A Power BI report, a Fabric app, and a data agent can all sit on the same semantic model. Same business logic, same relationships, same definitions, three completely different consumption experiences stacked on top. Microsoft keeps making that more explicit with every release, and Anthropic's own guidance for doing analytics with Claude leans on a semantic layer, which is a semantic model wearing a different name badge.

Nobody building semantic models in 2019 was thinking "this will pay off when AI shows up." It paid off anyway. If you've been doing BI seriously, the foundation is already yours, and the purpose of the job doesn't change terribly. Verify it, clean it, keep going.

## Adoption Is a Language, Not a Skill

So what would organizational AI readiness actually look like? I think it looks like a language.

Compare AI to search for a second. Companies never paid for you to Google things, and nobody ever mandated it (nobody was pulled into a meeting for using DuckDuckGo, your secret is safe). Search stayed an individual skill with individual benefits, which is exactly where AI usage sits today: individually valuable, organizationally invisible. If your ChatGPT habits make you better at your job, great, but there's no correlation between what you're doing with AI and what the person sitting next to you is doing. That's a hobby the company happens to benefit from, not adoption.

Now compare that to something a company genuinely adopted. Power BI at my old shop didn't start with licenses. It started when sales leadership told every rep: from now on, your quota lives in this report. Your targets, your goals, everything. Stop looking at the Excel files you built for yourself. If something's wrong, message Tommy. One sentence turned a report into how the company talked.

I have to be fair about what that sentence assumed, though. By the time leadership said it, a stack of decisions already existed underneath. Someone had decided Power BI was worth the investment. Security had reviewed it and gotten comfortable. The report was built, validated, certified, and had a purpose everyone understood. There was a named human to message when it broke. **The mandate was the last domino, not the first.**

![A line of dominoes falling left to right, from a tool decision to a security check to a validated report to a named owner, tipping into a final node connected to a team](/images/2026/08/youre-ai-ready-your-organization-isnt-dominoes.png)

Run that check on agents in your own company:

1. Has someone with real authority decided which AI tooling you're committing to?
2. Has security reviewed it and gotten comfortable?
3. Does a validated, working thing exist that's worth pointing people at?
4. Is there a named owner, an actual person to message when it breaks?

Most organizations I talk to are four for four on no, and then they wonder why nothing gets adopted. Every no on that list is your real roadmap. You don't get to skip to the leadership sentence. You earn it, decision by decision.

That's the bar. Adoption happens when the agent becomes part of how a team talks: "did you ask the quota agent today?" the same way people say "check the sales report." Treat it like a first-class citizen of the department, closer to a hire than a license. Give it a role. Name who it works with. If it isn't in the team's normal workflow, it isn't adopted, whatever the usage dashboard says.

## Watch the Patterns, Then Consolidate

There's a bottom-up path from scattered individual skill to a shared language. I genuinely like it, with one warning attached.

Give people the freedom to build their own agents. Not a wild west, but real freedom to customize for their own needs. Then keep insight into what everyone is building, because the patterns are the whole prize. When you notice half the sales team has separately built some version of "which of my accounts reached out, and what should I prioritize against my targets," that's discovery, not sprawl. Consolidate it into one shared, supported agent, wire it to your sales model, and push it out with the same leadership sentence that launched the quota report.

The warning: this costs something. A large company where everyone builds two or three agents is an enormous number of patterns to find, and someone has to own that consolidation work. Which is exactly why it can't float free as everybody's side project.

Somebody owns it, and my strong opinion is that AI enablement belongs to [data governance](/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/), because that room already exists and already has the right people in it: IT, business intelligence, and leadership with actual purse strings. You don't need a new committee. You need the one you have to take agents seriously.

## A 30-60-90 That Starts With the Data

If an organization asked me tomorrow for a plan to get started, here's the shape of it. It will feel slow, and it's slow for the same reason [the step-zero test](/2026/07/27/step-zero-before-the-fabric-adoption-roadmap/) feels slow: you're building the thing every roadmap assumes you already have.

![Three stages along a dotted path: databases under a magnifying glass with a check mark, a magnifier over process nodes with people, and an agent node embedded in a small team at a table](/images/2026/08/youre-ai-ready-your-organization-isnt-roadmap.png)

**First 30 days: data quality.** Verify your data, and I mean both kinds. The hard data in your models and tables, and the soft data scattered around it: definitions, process documents, the context an agent needs to be useful at all. Deliver findings on what's actually consistent. You cannot skip this. An agent runs on YOUR data, and if everything lives in personal OneDrive folders and the semantic models were never cleaned, you will not have a great agent. You'll have a fast liar.

**Days 30 to 60: discovery.** Find the intersection of two things: who has the best data, and who has the biggest process pain. Look at where report requests still pile up, because the biggest reporting pain points bridge almost directly to agentic candidates. Maybe it's operations, drowning in the same forms week after week, sitting on data that's already in decent shape. Now you have a candidate with a reason to exist.

**Days 60 to 90: one agent, one team, real reliance.** One agent a real team uses as part of their normal workflow, announced from the top, with training on what it does and when to reach for it. Resist the urge to launch a portfolio. Three months for a single agent sounds underwhelming right up until you price the alternative: agents built on bad data with no clear purpose, which is theater with a better demo.

## Takeaways

- Being individually AI ready and having an AI-ready organization are different problems. Solving the first does almost nothing for the second.
- The real blocker is decisions nobody has been asked to make: what an agent is, which tools are allowed, and whether agents add value at all.
- Investment is not adoption. 200 reports never guaranteed usage, and 200 agents won't either.
- The author role splits: building things with AI versus building agents for others. Plan for both, separately, and expect the harness to become its own job.
- Agent consumers need training. Self-documenting agents answer "how does this work," never "does this exist."
- Agents have no distribution story yet. Reports got workspaces and apps; agents get three doors and a URL you hand out personally.
- The semantic model is the one layer that doesn't split. Reports, Fabric apps, and agents all run on it, so keep building it.
- The leadership mandate is the last domino. Tooling chosen, security comfortable, validated thing built, named owner. Every missing one is your roadmap.

**Key takeaway:** this week, find where report requests still pile up in your organization. That backlog is your discovery document, and the team behind it is your first agent pilot.

My prediction: within a couple of years, "AI ready" stops being a line on an individual resume and becomes something we say about organizations, the way we talk about data culture today. Agent fluency will sit in onboarding right next to getting your email account, and companies will teach it themselves, the way they've always taught their own language.

If this got you thinking, stick around PromptingBI. And if you'd rather hear these arguments happen out loud, the Explicit Measures podcast is where they start.

<!--
Meta description: Nobody has defined what AI ready means for an organization. The roles and delivery gaps behind slow AI adoption, plus a 30-60-90 that starts with data quality.

Topic tags: AI Agents, Adoption, Data Culture, Governance, Semantic Models, Microsoft Fabric
-->
