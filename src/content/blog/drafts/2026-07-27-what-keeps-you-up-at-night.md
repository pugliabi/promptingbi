---
title: "What Keeps You Up at Night? Getting Executives and BI Teams to Speak the Same Language"
date: 2026-07-27T09:00:00Z
permalink: "2026/07/27/what-keeps-you-up-at-night"
draft: true
description: "Stop trying to educate executives on data. One question, real buy-in, and a reporting cadence anchored to their goals builds the shared language."
featured: /images/2026/07/what-keeps-you-up-at-night-banner.png
tags:
  - reporting
  - business-intelligence
  - data-culture
  - data-visualization
  - power-bi
source:
  episode: 541
  title: "Helping Leaders Speak Data"
  notion: "https://app.notion.com/p/368e74c69c18804aa729d4a7e0f51e86"
---

Here's a moment that still jars me every time it happens. I sit down with an executive and ask what's bothering them about the business. They tell me. Clearly, specifically, sometimes passionately. Margins on the new product line. A hiring plan that outran revenue. Whether the sales team is chasing the right accounts. Then, in the very same meeting, they hand me a report request that has NOTHING to do with any of it. Eighteen asks, all shortcuts, none of them connected to the thing they just told me keeps them up at night.

There's a disconnect here, and most BI teams respond to it the wrong way: they try to educate the executive, with data literacy decks, lunch-and-learns, and patient explanations of what a semantic model is to someone who stopped listening at "semantic."

My position is simpler. **You don't teach executives to speak data. You make data speak executive.** The shared language gets built when every report your team ships is anchored to a goal the leader already owns, and when that alignment becomes a habit instead of a one-time meeting.

## The Request Is Not the Requirement

Most executive report requests are born somewhere other than the data. They saw something in another company's board deck. They half-remember a chart from a conference. Their design wish is a copy-paste from a Google image search, not a connection to their own data. That's a diagnosis, not an insult. They're asking for artifacts because nobody has ever tied reporting to the things they're actually measured on.

This shows up in ways that still surprise me. A partner of mine is working with a company in the middle of a merger, two workforces becoming one. He had to be the one to suggest a dashboard showing utilization across the combined staff. How does an executive steering a merger not think of that on their own? It's not a lack of intelligence. Plenty of leaders still run on hunches and twenty years of experience, because hunches and experience are what got them the corner office.

I spent the early years of my Power BI career bending the knee to the C-level. The standing rule on our team was: we're not doing everything, but if the request comes from a title that starts with C, you say yes and you build it. One of those requests sent a junior developer, who didn't know SQL, into the office three nights in a row to build a report in SSRS, because SSRS was what the executive had asked for. Nothing about that report moved the business. It satisfied a preference.

And executives ARE measured on something. Someone, somewhere, is getting a bonus based on a number. That means every leader in your building is already motivated to move the company in a specific direction. The raw material for a shared language exists. It's just never been connected to your backlog.

![An executive silhouette with a tangled cloud of disconnected report requests on the left, and a single flowing line resolving into clear metric nodes and a chart on the right](/images/2026/07/what-keeps-you-up-at-night-disconnect.png)

## Four Things a Shared Language Needs

When I look at the teams where leadership and BI genuinely speak the same language, four things are always true, and a literacy deck only addresses one of them.

**Data culture** is the set of shared expectations: where we go to find data, who is responsible for what, what we trust. **Data literacy** is the ability to read what you're given and to know what to ask for. A leader who can define their own metrics, who knows what a marketing lead is versus a sales lead and how each one moves the business, can hold a real conversation with a BI team. **Cognitive load** is the one everybody forgets. Every new visual and every new metric costs your audience processing power. If I add a running total to a report, I owe the audience an explanation of what it represents and what it impacts, or I've made the report harder to read, not smarter. Teaching is part of shipping. And **buy-in** is the belief that data is worth acting on at all.

Those four together are what lift an executive team. Training attacks literacy and ignores the other three, which is why it so rarely sticks. Buy-in and culture move first, and they're built in conversations, not classrooms.

![Four small circular nodes in a vertical column on the left, each holding a distinct thin-line icon, with flowing connector lines converging into one large shared speech bubble containing a simple bar chart on the right](/images/2026/07/what-keeps-you-up-at-night-four-areas.png)

## One Question Beats a Literacy Deck

You can't walk into the CFO's office and ask, "So, what are your goals this year?" That question works on a direct report. Pointed at an executive, it lands somewhere between naive and insulting.

So I ask a different one: **what keeps you up at night?**

That question does two things the literacy deck never will. First, it's pure empathy. You're not auditing them, you're listening to them. Second, it hands you their real objectives in their own words, which is exactly the vocabulary your reporting should be written in.

Then tease out the HOW, because that's what turns a good conversation into a useful one. "We need to increase revenue" is not a direction, it's a wish. Nobody will argue with revenue up and costs down; I could walk into any organization on earth and get agreement on that. The real question is what actions leadership believes will get there. More money out of the largest customers? Doubling down on existing accounts? A push for brand-new logos? Each of those is a completely different set of reports. When a leader tells you which levers they believe in, they've just written your BI roadmap for you. They own it. You just have to build toward it.

## Anchor Every Report to a Stated Goal

The moment my own career changed, the first company where I watched a data culture actually mature, was when leadership defined goals for the quarter and the year, and the BI team adopted one rule: **we only work on projects that align with one of those goals.**

That single rule rewires every conversation. A request comes in, and instead of "how fast can you build it," the question becomes "which goal does this support?" Suddenly you and the executive are speaking the same language, because every sentence starts from the same place.

One prerequisite: the goals have to exist. I keep running into companies where they don't, not really. "We want sales to go up" is not a goal, and nobody can organize a backlog around it. A healthy company knows the metrics that matter to it, and to each team, BEFORE it worries about platforms, licenses, or which visual to use. If leadership hasn't defined that yet, the alignment conversation is where it finally gets forced into the open. I've made the longer version of this argument in [step zero before the Fabric Adoption Roadmap](/2026/07/27/step-zero-before-the-fabric-adoption-roadmap/).

The alignment rule also exposes the busywork. Someone in marketing wants to see every email and every subject line the team sent. Can we build that? Sure we can. But if it doesn't support what the marketing executive said that team is trying to achieve, what are we doing? We're spending our most limited resource, the BI team's time, on something tedious that moves nothing. And alignment gives you a way to say no without ever saying the word no. You ask for clarification instead: help me understand how this gets us to the goal you told me about.

![A single goal flag node at the top with flowing connector lines fanning down to a row of aligned report cards, while one disconnected report card sits apart with a dotted, broken path](/images/2026/07/what-keeps-you-up-at-night-alignment.png)

## Do Not Go Rogue

Now, a warning before you sprint off to book time with your CFO. If you're an analyst or a BI manager, you almost certainly cannot do this alone. "Hey, I'm meeting with you today, just me, no agenda anyone approved" is how careers get shortened, not how languages get built.

The move is buy-in first. Talk to your boss. If your boss has a boss, get them in too. Frame it as an initiative, not a meeting: "We're starting something for the new year. We want every report the executive team sees to align with the goals of the company." Now when you sit down with a leader, you're not a rogue analyst with a calendar invite. You're the face of a company-wide effort, and that changes how everything you say is received.

Inside the meeting itself, keep the script concrete. You say you want more revenue, and you oversee the marketing team. What is that team trying to achieve to get there? They have responsibilities and they have insight, so let them talk. Then close with the promise: every report you see from us is going to align with what you just told me. Now the reporting carries personal stakes for them. The dashboards they open trace back to the products they're launching and the accounts they're chasing.

The sell is easier than you think, because I guarantee the executives have pain points with reporting right now. If your analysts are wishing leadership spoke the language of data, leadership is wishing the reports actually told them something. Both sides are frustrated with the same wall. Offering to tear it down is a win-win.

The bigger prize is **authority**. When every report you ship traces to a goal the executive stated out loud, the BI team stops being the group that builds apps and becomes a strategic part of how leaders do their jobs. Authority turns into budget, headcount, and leverage the next time priorities collide.

## Consistency Is the Language Course

One good meeting doesn't make a shared language, the same way one good lesson doesn't make you fluent in Italian. Fluency comes from living in the house where the language is spoken every day, not from the phrasebook.

So build the immersion. After that first alignment conversation, I tell the executive: every two weeks, you'll hear from me on the progress of exactly what we talked about. Those check-ins become the goals of the BI team itself. Proactive communication, on a cadence, in their vocabulary, about their goals.

Expect drift, because drift is the default. Leadership changes, a new priority lands, and the North Star everyone agreed to in January is a vague memory by June. Alignment never maintains itself; the cadence is the energy you keep adding to hold it in place. That's why the biweekly progress notes get paired with a quarterly check where the goals themselves get restated, on the calendar, whether or not anything feels broken.

Do this and budget loosens, doors open, and you accumulate the leverage to get things done the way they need to get done. Skip it, and you're swimming upstream on every request, forever. You either have that leverage or you don't, and the cadence is what buys it.

![A repeating circular cadence loop connecting a conference table node and a dashboard node, with each cycle of the loop stepping upward like a staircase](/images/2026/07/what-keeps-you-up-at-night-cadence.png)

## The Playbook

If you want to run this at your company, here's the sequence I'd follow:

1. **Get buy-in above you first.** Your boss, and their boss if there is one. Frame it as a company initiative to align reporting with company goals, timed to a new year or a new quarter.
2. **Book the conversations, not the requirements sessions.** One leader at a time. Open with what keeps them up at night. Do not bring a backlog.
3. **Tease out the levers.** Take each fuzzy goal and ask how: which customers, which products, which team actions. Write down the levers in their words.
4. **Adopt the alignment rule.** Every report request gets mapped to a stated goal before it gets built. Requests that map to nothing get a clarifying question, not a build slot.
5. **Set the cadence.** Progress updates every two weeks to the leaders you met with, in their vocabulary, tied to their goals.
6. **Re-anchor quarterly.** Goals drift and leadership changes. Put a recurring meeting on the calendar where the goal list gets restated, and remap the backlog to whatever moved.

None of this requires a new tool, a new license, or a single line of DAX, which is probably why it gets skipped.

## How You Know It's Working

There's a moment I look for, and I've mentioned it for years. You're walking to get your coffee, you pass a conference room, and leadership is in there mid-meeting with a Power BI dashboard up on the screen. Nobody from the BI team is presenting it. They're arguing from it and making decisions with it.

That's fluency, and no literacy workshop ever gets you there. Alignment, buy-in, and cadence do.

Power BI adoption can absolutely grow from the bottom up. But real success comes from the top down, and the top only leans in when the reporting speaks THEIR language. Here's my prediction: over the next few years, as agents make report building dramatically cheaper, the scarce skill in BI won't be building at all. It will be alignment. The teams that master this conversation will be the ones deciding what gets built, and everyone else will be taking orders again.

## Takeaways

- Executives ask for artifacts when reporting was never tied to what they're measured on. The request is not the requirement.
- A shared language needs four things: data culture, data literacy, managed cognitive load, and buy-in. Training only addresses literacy.
- Don't ask leaders for their goals. Ask what keeps them up at night, then tease out the levers they believe will fix it.
- Adopt one rule: no report gets built unless it maps to a stated goal. It's how you say no by asking for clarification.
- Get buy-in from your boss and their boss before you meet any executive. Initiative first, meetings second.
- A two-week progress cadence in the leader's vocabulary is what turns one good meeting into a shared language, and leverage for your team.

**Key takeaway:** this week, ask one leader what keeps them up at night, and map every open request from their team against what they say. The mismatches are your conversation starters.

If this got you thinking, stick around PromptingBI. And if you'd rather hear these ideas argued out loud, come join us on the Explicit Measures podcast.
