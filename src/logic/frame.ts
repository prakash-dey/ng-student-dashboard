// Responsive frame. The design is drawn at 390x844 (phone) and 1440x900 (pc); layouts are computed for the
// real viewport instead: sizes stay as designed, gutters stay, widths stretch, top/bottom anchors are kept and
// the middle flexes. Below the minimums the frame stops shrinking and the page scrolls.
import type { Device } from './dc';

export const DESIGN = { phone: { w: 390, h: 844 }, desktop: { w: 1440, h: 900 } } as const;
const MIN = { phone: { w: 320, h: 600 }, desktop: { w: 900, h: 640 } } as const;
/** Phone layouts use a content column: full width up to this, centred beyond (tablets). */
const PHONE_COLUMN_MAX = 560;
/** PC layouts use a content box: full width up to the design width, centred beyond. */
const DESKTOP_CONTENT_MAX = 1440;

export interface Frame {
  /** frame size in px */
  W: number; H: number;
  /** phone content column: width and left offset */
  CW: number; X0: number;
  /** PC content box: width and left offset */
  DW: number; DX: number;
  /** absolute box spanning the content column between two y anchors (px from top / bottom) */
  col(top: number, bottom: number): string;
  /** like col(), as a flex column that scrolls only when the screen is too short for its content */
  scrollCol(top: number, bottom: number): string;
}

/**
 * Style for a fixed-size block of artwork (w x h, laid out in normal flow) shown at scale k <= 1. The negative
 * margins shrink its layout box too, so the content around it closes up. At k = 1 nothing is added.
 */
export function shrinkBox(w: number, h: number, k: number) {
  if (k >= 1) return '';
  const r = (n: number) => Math.round(n * 10) / 10;
  return `;transform:scale(${r(k * 1000) / 1000});transform-origin:50% 0;margin-bottom:${r(-h * (1 - k))}px;margin-left:${r((-w * (1 - k)) / 2)}px;margin-right:${r((-w * (1 - k)) / 2)}px`;
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function makeFrame(device: Device, view: { w: number; h: number }): Frame {
  const W = Math.max(view.w, MIN[device].w);
  const H = Math.max(view.h, MIN[device].h);
  const CW = Math.min(W, PHONE_COLUMN_MAX);
  const X0 = Math.round((W - CW) / 2);
  const DW = Math.min(W, DESKTOP_CONTENT_MAX);
  const DX = Math.round((W - DW) / 2);
  const col = (top: number, bottom: number) => `position:absolute;left:${X0}px;width:${CW}px;top:${top}px;bottom:${bottom}px;`;
  const scrollCol = (top: number, bottom: number) =>
    col(top, bottom) + 'display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;z-index:10;';
  return { W, H, CW, X0, DW, DX, col, scrollCol };
}
