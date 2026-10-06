// Shared inputs for the journey sections. Each section (hud, registration/*, test, rounds, ...) reads this and
// returns the values its screens render; a few derived values other sections need are added along the way.
import { I18N, type Copy } from '../../i18n';
import type { AppLogic } from '../app';
import { regFor } from '../flow';
import type { Frame } from '../frame';
import type { AppState, Screen } from '../state';
import { localeFor } from '../dates';

export type Journey = Copy['journey'];

export interface Ctx {
  app: AppLogic;
  s: AppState;
  t: Journey;
  /** desktop / phone */
  D: boolean;
  P: boolean;
  f: Frame;
  sc: Screen;
  /** registration steps for the current answers, and where we are in them (-1 outside registration) */
  reg: Screen[];
  regIdx: number;
  isReg: boolean;
  /** the student's first name, or "Friend" */
  nm: string;
  fullName: string;
  locale: string;
  isLr: boolean;
  /** map level 0..3 */
  lv: number;
  set: (patch: Partial<AppState>) => void;
  /** set + keep Asha awake (the student did something) */
  act: (patch: Partial<AppState>) => void;
  // derived by sections, used by later ones
  schoolName: string;
  campusName: string;
}

export function makeCtx(app: AppLogic): Ctx {
  const s = app.state, D = app.DEVICE === 'desktop';
  const t = I18N[s.lang].journey;
  const reg = regFor(s.qual);
  const regIdx = reg.indexOf(s.screen);
  const nm = s.first.trim() || I18N[s.lang].extra.friend;
  return {
    app, s, t, D, P: !D, f: app.frame(), sc: s.screen, reg, regIdx, isReg: regIdx >= 0, nm,
    fullName: (s.first + ' ' + s.last).trim() || nm,
    locale: localeFor(s.lang), isLr: s.round === 'lr', lv: Math.max(1, Math.min(4, s.lvl)) - 1,
    set: (patch) => app.setState(patch),
    act: (patch) => { app.setState(patch); app.armIdle(); },
    schoolName: '', campusName: '',
  };
}
