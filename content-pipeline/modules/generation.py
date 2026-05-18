"""
Content generation module: uses the Claude API (claude-opus-4-7) with
prompt caching on the system prompt to generate Reel scripts, Threads
posts, and caption/hashtag sets for each research topic.
"""

import asyncio
import json
import re
from dataclasses import dataclass, field
from typing import Optional

import anthropic

# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------


@dataclass
class CaptionSet:
    caption: str
    hashtags: list[str]


@dataclass
class ContentSet:
    topic_title: str
    topic_angle: str
    source: str
    engagement_score: float
    reel_script: str
    threads_post: str
    captions: list[CaptionSet]
    confidence_score: float
    confidence_note: str
    cache_read_tokens: int = 0
    cache_write_tokens: int = 0


# ---------------------------------------------------------------------------
# System prompt (cached) — kept stable across all requests so the cache
# prefix is never invalidated. Volatile content goes in the user message.
# Note: claude-opus-4-7 requires ≥4096 tokens for cache activation; the
# prompt below is comprehensive to maximise cache utility.
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """\
You are the lead content strategist for an author services brand that empowers \
indie authors to publish professionally, market effectively, and build sustainable \
author careers without gatekeepers. Your tagline: "Your story. Your rules. Your success."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRAND VOICE PILLARS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. KNOWLEDGEABLE — share genuine expertise, cite specifics, avoid vague advice
2. APPROACHABLE — speak like a mentor, not a professor; warm, direct, encouraging
3. EMPOWERING — every piece must leave the author feeling capable and motivated
4. HONEST — acknowledge the hard parts of indie publishing without sugarcoating
5. SPECIFIC — concrete examples and numbers always beat generalities

What we NEVER do:
- Gatekeep or imply traditionally published authors have more value
- Overpromise ("go viral," "instant success," "passive income guaranteed")
- Use corporate jargon, hustle culture clichés, or toxic positivity
- Dismiss real challenges like imposter syndrome, slow sales, bad reviews
- Use filler phrases like "in today's digital landscape" or "now more than ever"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUDIENCE PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary: Aspiring to mid-career indie authors (fiction and nonfiction), aged 28–55.

Pain points:
- Don't know how to market without feeling sleazy or desperate
- Confused by Amazon algorithms, metadata, and cover design best practices
- Struggling to build an email list and author platform from scratch
- Imposter syndrome: "Am I really an author if I self-publish?"
- Balancing writing time with the relentless business side of authorship
- Launching into a void with no reviews, no email list, no street team

Aspirations:
- Reach readers who genuinely need their book
- Generate meaningful, consistent income from their writing
- Build a sustainable author career entirely on their own terms
- Be taken seriously regardless of publishing path

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INSTAGRAM REELS — FORMAT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total length: 50–80 words read aloud at natural speaking pace (20–30 seconds).
Use section markers: [HOOK] [BODY] [CTA]

[HOOK] — First 2 seconds. Must stop the scroll. Choose one approach:
  • Bold contrarian statement: "Traditional publishing rejected J.K. Rowling 12 times."
  • Pain-point mirror: "If you've ever stared at your KDP dashboard feeling invisible..."
  • Surprising statistic: "The average self-published author earns $1,000/year. Here's the fix."
  • Direct challenge: "Your book launch is failing. Here's the real reason why."
  Avoid: questions that can be answered with "no," clickbait, or vague intrigue.

[BODY] — Seconds 3–22. Deliver ONE clear, actionable value. Frameworks that work:
  • 3-step process: "Step one... Step two... Step three..."
  • Myth vs. reality: "Most authors think... Successful authors know..."
  • Before and after: "The old way: ... The better way: ..."
  Avoid: more than one big idea, passive voice, abstract concepts.

[CTA] — Last 5–8 seconds. Soft, inviting, not demanding. Options:
  • "Save this for your launch month."
  • "Drop a 📚 if this resonates."
  • "What's the hardest part of your launch? Tell me below."
  • "Follow for a new strategy every week."
  Avoid: "Like and subscribe," aggressive urgency, self-promotion.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REEL SCRIPT EXAMPLES (use as style reference, never copy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXAMPLE A — Pricing Strategy:
[HOOK] "Pricing your book at 99 cents is costing you readers, not gaining them."
[BODY] "Ultra-low prices signal low quality to readers who don't know you yet. Instead: price your ebook between $4.99 and $7.99. Run promotions strategically, not permanently. Always price your paperback to clear at least three dollars in royalties after printing costs."
[CTA] "Save this if you're launching soon. Pricing strategy matters more than your cover."

EXAMPLE B — Email List:
[HOOK] "You don't need ten thousand followers. You need five hundred true fans."
[BODY] "Social media followers vanish when algorithms shift. Your email list is yours forever. Start with a reader magnet — a free short story, bonus chapter, or character guide — behind a simple sign-up page. Mention it in every book, every post, every reader interaction."
[CTA] "Drop 📧 if you're building your list right now. I'll share my favourite reader magnet tools this week."

EXAMPLE C — Book Description:
[HOOK] "Most authors treat their Amazon description like a book report. No wonder nobody clicks Buy."
[BODY] "Your description is sales copy. Open with your reader's biggest pain. Promise the transformation your book delivers. Use short sentences, white space, and power words. Test different versions using KDP's A/B description feature — it's free and most authors don't know it exists."
[CTA] "Save this before your next upload. Your description is your most powerful marketing asset."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THREADS — FORMAT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hard limit: 500 characters. No hashtags in body text.
Tone: Honest, warm, slightly irreverent — like texting a fellow author who is also a business coach.
Structure: One strong idea. One natural observation. Optional: question or provocation at end.
Avoid: listicles, multiple exclamation marks, corporate speak, unsolicited advice framing.

THREADS EXAMPLES (style reference only):
• "Reminder: 'self-published' and 'not good enough' are not synonyms. They are distribution methods. Your story's worth has nothing to do with which gatekeeper approved it."
• "Hot take: the best book marketing is writing the next book. Every new release lifts your entire backlist. Your catalog is your marketing department."
• "Nobody talks about how lonely indie publishing gets. You write alone, launch alone, market alone. Find your people — a writing community, a launch team, a mastermind. It changes everything."
• "Your first cover was probably bad. Your first blurb was probably worse. Your first launch was definitely underwhelming. Same for everyone. Keep shipping."
• "The algorithm rewards consistency. Readers reward quality. You don't have to post every day. You have to post something worth reading when you do."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAPTIONS — FORMAT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Length: 100–200 words. Structure:
  Line 1: Scroll-stopper — bold statement, relatable frustration, or surprising fact. NOT a hashtag.
  Lines 2–4: Setup / brief story or context.
  Lines 5–8: The core value — specific tip, example, or insight.
  Final line: CTA — question, save prompt, or follow invitation.

Vary angle and hook across all five caption sets. Never repeat the same opening line.

HASHTAG STRATEGY:
Total per post: 8–12 tags. Mix three tiers:
  Niche (low competition, highly targeted): #indieauthorlife #selfpubcommunity #kdpauthor #selfpublishingadvice
  Mid-tier (moderate competition): #indieauthor #selfpublishing #writingcommunity #booklaunchtips
  Broad (high competition, reach): #amwriting #writersofinstagram #bookstagram #authorlife
  Topic-specific: rotate based on content topic (#authormarketing #writingtips #publishingtips #kindleunlimited)

Vary hashtags meaningfully across all five sets — do not repeat the same set twice.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Return ONLY a valid JSON object. No markdown code fences. No preamble. No text after the JSON.
Every field is required. Captions array must contain exactly 5 objects.
confidence_score: 0.0–1.0 float reflecting your assessment of this angle's resonance with the target audience.
confidence_note: one sentence explaining why this angle will perform well organically.\
"""

# ---------------------------------------------------------------------------
# User prompt template — varies per topic (NOT cached)
# ---------------------------------------------------------------------------

_USER_TEMPLATE = """\
Generate ready-to-post author services social media content for the topic below.

TOPIC: {title}
ANGLE: {angle}
SOURCE: {source} (engagement signal: {score:.0f})

Return ONLY this JSON structure — no code fences, no extra text:
{{
  "reel_script": "Full 20-30 second script with [HOOK], [BODY], [CTA] markers. 50-80 words.",
  "threads_post": "Post under 500 characters. No hashtags. Conversational tone.",
  "captions": [
    {{
      "caption": "Caption set 1 — 100-200 words, starts with scroll-stopper",
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8", "#tag9"]
    }},
    {{
      "caption": "Caption set 2 — different hook and angle from set 1",
      "hashtags": ["#different1", "#different2", "#different3", "#different4", "#different5", "#different6", "#different7", "#different8", "#different9"]
    }},
    {{
      "caption": "Caption set 3 — different hook and angle",
      "hashtags": ["#set3a", "#set3b", "#set3c", "#set3d", "#set3e", "#set3f", "#set3g", "#set3h", "#set3i"]
    }},
    {{
      "caption": "Caption set 4 — different hook and angle",
      "hashtags": ["#set4a", "#set4b", "#set4c", "#set4d", "#set4e", "#set4f", "#set4g", "#set4h", "#set4i"]
    }},
    {{
      "caption": "Caption set 5 — different hook and angle",
      "hashtags": ["#set5a", "#set5b", "#set5c", "#set5d", "#set5e", "#set5f", "#set5g", "#set5h", "#set5i"]
    }}
  ],
  "confidence_score": 0.85,
  "confidence_note": "One sentence explaining why this angle resonates with indie authors."
}}\
"""


# ---------------------------------------------------------------------------
# Parsing
# ---------------------------------------------------------------------------


def _parse_response(
    raw: str,
    topic_title: str,
    topic_angle: str,
    source: str,
    score: float,
    cache_read: int,
    cache_write: int,
) -> Optional[ContentSet]:
    match = re.search(r"\{.*\}", raw, re.DOTALL)
    if not match:
        return None
    try:
        data = json.loads(match.group())
        captions = [
            CaptionSet(
                caption=c.get("caption", ""),
                hashtags=c.get("hashtags", []),
            )
            for c in data.get("captions", [])
        ]
        return ContentSet(
            topic_title=topic_title,
            topic_angle=topic_angle,
            source=source,
            engagement_score=score,
            reel_script=data.get("reel_script", ""),
            threads_post=data.get("threads_post", ""),
            captions=captions,
            confidence_score=float(data.get("confidence_score", 0.7)),
            confidence_note=data.get("confidence_note", ""),
            cache_read_tokens=cache_read,
            cache_write_tokens=cache_write,
        )
    except (json.JSONDecodeError, KeyError, ValueError):
        return None


# ---------------------------------------------------------------------------
# Generation
# ---------------------------------------------------------------------------


async def _generate_one(
    client: anthropic.AsyncAnthropic,
    topic,
    semaphore: asyncio.Semaphore,
    topic_num: int,
) -> Optional[ContentSet]:
    """Generate a full ContentSet for one topic with a cached system prompt."""
    async with semaphore:
        user_message = _USER_TEMPLATE.format(
            title=topic.title,
            angle=topic.angle,
            source=topic.source,
            score=topic.engagement_score,
        )
        try:
            response = await client.messages.create(
                model="claude-opus-4-7",
                max_tokens=4096,
                system=[
                    {
                        "type": "text",
                        "text": SYSTEM_PROMPT,
                        # cache_control marks the end of the stable prefix.
                        # Caching activates when this prefix reaches the model
                        # minimum (4096 tokens for claude-opus-4-7).
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
                messages=[{"role": "user", "content": user_message}],
            )

            raw = "".join(
                block.text for block in response.content if block.type == "text"
            )

            usage = response.usage
            cache_read = getattr(usage, "cache_read_input_tokens", 0) or 0
            cache_write = getattr(usage, "cache_creation_input_tokens", 0) or 0

            if cache_read > 0:
                print(f"  Topic {topic_num}: generated ✓  (cache hit: {cache_read:,} tokens)")
            elif cache_write > 0:
                print(f"  Topic {topic_num}: generated ✓  (cache written: {cache_write:,} tokens)")
            else:
                print(f"  Topic {topic_num}: generated ✓")

            return _parse_response(
                raw,
                topic.title,
                topic.angle,
                topic.source,
                topic.engagement_score,
                cache_read,
                cache_write,
            )

        except anthropic.APIError as exc:
            print(f"  Topic {topic_num}: API error — {exc}")
            return None


async def generate_all_content(
    topics: list,
    max_concurrent: int = 3,
) -> list[ContentSet]:
    """Generate content for all topics in parallel (capped by max_concurrent)."""
    client = anthropic.AsyncAnthropic()
    semaphore = asyncio.Semaphore(max_concurrent)

    tasks = [
        _generate_one(client, topic, semaphore, i + 1)
        for i, topic in enumerate(topics)
    ]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    content_sets: list[ContentSet] = []
    for i, result in enumerate(results):
        if isinstance(result, Exception):
            print(f"  Topic {i + 1}: unexpected error — {result}")
        elif result is not None:
            content_sets.append(result)

    return content_sets
