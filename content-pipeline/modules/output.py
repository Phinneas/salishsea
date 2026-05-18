"""
Output module: saves generated content as structured JSON and
a human-readable Markdown file, organised by date. Flags the
best-performing topic angle with a confidence note.
"""

import json
import os
from datetime import datetime

from .generation import ContentSet


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _best_index(content_sets: list[ContentSet]) -> int:
    """Return the index of the highest-scoring topic angle.

    Composite score weights Claude's confidence (60 %) and the research
    engagement signal (40 %, normalised to [0, 1] on a 1000-point scale).
    """
    if not content_sets:
        return 0
    return max(
        range(len(content_sets)),
        key=lambda i: (
            content_sets[i].confidence_score * 0.6
            + min(content_sets[i].engagement_score / 1000.0, 1.0) * 0.4
        ),
    )


def _to_dict(cs: ContentSet) -> dict:
    return {
        "topic_title": cs.topic_title,
        "topic_angle": cs.topic_angle,
        "source": cs.source,
        "engagement_score": round(cs.engagement_score, 1),
        "reel_script": cs.reel_script,
        "threads_post": cs.threads_post,
        "threads_char_count": len(cs.threads_post),
        "captions": [
            {"caption": c.caption, "hashtags": c.hashtags}
            for c in cs.captions
        ],
        "confidence_score": round(cs.confidence_score, 2),
        "confidence_note": cs.confidence_note,
        "api_usage": {
            "cache_read_tokens": cs.cache_read_tokens,
            "cache_write_tokens": cs.cache_write_tokens,
        },
    }


# ---------------------------------------------------------------------------
# Public interface
# ---------------------------------------------------------------------------


def save_content(
    content_sets: list[ContentSet],
    output_dir: str,
) -> tuple[str, str]:
    """Persist content to JSON + Markdown. Returns (json_path, md_path)."""

    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    batch_id = f"batch_{now.strftime('%H%M%S')}"

    batch_dir = os.path.join(output_dir, date_str)
    os.makedirs(batch_dir, exist_ok=True)

    best_idx = _best_index(content_sets)

    # ── JSON ──────────────────────────────────────────────────────────────
    total_cache_read = sum(cs.cache_read_tokens for cs in content_sets)
    total_cache_write = sum(cs.cache_write_tokens for cs in content_sets)

    json_payload = {
        "generated_at": now.isoformat(),
        "batch_id": batch_id,
        "total_topics": len(content_sets),
        "best_angle_index": best_idx,
        "best_angle_title": content_sets[best_idx].topic_title if content_sets else "",
        "api_totals": {
            "cache_read_tokens": total_cache_read,
            "cache_write_tokens": total_cache_write,
        },
        "content": [_to_dict(cs) for cs in content_sets],
    }

    json_path = os.path.join(batch_dir, f"{batch_id}.json")
    with open(json_path, "w", encoding="utf-8") as fh:
        json.dump(json_payload, fh, indent=2, ensure_ascii=False)

    # ── Markdown ──────────────────────────────────────────────────────────
    md_path = os.path.join(batch_dir, f"{batch_id}.md")
    with open(md_path, "w", encoding="utf-8") as fh:
        fh.write(f"# Author Content Batch — {date_str}\n\n")
        fh.write(
            f"**Generated:** {now.strftime('%B %d, %Y at %I:%M %p')}  \n"
            f"**Batch ID:** `{batch_id}`  \n"
            f"**Topics:** {len(content_sets)}\n\n"
        )

        if total_cache_read or total_cache_write:
            fh.write(
                f"> **Prompt cache:** {total_cache_read:,} tokens read, "
                f"{total_cache_write:,} tokens written\n\n"
            )

        if content_sets:
            best = content_sets[best_idx]
            fh.write(
                f"> ⭐ **Best Angle This Batch:** {best.topic_title}  \n"
                f"> {best.confidence_note}  \n"
                f"> Confidence: **{best.confidence_score:.0%}**\n\n"
            )

        fh.write("---\n\n")

        for i, cs in enumerate(content_sets):
            star = " ⭐" if i == best_idx else ""
            fh.write(f"## {i + 1}. {cs.topic_title}{star}\n\n")
            fh.write(
                f"**Source:** {cs.source}  \n"
                f"**Engagement score:** {cs.engagement_score:.0f}  \n"
                f"**Confidence:** {cs.confidence_score:.0%}\n\n"
            )
            if cs.confidence_note:
                fh.write(f"*{cs.confidence_note}*\n\n")

            # Reel script
            fh.write("### 🎬 Instagram Reel Script\n\n")
            fh.write(f"```\n{cs.reel_script}\n```\n\n")

            # Threads
            fh.write("### 🧵 Threads Post\n\n")
            fh.write(f"> {cs.threads_post}\n\n")
            char_count = len(cs.threads_post)
            over = "⚠️ OVER LIMIT" if char_count > 500 else "✓"
            fh.write(f"*{char_count}/500 characters {over}*\n\n")

            # Captions
            fh.write("### 📷 Captions & Hashtags\n\n")
            for j, cap in enumerate(cs.captions, 1):
                fh.write(f"**Caption Set {j}**\n\n")
                fh.write(f"{cap.caption}\n\n")
                fh.write(f"`{' '.join(cap.hashtags)}`\n\n")

            fh.write("---\n\n")

    return json_path, md_path
