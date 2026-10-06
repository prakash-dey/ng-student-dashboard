// Registration: choose a school (course) and a campus. A school/campus is locked when the student's
// qualification, gender or home state rules it out; the reason is shown on the card.
import { CAMPUSES, CAMPUS_EN, CAMPUS_NAMES, SCHOOLS, type Campus } from '../../data/campuses';
import type { Advance } from '../advance';
import type { Ctx } from '../context';
import { SELECTED } from './choices';

const QUAL_RANK: Record<string, number> = { '12': 1, college: 1, diploma: 1, grad: 2 };
const ROW_COLS = ['#0EA5E9', '#10B981', '#F59E0B'];
const CAMP_COLS = ['#EA580C', '#0EA5E9', '#8B5CF6', '#10B981'];
const ROW_ICONS = ['M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13', 'M3 8h18v11H3zM8 8V5h8v3M3 13h18', 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2'];

export function schoolVals(c: Ctx, advance: Advance) {
  const { s, t, app, sc } = c;
  const li = s.lang === 'en' ? 0 : s.lang === 'hi' ? 1 : 2;

  /** why this campus is closed to the student ('' = open) */
  const campFit = (cp: Campus) => {
    if ((s.gender === 'boy' || s.gender === 'girl') && s.gender !== cp.who) return cp.who === 'boy' ? t.cBoys : t.cGirls;
    if (cp.only && (s.stateName || '').toLowerCase() !== cp.only.toLowerCase()) return t.cRegion;
    return '';
  };
  /** '' when at least one campus offering this course is open to the student */
  const courseFit = (id: string) => {
    const whys = CAMPUSES.filter((cp) => cp.courses.includes(id as never)).map(campFit);
    return whys.some((w) => !w) ? '' : whys[0] || '';
  };

  const qualRank = QUAL_RANK[s.qual ?? ''] ?? 2;
  const noneEligible = qualRank === 0;
  const okIds: string[] = [];
  const schools = SCHOOLS.map((x, idx) => {
    const eduOk = x.need === 'grad' ? qualRank >= 2 : qualRank >= 1, fitWhy = courseFit(x.id);
    const ok = eduOk && !fitWhy;
    if (ok) okIds.push(x.id);
    const sel = s.school === x.id, open = s.openSchool === x.id;
    const dur = x.id === 'bca' ? t.bcaDur : x.dur + t.months;
    return {
      interest: t.interest[idx], name: t.schoolFull[idx], desc: t.schoolDesc[idx], showDesc: sel || open, descStyle: 'font-size:13.5px;font-weight:600;line-height:1.3;color:#475569', d: x.d, open, locked: !ok,
      elig: ok ? t.canJoin : !eduOk ? (x.need === 'grad' ? t.needsGrad : t.needs12) : fitWhy, lockedEdu: !eduOk, lockedFit: eduOk && !!fitWhy,
      nameStyle: 'font-size:14px;font-weight:800;line-height:1.25;color:' + x.c,
      eligStyle: 'font-size:12px;font-weight:800;padding:2px 8px;border-radius:999px;' + (ok ? 'background:#DCFCE7;color:#166534' : 'background:#FEE2E2;color:#991B1B'),
      tile: 'width:56px;height:56px;flex-shrink:0;border-radius:18px;display:flex;align-items:center;justify-content:center;background:' + (ok ? x.c : '#94A3B8') + ';box-shadow:0 4px 0 rgba(0,0,0,.12)',
      chev: 'width:32px;height:32px;flex-shrink:0;border-radius:999px;display:flex;align-items:center;justify-content:center;color:' + x.c + ';background:#F8FAFC;transition:transform .2s;transform:rotate(' + (open ? 180 : 0) + 'deg)',
      style: 'border-radius:22px;overflow:hidden;transition:box-shadow .15s;background:' + (sel ? '#FDF2F8' : ok ? '#FFFFFF' : '#F8FAFC') + ';' + (sel ? 'border:3px solid #F472B6;box-shadow:0 5px 0 #F9A8D4;' : 'border:2px solid ' + (ok ? '#FBCFE8' : '#E2E8F0') + ';box-shadow:0 4px 0 ' + (ok ? '#FBCFE8' : '#E2E8F0') + ';') + (ok ? '' : 'opacity:.7;'),
      rows: [[t.learnL, t.learn[idx]], [t.jobL, t.job[idx]], [t.durL, dur]].map(([label, value], k) => ({
        label, value, d: ROW_ICONS[k], tile: 'width:32px;height:32px;flex-shrink:0;border-radius:10px;display:flex;align-items:center;justify-content:center;background:' + ROW_COLS[k],
      })),
      pick: () => c.act({ openSchool: open ? null : x.id, school: ok ? x.id : null }),
    };
  });

  const curSchool = SCHOOLS.find((x) => x.id === s.school);
  const cityName = (id: string) => { const m = CAMPUS_NAMES[id]; return !m || li === 0 ? CAMPUS_EN[id] || id : m[li + 2]; };
  const campWhy = (cp: Campus) => (cp.courses.includes(s.school as never) ? campFit(cp) : t.cNoCourse);
  const campOk = (id: string) => { const cp = CAMPUSES.find((x) => x.id === id); return !!cp && !campWhy(cp); };
  const cards = CAMPUSES.map((cp, k) => {
    const id = cp.id, why = campWhy(cp), locked = !!why, sel = !locked && s.campus === id, m = CAMPUS_NAMES[id] || ['India', 'भारत', 'भारत'];
    return {
      city: cityName(id), state: m[li] + ' · ' + (cp.who === 'boy' ? t.cBoys : t.cGirls), locked, lockedAttr: locked ? 'true' : 'false', reason: why, ok: !locked,
      near: !locked && !!s.stateName && s.stateName.toLowerCase() === m[0].toLowerCase(),
      tile: 'width:54px;height:54px;flex-shrink:0;border-radius:16px;display:flex;align-items:center;justify-content:center;background:' + (locked ? '#94A3B8' : CAMP_COLS[k % 4]),
      style: 'display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:22px;min-height:78px;' + (locked ? 'cursor:not-allowed;opacity:.6;background:#F1F5F9;' : 'cursor:pointer;') + (sel ? SELECTED : ''),
      pick: () => { if (s.toast || locked) return; c.set({ campus: id }); advance('campus'); },
    };
  });
  // open campuses first
  const campusCards = cards.filter((x) => x.ok).concat(cards.filter((x) => !x.ok));

  // what an edit from the review page has to revisit (see AppLogic.editTarget)
  app._editNeeds = { school: !okIds.includes(s.school as string), campus: !(s.campus && campOk(s.campus)) };
  c.schoolName = curSchool ? t.schoolNames[SCHOOLS.indexOf(curSchool)] : t.schoolNames[1];
  c.campusName = cityName(s.campus || (curSchool ? curSchool.camp[0] : 'Pune'));

  return {
    vals: {
      schools,
      schoolsOk: schools.filter((x) => !x.locked), schoolsNo: schools.filter((x) => x.locked),
      hasSchoolsOk: schools.some((x) => !x.locked), hasSchoolsNo: schools.some((x) => x.locked),
      hasCampus: !!curSchool && curSchool.camp.length > 0, campusChips: [],
      noCampus: sc === 'campus' && campusCards.every((x) => x.locked),
      noneEligible, campusCards,
    },
    /** for the step footer: can the student continue? */
    schoolOk: !!s.school && !noneEligible && okIds.includes(s.school),
    campusOk: !!s.campus && campOk(s.campus),
  };
}
