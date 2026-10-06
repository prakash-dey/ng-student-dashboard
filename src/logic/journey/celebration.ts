// The six celebrations (registered, test passed, both rounds, selected, joined campus) and the badge shelf.
import { ROUND_SCREENS, TEST_SCREENS } from '../flow';
import type { Celebration } from '../state';
import type { Ctx } from './context';

/** Badge colours [main, light] and icon, one per milestone. */
const BADGES: [string, string, string][] = [
  ['#059669', '#D1FAE5', 'M12 22V12M12 12C12 7 8 5 4 5c0 4 3 7 8 7zm0 0c0-4 3-7 8-7 0 5-4 7-8 7'],
  ['#E91E63', '#FCE7F3', 'M13 2L4 14h7l-1 8 9-12h-7z'],
  ['#0284C7', '#E0F2FE', 'M4 5h16v10H4zM2 19h20'],
  ['#7C3AED', '#EDE9FE', 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z'],
  ['#D97706', '#FEF3C7', 'M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.8 5.7 21.1l1.5-7L2 9.3l7-.8z'],
  ['#BE185D', '#FFF1F2', 'M3 10l9-6 9 6M5 10v10h14V10M10 20v-5h4v5'],
];
const CEL_BADGES: Record<Celebration, number> = { reg: 1, test: 2, lr: 3, cfr: 4, sel: 5, campus: 6 };

/** How many badges the student has at this point of the journey. */
function badgesEarned(c: Ctx) {
  const { s, sc } = c;
  if (sc === 'cel') return CEL_BADGES[s.cel ?? 'reg'];
  if (sc === 'tour') return 0;
  if (sc === 'map' || sc === 'history') return [1, 2, 3, 4][s.lvl - 1];
  if (c.isReg) return 0;
  if (TEST_SCREENS.includes(sc)) return 1;
  if (ROUND_SCREENS.includes(sc)) return c.isLr ? 2 : 3;
  if (['letter', 'checklist', 'whatsapp', 'consent', 'travel'].includes(sc)) return 5;
  return 6;
}

export function celebrationVals(c: Ctx) {
  const { s, t, app, nm } = c;
  const earned = badgesEarned(c);
  /** [pill, title, badge index, button label, button action] */
  const defs: Record<Celebration, [string, string, number, string, () => void]> = {
    reg: [t.celReg, t.tReg + nm + '!', 0, t.seeJourney, () => app.walkTo(1)],
    test: [t.celTest, t.tTest, 1, t.seeJourney, () => app.walkTo(2)],
    lr: [t.celLr, t.tLr, 2, t.seeJourney, () => app.walkTo(3)],
    cfr: [t.celCfr, t.tCfr, 3, t.seeJourney, () => app.walkTo(4)],
    sel: [t.celSel, t.tSel, 4, t.seeLetter, () => app.go('letter')],
    campus: [t.celCampus, t.tCampus + nm + '!', 5, t.myJourney, () => app.go('history')],
  };
  const [pill, title, bi, primaryLabel, primaryOn] = defs[s.cel ?? 'reg'];
  const b = BADGES[bi];
  return {
    shelf: BADGES.map(([c1, c2, d], k) => {
      const got = k < earned;
      return { name: t.badges[k], c1: got ? c1 : '#CBD5E1', c2: got ? c2 : '#F1F5F9', d, svgStyle: got ? '' : 'opacity:.6' };
    }),
    cel: {
      pill, title, primaryLabel, primaryOn, isCampus: s.cel === 'campus',
      badge: { name: t.badges[bi], c1: b[0], c2: b[1], d: b[2], r1: b[0], r2: '#9D174D' },
      hasChips: s.cel === 'sel' || s.cel === 'test',
      chips: s.cel === 'sel' ? [c.schoolName, c.campusName] : s.cel === 'test' ? [s.score + '/5'] : [],
    },
    /** campus celebration: the student's own Hall of Fame frame */
    hallLine: t.hallYou1 + c.fullName + t.hallYou2,
  };
}
