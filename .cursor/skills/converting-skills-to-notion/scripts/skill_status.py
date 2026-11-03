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
