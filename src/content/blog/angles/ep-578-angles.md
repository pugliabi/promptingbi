# Ep 578 angles — The App Revolution and Fabric

Ore file. Draft later from `transcripts/ep-578.txt`. Do not treat this as the article.

- Episode: 578
- Title: The App Revolution & Fabric
- Air date: 2026-11-05
- Notion: https://app.notion.com/p/3ebe74c69c188096b61ac5a676639ee7
- Transcript: `transcripts/ep-578.txt`
- Source: local master `578.mp3`, Whisper turbo. No speaker labels. Paragraphs merge both hosts. Attribution is by who is being addressed. He asks Mike to "let me land it," so the landing is his even where the paragraph also contains Mike's interruptions.
- Agenda he actually hits: are we building too many apps, report developers navigating Fabric apps / SQL apps / agentic apps, and who the app is for.

**Mike-only:** The Power BI rollout fear is the same pattern (Excel was already an app, workspaces, CoE, Matthew Roche's personal / team / department / enterprise pyramid). Reuse that playbook for apps. A Power BI person plus an agent produces junk without years of prompting. Kurt on the show: do not throw out what Power BI already delivered. Power Apps was a framework he tried and did not like. He builds 8-bit games to learn flow. Apps at Pro and PPU. Replit / Lovable level capability for any user. You are a business-problem solver and the medium does not matter (Excel, Power BI, Power Apps, Fabric apps). Middle management is best positioned because they can see the app in their head. Local models on the new Surface, software factory, six months to a year, "Microsoft send us a laptop." Agent token cost drops, data storage does not. He agrees Fabric is the backend and disagrees that the user was only ever the developer.

**Disagreement to keep sharp:** Mike says there is still a skill and a first app from a new Power BI developer will be junk. Tommy's counter, later: that was true six months ago. A first install and a plain prompt can already produce something useful (his example is an app that searches the Microsoft blog). Do not merge those into one voice.

**Do not rewrite:** [Fabric Is Best as a Backend](/2026/10/05/fabric-is-best-as-a-backend/) (ep 554, the developer and agent wiring: identity, Git, the API surface). He says on this episode that version was the developer point of view. This angle is the business user. [The Agent Builds the App Faster](/2026/11/04/the-agent-builds-the-app-faster/) already answers when the app earns it versus the report. Use his decision-tree line as a pointer, not a second essay. [Anonymous Access Lets Fabric Apps Leave the Tenant](/2026/10/14/anonymous-access-fabric-apps/) covers the news-segment access argument. Spell it Rayfin.

## Mined Tommy material

- **Setup:** never been easier to build an app for yourself or a team. Enterprise Fabric apps and individual apps, SQL apps as a different thing, connectors so the UI can sit on data you already have. His question: are we building too many, for the company or for ourselves? The CV of a Power BI developer has been reports. Agentic reporting still has more bill setup than a natural-language app.
- **Claim they both grant:** building an app is now easier than building a report. He asks what changed for the developer and for the consumer.
- **He rejects the Excel analogy.** Mike walked Power BI's arrival back to Excel macros. Tommy says Power Apps is the right ancestor. Excel was mostly static data on the page, harder to share, and the purpose was still to show numbers. Power Apps was the first time the industry said low-code, no-code, and you could connect to data and ship an enterprise app.
- **The lanes used to be the skill.** Power BI let someone build a dashboard in a day without SSRS. In that same era, an app still meant a C# or JavaScript developer. Power Apps lowered it and still had its own language, design, and time cost, so the app person and the report person were usually not the same person. That split gave each artifact a purpose: interaction over here, visualization over there.
- **The gray area is new.** "This is the first time that application development has superseded the ease of use rather than report development." First time in their careers it is easier to build an app than a report. Report developers always had a lane because of the skill required. Now he does not need that skill to produce an app, and Fabric is handing the BI developer connectors, Rayfin, and the agent. He sees people build apps because they can. He calls it a buffet.
- **Mike cuts him off** ("you're not going to give a Power BI person an agent and get an amazing app"). Tommy says he wants to disagree and keeps going. The overlap of roles is the point: Microsoft is telling the reporting developer "you can build an app now."
- **His own apps as the counterexample.** He cites two he built, FabriQuest and a second the transcript garbles. Mike says that only proves three or four years of agent practice. Tommy's later pushback: "anyone with no agent experience will ship a poor app" was probably true six months ago. Not today. It will not be optimized. A simple prompt, even one they could have run during the episode (search the Microsoft blog), already comes out useful.
- **The temptation is the actual problem.** People ask him for data, not for application development. Licensing is probably already there. Because the app is easy, he will be tempted to build cool apps that may not be used, and to skip DAX, Desktop Bridge, and an MCP server. He wants a decision tree the team can answer: when does the app become the better artifact, and when is the report still the right one? He does not answer it on this episode. He says it does not have to be answered today. Do not invent the tree. The Nov 4 post already took a swing at that question.
- **He names the new thing.** "We need a FOB MSS. We need Fabric as a best backend for managed self-service." A minute later he calls it Fab MSS and invites a better name. Managed self-service has always meant reports. Connectors and OneLake make this the first time it has to mean apps. An operations person who wants an approval input, or anyone who can reach a SQL database with the right read or write, can build the app and does not have to ask BI. Three years ago the access argument was "do we give them notebooks, and why?" Now the access he is willing to give, where it makes sense, is edit on a database so a team can build its own apps. Reports they can already have.
- **Close, and this is the skill claim.** His job as a data developer / data solutions architect revolves more around organizing data in OneLake for people who are not in the data space. Operations or marketing, given access, build the app. Organizing that data may be as valuable as, or more valuable than, his ability to build a report. Examples: a marketing database they can write to, shortcuts, optimized, everything the campaign-creator app needs. Operations needs PDFs improved, so he structures the flow. Three elements he ranks for the future: semantic modeling, agentic writing, and OneLake orchestration.

## Recommendation

**Fab MSS: managed self-service was reports. Now it is who gets a database.** Title direction: "Managed Self-Service Just Left the Report" or "OneLake Is the Job Now." Plot: the Power Apps history in one pass so the "first time apps are easier than reports" claim has a spine, the buffet temptation in a short section that points at the existing app-versus-report post instead of re-arguing it, then Fab MSS and the OneLake orchestration close with the marketing and operations examples. He asked for a better name on air. Ask him before the draft locks "Fab MSS."

## Other angles

### Easier Than a Report, For the First Time
**Thesis:** The lane between report developer and app developer existed because of the skill. Power Apps still had a language. Agents removed it. That is why the BI team is staring at a buffet.
**Plot:** history piece. It is the setup for Fab MSS, and it collides with the Nov 4 post if the ending is another "when to build the app" framework.

### A First Prompt Is No Longer Junk
**Thesis:** Six months ago, no agent experience meant a bad app. He does not think that is still true. Useful is not the same as optimized, and that gap is now the senior's job.
**Plot:** short opinion. Thin without a real app to show. Better as a paragraph inside Fab MSS than its own post.

### The Decision Tree He Wouldn't Answer
**Thesis:** People ask for data. The app is so easy that a report gets skipped. The team needs an explicit rule for when the app wins.
**Plot:** already written on Nov 4. Do not write it again. If he wants a sequel, it has to be the non-BI builder, which is Fab MSS.
