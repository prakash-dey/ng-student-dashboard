// Moving on from a registration step: celebrate with a step-complete toast, then go to the next step
// (or back to the review page when editing, or to the registration celebration after the last step).
import { regFor, STEP_EMOJI } from '../flow';
import type { Ctx } from './context';

export function makeAdvance(c: Ctx) {
  const { s, t, app } = c;
  return function advance(step: string, picked?: string) {
    const list = step === 'qual' && picked ? regFor(picked) : c.reg;
    const idx = list.indexOf(step as never);
    let next: string | null = idx < list.length - 1 ? list[idx + 1] : null;
    let extra: Record<string, unknown> = {};
    if (step === 'gender') extra.section = t.sec1;
    if (step === 'photo') extra.section = t.sec2;
    let msg = step === 'name' ? t.hello + (s.first.trim() || c.nm) + '!'
      : step === 'photo' && s.photo === 'done' ? t.nicePhoto
      : step === 'login' ? t.welcome
      : t.cheers[idx % t.cheers.length];
    if (!next) { app.celebrate('reg'); return; }
    if (s.editing) { extra = {}; msg = t.saved; next = '@edit'; }
    app.microWin(msg, next, extra, 10, STEP_EMOJI[step]);
  };
}

export type Advance = ReturnType<typeof makeAdvance>;
