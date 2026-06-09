# wc26-sweepstake — agent operating notes

A weighted sweepstake for the 2026 FIFA World Cup. 20 friends, 48 teams, each entrant gets one elite team and one or two underdogs (luck-of-the-draw on how many). Tournament winner takes the headline prize; semi-finalists get kudos. Single-page vanilla JS, Firebase Anonymous Auth + Firestore, ESPN unofficial API for fixtures / results / odds. Hosted on Cloudflare Workers Assets. Same Firebase project as the wc26-predictions sibling, separate collections.

## Read these first

1. `README.md` — what this is, audience, mechanic
2. `BACKLOG.md` — ranked work, parked ideas (create on first edit)
3. The PokerStars Fusion Design System spec at `~/Downloads/PokerStars-Fusion-Design-System.md` (ask the human for the current path if missing). All visual changes go through this; tokens are inlined in `index.html`.

## Sibling project

`wc26-predictions/` is the score-prediction sibling. It uses the same Firebase project (`world-cup-predictor-9a331`) and writes the canonical `matches/{matchId}` collection that this app reads to tier teams. Don't fork the matches data; rely on the predictions admin to keep it fresh.

## File layout

- `index.html` — UI shell, CSS, all rendering JS, Firebase + ESPN logic. Single file by design.
- `data.js` — config + reference data: Firebase web config, admin passcode, tournament window, country flag map, sweepstake structure constants (entrant count, elite-tier size, kudos values).
- `wrangler.jsonc` — Cloudflare Workers Assets config.
- `README.md` — public-facing description.

## Firestore schema (sweepstake-specific collections)

- `sweep_meta/state` — single doc. `{ status: "open" | "drawn" | "closed", generatedAt, entrantCount, eliteTierCount }`.
- `sweep_slots/{slotId}` — 20 docs, one per slot. `{ slot: 1, eliteTeam: { abbr, name, group }, underdogTeams: [{ abbr, name, group }, ...], claimedBy: null | name, claimedAt, claimedByUid }`. Underdog array length is 1 or 2.
- `sweep_entries/{name}` — one doc per entrant. `{ name, slot, uid, joinedAt }`.

Read-only collection consumed from the predictions sibling:
- `matches/{matchId}` — fixtures, scores, odds. We pull each team's average implied probability across their group matches to rank them for tiering.

## Hard rules

- **No em dashes anywhere.** Use commas, periods, colons, semicolons, parentheses. (Project author voice rule.)
- **No decorative emoji in UI.** Country flag emoji are OK as functional team data (with `aria-hidden`). Spade brand mark is SVG.
- **Use Fusion semantic tokens, not raw hex.** Canonical names (e.g. `var(--surface-fill-interactive-primary-default)`) are available alongside legacy aliases (e.g. `var(--fill-interactive-primary-default)`). Mirror the wc26-predictions/index.html `:root` block exactly so the two apps stay visually consistent.
- **Dark theme is canonical.** No light-theme overrides without explicit ask.
- **WCAG AA on all text.** Body text 4.5:1, large text 3:1.
- **No build step.** Single HTML file served directly. No bundlers, frameworks, compilers.
- **One commit per discrete change.** Imperative messages, no em dashes, two-line format (short title, blank line, longer explanation).

## Deploying

Push to `main` on GitHub (repo to be created at `JDirsFlutter/wc26-sweepstake`). Cloudflare Workers auto-deploys in about 30 seconds. Live URL will be `https://wc26-sweepstake.jamesdirs90.workers.dev/` once Worker is wired.

## Verifying locally

```
python3 -m http.server 8125 --directory wc26-sweepstake
```

Or add a `wc26-sweepstake` entry to `.claude/launch.json` to use `mcp__Claude_Preview__preview_start`.

## Drawing the slots

The "Generate draw" action (admin only):
1. Reads `matches/` from Firestore.
2. Computes each team's average implied probability across all matches they appear in.
3. Sorts descending. Top `SWEEP_ELITE_TIER_COUNT` (20) become elite. Rest become underdog.
4. Distributes underdogs across 20 slots so that `slots_with_2_underdogs = (underdog_count - entrant_count)` and the rest get 1 each. With 28 underdogs and 20 entrants that yields 8 slots with 2 underdogs, 12 slots with 1.
5. Randomly shuffles elite and underdog assignments to slots. Writes `sweep_slots/{1..20}` and `sweep_meta/state.status = "drawn"`.

The draw is one-shot. Re-running before any entries exist overwrites. Re-running after entries exist requires explicit confirmation in the admin UI.

## What NOT to do

- Don't change the Firebase project. Same project across all WC26 surfaces.
- Don't modify `matches/` collection from this app. It belongs to wc26-predictions.
- Don't add a JS framework or build step.
- Don't add light-theme overrides.
- Don't collect emails or any PII. Anonymous auth, first-name display only.
