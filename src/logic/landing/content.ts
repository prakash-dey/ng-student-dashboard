// About pages content: what each page lists (cards, courses + course sheet, campuses, success stories).
import type { Copy } from '../../i18n';
import type { AppState } from '../state';
import { FONT_BODY, FS } from '../styles';
import { ALUMNI, ALUMNI_PHOTOS, CAMPUS_PHOTOS, COMPANIES, COURSE_CHIP, LANDING_CAMPUSES, courses } from '../data/landing';

type T = Copy['landing'];
type Set = (patch: Partial<AppState>) => void;

/** Page 2: what is free (laptop, food, stay, wifi, job support). */
export function freeCards(t: T, D: boolean) {
  const cols = ['#0EA5E9', '#F59E0B', '#EC4899', '#8B5CF6', '#10B981'];
  return t.cards.map((label, k) => {
    const wide = k === 4;
    const span = D ? (k < 3 ? 'span 2' : 'span 3') : wide ? 'span 2' : 'span 1';
    return {
      label, emo: ['💻', '', '🏠', '', '💼'][k], isImg: k === 1, isWifi: k === 3, isEmo: k !== 1 && k !== 3,
      tick: 'position:absolute;right:8px;top:8px;width:' + (D ? 50 : 46) + 'px;height:' + (D ? 50 : 46) + 'px;box-sizing:border-box;border-radius:999px;border:1.5px solid #86C79B;background:#ECFDF3;padding:2px;display:flex;box-shadow:0 1px 3px rgba(21,128,61,.12);animation-delay:' + (0.75 + 0.14 * k).toFixed(2) + 's',
      style: 'position:relative;grid-column:' + span + ';display:flex;flex-direction:' + (wide && !D ? 'row' : 'column') + ';align-items:center;justify-content:center;gap:' + (wide && !D ? 14 : 6) + 'px;min-height:' + (D ? 170 : wide ? 86 : 122) + 'px;padding:' + (wide && !D ? '12px 58px 12px 12px' : '12px') + ';box-sizing:border-box;border-radius:24px;background:#FFFFFF;border:2.5px solid ' + cols[k] + '55;box-shadow:0 6px 0 ' + cols[k] + '33;animation-delay:' + (0.5 + 0.14 * k).toFixed(2) + 's',
    };
  });
}

/** Page 3: course cards and, when one is open, the course sheet with its three tabs. */
export function courseSection(t: T, s: AppState, D: boolean, set: Set) {
  const list = courses(t.x);
  const courseCards = list.map((c, k) => ({
    name: c.name, code: c.full, dur: c.dur, need: c.need, d: c.d, iconSize: D ? 34 : 28, aria: c.full,
    open: () => set({ course: k, tab: 0 }),
    tile: 'width:' + (D ? 68 : 54) + 'px;height:' + (D ? 68 : 54) + 'px;border-radius:' + (D ? 22 : 18) + 'px;display:flex;align-items:center;justify-content:center;background:' + c.c + ';box-shadow:0 5px 0 rgba(0,0,0,.14)',
    codeStyle: FONT_BODY + 'font-weight:800;line-height:1.25;text-align:center;font-size:' + (D ? '13.5px' : FS.caption) + ';padding:3px 9px;border-radius:12px;background:' + c.bg + ';color:' + c.c,
    more: 'display:flex;align-items:center;gap:2px;font-size:' + (D ? '14px' : FS.caption) + ';font-weight:800;color:' + c.c,
    style: 'display:flex;flex-direction:column;align-items:center;gap:' + (D ? 8 : 5) + 'px;padding:' + (D ? '20px 12px 16px' : '12px 6px 10px') + ';border-radius:24px;cursor:pointer;background:#FFFFFF;border:2.5px solid ' + c.c + '44;box-shadow:0 6px 0 ' + c.c + '33;animation-delay:' + (0.35 + 0.12 * k).toFixed(2) + 's',
  }));
  const cur = s.course === null ? null : list[s.course];
  if (!cur) return { courseCards, sheet: { tabs: [], rows: [] }, hasSheet: false };
  const tabIcons = ['M9 11a3 3 0 100-6 3 3 0 000 6zM3 21c.8-3 3-5 6-5s5.2 2 6 5M16 11l2 2 4-4', 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13', 'M3 8h18v11H3zM8 8V5h8v3M3 13h18'];
  const sheet = {
    full: cur.full, sub: cur.sub, d: cur.d, dur: cur.dur, campus: cur.campus,
    subStyle: 'font-size:' + FS.bodyS + ';font-weight:800;color:' + cur.c,
    tile: 'width:56px;height:56px;flex-shrink:0;border-radius:18px;display:flex;align-items:center;justify-content:center;background:' + cur.c,
    tabs: t.x.tabs.map((label, k) => {
      const on = s.tab === k;
      return { label, d: tabIcons[k], sel: on, pick: () => set({ tab: k }),
        style: 'display:flex;flex-direction:column;align-items:center;gap:2px;min-height:58px;padding:6px 2px;border:none;border-radius:14px;cursor:pointer;' + FONT_BODY + 'font-weight:800;font-size:' + FS.caption + ';line-height:1.15;' + (on ? 'background:#FFFFFF;color:' + cur.c + ';box-shadow:0 2px 8px rgba(15,23,42,.14);' : 'background:transparent;color:#64748B;') };
    }),
    rows: [cur.elig, cur.learn, cur.jobs][s.tab].map((text, k) => ({
      text, dot: 'width:26px;height:26px;flex-shrink:0;border-radius:999px;display:flex;align-items:center;justify-content:center;background:' + cur.c,
      style: 'display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:16px;background:' + cur.bg + '88;animation-delay:' + (0.05 * k).toFixed(2) + 's',
    })),
  };
  return { courseCards, sheet, hasSheet: true };
}

/** Page 4: campus cards. */
export function campusCards(t: T) {
  return LANDING_CAMPUSES.map((c, k) => ({
    name: t.c4.names[k], photo: CAMPUS_PHOTOS[k], whoLabel: c.boys ? t.c4.boys : t.c4.girls,
    who: 'position:absolute;left:12px;top:12px;padding:4px 12px;border-radius:999px;color:#FFFFFF;font-weight:800;line-height:1.3;font-size:' + FS.bodyS + ';box-shadow:0 3px 10px rgba(15,23,42,.3);background:' + (c.boys ? '#1D4ED8' : '#BE185D'),
    chips: c.courses.map((code) => ({
      label: code === 'BCA' ? t.c4.bca : code + ' · ' + t.x.names[COURSE_CHIP[code][2]],
      style: 'font-size:' + FS.caption + ';font-weight:600;line-height:1.3;padding:4px 10px;border-radius:999px;white-space:nowrap;background:#F1F5F9;color:#334155',
    })),
    note: c.note === undefined ? '' : t.c4.only[c.note], hasNote: c.note !== undefined,
  }));
}

/** Page 5: alumni stories (two marquee rows) and hiring companies. */
export function stories(t: T) {
  const alumni = ALUMNI.map((a, k) => ({
    name: a[0], company: a[1], logoText: a[2], photo: ALUMNI_PHOTOS[a[7]], salary: a[6],
    quote: '“' + t.c5.quotes[k] + '”', quote2: '“' + t.c5.quotes2[k] + '”',
    joined: t.c5.months[a[4][0]] + ' ' + a[4][1], placed: t.c5.months[a[5][0]] + ' ' + a[5][1],
    logo: "width:22px;height:22px;flex-shrink:0;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:14px;line-height:1;background:" + a[3],
  }));
  const companies = COMPANIES.map((c) => ({
    name: c[0], letter: c[1],
    logo: "width:30px;height:30px;flex-shrink:0;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-family:'Baloo 2',sans-serif;font-weight:800;line-height:1;font-size:17px;background:" + c[2],
  }));
  return { alumniA: alumni.concat(alumni), alumniB: alumni.slice(3).concat(alumni, alumni.slice(0, 3)), companies };
}
