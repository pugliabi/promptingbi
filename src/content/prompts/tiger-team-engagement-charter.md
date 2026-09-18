---
title: "Tiger Team Engagement Charter: Discovery, Accountability, and the Exit"
description: "The three documents that keep a floating central BI team from quietly becoming a department again: the discovery brief, the domain accountability table, and the charter with exit criteria."
category: playbooks
date: 2026-09-18T09:00:00Z
format: markdown
source:
  permalink: "2026/09/18/central-bi-is-a-tiger-team-now"
draft: false
---

A central BI team that floats to the current priority needs three things written down before it starts: what the business actually does today, who is accountable for the domain after we leave, and what "done and gone" looks like. Skip the third one and the engagement never ends, which means you didn't run a tiger team, you just joined a department with extra steps.

The post shows slices of these. Here they are in full, in the order you use them.

## 1. Discovery, before any architecture

Run this first, in a room, with no Fabric portal open.

```markdown
# Discovery: Before We Draw A Single Workspace

Do not propose an architecture in this session. The output of this
conversation is a description of how this team works today. Nothing else.

## Ask, in this order
1. What does this team already do with data, without us? Name the tools.
2. Who manages the sources? Not who uses them. Who gets the call when
   the connection breaks.
3. Is reporting someone's dedicated job here, or is it everyone's job?
4. What decision are you trying to make that you can't make today?
5. What is the last thing that burned you in a report?
6. What do you rebuild by hand every week? Name the spreadsheet.
7. Who outside this team asks you for these numbers?

## Then, and only then
- What is the lakehouse FOR, for the people in this room? Write their
  answer in their words, not ours. If nobody can answer it, stop.
  There is no architecture to design yet.
- What's the shape of the data they need: point in time, daily, or
  near real time? A team living in campaign platforms is a real-time
  conversation, not a semantic model conversation.
- What access level does the work actually require: a report, a
  semantic model, or the tables? Pick the smallest one that does
  the job. You can always open it up later. You cannot close it.

## Hard rules
- Do not say the words medallion, bronze, or silver in this meeting.
- Do not promise a workspace. We don't know how many we need yet.
- Do not demo anything. A demo ends discovery.
- If the answer to #3 is "everyone's job," that is a finding, not a
  detail. Write it down in bold.

## Output of this session
A one-page description of how this team works, in their vocabulary,
that someone on the team would recognize as accurate. Send it to them.
If they correct it, you were wrong and you just got it for free.
```

## 2. Domain accountability

One row per data domain, reviewed quarterly. This lives where the business can see it, not in the BI team's notes.

```markdown
# Domain Accountability

A domain with no name next to it is not a domain, it's a folder.

| Domain     | Lakehouse  | Accountable       | Backup      | Tiger team status  |
| Operations | ops_lh     | D. Reyes, Ops     | T. Vance    | Handed off 08/12   |
| Sales      | sales_lh   | M. Okafor, Sales  | R. Idris    | Handed off 05/03   |
| Marketing  | mktg_lh    | OPEN              | OPEN        | ACTIVE, exits 10/9 |
| Finance    | fin_lh     | J. Byrne, Finance | A. Sood     | Handed off 02/20   |

## What accountable means here
- You are answerable for what the tables in this domain mean. Not for
  building them. For the definitions being right and current.
- You approve who gets table-level access in your domain.
- You get the call when a number is disputed, and you get to say no.
- You review this row quarterly and initial it.

## The rule with teeth
If your team's reporting is not sourcing from your domain's lakehouse,
that is a conversation, and it's a conversation with your manager in
it. Shadow tables are how fragmentation starts, and Fabric makes
fragmented data EASIER to create than Power BI ever did.

## Persona note
These are roles, not headcount. One person may hold three rows. That is
fine. A row with no person is not fine.

## Escalation
An OPEN row older than one quarter goes to the executive sponsor by
name. Not to the BI team's backlog. Unowned data is a leadership
problem and it should land on a leadership desk.
```

## 3. The engagement charter

Written and agreed before kickoff. One page. The exit criteria are the part people want to negotiate away, so don't.

```markdown
# Engagement Charter: Marketing Real-Time Campaign Data

## Why this one, now
Aligns to the Q4 goal: cut campaign reallocation time from 9 days to 2.
If that goal moves, this engagement ends. We do not finish work that
stopped mattering.

## What we are building
Eventstream into mktg_lh, and table access for two named analysts.
NOT a semantic model. NOT a report. They already know what they want
to see; the gap is latency, not visuals.

## What we are explicitly not doing
- Rebuilding the existing campaign reports. They work.
- Onboarding a third analyst mid-engagement. Next rotation.
- Anything in the ad platform itself. Not our system.

## Exit criteria (all five, or we are not done)
- [ ] Two analysts have queried the tables unaided, twice, in a week
      we did not attend.
- [ ] A named person in marketing is accountable for the domain and
      has signed the definitions.
- [ ] Runbook exists: what breaks, who gets called, how to reprocess.
- [ ] Estate audit passes for this workspace: domain tagged, group
      admin, no orphaned items, no external principals with write.
- [ ] Someone outside the BI team can explain what the lakehouse is
      for, in their own words.

## Hand-off, not hand-over
For 30 days after exit we answer questions and review their work. We
do not build. If we are still building in week three, the exit
criteria were wrong and we say so out loud rather than quietly
extending.

## Standing rule
New requests during this engagement go on the list, not into the work.
The list gets read at the next quarterly planning. All of it.

## Cadence
Every two weeks, 20 minutes, with the sponsor: what shipped, what's
blocked, are we still aimed at the Q4 goal. That cadence is how the
BI team's goals stay the business's goals.
```

## Adapting it

- **"Do not say the words medallion, bronze, or silver" is the load-bearing line in the discovery brief.** The fastest way to lose a business team is to answer a question about their work in our architecture vocabulary. They asked about campaign performance and you said bronze layer; they just learned this conversation isn't for them.
- **Pick the smallest access level that does the job.** Report, model, or tables. Opening access up later is a Tuesday. Closing it is a political event.
- **The exit criterion that matters is the one you can't fake.** "Two analysts queried the tables in a week we did not attend" is a test. "We delivered the lakehouse" is a status update.
- **Put a date on the ACTIVE row.** An engagement without an end date on the accountability table is how the tiger team becomes the marketing BI team again.
- **Escalate OPEN owners out of the BI backlog.** If unowned data sits on your list, you've silently accepted accountability for definitions you can't defend.
- **Keep the "what we are explicitly not doing" section.** Scope creep in these engagements never arrives as a big ask; it arrives as one reasonable extra report.
