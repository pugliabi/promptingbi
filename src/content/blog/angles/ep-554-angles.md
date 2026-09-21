# Ep 554 angles — Fabric as a Backend (FaaB)

Ore file. Draft later from `transcripts/ep-554.txt`. Do not treat this as the article.

- Episode: 554
- YouTube: https://www.youtube.com/watch?v=K6_PwhIoAEU
- Notion: https://app.notion.com/p/397e74c69c1880adb1fbf3f072774533
- Transcript: `transcripts/ep-554.txt`
- Source: YouTube auto (no speaker labels)

**Mike-only:** Rayfin since January, SQL DB as the light-bulb, workspace identity / frictionless auth vs Azure portal, “don’t ask the agent for last month’s sales, ask it to build the report,” Playwright website scrape, software-connoisseur mini-app that closes Fabric tabs. Don’t steal.

Skip news recap as the article: Chicago Task Flow Studio meetup, “build a data agent with AI,” scheduled User Data Functions.

Adjacent: ep-546 Notion leftover *Fabric Needs a Backend*; published [Build the Thing That Creates the Thing](/2026/09/16/build-the-thing-that-creates-the-thing/); ep-555 anonymous Rayfin; ep-563 Fabric Apps.

## Best plots

- **Write first:** opinion + Jobs/iPad test. Strongest Tommy take in the episode.
- How-to: workspace-identity + Git as the actual FaaB win (Mike-heavy; only if Tommy later owns the implementation).
- Artifact: none yet. A FaaB decision brief (“better than Azure SQL how?”) could live under `playbooks` if the post walks a real checklist.
- Series: Fabric-as-app-platform cluster with 555 / 563. Do not start the series on Mike’s Rayfin tour.

## ★ Write first: Does Fabric Do Anything Better Than a Real Backend?

**Thesis:** Steve Jobs’ iPad rule applies to FaaB. If Fabric as an application backend is not better at something than Azure SQL + functions + a web app, it has no reason to exist. Convenience because you already bought Fabric is not a product.

**Plot:** opinion. One extended analogy (iPad). No Rayfin feature tour.

**Material (Tommy):**
- Grill on Mike’s Content Nudge / UI-to-data demo: impressive, saves time, centralizes data. Then the Jobs clip: a tablet had to be better at movies than a phone and better at browsing than a computer. Same test for FaaB.
- Follow-up: if FAB can stand alone, a Salesforce + Tableau shop with no Power BI, no notebooks, could still pick Fabric as the application layer. Is that actually true, or does FaaB only work because you are already in Fabric?
- Git + deployment pipelines + workspace identity: apps get a dev/test/prod workspace pattern for free; analytics can live next door and shortcut the same data. App-registration tokens expire; someone babysits them. Fabric is taking that load.
- Agents + Task Flow Studio / Fabric APIs: you can stand the infrastructure up without standing it up by hand. Same democratization that happened to report building.
- Disagrees with Mike’s “agents are not for things that are already known.” Rewrite: agents are not for **ambiguous one-time queries**. “Show me sales” is the wrong job. Clear instructions + a workflow + **code as the output** (testable, repeatable). Opus builds, Fable tests, mix the harnesses. Chat Donald: “the end goal should be code whenever possible.”

**Attribution:** Tommy owns the iPad test, the standalone-from-Power-BI question, and the one-time-query rewrite. Mike owns the Content Nudge demo, SQL DB aha, and “unknown problems only.” Do not write those as Tommy.
**Freshness:** leftover vs ep-546 Notion *Fabric Needs a Backend* (Rayfin/API secrets). This slice is the Jobs test + “code is the output,” not secrets in Rayfin.

## Other angles

### FaaB Only Works If Git and Workspace Identity Are the Product
**Thesis:** The backend win is not SQL-in-Fabric. It is one workspace identity, Git, and a promotion path so app teams stop buying six Azure services that do not talk.
- Most items sync with Git; pipelines already exist; you can ship a stack of app workspaces and a separate analytics workspace that shortcuts the same tables.
- Azure portal equivalent exists (functions, web app, SQL). The tax is knowing how to wire them. Same-workspace identity is the friction drop.
**Plot:** how-to / architecture. Mike-led on the demo. Only write if Tommy later owns a client pattern.
**Freshness:** cousin of Task Flow Studio post. Keep this on identity + Git, not the agent that emits the workspace.

### Agents Should Emit Code, Not Answers
**Thesis:** Pointing a chat at a model and asking for revenue is how you rent the same answer forever. The useful job is a report, a script, or a UDF that runs the same way next Tuesday.
- Tommy’s rewrite of Mike: not “never use agents on known work.” Never use them on fuzzy one-shots.
- Output = code. People + a second agent do the eval.
**Plot:** opinion. Collision with 550 *The Quadrant Is Still Measuring Chat* and Don’t Let Agent Touch Fabric. File as Idea only if this stays on FaaB (UDFs, scheduled functions) instead of pipelines.

### Theme Files Were the Skill Governance Problem
News leftover: department theme files vs existing reports; Claude Desktop vs Claude Code not sharing a folder.
**Collision:** published *Agent Skills Are the New Theme Files*. Do not re-file.
