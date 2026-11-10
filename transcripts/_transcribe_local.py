"""One-off: transcribe local EMP masters into transcripts/ep-{N}.txt.

Whisper output has no speaker labels. Header matches transcripts/README.md
as closely as a non-YouTube source allows.

Audio is decoded with ffmpeg. The installed PyAV rejects metadata_errors,
which is what faster-whisper's own decoder passes.
"""
import subprocess
from datetime import date
from pathlib import Path

import numpy as np
from faster_whisper import BatchedInferencePipeline, WhisperModel

SRC = Path(
    r"C:\Users\pugli\Puglia BI Consulting\PowerBI.Tips - Documents\Recordings\Audio Final"
)
OUT = Path(__file__).resolve().parent
# 583 already has a Notion meeting-note transcript. Whisper the rest.
EPS = [577, 578, 579, 581, 582]
TITLES = {
    577: "Can you Stomach Data Governance?",
    578: "The App Revolution & Fabric",
    579: "Power BI is (NOT) Dead?",
    581: "Exploring Database Hub",
    582: "What is Shadow AI?",
}
PROMPT = (
    "Explicit Measures podcast. Hosts Tommy Puglia and Mike Carlo. "
    "Microsoft Fabric, Power BI, DAX, semantic models, OneLake, Copilot, "
    "agents, skills, TMDL, notebooks, lakehouse."
)


def fmt_ts(seconds: float) -> str:
    s = max(0, int(seconds))
    h, rem = divmod(s, 3600)
    m, sec = divmod(rem, 60)
    return f"{h:02d}:{m:02d}:{sec:02d}"


def fmt_duration(seconds: float) -> str:
    s = max(0, int(round(seconds)))
    h, rem = divmod(s, 3600)
    m, sec = divmod(rem, 60)
    if h:
        return f"{h}:{m:02d}:{sec:02d}"
    return f"{m}:{sec:02d}"


def paragraphs(segments, pause: float = 1.35, max_words: int = 85):
    paras = []
    buf: list[str] = []
    start = None
    last_end = None
    words = 0
    for seg in segments:
        text = (seg.text or "").strip()
        if not text:
            continue
        gap = 0.0 if last_end is None else seg.start - last_end
        if buf and (gap >= pause or words >= max_words):
            paras.append((start, " ".join(buf)))
            buf = []
            words = 0
            start = None
        if start is None:
            start = seg.start
        buf.append(text)
        words += len(text.split())
        last_end = seg.end
    if buf:
        paras.append((start, " ".join(buf)))
    return paras


def load_audio(path: Path) -> np.ndarray:
    raw = subprocess.check_output(
        [
            "ffmpeg",
            "-nostdin",
            "-threads",
            "0",
            "-i",
            str(path),
            "-f",
            "s16le",
            "-ac",
            "1",
            "-acodec",
            "pcm_s16le",
            "-ar",
            "16000",
            "-",
        ],
        stderr=subprocess.DEVNULL,
    )
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0


def main() -> None:
    model = WhisperModel("turbo", device="cuda", compute_type="float16")
    pipe = BatchedInferencePipeline(model=model)
    for ep in EPS:
        audio = SRC / f"{ep}.mp3"
        print(f"START ep-{ep} {audio}", flush=True)
        samples = load_audio(audio)
        segments, info = pipe.transcribe(
            samples,
            batch_size=8,
            language="en",
            vad_filter=True,
            initial_prompt=PROMPT,
            without_timestamps=False,
        )
        paras = paragraphs(segments)
        body = "\n\n".join(f"[{fmt_ts(t)}] {text}" for t, text in paras)
        header = (
            f"Title: {TITLES.get(ep, f'Episode {ep}')} - Ep.{ep} - Power BI tips\n"
            f"Episode: {ep}\n"
            f"Duration: {fmt_duration(info.duration)}\n"
            f"Source: local-audio\n"
            f"URL: {audio}\n"
            f"Captions: whisper turbo (en)  [no speaker labels, expect transcription errors]\n"
            f"Fetched: {date.today().isoformat()}\n"
            + "-" * 72
            + "\n\n"
        )
        out = OUT / f"ep-{ep}.txt"
        out.write_text(header + body + "\n", encoding="utf-8")
        words = sum(len(text.split()) for _, text in paras)
        print(
            f"Wrote ep-{ep}.txt  ({len(paras)} paragraphs, ~{words} words, {fmt_duration(info.duration)})",
            flush=True,
        )


if __name__ == "__main__":
    main()
