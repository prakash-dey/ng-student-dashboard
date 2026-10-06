// Offer letter and the joining checklist.
import { joinDay } from '../dates';
import type { Ctx } from './context';

const CHECK_COLS = ['#EC4899', '#0EA5E9', '#F59E0B', '#10B981'];
const CHECK_ICONS = [
  'M9 11a3 3 0 100-6 3 3 0 000 6zM17 11a3 3 0 100-6 3 3 0 000 6zM3 21c.8-3 3-5 6-5s5.2 2 6 5M15 16c2.5 0 4.6 1.6 5.5 5',
  'M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6',
  'M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10M4 16h16M4 16l-1 4M20 16l1 4M8 20h.01M16 20h.01M4 10h16',
  'M6 8h12l-1 13H7zM9 8V6a3 3 0 016 0v2',
];
/** index of the travel item: it opens the travel planner instead of ticking */
const TRAVEL = 2;

/** A decorative 25x25 QR-style pattern (three finder squares + filler) as an SVG path. */
function qrPath() {
  const finder = (x: number, y: number, ox: number, oy: number) => {
    const ax = x - ox, ay = y - oy;
    if (ax < 0 || ay < 0 || ax > 6 || ay > 6) return null;
    return ax === 0 || ay === 0 || ax === 6 || ay === 6 || (ax >= 2 && ax <= 4 && ay >= 2 && ay <= 4);
  };
  let d = '';
  for (let y = 0; y < 25; y++) for (let x = 0; x < 25; x++) {
    const f = finder(x, y, 0, 0) ?? finder(x, y, 18, 0) ?? finder(x, y, 0, 18);
    if (f ?? (x * 7 + y * 13 + x * y) % 5 < 2) d += 'M' + x + ' ' + y + 'h1v1h-1z';
  }
  return d;
}

export function offerVals(c: Ctx) {
  const { s, t, app, locale } = c;
  // the parent-consent item (index 0) is no longer part of the checklist
  const items = t.checks.map(([label, sub], k) => {
    const done = s.checks[k];
    return {
      label, sub, d: CHECK_ICONS[k], done, pressed: done ? 'true' : 'false',
      tile: 'width:50px;height:50px;flex-shrink:0;border-radius:16px;display:flex;align-items:center;justify-content:center;background:' + CHECK_COLS[k],
      box: 'width:34px;height:34px;flex-shrink:0;border-radius:10px;display:flex;align-items:center;justify-content:center;' + (done ? 'background:#10B981;border:2px solid #059669;' : 'background:#FFFFFF;border:2.5px solid #CBD5E1;'),
      style: 'display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:20px;cursor:pointer;' + (done ? 'background:#F0FDF4;border:2px solid #86EFAC;box-shadow:0 4px 0 #BBF7D0;' : 'background:#FFFFFF;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;'),
      toggle: () => {
        if (k === TRAVEL) { app.go('travel'); return; }
        const checks = s.checks.slice();
        checks[k] = !checks[k];
        c.act({ checks });
        if (checks[k]) app.miniWin(k === 1 ? t.docsUp : t.bagPacked);
      },
    };
  }).slice(1);
  const nChecked = s.checks.slice(1).filter(Boolean).length;
  return {
    nChecked,
    vals: {
      fullName: c.fullName, letterBody: t.letterBody, schoolName: c.schoolName, campusName: c.campusName,
      joinDate: joinDay().toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }),
      checkItems: items,
      checkUi: { count: nChecked + '/3', bar: 'height:100%;border-radius:999px;width:' + Math.round((nChecked * 100) / 3) + '%' },
      batchName: t.batch + ' · ' + c.campusName,
      qrPath: qrPath(),
    },
  };
}
