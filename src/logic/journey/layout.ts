// Journey layout: per-device blocks plus the progress-trail dashes shared by both.
import type { Screen } from '../state';
import type { Layout } from '../styles';
import type { Ctx } from './context';
import { TRACK_X0, trackWidth } from './hud';
import { journeyLayoutDesktop } from './layoutDesktop';
import { journeyLayoutPhone } from './layoutPhone';

/** Screens whose panel needs more room: on phone Asha gets a smaller stage and the step pill is hidden. */
const COMPACT: Screen[] = ['call', 'history', 'consent', 'travel', 'test', 'school', 'campus', 'review', 'slot', 'booked', 'confirm', 'letter', 'checklist', 'ready', 'fail', 'login', 'photo', 'pending', 'submitting', 'intro'];
export const isCompact = (sc: Screen) => COMPACT.includes(sc);

export function journeyLayout(c: Ctx): Layout {
  const L = c.D ? journeyLayoutDesktop() : journeyLayoutPhone(c, isCompact(c.sc));
  L.trackDash = 'position:absolute;left:' + TRACK_X0 + 'px;top:' + (c.D ? 16 : 17) + 'px;width:' + (trackWidth(c.D) - 2 * TRACK_X0) + 'px;height:5px;border-radius:999px;background:repeating-linear-gradient(90deg,#FBCFE8 0 6px,transparent 6px 10px)';
  return L;
}
