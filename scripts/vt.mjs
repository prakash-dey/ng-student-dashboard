// Visual test summary: node scripts/vt.mjs [grep] [workers]
// Runs the handoff pixel test and prints one line per screen: status, device, name, differing-pixel ratio.
// The reference screenshots were rendered on Linux, so the test runs in Playwright's Linux image against
// the dev server on the host (start it first: npm run dev). LOCAL=1 runs on this machine instead.
import { execSync } from 'node:child_process';
const [grep = '.', workers = '1'] = process.argv.slice(2);
let out;
const IMAGE = 'mcr.microsoft.com/playwright:v1.63.0-noble'; // keep in step with @playwright/test
const cmd = `npx playwright test -g "${grep}" --workers=${workers} --reporter=json`;
const full = process.env.LOCAL ? cmd
  : `docker run --rm --ipc=host -v "${process.cwd()}:/work" -w /work -e BASE_URL=http://host.docker.internal:5173 ${IMAGE} ${cmd}`;
try { out = execSync(full, { maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'inherit'] }).toString(); }
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
