// Values for the About pages (zone 'landing', template holes LD.*).
import { I18N } from '../../i18n';
import type { AppLogic } from '../app';
import { langChips, leaves } from '../common';
import { landingLayout } from './layout';
import { campusCards, courseSection, freeCards, stories } from './content';
import { FS } from '../styles';

const LEAF_COLORS = ['#10B981', '#34D399', '#059669', '#F59E0B', '#FBBF24', '#86EFAC'];

export function landingVals(app: AppLogic) {
  const s = app.state, D = app.DEVICE === 'desktop', f = app.frame();
  const t = I18N[s.lang].landing;
  const set = (patch: object) => app.setState(patch);
  const page = (n: number) => () => set({ page: n, course: null });
  return {
    L: landingLayout(D, f, s.page, s.course !== null && s.page === 3), t,
    leaves: leaves(D ? 18 : 12, LEAF_COLORS, f.W, 16),
    langChips: langChips(s.lang, (lang) => set({ lang }), D ? [46, 36, 8] : [38, 32, 8], D ? '14px' : FS.bodyS, ''),
    commonChips: t.x.common,
    cards: freeCards(t, D),
    ...courseSection(t, s, D, set),
    campuses: campusCards(t),
    ...stories(t),
    isP1: s.page === 1, isP2: s.page === 2, isP3: s.page === 3, isP4: s.page === 4, isP5: s.page === 5, isP6: s.page === 6,
    isSoft: s.page > 1,
    // "Tap here!" pill: only after 30s without any input
    showNudge: s.nudge,
    walking: false, standing: s.phase >= 1, showCta: s.phase >= 2 && s.page === 1, showBird: true,
    reveal: () => set({ page: 2 }),
    goP1: () => set({ page: 1 }),
    goP2: page(2), goP3: page(3), goP4: page(4), goP5: page(5), goP6: page(6),
    closeSheet: () => set({ course: null }),
    // last About page -> start the journey; top-bar Login skips straight to registration
    replay: () => app.enterJourney(),
    login: () => app.enterLogin(),
    loginLabel: I18N[s.lang].extra.login,
    loginStyle: 'flex-shrink:0;height:' + (D ? 44 : 40) + 'px;padding:0 ' + (D ? 22 : 14) + "px;border-radius:999px;border:none;background:linear-gradient(135deg,#E91E63,#BE185D);color:#FFFFFF;box-shadow:0 3px 0 #9D174D;cursor:pointer;font-family:'Plus Jakarta Sans','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:" + (D ? '16px' : FS.bodyS),
  };
}
