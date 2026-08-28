# Ep 504 angles — Living in a Direct Lake World

Ore file. Draft later from `transcripts/ep-504.txt`. Do not treat this as the article.

- Episode: 504
- YouTube: https://www.youtube.com/watch?v=r_AsPpWZvEk
- Notion: https://app.notion.com/p/303e74c69c188079a7d5dc505812757a
- Transcript: `transcripts/ep-504.txt`
- Source: YouTube auto (no speaker labels)

No published/draft post from this episode. Adjacent (do not copy): MCP execution session, don’t-let-agent-touch-Fabric.

## ★ Write first: There Is No Notebook in a Day

**Thesis:** Direct Lake is the right default for certified models, but import still owns the people who can click-and-drag in Desktop and will never take a Python handoff.

**Material (Tommy):**
- For nine years, import was 99.9% of Power BI. Live question: is Direct Lake now that default, or does import still have a claim.
- He will not walk into a midsize company, stand up notebooks for the model, and hand it off. Dashboard in a Day exists. Notebook in a Day does not.
- Excel-training audience: not “developers,” still build real Power BI, 90% of it is UI. Put them in a notebook and they are gone.
- You cannot say: everything is Direct Lake, and if you need a transform, learn Python and Spark.
- Even if Fabric gets a seamless “talk to the agent, get a notebook” path, import is not buried until Nancy-who-can’t-unzip-a-file is supposed to trust that output. You still test and verify.
- Mike: bury it / it’s licensing / six-month steak bet. Tommy’s close: we are not burying import right now.

**Freshness:** fresh.

## Other angles

### If It’s Certified, It Better Be on the Lakehouse
**Thesis:** Governance and reuse lose if certified models still hide business logic inside import Power Query.
- Preferred path for governance/adoption: centralize in the lakehouse, Direct Lake the model.
- Certified model: better be Direct Lake rather than import.
- Import transformations lock logic in one model. Reuse means the transform lives upstream.
- That is the rule for the gold path, not a ban on import everywhere.
**Attribution:** Tommy (Mike supplied Roach’s maxim. Don’t lead with Mike’s line).

### Desktop Is No Longer Where Tables Get Fixed
**Thesis:** Direct Lake is a modeling surface, not a shaping surface. Table changes go back to the notebook/lakehouse, and that is the real developer-experience tax.
- Connect to OneLake: no report canvas, semantic model only, auto-saves. He likes that.
- Import still lets you reshape even clean data. Direct Lake assumes format and structure are already right.
- You can rename columns/tables in the model. You are not adding net-new columns or going back into M.
- MCP can touch DAX. It cannot reshape Direct Lake tables. Change the table → notebook → lakehouse → model updates.

### Under 20 GB, Direct Lake Is a Lifestyle Choice
**Thesis:** Most models still live under a gig. Direct Lake’s payoff is weak until you’re past the small-model bulk, so PPU import remains a rational cost design.
- He pushed back on 100 GB as the interesting case. He wanted the middle of the distribution.
- Under ~20 GB, Direct Lake benefits are pretty minimal. It shines at “common large,” not at 100–900 MB.
- Median of all models still isn’t close to a gig.
**Attribution:** mixed (1 GB Pro→PPU cliff is Mike).

### Open the Model and the Milestone List at the Same Time
**Thesis:** MCP stops being a chat toy when it can read the live model and the project notes and tell you what’s missing against the milestone.
- Power BI MCP on localhost talks to the running model like Tabular Editor / DAX Studio.
- Client setup: Notion has milestones, transcripts, dashboard requirements. Model is open.
- Ask: given this milestone and this model, what’s missing / what can we transform now.
- Output he cared about: a technical outline of remaining work, then back to Notion.
**Freshness:** adjacent to published MCP-session / harness posts. Leftover, not write-first.
