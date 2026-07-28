// Shared tag taxonomy for promptingbi.com.
// Plain .mjs (not .ts) so both Astro pages and Node scripts (scripts/auto-tag.mjs)
// can import it without a TypeScript loader.
//
// Each tag: a lowercase kebab-case slug, a human-readable display name, and the
// keywords/phrases (matched case-insensitively, whole-word) that suggest it.

export const TAGS = [
  { slug: 'power-bi', display: 'Power BI', keywords: ['power bi', 'powerbi', 'pbix', 'pbip'] },
  { slug: 'microsoft-fabric', display: 'Microsoft Fabric', keywords: ['microsoft fabric', 'fabric'] },
  { slug: 'dax', display: 'DAX', keywords: ['dax', 'dax studio', 'evaluation context', 'calculated column', 'calculated columns'] },
  { slug: 'power-query', display: 'Power Query', keywords: ['power query', 'm code', 'dataflow', 'dataflows'] },
  { slug: 'semantic-models', display: 'Semantic Models', keywords: ['semantic model', 'semantic models', 'data model', 'data models', 'tabular model', 'tmdl', 'star schema'] },
  { slug: 'prompt-engineering', display: 'Prompt Engineering', keywords: ['prompt engineering', 'prompting', 'prompt', 'prompts', 'prompted', 're-prompting', 're-prompt', 'system prompt'] },
  { slug: 'chatgpt', display: 'ChatGPT', keywords: ['chatgpt', 'openai', 'gpt-4', 'gpt-4o', 'gpt-5'] },
  { slug: 'claude', display: 'Claude', keywords: ['claude', 'anthropic', 'claude code'] },
  { slug: 'copilot', display: 'Copilot', keywords: ['copilot', 'copilot studio'] },
  { slug: 'llms', display: 'LLMs', keywords: ['llm', 'llms', 'large language model', 'large language models', 'language model', 'language models'] },
  { slug: 'ai-agents', display: 'AI Agents', keywords: ['ai agent', 'ai agents', 'agent', 'agents', 'agentic'] },
  { slug: 'agent-skills', display: 'Agent Skills', keywords: ['agent skill', 'agent skills', 'skill file', 'skill files', 'skill.md'] },
  { slug: 'mcp', display: 'MCP', keywords: ['mcp', 'model context protocol', 'mcp server', 'mcp servers'] },
  { slug: 'generative-ai', display: 'Generative AI', keywords: ['generative ai', 'genai', 'gen ai', 'ai-generated'] },
  { slug: 'context-engineering', display: 'Context Engineering', keywords: ['context engineering', 'context window', 'context windows'] },
  { slug: 'data-visualization', display: 'Data Visualization', keywords: ['data visualization', 'visualization', 'visualizations', 'visual', 'visuals', 'chart', 'charts', 'diagram', 'diagrams', 'diagramming'] },
  { slug: 'reporting', display: 'Reporting', keywords: ['report', 'reports', 'reporting', 'dashboard', 'dashboards', 'kpi', 'kpis'] },
  { slug: 'governance', display: 'Governance', keywords: ['governance', 'data governance', 'compliance', 'audit', 'tenant settings'] },
  { slug: 'adoption', display: 'Adoption', keywords: ['adoption', 'adoption roadmap', 'change management', 'rollout'] },
  { slug: 'data-culture', display: 'Data Culture', keywords: ['data culture', 'data literacy', 'data-driven', 'data driven'] },
  { slug: 'okrs', display: 'OKRs', keywords: ['okr', 'okrs', 'key results', 'objectives and key results'] },
  { slug: 'business-intelligence', display: 'Business Intelligence', keywords: ['business intelligence', 'bi professional', 'bi professionals', 'bi consultant', 'bi consultants', 'bi team', 'bi teams'] },
  { slug: 'tutorials', display: 'Tutorials', keywords: ['tutorial', 'tutorials', 'walkthrough', 'step-by-step', 'step by step', 'worked example'] },
];

const DISPLAY_BY_SLUG = Object.fromEntries(TAGS.map((t) => [t.slug, t.display]));

/** Human-readable name for a tag slug ("power-bi" -> "Power BI"). Falls back to Title Case. */
export function tagDisplay(slug) {
  return (
    DISPLAY_BY_SLUG[slug] ??
    String(slug)
      .split('-')
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(' ')
  );
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function countMatches(text, keyword) {
  // Whole-word match; hyphens count as word characters so "prompting" doesn't
  // match inside "re-prompting" (which has its own keyword).
  const re = new RegExp(`(?<![\\w-])${escapeRe(keyword)}(?![\\w-])`, 'g');
  return (text.match(re) || []).length;
}

/**
 * Deterministic keyword scoring: title hits weigh more than body hits.
 * Returns roughly the top 3-6 tag slugs, ordered by score.
 */
export function suggestTags(title, body, { max = 6, min = 3, threshold = 2, titleWeight = 3 } = {}) {
  const t = String(title || '').toLowerCase();
  const b = String(body || '').toLowerCase();
  const scored = [];
  for (const tag of TAGS) {
    let score = 0;
    for (const kw of tag.keywords) {
      const lower = kw.toLowerCase();
      score += countMatches(t, lower) * titleWeight;
      score += countMatches(b, lower);
    }
    if (score > 0) scored.push({ slug: tag.slug, score });
  }
  scored.sort((a, z) => z.score - a.score || a.slug.localeCompare(z.slug));
  let picked = scored.filter((s) => s.score >= threshold);
  if (picked.length < min) picked = scored.slice(0, min);
  return picked.slice(0, max).map((s) => s.slug);
}
