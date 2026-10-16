# Ep 561 angles — Using AI for Data Viz

Ore file. Draft later from `transcripts/ep-561.txt`. Do not treat this as the article.

- Episode: 561
- YouTube: https://www.youtube.com/watch?v=o2hrypkoG8U
- Notion: https://app.notion.com/p/3bce74c69c188039bd87d012473e8653
- Transcript: `transcripts/ep-561.txt`
- Source: YouTube auto (no speaker labels)

**Mike-only:** warehouse billing conspiracy next to the medallion “best practices” posts; almost no warehouse projects; Gemini/Colab/Sheets workflows as Eva wrote them; conversational vs architect analyst labels (he may riff; confirm before assigning). Don’t steal.

Foil: Eva / Nightingale, *Three ways I actually use AI in data viz*. 557 was her LLM-critique piece. This is her practice piece.

Skip news: Snowflake private-link copy, warehouse medallion part 3 (layer contamination: bronze cleans, silver serves, gold patches). Use part 3 only as 558 follow-up color.

Adjacent: 556 Bridge A/B; 557 validation-last; published [Design the Report From the Meeting You Already Had](/2026/08/19/design-the-report-from-the-meeting-you-already-had/); 564 conversational vs architect (Kurt).

## Locked (2026-10-16)

- Published: `published/2026-10/2026-10-16-one-visual-was-never-the-job.md` ("One Visual Was Never the Job"), permalink `2026/10/16/one-visual-was-never-the-job`, published 2026-10-16 after humanizer + delete-ai-words pass (sentence-case headers, reframes removed). Notion: https://app.notion.com/p/3fbe74c69c1881f192a0dac803381b7b.
- Title: Tommy picked "One Visual Was Never the Job" over "The Bar Chart Is the Cheap Part" and "Stop Asking AI for a Chart. Ask It for the Page." Walk-the-areas offered; he said just draft it.
- Foil correction: the Nightingale author is **Rituparna Das** ("Three Ways I Actually Use AI in Data Viz", 2026-07-22), not "Eva". Her conclusion ("compresses the time between idea and output") is credited to her in the post; Tommy agrees, then argues past it.
- Spine: bar chart is a demo → a page is a lineup (baseball analogy, 3s/30s/3m skill) → notebook charts are for you (story framing vs storytelling, Strava) → the agent's best work is the data behind the visual (Northside toggle, `Games Selected` what-if, trailing-5, SVG KPI strip; base vs display measures; red email KPI) → the last step is the click → practical list.
- Adjacent mining folded in: 557 holy grail / single CSV / validation-last / pixel perfect / sycophancy; 566 design ~30% / "fill" ambiguity; 565 "no one wants a report" / Strava / 3s-30s-3m; 530 "build a bunch of conditional formatting measures, too"; 546 red email open rate (kept short, so "Color Is a Conclusion" stays open for the ownership argument); 541 row-count check before design.
- Links the [Northside spec](/2026/10/02/same-prompt-two-reports/) without re-showing it. No code blocks, so no `/prompts/` artifact.
- Images: `public/images/2026/10/one-visual-was-never-the-job-{banner,lineup,data-behind,the-click}.jpg`.
- Filed as Notion Ideas: "Your Meeting Questions Are for the Agent Now" (sibling of 538's "Put the Agent in the Meeting"), "Clients Think They Have to Use Fabric Because Power BI Now Lives There". "Bronze That Cleans Is Not Bronze" not filed; fold into 558.

## Best plots

- **Write first:** opinion. The unlock is iteration between related visuals, not AI drawing a bar.
- How-to: meetings already framed for the agent (agenda from schema blockers).
- Artifact: none new if 556 ships the Bridge spec. This post should link that, not duplicate it.
- Series: report-authoring with 556 + 557. Eva’s “conversational vs architect analyst” is 564’s fight; don’t steal it here.

## ★ Write first: I Don’t Care If AI Can Draw the Bar Chart

**Thesis:** Nightingale’s three workflows are single-visual stories. That has never been the job. The value is compressing the time between a locked KPI set and a **page** of visuals that argue with each other. The bar chart is slop if that is all you bought.

**Plot:** opinion. No Gemini/Sheets tutorial.

**Material (Tommy):**
- Conference jargon (MCP, agentic, headless, conversational) with no one able to say how it changed Tuesday. He wants to defuse EMP’s own jargon first.
- Pushback: requirements gathering is already agent-shaped. He builds the agenda from schema/measure blockers the agent can see. Transcript is context for the viz agent. Questions are framed so the **skills** understand, not so he can hear “bar chart.”
- Agrees the value is not “I didn’t drag the visual.” It is compressing idea → output. Still builds the visual. That part is not the win. Slop if you stop there.
- Iterate until the main KPIs and pressure points are known, then the **relationships between visuals on a page**. Nightingale’s three examples are a single visual. That never worked in this job.
- Quality vs convenience: when you are in a notebook, you are usually drawing something **for yourself**, not the thing you will distribute. Do not confuse exploration viz with the report.

**Attribution:** Tommy. Eva owns Sheets+Gemini and Colab stress-testing. Mike owns “discovery is opening scope, then we narrow.”
**Freshness:** leftover vs 557 (validation/sycophancy) and *Design the Report* (meeting brief). This is **page vs chart**, and **notebook viz is not the deliverable**.

## Other angles

### Your Meeting Questions Are for the Agent Now
**Thesis:** Discovery is not “what chart do you want.” It is a transcript the report-planning skill can execute without you re-explaining grain.
- Agenda from the semantic model’s blockers. Clarify so the tool does not guess.
**Plot:** how-to. Collision with *Design the Report*. Only if this stays on “I changed how I talk in the room,” which that post did not make the thesis.

### Clients Think They Have to Use Fabric Because Power BI Now Lives There
Street: “I guess we have to use Fabric since Power BI is part of Fabric and Power BI works best with Fabric.” Fabric does change the story. Mike: Power BI did not lose anything; third-party destinations are the new opinion.
**Plot:** thin. Cousin of 554 FaaB and 562 handoff. Optional Idea, not this episode’s post.

### Bronze That Cleans Is Not Bronze
News leftover, Sydney part 3: pipelines break when layers stop behaving. Warehouse cost rumble in the same week.
**Collision:** 558. Fold into that leftover if you write the Spark-budget post.
