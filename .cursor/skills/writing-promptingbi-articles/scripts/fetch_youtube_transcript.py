#!/usr/bin/env python3
"""Fetch a clean, readable transcript from a YouTube video's captions.

Downloads subtitles only (no video). Prefers manual captions, falls back to
auto-generated ones, strips the rolling-caption duplication YouTube's auto
subs are full of, and groups lines into paragraphs on natural pauses.

Usage:
    python fetch_youtube_transcript.py URL [--out FILE] [--lang en]
                                           [--timestamps] [--keep-vtt]

Requires: yt-dlp  (pip install yt-dlp)

Notes:
- Auto-captions have NO speaker labels. The header of the output file says
  which caption type was used so downstream steps know what they're holding.
- If YouTube blocks the current network (common from datacenter IPs), run
  this on your own machine instead.
"""

import argparse
import html
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

TAG_RE = re.compile(r"<[^>]+>")
TIME_RE = re.compile(r"(\d+):(\d{2}):(\d{2})[.,](\d{3})")
EXTRA_ARGS: list = []  # populated by --insecure


def die(msg: str, code: int = 1):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(code)


def require_ytdlp():
    if shutil.which("yt-dlp") is None:
        die("yt-dlp not found. Install it with:  pip install yt-dlp")


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def get_metadata(url: str):
    r = run(["yt-dlp", *EXTRA_ARGS, "--skip-download", "--no-warnings", "--print",
             "%(title)s\t%(upload_date)s\t%(channel)s\t%(duration_string)s", url])
    if r.returncode != 0:
        die(f"yt-dlp could not read the video:\n{r.stderr.strip()[:800]}")
    parts = (r.stdout.strip().split("\n")[-1]).split("\t")
    while len(parts) < 4:
        parts.append("")
    return {"title": parts[0], "upload_date": parts[1],
            "channel": parts[2], "duration": parts[3]}


def download_subs(url: str, lang: str, tmpdir: str):
    """Try manual subs first, then auto. Returns (path, kind) or (None, None)."""
    langspec = f"{lang}.*,{lang}"
    for flag, kind in (("--write-subs", "manual"), ("--write-auto-subs", "auto")):
        r = run(["yt-dlp", *EXTRA_ARGS, "--skip-download", "--no-warnings", flag,
                 "--sub-langs", langspec, "--sub-format", "vtt/srt/best",
                 "-o", f"{tmpdir}/sub.%(ext)s", url])
        files = sorted(Path(tmpdir).glob("sub.*.vtt")) + sorted(Path(tmpdir).glob("sub.*.srt"))
        if files:
            return files[0], kind
        if r.returncode != 0 and "Sign in" in (r.stderr or ""):
            die("YouTube is asking for sign-in from this network. "
                "Run the script on your own machine, or pass cookies to yt-dlp.")
    return None, None


def ts_to_seconds(m) -> float:
    h, mi, s, ms = (int(m.group(i)) for i in range(1, 5))
    return h * 3600 + mi * 60 + s + ms / 1000.0


def parse_cues(path: Path):
    """Yield (start_seconds, text) for VTT or SRT files."""
    raw = path.read_text(encoding="utf-8", errors="replace")
    cues = []
    for block in re.split(r"\n\s*\n", raw):
        lines = [l.strip() for l in block.strip().splitlines() if l.strip()]
        if not lines:
            continue
        timing_idx = next((i for i, l in enumerate(lines) if "-->" in l), None)
        if timing_idx is None:
            continue  # WEBVTT header, NOTE/STYLE blocks, bare SRT counters
        m = TIME_RE.search(lines[timing_idx])
        start = ts_to_seconds(m) if m else 0.0
        text_lines = []
        for l in lines[timing_idx + 1:]:
            l = html.unescape(TAG_RE.sub("", l)).strip()
            if l:
                text_lines.append(l)
        if text_lines:
            cues.append((start, text_lines))
    return cues


def dedupe(cues):
    """Auto-captions repeat each line across consecutive cues; keep first sight only."""
    out = []  # (start, line)
    recent = []
    for start, lines in cues:
        for line in lines:
            norm = re.sub(r"\s+", " ", line).strip().lower()
            if not norm or norm in recent:
                continue
            out.append((start, re.sub(r"\s+", " ", line).strip()))
            recent.append(norm)
            recent[:] = recent[-3:]
    return out


def to_paragraphs(entries, gap: float = 4.0, max_words: int = 140):
    """Group lines into paragraphs on pauses >= `gap` seconds or length overflow."""
    paras, cur, cur_start, last = [], [], None, None
    for start, line in entries:
        if cur and (start - last >= gap or sum(len(x.split()) for x in cur) >= max_words):
            paras.append((cur_start, " ".join(cur)))
            cur, cur_start = [], None
        if cur_start is None:
            cur_start = start
        cur.append(line)
        last = start
    if cur:
        paras.append((cur_start, " ".join(cur)))
    return paras


def fmt_ts(seconds: float) -> str:
    s = int(seconds)
    return f"{s // 3600:02d}:{s % 3600 // 60:02d}:{s % 60:02d}"


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("url", help="YouTube video URL")
    ap.add_argument("--out", help="Output .txt path (default: <video title>_transcript.txt)")
    ap.add_argument("--lang", default="en", help="Caption language code (default: en)")
    ap.add_argument("--timestamps", action="store_true",
                    help="Prefix each paragraph with [hh:mm:ss]")
    ap.add_argument("--keep-vtt", action="store_true",
                    help="Also keep the raw subtitle file next to the output")
    ap.add_argument("--insecure", action="store_true",
                    help="Skip TLS certificate checks (only for networks with TLS "
                         "inspection, e.g. corporate proxies)")
    args = ap.parse_args()

    if args.insecure:
        EXTRA_ARGS.append("--no-check-certificates")
        print("WARNING: TLS certificate verification disabled (--insecure).", file=sys.stderr)

    require_ytdlp()
    meta = get_metadata(args.url)

    with tempfile.TemporaryDirectory() as tmpdir:
        sub_path, kind = download_subs(args.url, args.lang, tmpdir)
        if not sub_path:
            die(f"No '{args.lang}' captions (manual or auto) found for this video.")

        cues = parse_cues(sub_path)
        if not cues:
            die("Caption file downloaded but no cues could be parsed.")
        entries = dedupe(cues)
        paras = to_paragraphs(entries)

        safe_title = re.sub(r"[^\w\s-]", "", meta["title"]).strip()
        safe_title = re.sub(r"[\s]+", "_", safe_title)[:80] or "video"
        out_path = Path(args.out) if args.out else Path(f"{safe_title}_transcript.txt")

        header = (
            f"Title: {meta['title']}\n"
            f"Channel: {meta['channel']}\n"
            f"Uploaded: {meta['upload_date']}   Duration: {meta['duration']}\n"
            f"Source: {args.url}\n"
            f"Captions: {kind} ({args.lang})"
            + ("" if kind == "manual" else "  [auto-generated: no speaker labels, expect transcription errors]")
            + "\n" + "-" * 72 + "\n\n"
        )
        body = "\n\n".join(
            (f"[{fmt_ts(start)}] " if args.timestamps else "") + text
            for start, text in paras
        )
        out_path.write_text(header + body + "\n", encoding="utf-8")

        if args.keep_vtt:
            keep = out_path.with_suffix(sub_path.suffix)
            shutil.copy(sub_path, keep)

    words = sum(len(t.split()) for _, t in paras)
    print(f"Wrote {out_path}  ({len(paras)} paragraphs, ~{words} words, {kind} captions)")


if __name__ == "__main__":
    main()
