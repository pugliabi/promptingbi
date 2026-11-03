#!/usr/bin/env python3
"""Package a skill folder for the Notion Skills API (notion-upload-skill).
usage: python notion_skill_pack.py <skill_dir> <out_dir> [--no-reflow] [--allow-missing]"""
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


REF = re.compile(r'(?<![\w./~-])(?:\./)?((?:references|scripts|assets|resources|templates|examples)/[\w.\-/]*\w)')


def referenced_paths(body):
    # Relative paths SKILL.md points at (outside code blocks); wildcards/placeholders are skipped.
    inside = set()
    for i, j, _ in fences(body):
        inside.update(range(i, j + 1))
    refs = set()
    for k, s in enumerate(body):
        if k in inside:
            continue
        for m in REF.finditer(s):
            p = m.group(1).rstrip('.')
            if not any(c in p for c in '*<>{}$') and '.' in p.rsplit('/', 1)[-1]:
                refs.add(p)  # file-like refs only; bare folder mentions are prose
    return refs


NOTION_TAGS = ('folder', 'page', 'database', 'data-source', 'mention-user', 'mention-page',
               'mention-database', 'mention-date', 'mention-data-source', 'synced_block', 'callout',
               'columns', 'column', 'table_of_contents', 'unknown')


def reserved_tags(body):
    # Notion Markdown vNext parses these tag names even inside inline code; a bare <folder> makes
    # upload `complete` fail with "unclosed Notion Markdown vNext tags were auto-closed".
    inside = set()
    for i, j, _ in fences(body):
        inside.update(range(i, j + 1))
    pat = re.compile(r'</?(%s)(?=[\s>/])' % '|'.join(re.escape(t) for t in NOTION_TAGS))
    return [f'body line {k + 1}: <{m.group(1)}>' for k, s in enumerate(body) if k not in inside
            for m in pat.finditer(s)]


def table_cell_warnings(body, fixes):
    # Notion turns ' - ', ' + ', ' * ' right after inline code inside a table cell into a bullet.
    for k, s in enumerate(body):
        if s.lstrip().startswith('|') and re.search(r'`\s[-+*]\s', s):
            fixes.append(f'WARNING: table cell at body line {k + 1} has " - "/" + " after inline code; '
                         'Notion turns it into a bullet. Reword the source (": ", "then", "and")')


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
    body = split_frontmatter(safe.split('\n'))[1]
    table_cell_warnings(body, fixes)
    tags = reserved_tags(body)
    if tags:
        sys.exit('ABORT: SKILL.md uses Notion-reserved tag names that break the import (rename the '
                 'placeholder, e.g. <folder> -> <folder-name>):\n  ' + '\n  '.join(tags))
    missing = sorted(p for p in referenced_paths(body)
                     if not os.path.exists(os.path.join(src, *p.split('/'))))
    if missing and '--allow-missing' not in sys.argv:
        sys.exit('ABORT: SKILL.md references files that are not in the skill folder - bundle them '
                 '(completeness gate) or pass --allow-missing after Tommy confirms:\n  MISSING ' +
                 '\n  MISSING '.join(missing))
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
    if files == ['SKILL.md']:
        fixes.append('NOTE: single-file skill - Notion Files will be empty. Confirm it depends on '
                     'nothing else (completeness gate) before uploading')
    print(json.dumps({'name': name, 'archive': archive, 'content_length': len(data),
                      'checksum_crc32': crc, 'files': sorted(files), 'fixes': fixes}, indent=1))


if __name__ == '__main__':
    main()
