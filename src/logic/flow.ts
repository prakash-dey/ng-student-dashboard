// Journey flow: registration order and progress along the six milestones.
import type { AppState, Screen } from './state';

const REG_ORDER: Screen[] = ['login', 'phone', 'name', 'dob', 'gender', 'pincode', 'category', 'qual', 'sname', 'year', 'attend', 'photo', 'school', 'campus', 'review'];

/** Registration steps in order. 'year' and 'attend' show only when the highest qualification is "Pursuing College". */
export const regFor = (qual: AppState['qual'] | string | null): Screen[] =>
  REG_ORDER.filter((x) => (x !== 'year' && x !== 'attend') || qual === 'college');

export const TEST_SCREENS: Screen[] = ['testLang', 'ready', 'countdown', 'test', 'submitting', 'fail'];
export const ROUND_SCREENS: Screen[] = ['intro', 'slot', 'confirm', 'booked', 'call', 'pending'];
const ROUND_STEP: Record<string, number> = { intro: 0.1, slot: 0.3, confirm: 0.5, booked: 0.6, call: 0.72, pending: 0.85 };
const CEL_PROGRESS: Record<string, number> = { reg: 1, test: 2, lr: 3, cfr: 4, sel: 4.5, campus: 5 };

/** Progress for the top trail, 0..6 (one unit per milestone: register, test, lr, cfr, offer, campus). */
export function progress(s: AppState, reg: Screen[]): number {
  const sc = s.screen;
  const regIdx = reg.indexOf(sc);
  if (regIdx >= 0) return (regIdx + (s.toast ? 1 : 0)) / reg.length;
  if (sc === 'cel') return CEL_PROGRESS[s.cel ?? 'reg'];
  if (sc === 'map') return s.lvl === 4 ? 4 : s.lvl;
  if (TEST_SCREENS.includes(sc)) return 1 + (sc === 'test' ? (s.qi + 1) / 6 : sc === 'submitting' ? 0.9 : 0.05);
  if (ROUND_SCREENS.includes(sc)) return (s.round === 'lr' ? 2 : 3) + ROUND_STEP[sc];
  if (sc === 'history') return s.joined ? 5 : s.lvl === 4 ? 4 : s.lvl;
  if (sc === 'consent' || sc === 'travel') return 5;
  if (sc === 'letter') return s.offerAccepted ? 5 : 4.6;
  if (sc === 'checklist') return 5; // offer accepted: "Your Offer" is complete, "Campus" is the current stage
  if (sc === 'whatsapp') return 4.95;
  return 0;
}

/** Emoji shown in the step-complete toast for each registration step. */
export const STEP_EMOJI: Record<string, string> = {
  login: '👋', name: '😊', photo: '📸', dob: '🎂', gender: '👍', phone: '📱', sname: '🏫', year: '📅', attend: '🏫',
  pincode: '📍', qual: '🎓', category: '✅', school: '🏫', campus: '🗺️',
};
