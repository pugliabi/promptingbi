// Category taxonomy for the /prompts/ library.
// Plain .mjs (like tags.mjs) so src/content.config.ts and scripts/new-prompt.mjs
// can import it without pulling in astro:content or a TypeScript loader.
//
// Array order is the section order on /prompts/. Each id doubles as the anchor
// on that page (/prompts/#notion-agents), so treat ids as permanent.

export const CATEGORIES = [
  {
    id: 'notion-agents',
    label: 'Notion Agent Instructions',
    blurb:
      'The instruction pages my Notion assistants run on: purpose, division of labor, hand-off rules, and hard stops.',
  },
  {
    id: 'agent-briefs',
    label: 'Claude & MCP Instruction Pages',
    blurb:
      'Operational briefs for execution sessions. Role, dated priority callout, standing directives, verified state, report-back requirement.',
  },
  {
    id: 'agent-skills',
    label: 'Agent Skills & Definitions',
    blurb:
      'Skill files and agent definitions, front matter included: what triggers them, what they read first, and the guardrails that keep them in their lane.',
  },
  {
    id: 'fabric-guardrails',
    label: 'Fabric Recon & Guardrails',
    blurb:
      'What an agent reads before it touches a tenant: read-only survey briefs and dated verified-state blocks.',
  },
  {
    id: 'dax',
    label: 'DAX & Validation Queries',
    blurb: 'Measure patterns and the DAX acceptance tests that decide whether model work counts as done.',
  },
  {
    id: 'notebooks',
    label: 'Fabric Notebook Patterns',
    blurb: 'PySpark scaffolding and validation cells: the NB_TEST switch, referential integrity checks, domain asserts.',
  },
  {
    id: 'session-prompts',
    label: 'Session Kickoff Prompts',
    blurb: 'The short lines you actually type, once the context engineering already happened somewhere else.',
  },
  {
    id: 'playbooks',
    label: 'Playbooks & Checklists',
    blurb: 'Meeting scripts, scorecards, and rollout checklists for the human side of this work.',
  },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

const BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

/** Category record for an id, or undefined if the id is unknown. */
export function category(id) {
  return BY_ID[id];
}

/** Human-readable label for a category id. Falls back to the raw id. */
export function categoryLabel(id) {
  return BY_ID[id]?.label ?? String(id);
}
