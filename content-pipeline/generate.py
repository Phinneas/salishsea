#!/usr/bin/env python3
"""
Author Content Generation Pipeline
===================================
Researches trending topics in the author/indie-publishing niche,
generates Instagram Reel scripts, Threads posts, and caption sets
via the Claude API, and saves everything to JSON + Markdown.

Usage:
    python generate.py
    python generate.py --topics 3
    python generate.py --topics 5 --output ./content/
"""

import argparse
import asyncio
import os
import sys

from dotenv import load_dotenv

load_dotenv()

from modules.generation import generate_all_content
from modules.output import save_content
from modules.research import research_topics


def _check_env() -> None:
    if not os.getenv("ANTHROPIC_API_KEY"):
        print(
            "\n❌  ANTHROPIC_API_KEY is required.\n"
            "    Copy .env.example → .env and add your key.\n"
        )
        sys.exit(1)

    if not os.getenv("TAVILY_API_KEY"):
        print(
            "ℹ️   TAVILY_API_KEY not set — using Reddit-only topic research.\n"
            "    Add it to .env to enable Tavily web search.\n"
        )


async def _run(n_topics: int, output_dir: str) -> None:
    width = 60
    print(f"\n{'═' * width}")
    print("  Author Content Generation Pipeline")
    print(f"{'═' * width}\n")

    # ── Step 1: Research ──────────────────────────────────────────────────
    print(f"[1/3] Researching {n_topics} trending topics for the author niche…")
    topics = await research_topics(n=n_topics)

    print(f"\n  Found {len(topics)} topic(s):\n")
    for i, t in enumerate(topics, 1):
        print(f"  {i:>2}. {t.title[:68]}")
        print(f"       Source: {t.source:<20}  Score: {t.engagement_score:,.0f}\n")

    # ── Step 2: Generate ──────────────────────────────────────────────────
    print(f"[2/3] Generating content for {len(topics)} topic(s)…")
    print(
        "       Model: claude-opus-4-7  |  Prompt caching: enabled\n"
        "       (Cache activates once the system prompt exceeds the model\n"
        "        4096-token threshold; usage is reported per topic below)\n"
    )

    content_sets = await generate_all_content(topics)

    if not content_sets:
        print("\n❌  No content generated. Check your ANTHROPIC_API_KEY and try again.")
        sys.exit(1)

    print(f"\n  ✓ {len(content_sets)}/{len(topics)} topic(s) generated successfully")

    # ── Step 3: Save ──────────────────────────────────────────────────────
    print(f"\n[3/3] Saving output to {output_dir}…")
    os.makedirs(output_dir, exist_ok=True)
    json_path, md_path = save_content(content_sets, output_dir)

    best_idx = 0
    best_score = -1.0
    for i, cs in enumerate(content_sets):
        score = cs.confidence_score * 0.6 + min(cs.engagement_score / 1000, 1.0) * 0.4
        if score > best_score:
            best_score = score
            best_idx = i

    # ── Summary ───────────────────────────────────────────────────────────
    total_cache_read = sum(cs.cache_read_tokens for cs in content_sets)
    total_cache_write = sum(cs.cache_write_tokens for cs in content_sets)

    print(f"\n{'═' * width}")
    print("  Done!")
    print(f"{'═' * width}\n")
    print(f"  JSON:      {json_path}")
    print(f"  Markdown:  {md_path}")
    print()
    print(f"  Topics generated : {len(content_sets)}")
    print(f"  Best angle       : {content_sets[best_idx].topic_title[:55]}")
    print(f"  Confidence       : {content_sets[best_idx].confidence_score:.0%}")

    if total_cache_read or total_cache_write:
        print()
        print(f"  Cache reads  : {total_cache_read:>8,} tokens")
        print(f"  Cache writes : {total_cache_write:>8,} tokens")

    print()


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate Instagram Reels and Threads content for an author services brand.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  python generate.py\n"
            "  python generate.py --topics 3\n"
            "  python generate.py --topics 5 --output ./content/\n"
        ),
    )
    parser.add_argument(
        "--topics",
        type=int,
        default=5,
        metavar="N",
        help="Number of topics to research and generate content for (default: 5)",
    )
    parser.add_argument(
        "--output",
        type=str,
        default="./content/",
        metavar="DIR",
        help="Output directory for generated content (default: ./content/)",
    )

    args = parser.parse_args()

    if args.topics < 1 or args.topics > 20:
        parser.error("--topics must be between 1 and 20")

    _check_env()
    asyncio.run(_run(args.topics, args.output))


if __name__ == "__main__":
    main()
