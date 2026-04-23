# Setting Up SonicJS CMS

SonicJS runs on Cloudflare Workers + D1 (SQLite at the edge). Here is how to deploy it.

## 1. Clone SonicJS

```bash
git clone https://github.com/SonicJs-Org/sonicjs
cd sonicjs
npm install
```

## 2. Configure Cloudflare

```bash
npx wrangler login
npx wrangler d1 create salishsea-cms
```

Copy the `database_id` from the output and add to `wrangler.toml`:

```toml
name = "salishsea-cms"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "salishsea-cms"
database_id = "YOUR_DATABASE_ID_HERE"
```

## 3. Deploy

```bash
npx wrangler deploy
```

Your CMS will be live at:
`https://salishsea-cms.YOUR_ACCOUNT.workers.dev`

## 4. Create the Posts collection

Go to your SonicJS admin panel at:
`https://salishsea-cms.YOUR_ACCOUNT.workers.dev/admin`

Create a **Posts** collection with fields:
- `slug` (text, unique)
- `title` (text)
- `excerpt` (textarea)
- `content` (richtext)
- `html` (textarea — compiled HTML)
- `feature_image` (text)
- `published_at` (datetime)
- `tags` (text)
- `status` (text, default: "published")

## 5. Add env var to Cloudflare Pages

In Cloudflare Pages → Settings → Environment Variables:

```
NEXT_PUBLIC_SONICJS_URL = https://salishsea-cms.YOUR_ACCOUNT.workers.dev
```

## 6. Import your Ghost posts

Run the migration script (coming soon) to import your 51 Ghost posts into SonicJS.
