// Values for the journey (zone 'journey'): every section's values plus which parts of the screen show.
import type { AppLogic } from '../app';
import { langChips } from '../common';
import { FS } from '../styles';
import { makeAdvance } from './advance';
import { celebrationVals } from './celebration';
import { makeCtx, type Ctx } from './context';
import { dialogVals } from './dialogs';
import { effectsVals } from './effects';
import { hudVals } from './hud';
import { joiningVals } from './joining';
import { journeyLayout } from './layout';
import { mapVals } from './map';
import { offerVals } from './offer';
import { choicesVals } from './registration/choices';
import { dobVals } from './registration/dob';
import { fieldsVals } from './registration/fields';
import { photoVals } from './registration/photo';
import { placeVals } from './registration/place';
import { reviewVals } from './registration/review';
import { schoolVals } from './registration/school';
import { roundsVals } from './rounds';
import { stepConfig } from './steps';
import { testVals } from './test';
import { tourVals } from './tour';

/** Step-complete toast colours: [light, ring, ring 1, ring 2, text]. */
const TOAST_COLS = [['#FDE68A', '#F59E0B', '#FBBF24', '#FCD34D', '#B45309'], ['#FBCFE8', '#EC4899', '#F472B6', '#F9A8D4', '#BE185D'], ['#BAE6FD', '#0EA5E9', '#38BDF8', '#7DD3FC', '#0369A1'], ['#BBF7D0', '#10B981', '#34D399', '#6EE7B7', '#047857'], ['#DDD6FE', '#8B5CF6', '#A78BFA', '#C4B5FD', '#6D28D9'], ['#FED7AA', '#F97316', '#FB923C', '#FDBA74', '#C2410C']];

function toastUi(c: Ctx) {
  const { s } = c, col = TOAST_COLS[s.toastCol % 6];
  return {
    emoji: s.toastEmo, aria: s.toast || '', ring1: col[2], ring2: col[3], text: col[4],
    circle: 'position:relative;width:110px;height:110px;border-radius:999px;background:radial-gradient(circle at 35% 30%,#FFFFFF,' + col[0] + ' 70%);border:4px solid ' + col[1] + ';display:flex;align-items:center;justify-content:center;box-shadow:0 8px 0 ' + col[4] + ',0 16px 36px rgba(0,0,0,.18)',
  };
}

/** Which layers of the screen show, and which panel content. */
function visibility(c: Ctx) {
  const { s, D, sc } = c;
  const campusCel = sc === 'cel' && s.cel === 'campus';
  const bgBanyan = D && sc !== 'map' && sc !== 'tour' && !campusCel;
  return {
    on: {
      bgBanyan, bgSoft: !bgBanyan && !campusCel,
      bird: c.isReg || sc === 'map' || sc === 'tour', hud: true,
      stage: sc !== 'map' && sc !== 'cel' && sc !== 'tour', map: sc === 'map' || sc === 'tour', panel: sc !== 'cel', celebrate: sc === 'cel',
      resting: sc === 'pending',
    },
    is: {
      login: sc === 'login', phone: sc === 'phone', photo: sc === 'photo', dob: sc === 'dob',
      category: sc === 'category', pincode: sc === 'pincode', school: sc === 'school', review: sc === 'review',
      testLang: sc === 'testLang', ready: sc === 'ready', countdown: sc === 'countdown', test: sc === 'test', submitting: sc === 'submitting', fail: sc === 'fail',
      intro: sc === 'intro', slot: sc === 'slot', call: sc === 'call', history: sc === 'history', consent: sc === 'consent', travel: sc === 'travel', ticket: sc === 'confirm' || sc === 'booked', pending: sc === 'pending',
      letter: sc === 'letter', checklist: sc === 'checklist', whatsapp: sc === 'whatsapp', mapCard: sc === 'map', tour: sc === 'tour', campus: sc === 'campus',
    },
  };
}

/** Back arrow in the top nav. */
function goBack(c: Ctx) {
  const { s, sc, app } = c;
  return () => {
    if (sc === 'testLang') return app.go('map', { walking: false, walkT: 1 });
    if (sc === 'ready') return app.go('testLang');
    if (sc === 'slot') return app.go('intro');
    if (sc === 'confirm') return app.go('slot');
    if (sc === 'history') return s.joined ? app.go('cel', { cel: 'campus', xpGain: 500 }) : app.go('map', { walking: false, walkT: 1 });
    if (sc === 'consent' || sc === 'travel') return app.go('checklist');
    if (s.editing && c.isReg) return app.go('review', { editing: false });
    if (c.regIdx > 0) app.go(c.reg[c.regIdx - 1]);
  };
}

export function journeyVals(app: AppLogic) {
  const c = makeCtx(app);
  const { s, t, D, sc } = c;
  const advance = makeAdvance(c);

  // school must run before the screens that show the chosen school/campus names
  const school = schoolVals(c, advance);
  const fields = fieldsVals(c, advance);
  const choices = choicesVals(c, advance);
  const test = testVals(c);
  const offer = offerVals(c);
  const { cfg, stepsLeft } = stepConfig(c, { advance, timer: test.timer, schoolOk: school.schoolOk, campusOk: school.campusOk, nChecked: offer.nChecked });

  return {
    D, P: c.P, L: journeyLayout(c), t, cfg, hud: hudVals(c),
    dlg: dialogVals(c, stepsLeft, test.timer.answered),
    ...visibility(c),
    ...effectsVals(c),
    langChips: langChips(s.lang, (lang) => c.set({ lang, langSeen: true }), D ? [42, 34, 7] : [34, 30, 7], FS.small, 'box-shadow:0 2px 6px rgba(233,30,99,.4);'),
    ...fields, ...photoVals(c), ...dobVals(c), ...choices, ...placeVals(c), ...school.vals, ...reviewVals(c),
    ...test.vals, ...roundsVals(c), ...tourVals(c), ...offer.vals, ...joiningVals(c), ...celebrationVals(c), ...mapVals(c),
    // feedback overlays
    hasToast: !!s.toast, toastText: s.toast, toastUi: toastUi(c),
    hasMini: !!s.mini, miniText: s.mini, hasSection: !!s.section, sectionText: s.section, hasDialog: !!s.dialog,
    // the "Tap here!" pill shows above the main button when it is enabled and the student has been inactive for 5s
    idleNudge: s.nudge && cfg.hasPrimary && !cfg.primaryDisabled && !s.toast && !s.dialog,
    // Asha: typing dots right after a screen change, then the line (alternating keys restart the animation)
    typing: s.typing, notTyping: !s.typing, parA: s.lineKey % 2 === 0, parB: s.lineKey % 2 === 1,
    ashaCls: s.idle ? 'asha-wiggle' : 'asha-say',
    goBack: goBack(c),
    goQual: () => app.go('qual'),
    askLeave: () => c.set({ dialog: sc === 'test' ? 'leaveTest' : 'leave' }),
    hasHelp: !!s.help, openHelp: () => c.set({ help: true }), closeHelp: () => c.set({ help: false }),
    miniReward: () => app.miniWin(t.done),
  };
}
