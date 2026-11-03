"""One-off: pull en-orig captions when yt-dlp's subtitle downloader 429s."""
import json
import subprocess
import sys
import urllib.request
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / ".cursor/skills/writing-promptingbi-articles/scripts"))
import fetch_youtube_transcript as f

VIDEOS = [
    (570, "https://www.youtube.com/watch?v=6w8E-5SwvoQ"),
    (571, "https://www.youtube.com/watch?v=eH2NZRZHBuY"),
    (572, "https://www.youtube.com/watch?v=3Tyy-ORNsA8"),
]


def main() -> None:
    out_dir = Path(__file__).resolve().parent
    for ep, url in VIDEOS:
        raw = subprocess.check_output(
            ["yt-dlp", "--js-runtimes", "node", "--skip-download", "--no-warnings", "-J", url]
        )
        d = json.loads(raw)
        tracks = d["automatic_captions"]["en-orig"]
        vtt_url = next(t["url"] for t in tracks if t["ext"] == "vtt")
        req = urllib.request.Request(vtt_url, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=60).read()
        tmp = out_dir / f"_tmp-ep-{ep}.vtt"
        tmp.write_bytes(data)
        cues = f.parse_cues(tmp)
        entries = f.dedupe(cues)
        paras = f.to_paragraphs(entries)
        title = d.get("title") or ""
        channel = d.get("channel") or ""
        uploaded = d.get("upload_date") or ""
        duration = d.get("duration_string") or ""
        header = (
            f"Title: {title}\n"
            f"Episode: {ep}\n"
            f"Channel: {channel}\n"
            f"Uploaded: {uploaded}   Duration: {duration}\n"
            f"Source: youtube\n"
            f"URL: {url}\n"
            f"Captions: auto (en)  [auto-generated: no speaker labels, expect transcription errors]\n"
            f"Fetched: {date.today().isoformat()}\n"
            + "-" * 72
            + "\n\n"
        )
        body = "\n\n".join(text for _, text in paras)
        out = out_dir / f"ep-{ep}.txt"
        out.write_text(header + body + "\n", encoding="utf-8")
        tmp.unlink()
        words = sum(len(t.split()) for _, t in paras)
        print(f"Wrote {out.name}  ({len(paras)} paragraphs, ~{words} words)")


if __name__ == "__main__":
    main()
