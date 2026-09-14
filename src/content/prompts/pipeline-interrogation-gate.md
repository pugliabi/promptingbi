---
title: "The Pipeline Interrogation Gate"
description: "The questions whoever ran the agent answers with the agent closed, before a senior opens the notebook at all."
category: playbooks
date: 2026-09-14T09:00:00Z
format: markdown
source:
  permalink: "2026/09/14/dont-hire-a-senior-to-qa-the-agent"
draft: false
---

This is the pipeline sibling of the [DAX readiness gate](/prompts/dax-readiness-gate/), and it exists to keep your most expensive engineer out of a review queue they can't get out of any other way. An agent's bad PySpark doesn't fail loudly. It hands you data, so the review that catches it has to be a conversation about the data.

The rule that makes it work is the boring one. Whoever ran the agent answers this **with the agent closed**, before anyone senior opens the notebook. A blank answer is a signal that the review hasn't earned a slot yet and the reps come first.

## The gate

```markdown
# Pipeline Interrogation Gate

Answer before a senior opens the notebook. Agent closed. Notes allowed.
Cannot answer it means the review is not ready, not that you failed.

## The table you joined to
- [ ] What is the grain? One row per what?
- [ ] Is it slowly changing? How do you KNOW, not what did the agent say
- [ ] Which column decides the current row, and what did you filter on
- [ ] Which columns are nullable, and what does the join do with those rows
- [ ] Where did this table come from, and who owns it upstream

## The join itself
- [ ] Row count before and after. Same, or explain the difference
- [ ] Did the fact grain survive, or did it get finer without anyone saying so
- [ ] Which side owns each column in the result
- [ ] What happens to a fact row with no match, and is that what you want

## The numbers that came out
- [ ] Name one value in this output that should be IMPOSSIBLE, and show it isn't there
- [ ] What is the expected range for the main measure, and where did that number come from
- [ ] Compared against what: prior load, source system total, or nothing yet
- [ ] Which of these numbers would a stakeholder recognize on sight, and does it look right

## Before you hand it over
- [ ] Every answer above is yours, not the agent's summary of itself
- [ ] Anything you could not answer is written down as a question, not left blank
```

## The senior pass, once the gate is clear

Fifteen minutes on the data, from a fixed list. The code is usually the fine part, so this list ignores it.

```markdown
## Senior pass, fifteen minutes, on the data not the code
1. Row counts at every hop, against the expected counts written down beforehand
2. Distinct values on the columns that should be bounded
3. The main measure against the last known good total
4. One deliberate spot check against the source system
5. Anything the gate answered with "the agent said so"
```

## Adapting it

- **Run it before the review, not inside it.** Let the gate happen while the senior is already reading and you've added a step to their queue instead of removing one. The sequencing is the entire mechanism.
- **The impossible-value question is load-bearing.** Naming a number that couldn't exist takes a picture of the business, which is the one thing an agent can't lend anybody. If somebody only answers one question on this page, make it that one.
- **Agent closed matters.** The gate measures what stayed in the person, and an open chat window quietly answers every question here.
- **"The agent said so" is a training signal.** Item five on the senior pass tells you exactly where the reps are missing, which beats guessing at a curriculum.
- **Grow it from real misses only.** Every question that catches something earns a permanent spot; every question nobody has ever failed is costing you attention.
- **Use your own tables.** Grain, ownership, and the impossible values are specific to your business. A generic version of this page tests generic knowledge.

The argument for why this belongs on a page instead of on a senior's calendar: [Don't Hire a Senior to QA the Agent](/2026/09/14/dont-hire-a-senior-to-qa-the-agent/).
