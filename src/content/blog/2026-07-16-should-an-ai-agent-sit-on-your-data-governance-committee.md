---
title: "Should an AI Agent Sit on Your Data Governance Committee?"
date: 2026-07-16T09:00:00Z
permalink: "2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee"
draft: true
description: "AI agents won't lead your data governance program, but they can own its hardest job: transparency. Where to point them first, plus a 30-day plan."
---

Try this at your next leadership meeting. Say the words "data governance" out loud and ask everyone for the first word that pops into their head. I run this exercise with clients all the time, and I get the same two answers back: security and painful. Sometimes both, in that order, with a sigh.

Those answers are the whole problem. If your organization hears governance and thinks "who can see what," you've shrunk a company-wide discipline down to a tab in the admin portal. And now that every vendor deck on the planet promises AI agents that will "do governance for you," that misconception is about to get expensive.

So let me stake out my position early. Agents have a very small role in data governance, and an incredibly essential one. They will not lead your program. They will not replace your committee. But they will do the one job every governance program I have ever seen quietly fail at, and they will do it better than any human ever could. That job is **transparency**.

## Security Is a Feature. Governance Is a Program.

When I stand up data governance at an organization, I preach four pillars from the rooftops. In no particular order:

- **Enablement and empowerment.** Teams can actually find, use, and consume data without begging for it.
- **Promotion of data initiatives.** The organization knows what the priorities are and makes sure they get done, whether that's integrating systems, shipping the right dashboards, or building up the team.
- **Accountability and responsibility.** Somebody owns every step of the pipeline, from the person inputting data to the person transforming it to the definitions everyone reports on.
- **Culture and literacy.** Everyone speaks the same language when they look at the numbers.

Notice what is not a pillar: security. Access control lives inside accountability, but it's a small slice of the picture. Who can see what is a feature. Governance is a program.

Notice also who runs it. Not just the BI team. Governance comes from leadership and from representatives of every department that consumes data, sitting in a room, arguing about pain points and priorities. If I had to guesstimate, 70 percent of a governance program is people work: workshops, committees, interviews, prioritization. None of it happens on a computer (no agents required, just coffee and a whiteboard).

Which raises the obvious question. If governance is mostly people, what exactly are the agents for?

## The Job Nobody Can Keep Up With

Here's the part of governance nobody wants to own: keeping the organization's understanding of its own data current.

What semantic models exist? What reports are out there, who are they for, and what purpose do they serve? What does this measure actually calculate? Which of the three revenue definitions is the real one? Where did this table come from, and what logic shaped it along the way?

That's transparency. It's mundane. It's unglamorous. It's also the raw material trust is made of, because a user who can't answer "where did this number come from" is a user who stops believing the numbers.

And it is nearly impossible to keep up by hand. Tracking what's inside every semantic model, across every team, as it changes every week, is close to an impossible task for a human. I've tried. I once built a document control system in Power Apps to keep definitions current, and it was a losing battle from day one. The catalog was stale before the paint dried.

Transparency is one of those things that is never important until it is suddenly the MOST important thing. The auditor asks how a number is calculated. A new VP asks which of the seven sales reports is the trustworthy one. And everyone looks at the floor.

## Fabric Turned the Web Into a Tangle

It was hard enough when all we had to govern was semantic models and reports. Now add Fabric. Lakehouses. Notebooks. Pipelines. Transformation logic that no longer lives only in Power Query but scattered across workspaces in Spark, SQL, and dataflows.

Every one of those touches is business logic. Somebody decided what gets filtered, how a customer is defined, which records survive the load. That knowledge got baked into code, and code doesn't explain itself to your consumers.

There's a second tangle too: governance now serves two audiences. The architecture team needs lineage and standards. Consumers need plain-English answers about what to trust. And your committee can't referee any of it unless it includes people who speak both the business and the platform. If nobody in the room understands the sales forecast and the lakehouse feeding it, you will not get a handle on this. I find that more true in the age of Fabric than it has ever been.

More artifacts, more logic in more places, more people asking questions. Manual transparency was already losing. Fabric ended the argument.

## An Agent, an MCP, and a Context Harness

Now the good news. The exact job that was impossible to staff is the job agents are already very good at.

Here's the pattern. An agent connects to Fabric through an **MCP** (Model Context Protocol, the standard that lets an agent read your tenant like a first-class tool). It reads the estate: semantic models, measures, table definitions, lakehouse contents. Then it writes what it finds, in human-readable language, into the place your people already read. For me, that's Notion. For your team it might be SharePoint or Confluence. Whatever your **context harness** is, the agent keeps it fed. And it does this on a schedule, forever, without being asked twice.

Can an agent keep your data catalog current every single day without complaining? Well, of course it can. That's the whole trick. The mundane loop that broke every manual attempt is exactly the loop a scheduled agent never gets tired of.

Think of it like the recipe book in a family trattoria. Nonna and the family decide what goes on the menu and exactly how the carbonara gets made. The cooks execute it, plate after plate. The recipe book just keeps the record straight, every ingredient, every step, so a Tuesday carbonara tastes like a Saturday one. Nobody asks the recipe book to invent a new sauce. But let it go stale, let every cook work from memory, and within a month you have five different carbonaras and a shouting match in the kitchen. Your governance committee is the family. The agent keeps the recipe book.

The same agent earns a seat as the committee's secretary, too. Feed it the meeting transcript and it captures the decisions, the definitions agreed on, and the action items with names attached. The committee decides; the agent remembers.

## Write the Contract First. Then Set the Watchdog.

Transparency is the best first use case. Data quality is the natural second, and it shows exactly where the human line sits.

Say the committee agrees: we have seven sales regions. Not eight, not "Unknown," not a blank. Product names come from the master list. That agreement is a **data contract** between the people producing the data and the people consuming it, and there is ZERO AI in it. No agent decides what your regions are. The committee does. Write it down.

Then hand the contract to an agent. Every day it queries the lakehouse: distinct values on region, distinct values on product name. The day an eighth region shows up, it doesn't just log an error. It notifies the owner, by name, with the offending records attached: here's what came in, here's the contract it violates, go fix it. That's accountability with a first name on it, running while you sleep. Better data in means better insights out.

Skip the contract, though, and the watchdog is worthless. An agent without an agreed-upon standard is just a very fast way to generate alerts nobody reads.

## Your First 30 Days

Starting from the ground up, here's what I would actually stand up in the first 30 days. The goal isn't perfection; it's getting the lay of the land so you know where you're really starting from.

1. **Run the workshop first.** Assemble the committee: leadership, department reps, people who speak both business and platform. Surface the biggest pain points and the long-term initiatives. Sales is complaining about the numbers? Good. Find exactly where the problems come from. No agents in the room for this part.
2. **Stand up data quality standards and accountability.** Do you have any standards at all? Be honest. For the data flowing into Fabric, can you point every table back to the person doing the transformation and the source doing the input? That traceability is your accountability spine.
3. **Stand up data trust and definitions.** Inventory the measures, the reports, and the usage. If seven reports go to sales and the views are sporadic, decide where sales is actually supposed to find the truth.
4. **Point agents at the mundane.** Usage reporting. Ambiguous definitions surfaced side by side for the committee to resolve. The catalog documented into your context harness. And one data quality watchdog for the first contract the committee signs.

That's a real MVP of agent-assisted governance, in a month, without buying a single new platform.

## The Small Role Is the Essential One

I'll say it one more time, because the vendor decks won't. Agents are not going to lead your data governance program. People set the initiatives, people own the definitions, people sign the contracts. Most of this work never touches a keyboard.

But the rest of it, the transparency, the catalogs, the definitions, the daily checks... that's the part that always collapsed under human maintenance, and it's the part that decides whether anyone trusts the rest. Give it to the agents. Within a couple of years, I believe an agent-maintained data catalog will be table stakes for any serious governance program. Not an agent as a voting member of the committee. An agent as the secretary who never sleeps.

**Key takeaway:** this week, pick ONE semantic model. Connect an agent to it through an MCP and have it write plain-English documentation of the tables, measures, and definitions into the tool your team already reads (mine lands in Notion). It'll take an afternoon, not a quarter. Then show the committee what just became possible, and go write your first data contract.

If this got you thinking, stick around PromptingBI. And if you'd rather hear these arguments happen out loud, the Explicit Measures podcast is where they start.
