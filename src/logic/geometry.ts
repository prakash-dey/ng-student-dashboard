// Journey map geometry. Coordinates are in map-image pixels (1604x934); mapScale() converts to screen px.
import type { Device } from './dc';

export const MAP_SIZE = { w: 1604, h: 934 };

/** The walking path for each of the four levels, as polylines. */
export const LEGS: number[][][] = [
  [[200, 700], [250, 620], [270, 575], [330, 560]],
  [[330, 560], [420, 585], [560, 585], [700, 570], [790, 560]],
  [[790, 560], [880, 610], [980, 650], [1090, 650]],
  [[1090, 650], [1180, 610], [1250, 520], [1320, 440], [1420, 420]],
];

/** Phone map card size; 370x446 at the design size. */
export interface MapBox { w: number; h: number }

/** Screen px per map px. Phone: the map fills the card's height (and at least its width; it scrolls sideways);
 *  desktop: the map fills the card's width (820px at the design size). */
export const mapScale = (device: Device, box?: MapBox) =>
  device === 'phone' ? Math.max((box?.h ?? 446) / MAP_SIZE.h, (box?.w ?? 370) / MAP_SIZE.w) : (box?.w ?? 820) / MAP_SIZE.w;

/** Asha's position (screen px) after walking fraction `t` (0..1) of level `lvl`'s leg. */
export function walkerPos(lvl: number, t: number, device: Device, box?: MapBox) {
  const leg = LEGS[Math.max(0, Math.min(3, lvl - 1))];
  const dist = [0];
  let total = 0;
  for (let i = 1; i < leg.length; i++) {
    total += Math.hypot(leg[i][0] - leg[i - 1][0], leg[i][1] - leg[i - 1][1]);
    dist.push(total);
  }
  const target = t * total;
  let [x, y] = leg[leg.length - 1];
  for (let i = 1; i < leg.length; i++) {
    if (target <= dist[i]) {
      const f = (target - dist[i - 1]) / (dist[i] - dist[i - 1] || 1);
      x = leg[i - 1][0] + (leg[i][0] - leg[i - 1][0]) * f;
      y = leg[i - 1][1] + (leg[i][1] - leg[i - 1][1]) * f;
      break;
    }
  }
  const s = mapScale(device, box);
  return { x: x * s, y: y * s };
}
