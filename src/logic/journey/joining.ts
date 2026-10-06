// Joining: parent consent, travel plan, and "My journey" history.
import { DAY, joinDay } from '../dates';
import type { Ctx } from './context';
import { bookingLabel } from './rounds';
import { FS } from '../styles';

type Status = 'done' | 'now' | 'lock';
const STATUS_BG: Record<Status, string> = { done: '#10B981', now: '#E91E63', lock: '#CBD5E1' };
const STATUS_CHIP: Record<Status, string> = { done: 'background:#DCFCE7;color:#166534', now: 'background:#FCE7F3;color:#9D174D', lock: 'background:#F1F5F9;color:#64748B' };

function historyRows(c: Ctx) {
  const { s, t, locale } = c;
  const date = (ms: number) => (ms ? new Date(ms).toLocaleDateString(locale, { day: 'numeric', month: 'short' }) : '');
  const booking = (b: typeof s.bookedLr) => (b ? bookingLabel(b, locale) : '');
  /** [title, detail, status, icon] */
  const rows: [string, string, Status, string][] = [
    [t.hReg, c.fullName + ' · ' + c.schoolName, 'done', 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6'],
    [t.lvlTitle[0], s.passed.test ? t.scoreL + ' ' + s.score + '/5' + (s.testAt ? ' · ' + date(s.testAt) : '') : t.notYet, s.passed.test ? 'done' : 'now', 'M13 2L4 14h7l-1 8 9-12h-7z'],
    [t.lvlTitle[1], s.passed.lr ? t.passTxt : s.bookedLr ? booking(s.bookedLr) : t.notYet, s.passed.lr ? 'done' : s.passed.test ? 'now' : 'lock', 'M4 5h16v10H4zM2 19h20'],
    [t.lvlTitle[2], s.passed.cfr ? t.passTxt : s.bookedCfr ? booking(s.bookedCfr) : t.notYet, s.passed.cfr ? 'done' : s.passed.lr ? 'now' : 'lock', 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z'],
    [t.hOffer, s.offerAccepted ? t.stAccepted : s.passed.cfr ? t.stSent : t.notYet, s.offerAccepted ? 'done' : s.passed.cfr ? 'now' : 'lock', 'M4 4h16v16H4zM4 4l8 7 8-7'],
    [t.hTravel, s.checks[2] ? t.stFinal : t.stPendTravel, s.checks[2] ? 'done' : s.offerAccepted ? 'now' : 'lock', 'M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10M4 16h16M8 20h.01M16 20h.01'],
    [t.hJoined, c.campusName, s.joined ? 'done' : 'lock', 'M3 10l9-6 9 6M5 10v10h14V10M10 20v-5h4v5'],
  ];
  return rows.map(([title, sub, st, d], k) => ({
    title, sub, d,
    status: st === 'done' ? t.chipDone : st === 'now' ? t.chipNow : t.chipLocked,
    chip: 'font-size:' + FS.caption + ';font-weight:800;padding:2px 9px;border-radius:999px;' + STATUS_CHIP[st],
    dot: 'width:40px;height:40px;border-radius:999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:' + STATUS_BG[st] + ';' + (st === 'now' ? 'box-shadow:0 0 0 5px rgba(233,30,99,.2);' : ''),
    line: 'flex-grow:1;width:3px;min-height:14px;border-radius:3px;' + (k === rows.length - 1 ? 'background:transparent' : st === 'done' ? 'background:#6EE7B7' : 'background:repeating-linear-gradient(180deg,#CBD5E1 0 4px,transparent 4px 8px)'),
  }));
}

export function joiningVals(c: Ctx) {
  const { s, t, locale } = c;
  const parent = s.pName.trim() || t.parentWord;
  const modes: ['train' | 'bus' | 'other', string, string][] = [['train', t.train, '🚆'], ['bus', t.bus, '🚌'], ['other', t.otherTravel, '🛺']];
  return {
    historyRows: historyRows(c),
    consentText: t.consent1 + parent + t.consent2 + c.fullName + t.consent3 + c.schoolName + ', ' + c.campusName + t.consent4,
    consentPoints: t.consentPts, consentPressed: s.consent ? 'true' : 'false',
    parentLine: parent + (s.pPhone ? ' · +91 ' + s.pPhone : ''),
    consentUi: {
      on: s.consent,
      card: 'display:flex;align-items:center;gap:14px;padding:14px;border-radius:22px;cursor:pointer;' + (s.consent ? 'background:#F0FDF4;border:3px solid #10B981;box-shadow:0 5px 0 #059669;' : 'background:#FFFFFF;border:2px solid #FBCFE8;box-shadow:0 4px 0 #FBCFE8;'),
      box: 'width:40px;height:40px;flex-shrink:0;border-radius:12px;display:flex;align-items:center;justify-content:center;' + (s.consent ? 'background:#10B981;border:2px solid #059669;' : 'background:#FFFFFF;border:2.5px solid #CBD5E1;'),
    },
    toggleConsent: () => c.set({ consent: !s.consent }),
    travelModes: modes.map(([mode, label, emo]) => ({
      label, emo, pick: () => c.act({ travelMode: mode }),
      style: 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:112px;border-radius:22px;cursor:pointer;' + (s.travelMode === mode ? 'border:3px solid #10B981;box-shadow:0 6px 0 #059669;' : ''),
    })),
    // arrive the day before, on the day, or the day after joining
    travelDays: [-1, 0, 1].map((off, k) => {
      const sel = s.travelDay === k;
      return {
        label: new Date(joinDay().getTime() + off * DAY).toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' }),
        pick: () => c.act({ travelDay: k }),
        style: 'min-height:48px;padding:0 16px;border-radius:999px;cursor:pointer;font-weight:800;font-size:' + FS.body + ';' + (sel ? 'background:#0EA5E9;color:#FFFFFF;border:2px solid #0369A1;box-shadow:0 4px 0 #0369A1;' : 'background:#FFFFFF;color:#0F172A;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;'),
      };
    }),
  };
}
