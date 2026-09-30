---
title: "Agentic Distributed Wisdom: Why Your Team's AI Skills Can't Live in One Head"
date: 2026-09-30T09:00:00Z
permalink: "2026/09/30/distribute-the-wisdom"
description: "Your team's AI skills are agentic IP. Agentic distributed wisdom puts that judgment in one library every person and every agent on the team reads."
featured: /images/2026/09/distribute-the-wisdom-banner.png
draft: false
tags:
  - agent-skills
  - ai-agents
  - context-engineering
  - governance
  - microsoft-fabric
  - business-intelligence
  - adoption
source:
  episode: 562
  title: "The Fabric Handoff"
  notion: "https://app.notion.com/p/3bce74c69c1880b28640db0ee027a7ee"
  youtube: "https://www.youtube.com/watch?v=bTfUTS7tbVk"
  transcript: "transcripts/ep-562.txt"
---

When I was the internal BI person, the consultant's last day always looked about the same. A walkthrough, some documentation, a friendly goodbye, and a solution that worked right up until the first time it didn't. Then it was a black box, and I was the one standing in front of it.

I promised myself I'd never leave a client with one of those. For years I thought that meant writing better documentation. It doesn't anymore. When I build today, the deliverables are the easy part to hand over. What runs them lives in my repo: the skills, the project context, and the validation rules my agents read before they touch anything. If that leaves with me, I shipped a black box with nicer paperwork.

Then I started seeing the same black box inside teams that never hired a consultant.

Every BI team using AI right now has one person with the good setup. Their agent knows the naming conventions, the weird source system, which revenue measure finance actually trusts, and how to fix the pipeline that fails on the first of the month. Everyone else prompts from scratch and gets worse answers. That person is the consultant on their last day, except nobody scheduled the last day. It's whenever they get promoted, burn out, or take a job across town.

Training a backup moves the knowledge into a second head, and the team is still one resignation away from the same black box. What I want is something I've started calling **agentic distributed wisdom**: the team's judgment, written into one shared library of skills and context that every person on the team and every agent they use reads from. Whoever finds a mistake corrects it, and the team owns the result.

![A single human head silhouette on the left streaming knowledge lines into a central shelf of document cards, which fans out to many small human figures and agent nodes and on to a lakehouse, a notebook, and a bar chart on the right](/images/2026/09/distribute-the-wisdom-banner.png)

## Where distributed wisdom comes from

The phrase isn't mine. Ikujiro Nonaka, the researcher behind *The Knowledge-Creating Company*, argued with Ryoko Toyama that good strategy depends on [distributed practical wisdom](https://doi.org/10.1093/icc/dtm014), Aristotle's *phronesis*. The judgment to read a situation and act well in it can't sit with a few people at the top. It has to be spread among the people doing the work, because that's where the particular situations show up.

Edwin Hutchins reached the same place from cognitive science. In [Cognition in the Wild](https://mitpress.mit.edu/9780262082310/cognition-in-the-wild/) he studied a Navy navigation team and found the knowing happened across the whole system: people, charts, instruments, and procedures together. No single sailor held the full picture, and the ship still made it into port.

What changed is the tools. For 30 years the artifacts in that system sat there until a person picked them up. A chart can't plot a course by itself. An agent reading a skill can. When a team writes its judgment into a skill, a colleague can follow it and an agent can act on it that afternoon. That's the agentic part: the tools in the system now read and act, so written wisdom does work that a wiki page never did.

## Your AI skills are agentic IP

Every team working with agents builds a layer nobody sees in the tenant. Skills for the recurring work. A context page describing sources and schema. Validation rules. The instructions a session reads before it opens a notebook or edits a model. That layer is **agentic IP**, and on most teams it's personal property by accident. It lives in one person's home folder, one tool's settings, one chat history.

So ask the ownership question out loud. In consulting it sounds like "is that my firm's IP or the client's?" Where I've landed: if agents are how the platform gets built and managed, that layer belongs to the platform, and the platform belongs to the client. I don't get to keep the deployment scripts either.

If a client tells me no AI anywhere, I'll still build it. It'll take about 3 times as long and cost about that much more, and they should know that going in. Declining the tooling is their decision. Withholding it isn't mine. I also don't lead with it. Nobody should hear "you can't do your job without our AI setup." The skills and context go in next to the documentation, the recorded sessions, and the training, as the fastest way to run what we built.

Inside a team, the same question sounds like "is that my best analyst's setup, or ours?" Same answer. If the skill does team work, it belongs to the team. I've written about [which skills get governed and which stay personal](/2026/07/23/agent-skills-are-the-new-theme-files/): anything that needs a consistent standard gets governed. How your shared platform runs is the easiest call on that list.

The rule I keep coming back to: **a skill that only one tool can read is not shared knowledge.** Neither is a skill only one person knows exists.

## Fabric raises the stakes

A Power BI project ended with a thing: a semantic model and a report. Still messy to hand over, but it had edges. You could point at it.

Fabric is a way of operating. Data lands from sources, moves through a medallion lakehouse, gets transformed in notebooks and scheduled by pipelines, and a capacity pays for all of it in CUs that somebody now has to watch. Most organizations adopting Fabric aren't data engineering shops. It's the right recommendation, and it means operating work the team has never done before.

Agents make that gap wider. With the tooling I have, I can land a working lakehouse from all of a team's sources in a week or two. That's a real win. It also opens a gap between what the team owns and what it understands. Every week the agents build faster than people learn, the gap grows. That's true whether the builder is a consultant or your own power user with a good harness.

![A closed gift box holding a small bar chart on the left, contrasted with a long chain on the right linking a source database, a layered lakehouse, a notebook card, dotted pipeline connectors, and a capacity gauge](/images/2026/09/distribute-the-wisdom-box-vs-journey.png)

## One head is still a black box

Here's a shape I see more and more. A small BI team: 2 people, plus a few report developers. A decade of Power BI. In the last year they built a good Fabric platform themselves, with a medallion lakehouse, source control, staged deployments from dev to test to prod, and one enterprise semantic model serving most of the company. All in-house.

Almost all of the knowledge to operate it lives in one person's head.

That team doesn't need anyone to build anything. They built it. What they need is **experienced direction alongside their own execution, so their people build the skills and own the result.** Their next goal is opening the model and the platform to Copilot and agents, and that makes the one-head problem worse. An agent can't lean over and ask the lead why that pipeline runs at 4 a.m. It can only read what somebody wrote down.

Distribution means writing the operating knowledge down so a colleague and an AI assistant can both act on it: conventions, how to diagnose a failed pipeline, deployment steps, and why decisions were made. It goes in one library, and every tool the team uses reads from it. A repo is the source of truth. A team-facing layer like Notion sits on top for reading and discussion. A harness points Cursor, VS Code, Claude, and Copilot at the same files, so the analyst in Copilot and the engineer in Claude get the same answer about what revenue means.

![On the left, many small figures routing tangled lines into one solid head silhouette like a bottleneck; on the right, a central stack of documents radiating evenly to figures and agent nodes that also connect to each other](/images/2026/09/distribute-the-wisdom-one-head.png)

### A skill file still isn't wisdom

I've argued that [a skill.md is not wisdom](/2026/09/21/a-skill-md-is-not-wisdom/), and I meant it. A file holds instructions. It doesn't hold the judgment that says this is 6 hours, not 2. So how do you distribute wisdom with files?

You distribute the loop. In that post, the habit that made skills better was writing every override back into the file. Here the team owns that loop. Someone corrects an agent, the correction lands in the library, and by next Tuesday everyone's agent knows it, including the new hire's and the one run by the person who was never in the room.

That's the "practical" in Nonaka's practical wisdom. It comes out of the work, one correction at a time. The library keeps it from living in only one person.

## Seed the library

Whether a consultant starts the library or your own team does, the first moves are the same.

**Capture before you build.** Sit with the person who holds it all and turn how the platform actually runs, weird parts included, into candidate skills.

**Pick the home first.** Decide early where skills live, how they sync, and which tools read them, so everything produced afterward has somewhere to land. Skip this and the first 10 skills end up in one person's folder by default, which is the problem we're trying to solve.

**Write 3 seed skills.** Whoever starts the library writes a small number to prove the pattern works end to end on your platform and tooling. Then the rest of the team writes the next ones, paired with someone who's done it. Getting from 3 to 8 together teaches more than one person delivering 30. A library written by one person is a bigger black box.

**Put definitions under the skills.** Skills are procedural. They depend on declarative knowledge: what a measure means, why it's calculated that way, who owns it. Start a register of the most-used measures, each with a business definition, calculation intent, and owner, before anyone reorganizes the model around them. An agent following a skill that points at an undefined measure is guessing.

**Settle agent access at the same time.** Giving agents skills means giving them reach. Decide which identities they run as, what they can touch, where secrets live, and what gets logged before access expands. I've written about [what an agent should see before it touches Fabric](/2026/08/17/dont-let-your-agent-touch-fabric/). With a shared library, that becomes a team standard instead of one person's habit.

**Record every working session, and store it next to the library.** 60 days later, "I think we talked about this" should be a search.

**If a consultant is involved, let the team set the order.** Prioritize the roadmap with the team and have their lead present it to leadership. A roadmap holds when the people executing it agree with the sequence. I advise, pair, and prototype in dev. They own every production change. If the consultant owns the roadmap and the production changes, it's a delivery engagement with a goodbye meeting at the end, whatever the contract calls it.

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

The old measure was the handoff meeting: everyone nods, the packet ships, done. That measures somebody's exit. Agentic distributed wisdom gets measured by what the team and its agents can do without that person.

Here's what I check at 30, 60, and 90 days:

- **A skill exists that the person who started the library never saw.** This is the strongest signal. Someone hit a problem, solved it, and wrote it into the library without asking anyone.
- **Every agent gives the same answer.** Ask 3 people's agents how revenue is defined, or why the Friday load runs late. If you get 3 answers, the wisdom is still personal.
- **Agents answer what the lead used to answer.** People still ask questions. They ask the library first, and the lead gets fewer interruptions.
- **A new hire's agent is useful in week 1.** The library is their onboarding, and they add to it by the end of the month.
- **The lead can take a real vacation.** If they're answering pipeline questions from the beach, the knowledge still lives in one head, however many markdown files exist.
- **Roles have names.** Someone owns the library, reviewers are named, and one person approves production changes. Governance and upskilling were always what kept a Power BI deployment alive after the builder moved on. With agents in the mix, they're what keeps the library alive through the first reorg.

If a consultant was involved, add 2 more. The weekly questions change from "how do I" to "should we," then stop coming. And the next call is about a harder problem. If they call me back for the same problem, I handed off. If they call me back for a harder one, the knowledge stayed with them.

Central BI teams face this too. Standing up a lakehouse for finance creates the same one-head risk, which is why I put exit criteria in the [tiger team charter](/2026/09/18/central-bi-is-a-tiger-team-now/). Replace "consultant" with "the team that built it" and every line above still holds.

## Start this week

For a BI team, or a consultant kicking off an engagement:

- Ask where the knowledge lives today, by name. If the answer is one name, that's the first finding, and it outranks anything in the tenant.
- Inventory the agentic IP: every skill, context file, and agent instruction the team uses, and whose machine it's on.
- Choose the library's home, and confirm every AI tool the team uses can read it.
- Move the most-used personal skill that does team work into the library, with a named owner.
- Seed a few skills, then write the rest together. People learn the method by doing it.
- Build the measure register before the model changes.
- Consultants: agree up front that project skills, context, and validation rules go into the client's library, and put it in the scope. Book the 30/60/90 check-ins before the engagement ends.

## Takeaways

- Distributed wisdom is an established idea: judgment has to live with the people doing the work. Agents make it agentic, because the tools in the system can now read that judgment and act on it.
- Your team's skills, context, and validation rules are agentic IP. If they do team work, they belong to the team, whoever wrote them.
- A skill only one tool can read, or only one person knows about, is not shared knowledge.
- Fabric raises the stakes. It's a way of operating most teams haven't done before, and agents build it faster than people learn it.
- The wisdom lives in the override loop: corrections written back into the library by the team that owns it.
- Seed a few skills and write the rest together. A library of 30 written by one person is a bigger black box.
- Success looks like a skill the library's founder never saw, every agent giving the same answer, and a lead who can take a vacation.

**Key takeaway:** this week, list every skill, context file, and agent instruction your team relies on, and whose machine each one lives on. If one name shows up more than twice, move the most important one into a library the whole team and its agents can read.

My prediction: within a year, "where does your team's agentic IP live?" becomes a standard question in BI team reviews and before consulting engagements get signed, and the teams with a good answer are the ones whose agents stay useful after people move on. Keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
