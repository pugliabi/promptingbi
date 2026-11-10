# Ep 581 angles — Exploring Database Hub

Ore file. Draft later from `transcripts/ep-581.txt`. Do not treat this as the article.

- Episode: 581
- Title: Exploring Database Hub
- Air date: 2026-11-17
- Notion: https://app.notion.com/p/3f2e74c69c188016a035e42a24682e91
- Docs he is reacting to: https://learn.microsoft.com/en-us/fabric/database/hub/overview
- Transcript: `transcripts/ep-581.txt`
- Source: local master `581.mp3`, Whisper turbo. No speaker labels. Paragraphs merge both hosts. Introduced at FabCon Barcelona, still preview. Free to start, Fabric Free, no capacity, no database migration. He reads the four areas as overview, estate, performance, security, and optimization. "Investigate and act" is not available yet.
- His notes on the EMP page, before the show: executives have ad-hoc requests, can the agent understand the source (semantic model vs flat table), "Taste Enginer." The flat-table-versus-model bit on the recording is mostly Mike. Tommy parks his own version.

**Mike-only:** Fabric SQL as an item, no servers, backend for his Rayfin apps. A wave of those databases needs the same kind of single pane as the monitoring hub. In his tenant, Cosmos DB shows performance and his Fabric SQL databases do not (CU, storage, throttling, slow IO). He expected that by default and is not sure which setting is off. Security and optimization have not shipped, so a lot of the overview is blank. The skill will not expose query store, active sessions, query text, plans, blocking, or database-level DMVs. You can ask why it is slow. You cannot ask for the long-running queries. Go to the SQL item for that. He is extending DBA work to app builders and department leads, not minting DBAs. Resource group is there. Workspace name is not.

**Do not rewrite:** [Fabric Is Best as a Backend](/2026/10/05/fabric-is-best-as-a-backend/). [Why I Built Skill Vault](/2026/10/08/why-i-built-skill-vault/) if the skill talk turns into another vault post. The ready-made Database Hub skill is new. Describe only what they actually opened: performance, security, inventory. It cannot enter one database yet.

## Mined Tommy material

- **He parks a better episode on the way in.** Reports may matter less than the pipeline plus agentic access. If he can hand someone the semantic model and they connect Claude or Copilot and get a dashboard, that is more than asking questions. The model has to be there first. He stops himself. He is about to wander into how they build models and the governance of that access, and he says the technology is catching up. Mike then carries the flat-wide-table versus star-schema point. Do not give Tommy Mike's "the agent struggles because it has to run DAX" mechanism. Tommy did not say it.
- **What the hub is, in his words.** One place to discover, monitor, investigate, and act across Azure, Fabric, on-prem, and multicloud. Entra ID. Fabric Free. No migration. On-prem suggestions right now are basically customer-managed keys and whether audit logins are on. No way to customize the performance view he would actually want. He still wants the concept.
- **The inversion.** Before Fabric this hub would have been a much bigger deal for him. Best practice into Power BI was a database. Maybe a warehouse. Not an API, not SharePoint, even if people did it. For about seven years before 2023 the database was the core his reports sat on. He is looking at this hub and it is not for his reporting. His path is a lakehouse, Direct Lake, and a SQL analytics endpoint, and that endpoint does not show up here. "These are databases, not just your analytics endpoints." What the hub is showing him is application development.
- **Two roads, and he is on one of them.** Far side of the curve, where he and Mike sit: lakehouse, Direct Lake, easy. He is also on projects where on-prem data is moving or being mirrored, and for those people this hub matters. Road one: existing databases, which is where the reporting story still lives. Road two: if you are building in Fabric, you are not building databases for reporting. He asks who it is for. DBA, platform team, or BI team, and it depends which databases you mean.
- **He will not say the hub mints DBAs.** Mike's line is that lighter DBA work is landing on app builders. Tommy treads lightly. You can get a degree in this. A real DBA would be offended by "now I'm a DBA because there is a hub." He agrees with the narrower claim: parts of the role are now shared with people who never had the formal training, and he does not know yet if that is good. Deja vu. This is the 2023 argument about whether Fabric was making more data engineers. He remembers those episodes as heated. Microsoft just blogged moving Synapse and Data Factory into Fabric. A ten-year engineer can bring the platform, and with agents you also do not need that background. Same conversation, database edition. Would a DBA trust this enough to leave SSMS? The past was SSMS, a query, maybe the Azure portal. This is friendly and assessed with Entra ID. It does not have every monitoring feature. It is preview.
- **The UI is a connection-string hub.** He does not want to be dramatic about jumping out to the editor. He gets the connection strings. If the hub exists, a bird's-eye view with nothing he can customize is not enough. Put on the DBA hat and it goes gray.
- **The iceberg.** Second paragraph of the docs, before the first section, a green tip: agent setup for Database Hub. "The UI is only the top part of the iceberg." CLI, API, and the agent do more and are the better way to work. He barely edits a notebook in the Fabric UI anymore. He describes the cell, the agent builds it, he checks the result. Or VS Code. Or the agent. The hub should be the same shape. The bundled skill is as bare as the hub: how's it performing, review security, explore the inventory. You cannot go into one database. The skills are a copy of the UI for now. He expects them to grow (who has access). Every Fabric UI feature is showing up with an API and an agent.
- **He would schedule the agent and skip the screen.** A scheduled run that monitors performance is acceptable. He thinks the skill is going to mislead people, because the name Database Hub plus a skill implies you can go deeper than the bird's-eye view. If Microsoft can see the prompts, he bets most of them want to dive in and will get customer-managed keys back. Preview. It does not break anything. Their rule is ship it or kill it. This is not kill-it. Same posture as the Fabric Notebook Toolkit (he calls that pre-alpha, not even preview) and ontology in preview: cautious, not dangerous. He likes the feature. Go read the docs.

## Recommendation

**The screen is the connection string. The job is the scheduled skill.** Title direction: "Database Hub Is an Iceberg" or "I Don't Open the Database Hub." Plot: the seven-year inversion (the database used to be the report, and his report is not in this hub), the two roads so he does not pretend every BI team has left SQL, then the iceberg and the bare skill, with the DBA deja vu as the culture section. The 80-percent-of-prompts line stays a bet, not a statistic. Leave Mike's missing Fabric SQL metrics as a footnote he can confirm, not the thesis.

## Other angles

### The Database Left the Report
**Thesis:** For seven years the best practice was land it in SQL and connect Power BI. His reporting path does not touch this hub. The SQL analytics endpoint is not in it. The hub is for the databases behind apps, and for the teams still mirroring on-prem.
**Plot:** strong, and it is the opening of the iceberg post. Thin alone if it never gets to what he does instead.

### We Are Having the Data Engineer Argument Again
**Thesis:** "Are we making more DBAs?" is the 2023 "are we making more data engineers?" fight. Parts of the role moved. The degree did not.
**Plot:** culture piece. Good section. A whole post needs the 2023 episodes pulled, and he did not restate them in any detail here.

### Give Them the Model Before the Dashboard
**Thesis:** A Claude or Copilot dashboard on top of a semantic model is a real workstream, and it is worthless if the model access is not the first step.
**Plot:** he parked it. Do not write it until he finishes the thought. It wants episode 583's read-access argument beside it.
