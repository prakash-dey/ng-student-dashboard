# NavGurukul student journey — design handoff

Put this whole folder in the root of your new project (keep the name `design-handoff/` or move the pieces; `CLAUDE.md` must sit in the project root).

| Path | What it is |
|---|---|
| `CLAUDE.md` | Rules Claude Code reads automatically. |
| `reference/phone`, `reference/pc` | 98 screenshots each of the final design. |
| `reference/states.json` | The app state behind each screenshot. |
| `design/phone.dc.html`, `pc.dc.html` | Design source (markup, styles, logic). |
| `design/design.css` | All classes and animations, ready to copy. |
| `tokens.css` | Colours, fonts, radii, shadows, motion. |
| `i18n/*.json` | All text in English, Hindi, Marathi. |
| `assets/` | Artwork + self-hosted fonts. |
| `tests/visual.spec.ts`, `playwright.config.ts` | Pixel comparison test. |

Live design: https://claude.ai/artifact/Pt4ro7YqZtCySjAWrqN2D5

## Things to know
- The PC screenshots come as separate zips (`navgurukul-pc-screenshots-*.zip`). Unzip each one in the same place as the main zip; they fill `design-handoff/reference/pc/`.
- Screenshots were taken with animations switched off (reduced motion), on 2026-10-06. Dates and countdowns in them come from that day.
- The black "Tap here!" pill is part of the design: it shows above the main button whenever that button is enabled.
- Emoji (e.g. on the call and travel screens) are drawn by the device, so they look different on each phone and will not match the screenshots exactly. For an exact match everywhere, replace them with image files.
- Alumni names, companies and salaries on the "2000+ Dreams" page are placeholders. Replace with real, approved data before launch.
- `hi-*` and `mr-*` screenshots cover only four screens per language; check the rest by eye.
