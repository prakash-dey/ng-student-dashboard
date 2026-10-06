// Phone map screen geometry: map card on top (from y=100), glass panel anchored 16px above the bottom.
// Designed at 844 tall: panel 268px (tour stops 1-3 taller), map card 446px. On other heights the map card takes
// what is left and the map image scales with it; on very short screens the panel gives way (its content scrolls).
import type { AppState } from '../state';
import type { Frame } from '../frame';

const MAP_TOP = 100;
const GAP = 14;          // between map card and panel
const BOTTOM = 16;       // panel to bottom edge
const MIN_MAP = 140;

/** Below this inner width the panel's two footer buttons no longer fit side by side and stack. */
const TWO_BUTTONS_MIN = 330;
const BUTTON_ROW = 64 + 10;

export function phoneMapBox(f: Frame, s: Pick<AppState, 'screen' | 'tourStop' | 'lvl'>) {
  const tourBig = s.screen === 'tour' && s.tourStop >= 1 && s.tourStop <= 3;
  const hasTwoButtons = s.screen === 'map' ? s.lvl > 1 : s.tourStop < 4;
  // panel inner width = column - 12px margins - 14px padding, each side
  const stacked = hasTwoButtons && f.CW - 52 < TWO_BUTTONS_MIN;
  const extra = stacked ? BUTTON_ROW : 0;
  const designPanel = (!tourBig ? 268 : s.tourStop === 1 ? 428 : 396) + extra;
  const panelH = Math.min(designPanel, f.H - MAP_TOP - GAP - BOTTOM - MIN_MAP);
  const panelTop = f.H - BOTTOM - panelH;
  // the map card ends where the base panel starts, so the taller tour stops overlap it as designed
  const mapH = Math.max(MIN_MAP, f.H - BOTTOM - Math.min(268 + extra, panelH) - GAP - MAP_TOP);
  return { mapTop: MAP_TOP, mapH, panelTop, panelH, box: { w: f.CW - 20, h: mapH } };
}
