// What survives a reload: the student's answers, where they are, bookings and results.
// Transient UI (toasts, dialogs, animations, clocks, open dropdowns) is never saved.
// When the server API is wired in, the server's journey state takes precedence over this local copy.
import { fresh, type AppState } from './state';

const TRANSIENT: (keyof AppState)[] = [
  'phase', 'run', 'course', 'tab', 'camp', 'toast', 'toastXp', 'toastEmo', 'toastCol', 'mini', 'miniKey', 'section',
  'dialog', 'jump', 'lineKey', 'typing', 'idle', 'voice', 'now', 'walking', 'walkT', 'count', 'placeOpen', 'placeQuery',
  'help', 'xp', 'xpPulse', 'xpGain', 'micOff', 'camOff', 'editing', 'openSchool',
];
const PASS_MARK = 3;

/** The part of the state worth keeping. */
export function toSaved(s: AppState): Partial<AppState> {
  const out: Partial<AppState> = { ...s };
  for (const k of TRANSIENT) delete out[k];
  return out;
}

/** Saved progress -> a state to resume from (screens that cannot be resumed mid-way are settled). */
export function fromSaved(saved: Partial<AppState>): AppState {
  const s: AppState = { ...fresh(), ...saved, now: Date.now() };
  if (s.screen === 'countdown') s.screen = 'ready';
  if (s.screen === 'submitting') {
    if (s.score >= PASS_MARK) Object.assign(s, { screen: 'cel', cel: 'test', passed: { ...s.passed, test: true } });
    else Object.assign(s, { screen: 'fail', failAt: s.testAt || Date.now() });
  }
  return s;
}
