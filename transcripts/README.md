# Transcript cache

Local source-of-truth for EMP / YouTube transcripts used to draft and edit Prompting BI posts. **Not** a content collection. Astro never loads this folder. Nothing here can appear on the site.

## Filename

```
transcripts/ep-{N}.txt     # EMP episode N  (ep-545.txt)
transcripts/{kebab}.txt    # non-episode recording
```

## Header (every file)

Plain text, then a 72-dash rule, then a blank line, then the body. This is exactly what `fetch_youtube_transcript.py` emits; match it when you save a Notion meeting note or a paste by hand.

```
Title: Training Staff on Agents for DAX - Ep.549 - Power BI tips
Episode: 549                                  # omit when the title carries no Ep.N
Channel: Power BI Tips                        # YouTube only
Uploaded: 20260729   Duration: 47:15          # YouTube only
Source: youtube | notion | paste
URL: https://...
Captions: auto (en)  [auto-generated: no speaker labels, expect transcription errors]
Fetched: 2026-08-26
------------------------------------------------------------------------
```

`Captions:` is `auto (en)`, `manual`, or `notion-meeting-note`. The bracketed warning is appended only for auto captions — it is the reminder that there are no speaker labels, so attribution has to be inferred. A few older files predate this spec and carry the URL on the `Source:` line with no `Episode:` or `Fetched:`; leave them alone unless you re-fetch, which rewrites the header.

## Body

Blank-line separated paragraphs. Timestamps (`[00:12:34] `) prefix each paragraph only when the fetch used `--timestamps`; both shapes exist in this folder and both are fine to draft from.

## Agent contract

1. **Tommy asks for a transcript** → write it here. If `ep-{N}.txt` already exists, use it; only re-fetch when he says refresh/update (overwrite in place).
2. **Tommy asks to create / update / pull an article** → read `transcripts/ep-{N}.txt` *before* Notion or YouTube. Fetch and save only on a miss.
3. Set `source.transcript: "transcripts/ep-{N}.txt"` on the post front matter (editor-only, never rendered).
4. Prefer a Notion meeting-note transcript (speaker labels) over YouTube auto-captions when both exist. YouTube script: `.cursor/skills/writing-promptingbi-articles/scripts/fetch_youtube_transcript.py` — defaults to this folder.

Do not leave transcripts in `src/content/blog/angles/`, `src/content/blog/backlog/`, or the repo root. The per-episode ore file that gets drafted *from* a transcript lives in `src/content/blog/angles/ep-{N}-angles.md`; the transcript itself stays here.
