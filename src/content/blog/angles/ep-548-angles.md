# Ep 548 angles — Can We Trust AI Pipelines

Ore file. Draft later from `transcripts/ep-548.txt`. Do not treat this as the article.

- Episode: 548
- YouTube: https://www.youtube.com/watch?v=d-Xks18U-Js
- Notion: https://app.notion.com/p/397e74c69c1880fab2e1e399c69d4a4c
- Transcript: `transcripts/ep-548.txt`
- Source: Notion meeting note (no speaker labels in this note)

**Already claimed:**
- Notion Drafting (Episode null): *The Confidence Receipt: What Every AI-Authored Pipeline Should Ship With*
- Published: [Don’t Let Your Agent Touch Fabric](https://promptingbi.com/2026/08/17/dont-let-your-agent-touch-fabric/) (red-squiggly-vs-data, SCD join, interior-designer analogy)
- **Drafted 2026-09-14: Don’t Hire a Senior to QA the Agent** → `drafts/2026-09-14-dont-hire-a-senior-to-qa-the-agent.md`, Notion page `3dbe74c69c188146a487d5fc49bbba46`, artifact `src/content/prompts/pipeline-interrogation-gate.md`. The old Idea placeholder row (`3c8e74c69c18811e9fd2c88815c672bc`) is retitled as superseded and can be deleted in the Notion UI.
- Notion Idea already filed: *I Don’t Write the Kickoff Prompt Anymore*. Do not create a second row for it.

Skip news: Skill Vault launch, Copilot licensing, July PBI update. Mike’s Rayfin 4B-views story is Mike. Don’t steal.

## ★ Write first leftover: Don’t Hire a Senior to QA the Agent

**Thesis:** If juniors ship agent-written pipelines they cannot interrogate, you have not scaled engineering. You have converted your most expensive people into reviewers of code they could have gotten right the first time.

### Locked decisions (2026-09-14, from Tommy)

- **Title:** Don’t Hire a Senior to QA the Agent. Slug `dont-hire-a-senior-to-qa-the-agent`, post date 2026-09-14, permalink `2026/09/14/dont-hire-a-senior-to-qa-the-agent`.
- **Framing is speculation, and it says so.** Tommy has NOT watched this happen on an engagement. It is too early. The article is a forecast built from conversations with data leaders around the country and from the questions teams keep asking him. **Do not write a client scene, a named engagement, or a “I watched this happen” anecdote.** Flag it as prediction in the body.
- **Keep the 50 / 20 math** exactly: half the senior’s week reviewing agent code, another 20% explaining what went wrong to juniors, two thirds of the expensive seat not doing architecture.
- **Teaching section is not about the row-count check.** The thing you are testing for is whether they understand **evaluation context** and have actually done the work, not whether they typed an assert. Stay honest that this is still a gray area, and say plainly that the teaching is essential. Do not resolve what nobody has resolved.
- **Punch line names the senior architect only.** “I do not want to pay my senior architect to do that.” Drop the consultant-billing version (already used in Don’t Let Your Agent Touch Fabric).
- **No new extended analogy.** No fresh invented one. At most a one-line nod back to the interior designer (link the earlier post); “the junior watching an agent get corrected” carries the rest.
- **Scope:** ~1,600–1,900 words. Sections: hook → thesis → the code is not the work → the 50/20 math → pointing is not teaching → what the senior writes once → this week → Takeaways.
- **Artifact:** one `/prompts/` page under `playbooks`, the Pipeline Interrogation Gate (sibling to `dax-readiness-gate`). Junior answers it without the agent in the room before a senior opens the notebook. Gate questions approved: grain of the right-side table, the SCD / current-row rule, row count before vs after the join, one number that should be impossible, “what would make me pause.”
- **Banner + 3 diagrams**, teal monochrome house style.
- **Link out instead of retreading:** `/2026/08/17/dont-let-your-agent-touch-fabric/` for the survey and the asserts, `/2026/08/28/agents-raise-the-floor-and-lower-the-ceiling/` for the DAX version of the career problem.

**Material (Tommy):**
- Junior + agent produces runnable Spark that looks efficient, comments and all. They will not go hunt SCD flags, outliers, or “did this join add rows.”
- Professional does not primarily audit the code. They look at the data and notice what should not be possible.
- If the senior’s job is “you missed the SCD / the row count is wrong,” the senior could have run the agents and landed it. Junior is not in the trenches. They are watching an agent and getting corrections.
- That role is a professional QA architect. Tommy does not want to pay a consultant or a senior architect for that as the job.
- Pre-AI seniors got battle scars line-by-line. Teaching by pointing at agent mistakes skips the concepts. If 50% of senior time is reviewing agent code and another chunk is explaining it to juniors, most of the expensive seat is not architecture.
- Gray box, not solved: 20% teaching time is a different job than “the junior never actually did the work.”

**Attribution:** Tommy (hot take, pushing Mike). Mike’s counter: seniors should own process/skills that scale the team. Do not write Mike’s “a validation system makes skill level irrelevant.”
**Freshness:** leftover. Distinct from Confidence Receipt (artifact) and Don’t Let Agent Touch Fabric (session-start survey). Adjacent to 549’s DAX version. Keep this one on pipelines / SCD / Spark.

## Other leftovers

### I Don’t Write the Kickoff Prompt Anymore
**Thesis:** Specify and bound do not live in the chat that writes the notebook. They get harvested from meetings and source files into instruction pages before an agent touches Fabric.
- Will not start a Fabric project without the specify/bound block in Claude instructions. Scrolling pages that reference other Notion pages of must-adhere rules.
- Does not type the workflow kickoff prompt anymore. Meetings, provided files, a Notion agent that does not write data but can read Excel and draft Claude instructions.
- If the agent misses in one or two shots, the failure was the instructions. Ask Claude to rewrite the prompt for a fresh chat from what you just forbade.
**Freshness:** adjacent to Stop Re-Prompting. This slice is “the pipeline kickoff is a meeting artifact, not a chat.” File as Idea.

### The Confidence Receipt
**Thesis:** An AI-authored pipeline is not done when the notebook runs. It is done when it ships with the expectations and tests that would have caught a silent bad join.
- Nikola’s three pillars: specify precisely, bound aggressively, validate by interrogating data not by reading code.
- Tommy’s “starter kit”: clients must show what the data looks like before the API dump. Agent profiles history into the project brain (seven country values, ~2,000-row state range).
- Smoke tests: nine countries when spec says seven → pause, do not “error and continue.”
**Collision:** already Drafting in Notion. Do not create another row. Optionally attach Episode relation to the existing page.

### The Code Ran. That’s the Failure Mode.
Agent PySpark fails as a data/spec problem. Syntax-clean output in the lakehouse is the tell, not the all-clear.
**Collision:** published Don’t Let Your Agent Touch Fabric.
