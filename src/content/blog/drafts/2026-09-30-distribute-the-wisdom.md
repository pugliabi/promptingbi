---
title: "Distribute the Wisdom: What a Fabric Engagement Should Leave Behind"
date: 2026-09-30T09:00:00Z
permalink: "2026/09/30/distribute-the-wisdom"
description: "A Fabric handoff moves knowledge from one head to another. Distributed wisdom puts it in a skill library the whole team and its agents read."
featured: /images/2026/09/distribute-the-wisdom-banner.png
draft: false
tags:
  - microsoft-fabric
  - agent-skills
  - ai-agents
  - governance
  - adoption
  - business-intelligence
  - context-engineering
source:
  episode: 562
  title: "The Fabric Handoff"
  notion: "https://app.notion.com/p/3bce74c69c1880b28640db0ee027a7ee"
  youtube: "https://www.youtube.com/watch?v=bTfUTS7tbVk"
  transcript: "transcripts/ep-562.txt"
---

When I was the internal BI person, the consultant's last day always looked about the same. A walkthrough, some documentation, a friendly goodbye, and a solution that worked right up until the first time it didn't. Then it was a black box, and I was the one standing in front of it.

I promised myself I'd never leave a client with one of those. For years I thought that meant writing better documentation. It doesn't anymore. When I build a Fabric platform today, the pipelines and notebooks are the easy part to hand over. What runs them lives in my repo: the skills, the project context, and the validation rules my agents read before they touch anything. If that leaves with me, I shipped a black box with nicer paperwork.

A handoff moves knowledge from one head to another on a date, and the team is still one resignation away from the same black box. What I want to leave behind is **distributed wisdom**: the judgment that runs the platform, written into one library that every person on the team and every agent they use reads from. They own it, and it keeps growing after I'm gone.

![A single human head silhouette on the left streaming knowledge lines into a central shelf of document cards, which fans out to many small human figures and agent nodes and on to a lakehouse, a notebook, and a bar chart on the right](/images/2026/09/distribute-the-wisdom-banner.png)

## A Power BI handoff was a box

A Power BI engagement ended with a thing: a semantic model and a report. Still messy to hand over, still plenty of ways to get it wrong, but it had edges. You could point at it.

A Fabric engagement ends with a way of operating. Data lands from sources, moves through a medallion lakehouse, gets transformed in notebooks and scheduled by pipelines, and a capacity pays for all of it in CUs that somebody now has to watch. Most organizations adopting Fabric aren't data engineering shops. We're introducing them to medallion architecture, notebooks, and the pipeline model. It's the right recommendation, and it means handing over work they've never done before.

The handoff also starts at the first decision. With the tooling I have, I can land a working lakehouse from all of a client's sources in a week or two. That's a real win. It also opens a gap between what the client owns in their tenant and what they understand about it. Every week I build faster than they learn, the gap gets wider, and the end of the engagement gets longer and more painful.

![A closed gift box holding a small bar chart on the left, contrasted with a long chain on the right linking a source database, a layered lakehouse, a notebook card, dotted pipeline connectors, and a capacity gauge](/images/2026/09/distribute-the-wisdom-box-vs-journey.png)

## The agentic IP is part of the platform

A few months ago I didn't have an answer to this one. When I build with agents, there's a layer of work nobody sees in the tenant. Skills I wrote for that client's pipelines. The context page describing their sources and schema. Validation rules. The instructions a session reads before it opens a notebook. Is that my firm's intellectual property, or does it belong to the client?

Where I've landed: if agents are how the platform gets built and managed, that layer belongs to the platform, and the platform belongs to the client.

I'd make the same argument about the Fabric APIs. I build through the API, source control, and the XMLA endpoint because that's best practice. If a client only ever wants to click around the UI, that's their call, and I'll tell them what it costs. I still don't get to keep the scripts.

AI works the same way. If a client tells me no AI anywhere, I'll still build it. It'll take about 3 times as long and cost about that much more, and they should know that going in. Declining the tooling is their decision. Withholding it isn't mine.

One caveat: I don't lead with this. Nobody should hear "you can't do your job without our AI setup." That's wrong and a little misleading. The skills and context go in the box next to the documentation, the recorded sessions, and the training. They're the fastest way to run what we built, and the team can still run it without them.

## One head is still a black box

Here's a shape I see more and more. A small BI team: 2 people, plus a few report developers. A decade of Power BI. In the last year they built a good Fabric platform themselves, with a medallion lakehouse, source control, staged deployments from dev to test to prod, and one enterprise semantic model serving most of the company. All in-house.

Almost all of the knowledge to operate it lives in one person's head.

That team doesn't need a consultant to build anything. They built it. What they need is harder to put on an invoice: **experienced direction alongside their own execution, so their people build the skills and own the result.** Their next goal is opening the model and the platform to Copilot and agents, and that makes the one-head problem worse. An agent can't lean over and ask the lead why that pipeline runs at 4 a.m. It can only read what somebody wrote down.

A classic handoff would move knowledge from my head into the lead's head. Congratulations, you still have one head.

Distribution means writing the operating knowledge down so a colleague and an AI assistant can both act on it: conventions, how to diagnose a failed pipeline, deployment steps, and why decisions were made. It goes in one library, and every tool the team uses reads from it. A repo is the source of truth. A team-facing layer like Notion sits on top for reading and discussion. A harness points Cursor, VS Code, Claude, and Copilot at the same files.

The rule I keep coming back to: **a skill that only one tool can read is not shared knowledge.** If it only works inside my Claude setup, it isn't theirs.

![On the left, many small figures routing tangled lines into one solid head silhouette like a bottleneck; on the right, a central stack of documents radiating evenly to figures and agent nodes that also connect to each other](/images/2026/09/distribute-the-wisdom-one-head.png)

### A skill file still isn't wisdom

I've argued that [a skill.md is not wisdom](/2026/09/21/a-skill-md-is-not-wisdom/), and I meant it. A file holds instructions. It doesn't hold the judgment that says this is 6 hours, not 2. So how do you distribute wisdom with files?

You distribute the loop. In that post, the habit that made skills better was writing every override back into the file. Here the team owns that loop. Someone corrects an agent, the correction lands in the library, and by next Tuesday everyone's agent knows it, including the new hire's and the one run by the person who was never in the room.

The wisdom still comes from people. The library keeps it from living in only one of them.

## Seed the library

Designing an engagement for distribution changes a few things.

**Capture before you build.** Sit with the person who holds it all and turn how the platform actually runs, weird parts included, into candidate skills.

**Pick the home first.** Decide early where skills live, how they sync, and which tools read them, so everything produced afterward has somewhere to land. Skip this and the first 10 skills end up in my repo by default, which is the problem we're trying to solve.

**Write 3 seed skills.** I write a small number to prove the pattern works end to end on their platform and tooling. Then the team writes the next ones with me beside them. Getting from 3 to 8 together teaches more than me delivering 30. If I write the whole library myself, I've handed over a bigger black box.

**Put definitions under the skills.** Skills are procedural. They depend on declarative knowledge: what a measure means, why it's calculated that way, who owns it. Start a register of the most-used measures, each with a business definition, calculation intent, and owner, before anyone reorganizes the model around them. An agent following a skill that points at an undefined measure is guessing.

**Settle agent access at the same time.** Giving agents skills means giving them reach. Decide which identities they run as, what they can touch, where secrets live, and what gets logged before access expands. I've written about [what an agent should see before it touches Fabric](/2026/08/17/dont-let-your-agent-touch-fabric/). With a shared library, that becomes a team standard instead of one person's habit.

**Record every session, and store it next to the library.** 60 days later, "I think we talked about this" should be a search.

**Let them set the order.** Prioritize the roadmap with the team and have their lead present it to leadership. A roadmap holds when the people executing it agree with the sequence. I advise, pair, and prototype in dev. They own every production change.

That last one is the tell. If the consultant owns the roadmap and the production changes, it's a delivery engagement with a goodbye meeting at the end, whatever the contract calls it.

The whole thing fits on one page the team keeps next to the library. Mine looks roughly like this:

```markdown
# Skill Library Playbook

One page. If it grows past one page, it is a skill, not a playbook.

## Where it lives
- Source of truth: the skills folder in the team repo. Nothing counts
  until it is merged there.
- Team-facing copy: synced to Notion for reading and discussion.
- Every AI tool we use points at the repo folder. If a skill only works
  in one tool, it is not done.

## Adding a skill
1. Anything you explained twice, or an agent got wrong twice, is a
   candidate. Open it as a draft.
2. Write it so a colleague could follow it without the agent, and an
   agent could follow it without the colleague.
3. Name an owner in the front matter. A skill with no owner is a draft.

## Reviewing
- One other person reads it before merge. Not the author's agent.
- Anything touching production, credentials, or a certified measure
  gets reviewed by the platform lead.

## Maintaining
- When you override an agent, the override goes into the skill the same
  day. Not into chat. Not into your memory.
- Every skill gets opened once a quarter by its owner. Still true, or
  deleted. Stale is worse than missing.

## Success check (monthly)
- [ ] Someone other than the lead added a skill.
- [ ] An agent answered a question the lead used to answer.
- [ ] An override made it into the library within a week.
```

"Stale is worse than missing" is the line people want to soften. Keep it. Skills describe a platform that changes every week, and [a skill left alone drifts](/2026/09/16/build-the-thing-that-creates-the-thing/) until the agent is confidently wrong. A missing skill makes the agent ask. A stale one makes it lie.

![Three small document cards planted as seedlings on the left grow into a branching structure of many documents, each added by a small figure, feeding a dashboard on the right, with a dotted loop returning corrections into the structure](/images/2026/09/distribute-the-wisdom-seed.png)

## What success looks like

The old consulting measure was the handoff meeting: everyone nods, the packet ships, done. That measures my exit.

Here's what I check at 30, 60, and 90 days:

- **The questions change, then stop.** I run a weekly Q&A after the engagement, with no new implementation. Early on it's "how do I." Later it's "should we." Within a couple of months those sessions should run dry because they can learn without me.
- **A skill exists that I never saw.** This is the strongest signal. Someone hit a problem, solved it, and wrote it into the library without asking anyone.
- **Agents answer what the lead used to answer.** People still ask questions. They ask the library first, and the lead gets fewer interruptions.
- **The lead can take a real vacation.** If they're answering pipeline questions from the beach, the knowledge still lives in one head, however many markdown files exist.
- **Roles have names.** Someone owns the library, reviewers are named, and one person approves production changes. Governance and upskilling were always what kept a Power BI deployment alive after the consultant left. In Fabric, they're what keeps the library alive through the first reorg.
- **The next call is about a harder problem.** Good business is repeat business. If they call me back for the same problem, I handed off. If they call me back for a harder one, the knowledge stayed with them.

Consultants aren't the only ones this applies to. Central BI standing up a lakehouse for finance faces the same problem, which is why I put exit criteria in the [tiger team charter](/2026/09/18/central-bi-is-a-tiger-team-now/). Replace "consultant" with "the team that built it" and every line above still holds.

## Before your next engagement

For the consultant, or the team hiring one:

- Ask where the knowledge lives today, by name. If the answer is one name, that's the first finding, and it outranks anything in the tenant.
- Decide at kickoff whether you're building fast or growing them into it. That choice is the handoff design, and you can't reverse it at week 12.
- Agree up front that project skills, context, and validation rules go into the client's library. Put it in the scope.
- Choose the library's home in week 1, and confirm every AI tool the team uses can read it.
- Seed a few skills, then write the rest together. People learn the method by doing it.
- Build the measure register before the model changes.
- Book the 30/60/90 check-ins before the engagement ends, and write down what "they don't need me" looks like so you know when you've hit it.

## Takeaways

- A Fabric engagement hands over a way of operating the client has never done, and that handover starts with the first decision.
- If agents build and manage the platform, the skills, context, and validation rules belong to the client. Leave them, the same way you'd leave the deployment scripts.
- Don't lead with the AI tooling. Put it in the box with the documentation and training.
- Moving knowledge into one other head leaves you with the same risk. Put it in one library every person and agent reads.
- The wisdom lives in the override loop: corrections written back into the library by the team that owns it.
- Seed a few skills and write the rest together. A consultant-written library of 30 is a bigger black box.
- Success looks like a skill you never saw, an agent answering what the lead used to answer, and a next engagement that's harder than the last.

**Key takeaway:** this week, write down where your Fabric platform's operating knowledge lives, by person's name. If one name shows up more than twice, pick the thing only that person can fix and make it the first skill in a library the whole team and its agents can read.

My prediction: within a year, "what do we keep of your agentic IP when you leave?" becomes a standard question before a Fabric engagement gets signed, and consultants with a good answer win the work. Keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
