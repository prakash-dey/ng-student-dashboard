# NavGurukul admission — student app

The student-facing admission journey: About pages, registration, aptitude test, two interview rounds, offer and joining.
Phone first (cheap Android, slow networks), English / Hindi / Marathi. The approved design lives in `design-handoff/`
(local only, not in the repo). The app builds without it: the design's tokens, classes, fonts and artwork are copied
into `src/styles/`, `src/assets/fonts/` and `public/media/`.

## Commands

```bash
npm i
npm run dev                         # http://localhost:5173  (add ?designTest=1 for the test hook)
npm run typecheck
# local tooling (scripts/ and design-handoff/ are not in the repo):
node scripts/vt.mjs [filter]        # pixel test vs design-handoff/reference, in Playwright's Linux image (needs Docker + dev server)
node scripts/sheet.mjs <state> [phone|pc]   # contact sheet of one design state across device sizes + layout checks -> .sheets/
node scripts/vals-snapshot.mjs save|check [w h]   # regression net for logic refactors (see below)
```

## How it fits together

```
src/
  main.tsx, app.tsx      entry; picks phone (<900px) or PC layout and feeds the viewport size to the logic
  designTest.ts          dev-only ?designTest=1 hook (window.__setDesignState, today fixed to 2026-10-06)
  i18n/                  all copy (en/hi/mr JSON). landing = About pages, journey = the rest, extra = quiz etc.
  logic/                 state + what every screen shows (no DOM)
    app.ts               AppLogic: timers, navigation (go, walkTo, celebrate, ...), renderVals()
    state.ts             AppState + fresh() — keys match the design so reference/states.json works
    frame.ts             responsive frame: viewport -> frame size, phone content column
    flow.ts              registration order (regFor), progress along the six milestones
    landing/             About pages: layout (phone/desktop) and content
    journey/             one module per area: hud, layout, registration/*, test, rounds, offer, joining, map, steps, dialogs
    data/                static data: states & districts, campuses, sample alumni
  ui/                    Preact components that render the values (one per screen/section)
    Fit.tsx              scales artwork down when a screen is too short (never text)
```

The logic returns plain values (copy, style strings, flags, click handlers) and the components render them; the
style strings are the design's own inline styles, so a screen matches the design exactly at 390×844 and 1440×900.

## Responsive layout

- **Phone & tablet (<900px), all screens:** designed sizes and 18px gutters in a content column (full width,
  centred and capped at 560px on tablets); bottom buttons anchored to the bottom; the flexible middle (Asha, map,
  lists) takes the remaining height. Only artwork shrinks on short screens (`ui/Fit.tsx`, `frame.shrinkBox`),
  never text; content scrolls only when a screen is too short.
- **PC journey:** content box up to 1440px, centred; the panel keeps its width, the stage around it flexes.
- **PC About pages:** composed as one picture, so the page content scales as a whole to fit the screen
  (0.6×–1.25×), with backgrounds full-bleed.
- Navbars always have equal space at both ends, aligned with the content. Minimum frame: 320×600 / 900×640.

Check any screen with `scripts/sheet.mjs`: it flags horizontal overflow, controls off-screen and Asha cut off.

## Offline, tap targets, budgets

- PWA (vite-plugin-pwa, production builds only): the app, fonts and common artwork are cached on the first visit;
  photos and the journey map are cached when first shown. The manifest has no icons yet (needs the app icon artwork).
- Every control is at least 46×46 to the finger: an invisible hit area in `src/styles.css`, so nothing looks different.
- First-load JS is ~85 KB gzipped (budget 150 KB). Photos in the About lists are lazy-loaded.

## Changing the logic safely

`scripts/vals-snapshot.mjs save` records everything `renderVals()` returns for all 98 design states on both devices;
after a refactor, `check` must say `identical`. Then run the pixel test.
