---
title: "We Need Leadership to Build the Wireframe"
date: 2026-11-13T09:00:00Z
permalink: "2026/11/13/leadership-builds-the-wireframe"
description: "Leaders can now prototype dashboards and apps with AI. BI teams should ask for those wireframes. It's the best opening the relationship has had in years."
featured: /images/2026/11/leadership-builds-the-wireframe-banner.jpg
draft: false
tags:
  - business-intelligence
  - data-culture
  - adoption
  - ai-agents
  - reporting
  - power-bi
series:
  id: when-leadership-builds
  title: "When Leadership Builds"
  part: 1
  partTitle: "Leadership Builds the Wireframe"
source:
  episode: 583
  title: "When Leadership Builds - Part 1"
  notion: "https://app.notion.com/p/406e74c69c1880aca144ee6da9dbe4c6"
  transcript: "transcripts/ep-583.txt"
---

Lately, a few of my clients' leadership teams have started sending me pictures. One look and I can tell where they came from: ChatGPT or Claude. They're mockups of a report, and some of the features in them are things Power BI can't do natively. The message that comes with them is roughly: some of this is crazy and probably can't be done, but this is the idea.

My first reaction was that this is a strange place for our industry to be. The spec now arrives as generated screenshots.

My second reaction: I've been asking for EXACTLY this for years.

A leader with a Claude or ChatGPT subscription can now say "I'd love to see something that does X, Y, and Z" and get back a working dashboard, sometimes a full working app. No VS Code, no Cursor. So here's my position: **BI teams should be asking leadership to build those wireframes, on purpose, starting now.** It's the best opening the relationship between leadership and data has had in a long time, and a BI team that only reacts to it is going to lose ground.

![A leader at a laptop on the left sends a rough wireframe of a report layout along a dotted path to three BI team members on the right, who hold up a finished report page with a bar chart, a line chart, and a donut chart, connected to a row of table cards below](/images/2026/11/leadership-builds-the-wireframe-banner.jpg)

## The relationship was an acquaintance

Here's my read, and I know plenty of people will push back on it. In most organizations I've worked with, leadership and the data team had an acquaintance. Friendly, but not close. Unless you were the CTO, data wasn't in the room much.

If the BI team wanted leadership to understand what it did, it had to campaign for it. I mean that almost literally. We ran something close to a midterm campaign to prove our value: here's the work behind the numbers, and here's why we're more than the IT group that pipes data into nice reports.

The way we worked matched the relationship. Leadership gave us a bird's-eye view of what they wanted: "we need something that shows this." The BI team translated that sentence into a design, picked the visuals, guessed at the interactions, and brought back a first draft. Translating was the job, and most of the time went there.

![Two lanes. In the top lane, a leader's vague thought cloud travels along long, wandering dotted lines toward a group of BI team members. In the bottom lane, the same leader holds a wireframe of a report and one short straight line leads to a finished report page with a bar chart](/images/2026/11/leadership-builds-the-wireframe-translation.jpg)

## The spec changed shape

Back to those screenshots. The leaders who made them did something I could never get out of a requirements meeting. They had already been through the refinement. They prompted, looked at the result, changed their minds, and prompted again. By the time the pictures reached me, they'd finished arguing with themselves.

So I built from them. Using the Power BI Desktop Bridge, I replicated what they'd designed in a real Power BI report, and it took a lot more than bar charts. They kept everything Power BI already gives them, too. (If you want the mechanics of getting an agent and the Bridge to build from a spec, I covered that in [Same Prompt, Two Reports](/2026/10/02/same-prompt-two-reports/).)

Those pictures were useful because of the refinement behind them. A leader who shows up with a wireframe has already done the slowest, most frustrating part of our process for us. Nobody on a BI team should feel threatened by that. We've wanted it for as long as I've been in this field.

## Let them own the refinement loop

I've been reading about how the iPod came together. (Yes, another Steve Jobs story. I can't help myself.) As the story goes, the team finished a stage every Friday and handed it to Jobs. Over the weekend he came back with what he liked and what he didn't. One note was about the wheel: it should move faster the faster your finger moves. You only get that kind of feedback from the person who'll use the thing, with it in their hand.

Compare that to how feedback has moved between leadership and BI. A leader opens a report and wants the button in the top right, or wants it to say thank you. That's a ticket. Someone picks it up, changes it, republishes, and asks for another look. That loop never worked for leadership. It's too slow for the small, constant feedback that makes a tool good.

With AI, a leader can run that Friday-to-Monday loop on their own, as many rounds as they want, in one evening. Let them. The person who will live with the report does the refinement, and does it before BI writes a single measure. By the time it reaches us, it has already been through the rounds that used to take weeks.

I'd go a step further and train them. The better a leader gets at iterating with an agent, the better the wireframe that lands on your desk.

![A leader and an agent node sit inside three dotted rings with four wireframe cards around them, each a little more complete. One line leaves the loop carrying a finished wireframe to a group of BI team members beside a report page, while a faint, slow dotted loop of ticket cards runs along the bottom](/images/2026/11/leadership-builds-the-wireframe-refinement-loop.jpg)

## Curiosity is the investment

None of this happens everywhere. It depends heavily on the person in the leadership seat and how willing they are to test things themselves. Some organizations are still at "use AI if you like, on your own subscription." In others, leaders are grabbing their own Excel files and building exactly the app they want. Informally, with no AI program around it at all.

The second group is where the relationship can change.

Remember the first time an agent did something that made you stop and stare? I still get that. One of the reports I'm proudest of right now looks like a Fabric app. It's Power BI, built with agentic tooling, and it changed what I think my own work can be.

A leader can have that same moment. Say they build an app to manage everyone's budget and realize they don't need the spreadsheet anymore. The next thought, if we've done our job, is: if I can do this, what could my BI team do connected to our actual data? That thought is the investment. It puts the BI team in the leader's head as a partner in whatever gets built next.

## Hot or cold

There isn't a comfortable middle here. Either the relationship gets close, with leadership feeding you wireframes of everything they've built and you building the real version from them, or it drifts.

Drift looks like this: leadership builds dashboards and apps, and nobody walks over to ask whether the thing could live in Power BI. People take the path of least resistance. (That one belongs on a T-shirt.) They build because they can and because it's fast.

So the path that runs through the BI team has to be the easy one. That's the next part of this series. For now, asking for the wireframe is how you start. A leader who knows BI wants the prototype has a reason to send it.

## The icy mountain

My wrestling coach used to say that every day you're on an icy mountain. You're either climbing it or you're sliding down it. Nobody stands still on ice.

I keep coming back to that line. A leader's curiosity about AI is a handhold. The BI team that grabs it can climb somewhere it has rarely been: more value delivered, a working relationship with the people setting direction, and real influence on the company's data culture. The BI team that waits to see what leadership does, and then reacts, is sliding. I don't think a status quo exists here.

If I were still a director of BI, I'd be booking time with my leaders this week, and I'm not kidding. I'm a consultant now, so I'm having this conversation with my clients instead. I want to know what leadership is testing with AI themselves, beyond what they've announced to the team.

![A figure climbs a dotted path up an icy mountain toward a bar chart and a cluster of connected nodes at the peak, while a faint second figure slides down the slope below](/images/2026/11/leadership-builds-the-wireframe-icy-mountain.jpg)

## The conversation to have this week

If you already ask leaders [what keeps them up at night](/2026/08/10/what-keeps-you-up-at-night/), this is the follow-up: what have you been building to fix it? If you have a relationship with your leadership team, here's how I'd run it.

1. **Ask if they're using AI right now.** Most will say yes. Take that as good news.
2. **Ask to see what they've built.** A screenshot of a dashboard they made in Claude is a requirement. Treat it like one.
3. **Offer to build from it.** Something like: "If you're building dashboards, send them over. We can build the real version for you faster off your prototype."
4. **Save governance for later.** If your first line is "stop, you'll break data governance," the conversation is over. Open with how their prototypes help the BI team and everyone else who uses the data.
5. **Help them get better at it.** Show them how you'd iterate on a layout with an agent. Better prototypes mean less translation on your end.

Have this conversation now. Every week leaders build without it, more of their work happens somewhere you can't see.

## Takeaways

- Leaders can build working prototypes with Claude or ChatGPT today, no developer tools required. That's the wireframe BI teams have wanted for years.
- Build from the prototype. The refinement the leader already did is the part you could never get from a meeting.
- Let leadership run the refinement loop with AI. A ticket for every button change never worked for them.
- Encourage their curiosity. Leaders who send you wireframes pull closer to the BI team, and leaders who don't drift away from it.
- You're on an icy mountain, and reacting is sliding.

**Key takeaway:** this week, ask one leader whether they're building anything with AI, and ask to see it. If it's a dashboard, offer to build the real version from their prototype.

My prediction: within a year, the best requirements document a BI team receives will be a prototype a leader built on a Sunday night, and the teams that asked for it will be the ones building the real thing. Next in this series, I'll get into what happens when the prototype never makes it to you. Keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
