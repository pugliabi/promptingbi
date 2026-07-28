#!/usr/bin/env node
// Auto-tag blog posts: npm run auto-tag [-- --force]
//
// Scans src/content/blog/{published,drafts}/ and writes a `tags:` list into the
// front matter of any post that doesn't already have one, using the deterministic
// keyword taxonomy in src/lib/tags.mjs (no AI calls). Idempotent: existing tags
// are left alone unless --force is passed.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { suggestTags } from '../src/lib/tags.mjs';

const force = process.argv.includes('--force');
const stages = ['published', 'drafts'];

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/;
// `tags:` line plus any following "  - item" list lines (also matches inline `tags: [...]`)
const TAGS_BLOCK_RE = /^tags:[^\n]*(?:\r?\n[ \t]+-[^\n]*)*\r?\n?/m;

let changed = 0;
let skipped = 0;

for (const stage of stages) {
  const dir = join('src', 'content', 'blog', stage);
  const files = readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  for (const name of files) {
    const file = join(dir, name);
    const raw = readFileSync(file, 'utf8');
    const m = raw.match(FM_RE);
    if (!m) {
      console.warn(`!  ${stage}/${name}: no front matter found, skipping`);
      continue;
    }
    let fm = m[1];
    const body = raw.slice(m[0].length);
    const tagsBlock = fm.match(TAGS_BLOCK_RE);
    const hasTags = tagsBlock !== null;
    // An empty `tags: []` (e.g. from new-post scaffolding) counts as untagged.
    const hasNonEmptyTags =
      hasTags && /(?:^tags:\s*\[[^\]]*\S[^\]]*\]|\r?\n[ \t]+-\s*\S)/.test(tagsBlock[0]);
    if (hasNonEmptyTags && !force) {
      skipped++;
      console.log(`=  ${stage}/${name}: already tagged (use --force to regenerate)`);
      continue;
    }

    const titleMatch = fm.match(/^title:\s*(?:"([^"]*)"|'([^']*)'|(.*))\s*$/m);
    const title = titleMatch ? (titleMatch[1] ?? titleMatch[2] ?? titleMatch[3] ?? '') : '';
    const tags = suggestTags(title, body);
    if (!tags.length) {
      console.warn(`!  ${stage}/${name}: no tags matched, leaving unchanged`);
      continue;
    }

    const eol = raw.includes('\r\n') ? '\r\n' : '\n';
    if (hasTags) fm = fm.replace(TAGS_BLOCK_RE, '');
    fm = fm.replace(/[\r\n]+$/, '') + eol + 'tags:' + eol + tags.map((t) => `  - ${t}`).join(eol);
    writeFileSync(file, `---${eol}${fm}${eol}---${eol}` + body);
    changed++;
    console.log(`+  ${stage}/${name}: [${tags.join(', ')}]`);
  }
}

console.log(`\nDone. ${changed} file(s) updated, ${skipped} already tagged.`);
