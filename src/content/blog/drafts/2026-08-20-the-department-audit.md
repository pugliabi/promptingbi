---
title: "The Department Audit: My Agents Review the Project So I Don't Have To"
date: 2026-08-20T09:00:00Z
permalink: "2026/08/20/the-department-audit"
description: "Meet the two Notion agents that keep my projects honest: their actual instructions, the blockers they surface, and the checkbox loop that keeps me accountable."
featured: /images/2026/08/the-department-audit-banner.png
draft: true
tags:
  - ai-agents
  - context-engineering
  - business-intelligence
  - microsoft-fabric
  - power-bi
  - reporting
---

Every consulting project I've ever seen has the same quiet lie in it: the records say one thing and reality says another. The milestone reads "In progress" two weeks after the work shipped. The deliverable says "Not started" when it was finished on a Tuesday call nobody logged. Left alone, that gap grows until the status update becomes an archaeology project you do the night before the client call.

I used to close that gap by hand. Now two agents close it for me, and my whole job is checking boxes. This is part three of the project hub series ([part one](/2026/08/14/anatomy-of-a-project-hub/) built the hub, [part two](/2026/08/17/inside-an-mcp-execution-session/) ran the MCP execution session), and it's the part that makes the other two trustworthy. Because a second brain with stale records isn't a second brain. It's a liability with good formatting.

![Two agent figures at a project board on the left passing a checklist through a human approval checkpoint into an updated status document on the right](/images/2026/08/the-department-audit-banner.png)

## A Department, Not an Assistant

Quick recap for anyone joining here: I don't run one general-purpose agent in Notion. I run two, with intentionally narrow jobs, and the best mental model I've found is a department.

**Polpette** (yes, meatball, I'm Italian, what do you want from me) is my consultant's consultant. Analysis and advisory. It knows Fabric, it knows my practice, it knows the history of every project, and its job is judgment: summarize the milestone, answer the question from the related pages only, flag what's missing, propose the plan. **Operazioni** is operations. Automation and data. It creates and links records, enforces the relation chain, applies the canonical page structures, watches active projects for changes, and it's the only one that actually flips record statuses.

The division of labor is written into both of their instruction pages, and I'd tell you to steal the sentence: one reads and extracts, the other creates and links. When Polpette identifies deliverables from a statement of work or flags a missing record, it doesn't create anything. It hands the work to Operazioni. Why split it up? Same reason you don't let the person who wrote the report be the only person who checked it. Narrow agents with defined lanes are auditable. One agent that does everything is a black box with opinions.

## What the Instructions Actually Say

These agents aren't magic. They're instruction pages, the same discipline from part two pointed inward at my own practice instead of outward at a semantic model. Here's a stripped-down slice of each.

Polpette's brief is judgment with guardrails:

```markdown
# Instructions: Consultant's Consultant (Polpette)

Pull together the relevant context for a project or milestone,
answer questions, and shape the milestone into a complete,
well-scoped artifact.

## What this agent is for
- Summarize a project and the milestones connected to it
- Answer questions using ONLY the related pages. No inventing.
- Identify missing context: name exactly what to add to make
  the milestone self-contained
- Extract deliverables from an SOW with estimated hours
  (the record creation is handed to Consulting Operations)

## After a project meeting
1. Read the summary. Load the linked project and its active
   milestones.
2. Compare "Changes & New Work" against the existing pages.
3. Write a Proposed Action Plan at the top of the meeting note.
   Do NOT modify any pages yet.
4. After approval: apply the checked items, hand record changes
   to Consulting Operations.
```

Operazioni's brief is hygiene with authority:

```markdown
# Instructions: Consulting Operations (Operazioni)

You are the automation and data operations agent. Keep the
operational databases accurate, linked, and up to date.

## Full-chain linking
Every record connects the whole way down:
Client → Project → Milestone → Deliverable → Time entry
If a record is missing an upstream link, flag it and fix it.

## Page structure
Build project and milestone pages from the canonical templates.
Same sections, same order, every page. If a real project grows
a section worth keeping, offer to backport it to the template.

## Project monitoring (background, on a schedule)
Scan active projects for changes: milestone status moves,
deliverable updates, new meeting notes, hours logged. Log a
dated entry in the project's Updates toggle. Milestone changes
get top priority. If nothing meaningful changed, write nothing.

## Rules
- Check for duplicates before creating anything
- Do not delete anything unless explicitly told
```

Notice what both pages share. A purpose the agent can't wander from. A hand-off rule so neither does the other's job. And a hard stop: no page changes before approval, no deletes unless told. If you've ever written a good job description for a junior hire, you already know how to write agent instructions.

<!-- SCREENSHOT: the two agent instruction pages side by side in Notion, showing the purpose sections and hand-off rules -->

## Blockers Update Themselves

Here's the day-to-day payoff, and it's the same example I used in part one because it's the one that sells people. On a Northside call we find out we can't get access to a column we need from the ticketing system. The meeting summary doesn't bury that in a paragraph. My meeting instructions classify every issue by severity: routine items like open questions and client commitments, warnings like scope creep and dependencies, and critical items, the blockers and data gaps where work is actually stopped. A missing column is a data gap, and blocked data equals blocked deliverables. So the item gets an owner, it names the exact deliverable it blocks, and it states the single next step that unblocks it.

Polpette reads that summary and the blocker lands on the project hub, linked back to the conversation where it surfaced. When the access comes through two weeks later on another call, the same machinery clears it. I never wrote a ticket in either direction.

And when I have a whiteboard diagram of, say, the medallion flow? I hand it over and ask for the execution instructions. Polpette drafts the Claude instructions page for the MCP session, the one part two ran, from the diagram plus the hub: scope from the milestone, verified state from the data dictionary, blockers from the meetings. The agents don't just maintain the context. They write the handoff to the next harness.

![A two-column diff with record statuses on the left and meeting evidence on the right, merging through a lens into a triage checklist with a human approval gate](/images/2026/08/the-department-audit-triage.png)

## The Loop Has a Checkbox in It

Now the part that keeps this from being automation theater. Could the agents just apply everything themselves? Technically, sure. I don't let them, and the leash is a status property.

Every project-linked meeting note carries a status that walks a defined path: Not Started, Agent Pending, Awaiting User Review, User Approved, Completed. The summary gets written and the status flips to Agent Pending, which is Polpette's cue. It analyzes, compares the changes and new work against the existing pages, and writes a **Proposed Action Plan** at the top of the meeting note. Nothing is modified yet. Status: Awaiting User Review.

That's my checkpoint. The review takes maybe five minutes, and I'm not writing anything. I'm confirming or denying specific, pre-researched claims: yes the backfill ran, no the monitoring isn't set up, that access item is still blocked on the client. Check the boxes, flip to User Approved, and phase two fires: Polpette applies the approved content updates and hands the record changes to Operazioni, which flips every status I confirmed, one by one, in the actual databases. If I have questions instead of approvals, there's a status for that too, and the plan waits.

If you've built data pipelines, look at what this is: a status column driving a state machine, with a human approval gate in the middle. We've been designing this exact pattern into ETL for decades. Now the rows are project decisions.

<!-- SCREENSHOT: a Northside meeting note showing the Proposed Action Plan toggle and the status property set to Awaiting User Review -->

The accountability math matters to me. Every box I check is a decision I signed. If a status is wrong after this, that's on me, and I'm fine with that, because five focused minutes of verification beats an hour of reconstructing status from memory every single time.

## Approval Fires the Department

After approval, the compounding starts. Operazioni's background monitoring logs a dated entry in the project's updates toggle. The hub's briefing refreshes to the new truth. The client-facing status update drafts itself from the confirmed state: delivered items, current work with expected dates, next week's plan, open dependencies, with a copy-paste email underneath. Every claim in it just survived a human review.

<!-- SCREENSHOT: the finished Northside client-facing status update with the email draft section -->

And here's the part that closes the series: the next **Claude instructions page** the agents generate for an execution session is written from these corrected records. The audit doesn't just clean up the past. It makes the next session smarter. That's the loop from part two closing.

![A circular loop of five nodes: agents audit records, human checks boxes, operations agent flips statuses, status update goes to the client, refreshed hub feeds the next instructions page](/images/2026/08/the-department-audit-loop.png)

## Steal the Workflow, Not the Tools

None of this is Notion magic. It's four requirements you can meet in whatever your team already runs:

1. **Two agents with written lanes.** One analyzes and proposes, one creates and links. Put the division of labor in both instruction pages, in writing, with a hand-off rule.
2. **Records an agent can read and flip, and evidence it can cite.** Deliverables with real status fields, plus meeting notes, execution recaps, and update logs related to the project.
3. **A propose-then-approve workflow on a status field.** The agent writes the plan, nothing changes until you check the boxes. The agent proposes, you dispose.
4. **Hand-offs on approval.** Statuses flip, the hub refreshes, the client update drafts itself, and the next instructions page inherits corrected context.

Start with one project. Write the two instruction pages first, small, using the slices above as the shape. Then run one meeting through the loop and watch the proposed action plan show up without you asking.

## Takeaways

- Run two narrow agents, not one general one: analysis and advisory in one lane, automation and record operations in the other. One reads and extracts, the other creates and links.
- Agent instructions are job descriptions: a purpose, a hand-off rule, and a hard stop. Write them like you're onboarding a junior hire.
- Blockers should update themselves: meetings classify issues by severity, data gaps name the deliverable they block, and the hub reflects it without anyone writing a ticket.
- The human checkpoint is a status property: agents propose action plans, nothing changes until the boxes are checked, and approval triggers the hand-off.
- The payoff compounds: corrected records feed the hub, the client update, and the next MCP instructions page.

That's the series. A hub that organizes context, a session that executes it over MCP, and two agents that keep both honest. The prompt was never the product; the loop is. If this sparked something, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
