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

Skip news: Skill Vault launch, Copilot licensing, July PBI update. Mike’s Rayfin 4B-views story is Mike. Don’t steal.

## ★ Write first leftover: Don’t Hire a Senior to QA the Agent

**Thesis:** If juniors ship agent-written pipelines they cannot interrogate, you have not scaled engineering. You have converted your most expensive people into reviewers of code they could have gotten right the first time.

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
