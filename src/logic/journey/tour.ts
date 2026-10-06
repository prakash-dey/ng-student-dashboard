// The map tour (five stops explaining the journey) and the same round details shown again before each round.
import type { Ctx } from './context';

interface Info { facts: string[]; topics: string[]; title?: string }

/** Facts + topics box used by the tour card and the "ready"/"intro" screens. */
function infoBox(D: boolean, info: Info | null) {
  return {
    has: !!info, facts: info ? info.facts : [], topics: info ? info.topics : [], hasTitle: !!info?.title, title: info?.title || '',
    box: 'display:flex;flex-direction:column;gap:' + (D ? 10 : 7) + 'px;padding:' + (D ? '16px 18px' : '10px 12px') + ';border-radius:18px;background:#FFFFFF;border:1.5px solid #FBCFE8',
    factStyle: 'font-weight:800;line-height:1.3;white-space:nowrap;border-radius:999px;background:#FDF2F8;border:1.5px solid #F9A8D4;color:#9D174D;font-size:' + (D ? 16 : 13) + 'px;padding:' + (D ? '5px 14px' : '3px 10px'),
    titleStyle: "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;line-height:1.2;color:#0F172A;font-size:" + (D ? 20 : 15) + 'px',
    topicStyle: 'font-weight:700;line-height:1.3;border-radius:999px;background:#F1F5F9;color:#334155;font-size:' + (D ? 15 : 12.5) + 'px;padding:' + (D ? '5px 13px' : '3px 9px'),
  };
}

export function tourVals(c: Ctx) {
  const { s, t, D, sc } = c;
  const info = t.tourInfo as (Info | null)[];
  const roundInfo = sc === 'ready' ? info[1] : sc === 'intro' ? info[s.round === 'lr' ? 2 : 3] : null;
  const { has, ...tourBox } = infoBox(D, sc === 'tour' ? info[s.tourStop] : null);
  return {
    roundInfo: infoBox(D, roundInfo),
    tourUi: {
      stopLabel: t.tourLabels[s.tourStop],
      hasInfo: has, ...tourBox,
      pill: "align-self:flex-start;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:11px;letter-spacing:.14em;padding:4px 12px;border-radius:999px;background:#FDF2F8;border:1.5px solid #F9A8D4;color:#BE185D",
      dots: [0, 1, 2, 3, 4].map((k) => ({ style: 'height:10px;border-radius:999px;transition:width .3s;width:' + (k === s.tourStop ? 28 : 10) + 'px;background:' + (k <= s.tourStop ? '#E91E63' : '#FBCFE8') })),
    },
  };
}
