# Ep 572 angles — The agent offered a rule it could not write

Ore file. Draft later from `transcripts/ep-572.txt`. Do not treat this as the article.

- Episode: 572
- Title: Does the Ontology Agent Change Our Minds?
- YouTube: https://www.youtube.com/watch?v=3Tyy-ORNsA8
- Notion: https://app.notion.com/p/3f2e74c69c18808ebb23d6c225c89ad7
- Transcript: `transcripts/ep-572.txt`
- Aired: 2026-10-15. No guest.
- Source: YouTube auto (no speaker labels). Learn doc they unpack: https://learn.microsoft.com/en-us/fabric/iq/ontology/tutorial-4-use-agent

**Mike-only:** Ontology items must bind to a real table. He hated the first click-heavy UI and still cannot see the point of the artifact. Supporting pieces he names: eventhouse, KQL database, graph model. Tommy never describes those. Live: the agent answered "Azure-related topics" to "what is a namespace." Do not give Tommy the namespace definition. Agent cannot relate Customer to Fact Sales while the card is on screen. Contoso "exposes zero tables." He calls the agent a reskin that makes a useless product worse. OSI / "Aussie" YAML, airport example, the 15-minute HTML visualizer. That is the ep 567 semantic-views ore, and it is his. Outlook: Copilot created a rule and would not run it. "Anything I can do, the agent should be able to do." Skills Vault had full control because it was CLI, then API, then UI. His verdict after the close: not ready, interesting to muck with, do not implement, maybe the API or MCP. "Hold off. Do not implement this" is that close. Do not put it in Tommy's mouth.

Skip: chiropractor open, outro, song. Fabric app functions as a product tour. Tommy's attributed slice there is only that nobody is getting a dev team and you will not build Fabric apps by hand. Materialized lake views: his only opinion is that they are conceptual, "not for the faint of heart," and not where you start. OneLake File Explorer for client validation is a tour.

**Do not rewrite:** [Hard Data, Soft Data](/2026/08/26/hard-data-soft-data/); [A skill.md Is Not Wisdom](/2026/09/21/a-skill-md-is-not-wisdom/); [Agentic Distributed Wisdom](/2026/09/30/distribute-the-wisdom/); [A Data Agent Should Be a Sub-Agent](/2026/09/23/a-data-agent-should-be-a-sub-agent/); [Fabric Is Best as a Backend](/2026/10/05/fabric-is-best-as-a-backend/); [One Visual Was Never the Job](/2026/10/16/one-visual-was-never-the-job/). Ep 568 already holds ontology-as-a-layer and authoring-from-a-model. Ep 567 holds semantic views as YAML. This episode is the test of the authoring agent 568 hoped for.

Adjacent: 568 FabCon ontology; 570 PADU (ontology sat in the unacceptable cell on the agenda, and that vote is unlabeled).

## Best plots

- **Write first:** opinion. The agent built the ontology off a gold lakehouse, then accepted its own plain-English rule example and refused to write it.
- How-to: no. He does not describe rule syntax, bindings, or what a rule evaluates.
- Artifact: none.
- Honest: authoring moved. Shipping did not. The "I wouldn't recommend this to a client yet" line is unlabeled. Leave it out until he claims the wrap-up.

## ★ Write first: The Agent Offered a Rule It Could Not Write

**Thesis:** An ontology agent that can build the ontology and then cannot perform the write it just offered teaches people not to trust the next button. He is impressed, and he is fearful. He is not frustrated. If it cannot write the rule it invented, he does not trust it to read a PDF of business definitions either.

**Plot:** opinion. One scene: gold lakehouse in, ontology out, then the rule example pasted back and refused. Preview-as-the-front-door and no rollback are the closer, not a second post.

**Material (Tommy):**
- Old build was clunky, docs were poor, and the only story was "use it in a data agent." Creating one was "a bore, to a point of torture." He asks Mike whether the agent changed Mike's mind. His own "no" is the next unlabeled turns. Do not quote a Tommy "no." The change he does claim is narrower: the wheels are turning on authoring.
- Fabric definition, not Webster, addressed to Mike. Binds a lakehouse, a database, or a semantic model. "Semantic models are coming" is his. Do not extend it. Business concepts, properties, relationships, rules, metrics. Explicitly not semantic-model thinking: customer, product, order, asset, location. Goal is a common vocabulary for analytics, operations, dashboards, and agents. Analogy: the old Google side card. Stadium: a stadium has people, people have types, people buy tickets. ASR on the Google card is fuzzy ("Christopher Columbus that was on Monday"). Use the stadium.
- Plan versus act, as he described it. Do not add stages. US only. Lives inside the ontology, not a separate item. The blank page leads with "create an ontology using an ontology agent," which he treats as Microsoft's preferred path. Two jobs: plan (tell it the data, workspace recommendations, clarify, refine) and act (build). "I think four areas": discover, draft, validate, apply. Also, in his words: query, explain, detect changes, propose updates. "Uses a bunch of skills." No skill names. He likes plan mode because you can start from a general query instead of a full spec. He never says he was in act mode for the rule. Do not assert it.
- The test. Alex Powers' Fabric task flows seeded a workshop workspace: stadium business, concessions, attendance, concerts, not baseball stats. The agent built a "pretty comprehensive" ontology off his gold lakehouse. "The wheels are actually turning, which I do not think they were before." That is the change: authoring works. It is not a change of mind about shipping it.
- The refusal. The overview said start a rule. He asked "can you create rules?" It said yes, gave an example ("create a rule that flags this," send it in plain English, it will turn it into an ontology rule). He pasted that example back. It answered, twice: "I can't create rules with the tools available in this conversation. I can help you draft the rules, but I can't create it." "You just said you could." He does not describe rule syntax. Do not invent it.
- Trust, addressed to Mike. "I'm not frustrated, Mike. I'm conflicted." Impressed it could explain, suggest, discover, and build. "Huge first step." Fearful: if it offers a rule and cannot write it, he does not trust it to read a PDF. Business definitions are not 1:1 with the lakehouse (sales regions with no equal filter). "That's why we have jobs." Comparison he does make: he can ship a Fabric app in TypeScript with secure functions without knowing TypeScript, so this should work too. He does not, in an attributed turn, reverse that into "humans must understand the ontology unlike an app."
- The kill-it beat. He zooms in on Microsoft: if an agent says it can do a thing and then cannot, you have to pull it, because the user asks what else does not work. Mike calls it Tommy's zoom-in rant. The caption turn itself does not name Mike. Keep it as his scene, and do not pad it with the unlabeled "they're going to walk away" echo.
- Preview, addressed to Mike and to Microsoft. "If you call something preview, you cannot also promote it in the product as the primary way to act on that artifact." The first thing on a blank ontology is "create an ontology using an agent." If it is preview, that belongs behind a "do you want to try this," not as the recommended path. Notebooks-in-preview is his comparison. If he is publishing something his organization is responsible for, documented limit one is no rollback and no version history. The turn dies on "Two." Do not invent limit two.
- Context files, thinner. Attach data dictionaries, Excel, business requirements, text, PDFs, images. Up to 10 files. "They have to be 5 megabytes." He calls that generous, so read it as a cap, not a minimum. He never shows a file he attached. Same-workspace rule is him reading the docs at Mike: if the data is elsewhere, shortcut it in. "Context is what makes an agent work" is unlabeled.

**Attribution:** Tommy on the gold-lakehouse build, the pasted rule, conflicted-not-frustrated, the PDF fear, the sales-regions gap, the preview-as-front-door line, and no rollback. Mike owns the Customer-to-Fact-Sales failure, the OSI visualizer, the Outlook parallel, and the "hold off, do not implement" close.
**Freshness:** ep 568 bet that an authoring agent was the reason to pick ontology, and he had not used it. This is the test. It built the ontology, and that still was not enough, because it advertised a write and refused it. Not another ontology-as-a-layer post.

## Other angles

### Preview Cannot Be the Front Door
**Thesis:** Preview is fine. Preview as the first control on the artifact is not, especially with no rollback when the org owns the result.
- Powers it: the blank-page CTA, the preview sentence, and "no version history."
- The notebook analogy in the closer is his. "Do you want to try this?" is the shape he wants. One slogan. Use it as the closer of the rule post.
**Plot:** do not ship alone.

### Plan Mode Started the Ontology. The Write Is What Broke.
**Thesis:** He wants a vague prompt, then discover, draft, validate, apply. The failure is a claimed write.
- He hedged the four areas ("I think"). He never says he was in act mode for the rule.
**Plot:** fold into the rule post. Do not add a fifth stage or name skills.

### Attach the Dictionary, Then Don't Trust It Yet
**Thesis:** The file cap is the actual ontology input, because the business vocabulary is not in the lakehouse.
- Powers it: the file list, the 5 MB cap, and "that's why we have jobs."
- He never shows a before/after. Drifts into Hard Data / Soft Data and skill.md-is-not-wisdom if it becomes a wisdom essay.
**Plot:** one paragraph inside the rule post. Not a how-to until he confirms a file he used.

### An Ontology Is the Side Card, Not the Model
**Thesis:** Shared vocabulary for agents and operations, told as the stadium, not as a second semantic model.
- He also says you can build from a semantic model, and semantic models are "coming." "Not a model" cannot become "replaces the model."
**Plot:** thin against ep 568. Leftover.

### Don't Hand a Client the Agent That Built It
**Thesis:** He got the authoring win and still would not put it in front of a client.
- "I wouldn't recommend this to a client yet," the Q&A adoption analogy, and "this is not a TypeScript app" are one unlabeled answer after Mike asks for the wrap-up. A listener would call it Tommy. The turn names neither host. Do not draft this until he says the wrap-up was his.
- The attributed half is org responsibility plus no rollback. That already closes the rule post.
**Plot:** blocked on confirmation.
