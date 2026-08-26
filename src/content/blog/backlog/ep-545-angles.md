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
