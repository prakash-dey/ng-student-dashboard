// Aptitude test: ready check, countdown, the questions (60-minute timer), submitting, and the retry screen.
import { I18N, type Lang } from '../../i18n';
import { DAY, pad2 } from '../dates';
import type { Ctx } from './context';
import { FS } from '../styles';

const TEST_SECONDS = 3600;
const RETRY_DAYS = 15;
const LETTERS = ['A', 'B', 'C', 'D'];
const TIP_ICONS = ['M4 4h16v16H4zM8 8h3M13 8h3M8 12h8M8 16h8', 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13', 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'];
const TIP_COLORS = ['#F59E0B', '#0EA5E9', '#8B5CF6'];

/** Question bank in the chosen test language: [question, options, correct index]. */
export const questions = (lang: Lang) => I18N[lang].extra.quiz as [string, string[], number][];

export function testVals(c: Ctx) {
  const { s, t, D, app } = c;
  const testLang = s.testLang || s.lang;
  const bank = questions(testLang);
  const [text, options] = bank[s.qi];

  const remain = Math.max(0, TEST_SECONDS - Math.floor((s.now - (s.testStart || s.now)) / 1000));
  const cool = Math.max(0, s.failAt + RETRY_DAYS * DAY - s.now);
  const clock: [number, string][] = [[Math.floor(cool / DAY), t.dUnit], [Math.floor(cool / 3600000) % 24, t.hUnit], [Math.floor(cool / 60000) % 60, t.mUnit], [Math.floor(cool / 1000) % 60, t.sUnit]];
  const readyTiles: [string, string, string][] = [
    [t.tTime, 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2', '#E91E63'],
    [t.tQs, 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4', '#8B5CF6'],
    [t.tBattery, 'M2 9a15 15 0 0120 0M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M12 20h.01', '#0EA5E9'],
    [t.tNet, 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4', '#10B981'],
  ];

  return {
    /** used by the step config and dialogs */
    timer: { remain, mm: pad2(Math.floor(remain / 60)) + ':' + pad2(remain % 60), answered: Object.keys(s.answers).length, qHead: t.qWord + (s.qi + 1) + t.of + '5' },
    vals: {
      q: {
        text,
        opts: options.map((label, oi) => {
          const sel = s.answers[s.qi] === oi;
          return {
            label, letter: LETTERS[oi],
            letterStyle: "width:40px;height:40px;flex-shrink:0;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:18px;" + (sel ? 'background:#FFFFFF;color:#DB2777;' : 'background:#FCE7F3;color:#BE185D;'),
            style: 'display:flex;align-items:center;gap:12px;padding:10px 12px;min-height:' + (D ? 72 : 64) + 'px;border-radius:20px;cursor:pointer;text-align:left;' + (sel ? 'background:linear-gradient(135deg,#FDF2F8,#FCE7F3);border:3px solid #E91E63;box-shadow:0 5px 0 #BE185D;' : 'background:#FFFFFF;border:2px solid #FBCFE8;box-shadow:0 4px 0 #FBCFE8;'),
            pick: () => {
              const first = s.answers[s.qi] === undefined;
              c.act({ answers: { ...s.answers, [s.qi]: oi } });
              if (first) app.miniWin(t.saved);
            },
          };
        }),
      },
      optGrid: D ? 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px' : 'display:flex;flex-direction:column;gap:10px',
      qDots: bank.map((_, k) => {
        const answered = s.answers[k] !== undefined, cur = k === s.qi;
        return { n: k + 1, aria: t.qWord + (k + 1), go: () => c.set({ qi: k }),
          style: "width:40px;height:40px;border-radius:999px;cursor:pointer;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:" + FS.label + ";" + (cur ? 'background:#E91E63;color:#FFFFFF;border:2px solid #BE185D;transform:scale(1.12);' : answered ? 'background:#10B981;color:#FFFFFF;border:2px solid #059669;' : 'background:#FFFFFF;color:#94A3B8;border:2px solid #E2E8F0;') };
      }),
      qHead: t.qWord + (s.qi + 1) + t.of + '5',
      failUi: { score: s.score + '/5', deg: s.score * 72, clock: clock.map(([v, u]) => ({ v: pad2(v), u })) },
      tips: t.tips.map((label, k) => ({ label, d: TIP_ICONS[k], tile: 'width:40px;height:40px;flex-shrink:0;border-radius:12px;display:flex;align-items:center;justify-content:center;background:' + TIP_COLORS[k] })),
      readyTiles: readyTiles.map(([label, d, col]) => ({
        label, d,
        style: 'display:flex;align-items:center;gap:10px;padding:12px;border-radius:20px;background:#FFFFFF;border:2px solid ' + col + '33;box-shadow:0 4px 0 ' + col + '22',
        tile: 'width:46px;height:46px;flex-shrink:0;border-radius:14px;display:flex;align-items:center;justify-content:center;background:' + col,
      })),
      readyGrid: 'display:grid;gap:10px;grid-template-columns:repeat(' + (D ? 2 : 1) + ',minmax(0,1fr))',
      // "submitting" equaliser bars
      bars: [0, 1, 2, 3, 4].map((k) => ({ style: 'width:16px;height:90px;border-radius:8px;transform-origin:bottom;animation-delay:' + k * 0.15 + 's;background:' + ['#EC4899', '#F59E0B', '#10B981', '#0EA5E9', '#8B5CF6'][k] })),
      cnt: { c3: s.count === 3, c2: s.count === 2, c1: s.count === 1, go: s.count <= 0 },
      skipWait: () => app.go('testLang', { answers: {}, qi: 0 }),
    },
  };
}
