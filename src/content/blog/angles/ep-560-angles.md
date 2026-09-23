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

## Locked decisions (2026-09-23)

- **Title:** "A Data Agent Should Be a Sub-Agent" (Tommy: *should be*, not *is*).
- **Frame:** most people use data agents as the chat window; the value is as a sub-agent called from Foundry / M365 Copilot / Copilot Studio.
- **Tenant artifact:** created `Ride Coach Agent` (DataAgent `0f4bdd77-fa45-4eb3-9a28-073858b9f2ee`) in Puglia - Hobbies on `Strava_SM`, instructions open with "You are the Ride Coach, a SUB-AGENT." Draft + published stages. Screenshots of instructions pane go in `public/images/2026/09/`.
- **Adjacent transcripts fetched:** ep-459 (Initial Impressions of Data Agents), ep-466 (Data Agents and Semantic Models), ep-527 (Semantics Layer Genie & Data Agents).
- **Artifact:** `/prompts/` agent-briefs page = full Ride Coach sub-agent instructions.

## Mined material (attributed, 2026-09-23)

**Tommy (vocative unless noted):**
- 560 ~121-127: "A data agent to me right now is seeing more and more of its purpose to be a subagent as a tooling rather than the primary way of communication... an agentic subprocess." / "my primary agents would spin up the data agent when needed."
- 560 ~179-181: "I say you are a sub agent... of any Foundry or Copilot agent that calls on you." Sales + finance agents cross-check each other.
- 560 ~181-185: data agents haven't taken off because nobody understood "is it the main agent?" / "I probably don't ever need to directly talk to a data agent as a user." MCP = "the standard now rather than a feature."
- 560 ~107-111: Foundry agent can connect to multiple data agents; OneLake catalog in Foundry (no more copying IDs); Copilot Studio adds data agent as a tool. "not just upgraded, but its purpose changed."
- 560 ~137-143 (context): Microsoft "shifted the purpose of a data agent, not just the features." Client pitch = build a Foundry/Copilot agent; data agents are its sub-agents.
- 560 ~89-93: instruction anatomy (purpose, key relationships, key columns, core measures, how to reply). Ride coach: "your goal is to coach the user, not just answer questions." Without instructions "it's just going to try to query it every time."
- 560 ~105: narrow purpose; "you're the doctor sales guy... diagnose people's quotas."
- 560 ~85 (context): Copilot is general, answers the direct question; data agent is bound to a source and has a purpose.
- 560 ~155 + 508 ~127: most orgs won't allow MCP access in their own Anthropic harness without an enterprise harness ("Mike is binary").
- 560 ~199-203: 1,000 people asking "how are sales"; can any harness without instructions get the right answer every time? Data agents lag on features but exist for consistent answers.
- 559 ~91-93 (context): "it's where it's located... now available in Foundry... I want to use this anywhere and when I'm needed."
- 554 ~179: "agents are not to be used for ambiguous one-time queries... 'Just answer questions.' You're not going to get great answers."
- 542 ~38-41 (context): API has no consuming view; only portal, Copilot agent, or Foundry.
- 542 ~191-193 (context): 30-60-90: clean semantic models first, discovery at 60, agent at 90.
- 508 ~29: client projects: primary recommendation is a semantic model as the source.
- 556 ~183: "never going to use [it] with an agent with a two sentence prompt."

**Tommy, older episodes (459 Sep 2025 / 466 Oct 2025 / 527 May 2026):**
- 459 ~117-121: "Limit your possibilities per data agent... I have orchestration... I don't want a single data agent to do a lot of general things." Tested five agents on one model: "you are the sales agent... you're my date time intelligence agent." 300-line prompt loses priority; "limit our data agents, but create more of them."
- 459 ~123-125: "rather than a data agent can solve all things is many data agents can solve a lot of little things."
- 459 ~25-27, ~41: Copilot Studio orchestration is the more significant feature; Studio connects to a data agent that's already created.
- 459 ~157: "I'm not creating a data agent for the organization. This is for [Ann] in operations." Works better in Copilot Studio than exploring in the agent.
- 459 ~161/171: "people are expecting this data agent to be their ChatGPT... it's not meant for that." / "you're not creating ChatGPT in a data agent."
- 459 ~63-65: three parts: instructions, data source, the user query. "I only have control on one of these."
- 466 ~59: Copilot = the toy in the box; data agent = you can update the motherboard, standalone and cross-platform.
- 466 ~61: impact is "the instruction-based side... a specific task, rather than Copilot... Q&A."
- 466 ~161-163: semantic model is the highway; missing the subway (input/output examples). "right output three out of six times, I'm not using it."
- 466 ~177-179: Zelda: raw data is child Link; the semantic model already has the horse and arrows.
- 527 ~135: "AI is not a prompting problem. It is a data problem first."
- 527 ~201-205: layering instructions like nested claude.md files. ~197: "the death of process with AI is isolation."
- 527 ~57: not yet at a point to push MCP-based setups onto the client.

**Evolution note:** Tommy wasn't a skeptic who converted. The narrow-orchestrated-agent idea is already there in 459. What changed is the platform (Foundry multi-agent, OneLake catalog, Copilot Studio tool) and his wording: "you are the sales agent" (2025) became "you are a sub-agent" (2026). Frame "sub-agent" as his current view; the phrase only appears in 560.

**Mike only, do not give to Tommy:** context lives in the model (Marco Russo); 15K char limit so split agents per source; sub-agents get fresh smaller context windows (coding analogy); 400 CU / 4 queries on F2, "150 CUs per chat"; modeling MCP does what a data agent does; data agents "junk" abstraction (541); router at top of org (554); logs must be agent-analyzed.

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
