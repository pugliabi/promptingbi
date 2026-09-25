# Ep 566 angles — Agentic Dev of PBI Reports

Ore file. Draft later from `transcripts/ep-566.txt`. Do not treat this as the article.

- Episode: 566
- YouTube: https://www.youtube.com/watch?v=8z7ZTswMr0M
- Notion: https://app.notion.com/p/3bce74c69c18809aac5bd34c07bf40d2
- Transcript: `transcripts/ep-566.txt`
- Source: YouTube auto (no speaker labels). Guest: Kurt Buhler (final Kurt day of this run). Three speakers → vocative mining is leaky; long unlabeled turns are mostly Kurt.

**Mike-only:** “everything goes browser” since ep 1 / 2021 victory lap; Jan–Feb despondency then FabCon Atlanta turn; “use AI to build the report, not to answer the data” (with Kurt asterisk on explore); Jev / computer-vision inflection; requirements-as-scaling muscle-shirt gag; Department of Common Sense shirt callback. Don’t steal.

**Kurt-only (do not write as Tommy):** agentic reports crossed a threshold last week (outlandish designs in 30–45 min); left Desktop ~Jan/Feb; PBIR CLI + Maxim; Opus low for iterate / big models for planning; “requirements gathering is a scaling activity”; skills = processes not bar-chart skills; tools > raw metadata edits; airport metaphor (goal is fly somewhere, not build the airport forever); fog-of-war / fail-fast map scouting; never let the agent write the plan (adversarial challenge only); cannot slap an MCP on Desktop and magically get reports; property ambiguity (data-point fill vs bar color). Guest episode. Quote Kurt with a name or skip.

Skip as the article: Fabric Quest build-through tease (fun, not the post unless he ships a how-it-was-built later); James Serra “AI-ready data” news recap alone; Microsoft MCP-server body count joke.

**Do not rewrite:** [Design the Report From the Meeting You Already Had](/2026/08/19/design-the-report-from-the-meeting-you-already-had/); Stop Re-Prompting / Project Hub / MCP execution session (context harness already shipped); [Build the Thing That Creates the Thing](/2026/09/16/build-the-thing-that-creates-the-thing/); [A skill.md Is Not Wisdom](/2026/09/21/a-skill-md-is-not-wisdom/); governance pillars / “You’re AI Ready. Your Organization Isn’t.”

Adjacent: 565 identity / effort graph; 563 Apps interesting≠useful; 560 data agents; published meeting→design brief.

## Best plots

- **Write first:** opinion/how-to hybrid. 80% of agentic report work is the context harness (Notion master sequence), not the prompt that paints the visual.
- Misconception: stakeholders hear “agentic BI” and picture a chatbot. The valuable shift is agents that **build** the persistent report.
- Kurt-owned but citable: requirements are a scaling activity now. Only use if Tommy answers with his harness, not Kurt’s recipe.
- Artifact: master-sequence / context-harness slice for report projects → `/prompts/` if he drafts. Do not paste Kurt’s PBIR CLI path as Tommy’s.
- Honest: Kurt owns the “it suddenly works” demo and the engineering roadblocks. Tommy is thin on report-agent technique; thick on where the hours go and what “agentic” is mistaken for.

## ★ Write first: Eighty Percent of Agentic Report Work Is Not the Report

**Thesis:** When people try agentic Power BI reports, they open Claude and ask for a page. That is the execution harness. The hours that actually move the needle are upstream: the Notion (or wherever) context bank, the master sequence that says which stage you are in, the data dictionary pulled from the model, the meeting notes tied to what will get built. Without that, you are flying half a plane. Speed on the canvas without a context harness is just faster sprawl.

**Plot:** opinion + thin how-to. Walk *his* Notion master-sequence loop. Cite Kurt’s “requirements are a scaling activity” as agreement, then land on Tommy’s harness split. Do not tour PBIR CLI, Opus low, or Jev.

**Material (Tommy):**
- Wants the conversation on the **planning** side when Kurt opens requirements-as-scaling.
- Time-spent argument: ~80% of his agentic development is in the context area. Notion = second brain + master sequence instructions for Claude. Large projects: data discovery → semantic model → report design, with skills/custom agents that write a master-sequence page telling Claude “we’re done with X, go to this page for this session.”
- Session start is often: look at this Notion master-sequence page for project X; get on the same page. That loop is the **context harness**. Doing the work is the **execution harness**.
- Feeds requirements, meeting context, and model metadata (Notion holds a data dictionary read from the semantic model) into what actually gets built.
- Warning: you can absolutely just start prompting in Claude Code against a PBIP. Gains show up when the environment is set up.
- Design is maybe 30% of a good report; data + evaluation context + conditional formatting are the rest. Games (Fabric Quest / TypeScript) have more training examples than PBIR. Ambiguous visual properties make agents stumble. (Supports why context beats “just MCP the canvas,” without stealing Kurt’s MCP-won’t-magically-work rant.)
- Too early for a universal howto; think **recipe / ingredients**, not install-this-run-that. (Aligns with Kurt; Tommy’s line.)
- Misconception beat (later in ep): ask what “agentic development” means and a stakeholder answers conversational analytics / chatbot. The meaningful shift is agents building **persistent** report artifacts. He and Mike have pushed Microsoft: use AI to build the thing you look at every day, not to be the executive’s answer engine. (Kurt asterisk: explore with agents; don’t let the exec rely on the agent for the decision. Keep the asterisk attributed.)

**Attribution:** Tommy on 80% context / master sequence / harness split, stakeholder-chatbot misconception, design-is-30%, recipe-not-howto. Kurt owns scaling-requirements phrase, Opus low, CLI, airport, threshold-crossed week, plan-is-my-house. Mike owns build-don’t-answer slogan and browser prophecy.
**Freshness:** leftover vs Design-the-Report-From-the-Meeting (meeting → brief) and Stop Re-Prompting (harness for Fabric projects). This is **report-agentic hours go to context**, not “write a design brief from a transcript” and not the generic project-hub tour.

## Other angles

### Agentic Does Not Mean Chatbot
**Thesis:** Most companies still hear “agentic AI for data” as conversational analytics. Agentic *development of reports* is a different job: persistent PBIR artifacts, not a chat answer the exec trusts.
- Strong teaching beat. Overlaps Mike’s build-don’t-answer and published data-agent / sub-agent posts. Use as a short lede inside write-first, or a leftover Idea if write-first stays pure harness.
**Plot:** opinion. Thin alone; good series glue with 560.

### No Governance, No AI Yet (Baseball Is Not Basketball)
**Thesis:** AI-ready is not clean data. Six customer rollups with one word “customer” is an ontology failure. If the org will not name distinct objects distinctly, do not turn agents loose. Foundation for AI-ready is an already-healthy governance program.
- Baseball ≠ basketball naming riff is his. Collides hard with published governance / “You’re AI Ready. Your Org Isn’t.” Skip unless a sharper client story appears later.
**Plot:** skip as primary. News color from James Serra segment only.

### Fabric Quest Is a Demo, Not a Post
Homestar + Peasants Quest + capacity dragon + Duke of DAX + bronze-water-kills-you. Great open, bad article unless he writes the build-through he offered in comments.
**Salvage:** one paragraph proof that agentic *apps* are ahead of agentic *reports* on training data volume. Do not ghostwrite Kurt’s report-threshold story as Tommy’s game.

### Don’t Turn Kurt’s Saturday Into a Tutorial
Honest: the hour’s technical spine is Kurt’s. If promptingbi.com covers agentic PBIR how-to, it needs Tommy’s harness + a later client build, not “Opus low and PBIR CLI as of last weekend.”
**Salvage:** quote requirements-as-scaling and “too early for the way” with Kurt’s name. Write-first stays on where Tommy’s hours go.
