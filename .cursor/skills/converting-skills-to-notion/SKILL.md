---
name: converting-skills-to-notion
description: Convert a Claude skill (SKILL.md + references + scripts) into a Notion AI Skill page under the AI Skills page in Tommy's Notion workspace. Use whenever the user wants to convert, port, sync, mirror, or "notion-ify" a Claude skill, push a skill to Notion, create a Notion skill from an existing skill, or make skill knowledge available to Notion Agent. Triggers on "convert this skill to Notion", "make a Notion skill from X", "push the rayfin skill to Notion", "notion version of this skill", "add this skill to my AI Skills page". Requires the Notion MCP connector.
---

# Converting Claude Skills to Notion AI Skills

Convert a Claude skill into a single Notion page that works as a Notion AI Skill (@mention-able in Notion Agent chat) AND as a context page Claude can read later via the Notion MCP.

## Why this works

Notion Custom Skills (released March 2026) are just pages marked "Use as AI Skill." Notion's own best practices mirror Claude skill anatomy: write the page like a strong prompt (goal, inputs, constraints, output format) and keep it short. The big difference: **Notion cannot execute scripts.** So the conversion's job is to distill *knowledge, context, and decision logic* — not implementation.

The converted page serves two readers:
1. **Notion Agent** — uses it as a skill to draft content, answer questions, and work within Notion using the domain knowledge.
2. **Claude (later)** — reads the page via Notion MCP to pick up full project context, then executes the technical work locally.

## Workflow

### Step 1: Locate and read the source skill

Find the skill in this priority order:
1. Installed skills in the current environment (`/mnt/skills/user/<name>/`, `/mnt/skills/plugins/<name>/`)
2. The Skill Vault via Filesystem MCP (`C:\Github\agent-skills`) — if the Filesystem connector is available
3. Files the user uploads or points to

Read **everything**: SKILL.md, all reference files, and all scripts. Don't skip scripts — you need to understand what they do to describe them. If the skill is large, read references and scripts enough to capture their purpose, inputs, outputs, and decision logic.

### Step 2: Classify the skill, then distill into a single Notion page (~1,500 words max)

First decide which conversion profile fits — this determines what the page optimizes for:

- **Workflow skill** (interaction patterns, wizards, interview/drafting processes — e.g., grill-me, building-puglia-sow): the *procedure* is the value. Preserve steps, interaction contracts, and output formats faithfully. The page is a runnable prompt.
- **Technical/domain skill** (script- or code-heavy expertise — Power BI, Fabric, DAX, TMDL, semantic modeling, extension development): the procedure is Claude-executable mechanics that Notion can never run. The value is the *knowledge*. The page is a **domain brief**: what the system/technology IS, core concepts and vocabulary, Tommy's conventions and patterns, design rules, gotchas, and how the work connects to clients and the rest of the stack. Compress the workflow to a short "how work proceeds" overview and put ALL scripts/code mechanics into the "What Claude automates" section. The goal: an AI reading this page becomes conversant in the domain the way Tommy practices it — able to discuss, draft, plan, and recognize when to hand execution to Claude — without the original skill installed.

Most skills lean one way; some (like building-rayfin-apps) are hybrids — give each half its weight.

Read `references/notion-skill-page-template.md` for the page structure (it has a section-weighting note per profile), then write the page.

Compression priorities when the source is large (most Claude skills are):
- **Keep**: purpose, when-to-use, core concepts/vocabulary, workflow steps, decision logic, output formats, constraints and rules, business context (rates, estimates, patterns)
- **Compress**: long examples → one short example; multiple reference docs → key takeaways
- **Drop**: environment-specific minutiae (local file paths, CLI flags, install commands), code listings, anything only meaningful at execution time

Scripts and executable assets become a **"What Claude automates"** section: for each script, state what it accomplishes, what inputs it needs, what it produces, and any decision logic baked into it — written so a reader (human, Notion Agent, or future Claude) understands the capability and knows the actual run happens in Claude Desktop/Code. Never paste script code into the page.

Place the most critical rules at the very top and very bottom of the page — AI attention is strongest at those positions.

### Step 3: Write to Notion

Parent page: **📚 AI Skills** — page ID `313e74c6-9c18-8175-825e-f38b38332aec`.

1. Fetch the AI Skills page FIRST and scan ALL existing page links on it (every section, not just Claude Conversions) for a page whose title matches the converted skill. If a match exists, STOP and ask the user before creating anything: replace that page's content in place (update-page replace_content — default, these are living documents), or create a separate new page under Claude Conversions. Do not create the page until this is resolved.
2. Check whether a `# Claude Conversions` heading exists on the AI Skills page. If it doesn't, append it (insert_content at end) with a one-line intro ("Skills converted from Claude — knowledge and instructions only; execution happens in Claude.").
3. Create the new skill page with `parent: page_id = 313e74c6-9c18-8175-825e-f38b38332aec`. Title it in plain human-readable form (e.g., `building-rayfin-apps` → "Building Rayfin Apps"). Give it a fitting emoji icon.
4. Notion places new sub-pages at the end of the parent — verify a link to the new page sits under the Claude Conversions heading; if the created page link landed elsewhere or duplicated, fix the parent page content so exactly one link appears under that heading.

### Step 4: Hand off to the user

The MCP cannot mark a page as an AI Skill. After creating the page, tell the user:
- The page URL
- To activate it: open the page → ••• menu → **Use with AI** → **Use as AI Skill** (or Settings → Notion AI → Skills → + Add a Skill)
- A one-line summary of what was kept vs. compressed, so they can sanity-check

## Rules

- One page per skill. No reference sub-pages — everything distilled into the single page.
- Target ~1,200–1,500 words. If you genuinely can't fit the essentials, prioritize decision logic and context over examples, and say so in the handoff summary.
- Write in second person imperative ("Review the model...", "Estimate hours using...") — it's a prompt, not documentation.
- Preserve concrete business facts exactly: rates, hour estimates, naming conventions, branded colors, contact patterns. These are the highest-value content for Notion's use cases.
- If the source skill references Notion pages or databases that exist in the workspace (e.g., the Milestones database), link them with @-style page links instead of describing them.
- Never include secrets, API keys, tokens, or personal credentials found in source skills. Flag them to the user instead.
