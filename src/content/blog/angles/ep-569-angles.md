# Ep 569 angles — Where Writeback belongs

Ore file. Draft later from `transcripts/ep-569.txt`. Do not treat this as the article.

- Episode: 569
- YouTube: https://www.youtube.com/watch?v=CgJZcVpYLJo
- Notion: https://app.notion.com/p/3d5e74c69c18803c98a1f746a42d53e0
- Transcript: `transcripts/ep-569.txt`
- Source: YouTube auto (no speaker labels). No guest. Mailbag is the frame: where does writeback belong now that Rayfin / Fabric Apps and translytical task flows both exist.

**Mike-only:** Fabric-as-a-backend as his long push (Tommy credits the article to him on air); OneLake table-read API as GraphQL-on-the-lakehouse; he is in the OSI meetings and says his DAX-in-the-spec PR already landed; “same result in DAX and SQL, filter context is the hard part”; Jack-in-the-comments “you’re redefining an enterprise app” and the answer that follows if that answer is Mike’s. The democratize-apps line sits in a turn that names Mike because Jack addressed Mike. Do not treat it as Tommy’s unless he claims it in the draft.

Skip as the article: Chicago Fabric user group, Oct 22, MCP install night, Meetup legal-name rule. IQ-sharing product tour except the one skill-vault beat below.

**Do not rewrite:** [Fabric Is Best as a Backend](/2026/10/05/fabric-is-best-as-a-backend/) (he says he just published it, credits Mike); [Fabric Task Flow Studio](/2026/08/21/fabric-task-flow-studio/); [Agentic Distributed Wisdom](/2026/09/30/distribute-the-wisdom/); [A skill.md Is Not Wisdom](/2026/09/21/a-skill-md-is-not-wisdom/); 555’s anonymous-access write-back angle (public form into OneLake, not this placement argument).

Adjacent: 567 semantic views as YAML / OSI tease; 568 ontology authoring and apps-vs-visuals; 563 Fabric Apps; 555 anonymous Rayfin.

## Best plots

- **Write first:** opinion. Retire the word writeback. The job is writing forward: an action that leaves the report.
- How-to: not from this episode. He challenges the listener to build a Fabric App proof of concept. He does not walk the build.
- Artifact: none unless a later post ships the app. Do not fake a translytical pattern he did not show.
- Honest: the naming move is his. The platform menu (translytical task flow vs a paid planning visual vs Fabric Apps) is the argument. Mike owns the backend slogan and the OSI meeting notes.

## ★ Write first: Writeback Is the Wrong Word. You Are Writing Forward.

**Thesis:** Writeback was the word because, for years, the only way to act on a number in a Power BI report was to poke the last layer of the pipeline and change the gold row. That is not what people are asking for. They are looking at orders, sales, or a piece of equipment, and they need an alert, a notification, or an update in a different system. That is writing forward. Power BI stays the place you consume and interact. The write belongs in a Fabric App, with translytical task flows for the odd case. It does not belong in a custom visual, and it is not worth waiting for a writeback feature inside the report.

**Plot:** opinion. One worked contrast: “update this row” versus “this user, with this permission, kicks off this action.” No install guide.

**Material (Tommy):**
- Mailbag rank: writeback is top five, or at worst top ten, across five years of submissions. Need is not new. Custom visuals did it before Fabric. Translytical did not end the requests. A fresh mailbag item is why they are on it again.
- As of Oct 6, 2026, something generally available changed the placement question. He asks Mike for a first read of “what Mike Zach laid out,” then reframes before Mike’s tour becomes the article. Confirm the Zach attribution before quoting a third party; the transcript is fuzzy on the name.
- Reframe, his: stop asking where writeback lives. With translytical and Fabric Apps, the concept is writing forward. You are not replying to the gold table the way you reply to an email. Most of the intent is to funnel the number into another action. Writeback was the only verb available when there was no way to write forward.
- Fabric Apps can show the data and still not have “change this cell” as the goal. He is done saying writeback. From here: write forward, or write data. “Writeback is dead to me.”
- Challenge, aimed at the listener: if you have Fabric, in a region that has apps (he migrated Fabric Quest; East US 2 came up on 568), stop and build a proof of concept. Claude Code, no install theater, an MCP or the repo. The writing feature he wants lives in the app.
- Why not a custom visual: a real write is not “any user flips a yes/no on a row.” It is a specific person, with permissions and responsibilities, triggering specific actions. Role logic and business logic stuffed into every custom visual is the wrong layer. Entra and per-user show/hide belong in the app, the way they belong in Power Apps. A vendor spent a lot trying to get a writeback table visual into the product. He does not name them cleanly. Do not invent the company.
- Where he puts it to bed: Fabric Apps for the write. Translytical task flows for the off cases. Not custom visuals. Not hoping Power BI grows a writeback feature. Power BI is consumption and interaction, not writing. Button line, he knows it is cheesy: he is writing forward.
- Cost aside, his, before the naming lock: analytical task flows are built in and you pay for the items (function, SQL database, the report pushing into the flow). Other writeback tools, including a planner visual, are a separate bill and more CUs. Use as the “you will pay somewhere” beat, not as a pricing guide. He does not give numbers.

**Attribution:** Tommy on writing-forward, writeback-is-dead, mailbag rank, custom-visual-is-the-wrong-layer, the POC challenge, and the bed-it placement (apps, then translytical, never the visual). Mike owns Fabric-as-a-backend and the OSI close. If the “democratized apps the way Power BI democratized reports” line stays, attribute it only after he confirms it is his. Jack addressed it to Mike.
**Freshness:** leftover vs 555 (anonymous public intake into the lakehouse) and Task Flow Studio (sentence to a deployed architecture). This is **which surface is allowed to write**, and what the verb should be. Not a second backend essay.

## Other angles

### DAX Inside OSI Will Grow Best Practices Whether You Asked or Not
**Thesis:** If DAX is a recognized OSI query language, it cannot stay a Power BI-only dialect. Translation to SQL (and to whatever else agents speak) will force acceptable patterns for `CALCULATE`, filters, aggregations, and time intelligence. Skills and best-practice pages change because the language has to round-trip.
- He clocks Microsoft and Snowflake backing Apache OSI (he keeps saying Aussie). Near-term scenario he reads in the post: convert a Snowflake semantic view to a Power BI semantic model, teach OSI to speak DAX, extend ontologies. “Customers want platform-agnostic agent experiences” he treats as Christian Wade having listened to the show. Joke. Do not build on it.
- Mike says DAX is already in the spec via his PR, and Christian’s “looking ahead” line is late. That correction is Mike’s. Tommy’s article is the best-practice consequence, not the PR story.
- 567’s YAML-in-OneLake hunch lands here. Still not a how-to. He has not written an OSI document on the show.
**Plot:** opinion. Strong leftover. Weaker than write-forward because half the factual spine is Mike’s meeting attendance.

### IQ Sharing Is a Skill Shelf, Not a Skill
**Thesis:** IQ sharing is Microsoft letting you pass governed context, markdown agent instructions, and RDF ontologies across teams. Useful. It is not a skill. A skill is a `SKILL.md` plus folders and scripts, and this share does not carry that shape.
- Concrete: he updated the public skill-vault app so skills sync to Notion and back through the skills API, on top of the GitHub sync. That is his implementation of the sharing problem, and it is stricter than IQ sharing. Do not turn the episode into a skill-vault release note, and do not rewrite Distributed Wisdom.
- He also says IQ still looks like infrastructure without an end product. Fair sidebar.
**Plot:** thin. One paragraph inside a later skills post, or a leftover Idea.

### OneLake Compute on Demand Is a Cost Story He Did Not Tell
He lists consumption-based OneLake compute (no dedicated capacity required) among the ecosystem bullets and does not argue it. Mike does not really either. Skip until one of them has a bill.

### Don’t Let the News Eat the Verb
Foundry-and-Excel discovery, Salesforce, Dynamics, geospatial partners: orientation. The post is the verb. Write forward.
