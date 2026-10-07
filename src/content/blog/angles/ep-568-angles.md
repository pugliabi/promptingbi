# Ep 568 angles — FabCon Barcelona - Feature Draft

Ore file. Draft later from `transcripts/ep-568.txt`. Do not treat this as the article.

- Episode: 568
- YouTube: https://www.youtube.com/watch?v=8Jn9ttXXSs0
- Notion: https://app.notion.com/p/3ebe74c69c18801590b8f40d61224c96
- Transcript: `transcripts/ep-568.txt`
- Source: YouTube auto (no speaker labels). No guest. They draft FabCon Barcelona features against each other.

**Mike-only:** first pick is Fabric Apps production (warehouse + lakehouse connectors, TypeScript functions, secret store, private-by-default) and the “entire businesses on Fabric” paywall riff; Replit-inside-Desktop guess; “we don’t write code anymore”; ontology → “na-chology”; CU fear that Fabric IQ taxes every question; OSI spec as the thing he is tracking. Don’t steal. East US 2 Fabric Apps GA is a shared laugh, not a post.

**Do not write as Tommy:** Arun’s Azure-blog vision statement. Tommy reads it. The thesis is Arun’s.

Skip as the article: a FabCon news recap. Mailbag “tell us which feature to cover.” Metal Gear / Rod Stewart. Claude phone survey.

**Do not rewrite:** [Agentic Distributed Wisdom](/2026/09/30/distribute-the-wisdom/) (he re-pitches the name on air as a future episode; it already shipped from 562); [Fabric Is Best as a Backend](/2026/10/05/fabric-is-best-as-a-backend/); [You're AI Ready. Your Organization Isn't.](/2026/08/12/youre-ai-ready-your-organization-isnt/); governance pillars.

Adjacent: 567 NL app vs Power BI report, YAML-in-OneLake / OSI tease; 566 context hours; 563 Fabric Apps interesting ≠ useful; 555 anonymous apps.

## Best plots

- **Write first:** opinion. Conference features are a draft, not a keynote. Pick what changes the week you already have.
- How-to later, only after he has touched it: ontology authoring agent, or `TEXTCONTAINS` / `TEXTSIMILARITY`. Neither is a post from the announcement alone.
- Artifact: none until he has run the DAX or the agent.
- Honest: Mike owns the apps-platform first pick and the code-is-over claim. Tommy’s draft is three unglamorous picks plus one honorable mention aimed at everyone who is not them.

## ★ Write first: Draft the Feature That Changes Tuesday

**Thesis:** A FabCon keynote is a menu. The useful question is not what Microsoft led with. It is whether the feature changes the workflow you already run, and whether you can pay for it. That is why the flashy app platform can be a first-round pick for someone else while you take the ontology agent you could not build by hand, the notebook toolkit you will open next week, and full-text search because text is about to matter more than another visual.

**Plot:** opinion, structured as his three picks. Do not score Mike’s roster. Do not paste Arun.

**Material (Tommy):**
- Frame: mock draft. Once a name is used it is off the board. Explain why. He gives Mike first pick on purpose, then says the first pick dictates the rest of the roster. He was torn among three and went where the frustration was, not where the demo was.
- Explicit rule later in the draft: he is not talking about the “main” features. Cool is not the filter. Cost is a filter. “Is this new relative to my workflow” is the filter.
- **Pick: Fabric IQ ontology authoring agent.** Two standing frustrations with Fabric ontology: the front end is hard to build, and it is still unclear what you do with the result. Manual build at launch was “what am I adding, and what is the minimum.” The new agent authors from semantic models, OneLake data, and contextual documents, in natural language, and can reuse Power BI measures so metric logic enters the reasoning. “Build an ontology from the semantic model” with no agent was a terrible experience: you do not know what you just made. Barrier to entry is the reason for the pick. He has not played with it. He wants a first-time, on-camera struggle, not a polished demo. Ontology vision, his metaphor: not a green field yet. Dirt roads. They do not lead anywhere, but there are marks.
- **Pick: Fabric notebook toolkit.** Helpful to the work he already does. He will look at cost. He will ask whether it is actually new in that workflow.
- **Pick: full-text search on semantic models, plus `TEXTCONTAINS` and `TEXTSIMILARITY`.** Index text instead of scanning row by row (`SEARCH` / `CONTAINSSTRING`). Auto and full modes; needs the model on a capable SKU. Why now: more AI work means more text and more sentiment, so text columns matter more than they used to. `TEXTCONTAINS` is true on a full-text expansion, not a substring. `TEXTSIMILARITY` returns a relevance score. He says it “breaks what DAX is,” in the sense that large text volumes get easier. He corrects the room: this is not an AI model doing cute search. Mike hears Jev. Do not let that stand in the draft.
- **Honorable mention, not a pick: agentic app creation in Power BI Desktop.** He and Mike will try it. It does not change their week. It can change the week for the mass of Power BI developers and for managed self-service. That is why it gets a mention and not a roster spot. Desktop-must-die is Mike and Kurt. He keeps the mention anyway, for those users.
- Separate claim, park it: Fabric Apps moved fast enough that he assumes Microsoft is building them with their own agentic loop. Speculation. Flag it. Do not build the post on it.
- Also his, not a feature pick: smaller orgs are finally choosing a Fabric direction instead of living in “Power BI plus Fabric someday,” and the SKU bill hits before the proof of concept is understandable. Cost-before-commit. Thin. Could be a sidebar, not the piece.
- He restates distributed wisdom: you cannot talk a large project into existence without shared context and shared skills. That post is live. One sentence of agreement, then stop.

**Attribution:** Tommy on the draft rule, the three picks, the DAX function behavior as he read it, the managed-self-service honorable mention, dirt-road ontology, SKU-before-POC. Mike owns apps-production as the transformative pick, Replit, “we don’t write code,” CU anxiety, and the mashed ontology nickname. Arun owns the “trusted context” vision paragraph.
**Freshness:** leftover vs Distributed Wisdom (already the context argument) and Fabric-as-a-backend (already the app-platform argument). This is **how he ranks a conference**, with full-text DAX and the ontology agent as the two features worth a later how-to once he has used them.

## Other angles

### TEXTCONTAINS Is Not Another AI Search Box
**Thesis:** Full-text indexing plus two DAX functions is a semantic-model feature, not a copilot feature. Substring search was the old tool. Meaning-shaped match and a similarity score are the new ones, and they show up because text columns are no longer a side column.
- Strongest how-to in the episode, and he has not run it. Draft only after a worked model. Do not invent syntax beyond the names and the behavior he stated.
**Plot:** how-to, later. Best leftover if write-first feels too “podcast game.”

### The Ontology Was Unusable Until Something Could Author It
**Thesis:** The first ontology experience failed on the build, not on the philosophy. An authoring agent that starts from a semantic model, OneLake, and docs is the first time the barrier might drop. Still unclear what you do with the ontology after it exists.
- He wants the struggle video. A post that pretends he has built one is a lie.
**Plot:** skip as a tutorial. Opinion only if he will admit he has not shipped one.

### Fabric Apps May Split in Two
He hears two camps: apps as application development on Fabric data, and apps as the agentic visual experience inside Desktop. He is curious whether that becomes two products under one name. He does not pick a lane. Mike’s read is “speak the visual into existence.”
**Plot:** leftover. 567 and 569 already carry the app-vs-report argument.

### Don’t Recap Barcelona
Arun themes (Fabric IQ as the context layer, apps GA, data engineering agent, IQ sharing, Salesforce, real-time) are orientation. The article is the draft rule and the three picks.
