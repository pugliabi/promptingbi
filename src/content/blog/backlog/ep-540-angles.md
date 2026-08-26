# Ep 540 angles — Self Service with AI, Part 2

Ore file. Draft later from `transcripts/ep-540.txt`. Do not treat this as the article.

- Episode: 540
- YouTube: https://www.youtube.com/watch?v=RcxzBjyxKmo
- Notion: https://app.notion.com/p/388e74c69c1880759ca5e5016e391f29
- Transcript: `transcripts/ep-540.txt`
- Source: YouTube auto (no speaker labels)

No published post sourced from 540. Skip Mike: Replit, Lineage View product tour, OSI recap, “agents should build reports not answer last month’s sales.”

Collisions: Hard Data Soft Data, You’re AI Ready, Good for Humans Bad for Agents, committee-governance post.

## ★ Write first: Build the Thing That Creates the Thing

**Thesis:** The durable asset is not the notebook, the SOW, or the instruction page. It is the converter/agent that can emit those artifacts on demand, across harnesses.

**Material (Tommy):**
- Notion skill converter: take a Claude skill (even with scripts Notion can’t run), rewrite it so Notion understands the context.
- Fabric advisor agent in Notion loads Skills for Fabric, then: after a source-system meeting, “update the instructions for this project.”
- “Skills are interchangeable… the thing that creates the thing is more important than the thing.”
- He now spends development time on long-standing generators (instruction writers, notebook-authoring context), not one-off artifacts.
- Pitch to clients: quarter of the time it used to take, because the system is already standing.

**Freshness:** fresh. Cousin of the harness series / Meet My Assistants, different claim: meta-tooling, not project secretaries.

## Other angles

### I Will Not Roll Agentic Analytics onto Ungoverned Fabric
**Thesis:** No Copilot-on-the-model engagement until humans own definitions. Lineage software will not save you.
- Anthropic was the “final stamp”: he is not rolling out agentic solutions on Fabric data unless governance exists.
- If people don’t know what things are, what the right definitions are, and data is always moving, the agent fails.
- To Mike’s Lineage View: useful. If that’s all you have and there is no accountability/ownership, you still don’t get there.
**Freshness:** collision with committee post, You’re AI Ready, Good for Humans Bad for Agents.

### Metrics Are Declarative. Skills Are Procedural. One Per Domain.
**Thesis:** A semantic model tells an agent what a metric means. A skill tells it which source to trust, in what order, and what “done” looks like. Prep-for-data is not enough.
- Sources of truth = declarative knowledge. Skills = procedural knowledge.
- You cannot just run Copilot on general Fabric data and expect accuracy.
- Zoom-into-camera ask: Microsoft, ship skills for models. Add perspectives.
**Freshness:** collision with Hard Data Soft Data + `.ai` folder backlog.

### Perspectives Are the Agent Layer Hiding in Fabric
**Thesis:** The most untapped Fabric feature is perspectives, if agents could be pointed at one. A gold model is right for humans and wrong for agents until you slice it.
- Lineage preview: one measure, seven others at 90% similarity. How is an agent supposed to choose?
- 17 measures named member count. “How many members do I have?” Which one?
- “If I could use perspectives… and I could tell an agent to run on certain perspectives… most untapped, underutilized feature in Microsoft Fabric.”
**Freshness:** collision with backlog *Good for Humans, Bad for Agents*.

### Gate the Launch. Evals Are Governance.
**Thesis:** A domain owner does not get to announce an agent to stakeholders until a frozen eval slice clears an accuracy bar. That is certification, not a demo.
- Anthropic split: offline evals on a static snapshot so ground truth doesn’t move; plus online evals.
- “A domain owner cannot announce an agent to the stakeholders until that slice of evaluation clears some threshold.”
- Updated the agent? Same rigor as a certified semantic model.
**Freshness:** fresh leftover (different from MCP survey). Second Idea candidate.

### A Lineage Diagram Without Owners Is a Pretty Picture
**Thesis:** Discoverability tools are supplemental to governance process. They are not a substitute for conversations, written ownership, and change management.
**Freshness:** fresh (cousin of 545 “70% people,” not the same article).
