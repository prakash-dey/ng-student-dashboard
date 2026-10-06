// Journey layout: per-device blocks plus the progress-trail dashes shared by both.
import type { Screen } from '../state';
import type { Layout } from '../styles';
import type { Ctx } from './context';
import { TRACK_X0, trackWidth } from './hud';
import { journeyLayoutDesktop } from './layoutDesktop';
import { journeyLayoutPhone } from './layoutPhone';

/** Screens whose panel needs more room: on phone Asha gets a smaller stage and the step pill is hidden. */
const COMPACT_SCREENS: Screen[] = ['call', 'history', 'consent', 'travel', 'test', 'school', 'campus', 'review', 'slot', 'booked', 'confirm', 'letter', 'checklist', 'ready', 'fail', 'login', 'photo', 'pending', 'submitting', 'intro'];
/** Phones shorter than this use the compact stage on every screen, so the panel keeps enough room. */
const SHORT_PHONE = 740;
export const isCompact = (c: Ctx) => c.P && (COMPACT_SCREENS.includes(c.sc) || c.f.H < SHORT_PHONE);

export function journeyLayout(c: Ctx): Layout {
  const L = c.D ? journeyLayoutDesktop(c) : journeyLayoutPhone(c, isCompact(c));
  L.trackDash = 'position:absolute;left:' + TRACK_X0 + 'px;top:' + (c.D ? 16 : 17) + 'px;width:' + (trackWidth(c) - 2 * TRACK_X0) + 'px;height:5px;border-radius:999px;background:repeating-linear-gradient(90deg,#FBCFE8 0 6px,transparent 6px 10px)';
  return L;
}
