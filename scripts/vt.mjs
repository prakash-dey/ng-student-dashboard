// Visual test summary: node scripts/vt.mjs [grep] [workers]
// Runs the handoff pixel test and prints one line per screen: status, device, name, differing-pixel ratio.
import { execSync } from 'node:child_process';
const [grep = '.', workers = '1'] = process.argv.slice(2);
let out;
try { out = execSync(`npx playwright test -g "${grep}" --workers=${workers} --reporter=json`, { maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }).toString(); }
catch (e) { out = e.stdout.toString(); }
const rep = JSON.parse(out);
const rows = [];
const walk = (s, dev) => {
  for (const sp of s.specs ?? []) for (const t of sp.tests) {
    const r = t.results.at(-1);
    const m = /([\d]+) pixels \(ratio ([\d.]+)/.exec(r?.error?.message ?? '');
    rows.push({ dev, name: sp.title, ok: r?.status === 'passed', px: m ? +m[1] : 0, err: !m && r?.status !== 'passed' ? (r?.error?.message ?? '').split('\n')[0].slice(0, 90) : '' });
  }
  for (const c of s.suites ?? []) walk(c, ['phone', 'pc'].includes(c.title) ? c.title : dev);
};
rep.suites.forEach((s) => walk(s, ''));
const total = { phone: 390 * 844, pc: 1440 * 900 };
for (const r of rows.sort((a, b) => a.ok - b.ok || b.px / total[b.dev] - a.px / total[a.dev]))
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.dev.padEnd(5)} ${r.name.padEnd(28)} ${r.px ? ((100 * r.px) / total[r.dev]).toFixed(2) + '%' : ''} ${r.err}`);
const pass = rows.filter((r) => r.ok).length;
console.log(`\n${pass}/${rows.length} passed`);
