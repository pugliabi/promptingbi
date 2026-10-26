# Ep 570 angles — Score the workstream, not the artifact

Ore file. Draft later from `transcripts/ep-570.txt`. Do not treat this as the article.

- Episode: 570
- Title: PADU and Fabric
- YouTube: https://www.youtube.com/watch?v=6w8E-5SwvoQ
- Notion: https://app.notion.com/p/3d7e74c69c1880afb395ed7aa68678a4
- Transcript: `transcripts/ep-570.txt`
- Aired: 2026-10-08 (uploaded 2026-10-09). No guest.
- Source: YouTube auto (no speaker labels). Book on the table is *Fatal Risk* by Roddy Boyd (ASR: "Rody Boyd"). Tommy is reading it. Mike looks the author up live.

**Mike-only:** IQ names are fanfare; he wants M365 agents he can see, and the Grokbot "Google does not need an IQ brand" rant. Ontology should be API calls, not another agent burning CUs. SQLBI / Tabular Editor were cautious, not anti-AI; creator agent builds the deterministic thing and leaves; business logic is already in DAX, M, and SQL; he wants a knowledge graph, not Microsoft's ontology; the spec belongs in markdown one layer above the model. Shadow IT is what you get when you do not hand people tools. Fabric SQL on a small capacity eats CUs just by running; on-demand billing is why he would still use it, and he has not seen the numbers. Git is preferred. Deployment pipelines and deployment plans are accepted. Publishing into prod outside the pipeline is unacceptable because it breaks the report-to-model link. Agents make git mandatory because they can delete a fact table on a live endpoint. Dataflow Gen2 is accepted as the stepping stone; he hopes an agent rips it into a notebook. Data agents are discouraged; build a custom harness, a CLI, or a Fabric app.

Skip: baseball, Chicago meetup logistics, the Skill Vault livestream, the RTI/IQ news tour except the two Tommy lines below, and the SQLBI article recap (that turn names neither host).

**Unlabeled, so out of his mouth:** lakehouse preferred, SharePoint accepted, personal gateway unacceptable; "publish what you did three years ago and you're wrong"; the real-time-vs-event-driven answer; trust and data quality as 50/50 with capacity units; data agents "the lemon isn't worth the squeeze" and the later "accepted if used right"; Spark environments preferred; user data functions and Fabric apps preferred; ontology unacceptable. The dataflow "I could not disagree more, discouraged until the cost drops" turn does not name Mike. Do not write it as Tommy until he claims it.

**Do not rewrite:** [Four Pillars of Data Governance](/2026/08/31/four-pillars-of-data-governance-agents/); [Write the Contract Before You Hire the Watchdog](/2026/09/02/write-the-contract-before-you-hire-the-watchdog/); [AI Made Your Center of Excellence Bigger](/2026/08/24/ai-coe-better-not-bigger/); [Before the Fabric Adoption Roadmap](/2026/07/27/step-zero-before-the-fabric-adoption-roadmap/); [You Don't Have an AI Strategy](/2026/09/09/you-dont-have-an-ai-strategy/); [Central BI Is a Tiger Team Now](/2026/09/18/central-bi-is-a-tiger-team-now/); [Don't Let Your Agent Touch Fabric](/2026/08/17/dont-let-your-agent-touch-fabric/); [A skill.md Is Not Wisdom](/2026/09/21/a-skill-md-is-not-wisdom/).

Adjacent: 568 ontology authoring; 563 Fabric Apps; 554 Fabric as a backend.

## Published (2026-10-26)

- Merged with the Fabric Credit Ratings launch (ep 573, `transcripts/ep-573.txt`) into `published/2026-10/2026-10-26-why-i-built-fabric-credit-ratings.md` ("Score the Workstream, Not the Artifact: Why I Built Fabric Credit Ratings"), live at https://promptingbi.com/2026/10/26/why-i-built-fabric-credit-ratings/. Notion: https://app.notion.com/p/405e74c69c1881c39b74c6399b75ed45 (Published, Episode = 573 + 570).
- Tommy's second pass added the "Why I built it" section: community, quarterly rounds with history, why outlook matters (Dataflow Gen1 BBB+ with outlook 2, Copilot in Fabric 2/2 with outlook 4.5), and the MVP LinkedIn ask. Humanizer + delete-ai-words pass done. Published without a banner; `featured` is commented out in the front matter.
- Uses the book, the four rungs, the SQL database contrast, and the paginated exception. "Preferred Is Not Mandatory" is folded in. The "trust and data quality 50/50 with CUs" line is in the draft as Tommy's (same speaker says "what I love about… the book"); confirm with him.
- Filed as Idea: "Somewhat Good Is Not the Skill" (https://app.notion.com/p/405e74c69c1881069894cab81944cd0e).

## Best plots

- **Write first:** opinion. A PADU bucket belongs to the job. The same Fabric SQL database is preferred for an app integration and only accepted for analytics.
- How-to: no. He does not fill the card. A filled PADU table would be invented or stolen from Mike.
- Artifact: none.
- Honest: he brought the book and the rung definitions. Mike filled most of the cells.

## ★ Write first: Score the Workstream, Not the Artifact

**Thesis:** Preferred, accepted, discouraged, and unacceptable are judgments about a job, not a score you stamp on a Fabric item. Fabric SQL is preferred when the app has to talk to other systems. For analytics, at this point in Fabric and Power BI, that same database is accepted. A lakehouse is not preferred or accepted in the abstract. The workflow decides the bucket.

**Plot:** opinion. One worked contrast: the same SQL database, two jobs, two buckets. His four rung definitions are the rubric. Do not publish a tenant bingo card.

**Material (Tommy):**
- Fatal Risk / AIG, read by him. Four buckets. Quarterly statements online only is preferred. Online plus a printed annual is accepted. Defaulting to paper is discouraged. Print-only is unacceptable and eliminated. Preferred is not mandatory. Unacceptable, if a team kept doing it, was a firing offense. ASR: "fireball offense."
- Three years after the 2023 announcement, the lay of the land is clear enough to say what is best, what governance allows, and what is unacceptable. He does not think a Fabric PADU exists. Microsoft docs show workflows and do not mark the highly discouraged ones. The object is practices, process, artifacts, and technology. A workflow counts as much as a tool.
- His rungs. Preferred: recommended, not enforceable, and where people get hired and promoted. Accepted: fine, no stink, preferred is still better. Discouraged: we note it and we talk to you. Unacceptable: tomorrow's priority.
- The load-bearing claim, addressed to Mike: you cannot score a tool apart from the workstream. Fabric SQL is preferred for application development when the app has to talk to other systems. For analytics, that database is accepted, not preferred. "What are you using it for?" Only a few things on the list can be categorized alone, and he does not name them. ASR: "lighouses."
- Paginated reports, one cell he does fill, addressed to Mike: discouraged unless invoices, email, or automation. Mike had just put them at accepted, almost preferred, and blamed the UI. Use as a second example of "the job decides," not as its own post.
- You would want SQL, PySpark, DAX, Git, and Power Query all preferred. That is not realistic for one person. Most developers are still just getting into source control. He asks where Git and deployment pipelines land. He does not answer. Keep the language line. Do not give him Mike's git / pipeline / publish-direct card.

**Attribution:** Tommy on the book, the four rungs, the workstream claim, the SQL example, and the paginated exception. Mike owns the storage card, the CI/CD card, the SQL capacity bill, and the data-agent verdict.
**Freshness:** leftover vs the governance-pillar posts and the CoE posts. Those are about who owns the rules. This is about refusing to score an item without the job.

## Other angles

### Preferred Is Not Mandatory
**Thesis:** A center of excellence can publish the four buckets, and preferred is the hire-and-promote rung, not a mandate. Microsoft's docs still will not say what is discouraged.
- Powers it: the AIG reading, the firing-offense line, workflow-not-just-technology.
- Thin: he fills almost none of the cells. A how-to card would have to be invented.
**Plot:** opinion. Fold the rung definitions into the workstream post. Do not ship this alone.

### Somewhat Good Is Not the Skill
**Thesis:** Anyone can get a decent semantic model from AI. The skill is the prompt, the context, and the MCP.
- He loves starting from the questions that define a customer rating instead of "create the measure." He asked a team the day before if they were going to use AI and said yes, if that was okay. His claim: anyone can get somewhat good results on Fabric and semantic models. The skill is the right prompts and context through the MCP servers. He says he had more thoughts and does not give them.
- Creator agent, knowledge graph, semantic views, and the markdown contract are Mike.
**Plot:** opinion. Collides with Write the Contract and A skill.md Is Not Wisdom. Leftover.

### One Person Is Not Preferred in Five Languages
**Thesis:** SQL, PySpark, DAX, Git, and Power Query cannot all be the preferred skill for a single developer.
- He asks Mike to place Git and never places it. Preferred Git and "agents will delete the fact table" are Mike, and that last one is already Don't Let Your Agent Touch Fabric.
**Plot:** thin. One paragraph inside a later skills post.

### The IQ Map Is Still Pangaea
**Thesis:** Microsoft is seating Fabric inside an IQ vision and the plates are still moving.
- Fabric is more defined, still Pangaea, tectonic plates still moving. He does not like that you cannot use a service principal. ASR: "pangia," "service principle."
- The Grokbot anti-IQ rant is Mike. Ontology-as-knowledge-graph is Mike.
**Plot:** news reaction. Skip unless a later IQ post needs the service-principal dislike.
