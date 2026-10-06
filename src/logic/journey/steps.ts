// Per-screen step config: what Asha says (ask/sub), the top nav (back/close + pill), and the footer buttons.
import type { Advance } from './advance';
import type { Ctx } from './context';
import { isCompact } from './layout';

const PILL = "font-family:'JetBrains Mono',monospace;font-weight:700;font-size:11px;letter-spacing:.12em;padding:4px 12px;border-radius:999px;background:#ECFDF5;border:1.5px solid #6EE7B7;color:#047857;white-space:nowrap";
const PINK_PILL = PILL.replace('#ECFDF5', '#FDF2F8').replace('#6EE7B7', '#F9A8D4').replace('#047857', '#BE185D');

export interface StepInputs {
  advance: Advance;
  timer: { remain: number; mm: string; qHead: string };
  schoolOk: boolean;
  campusOk: boolean;
  nChecked: number;
}

export function stepConfig(c: Ctx, x: StepInputs) {
  const { s, t, app, sc, isLr, lv } = c;
  const stepsLeft = c.isReg ? c.reg.length - c.regIdx : 0;
  const cfg: Record<string, any> = {
    ask: '', sub: '', hasPill: false, pill: '', pillStyle: PILL, hasNav: false, navBack: false, navClose: false, hasNavPill: false, navPill: '', navPillStyle: PILL,
    hasFooter: false, hasPrimary: false, primaryLabel: t.next, primaryOn: null, primaryDisabled: false, primaryCls: 'glow-btn', hasSecondary: false, secondaryLabel: '', secondaryOn: null,
    secondaryStyle: "height:64px;padding:0 18px;border-radius:999px;border:2px solid #E2E8F0;background:#FFFFFF;color:#334155;font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:18px;cursor:pointer",
  };
  // registration steps: back, close, "N steps left", help
  const regNav = (ask: string, sub: string) => {
    Object.assign(cfg, { ask, sub, hasHelp: true, hasNav: true, navBack: c.regIdx > 0, navClose: true, hasNavPill: true, navPill: stepsLeft <= 1 ? t.lastStep : stepsLeft + t.left });
  };
  const footer = (label: string, on: () => void, disabled = false) => Object.assign(cfg, { hasFooter: true, hasPrimary: true, primaryLabel: label, primaryOn: on, primaryDisabled: disabled });
  const secondary = (label: string, on: () => void) => Object.assign(cfg, { hasSecondary: true, secondaryLabel: label, secondaryOn: on });
  const nav = (pill: string) => Object.assign(cfg, { hasNav: true, navBack: true, hasNavPill: true, navPill: pill });
  const next = (step: string) => () => { if (!s.toast) x.advance(step); };
  const roundName = isLr ? t.lr : t.cfr;
  const mapPrimary = [() => app.go('ready'), () => app.go('intro', { round: 'lr', dayIdx: 0, time: null }), () => app.go('intro', { round: 'cfr', dayIdx: 0, time: null }), () => app.celebrate('sel')][lv];

  switch (sc) {
    case 'login': regNav(t.askLogin, t.subLogin); cfg.navBack = false; cfg.hasHelp = false; if (s.loginDone) footer(t.next, next('login')); break;
    case 'name': regNav(t.askName, t.subName); footer(t.next, next('name'), !s.first.trim()); break;
    case 'photo': regNav(t.askPhoto, t.subPhoto); footer(t.next, next('photo'), s.photo !== 'done'); secondary(t.skip, next('photo')); break;
    case 'dob': regNav(t.askDob, t.subDob); footer(t.next, next('dob')); break;
    case 'gender': regNav(t.askGender, t.subGender); if (s.gender) footer(t.next, next('gender')); break;
    case 'phone': regNav(t.askPhone, t.subPhone); footer(t.next, next('phone'), s.phone.replace(/\D/g, '').length < 10); break;
    case 'pincode': regNav(t.askPin, t.subPin); footer(t.next, next('pincode'), !(s.district && s.stateName)); break;
    case 'qual': regNav(t.askQual, t.subTapOne); if (s.qual) footer(t.next, next('qual')); break;
    case 'sname': regNav(t.askSName, t.subSName); footer(t.next, next('sname'), !s.sname.trim()); break;
    case 'year': regNav(t.askYear, t.subTapOne); if (s.year) footer(t.next, next('year')); break;
    case 'attend': regNav(t.askAttend, t.subTapOne); if (s.attend) footer(t.next, next('attend')); break;
    case 'category': regNav(t.askCat, t.subTapOne); if (s.cat !== null) footer(t.next, next('category')); break;
    case 'school': regNav(t.askSchool, t.subSchool); footer(t.chooseSchool, next('school'), !x.schoolOk); break;
    case 'campus': regNav(t.pickCampus, t.subCampus); if (x.campusOk) footer(t.next, next('campus')); break;
    case 'review': regNav(t.askReview, t.subReview); footer(t.looksGood, () => app.celebrate('reg')); break;
    case 'tour':
      cfg.ask = t.tour[s.tourStop];
      footer(s.tourStop === 0 ? t.tourShow : s.tourStop < 4 ? t.next : t.tourStart, () => (s.tourStop < 4 ? app.tourGo(s.tourStop + 1) : app.go('login')), s.walking);
      if (s.tourStop === 0) secondary(t.back, () => app.backToLanding());
      else if (s.tourStop < 4) secondary(t.skip, () => app.go('login'));
      break;
    case 'map': cfg.ask = t.mapAsk[lv]; footer(t.lvlBtn[lv], mapPrimary, s.walking); if (s.lvl > 1) secondary(t.myResults, () => app.go('history')); break;
    case 'ready': cfg.ask = t.askReady; cfg.sub = t.subReady; footer(t.imReady, () => app.startCountdown()); break;
    case 'test':
      Object.assign(cfg, { ask: t.testAsk[s.qi], hasNav: true, navClose: true, hasNavPill: true, navPill: x.timer.mm, hasPill: true, pill: x.timer.qHead, pillStyle: PINK_PILL, hasFooter: true, hasPrimary: true });
      // the timer pill turns amber in the last 5 minutes
      cfg.navPillStyle = "font-family:'JetBrains Mono',monospace;font-weight:700;font-size:16px;letter-spacing:.06em;padding:6px 16px;border-radius:999px;" + (x.timer.remain < 300 ? 'background:#FEF3C7;border:2px solid #F59E0B;color:#92400E' : 'background:#FDF2F8;border:2px solid #F9A8D4;color:#9D174D');
      if (s.qi > 0) secondary(t.prev, () => c.set({ qi: s.qi - 1 }));
      if (s.qi < 4) Object.assign(cfg, { primaryLabel: t.next, primaryOn: () => c.act({ qi: s.qi + 1 }) });
      else Object.assign(cfg, { primaryLabel: t.submit, primaryOn: () => c.set({ dialog: 'submit' }) });
      break;
    case 'submitting': cfg.ask = t.askSubmitting; break;
    case 'fail': cfg.ask = t.askFail; break;
    case 'intro': Object.assign(cfg, { ask: isLr ? t.askIntroLr : t.askIntroCfr, sub: isLr ? t.subIntroLr : t.subIntroCfr, hasPill: true, pill: roundName }); footer(t.bookSlot, () => app.go('slot')); break;
    case 'slot': cfg.ask = t.askSlot; nav(roundName); footer(t.next, () => app.go('confirm'), !s.time); break;
    case 'confirm':
      cfg.ask = t.askConfirm; nav(roundName); secondary(t.change, () => app.go('slot'));
      footer(t.confirm, () => {
        const b = { dayIdx: s.dayIdx, time: s.time as string };
        app.microWin(t.slotBooked, 'booked', isLr ? { bookedLr: b } : { bookedCfr: b }, 25, '📅');
      });
      break;
    case 'booked': Object.assign(cfg, { ask: t.askBooked, sub: t.subBooked, hasPill: true, pill: roundName }); footer(t.joinMeetBig, () => app.microWin(t.callDone, 'pending', {}, 25, '🎤')); cfg.primaryCls = 'green-btn'; break;
    case 'call': Object.assign(cfg, { ask: isLr ? t.askCallLr : t.askCallCfr, hasPill: true, pill: roundName }); footer(t.endCall, () => app.microWin(t.callDone, 'pending', {}, 25, '🎤')); break;
    case 'pending': cfg.ask = t.askPending; footer(t.checkResult, () => app.celebrate(isLr ? 'lr' : 'cfr')); break;
    case 'history': cfg.ask = s.joined ? t.askHistoryDone : t.askHistory; nav(t.myResults); if (!s.joined) footer(t.lvlBtn[lv], mapPrimary); break;
    case 'travel':
      Object.assign(cfg, { ask: t.askTravel, sub: t.subTravel }); nav(t.checks[2][0]);
      footer(t.savePlan, () => {
        const checks = s.checks.slice();
        checks[2] = true;
        app.microWin(t.travelDone, 'checklist', { checks }, 20, '🚆');
      }, !(s.travelMode && s.travelDay !== null));
      break;
    // the offer letter is the last page of the journey
    case 'letter':
      Object.assign(cfg, { ask: t.askLetter, hasNav: true, hasNavPill: true, navPill: t.letterHead });
      footer(t.waBtn, () => { if (!s.offerAccepted) { c.set({ offerAccepted: true }); app.miniWin(t.offerAccepted); } });
      cfg.primaryCls = 'green-btn';
      break;
    case 'checklist': cfg.ask = x.nChecked === 3 ? t.allSet : t.askCheck; cfg.sub = x.nChecked < 3 ? t.subCheck : ''; footer(t.next, () => app.celebrate('campus'), x.nChecked < 3); break;
    case 'whatsapp': cfg.ask = t.askWa; footer(t.waBtn, () => app.celebrate('campus')); cfg.primaryCls = 'green-btn'; break;
  }
  cfg.hasSub = !!cfg.sub;
  // phone: compact screens have no room for the step pill
  if (c.P && isCompact(sc)) cfg.hasPill = false;
  return { cfg, stepsLeft };
}
