# Kanji Flashcard
A simple project i did to practice javascript. You can practice N5 Kanji, Hiragana and Katakana with quick hints and progress tracking using this program.

![Dashboard screenshot](https://github.com/user-attachments/assets/f7559b73-acb9-4278-8831-39f159427677)

## Overview

This small web app is a focused study tool to help you review basic Japanese characters. It supports:

- Deck selection (Kanji, Hiragana, Katakana)
- Shuffled review order per deck
- Hints for kanji (via KanjiAPI) and readings for kana
- Per-deck progress tracking and a session summary with score
- Daily counters and a streak tracker
- Local persistence using `localStorage`

## Demo

Card view (back revealed):

![Card screenshot](https://github.com/user-attachments/assets/2f7838b3-22be-4e39-ae71-878ab61d091d)

Card with hint:

![Card with hint](https://github.com/user-attachments/assets/7c449109-ba0f-420e-9678-2c4b7d807260)

## Quick start

Open the app in a browser:

- Option A: Double-click `index.html` to open locally (suitable for casual use).
- Option B (recommended for development): serve the folder with a static server:

## Usage

1. Choose a deck from the dashboard.
2. The app shows a card (front). Click "show hint" to reveal readings/meanings.
3. Mark "Don't know" or "Know it" to advance; the app tracks correct/incorrect counts.
4. At the end of the session a summary shows your score. Your progress and score are saved automatically.

## Data & persistence

The app saves progress and stats in the browser `localStorage` under these keys:

- `progress` — object with per-deck indices (kanji/hiragana/katakana)
- `shuffled_kanji`, `shuffled_hiragana`, `shuffled_katakana` — saved deck order
- `currentIndex` — current index in the active deck
- `correct`, `incorrect` — total counters
- `dailyCorrect`, `dailyIncorrect`, `count` — daily counters and reviews
- `score` — last session score (percentage)
- `streak`, `lastActiveDate` — streak tracking

To reset all progress manually, open the browser console and run:

```js
localStorage.clear()
```

Or remove specific keys with `localStorage.removeItem('<key>')`.

## Customize

- Deck contents are defined in `script.js` in the `kanjiDeck`, `hiraganaDeck`, and `katakanaDeck` arrays. Edit these arrays to add/remove characters.
- Kana entries are objects with `{ char, reading }` so the hint shows the reading.

## Development notes

- The app uses plain HTML/CSS/JS (no build step). Use a simple server during development to avoid fetch CORS issues.
- Keep IDs and classnames in the HTML (e.g. `#word_display_front`, `.hint_btn`, `.score_acc`) if you modify the layout — `script.js` depends on these selectors.

## Limitations & TODOs

- No spaced-repetition scheduling algorithm — this is a simple review flow.
- Reset progress UI is left intentionally out (you can add a reset button that clears the keys above).
- review again is not yet implemented

## Acknowledgements

- KanjiAPI (https://kanjiapi.dev) for kanji meanings/readings used in hints.

---