// Registration: tap-one choice grids (gender, qualification, year, attendance) and category chips.
import type { AppState } from '../../state';
import type { Advance } from '../advance';
import type { Ctx } from '../context';
import { FS } from '../../styles';

const PALETTE = [['#E0F2FE', '#0284C7', '#7DD3FC'], ['#FCE7F3', '#DB2777', '#F9A8D4'], ['#FEF3C7', '#D97706', '#FCD34D'], ['#DCFCE7', '#16A34A', '#86EFAC'], ['#EDE9FE', '#7C3AED', '#C4B5FD']];
const HAIR_BOY = 'M26 28 Q26 16 38 16 Q50 16 50 28 Q46 21 38 21 Q30 21 26 28Z';
const HAIR_GIRL = 'M24 40 Q20 16 38 16 Q56 16 52 40 Q50 22 38 22 Q26 22 24 40Z';
const ICON = {
  book: 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13M8 7h7',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6',
  diploma: 'M6 3h9l4 4v14H6zM15 3v4h4M9 12h6M9 16h6',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  college: 'M3 21h18M5 21V10l7-5 7 5v11M12 5V2h4v2h-4M10 21v-5h4v5M8 12h2M14 12h2',
  exams: 'M2 9l10-6 10 6M4 14h16M6 14v7M18 14v7M9 14v-3h6v3',
};
/** the "selected" look shared by choice tiles and campus cards */
export const SELECTED = 'border:3px solid #F472B6;background:#FDF2F8;box-shadow:0 6px 0 #F9A8D4;';

/** [value, label, kind, icon path / glyph / hair path] */
type Item = [string, string, 'avatar' | 'icon' | 'glyph', string];
/** `select`: tapping only selects (no step-complete toast / auto-advance); the footer button moves on. */
interface ChoiceSet { key: keyof AppState; items: Item[]; cols?: number; small?: boolean; select?: boolean }

function choiceSets(c: Ctx): Partial<Record<string, ChoiceSet>> {
  const { t } = c;
  return {
    gender: { key: 'gender', items: [['boy', t.boy, 'avatar', HAIR_BOY], ['girl', t.girl, 'avatar', HAIR_GIRL], ['other', t.other, 'avatar', HAIR_BOY]] },
    qual: { key: 'qual', items: [['12', t.q12, 'glyph', '12'], ['college', t.qCollege, 'icon', ICON.book], ['grad', t.qGrad, 'icon', ICON.cap], ['diploma', t.qDiploma, 'icon', ICON.diploma]] },
    year: { key: 'year', items: [['1', t.yearOpts[0], 'glyph', '1'], ['2', t.yearOpts[1], 'glyph', '2'], ['3', t.yearOpts[2], 'glyph', '3'], ['4', t.yearOpts[3], 'glyph', '4'], ['final', t.yearOpts[4], 'icon', ICON.flag]] },
    // before the screening test (not a registration step): the language the questions come in
    testLang: { key: 'testLang', select: true, items: [['en', 'English', 'glyph', 'Aa'], ['hi', 'हिंदी', 'glyph', 'अ'], ['mr', 'मराठी', 'glyph', 'म']] },
    attend: { key: 'attend', cols: 1, small: true, items: [['regular', t.attends[0], 'icon', ICON.college], ['exams', t.attends[1], 'icon', ICON.exams]] },
  };
}

export function choicesVals(c: Ctx, advance: Advance) {
  const { s, t, D, sc } = c;
  const cs = choiceSets(c)[sc];
  const choices = !cs ? [] : cs.items.map(([value, label, kind, art], idx) => {
    const pal = PALETTE[idx % 5], sel = s[cs.key] === value;
    return {
      label, isAvatar: kind === 'avatar', isIcon: kind === 'icon', isGlyph: kind === 'glyph', d: art, glyph: art, hair: art,
      bg: pal[0], fg: pal[1], ring: pal[2], sel,
      labelStyle: "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;color:#0F172A;text-align:center;" + (cs.small ? 'font-size:' + FS.bodyL + ';line-height:1.25;padding:0 10px' : 'font-size:' + FS.label + ';line-height:1.15'),
      tile: 'width:' + (D ? 72 : 64) + 'px;height:' + (D ? 72 : 64) + 'px;border-radius:20px;background:' + pal[0] + ';display:flex;align-items:center;justify-content:center',
      style: 'position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px 6px 14px;border-radius:24px;cursor:pointer;min-height:' + (cs.items.length === 3 ? 150 : D ? 150 : 132) + 'px;' + (sel ? SELECTED : ''),
      pick: () => {
        if (s.toast) return;
        if (cs.select) { c.act({ [cs.key]: value }); return; }
        c.set({ [cs.key]: value });
        advance(sc, value);
      },
    };
  });
  return {
    hasChoices: !!cs,
    choices,
    choiceGrid: cs ? 'display:grid;grid-template-columns:repeat(' + (cs.cols || (cs.items.length === 3 ? 3 : 2)) + ',minmax(0,1fr));gap:12px' : '',
    catChips: t.cats.map((label, idx) => {
      const sel = s.cat === idx;
      return {
        label,
        pick: () => { if (s.toast) return; c.set({ cat: idx }); advance('category'); },
        style: 'min-height:54px;padding:0 20px;border-radius:999px;cursor:pointer;font-weight:800;font-size:' + FS.bodyL + ';' + (sel ? 'background:#FCE7F3;color:#9D174D;border:2px solid #EC4899;box-shadow:0 4px 0 #F9A8D4;' : 'background:#FFFFFF;color:#0F172A;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;'),
      };
    }),
  };
}
