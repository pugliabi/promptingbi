---
title: "Agents Raise the Floor and Lower the Ceiling"
date: 2026-08-31T09:00:00Z
permalink: "2026/08/31/agents-raise-the-floor-and-lower-the-ceiling"
description: "Hand a DAX agent to someone who never learned filter context and you make them productive while capping how far they can go. Prove the fundamentals first."
featured: /images/2026/08/floor-ceiling-banner.png
tags:
  - dax
  - ai-agents
  - semantic-models
  - power-bi
  - agent-skills
  - business-intelligence
source:
  episode: 549
  title: "Training Staff on Agents for DAX"
  notion: "https://app.notion.com/p/397e74c69c1880d58dd6fcbb00a36ed8"
  youtube: "https://www.youtube.com/watch?v=C68t4grCD6Y"
  transcript: "transcripts/ep-549.txt"
---

Point somebody brand new at a semantic model through an MCP server and ask for a year-to-date measure. They will get one. The syntax will be perfect. It will render on a card without complaint. The number will look completely reasonable, and depending on how that model was built, it can also be wrong in a way nobody catches for two quarters.

That is the part of agentic tooling I do not think teams have priced in yet. Not that it fails loudly. That it succeeds quietly at the wrong thing.

So let me make a prediction rather than a complaint, because I think this is simply what is going to happen as agentic tooling lands on data teams: **hand DAX agents to people who have not done the work, and you will raise their floor while lowering their ceiling.** Both halves of that are real. The floor going up is immediate, visible, and genuinely good. The ceiling coming down is slow, quiet, and it lands on the person instead of the project. Which is exactly why it is the one you have to design around.

![A small figure standing on top of four solid ascending steps with their head close beneath a heavy horizontal plane that caps the staircase, the steps above it continuing only as faint dotted outlines while flowing lines and nodes drift up past the cap toward a target circle the figure cannot reach](/images/2026/08/floor-ceiling-banner.png)

## The Floor Is Real, and I Am the One Who Said So

I have argued the bull case myself, so I am not going to pretend otherwise now. Put an MCP server against a development semantic model, hand it to someone on their first week, and say "go see what we have and help organize it." Write the descriptions. Clean up the measure names. Tell me what relationships exist and which ones look wrong. That work is genuinely valuable, it used to require somebody who already understood tabular modeling, and now it does not. An intern could do it. A data steward could do it. A chat interface that executes real functions against a real model is one of the best introductions to a semantic model that has ever existed.

Here is the sharper version of the same point, and it is the one that made me uncomfortable when I said it out loud: **my MCP server is my junior developer.** It does the tedious work. It writes the measures. It builds the relationships. It takes the requirements and grinds through the implementation.

That is exactly the work I would have handed a junior five years ago. It is also exactly the work that turned me into somebody who can open a model and know within ten minutes whether it is any good.

Sit with that for a second, because both sentences are true at the same time.

## DAX Punishes This More Than Anything Else

Every language has a version of this problem. DAX has the worst one, and it is worth being specific about why.

When people struggle to learn Python, they are usually struggling with the size of the language. There is a function for everything and you do not know which one exists. DAX is not like that. There are maybe ten functions that matter for the overwhelming majority of real work. CALCULATE. FILTER. The time intelligence family. If you master those you have covered most of what you will write in a career. The catalog is not the wall.

The wall is that **DAX is inseparable from the data and the model underneath it.** Writing it is not the hard part. Knowing what the result is supposed to be is the hard part. Is this the intended output? Is this number the one the business actually asked for?

And here is the thing people miss: DAX is never wrong. It does precisely what your formula asked it to do, every single time. When the number is wrong, the formula was not wrong. The request was. You asked for something other than what you meant.

Now put an agent in the middle of that. Everyone in this space has run into a model that is confidently incorrect, where the code is impeccable and the answer is nonsense. I cannot think of a single place in the Microsoft data stack where that failure mode is more dangerous than DAX, because the tell never shows up. There is no red squiggle. No exception. No failed run. The card lights up with a number that looks like a number, and everything downstream of it treats that as truth.

![A code bracket block flowing cleanly through a validation checkmark node into a card silhouette, while a parallel dotted path shows the same value diverging across the rows of a detail table](/images/2026/08/floor-ceiling-confidently-wrong.png)

Which means prompting your way through DAX without understanding filter context is incredibly hard. Not tedious. Hard. Even with a modeling MCP server, even with a good skills library, even with an agent that has been fed every pattern your company uses. You still have to be able to describe the output you want, and you cannot describe an output you cannot picture.

## You Can Direct the Orchestra Because You Played In It

Here is the analogy I keep coming back to, and it explains the ceiling better than anything else I have found.

A conductor who never played an instrument can still stand on the podium and keep time. The orchestra will play. To most of the room it will look like conducting. What that person cannot do is hear the second violins drifting flat and know instantly that it is the section and not the soloist. They cannot tell the difference between a passage that is genuinely wrong and a passage that is merely unfamiliar to them. They cannot make the call that this tempo is not serving the piece.

Directing is a different job from playing. But the ability to direct WELL was purchased by playing.

Agentic tooling handed everybody a podium. That is the raised floor, and I want to keep saying it is a real gift. The ear is the ceiling, and the ear is not included.

![A conductor silhouette on a podium with a raised baton stopped short by a low horizontal plane hanging directly above the hand, flowing lines and nodes fanning out to the right toward an orchestra seating curve whose player positions are ERD table cards, bar chart clusters, and dashboard panels](/images/2026/08/floor-ceiling-orchestra.png)

I will indict myself here rather than a hypothetical junior, because I am living in this exact gap. Every application I ship right now runs on C#. I could not sit down at a blank file and write it. I know what the language is capable of, I know roughly how the pieces fit, and I can read enough of it to notice when something looks off. I am not a C# senior and I am not going to pretend to be one. Agents wrote that code. I direct it, and I direct it reasonably well, because I have spent years learning how to specify and evaluate work in general.

But notice the escape hatch I have: nobody is making a hiring decision based on a number my C# produced. A junior shipping DAX does not get that hatch. Their output goes to a CFO as a figure somebody will act on.

There is a mechanism underneath all of this that I think is the actual story of the last two years. **Reading code and writing code are two different skills, and the link between them just broke.** For decades they traveled together, because the only path to reading fluently was writing a mountain of it first. That is no longer true. You can now produce working output in a language you are not competent in. That is extraordinary leverage and it is also why the review instinct no longer arrives for free with the job.

I felt this in college, long before any of this existed. When somebody handed me a study guide, I did not learn the material by reading the study guide. I learned it when I wrote it down myself. I have read the filter context chapter in Marco Russo's work seven times. Reading it seven times is not the thing. I always call it a **mind shift**, because DAX is not difficult so much as it forces you to think differently about formulas and numbers. You get the shift by doing it, getting it wrong, and figuring out why.

Or put it the blunt way: if I were writing a math test for an AI and I stunk at math, how exactly would I grade it?

## Three Gates: The Model, Then Context, Then Calculations

So what do I want somebody to prove before I hand them agentic tooling? Three things, in this order. The order matters, because each gate is what makes the next one comprehensible.

**Gate one: semantic modeling.** DAX success is the model. Your measures and your relationships ARE the business logic, and the semantic layer is where the meaning lives. Want better DAX? Build a better model. That is not a slogan, it is usually the literal fix.

Here is the demo I show in every DAX training I run, because it lands harder than any explanation. Somebody skips building a date table, because the fact table already has dates on it, and then asks for year to date:

```dax
-- No date table in the model, so time intelligence is pointed at the fact table
Sales YTD =
TOTALYTD ( SUM ( Sales[Amount] ), Sales[OrderDate] )
```

Drop that on a card. The total looks right. Put it in a table by product and it starts lying. Time intelligence needs a contiguous calendar, and when you point it at a fact column it works with only the dates present in the current filter context. On a product row, that is only the dates that product happened to sell on. So each product's year to date resolves against its OWN most recent order date. A product that stopped selling in March shows a complete-looking year. The grand total still looks plausible, because across all products the dates fill in.

```dax
-- With a marked date table and a relationship, "year" means the calendar's year
Sales YTD =
TOTALYTD ( SUM ( Sales[Amount] ), 'Date'[Date] )
```

Same function. Same intent. Entirely different truth. How would somebody who never learned modeling catch that? They would not, and neither would the agent, because nothing about the first version is malformed.

![Three sequential gate arches labeled by shape rather than text, a model card set then a nested context frame then a calculation engine node, opening onto an agent node on the right](/images/2026/08/floor-ceiling-three-gates.png)

**Gate two: filter and evaluation context.** This is the one that has to be earned by hand. The classic moment is writing a measure that works perfectly in a table, dropping it on a card, and getting a blank. What gives? Then you learn it needed a filter context that the card does not provide. Then you fix that and the totals stop making sense. Those two or three frustrating afternoons are the mind shift, and there is no version of them you can outsource. You do not get there by generating the code, and honestly you do not fully get there by writing the code either. You get there in the testing.

**Gate three: calculations the way Power BI wants to run them.** DAX recalculates in real time on every click, which is why it is the right home for anything that has to stay dynamic as a user swaps a dimension. It is exceptionally fast at filtering and aggregating. It is a poor place to do row-by-row text evaluation, or first-record-to-last-record comparisons that turn into recursion. Those belong upstream in the data engineering layer, pre-calculated, so DAX does not have to solve them on the fly. Knowing where that line sits is the difference between a model that scales and one that gets slower every month.

## What "Prove It" Actually Looks Like

I get asked whether new hires should still take the SQLBI courses, or whether you can just let them drive straight into the tooling. My answer is that yes, I still insist, and I do not think that is a nostalgic position.

But a certificate is not the gate. What I actually want is **a series of tests, plus real time working alongside them.** Not a single exam with a pass mark. A repeated demonstration that they can see what is in front of them, checked by somebody who can already see it.

The single best test I know is the cheapest one to run, and it inverts the usual exercise. Do not ask them to write DAX. Put DAX in front of them and have them explain it back to you as if the agent had just handed it over:

```dax
Margin % =
DIVIDE (
    CALCULATE (
        SUM ( Sales[Amount] ) - SUM ( Sales[Cost] ),
        ALL ( 'Product' )
    ),
    SUM ( Sales[Amount] )
)
```

What does this return on a product row? Why? Is that what anybody wanted?

The measure runs. It returns a percentage. It will look entirely respectable on a card. It is also comparing all-product margin against a single product's sales, which is a number that means nothing at all. Somebody who has made the shift sees the `ALL` and knows the numerator and denominator are living in different contexts. Somebody who has not made the shift sees a percentage and moves on. That is the whole gate, in one measure, in about ninety seconds.

From there, build the question bank, because expert review is really just a list of questions that only exist because you have been burned before. Why this cardinality? Why is cross-filtering bidirectional here? Are there three FILTER functions stacked inside this measure, and is there a simpler pattern? Is this time intelligence pointed at a real date table? Every failure you catch becomes a permanent new question on the list, and the list is the thing you are actually training.

Because here is who pays if you skip this. A junior cannot QA their own work when the failure mode is invisible to them. They will look at it. They will not know what to look for. So it lands on the senior, and reviewing DAX all day is not a fun job. It is also not what you hired that person for.

And this is where I will part ways slightly with the optimistic version of this story. Yes, seniors should be pouring their knowledge into skills and custom agents. I completely agree with that, and it is the best answer anybody has offered to a problem we have never solved, which is how you get expertise out of one person's head and into the organization. Tools like Skill Vault make that genuinely practical now. But baking a senior's knowledge into an agent does not give a junior the reps. It gives them a better agent. Those are not the same thing, and I do not think we should let the first one quietly stand in for the second.

## Then the Agent Stops Being a Token Furnace

Now run the other version. Somebody comes in, spends real time on the fundamentals without agentic tooling, passes the tests, and then gets the agent.

Everything changes, and not just for them.

They stop burning tokens rediscovering the same solved problem in a slightly different way every week. When a prompt comes back wrong, they can see it is wrong, so the loop closes on their desk instead of on a senior's calendar. Your senior stops being a review queue and goes back to the work you are actually paying for, which is strategy: thinking rigorously about what the business needs, whether this is even the right metric, and where the real value is. That is the expensive part of the job and it is the part that never got enough hours.

![A senior node routing knowledge into a skills library that serves several practitioner nodes, while a separate wide path leads from the senior toward a strategy horizon rather than a review queue](/images/2026/08/floor-ceiling-payoff.png)

And you have not quietly capped somebody's career on their way in the door.

I keep coming back to a question I cannot shake, which is what happens when somebody interviews and tells me that ninety-five percent of what they do is agents, they have workflows and AI, and they do not really write DAX anymore. Am I hiring that person? Am I letting that become the standard process on my team? I genuinely do not think we know the answer yet, and I am suspicious of anybody who says they do.

What I do know is that one thing in this story is not moving. When a senior sits with a stakeholder, that stakeholder has to be able to trust what they are hearing. You can prompt an artifact into existence. You cannot prompt your way into being believed in the room, because eventually somebody asks a follow-up question and you either know or you do not.

## How to Navigate This

Nobody has run this experiment long enough to have data, so here is what I would actually do, starting now.

1. **Sequence the tooling, do not withhold it.** This is not about keeping agents away from new people. It is about what comes first. Fundamentals, then tooling, in that order, and be explicit that the tooling is coming so it reads as a path rather than a punishment.
2. **Run the read-back test this week.** Put a trap measure in front of everyone on your team, junior and senior, and have them explain what it returns and why. You will learn more about your bench in twenty minutes than in a year of status meetings.
3. **Write your question bank down.** Pull the five questions you always ask when reviewing a model and put them in a document. That file is the most transferable thing you own, and it is also the seed of a genuinely useful custom agent.
4. **Teach the model before the measure.** If somebody cannot draw your star schema on a whiteboard, DAX training is premature. Most bad DAX is a modeling problem wearing a costume.
5. **Give seniors real hours for knowledge transfer.** Not "when you have time." Actual scheduled time to turn what they know into skills and agents. If it is not on the calendar it is not happening.
6. **Protect the reps.** Find the work that is genuinely instructive and deliberately keep it human for a while. Not all of it. The parts where the lesson lives.

## Takeaways

- The raised floor is real and worth having. Somebody new can do useful work against a semantic model on day one, and that is a genuine gift, not a threat.
- DAX is the most dangerous place in this stack to be confidently wrong, because a wrong measure renders a perfectly reasonable-looking number and nothing flags it.
- Reading code and writing code used to be the same skill. That link broke, so review instinct no longer comes free with the job.
- Three gates before the tooling, in order: semantic modeling, filter and evaluation context, then how Power BI wants calculations to run.
- The gate is a series of tests plus time working together, not a certificate. The cheapest good test is handing somebody DAX and asking them to explain it back.
- Do it in that order and the agent becomes an organizational asset: fewer tokens, less senior review time, and a career you did not quietly cap.

**Key takeaway:** this week, take one deliberately broken measure, put it in front of your team, and ask them to tell you what it returns and why. Whatever you learn from that is your actual training plan.

You can direct the orchestra because you played in it. The podium got a lot easier to reach, and the ear still takes years. If you are figuring out how to sequence this for your own team, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
