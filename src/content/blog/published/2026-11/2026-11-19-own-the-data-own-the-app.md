---
title: "The Team That Owns the Data Should Own the App"
date: 2026-11-19T09:00:00Z
permalink: "2026/11/19/own-the-data-own-the-app"
description: "If BI owns the pipeline, OneLake, and the source of truth, BI should build the apps leadership needs. Widen the services, market the team, maybe rename it."
featured: /images/2026/11/own-the-data-own-the-app-banner.jpg
draft: false
tags:
  - business-intelligence
  - microsoft-fabric
  - ai-agents
  - data-culture
  - adoption
  - governance
series:
  id: when-leadership-builds
  title: "When Leadership Builds"
  part: 3
  partTitle: "Own the Data, Own the App"
source:
  episode: 584
  title: "When Leadership Builds - Part 2"
  notion: "https://app.notion.com/p/406e74c69c18800eb8cbca689d905c72"
  transcript: "transcripts/ep-584.txt"
---

I ended [the last part of this series](/2026/11/16/no-flat-ground/) with a question I haven't been able to put down. If the BI team owns the pipeline and Fabric is the backend, why does BI only own the reports?

Say the conversation from that post went well. You asked a leader what their team has been using, they showed you the budget app they built in Claude, and they agreed to connect it to live data in Fabric. Great. Now somebody has to build the real version.

Who?

In most organizations, it has never been the BI team. An app meant a ticket to the software team, the people who've been writing JavaScript for 20 years. Or it meant another license for another service.

My position: **the team that owns the data should own the app.** If BI built the pipeline, knows where every table lives, and controls the source of truth, BI should be the app developer and the solution provider for whatever the business needs on that data. That means widening what the BI team offers, telling the organization about it, and maybe changing the team's name. For me, it's evolve or die.

![A leader at a laptop on the left with a small app window. Two paths run right from it: a long dotted path climbing to a distant block of code brackets beside a license card, and a smooth solid path down to three BI team members standing on a round lakehouse platform with the finished app window, linked to table cards below](/images/2026/11/own-the-data-own-the-app-banner.jpg)

## Why apps went to the software team

The old handoff made sense. Building an application used to mean a whole separate discipline: a front end, a back end, hosting, sign-in, deployment. A BI team that took all that on would be running a second job. So reporting stayed with BI, and anything with a button that did something went to the software team.

Two things changed. Agents write the app code now, and right now they're [better at apps than at reports](/2026/11/04/the-agent-builds-the-app-faster/). And Fabric became a backend: the data, the security, and the application can all live in the platform the BI team already runs. I made the case for [Fabric as a backend](/2026/10/05/fabric-is-best-as-a-backend/) already, so I won't redo it here. This post is about who owns what gets built on it.

## The keys of the kingdom

Here's what I'd say to a leader: anything you need, on any of the data we already have in Fabric, we can build.

Think about the work it took to get there. Getting your data into secured, trusted databases. Making sure all the systems relate and talk to each other. The BI team did that work, and we understand the result better than anyone else in the building. It has never been easier to connect to that data, and that now includes applications.

That's the keys of the kingdom: **OneLake**. We understand it, we connect it, and we can build the report, the dashboard, the application, or the link to a system the company already bought. We can do it quickly because we understand the pipeline and we control the source of truth.

Hand the same app to a software team and the first thing they need is what we already know: where the data lives, and which table to trust. That knowledge is the hard part of the build. It's already sitting on the BI team.

![A large solid key on the left. Its blade fans out into four dotted lines that end at a report page with a bar chart, a dashboard grid, an app window, and a plug for a system the company already owns](/images/2026/11/own-the-data-own-the-app-keys.jpg)

## In-house first

So when the budget app is ready to become real, my answer is: let's see if we can do this in-house. You don't have to hand it to a software team. You don't have to buy another license or service. We already run Fabric as the backend, and the data the app needs is already there, secured.

This is the last step of the path from the first two parts. A leader builds the prototype. BI asks to see it. The prototype gets connected to live data and goes through the governing process. Then the team that did all of that builds the production version, and nobody has to pass it to a third group that learns the data from scratch.

## The jump is bigger for BI

When software teams talk about how agents changed their work, I remind myself they were building apps before AI. They added agents to a job they already knew. A BI team moving into agentic app development is making a much bigger jump, and I won't pretend otherwise.

I don't think that changes the answer. What's new is the backend. We never had a place where the same data serves the report and the application, with security the BI team already set up. A few years ago, a BI team building apps meant standing up infrastructure nobody on the team had touched. Today that infrastructure is the platform we already own. That's why now.

## Reports stay the default

A couple of weeks ago I argued that [the agent builds the app faster, and that doesn't make it the deliverable](/2026/11/04/the-agent-builds-the-app-faster/). I still believe every word. When the job is reading the number the organization agreed on, build the report.

Owning the app means something narrower. When a request really does earn an app, because the job is an action, the audience is outside your tenant, or different people need different screens, the BI team builds it. The research garage still applies. So does the test for whether something deserves to be an app, and so does the reader's learning cost.

![A funnel full of request cards on the left splits into two lines: one leads to a tall stack of report pages with bar charts, the other to a single app window sitting on a lakehouse platform beside three BI team members](/images/2026/11/own-the-data-own-the-app-report-or-app.jpg)

## Market the team

I think we need to promote and market the BI team.

Ask most leaders what their BI team does and you'll hear some version of: they build reports, and they're really good at it. That description is out of date. A BI team on Fabric can build anything agentic on the organization's OneLake data, and leadership needs to hear that from us.

If they don't, they'll keep doing what [part 2](/2026/11/16/no-flat-ground/) described: building on their own in Claude, on an export, and never thinking to call you. Or they'll take it straight to the software team, because that's where apps have always gone. Nobody brings a request to a team they don't know offers the service.

So write the services down and say them out loud. The first name I floated for what the department should market was **ABI, agentic business intelligence**: anything agent-wise, on the data we already own.

## Drop the name?

Then I went one step further, and I'll admit it might be the hottest take of 2026. I think we may need to drop the name "BI team."

ABI was my first try. The one I keep coming back to is **SI, solutions intelligence**, or just the solutions team. Solutions feels right. It says the team solves problems with the data, whatever form the answer takes.

I don't insist on it. Whatever you want to call us. I do think the name matters more than it looks, because the name tells a leader what to bring you. "Business intelligence" says reports. If the team builds apps and connects systems too, a leader holding a prototype needs a reason to think of you first. A new name is one way to give them that reason. A service list they've actually seen is another. Do at least one.

We're at an inflection point for BI, or SI, or whatever we end up calling it, and leadership's curiosity about agentic tools is what's pushing us there.

## Evolve or die

For me, it's evolve or die at this point. I mean the services the team offers.

Leaders are building apps with Claude. Software teams are building apps with agents. If the BI team stays reports-only while both of those happen, the team that knows the data best ends up maintaining the reports everyone else stopped opening. The data still runs through your pipeline, and the work built on it happens without you.

Evolving means keeping the same pipeline and the same source of truth, and building a lot more on top of them.

![Three lakehouse platforms left to right, joined by a dotted path. The same three-person team stands on each: first with one report, then with a report and an app window, then at the center of a hub linking reports, an app, and plug connectors to other systems](/images/2026/11/own-the-data-own-the-app-evolve.jpg)

## Start widening this week

1. **Write the service list.** One page, plain language: reports, dashboards, applications, and connections to systems the company already owns, all on data in Fabric.
2. **Find the last three apps the business got somewhere else.** A software team build, a new license, a leader's Claude app. For each one, ask whether it ran on data that's already in Fabric.
3. **Make in-house first the default offer.** Before anyone files a request with another team or buys a service that reads your data, the BI team gets a look.
4. **Keep the app test.** Ask what the user does after they look at it. If the answer is "read it," build the report.
5. **Pitch it to one leader.** Start with the one who already showed you a prototype. Show them the service list, and if you're feeling bold, the new name.

That wraps the series. Ask leadership for the wireframe, go find the prototype that never came to you, and then own what gets built from it.

## Takeaways

- If BI owns the pipeline, OneLake, and the source of truth, BI should own the apps built on that data as well as the reports.
- With Fabric as the backend, an app doesn't have to go to a software team or a new license. Try in-house first.
- The jump into app development is bigger for BI than for software teams. The backend is why it's worth making now.
- Reports stay the default. Owning the app means BI builds it when an app earns its place.
- Market the team. Leaders won't bring app requests to a team they think only builds reports.
- Consider a new name. ABI and SI are my candidates, and "solutions" is the word I keep coming back to.

**Key takeaway:** this week, write a one-page list of everything your BI team can build on your Fabric data, and show it to one leader.

My prediction (a speculative one): within two years, a lot of BI teams will have a different name on the org chart, and the ones that kept "BI" will spend a lot of time explaining everything else they build. Keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
