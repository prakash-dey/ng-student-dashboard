# NavGurukul student admission app — build rules

You are building the student-facing admission journey for NavGurukul. The design is finished and approved.
**Your job is to reproduce it exactly, not to redesign it.**

## Who uses this
Students from remote parts of India, on cheap Android phones, on slow or patchy networks, often with weak English.
Languages: English, Hindi, Marathi. Phone first; PC is the second layout.

## Source of truth (in this order)
1. `reference/phone/*.png` (390×844) and `reference/pc/*.png` (1440×900) — what every screen must look like.
2. `design/phone.dc.html` and `design/pc.dc.html` — the design source: exact markup, inline styles, positions, and all logic
   (`fresh()` = state shape, `regFor()` = registration step order, `renderVals()/jvVals()/ldVals()` = what each screen shows).
   The format is HTML with `{{holes}}`, `<sc-if>` (conditional) and `<sc-for>` (loop). Read it, port it; it does not run on its own.
3. `design/design.css` — every CSS class and keyframe, verbatim. Copy it in unchanged.
4. `tokens.css` — colours, fonts, radii, shadows, motion curves.
5. `i18n/en.json`, `hi.json`, `mr.json` — all copy. `landing` = About pages, `journey` = everything after.
6. `assets/` — all artwork and self-hosted fonts (`assets/fonts.css`).

If the PNG and the source ever disagree, the PNG wins. If something is not covered, ask; do not invent.

## Hard rules
- Do not change any colour, size, spacing, radius, shadow, font, copy, icon, or animation timing. Take values from the source, not from memory.
- Do not add screens, fields, buttons, or features that are not in the design. Specifically, these were removed on purpose and must not come back:
  coins/XP, a "jump to" button, a volume/listen button, any voice or text-to-speech, a PIN-code field, a language-selection page,
  Asha walking in or floating on the About pages.
- Address is two searchable dropdowns: State, then District (district list depends on state).
- The bird (`assets/bird.webp`, 6-frame sprite) is the step-complete icon. Asha sprites: `asha-walk.webp` is 8 frames, `asha-idle.webp` is 1.
- All copy comes from `i18n/*.json`. No hard-coded strings.
- Fonts are self-hosted from `assets/fonts/`. No Google Fonts or any other third-party request at runtime.
- Respect `prefers-reduced-motion` exactly as `design.css` does.

## Stack
Vite + Preact (`preact/compat`) + TypeScript + Tailwind (theme mapped from `tokens.css`), CSS keyframes + WebP sprites for animation
(no animation library), `vite-plugin-pwa` for offline shell, IndexedDB for saving progress locally, journey state decided by the server.
The existing staff dashboard (`navgurukul/Admission-Dashboard`) is a separate app; reuse its REST API, do not merge into it.

Budgets: first load under 150 KB JS gzipped, usable on 2G/3G, images lazy-loaded, every tap target at least 46 px high.

## Layout at other screen sizes
The design is drawn at 390×844 and 1440×900. Use the phone layout below 900 px wide and the PC layout from 900 px up.
Phone: keep 390 px as the design width and let the content column stretch (side padding stays the same); bottom buttons stay pinned to the bottom.
PC: centre the 1440 design; scale down proportionally on smaller laptops. Never show a horizontal scrollbar.

## Test hook (required)
In dev builds only, when the URL has `?designTest=1`, expose:
```ts
window.__setDesignState(state: Partial<AppState>)   // reset to fresh(), then apply `state`, then render
```
Keep the state keys the same as the design's `fresh()` so `reference/states.json` works unchanged.
In this mode, fix "today" to **2026-10-06** so dates and countdowns match the screenshots.

## How to check your work
```
npm i -D @playwright/test && npx playwright install chromium
npm run dev                      # app on http://localhost:5173
npx playwright test              # compares all 98 screens × 2 sizes with reference/
npx playwright show-report       # see side-by-side diffs
```
A screen passes when under 1% of pixels differ. **Never run with `--update-snapshots`** — that overwrites the design.
A screen is not done until its test passes on both phone and pc.

## Order of work
1. Scaffold, `tokens.css`, `design.css`, fonts, i18n loader, the test hook, the visual test.
2. Shell: top bar (logo, EN/हिं/मरा, Login), progress trail, Asha + speech bubble, bottom buttons, dialogs, step-complete bird.
3. About pages 1–5 (`landing-*`), including the course sheet with its three tabs.
4. Tour, then registration steps in `regFor()` order, then review.
5. Map, test, interviews (lr, cfr), offer, checklist, consent, travel, WhatsApp, the six celebrations, history.
6. Wire to the real API, then offline/PWA.
Work one screen at a time: build → run its test → fix until it passes → next.
