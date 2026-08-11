# HDC Trivia Challenge

Big-screen trivia game for the HDC Planning Division — 50 questions on Maldives urban planning & environment.

Static site, no build step.

## How to run an event

1. Open the site on the projector PC and click **Big Screen** (`#display`).
2. Open the site in another tab/window on the same computer and click **Host Controls** (`#admin`).
3. The two views sync via `BroadcastChannel` + `localStorage` (same browser, same machine).
4. Host sets team names, starts the game, enters each team's paddle answer, reveals, and advances.

## Files

- `index.html` — the whole app (vanilla JS)
- `questions.json` — 50 questions (generated from the trivia CSV)
- `logo.png` — HDC logo
