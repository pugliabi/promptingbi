# Ep 545 angles — Agents Helping with Data Governance

Ore file. Draft later from `transcripts/ep-545.txt`. Do not treat this as the article.

- Episode: 545
- YouTube: https://www.youtube.com/watch?v=ycb4alZQbZ8
- Notion: https://app.notion.com/p/397e74c69c188056a08dc50d9279dbd4
- Transcript: `transcripts/ep-545.txt`
- Source: local YouTube auto (file already existed; not re-fetched). No speaker labels.

**Already claimed (do not write first / do not re-file in Notion):**
- Published: [Should an AI Agent Sit on Your Data Governance Committee?](https://promptingbi.com/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/)
- Draft: `drafts/2026-08-21-four-pillars-of-data-governance-agents.md`
- Notion Ideas: Strategy vs Tasks, Reading OneLake Architecture Guidance, Governance is 70% people, Fabric didn’t break your governance it exposed it

Skip: user-group promo; Mike’s JCI battery MDM; FUAM; bank/asymptote cost of 100% clean data.

---

# Cross-episode expansion pass (2026-08-31)

The four-pillars draft was built from ep-545 alone. Mined five adjacent transcripts to deepen it. **Everything below is vocative-attributed Tommy** unless marked. Material marked ✅ is now IN the draft; ⬜ is mined but unused and still available.

## ep-411 — Data Contracts in PBI and Fabric (richest source, was never mined)

- ✅ **Car conversation / parenting analogy.** Talk to the kids in the car before the visit about respect and table manners. Punish with no prior expectation and you get *"That's not fair. I didn't know what was the expectation."* Landing line: **"If you don't have that conversation, there's no responsibility for anyone."** Used compressed in Pillar 3 (table-legs stays the frame analogy).
- ✅ **Start small, amend by discovery.** *"You have to start small, very few rules initially, and then as you discover them, update these contracts and modernize them, get both teams to agree."*
- ✅ **Three enforcement modes** (from Databricks assertions): flag the row, filter it out, or fail the job. Contract must name the mode per rule.
- ✅ **SLA belongs in the contract / model description.** Data team drafts from backend reality: source lands at 5, load takes 2 hours, 7 is the floor, 8 is the promise, then negotiate. MTBF / MTTR as the metrics. SLA as *"trust gathering element."*
- ✅ **Salesforce blame standoff.** *"My data coming to you is exactly as it came from Salesforce... actually it's you business, go fix your data in Salesforce."* DE ends up writing patch logic for someone else's data entry. (Used thin in Pillar 3; also filed as its own angle below.)
- ✅ **Customer / transaction resolution pattern.** Customer = ever purchased? last 6 months? last year? Org lands on ONE; the dissenting dept gets a **different word** (*"microtransaction or some other term"*). *"There's a language here that all teams must adhere to."* This is the biggest single gain in the expansion.
- ✅ **Signed, confirmed, and read by all parties before we start** (already in draft, now properly sourced).
- ⬜ *"You're kind of inadvertently already making data contracts every time you publish something to powerbi.com."* Filed as its own angle.
- ⬜ *"Very good at bar charts, not all these other things"* — leadership's view of the BI team. Used as one line in Pillar 2; filed as its own angle.
- ⬜ **"We don't have a definition, so we can't create any number":** the stakeholder freeze conversation. *"I'm not going to build a report that's wrong numbers."* Plus *"all these different things under the rock that were not discovered are usually what we are the ones taking on."*
- ⬜ **"There's no global anything"** — argues for a rule engine with a real UI over global parameters on metric sets.
- ⬜ **Every table needs a health score** + data drift watching in the OneLake catalog. Great Expectations in notebooks (customer key not null, % never > 100 when grouped, *"deviation from normal"*).
- ⬜ **User tiers as a promotion gate.** Consumers get app + semantic model; advanced get shortcuts / SQL endpoint / silver; experts closer to source. *"In order for you to promote your content out to consumers, we had to have a process."* (Tier list used in Pillar 1 bullets; the promotion-gate framing is unused.)
- ⬜ Consumer has more vested interest in the rules being right, because they're the one who comes back saying it doesn't work.

**Attribution landmines (ep-411):** the SQL `CREATE TABLE` / varchar / truncate walkthrough, the Atlan article four-bucket summary (schema / semantics / SLA / governance), the *"that's not semantics, that's metadata"* correction, the CTO-mediation paragraph, and the metric-sets-with-parameters proposal are all **Mike**. Do not write the four-bucket framing as Tommy's.

## ep-540 / ep-539 — Self Service with AI (Pillar 1)

- ✅ **Lineage similarity finding.** One measure with ~7 others at ~90% similarity; *"17 measures that say member count."* *"How is an agent supposed to decide what to actually use if you have all this ambiguousness?"* Filed also as its own angle.
- ✅ **The thesis-level position:** *"I am not rolling out any agentic solutions around Fabric data unless a company has data governance in place."* Now the draft's stated stance.
- ✅ **If humans can't understand the model, an agent won't do better.**
- ✅ **Anthropic doc-decay numbers** (~95% → ~65% offline accuracy over one month) + their fix: skill markdown colocated in the repo with the transformation models, review hook flags a model PR with no doc change, ~90% of data-model PRs now carry one. **Verified against the published Anthropic post**, linked in the draft.
- ⬜ **Lineage tooling ≠ governance program.** *"I don't care if you have bought every data lineage thing... If people don't trust it and there's no process and change management and accountability, what are we doing here?"*
- ⬜ **Perspectives are the most untapped feature in Fabric** — no UI to build them outside Tabular Editor, and Copilot can't run on one.
- ⬜ **Users won't re-ask.** *"Users are not going to go, I think that number is right, let me ask it 18 more times. They're going to move on, go back to the report."*
- ⬜ **Business context layer** (roadmaps, decision logs, org structure): without it the agent *"will answer what the user asked, not what they meant."*
- ⬜ **Validation as a launch gate:** a domain owner can't announce an agent to stakeholders until that slice of the eval clears a threshold.
- ⬜ **Skills rot** as a staffed function, not a project. *"The data's like a living organism. And so are skills now."*

**Attribution landmines (ep-540/539):** the pairwise/router skill pattern, OSI / open semantic interchange, "agents should build deterministic reports not answer ad-hoc questions," and the aggregated-fact-shadow idea are **Mike**.

## ep-338 — Overcoming Challenges in a CoE Rollout (Pillar 2 / 4)

⚠️ Third host **Seth** on this episode. The entire mailbag read (1,700 reports, 3 hrs/wk, disengaged sponsors) is Seth's, not Tommy's. Don't attribute the org specifics to a Tommy client.

- ✅ **Don't pick your hardest thing.** *"If Power BI and Fabric are brand new to an organization you don't pick your hardest thing... you start and show the value and then you gain excitement."* Plus: a 10-year Excel process can't be flipped in a week.
- ✅ **Skin in the game.** *"Oh yeah that sounds like a great idea, run with it, and if it fails it's on you. No additional budget, no additional anything for me as an executive sponsor."* Approval is not sponsorship.
- ✅ **Deprecation as an initiative** (ask whether all those reports are still opened).
- ✅ **Weekly upward reporting.** Executives *"just want to know, are we meeting our business needs with data."*
- ✅ **Pain points become goals** (already in draft; now sourced in detail: go to the director of sales, ask the team's biggest pain points with getting data, bring the written list to whoever owns the BI budget).
- ✅ **Goals + roles and responsibilities** as the foundation of implementation planning (already in draft, sourced).
- ⬜ **The CoE death spiral.** Big launch with messaging, announcements, meetings, invites, and then *"one day it just dies"* because the audience disengaged or support couldn't scale, and the leader disappears into *"support hell."* Filed as an angle.
- ⬜ **Federated CoE:** BU representatives surface challenges, CoE writes policy, champions in each group absorb local pain. Missing champion / community of practice as a structural gap.
- ⬜ **Department-first fallback:** when the enterprise CoE won't land, a department that's crushing it builds a mini community of practice, then *"rinse wash and repeat"* outward.
- ⬜ **Authority surfaces as a pain point on its own** — *"who's in charge of this"* comes back from the department walk unprompted.
- ⬜ **Deutsche Bank / patient zero analogy:** one person shorting housing while the firm was long, having to prove value for doing what the industry wasn't. Ties to building risk/reward slides for skeptics.
- ⬜ **Empathy as the adoption lever** — it's not the technology, it's who owns the legacy process and why they defend it.

## ep-546 / ep-541 — mined, almost entirely already spent (do not re-mine for governance)

Checked both against published content. **Nothing from these two went into the four-pillars expansion, and that was the right call.** Recording the collisions so a later pass doesn't rediscover them:

- **Tommy's four-part literacy framework** (data culture / data literacy / cognitive load / buy-in, *"those four together are what's going to help elevate your executive team"*) is **already published twice**: in full in [What Keeps You Up at Night](/2026/08/10/what-keeps-you-up-at-night/) and as a bullet list in [Step Zero](/2026/07/27/step-zero-before-the-fabric-adoption-roadmap/). Do NOT add cognitive load or buy-in to the four-pillars Pillar 4 bullets; it would duplicate published prose and nest a four inside a four.
- **The coffee test** (walk past a leadership meeting and they're arguing from a Power BI dashboard) is published in both of those posts too.
- **"What keeps you up at night?"** and the 18-unrelated-requests disconnect: published, whole post named after it.
- **Motivated skepticism, the email open rate down 10% in red, color as a conclusion:** claimed by `backlog/2026-07-20-report-the-why-not-just-the-what.md` and by the Notion Ideas rows in `ep-546-angles.md` (*Motivated Skepticism*, *The First Bad Red*, *Color Is a Conclusion*).
- Still genuinely unclaimed from ep-546: the **Google Analytics forum-page conversion** story (one misaligned metric definition killing a platform migration) and the **beta/sandbox review before publish** practice. Both are Pillar 4 adjacent but belong to their own post, not to four-pillars.
- Still unclaimed from ep-541: the **executive meeting script** (agenda framing, the two-week progress cadence, get your boss aligned before scheduling the CFO) and the **SSRS three-nights-at-the-office** story. Some of this is close to Step Zero; check that post before drafting.

**Neither episode contains** governance committee composition, the bilingual business-plus-platform person, or counting definitions of "customer." Those come from ep-545 and ep-411 respectively.

## ⚠️ Attribution correction from the ep-545 re-read

**The seven-sales-regions data contract example originated with Mike, not Tommy.** A full vocative pass puts the "only seven regions, no Unknown, committee picks the product names, agent runs distinct values daily, notify the owner by name" walkthrough in Mike's turns, including *"zero AI, zero agent"* inside the contract itself. Tommy's response was the endorsement: **"Yes. That's the initiative. That's the agreement."** plus *"better data in means better insights and data out."*

Consequences and the mitigation already in place:

- The published [committee post](/2026/07/16/should-an-ai-agent-sit-on-your-data-governance-committee/) already ships the seven-regions example. It is a generic illustration rather than a distinctive position, and Tommy explicitly affirmed the concept on air, so this is not worth a correction to a live post. Flagging it rather than fixing it.
- The four-pillars draft's Pillar 3 no longer rests on it. The substance now comes from **Tommy's own ep-411 material**: signed-confirmed-and-read before we start, start small and amend by discovery, the three violation modes, the SLA drafted from backend reality, and the car conversation. Seven regions survives only as the worked example.
- **Do not** write the quarantine / eventing-on-load / RTI flagging mechanics as Tommy. That is Mike, from the OneLake architecture diagram.

Confirmed as **solidly Tommy** in the same pass, so the draft is safe on these:
- Both-directions accountability: *"point it back both from the person doing the transformations and the person inputting the data."*
- Committee composition: *"If you do not have people who have the ability to speak business and the technology, I find it very difficult in the age of Fabric for you to ever have a good handle on this."*
- The 70 percent people estimate, and *"agents are not going to lead your data governance program."*
- Transparency as the hardest pillar to keep up on, and the seven-reports-with-sporadic-views example.
- All four pillar names and their sub-questions.

Also Mike, per this pass, and already correctly kept out of the draft: the Johnson Controls car-battery MDM story, the Fabric Adoption Roadmap and Data Governance Institute definitions, the asymptotic cost curve and the banks example, FUAM, and *"add Fabric into your data governance"* rather than the reverse.

## ep-484 — Data Governance with Fabric IQ

- ⬜ **Excel as the shadow semantic layer.** *"People were not just doing some functions... very smart people with very terrible organization skills... organizations out there who make money despite of it, who are relying on ridiculous functions and on certain cells and certain references just to get by."* (Compressed into a Pillar 4 bullet; the full story is unused.)
- ⬜ **90% of organizations trying to adopt AI are failing** — cited as why a universal sense-making layer matters.
- ⬜ **2D → 3D painting analogy** for ontology: adds a dimension to the semantic-model work you already do, not a replacement.
- ⬜ **Fabric IQ roadmap skepticism:** the "Fabric IQ release plan" is the Fabric roadmap filtered on administration, governance, and security. Not a separate plan.
- ⬜ **Purview vs ontology:** Purview lets you view and locate; the ontology adds shared definition, lineage, and how facts act on one another.
- ⬜ **Microsoft ships the car, not the driving lessons.** Copilot semantic-model instructions are *"a giant text box"* with unknown output and unknown value. Wants scenario cookbooks like Claude Code skills or the Google/GitHub cookbooks. *"I think this is the hardest thing of our industry right now."*
- ⬜ **Start the pilot on the most blatant use case** — the thing where an agent's help is obvious, or the biggest ticket item.
- ⬜ **Fake service accounts** (`PowerBI@companyname.com`, humans logging into a browser as it). *"What are we doing here?"*

**Attribution landmines (ep-484):** the workspace-identity / lottery-test framing, *"I don't think all of our data needs to be part of this,"* the data-owner-and-steward-before-ingest gate, and the report-ROI test (*"if the report isn't making money or saving money why are we doing it"*) are all **Mike**. The Fabric IQ intro monologue and the "unified shelf" agent metaphor are unattributable-but-probably-Tommy; don't quote them as his.

---

# Leftover angles filed this pass

## ★ Seventeen Measures Called Member Count
**Thesis:** Definitional ambiguity was a tax you could absorb when only humans read the model. Copilot turns it into a wrong answer delivered with confidence, and the lineage view finally makes the bill visible.
**Material:** ~7 measures at ~90% similarity; 17 member-count measures; *"how is an agent supposed to decide"*; if humans can't navigate it an agent won't; perspectives as the unbuilt fix; users don't re-ask, they go back to the report.
**Freshness:** the four-pillars draft uses this as one Pillar 1 beat. A standalone post gets the measure-hygiene walkthrough and the perspectives argument.

## ★ You're Already Writing Data Contracts
**Thesis:** Every publish to the Service creates a partial, undocumented contract. Governance isn't introducing a new artifact, it's writing down the one you've been signing by accident.
**Material:** *"You're kind of inadvertently already making data contracts every time you publish something to powerbi.com... the tool allows for aspects of a data contract to exist but you don't even know you're doing it."* Schema comes free; semantics and SLA are the parts nothing stores for you. Certified assets need the rigor; not every model does.
**Freshness:** the four-pillars post shows a finished contract. This one argues the contract already exists implicitly.

## ★ Whose Data Is It?
**Thesis:** A decision tree for when the data engineer should refuse to patch upstream CRM garbage, and what has to be true organizationally before that refusal is anything other than career risk.
**Material:** the Salesforce standoff; both parties right; patch logic billed at engineering rates; the input owner as the missing role; escalation needs someone with authority to assign the fix and a deadline. Related: *"we don't have a definition, so we can't create any number"* freeze.
**Freshness:** four-pillars uses one paragraph. This is the full playbook.

## ★ Nobody Gets Promoted for Governance
**Thesis:** Leadership thinks your team is good at bar charts because the governance work leaves no artifact they ever see. Fix the visibility problem or keep losing the budget argument.
**Material:** *"very good at bar charts not all these other things"*; can't only run forward on net-new, must balance maintaining what exists or it falls over; weekly one-paragraph upward reporting; pain points harvested from department heads carry more weight than your perceptions; the CoE death spiral as the end state.
**Freshness:** one line in four-pillars. The whole argument is unwritten.

## Also on the table (lower priority)
- **The CoE death spiral** (ep-338) — big-bang launch, then support hell. Overlaps with the bar-charts angle; could merge.
- **Lineage viewers don't replace governance programs** (ep-540).
- **Your skills rot faster than your model** (ep-540) — Anthropic's 95→65 as the case for staffed maintenance. Partly spent in the four-pillars catalog-scribe section.
- **Microsoft ships the car, not the driving lessons** (ep-484) — scenario cookbooks vs a giant text box.
- **Every table needs a health score** (ep-411) — assertions, drift, statistics in the OneLake catalog.

## ★ Write first leftover: Your First Governance Agent Is Not an Access Inventory

**Thesis:** Grants, sharing links, app audiences, and AAD-group maps are real work. They are also the security misconception wearing an MCP costume. Start the agent on definitions and quality, not on who can see what.

**Material (Tommy):**
- Mailbag (Taylor): agent pulling Fabric audit + model APIs for grants, sharing, app audiences, then SharePoint/AAD mapping. Tommy: they never said “governance,” and this is still “such a big part” of the security slice people already over-index on.
- Mike: this is who-has-access-to-what, “a very small part of the bigger data governance story.”
- Tommy’s best-first-use-case is the opposite: what models exist, what the measures mean, which of the seven sales reports with sporadic views is the one sales should use.
- Tenant-wide “who can see what” as a native Microsoft feature is a wish. Don’t wait for it, and don’t make it week-one of the agent program.

**Attribution:** Tommy on first use case + security-slice frame. Mailbag is Taylor’s. FUAM/tenant-settings-daily-snapshot is Mike. Don’t write FUAM as Tommy.
**Freshness:** leftover. Published post says start with transparency. This is the explicit anti-pattern.

## Claimed (do not duplicate)

### Four pillars, none of them “security”
Enablement, promotion of initiatives, accountability, culture/literacy. Access control is a feature inside one pillar.
**Collision:** four-pillars draft + committee post.

### Agents don’t lead governance. They keep the recipe book.
Transparency the catalog humans cannot keep current, plus secretary work for the committee.
**Collision:** published committee post.

### Governance is ~70% people
If the org hears governance and thinks “who can see what,” you will hire the wrong agent.
**Collision:** published + Notion *Governance is 70% people*.

### Fabric made the bilingual committee non-optional
Lakehouses, notebooks, and Spark mean logic lives in more places, for two audiences.
**Collision:** published “Fabric Turned the Web Into a Tangle” + Notion *Fabric didn’t break your governance*. Note: the “you already had governance, Fabric just showed it” inversion is Mike. Notion title tracks Mike. Don’t write that as Tommy.

### Humans write the data contract. The agent is the watchdog.
Seven regions, not eight, not Unknown, is a committee agreement with zero AI in it.
**Collision:** published + four-pillars “contract watchdog.”
**Attribution:** UNCERTAIN on quarantine/notify mechanics (Mike-leaning).
