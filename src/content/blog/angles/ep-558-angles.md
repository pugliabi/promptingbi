# Ep 558 angles — Medallion Patterns are Changing

Ore file. Draft later from `transcripts/ep-558.txt`. Do not treat this as the article.

- Episode: 558
- YouTube: https://www.youtube.com/watch?v=b3jHfV3CNG0
- Notion: https://app.notion.com/p/397e74c69c188020afe8f076530429d0
- Transcript: `transcripts/ep-558.txt`
- Source: YouTube auto (no speaker labels). First fetch with default lang missed captions; `--lang en` succeeded.

**Mike-only:** lakehouse-only in almost every project; warehouse billing rumble (more on 561); Direct Lake thresholds / Vertipaq-from-Delta; V-Order as Microsoft secret sauce; “Sydney’s article is a miss, should have said this is warehouse-shaped.” Don’t steal.

Skip as the article: Microsoft’s five-part warehouse-medallion series recap.

Beat-from-the-street (SOW PDFs → Fabric) is Tommy and is a separate post, not the medallion thesis.

Adjacent: backlog [Your Semantic Model Needs a `.ai` Folder](../../backlog/2026-08-02-your-semantic-model-needs-a-dot-ai-folder.md); published [Don’t Let Your Agent Touch Fabric](/2026/08/17/dont-let-your-agent-touch-fabric/) (recon); 559 Spark/Runtime 2.0; 562 handoff.

## Best plots

- **Write first:** opinion. Warehouse vs lakehouse is a Spark bill, not a religion.
- Worked example: book-of-business from SOW PDFs (hour, GitHub + Fabric). Different post.
- Artifact: none for medallion. PDF→lakehouse pipeline would be a `python` artifact if that post ships.
- Series: Fabric DE cluster with 559. Weak for promptingbi.com unless it stays on “don’t copy Microsoft’s workspace-per-layer.”

## ★ Write first: Warehouse vs Lakehouse Is a Spark-Budget Argument

**Thesis:** Microsoft’s “SQL team → all-in warehouse, messy data → hybrid” is not an architecture fork. It is “how much Spark are we willing to pay for.” You can run T-SQL in a notebook. Three workspaces for Bronze/Silver/Gold is governance theater.

**Plot:** opinion. No medallion primer.

**Material (Tommy):**
- Medallion stuck around because it was the best tooling then. Tech moved. Microsoft is still treating it as the default Fabric organizer, then asking warehouse vs lakehouse.
- Most people are more comfortable in a lakehouse. Feels less breakable if you are not a DBA.
- Pattern B (lakehouse) = Python/Scala/Spark. Benefit: no copy, OneLake under both. Rule of thumb in the article: SQL-focused → all-in warehouse; unstructured + heavy engineering → hybrid.
- Sounds like a push to warehouse. How often does he actually recommend full warehouse for everything? The article never answers the real question.
- Unless the argument is: we do not want everyone Spark/PySpark intensive. **Resource, not architecture.**
- You can run T-SQL in a notebook and write back.
- Three workspaces for the layers: he would not call that the best governance move.

**Attribution:** Tommy. Direct Lake vs warehouse serving-layer walkthrough in the UNK sample is mixed; do not write “Gold in the warehouse is for write-back apps, reporting still reads the lakehouse” as Tommy unless you re-check the turn.
**Freshness:** fresh. Distinct from 531’s “inventory the team’s skills before you call the stack a waste.”

## Other angles

### I Built a Book of Business From PDFs in an Hour
**Thesis:** The MCP/skills stack is not for prettier notebooks. It is how a GitHub repo of SOWs becomes a Fabric lakehouse, a pipeline, and a report without a Power App in the middle.
- Tried a Power App → Azure SQL → report. Tedious. Every deliverable typed twice.
- Skill: watch the client repo, PDF changes, Notion sync, Fabric database of projects/deliverables/status, book of business, win rate, **deliverable economics** (hours vs cost; training is a bad money-maker).
- Direct link: conversation today → PDF updates → Fabric → report. About an hour. GitHub + Fabric made it possible. HTML could fake it. The estate is the point.
**Plot:** worked example. Strong. Different episode energy than the Microsoft article.
**Freshness:** adjacent to Build the Thing / Task Flow Studio. Keep on “PDF is a source system.”

### Prep for AI Cannot Read the SharePoint
**Thesis:** Desktop’s Prep for AI box is character-limited and model-scoped. The instructions that matter live in Word/Excel/Git next to the model, and the box cannot go get them.
- Rant/wish: an `.ai` folder that behaves like skills, not one text box. Cannot say “go to the SharePoint / GitHub and read it against the model.”
**Collision:** backlog *Your Semantic Model Needs a `.ai` Folder* and *Don’t Write Prep for AI by Hand*. Do not re-file. Use this episode as extra Tommy color on those tickets.

### Grill Me Is the Planning Step
News/street: recon pass before the notebook edit; “grill me” as the default; skill of building the thing that builds the thing.
**Collision:** published Build the Thing, Don’t Let Agent Touch Fabric. Already spent.
