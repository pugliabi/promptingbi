---
title: "The Four Pillars of Data Governance (and the Agent That Reports to Each)"
date: 2026-08-21T09:00:00Z
permalink: "2026/08/21/four-pillars-of-data-governance-agents"
description: "The four pillars of data governance, how they carry each other's weight, and the one agent job to hire under each once the people work is done."
featured: /images/2026/08/four-pillars-banner.png
tags:
  - governance
  - ai-agents
  - data-culture
  - semantic-models
  - microsoft-fabric
  - mcp
draft: true
source:
  episode: 545
  title: "Agents Helping with Data Governance"
  notion: "https://app.notion.com/p/397e74c69c188056a08dc50d9279dbd4"
---

A table with four solid legs will hold whatever you stack on it. A table with three and a half legs looks fine in the showroom, and it keeps looking fine right up until somebody leans on the wrong corner. I spend my whole life in tables, and I hate a wobbly one.

Data governance works the same way. When I stand up governance with clients, I preach four pillars from the rooftops: **enablement and empowerment**, **promotion of data initiatives**, **accountability and responsibility**, and **culture and literacy**. Call them pillars when you're presenting to leadership and table legs when you're being honest with yourself. Every organization is weak in at least one. The wobble never shows up on a quiet Tuesday. It shows up when the auditor calls, when a new VP asks which of the seven sales reports is the real one, or when you point an AI agent at your data and discover it has nothing solid to stand on.

![A four-legged table holding a dashboard, with one leg noticeably shorter than the other three so the tabletop tilts toward that corner](/images/2026/08/four-pillars-table.png)

That last failure mode is the new one. Agents will not lead your data governance program, but every one of the four pillars can now hire one. The agent reports to the pillar. It never becomes one.

![Four standing pillars supporting a governance program, each pillar labelled by its role and each with a small agent figure working at its base](/images/2026/08/four-pillars-banner.png)

Governance is not security. Access control matters, but "who can see what" is one slice of one pillar, and I argued that out at length in [should an AI agent sit on your data governance committee](/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/). It is also not a project. There is no glorious Friday where you declare it complete and move on with your life. New systems arrive, new data flows in, definitions drift. I think in pillars because projects end and pillars stand.

## Pillar 1: Enablement and Empowerment

This pillar asks one question. Can teams find, consume, and use data without begging for it?

The failure mode I see constantly is someone in sales who needs a number, searches for "sales," and gets back a pile of reports with sporadic views and zero signal about which one to trust. The knowledge that would fix this already exists. It's buried inside semantic models and pipeline code, where a consumer will never see it. Nobody is hiding it. It just isn't written anywhere a human would look.

**The agent hire: the catalog scribe.** Connect an agent to your tenant through an MCP and give it the job no human has ever kept up with. Read the semantic models, the measures, the lakehouse tables, and write plain-English documentation into the tool your people already read. SharePoint, Confluence, Notion, whatever your shared brain is. I have tried to keep definitions current by hand more than once, and I once built an entire document control app in Power Apps just to track them. Keeping up with it was close to impossible. Can an agent rerun that loop every night without complaining? Well, of course it can. That's the whole trick.

## Pillar 2: Promotion of Data Initiatives

Everyone has data ideas. Leadership wants AI reading every PDF in the building. Finance wants the forecast integrated. Somebody read an article on the plane. Ideas were never the problem.

This pillar is about making initiatives LAND. Deciding what matters most, in what order, and making sure it still gets done six months later. It covers more than dashboards, too. Integrating systems belongs here. So does building up the team, because "we need another data engineer" is a data initiative whether or not anyone writes it on the roadmap.

Say leadership wants that PDF-reading AI. Fine. How do you make sure it lands as a priority against everything already in flight? Is it more important than what the team is doing today? And if your semantic models are already a mess, who is in charge of that? If nobody in the room can answer, you have a promotion problem wearing an AI costume.

**The agent hire: the committee secretary.** Governance lives and dies in meetings. The committee argues, decides, and assigns, and then half of it evaporates before the next session. An agent takes the transcript and turns it into the record: decisions captured, owners named, action items carried forward. Then it pulls usage data so next month the committee can see whether the initiative moved anything real. The committee decides. The agent remembers, and it keeps receipts.

## Pillar 3: Accountability and Responsibility

Ownership through the entire pipeline: the person inputting the data, the person transforming it, the definitions everyone reports on. It runs both ways. Most programs stop at the transformation side, so you can name the engineer who built the pipeline but not the human who typed the wrong region code into the CRM at 4:50 on a Friday.

Accountability is the reason trust exists when the number is RIGHT. People believe data they can trace to a name. The easy win sitting in this pillar is a role almost nobody has assigned: who approves a definition. Not who writes it. Who signs off. That gap is why most organizations have four of everything.

Here's how that shows up in the field. A client told me a column was either "prospect" or "sale." Two values. We ran discovery and found twenty-five. Nobody could tell me whether the other twenty-three were garbage or meaningful, because nobody owned the column. They just knew what their number was, because they'd always gotten it a certain way.

**The agent hire: the contract watchdog.** Say the committee agrees you have seven sales regions. Not eight, not "Unknown," not a blank. Write that down. What you just created is a **data contract** between the people producing the data and the people consuming it, and there is ZERO AI inside the contract itself. Humans agreed. Humans signed. It should be signed, confirmed, and read by everyone involved before a single table gets built.

A contract is boring on purpose. Mine live as markdown next to the code, and they look like this:

```markdown
# Data Contract: Sales Regions

Producer: CRM Operations (owner: Dana R.)
Consumer: Sales Analytics, Finance Reporting
Agreed: 2026-07-22 by the Data Governance Committee
Review: quarterly, or on any source system change

## Allowed values
- `Region` has exactly 7 values: Northeast, Southeast, Midwest,
  Southwest, West, Canada, International
- No blanks. No "Unknown". No "N/A".
- `Stage` has exactly 2 values: Prospect, Sale

## Definitions
- A "Sale" is a closed-won opportunity with a signed order date.
  Pipeline and verbal commitments are Prospect.

## Timing
- Landed in the lakehouse by 6:00 AM Central, every weekday
- If the load fails, Dana posts to #sales-analytics before 7:00 AM

## On violation
- Flag the offending rows. Do not silently filter them out.
- Notify the producer owner the same morning, records attached.
- More than 20 flagged rows in one load goes to the committee.
```

Now hand that file to an agent and let it check the lakehouse against it every single day. The morning region number eight sneaks in, it doesn't write a log entry nobody reads. It messages Dana by name with the offending records attached: here's what arrived, here's the clause it violates, go fix it. Accountability with a first name on it, running while you sleep.

One warning. No contract, no watchdog. An agent enforcing a standard nobody agreed to is noise with a schedule.

## Pillar 4: Culture and Literacy

The softest pillar carries the most weight. Is everyone speaking the same language when they look at the numbers?

Governance is not the BI team's hobby. It comes from leadership and from department representatives sitting in a room, arguing about pain points and priorities. Fabric raised the stakes on the literacy half, because business logic no longer lives only in Power Query. It's in lakehouses, notebooks, and pipelines, scattered across workspaces.

So be specific about who you put in that room. I want the VP of sales who understands the business cold AND can follow a conversation about where the data physically sits in Fabric. Limited technical knowledge is not enough, and neither is a junior engineer with no authority. Those bilingual people hold the most valuable seats on the committee, and there are never enough of them.

**The agent hire: the definition mirror.** Send an agent across your estate to lay the ambiguous definitions side by side. Three revenue measures. Four versions of "customer." Two gross margins that disagree by a rounding error and a philosophy. Can the agent settle what a customer IS? It cannot, and it shouldn't. That's cultural work and it belongs to people. What the agent ends is the pretending. Once the definitions sit next to each other in plain sight, "we all agree" stops being an assumption and becomes a decision someone has to make.

## The Four Hold Each Other Up

I list the pillars in no particular order, and I do that on purpose. They are not a sequence you work through and tick off. A table's legs aren't ranked either. They just all have to be there when somebody sets something heavy down.

Watch one rule travel through all four. The committee decides the sales region list is worth fixing, which is promotion. Dana's name goes next to the region column and next to the definition of a closed sale, which is accountability. The definition gets published where a sales manager can actually find it, which is enablement. And whether sales quotes that number on Monday morning instead of the spreadsheet in their downloads folder, that's culture. One rule, four pillars. It fails at whichever one you skipped.

![One governance rule tracing across four connected pillars, from committee decision to named owner to published definition to everyday use](/images/2026/08/four-pillars-loadpath.png)

Sales is complaining loudly about the numbers, so where are those problems actually coming from? Complaints land on enablement, because enablement is the pillar the business can see. The cause is usually two legs over. Nobody owns the definition, or nobody ever prioritized fixing it. Go rebuild the reports anyway and you've put a beautiful deck on a house with no foundation. It'll hold for about a quarter.

Fabric tightened one of these joints. Culture and literacy now gate accountability, because tracing an owner through lakehouses, notebooks, and pipelines takes someone who can read both the business rule and the architecture. Without those people in the room, ownership stops at the workspace boundary and you never get a real handle on it.

Governance also serves two audiences at once. The architecture team needs lineage, standards, and structure. The consumer needs a plain answer about which number to trust. Most programs build for the first audience, call it done, and wonder why adoption never moved.

For AI to be worth anything in your organization, the meaning of a term has to be the same in one department as it is in the next, and that starts with governance rather than with tooling. Agents amplify whatever you already have. Four solid legs and an agent makes you faster. Three and a half legs and an agent finds the wobble at machine speed.

## Staff, Never Chair

When I stand up a governance program, roughly 70 percent of the work is people work: workshops, interviews, committee building, prioritization fights. None of it happens on a computer, and none of it can be delegated to a model (no agents required, just a conference room and strong opinions).

So my org chart rule is short. Every agent in your governance program is staff, never chair. A scribe, a secretary, a watchdog, a mirror. The moment a vendor tells you their agents will lead governance for you, hold onto your wallet.

![Four small agent nodes reporting upward to four standing pillars, with each agent positioned at the base of a pillar rather than in place of one](/images/2026/08/four-pillars-staff.png)

## Standing It Up

Here's the order I actually work in, and none of it starts with an agent.

**Goals first, then names.** The two things that matter at the beginning of implementation planning are your goals and your roles and responsibilities. Everything else is downstream. If your organization has no stated data goals, go get them the boring way: walk the department heads, ask what their team's biggest pain points are with getting data, and write the answers down. That list is what you bring to whoever holds the budget. Hearing it from six departments is far more powerful than you walking in with your own perceptions, and it turns "the BI guy wants a project" into "your organization has a problem."

**Then walk the pillars.** You don't need a six-week maturity assessment to find your weak corner. Score each pillar from 1 to 5 next week. Be honest.

- **Enablement and empowerment.** Ask five people outside the data team where they'd find the trusted sales number. Count how many different answers you get.
- **Promotion of initiatives.** Ask leadership to name the top three data initiatives in flight and who owns each one. If the answers don't match each other, that IS the score.
- **Accountability and responsibility.** Pick one table in your lakehouse and trace it back to a named owner for the input and a named owner for the transformation. One table. See how far you get.
- **Culture and literacy.** Count your definitions of "customer." If you're confident there's only one, count again.

![Four pillars each topped with a score gauge, with the pillar holding the lowest reading circled](/images/2026/08/four-pillars-walk.png)

**Then write one contract.** Circle your lowest score and pick the single loudest pain point underneath it. The one where somebody is actively bleeding, not your hardest problem. Get the producer and the consumer in a room and write the agreement down, in the format above, in one sitting. If you try to define everything before you start, you will never start. If you define nothing and promise to ask questions as you go, you're asking for failure and frustration, because you'll stall the project every third day waiting on a decision nobody wants to own.

**Then hire the agent.** Last, on purpose. The contract is the spec, so the agent has something real to enforce. Give it a scope that fits on one page:

```markdown
# Role: Data Contract Watchdog

You check the lakehouse against signed data contracts every morning.
You do not write contracts, change them, or decide what a definition
should be. That is the committee's job.

## Read first, every run
| Source | What you take from it |
| --- | --- |
| `/governance/contracts/*.md` | The rules. These are the ONLY rules. |
| `/governance/owners.md` | Who to notify, by name |
| Yesterday's report | What was already flagged, so you don't renotify |

## Autonomy
Run the checks and send the notifications without asking me first.
Never modify source data. Never edit a contract.

## Report back
For each violation: the contract clause, the row count, up to 10 sample
records, and the owner you notified.
If a contract clause is ambiguous, do NOT interpret it. Flag it for the
committee and move on.

## Escalation
More than 20 violations on one contract, or the same violation three
runs in a row, goes to the committee instead of the owner.
```

An agent that acts on your tenant without telling you what it assumed is a liability, which I got into in [don't let your agent touch Fabric until it reports back](/2026/08/17/dont-let-your-agent-touch-fabric/).

Give the whole thing 30 days. What that buys you is a baseline, not a fixed organization. You're finding out where you actually start from, which is the one thing no maturity model can tell you. Then bring leadership the before and after instead of a strategy deck.

If the program is already halfway off the rails, goals and roles still apply from wherever you're standing. You don't have to go back to the beginning.

## Takeaways

- Score all four pillars from 1 to 5 this week, circle the lowest, and make one agent hire for that pillar. One pillar, one agent, one month.
- The four pillars hold each other up. One rule travels through all four, and it fails at whichever one you skipped.
- The complaint lands on enablement because enablement is the pillar the business can see. The cause is usually accountability or promotion.
- Start with goals and roles. Harvest pain points from the department heads first; their frustration carries more weight with leadership than your opinion does.
- Write the data contract before you set the watchdog. Humans agree the seven regions; the agent checks them and names the owner when an eighth arrives.
- The definition mirror cannot decide what a customer is. It ends the pretending that you already decided.
- Roughly 70 percent of a governance program happens in a room with no computer in it, which is why every agent stays staff and never chair.

"Agent-assisted" will become the default word in front of governance the same way "self-service" became the default word in front of BI. The organizations that win this will be the ones whose pillars were solid enough to put weight on. If this got you thinking, stick around PromptingBI. And if you'd rather hear ideas like this argued out loud, come join us over on the Explicit Measures podcast.
