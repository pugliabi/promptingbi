---
title: "Same Prompt, Two Reports: Desktop Bridge Needs a Spec, Not a Sentence"
date: 2026-10-02T09:00:00Z
permalink: "2026/10/02/same-prompt-two-reports"
draft: true
description: "Give Desktop Bridge the same prompt twice and you get two different reports. The three report skills and a real kickoff page are how you get the same one."
featured: /images/2026/10/same-prompt-two-reports-banner.png
tags:
  - power-bi
  - ai-agents
  - agent-skills
  - reporting
  - context-engineering
  - prompt-engineering
source:
  episode: 556
  title: "PBI Desktop Bridge Tips"
  notion: "https://app.notion.com/p/397e74c69c18803985a5daca5e2f93d6"
  youtube: "https://www.youtube.com/watch?v=8Q2BDjrwUw0"
  transcript: "transcripts/ep-556.txt"
---

My kids have started doing science experiments, so let's do one. Open Power BI Desktop with a finished semantic model. Point an agent at it through the Desktop Bridge. Give it a prompt: here are three measures, show them over time, build me a page. Load the report skills, too. Then open a fresh session with the same model, the same agent, and the same prompt, and run it again.

Same inputs, same tools. Do you get the same report?

You don't. Every time I've run this I've gotten two very different designs. Both look pretty nice, and that's what makes it dangerous. Neither one is wrong, exactly. They just aren't the same, and nothing about the prompt tells you which one you're going to get.

That's not a report process. That's a slot machine.

The Bridge isn't the problem here. It does exactly what it was built to do. What's missing are the decisions nobody made before the agent started building. Desktop Bridge only performs like a Ferrari when you add two things: the three Microsoft report skills, used **in order**, and a kickoff that comes from somewhere other than the chat box.

## Run the Experiment Before You Argue With Me

Treat it like a real experiment and hold your controls fixed:

- **Same model.** Same file, same measures, nothing refreshed between runs.
- **Same prompt.** Copy and paste it. Don't retype it.
- **Same skills loaded.** If you load the report skills for run A, load them for run B.
- **Fresh session each time.** No leftover context from the first run.

Then compare what came back. Look at which measures made the page, which chart types the agent picked, where the slicers went, how "over time" got interpreted (month? week? season?), and what the page title says. You're not hunting for pixel differences. You're checking whether the two runs built the same **report**: the same visuals answering the same questions.

A typical "measure list plus show it over time" prompt fails that check. Can an agent design a full page from one sentence? Well, of course it can. Just because it can doesn't mean the page is good, or worth shipping, and it definitely doesn't mean you'll get that page again tomorrow.

## What the Bridge Actually Controls

Before blaming the tool, it helps to be precise about what the tool is, because most of the confusion I see starts here.

The Desktop Bridge is a **feature of Power BI Desktop**. Inside Desktop it isn't even labeled "Desktop Bridge." You turn it on under preview features as "Enable external tool access to Power BI Desktop through secure local APIs." What that switch starts is a local server running inside the Desktop process. The **CLI** is a separate package you give your agent so it has ready-made commands for talking to that server. You don't strictly need the CLI, but it's the most direct way in, and an agent you ask to set up the Bridge will almost certainly reach for it.

The surface is small. There's a manifest call to discover what's supported, an application state call that tells you which file is open and whether it has unsaved changes, a reload from disk, and a screenshot of a page. Everything else is your agent editing PBIR files on disk. (I walked through the full [reload and screenshot loop](/2026/08/19/design-the-report-from-the-meeting-you-already-had/) in an earlier post.)

There's also a clean division of labor in Microsoft's own tooling. The Power BI Modeling MCP server is for the semantic model. The Desktop Bridge is for report authoring, and the docs file it under the agent skills for report authoring. That placement tells you something.

Here's the part that matters for the experiment: **the Bridge decides nothing.** It reloads and it takes a picture. It doesn't choose your measures, your layout, your chart types, or your palette. Every one of those choices gets made by the agent, unless you already made it.

One mechanic does bite people, so it's worth knowing before you start. The application state check exists because Desktop holds edits in memory until you save. If you've changed something by hand and the agent reloads from disk, your in-memory work is gone. My verify script refuses to run until the file is saved: save first, then let the agent write, then reload and screenshot. Never save in between.

## Every Open Decision Is a Coin Flip

Think about walking into the same trattoria two nights in a row and ordering "pasta, something with tomatoes." Night one you get a beautiful amatriciana. Night two you get penne alla vodka. Both are great. Neither is wrong. The kitchen did exactly what you asked, and the order left a dozen decisions open: the shape, the sauce, the heat, the portion. If you want the same plate twice, you order the dish by name.

A report prompt works the same way. Count the decisions a two-sentence prompt leaves open:

- **Which measures.** Northside Baseball's model has 25 measures. "Show revenue" matches several of them.
- **What the page is for.** Executive summary? Analytical canvas? A morning-after recap?
- **What "over time" means.** Game, month, season, trailing window.
- **Chart choice** for each of those.
- **Layout.** Where the KPIs sit, where the slicers go, what gets the hero spot.
- **Palette and formatting.**

Every one of those is a coin flip. Flip six coins twice and the odds of matching on all six are about one in sixty-four. Your measure list tells the agent what's POSSIBLE. It doesn't say what you want.

![A single prompt node on the left branching into many forks, each fork splitting again into diverging paths that end in different small report page shapes on the right](/images/2026/10/same-prompt-two-reports-coin-flips.png)

## Ingredient One: The Three Skills, In Order

The [Power BI authoring plugin](https://github.com/microsoft/skills-for-fabric/tree/main/plugins/powerbi-authoring) has three report skills, and I would not dream of starting a Bridge session without them. Most people load them and let the agent pick whichever one seems relevant. The value comes from running them as a sequence, because each one closes a set of decisions before the next one starts.

**`powerbi-report-planning` closes the scope.** It gathers requirements and locks a spec before anything gets built. It asks focused questions one at a time, inspects the semantic model, writes a single `_brief/report-spec.md`, and then stops at an approval gate. It won't touch a file until you say yes.

**`powerbi-report-design` closes the layout.** Page archetypes, chart selection, palette. The output isn't a vibe. It's a `Design Brief:` YAML block with a `layout_contract` for every page: the canvas, the grid regions, where each visual is placed, and a `space_audit` that accounts for empty space. The planning skill won't ask for approval until that block exists, has no placeholders, and gives every page a title.

**`powerbi-report-authoring` executes the contract.** It does the PBIR mechanics, validates, then reloads and screenshots through the Bridge so it can verify what actually rendered.

Read the planning skill's own rules and you'll find the line that explains this whole post: if the prose and the embedded YAML disagree, fix the spec before building, and don't ask the authoring agent to choose between conflicting instructions. Microsoft built the skills so that by the time an agent is writing files, there's nothing left to choose.

Compare that to the experiment. In the two-sentence version, the authoring step makes every decision on the fly, so the decisions come out different each run. In the sequenced version, they were settled two steps earlier and written down.

![Three connected stages from left to right, a clipboard with a padlock, a grid wireframe with placed blocks, and a finished report page with a camera aperture, linked by a single flowing line that narrows at each stage](/images/2026/10/same-prompt-two-reports-three-skills.png)

## Ingredient Two: The Kickoff Comes From Somewhere Else

Here's where I'd push back a little on the "just talk to it" crowd. Refinements can be short. "Make that a line chart, not a column chart." "Move the slicers to the top." That's fine. But I can't imagine starting a Bridge session with a sentence or two. When I start a session, the instructions were built somewhere else, in another tool I set up for exactly that job. (That split is what I mean by the [context harness and the execution harness](/2026/09/25/context-harness-execution-harness/).)

That matters even more with the skills. The planning skill wants to interview you, one question at a time, across a few rounds. You can sit through that interview every session. Or you can hand it a page where the interview is already answered.

Let's take a project. We'll call it Northside Baseball. The next report on the board is a Game Day Command Center: one game, not the season, for the GM and the ops director the morning after. Here's a slice of the instruction page the report agent reads before it builds anything:

```markdown
## Brief
B-06 · Game Day Command Center · report
Audience: the GM and the ops director, the morning after a game.
They want to know how last night went compared with a normal night.

## Skills to invoke
powerbi-report-planning   Lock the page plan (approved below).    Step 5
powerbi-report-design     Design Brief YAML, layout_contract      Step 5
                          per page.
powerbi-report-authoring  PBIR edits, validate, Desktop reload    Steps 6-12
                          and screenshot loop.

This page's project rules override skill defaults.

## Build steps
5. Plan and design. With powerbi-report-planning and powerbi-report-design,
   turn the page plan into a Design Brief YAML block (one layout_contract
   per page, a page title placement, a slicer band, a space_audit).
   This page is the approved spec; don't reopen scope.
6. Game Summary page. Author the PBIR → validate → reload → screenshot.
7. Arrival & Flow page. Same loop.
```

Look at what that does to the skills. The planning skill still runs, but it has nothing left to ask, because the scope is on the page and it's marked approved. The design skill still produces its contract, but it's turning a known page plan into placements instead of inventing one. "Don't reopen scope" is the most important sentence on the page.

The page also records the decisions an agent would otherwise make on its own, along with the reason for each one:

```markdown
## Decisions
D4  Arrival anchor
    Choice: minutes after gate open, 15-minute buckets.
    Why: the data has no first-pitch time.

D6  "Prior game"
    Choice: a This game / Prior game toggle, not a bookmark.
    Why: a bookmark captures a fixed game and goes stale.

D8  KPI strip
    Choice: one-row tableEx with 6 SVG images, about 140 px tall.
    Why: multi-value cardVisual can render empty on current builds.
```

Every entry on that list is a coin flip that no longer happens. D8 especially. Left alone, an agent reaches for the card visual when it sees a KPI row, and on the build I was using it rendered blank. I learned that one from a screenshot. Now the agent never has to.

And then the page plan itself, visual by visual:

```markdown
## Page plan (approved content)
GD – Game Summary
  Title textbox bound to GD Event Label.
  Slicer band: event slicer (single-select), Game Offset tiles,
  Games Selected.
  Row 1: one-row SVG KPI strip (6 images).
  Row 2 left: context card (weather, temperature, promo, weekday).
  Row 2 right: waterfall, P&L line × GD P&L Amount,
  total = Operating Income.

GD – Arrival & Flow
  Line chart: arrival bucket × GD Arrival Scans,
  trailing-5 average as a dashed second line.
  Below: cumulative arrival %.
```

Is that a lot of work before the agent builds anything? Yes. That's the point. Most of my time goes into this page, not into the session. I draft it from the stakeholder conversation, then let the agent [grill me](/2026/09/21/a-skill-md-is-not-wisdom/) on it until the open questions are gone. By the time the Bridge session starts, the kickoff is one line: read this page, use these skills, start at step 5.

Run the experiment against that page and you're comparing two executions of the same spec, not two guesses at what you meant.

## Rerun It, This Time With Controls

Here's the version of the experiment worth doing on your own work this week:

1. **Run the slot machine once on purpose.** Same model, same two-sentence prompt, two fresh sessions. Screenshot both pages and put them side by side. That image is the best argument you'll ever make to your team.
2. **List every difference between the two pages.** Measures, chart types, layout, grain, title. Each difference is a decision nobody made.
3. **Write those decisions into an instruction page.** Audience and purpose at the top. A decisions table with a reason on every row. A page plan that names each visual and its fields.
4. **Name the skills and their order on the page.** Planning, then design, then authoring, with the step each one owns. Add "don't reopen scope."
5. **Make the kickoff one line that points at the page.** Keep your short prompts for refinements.
6. **Run it twice again.** If the two runs still disagree on what's on the page, find the open decision and add a row. If they only disagree on spacing, that's a refinement, not a spec problem.

## Takeaways

- The same prompt with the same model and the same skills gives you a different report each run. Test it yourself before you trust a two-sentence workflow.
- The Desktop Bridge is a local server inside Desktop that reloads and takes screenshots. It decides nothing. Every design choice is the agent's unless you've already made it.
- Every decision your prompt leaves open is a coin flip: measures, page purpose, time grain, chart choice, layout, palette.
- Run the three report skills as a sequence. Planning locks the spec, design produces a layout contract, and authoring executes it with nothing left to choose.
- Build the kickoff somewhere else. An instruction page with an approved page plan and a decisions table turns the planning interview into a check that's already passed.
- Refinements can be one line. Kickoffs can't.

**Key takeaway:** this week, run the same report prompt twice in two fresh sessions and list every difference between the pages. Each one is a decision that belongs in an instruction page, not in the agent's hands.

Agents can design report pages now, and that part isn't going back in the box. The practitioners who get value from that will be the ones who treat a design session like a build with a spec, not a conversation. If you're setting this up for your own team, keep the conversation going with us on the Explicit Measures podcast, and subscribe at PromptingBI for more.

<!--
Meta description: Give Desktop Bridge the same prompt twice and you get two different reports. The three report skills and a real kickoff page are how you get the same one.

Topic tags: Power BI, Agentic AI, Prompting, Semantic Models
-->
