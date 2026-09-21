# Ep 559 angles — Fabric Liquid Clustering

Ore file. Draft later from `transcripts/ep-559.txt`. Do not treat this as the article.

- Episode: 559
- YouTube: https://www.youtube.com/watch?v=ODZbchQm884
- Notion: https://app.notion.com/p/397e74c69c18801b995dfb238bb2a5a6
- Transcript: `transcripts/ep-559.txt`
- Source: YouTube auto (no speaker labels)

**Mike-only:** Miles Cole article as the source; `OPTIMIZE FULL` vs incremental; Direct Lake file-skipping; “why wouldn’t you start on Runtime 2.0, it’s GA and becomes default in September”; data agent model locked to GPT. Don’t steal.

Skip: August “backend month” feature dump, warehouse GPU, Cursor/Grok default-model gripe.

Foil: Miles Cole, incremental liquid clustering. Tommy’s job is the baseball analogy + the Dataflows Gen2 punch, not the Z-Cube math.

Adjacent: 558 medallion / Spark-budget; 560 data agents (news overlap).

## Best plots

- **Write first:** opinion. Spark + Runtime 2.0 is the path; Dataflows Gen2 is the minivan you only keep for one team.
- How-to: clustering-column playbook. **Mike/Miles-led.** Only if Tommy later owns a client table.
- Artifact: none. A clustering-column skill would be Miles’s article, not Tommy’s.
- Honest: weakest promptingbi.com episode in 554–564 unless the Dataflows punch is the post. Liquid clustering internals are not the blog.

## ★ Write first: I Don’t Have an Argument for Dataflows Gen2

**Thesis:** Runtime 2.0 + Spark is how you store and transform in Fabric if you are not in Real-Time. Dataflows Gen2 is a Honda Odyssey: practical, familiar, and not what you drive if the job is processing data on a budget you can actually steer.

**Plot:** opinion. Baseball boxes for clustering as a short explainer, then the punch. Do not write a Databricks-vs-Fabric clustering tutorial.

**Material (Tommy):**
- Mike introduced liquid clustering. Tommy researched, tested, then taught it back: boxes of mixed baseballs. Fabric opens too many boxes. Clustered = blue near blue, skip the green boxes. Liquid = the groups can change (order date, region, product). Not a rigid folder partition. Rules live on the table.
- Runtime 2.0 incremental: 30 GB already optimized + 4 GB new. 1.3 rewrites ~64 GB. 2.0 only touches the new/unhealthy files. This is the load-bearing mechanical fact he actually used.
- Hot take for listeners: after the Runtime 2.0 docs, he does not see another way to use Fabric **for lakehouse work** than Spark + 2.0. Carve-out: Real-Time is a different job. Dataflows-into-lakehouse is also not Real-Time.
- Cost + flexibility of Spark vs Dataflows: maybe let one team try a dataflow so you can later turn it into Spark. He does not see an argument for Dataflows Gen2 as the production path.
- Mike’s “creature comforts of dataflows”: Ferrari vs Honda Odyssey. Odyssey does the job, does not drink fuel. That is the Dataflows pitch, and it is not enough.

**Attribution:** Tommy on Dataflows/Spark and the baseball explainer. Miles/Mike own `clusteringQuality()`, Auto Reclustering thresholds, `OPTIMIZE FULL` “don’t schedule it because it feels safer.”
**Freshness:** fresh as a Dataflows-vs-Spark post. Liquid clustering how-to would be a Miles recap. Don’t.

## Other angles

### Liquid Clustering Is File Skipping With a Better Name
Short explainer post. Baseballs. Change the keys later. Incremental so you stop paying to rewrite the clustered 30 GB.
**Plot:** teaching. Thin for this site unless paired with a Direct Lake report that actually got faster. Tommy did not bring that number.

### August Was the Backend Month
News leftover: Runtime, NEE, data agents, warehouse GPU, schema-compare in VS Code. Cursor locking the default model after the xAI deal. He trusts Anthropic’s integration more.
**Collision:** 560 (data agents). Skip as a post.
