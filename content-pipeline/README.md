# Author Content Generation Pipeline

Generates ready-to-post Instagram Reels scripts, Threads posts, and
caption/hashtag sets for an author services brand. Runs as a CLI tool —
point it at a topic count and an output directory and it handles the rest.

```
python generate.py --topics 5 --output ./content/
```

---

## What it does

1. **Topic Research** — pulls trending posts from `r/writing`, `r/selfpublishing`,
   and `r/authors` (no auth required), plus optional Tavily web search. Ranks
   the top N angles by engagement signal.

2. **Content Generation** — sends each topic to `claude-opus-4-7` in parallel
   (up to 3 concurrent requests). The brand-voice system prompt is marked for
   prompt caching to reduce costs on repeat runs.

3. **Output** — saves a dated JSON file and a human-readable Markdown file to
   `./content/YYYY-MM-DD/`. Flags the highest-confidence topic angle in both.

---

## Setup

### Prerequisites

- Python 3.10+
- An [Anthropic API key](https://console.anthropic.com/)
- *(Optional)* A [Tavily API key](https://tavily.com/) for web-search research

### Install

```bash
cd content-pipeline
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Configure

```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
# Optionally add TAVILY_API_KEY for richer topic research
```

---

## Usage

```bash
# Generate 5 topics (default) into ./content/
python generate.py

# Generate 3 topics
python generate.py --topics 3

# Specify output directory
python generate.py --topics 5 --output ~/Desktop/author-content/
```

---

## Output structure

```
content/
└── 2025-05-18/
    ├── batch_143022.json     # Structured data — import into schedulers
    └── batch_143022.md       # Human-readable — review before posting
```

### JSON schema (abbreviated)

```json
{
  "generated_at": "2025-05-18T14:30:22",
  "batch_id": "batch_143022",
  "total_topics": 5,
  "best_angle_index": 2,
  "best_angle_title": "How to price your self-published ebook",
  "api_totals": {
    "cache_read_tokens": 8200,
    "cache_write_tokens": 1024
  },
  "content": [
    {
      "topic_title": "Building your author email list from zero",
      "topic_angle": "Step-by-step reader magnet strategy...",
      "source": "r/selfpublishing",
      "engagement_score": 4320.5,
      "reel_script": "[HOOK] You don't need 10,000 followers...",
      "threads_post": "Hot take: your email list is worth 10x your follower count...",
      "threads_char_count": 198,
      "captions": [
        {
          "caption": "Nobody tells new authors this...",
          "hashtags": ["#indieauthor", "#selfpublishing", "..."]
        }
      ],
      "confidence_score": 0.88,
      "confidence_note": "Email list anxiety is a universal pain point for indie authors.",
      "api_usage": {
        "cache_read_tokens": 1640,
        "cache_write_tokens": 0
      }
    }
  ]
}
```

---

## Prompt caching

The system prompt (brand voice, platform guidelines, and examples) is marked
with `cache_control: ephemeral`. Claude's API caches this prefix so that
subsequent requests reuse it at ~10 % of the normal input token cost.

**Cache activation threshold for `claude-opus-4-7`:** 4,096 tokens. The
current system prompt sits near this boundary. You can grow it — by adding
niche-specific examples, tone samples, or extended style guidelines — to
reliably cross the threshold and unlock consistent cache hits. Cache reads
are reported per topic in the terminal output and in `api_usage` in the JSON.

---

## Customisation

| What                     | Where                                          |
|--------------------------|------------------------------------------------|
| Brand voice & examples   | `modules/generation.py` → `SYSTEM_PROMPT`      |
| Reddit subreddits        | `modules/research.py` → `REDDIT_SUBREDDITS`    |
| Tavily search queries    | `modules/research.py` → `TAVILY_QUERIES`       |
| Fallback topic ideas     | `modules/research.py` → `FALLBACK_TOPICS`      |
| Max concurrent API calls | `modules/generation.py` → `generate_all_content(max_concurrent=3)` |
| Best-angle scoring       | `modules/output.py` → `_best_index()`          |

---

## Project layout

```
content-pipeline/
├── generate.py           # CLI entry point
├── requirements.txt
├── .env.example
├── README.md
├── content/              # Created at runtime
│   └── YYYY-MM-DD/
│       ├── batch_HHMMSS.json
│       └── batch_HHMMSS.md
└── modules/
    ├── __init__.py
    ├── research.py       # Reddit + Tavily topic research
    ├── generation.py     # Claude API content generation
    └── output.py         # JSON + Markdown file writer
```
