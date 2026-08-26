---
title: "Domain Context Page"
description: "One page of soft data per data domain: nicknames, grain, standing filters, the decisions behind the numbers, and what the data cannot answer."
category: agent-skills
date: 2026-08-26T09:00:00Z
format: markdown
source:
  permalink: "2026/08/26/hard-data-soft-data"
draft: true
---

Your semantic model tells an agent what is possible. This page tells it what is meant. It lives next to the model in the same repo, so the pull request that changes the model is the pull request that updates this file, and it carries a named owner and a review date or it doesn't ship.

One file per domain, not one per organization. A page long enough to cover a domain and short enough that somebody actually reviews it.

```markdown
# Ticket Sales: Business Context

Owner: Ops director. Reviewed at the end of each season.
Last review: 2026-07-22. Model: Northside_TicketSales.

If something isn't written here, it isn't approved. Ask, then add it
here before using it in a measure, a description, or an answer.

## Quick reference
- **Covers:** tickets sold, revenue, and attendance by game and section.
  Not concessions, not merchandise, not sponsorship (see those pages).
- **Grain:** one row per ticket per game in FactTicketSales.
- **Standard filter:** every count excludes comp tickets unless the
  question is explicitly about comps.
- **Season boundary:** DimGame[SeasonKey], not calendar year. A season
  crosses two calendar years and "this year" is always ambiguous here.
- **Freshness:** the ticketing feed settles late. Anchor on the max
  scanned date, never on "yesterday."

## What people here actually say
| They say         | They mean                        | Resolves to               |
| "the opener"     | first home game of the season    | DimGame, game 1, home     |
| "a sellout"      | paid plus comp >= capacity       | not [Tickets Sold] alone  |
| "walk-up"        | sold at the gate on game day     | gate channel, not "Other" |
| "season holders" | full and half season plans       | excludes flex packs       |
| "the promo game" | any game with a giveaway         | ask which one, always     |

Deprecated names still frozen in the data: the 2023 "Club Level" seats
are "Premium" everywhere in the business now. Write with the new name,
filter with the old one.

## Decisions this domain runs on
Append-only. Date, decision, who approved it. Never edit a past entry.

- 2026-04-02: Attendance means scanned, not sold. Marketing reported
  sold for two seasons. Both numbers stay; scanned is the one on the
  dashboard. Approved by the ops director.
- 2026-05-19: The rained-out June 6 game is excluded from all trailing
  averages. The ticketing system kept the sales rows anyway.
- 2026-06-30: Group sales revenue is recognized at the game, not at the
  invoice. Finance dates it at invoice on purpose. Do NOT reconcile
  these two silently.

## Questions this data cannot answer
- Why a season holder didn't renew. We have the lapse, never the reason.
- Anything before the 2024 season. The migration left it behind.
- Per-person spend across ticketing and concessions. There is no shared
  customer key. Do NOT join on name.
- Secondary market resale price. We see the scan, not the transaction.

## Known disagreements (do not resolve on your own)
- Ops counts a game as complete at final out; finance counts it at
  settlement, which can be the next business day. Month-end differs by
  one game roughly a third of the time. Both are correct.

## Who asks what
- Ops director: utilization and attendance, by section, weekly.
- Finance: revenue and yield, by month, against budget.
- Marketing: channel mix and promo lift, per game.
  When the asker is unknown, clarify before choosing a grain.

## When this page is wrong
Say so in your recap and name the line. Do not work around it and do
not edit this file yourself. The owner edits this file.
```

## Adapting it

- **"Questions this data cannot answer" is the section nobody writes and the one that earns the page.** An agent with no stated boundary answers everything you ask it. "We have the lapse, never the reason" converts a confident fabrication into an honest no, and honest no's are how a business user learns to trust the thing.
- **The nickname table is where the Q2-launch class of failure dies.** Every company has a product everyone calls something that appears nowhere in the data. Include the deprecated values still frozen in the source system, with the rule: write with the new names, filter with the old.
- **Decisions are append-only with a date and a name.** The value isn't the decision, it's the audit trail behind a restated month. Editing history here is how you lose the argument six months from now.
- **"Known disagreements" prevents helpful reconciliation.** Two departments dating the same number from different events is normal. An agent left alone will average them and publish a definition nobody agreed to.
- **Scope it to one domain and cross-reference the neighbors.** A single organization-wide context page is a wiki, and a wiki is the thing that got you here. The "not concessions, not merchandise" line in Quick Reference is a routing instruction.
- **Colocate it with the model and gate it in review.** Same folder as the TMDL, and "did the context page change?" on the PR checklist. Cadences that live outside the work get skipped; a checkbox inside the work does not.
- **Harvest corrections into it.** Every time someone tells the agent "that's not what we mean by active," that's a missing line. Add it the same day.

The per-function counterpart, sourced from the business rather than from BI: [Department Vocabulary Skill](/prompts/department-vocabulary-skill/).
