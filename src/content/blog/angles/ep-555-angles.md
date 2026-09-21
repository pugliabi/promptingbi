# Ep 555 angles — Anonymous Rayfin Fabric Apps

Ore file. Draft later from `transcripts/ep-555.txt`. Do not treat this as the article.

- Episode: 555
- YouTube: https://www.youtube.com/watch?v=wT-m71pwQ44
- Notion: https://app.notion.com/p/3bce74c69c1880008417d2fb0b6b46c9
- Transcript: `transcripts/ep-555.txt`
- Source: YouTube auto (no speaker labels)

**Mike-only:** org pivoted off PCs onto Macs because of this; Desktop is dead, everything belongs in the service; remote modeling MCP is read-only; customer who demanded the filter pane on the left in embedded; contact-form wall that made him want anonymous write-back; Vega / Flint / Plotly / D3 as the visual unlock. Don’t steal.

Skip: Chicago meetup, Runtime 2.0 recap (belongs to 559), Skills for Fabric SQL DB recap except the GraphQL rib.

Adjacent: 554 FaaB; 563 Fabric Apps + Kurt; 546 *Fabric Needs a Backend*; published Task Flow Studio.

## Best plots

- **Write first:** opinion. Anonymous access is write-back into OneLake, not Publish to web.
- How-to: tenant-admin / public-vs-internal split (thin in Tommy’s turns; don’t fake a checklist he didn’t give).
- Artifact: none unless a later post ships a public-app intake gate.
- Series: app-platform cluster with 554 / 563.

## ★ Write first: Anonymous Access Is Write-Back, Not Publish to Web

**Thesis:** Microsoft Forms is fine until the answer has to live in Fabric. Anonymous Fabric Apps are not “Publish to web with extra steps.” They are how a public form lands in the same lakehouse the rest of the estate already trusts.

**Plot:** opinion + one worked contrast (Forms → Excel vs Rayfin → Fabric).

**Material (Tommy):**
- Not everyone who needs the app is in the tenant. That is the actual problem, not a party trick.
- Public consumption = county/state Publish to web. Fabric Apps are more than a glorified public report because people can **input**. Why not Microsoft Forms / Google Forms? Forms is great for one-shot “how are you doing.” Destination is Excel / a sheet. You can round-trip that into Fabric. Ugly.
- The selling point: even a one-time submission stores in the Fabric ecosystem. Beat-from-the-street: more projects now assume the app and the lakehouse are the same place.
- Outage map example: database of where the outages are, report back, almost no ceiling on what you can build. Sign-in optional.
- Utility test: he would not pitch “turn on anonymous because the feature exists.” He would pitch the round-trip.

**Attribution:** Tommy. Mike owns the contact-form wall and the 15–30 minute agent loop that failed until anonymous write existed. Use as color only if Tommy later confirms it.
**Freshness:** fresh vs 554 (backend pattern) and 563 (when an app beats a report). This one is the public identity / write-back slice.

## Other angles

### TMDL in the Browser Would Have Been a Game Changer in 2023
**Thesis:** Web TMDL + IntelliSense + Copilot is the feature Power BI people begged for. It does not change an agentic modeling workflow, because the agent already writes TMDL and you already QA the files.
- Browser editor, bulk updates, gallery, version history. “Everything you ever wanted.”
- Modeling, not report design. MCP still runs on a PC. You still design the report somewhere.
- “This would be much more impactful had AI never come out.” Cool. Does not change his week.
**Plot:** opinion. Thin leftover. Desktop-is-dead is **Mike**.
**Freshness:** adjacent to 553 crawl/walk (IDE as run, not walk).

### Skills Load When They Matter. GraphQL Still Doesn’t Have One
News leftover: Fabric SQL DB skills (author / consume / operate), vector columns, they load only when relevant unlike an always-on MCP. Tommy wants a GraphQL skill. Italian-grandmother rib of Mike’s “this is drafty / where’s the sauce.”
**Collision:** published *Agent Skills Are the New Theme Files* + Skills for Fabric usage. Optional Idea if it stays on “workload-specific skills, not generic SQL.”

### Desktop Bridge Is Windows. That Is Not a Footnote
Tommy: more Windows in this workflow, not less. Remote MCP exists; you still spin compute. He is not writing DAX in the formula bar; he is making sure TMDL is defined **for the agent**.
**Collision:** 556 (Bridge as the report loop). Keep 555’s slice on “web TMDL didn’t kill the PC,” not the Bridge recipe.
