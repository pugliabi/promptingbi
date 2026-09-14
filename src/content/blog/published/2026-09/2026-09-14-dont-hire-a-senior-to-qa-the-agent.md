---
title: "Don't Hire a Senior to QA the Agent"
date: 2026-09-14T09:00:00Z
permalink: "2026/09/14/dont-hire-a-senior-to-qa-the-agent"
description: "Hand agents to people who can't interrogate the output and you haven't scaled your team. You've built a review queue and staffed it with your architect."
featured: /images/2026/09/senior-qa-agent-banner.png
draft: false
tags:
  - ai-agents
  - microsoft-fabric
  - business-intelligence
  - data-culture
  - adoption
source:
  episode: 548
  title: "Can We Trust AI Pipelines"
  notion: "https://app.notion.com/p/397e74c69c1880fab2e1e399c69d4a4c"
  youtube: "https://www.youtube.com/watch?v=d-Xks18U-Js"
  transcript: "transcripts/ep-548.txt"
---

Somebody two months into the job hands you a Fabric notebook. The PySpark is clean. It authenticated properly, it pushed the shared logic into helpers instead of one giant cell, and it left generous comments explaining its own reasoning as it went. Tables landed in the lakehouse. Row counts look plausible.

Nothing in that notebook will tell you anything is wrong, because nothing in it is. The code is good. The result is wrong.

So who catches that? On most teams, one person. The one you hired to design the platform.

I haven't watched this land on an engagement yet, and we're too early for me to pretend otherwise. Take it as a forecast, built out of the conversations I keep having with data leaders around the country and the questions teams keep sending me about who should be allowed to run agents at all.

The forecast: **hand agents to people who can't interrogate the output and you've created a new job, then staffed it with the most expensive person in the building.** That job is professional QA architect. Strong version, I know. I still don't want to pay my senior architect to do it.

## The Join That Tripled the Row Count

An agent joins a dimension onto a fact table. The join is correct, the syntax is correct, and the dimension happens to be slowly changing. Nobody told the agent that. The row count quietly multiplies.

No exception. No warning. No red squiggly line. Just more rows than there should be, and a revenue number wrong by a margin small enough to look believable.

Does the agent know? No. And if the person driving it didn't know either, then the output is wrong and nobody in that transaction made a mistake you can point at. The agent wasn't wrong. The agent didn't know.

Which is why "the senior will review it" fails as a plan. The artifact you'd be reviewing is the good part. A pro looks at the data and notices what shouldn't be possible. What's the grain of that table? Is there a current-row flag? Did the join add rows? Is that outlier real? Those questions come from having been burned.

Somebody two months in reads the same notebook and sees a notebook. You don't know what you don't know, and polite, well-commented output will never hand you a question you've had no reason to ask. I've written about this same gap from the [agent's side of the table](/2026/08/17/dont-let-your-agent-touch-fabric/), where the fix is a read-only survey up front and asserts in the notebook. That still holds. What I want to talk about here is who ends up holding the bag when those things are missing.

![A block of code brackets flowing right through a single node into a clean table card, with a dotted branch dropping to a second table card whose thicker top row is trailed by three faint duplicate copies fanning out behind it](/images/2026/09/senior-qa-agent-grain.png)

## Run the Math on That Seat

Say you build the obvious process around this. Juniors run the agents, seniors review the output, nothing promotes without a second set of eyes. Sounds responsible. Now run the numbers on the senior.

Half the week goes to reading agent-authored pipelines. Another twenty percent goes to sitting with whoever ran the agent, explaining what went wrong. That is two thirds of your most expensive, most experienced seat spent on neither architecture nor solution design.

Put it in a job description and read it back. Two thirds of your time is reviewing machine output and correcting people who haven't done this before. Some people love bringing others along, and they make excellent seniors. Plenty of very good engineers would read that and start looking, because it isn't what they worked ten years to get to do.

The arrangement doesn't even pay off. Your senior could have run the agents themselves and landed it right the first time: same person, same knowledge, one pass instead of three. The junior didn't get much either, because watching an agent produce something and then being told what was wrong with it is a long way from having built it. Everybody spent the week. Nobody gained.

![An oversized filled figure node with most of its outbound flow lines diverted into a tall stack of near-identical document cards, while a single thin line continues right toward an unreached architecture diagram](/images/2026/09/senior-qa-agent-leak.png)

## Where the Instinct Comes From

I have about twenty years in data, most of it before any of this existed, and I learned it ugly. I hard-coded things I shouldn't have. I wrote it line by line. I found out what a slowly changing dimension does to a join by doing it to myself, on something that mattered. There was no shortcut available to buy instead.

Now the modern version. The agent writes the notebook, the senior spots the missing flag, and the teaching moment is "you missed the slowly changing dimension." That's a correction, and corrections don't transfer. Next time a table like that shows up under a different name, there's nothing underneath to recognize it with. The recognition was borrowed.

So what am I testing for? Whether they understand **evaluation context**. What a row in this table represents, what happens to that meaning the moment you join it to something else, which number is being computed against which slice of the data. Somebody who has that goes and finds the flag on their own. Somebody who doesn't keeps needing to be told, forever, by the expensive person.

I'll be honest that this is a gray area for me and I don't think anybody has it resolved. Twenty percent of a senior's week spent teaching is a good investment and I'd sign up for it. Twenty percent spent narrating agent corrections to somebody who never did the work is something else entirely. The teaching is essential. What I won't accept is watching an agent get corrected counting as time in the trenches.

## What the Senior Writes Once

Move the check off the senior's calendar and into something that runs before the senior is involved at all.

So write a gate. One page, and the rule is that whoever ran the agent answers it **without the agent in the room**, before anyone senior opens the notebook. Can't answer it, the review hasn't earned a slot yet. This is the pipeline sibling of the [DAX readiness gate](/prompts/dax-readiness-gate/) I use on the modeling side, and it works the same way: a checkpoint, not a curriculum.

```markdown
# Pipeline Interrogation Gate

Answer before a senior opens the notebook. Agent closed. Notes allowed.
Cannot answer it means the review is not ready, not that you failed.

## The table you joined to
- [ ] What is the grain? One row per what?
- [ ] Is it slowly changing? How do you KNOW, not what did the agent say
- [ ] Which column decides the current row, and what did you filter on
- [ ] Which columns are nullable, and what does the join do with those rows

## The join itself
- [ ] Row count before and after. Same, or explain the difference
- [ ] Did the fact grain survive, or did it get finer without anyone saying so
- [ ] Which side owns each column in the result

## The numbers that came out
- [ ] Name one value in this output that should be IMPOSSIBLE, and show it isn't there
- [ ] What is the expected range for the main measure, and where did that number come from
- [ ] Compared against what: prior load, source system total, or nothing yet
```

That last block is where the two groups separate. Naming a value that couldn't exist takes a picture of the business in your head, which is the one thing an agent can't lend you. A baseball club with a survey response dated in a future season isn't a data quality quirk, it's a fabrication, and anybody who knows the domain sees it in a second.

Once the gate is clear, the senior still isn't reading a diff. Fifteen minutes on the data, from a fixed list, short on purpose.

```markdown
## Senior pass, fifteen minutes, on the data not the code
1. Row counts at every hop, against the expected counts written down beforehand
2. Distinct values on the columns that should be bounded
3. The main measure against the last known good total
4. One deliberate spot check against the source system
5. Anything the gate answered with "the agent said so"
```

Item five is the whole point. "The agent said so" tells you exactly where the reps are missing, which beats guessing at a training plan.

![Many incoming flow lines converging into a gate of five stacked checklist bars, from which one consolidated line passes a node and reaches a single filled figure, then continues into a dashboard panel of bar charts](/images/2026/09/senior-qa-agent-gate.png)

## Make It Part of Your Workstream

What I'd do this week, in order.

- **Write the gate for one pipeline.** Not the whole platform. One notebook already in flight, using the questions above as the starting draft.
- **Move the gate before the review, not into it.** Run it during the review and you've added a step to the senior's queue instead of removing one.
- **Track what the gate catches.** Every question that catches something real earns a permanent spot. Every question nobody has ever failed can go.
- **Count your senior's hours honestly for two weeks.** Reviewing, teaching, and architecting, in three buckets. If review is winning, that's a staffing decision you made by accident.
- **Protect the reps that teach evaluation context.** Pick the work where the lesson lives and keep it human for a while. Not all of it. The parts that build the instinct.
- **Scale delegation only as fast as people can interrogate output.** Not as fast as the agent can produce it.

## Takeaways

- An agent's pipeline mistakes arrive as data rather than as errors, so a review built around reading code is aimed at the wrong artifact.
- If the only person who can tell whether the numbers are possible is your architect, you've built a review queue and put your most expensive seat in it.
- Half the week reviewing plus twenty percent explaining leaves a third of a senior's time for architecture. Nobody stays in that seat happily, and the person being reviewed didn't gain the reps either.
- Corrections don't transfer. The teaching is essential, and nobody has this solved, but watching an agent get fixed is a long way from having done the work.
- Test for evaluation context: what a row means, and what a join does to that meaning. Somebody who has it finds the flag alone.
- A gate answered with the agent closed costs one page and runs forever. Reading diffs costs more with every notebook your agents write.

**Key takeaway:** this week, take one pipeline already in flight and ask whoever ran the agent to tell you the grain of the table they joined to, with the agent closed. Whatever happens in the next thirty seconds is your training plan.

My prediction: within two years, "show me a pipeline you built with an agent, and tell me what went wrong while you built it" becomes a standard interview question, and the good answers will all sound like somebody who interrogated their own data. If you're working out how to staff this on your own team, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
