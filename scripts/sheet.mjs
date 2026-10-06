// Responsive contact sheet: node scripts/sheet.mjs <state-name-regex> [phone|pc|all] [outDir]
// Renders each matching state from the design's reference/states.json at a range of device sizes, saves one
// labelled image per state and device class, and prints layout problems found at each size:
//   overflow-x   the page scrolls sideways
//   offscreen       a button/input/link sits (partly) outside the visible frame and is not inside a scroll area
//   asha-offscreen  the visible part of an Asha image is cut off by the screen edge or a clipping container
// Needs the dev server (npm run dev).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const [re = '.', which = 'all', outDir = '.sheets'] = process.argv.slice(2);
const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const SIZES = {
  phone: [[320, 600], [360, 640], [360, 780], [390, 844], [412, 915], [480, 854], [600, 960], [768, 1024]],
  pc: [[900, 700], [1024, 768], [1280, 720], [1366, 768], [1440, 900], [1536, 864], [1920, 1080], [2560, 1440]],
};
const states = JSON.parse(fs.readFileSync('design-handoff/reference/states.json', 'utf8')).filter((s) => new RegExp(re).test(s.name));
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const problems = [];

async function shoot(state, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  await page.goto(BASE + '/?designTest=1');
  await page.waitForFunction(() => typeof window.__setDesignState === 'function');
  await page.evaluate((st) => window.__setDesignState(st), state);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const issues = await page.evaluate(() => {
    const out = [];
    const de = document.documentElement;
    if (de.scrollWidth > de.clientWidth + 1) out.push(`overflow-x ${de.scrollWidth - de.clientWidth}px`);
    const root = document.querySelector('#app > div');
    const R = root.getBoundingClientRect();
    const scrolls = (el) => { for (let p = el.parentElement; p && p !== root; p = p.parentElement) { const o = getComputedStyle(p); if (/(auto|scroll)/.test(o.overflowY + o.overflowX)) return true; } return false; };
    // Asha must be fully visible: measure the opaque part of each Asha image (its alpha bounding box)
    const alphaBox = (img) => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const g = c.getContext('2d'); g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, c.width, c.height).data;
      let x0 = c.width, y0 = c.height, x1 = 0, y1 = 0;
      for (let y = 0; y < c.height; y += 2) for (let x = 0; x < c.width; x += 2) if (d[(y * c.width + x) * 4 + 3] > 40) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      return { x0: x0 / c.width, x1: x1 / c.width, y0: y0 / c.height, y1: y1 / c.height };
    };
    for (const img of root.querySelectorAll('img[src*="asha"]')) {
      if (!img.complete || !img.naturalWidth) continue;
      let hidden = false; for (let p = img; p && p !== root; p = p.parentElement) { if (+getComputedStyle(p).opacity === 0) { hidden = true; break; } }
      if (hidden || scrolls(img)) continue;
      const r = img.getBoundingClientRect(), a = alphaBox(img);
      const vis = { l: r.left + a.x0 * r.width, r: r.left + a.x1 * r.width, t: r.top + a.y0 * r.height, b: r.top + a.y1 * r.height };
      // clipped by an overflow:hidden ancestor counts as off-screen too
      let clip = { l: R.left, r: R.right, t: R.top, b: R.bottom };
      for (let p = img.parentElement; p && p !== root; p = p.parentElement) {
        if (getComputedStyle(p).overflow !== 'visible') { const q = p.getBoundingClientRect(); clip = { l: Math.max(clip.l, q.left), r: Math.min(clip.r, q.right), t: Math.max(clip.t, q.top), b: Math.min(clip.b, q.bottom) }; }
      }
      const over = Math.max(clip.l - vis.l, vis.r - clip.r, clip.t - vis.t, vis.b - clip.b);
      if (over > 2) out.push(`asha-offscreen ${Math.round(over)}px [${Math.round(vis.l)},${Math.round(vis.t)} → ${Math.round(vis.r)},${Math.round(vis.b)}]`);
    }
    for (const el of root.querySelectorAll('button, input, select, a')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const vis = getComputedStyle(el);
      if (vis.visibility === 'hidden' || +vis.opacity === 0) continue;
      let hidden = false; for (let p = el; p && p !== root; p = p.parentElement) { const st = getComputedStyle(p); if (+st.opacity === 0 || st.pointerEvents === 'none' && p !== el) { hidden = true; break; } }
      if (hidden) continue;
      if ((r.left < R.left - 1 || r.right > R.right + 1 || r.top < R.top - 1 || r.bottom > R.bottom + 1) && !scrolls(el)) {
        const label = (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 30);
        out.push(`offscreen "${label}" [${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)}]`);
      }
    }
    return out;
  });
  const shot = await page.screenshot({ fullPage: true });
  await page.close();
  return { shot, issues };
}

for (const s of states) {
  for (const dev of which === 'all' ? ['phone', 'pc'] : [which]) {
    const tiles = [];
    for (const [w, h] of SIZES[dev]) {
      const { shot, issues } = await shoot(s.state, w, h);
      tiles.push({ w, h, src: 'data:image/png;base64,' + shot.toString('base64'), issues });
      for (const i of issues) problems.push(`${s.name} ${dev} ${w}x${h}: ${i}`);
    }
    const TH = dev === 'phone' ? 560 : 330; // thumbnail height
    const html = `<body style="margin:0;background:#334155;font:13px sans-serif;color:#fff;display:flex;flex-wrap:wrap;gap:14px;padding:14px;width:${dev === 'phone' ? 2000 : 2400}px">
      ${tiles.map((t) => `<figure style="margin:0"><figcaption style="padding:0 0 4px;color:${t.issues.length ? '#FCA5A5' : '#fff'}">${t.w}×${t.h}${t.issues.length ? ' ⚠ ' + t.issues.length : ''}</figcaption>
      <img src="${t.src}" style="height:${TH}px;display:block;outline:1px solid #94A3B8"></figure>`).join('')}</body>`;
    const page = await browser.newPage({ viewport: { width: dev === 'phone' ? 2028 : 2428, height: 600 } });
    await page.setContent(html);
    await page.waitForLoadState('load');
    const file = path.join(outDir, `${s.name}-${dev}.png`);
    await page.screenshot({ path: file, fullPage: true });
    await page.close();
    console.log('sheet', file);
  }
}
await browser.close();
console.log(problems.length ? '\n' + problems.join('\n') : '\nno layout problems found');
