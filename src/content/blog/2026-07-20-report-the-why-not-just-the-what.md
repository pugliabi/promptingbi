---
title: "Report the Why, Not Just the What"
date: 2026-07-20T09:30:00Z
permalink: "2026/07/20/report-the-why-not-just-the-what"
draft: true
description: "Dashboards show what happened but not why. Design experiment flags and business context into Power BI reports so numbers stop reading as verdicts."
featured: /images/2026/07/report-the-why-banner.png
---

Early in my career, I published a report showing email open rates down 10 percent. Anything below zero got formatted red. Seemed obvious at the time. Down is bad, bad is red, publish, go home. The scrutiny hit almost immediately, and here's the part that stuck with me: nobody questioned the number. The number was right. The marketing team had spent the last six months deliberately experimenting with new messaging, a wider audience, a different mix of sends. Of course the open rate dropped. They planned for it to drop. My report was accurate, and it was still wrong, because it told everyone WHAT happened and said absolutely nothing about why.

That gap is where most reports fail. We obsess over the what. The measure, the trend, the variance to target. Almost nobody designs for the why. And here's the problem with leaving the why out: the reader always fills that gap with something. Always. Usually their own bias, their own fear, or their own story about what the number means for their job.

## A Number Without Context Is a Verdict

When a metric shows up red on a published report, it stops being a data point. It becomes a judgment. The person who owns that metric does not read "opens declined 10 percent." They read "marketing failed," broadcast to everyone with access. And once someone feels judged by a report, you get **motivated skepticism**: all that critical thinking gets aimed at defending themselves instead of understanding the data. They'll question your sources, your logic, your refresh schedule, everything except their own prior belief. I have watched this happen in rooms where the numbers were airtight. Didn't matter. An airtight number loses to a threatened owner every time.

And here's the uncomfortable part. They're not wrong to push back! My red email number really was missing the point. The decline wasn't a failure; it was the expected cost of an experiment leadership had asked for. The report had no way to say that, so it said the worst version by default.

![A single declining metric stamped with a judgment gavel, with three separate readers each connected to their own empty thought bubble, showing every reader fills the missing context with their own assumption](/images/2026/07/report-the-why-verdict.png)

Think about a family recipe (I'm Italian, so you knew a food analogy was coming). If the Sunday sauce tastes different this week and nobody tells you the tomatoes were swapped on purpose, you assume the kitchen slipped. Somebody got lazy with the sauce. The change was intentional, maybe even an upgrade in the making, but without the why, different reads as worse. Your report is that Sunday sauce. If the recipe changed and the report can't say so, every single reader assumes someone messed up.

## The Why Lives in the Business, Not the Model

Here's the thing about the why: it almost never lives in your data. It lives in the business. Budget got cut 20 percent, so total sends dropped. The team retargeted to a narrower audience of people who actually buy, so opens fell while conversions climbed. It's seasonal. The market shrank and you're losing share slower than every competitor, which means sales are down and you're winning. A campaign was flagged as an experiment from day one.

None of that arrives in your fact table. And nobody hands it to you in requirements either, because the business doesn't think to mention it. Nobody in that marketing meeting said "by the way, we're experimenting with messaging this quarter" while I was building the report. Why would they? It wasn't relevant until my red number made it relevant.

So the report author is left with a choice. Publish the what and let readers invent the why. Or treat the why as a first-class part of the design and go get it. I know which one I pick now. I've lived the other one.

## Design the Why Into the Report

This is a design problem, and design problems have patterns. Here are the ones I now treat as standard practice, not nice-to-haves.

![One report card carrying the why: a bar split into business-as-usual and experimental segments with an experiment flag, a paired denominator bar, a dashed threshold line, and a pinned annotation note](/images/2026/07/report-the-why-design.png)

**Flag experiments in the data.** If the business is running an experiment, that belongs in the model as a dimension, not in someone's memory. An experiment flag lets you split every measure into business-as-usual and experimental. Show the combined view for the total picture, and the broken-out view so last quarter's baseline gets compared against this quarter's baseline instead of against a deliberate test. One column. One column changes the entire conversation.

**Pair every rate with its denominator.** Open rate down 10 percent while spend is down 20 percent is a completely different story than open rate down 10 percent on flat spend. If a metric can be moved by effort, money, or volume, put that driver right next to it. Don't make the reader go hunting for the reason in another report. They won't hunt. They'll guess.

**Put the context on the page.** Annotations, a "what changed this period" section, a note tied to the campaign dimension. The Sunday sauce rule: if the recipe changed on purpose, say so where the change is visible.

**Let the business own the verdict.** Red and green are conclusions, and conclusions need an owner with authority. What counts as bad? Is below target during an experiment bad? Those thresholds should come from the leader who owns the outcome, not from a formatting default I picked at 11 pm (which is exactly how my red rule got made, by the way). When someone pushes back on a red, the answer should be "leadership set that threshold," not "I thought it made sense."

**Show the beta before you publish.** The people affected by a report should see it before the rest of the organization does. Not as a courtesy. As discovery. That sandbox pass is exactly where "well, the numbers are low because we're experimenting" surfaces, while you can still add the flag and the note, instead of after the red has already done its damage. It changes ownership too: the team helped shape the report, so they defend it instead of defending themselves from it.

## Agents Are About to Read Your Verdicts

Here's where this stops being a formatting discussion. We are all racing to put agents on top of our data. An agent reading your semantic model can only see what you encoded. Ask it why opens dropped and it will do exactly what a human reader does with a context-free report: fill the gap, confidently. AI is already confidently wrong often enough without us feeding it verdict-shaped data.

But encode the why? The experiment flag, the spend driver, the threshold definitions, the annotations? Suddenly the agent can give the answer the room actually needs: opens declined within the experimental segment, business-as-usual held flat, spend was reduced, this was expected. That's the answer a leadership team can act on. The same design work that protects a marketing manager from a bad red is what makes your model trustworthy to an agent. **Context engineering** doesn't start in the prompt. It starts in the model.

![A semantic model of ERD table cards enriched with an experiment flag, a driver metric, and a threshold marker feeding an AI agent node, which outputs a correct, contextual answer instead of a guess](/images/2026/07/report-the-why-agents.png)

## Build This Week

You don't need to redesign your whole portfolio to feel the difference. One report, this week:

1. **Pick the report people already argue about.** You know the one.
2. **Ask the metric owner one question:** what would make this number move that is NOT failure? Every answer is a why your report currently can't express.
3. **Add an experiment or initiative flag** to the model. Smallest version that works; one column is enough.
4. **Put the driver metric next to the rate**, and add a one-line "what changed this period" note on the page.
5. **Get a threshold sign-off** from whoever owns the outcome, so red means what leadership says it means.
6. **Run one beta pass** with the team the report is about, before it goes wide.

Do that once and watch what happens to the arguments. They don't disappear; they get better. People start arguing about the business instead of arguing about your report.

## Takeaways

- A number without context isn't information, it's a verdict, and every reader fills the missing why with their own bias.
- The why lives in the business, not in your fact table. Nobody will hand it to you; you have to design for it and go get it.
- Encode it with patterns: an experiment flag in the model, the denominator next to the rate, context on the page, thresholds owned by leadership, and a beta pass before publishing.
- The same context that protects a human from a bad red is what makes your semantic model trustworthy to an agent.
- Start with one report and one question this week: what would make this number move that is NOT failure?

Reports that carry their own why build trust that compounds. Reports that don't, spend it. And I think the next generation of BI work gets judged less on how well we showed what happened and more on how well we captured why it happened, because the why is the one thing an agent can't invent. Keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
