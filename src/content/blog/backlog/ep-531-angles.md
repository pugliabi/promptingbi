# Ep 531 angles — You Are Wasting Your Time

Ore file. Draft later from `transcripts/ep-531.txt`. Do not treat this as the article.

- Episode: 531
- YouTube: https://www.youtube.com/watch?v=LQLFZwtfsB4
- Notion: https://app.notion.com/p/353e74c69c1880b9ae13e39182af968f
- Transcript: `transcripts/ep-531.txt`
- Source: YouTube auto (no speaker labels)

No published/draft post from this episode. Collision to avoid as write-first: Stop Re-Prompting / meeting-as-context.

## ★ Write first: A Model Per Report Is Unpaid Rework

**Thesis:** If you get paid for Power BI in 2026 and you do not design the semantic model for more than one use case, you are getting paid to clone your own technical debt.

**Material (Tommy):**
- Mike: teams copy model+report, five times. Measure updates drift. A year later nothing consolidates.
- Tommy: “I don’t know why you’re getting paid.” Scalability / flexibility / accuracy have to be in the envisioning phase. No excuses.
- You do not have to ship two reports on day one. You *do* have to imagine two months out and a long lifecycle.
- Wasted time is also work you already did: no research, no merge, 25 models / 25 reports, 80% the same tables. Could be ~6 models and 50 reports.
- Opposite failure (Mike, Tommy agrees): one mega-model that growls when you open Desktop. Domain-sized, not enterprise-blob, not one-per-report.
- Perspectives *could* make enterprise models usable. Pieces exist; you still cannot deploy that experience.

**Freshness:** fresh. Adjacent to gold-model / good-for-humans-bad-for-agents backlog, different claim (clone tax vs agent-readiness).

## Other angles

### Fabric on an Island Is How Teams Lose Weeks
**Thesis:** Power BI let you be a solo hero. Fabric is software. If you are not on Git, you are wasting other people’s time, including future you.
- First waste he names: not the medallion mistakes of people who already know Fabric. The team case.
- People still not using Git / source control nearly enough.
- “You cannot assume you’re doing Fabric on an island.”
- Ground rule for the hour: cannot answer “just use AI” as the fix. Process waste exists with or without agents.

### Unclear Meetings Are the Real CU Drain
**Thesis:** The expensive part is not PySpark. It is “I think they mentioned a metric” turning into three revision cycles.
- Agents that transcribe/outline the call exist. What you write down from the meeting is still the biggest leak.
- Pattern: not super wrong, just not clear → later, revisions.
- Every client call into Notion with custom agents that know Fabric + him: new data source in scope or not?
**Freshness:** collision with Stop Re-Prompting / design-the-report-from-the-meeting. Leftover.

### Name the Artifacts Like a Runbook
**Thesis:** Workspace clutter is not a strategy problem. It is keyboard-shortcut pain: tiny, constant, and it adds up every time you ask “which notebook actually transforms this.”
- Pattern: underscores, `001_` step first so Fabric/PBI sorts in process order, then project/category, then description.
- Searchable + self-organizing.
- Missing: column lineage from visual back through notebooks.

### Inventory the Team’s Skills Before You Call the Stack a Waste
**Thesis:** Dataflows are not a time waste if that is the skill you have. Skipping a skill-set discovery *is*, because you will either freeze on notebooks or fake a three-layer medallion you do not need.
- First move on a new Fabric project: discovery/evaluation of the team’s current skills.
- Only-know-Dataflows + tight Power Query ≠ short-term waste.
- Learning Python is not a two-day flip.
**Attribution:** Tommy (Mike: Gen2 vs notebooks; medallion rigidity).

### Jumpstart Is Not Dashboard in a Day Until It Has a Syllabus
**Thesis:** A catalog of Microsoft sample stacks is not Fabric-in-a-day. DIAD worked because a zip and a path existed. Jumpstart needs courses that stack, not a junk drawer of patterns.
- Power BI: call tomorrow, DIAD in two hours. Training repo, data files, zip.
- Fabric: tenant, logins, artifacts. Fabric-in-a-day tries to teach streaming + Spark + lakehouse + warehouse in one sitting. Too much.
- If CAT keeps it Microsoft-only and stops adding, it dies. Community contribute path is missing.
