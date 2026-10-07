// App state. Keys match the design's fresh() so design-handoff/reference/states.json applies unchanged.
import type { Lang } from '../i18n';

export type Screen =
  | 'tour' | 'map' | 'cel' | 'history'
  // registration, in regFor() order
  | 'login' | 'phone' | 'name' | 'dob' | 'gender' | 'pincode' | 'category' | 'qual' | 'sname' | 'year' | 'attend' | 'photo' | 'school' | 'campus' | 'review'
  // aptitude test
  | 'testLang' | 'ready' | 'countdown' | 'test' | 'submitting' | 'fail'
  // interview rounds (state.round says which)
  | 'intro' | 'slot' | 'confirm' | 'booked' | 'call' | 'pending'
  // offer and joining
  | 'letter' | 'checklist' | 'consent' | 'travel' | 'whatsapp';

export type Round = 'lr' | 'cfr';
export type Celebration = 'reg' | 'test' | 'lr' | 'cfr' | 'sel' | 'campus';
export type Dialog = 'leave' | 'leaveTest' | 'submit' | 'cancel';
export interface Booking { dayIdx: number; time: string }

export interface AppState {
  // which part of the app shows: the About pages or the journey
  zone: 'landing' | 'journey';
  // About pages
  phase: number; page: number; run: number; course: number | null; tab: number; camp: number;
  // journey position
  screen: Screen; lang: Lang; langSeen: boolean;
  // registration answers
  first: string; last: string; photo: 'none' | 'scan' | 'done'; dobD: string; dobM: string; dobY: string;
  gender: 'boy' | 'girl' | 'other' | null; phone: string; sameWa: boolean; wa: string; pName: string; pPhone: string;
  pin: string; pinState: string; district: string; stateName: string; placeOpen: 'state' | 'district' | null; placeQuery: string;
  status: string | null; qual: '12' | 'college' | 'grad' | 'diploma' | null; sname: string; year: string | null;
  attend: 'regular' | 'exams' | null; email: string; loginDone: boolean; help: boolean; editing: boolean;
  medium: string | null; cat: number | null; school: string | null; campus: string | null; openSchool: string | null;
  // transient feedback
  xp: number; xpPulse: number; toast: string | null; toastXp: number; toastEmo: string; toastCol: number;
  mini: string | null; miniKey: number; section: string | null; dialog: Dialog | null; jump: boolean;
  lineKey: number; typing: boolean; idle: boolean; voice: boolean;
  /** show the "Tap here!" pill: true after 5s without any input */
  nudge: boolean;
  // test
  answers: Record<number, number>; qi: number; testStart: number; now: number; testLang: Lang | null; score: number;
  failAt: number; testAt: number; count: number;
  // interview rounds
  round: Round; dayIdx: number; time: string | null; reason: number | null; bookedLr: Booking | null; bookedCfr: Booking | null;
  callStart: number; micOff: boolean; camOff: boolean;
  // map / celebrations / joining
  checks: boolean[]; cel: Celebration | null; xpGain: number; lvl: number; walkT: number; walking: boolean; tourStop: number;
  consent: boolean; travelMode: 'train' | 'bus' | 'other' | null; travelDay: number | null;
  passed: { test: boolean; lr: boolean; cfr: boolean }; offerAccepted: boolean; joined: boolean; alum: number;
}

export function fresh(): AppState {
  return {
    zone: 'landing', phase: 0, page: 1, run: 0, course: null, tab: 0, camp: 0,
    screen: 'tour', langSeen: false, lang: 'en', first: '', last: '', photo: 'none', dobD: '12', dobM: '6', dobY: '2006', gender: null,
    phone: '', sameWa: true, wa: '', pName: '', pPhone: '', pin: '', pinState: 'idle', district: '', stateName: '', placeOpen: null, placeQuery: '',
    status: null, qual: null, sname: '', year: null, attend: null, email: '', loginDone: false, help: false, editing: false,
    medium: null, cat: null, school: null, campus: null,
    xp: 50, xpPulse: 0, toast: null, toastXp: 10, mini: null, miniKey: 0, section: null, dialog: null, jump: false,
    answers: {}, qi: 0, testStart: 0, now: Date.now(), testLang: null, score: 0, failAt: 0,
    round: 'lr', dayIdx: 0, time: null, reason: null, bookedLr: null, bookedCfr: null,
    checks: [false, false, false, false], cel: null, xpGain: 0, lvl: 1, walkT: 1, walking: false, count: 3, idle: false, nudge: false,
    tourStop: 0, lineKey: 0, typing: false, voice: false, openSchool: null, toastEmo: '🎉', toastCol: 0,
    callStart: 0, micOff: false, camOff: false, consent: false, travelMode: null, travelDay: null, testAt: 0,
    passed: { test: false, lr: false, cfr: false }, offerAccepted: false, joined: false, alum: 0,
  };
}
