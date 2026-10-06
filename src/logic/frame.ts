// Responsive frame. The design is drawn at 390x844 (phone) and 1440x900 (pc); layouts are computed for the
// real viewport instead: sizes stay as designed, gutters stay, widths stretch, top/bottom anchors are kept and
// the middle flexes. Below the minimums the frame stops shrinking and the page scrolls.
import type { Device } from './dc';

export const DESIGN = { phone: { w: 390, h: 844 }, desktop: { w: 1440, h: 900 } } as const;
const MIN = { phone: { w: 320, h: 600 }, desktop: { w: 900, h: 640 } } as const;
/** Phone layouts use a content column: full width up to this, centred beyond (tablets). */
const PHONE_COLUMN_MAX = 560;

export interface Frame {
  /** frame size in px */
  W: number; H: number;
  /** phone content column: width and left offset */
  CW: number; X0: number;
  /** absolute box spanning the content column between two y anchors (px from top / bottom) */
  col(top: number, bottom: number): string;
  /** like col(), as a flex column that scrolls only when the screen is too short for its content */
  scrollCol(top: number, bottom: number): string;
}

export function makeFrame(device: Device, view: { w: number; h: number }): Frame {
  const W = Math.max(view.w, MIN[device].w);
  const H = Math.max(view.h, MIN[device].h);
  const CW = Math.min(W, PHONE_COLUMN_MAX);
  const X0 = Math.round((W - CW) / 2);
  const col = (top: number, bottom: number) => `position:absolute;left:${X0}px;width:${CW}px;top:${top}px;bottom:${bottom}px;`;
  const scrollCol = (top: number, bottom: number) =>
    col(top, bottom) + 'display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;z-index:10;';
  return { W, H, CW, X0, col, scrollCol };
}
