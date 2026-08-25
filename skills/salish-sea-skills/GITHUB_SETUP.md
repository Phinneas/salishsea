# GitHub Setup Guide

Your `salish-sea-skills` monorepo is ready to push. Here's how to get it on GitHub.

## What's included

✅ **Root-level files:**
- `README.md` — Master index for all 31 skills
- `CONTRIBUTING.md` — How to contribute
- `LICENSE` — MIT license
- `CHANGELOG.md` — Version history
- `.gitignore` — Git configuration

✅ **Folder structure:** All 31 skills organized by category
- `skills/grant-writing/` (7 skills)
- `skills/esg-sustainability/` (5 skills)
- `skills/ai-visibility/` (3 skills)
- `skills/small-org-operations/` (4 skills)
- `skills/content-strategy/` (6 skills)
- `skills/tools/` (3 items)

✅ **6 skills complete with SKILL.md + README.md:**
- `seo-technical-audit`
- `seranking-dataforseo`
- `content-plan`
- `market-research`
- `design-what-if`
- `design-brief-enforcer`

📋 **22 skills with empty folders (ready for Phase 2-3 SKILL.md creation)**

## Steps to push to GitHub

### 1. Create the GitHub repo

Go to github.com/Phinneas and create a new repository:
- **Repo name:** `salish-sea-skills`
- **Description:** "31 production-tested frameworks for marketing, grant writing, sustainability, and operations. Free to use in Claude."
- **Visibility:** Public
- **Initialize:** NO (we already have files)

GitHub will show you push instructions. Copy the repo URL (e.g., `git@github.com:Phinneas/salish-sea-skills.git`).

### 2. Initialize git locally (if not already done)

```bash
cd salish-sea-skills
git init
git add .
git commit -m "Initial commit: 31-skill framework library

- 6 complete skills with SKILL.md + README.md
- 25 skills with folder structure ready for Phase 2-3
- Master README with skill categories and workflows
- MIT license, CONTRIBUTING guide, CHANGELOG"
```

### 3. Push to GitHub

```bash
git remote add origin git@github.com:Phinneas/salish-sea-skills.git
git branch -M main
git push -u origin main
```

### 4. Configure GitHub repo settings

Once pushed, go to the repo on GitHub and:

**Settings → General:**
- Enable "Discussions" (so people can ask questions)
- Enable "Issues" (for bug reports / clarifications)
- Set default branch to `main`

**Settings → Code and automation → Topics:**
Add these tags:
- `grant-writing`
- `esg-sustainability`
- `ai-visibility`
- `content-strategy`
- `marketing`
- `frameworks`
- `claude`
- `methodology`

**About section (top-right of repo):**
- Add description: "31 production-tested frameworks. Free to use."
- Add website: https://salishseaconsulting.com/skills

### 5. Add badge to README (optional)

If you want a "license" badge in the README, find one at shields.io and add:
```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

## Next: Phase 2-3 SKILL.md Creation

After pushing, move to Phase 2-3:

- **Phase 2 (Week 2):** Create SKILL.md files for Grant Writing + ESG skills (12 files)
- **Phase 3 (Week 3):** Create SKILL.md files for AI Visibility + Small-Org + Tools (13 files)

Use the existing 6 SKILL.md files as templates. Each new SKILL.md follows the same format.

## Verification

After pushing, verify:

1. ✅ All 31 skill folders exist on GitHub
2. ✅ All 6 complete skills have SKILL.md + README.md
3. ✅ Repository is public
4. ✅ Topics/tags are set
5. ✅ Discussions are enabled

## Questions?

GitHub has good docs at https://docs.github.com/en/get-started. If you get stuck:
1. Check your SSH key is configured (`ssh -T git@github.com`)
2. Make sure you're in the `salish-sea-skills` directory
3. Check the repo URL is correct (it should have YOUR username, not `[org]`)

---

**Ready to push? Run the commands above and you're live.**
