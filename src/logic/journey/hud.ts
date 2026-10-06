// Top bar progress trail: six milestones (register, test, learning round, culture round, offer, campus)
// with a rocket that moves along it.
import { progress } from '../flow';
import type { Ctx } from './context';

const ICONS = [
  'M12 22V12M12 12C12 7 8 5 4 5c0 4 3 7 8 7zm0 0c0-4 3-7 8-7 0 5-4 7-8 7',
  'M13 2L4 14h7l-1 8 9-12h-7z',
  'M4 5h16v10H4zM2 19h20',
  'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z',
  'M4 4h16v16H4zM4 4l8 7 8-7',
  'M3 10l9-6 9 6M5 10v10h14V10M10 20v-5h4v5',
];
const DONE_ICON = 'M5 12.5l4.5 4.5L19 7.5';
/** distance of the first/last node from the track ends */
export const TRACK_X0 = 22;

/** Progress trail width: fixed on desktop, the content column minus the HUD's padding on phone. */
export const trackWidth = (c: Ctx) => (c.D ? 620 : c.f.CW - 28);

export function hudVals(c: Ctx) {
  const { s, t, D, sc } = c;
  const prog = progress(s, c.reg);
  const gap = (trackWidth(c) - 2 * TRACK_X0) / 5;
  const nodeSize = D ? 34 : 28;
  const names = [t.hudReg, t.lvlTitle[0], t.lvlTitle[1], t.lvlTitle[2], t.lvlTitle[3], t.hudCampus];
  return {
    nodes: names.map((label, idx) => {
      const done = idx === 5 ? s.joined || (sc === 'cel' && s.cel === 'campus') : prog >= idx + 1;
      const now = !done && Math.floor(prog) === idx;
      const look = done ? 'background:linear-gradient(145deg,#34D399,#059669);border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(5,150,105,.45);'
        : now ? 'background:#FFFFFF;border:2.5px solid #E91E63;' : 'background:#FFFFFF;border:2px solid #FBCFE8;';
      return {
        title: label, d: done ? DONE_ICON : ICONS[idx], icon: D ? 18 : 16,
        stroke: done ? '#FFFFFF' : now ? '#E91E63' : '#F9A8D4', cls: now ? 'node-now' : '',
        style: 'position:absolute;top:' + (D ? 2 : 5) + 'px;width:' + nodeSize + 'px;height:' + nodeSize + 'px;box-sizing:border-box;border-radius:999px;display:flex;align-items:center;justify-content:center;left:' + (TRACK_X0 + idx * gap - nodeSize / 2) + 'px;' + look,
        labelStyle: 'position:absolute;top:' + (nodeSize + 2) + 'px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:11px;font-weight:800;color:' + (done ? '#047857' : now ? '#BE185D' : '#94A3B8'),
      };
    }),
    fillStyle: 'position:absolute;left:' + TRACK_X0 + 'px;top:' + (D ? 16 : 17) + 'px;height:5px;border-radius:999px;width:' + Math.max(0, prog * gap) + 'px',
    rocketStyle: 'position:absolute;top:6px;z-index:2;left:' + (TRACK_X0 + prog * gap - 30) + 'px',
  };
}
