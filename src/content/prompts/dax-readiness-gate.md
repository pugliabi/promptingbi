---
title: "The DAX Readiness Gate"
description: "The three gates, four trap measures, and pass criteria I use to decide whether someone is ready for agentic DAX tooling."
category: playbooks
date: 2026-08-28T09:00:00Z
format: markdown
source:
  permalink: "2026/08/28/agents-raise-the-floor-and-lower-the-ceiling"
draft: false
---

This is the checkpoint, not a curriculum. It answers one question: has this person made the mind shift, or are they about to direct an agent through work they cannot see? Run it as a series of conversations, not a single exam, and run it on your seniors too. You will learn something.

The exercises deliberately invert the usual test. Nobody is asked to write DAX. They are handed DAX and asked to explain it back, which is exactly the posture they will be in for the rest of their career.

## The gate

```markdown
# DAX Readiness Gate

Purpose: decide whether this person gets agentic DAX tooling yet.
Not a certificate. A series of checks, repeated, with someone who can already see it.

## Gate 1 — Semantic modeling
- [ ] Can draw our star schema on a whiteboard from memory: facts, dimensions, grain
- [ ] Can explain why a date table exists and what "mark as date table" changes
- [ ] Can name one relationship in our model that is deliberately single-direction, and why
- [ ] Given a new requirement, can say whether it needs a new measure, a model change,
      or an upstream change

## Gate 2 — Filter and evaluation context
- [ ] Has personally hit "works in a table, blank on a card" and can explain the cause
- [ ] Can predict what a measure returns on a total row before running it
- [ ] Can explain what CALCULATE does to filter context in their own words,
      without using the word "context" more than twice
- [ ] Can spot when a numerator and denominator are evaluated in different contexts

## Gate 3 — How Power BI wants to calculate
- [ ] Can explain why DAX recalculates on every interaction
- [ ] Can say what belongs in DAX (filtering, aggregation) vs upstream (row-by-row work,
      pre-computed comparisons)
- [ ] Can identify one measure in our model that should have been solved upstream

## Read-back exercises
Hand them the measure. Ask three questions, in this order:
  1. What does this return on a detail row?
  2. Why?
  3. Is that what anyone wanted?

Pass = they locate the problem unprompted.
Soft pass = they find it after one hint. Repeat in two weeks.
Fail = "it returns a percentage." Not ready. Keep pairing.

## Outcome
- [ ] Gates 1–3 demonstrated, more than once, on our actual model
- [ ] At least three read-back exercises passed
- [ ] Then: agentic tooling, supervised, with review for the first month
```

## The trap measures

Four measures that run clean and mean nothing. Each one fails differently on purpose.

```dax
-- 1. Mismatched contexts. Numerator ignores Product, denominator doesn't.
-- Listen for: they notice ALL() before they comment on the number.
Margin % =
DIVIDE (
    CALCULATE ( SUM ( Sales[Amount] ) - SUM ( Sales[Cost] ), ALL ( 'Product' ) ),
    SUM ( Sales[Amount] )
)

-- 2. Time intelligence on a fact column with no date table.
-- Listen for: "which dates does it actually have in context here?"
Sales YTD =
TOTALYTD ( SUM ( Sales[Amount] ), Sales[OrderDate] )

-- 3. Reads fine, dies at scale, and lies on totals.
-- Listen for: iterator awareness, and that the total is not the sum of the rows.
Avg Order Margin =
AVERAGEX (
    Sales,
    ( Sales[Amount] - Sales[Cost] ) / Sales[Amount]
)

-- 4. Blank versus zero. Silently drops rows from a visual.
-- Listen for: what happens when there are no sales, and whether that is desired.
Attainment % =
DIVIDE ( SUM ( Sales[Amount] ), SUM ( Targets[Amount] ) )
```

## The question bank

Start here, then add a question every time a review catches something. The list is the thing you are really building, and it is the seed of a genuinely useful custom agent.

```markdown
## Model review questions
- Why this cardinality? What breaks if it is wrong?
- Is any cross-filtering bidirectional, and was that a decision or a default?
- Where are the many-to-many relationships, and what are they hiding?
- Is time intelligence pointed at a marked date table?
- What is the grain of this fact table, and does every measure respect it?

## Measure review questions
- How many FILTER functions are stacked in here, and is there a simpler pattern?
- Does this survive being placed on a card, a total row, and a matrix?
- Does the total equal the sum of the rows? Should it?
- Is anything being recalculated per row that could be pre-computed upstream?
- Blank or zero when there is no data, and which one does the visual need?
```

## Adapting it

- **Use your own model, not a sample.** The gate is about whether they can see YOUR business logic. Generic exercises test generic knowledge.
- **Run it on the whole team.** If a senior cannot pass gate three, that is not an embarrassment, it is your next training topic.
- **Keep the trap measures in source control** and rotate them, because the moment they circulate they stop testing anything.
- **The read-back is the load-bearing part.** If you only do one thing on this page, hand somebody a broken measure and listen to how they talk about it.

The reasoning behind the gate, and why the order is model first: [Agents Raise the Floor and Lower the Ceiling](/2026/08/28/agents-raise-the-floor-and-lower-the-ceiling/).
