---
title: "Before the Fabric Adoption Roadmap, Run the Step-Zero Test"
date: 2026-07-30T09:00:00Z
permalink: "2026/07/30/step-zero-before-the-fabric-adoption-roadmap"
draft: true
description: "Adoption roadmaps and governance programs keep failing at companies that never defined what they measure. Run the step-zero test before you invest in any framework."
---

A partner of mine is helping two companies through a merger. He suggested a dashboard showing staff utilization, since two workforces were about to become one. Leadership's response: what a great idea. It had not crossed their minds.

How do you not think about that as an executive?

I keep coming back to that question, because it explains why so many adoption programs go nowhere. My position is simple: **adoption frameworks and governance programs fail at companies that never defined what they measure.** Before any roadmap, run what I call the **step-zero test**: does leadership have real objectives and key results, with defined measures of success for every team? If the answer is no, stop. No framework can help you yet.

## The Roadmap Is Step One. Step Zero Comes First.

Let me be clear about what I'm NOT saying. Microsoft's **Fabric adoption roadmap** is genuinely useful guidance. It gives you a published standard to baseline your organization against, from governance to data culture. And per Microsoft's own guidance, the number one success factor for Power BI in an organization is an executive sponsor who understands it and puts resources behind it. I don't argue with any of that.

But the roadmap is step one. And a lot of companies are not ready for step one.

Step zero is a blunter question. Does this company even have **OKRs**, or some semblance of them? Not a mission statement. Not a slide that says "growth." Actual objectives with key results that real people are measured against. Here's what I've found personally: companies that never bought into analytics usually never bought into expectations around what they're trying to measure in the first place. The dashboard problem is downstream of the definition problem.

## "We Want Sales to Go Up" Is Not an OKR

"We have a KPI. We look at sales. We want sales to go up."

That's not an OKR. That's a wish. Nobody owns it, nothing downstream can act on it, and no report can support it.

A healthy company understands two things before any infrastructure conversation happens. It knows the metrics that matter to the company, and the metrics that matter to each team for that team to do its job. Every person can answer: what am I measured against? And what does my team need to accomplish for the company's goal to happen?

I know this sounds like your Business 101 course. But get out into the real world, my friend, and an uncomfortable number of companies are failing at it.

Notice what the test never asks about: technology. The step-zero test is completely technology-agnostic. If a company passes, the answer could even be SSRS. When leadership knows exactly what success means and every team knows what supports it, the tooling is a detail. And if a company fails, no amount of Fabric capacity fixes it. That's what makes it a diagnostic. It tells you whether the expensive treatment will even take.

It's why I struggle when governance is the first conversation. If leadership never asks "what are we measured against," how in the world are we going to introduce governance to them? Certified datasets and endorsement policies for metrics nobody defined? That's organizing the library for a company that hasn't learned to read.

## Bending the Knee

Early in my Power BI career, my team had a literal rule: we're not doing everything for everyone, but if the request comes from someone whose title starts with a C, you just say yes and do what they ask. Bending the knee to the C-level was policy.

Plenty of those executives were great. A few made asks that had nothing to do with business value. At one point an executive wanted a report and specifically wanted it in SSRS. The request landed on a junior developer who didn't know SQL yet. That developer spent three nights in a row at the office building it, because that's what the executive wanted. (SSRS is not the villain here; it can pass the step-zero test just fine. A demand with no value attached is the villain.)

Two failures live in that story. An executive who doesn't speak data, making a technology demand instead of a value demand. And a team with no standing to push back. Could we have said no? Please. I can't go in and just tell an executive no, and neither can you. Without an agreed set of goals to point at, "no" isn't available. Neither is "how does this support what you're trying to do?" All that's left is yes, and three nights at the office.

That's the real cost of skipping step zero: a BI team burning its best hours on requests that were never connected to anything.

## Why Executives Don't Speak Data

When leadership and BI teams talk past each other, I look at four areas.

- **Data culture**: the defined set of expectations. Where do we go to find data? Who is responsible for what? What do we rely on?
- **Data literacy**: the ability to read data and know what to ask for. I can define my metrics, so I can communicate them. Sales leads, marketing leads: we all agree on what those words mean and what they impact.
- **Cognitive load**: every new visual and every new metric taxes your audience. Introduce a running total and people have to process what it represents and why it matters. Executives feel that tax more than anyone, and they'll never tell you.
- **Buy-in**: we actually believe in the power of data, and we are going to use it.

Those four together are what elevate an executive team. And here's the uncomfortable part for those of us who love grassroots adoption: Power BI can come from the bottom up, but real success comes from the top down. You can build the best semantic model in the tenant. If the people at the top never defined what winning means, you built it for an audience that can't hear it.

## The First Time I Saw It Work

Everything changed for me at the first company I worked at where the data culture actually matured. The shift wasn't a tool. It was a habit: the company defined its goals for the quarter and the year, and the only projects we worked on were the ones aligned to one of those goals.

That single habit rewired every conversation. The question stopped being "who asked for it?" and became "how does this report, this model, support the goal the company is trying to hit?" Someone in marketing wants a report of every email and every subject line to help increase emails. Sure, we CAN build that. But if it doesn't support what marketing is actually trying to achieve, what are we doing?

That question, asked consistently, is what speaking the same language actually looks like. Not executives learning DAX. Alignment.

## How to Run the Step-Zero Test

Here's how I would run this at your company, starting now.

**1. Ask the step-zero questions.** Quietly, honestly, before any roadmap conversation:

- Does the company have defined goals for the year or the quarter, beyond a number that should go up?
- Can each leader say what they are measured against?
- Can each leader say what their team must accomplish to support those goals?
- Can your BI backlog trace each request back to one of those goals?

Four nos means the roadmap can wait. You just found the real project.

**2. Have the "what keeps you up at night" conversation.** When I sit down with an executive, I ask exactly that: what keeps you up at night? Now we can talk the same language, because I know what bothers them and what they're trying to do. Brace for the disconnect, though, because it's jarring: they'll name the thing giving them agita, then ask for 18 reports that are just shortcuts, none of which touch it. Don't get cynical. The gap between what they fear and what they request is your work list.

**3. Get buy-in before you get ambitious.** Do not go roguely meeting with the CFO on your own authority. That's how this dies. Talk to your boss, and your boss's boss if there is one, and frame it as a company initiative: we're starting an initiative for the new year to align our reporting with the goals of the company. Now you're not randomly booking meetings with leadership; you're running a program. And I guarantee executives have their own pain points with reporting today. This is a win-win.

**4. Keep the cadence.** After each conversation, send a progress update on what you talked about every two weeks, especially to the C-level. Those goals become the BI team's goals, and the updates prove you meant it.

**5. Collect the payoff.** Do this right and the BI team stops being the people who build apps. You become a strategic part of leadership doing their job. That buys authority, a little more budget, and leverage to get things done the way they need to get done. Skip it and you're swimming upstream indefinitely.

My favorite way to gauge progress costs nothing. Walk to get your coffee. If you pass a leadership meeting and they're gathered around a Power BI dashboard, you're on the right track.

## Start Before Step One

Our industry loves frameworks because frameworks feel like progress. Print the roadmap, book the workshops, schedule the assessment. Alignment is harder and less glamorous, which is exactly why it gets skipped.

Here's my prediction. Building reports keeps getting faster and cheaper; with AI in the mix, a report will soon cost less than the meeting about it. When building costs nothing, the only durable advantage left is knowing what to measure and why. Companies that can state their measures of success out loud will compound that advantage. Companies that can't will simply produce misaligned reports faster than ever.

Run the test before the roadmap. If your company passes, the Fabric adoption roadmap lands on fertile ground; go all in on it. If it fails, you just saved yourself a year of governance theater, and you know exactly where to start instead. If you want more conversations like this one, subscribe to PromptingBI and keep it going with me.

**Key Takeaway:** This week, ask one executive a single question: "What keeps you up at night?" Write down the answer. Then pull their last three report requests and check whether even one connects to it. That gap is your step zero, and it's where the real roadmap begins.
