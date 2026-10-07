---
name: converting-skills-to-notion
description: Push or pull complete Claude skills (SKILL.md plus every file and folder) to and from the Notion 🪄 Skills database using only the Notion Skills API (notion-upload-skill / notion-download-skill), never summary, distilled, or hand-written pages. Handles one skill or a batch ("all my Power BI skills", "everything tagged Fabric"), creating or updating in place, and verifies every round-trip. Use to push, publish, sync, or update skills in Notion, pull skills from Notion, check whether Notion is in sync, or fix a broken Notion skill page.
---

# Publishing Claude Skills to Notion (Skills API)

Push the **whole skill**, exactly as authored, into the Notion 🪄 Skills database with the Notion Skills API, and pull whole skills back the same way. On upload, SKILL.md becomes the page body, the frontmatter `name`/`description` become the page title and Description, and every sibling file and folder (references/, scripts/, assets/) lands in the page's **Files** property with its folder structure kept.

## Hard boundary: Notion Skills API + Skills database only

Skill content moves between Claude and Notion **only** through the Notion Skills API, and only into or out of the 🪄 Skills database:

- **Push = `notion-upload-skill`**: sends the whole skill folder as an archive (SKILL.md plus every file and subfolder, structure kept).
- **Pull = `notion-download-skill`**: returns the whole skill folder as an archive (SKILL.md plus every file and subfolder, structure kept).

The only other Notion calls allowed are bookkeeping, and none of them read or write skill content:
1. Look up rows in the Skills database (`notion-query-data-sources` SQL on the Skills data source, or `notion-search` scoped to it) to get page ids, names, Tags, Description, and Last edited.
2. For a brand-new skill only, create an **empty** row (`notion-create-pages`, title only, no body). The Skills API needs an existing page to upload into; the upload fills in everything else.
3. Set **properties only** with `notion-update-page` `update_properties`: Tags, `is_skill: true`, icon.

Never do any of these:
- Summarize, distill, convert, or rewrite a skill into a hand-written page. No "domain brief" pages, no sub-pages.
- Write page body content with `notion-create-pages` content or `notion-update-page` `replace_content` / `update_content` / `insert_content`.
- Read skill content with `notion-fetch` or rebuild a skill from page text.
- Attach skill files with `notion-create-attachment` or file uploads.
- Write outside the Skills database, including the legacy 📚 AI Skills page.

If the Skills API is unavailable or keeps failing, **stop and tell Tommy**. There is no fallback.

## Notion targets

- 🪄 Skills database `3c1e74c6-9c18-80b3-ae9d-f26b74ffb46d`, data source `collection://3c1e74c6-9c18-809a-b7da-000bdd527006`
- Properties: **Skill name** (title; set from frontmatter `name` by the upload), **Description** (from frontmatter `description`), **Tags** (multi-select, set by you), **Files** (set by the upload)
- Legacy 📚 AI Skills page `313e74c6-9c18-8175-825e-f38b38332aec`: never use.

## Tools

Load in one ToolSearch call: `notion-upload-skill`, `notion-download-skill`, `notion-query-data-sources`, `notion-search`, `notion-create-pages` (empty new rows only), `notion-update-page` (properties only). If availability is unknown, call `notion-get-tool-access` with `{}` first.

Where to run: when the source is the Skill Vault on Tommy's PC, do everything on the device with `device_bash` (packing, curl PUT, curl download, comparisons). The device reaches Notion's upload/download storage (`s3.us-west-2.amazonaws.com`); if it ever can't, stage the archive to the cloud shell and PUT from there. Keep scratch work under the device's `$HOME/nsp/`, outside `mnt/`.

## Single skill: push (create or update)

### 1. Locate and read the source

Use the first that applies:
1. The Skill Vault: `C:\Github\agent-skills\skills\skills\<name>\` (if the layout looks different, read `C:\Users\pugli\.skill-vault\config.json` → `vault_path`). This is the authoring source of truth.
2. Installed or synced skills in this environment.
3. Files Tommy attaches or points to.

Reach the vault with the Filesystem MCP if it works; if it errors (it has thrown outputSchema errors), use `device_request_folder_access` on the narrowest folder (one skill, or `C:\Github\agent-skills\skills` for batches) and `device_bash` on `$HOME/mnt/<folder>`. Read SKILL.md and list every file. You publish everything, so check for secrets (API keys, tokens, client secrets, passwords) first. If you find any, stop and flag them; never upload them.

### 2. Find the row (update vs. create)

Query the Skills data source for the frontmatter `name`, for example `SELECT url, "Skill name", "Tags" FROM "collection://3c1e74c6-9c18-809a-b7da-000bdd527006" WHERE lower("Skill name") = lower(?)`. Uploaded pages are titled with the kebab-case `name`; legacy pages may use Title Case ("Grill Me"), so also check the Title Case form.

**Take page ids straight from the query result** (the 32-hex id at the end of `url`). Never retype them; a single wrong character returns "Directory … is not shared".

- **Exactly one kebab-name match**: update it in place. The upload keeps the page, URL, and comments.
- **Only a legacy Title Case or distilled page**: ask once whether to overwrite it with the full skill through the upload (recommended) or create a separate row.
- **More than one match**: stop and ask which to keep.
- **No match**: create an empty row: `notion-create-pages` with parent `{"type": "data_source_id", "data_source_id": "3c1e74c6-9c18-809a-b7da-000bdd527006"}`, properties `{"Skill name": "<name>"}`, an emoji icon (📊 BI, 🏗️ build, 📝 writing, 🤖 agent, 🧰 tooling, 🧪 test), no content. Then `notion-update-page` `update_properties` with `properties: {}` and `is_skill: true`.

### 3. Package a Notion-safe archive

Write `notion_skill_pack.py` (below) to the scratch folder and run `python3 -I notion_skill_pack.py <skill_dir> <out_dir>`. It builds `<out_dir>/<name>/` (staging copy) and `<out_dir>/<name>.tar.gz` with `<name>/SKILL.md` at the top, and prints `content_length`, `checksum_crc32`, the file list, and the fixes it applied. It changes only the **staging copy of SKILL.md**, never the source, and it aborts if a fix would change any word. It also aborts on symlinks or junctions, duplicate-by-case paths, or anything over Notion's limits (20 MiB compressed, 25 MiB expanded, 1000 entries, 20 path levels, 200-byte names).

How Notion's markdown importer behaves (all verified by round-trip tests), and what the packer does about it:
- Only exactly-3-backtick fences open a code block. A 4-backtick fence is read as a 3-backtick fence plus a stray backtick, which swallows the following sections into one line full of `<br>`. `~~~` fences are not supported at all. The packer rewrites every fence to three backticks.
- Any line starting with `` ``` `` closes a code block, even tab-indented code inside it (for example a TMDL multi-line DAX expression). The packer puts an invisible zero-width space (U+200B) before such inner lines in the staging copy. Notion shows them unchanged and drops the character on export, so the code round-trips byte-identical.
- Raw triple backticks in prose get mangled, and so do code blocks inside a `>` blockquote (the fence turns into literal text and domains get auto-linked). The packer can't fix either safely; it prints a WARNING with the line number. Fix the source with Tommy's OK (move the code block out of the quote, or write literal backticks as a double-backtick span `` `` ``` `` ``), then re-pack. `skill_status.py` compares wording only, so it won't flag these; the packer warning is where they show up.
- Hard-wrapped prose shows as choppy mid-sentence breaks, and inline code or emphasis that wraps across a line break turns into `<br>` or a literal `\*`. The packer reflows paragraphs and list continuations onto single lines and never touches code blocks, tables, headings, quotes, or HTML. `--no-reflow` skips this.
- CRLF line endings are normalized to LF.

If the packer applied fixes to a vault skill, offer to apply the same fixes to the source so it stays clean (only with Tommy's OK).

<details>
<summary>notion_skill_pack.py (write this file verbatim)</summary>

```python
#!/usr/bin/env python3
"""Package a skill folder for the Notion Skills API (notion-upload-skill).
usage: python notion_skill_pack.py <skill_dir> <out_dir> [--no-reflow]"""
import sys, os, re, json, shutil, tarfile, zlib, base64

SKIP_DIRS = {'.git', '__pycache__', 'node_modules', '.venv', 'venv', '.pytest_cache', '.ipynb_checkpoints'}
SKIP_FILES = {'.DS_Store', 'Thumbs.db', 'desktop.ini'}
BLOCK = re.compile(r'^\s*([#>|<]|[-*+] |\d+[.)] |`{3,}|~{3,}|---\s*$|\*\*\*\s*$)')
OPEN = re.compile(r'^(\s*)(`{3,}|~{3,})(.*)$')


def split_frontmatter(lines):
    if lines and lines[0].strip() == '---':
        for i in range(1, len(lines)):
            if lines[i].strip() == '---':
                return lines[:i + 1], lines[i + 1:]
    return [], lines


def fences(lines):
    """CommonMark-style fence scan: yields (open_idx, close_idx, marker). A fence closes only on a
    line of the same char, at least as long, with nothing else on it, indented no more than the
    opener + 3 spaces (a tab-indented ``` inside code does not close it)."""
    out, i = [], 0
    while i < len(lines):
        m = OPEN.match(lines[i])
        if m and not (m.group(2)[0] == '`' and '`' in m.group(3)):
            mk, oind = m.group(2), len(m.group(1).expandtabs(4))

            def closes(l):
                lead = l[:len(l) - len(l.lstrip())]
                return ('\t' not in lead and len(lead) <= oind + 3
                        and re.fullmatch(re.escape(mk[0]) + '{%d,}' % len(mk), l.strip()))
            j = next((k for k in range(i + 1, len(lines)) if closes(lines[k])), len(lines))
            out.append((i, j, mk))
            i = j
        i += 1
    return out


ZWSP = chr(0x200B)  # zero-width space


def fix_fences(lines, fixes):
    # Notion's importer only understands exactly-3-backtick fences (no ````, no ~~~), and ANY line
    # starting with ``` closes a block, even tab-indented code. So: rewrite every fence to ```, and
    # put a zero-width space before inner lines that start with ``` (invisible in Notion; strip it
    # again on pull).
    for i, j, mk in fences(lines):
        if j >= len(lines):
            fixes.append(f'WARNING: unclosed fence at body line {i + 1}')
            continue
        ind, rest = OPEN.match(lines[i]).group(1), OPEN.match(lines[i]).group(3)
        if mk != '```':
            lines[i], lines[j] = ind + '```' + rest, ind + '```'
            fixes.append(f'{mk} fence -> ``` (body line {i + 1})')
        for k in range(i + 1, j):
            s = lines[k]
            if s.lstrip().startswith('```'):
                lead = s[:len(s) - len(s.lstrip())]
                lines[k] = lead + ZWSP + s.lstrip()
                fixes.append(f'zero-width space before inner ``` (body line {k + 1})')
    inside = set()
    for i, j, _ in fences(lines):
        inside.update(range(i, j + 1))
    for k, s in enumerate(lines):
        if k not in inside and '```' in re.sub(r'``\s*`{3,}\s*``', '', s):
            where = 'code block inside a > blockquote' if s.lstrip().startswith('>') else 'raw ``` in prose'
            fixes.append(f'WARNING: {where} at body line {k + 1}; Notion will mangle it. Fix the source: '
                         'move quoted code out of the blockquote, or write literal backticks as `` ``` ``')
    return lines


def reflow(lines, fixes):
    # Join hard-wrapped prose/list continuations; never touch anything inside a fenced block.
    inside = set()
    for i, j, _ in fences(lines):
        inside.update(range(i, min(j, len(lines) - 1) + 1))
    out, joined, prev_i = [], 0, None
    for idx, ln in enumerate(lines):
        prev = out[-1] if out else ''
        if (idx not in inside and prev_i is not None and prev_i not in inside
                and ln.strip() and prev.strip() and not BLOCK.match(ln)
                and not prev.lstrip().startswith(('#', '|', '<', '>'))
                and prev.strip() not in ('---', '***')
                and not prev.endswith(('  ', '\\'))):
            out[-1] = prev.rstrip() + ' ' + ln.strip()
            joined += 1
        else:
            out.append(ln)
            prev_i = idx
    if joined:
        fixes.append(f'reflowed {joined} hard-wrapped lines')
    return out


def words(text):
    text = text.replace(ZWSP, '')
    return [w for w in (re.sub(r'^(`{3,}|~{3,})', '', t) for t in text.split()) if w]


def notion_safe(md, do_reflow, fixes):
    md = md.replace('\r\n', '\n').replace('\r', '\n')
    fm, body = split_frontmatter(md.split('\n'))
    body = fix_fences(body, fixes)
    if do_reflow:
        body = reflow(body, fixes)
    return '\n'.join(fm + body), fm


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    do_reflow = '--no-reflow' not in sys.argv
    src, out_dir = os.path.abspath(args[0]), os.path.abspath(args[1])
    raw = open(os.path.join(src, 'SKILL.md'), encoding='utf-8').read()
    fixes = []
    safe, fm = notion_safe(raw, do_reflow, fixes)
    name = next((re.sub(r'^name:\s*', '', l).strip().strip('"\'') for l in fm if l.startswith('name:')), None)
    if not name or not any(l.startswith('description:') for l in fm):
        sys.exit('SKILL.md frontmatter must have name and description')
    if words(raw) != words(safe):
        sys.exit('ABORT: Notion-safe transform changed words, not just layout')
    stage = os.path.join(out_dir, name)
    shutil.rmtree(stage, ignore_errors=True)
    os.makedirs(stage)
    files, seen, expanded = [], set(), 0
    for root, dirs, fnames in os.walk(src):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for d in dirs:
            if os.path.islink(os.path.join(root, d)):
                sys.exit(f'ABORT: symlink/junction not allowed: {os.path.join(root, d)}')
        for f in fnames:
            p = os.path.join(root, f)
            if f in SKIP_FILES or f.endswith('.pyc'):
                continue
            if os.path.islink(p) or not os.path.isfile(p):
                sys.exit(f'ABORT: link or special file not allowed: {p}')
            rel = os.path.relpath(p, src).replace(os.sep, '/')
            if rel.lower() in seen:
                sys.exit(f'ABORT: case-insensitive duplicate path: {rel}')
            if any(len(part.encode()) > 200 for part in rel.split('/')) or rel.count('/') >= 19:
                sys.exit(f'ABORT: name too long or nested too deep: {rel}')
            seen.add(rel.lower())
            dst = os.path.join(stage, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            if rel == 'SKILL.md':
                open(dst, 'w', encoding='utf-8', newline='\n').write(safe)
            else:
                shutil.copy2(p, dst)
            expanded += os.path.getsize(dst)
            files.append(rel)
    if len(files) > 999 or expanded > 25 * 1024 * 1024:
        sys.exit('ABORT: over Notion limits (1000 entries / 25 MiB expanded)')
    archive = os.path.join(out_dir, name + '.tar.gz')

    def clean(ti):
        ti.uid = ti.gid = 0
        ti.uname = ti.gname = ''
        return ti
    with tarfile.open(archive, 'w:gz') as tar:
        tar.add(stage, arcname=name, filter=clean)
    data = open(archive, 'rb').read()
    if len(data) > 20 * 1024 * 1024:
        sys.exit('ABORT: archive over 20 MiB compressed')
    crc = base64.b64encode((zlib.crc32(data) & 0xffffffff).to_bytes(4, 'big')).decode()
    print(json.dumps({'name': name, 'archive': archive, 'content_length': len(data),
                      'checksum_crc32': crc, 'files': sorted(files), 'fixes': fixes}, indent=1))


if __name__ == '__main__':
    main()
```

</details>

### 4. Upload: prepare → PUT → complete (within 10 minutes, one skill at a time)

1. `notion-upload-skill` with `action: "prepare"`, `page_id`, the exact `content_length`, and `checksum_crc32` from the packer. It returns `upload_url`, `upload_headers`, `upload_token`.
2. PUT the archive bytes to `upload_url` with **every** header from `upload_headers`, exactly as given (Content-Type, x-amz-checksum-crc32, Content-Length, x-amz-tagging): `curl -sS -w "HTTP %{http_code}\n" -X PUT --data-binary @<archive> -H "<name>: <value>" ... '<upload_url>'` (URL in single quotes). Expect `HTTP 200`.
3. `notion-upload-skill` with `action: "complete"`, the same `page_id`, and `upload_token`. Expect `status: completed`.

If any step fails or the token expires, start again from prepare with a fresh token. Never reuse a URL or token, and never change the archive after prepare.

Completion replaces the page title, Description, body, and Files in place. It does **not** delete folders from earlier uploads, so if a skill dropped or renamed a folder, tell Tommy the stale folder is still in Files and needs removing by hand. Frontmatter keys other than `name` and `description` are ignored.

### 5. Finish the page

- Tags: if empty, set 1–3 existing options with `update_properties` (for example "Power BI", "Reports", "Workflow", "Fabric", "CLI"). Leave existing tags alone.
- Make sure it's a skill (`is_skill: true`) and has an icon.

### 6. Verify the round-trip (required)

`notion-download-skill` with the page id, curl the signed `url` into a fresh folder, extract it, and run `skill_status.py` (below): `python3 -I skill_status.py <extracted>/<name> <source_skill_dir>`. Pass = `"status": "in_sync"` (every file present at the same path, non-markdown files byte-identical, markdown wording and code blocks identical). Expected, harmless export changes: frontmatter rewritten with `|-` style plus a `notion_page_id` key, code-fence languages Notion doesn't know relabeled `javascript`, ordered lists renumbered, links containing inline code split in two.

If it reports `content_differs`, read the `differs` entries, fix the cause, re-pack, and re-upload.

<details>
<summary>skill_status.py (write this file verbatim)</summary>

```python
#!/usr/bin/env python3
"""Compare a skill folder downloaded from Notion against a local copy (vault or source).
usage: python skill_status.py <notion_skill_dir> <local_skill_dir>
Prints JSON with status in_sync | content_differs. Markdown is compared by wording plus exact
code-block contents, ignoring what Notion's export rewrites (frontmatter style, notion_page_id,
reflow, fence length/language, zero-width spaces, escapes, <p>/<br>, list numbering, link splits,
table separators). Every other file must match byte for byte (CRLF/LF aside)."""
import sys, os, re, json


def walk(d):
    out = {}
    for r, ds, fs in os.walk(d):
        ds[:] = [x for x in ds if x not in {'.git', '__pycache__', 'node_modules'}]
        for f in fs:
            if f in {'.DS_Store', 'Thumbs.db', 'desktop.ini'} or f.endswith('.pyc'):
                continue
            p = os.path.join(r, f)
            out[os.path.relpath(p, d).replace(os.sep, '/')] = p
    return out


def split_md(t):
    t = t.replace('\r\n', '\n').replace(chr(0x200B), '')
    m = re.match(r'^---\n.*?\n---\n', t, re.S)
    body = t[m.end():] if m else t
    codes, prose, cur, mk = [], [], None, None
    for line in body.split('\n'):
        f = re.match(r'^\s*(`{3,}|~{3,})', line)
        if cur is None and f:
            cur, mk = [], f.group(1)
            continue
        if cur is not None and re.fullmatch(re.escape(mk[0]) + '{%d,}' % len(mk), line.strip()) \
                and not line.startswith(('\t', '    ')):
            codes.append('\n'.join(cur).strip('\n'))
            cur = None
            continue
        (cur if cur is not None else prose).append(line)
    prose = [re.sub(r'^\s*\d+[.)]\s+', ' ', l) for l in prose]      # list numbering
    text = ' '.join(prose)
    text = re.sub(r'\]\([^)\s]*\)', '] ', text)                     # link targets
    text = re.sub(r'<[^>]{1,20}>', ' ', text)                       # <p>, <br>, <b>
    text = re.sub(r'\\([\\`*_{}\[\]()#+\-.!|<>~$])', r'\1', text)   # markdown escapes
    return re.findall(r'[A-Za-z0-9]+', text), codes


def main():
    n, v = walk(sys.argv[1]), walk(sys.argv[2])
    res = {'only_in_notion': sorted(set(n) - set(v)), 'only_in_local': sorted(set(v) - set(n)),
           'differs': [], 'layout_only': []}
    for rel in sorted(set(n) & set(v)):
        a, b = open(n[rel], 'rb').read(), open(v[rel], 'rb').read()
        if a == b:
            continue
        if rel.lower().endswith('.md'):
            (wa, ca), (wb, cb) = split_md(a.decode('utf-8', 'replace')), split_md(b.decode('utf-8', 'replace'))
            if wa == wb and ca == cb:
                res['layout_only'].append(rel)
                continue
            i = next((k for k in range(min(len(wa), len(wb))) if wa[k] != wb[k]), min(len(wa), len(wb)))
            res['differs'].append({'file': rel, 'code_blocks_equal': ca == cb,
                                   'notion': ' '.join(wa[max(0, i - 6):i + 8]),
                                   'local': ' '.join(wb[max(0, i - 6):i + 8])})
        elif a.replace(b'\r\n', b'\n') == b.replace(b'\r\n', b'\n'):
            res['layout_only'].append(rel)
        else:
            res['differs'].append({'file': rel})
    bad = res['differs'] or res['only_in_notion'] or res['only_in_local']
    res['status'] = 'content_differs' if bad else 'in_sync'
    print(json.dumps(res, indent=1))


if __name__ == '__main__':
    main()
```

</details>

## Single skill: pull from Notion

Use `notion-download-skill` and nothing else. Look up the page id, download, curl the signed `url`, and extract into a fresh folder. The archive holds the complete skill folder, named by the skill's name, or by a slug of the title for legacy pages ("Data Strategy Agent" → `data-strategy-agent`), with SKILL.md plus every file and subfolder from Files in their original structure. Keep it exactly as extracted. Hand the folder to `skill-vault-bridge` to write into the vault; never overwrite a vault skill without running `skill_status.py` and showing Tommy the result first.

## Batch requests ("all my Power BI skills", "everything tagged Fabric", "the semantic model ones")

### Batch push (vault → Notion, update or create)

1. **Select candidates.** Scan the vault: for each folder in the production skills dir, read the SKILL.md frontmatter `name` and `description` (skip folders without SKILL.md). Match Tommy's criterion against name and description, case-insensitive, including obvious synonyms (Power BI → power bi, pbi, pbir, pbip, semantic model, dax, tmdl, tabular, report, paginated, Power Query). Keyword matching is fuzzy and catches false hits (for example `axelrod`, `docx`, or `semantic-walk` for "Power BI / semantic"), so drop obvious false positives yourself.
2. **Get the whole Skills database in one query** (`SELECT url, "Skill name", "Tags" FROM "collection://3c1e74c6-9c18-809a-b7da-000bdd527006"`, paginating with a `WHERE "Skill name" > '<last>'` filter if `has_more`) and map names (and Title Case forms) to page ids from `url`.
3. **Status check** for every candidate that already exists in Notion: download it and run `skill_status.py <notion copy> <vault copy>`.
   - `in_sync` → nothing to do; report "already in sync".
   - `content_differs` → the vault is ahead or Notion was edited. If the differences are only vault-side edits, it's an update. If Notion contains wording that isn't in the vault, flag "Notion has edits", don't overwrite, and route it to `skill-vault-bridge` Pull.
4. **Show a plan table and wait for Tommy's OK**: skill | action (create / update / in sync, skip / Notion has edits, ask) | files | Notion-safe fixes or warnings. Never run a batch without confirmation.
5. **Run sequentially**, one skill at a time: pack → (empty row if new) → prepare → PUT → complete → tags → verify. Prepare each skill right before its PUT (tokens expire after 10 minutes). One failure doesn't stop the rest; record it.
6. **Report** a table: skill | created / updated / skipped | files | fixes | verify result | page link.

### Batch pull (Notion → local)

1. **Select rows** in the Skills database by Tags, name, or description (SQL `LIKE` / Tags contains), show the list, and confirm with Tommy.
2. For each row, `notion-download-skill` with the id from the query, download, and extract into a staging folder. Legacy "Copied from AI Skills" rows download too (slug folder names).
3. Hand the staged folders to `skill-vault-bridge` Pull: new skills are written as extracted; existing ones get `skill_status.py` first and are written only after Tommy approves.
4. Report: skill | new / updated / in sync / skipped | files.

## Rules

- Push = `notion-upload-skill`; pull = `notion-download-skill`. Both carry the full skill folder (SKILL.md plus every file and subfolder, structure intact). Nothing else moves skill content: no hand-written page bodies, no distilled or summary pages, no sub-pages, no attachments, no `notion-fetch` reads.
- Work only in the 🪄 Skills database. Outside the API, only row lookups, an empty row for a new skill, and properties (Tags, is_skill, icon).
- If the Skills API isn't available, stop and say so. There is no fallback.
- Publish complete skills; never upload secrets.
- Update in place; one Notion page per skill. Ask before overwriting a legacy page, on duplicates, or when Notion has edits the vault lacks.
- Batches: select, show the plan, get OK, run one skill at a time, report.
- Notion-safe fixes go in the staging copy only and never change words.
- Take page ids from query results; never retype them.
- Always verify with `notion-download-skill` + `skill_status.py` before saying it's done.
