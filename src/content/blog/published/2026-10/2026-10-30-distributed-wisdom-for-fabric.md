---
title: "Distributed Wisdom for Fabric: Your Team and Your Agents Need the Same Brain"
date: 2026-10-30T09:00:00Z
permalink: "2026/10/30/distributed-wisdom-for-fabric"
description: "Distributed wisdom for Fabric has two halves: how your team shares what it knows, and whether your agents read from it. Both need the same brain."
featured: /images/2026/10/distributed-wisdom-for-fabric-banner.png
draft: false
tags:
  - microsoft-fabric
  - ai-agents
  - agent-skills
  - context-engineering
  - data-culture
  - governance
  - business-intelligence
source:
  episode: 576
  title: "Distributed Wisdom for Fabric"
  notion: "https://app.notion.com/p/3e6e74c69c188003a311ded0aaf743ee"
  youtube: "https://www.youtube.com/watch?v=uYlYQdBNCE8"
  transcript: "transcripts/ep-576.txt"
---

Spend five minutes on LinkedIn or X and you'll find one. "Look what I built with agents this weekend." A lakehouse, sometimes a whole side business. Read it again and look at the operative word: **I**.

I don't doubt any of it. I can work great with an agent on my own too, and that's the problem. One person and an agent is the easy part. The moment it has to become a we, two people and their agents on the same Fabric project, it falls apart. I think that's why AI hasn't taken off inside most companies. (Yes, hot take.)

BI teams were bad at sharing what they know long before anyone wrote a skill file. Agents raised the cost of that, and they also gave us the first real way to fix it.

The idea I keep coming back to is distributed wisdom, and it has two halves. One is how a team shares its Fabric knowledge and builds a data culture around it. The other is whether your agents work from that same knowledge. I think they're one system, and **your team and your agents need the same brain.**

![On the left, a lone figure working at a laptop inside a closed circle with no outside connections. A dotted path leads to a ring of people and agent nodes all connected to one shared folder of documents, which feeds a lakehouse, table cards, and a bar chart on the right](/images/2026/10/distributed-wisdom-for-fabric-banner.png)

## Where the phrase comes from

I ran into it again in Roddy Boyd's *Fatal Risk*, a book about how AIG nearly destroyed itself. Early on, Boyd describes a practice that grew out of academic peer review, which he calls "an attempt to apply common sense, or 'distributed wisdom' in the words of sociology, in the vetting of a risky, arcane proposition."

A risky, arcane proposition. That's a pretty good description of a Fabric notebook an agent wrote at 11 p.m. that nobody else on the team has read.

Here's the definition I work from:

> Distributed wisdom is an organization's ability to connect the expertise, experience, and judgment spread across its people and teams, so that knowledge can inform decisions beyond the place where it originated.

Some people call it collective intelligence. Either way, the last phrase is the one I care about: *beyond the place where it originated*. If what you know only shapes decisions in your own head or on your own laptop, it hasn't been distributed yet.

I've written about [the exit version of this](/2026/09/30/distribute-the-wisdom/), when the person with the good AI setup leaves. This one is wider. It shows up on a normal Tuesday when everyone is still here.

## The Sicily test

I ask this on every client project. Pick the one or two people your BI program depends on. Say they bought one of those one-euro houses in Sicily and left tomorrow. (Honestly, who could blame them?) What happens to your BI program? What happens to your data culture?

On most teams, before governance has matured, it crumbles. Who builds the semantic models now? Who knows why the revenue measure has that one strange filter?

Handing you an agent to replace that person wouldn't get it back, either. The agent can write the DAX. Plenty of people can, and [SQLBI's new DAX LLM benchmark](https://www.sqlbi.com/tv/dax-llm-benchmark-v2-0-trailer/) shows the frontier models can too. What left with your people is the understanding: what each metric means and why the measures in your process are built the way they are. On most teams, that has never been written down anywhere an agent or a new hire could find it.

![On the left, three semantic model table cards and a bar chart with their connector lines broken into dashed fragments. On the right, two people walk up a hillside path toward a small house under the sun](/images/2026/10/distributed-wisdom-for-fabric-sicily-test.png)

## The people half: we were never good at this

When Power BI first showed up, being the Power BI person felt amazing. Every request came through you. You felt indispensable. For you it was job security. For the organization it was a risk with a nice title.

Then the team grew, and the drift started. Two developers with two theme files ship reports that look like they came from two companies. Run discovery with two different sets of intake questions and you get two scopes, plus two opinions about which dimensions and facts matter. The reports still work. Users just get a different experience depending on who built them, and that wears down trust in a data culture. [Theme files were the first version of this problem](/2026/07/23/agent-skills-are-the-new-theme-files/), and most teams never fully solved it.

Our fix was always to write it down. A SharePoint page called "How We Build DAX Measures." A Confluence space for the governance standards. We tried that, and it doesn't work. A page nobody opens doesn't inform a single decision outside the team that wrote it.

The platform is starting to help with the visible part. Microsoft just made the [Govern experience in the OneLake catalog](https://community.fabric.microsoft.com/blog/fbc_fabricupdatesblogs/govern-your-microsoft-fabric-data-estate-from-one-place-with-the-onelake-catalog/5377369) generally available, and its insights also live as a report on a customizable semantic model in the Admin monitoring workspace. In my ideal world, that view is up on the screen at the data governance committee meeting, so the people making decisions see the same health signals the admins do.

## The agent half: clean code is not clean data

The pushback I hear is that agents fix the drift. They follow best practices every time and never cut corners at 4:45 on a Friday.

They do follow practices well. But **clean code is not clean data**. I can have a beautifully structured notebook that loads the wrong number. The part the code can't hold is what the numbers should be and how we check them, before anyone builds a model on the silver table.

Say two of us are on the same Fabric project, both working with agents. I built the pipeline and started the semantic model. I know the KPIs and what they should come to. Now you pick up the next piece with your agent. If you don't have shared context on what was built and what the numbers should be, you're set up to fail, and your agent will fail confidently.

Nobody left in that example. I'm still on the project. Once two people and two agents touch the same work, the knowledge has to be shared or the pieces start contradicting each other.

## What the team and its agents have to share

I see three things that need to be distributed in agentic work, and I'd rank them.

![Four people and two agents on the left connected by flowing lines to one shared stack on the right: a large card of skill documents on top, a smaller project page with a checklist and a gauge in the middle, and a small connector plug at the bottom](/images/2026/10/distributed-wisdom-for-fabric-skills-context-tools.png)

**1. Skills.** If my notebook skill always uses a config file and yours doesn't, half our processes read config and half don't, and our agents go looking in different workspaces. It won't always break. Two people with different skills can each build a good report on their own. On a shared report, though, two skill sets means two templates, and the work interrupts itself every time one of us picks it back up.

**2. Context.** I'd fight hardest for this one. How does your agent know where the project stands? It needs specifics: we're using this lakehouse to build these three things, and the silver table should have this many rows in this structure. Without shared context, every session starts with first-time discovery, and your agent ends up staring at a half-built lakehouse thinking, I guess this is what we built?

On my projects, anything bigger than a two- or three-item checklist becomes agent instructions in Notion: a master sequence that says there are 17 things to do and we start with item one, with a recon and a write-back on every item. I walked through that setup in [Context Harness, Execution Harness](/2026/09/25/context-harness-execution-harness/). It works beautifully, for me. If I'm the only one using it, nobody else on the team, agent or not, knows where we are or what the benchmarks are.

**3. Tools.** Least important, but still on the list. If one person has the MCP server connected or the Power BI Desktop Bridge enabled and the other doesn't, the two agents have different capabilities. It's the easiest of the three to fix, so fix it.

Skills and context are where the wisdom lives. It's all well and good to chat with an agent, but it has to come with a back end.

## Agents are part of the wisdom

The organizations doing this well treat agents as members of the distributed wisdom. Wherever the team shares knowledge, the agent has access to it too. When someone new gets Claude or Copilot, the first setup step is connecting the agent to the team's collective knowledge: where the context lives and which skills are governed. From day one, people and agents work from the same memory.

Microsoft is building the same way. Alongside the governance GA, they shipped Govern Skills in Skills for Fabric. In Microsoft's words, the skills "turn governance expertise from something each model has to reconstruct into reusable knowledge provided by Fabric."

This also fixes the SharePoint problem. A page nobody reads never changed a decision. A skill gets read every time an agent runs it, so the knowledge reaches decisions well beyond the team that wrote it down.

![A plain document page on the left connected to nothing, flowing into a skill card plugged into an agent node on the right, which sends lines out to a group of people, a lakehouse, and a report](/images/2026/10/distributed-wisdom-for-fabric-page-to-skill.png)

## Won't that make me expendable?

I get this question every time. If I turn everything I know into skills my whole team and their agents can use, didn't I just write my own replacement?

I'd argue the opposite. Plenty of people are good at DAX and Power Query, and so are the models. The skill I'd bet on now is taking how an organization does its mundane or complicated work and turning it into a workflow an agent can run and a colleague can follow. Do that once and you've shown you can do it again, on the next process and the next team.

So look at what has frustrated you for years: the Excel file that shows up every month in a slightly different shape, the intake meeting that always misses the same three questions. Those are candidate skills now, and the person who turns them into skills for people and agents is the person every team is going to want.

## Start this week

- Run the Sicily test. Name the one or two people your BI program depends on and write down what leaves with them, starting with metric definitions and the reasons behind the measures. That list is your backlog.
- Pick one brain: one place team context lives that people and agents both read, with the same tools connected for every agent on the project. If you're starting from zero, the [skill library playbook](/2026/09/30/distribute-the-wisdom/) is a good shape.
- Write the numbers down. Put the active project's benchmarks in that shared context, like expected row counts and key totals for silver. An agent can't verify against a number that lives in your head.
- Turn one recurring frustration into a governed skill. The intake checklist or the messy monthly Excel file is a good first candidate.
- Get the OneLake catalog governance view in front of your governance committee.
- Check your "I." Next time you post a win, ask whether a teammate's agent could repeat it tomorrow. If it couldn't, you built it for yourself.

## Takeaways

- Distributed wisdom is knowledge that informs decisions beyond the place it originated. One head or one laptop doesn't count.
- The people half and the agent half are one system, and your team and your agents need the same brain.
- What walks out the door with your key people is what the metrics mean and why the measures are built the way they are.
- Clean code is not clean data. Share skills and context first, tools last.
- Connect agents to the team's knowledge on day one, and turn what you know into skills. That's the skill teams will want most.

**Key takeaway:** this week, run the Sicily test on your own team. Write down the names and what leaves with them, then move the first item on that list into a place both your teammates and their agents read.

My prediction: within a year, "show me how you shared what you know with your team and its agents" becomes a bigger question in BI hiring than "show me your DAX." The teams that answer it well will be the ones where any teammate's agent can repeat yesterday's work today. Keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
