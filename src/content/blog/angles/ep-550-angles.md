# Ep 550 angles — BI in the Age of AI

Ore file. Draft later from `transcripts/ep-550.txt`. Do not treat this as the article.

- Episode: 550
- YouTube: https://www.youtube.com/watch?v=itGh4f4KQuM
- Notion: https://app.notion.com/p/397e74c69c18808ab6b6dbcd3de811bc
- Transcript: `transcripts/ep-550.txt`
- Source: Notion meeting note (no speaker labels). Skip vendor horse-race recap as the article.

**Mike-only:** RTI is a niche he does not live in; ontology item tried three times, built Power Designer lineage instead; “Microsoft is not a closed system”; BYO-agent via his workload; Copilot CU / pay-per-use as fleecing.

Adjacent: Hard Data Soft Data (soft context for agents), You’re AI Ready.

## ★ Write first: Your Semantic Model Is Not Semantic

**Thesis:** Microsoft spent the word “semantic” on a model that stores the data, then pointed Gartner at ontologies as the next layer. An ontology that cannot share one metric across SQL and DAX, or tell you which of ten date tables to use, is lineage with a buzzword.

**Material (Tommy):**
- Gartner summary: shift from standard semantic models to ontologies, plus read-write in the analytics environment. Buzzword pile. Tommy wants the purpose, not the item name.
- Gap: today’s Fabric ontology is lineage / pulling items together. Is it for a data agent? An operational agent? Roadmap is not clear. Does not feel like Microsoft is asking what we need it to be.
- Load-bearing tests it currently fails: reduce tokens, share business logic across the team, define one metric usable in SQL and in Power BI.
- Apache OSI / open semantic interchange is closer to the job: meanings, SQL, DAX, tables, no data stored. Org-wide semantic layer. Data stays in tables.
- Naming screw-up: a “semantic model” in Microsoft-land is semantics plus the imported data. Words mean things. Need the enterprise view of meanings, not another place the numbers live.
- Analogy (UNCERTAIN speaker, fits Tommy): iPad mini with no touchscreen. You can load one model in. Then what. Second model, two tables that are the same table, ten date tables with different columns. That is where an ontology would earn its keep.
- **Mike owns “I built Power Designer lineage because of this.” Do not use that as Tommy.**

**Freshness:** fresh. Adjacent to Hard Data Soft Data (soft context for agents). This one is the Fabric ontology *item* and the burned word “semantic,” not meeting notes vs tables.

## Other angles

### Workspace Sprawl Is Not a Product Defect
**Thesis:** Gartner listed easy workspace creation as a Microsoft caution. That ease is the product. The real caution is for orgs that never stood up a BI COE.
- Three cautions: Fabric dependence, shared Copilot/capacity, workspace proliferation. Tommy’s MS-reading-the-cons reaction: sweet, those are not bad.
- Fabric dependence: “duh.” Full value tied to capacity is the strategy, not a gotcha. Import in Desktop still exists.
- Proliferation / duplicate reports / fragmented models: that is the assignment. You cannot have only-IT-builds (no dupes, no reports) and easy authoring.
- Line-item translation: go read the Fabric adoption roadmap. Have a BI COE. Without it this runs wild and you pay for it.
**Freshness:** adjacent to CoE-better-not-bigger and You’re AI Ready. This is classic PBI sprawl, Gartner called it a vendor flaw.

### The Quadrant Is Still Measuring Chat
**Thesis:** Gartner made agentic insights and conversational analytics mandatory. The useful job is still discovery, then a reusable artifact. Asking the agent for revenue is how you buy the same answer forever.
- Mandatory-to-make-the-cut now includes agentic insights and natural-language analytics.
- Close (Mike, Tommy “100%”): marketing is “don’t build complicated things, talk to agents.” That fleeces tokens. AI belongs in unknown/discovery, then you hard-code a report/script/tool.
- Tommy closer: if people do not trust the data and cannot get to it, chatbots do not matter. Claim used on-air: 498 of 500 Fortune 500 on Power BI.
**Attribution:** Mike-led. Tommy affirmed and landed on trust/access. Do not write this as Tommy’s creator-agent manifesto.

### I Only Open the Other Tool to Leave It
**Thesis:** In this practice, Domo and Qlik show up as migration sources, not destinations. Tableau still owns community; cost and operational analytics are still dealbreakers.
- Only reason he looks at those platforms: new project, you are on Domo/Qlik, how do we get the equivalent in Power BI.
- Tableau pro he will grant: community gallery, public sharing. Microsoft has no real answer. Blog galleries are “okay at best.”
- Tableau cons he treats as fatal: cost/licensing, agentic stack, operational analytics.
**Freshness:** thin. Optional Idea.
