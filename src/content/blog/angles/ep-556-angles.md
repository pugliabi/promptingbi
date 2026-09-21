# Ep 556 angles — Power BI Desktop Bridge Tips

Ore file. Draft later from `transcripts/ep-556.txt`. Do not treat this as the article.

- Episode: 556
- YouTube: https://www.youtube.com/watch?v=8Q2BDjrwUw0
- Notion: https://app.notion.com/p/397e74c69c18803985a5daca5e2f93d6
- Transcript: `transcripts/ep-556.txt`
- Source: YouTube auto (no speaker labels)

**Mike-only:** Bridge is an all-the-time tool; two Desktop PIDs / two gateways; unsaved PBIR state; “what did you learn this session” harvest; NJ Park slide-out menus; grief that bookmarks became a nightmare and agents made flyouts cheap again. Don’t steal.

**Already claimed:**
- Published: [Design the Report From the Meeting You Already Had](/2026/08/19/design-the-report-from-the-meeting-you-already-had/) (meeting → locked brief → Bridge loop)
- Published: [You Don’t Have an AI Strategy](/2026/09/09/you-dont-have-an-ai-strategy/) (Bridge as *eyes*: reload + screenshot, authors nothing)

Skip news: data-agent visuals / Flint, gateway decision-tree article.

Adjacent: 553 (skills are the walk); 557 (validation is the last step); 561 (iteration, not the bar chart).

## Best plots

- **Write first leftover:** worked experiment. Same prompt, two runs, two reports.
- How-to: the three Microsoft report skills (planning / design / authoring) as the recipe Bridge is documented under.
- Artifact candidate: `/prompts/` under `playbooks` — Desktop Bridge session spec (controls, measure list, page archetypes, “do not invent a visual”). Sibling to the meeting-brief post, not a duplicate of it.
- Series: report-authoring loop with 557 + 561.

## ★ Write first leftover: Same Prompt, Two Reports

**Thesis:** Desktop Bridge will draw a pretty page from a sentence. Run the sentence twice and you do not get the same page. Until the spec is locked, you do not have a report process. You have a slot machine.

**Plot:** worked example. Science-fair A/B. Do not retread the meeting-brief post.

**Material (Tommy):**
- They already did a Bridge episode (~Aug 6). This one is the recipe, not the product tour.
- MCP = semantic modeling. Bridge = report authoring. Docs put Bridge under agent skills for report authoring.
- Just because the agent can design the page does not mean it is good, or worth it.
- Experiment: same prompt, same data, two runs, even with skills. He gets **radically different designs** every time. Measure list + “show it over time” is not enough.
- Two more ingredients for Bridge to “run like a Ferrari”: (1) the three Microsoft report skills — **report planning** (lock the spec before anything is built), **report design** (page archetypes, chart choice, palette), **report authoring** (the PBIR edits); (2) session start comes from **another harness**, not a sentence you typed in the chat. Refines can be short. Kickoff is not.
- Slight pushback on Mike: Bridge instructions need more than a sentence or two. He cannot imagine starting a session that way.

**Attribution:** Tommy on the A/B and the two-ingredient recipe. Mike owns PID/gateway mechanics and the harvest-what-you-learned loop.
**Freshness:** leftover. Distinct from *Design the Report* (where the spec comes from) and *AI Strategy* (Bridge as eyes). This is **non-determinism + the three skills**.

## Other angles

### Pick a Visual Library. You Currently Have Two
**Thesis:** Fabric Apps / data agents and Power BI do not share a visual library. Shipping both is how you teach the business two products that look like they should be one.
- Hot take: use one or the other. Pause on Fabric Apps until Flint (or whatever the app visual stack is) is in Desktop, or until agentic viz is actually how the org builds.
- Aesthetics of Fabric app visuals are nicer. From a human (no-agent) clock, 3x the time for a prettier bar chart is not worth it. A bar chart still conveys the data.
- “Until we’re at the point where everyone is building agentic visualizations, it is not real to assume that.”
- Tea leaves: Kurt Beller report-design skills, community building on Bridge. That is where the wind is. Not the silent Flint blog post.
**Plot:** opinion. Pair with 563 if the series is “when an app beats a report.”
**Freshness:** fresh. Do not steal Mike’s Vega-lite “they borrowed a spec and danced around it.”

### Agents Made Custom Menus Cheap. That Does Not Make Them a Good Idea
Tommy is torn: less friction to build flyout menus inside reports, so maybe it is okay. He is not sure he likes the pattern.
**Plot:** thin opinion. Mike owns the bookmark-nightmare grief. Optional Idea, not write-first.
