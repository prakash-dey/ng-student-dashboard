// App logic: state, timers and navigation. What each screen shows is computed in landing/ and journey/.
// Ported from the design (design-handoff/design/*.dc.html); copy comes from src/i18n.
import { DCLogic, type Device } from './dc';
import { makeFrame } from './frame';
import { walkerPos } from './geometry';
import { phoneMapBox } from './journey/mapBox';
import { fresh, type AppState, type Celebration, type Screen } from './state';
import { landingVals } from './landing';
import { journeyVals } from './journey';
import { questions } from './journey/test';

const TYPING_MS = 520;      // Asha's typing dots after a screen change
const IDLE_MS = 15000;      // Asha wiggles to get attention after this long without input
const TOAST_MS = 1500;      // step-complete toast, then move on
const MINI_MS = 1250;       // small "Saved" pill
const SECTION_MS = 2300;    // section-complete banner
const TOUR_WALK_MS = 3000;
const MAP_WALK_MS = 3200;
const PASS_MARK = 3;        // of 5

export class AppLogic extends DCLogic {
  declare state: AppState;
  DEVICE: Device;
  view = { w: 390, h: 844 };
  timers: ReturnType<typeof setTimeout>[] = [];
  /** set by the map view, scrolled to keep Asha in sight on phone */
  mapEl: HTMLElement | null = null;
  /** set while computing the school step: what an edit from review must revisit */
  _editNeeds: { school: boolean; campus: boolean } = { school: false, campus: false };
  /** which dropdown's search box was focused last (focus once per opening) */
  _focusKey: string | null = null;
  private tick?: ReturnType<typeof setInterval>;
  private idleT?: ReturnType<typeof setTimeout>;

  constructor(device: Device) {
    super();
    this.DEVICE = device;
    this.state = fresh();
  }

  // ---------- frame ----------
  setView(w: number, h: number) { this.view = { w, h }; }
  frame() { return makeFrame(this.DEVICE, this.view); }

  // ---------- lifecycle ----------
  componentDidMount() {
    // live clocks: test timer, retry countdown, booking countdown, call duration
    this.tick = setInterval(() => {
      if (['test', 'fail', 'booked', 'call'].includes(this.state.screen)) this.setState({ now: Date.now() });
    }, 1000);
    this.armIdle();
    this.ldStart();
  }
  componentWillUnmount() {
    clearInterval(this.tick);
    this.clearTimers();
  }
  componentDidUpdate(_: unknown, prev: AppState) {
    if (prev && prev.zone !== 'landing' && this.state.zone === 'landing' && this.state.page === 1) this.ldStart();
  }
  clearTimers() {
    this.timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
    this.timers = [];
    clearTimeout(this.idleT);
  }
  later(fn: () => void, ms: number) { this.timers.push(setTimeout(fn, ms)); }
  armIdle() {
    clearTimeout(this.idleT);
    if (this.state.idle) this.setState({ idle: false });
    this.idleT = setTimeout(() => this.setState({ idle: true }), IDLE_MS);
  }

  // ---------- navigation ----------
  go(screen: Screen, extra: Partial<AppState> = {}) {
    const lineKey = this.state.lineKey + 1;
    this.setState({ screen, dialog: null, help: false, lineKey, typing: true, ...extra });
    this.armIdle();
    this.later(() => { if (this.state.lineKey === lineKey) this.setState({ typing: false }); }, TYPING_MS);
  }
  /** Animate Asha along the map path (walkT 0 -> 1). */
  private walk(ms: number) {
    const t0 = Date.now();
    const id = setInterval(() => {
      const k = Math.min(1, (Date.now() - t0) / ms);
      this.setState({ walkT: k, walking: k < 1 });
      this.follow();
      if (k >= 1) clearInterval(id);
    }, 50);
    this.timers.push(id);
  }
  tourGo(stop: number) {
    if (stop === 0) { this.go('tour', { tourStop: 0, lvl: 1, walkT: 0, walking: false }); return; }
    this.go('tour', { tourStop: stop, lvl: stop, walkT: 0, walking: true });
    this.walk(TOUR_WALK_MS);
  }
  walkTo(lvl: number) {
    this.go('map', { lvl, walkT: 0, walking: true });
    this.walk(MAP_WALK_MS);
  }
  /** Phone map scrolls sideways to keep Asha in view. */
  follow() {
    if (!this.mapEl || this.DEVICE !== 'phone') return;
    const { box } = phoneMapBox(this.frame(), this.state);
    this.mapEl.scrollLeft = Math.max(0, walkerPos(this.state.lvl, this.state.walkT, this.DEVICE, box).x - 170);
  }
  enterJourney() {
    this.setState({ zone: 'journey', langSeen: true, course: null });
    this.tourGo(0);
  }
  enterLogin() {
    this.setState({ zone: 'journey', langSeen: true, course: null });
    this.go('login');
  }
  backToLanding() {
    this.setState({ zone: 'landing', page: 5, phase: 2, dialog: null, jump: false });
  }
  /** About page 1: Asha appears, then the button. */
  ldStart() {
    const run = this.state.run;
    this.later(() => { if (this.state.run === run) this.setState({ phase: 1 }); }, 1300);
    this.later(() => { if (this.state.run === run) this.setState({ phase: 2 }); }, 1900);
  }

  // ---------- feedback ----------
  /** Small pill ("Saved", "Added to calendar"). */
  miniWin(text: string) {
    const key = this.state.miniKey + 1;
    this.setState({ mini: text, miniKey: key });
    this.later(() => { if (this.state.miniKey === key) this.setState({ mini: null }); }, MINI_MS);
  }
  /** Step-complete toast (with the bird), then go to `next` ('@edit' = back towards the review page). */
  microWin(text: string, next: string, extra: Partial<AppState> = {}, _xp = 10, emo = '🎉') {
    if (this.state.toast) return;
    this.setState({ toast: text, toastEmo: emo, toastCol: (this.state.toastCol + 1) % 6 });
    this.later(() => {
      const target = (next === '@edit' ? this.editTarget() : next) as Screen;
      this.go(target, { toast: null, ...extra, ...(target === 'review' ? { editing: false } : {}) });
      if (extra.section) this.later(() => this.setState({ section: null }), SECTION_MS);
    }, TOAST_MS);
  }
  /** After an edit from the review page: back to review, unless a later answer is now missing or invalid. */
  editTarget(): Screen {
    const s = this.state, need = this._editNeeds;
    if (!String(s.sname || '').trim()) return 'sname';
    if (s.qual === 'college' && !s.year) return 'year';
    if (s.qual === 'college' && !s.attend) return 'attend';
    if (need.school) return 'school';
    if (need.campus) return 'campus';
    return 'review';
  }
  celebrate(kind: Celebration) {
    const passed = { ...this.state.passed };
    if (kind === 'test' || kind === 'lr' || kind === 'cfr') passed[kind] = true;
    this.go('cel', { cel: kind, toast: null, passed, joined: this.state.joined || kind === 'campus' });
  }

  // ---------- test ----------
  startCountdown() {
    this.go('countdown', { count: 3, answers: {}, qi: 0 });
    [1, 2, 3].forEach((k) => this.later(() => this.setState({ count: 3 - k }), k * 900));
    this.later(() => this.go('test', { testStart: Date.now(), now: Date.now() }), 3500);
  }
  submitTest() {
    const bank = questions(this.state.testLang || this.state.lang);
    const score = bank.filter(([, , correct], k) => this.state.answers[k] === correct).length;
    this.go('submitting', { dialog: null, score, testAt: Date.now() });
    this.later(() => {
      if (score >= PASS_MARK) this.celebrate('test');
      else this.go('fail', { failAt: Date.now(), now: Date.now() });
    }, 2400);
  }

  // ---------- view ----------
  /** Everything the UI renders: journey values at the top level, About pages under LD. */
  renderVals() {
    const f = this.frame();
    return {
      ...journeyVals(this),
      LD: landingVals(this),
      W: f.W, H: f.H,
      inLanding: this.state.zone === 'landing', inJourney: this.state.zone !== 'landing',
    };
  }
}
