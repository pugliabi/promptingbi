# Transcript cache

Local source-of-truth for EMP / YouTube transcripts used to draft and edit Prompting BI posts. **Not** a content collection. Astro never loads this folder. Nothing here can appear on the site.

## Filename

```
transcripts/ep-{N}.txt     # EMP episode N  (ep-545.txt)
transcripts/{kebab}.txt    # non-episode recording
```

## Header (every file)

```
Title: ...
Episode: 545
Source: youtube | notion | paste
URL: https://...
Captions: auto (en) | manual | notion-meeting-note
Fetched: 2026-08-24
------------------------------------------------------------------------
```

## Agent contract

1. **Tommy asks for a transcript** → write it here. If `ep-{N}.txt` already exists, use it; only re-fetch when he says refresh/update (overwrite in place).
2. **Tommy asks to create / update / pull an article** → read `transcripts/ep-{N}.txt` *before* Notion or YouTube. Fetch and save only on a miss.
3. Set `source.transcript: "transcripts/ep-{N}.txt"` on the post front matter (editor-only, never rendered).
4. Prefer a Notion meeting-note transcript (speaker labels) over YouTube auto-captions when both exist. YouTube script: `.cursor/skills/writing-promptingbi-articles/scripts/fetch_youtube_transcript.py` — defaults to this folder.

Do not leave transcripts in `src/content/blog/angles/`, `src/content/blog/backlog/`, or the repo root. The per-episode ore file that gets drafted *from* a transcript lives in `src/content/blog/angles/ep-{N}-angles.md`; the transcript itself stays here.
