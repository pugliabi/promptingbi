#!/usr/bin/env node
// Find published posts whose code blocks aren't in the /prompts/ library yet.
//
//   npm run scan-prompts            report gaps
//   npm run scan-prompts -- --write scaffold a draft artifact per gap, code pre-filled
//   npm run scan-prompts -- --all   also list the short blocks it considers incidental
//
// Runs as the first step of `npm run build` with --quiet, so a new post's code can't
// be silently stranded. It never fails the build: every path exits 0.
//
// Coverage = some file in src/content/prompts/ names the post in source.permalink.
// A post with `promptsExempt: true` in its front matter is skipped entirely.
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORIES } from '../src/lib/prompt-categories.mjs';

const args = process.argv.slice(2);
const write = args.includes('--write');
const showAll = args.includes('--all');
const quiet = args.includes('--quiet'); // print nothing when there are no gaps

const POSTS_DIR = join('src', 'content', 'blog', 'published');
const PROMPTS_DIR = join('src', 'content', 'prompts');

// A block shorter than this is an inline example, not an artifact worth its own page.
const MIN_LINES = 8;

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

/** Split front matter from body. Returns null when a file has no front matter. */
function split(raw) {
  const m = raw.match(FM_RE);
  return m ? { fm: m[1], body: raw.slice(m[0].length) } : null;
}

/** Read a top-level scalar out of front matter, unquoted. */
function scalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|(.*))\\s*$`, 'm'));
  if (!m) return undefined;
  return (m[1] ?? m[2] ?? m[3] ?? '').trim();
}

const unquote = (s) => s.trim().replace(/^["'](.*)["']$/, '$1').trim();

/**
 * Read `key` nested one level under `parent:`, as an array. Handles both a scalar
 * (`permalink: "a"`) and a YAML list underneath it (`permalink:` then `  - "a"`).
 */
function nestedList(fm, parent, key) {
  const start = fm.search(new RegExp(`^${parent}:\\s*$`, 'm'));
  if (start === -1) return [];
  const lines = fm.slice(start).split(/\r?\n/).slice(1);
  const values = [];
  let inList = false;

  for (const line of lines) {
    if (!/^\s+\S/.test(line)) break; // dedented: out of the parent block
    const hit = line.match(new RegExp(`^\\s+${key}:\\s*(.*)$`));
    if (hit) {
      const value = unquote(hit[1]);
      if (value) return [value];
      inList = true; // bare `key:` — values are on the following list lines
      continue;
    }
    if (inList) {
      const item = line.match(/^\s+-\s*(.+)$/);
      if (item) values.push(unquote(item[1]));
      else break; // a sibling key ended the list
    }
  }
  return values;
}

/**
 * Fenced code blocks, scanned line by line rather than by regex so an unbalanced
 * fence degrades to "no block" instead of swallowing the rest of the post.
 */
function codeBlocks(body) {
  const blocks = [];
  let open = null;
  for (const line of body.split(/\r?\n/)) {
    const fence = line.match(/^(`{3,})(.*)$/);
    if (!open) {
      if (fence) open = { ticks: fence[1].length, lang: fence[2].trim().toLowerCase(), lines: [] };
    } else if (fence && fence[1].length >= open.ticks && fence[2].trim() === '') {
      blocks.push({ lang: open.lang, code: open.lines.join('\n') });
      open = null;
    } else {
      open.lines.push(line);
    }
  }
  return blocks;
}

/** Diagrams are illustrations, never library artifacts. */
const isDiagram = (block) => block.lang === 'mermaid';

const lineCount = (code) => code.split('\n').filter((l) => l.trim()).length;

function guessCategory(blocks, title) {
  const langs = new Set(blocks.map((b) => b.lang));
  if (langs.has('dax')) return 'dax';
  if (langs.has('python') || langs.has('py') || langs.has('pyspark')) return 'notebooks';

  const text = (title + '\n' + blocks.map((b) => b.code).join('\n')).toLowerCase();
  if (/notion|@mention|consulting operations|meeting note/.test(text)) return 'notion-agents';
  if (/lakehouse|shortcut|onelake|read-only survey|reconnaissance/.test(text)) return 'fabric-guardrails';
  return 'agent-briefs';
}

/** Longest run of backticks in the code, so an embedding fence can outgrow it. */
function fenceFor(code) {
  const longest = Math.max(0, ...(code.match(/`+/g) ?? []).map((r) => r.length));
  return '`'.repeat(Math.max(3, longest + 1));
}

/** Relative .md paths under dir, including nested published/YYYY-MM/ folders. */
function mdFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true })
    .filter((f) => typeof f === 'string' && f.endsWith('.md'))
    .sort();
}

function readPosts() {
  return mdFiles(POSTS_DIR)
    .map((name) => {
      const parts = split(readFileSync(join(POSTS_DIR, name), 'utf8'));
      if (!parts) return null;
      const blocks = codeBlocks(parts.body).filter((b) => !isDiagram(b));
      return {
        name,
        title: scalar(parts.fm, 'title') ?? name,
        permalink: scalar(parts.fm, 'permalink') ?? '',
        exempt: scalar(parts.fm, 'promptsExempt') === 'true',
        draft: scalar(parts.fm, 'draft') === 'true',
        reusable: blocks.filter((b) => lineCount(b.code) >= MIN_LINES),
        incidental: blocks.filter((b) => lineCount(b.code) < MIN_LINES),
      };
    })
    .filter((p) => p && p.permalink && !p.draft);
}

function readArtifacts() {
  if (!existsSync(PROMPTS_DIR)) return [];
  return readdirSync(PROMPTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((name) => {
      const parts = split(readFileSync(join(PROMPTS_DIR, name), 'utf8'));
      if (!parts) return null;
      return {
        name,
        sources: nestedList(parts.fm, 'source', 'permalink'),
        draft: scalar(parts.fm, 'draft') === 'true',
      };
    })
    .filter(Boolean);
}

function scaffold(post) {
  mkdirSync(PROMPTS_DIR, { recursive: true });
  const slug = post.permalink.split('/').filter(Boolean).pop();
  const file = join(PROMPTS_DIR, `${slug}.md`);
  if (existsSync(file)) return { file, skipped: true };

  const category = guessCategory(post.reusable, post.title);
  const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  // Badge the biggest block's language; it's the one the page is really about.
  const largest = post.reusable.reduce((a, b) => (lineCount(b.code) > lineCount(a.code) ? b : a));
  const primary = largest.lang || 'markdown';

  const body = post.reusable
    .map((block, i) => {
      const fence = fenceFor(block.code);
      const heading = post.reusable.length > 1 ? `## Block ${i + 1}\n\n` : '';
      return `${heading}${fence}${block.lang}\n${block.code}\n${fence}`;
    })
    .join('\n\n');

  writeFileSync(
    file,
    `---
title: "${post.title.replace(/"/g, "'")}"
description: "TODO: one-sentence summary of what this artifact is (shown on /prompts/)"
category: ${category}  # TODO: confirm — guessed from the code
date: ${now}
format: ${primary}
source:
  permalink: "${post.permalink}"
draft: true
---

<!-- Scaffolded by \`npm run scan-prompts -- --write\` from the code blocks in
     "${post.title}". These are the SLICES the post shows. Replace them with the
     full artifact, write the description, confirm the category, then set
     draft: false. Delete this file instead if the code doesn't warrant a page. -->

One or two sentences on what this is and when to reach for it.

${body}

## Adapting it

- The load-bearing line and why it matters
- What to change for your own tenant or practice
- The mistake this prevents
`
  );
  return { file, skipped: false };
}

function main() {
  const posts = readPosts();
  const artifacts = readArtifacts();
  const known = new Set(posts.map((p) => p.permalink));

  const byPost = new Map(posts.map((p) => [p.permalink, []]));
  for (const a of artifacts) {
    for (const source of a.sources) {
      if (byPost.has(source)) byPost.get(source).push(a);
    }
  }

  const gaps = posts.filter(
    (p) => !p.exempt && p.reusable.length > 0 && byPost.get(p.permalink).length === 0
  );
  const orphans = artifacts.flatMap((a) =>
    a.sources.filter((s) => !known.has(s)).map((s) => ({ name: a.name, source: s }))
  );

  if (quiet && gaps.length === 0 && orphans.length === 0) return 0;

  console.log(`\nPrompts library scan — ${posts.length} published posts, ${artifacts.length} artifacts`);

  const linked = posts.filter((p) => byPost.get(p.permalink).length > 0);
  if (linked.length && !quiet) {
    console.log('\nCovered:');
    for (const p of linked) {
      const list = byPost
        .get(p.permalink)
        .map((a) => a.name.replace(/\.md$/, '') + (a.draft ? ' (draft)' : ''))
        .join(', ');
      console.log(`  ${p.permalink}\n    ${p.reusable.length} reusable block(s) -> ${list}`);
    }
  }

  if (gaps.length) {
    console.log('\nGaps — published code with no library artifact:');
    for (const p of gaps) {
      const langs = [...new Set(p.reusable.map((b) => b.lang || 'text'))].join(', ');
      const slug = p.permalink.split('/').filter(Boolean).pop();
      console.log(`  ${p.permalink}`);
      console.log(`    ${p.reusable.length} reusable block(s) [${langs}] in ${p.name}`);
      console.log(`    suggested: src/content/prompts/${slug}.md (${guessCategory(p.reusable, p.title)})`);
    }
  }

  if (orphans.length) {
    console.log('\nArtifacts pointing at a post that is missing or unpublished:');
    for (const a of orphans) console.log(`  ${a.name} -> ${a.source}`);
  }

  if (showAll) {
    const withIncidental = posts.filter((p) => p.incidental.length);
    if (withIncidental.length) {
      console.log(`\nIgnored as incidental (under ${MIN_LINES} lines):`);
      for (const p of withIncidental) {
        console.log(`  ${p.permalink}: ${p.incidental.length} short block(s)`);
      }
    }
  }

  const exempt = posts.filter((p) => p.exempt);
  if (exempt.length && !quiet) console.log(`\n${exempt.length} post(s) marked promptsExempt.`);

  if (gaps.length === 0) {
    console.log('\nNo gaps. Every published code block has a library artifact.\n');
    return 0;
  }

  if (write) {
    console.log('\nScaffolding drafts:');
    for (const p of gaps) {
      const { file, skipped } = scaffold(p);
      console.log(skipped ? `  =  ${file} already exists, left alone` : `  +  ${file}`);
    }
    console.log('\nEach is draft: true. Fill in the full artifact, then flip draft.\n');
  } else {
    console.log(
      `\n${gaps.length} gap(s). Run \`npm run scan-prompts -- --write\` to scaffold drafts,\n` +
        `or add \`promptsExempt: true\` to a post whose code doesn't belong in the library.\n`
    );
  }
  return 0;
}

// Never break a build over a reporting script.
try {
  process.exitCode = main();
} catch (err) {
  console.warn(`\n[scan-prompts] skipped: ${err.message}\n`);
  process.exitCode = 0;
}
