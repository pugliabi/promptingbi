---
title: "There's No Flat Ground With Leadership Right Now"
date: 2026-11-16T09:00:00Z
permalink: "2026/11/16/no-flat-ground"
description: "Leaders are building their own apps with AI, and the BI relationship goes up or down every week. What the slide looks like, and how to climb."
featured: /images/2026/11/no-flat-ground-banner.jpg
draft: false
tags:
  - business-intelligence
  - data-culture
  - governance
  - ai-agents
  - microsoft-fabric
  - semantic-models
series:
  id: when-leadership-builds
  title: "When Leadership Builds"
  part: 2
  partTitle: "No Flat Ground"
source:
  episode: 584
  title: "When Leadership Builds - Part 2"
  notion: "https://app.notion.com/p/406e74c69c18800eb8cbca689d905c72"
  transcript: "transcripts/ep-584.txt"
---

I was talking with someone in leadership recently and asked what they'd been looking at day to day. The answer was an app they'd built in Claude. They'd been running on it for two or three weeks.

I said what I always say: oh, cool, that's great. What data are you using?

That one question opened up a whole separate work stream, and the BI team wasn't anywhere in it.

I ended [the first part of this series](/2026/11/13/leadership-builds-the-wireframe/) with my wrestling coach's line about the icy mountain: every day you're either climbing it or sliding down it. I want to stay on that mountain for a whole post, because the longer I think about it, the more it describes where BI and leadership are standing right now. Except nobody's standing. I've started calling it **no flat ground**.

My position: every leader who builds with AI moves their relationship with the BI team, every week, one way or the other. There's no level spot where you get to wait and see. Which way it moves depends mostly on whether BI goes and asks.

![A leader at a laptop on the left, with a line running right that splits in two with no level stretch. The upper line climbs to a BI team standing at a table of connected data model cards and a rising bar chart. The lower line drops to a scattered pile of loose spreadsheet pages](/images/2026/11/no-flat-ground-banner.jpg)

## The slide doesn't feel like sliding

Part 1 was the good case. A leader prompts their way to a dashboard and sends you the wireframe, because they know it's a draft. That leader is climbing with you.

The case I'm running into more is different. The leader didn't build a draft. They built something that works, often an application with a few people using it every day. It never reaches anything you'd call a proof of concept, because a proof of concept assumes somebody is going to review it.

Odds are it runs on an export. Most leaders don't have access to the lakehouse or the semantic model, so even when they build something that looks like a Fabric app, it's probably reading somebody's exported file.

And they won't walk it over. Don't expect a leader to show up and say, "I built this budgeting app we're all using. Can you create it in Fabric?" Why would they? It works. If you asked, they'd tell you they don't need a data handoff, because they're already getting what they need.

Drift is black ice. You don't feel the slide until you're already moving.

## What is truth?

The slide gets serious the day that leader starts sharing the app with their team. That's a time bomb, and it goes off one of two ways.

The first is quiet. People stop caring about the reports you already publish. Why open the report when the boss's app already has the number?

The second is loud. A number in Power BI and a number in the leader's app don't match, and somebody has to decide which one is right. What is truth? I can tell you how that goes. The leader trusts the number they built, because they built it, and eventually they'll push for it. That runs against everything we've spent the last 10 years doing with data governance.

Claude, ChatGPT, and Copilot are amoral about all of this. They'll build whatever number you ask for, on whatever file you hand them. Data governance fails right at the moment a leader decides the number they've been using is the true one.

![Two side-by-side windows with the same bar chart, except the last bar on the right is half as tall as the last bar on the left. The left window connects down to a set of linked data model table cards, the right window to a single loose spreadsheet, and a person stands between them with palms up in a shrug](/images/2026/11/no-flat-ground-two-numbers.jpg)

## Show me how you're using it

The fix comes from an old habit of mine.

Back in 2020 or 2021, when I was a full-time director of BI, we held quarterly calls with our sales teams. We'd already done the training and the adoption work, and we'd taught them personal bookmarks. In every one of those calls I asked for the same thing: show me how you're using the report. What do you do with it every day?

One sales team ran their entire day on personal bookmarks. Everything they did in the sales dashboard started from one. When I looked at what the bookmarks were, they were simple filters: their region, their team, their own metrics.

That was a light bulb for me. If you always want the Northeast for your team, that's a measure. I could pre-bake it and show it over time, so nobody had to filter and export every morning. We kept the same semantic model and built a thin report on top with a handful of report measures. That process gave me the most impactful reports I built for my departments and teams.

The sales team had already written the spec. It was sitting in their bookmarks, and I only found it because I asked to watch. I still say a version of that line to clients today: show me the process, and we'll build you a pre-baked solution.

![A wide report page with five bookmark ribbons along its top edge, each dropping to a small filter funnel. Dotted lines from the funnels flow right into one slim report page with a line chart over time and three measure tiles, which sits on a small set of data model cards below](/images/2026/11/no-flat-ground-bookmarks.jpg)

## Ask about the thing they think is finished

Swap the personal bookmarks for an app a leader built in Claude, and you have the same situation with a lot more riding on it. The same move works too. That walk-over isn't coming, so go ask.

The question I'd use: what have you been building with AI, and what has your team been using? Part 1 asked a similar question about the wireframe, the thing a leader knows is a draft. This one asks about the thing they think is finished, and about the team that's using it.

Ask it, and sooner or later you'll hear something like: "We're testing a budget app we built in Claude. Everyone connects to it. It's a little cumbersome."

"A little cumbersome" is your opening. My answer: why don't we connect that to live data in Fabric for you, and put it through the right governing process? Now it runs on the same data as everything else, and the rest of the organization can use it, beyond the one team that built it.

That's the climb. The BI team is back in the process and worth more to that leader than it was before you asked, and the leader keeps building.

![A laptop with a small app window on the left, tied by a frayed dotted line to a single exported file. A smooth line carries the app into a locked lakehouse cylinder and connected table grid in the center, and from there lines fan out to six people on the right, each with a screen showing the same app](/images/2026/11/no-flat-ground-live-data.jpg)

## Give the prototype a path back

Asking works one leader at a time, and the leader you didn't call this quarter is still building. So I want a path that doesn't depend on anyone remembering to ask. I've been calling it **AI P2P: AI prototype to production**. (I'm open to a better name.)

It starts with permission. Build your prototypes, as many as you want. Then I'd install a skill on every team's agent that talks to the BI ticketing system. When someone builds a prototype on data the BI team already reports on, the agent tells them: just so you know, there's already a report on this model. Do you want to submit a ticket with your prototype attached?

That ticket does two jobs. The prototype lands with BI as a spec, so we build from it and nobody ends up maintaining a second version beside ours. And the finished version goes onto the certified and promoted track, where everyone can see what it is and verify the number.

Without that path, people pass random artifacts around. Someone says "just rebuild that in Claude for this week," and a little more of how your company consumes data moves off the governed stack. I want AI P2P on the data governance track from day one, because the prototype can't be the end of the road.

## Start climbing this week

1. **Book a "show me" call with each leader you support.** Ask what they and their team have been using with AI, then ask them to share a screen and use it while you watch.
2. **Ask where the data comes from.** If the answer is an export, you know how far their numbers can drift from the model.
3. **Look for the bookmark pattern.** Whatever they repeat every day is a measure you can pre-bake.
4. **Offer to take the friction away.** "Let's connect this to live Fabric data and put it through the governing process" is an easy yes for a leader whose app is a little cumbersome.
5. **Give their agents a way back to you.** Even a rough version of the ticket skill beats hoping someone sends an email.

Climb far enough and a bigger question shows up. If the BI team owns the pipeline and [Fabric is the backend](/2026/10/05/fabric-is-best-as-a-backend/), why does BI only own the reports? That's the next part of this series.

## Takeaways

- There's no flat ground with leadership right now. Every week a leader builds with AI, the relationship moves up or down.
- The slide is quiet. A leader with a working app won't hand it to you, so don't wait for the handoff.
- Watch people use what they built. The spec is usually hiding in their routine, the way it hid in my sales team's bookmarks.
- When a team's app runs on an export, offer to connect it to live Fabric data and the governing process. The leader keeps building, and the number stays verifiable.
- Give prototypes a path back to BI. A skill on every team's agent can file the ticket for them.

**Key takeaway:** this week, ask one leader what their team has been using with AI, and ask to watch them use it.

My prediction: within a year, the BI teams that ran "show me" calls will be running their company's AI-built apps on live Fabric data. The teams that waited for a ticket will learn about those apps the day two numbers don't match. Keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
