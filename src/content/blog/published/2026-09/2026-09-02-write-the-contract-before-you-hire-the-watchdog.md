---
title: "Governance Pillars 3 and 4: Write the Contract Before You Hire the Watchdog"
date: 2026-09-02T09:00:00Z
permalink: "2026/09/02/write-the-contract-before-you-hire-the-watchdog"
description: "Accountability and culture are where governance gets hard. The data contract that gives an agent something real to enforce, plus a 30-day plan."
featured: /images/2026/09/contract-watchdog-banner.png
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

[Part 1](/2026/08/31/four-pillars-of-data-governance-agents/) laid out the four pillars I preach when I stand up governance with clients: enablement and empowerment, promotion of data initiatives, accountability and responsibility, and culture and literacy. It covered the first two, the agent that reports to each, and why an agent is always staff and never chair.

The two left are the ones nobody wants, because neither produces a dashboard. They're also where almost every wrong number I have ever chased actually came from.

![Two people signing a data contract on the left, feeding an agent node that inspects a table of rows on the right, with one flagged row routed back to a single named person](/images/2026/09/contract-watchdog-banner.png)

## Pillar 3: Accountability and Responsibility

Ownership through the entire pipeline: the person inputting the data, the person transforming it, the definitions everyone reports on. It runs both ways. Most programs stop at the transformation side, so you can name the engineer who built the pipeline but not the human who typed the wrong region code into the CRM at 4:50 on a Friday.

**What lives in this pillar:**

- **A named owner on the input.** The person or team responsible for the data being correct where it's typed, not where it's loaded.
- **A named owner on the transformation.** Usually the easy one. Usually the only one that exists.
- **A named approver on every definition.** Not who writes it. Who signs off.
- **The service level.** When the data lands, what happens when it doesn't, and who gets told. Put it in the model description where a consumer will actually see it.
- **Access control.** Yes, security lives here. It's one bullet in one pillar, which is roughly its correct size.
- **A route for fixes.** When the number is wrong, the path to whoever can fix it, and a way to tell whether the break happened at the source or on the way in.

**What does NOT live here:** agreeing on what the definition should say. Accountability puts a name next to a decision. It doesn't make the decision.

Accountability is the reason trust exists when the number is RIGHT. People believe data they can trace to a name. And of everything on that list, the approver is the one almost nobody has actually assigned. That single gap is why most organizations have four of everything.

Here's how that shows up in the field. A client told me a column was either "prospect" or "sale." Two values. We ran discovery and found twenty-five. Nobody could tell me whether the other twenty-three were garbage or meaningful, because nobody owned the column. They just knew what their number was, because they'd always gotten it a certain way.

The missing input owner is what turns that into a standoff. The business says the column is wrong and tells the data team to fix it. The data team says the column is exactly what came out of the CRM, so go fix the CRM. Both are right, which is why it goes nowhere, and the data engineer usually ends up writing patch logic for somebody else's data entry problem because they're the one in the room who can. Every hour of that logic is an accountability gap billed at engineering rates.

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
- Acknowledged within 30 minutes of a failed load, resolved within 4 hours

## On violation
- Mode: FLAG. Do not filter the rows out. Do not fail the load.
- Notify the producer owner the same morning, records attached.
- More than 20 flagged rows in one load goes to the committee.
```

Two lines in there do more work than the rest combined. The timing block is a service level, and it earns its place because a number that's right at 11 AM is wrong for the person who needed it at 8. Let the data team draft that one from what the backend actually does rather than what the business wishes: source lands at 5, load takes two hours, so 7 is the floor and 8 is the promise. Then negotiate.

The second is **Mode**. When a rule breaks you have exactly three options, and the contract has to name one in advance. Flag the row and let it through, filter it out, or fail the whole load.

![One stream of incoming rows reaching a decision node that splits three ways: a table with one row flagged but intact, a table with one row removed, and a table stopped entirely](/images/2026/09/contract-watchdog-modes.png)

Filtering silently is how a number goes quietly wrong for a quarter. Failing the load over a cosmetic violation is how the data team becomes the reason sales has no report. Pick per rule, write it down, and nobody has to make that judgment call at 6:15 in the morning.

Now hand that file to an agent and let it check the lakehouse against it every single day. The morning region number eight sneaks in, it doesn't write a log entry nobody reads. It messages Dana by name with the offending records attached: here's what arrived, here's the clause it violates, go fix it. Accountability with a first name on it, running while you sleep.

One warning. No contract, no watchdog. An agent enforcing a standard nobody agreed to is noise with a schedule. I use the same rule with my kids that I use with stakeholders: we have the conversation in the car on the way over, before anyone's in trouble, about what respectful looks like at somebody else's dinner table. Skip that conversation and the correction afterward isn't accountability, it's just you being the bad guy, and the honest response is "that's not fair, I didn't know what the expectation was." If you have never told a producer what good looks like, you have not earned the right to flag their data.

The fair objection to all of this is that you can't define everything, so you'll never start. Right, so don't. Start with almost embarrassingly few rules. The seven regions and nothing else. Then work, and every time you hit a wall you didn't see coming, that's a new clause: get both teams to agree and amend the file. A contract grows by discovery. The other extreme fails too, though, because "we'll ask questions as we go" with nothing written down stalls the project every third day waiting on a decision nobody wants to own.

## Pillar 4: Culture and Literacy

The softest pillar carries the most weight. Is everyone speaking the same language when they look at the numbers?

**What lives in this pillar:**

- **One vocabulary the whole company adheres to.** Not a glossary nobody opens. The actual words people use in meetings.
- **A forum where definitions get argued and settled.** Leadership plus department representatives, in a room, on a schedule.
- **Enough platform literacy to have the argument.** In a Fabric estate, "where does this number come from" is an architecture question, and somebody in the room has to be able to answer it.
- **Permission to question a number.** A culture where "I don't think that's right" is normal engineering feedback rather than an accusation.
- **Comfort with the tools people actually reach for.** Excel is not the enemy here. Business logic buried in cell references inside a workbook nobody else can read is the enemy, and that's a literacy problem, not a tooling one.

**What does NOT live here:** enforcement. This pillar produces agreement. Turning agreement into a checked rule is accountability's job.

Governance is not the BI team's hobby. It comes from leadership and from department representatives sitting in a room, arguing about pain points and priorities. Fabric raised the stakes on the literacy half, because business logic no longer lives only in Power Query. It's in lakehouses, notebooks, and pipelines, scattered across workspaces.

So be specific about who you put in that room. I want the VP of sales who understands the business cold AND can follow a conversation about where the data physically sits in Fabric. Limited technical knowledge is not enough, and neither is a junior engineer with no authority. Those bilingual people hold the most valuable seats on the committee, and there are never enough of them.

My first real lesson in this pillar was about a word as boring as "lead." Marketing counted a lead one way, sales counted it another, and neither of them was being difficult. They had different jobs. What we shipped was three dashboards with three different lead numbers, all technically correct, and a decade later I still meet the same argument at new clients wearing new column names.

Take "customer." Is a customer anyone who ever purchased? Anyone who purchased in the last six months? In the last year? The committee has to land on ONE, and every team adheres to it. But the department that lost the vote didn't lose a business need, they lost a word. Their thing still exists and they still have to count it, so give it a different name. If your definition of customer isn't the company's definition of customer, you get "active customer" or "trailing-twelve customer" or whatever fits, and that term gets its own definition and its own owner.

Renaming the loser is what makes definitional agreement survivable. Skip it and that department nods in the meeting, walks out, and keeps calculating their version under the shared name, which is worse than the disagreement you started with because now it's invisible.

**The agent hire: the definition mirror.** Send an agent across your estate to lay the ambiguous definitions side by side. Three revenue measures. Four versions of "customer." Two gross margins that disagree by a rounding error and a philosophy. Can the agent settle what a customer IS? It cannot, and it shouldn't. That's cultural work and it belongs to people. What the agent ends is the pretending. Once the definitions sit next to each other in plain sight, "we all agree" stops being an assumption and becomes a decision someone has to make.

![Four nearly identical measure definition cards lined up side by side, small differences in each visible only because they are aligned, with one marked as the chosen definition](/images/2026/09/contract-watchdog-mirror.png)

The mirror has a second shift, too. After the committee settles a word, point the agent back at the estate and have it find every measure and column still computing the old version under the new name. That list is your rename backlog, and it's the difference between a definition that got decided and one that got adopted.

## Standing It Up

Here's the order I actually work in, and none of it starts with an agent.

**Goals first, then names.** The two things that matter at the beginning of implementation planning are your goals and your roles and responsibilities. Everything else is downstream. If your organization has no stated data goals, go get them the boring way: walk the department heads, ask what their team's biggest pain points are with getting data, and write the answers down. That list is what you bring to whoever holds the budget. Hearing it from six departments is far more powerful than you walking in with your own perceptions, and it turns "the BI guy wants a project" into "your organization has a problem."

**Then walk the pillars.** You don't need a six-week maturity assessment to find your weak corner. Score each pillar from 1 to 5 next week. Be honest.

- **Enablement and empowerment.** Ask five people outside the data team where they'd find the trusted sales number. Count how many different answers you get. Then open your biggest semantic model and count how many measures have the same noun in the name.
- **Promotion of initiatives.** Ask leadership to name the top three data initiatives in flight and who owns each one. If the answers don't match each other, that IS the score. Then check what got attached to the last approved initiative besides the word yes.
- **Accountability and responsibility.** Pick one table in your lakehouse and trace it back to a named owner for the input and a named owner for the transformation. One table. See how far you get.
- **Culture and literacy.** Count your definitions of "customer." If you're confident there's only one, count again.

![Four pillars each topped with a score gauge, with the pillar holding the lowest reading circled](/images/2026/08/four-pillars-walk.png)

**Then write one contract.** Circle your lowest score and pick the single loudest pain point underneath it. The one where somebody is actively bleeding, not your hardest problem. If Fabric and governance are both new here, do not open with the twenty-year Excel process that eleven departments depend on. You'll spend a quarter doing dependency archaeology and have nothing to show for it. Pick the thing you can fix and be seen fixing, then spend the credibility you earned on the hard one. Get the producer and the consumer in a room and write the agreement down, in the format above, in one sitting.

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
- Accountability runs both ways. Name an owner on the input, not just on the transformation, or the business and the data team will point at each other for a quarter.
- The approver on a definition is the role almost nobody assigns, and that single gap is why most organizations have four of everything.
- Write the data contract before you set the watchdog. Humans agree the seven regions; the agent checks them and names the owner when an eighth arrives.
- Start the contract with almost no rules and amend it every time you hit a wall. It grows by discovery. Trying to author it completely up front is how it never gets written.
- Every rule needs a violation mode picked in advance: flag, filter, or fail the load. Decide it in the meeting, not at 6:15 in the morning.
- When the committee settles a definition, the department that lost the vote gets a different word, not a lecture. Otherwise they keep calculating their version under the shared name and you've made the problem invisible.
- The definition mirror cannot decide what a customer is. It ends the pretending that you already decided.
- Start with goals and roles. Harvest pain points from the department heads first; their frustration carries more weight with leadership than your opinion does.

"Agent-assisted" will become the default word in front of governance the same way "self-service" became the default word in front of BI. The organizations that win this will be the ones whose pillars were solid enough to put weight on. If this got you thinking, stick around PromptingBI. And if you'd rather hear ideas like this argued out loud, come join us over on the Explicit Measures podcast.
