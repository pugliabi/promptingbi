# Prep for AI Is an Agent Job

- **Working title:** Don't Write Prep for AI by Hand
- **Slug:** `prep-for-ai-agent-not-manual`
- **Status:** Idea (not a draft article)
- **Source:** Tommy, original. No dedicated recording.
- **Notion:** https://app.notion.com/p/3c8e74c69c1881169fa7c77b253172a3 (Status: Idea)
- **Repo note:** Distinct from `ep-*-angles.md` (other agent) and from `2026-08-02-your-semantic-model-needs-a-dot-ai-folder.md` (where context lives). This is who authors the first-party slot Microsoft already shipped.

## Core thesis

Prep data for AI in Power BI Desktop is the model's Copilot contract: AI instructions, verified answers, schema and simplification for Copilot and Fabric AI. People treat that pane like a documentation chore you type in Desktop. Wrong job. An agent should write it. Point it at the semantic model, the project hub, and the meetings that already happened. Have it draft the instructions, the verified answers, and the "what Copilot is allowed to see" cuts. You review. You own the definitions. You do not sit in a giant text box and author the model's prompt by hand. If your agent can already fill column descriptions over the modeling MCP, it can author Prep for AI. If it can't, your model isn't ready for Copilot anyway.

## Why backlog

No episode is "the Prep for AI show." Adjacent recordings already argue the pieces: metadata is a product, agents draft descriptions, humans curate, instruction pages should be generated, Copilot on a naked model is a general answer. The new claim is the sink. Write into the Prep for AI feature that already lives in the PBIP, not only into SharePoint, Notion briefs, or a `.ai` folder you invented.

**Do not rewrite:** `.ai` folder (ep 541, where context lives). AI Documentation Trap (ep 529 leftover, verbosity). Stop Re-Prompting (published Claude instruction pages). AI CoE / Four Pillars (catalog sweep, not Prep for AI).

## Angles

### 1. Don't type Prep for AI. Have the agent write the contract. **(write this first)**

- **Title:** Don't Write Prep for AI by Hand
- **Thesis:** The Copilot contract for a semantic model should be generated from the model and the hub, then reviewed. Sitting in Desktop and authoring AI instructions is the new "I'll document the columns later."
- **Ore:** 529, 530, 504 (Mike's 30-min MCP doc pass), 545, 540. Published: CoE sweep; hub-written briefs.
- **Freshness:** High. Nothing on the site names Prep for AI.

### 2. Prep for AI is the `.ai` folder you already have (with limits)

- **Title:** You Already Have a Place for AI Instructions. Stop Ignoring It.
- **Thesis:** Microsoft shipped a home for model-level AI context inside the PBIP. Character-limited, not markdown, not a skills folder. Use it as the contract the agent writes into; keep richer markdown in the repo until the box grows up.
- **Ore:** 542 (Mike names the feature; Tommy: char limit, not markdown). Adjacent: 541 `.ai` folder backlog; 411 (nowhere to store semantics).
- **Freshness:** Medium. Sequel to an unpublished wish, not a duplicate of it.

### 3. Copilot instructions are governance, not a prompt you jot down

- **Title:** Your Copilot Instructions Are a Data Contract
- **Thesis:** Telling Copilot to ignore a misleading visual for a named measure is a governance rule. An agent drafts it from known failure modes; a human signs it.
- **Ore:** 484 (Tommy: AI instructions + giant text box; Chris Webb ignore-visuals). 540 (no agentic Fabric without governance).
- **Freshness:** High vs site. 484 never became a post. Don't recap Chris Webb; use the failure mode.

### 4. The documentation sweep's last mile is Prep for AI

- **Title:** Stop Documenting the Model for Humans Only
- **Thesis:** CoE level one (descriptions, lineage) is necessary and still the wrong last mile if Copilot never reads it. The sweep should emit Prep for AI content, not just a catalog page.
- **Ore:** 529, 545, 539, 540. Published: AI CoE; Four Pillars catalog scribe.
- **Freshness:** Medium. Those posts sold the sweep. This changes the output artifact.

### 5. Same pipeline as the Claude instructions page, different sink

- **Title:** The Hub Should Write Prep for AI the Way It Writes Agent Briefs
- **Thesis:** You already generate an instructions page from the hub and let MCP execute. The model's Copilot contract should come off that same assembly line, into Desktop, not into a second chat.
- **Ore:** 530. Published: Anatomy of a Project Hub; Stop Re-Prompting.
- **Freshness:** Medium. Mechanism shipped. Desktop sink did not.

## Supporting transcript index

Re-read before drafting. This file is ore, not the article. Paths: `transcripts/ep-{N}.txt`.

- **542** — Mike names Prep for AI in PBIP. Tommy: char limit, not markdown. Closest on-air feature name. Mix.
- **484** — Tommy: AI instructions steer Copilot (ignore visuals for a named measure); giant text box, no cookbook. Mike: nervous about misleading answers. Tommy-confident on instructions.
- **529** — Tommy: CoE level one = MCP description/lineage sweep. Isolated chatbot process docs are fluff.
- **530** — Mike: MCP, "write up simple documentation for this model." Tommy: hub writes Claude instructions from transcripts/SOW, then MCP builds.
- **504** — **Mike**, not Tommy. 50-table model; MCP filled descriptions in ~30 min vs 1-2 days. Adjacent practice only.
- **539** — Tommy: metadata as a product. Claude drafts; humans own definitions. Model alone is not enough for Copilot.
- **540** — Tommy: Claude drafts column descriptions; humans curate. No agentic Fabric without governance. Don't just run Copilot on the model.
- **545** — Tommy: agent + MCP for catalog/definitions. Power Apps doc-control failed.
- **411** — Tommy (older): nowhere to store the model's semantics; put contract/SLA in descriptions.
- **508** — **Mike**, passing. Don't lean on this.
- **538** — Tommy asks an agent to write skill instructions. Same instinct, different artifact.

Did not fetch ep 541. Use the published/backlog posts. Don't steal the other agent's YouTube batch.

## Recommended first write

**Angle 1.** The actual new claim. Angle 2 sequels an unpublished post. Angle 5 is a sink-swap on shipped posts. Angle 3 needs Tommy's go on the Chris Webb Copilot-visuals example.

When drafting: re-read 542, 484, 529, 530, 540. No transcript dump. No "in this episode." Walk a real Prep for AI artifact if Tommy will show one; otherwise stop at brief-and-review and don't invent TMDL.

## Gaps (implied, not found)

- Verified answers and schema/simplification: zero named hits. Parked as a 6th angle until a product pass. If confirmed, MCP writes those surfaces and a human reviews the UNKNOWN list.
- Explicit "don't write Prep for AI by hand": never said. Adjacent is don't document columns by hand.
- Writing *into* Prep for AI via modeling MCP / TMDL: not discussed.
- Character-limit / non-markdown workaround: one aside in 542, not a method.
