# World Cup 2026 Sweepstake

A weighted office sweepstake for the 2026 FIFA World Cup. 20 entrants. Each entrant gets one elite team (top 20 by bookmaker odds) and one or two underdog teams (luck of the draw which). The team that wins the tournament wins the headline prize. Anyone whose team reaches the semi-final picks up kudos.

Live at `https://wc26-sweepstake.jamesdirs90.workers.dev/`.

## How it works

1. Enter your name. You're assigned the next free slot.
2. Your slot reveals one elite team and one or two underdog teams.
3. The tournament plays out. Results auto-pull from ESPN.
4. Kudos award for each team's progression:
   - Semi-final: 100
   - Reaches the final: 250
   - Tournament winner: 500
5. The entrant whose team wins the tournament takes the headline kudos. Multiple teams in late stages stack.

## Why weighted

A classic random-draw sweepstake punishes people who pull three weak teams. This format guarantees everyone has skin in the late-stages narrative: one team you'll be cheering loud for, one or two outsiders you'll be quietly hoping pull off a miracle.

## Tech

- Vanilla JS, single `index.html`, hosted on Cloudflare Workers Assets
- Firebase Anonymous Auth + Firestore for shared state (same project as the wc26-predictions sibling)
- ESPN unofficial API for fixtures, scores, and DraftKings odds
- PokerStars Fusion design system, dark theme
- No build step, no framework

## Local dev

```
python3 -m http.server 8125 --directory wc26-sweepstake
```

Then visit `http://localhost:8125/`.
