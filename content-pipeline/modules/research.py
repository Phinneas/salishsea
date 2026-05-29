"""
Topic research module: pulls trending content from Reddit and Tavily,
ranks by engagement signals, and returns the top N topic angles.
"""

import asyncio
import os
from dataclasses import dataclass, field
from typing import Optional

import httpx

REDDIT_SUBREDDITS = ["writing", "selfpublishing", "authors"]

EXA_QUERIES = [
    "indie author book marketing tips 2025",
    "self publishing trends authors",
    "author platform building social media",
    "writing productivity tips authors",
    "Amazon KDP publishing strategies",
]

AUTHOR_KEYWORDS = [
    "author", "writing", "publish", "book", "query", "agent", "indie",
    "self-pub", "amazon", "kdp", "marketing", "royalt", "manuscript",
    "reader", "fiction", "nonfiction", "launch", "platform",
]


@dataclass
class TopicAngle:
    title: str
    angle: str
    source: str
    engagement_score: float
    signals: dict = field(default_factory=dict)
    url: Optional[str] = None


FALLBACK_TOPICS: list[TopicAngle] = [
    TopicAngle(
        title="How to price your self-published ebook (and why $0.99 hurts you)",
        angle="Counterintuitive pricing strategy that increases perceived value and conversions",
        source="Fallback",
        engagement_score=100,
    ),
    TopicAngle(
        title="Building your author email list from zero subscribers",
        angle="Step-by-step reader magnet strategy for new indie authors",
        source="Fallback",
        engagement_score=90,
    ),
    TopicAngle(
        title="Amazon KDP vs IngramSpark: which distributor is right for you?",
        angle="Practical comparison of the two major self-publishing distribution platforms",
        source="Fallback",
        engagement_score=85,
    ),
    TopicAngle(
        title="Your first 90 days after publishing: what actually moves the needle",
        angle="Post-launch marketing plan for indie authors without a big budget",
        source="Fallback",
        engagement_score=80,
    ),
    TopicAngle(
        title="Writing consistently while working a full-time job",
        angle="Realistic productivity system for authors who can't write full-time",
        source="Fallback",
        engagement_score=75,
    ),
    TopicAngle(
        title="How to write a book description that actually sells",
        angle="Sales copywriting principles applied to Amazon book descriptions",
        source="Fallback",
        engagement_score=70,
    ),
    TopicAngle(
        title="The indie author's guide to getting honest book reviews",
        angle="Ethical ARC and review strategy for new releases",
        source="Fallback",
        engagement_score=65,
    ),
]


def _score_reddit_post(data: dict) -> float:
    """Compute a composite engagement score for a Reddit post."""
    upvotes = data.get("score", 0)
    comments = data.get("num_comments", 0)
    ratio = data.get("upvote_ratio", 0.5)
    return (upvotes * ratio) + (comments * 3.0)


def _is_relevant(title: str) -> bool:
    """Return True if the post title is relevant to the author niche."""
    lower = title.lower()
    return any(kw in lower for kw in AUTHOR_KEYWORDS) and len(title) >= 20


async def _fetch_reddit_posts(
    client: httpx.AsyncClient, subreddit: str
) -> list[dict]:
    url = f"https://www.reddit.com/r/{subreddit}/hot.json"
    for attempt in range(2):
        try:
            r = await client.get(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (compatible; AuthorContentBot/1.0; +https://github.com/phinneas/salishsea)",
                    "Accept": "application/json",
                },
                params={"limit": 30, "t": "week"},
                timeout=15.0,
                follow_redirects=True,
            )
            r.raise_for_status()
            return r.json()["data"]["children"]
        except Exception as exc:
            if attempt == 0:
                await asyncio.sleep(2)
                continue
            print(f"  Warning: r/{subreddit} fetch failed — {exc}")
            return []
    return []


async def _fetch_exa(
    client: httpx.AsyncClient, query: str, api_key: str
) -> list[dict]:
    try:
        r = await client.post(
            "https://api.exa.ai/search",
            headers={"x-api-key": api_key, "Content-Type": "application/json"},
            json={
                "query": query,
                "numResults": 5,
                "type": "neural",
                "useAutoprompt": True,
            },
            timeout=15.0,
        )
        r.raise_for_status()
        return r.json().get("results", [])
    except Exception as exc:
        print(f"  Warning: Exa query '{query[:40]}' failed — {exc}")
        return []


def _reddit_to_topic(post: dict) -> Optional[TopicAngle]:
    data = post["data"]
    title = data.get("title", "").strip()
    if not _is_relevant(title):
        return None
    return TopicAngle(
        title=title[:150],
        angle=f"Community discussion trending on r/{data.get('subreddit', 'writing')}: {title[:100]}",
        source=f"r/{data.get('subreddit', 'writing')}",
        engagement_score=_score_reddit_post(data),
        signals={
            "upvotes": data.get("score", 0),
            "comments": data.get("num_comments", 0),
            "ratio": data.get("upvote_ratio", 0),
        },
        url=f"https://reddit.com{data.get('permalink', '')}",
    )


def _exa_to_topic(result: dict, query: str) -> TopicAngle:
    title = (result.get("title") or query)[:150]
    return TopicAngle(
        title=title,
        angle=f"Web trending: {title}",
        source="Web (Exa)",
        engagement_score=40.0,
        signals={"query": query, "score": result.get("score", 0)},
        url=result.get("url", ""),
    )


async def research_topics(n: int = 5) -> list[TopicAngle]:
    """Research and rank the top N trending topics for the author niche."""
    exa_key = os.getenv("EXA_API_KEY")
    all_topics: list[TopicAngle] = []

    async with httpx.AsyncClient() as client:
        reddit_tasks = [_fetch_reddit_posts(client, sub) for sub in REDDIT_SUBREDDITS]
        exa_tasks = (
            [_fetch_exa(client, q, exa_key) for q in EXA_QUERIES[:3]]
            if exa_key
            else []
        )

        results = await asyncio.gather(
            *reddit_tasks, *exa_tasks, return_exceptions=True
        )

    # Process Reddit results
    for i, result in enumerate(results[: len(REDDIT_SUBREDDITS)]):
        if isinstance(result, Exception):
            continue
        for post in result:
            topic = _reddit_to_topic(post)
            if topic:
                all_topics.append(topic)

    # Process Exa results
    if exa_key:
        for i, result in enumerate(results[len(REDDIT_SUBREDDITS) :]):
            if isinstance(result, Exception):
                continue
            for item in result[:2]:
                all_topics.append(_exa_to_topic(item, EXA_QUERIES[i]))

    # Deduplicate by title prefix
    seen: set[str] = set()
    unique: list[TopicAngle] = []
    for t in sorted(all_topics, key=lambda x: x.engagement_score, reverse=True):
        key = t.title[:40].lower().strip()
        if key not in seen:
            seen.add(key)
            unique.append(t)

    # Pad with fallbacks if needed
    fallback_titles = {t.title for t in unique}
    for fb in FALLBACK_TOPICS:
        if len(unique) >= n:
            break
        if fb.title not in fallback_titles:
            unique.append(fb)

    return unique[:n]
