# Ep 579 angles — Power BI Is (Not) Dead

Ore file. Draft later from `transcripts/ep-579.txt`. Do not treat this as the article.

- Episode: 579
- Title: Power BI is (NOT) Dead?
- Air date: 2026-11-10
- Notion: https://app.notion.com/p/3f1e74c69c18800f9d34e9b7293c0b0e
- Transcript: `transcripts/ep-579.txt`
- Source: local master `579.mp3`, Whisper turbo. No speaker labels. Paragraphs merge both hosts. The post they react to is Michal Molka's (Whisper hears Michael Malka / Mocha). Tommy reads it aloud. Do not treat Molka's sentences as Tommy's.
- Agenda note on the EMP page is thin: "I look at what is Power BI by licensing." That is Mike's frame. Tommy's frame on the recording is the semantic model, not the license.

**Mike-only:** Power BI the license is three products that Fabric split apart: Power Query / Dataflows, the semantic model, the report. The model is now the keystone and serves the report, Rayfin, explorations, paginated reports, Analyze in Excel, and a query API. The report layer is what he would call Power BI now. The model outgrew Desktop. Desktop is a modeling app (TMDL) plus the viz layer, and it cannot build the other experiences. Most of those other experiences are Fabric items. He won the steak: an exploration can be certified. Certified means trust plus process plus an owner, and he would apply that to a Fabric app, a data-load process, a paginated report, an exploration. Certification is a distribution flag for a wide audience. Arun's daily report, in his guess, is not certified because there is a named person and one reader. He does not like the word demoted. Fabric absorbed Power BI. His line between Power BI and Fabric is the license: Pro and Premium Per User versus capacity. Synapse died so the pieces could sit next to Power BI. He would have been fine if they had never said Fabric and just shipped Power BI Capacities.

**Contested, keep the disagreement:** Tommy says the semantic model is Power BI. Mike says the model has outgrown Power BI and the report layer is what the name means now. They agree the model has more jobs than the report. They do not agree the model left the product. Tommy also flinches at certifying an exploration or a black-box Rayfin app. Mike thinks the same criteria apply to any item.

**Do not rewrite:** [Fabric Is Best as a Backend](/2026/10/05/fabric-is-best-as-a-backend/). He says on air this is a different Steve Jobs keynote than the one he usually uses. That post is the iPad test. This one is the iCloud keynote, Mac demoted from hub to one device. [One Visual Was Never the Job](/2026/10/16/one-visual-was-never-the-job/). [The Agent Builds the App Faster](/2026/11/04/the-agent-builds-the-app-faster/). Spell it Rayfin. The "35 KPIs at Microsoft" line is his and unsourced on the recording. Do not print it as fact unless he still wants it.

## Mined Tommy material

- **The dead talk is old and louder than it used to be.** He will take you back to 2015, Tableau has the market. Then "why do you need Power BI, we have Fabric." The loudest version was the early AI wave, when every tool was about to be archived. He thinks that died down once Microsoft showed agents as an accelerator for Power BI, not a replacement. A tool that has lasted ten years is rare. Ask an MVP who has been at it twenty years. Most are not on the tool they started with, or the tool no longer means what it meant. Their own show barely talks about Power BI as Power BI anymore. Evolved, not dead.
- **Power BI is not Desktop.** He wrote it down. Power BI does not equal Power BI Desktop. Desktop is a feature.
- **The heart is the model.** "That is the heart and soul of Power BI. That is literally why Power BI operates today." Until Fabric, the semantic model was the last step. A dead end. The journey was over once you built it, because the only place to use it was a Power BI report. Fabric opened that. He was ready to be angry and decided he was there to teach. The model having more use cases than the report is a point he will grant. Separating the model from Power BI is a different point, and he will not make it. He jokes that he just had the "what makes a thing a thing" conversation at church and he is not doing the philosophy on the show.
- **The trusted number still lands in a report.** Report volume will not keep the ten-year growth rate. From a governance seat, "where do I go to look at the number I trust" is still, more than likely, a Power BI report.
- **He hopes Rayfin takes a bite.** Power BI's hindrance, for him, was that the only interaction was click a number and something happens. No other action. He wants Rayfin to take some of the consumption. His sketch, offered as a hope not a measurement: of ten things he opens, maybe six traditional Power BI reports, one exploration, one Analyze in Excel, three Rayfin apps. He said 20, 30, maybe 40 percent. All of them still sit on the semantic model. The model does not go away. Org apps are the picture he already likes: some number of reports to consume, some to act on, same place. Rayfin is how you act. The model is still Power BI.
- **Certified is a high bar, and he does not want it on a black box.** His definition when Mike makes him say it: trusted, verifiable, change control, the source of truth for a set of metrics, validated, cannot be changed quickly, intensive vetting. He asks, pointedly, whether a certified report will ever be a Rayfin app. He is genuinely fired up that an exploration can be certified. A Rayfin app, in his picture, is almost never built by hand (he offers one in a thousand and Mike says none). Certifying that black box sounds as wrong to him as certifying an exploration. If it can be certified, the validation process has to be clear. He will ask Arun, next time he sees him, whether the reports that reach him are certified. He thinks a no would be crazy if decisions are being made off them. Mike's "it's a distribution flag, one reader doesn't need the badge" answer does not satisfy him. Do not resolve this in the post. He did not.
- **Evolve or die, and the iCloud keynote.** If you went on vacation for five years, the Power BI you picture is gone, and that will keep happening. In two years the workflow will not match today. The substance and the purpose stay. The product evolves or dies. His image, and he flags it as not the Jobs clip he usually uses: before iCloud, the Mac was the hub. You plugged the phone and the iPad into it. Then Apple demoted the Mac to one more device and put iCloud on top. For the first seven years, Power BI was the hub. The end of the journey. Everything connected to it. Fabric demoted it in the good sense. It is one of the features. It is not gone. It is no longer the be-all. Create a semantic model and you are in the Power BI playground, and that playground is not required to be Desktop. You may not recognize the 2017 hub. That is fine. He does not love Mike's word "absorbed" as a replacement, and he does not love "demoted" once Mike pushes. The sentence he is protecting is: no longer the end of the line.
- **He would have skipped the Fabric name.** If they had added everything Fabric does and still called it Power BI, he would be fine. Power BI Capacities, dataflows, OneLake, no second brand. The rebrand made it harder to see what happened. He can use Power BI, Power BI capacities, and Fabric as the same thing in his head. Mike's reason for keeping them apart is the license. They noticed they agreed more than they fought.

## Recommendation

**Power BI is the semantic model. The report got demoted, the way the Mac did.** Title direction: "Power BI Didn't Die. It Stopped Being the Hub." Plot: not Desktop, the model as the heart, Fabric ending the dead-end, the iCloud image (send him the slide he promised Mike), then the hope that Rayfin takes the actions the report cannot take, with the certification argument as the brake. Leave the license taxonomy to Mike. Leave the steak bet in the ore file.

## Other angles

### Don't Certify a Black Box
**Thesis:** Certification is trust, an owner, and a change process. An exploration and a Rayfin app almost nobody built by hand do not clear that bar just because the button exists.
**Plot:** governance opinion. Hot, and he and Mike did not land it. Better as the brake inside the hub post than a post that pretends the rule is settled.

### R and Python Visuals Were a Workaround
**Thesis:** A forecasting visual made sense when you could not build the visual. Fabric apps and an agent-built custom visual retired the reason, not just the feature.
**Plot:** news. One section at most. He does not go deep.

### He Disagrees With the Magic Quadrant
**Thesis:** A leader badge with no public price list is not a verdict he will repeat.
**Plot:** news aside. Do not build a post on a quadrant he only half-remembers.
