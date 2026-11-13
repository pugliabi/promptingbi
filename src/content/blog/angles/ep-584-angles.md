# Ep 584 angles — When Leadership Builds, Part 2

Ore file. Draft later from `transcripts/ep-584.txt`. Do not treat this as the article.

- Episode: 584
- Title: When Leadership Builds - Part 2
- Air date: 2026-11-26
- Notion: https://app.notion.com/p/406e74c69c18800eb8cbca689d905c72
- Transcript: `transcripts/ep-584.txt`
- Source: restream master `ep.584 - --ep.584---power-bi-tips-Nov-11-2026-restream.m4a`, Whisper turbo. No speaker labels. Paragraphs merge both hosts. Attribute only where a turn addresses one host by name.
- Part 1 is episode 583. Notion meeting note, not this Whisper pass. `transcripts/ep-583.txt`. Ore: `ep-583-angles.md`. Same two-parter. He recaps 583 as wireframes and proof of concepts handed to BI for rapid report production. Today is two other areas: drift when leadership builds without the BI team, and whether Fabric as a backend lets BI build the apps or whether leadership will build those apps without them.
- Duration on the tape: 1:00:54.

**Mike-only. Do not put in Tommy's mouth.**

- Leadership's AI use is broader than dashboards: email, quarterly planning, low-end tasks. The leader's conviction decides whether the company spends on it. A team pulling from underneath is a harder sell. Light bulbs take months. Tommy agrees his own scope last episode was too narrow, and that agreement is usable. The email example and the spend argument are Mike's.
- Rob Collie (Whisper: Rob Colley) and the communication cycle. The only bottleneck was communication. Agents shortcut it. Agents listen, including when that is bad: they will not apply the style guide. The blue-to-yellow token-burning site. The Grok Imagine flyout that tags every object so you edit one thing instead of re-prompting the whole image.
- Leadership will not come back to BI. Build on top of the systems and skip the team. Data handoff has to be explicit. Certified model, export CSV, hand it to Claude, shape a different story. He is not certifying explorations for clients. Certification is a platform flag that rides along. "What it's connected to is certified."
- Business works ahead of IT. Prototype in the business, prove it is used, then ask IT to build the structure. Same parallel now with people holding agents. Time machine. The person who prototyped it should not own support for the whole team.
- His dev team. Anyone can open a PR. Thousands of tests the agents wrote and run. A UI agent that rips out repeated code into a component. Draft PR, multiple agent reviews. Weekly CVE security review that costs almost nothing. He asks an agent, live, for a chart of commits over time. Volume is up because of process around the agent, not because someone chatted at it. Rust apps. Node backend moved to .NET in half a day. Adversarial reviews. He argues agents listen and write tests where humans do not, and that trusting an agent is the same problem as trusting a person who writes a bad DAX measure. Tommy's reply is that Mike's team was already an app team before AI. The jump is smaller. Do not write the PR pipeline as a BI story.
- The function has not changed. Warehousing concepts, slowly changing dimensions, data in, storage, migration. The medium has. Reports and paginated reports used to cover the need. Apps add any visual and data in both directions. Vendor upload without a VPN. Agents only compress the time.
- The acronym game after Tommy says solutions intelligence. Mike's agent, not Tommy's proposal: SIT, SIG (he rejects it, too close to a firearm), SIU, SOLIS, SAIL. He dislikes "lab" because it sounds like the work is not real. Sales/sail pun. STD dodge when "solutions data team" almost lands. Stay far from that.
- His landing: retitle around agentic development, but the mission is a decision-making system. Add a capability. Not just a Power BI report. Leaders have to be able to say what the value is. You do not get good at AI by using it once. Give people time. Slow down to go faster.
- "You never get to where you want to go remaining where you are." Roommates in college. GitHub Copilot, follow creators. The Greek-myth muddle (he means Sisyphus, says Atlas, then Titan). Tommy tells him to stay off Greek gods.

**Contested. Do not flatten.**

- Evolve or die. At 38:51 Tommy says the Fabric-backend moment is "that evolve or die type of thing. That's what you said." At 53:16, after Mike's decision-making-system landing, Tommy says "for me, it's evolve or die at this point. So I think you said it perfectly." The phrase is his close and his label for the service expansion. Do not write it as Mike's thesis, and do not reuse the ep 579 iCloud / Mac-was-the-hub image. That post spent the phrase on the product.
- Explorations and personal bookmarks as a certification joke. Tommy, off his rocker: if an exploration can be certified, why not personal bookmarks? Mike: don't, the exploration is not the certified thing, the model under it is, and he is not telling clients to certify explorations. Tommy: even if he is wrong that they are certifiable, he is right that you shouldn't. They leave it for the mailbag. Not a post.

**Do not rewrite.** Ep 583's AI prototype-to-production post. The Monday sentence and the ticket loop live there. This episode's drift is the next move: go ask what they built, because they will not bring it to you. [Fabric Is Best as a Backend](/2026/10/05/fabric-is-best-as-a-backend/). He credits Mike with that picture and jokes Microsoft should buy the trademark. The new claim is that the team who owns the backend should also own the app, not that Fabric is a good backend. [The Agent Builds the App Faster](/2026/11/04/the-agent-builds-the-app-faster/). [Central BI Is a Tiger Team Now](/2026/09/18/central-bi-is-a-tiger-team-now/). Ep 579's product "evolve or die." Ep 581's UI iceberg. Spell Rayfin if it survives into a draft. Whisper heard "Fabric apps" and "Fab."

## Mined Tommy material

- **Frame.** Two areas. Drift when leadership builds with no conversation. And Fabric as a backend: BI can build the app without a software team, or leadership builds it alone. He hands Mike the open.
- **His scope was too narrow.** He agrees. Leadership will not build a dashboard and put the tool back on the shelf. He wanted, before they started, to show a report he is proud of. It looks like a Fabric app. It is Power BI. Agentic tooling is what got it there, and it changed what his own work stream can do.
- **Individual curiosity, two sides.** Invite leadership to poke at AI until they get the same "whoa" he and Mike had. Budget app that replaces the Excel file. Then: if I can do this, imagine what the BI team can do on our data. Other side: it never becomes a proof of concept. They have been using the Claude thing for two or three weeks. He had that conversation the week before or the week before that. "What data are you using?" A whole other work stream, and BI was not in it.
- **Least path of resistance.** He thinks it belongs on a shirt. They build the app because they can, it is fast, and it solves the need in front of them. There is no perfect tool. There is the best one for this situation. No loyalty once a better one shows up. The Power Apps line in the next breath (he stopped using Power Apps for time and project management) sits in a paragraph with no name. Likely his. Do not hang the post on it.
- **The personal bookmark story. FTE, director of BI, 2020 or 2021.** Quarterly calls with sales. Training and adoption already done. They had taught personal bookmarks. His habit in those calls: show me how you're using the report. One sales team ran the day on personal bookmarks. Simple filters. Their region, their team, their metrics. Light bulb. Pre-bake those as measures. Same semantic model, thin report. Northeast and that team is a measure, shown over time, instead of filtering and exporting. His flag with clients now: show me the process and we'll build a pre-baked solution. Those became the most impactful reports he made. Same workflow with leadership and AI, or the drift is guaranteed. They will say they do not need the handoff because they are getting what they need.
- **Do not wait for them to walk it over.** "Hey, I want you to build. What have you done?" Then the data handoff, into Fabric, "to the masses of the organization." Odds are the app is on an export. They do not have the lakehouse or the semantic model. They will not show up and say "create this in Fabric." Budget app in Claude, a little cumbersome, everyone connects to it. His line: why don't we streamline this so it connects to live Fabric data and goes through the governing process. That is how BI gets more valuable and gets back into the process. Encouraging it is the fix. Stopping it is not.
- **Let them refine it. Then market the team.** iPod. He is reading the history. Every Friday a stage went to Steve Jobs. Over the weekend Jobs said what he liked. The click wheel had to accelerate with the finger. Leadership should own that loop. A ticket for "the button should say thank you" does not work. Train them. Then promote and market the BI team.
- **Widen the service.** If BI owns the pipeline and knows where the data is, BI should be the app developer and the solution provider. Anything leadership needs, on data already in Fabric, secured, trusted, related. Not a handoff to a software team. Not another license. In-house, because Fabric is the backend. Why does the team still own only reporting?
- **Drop the name.** "I think we need to drop the name BI team." Mike calls it a step farther. Tommy calls it maybe the hottest take of 2026 and does not insist. Later, after Mike's "the medium changed" argument, Tommy: change the BI team to the solutions team. SI. Solutions intelligence. Mike likes SI, then prefers "solutions team" and runs the acronym bit. Tommy: solutions feels right. He also floated ABI, agentic business intelligence, earlier, as what the department should market. Two names. SI is the one he came back to. ABI is the first swing. The community names are Mike's agent. Do not publish SIT, SIG, SOLIS, or SAIL as Tommy's proposal.
- **Keys of the kingdom, his words.** OneLake. We understand it, we connect it, we can build the report, the dashboard, the application, or talk to a system the company already bought, because we own the pipeline and the source of truth. Mike's short answer is that he agrees. The long answer is Mike's (function unchanged, medium changed).
- **Icy mountain.** Wrestling coach. Every day you are on an icy mountain. You are climbing or you are sliding. No middle, no status quo, no reacting. Leadership's individual curiosity is the chance to climb: value, integration with leadership, influence on the culture. Reactive is the slide. If he were still director of BI he would be booking the leadership calls. He is a consultant, so the move is with clients. Proactive means what they are testing, not what they tell the team. "Whatever you want to call us." This is his close for the whole two-parter. He ties the metaphor to curiosity in the same breath as the climb. He still wants the service-expansion post and the rename post separated. Put the coach line in one post only.
- **Evolve or die, his button on Mike's close.** Mike landed on a broader name and a decision-making mission. Tommy: that's evolve or die.

## Locked (2026-11-13)

Series `when-leadership-builds` ("When Leadership Builds"), three parts. See `ep-583-angles.md` for the full map.

- **Part 1 spent the icy mountain**, plus individual curiosity / budget app, his Fabric-app-looking report, least path of resistance, and the iPod click-wheel loop. Do not reuse any of them in Parts 2 or 3. That resolves "put the coach line in one post only": it lives in Part 1.
- **Part 2** takes the personal bookmark story, "don't wait for them to walk it over," and the streamline-onto-live-Fabric line, merged with 583's AI P2P path.
- **Part 3** takes widen the service, keys of the kingdom, drop the name / SI, and closes on evolve or die.

## Recommendation

**Show me the process.** Title direction: "Show Me How You're Using It" or "The Personal Bookmark Was the Spec." Plot: the 2020 sales-bookmark story, the pre-baked thin report, then the same question asked of a leader who has been living in a Claude app for three weeks. Stream it onto live Fabric data and out to everyone else. Encourage the building. Do not wait to be handed it. Leaves the 583 prototype-to-production post alone. That one is the path after they hand you the wireframe. This one is how you find out the wireframe exists.

Second article, separate: **the team owns the app because the team owns the data.** Evolve or die as the team's services, not the product. Fabric backend, no handoff to the JavaScript team, keys of the kingdom. The icy-mountain line can live here as the no-status-quo close, or on the curiosity post. Not on both.

Third article, separate, and thinner: **Solutions Intelligence.** He offered the name. He also offered ABI first. The tape does not say what the name commits the team to beyond "more than reports" and "solutions feels right." Mike's decision-making-system line is the stronger mission statement and it is Mike's. Draft this only if Tommy still wants the name to carry a whole post. Otherwise it is the last section of the service-expansion piece, which is the merge he asked not to make. His call.

## Other angles

### They will not bring you the app

**Thesis:** The drift is not a leader who forgot governance. It is a leader who will never open the ticket. The BI move is the question, before the handoff.
**Plot:** this is the spine of the bookmark post. Do not split it.

### Certify the bookmark, then

**Thesis:** If an exploration can wear the certified badge, the badge has stopped meaning change control.
**Plot:** he already parked it. "Even if I'm wrong that they are certifiable, I'm still right that you shouldn't." Mailbag, or a section of a certification post. Not this series.

### The click wheel is the prototype loop

**Thesis:** Leadership should do the Friday-to-Monday refinement themselves. BI shows up when the loop has found the thing people will actually use.
**Plot:** one section inside the bookmark post. The iPod story is the permission to let them iterate. It is not its own argument.
