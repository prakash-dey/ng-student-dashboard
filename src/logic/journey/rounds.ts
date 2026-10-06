// Interview rounds (learning round 'lr', culture-fit round 'cfr'): intro, slot picker, booked ticket,
// the video call, and waiting for the result.
import { bookableDays, DAY, fmtTime, longDate, pad2 } from '../dates';
import type { Booking } from '../state';
import type { Ctx } from './context';

/** Bookable times each day; day 4 (index 3) has none, and some slots show as full. */
const TIMES: [number, number][] = [[10, 0], [11, 30], [14, 0], [16, 30], [18, 0]];
const slotsFor = (day: number) => (day === 3 ? [] : TIMES.map(([h, m], k) => ({ h, m, full: (day + k) % 4 === 0 })));

const INTRO_ICONS = {
  lr: ['M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2', 'M4 5h16v10H4zM2 19h20', 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4', 'M2 9a15 15 0 0120 0M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M12 20h.01', 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4'],
  cfr: ['M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2', 'M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z', 'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0012 3z'],
};
const INTRO_COLS = { lr: ['#E91E63', '#F59E0B', '#8B5CF6', '#0EA5E9', '#10B981'], cfr: ['#8B5CF6', '#EC4899', '#F59E0B'] };

/** "12 Oct · 11:30 am" for a booking (used by history too). */
export function bookingLabel(b: Booking, locale: string) {
  const d = bookableDays()[b.dayIdx];
  const [h, m] = b.time.split(':').map(Number);
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' }) + ' · ' + fmtTime(locale, h, m);
}

export function roundsVals(c: Ctx) {
  const { s, t, D, sc, app, locale, isLr } = c;
  const round = isLr ? 'lr' : 'cfr';
  const accent = isLr ? '#0EA5E9' : '#8B5CF6', accentDark = isLr ? '#0369A1' : '#6D28D9';
  const days = bookableDays();
  const time = (h: number, m: number) => fmtTime(locale, h, m);

  // the slot shown on the ticket: the booking once booked, else the one being picked
  const booked = isLr ? s.bookedLr : s.bookedCfr;
  const tk = sc === 'booked' && booked ? booked : { dayIdx: s.dayIdx, time: s.time || '10:0' };
  const [tH, tM] = tk.time.split(':').map(Number);
  const slot = new Date(days[tk.dayIdx].getTime());
  slot.setHours(tH, tM, 0, 0);
  const until = Math.max(0, slot.getTime() - s.now);
  const actions: [string, string, () => void, string, string][] = [
    [t.addCal, 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5', () => app.miniWin(t.addedCal), '#0369A1', '#E0F2FE'],
    [t.reschedule, 'M4 4v6h6M20 20v-6h-6M20 10a8 8 0 00-14-4L4 10M4 14a8 8 0 0014 4l2-4', () => app.go('slot', { time: null }), '#92400E', '#FEF3C7'],
    [t.cancel, 'M6 6l12 12M18 6L6 18', () => c.set({ dialog: 'cancel', reason: null }), '#991B1B', '#FEE2E2'],
  ];
  const callSec = Math.max(0, Math.floor((s.now - (s.callStart || s.now)) / 1000));
  const callCol = isLr ? ['#38BDF8', '#0284C7'] : ['#A78BFA', '#6D28D9'];
  const callBtn = (off: boolean) => 'width:58px;height:58px;border-radius:999px;cursor:pointer;display:flex;align-items:center;justify-content:center;' + (off ? 'background:#FEE2E2;color:#B91C1C;border:2px solid #FCA5A5;' : 'background:#FFFFFF;color:#334155;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;');
  const times = slotsFor(s.dayIdx).map((tm) => {
    const key = tm.h + ':' + tm.m, sel = s.time === key;
    return {
      label: time(tm.h, tm.m), full: tm.full,
      pick: () => { if (!tm.full) c.act({ time: key }); },
      style: "min-height:52px;border-radius:16px;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:17px;cursor:" + (tm.full ? 'not-allowed' : 'pointer') + ';' + (tm.full ? 'background:#F1F5F9;color:#94A3B8;border:2px dashed #CBD5E1;text-decoration:line-through;' : sel ? 'background:' + accent + ';color:#FFFFFF;border:2px solid ' + accentDark + ';box-shadow:0 4px 0 ' + accentDark + ';' : 'background:#FFFFFF;color:#0F172A;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;'),
    };
  });

  return {
    introRows: (isLr ? t.introLr : t.introCfr).map((label, k) => ({
      label, d: INTRO_ICONS[round][k],
      tile: 'width:' + (isLr ? 44 : 54) + 'px;height:' + (isLr ? 44 : 54) + 'px;flex-shrink:0;border-radius:' + (isLr ? 14 : 16) + 'px;display:flex;align-items:center;justify-content:center;background:' + INTRO_COLS[round][k],
    })),
    days: days.map((dt, di) => {
      const sel = di === s.dayIdx, has = slotsFor(di).length > 0;
      return {
        wd: dt.toLocaleDateString(locale, { weekday: 'short' }), n: dt.getDate(), pick: () => c.act({ dayIdx: di, time: null }),
        dotStyle: 'width:6px;height:6px;border-radius:999px;background:' + (has ? (sel ? '#FFFFFF' : '#10B981') : 'transparent'),
        style: 'display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 0;border-radius:16px;cursor:pointer;' + (sel ? 'background:' + accent + ';color:#FFFFFF;border:2px solid ' + accentDark + ';box-shadow:0 4px 0 ' + accentDark + ';' : 'background:#FFFFFF;color:#334155;border:2px solid #E2E8F0;'),
      };
    }),
    times, hasTimes: times.length > 0, noTimes: times.length === 0,
    monthLabel: days[0].toLocaleDateString(locale, { month: 'long', year: 'numeric' }),
    ticket: {
      round: isLr ? t.lr : t.cfr, isBooked: sc === 'booked',
      date: longDate(locale, slot),
      time: time(tH, tM),
      countdown: Math.floor(until / DAY) + 'd ' + (Math.floor(until / 3600000) % 24) + 'h ' + (Math.floor(until / 60000) % 60) + 'm',
      card: 'position:relative;overflow:hidden;border-radius:24px;padding:18px;display:flex;flex-direction:column;gap:6px;background:linear-gradient(135deg,' + (isLr ? '#38BDF8,#0284C7' : '#A78BFA,#6D28D9') + ');box-shadow:0 8px 0 ' + accentDark + ',0 16px 30px ' + (isLr ? 'rgba(2,132,199,.35)' : 'rgba(109,40,217,.35)'),
    },
    ticketActions: actions.map(([label, d, on, fg, bg]) => ({ label, d, on, style: 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:68px;border-radius:18px;cursor:pointer;border:none;color:' + fg + ';background:' + bg })),
    pendingTip: t.pendingTips[isLr ? 0 : 1],
    callUi: {
      clock: pad2(Math.floor(callSec / 60)) + ':' + pad2(callSec % 60),
      who: isLr ? t.mentorName : t.teamName, initials: isLr ? 'PM' : 'NT',
      box: 'position:relative;height:' + (D ? 300 : 250) + 'px;border-radius:24px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 35%,#334155,#0F172A);box-shadow:0 10px 26px rgba(15,23,42,.35)',
      avatar: 'width:' + (D ? 110 : 92) + 'px;height:' + (D ? 110 : 92) + "px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:34px;color:#FFFFFF;border:4px solid rgba(255,255,255,.55);background:linear-gradient(145deg," + callCol[0] + ',' + callCol[1] + ')',
      self: 'position:absolute;right:10px;bottom:10px;width:' + (D ? 104 : 84) + 'px;height:' + (D ? 128 : 104) + 'px;border-radius:14px;overflow:hidden;border:2px solid #FFFFFF',
      wave: [0, 1, 2, 3, 4].map((k) => ({ style: 'display:inline-block;width:5px;height:22px;border-radius:4px;background:#FFFFFF;transform-origin:bottom;animation-delay:' + k * 0.12 + 's' })),
      camOn: !s.camOff, camOff: s.camOff, micPressed: s.micOff ? 'true' : 'false', camPressed: s.camOff ? 'true' : 'false',
      micStyle: callBtn(s.micOff), camStyle: callBtn(s.camOff),
    },
    callTips: t.callTips.map((label, k) => ({ label, emo: ['😊', '🐢', '🙋'][k] })),
    toggleMic: () => c.set({ micOff: !s.micOff }),
    toggleCam: () => c.set({ camOff: !s.camOff }),
    demoDone: () => app.go('pending'),
    demoResult: () => app.celebrate(isLr ? 'lr' : 'cfr'),
  };
}
