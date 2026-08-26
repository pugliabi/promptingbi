# Ep 501 angles — Central BI & Workspace Strategies

Ore file. Draft later from `transcripts/ep-501.txt`. Do not treat this as the article.

- Episode: 501
- YouTube: https://www.youtube.com/watch?v=GV_2NFVmP4Q
- Notion: https://app.notion.com/p/303e74c69c1880c7a14ee241dadfb2e0
- Transcript: `transcripts/ep-501.txt`
- Source: YouTube auto (no speaker labels)

No published/draft post from this episode. Adjacent (do not copy): Fabric adoption step-zero, CoE-better-not-bigger.

## ★ Write first: Central BI Is a Tiger Team Now

**Thesis:** In Fabric, central BI should stop living in dedicated workspaces shipping gold models and instead float to whatever priority needs a lakehouse, a database, or a real-time path.

**Material (Tommy):**
- Old job: own admin + workspaces, let teams contribute if you were gracious, then sit in the corner on a ship-and-update loop for gold models.
- Named hot take: should central BI even own workspaces, or are they the floater.
- Tiger team = best people, urgent problems, no home department. They live where the priority is.
- Power BI consumers were at the mercy of the model and the visuals. Lakehouses, databases, apps, real-time change that relationship.
- Give marketing a lakehouse they can connect to any day and they will want help. Guide, not just give.
- Fabric artifacts make BI a technology practice again, not “you’re the marketing BI guy.”

**Freshness:** fresh.

## Other angles

### The Adoption Roadmap Is Still a Power BI Doc
**Thesis:** Business-led, managed self-service, and enterprise BI were built for Power BI content ownership. They do not describe how Fabric actually gets deployed.
- He went back to Microsoft’s implementation/adoption roadmap: single workspace + capacity, multi-workspace on one capacity, hub-and-spoke.
- Same three ownership models that lived in the old Premium PDFs. Dataflows changed details; the three-box model did not.
- His read then and now: those three do not fit a Fabric environment.
- Mike disagreed (principle holds). Tommy still wanted to walk managed self-service against notebooks and lakehouses, not against reports.
**Attribution:** Tommy (Mike disputed).

### The Playground Workspace Doesn’t Survive Lakehouses
**Thesis:** Gold models in one workspace and “dirty” Excel/API mashups in a quarantine workspace does not translate when the handoff is a lakehouse.
- Classic managed SS: enterprise owns gold models, departments own reports.
- Off-model (Excel, SurveyMonkey, a random API) usually cannot live in the marketing workspace. It goes to a dedicated untrusted area.
- Two Fabric worries: users/roles, and how many workspaces you actually create.
- Ask first: what is the lakehouse *for* for business users. Architecture starts there.

### Ask What the Team Already Does With Data
**Thesis:** Workspace strategy is downstream of current data use, not a Fabric template you drop on every department.
- First questions at a large Fabric shop: how the team already uses data, who manages sources, dedicated reporting vs everyone’s job.
- Personas are not people. One person can hold four roles. The load-bearing part is accountability.
- Marketing with Google Analytics + campaign platform: don’t start at semantic models. Start at real-time.
- He rejected a one-size or “highway version” of Fabric workspace design.
**Attribution:** mixed (Ferrari / don’t-hand-over-the-keys is Mike).

### You Can’t Click-Ops 300 Fabric Workspaces
**Thesis:** More roles and more artifact types mean central BI must treat the workspace estate as an operations problem, not a portal hobby.
- Splitting engineering vs gold models/lakehouses vs reports. A large company will try to manage that estate.
- UI won’t cut it. You’ll lean on APIs.
- Mike’s follow-on (detect 300 workspaces, nominate a department lead, tag domains) is his, not Tommy’s.
