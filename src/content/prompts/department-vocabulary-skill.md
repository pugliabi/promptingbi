---
title: "Department Vocabulary Skill"
description: "One skill file per business function, sourced from that function: the words they use, the words they refuse, their real process, and a named owner."
category: agent-skills
date: 2026-08-24T09:00:00Z
format: markdown
source:
  permalink: "2026/08/24/ai-coe-better-not-bigger"
draft: false
---

An AI alone will never understand your business, your people, or your lingo. So stop asking it to. Go to operations and ask for the SharePoint page or the Confluence space where their team actually works, go to sales and ask what an opportunity is, and turn each answer into one of these.

One file per business function. Sourced from that function, owned by a name in that function, reviewed on a schedule. Anything your agent writes that touches operations reads the operations skill first.

```markdown
---
name: operations-vocabulary
description: >
  Operations team vocabulary, definitions, and process for the Center of
  Excellence. Load this before writing, reviewing, or updating any CoE
  content that touches work orders, dispatch, crews, field service,
  escalations, or the operations month-end close. Also load before
  documenting any semantic model, measure, or report whose subject is
  operations data. Do NOT use for finance revenue definitions (see
  finance-vocabulary) or for sales pipeline terms (see sales-vocabulary).
---

# Operations Vocabulary and Process

This skill comes from the operations team, not from BI. Every statement
below was confirmed by the owner. If something isn't here, it isn't
approved yet.

## Owner
Dana R., Operations Manager. Reviewed quarterly. Last review: 2026-08-11.
Escalation for anything ambiguous: Dana first, then the ops director.

## Source material (read these, don't summarize from memory)
- Operations SharePoint site: work order intake, escalation paths, the
  crew scheduling calendar
- The Confluence space the team actually keeps current (not the
  archived 2023 space with the same name)
- The two spreadsheets they run the Monday planning meeting from

## Words this team uses
| They say        | It means                              | Never call it   |
| Work order      | Committed job with a scheduled crew   | Ticket, task    |
| Job             | Requested work, not yet committed     | Work order      |
| Open            | Scheduled, not yet dispatched         | Pending, new    |
| In the field    | Crew on site, clock running           | In progress     |
| Closed complete | Signed off by the site supervisor     | Done, finished  |
| Callback        | Return visit on a job already closed  | Rework, failure |

## Process, in their words
1. Intake arrives by phone or the portal, never by email. Email
   requests are re-entered in the portal and the email is ignored.
2. A job is not a work order until a crew is assigned.
3. A crew is not dispatched until materials are confirmed available.
4. Month end closes on the second business day, not the last day of
   the month. Anything signed off after that lands in the next period.
5. A callback is tracked against the original work order, never as a
   new one.

## Metric definitions (approved)
| Metric                | Definition                                  |
| Completion rate       | Closed complete / work orders, by close date |
| First-visit fix rate  | Work orders with no callback within 30 days  |
| Crew utilization      | Field hours / scheduled hours, crew level    |
| Backlog               | Open work orders older than 5 business days  |

## Known disagreements (do not resolve on your own)
- Finance counts a job as revenue at invoice; operations counts it as
  complete at supervisor sign-off. These are different dates on
  purpose. Never reconcile them silently in a description or a measure.
- The regional teams use "zone" for two different things. Ask which.

## Never invent
- Any threshold, SLA, or approval step not written above.
- Any metric definition. If it isn't in the table, ask the owner and
  add it to this file before you use it anywhere.
- Any org structure, role name, or handoff not documented here.
- A resolution to anything in Known disagreements.

## When this skill is wrong
Say so in your recap and name the line. Do not work around it and do
not edit this file yourself. The owner edits this file.
```

## Adapting it

- **The "Never call it" column is the whole point.** That isn't pedantry, it's culture encoded as a file. When a CoE page calls a work order a ticket, operations reads one sentence and decides the page was written by someone who doesn't work here, and then they never open the library again. General doesn't get trusted, no matter who wrote it.
- **"Known disagreements" is the section that earns this skill its keep.** Every organization has two departments dating the same number from different events. An agent left alone will helpfully reconcile them and quietly publish a definition nobody agreed to.
- **The `description` front matter is the trigger surface.** List the nouns that should fire it and name the sibling skills it should defer to, or your operations skill will get loaded for a finance question.
- **A named owner with a review date, or don't ship it.** A skill nobody owns decays into exactly the generic content you built it to prevent, and a page built on a stale skill is worse than no page.
- **"The owner edits this file" prevents the failure mode where BI helpfully patches the business's vocabulary.** The agent's job is to report that a line looks wrong, not to fix it.
- **Start with the department that complains most about reporting.** One skill done properly beats five scraped off a wiki, and the fastest way to fund the next four is to regenerate one existing page with the skill loaded and put both versions in front of that department.

The brief that consumes this vocabulary: [CoE Documentation Sweep Brief](/prompts/coe-documentation-sweep-brief/).
