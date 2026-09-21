# Ep 562 angles — The Fabric Handoff

Ore file. Draft later from `transcripts/ep-562.txt`. Do not treat this as the article.

- Episode: 562
- YouTube: https://www.youtube.com/watch?v=bTfUTS7tbVk
- Notion: https://app.notion.com/p/3bce74c69c1880b28640db0ee027a7ee
- Transcript: `transcripts/ep-562.txt`
- Source: YouTube auto (no speaker labels)

**Mike-only:** I-build-then-we-walk-the-UI cadence; governance as a different SOW than “SQL into a lakehouse”; Ferrari-to-someone-who-cannot-drive; org is not ready for a prompt packet; VS Code documentary / “we are still figuring out AI engineer.” Don’t steal.

Skip: Chicago meetup (harness demo, Sep 24). Color for a talk, not a post.

Adjacent: published [Central BI Is a Tiger Team Now](/2026/09/18/central-bi-is-a-tiger-team-now/) (lakehouse handoff as a workspace problem); [You’re AI Ready. Your Organization Isn’t.](/2026/08/12/youre-ai-ready-your-organization-isnt/); [Step Zero](/2026/07/27/step-zero-before-the-fabric-adoption-roadmap/); [Build the Thing That Creates the Thing](/2026/09/16/build-the-thing-that-creates-the-thing/); 558 medallion as the thing you are handing off; 560 CI/CD leftover; 564 literacy.

## Best plots

- **Write first:** consulting opinion. Strongest post in 554–564 for Tommy’s actual job.
- How-to: 30/60/90 Q&A + roles-and-responsibilities packet (the anti-black-box).
- Artifact candidate: `/prompts/` `playbooks` — Fabric handoff packet (what ships: recorded meetings, wiki, skills/repo context, 30/60/90 questions). Not a DAX cell.
- Series: consulting-ops with tiger-team / You’re AI Ready. Do not re-write Step Zero’s executive script.

## ★ Write first: If the Skills Stay With the Consultant, You Didn’t Hand Off Fabric

**Thesis:** A Power BI handoff was a model and a report. A Fabric handoff is pipelines, capacity, notebooks, and the **agentic IP** you used to build them. If the client cannot run next Tuesday without your harness, you left a black box. Governance and upskilling are not optional add-ons. They are why the thing survives you.

**Plot:** opinion. One packet list at the end. No “how I use Claude” tour.

**Material (Tommy):**
- Power BI: finite deliverable, still messy. Fabric: you are handing off a data journey the org has never operated (capacity, CU, medallion, notebooks) and most of those orgs are not DE shops.
- Mike’s “I build, I return, we walk the UI” is catchy. Incomplete. Two things he skipped even on **Power BI**: governance (roles so it does not collapse when the consultant leaves) and upskilling. Leadership that will push back on a wrong number. Teaching DAX is not the same as reporting on the right things.
- Mature shop (notebooks, DQ, CoE): shorter, more abrupt handoff. Skip “build together,” land the product, take questions. Immature shop: the opening choice is everything. Either you ship APIs/lakehouse/Delta/models in weeks for the short-term win, or you stay and grow them into it. That choice **is** the handoff design.
- Open question he wants answered: does **AI intellectual property** count? Project skills, harness context, schema, validation, repo instructions. He does not have the commercial answer yet. Direction: if agentic work is how the pipelines get built and managed, it is part of the handoff, same as “I used the API, you can keep clicking the UI if you want.” Declining AI is their problem, not a reason to withhold the tooling.
- He will not ship a black box. Internal-Tommy used to get Confluence/SharePoint leftovers. Packet + recorded/transcribed meetings so 60 days later they can search “we talked about this.”
- 30/60/90 check-ins. Weekly Q&A after the engagement, no new implementation. Success is they can learn without him. Also: org roles and responsibilities as part of the packet.
- Close: good business is repeat business. Fabric still needs guiding. Revisit AI-handoff in three months.

**Attribution:** Tommy. Do not write Mike’s Ferrari, “prompts they cannot read,” or “governance is a different SOW” as Tommy’s close. Tommy already put governance **inside** the technical handoff.
**Freshness:** leftover vs tiger-team (who owns the lakehouse after central BI floats) and You’re AI Ready (org maturity). This is **consultant-to-client packet + agentic IP**, not the tiger-team operating model.

## Other angles

### The Opening Choice Is the Handoff
**Thesis:** Build-it-fast vs build-it-together is not a staffing preference. It is the whole engagement design, and you cannot reverse it at week twelve.
- Green-field “Fabric only” vs Snowflake/Databricks already in the building. Longer transition if they have never owned capacity.
**Plot:** consulting how-to. Can fold into write-first as the middle section.

### AI IP Goes in the Packet or You Are Still the Vendor
**Thesis:** Skills, instruction pages, and validation gates are not “my secret sauce.” They are how the notebooks stay alive. Leaving them behind is the Fabric version of leaving the API.
- He does not know the contract language yet. That is the honest close, not a fake SOW template.
**Plot:** opinion. Artifact if he later writes the actual packet.
**Collision:** Build the Thing (the factory). Keep this on **what the client inherits**.

### 30/60/90 Is the Only Handoff Metric That Matters
Docs and videos do not beat answering the question they have in week six. Weekly Q&A, no new build.
**Plot:** short practical. Can be the ending of write-first instead of its own post.
