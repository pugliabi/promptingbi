---
title: "The Department Audit: My Agents Review the Project So I Don't Have To"
date: 2026-08-20T09:00:00Z
permalink: "2026/08/20/the-department-audit"
description: "How a team of Notion agents audits project records against reality each week, and I approve the corrections with checkboxes instead of writing status updates."
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

I used to close that gap by hand. Now a department of agents closes it for me, every week, and my whole job is checking boxes. This is part three of the project hub series ([part one](/2026/08/14/anatomy-of-a-project-hub/) built the hub, [part two](/2026/08/17/inside-an-mcp-execution-session/) ran the MCP execution session), and it's the part that makes the other two trustworthy. Because a second brain with stale records isn't a second brain. It's a liability with good formatting.

![Three agent figures around a project board on the left passing a checklist through a human approval checkpoint into an updated status document on the right](/images/2026/08/the-department-audit-banner.png)

## A Department, Not an Assistant

Quick recap for anyone joining here: I don't run one general-purpose agent in Notion. I run three, with intentional, narrow jobs, and the best mental model I've found is a department.

**Polpette** (yes, meatball, I'm Italian, what do you want from me) is my consultant's consultant. It knows Fabric, it knows my practice, it knows the history of every project, and its job is judgment: next steps, blockers, what to prep for the call. **Operazioni** is operations. It organizes pages, applies the canonical milestone structure, and it's the only one that actually flips record statuses. The third runs **status updates**, and the audit you're about to see is its show. They hand work to each other, because I instructed them to. When the status agent finds a record that needs changing, it doesn't change it. It writes "hand off to Operazioni" and tags the work.

Why split it up? Same reason you don't let the person who wrote the report also be the only person who checked it. Narrow agents with defined lanes are auditable. One agent that does everything is a black box with opinions.

## The Audit: Records vs. Reality

Here's what happens on my NBC demo project (the fictional baseball club from parts one and two) every week, without me asking.

The status agent walks the hub. It reads the deliverables database and gets what the RECORDS say. Then it reads what reality says: the meeting notes since the last audit, the milestone news callouts, the execution recaps that MCP sessions filed, the project updates log. And then it does the thing I never had the discipline to do weekly by hand: it diffs them.

The output is a status review page, and the structure is the whole product. Four groups:

- **✅ Looks completed.** Records show these as done. Please confirm they're truly complete. On NBC right now: the star schema foundation, 18 tables and 63 relationships with the data dictionary validated.
- **🟡 In progress.** Records and reality agree work is moving. The Ticket Sales dashboard measure set, in review with a sandbox session being scheduled.
- **⏳ Said but not done.** The money section. Records show "Not started," but a meeting or a recap says otherwise. The AXS bronze notebooks read as open in the records, while the milestone news says all 12 are operational. Did the historical backfill actually run? Check the box and I'll flip it.
- **❓ Unclear or needs input.** Genuine judgment calls: is this update client-facing or internal, which access items are still blocking, do the milestone due dates need setting.

Under every single item: a note explaining WHY it's in that bucket, citing the record status and the evidence that contradicts or confirms it. And at the bottom, my favorite part, a drafted **agenda for the status call**, built from the same diff. Showcase what's done, confirm the sign-off, walk through the open access items.

Stripped to the studs, the page my status agent generates looks like this:

```markdown
# NBC — Weekly Status Review (2026-08-17)

Check off what's truly complete, add notes and ETAs. To approve:
flip Status to Approved, reply here, or comment @status-agent.

## ✅ Looks completed — please confirm
- [ ] Star schema foundation
      record: Done · evidence: MCP session recap 08-13
      (18 tables, 63 relationships, data dictionary validated)

## 🟡 In progress — records and reality agree
- [ ] Ticket Sales dashboard measure set
      record: In review · evidence: sandbox session being scheduled

## ⏳ Said but not done — records lag reality
- [ ] AXS bronze ingestion notebooks
      record: Not started · evidence: milestone news 08-15 says
      all 12 operational · question: did the historical backfill run?

## ❓ Unclear — needs your input
- [ ] Is this week's update client-facing or internal?
- [ ] Milestone due dates are unset — want them scheduled?

## 📞 Drafted agenda — Thursday status call
1. Showcase the star schema and data dictionary
2. Confirm the Ticket Sales sign-off path
3. Walk the open access items
```

Every line is a citation: the record status, the evidence, the date. When I disagree with a bucket, I don't argue with a vibe, I argue with a specific claim.

<!-- SCREENSHOT: an NBC status review page in Notion showing the four triage groups with checkboxes and notes -->

![A two-column diff with record statuses on the left and meeting evidence on the right, merging through a lens into a four-band triage checklist](/images/2026/08/the-department-audit-triage.png)

## The Human Checkpoint Is Checkboxes

Now the part that keeps this from being automation theater. Nothing changes a record yet. The page sits there with every claim as a checkbox, and the instruction at the top is explicit: check off what's truly complete, add notes and ETAs, and when you approve, flip the status to Approved, reply here, or comment mentioning me.

My review takes maybe five minutes. I'm not writing anything. I'm confirming or denying specific, pre-researched claims: yes the backfill ran, no the monitoring isn't set up yet, that access item is still blocked on the client. Every box I check is a decision. Every box I leave is a question that goes on the call agenda instead of getting papered over.

This is the review skill I keep coming back to across this whole series. The agent does the doing, and the accountability stays with me. Checkbox by checkbox, I'm signing the audit. If a status is wrong after this, that's on me, and I'm fine with that, because five focused minutes of verification beats an hour of reconstructing status from memory every single time.

## Approval Fires the Department

The status flip to Approved is a trigger, and this is where the department earns the name. The status agent hands the confirmed record changes to **Operazioni**, which flips every deliverable and milestone status I checked off, one by one, in the actual databases. **Polpette** reads the newly honest state of the project and refreshes the Suggested Next Steps callout on the hub: what's now unblocked, what to prep, what the critical path looks like this week.

And the status agent writes the deliverable I used to lose an evening to: the **client-facing status update**. Weekly summary, delivered items, current work with expected dates, next week's plan, open dependencies. Below it, a copy-paste email draft to the client, subject line included. Generated from the confirmed diff, so every claim in it just survived a human review.

<!-- SCREENSHOT: the finished NBC client-facing status update with the email draft section -->

Then the hub itself updates. The project updates log gets a dated entry. The Latest News callout reflects the new truth. And here's the compounding part: the next **Claude instructions page** my agents generate for an execution session is written from these corrected records. The audit doesn't just clean up the past. It makes the next session smarter. That's the loop from part two closing.

![A circular loop of five nodes: agents audit records, human checks boxes, operations agent flips statuses, status update goes to the client, refreshed hub feeds the next instructions page](/images/2026/08/the-department-audit-loop.png)

## Steal the Workflow, Not the Tools

None of this is Notion magic. It's four requirements you can meet in whatever your team already runs:

1. **Records an agent can read and flip.** Deliverables with real status fields, in Notion, Azure DevOps, GitHub issues, wherever. Prose documents don't count.
2. **Evidence an agent can cite.** Meeting notes, execution recaps, and update logs related to the project, so the diff has a reality side.
3. **A triage format with a human checkpoint.** Four groups, checkboxes, notes explaining every claim. The agent proposes, you dispose.
4. **Handoffs on approval.** Status flips, a refreshed next-steps view, and a client-ready update generated from the confirmed state, not from memory.

Start with one project and one weekly audit. Write the first triage page yourself if you have to; the markdown template above is the shape. Then hand the shape to an agent and keep the checkboxes.

## Takeaways

- Project records drift from reality on every engagement; the audit's job is to diff them weekly, with evidence, before the gap compounds.
- Run narrow agents with lanes: one audits, one flips records, one plans. Handoffs between them are instructions, not hope.
- The triage page is the product: looks completed, in progress, said but not done, unclear. Every claim gets a checkbox and a cited reason.
- Humans stay in the loop as reviewers: five minutes of confirming pre-researched claims replaces an evening of reconstructing status.
- Approval triggers the payoff: records flip, the client update writes itself, and the next instructions page inherits corrected context.

That's the series. A hub that organizes context, a session that executes it over MCP, and an audit that keeps both honest. The prompt was never the product; the loop is. If this sparked something, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
