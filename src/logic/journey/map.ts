// Journey map: the illustrated path with Asha walking between milestones, flags, and the "next level" card.
import { MAP_SIZE, mapScale, walkerPos } from '../geometry';
import type { Ctx } from './context';
import { phoneMapBox } from './mapBox';
import { desktopMapBox } from './layoutDesktop';

/** Pulsing ring position per level (map px); the tour adds the start point first. */
const RINGS = [[250, 440], [710, 420], [1020, 520], [1370, 290]];
const TOUR_RINGS = [[150, 690], ...RINGS];
/** Milestone flags (map px): done ones get a check, later ones a lock. */
const FLAGS = [[245, 205], [760, 205], [1060, 270], [1455, 70]];
const START = [165, 650];
const LEVEL_COLS = ['linear-gradient(135deg,#F472B6,#E91E63)', 'linear-gradient(135deg,#38BDF8,#0284C7)', 'linear-gradient(135deg,#A78BFA,#6D28D9)', 'linear-gradient(135deg,#FBBF24,#D97706)'];

export function mapVals(c: Ctx) {
  const { s, t, D, app, lv } = c;
  const device = app.DEVICE;
  const box = D ? desktopMapBox(c.f) : phoneMapBox(c.f, s).box;
  const ms = mapScale(device, box);
  const mw = Math.round(MAP_SIZE.w * ms), mh = Math.round(MAP_SIZE.h * ms);
  const pos = walkerPos(s.lvl, s.walkT, device, box);
  const ww = D ? 60 : 48, wh = D ? 112 : 90;
  const isTour = c.sc === 'tour';
  const ring = isTour ? TOUR_RINGS[s.tourStop] : RINGS[s.lvl - 1];
  const ringSize = Math.round(150 * ms);
  const badge = D ? 34 : 30;
  const ringStyle = (col: string, delay: number) => 'position:absolute;left:' + Math.round(ring[0] * ms - ringSize / 2) + 'px;top:' + Math.round(ring[1] * ms - ringSize / 2) + 'px;width:' + ringSize + 'px;height:' + ringSize + 'px;border-radius:999px;border:4px solid ' + col + ';box-sizing:border-box;animation-delay:' + delay + 's';
  const mark = (p: number[], bg: string) => ({ style: 'position:absolute;left:' + Math.round(p[0] * ms - badge / 2) + 'px;top:' + Math.round(p[1] * ms - badge / 2) + 'px;width:' + badge + 'px;height:' + badge + 'px;border-radius:999px;background:' + bg + ';border:2.5px solid #FFFFFF;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,.3);box-sizing:border-box' });
  return {
    mp: {
      inner: 'position:relative;width:' + mw + 'px;height:' + mh + 'px',
      img: 'position:absolute;left:0;top:0;width:' + mw + 'px;height:' + mh + 'px',
      checks: isTour ? [] : [START, ...FLAGS.slice(0, s.lvl - 1)].map((p) => mark(p, '#059669')),
      locks: isTour ? [] : FLAGS.slice(s.lvl).map((p) => mark(p, 'rgba(71,85,105,.9)')),
      ring1: ringStyle('#F472B6', 0), ring2: ringStyle('#FBBF24', 0.7),
      arrived: isTour ? !s.walking : !s.walking && s.walkT >= 1,
      hereText: isTour ? t.tourLabels[s.tourStop] : t.youHere,
      here: 'position:absolute;left:' + Math.round(ring[0] * ms - 60) + 'px;top:' + Math.round(ring[1] * ms - ringSize / 2 - 30) + "px;width:120px;text-align:center;background:#E91E63;color:#FFFFFF;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:10px;letter-spacing:.12em;padding:4px 0;border-radius:999px;box-shadow:0 4px 12px rgba(233,30,99,.45)",
      walker: 'position:absolute;left:' + Math.round(pos.x - ww / 2) + 'px;top:' + Math.round(pos.y - wh) + 'px;width:' + ww + 'px;height:' + wh + 'px;z-index:3',
      walkerCls: s.walking ? 'asha-walk' : 'asha-idle',
    },
    mapNext: {
      level: t.lvlName[lv], title: t.lvlTitle[lv], chips: [t.chipTest, t.chipLr, t.chipCfr, t.chipOffer][lv],
      card: 'display:flex;flex-direction:column;gap:4px;padding:14px 16px;border-radius:22px;background:' + LEVEL_COLS[lv] + ';box-shadow:0 6px 0 rgba(0,0,0,.12)',
    },
    mapRef: (el: HTMLElement | null) => { app.mapEl = el; },
  };
}
