---
title: "The Four Pillars of Data Governance (and the Agent That Reports to Each)"
date: 2026-07-24T09:00:00Z
permalink: "2026/07/24/four-pillars-of-data-governance-agents"
description: "Score your data governance on four pillars, then hire one agent for the weakest: scribe, secretary, watchdog, or mirror."
featured: /images/2026/07/four-pillars-banner.png
tags:
  - governance
  - ai-agents
  - data-culture
  - semantic-models
  - business-intelligence
  - mcp
draft: true
source:
  episode: 545
  title: "Agents Helping with Data Governance"
  notion: "https://app.notion.com/p/397e74c69c188056a08dc50d9279dbd4"
---

A table with four solid legs will hold whatever you stack on it. A table with three and a half legs looks fine in the showroom, and it keeps looking fine right up until somebody leans on the wrong corner. I spend my whole life in tables, and I hate a wobbly one.

Data governance works the same way. When I stand up governance with clients, I preach four pillars from the rooftops: **enablement and empowerment**, **promotion of data initiatives**, **accountability and responsibility**, and **culture and literacy**. Call them pillars when you're presenting to leadership and table legs when you're being honest with yourself. Every organization is weak in at least one. The wobble never shows up on a quiet Tuesday. It shows up when the auditor calls, when a new VP asks which of the seven sales reports is the real one, or when you point an AI agent at your data and discover it has nothing solid to stand on.

![A four-legged table holding a dashboard, with one leg noticeably shorter than the other three so the tabletop tilts toward that corner](/images/2026/07/four-pillars-table.png)

That last failure mode is the new one. Agents will not lead your data governance program, but every one of the four pillars can now hire one. The agent reports to the pillar. It never becomes one.

![Four standing pillars supporting a governance program, each pillar labelled by its role and each with a small agent figure working at its base](/images/2026/07/four-pillars-banner.png)

Two clarifications before we walk them. Governance is not security; access control matters, but "who can see what" is one slice of one pillar, and I argued that out at length in [should an AI agent sit on your data governance committee](/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/). Governance is also not a project. There is no glorious Friday where you declare it complete and move on with your life. New systems arrive, new data flows in, definitions drift. I think in pillars because projects end and pillars stand.

## Pillar 1: Enablement and Empowerment

This pillar asks one question. Can teams find, consume, and use data without begging for it?

The failure mode I see constantly is someone in sales who needs a number, searches for "sales," and gets back a pile of reports with sporadic views and zero signal about which one to trust. The knowledge that would fix this already exists. It's buried inside semantic models and pipeline code, where a consumer will never see it.

**The agent hire: the catalog scribe.** Connect an agent to your tenant through an MCP and give it the job no human has ever kept up with. Read the semantic models, the measures, the lakehouse tables, and write plain-English documentation into the tool your people already read. SharePoint, Confluence, Notion, whatever your shared brain is. I have tried to keep definitions current by hand more than once, and I once built an entire document control app just to track them. It was stale before the paint dried. Can an agent rerun that loop every night without complaining? Well, of course it can. That's the whole trick.

## Pillar 2: Promotion of Data Initiatives

Everyone has data ideas. Leadership wants AI reading every PDF in the building. Finance wants the forecast integrated. Somebody read an article on the plane. Ideas were never the problem.

This pillar is about making initiatives LAND. Deciding what matters most, in what order, and making sure it gets done. If your semantic models are a mess and someone proposes a shiny new AI project, which comes first? Who owns that call? If nobody in the room can answer, you have a promotion problem.

**The agent hire: the committee secretary.** Governance lives and dies in meetings. The committee argues, decides, and assigns, and then half of it evaporates before the next session. An agent takes the transcript and turns it into the record: decisions captured, owners named, action items carried forward. Then it pulls usage data so next month the committee can see whether the initiative moved anything real. The committee decides. The agent remembers, and it keeps receipts.

## Pillar 3: Accountability and Responsibility

Ownership through the entire pipeline: the person inputting the data, the person transforming it, the definitions everyone reports on. Accountability is not about chastising whoever broke the number. It's the reason trust exists when the number is right. People believe data they can trace to a name.

**The agent hire: the contract watchdog.** Say the committee agrees you have seven sales regions. Not eight, not "Unknown," not a blank. Write that down. What you just created is a **data contract** between the people producing the data and the people consuming it, and there is ZERO AI inside the contract itself. Humans agreed. Humans signed. Now hand it to an agent that checks distinct values against the contract every single day. The morning region number eight sneaks in, it doesn't write a log entry nobody reads. It messages the owner by name with the offending records attached: here's what arrived, here's the agreement it violates, go fix it. Accountability with a first name on it, running while you sleep.

One warning. No contract, no watchdog. An agent enforcing a standard nobody agreed to is noise with a schedule.

## Pillar 4: Culture and Literacy

The softest pillar carries the most weight. Is everyone speaking the same language when they look at the numbers?

This is where I remind clients that governance is not the BI team's hobby. It comes from leadership and from department representatives sitting in a room, arguing about pain points and priorities. Fabric raised the stakes on the literacy half, because business logic no longer lives only in Power Query. It's in lakehouses, notebooks, and pipelines, scattered across workspaces. If your committee can't speak business AND platform in the same sentence, you will not get a handle on this. Find the bilingual people. They hold the most valuable seats in the room.

**The agent hire: the definition mirror.** Send an agent across your estate to lay the ambiguous definitions side by side. Three revenue measures. Four versions of "customer." Two gross margins that disagree by a rounding error and a philosophy. Can the agent settle what a customer IS? It cannot, and it shouldn't. That's cultural work and it belongs to people. What the agent ends is the pretending. Once the definitions sit next to each other in plain sight, "we all agree" stops being an assumption and becomes a decision someone has to make.

## Staff, Never Chair

When I stand up a governance program, roughly 70 percent of the work is people work: workshops, interviews, committee building, prioritization fights. None of it happens on a computer, and none of it can be delegated to a model (no agents required, just a conference room and strong opinions).

So my org chart rule is short. Every agent in your governance program is staff, never chair. A scribe, a secretary, a watchdog, a mirror. The moment a vendor tells you their agents will lead governance for you, hold onto your wallet. Agents don't hold up pillars. They keep the pillars you built from wobbling.

![Four small agent nodes reporting upward to four standing pillars, with each agent positioned at the base of a pillar rather than in place of one](/images/2026/07/four-pillars-staff.png)

## The Pillar Walk

You don't need a six-week maturity assessment to find your weak corner. Walk the four pillars next week and score each from 1 to 5. Be honest.

- **Enablement and empowerment.** Ask five people outside the data team where they'd find the trusted sales number. Count how many different answers you get.
- **Promotion of initiatives.** Ask leadership to name the top three data initiatives in flight and who owns each one. If the answers don't match each other, that IS the score.
- **Accountability and responsibility.** Pick one table in your lakehouse and trace it back to a named owner for the input and a named owner for the transformation. One table. See how far you get.
- **Culture and literacy.** Count your definitions of "customer." If you're confident there's only one, count again.

![Four pillars each topped with a score gauge, with the pillar holding the lowest reading circled](/images/2026/07/four-pillars-walk.png)

Circle your lowest score. That's the corner your organization is about to lean on. Then make ONE agent hire for that pillar: the scribe, the secretary, the watchdog, or the mirror. Run it for a month and bring leadership the before and after instead of a strategy deck.

## Takeaways

- Score all four pillars from 1 to 5 this week, circle the lowest, and make one agent hire for that pillar. One pillar, one agent, one month.
- Security is not a fifth pillar. It lives inside accountability, and treating it as the whole discipline shrinks a company-wide program down to a tab in the admin portal.
- Point the catalog scribe at the semantic models and let it write plain-English definitions into the tool your people already open. Nightly, forever, no complaining.
- Write the data contract before you set the watchdog. Humans agree the seven regions; the agent checks them and names the owner when an eighth arrives.
- The definition mirror cannot decide what a customer is. It ends the pretending that you already decided.
- Roughly 70 percent of a governance program happens in a room with no computer in it, which is why every agent stays staff and never chair.

I'll make the prediction plainly: "agent-assisted" will become the default word in front of governance the same way "self-service" became the default word in front of BI. The winners won't be the organizations with the most agents. They'll be the ones whose pillars were solid enough to put weight on. If this got you thinking, stick around PromptingBI. And if you'd rather hear ideas like this argued out loud, come join us over on the Explicit Measures podcast.
