# Ep 508 angles — Kicking Off Fabric the Right Way

Ore file. Draft later from `transcripts/ep-508.txt`. Do not treat this as the article.

- Episode: 508
- YouTube: https://www.youtube.com/watch?v=I2jOUCdnaBg
- Notion: https://app.notion.com/p/319e74c69c188042b6c2c6716712eab9
- Transcript: `transcripts/ep-508.txt`
- Source: YouTube auto (no speaker labels)

No published/draft post from this episode. Adjacent: step-zero before the Fabric adoption roadmap.

## ★ Write first: If It’s Not in the Operations Lakehouse, It’s a Performance Issue

**Thesis:** A Fabric kickoff starts with a written data-flow map of lakehouses as sources of truth, plus real accountability for using them, or you will fragment worse than import-mode Power BI.

**Material (Tommy):**
- Mailbag team: import-only, redundant storage, conflicting DAX. Fabric without a plan makes that easier, not harder.
- Write it down: sales / operations / employee, which lakehouse, who owns it, where reporting pulls from.
- Lakehouse is a different cognitive object than a semantic model: true sources of truth, not “another dataflow.”
- Accountability with teeth: not using the operations lakehouse for operations is a yearly-review conversation.
- Lakehouses built wrong are harder to migrate off than bad semantic models.
- Fresh start is the point of the Fabric move. Don’t spend it recreating personal import silos.

**Freshness:** fresh. Adjacent to step-zero (people/process before the roadmap) but this is the lakehouse map + accountability, not the executive-language test.

## Other angles

### Nine Sales Reports, One Gold Model, Plane Already Flying
**Thesis:** You never stop tickets for two months to rebuild. You cut production, run the Sherlock pass on conflicting DAX, and migrate in flight. Waiting only grows the weed.
- Bottom-up Power BI isn’t “wrong.” It’s how a lot of orgs started. This mailbag is a reporting team, not random M365 heroes.
- Culture read: no working ticket/comms system. Who yells loudest gets the report.
- Previous company: nine models for nine sales reports, then they needed a gold model.
- Not “BI team is on vacation.” Output drops because people are building the better structure instead of clearing the same tickets.
- Conflicting “sales” definitions = investigation before build. The longer you wait, the worse the weed.

### Who Do You Trust With the Gold Lakehouse?
**Thesis:** A Fabric diagram that nobody is staffed or rewarded to follow is theater. Use the migration to change roles, not to make everyone a notebook person.
- Tactical plan (assess, domains, onion, catalog) is necessary. Culture is the other side.
- Director question: who do I trust, who gets a chance to lead gold lakehouses / pipelines / medallion.
- Don’t send the whole team through notebooks. Put extra responsibility on the people who can take it.
- Sword he dies on with or without Fabric: accountability plus reward.

### An App Is Not a Business App
**Thesis:** Writeback has three lanes (translytical, Power Apps, custom app). Power Apps still owns dynamic, identity-aware internal apps even if agents made custom UIs cheap.
- He opened with “I’m going to make the case for Power Apps” knowing Mike would hate it.
- Lanes: one-off in-report change → translytical; bulk / report-integrated → Power Apps; bigger than a report → custom app.
- Load-bearing difference: business app vs app. Sales user sees these four tabs, gray-outs and notifications by signed-in user.
**Attribution:** Tommy (Mike: obsolete, extra license, no Delta writeback).

### Two Folders, One Model
**Thesis:** Merging redundant models is no longer a two-month archaeology project if you can point an agent at the files. Banning that just pushes PBIX onto personal tools.
- His own mess: model → lakehouse → notebook tables → second model + report-level measures. Told GitHub Copilot / TMDL: look at these two directories, make one import model. Done.
- Leadership “no AI” is a value problem: nine-model consolidation is months without the tools, about a week with them.
**Attribution:** mixed (shadow-IT sermon is Mike). Adjacent to harness/MCP posts. Leftover, not write-first.
