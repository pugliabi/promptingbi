# Ep 560 angles — Data Agents Got an Upgrade

Ore file. Draft later from `transcripts/ep-560.txt`. Do not treat this as the article.

- Episode: 560
- YouTube: https://www.youtube.com/watch?v=tIG8f8QGhXE
- Notion: https://app.notion.com/p/3bce74c69c1880229734f66c2395b796
- Transcript: `transcripts/ep-560.txt`
- Source: YouTube auto (no speaker labels)

**Mike-only:** four-query test against a model; “I can build something more useful than a data agent”; 150 CU per chat vs DIY; Foundry as the publish-to-Teams surface; pen.dev. Don’t steal.

Skip: Chicago meetup, CI/CD “definitive guide” (series bait, not this post), Dataflows Gen1 upgrade wizard.

Adjacent: 550 *Your Semantic Model Is Not Semantic*; 540 *I Will Not Roll Agentic Analytics onto Ungoverned Fabric*; published [Hard Data, Soft Data](/2026/08/26/hard-data-soft-data/); 554 “code is the output.”

## Best plots

- **Write first:** opinion. A Fabric data agent is a **sub-agent with a job**, not Copilot-on-the-model.
- How-to: ride-coach instruction page (purpose, columns, how it must answer).
- Artifact candidate: `/prompts/` `agent-briefs` — Data Agent sub-agent brief (role, when Foundry may call you, what you never answer, log the traces back to Fabric).
- Series: agent-governance with 540 / 550. Do not merge into the ontology post.

## ★ Write first: A Data Agent Is a Sub-Agent, Not a Chat Window

**Thesis:** Connecting a data agent to a semantic model and hoping people “just ask” is Copilot with extra steps. The upgrade that matters is the job description: you are the ride coach, or the quota doctor, and Foundry is allowed to call you.

**Plot:** opinion + one instruction-page slice (cycling coach).

**Material (Tommy):**
- A data agent is not “connected to the Strava model.” Without instructions it just queries. The special part: purpose, key relationships, columns, core measures, **how it should reply**. Ride-coach: not just numbers. Wind this week, should I take it easy. Markdown. Copilot-on-the-source does not get that.
- Best when the purpose is narrow. One agent per job, not one agent per estate. Org consumption was the hole: Copilot Studio was clunky, Foundry needed IDs, one agent at a time.
- Ranking the upgrades: MCP is table stakes, not a podium feature. Multi-agent is the gold. In instructions he now writes **you are a sub-agent**. When Foundry/Copilot calls you, you spin up that job. Sales + finance can cross-check.
- Logs: get them, land them in Fabric, point a data agent at the questions people actually asked. Usage analytics for conversational BI.
- They did **not** build a place you open Anthropic and talk to the data agent. Microsoft is supporting a larger agent, not a destination UI. Copilot/Foundry exist because most orgs will not let 1,000 people loose on a remote modeling MCP.
- Close: 1,000 people, modeling MCP, “how are sales.” Can you trust any harness without instructions to get the same answer? ChatGPT was wrong twice yesterday and agreed when he said think again. Data agents lag on features. They still exist so the answer is not a thousand different prompts.

**Attribution:** Tommy. Do not write Mike’s “I’d rather just MCP the model and skip the data agent” as Tommy’s conclusion; Tommy is arguing the opposite for the enterprise.
**Freshness:** fresh. 550 is ontology/burned word “semantic.” 540 is no agents on ungoverned Fabric. This is **the item called Data Agent, as a sub-agent.**

## Other angles

### Observability Is Usage Analytics, Not a Trust Badge
**Thesis:** Traces are not a vibe. Land them in Fabric and treat “what did they ask” like you treat report usage.
- Podium bit: logs did not make his gold, but they are how you make the data better.
**Plot:** how-to. Can fold into write-first. Artifact if the post ships a trace-landing notebook.

### Microsoft Finally Wrote the CI/CD Guide. It Is 70 Item Types.
News leftover: understand / plan / practice / go / advance. REST, Git, deployment, Fabric CLI, Terraform. Most people still version models and reports only.
**Plot:** series candidate with 562 handoff (what you actually leave behind). Not this episode’s write-first.

### Strava to Lakehouse in 30 Minutes Is Not the Data Agent Story
Street: Fabric skills + remote MCP, lakehouse, then report-authoring/design/planning skills, Wahoo-ish theme, headwind-adjusted effort. Thirty minutes. Tools have to talk to other tools (Notion, MCPs) or they are dead.
**Collision:** 558 PDF book-of-business, 561 iteration. Color for a worked-example post, not 560’s thesis.
