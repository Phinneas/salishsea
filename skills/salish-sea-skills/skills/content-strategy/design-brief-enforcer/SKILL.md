---
name: "design-brief-enforcer"
description: "Build or refine frontend/UI designs using a spec-enforced anti-slop brief: aesthetic vocabulary, decomposed reference, hard spec values, instead-of substitutions, and a separated critique pass. Use whenever Buzz asks to design/build/style a website, landing page, UI, or component, says \"anti-slop\", \"design brief\", \"spec brief\", or asks to apply the Aesthetic/Reference/Intent/Spec framework to a project."
---

# Design Brief Enforcer

Anti-slop design generation. Slop lives at the spec level (spacing, type scale, radius, shadow), not the adjective level. Adjectives steer taste; specs enforce it. This skill builds a complete brief before any code or design is generated, then runs a separated critique pass after.

## Core principles

1. **Models steer on tokens, not vibes.** Name concrete things: a named aesthetic family, named type systems, named spacing grids. "Clean and modern" does nothing; "Swiss editorial — grid-locked, high-contrast serif display, generous negative space" does.
2. **Never write bans.** Naming a thing to avoid keeps it active in context — you get the banned thing at partial strength. Every "never X" must be rewritten as "where you'd reach for X, use Y instead." No exceptions. If a ban cannot be paired with a substitute, it isn't specific enough to enforce.
3. **Feel must be decomposed before it can be matched.** A raw reference screenshot invites literal copying or a self-invented reading. Extract named attributes first; discard the layout.
4. **Anti-slop is a diff loop, not a prompt.** Generation and critique are separate passes with separate framing. Same-thread self-critique rationalizes; the critique pass below is structured to fight that.

## Workflow

### Phase 1 — Build the brief (before generating anything)

Gather or derive each line. If the user hasn't supplied a line, propose a value and confirm rather than leaving it blank. The output of this phase is the filled brief:

```
Aesthetic: [family name] — [5-8 concrete vocabulary terms]
Reference: [screenshot/URL if provided] — the 3 named attributes that make it work: [a], [b], [c]. Use the attributes, not the layout.
Intent: [what this should feel like] because [reason tied to audience/purpose]
Spec:
  - Type scale: [named ratio, e.g. 1.25 major third / 1.333 perfect fourth] anchored at [base px]
  - Spacing unit: [named grid, e.g. 8pt grid / 4pt for dense UI]
  - Radius: [exact px or "sharp 0"]
  - Shadow: [none / exact spec, e.g. "single soft ambient, 0 2px 8px rgba(x)"]
  - Palette: [n colors max, roles named: bg / surface / ink / accent]
  - Type faces: [named faces or named category, e.g. "grotesque display + humanist text"] — never fill this with a placeholder
Instead-of (minimum 4 pairs):
  - Where you'd reach for [default], use [substitute]
  - ...
```

Rules for filling it:
- **Aesthetic:** one family, not a blend. Blending families is how mush happens. Vocabulary terms must be concrete/visual (e.g. "hairline rules, uppercase micro-labels, ink-on-paper contrast"), not evaluative ("premium, polished").
- **Reference decomposition:** if a screenshot or URL is given, name exactly 3 attributes that make it work (e.g. "asymmetric column weighting," "one accent color used exactly twice," "display type at 2 sizes only"). Those attributes go in the brief; the screenshot's layout does not get copied.
- **Spec values must come from named systems**, not invented numbers. Named systems (8pt grid, modular scales, Material elevation levels) carry strong priors; arbitrary numbers get drifted away from. If the user gives exact tokens from an existing design system, those win.
- **Instead-of pairs** are the converted bans. Common defaults worth pre-converting:
  - Where you'd reach for Inter/system-ui, use [a specific named face fitting the family]
  - Where you'd reach for a purple-to-blue gradient, use [flat brand color / duotone from the palette]
  - Where you'd reach for a card wrapping every section, use [whitespace + rules/dividers for separation]
  - Where you'd reach for bounce/elastic easing, use [ease-out cubic, 150-250ms]
  - Where you'd reach for gray text on a colored background, use [full-contrast ink from the palette]
  - Where you'd reach for an icon tile above every heading, use [typographic hierarchy alone]

### Phase 2 — Generate

Generate the design/code with the full brief in view. The Spec block is binding: every spacing, size, radius, and shadow value used must be derivable from it. If a needed value isn't derivable, extend the spec explicitly first — don't improvise a one-off value.

### Phase 3 — Critique (separated pass)

Do not blend this into generation. After output is complete, run critique with this exact structure:

1. **Spec audit (mechanical, not judgment):** check every used value against the Spec block. List violations as `value used → spec value it should be`. This is a diff, not an opinion.
2. **Instead-of audit:** scan output for each pair's *default* — did any banned default leak through anyway? (They often do at partial strength.) List leaks.
3. **Intent check (judgment):** state in one sentence what the output currently feels like. Compare against the Intent line. If they don't match, name the single biggest cause.
4. **Name the weakest choice** in the output — the one element you'd defend least. Weakest, not wrong: something always qualifies.
5. **Revise once**, fixing all spec violations, all leaks, and the weakest choice. Do not revise more than once unless the user asks — endless self-revision converges back to defaults.

Where available, prefer mechanical checks over self-judgment for step 1: if the project has the impeccable CLI available (`npx impeccable detect <target>`), run it and treat its findings as the spec-audit input. For high-stakes work, run the critique in a subagent (fresh context) instead of the same thread.

## Output contract

- Always show the filled brief before generating, so the user can correct it cheaply.
- After critique + revision, show a short changelog: spec violations fixed, leaks caught, weakest choice replaced.
- If the user provides a reference but no aesthetic family, derive the family from the reference decomposition and confirm it.
- If the user asks for changes later in the session, changes go through the brief first (update the spec line, then regenerate) — not as ad-hoc overrides, which reintroduce drift.

