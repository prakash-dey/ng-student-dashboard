// Regression net for refactoring the logic: node scripts/vals-snapshot.mjs [save|check] [w h]
// Runs DesignLogic for every state in the design's reference/states.json, on phone and desktop, and records
// everything renderVals() returns (functions as "[fn]"). `save` writes .cache/vals.json, `check` compares
// against it and lists the first differences. Optional w h: viewport to compute layouts for (default: design size).
import { createServer } from 'vite';
import fs from 'node:fs';

const [mode = 'check', vw, vh] = process.argv.slice(2);
const FIXED_NOW = new Date(2026, 9, 6, 10, 0, 0).getTime();
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...a) { if (a.length) super(...a); else super(FIXED_NOW); }
  static now() { return FIXED_NOW; }
};
globalThis.window = globalThis;
globalThis.matchMedia = () => ({ matches: false });

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' });
const { AppLogic } = await server.ssrLoadModule('/src/logic/app.ts');
const { fresh } = await server.ssrLoadModule('/src/logic/state.ts');
const states = JSON.parse(fs.readFileSync('design-handoff/reference/states.json', 'utf8'));

const plain = (o, seen = new Set()) => {
  if (typeof o === 'function') return '[fn]';
  if (!o || typeof o !== 'object') return o;
  if (seen.has(o)) return '[cycle]';
  seen.add(o);
  const r = Array.isArray(o) ? o.map((x) => plain(x, seen)) : Object.fromEntries(Object.keys(o).sort().map((k) => [k, plain(o[k], seen)]));
  seen.delete(o);
  return r;
};

const out = {};
for (const dev of ['phone', 'desktop']) {
  for (const s of states) {
    const logic = new AppLogic(dev);
    const [w, h] = vw ? [+vw, +vh] : dev === 'phone' ? [390, 844] : [1440, 900];
    logic.setView(w, h);
    const st = JSON.parse(JSON.stringify(s.state), (_k, v) => (v === '__now' ? FIXED_NOW : v));
    logic.state = { ...fresh(), ...st };
    out[`${dev}/${s.name}`] = plain(logic.renderVals());
  }
}
await server.close();

fs.mkdirSync('.cache', { recursive: true });
const file = `.cache/vals${vw ? `-${vw}x${vh}` : ''}.json`;
if (mode === 'save') {
  fs.writeFileSync(file, JSON.stringify(out));
  console.log('saved', Object.keys(out).length, 'states to', file);
} else {
  const base = JSON.parse(fs.readFileSync(file, 'utf8'));
  const diffs = [];
  // Values removed on purpose (unreachable screens / features removed from the design). New keys are ignored.
  const REMOVED = /\.(L\.(bareLogo|bareLogoImg|coinCls|jump)|LD\.speakNow|alumQuote|alumni|companies|famStats|youFrame|offerGrid|offerTiles|showLangHint|langCards|is\.(about1|about2|lang|fields|choice)|on\.bareLogo|hasJump|jumps|openJump|closeJump|xp|xpCls|xpGain|voice\w*|listenStyle|speakAsk|toggleVoice)$|\.schools(Ok|No)?\.\d+\.listen$|\.toastXp$/;
  const cmp = (a, b, p) => {
    if (diffs.length > 25) return;
    if (a === undefined || REMOVED.test(p)) return;
    if (JSON.stringify(a) === JSON.stringify(b)) return;
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) cmp(a[k], b[k], p + '.' + k);
    } else diffs.push(`${p}\n    was: ${JSON.stringify(a)?.slice(0, 160)}\n    now: ${JSON.stringify(b)?.slice(0, 160)}`);
  };
  // compare what each state shows: the About pages (LD) in the landing zone, the journey otherwise
  const shown = (v, landing) => (landing ? { LD: v.LD, W: v.W, H: v.H, inLanding: v.inLanding } : { ...v, LD: undefined });
  for (const k of Object.keys(base)) {
    const landing = base[k].inLanding;
    cmp(shown(base[k], landing), shown(out[k], landing), k);
  }
  console.log(diffs.length ? diffs.join('\n') : `identical (${Object.keys(out).length} states)`);
  process.exitCode = diffs.length ? 1 : 0;
}
