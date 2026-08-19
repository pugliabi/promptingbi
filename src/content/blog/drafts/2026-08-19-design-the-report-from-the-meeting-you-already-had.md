---
title: "Design the Report From the Meeting You Already Had"
date: 2026-08-19T09:00:00Z
permalink: "2026/08/19/design-the-report-from-the-meeting-you-already-had"
description: "Agents can design Power BI reports now. What makes them good is your stakeholder meeting turned into a locked brief, plus commands instead of raw JSON."
featured: /images/2026/08/design-from-the-meeting-banner.png
draft: true
tags:
  - agent-skills
  - ai-agents
  - reporting
  - power-bi
  - context-engineering
  - prompt-engineering
source:
  episode: 541
  title: "Helping Leaders Speak Data"
  notion: "https://app.notion.com/p/368e74c69c18804aa729d4a7e0f51e86"
  youtube: "https://www.youtube.com/watch?v=CecofYc2Ih0"
---

The first time I pointed an agent at a finished semantic model and said "here are the measures, go design a report," I got something back. It was a report. It had visuals on it. It was also completely sporadic, in the sense that running the same request twice gave me two unrelated pages and neither one was something I would show a client.

So I ran it again with different inputs. Screenshots of a report page I wanted to echo. The transcript of my last stakeholder meeting. The handful of metrics that conversation actually surfaced. Same model, same agent, same skills. This time it did a nice job. It even handled the conditional formatting, which to this day is the most tedious clicking exercise in Power BI, and I don't ship money visuals without it.

Nothing changed about the tooling between those two runs. What changed was the **context**. And that is the whole ballgame now that agents can genuinely author reports: the bottleneck moved off the tooling and onto whether you can hand over what you know.

![A flat list of measure tokens on the left flowing through a converging node into a structured report page of chart shapes on the right, with a second stream of meeting artifacts joining the flow](/images/2026/08/design-from-the-meeting-banner.png)

## The Measure List Is Inventory, Not a Requirement

Microsoft's Skills for Fabric repo shipped skills that author PBIR files, capture screenshots, and iteratively refine report pages. I've used them and I've been genuinely astounded at how well they work. Not perfect. But two months before that, the honest answer to "can an agent design my report?" was no, and the reason "build a report with Copilot" never impressed anybody is that it was guessing at intent from a field list.

Here's the thing nobody says out loud: a measure list tells an agent what is POSSIBLE, not what is wanted. Your model exposes forty measures. A good executive page shows three. Nothing in the TMDL tells an agent which three, or why the CFO cares about margin variance this quarter and not last quarter's volume.

Think about hiring a caterer for a rehearsal dinner. You don't hand them a photograph of your pantry. Forty ingredients on a shelf is not a menu, and a caterer who cooks from your pantry inventory makes something technically edible and completely wrong for the room. What they need is the occasion, the headcount, that the groom's family is Sicilian, and that your aunt cannot have shellfish. Same ingredients, entirely different dinner. Your semantic model is the pantry. The request is not in there.

## Your Last Meeting Is the Spec

So where does the real requirement live? In a meeting that already happened.

You sat with a stakeholder. They told you what was bothering them, what they get asked in the Monday leadership call, which number they don't trust. Somebody said "and I want to see it like that report the ops team has." All of that is specification, and most of us let it evaporate into a notepad and a vibe.

Three inputs turned my results around, and none of them are exotic:

- **Screenshots of the page I wanted to echo.** Design direction is visual. Describing a layout in prose to an agent is a worse channel than just showing it the thing.
- **The stakeholder meeting transcript.** Not a summary. The actual conversation, where the priorities and the grumbling both live.
- **The metrics that conversation surfaced.** Pulled from the transcript, then mapped onto real measures in the model.

That last one is why the conditional formatting worked. The agent didn't invent a color scheme out of taste; the rule came from the business ("above this is good, below this is a problem"), and the business said it out loud in the meeting. Formatting stops being decoration the moment it encodes a threshold somebody actually owns.

![A transcript page, a screenshot frame, and a cluster of metric nodes converging along flowing lines into one structured brief document marked with a padlock](/images/2026/08/design-from-the-meeting-brief.png)

## Freeze It Into a Brief Before a Single Visual Exists

Feeding raw context into a chat window works once. Then it evaporates and you do it again next week, slightly differently, and you get a slightly different report. I hate redundancy.

What I do instead is consolidate that context into one brief and lock it before the agent touches a file. Not a second round of requirements gathering. A written spec of what the meeting already told me:

```yaml
audience: who reads this and what they already know
purpose: the one outcome this report exists to drive

decision_questions:        # 2 to 5; answered at a glance
  - are we ahead of last year and where
  - which accounts are dragging margin
  - what changed since last week

pages:                     # one job per page
  - name: Overview
    intent: show whether we are on track this period and flag what is off
    serves: [are we ahead of last year and where, what changed since last week]
  - name: Margin Detail
    intent: locate where margin is leaking by account and product
    serves: [which accounts are dragging margin]

design_identity:
  tone: quiet analytical
  signature:
    accent: single accent reserved for the focus measure
    kpi: value over target, variance shown as a small inline figure
    titles: subject on the page, differentiator on the visual
    spacing: equal gaps and margins arithmetically derived

delivery_target:
  surface: Fabric workspace app
  page_size: 1280x720
  mobile: not required
```

The `decision_questions` block is the part that earns its keep. Every page and every visual has to trace back to at least one of them. If a visual serves no decision question, it is decoration and it gets cut, and now that judgment is a rule the agent can apply instead of a taste call I have to make forty times.

Then it gets frozen. Revising words is cheap. Rebuilding bound visuals is expensive. If scope changes later, I reopen the brief and amend it rather than letting the agent quietly drift the report, because a drifting report is how you end up with a page that is just "more charts."

Notice what this brief really is. It's the meeting, written down in a form both an agent and a human can execute against. Which means it also answers the question I keep getting about where model and report context is supposed to live: it lives in an artifact you keep, next to the project, in source control. Not in a chat history.

## Don't Let the Agent Hand-Write the JSON

Here's the second half, and it's the one people skip because the first half feels like enough.

Microsoft's report skills are good, and they are also large markdown trees with sub-skills, and every one of those tokens goes into the context window before your report gets built. Worse, if the agent is authoring visual JSON by hand, it is spending reasoning on a file spec instead of on the thing you actually hired it for.

So take the spec away from it. Give it commands.

```bash
pbir new report "Sales.Report" -c "MyWorkspace/Sales.SemanticModel"
pbir pages rename "Sales.Report/Page 1.Page" "Overview"
pbir model "Sales.Report" -d                       # discover fields before binding
pbir add visual kpi "Sales.Report/Overview.Page" --title "Revenue"
pbir visuals sort "Sales.Report/Overview.Page/Revenue.Visual" -f "Sales.Revenue" -d Descending
pbir validate "Sales.Report"
```

A command like `add visual kpi` takes a type, a position, a title, and a binding, and it owns the JSON. The agent passes parameters. It never needs to know the shape of a visual container, and I never need to review a hand-written property tree to find out it put a border on the wrong object.

That changes where the agent spends its effort, which is the actual win. It stops thinking about file format and starts thinking about what the page looks like, where the KPIs go, what the general layout should be. That's the work I want it doing, because that's the work the brief told it how to do.

Two rules make this hold up in practice:

- **Validate after every mutation.** `pbir validate` after each change means a broken field reference surfaces on the step that caused it, not four steps later when you can't tell which change did it.
- **Push formatting into the theme, not into visuals.** Static formatting belongs in the theme, and conditional formatting belongs in extension measures returning theme sentiment tokens. Then variance columns carry the color and nothing else does, because formatting everything means formatting nothing.

![An agent node passing parameter dots into three command blocks that each emit a finished visual onto a report page, with a tangled cluster of braces and brackets crossed out below the main path](/images/2026/08/design-from-the-meeting-commands.png)

## What Power BI Desktop Actually Contributes

There's a mental model worth correcting here, because I had it wrong too. The Power BI Desktop Gateway is not an agent clicking around Desktop. It's a command line interface that does exactly two things: take screenshots, and tell Desktop to refresh itself when the report files changed underneath it.

That's it. Everything else is your agent working on PBIP files on disk. Desktop is the renderer and the camera.

Which is why my working loop splits in two. When I'm building and validating measures, I keep a live connection open so the agent can actually run a query and confirm there are the number of rows I expect, because an agent that can only edit measures can't tell you whether the measure is right. When I move to design, I close Desktop, point the agent at the local files, and let it work. Then the screenshot comes back, I compare it to the brief, and we go again.

Brief in, commands out, screenshot back, compare, refine. That's the whole loop, and every piece of it exists today.

![A closed loop diagram showing a brief document flowing into command blocks, into a rendered report page, into a camera node, and back to an agent node](/images/2026/08/design-from-the-meeting-loop.png)

## Run It This Week

1. **Pull the transcript from your last stakeholder meeting.** Not your notes. The transcript. Pull out every metric anyone named and every complaint anyone made.
2. **Write the brief.** Audience, purpose, two to five decision questions, one job per page. Fifteen minutes, and stop when the decision questions are honest.
3. **Screenshot the page you want it to echo.** An existing report of yours, a page from another team, whatever sets the direction.
4. **Get a deterministic command layer in place** so the agent calls a command per visual instead of authoring JSON, and validate after every change.
5. **Delete a visual that serves no decision question.** Do it on a report you already shipped. That's the fastest way to find out whether your brief has teeth.

## Takeaways

- Agents can author report pages now. The measure list was never the requirement, so pointing one at a model and saying "design something" gets you a page nobody asked for.
- The specification you need already exists in the stakeholder meeting you already had. Transcript, reference screenshots, and the metrics that came up beat any amount of prompt polishing.
- Lock that context into a design brief with two to five decision questions before a single visual is built. Anything that serves no decision question is decoration.
- Let commands own the file spec. The agent should be reasoning about layout and KPI placement, not about visual JSON, and large skill trees cost you tokens for nothing.
- The Desktop Gateway does two things, screenshots and refreshes. Keep a live connection for validating data, close it for design.

**Key takeaway:** this week, take the transcript of your last stakeholder meeting and turn it into a five-line design brief with the decision questions written down. That file, not a better prompt, is what makes the next agentic report worth shipping.

The uncomfortable part of all this is that agentic report design rewards the practitioners who were already good at requirements. The tooling caught up; the discipline is still on us. If you're building this loop out for your own team, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.
