---
title: "The Four Pillars of Data Governance (and the Agent That Reports to Each)"
date: 2026-08-31T09:00:00Z
permalink: "2026/08/31/four-pillars-of-data-governance-agents"
description: "Enablement and promotion are the first two governance pillars. What actually lives in each, what doesn't, and the agent job to hire under both."
featured: /images/2026/08/four-pillars-banner.png
tags:
  - governance
  - ai-agents
  - data-culture
  - semantic-models
  - microsoft-fabric
  - mcp
draft: false
source:
  episode: 545
  title: "Agents Helping with Data Governance"
  notion: "https://app.notion.com/p/397e74c69c188056a08dc50d9279dbd4"
  transcript: "transcripts/ep-545.txt"
---

A table with four solid legs will hold whatever you stack on it. A table with three and a half legs looks fine in the showroom, and it keeps looking fine right up until somebody leans on the wrong corner. I spend my whole life in tables, and I hate a wobbly one.

Data governance works the same way. When I stand up governance with clients, I preach four pillars from the rooftops: **enablement and empowerment**, **promotion of data initiatives**, **accountability and responsibility**, and **culture and literacy**. Call them pillars when you're presenting to leadership and table legs when you're being honest with yourself. Every organization is weak in at least one. The wobble never shows up on a quiet Tuesday. It shows up when the auditor calls, when a new VP asks which of the seven sales reports is the real one, or when you point an AI agent at your data and discover it has nothing solid to stand on.

![A four-legged table holding a dashboard, with one leg noticeably shorter than the other three so the tabletop tilts toward that corner](/images/2026/08/four-pillars-table.png)

That last failure mode is the new one, and it has made me stubborn about something. I will not roll out an agentic solution on a client's Fabric estate if that client has no governance program. The tooling works fine. That's the problem. It works at speed, on top of definitions nobody ever agreed to, and I'm the one holding the bag when the numbers come out wrong.

So here's where I've landed. Agents won't lead your data governance program, but every one of the four pillars can now hire one. The agent reports to the pillar. It never becomes one.

![Four standing pillars supporting a governance program, each pillar labelled by its role and each with a small agent figure working at its base](/images/2026/08/four-pillars-banner.png)

Governance is not security. Access control matters, but "who can see what" is one slice of one pillar, and I argued that out at length in [should an AI agent sit on your data governance committee](/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/). It's also not a project. There's no glorious Friday where you declare it complete and move on with your life. New systems arrive, new data flows in, definitions drift. I think in pillars because projects end and pillars stand.

This post takes the first two pillars and the agent that reports to each. Part 2 takes the other two, where most of the damage actually is.

## Pillar 1: Enablement and Empowerment

This pillar asks one question. Can teams find, consume, and use data without begging for it?

**What lives in this pillar:**

- **Discoverability.** Somebody outside the data team can find the trusted number without knowing which person to ask.
- **Documentation a consumer can actually read.** Plain English about what a measure calculates and who a report is for. Not TMDL, not a lineage graph.
- **Tiered access that matches skill.** Consumers get the app and the semantic model. Advanced users get the SQL endpoint and the silver layer. Experts sit closer to the source. Each tier is a different kind of enablement, and mixing them up is why "self-service" means seven different things inside one company.
- **Onboarding and training.** Educating and grooming talent is enablement work, not a nice-to-have you run when there's a slow week.
- **The platform being turned on at all.** I still meet organizations where the central team won't enable Fabric. That's an enablement decision wearing an IT costume.

**What does NOT live here:** deciding what the trusted number IS. That's culture and literacy. Deciding whose name is on it is accountability. Enablement delivers the answer; it doesn't get to author it.

The failure mode I see constantly is someone in sales who needs a number, searches for "sales," and gets back a pile of reports with sporadic views and zero signal about which one to trust. The knowledge that would fix this already exists. It's buried inside semantic models and pipeline code, where a consumer will never see it. Nobody is hiding it. It just isn't written anywhere a human would look.

It gets worse one level down, inside the model. Open a lineage view on a mature semantic model and go looking at measure similarity. I have done this and watched it get scary fast: one measure with seven others sitting at roughly ninety percent similarity. Seventeen different measures with "member count" in the name. Every one of them was correct for the person who built it, on the Tuesday they built it.

Now ask Copilot how many members you have. Which one of the seventeen is it supposed to pick? It's the same question a new analyst faces, except the analyst knows to go ask somebody and the agent just answers. If a human can't tell those seventeen apart, an agent won't either. Ambiguity you've been quietly absorbing for years comes back as a wrong answer delivered with total confidence.

**The agent hire: the catalog scribe.** Connect an agent to your tenant through an MCP and give it the job no human has ever kept up with. Read the semantic models, the measures, the lakehouse tables, and write plain-English documentation into the tool your people already read. SharePoint, Confluence, Notion, whatever your shared brain is. I have tried to keep definitions current by hand more than once, and I once built an entire document control app in Power Apps just to track them. Keeping up with it was close to impossible. Can an agent rerun that loop every night without complaining? Well, of course it can. That's the whole trick.

I mean nightly, and here's why. Anthropic [published their numbers](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude) from running analytics agents against their own warehouse. When the docs describing their data model stopped keeping pace with the model, their offline accuracy drifted from about 95 percent at launch to about 65 percent over one month. A month. Thirty points, and the only thing that changed was the description going stale.

Their fix is the part worth stealing. They put the markdown describing a model in the same repo as the model, so the pull request that changes the transformation is the pull request that updates the doc, with a review hook that flags any model change arriving without one. Wire the description to the thing it describes and it stays current. Leave them in separate systems and your catalog turns into a very confident liar.

## Pillar 2: Promotion of Data Initiatives

Everyone has data ideas. Leadership wants AI reading every PDF in the building. Finance wants the forecast integrated. Somebody read an article on the plane. Ideas were never the problem.

This pillar is about making initiatives LAND. Deciding what matters most, in what order, and making sure it still gets done six months later.

**What lives in this pillar:**

- **Prioritization with teeth.** A ranked list somebody with budget has signed, not a backlog.
- **Systems integration.** Getting two platforms talking is a data initiative even though it produces no dashboard.
- **Building up the team.** "We need another data engineer" belongs on the roadmap whether or not anyone writes it there.
- **Deprecation.** Turning things off is an initiative. If you support seventeen hundred reports and nobody has asked which ones are still opened, half your capacity problem is a promotion problem.
- **Reporting progress upward, on a schedule.** Executives mostly want to know one thing: are we meeting our business needs with data. Answer it weekly, in a paragraph, unprompted.

**What does NOT live here:** the technical work itself. This pillar decides what gets done and confirms it got done. It doesn't build.

Say leadership wants that PDF-reading AI. Fine. How do you make sure it lands as a priority against everything already in flight? Is it more important than what the team is doing today? And if your semantic models are already a mess, who is in charge of that? If nobody in the room can answer, you have a promotion problem wearing an AI costume.

The failure I see most often here is a yes. An executive hears the pitch, likes it, and says some version of "that sounds like a great idea, run with it." No budget, no headcount, no change to anyone's day job. The initiative got approved and the sponsor kept zero skin in the game, so when it stalls it stalls on you. A yes with no resources attached is permission to fail quietly.

The tell is how leadership describes your team. If they think you're very good at bar charts and get vague after that, the governance work you've been doing is invisible to the people who fund it, and nobody ever built them a way to see it.

**The agent hire: the committee secretary.** Governance lives and dies in meetings. The committee argues, decides, and assigns, and then half of it evaporates before the next session. An agent takes the transcript and turns it into the record: decisions captured, owners named, action items carried forward. Then it pulls usage data so next month the committee can see whether the initiative moved anything real. The committee decides. The agent remembers, and it keeps receipts.

## The Four Hold Each Other Up

I list the pillars in no particular order, and I do that on purpose. They are not a sequence you work through and tick off. A table's legs aren't ranked either. They just all have to be there when somebody sets something heavy down.

Watch one rule travel through all four. The committee decides the sales region list is worth fixing, which is promotion. Dana's name goes next to the region column and next to the definition of a closed sale, which is accountability. The definition gets published where a sales manager can actually find it, which is enablement. And whether sales quotes that number on Monday morning instead of the spreadsheet in their downloads folder, that's culture. One rule, four pillars. It fails at whichever one you skipped.

![One governance rule tracing across four connected pillars, from committee decision to named owner to published definition to everyday use](/images/2026/08/four-pillars-loadpath.png)

Sales is complaining loudly about the numbers, so where are those problems actually coming from? Complaints land on enablement, because enablement is the pillar the business can see. The cause is usually two legs over. Nobody owns the definition, or nobody ever prioritized fixing it. Go rebuild the reports anyway and you've put a beautiful deck on a house with no foundation. It'll hold for about a quarter.

Fabric tightened one of these joints. Culture and literacy now gate accountability, because tracing an owner through lakehouses, notebooks, and pipelines takes someone who can read both the business rule and the architecture. Without those people in the room, ownership stops at the workspace boundary and you never get a real handle on it.

For AI to be worth anything in your organization, the meaning of a term has to be the same in one department as it is in the next, and that starts with governance rather than with tooling. Agents amplify whatever you already have. Four solid legs and an agent makes you faster. Three and a half legs and an agent finds the wobble at machine speed.

## Staff, Never Chair

When I stand up a governance program, roughly 70 percent of the work is people work: workshops, interviews, committee building, prioritization fights. None of it happens on a computer, and none of it can be delegated to a model (no agents required, just a conference room and strong opinions).

So my org chart rule is short. Every agent in your governance program is staff, never chair. A scribe, a secretary, a watchdog, a mirror. The moment a vendor tells you their agents will lead governance for you, hold onto your wallet.

![Four small agent nodes reporting upward to four standing pillars, with each agent positioned at the base of a pillar rather than in place of one](/images/2026/08/four-pillars-staff.png)

## Takeaways

- Governance is four pillars, and every organization is weak in at least one. The wobble shows up when somebody leans on the wrong corner, which is now an agent.
- The four pillars hold each other up. One rule travels through all four, and it fails at whichever one you skipped.
- The complaint lands on enablement because enablement is the pillar the business can see. The cause is usually accountability or promotion, two legs over.
- Enablement's agent hire is the catalog scribe: read the semantic models nightly and write plain English into whatever your people already open.
- Documentation goes stale faster than you think. Anthropic lost about 30 points of agent accuracy in one month to drifting docs. Keep the description in the same repo as the thing it describes.
- Promotion's agent hire is the committee secretary. The committee decides. The agent keeps the record and pulls the usage data that shows whether anything moved.
- A yes with no budget or headcount attached is permission to fail quietly. Approval and sponsorship are different things.
- Roughly 70 percent of a governance program happens in a room with no computer in it, which is why every agent stays staff and never chair.

Those are the first two. Accountability and culture are the two where I see the most damage, and they're where the data contract comes in. Part 2 takes both of those, then lays out the 30-day plan for scoring all four and making your first agent hire.
