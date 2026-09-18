# Ep 501 angles — Central BI & Workspace Strategies

Ore file. Draft later from `transcripts/ep-501.txt`. Do not treat this as the article.

- Episode: 501
- YouTube: https://www.youtube.com/watch?v=GV_2NFVmP4Q
- Notion: https://app.notion.com/p/303e74c69c1880c7a14ee241dadfb2e0
- Transcript: `transcripts/ep-501.txt`
- Source: YouTube auto (no speaker labels)

No published/draft post from this episode. Adjacent (do not copy): Fabric adoption step-zero, CoE-better-not-bigger.

## LOCKED / WRITTEN 2026-09-18

Tommy picked the tiger-team angle. Draft: `drafts/2026-09-18-central-bi-is-a-tiger-team-now.md`.
Notion: https://app.notion.com/p/3dfe74c69c18817695a1c13fe5db765c

The tiger-team angle turned out to be the umbrella, so it absorbed most of this ore:

- "The Adoption Roadmap Is Still a Power BI Doc" -> became the roadmap section, with Mike's
  principle-survives counterargument steelmanned in the body rather than omitted.
- "Ask What the Team Already Does With Data" -> became the discovery brief code block.
- "You Can't Click-Ops 300 Fabric Workspaces" -> became the estate audit section, expanded with
  real admin API code run against Tommy's own tenant.

**Cross-episode material pulled in** (attributed by vocative voting): ep-508 (domain lakehouse
accountability, "who wants to take that on", fragmentation is easier in Fabric), ep-531 ("you
cannot assume you're doing Fabric on an island", `001_` naming, model-per-report rant), ep-541
("if their title starts with a C you say yes", OKR alignment, two-week cadence), ep-540
(governance and skill management are the future of the BI team), ep-550 (allocate resources
where you get the biggest return).

**Attribution landmines (Mike's, kept out of Tommy's mouth):** layers of the onion, three-
workspaces-per-environment, workspaces as security boundaries, organizational apps, nominate a
department lead, detect 300 workspaces / tag domains, Ferrari keys to a 16-year-old.

**Real tenant numbers verified for the post:** 40 workspaces, 816 items, 3 domains, 39
undomained, 529 items untouched since 2025, 267 semantic models vs 273 reports, 28 distinct item
types. Unpaginated `/admin/items` returns 96 of 816. `Retry-After` reached 55s.

## ★ Written: Central BI Is a Tiger Team Now

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

STATUS after the 2026-09-18 pass: the three marked CONSUMED below were folded into the
tiger-team post. Two angles remain genuinely unwritten and are filed as Ideas in Notion.

### CONSUMED - The Adoption Roadmap Is Still a Power BI Doc
**Thesis:** Business-led, managed self-service, and enterprise BI were built for Power BI content ownership. They do not describe how Fabric actually gets deployed.
- He went back to Microsoft’s implementation/adoption roadmap: single workspace + capacity, multi-workspace on one capacity, hub-and-spoke.
- Same three ownership models that lived in the old Premium PDFs. Dataflows changed details; the three-box model did not.
- His read then and now: those three do not fit a Fabric environment.
- Mike disagreed (principle holds). Tommy still wanted to walk managed self-service against notebooks and lakehouses, not against reports.
**Attribution:** Tommy (Mike disputed).

### STILL OPEN - The Playground Workspace Doesn’t Survive Lakehouses
**Thesis:** Gold models in one workspace and “dirty” Excel/API mashups in a quarantine workspace does not translate when the handoff is a lakehouse.
- Classic managed SS: enterprise owns gold models, departments own reports.
- Off-model (Excel, SurveyMonkey, a random API) usually cannot live in the marketing workspace. It goes to a dedicated untrusted area.
- Two Fabric worries: users/roles, and how many workspaces you actually create.
- Ask first: what is the lakehouse *for* for business users. Architecture starts there.

### CONSUMED - Ask What the Team Already Does With Data
**Thesis:** Workspace strategy is downstream of current data use, not a Fabric template you drop on every department.
- First questions at a large Fabric shop: how the team already uses data, who manages sources, dedicated reporting vs everyone’s job.
- Personas are not people. One person can hold four roles. The load-bearing part is accountability.
- Marketing with Google Analytics + campaign platform: don’t start at semantic models. Start at real-time.
- He rejected a one-size or “highway version” of Fabric workspace design.
**Attribution:** mixed (Ferrari / don’t-hand-over-the-keys is Mike).

### CONSUMED - You Can’t Click-Ops 300 Fabric Workspaces
**Thesis:** More roles and more artifact types mean central BI must treat the workspace estate as an operations problem, not a portal hobby.
- Splitting engineering vs gold models/lakehouses vs reports. A large company will try to manage that estate.
- UI won’t cut it. You’ll lean on APIs.
- Mike’s follow-on (detect 300 workspaces, nominate a department lead, tag domains) is his, not Tommy’s.
