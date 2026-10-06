// The design's app logic, ported from design-handoff/design/{phone,pc}.dc.html (<script> block).
// fresh() = state shape, regFor() = registration order, ldVals()/jvVals()/renderVals() = what each screen shows.
// Keep it in step with the design; copy comes from src/i18n, not from literals here.
import { DCLogic, type Device } from './dc';
import { I18N, type Lang } from '../i18n';

export class DesignLogic extends DCLogic {
  [key: string]: any;
  constructor(device: Device) {
    super();
    this.DEVICE = device;
    this.state = this.fresh();
    this.timers = [];
  }
  // ---------- responsive frame ----------
  // The design is drawn at 390x844 (phone) and 1440x900 (pc). Layouts are computed for the real viewport:
  // sizes stay as designed, gutters stay, widths stretch, top/bottom anchors are kept and the middle flexes.
  // Below the minimums the frame stops shrinking and the page scrolls instead.
  view = { w: 390, h: 844 };
  setView(w: number, h: number) { this.view = { w: w, h: h }; }
  frameW() { return Math.max(this.view.w, this.DEVICE === 'desktop' ? 900 : 320); }
  frameH() { return Math.max(this.view.h, this.DEVICE === 'desktop' ? 640 : 600); }
  fresh() {
    return {
      zone: 'landing', phase: 0, page: 1, run: 0, course: null, tab: 0, camp: 0,
      screen: 'about2', langSeen: false, lang: 'en', first: '', last: '', photo: 'none', dobD: '12', dobM: '6', dobY: '2006', gender: null,
      phone: '', sameWa: true, wa: '', pName: '', pPhone: '', pin: '', pinState: 'idle', district: '', stateName: '', placeOpen: null, placeQuery: '', status: null, qual: null, sname: '', year: null, attend: null, email: '', loginDone: false, help: false, editing: false,
      medium: null, cat: null, school: null, campus: null,
      xp: 50, xpPulse: 0, toast: null, toastXp: 10, mini: null, miniKey: 0, section: null, dialog: null, jump: false,
      answers: {}, qi: 0, testStart: 0, now: Date.now(), testLang: null, score: 0, failAt: 0,
      round: 'lr', dayIdx: 0, time: null, reason: null, bookedLr: null, bookedCfr: null,
      checks: [false, false, false, false], cel: null, xpGain: 0, lvl: 1, walkT: 1, walking: false, count: 3, idle: false,
      tourStop: 0, lineKey: 0, typing: false, voice: false, openSchool: null, toastEmo: '🎉', toastCol: 0,
      callStart: 0, micOff: false, camOff: false, consent: false, travelMode: null, travelDay: null, testAt: 0,
      passed: { test: false, lr: false, cfr: false }, offerAccepted: false, joined: false, alum: 0
    };
  }
  componentDidMount() {
    var self = this;
    this.tick = setInterval(function () {
      var sc = self.state.screen;
      if (sc === 'test' || sc === 'fail' || sc === 'booked' || sc === 'call') self.setState({ now: Date.now() });
    }, 1000);
    this.armIdle();
    this.ldStart();
  }
  componentWillUnmount() {
    clearInterval(this.tick);
    this.timers.forEach(function (t?: any) { clearTimeout(t); clearInterval(t); });
    clearTimeout(this.idleT);
  }
  later(fn?: any, ms?: any) { this.timers.push(setTimeout(fn, ms)); }
  armIdle() {
    var self = this;
    clearTimeout(this.idleT);
    if (this.state.idle) this.setState({ idle: false });
    this.idleT = setTimeout(function () { self.setState({ idle: true }); }, 15000);
  }
  go(screen?: any, extra?: any) {
    var self = this;
    var patch = Object.assign({ screen: screen, dialog: null, help: false, lineKey: this.state.lineKey + 1, typing: true }, extra || {});
    this.setState(patch);
    this.armIdle();
    var key = patch.lineKey;
    this.later(function () { if (self.state.lineKey === key) self.setState({ typing: false }); }, 520);
  }
  componentDidUpdate(prevProps?: any, prevState?: any) {
    var self = this;
    if (prevState && prevState.zone !== 'landing' && this.state.zone === 'landing' && this.state.page === 1) this.ldStart();
  }
  tourGo(k?: any) {
    var self = this;
    if (k === 0) { this.go('tour', { tourStop: 0, lvl: 1, walkT: 0, walking: false }); return; }
    this.go('tour', { tourStop: k, lvl: k, walkT: 0, walking: true });
    var t0 = Date.now(), dur = 3000;
    var id = setInterval(function () {
      var kk = Math.min(1, (Date.now() - t0) / dur);
      self.setState({ walkT: kk, walking: kk < 1 });
      self.follow();
      if (kk >= 1) clearInterval(id);
    }, 50);
    this.timers.push(id);
  }
  speak(text?: any) {}
  bump(n?: any, delay?: any) {
    var self = this;
    this.later(function () { self.setState({ xp: self.state.xp + n, xpPulse: self.state.xpPulse + 1 }); }, delay || 0);
  }
  miniWin(text?: any, n?: any) {
    this.setState({ mini: text, miniKey: this.state.miniKey + 1 });
    this.bump(n, 300);
    var self = this, key = this.state.miniKey + 1;
    this.later(function () { if (self.state.miniKey === key) self.setState({ mini: null }); }, 1250);
  }
  microWin(text?: any, next?: any, extra?: any, xp?: any, emo?: any) {
    var self = this;
    if (this.state.toast) return;
    xp = xp || 10;
    this.setState({ toast: text, toastXp: xp, toastEmo: emo || '🎉', toastCol: (this.state.toastCol + 1) % 6 });
    this.bump(xp, 1350);
    this.later(function () {
      var target = next === '@edit' ? self.editTarget() : next;
      self.go(target, Object.assign({ toast: null }, extra || {}, target === 'review' ? { editing: false } : {}));
      var sec = extra && extra.section;
      if (sec) { self.bump(50, 400); self.later(function () { self.setState({ section: null }); }, 2300); }
    }, 1500);
  }
  // After an edit made from the review page: go straight back to review, unless the edit left a later answer missing or no longer valid.
  editTarget() {
    var st = this.state, need = this._editNeeds || {};
    if (!String(st.sname || '').trim()) return 'sname';
    if (st.qual === 'college' && !st.year) return 'year';
    if (st.qual === 'college' && !st.attend) return 'attend';
    if (need.school) return 'school';
    if (need.campus) return 'campus';
    return 'review';
  }
  celebrate(kind?: any) {
    var self = this, n = 0, target = kind === 'campus' ? 500 : 100;
    var ps = Object.assign({}, this.state.passed);
    if (kind === 'test') ps.test = true;
    if (kind === 'lr') ps.lr = true;
    if (kind === 'cfr') ps.cfr = true;
    this.go('cel', { cel: kind, xpGain: 0, toast: null, passed: ps, joined: this.state.joined || kind === 'campus' });
    var id = setInterval(function () {
      n += target / 20;
      self.setState({ xpGain: Math.round(n) });
      if (n >= target) { clearInterval(id); self.bump(target, 0); }
    }, 30);
    this.timers.push(id);
  }
  walkTo(lvl?: any) {
    var self = this;
    this.go('map', { lvl: lvl, walkT: 0, walking: true });
    var t0 = Date.now(), dur = 3200;
    var id = setInterval(function () {
      var k = Math.min(1, (Date.now() - t0) / dur);
      self.setState({ walkT: k, walking: k < 1 });
      self.follow();
      if (k >= 1) clearInterval(id);
    }, 50);
    this.timers.push(id);
  }
  follow() {
    if (!this.mapEl || this.DEVICE !== 'phone') return;
    var p = this.walkerPos();
    this.mapEl.scrollLeft = Math.max(0, p.x - 170);
  }
  mapScale() { return this.DEVICE === 'phone' ? 446 / 934 : 820 / 1604; }
  legs() {
    return [
      [[200, 700], [250, 620], [270, 575], [330, 560]],
      [[330, 560], [420, 585], [560, 585], [700, 570], [790, 560]],
      [[790, 560], [880, 610], [980, 650], [1090, 650]],
      [[1090, 650], [1180, 610], [1250, 520], [1320, 440], [1420, 420]]
    ];
  }
  walkerPos() {
    var leg = this.legs()[Math.max(0, Math.min(3, this.state.lvl - 1))];
    var d = [0], i, tot = 0;
    for (i = 1; i < leg.length; i++) { tot += Math.hypot(leg[i][0] - leg[i - 1][0], leg[i][1] - leg[i - 1][1]); d.push(tot); }
    var target = this.state.walkT * tot, x = leg[leg.length - 1][0], y = leg[leg.length - 1][1];
    for (i = 1; i < leg.length; i++) {
      if (target <= d[i]) {
        var f = (target - d[i - 1]) / (d[i] - d[i - 1] || 1);
        x = leg[i - 1][0] + (leg[i][0] - leg[i - 1][0]) * f;
        y = leg[i - 1][1] + (leg[i][1] - leg[i - 1][1]) * f;
        break;
      }
    }
    var s = this.mapScale();
    return { x: x * s, y: y * s };
  }

  ldStart() {
    var self = this, run = this.state.run;
    this.timers.push(setTimeout(function () { if (self.state.run === run) { self.setState({ phase: 1 }); self.ldSpeak(); } }, 1300));
    this.timers.push(setTimeout(function () { if (self.state.run === run) self.setState({ phase: 2 }); }, 1900));
  }
  ldTexts() {
    return I18N[this.state.lang as Lang].landing;
  }
  ldSpeak() {}
  ldVals() {
    var self = this, s = this.state, D = this.DEVICE === 'desktop';
    var t = this.ldTexts();
    var W = this.frameW(), H = this.frameH();
    // phone: content column (designed at 390 wide with 18px gutters), centred and capped on tablets
    var CW = Math.min(W, 560), X0 = Math.round((W - CW) / 2);
    var L: any = {};
    var hide = s.page > 1 ? 'opacity:0;pointer-events:none;' : 'opacity:1;';
    var disp = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;";
    var stamp = "align-self:" + (D ? 'flex-start' : 'center') + ";display:flex;align-items:center;gap:8px;padding:" + (D ? '10px 22px' : '8px 16px') + ";border-radius:999px;background:#FFFFFF;border:2.5px dashed #E91E63;color:#BE185D;font-family:'JetBrains Mono','Noto Sans Devanagari',monospace;font-weight:700;letter-spacing:.14em;box-shadow:0 8px 22px rgba(233,30,99,.22);font-size:" + (D ? 16 : 13) + 'px';
    if (!D) {
      L.bg = 'position:absolute;left:0;top:0;width:100%;height:100%;background-position:38% 50%';
      L.overlay = 'position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(180deg,rgba(255,251,243,.96) 0%,rgba(255,251,243,.9) 26%,rgba(255,251,243,.35) 44%,rgba(255,251,243,.1) 62%,rgba(255,251,243,.75) 86%,rgba(255,251,243,.95) 100%)';
      L.bar = 'position:absolute;left:0;top:0;width:' + W + 'px;box-sizing:border-box;padding:12px 14px;display:flex;align-items:center;gap:8px;z-index:20';
      L.logo = 'height:26px;width:auto;min-width:0;flex-shrink:1;object-fit:contain;object-position:left center'; // only the logo gives way on very narrow screens
      // page 1: heading and Asha share one column between the top bar and the CTA; Asha takes what is left
      L.p1Stack = 'position:absolute;left:' + X0 + 'px;width:' + CW + 'px;top:78px;bottom:144px;display:flex;flex-direction:column;z-index:10;pointer-events:none';
      L.head = 'position:relative;margin:0 18px;flex-shrink:0;display:flex;flex-direction:column;gap:14px;' + hide;
      L.stamp = stamp;
      L.h1 = disp + 'font-size:31px;line-height:1.12;color:#0F172A;text-align:center';
      L.h2 = disp + 'font-size:31px;line-height:1.12;color:#E91E63;text-align:center';
      L.ashaZone = 'position:relative;flex:1 1 0;min-height:0;' + hide;
      L.ashaFitH = 330; L.ashaFitOrigin = '30% 100%';
      L.bubbleBox = 'position:absolute;left:0;right:0;bottom:0;height:min(330px,100%)';
      L.walker = 'position:absolute;left:36px;top:60px;width:132px;height:250px';
      L.asha = 'position:absolute;left:-22px;top:56px;width:300px;height:auto';
      L.disc = 'position:absolute;left:44px;top:288px;width:170px;height:28px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.5),rgba(236,72,153,0) 70%)';
      L.bubble = 'position:absolute;right:14px;top:0;width:' + Math.min(214, CW - 154) + 'px;box-sizing:border-box;padding:14px 16px;border-radius:24px 24px 24px 6px;background:rgba(255,255,255,.94);border:1.5px solid #FFFFFF;box-shadow:0 10px 30px rgba(190,24,93,.18)';
      L.bubbleText = disp + 'font-size:19px;line-height:1.22;color:#0F172A';
      L.tw = 'position:absolute;left:26px;top:70px';
      L.ctaPos = 'position:absolute;left:' + (X0 + 20) + 'px;width:' + (CW - 44) + 'px;bottom:34px';
      L.cta = "width:100%;height:68px;border:none;border-radius:999px;color:#FFFFFF;" + disp + 'font-size:25px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px';
      L.birdPos = 'position:absolute;left:0;top:268px;z-index:9';
      L.p2head = 'position:absolute;left:18px;top:70px;width:354px;display:flex;align-items:center;gap:14px;z-index:10';
      L.fee = 'width:92px;height:92px;flex-shrink:0;border-radius:999px;border:4px dashed #E91E63;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(233,30,99,.2)';
      L.feeSmall = "font-family:'JetBrains Mono','Noto Sans Devanagari',monospace;font-weight:700;letter-spacing:.14em;color:#BE185D;font-size:11px"; L.feeBig = disp + 'line-height:1;color:#E91E63;font-size:36px';
      L.p2h1 = disp + 'font-size:24px;line-height:1.15;color:#0F172A';
      L.p2h2 = disp + 'font-size:24px;line-height:1.15;color:#E91E63';
      L.cards = 'position:absolute;left:18px;top:186px;width:354px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;z-index:10';
      L.icon = 'font-size:44px;line-height:1.15'; L.thali = 'width:52px;height:52px';
      L.cardLabel = disp + 'font-size:19px;line-height:1.1;color:#0F172A;text-align:center';
      L.asha2Zone = 'position:absolute;left:0;top:596px;width:390px;height:150px;z-index:10';
      L.asha2 = 'position:absolute;left:-8px;top:0;width:176px;height:auto';
      L.bubble2 = 'position:absolute;left:150px;right:16px;top:26px;box-sizing:border-box;padding:12px 14px;border-radius:22px 22px 22px 6px;background:rgba(255,255,255,.95);border:1.5px solid #FFFFFF;box-shadow:0 10px 26px rgba(190,24,93,.16)';
      L.bubble2Text = disp + 'font-size:18px;line-height:1.2;color:#0F172A';
      L.cta2Wrap = 'position:absolute;left:18px;top:756px;width:354px;display:flex;gap:10px;z-index:12;animation-delay:1.4s';
      L.p3head = 'position:absolute;left:18px;top:66px;width:354px;display:flex;flex-direction:column;gap:8px;z-index:10';
      L.commonChip = 'font-size:12px;font-weight:800;padding:3px 10px;border-radius:999px;background:#FFFFFF;border:1.5px solid #FBCFE8;color:#9D174D';
      L.courseGrid = 'position:absolute;left:18px;top:176px;width:354px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;z-index:10';
      L.courseName = disp + 'font-size:20px;line-height:1.1;color:#0F172A;text-align:center';
      L.miniChip = 'display:flex;align-items:center;gap:3px;font-size:11.5px;font-weight:800;padding:2px 7px;border-radius:999px;background:#F1F5F9;color:#334155;white-space:nowrap';
      L.asha3Zone = 'position:absolute;left:0;top:612px;width:390px;height:140px;z-index:10';
      L.cta3Wrap = 'position:absolute;left:18px;top:756px;width:354px;display:flex;gap:10px;z-index:12;animation-delay:.9s';
      L.scrim = 'position:absolute;left:0;top:0;width:100%;height:100%;z-index:40;background:rgba(15,23,42,.55);display:flex;align-items:flex-end;justify-content:center';
      L.sheet = 'width:390px;max-height:760px;box-sizing:border-box;background:#FFFFFF;border-radius:30px 30px 0 0;padding:18px 18px 20px;display:flex;flex-direction:column;gap:12px';
      L.factChip = 'display:flex;align-items:center;gap:5px;font-size:13px;font-weight:800;padding:4px 10px;border-radius:999px;background:#FFF7ED;border:1.5px solid #FED7AA;color:#9A3412';
      L.backBtn = "height:66px;padding:0 20px;border-radius:999px;border:2px solid #E2E8F0;background:#FFFFFF;color:#334155;" + disp + 'font-size:18px;cursor:pointer';
      L.cta2 = "flex-grow:1;height:66px;border:none;border-radius:999px;color:#FFFFFF;" + disp + 'font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px';
    } else {
      L.bg = 'position:absolute;left:0;top:0;width:100%;height:100%;background-position:50% 40%';
      L.overlay = 'position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(90deg,rgba(255,251,243,.96) 0%,rgba(255,251,243,.88) 34%,rgba(255,251,243,.3) 56%,rgba(255,251,243,.05) 100%)';
      L.bar = 'position:absolute;left:0;top:0;width:1440px;box-sizing:border-box;padding:22px 40px;display:flex;align-items:center;gap:12px;z-index:20';
      L.logo = 'height:38px;width:auto';
      L.head = 'position:absolute;left:90px;top:180px;width:700px;display:flex;flex-direction:column;gap:22px;z-index:10;' + hide;
      L.stamp = stamp;
      L.h1 = disp + 'font-size:54px;line-height:1.08;color:#0F172A';
      L.h2 = disp + 'font-size:54px;line-height:1.08;color:#E91E63';
      L.ashaZone = 'position:absolute;left:760px;top:120px;width:680px;height:780px;z-index:10;' + hide;
      L.walker = 'position:absolute;left:130px;top:230px;width:290px;height:550px';
      L.asha = 'position:absolute;left:-40px;top:230px;width:660px;height:auto';
      L.disc = 'position:absolute;left:90px;top:735px;width:400px;height:50px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.5),rgba(236,72,153,0) 70%)';
      L.bubble = 'position:absolute;left:365px;top:110px;width:300px;box-sizing:border-box;padding:22px 26px;border-radius:32px 32px 32px 8px;background:rgba(255,255,255,.95);border:1.5px solid #FFFFFF;box-shadow:0 14px 40px rgba(190,24,93,.2)';
      L.bubbleText = disp + 'font-size:30px;line-height:1.18;color:#0F172A';
      L.tw = 'position:absolute;left:40px;top:300px;transform:scale(1.6)';
      L.ctaPos = 'position:absolute;left:84px;top:484px;width:330px';
      L.p1Stack = 'position:absolute;left:0;top:0;width:100%;height:100%;z-index:10;pointer-events:none';
      L.ashaFitH = 0; L.bubbleBox = '';
      L.cta = "width:100%;height:76px;border:none;border-radius:999px;color:#FFFFFF;" + disp + 'font-size:30px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:12px';
      L.birdPos = 'position:absolute;left:0;top:120px;z-index:9';
      L.p2head = 'position:absolute;left:90px;top:150px;width:600px;display:flex;flex-direction:column;align-items:flex-start;gap:20px;z-index:10';
      L.fee = 'width:124px;height:124px;flex-shrink:0;border-radius:999px;border:5px dashed #E91E63;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(233,30,99,.2)';
      L.feeSmall = "font-family:'JetBrains Mono','Noto Sans Devanagari',monospace;font-weight:700;letter-spacing:.14em;color:#BE185D;font-size:14px"; L.feeBig = disp + 'line-height:1;color:#E91E63;font-size:50px';
      L.p2h1 = disp + 'font-size:52px;line-height:1.08;color:#0F172A';
      L.p2h2 = disp + 'font-size:52px;line-height:1.08;color:#E91E63';
      L.cards = 'position:absolute;left:760px;top:150px;width:590px;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:16px;z-index:10';
      L.icon = 'font-size:64px;line-height:1.15'; L.thali = 'width:76px;height:76px';
      L.cardLabel = disp + 'font-size:24px;line-height:1.1;color:#0F172A;text-align:center';
      L.asha2Zone = 'position:absolute;left:60px;top:560px;width:640px;height:340px;z-index:10';
      L.asha2 = 'position:absolute;left:0;top:0;width:400px;height:auto';
      L.bubble2 = 'position:absolute;left:330px;top:70px;width:300px;box-sizing:border-box;padding:18px 22px;border-radius:28px 28px 28px 8px;background:rgba(255,255,255,.95);border:1.5px solid #FFFFFF;box-shadow:0 12px 34px rgba(190,24,93,.18)';
      L.bubble2Text = disp + 'font-size:25px;line-height:1.2;color:#0F172A';
      L.cta2Wrap = 'position:absolute;left:760px;top:690px;width:590px;display:flex;gap:14px;z-index:12;animation-delay:1.4s';
      L.p3head = 'position:absolute;left:90px;top:170px;width:600px;display:flex;flex-direction:column;gap:18px;z-index:10';
      L.commonChip = 'font-size:16px;font-weight:800;padding:5px 14px;border-radius:999px;background:#FFFFFF;border:1.5px solid #FBCFE8;color:#9D174D';
      L.courseGrid = 'position:absolute;left:760px;top:120px;width:590px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;z-index:10';
      L.courseName = disp + 'font-size:26px;line-height:1.1;color:#0F172A;text-align:center';
      L.miniChip = 'display:flex;align-items:center;gap:4px;font-size:13px;font-weight:800;padding:3px 9px;border-radius:999px;background:#F1F5F9;color:#334155;white-space:nowrap';
      L.asha3Zone = 'position:absolute;left:60px;top:560px;width:640px;height:340px;z-index:10';
      L.cta3Wrap = 'position:absolute;left:760px;top:720px;width:590px;display:flex;gap:14px;z-index:12;animation-delay:.9s';
      L.scrim = 'position:absolute;left:0;top:0;width:100%;height:100%;z-index:40;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center';
      L.sheet = 'width:560px;box-sizing:border-box;background:#FFFFFF;border-radius:30px;padding:26px 26px 24px;display:flex;flex-direction:column;gap:14px;box-shadow:0 30px 70px rgba(15,23,42,.4)';
      L.factChip = 'display:flex;align-items:center;gap:5px;font-size:14px;font-weight:800;padding:5px 12px;border-radius:999px;background:#FFF7ED;border:1.5px solid #FED7AA;color:#9A3412';
      L.backBtn = "height:76px;padding:0 30px;border-radius:999px;border:2px solid #E2E8F0;background:#FFFFFF;color:#334155;" + disp + 'font-size:22px;cursor:pointer';
      L.cta2 = "flex-grow:1;height:76px;border:none;border-radius:999px;color:#FFFFFF;" + disp + 'font-size:30px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:12px';
    }
    L.stampInner = "flex-grow:1;border-radius:999px;border:1px dashed #86C79B;display:flex;align-items:center;justify-content:center;color:#15803D;font-family:'JetBrains Mono','Noto Sans Devanagari',monospace;font-weight:700;letter-spacing:.04em;line-height:1;font-size:" + (D ? 11 : 10) + 'px';
    // ---- page 4: campuses. CAMP_PHOTOS = one photo per campus, in the order of t.c4.names; swap a /_blob/ url to change a photo.
    var CAMP_PHOTOS = ['/media/campus-1.jpg', '/media/campus-2.jpg', '/media/campus-3.jpg', '/media/campus-4.jpg', '/media/campus-5.jpg', '/media/campus-6.jpg'];
    L.c4head = D ? 'position:absolute;left:90px;top:88px;width:1260px;z-index:10' : 'position:absolute;left:18px;top:66px;width:354px;z-index:10';
    L.c4h = 'margin:0;display:flex;' + (D ? 'flex-direction:row;align-items:baseline;gap:14px' : 'flex-direction:column');
    L.c4h1 = disp + 'font-size:' + (D ? 40 : 24) + 'px;line-height:1.15;color:#0F172A';
    L.c4h2 = disp + 'font-size:' + (D ? 40 : 24) + 'px;line-height:1.15;color:#E91E63';
    L.campList = D ? 'position:absolute;left:90px;top:156px;width:1260px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;z-index:10'
      : 'position:absolute;left:0;top:130px;width:390px;height:616px;box-sizing:border-box;padding:4px 18px 16px;overflow-y:auto;scrollbar-width:none;display:flex;flex-direction:column;gap:16px;z-index:10';
    L.c4cta = D ? 'position:absolute;left:760px;top:798px;width:590px;display:flex;gap:14px;z-index:12;animation-delay:.6s' : L.cta3Wrap;
    L.campCard = 'display:flex;flex-direction:column;flex-shrink:0;border-radius:20px;overflow:hidden;background:#FFFFFF;border:1px solid #F1E7D6;box-shadow:0 8px 24px rgba(15,23,42,.08)';
    L.campPhoto = 'display:block;width:100%;height:' + (D ? 144 : 168) + 'px;object-fit:cover;flex-shrink:0;background:#E2E8F0';
    L.campBody = 'display:flex;flex-direction:column;gap:8px;box-sizing:border-box;padding:' + (D ? '14px 18px 16px' : '12px 16px 14px');
    L.campName = disp + 'font-size:' + (D ? 22 : 20) + 'px;line-height:1.15;color:#0F172A';
    L.campMeta = 'font-size:' + (D ? 15 : 14) + 'px;font-weight:600;line-height:1.35;color:#475569';
    L.campNote = 'display:flex;align-items:flex-start;gap:8px;padding:8px 10px;border-radius:14px;background:#FFF7ED;border:1.5px solid #FED7AA;color:#9A3412;font-weight:700;line-height:1.25;font-size:13px';
    var chipBase = 'font-size:12.5px;font-weight:800;line-height:1.3;padding:4px 10px;border-radius:999px;white-space:nowrap;';
    var CC: any = { SOP: ['#DBEAFE', '#1D4ED8', 0], SOB: ['#D1FAE5', '#047857', 1], SOF: ['#FEF3C7', '#92400E', 2], BCA: ['#EDE9FE', '#6D28D9', 3] };
    var campuses = [
      { boys: true, courses: ['SOP', 'SOB'] },
      { courses: ['SOP', 'SOB', 'SOF'] },
      { courses: ['SOP', 'SOB'], note: t.c4.only[0] },
      { courses: ['SOP', 'SOB', 'SOF'], note: t.c4.only[1] },
      { courses: ['SOP', 'SOB'] },
      { courses: ['BCA'] }
    ].map(function (c?: any, k?: any) {
      return { name: t.c4.names[k], photo: CAMP_PHOTOS[k], whoLabel: c.boys ? t.c4.boys : t.c4.girls, who: 'position:absolute;left:12px;top:12px;padding:4px 12px;border-radius:999px;color:#FFFFFF;font-weight:800;line-height:1.3;font-size:14px;box-shadow:0 3px 10px rgba(15,23,42,.3);background:' + (c.boys ? '#1D4ED8' : '#BE185D'),
        chips: c.courses.map(function (code?: any) { return { label: code === 'BCA' ? t.c4.bca : code + ' · ' + t.x.names[CC[code][2]], style: 'font-size:12.5px;font-weight:600;line-height:1.3;padding:4px 10px;border-radius:999px;white-space:nowrap;background:#F1F5F9;color:#334155' }; }), note: c.note || '', hasNote: !!c.note };
    });
    // ---- page 5: success stories. Every card shows the same [bracketed] placeholders until real alumni data is supplied.
    L.alCard = L.campCard + ';box-sizing:border-box;gap:12px;margin-right:' + (D ? 20 : 14) + 'px;width:' + (D ? 400 : 322) + 'px;padding:' + (D ? '18px 20px' : '16px');
    L.s5 = D ? 'position:absolute;left:0;top:150px;width:1440px;z-index:10' : 'position:absolute;left:0;top:130px;width:390px;height:616px;box-sizing:border-box;padding-bottom:16px;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;z-index:10';
    L.alWrap = 'width:100%;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;display:flex;flex-direction:column;gap:' + (D ? 0 : 2) + 'px';
    L.alRow = 'padding:6px 0 16px';
    L.alLogo = 'width:22px;height:22px;flex-shrink:0;box-sizing:border-box;border-radius:6px;border:1.5px dashed #94A3B8;background:#F8FAFC';
    L.alCompany = 'font-size:14px;font-weight:700;line-height:1.3;color:#475569';
    L.alSalary = 'align-self:flex-start;flex-shrink:0;font-size:12.5px;font-weight:800;line-height:1.3;padding:4px 10px;border-radius:999px;white-space:nowrap;background:#D1FAE5;color:#047857';
    L.alTimeline = 'display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:#FFF7ED';
    L.alLabel = 'font-size:12px;font-weight:700;line-height:1.3;color:#64748B';
    L.alValue = 'font-size:14px;font-weight:800;line-height:1.3;color:#0F172A';
    L.alQuote2 = 'margin:0;font-size:' + (D ? 17 : 16) + 'px;font-weight:500;font-style:italic;line-height:1.45;color:#334155';
    L.alQuote = 'margin:0;font-size:14px;font-weight:500;font-style:italic;line-height:1.4;color:#475569';
    // SAMPLE DATA: invented names, companies, dates, salaries and quotes, with two stand-in photos. Replace before this is shown publicly.
    var AL_PHOTOS = ['/media/alumni-1.jpg', '/media/alumni-2.jpg'];
    L.alAvatar = 'width:56px;height:56px;flex-shrink:0;border-radius:999px;object-fit:cover;object-position:50% 20%;background:#E2E8F0';
    var alumni = [
      ['Rohit K.', 'Brightloop Tech', 'B', '#2563EB', [6, 2022], [3, 2024], '₹4.2 LPA', 0],
      ['Pooja S.', 'Kirana Cloud', 'K', '#059669', [0, 2023], [1, 2024], '₹3.0 LPA', 1],
      ['Anjali R.', 'CodeNest Labs', 'C', '#7C3AED', [8, 2021], [7, 2023], '₹5.5 LPA', 1],
      ['Imran A.', 'PaySetu', 'P', '#D97706', [3, 2023], [0, 2024], '₹2.8 LPA', 0],
      ['Suraj P.', 'Zentra Systems', 'Z', '#0F766E', [10, 2021], [9, 2023], '₹6.0 LPA', 0],
      ['Kavita M.', 'FinSaathi', 'F', '#BE185D', [5, 2022], [4, 2023], '₹3.4 LPA', 1]
    ].map(function (a?: any, k?: any) {
      return { name: a[0], company: a[1], logoText: a[2], photo: AL_PHOTOS[a[7]], salary: a[6], quote: '“' + t.c5.quotes[k] + '”', quote2: '“' + t.c5.quotes2[k] + '”',
        joined: t.c5.months[a[4][0]] + ' ' + a[4][1], placed: t.c5.months[a[5][0]] + ' ' + a[5][1],
        logo: "width:22px;height:22px;flex-shrink:0;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:14px;line-height:1;background:" + a[3] };
    });
    // SAMPLE DATA: invented hiring companies with letter-tile logos. Replace with the real list and logo files.
    L.coHead = disp + 'line-height:1.2;color:#0F172A;' + (D ? 'margin:30px 90px 14px;font-size:28px' : 'margin:28px 18px 12px;font-size:19px');
    L.coGrid = 'display:grid;' + (D ? 'margin:0 90px;grid-template-columns:repeat(8,minmax(0,1fr));gap:12px' : 'margin:0 18px;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px');
    L.coTile = 'display:flex;align-items:center;gap:9px;box-sizing:border-box;min-width:0;padding:' + (D ? '10px 12px' : '9px 10px') + ';border-radius:16px;background:#FFFFFF;border:1px solid #F1E7D6;box-shadow:0 4px 14px rgba(15,23,42,.06)';
    L.coName = 'min-width:0;font-weight:800;line-height:1.2;color:#0F172A;font-size:14px';
    var companies = [['Brightloop Tech', 'B', '#2563EB'], ['Kirana Cloud', 'K', '#059669'], ['CodeNest Labs', 'C', '#7C3AED'], ['PaySetu', 'P', '#D97706'], ['Zentra Systems', 'Z', '#0F766E'], ['FinSaathi', 'F', '#BE185D'], ['Tarang Soft', 'T', '#0369A1'], ['Nimbus Kart', 'N', '#B45309']].map(function (c?: any) {
      var z = 30;
      return { name: c[0], letter: c[1], logo: 'width:' + z + 'px;height:' + z + "px;flex-shrink:0;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-family:'Baloo 2',sans-serif;font-weight:800;line-height:1;font-size:17px;background:" + c[2] };
    });
    var leafColors = ['#10B981', '#34D399', '#059669', '#F59E0B', '#FBBF24', '#86EFAC'];
    var leaves: any[] = [], i, n = D ? 18 : 12;
    for (i = 0; i < n; i++) leaves.push({ size: 14 + (i * 7) % 16, color: leafColors[i % 6], style: 'left:' + ((i * 61) % (W - 10)) + 'px;z-index:' + (i % 3 === 0 ? 16 : 5) + ';animation-duration:' + (9 + (i * 13) % 9) + 's;animation-delay:-' + ((i * 1.7) % 11).toFixed(1) + 's' });
    var langChips = [['en', 'EN', 'English'], ['hi', 'हिं', 'Hindi'], ['mr', 'मरा', 'Marathi']].map(function (c?: any) {
      var on = c[0] === s.lang;
      return { label: c[1], aria: c[2], pick: function () { self.setState({ lang: c[0] }); },
        style: 'border:none;border-radius:999px;min-width:' + (D ? 46 : 38) + 'px;height:' + (D ? 36 : 32) + 'px;padding:0 8px;cursor:pointer;font-weight:800;font-size:14px;' + (on ? 'background:linear-gradient(135deg,#EC4899,#BE185D);color:#FFFFFF;' : 'background:transparent;color:#BE185D;') };
    });
    var cols = ['#0EA5E9', '#F59E0B', '#EC4899', '#8B5CF6', '#10B981'];
    var cards = t.cards.map(function (label?: any, k?: any) {
      var wide = k === 4;
      var span = D ? (k < 3 ? 'span 2' : 'span 3') : (wide ? 'span 2' : 'span 1');
      return { label: label, emo: ['💻', '', '🏠', '', '💼'][k], isImg: k === 1, isWifi: k === 3, isEmo: k !== 1 && k !== 3,
        tick: 'position:absolute;right:8px;top:8px;width:' + (D ? 50 : 46) + 'px;height:' + (D ? 50 : 46) + 'px;box-sizing:border-box;border-radius:999px;border:1.5px solid #86C79B;background:#ECFDF3;padding:2px;display:flex;box-shadow:0 1px 3px rgba(21,128,61,.12);animation-delay:' + (0.75 + 0.14 * k).toFixed(2) + 's',
        style: 'position:relative;grid-column:' + span + ';display:flex;flex-direction:' + (wide && !D ? 'row' : 'column') + ';align-items:center;justify-content:center;gap:' + (wide && !D ? 14 : 6) + 'px;min-height:' + (D ? 170 : wide ? 86 : 122) + 'px;padding:' + (wide && !D ? '12px 58px 12px 12px' : '12px') + ';box-sizing:border-box;border-radius:24px;background:#FFFFFF;border:2.5px solid ' + cols[k] + '55;box-shadow:0 6px 0 ' + cols[k] + '33;animation-delay:' + (0.5 + 0.14 * k).toFixed(2) + 's' };
    });
    var X = t.x;
    var COURSES = [
      { code: 'SOP', c: '#2563EB', bg: '#DBEAFE', d: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12', name: X.names[0], full: X.fulls[0], sub: X.subs[0], dur: X.durs[0], need: X.grad, campus: 'Dantewada, Bengaluru, Pune +',
        elig: [X.age, X.mustGrad, X.income, X.coding, X.stay], learn: X.learnTech, jobs: X.jobsTech },
      { code: 'SOB', c: '#059669', bg: '#D1FAE5', d: 'M4 20V10M10 20V4M16 20v-8M22 20H2', name: X.names[1], full: X.fulls[1], sub: X.subs[1], dur: X.durs[1], need: X.twelfth, campus: 'Bengaluru, Jashpur, Dantewada, Pune',
        elig: [X.age, X.must12, X.income, X.comm], learn: X.learnBiz, jobs: ['Marketing Associate', 'Operations Executive', 'Customer Support Executive', X.bizDev] },
      { code: 'SOF', c: '#D97706', bg: '#FEF3C7', d: 'M6 4h12M6 9h12M9 4c4 0 6 2 6 5s-2 5-6 5H7l8 7', name: X.names[2], full: X.fulls[2], sub: X.subs[2], dur: X.durs[2], need: X.twelfth, campus: 'Pune, Maharashtra',
        elig: [X.age, X.must12, X.income, X.numbers], learn: X.learnFin, jobs: ['Accounts Executive', 'Tax Associate', 'Finance Operations Executive', 'Compliance Assistant'] },
      { code: 'BCA', c: '#7C3AED', bg: '#EDE9FE', d: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6', name: X.names[3], full: X.fulls[3], sub: X.subs[3], dur: X.durs[3], need: X.twelfth, campus: 'Himachal',
        elig: [X.age, X.must12, X.income, X.coding, X.stay], learn: X.learnTech, jobs: X.jobsTech }
    ];
    var courseCards = COURSES.map(function (c?: any, k?: any) {
      return { name: c.name, code: c.full, dur: c.dur, need: c.need, d: c.d, iconSize: D ? 34 : 28, aria: c.full,
        open: function () { self.setState({ course: k, tab: 0 }); },
        tile: 'width:' + (D ? 68 : 54) + 'px;height:' + (D ? 68 : 54) + 'px;border-radius:' + (D ? 22 : 18) + 'px;display:flex;align-items:center;justify-content:center;background:' + c.c + ';box-shadow:0 5px 0 rgba(0,0,0,.14)',
        codeStyle: "font-family:'Plus Jakarta Sans','Noto Sans Devanagari',sans-serif;font-weight:800;line-height:1.25;text-align:center;font-size:" + (D ? 13.5 : 11.5) + 'px;padding:3px 9px;border-radius:12px;background:' + c.bg + ';color:' + c.c,
        more: 'display:flex;align-items:center;gap:2px;font-size:' + (D ? 14 : 12) + 'px;font-weight:800;color:' + c.c,
        style: 'display:flex;flex-direction:column;align-items:center;gap:' + (D ? 8 : 5) + 'px;padding:' + (D ? '20px 12px 16px' : '12px 6px 10px') + ';border-radius:24px;cursor:pointer;background:#FFFFFF;border:2.5px solid ' + c.c + '44;box-shadow:0 6px 0 ' + c.c + '33;animation-delay:' + (0.35 + 0.12 * k).toFixed(2) + 's' };
    });
    var cur: any = s.course === null ? null : COURSES[s.course];
    var sheet: any = { tabs: [], rows: [] };
    if (cur) {
      var lists = [cur.elig, cur.learn, cur.jobs];
      var tabD = ['M9 11a3 3 0 100-6 3 3 0 000 6zM3 21c.8-3 3-5 6-5s5.2 2 6 5M16 11l2 2 4-4', 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13', 'M3 8h18v11H3zM8 8V5h8v3M3 13h18'];
      sheet = {
        full: cur.full, sub: cur.sub, d: cur.d, dur: cur.dur, campus: cur.campus,
        subStyle: 'font-size:14px;font-weight:800;color:' + cur.c,
        tile: 'width:56px;height:56px;flex-shrink:0;border-radius:18px;display:flex;align-items:center;justify-content:center;background:' + cur.c,
        tabs: X.tabs.map(function (label?: any, k?: any) {
          var on = s.tab === k;
          return { label: label, d: tabD[k], sel: on, pick: function () { self.setState({ tab: k }); },
            style: "display:flex;flex-direction:column;align-items:center;gap:2px;min-height:58px;padding:6px 2px;border:none;border-radius:14px;cursor:pointer;font-family:'Plus Jakarta Sans','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:12.5px;line-height:1.15;" + (on ? 'background:#FFFFFF;color:' + cur.c + ';box-shadow:0 2px 8px rgba(15,23,42,.14);' : 'background:transparent;color:#64748B;') };
        }),
        rows: lists[s.tab].map(function (text?: any, k?: any) {
          return { text: text, dot: 'width:26px;height:26px;flex-shrink:0;border-radius:999px;display:flex;align-items:center;justify-content:center;background:' + cur.c,
            style: 'display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:16px;background:' + cur.bg + '88;animation-delay:' + (0.05 * k).toFixed(2) + 's' };
        })
      };
    }
    return {
      commonChips: X.common,
      L: L, t: t, leaves: leaves, langChips: langChips, cards: cards, isP1: s.page === 1, isP2: s.page === 2, isP3: s.page === 3, isP4: s.page === 4, isP5: s.page === 5, isP6: s.page === 6, alumniA: alumni.concat(alumni), alumniB: alumni.slice(3).concat(alumni, alumni.slice(0, 3)), companies: companies, campuses: campuses, isSoft: s.page > 1,
      walking: false, standing: s.phase >= 1, showCta: s.phase >= 2 && s.page === 1, showBird: true,
      reveal: function () { self.setState({ page: 2 }); setTimeout(function () { self.ldSpeak(); }, 900); },
      goP1: function () {self.setState({ page: 1 }); },
      goP2: function () { self.setState({ page: 2, course: null }); },
      goP3: function () { self.setState({ page: 3, course: null }); setTimeout(function () { self.ldSpeak(); }, 700); },
      goP4: function () {self.setState({ page: 4, course: null }); },
      goP5: function () { self.setState({ page: 5, course: null }); },
      goP6: function () { self.setState({ page: 6, course: null }); },
      replay: function () {self.setState({ page: 1, phase: 0, run: s.run + 1, course: null }); setTimeout(function () { self.ldStart(); }, 0); },
      courseCards: courseCards, sheet: sheet, hasSheet: !!cur, closeSheet: function () { self.setState({ course: null }); },
      speakNow: function () { self.ldSpeak(); }
    };
  }
  // ===== The draft is two zones in one artboard: the About NavGurukul landing pages (ld* methods, LD.* holes),
  // then the student journey copied from the main design (jvVals). state.zone says which one shows.
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
  renderVals() {
    var self = this;
    var v: any = this.jvVals();
    var LD: any = this.ldVals();
    LD.replay = function () { self.enterJourney(); };
    var Dk = this.DEVICE === 'desktop';
    LD.login = function () { self.enterLogin(); };
    LD.loginLabel = I18N[this.state.lang as Lang].extra.login;
    LD.loginStyle = "flex-shrink:0;height:" + (Dk ? 44 : 40) + "px;padding:0 " + (Dk ? 22 : 14) + "px;border-radius:999px;border:none;background:linear-gradient(135deg,#E91E63,#BE185D);color:#FFFFFF;box-shadow:0 3px 0 #9D174D;cursor:pointer;font-family:'Plus Jakarta Sans','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:" + (Dk ? 16 : 14) + 'px';
    v.W = this.frameW(); v.H = this.frameH();
    v.LD = LD; v.inLanding = this.state.zone === 'landing'; v.inJourney = this.state.zone !== 'landing';
    return v;
  }
  jvVals() {
    var self = this, s = this.state, D = this.DEVICE === 'desktop', P = !D;

    var t = I18N[s.lang as Lang].journey;
    var nm = s.first.trim() || I18N[s.lang as Lang].extra.friend;
    var cheer = function (i?: any) { return t.cheers[i % t.cheers.length]; };
    var W = this.frameW(), H = this.frameH();

    // ---------- question bank ----------
    var QB: any = { en: I18N.en.extra.quiz, hi: I18N.hi.extra.quiz, mr: I18N.mr.extra.quiz } as Record<string, any[]>;

    // ---------- flow definitions ----------
    // Registration order. 'year' and 'attend' show only when the highest qualification is "Pursuing College".
    var regFor = function (q?: any) { return ['login', 'phone', 'name', 'dob', 'gender', 'pincode', 'category', 'qual', 'sname', 'year', 'attend', 'photo', 'school', 'campus', 'review'].filter(function (x?: any) { return (x !== 'year' && x !== 'attend') || q === 'college'; }); };
    var REG = regFor(s.qual);
    var regIdx = REG.indexOf(s.screen);
    var isReg = regIdx >= 0;
    var sc = s.screen;

    // ---------- HUD progress (0..6 along 6 milestones) ----------
    var prog: any;
    if (sc === 'lang' || sc === 'about1' || sc === 'about2') prog = 0;
    else if (isReg) prog = (regIdx + (s.toast ? 1 : 0)) / REG.length;
    else if (sc === 'cel') prog = ({ reg: 1, test: 2, lr: 3, cfr: 4, sel: 4.5, campus: 5 } as any)[s.cel];
    else if (sc === 'map') prog = s.lvl === 4 ? 4 : s.lvl;
    else if (['ready', 'countdown', 'test', 'submitting', 'fail'].indexOf(sc) >= 0) prog = 1 + (sc === 'test' ? (s.qi + 1) / 6 : sc === 'submitting' ? 0.9 : 0.05);
    else if (['intro', 'slot', 'confirm', 'booked', 'call', 'pending'].indexOf(sc) >= 0) prog = (s.round === 'lr' ? 2 : 3) + ({ intro: 0.1, slot: 0.3, confirm: 0.5, booked: 0.6, call: 0.72, pending: 0.85 } as any)[sc];
    else if (sc === 'history') prog = s.joined ? 5 : s.lvl === 4 ? 4 : s.lvl;
    else if (sc === 'consent' || sc === 'travel') prog = 5;
    else if (sc === 'letter') prog = s.offerAccepted ? 5 : 4.6;
    else if (sc === 'checklist') prog = 5; // offer accepted: "Your Offer" is complete, "Campus" is the current stage
    else if (sc === 'whatsapp') prog = 4.95;
    else prog = 0;
    var trackW = D ? 620 : 362, x0 = 22, gap = (trackW - 44) / 5;
    var icons = [
      'M12 22V12M12 12C12 7 8 5 4 5c0 4 3 7 8 7zm0 0c0-4 3-7 8-7 0 5-4 7-8 7',
      'M13 2L4 14h7l-1 8 9-12h-7z',
      'M4 5h16v10H4zM2 19h20',
      'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z',
      'M4 4h16v16H4zM4 4l8 7 8-7',
      'M3 10l9-6 9 6M5 10v10h14V10M10 20v-5h4v5'
    ];
    var stepNames = [t.hudReg, t.lvlTitle[0], t.lvlTitle[1], t.lvlTitle[2], t.lvlTitle[3], t.hudCampus];
    var nodeSize = D ? 34 : 28;
    var hud: any = {
      nodes: stepNames.map(function (label?: any, idx?: any) {
        var done = idx === 5 ? (s.joined || (sc === 'cel' && s.cel === 'campus')) : prog >= idx + 1;
        var now = !done && Math.floor(prog) === idx;
        var look = done ? 'background:linear-gradient(145deg,#34D399,#059669);border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(5,150,105,.45);'
          : now ? 'background:#FFFFFF;border:2.5px solid #E91E63;' : 'background:#FFFFFF;border:2px solid #FBCFE8;';
        return {
          title: label, d: done ? 'M5 12.5l4.5 4.5L19 7.5' : icons[idx], icon: D ? 18 : 16,
          stroke: done ? '#FFFFFF' : now ? '#E91E63' : '#F9A8D4', cls: now ? 'node-now' : '',
          style: 'position:absolute;top:' + (D ? 2 : 5) + 'px;width:' + nodeSize + 'px;height:' + nodeSize + 'px;box-sizing:border-box;border-radius:999px;display:flex;align-items:center;justify-content:center;left:' + (x0 + idx * gap - nodeSize / 2) + 'px;' + look,
          labelStyle: 'position:absolute;top:' + (nodeSize + 2) + 'px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:11px;font-weight:800;color:' + (done ? '#047857' : now ? '#BE185D' : '#94A3B8')
        };
      }),
      fillStyle: 'position:absolute;left:' + x0 + 'px;top:' + (D ? 16 : 17) + 'px;height:5px;border-radius:999px;width:' + Math.max(0, prog * gap) + 'px',
      rocketStyle: 'position:absolute;top:' + (D ? 6 : 6) + 'px;z-index:2;left:' + (x0 + prog * gap - 30) + 'px'
    };

    // ---------- layout ----------
    var compact = ['about1', 'about2', 'call', 'history', 'consent', 'travel', 'test', 'school', 'campus', 'review', 'slot', 'booked', 'confirm', 'letter', 'checklist', 'ready', 'fail', 'login', 'photo', 'pending', 'submitting', 'intro'].indexOf(sc) >= 0;
    var L: any = {};
    var glassPanel = D;
    if (P) {
      var hasHud = sc !== 'lang';
      var stTop = hasHud ? 92 : 104, stH = sc === 'lang' ? 262 : (sc === 'about1' || sc === 'about2') ? 176 : compact ? 150 : 226;
      var pTop = stTop + stH;
      L.hud = 'position:absolute;left:0;top:0;width:390px;z-index:45;padding:10px 14px 6px;box-sizing:border-box;display:flex;flex-direction:column;gap:6px;background:linear-gradient(180deg,rgba(255,251,243,.97) 70%,rgba(255,251,243,0))';
      L.hudRow = 'display:flex;align-items:center;gap:6px';
      L.logo = 'height:22px;width:auto';
      L.track = 'position:relative;height:38px;width:362px';
      L.stage = 'position:absolute;left:0;top:' + stTop + 'px;width:390px;height:' + stH + 'px;z-index:10';
      var big = !compact;
      L.ashaWrap = big ? 'position:absolute;left:-6px;top:0;width:' + (sc === 'lang' ? 240 : 250) + 'px' : 'position:absolute;left:-4px;top:8px;width:150px';
      L.asha = 'width:100%;height:auto;display:block';
      L.tourAshaBox = 'width:96px;height:112px;flex-shrink:0;border-radius:22px;overflow:hidden;background:linear-gradient(160deg,#FCE7F3,#FEF3C7);border:2.5px solid #F9A8D4';
      L.tourAsha = 'width:200px;height:auto;margin-left:-52px;margin-top:-2px';
      L.tourText = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:18px;line-height:1.22;color:#0F172A";
      L.disc = big ? 'position:absolute;left:44px;top:' + (sc === 'lang' ? 190 : 192) + 'px;width:150px;height:26px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.45),rgba(236,72,153,0) 70%)' : 'position:absolute;left:26px;top:110px;width:92px;height:16px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.45),rgba(236,72,153,0) 70%)';
      L.bubble = (big ? 'position:absolute;right:14px;top:' + (sc === 'lang' ? 30 : 12) + 'px;width:' + (sc === 'lang' ? 170 : 166) + 'px;' : 'position:absolute;left:146px;right:14px;top:8px;') + 'border-radius:22px 22px 22px 6px;padding:12px;display:flex;flex-direction:column;gap:6px;box-sizing:border-box';
      L.askStyle = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:" + (big ? 20 : 18) + 'px;line-height:1.15;color:#0F172A';
      L.subStyle = 'font-size:14px;font-weight:600;color:#475569;line-height:1.3';
      L.tw1 = 'position:absolute;left:24px;top:28px'; L.tw2 = 'position:absolute;left:' + (big ? 210 : 128) + 'px;top:' + (big ? 170 : 90) + 'px;animation-delay:.6s';
      L.zzz = 'position:absolute;left:112px;top:6px';
      L.panel = 'position:absolute;left:18px;width:354px;top:' + pTop + 'px;height:' + (H - pTop - 18) + 'px;display:flex;flex-direction:column;gap:10px;z-index:10';
      L.panelCls = '';
      L.bareLogo = 'position:absolute;left:0;top:18px;width:390px;display:flex;flex-direction:column;align-items:center;gap:10px;z-index:12';
      L.bareLogoImg = 'height:28px;width:auto';
      L.overlay = 'position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(180deg,rgba(255,251,243,.25) 0%,rgba(255,251,243,.1) 30%,rgba(255,247,237,.55) 50%,rgba(255,251,243,.94) 70%)';
      L.bird = 'position:absolute;left:0;top:' + (sc === 'lang' ? 120 : 150) + 'px;z-index:3';
      L.mapTitle = 'position:absolute;left:18px;top:96px;font-size:24px;z-index:10;display:none';
      L.mapBox = 'position:absolute;left:10px;top:100px;width:370px;height:446px;border-radius:26px;overflow:hidden;box-shadow:0 14px 34px rgba(120,53,15,.28),inset 0 0 0 3px rgba(180,120,60,.35);background:#EAD7AE;z-index:10';
      L.mapScroll = 'width:370px;height:446px;overflow-x:auto;overflow-y:hidden';
      if (sc === 'map' || sc === 'tour') L.panel = 'position:absolute;left:12px;width:366px;top:560px;height:268px;box-sizing:border-box;padding:14px;border-radius:26px;display:flex;flex-direction:column;gap:10px;z-index:10', L.panelCls = 'glass';
      if (sc === 'tour' && s.tourStop >= 1 && s.tourStop <= 3) L.panel = L.panel.replace('top:560px;height:268px', s.tourStop === 1 ? 'top:400px;height:428px' : 'top:432px;height:396px');
      L.cel = 'position:absolute;left:0;top:92px;width:390px;height:752px;z-index:12;display:flex;flex-direction:column;align-items:center;padding:0 18px 22px;box-sizing:border-box';
      L.celTitle = "margin-top:8px;font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:30px;color:#0F172A;text-align:center;line-height:1.1";
      L.celStage = 'position:relative;width:354px;height:318px;margin-top:2px';
      L.celRays = 'position:absolute;left:7px;top:-12px;width:340px;height:340px';
      L.celAsha = 'position:absolute;left:30px;top:24px;width:320px;height:auto';
      L.celBadge = 'position:absolute;left:0;top:168px;width:128px;height:146px';
      L.celCard = 'margin-top:-4px;width:354px;border-radius:22px;padding:12px 16px;display:flex;align-items:center;gap:12px;box-sizing:border-box;animation-delay:.4s';
      L.celBtns = 'width:354px;display:flex;flex-direction:column;gap:10px';
      L.campusBg = 'position:absolute;left:0;top:0;width:100%;height:100%;background-size:auto 150%;background-position:88% 12%';
      L.banner = 'position:absolute;left:14px;right:14px;top:96px;z-index:50;display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:20px;background:linear-gradient(135deg,#10B981,#047857);box-shadow:0 10px 26px rgba(4,120,87,.4)';
      L.mini = 'position:absolute;right:14px;top:92px;z-index:50;display:flex;align-items:center;gap:6px;background:#0F172A;border-radius:999px;padding:6px 14px 6px 10px;box-shadow:0 6px 16px rgba(15,23,42,.3)';
      L.coinCls = 'coin-fly-phone';
      L.toastAsha = 'position:absolute;left:70px;bottom:-40px;width:300px;height:auto';
      L.countAsha = 'position:absolute;left:30px;bottom:-30px;width:330px;height:auto';
      L.sheet = 'width:390px;box-sizing:border-box;background:#FFFFFF;border-radius:30px 30px 0 0;padding:0 20px 22px;display:flex;flex-direction:column;align-items:center;gap:10px';
      L.jump = 'margin:56px 10px 0 0;width:290px;box-sizing:border-box;background:#FFFFFF;border-radius:22px;padding:14px;display:flex;flex-direction:column;gap:6px;box-shadow:0 20px 40px rgba(0,0,0,.3)';
      L.qText = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:22px;line-height:1.25;color:#0F172A";
    } else {
      L.hud = 'position:absolute;left:0;top:0;width:1440px;height:80px;z-index:45;padding:0 28px;box-sizing:border-box;display:flex;align-items:center;background:rgba(255,251,243,.9);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(251,207,232,.7)';
      L.hudRow = 'display:flex;align-items:center;gap:14px;width:100%';
      L.logo = 'height:30px;width:auto';
      L.track = 'position:relative;height:56px;width:620px';
      L.stage = 'position:absolute;left:0;top:80px;width:860px;height:820px;z-index:10';
      L.ashaWrap = 'position:absolute;left:60px;bottom:-4px;width:600px';
      L.asha = 'width:100%;height:auto;display:block';
      L.tourAshaBox = 'width:150px;height:190px;flex-shrink:0;border-radius:26px;overflow:hidden;background:linear-gradient(160deg,#FCE7F3,#FEF3C7);border:3px solid #F9A8D4';
      L.tourAsha = 'width:300px;height:auto;margin-left:-78px;margin-top:0';
      L.tourText = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:26px;line-height:1.2;color:#0F172A";
      L.disc = 'position:absolute;left:170px;bottom:0;width:380px;height:50px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.5),rgba(236,72,153,0) 70%)';
      L.bubble = 'position:absolute;left:470px;top:70px;width:360px;border-radius:30px 30px 30px 8px;padding:20px 22px;display:flex;flex-direction:column;gap:10px;box-sizing:border-box';
      L.askStyle = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:32px;line-height:1.12;color:#0F172A";
      L.subStyle = 'font-size:18px;font-weight:600;color:#475569;line-height:1.35';
      L.tw1 = 'position:absolute;left:120px;top:330px;transform:scale(1.6)'; L.tw2 = 'position:absolute;left:600px;top:520px;animation-delay:.6s';
      L.zzz = 'position:absolute;left:430px;top:300px;transform:scale(1.6)';
      L.panel = 'position:absolute;left:880px;top:108px;width:530px;height:764px;box-sizing:border-box;padding:26px 30px;border-radius:34px;display:flex;flex-direction:column;gap:14px;z-index:10';
      L.panelCls = 'glass';
      L.bareLogo = 'position:absolute;left:36px;top:28px;display:flex;align-items:center;gap:16px;z-index:12';
      L.bareLogoImg = 'height:38px;width:auto';
      L.overlay = 'position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(90deg,rgba(255,251,243,.05) 0%,rgba(255,251,243,.12) 48%,rgba(255,247,237,.7) 62%,rgba(255,251,243,.9) 100%)';
      L.bird = 'position:absolute;left:0;top:190px;z-index:3';
      L.mapTitle = "position:absolute;left:34px;top:100px;font-size:34px;z-index:10";
      L.mapBox = 'position:absolute;left:24px;top:156px;width:820px;height:477px;border-radius:30px;overflow:hidden;box-shadow:0 18px 44px rgba(120,53,15,.3),inset 0 0 0 3px rgba(180,120,60,.35);background:#EAD7AE;z-index:10';
      L.mapScroll = 'width:820px;height:477px;overflow:hidden';
      L.cel = 'position:absolute;left:0;top:80px;width:1440px;height:820px;z-index:12;display:flex;flex-direction:column;align-items:center;padding:14px 0 30px;box-sizing:border-box';
      L.celTitle = "margin-top:8px;font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:48px;color:#0F172A;text-align:center;line-height:1.05";
      L.celStage = 'position:relative;width:640px;height:400px;margin-top:0';
      L.celRays = 'position:absolute;left:70px;top:-60px;width:500px;height:500px';
      L.celAsha = 'position:absolute;left:140px;top:0;width:460px;height:auto';
      L.celBadge = 'position:absolute;left:40px;top:180px;width:176px;height:200px';
      L.celCard = 'margin-top:0;width:520px;border-radius:24px;padding:14px 20px;display:flex;align-items:center;gap:14px;box-sizing:border-box;animation-delay:.4s';
      L.celBtns = 'width:520px;display:flex;flex-direction:row;gap:12px';
      L.campusBg = 'position:absolute;left:0;top:0;width:100%;height:100%;background-size:cover;background-position:95% 20%';
      L.banner = 'position:absolute;left:880px;width:530px;top:96px;z-index:50;box-sizing:border-box;display:flex;align-items:center;gap:10px;padding:14px 20px;border-radius:22px;background:linear-gradient(135deg,#10B981,#047857);box-shadow:0 10px 26px rgba(4,120,87,.4)';
      L.mini = 'position:absolute;right:90px;top:84px;z-index:50;display:flex;align-items:center;gap:6px;background:#0F172A;border-radius:999px;padding:6px 14px 6px 10px;box-shadow:0 6px 16px rgba(15,23,42,.3)';
      L.coinCls = 'coin-fly-desk';
      L.toastAsha = 'position:absolute;left:120px;bottom:-60px;width:460px;height:auto';
      L.countAsha = 'position:absolute;left:100px;bottom:-60px;width:480px;height:auto';
      L.sheet = 'width:520px;margin-bottom:170px;box-sizing:border-box;background:#FFFFFF;border-radius:32px;padding:0 28px 26px;display:flex;flex-direction:column;align-items:center;gap:12px';
      L.jump = 'margin:86px 24px 0 0;width:320px;box-sizing:border-box;background:#FFFFFF;border-radius:22px;padding:14px;display:flex;flex-direction:column;gap:6px;box-shadow:0 20px 40px rgba(0,0,0,.3)';
      L.qText = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:26px;line-height:1.25;color:#0F172A";
    }
    L.trackDash = 'position:absolute;left:' + x0 + 'px;top:' + (D ? 16 : 17) + 'px;width:' + (trackW - 44) + 'px;height:5px;border-radius:999px;background:repeating-linear-gradient(90deg,#FBCFE8 0 6px,transparent 6px 10px)';

    // ---------- leaves / confetti ----------
    var leafColors = ['#10B981', '#34D399', '#059669', '#F59E0B', '#FBBF24', '#86EFAC', '#D97706'];
    var leaves: any[] = [], i;
    var nLeaves = D ? 20 : 14;
    for (i = 0; i < nLeaves; i++) leaves.push({ size: 14 + (i * 7) % 16, color: leafColors[i % 7], style: 'left:' + ((i * 61) % (W - 10)) + 'px;z-index:' + (i % 3 === 0 ? 35 : 5) + ';animation-duration:' + (9 + (i * 13) % 9) + 's;animation-delay:-' + ((i * 1.7) % 11).toFixed(1) + 's' });
    var cc = ['#F59E0B', '#EC4899', '#10B981', '#0EA5E9', '#FBBF24', '#A855F7', '#F43F5E'];
    var confetti: any[] = [];
    var nConf = D ? 60 : 30;
    for (i = 0; i < nConf; i++) {
      var cw = i % 3 === 0 ? 12 : 8, ch = i % 3 === 0 ? 7 : 13;
      confetti.push({ style: 'left:' + ((i * 37) % (W - 4)) + 'px;width:' + cw + 'px;height:' + ch + 'px;border-radius:' + (i % 4 === 0 ? '50%' : '2px') + ';background:' + cc[i % 7] + ';animation-duration:' + (2.4 + (i % 5) * 0.45).toFixed(2) + 's;animation-delay:-' + ((i * 0.29) % 3).toFixed(2) + 's;z-index:25' });
    }

    // ---------- language ----------
    var setLang = function (code?: any) { return function () { self.setState({ lang: code }); }; };
    var langCards = [
      { code: 'en', glyph: 'Aa', name: 'English', sub: 'Hello', c1: '#DBEAFE', c2: '#1D4ED8' },
      { code: 'hi', glyph: 'अ', name: 'हिंदी', sub: 'नमस्ते', c1: '#FCE7F3', c2: '#BE185D' },
      { code: 'mr', glyph: 'म', name: 'मराठी', sub: 'नमस्कार', c1: '#FEF3C7', c2: '#B45309' }
    ].map(function (l?: any) {
      return {
        glyph: l.glyph, name: l.name, sub: l.sub,
        glyphStyle: "width:52px;height:52px;flex-shrink:0;border-radius:16px;background:" + l.c1 + ';color:' + l.c2 + ";display:flex;align-items:center;justify-content:center;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:24px",
        pick: function () { self.setState({ lang: l.code }); self.later(function () { self.go('about1'); }, 160); }
      };
    });
    var langChips = [['en', 'EN', 'English'], ['hi', 'हिं', 'Hindi'], ['mr', 'मरा', 'Marathi']].map(function (c?: any) {
      var on = c[0] === s.lang;
      return { label: c[1], aria: c[2], pick: function () { self.setState({ lang: c[0], langSeen: true }); },
        style: 'border:none;border-radius:999px;min-width:' + (D ? 42 : 34) + 'px;height:' + (D ? 34 : 30) + 'px;padding:0 7px;cursor:pointer;font-weight:800;font-size:13px;' + (on ? 'background:linear-gradient(135deg,#EC4899,#BE185D);color:#FFFFFF;box-shadow:0 2px 6px rgba(233,30,99,.4);' : 'background:transparent;color:#BE185D;') };
    });

    // ---------- registration fields ----------
    var set = function (k?: any) { return function (e?: any) { var o: any = {}; o[k] = e.target.value; self.setState(o); self.armIdle(); }; };
    var fieldDefs: any = {
      sname: [['f7', t.snameLabel, 'sname', 'M3 21h18M5 21V10l7-5 7 5v11M10 21v-5h4v5', 'text', 'organization', false]],
      name: [['f1', t.first, 'first', 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6', 'text', 'given-name', false], ['f2', t.last, 'last', 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6', 'text', 'family-name', false]],
      phone: [['f3', t.phoneLabel, 'phone', 'M7 2h10v20H7zM11 18h2', 'numeric', 'tel-national', true]].concat(s.sameWa ? [] : [['f4', t.waLabel, 'wa', 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z', 'numeric', 'off', true]]).concat([['f8', t.emailLabel, 'email', 'M3 5h18v14H3zM3 7l9 6 9-6', 'email', 'email', false]]),
      parent: [['f5', t.pName, 'pName', 'M9 11a3 3 0 100-6 3 3 0 000 6zM17 11a3 3 0 100-6 3 3 0 000 6zM3 21c.8-3 3-5 6-5s5.2 2 6 5M15 16c2.5 0 4.6 1.6 5.5 5', 'text', 'off', false], ['f6', t.pPhone, 'pPhone', 'M7 2h10v20H7zM11 18h2', 'numeric', 'off', true]]
    };
    var fields = (fieldDefs[sc] || []).map(function (f?: any) {
      return { id: f[0], label: f[1], value: s[f[2]], d: f[3], mode: f[4], auto: f[5], isPhone: f[6], ph: f[6] ? '98765 43210' : t.typeHere, onChange: set(f[2]) };
    });
    var waSwitch: any = {
      track: 'width:52px;height:30px;border-radius:999px;position:relative;flex-shrink:0;transition:background .2s;background:' + (s.sameWa ? '#22C55E' : '#CBD5E1'),
      knob: 'position:absolute;top:3px;width:24px;height:24px;border-radius:999px;background:#FFFFFF;box-shadow:0 2px 4px rgba(0,0,0,.25);transition:left .2s;left:' + (s.sameWa ? 25 : 3) + 'px'
    };

    // photo
    var ph = s.photo;
    var photoUi: any = {
      frame: 'position:relative;width:' + (D ? 200 : 170) + 'px;height:' + (D ? 200 : 170) + 'px;border-radius:999px;padding:6px;box-sizing:border-box;background:' + (ph === 'done' ? 'conic-gradient(#10B981,#34D399,#10B981)' : ph === 'scan' ? 'conic-gradient(#22D3EE,#E0F2FE,#22D3EE)' : 'repeating-conic-gradient(#F9A8D4 0 10deg,#FFFFFF 10deg 20deg)') + ';overflow:hidden',
      bg: ph === 'done' ? '#D1FAE5' : '#FDF2F8', fg: ph === 'done' ? '#34D399' : ph === 'scan' ? '#67E8F9' : '#F9A8D4',
      scanning: ph === 'scan', done: ph === 'done',
      status: ph === 'done' ? t.photoAdded : t.noPhoto,
      statusStyle: "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:20px;color:" + (ph === 'done' ? '#047857' : ph === 'scan' ? '#0E7490' : '#94A3B8')
    };
    var photoTips = [[t.onlyYou, 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6'], [t.faceClear, 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z'], [t.goodLight, 'M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5M12 8a4 4 0 100 8 4 4 0 000-8z']].map(function (p?: any) { return { label: p[0], d: p[1] }; });

    // dob
    var monthsNames: any[] = [];
    for (i = 0; i < 12; i++) monthsNames.push(new Date(2000, i, 1).toLocaleDateString(s.lang === 'en' ? 'en-IN' : s.lang + '-IN', { month: 'short' }));
    var mk = function (a?: any, b?: any, lab?: any) { var r: any[] = []; for (var k = a; k <= b; k++) r.push({ v: String(k), l: lab ? lab(k) : String(k) }); return r; };
    var dobSelects = [
      { id: 'dobD', label: t.day, value: s.dobD, opts: mk(1, 31), onChange: set('dobD') },
      { id: 'dobM', label: t.month, value: s.dobM, opts: mk(1, 12, function (k?: any) { return monthsNames[k - 1]; }), onChange: set('dobM') },
      { id: 'dobY', label: t.year, value: s.dobY, opts: mk(1990, 2010).reverse(), onChange: set('dobY') }
    ];
    var today = new Date();
    var age = today.getFullYear() - Number(s.dobY) - ((today.getMonth() + 1 < Number(s.dobM) || (today.getMonth() + 1 === Number(s.dobM) && today.getDate() < Number(s.dobD))) ? 1 : 0);
    var ageM = today.getMonth() + 1 - Number(s.dobM), ageD = today.getDate() - Number(s.dobD);
    if (ageD < 0) { ageM -= 1; ageD += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (ageM < 0) ageM += 12;
    var ageText = t.youAre + age + t.ageParts[0] + ageM + t.ageParts[1] + ageD + t.ageParts[2];

    // choice grids
    var palette = [['#E0F2FE', '#0284C7', '#7DD3FC'], ['#FCE7F3', '#DB2777', '#F9A8D4'], ['#FEF3C7', '#D97706', '#FCD34D'], ['#DCFCE7', '#16A34A', '#86EFAC'], ['#EDE9FE', '#7C3AED', '#C4B5FD']];
    var hairBoy = 'M26 28 Q26 16 38 16 Q50 16 50 28 Q46 21 38 21 Q30 21 26 28Z';
    var hairGirl = 'M24 40 Q20 16 38 16 Q56 16 52 40 Q50 22 38 22 Q26 22 24 40Z';
    var SEL = 'border:3px solid #F472B6;background:#FDF2F8;box-shadow:0 6px 0 #F9A8D4;';
    var choiceSets: any = {
      gender: { key: 'gender', items: [['boy', t.boy, 'avatar', hairBoy], ['girl', t.girl, 'avatar', hairGirl], ['other', t.other, 'avatar', hairBoy]] },
      status: { key: 'status', items: [['study', t.studying, 'icon', 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13M8 7h7'], ['work', t.working, 'icon', 'M3 8h18v11H3zM8 8V5h8v3M3 13h18'], ['seek', t.jobSeek, 'icon', 'M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5'], ['other', t.otherS, 'icon', 'M5 12h.01M12 12h.01M19 12h.01']] },
      qual: { key: 'qual', items: [['12', t.q12, 'glyph', '12'], ['college', t.qCollege, 'icon', 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13M8 7h7'], ['grad', t.qGrad, 'icon', 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6'], ['diploma', t.qDiploma, 'icon', 'M6 3h9l4 4v14H6zM15 3v4h4M9 12h6M9 16h6']] },
      year: { key: 'year', items: [['1', t.yearOpts[0], 'glyph', '1'], ['2', t.yearOpts[1], 'glyph', '2'], ['3', t.yearOpts[2], 'glyph', '3'], ['4', t.yearOpts[3], 'glyph', '4'], ['final', t.yearOpts[4], 'icon', 'M5 21V4M5 4h11l-2 4 2 4H5']] },
      attend: { key: 'attend', cols: 1, small: true, items: [['regular', t.attends[0], 'icon', 'M3 21h18M5 21V10l7-5 7 5v11M12 5V2h4v2h-4M10 21v-5h4v5M8 12h2M14 12h2'], ['exams', t.attends[1], 'icon', 'M2 9l10-6 10 6M4 14h16M6 14v7M18 14v7M9 14v-3h6v3']] },
      medium: { key: 'medium', items: [['hi', t.mHi, 'glyph', 'अ'], ['en', t.mEn, 'glyph', 'Aa'], ['mr', t.mMr, 'glyph', 'म'], ['other', t.mOther, 'icon', 'M5 12h.01M12 12h.01M19 12h.01']] }
    };
    var cs = choiceSets[sc];
    var choices: any[] = [], choiceGrid = '';
    if (cs) {
      choiceGrid = 'display:grid;grid-template-columns:repeat(' + (cs.cols || (cs.items.length === 3 ? 3 : 2)) + ',minmax(0,1fr));gap:12px';
      choices = cs.items.map(function (it?: any, idx?: any) {
        var pal = palette[idx % 5], sel = s[cs.key] === it[0];
        return {
          label: it[1], isAvatar: it[2] === 'avatar', isIcon: it[2] === 'icon', isGlyph: it[2] === 'glyph', d: it[3], glyph: it[3], hair: it[3],
          bg: pal[0], fg: pal[1], ring: pal[2], sel: sel,
          labelStyle: "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;color:#0F172A;text-align:center;" + (cs.small ? 'font-size:17px;line-height:1.25;padding:0 10px' : 'font-size:19px;line-height:1.15'),
          tile: 'width:' + (D ? 72 : 64) + 'px;height:' + (D ? 72 : 64) + 'px;border-radius:20px;background:' + pal[0] + ';display:flex;align-items:center;justify-content:center',
          style: 'position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px 6px 14px;border-radius:24px;cursor:pointer;min-height:' + (cs.items.length === 3 ? 150 : D ? 150 : 132) + 'px;' + (sel ? SEL : ''),
          pick: function () {
            if (s.toast) return;
            var o: any = {}; o[cs.key] = it[0]; self.setState(o);
            advanceFrom(sc, it[0]);
          }
        };
      });
    }
    var catChips = t.cats.map(function (c?: any, idx?: any) {
      var sel = s.cat === idx;
      return { label: c, pick: function () { if (s.toast) return; self.setState({ cat: idx }); advanceFrom('category'); },
        style: 'min-height:54px;padding:0 20px;border-radius:999px;cursor:pointer;font-weight:800;font-size:17px;' + (sel ? 'background:#FCE7F3;color:#9D174D;border:2px solid #EC4899;box-shadow:0 4px 0 #F9A8D4;' : 'background:#FFFFFF;color:#0F172A;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;') };
    });

    // pincode
    var pinHit = [s.district, s.stateName];
    var GEO = [
      ['Andhra Pradesh', 'आंध्र प्रदेश', ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa']],
      ['Arunachal Pradesh', 'अरुणाचल प्रदेश', ['Changlang', 'East Siang', 'Lohit', 'Papum Pare', 'Tawang', 'West Kameng', 'West Siang']],
      ['Assam', 'असम', ['Barpeta', 'Cachar', 'Darrang', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Lakhimpur', 'Nagaon', 'Sivasagar', 'Sonitpur', 'Tinsukia']],
      ['Bihar', 'बिहार', ['Araria', 'Aurangabad', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Katihar', 'Kishanganj', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sitamarhi', 'Siwan', 'Vaishali', 'West Champaran']],
      ['Chhattisgarh', 'छत्तीसगढ़', ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja']],
      ['Delhi', 'दिल्ली', ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi']],
      ['Goa', 'गोवा', ['North Goa', 'South Goa']],
      ['Gujarat', 'गुजरात', ['Ahmedabad', 'Amreli', 'Anand', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Dahod', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Kutch', 'Kheda', 'Mehsana', 'Navsari', 'Panchmahal', 'Patan', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Vadodara', 'Valsad']],
      ['Haryana', 'हरियाणा', ['Ambala', 'Bhiwani', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar']],
      ['Himachal Pradesh', 'हिमाचल प्रदेश', ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una']],
      ['Jammu and Kashmir', 'जम्मू और कश्मीर', ['Anantnag', 'Baramulla', 'Budgam', 'Doda', 'Jammu', 'Kathua', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Srinagar', 'Udhampur']],
      ['Jharkhand', 'झारखंड', ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum']],
      ['Karnataka', 'कर्नाटक', ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Hassan', 'Kalaburagi', 'Kolar', 'Mandya', 'Mysuru', 'Raichur', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura']],
      ['Kerala', 'केरल', ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad']],
      ['Madhya Pradesh', 'मध्य प्रदेश', ['Balaghat', 'Betul', 'Bhind', 'Bhopal', 'Chhatarpur', 'Chhindwara', 'Dewas', 'Dhar', 'Guna', 'Gwalior', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Shivpuri', 'Ujjain', 'Vidisha']],
      ['Maharashtra', 'महाराष्ट्र', ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal']],
      ['Manipur', 'मणिपुर', ['Bishnupur', 'Churachandpur', 'Imphal East', 'Imphal West', 'Senapati', 'Thoubal', 'Ukhrul']],
      ['Meghalaya', 'मेघालय', ['East Garo Hills', 'East Khasi Hills', 'Ri Bhoi', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills']],
      ['Mizoram', 'मिज़ोरम', ['Aizawl', 'Champhai', 'Kolasib', 'Lunglei', 'Mamit', 'Serchhip']],
      ['Nagaland', 'नागालैंड', ['Dimapur', 'Kohima', 'Mokokchung', 'Mon', 'Tuensang', 'Wokha', 'Zunheboto']],
      ['Odisha', 'ओडिशा', ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Cuttack', 'Dhenkanal', 'Ganjam', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Keonjhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Puri', 'Rayagada', 'Sambalpur', 'Sundargarh']],
      ['Punjab', 'पंजाब', ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'SAS Nagar', 'Tarn Taran']],
      ['Rajasthan', 'राजस्थान', ['Ajmer', 'Alwar', 'Banswara', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Kota', 'Nagaur', 'Pali', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur']],
      ['Sikkim', 'सिक्किम', ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim']],
      ['Tamil Nadu', 'तमिलनाडु', ['Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kancheepuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Salem', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Vellore', 'Villupuram', 'Virudhunagar']],
      ['Telangana', 'तेलंगाना', ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam', 'Mahabubnagar', 'Medak', 'Medchal-Malkajgiri', 'Nalgonda', 'Nizamabad', 'Rangareddy', 'Sangareddy', 'Warangal']],
      ['Tripura', 'त्रिपुरा', ['Dhalai', 'Gomati', 'North Tripura', 'Sepahijala', 'South Tripura', 'West Tripura']],
      ['Uttar Pradesh', 'उत्तर प्रदेश', ['Agra', 'Aligarh', 'Ayodhya', 'Azamgarh', 'Bahraich', 'Ballia', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bijnor', 'Bulandshahr', 'Deoria', 'Etawah', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hardoi', 'Jaunpur', 'Jhansi', 'Kanpur Nagar', 'Lakhimpur Kheri', 'Lucknow', 'Mathura', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Prayagraj', 'Raebareli', 'Saharanpur', 'Sitapur', 'Sultanpur', 'Unnao', 'Varanasi']],
      ['Uttarakhand', 'उत्तराखंड', ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi']],
      ['West Bengal', 'पश्चिम बंगाल', ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur']]
    ];
    var geoRow = GEO.filter(function (g?: any) { return g[0] === s.stateName; })[0];
    var norm = function (x?: any) { return String(x).toLowerCase().replace(/\s+/g, ' ').trim(); };
    var optStyle = function (sel?: any) { return 'display:flex;align-items:center;gap:10px;width:100%;min-height:50px;padding:6px 14px;border:none;border-bottom:1px solid #FCE7F3;cursor:pointer;text-align:left;background:' + (sel ? '#F0FDF4' : '#FFFFFF'); };
    var placeBoxes = [
      { key: 'state', label: t.stateL, d: 'M4 5l5-2 6 2 5-2v16l-5 2-6-2-5 2zM9 3v16M15 5v16', value: s.stateName, ph: t.chooseState, disabled: false,
        all: GEO.map(function (g?: any) { return { v: g[0], label: g[0], sub: s.lang === 'en' ? '' : g[1], hay: norm(g[0] + ' ' + g[1]) }; }),
        shown: geoRow && s.lang !== 'en' ? geoRow[1] : s.stateName },
      { key: 'district', label: t.district, d: 'M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6', value: s.district, ph: geoRow ? t.chooseDistrict : t.stateFirst, disabled: !geoRow,
        all: ((geoRow ? geoRow[2] : []) as string[]).map(function (d?: any) { return { v: d, label: d, sub: '', hay: norm(d) }; }), shown: s.district }
    ].map(function (b?: any) {
      var open = s.placeOpen === b.key && !b.disabled;
      var q = norm(s.placeQuery || '');
      var list = open ? b.all.filter(function (o?: any) { return !q || o.hay.indexOf(q) >= 0; }) : [];
      return {
        labelId: 'lbl-' + b.key, label: b.label, d: b.d, open: open, disabled: b.disabled, hasValue: !!b.value,
        shown: b.value ? b.shown : b.ph, query: s.placeQuery || '', searchPh: t.searchPh, empty: open && list.length === 0,
        toggle: function () { self.setState({ placeOpen: open ? null : b.key, placeQuery: '' }); self.armIdle(); },
        onQuery: function (e?: any) { self.setState({ placeQuery: e.target.value }); self.armIdle(); },
        searchRef: function (el?: any) { if (el && self._focusKey !== b.key + ':' + s.lineKey) { self._focusKey = b.key + ':' + s.lineKey; try { el.focus({ preventScroll: true }); } catch (e) {} } },
        valStyle: "flex-grow:1;min-width:0;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:20px;color:" + (b.value ? '#0F172A' : '#94A3B8'),
        chev: 'flex-shrink:0;transition:transform .2s;transform:rotate(' + (open ? 180 : 0) + 'deg);' + (b.disabled ? 'opacity:.35;' : ''),
        btnStyle: 'display:flex;align-items:center;gap:10px;height:62px;width:100%;box-sizing:border-box;padding:0 16px 0 18px;border-radius:18px;cursor:' + (b.disabled ? 'not-allowed' : 'pointer') + ';' + (b.disabled ? 'background:#F8FAFC;border:2px dashed #CBD5E1;' : open ? 'background:#FFFFFF;border:2px solid #E91E63;box-shadow:0 0 0 5px rgba(233,30,99,.16);' : b.value ? 'background:#F0FDF4;border:2px solid #6EE7B7;' : 'background:#FFFFFF;border:2px solid #FBCFE8;box-shadow:0 4px 0 #FBCFE8;'),
        listStyle: 'max-height:' + (D ? 280 : 228) + 'px;display:flex;flex-direction:column',
        opts: list.map(function (o?: any) {
          var sel = o.v === b.value;
          return { label: o.label, sub: o.sub, hasSub: !!o.sub, sel: sel, style: optStyle(sel),
            pick: function () {
              self._focusKey = null;
              if (b.key === 'state') self.setState({ stateName: o.v, district: o.v === s.stateName ? s.district : '', placeOpen: 'district', placeQuery: '' });
              else self.setState({ district: o.v, placeOpen: null, placeQuery: '' });
              self.armIdle();
            } };
        })
      };
    });

    // schools
    var SCH = [
      { id: 'sop', dur: '20–24', need: 'grad', camp: ['Dharamshala', 'Pune', 'Jashpur', 'Dantewada', 'Bengaluru'], d: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12', c: '#2563EB' },
      { id: 'sob', dur: '12–18', need: '12', camp: ['Dharamshala', 'Pune', 'Jashpur', 'Dantewada', 'Bengaluru'], d: 'M4 20V10M10 20V4M16 20v-8M22 20H2', c: '#059669' },
      { id: 'sof', dur: '8–12', need: '12', camp: ['Pune', 'Dantewada'], d: 'M6 4h12M6 9h12M9 4c4 0 6 2 6 5s-2 5-6 5H7l8 7', c: '#D97706' },
      { id: 'bca', dur: '36', durText: t.bcaDur, need: '12', camp: ['Himachal'], d: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6', c: '#7C3AED' }
    ];
    // All six campuses. who = who can stay there, courses = courses offered, only = state the student must be from.
    var CAMPS = [
      { id: 'Dharamshala', who: 'boy', courses: ['sop', 'sob'] },
      { id: 'Pune', who: 'girl', courses: ['sop', 'sob', 'sof'] },
      { id: 'Jashpur', who: 'girl', courses: ['sop', 'sob'], only: 'Chhattisgarh' },
      { id: 'Dantewada', who: 'girl', courses: ['sop', 'sob', 'sof'], only: 'Chhattisgarh' },
      { id: 'Bengaluru', who: 'girl', courses: ['sop', 'sob'] },
      { id: 'Himachal', who: 'girl', courses: ['bca'] }
    ];
    var campFit = function (cp?: any) {
      if ((s.gender === 'boy' || s.gender === 'girl') && s.gender !== cp.who) return cp.who === 'boy' ? t.cBoys : t.cGirls;
      if (cp.only && (s.stateName || '').toLowerCase() !== cp.only.toLowerCase()) return t.cRegion;
      return '';
    };
    // '' when at least one campus offering this course is open to the student's gender and state
    var courseFit = function (id?: any) {
      var whys = CAMPS.filter(function (cp?: any) { return cp.courses.indexOf(id) >= 0; }).map(campFit);
      return whys.some(function (w?: any) { return !w; }) ? '' : (whys[0] || '');
    };
    var schoolOkIds: any[] = [];
    var qualRank: any = ({ '12': 1, college: 1, diploma: 1, grad: 2 } as any)[s.qual];
    if (qualRank === undefined) qualRank = 2;
    var noneEligible = qualRank === 0;
    var schools = SCH.map(function (x?: any, idx?: any) {
      var eduOk = x.need === 'grad' ? qualRank >= 2 : qualRank >= 1, fitWhy = courseFit(x.id);
      var ok = eduOk && !fitWhy;
      if (ok) schoolOkIds.push(x.id);
      var sel = s.school === x.id, open = s.openSchool === x.id;
      var rowCols = ['#0EA5E9', '#10B981', '#F59E0B'];
      return {
        interest: t.interest[idx], name: t.schoolFull[idx], desc: t.schoolDesc[idx], showDesc: sel || open, descStyle: 'font-size:13.5px;font-weight:600;line-height:1.3;color:#475569', d: x.d, open: open, locked: !ok,
        elig: ok ? t.canJoin : !eduOk ? (x.need === 'grad' ? t.needsGrad : t.needs12) : fitWhy, lockedEdu: !eduOk, lockedFit: eduOk && !!fitWhy,
        nameStyle: 'font-size:14px;font-weight:800;line-height:1.25;color:' + x.c,
        eligStyle: 'font-size:12px;font-weight:800;padding:2px 8px;border-radius:999px;' + (ok ? 'background:#DCFCE7;color:#166534' : 'background:#FEE2E2;color:#991B1B'),
        tile: 'width:56px;height:56px;flex-shrink:0;border-radius:18px;display:flex;align-items:center;justify-content:center;background:' + (ok ? x.c : '#94A3B8') + ';box-shadow:0 4px 0 rgba(0,0,0,.12)',
        chev: 'width:32px;height:32px;flex-shrink:0;border-radius:999px;display:flex;align-items:center;justify-content:center;color:' + x.c + ';background:#F8FAFC;transition:transform .2s;transform:rotate(' + (open ? 180 : 0) + 'deg)',
        style: 'border-radius:22px;overflow:hidden;transition:box-shadow .15s;background:' + (sel ? '#FDF2F8' : ok ? '#FFFFFF' : '#F8FAFC') + ';' + (sel ? 'border:3px solid #F472B6;box-shadow:0 5px 0 #F9A8D4;' : 'border:2px solid ' + (ok ? '#FBCFE8' : '#E2E8F0') + ';box-shadow:0 4px 0 ' + (ok ? '#FBCFE8' : '#E2E8F0') + ';') + (ok ? '' : 'opacity:.7;'),
        rows: [[t.learnL, t.learn[idx], 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13'], [t.jobL, t.job[idx], 'M3 8h18v11H3zM8 8V5h8v3M3 13h18'], [t.durL, x.durText || x.dur + t.months, 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2']].map(function (r?: any, k?: any) {
          return { label: r[0], value: r[1], d: r[2], tile: 'width:32px;height:32px;flex-shrink:0;border-radius:10px;display:flex;align-items:center;justify-content:center;background:' + rowCols[k] };
        }),
        pick: function () {
          self.setState({ openSchool: open ? null : x.id, school: ok ? x.id : null });
          self.armIdle();
        },
        listen: function () { self.speak(t.interest[idx] + '. ' + t.schoolNames[idx] + '. ' + t.learnL + ': ' + t.learn[idx] + '. ' + t.jobL + ': ' + t.job[idx]); }
      };
    });
    var curSchool = SCH.filter(function (x?: any) { return x.id === s.school; })[0];
    var CAMP: any = { Dantewada: ['Chhattisgarh', 'छत्तीसगढ़', 'छत्तीसगड', 'दंतेवाड़ा', 'दंतेवाडा'], Dharamshala: ['Himachal Pradesh', 'हिमाचल प्रदेश', 'हिमाचल प्रदेश', 'धर्मशाला', 'धर्मशाळा'], Bengaluru: ['Karnataka', 'कर्नाटक', 'कर्नाटक', 'सरजापुर – बेंगलुरु', 'सर्जापूर – बेंगळुरू'], Pune: ['Maharashtra', 'महाराष्ट्र', 'महाराष्ट्र', 'पुणे', 'पुणे'], Jashpur: ['Chhattisgarh', 'छत्तीसगढ़', 'छत्तीसगड', 'जशपुर', 'जशपूर'], Himachal: ['Himachal Pradesh', 'हिमाचल प्रदेश', 'हिमाचल प्रदेश', 'हिमाचल – इटरनल यूनिवर्सिटी', 'हिमाचल – इटर्नल युनिव्हर्सिटी'] };
    var CAMP_EN: any = { Bengaluru: 'Sarjapur – Bangalore', Himachal: 'Himachal – Eternal University' };
    var li = s.lang === 'en' ? 0 : s.lang === 'hi' ? 1 : 2;
    var cityName = function (c?: any) { var m = CAMP[c]; return !m || li === 0 ? (CAMP_EN[c] || c) : m[li + 2]; };
    var campCols = ['#EA580C', '#0EA5E9', '#8B5CF6', '#10B981'];
    var campWhy = function (cp?: any) { return cp.courses.indexOf(s.school) < 0 ? t.cNoCourse : campFit(cp); };
    var campOk = function (id?: any) { var cp = CAMPS.filter(function (x?: any) { return x.id === id; })[0]; return !!cp && !campWhy(cp); };
    var campusCards = CAMPS.map(function (cp?: any, k?: any) {
      var c = cp.id, why = campWhy(cp), locked = !!why, sel = !locked && s.campus === c, m = CAMP[c] || ['India', 'भारत', 'भारत'];
      return { city: cityName(c), state: m[li] + ' · ' + (cp.who === 'boy' ? t.cBoys : t.cGirls), locked: locked, lockedAttr: locked ? 'true' : 'false', reason: why, ok: !locked,
        near: !locked && !!s.stateName && s.stateName.toLowerCase() === m[0].toLowerCase(),
        tile: 'width:54px;height:54px;flex-shrink:0;border-radius:16px;display:flex;align-items:center;justify-content:center;background:' + (locked ? '#94A3B8' : campCols[k % 4]),
        style: 'display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:22px;min-height:78px;' + (locked ? 'cursor:not-allowed;opacity:.6;background:#F1F5F9;' : 'cursor:pointer;') + (sel ? SEL : ''),
        pick: function () { if (s.toast || locked) return; self.setState({ campus: c }); advanceFrom('campus'); } };
    });
    campusCards = campusCards.filter(function (x?: any) { return x.ok; }).concat(campusCards.filter(function (x?: any) { return !x.ok; }));
    this._editNeeds = { school: schoolOkIds.indexOf(s.school) < 0, campus: !(s.campus && campOk(s.campus)) };
    var noCampus = sc === 'campus' && campusCards.every(function (x?: any) { return x.locked; });
    var campusChips: any[] = [];
    var schoolName = curSchool ? t.schoolNames[SCH.indexOf(curSchool)] : t.schoolNames[1];
    var campusName = cityName(s.campus || (curSchool ? curSchool.camp[0] : 'Pune'));

    // review
    var qualLabel: any = ({ '12': t.q12, college: t.qCollege, grad: t.qGrad, diploma: t.qDiploma } as any)[s.qual] || '—';
    var genderLabel: any = ({ boy: t.boy, girl: t.girl, other: t.other } as any)[s.gender] || '—';
    var yearLabel: any = ({ '1': t.yearOpts[0], '2': t.yearOpts[1], '3': t.yearOpts[2], '4': t.yearOpts[3], final: t.yearOpts[4] } as any)[s.year] || '—';
    var reviewRows = [
      [t.rPhone, s.phone ? '+91 ' + s.phone : '—', 'M7 2h10v20H7zM11 18h2', 'phone'],
      [t.email, (s.email || '').trim() || '—', 'M3 5h18v14H3zM3 7l9 6 9-6', 'phone'],
      [t.rName, (s.first + ' ' + s.last).trim() || '—', 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6', 'name'],
      [t.rDob, s.dobD + ' ' + monthsNames[Number(s.dobM) - 1] + ' ' + s.dobY, 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4', 'dob'],
      [t.rv.gender, genderLabel, 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6', 'gender'],
      [t.rPlace, s.district ? s.district + ', ' + s.stateName : '—', 'M12 22s7-6.2 7-12a7 7 0 00-14 0c0 5.8 7 12 7 12z', 'pincode'],
      [t.rv.cat, s.cat === null || s.cat === undefined ? '—' : t.cats[s.cat], 'M4 6h16M4 12h16M4 18h10', 'category'],
      [t.rv.qual, qualLabel, 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5', 'qual'],
      [t.rv.sname, s.sname.trim() || '—', 'M3 21h18M5 21V10l7-5 7 5v11M10 21v-5h4v5', 'sname']
    ].concat(s.qual === 'college' ? [
      [t.rv.year, yearLabel, 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4', 'year'],
      [t.rv.attend, s.attend === 'regular' ? t.rv.attendShort[0] : s.attend === 'exams' ? t.rv.attendShort[1] : '—', 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13', 'attend']
    ] : []).concat([
      [t.rv.photo, s.photo === 'done' ? t.photoAdded : t.rv.noPhoto, 'M3 8h4l2-3h6l2 3h4v12H3zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z', 'photo'],
      [t.rSchool, schoolName, 'M3 10l9-6 9 6M5 10v10h14V10', 'school'],
      [t.rv.campus, s.campus ? campusName : '—', 'M12 22s7-6.2 7-12a7 7 0 00-14 0c0 5.8 7 12 7 12z', 'campus']
    ]).map(function (r?: any) { return { label: r[0], value: r[1], d: r[2], edit: function () { self.go(r[3], { editing: true }); } }; });

    // ---------- test ----------
    var tl = s.testLang || s.lang;
    var bank = QB[tl];
    var qn = bank[s.qi];
    var letters = ['A', 'B', 'C', 'D'];
    var q: any = {
      text: qn[0],
      opts: qn[1].map(function (lab?: any, oi?: any) {
        var sel = s.answers[s.qi] === oi;
        return {
          label: lab, letter: letters[oi],
          letterStyle: "width:40px;height:40px;flex-shrink:0;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:18px;" + (sel ? 'background:#FFFFFF;color:#DB2777;' : 'background:#FCE7F3;color:#BE185D;'),
          style: 'display:flex;align-items:center;gap:12px;padding:10px 12px;min-height:' + (D ? 72 : 64) + 'px;border-radius:20px;cursor:pointer;text-align:left;' + (sel ? 'background:linear-gradient(135deg,#FDF2F8,#FCE7F3);border:3px solid #E91E63;box-shadow:0 5px 0 #BE185D;' : 'background:#FFFFFF;border:2px solid #FBCFE8;box-shadow:0 4px 0 #FBCFE8;'),
          pick: function () {
            var first = s.answers[s.qi] === undefined;
            var a = Object.assign({}, s.answers); a[s.qi] = oi;
            self.setState({ answers: a }); self.armIdle();
            if (first) self.miniWin(t.saved, 0);
          }
        };
      })
    };
    var optGrid = D ? 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px' : 'display:flex;flex-direction:column;gap:10px';
    var qDots = bank.map(function (b?: any, k?: any) {
      var answered = s.answers[k] !== undefined, cur = k === s.qi;
      return { n: k + 1, aria: t.qWord + (k + 1), go: function () { self.setState({ qi: k }); },
        style: "width:40px;height:40px;border-radius:999px;cursor:pointer;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:17px;" + (cur ? 'background:#E91E63;color:#FFFFFF;border:2px solid #BE185D;transform:scale(1.12);' : answered ? 'background:#10B981;color:#FFFFFF;border:2px solid #059669;' : 'background:#FFFFFF;color:#94A3B8;border:2px solid #E2E8F0;') };
    });
    var remain = Math.max(0, 3600 - Math.floor((s.now - (s.testStart || s.now)) / 1000));
    var mm = String(Math.floor(remain / 60)).padStart(2, '0') + ':' + String(remain % 60).padStart(2, '0');
    var answeredCount = Object.keys(s.answers).length;
    var qHead = t.qWord + (s.qi + 1) + t.of + '5';

    // fail
    var cool = Math.max(0, s.failAt + 15 * 86400000 - s.now);
    var cd = Math.floor(cool / 86400000), chh = Math.floor(cool / 3600000) % 24, cmm = Math.floor(cool / 60000) % 60, css = Math.floor(cool / 1000) % 60;
    var failUi: any = { score: s.score + '/5', deg: s.score * 72, clock: [[cd, t.dUnit], [chh, t.hUnit], [cmm, t.mUnit], [css, t.sUnit]].map(function (x?: any) { return { v: String(x[0]).padStart(2, '0'), u: x[1] }; }) };
    var tipIcons = ['M4 4h16v16H4zM8 8h3M13 8h3M8 12h8M8 16h8', 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13', 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'];
    var tipColors = ['#F59E0B', '#0EA5E9', '#8B5CF6'];
    var tips = t.tips.map(function (lab?: any, k?: any) { return { label: lab, d: tipIcons[k], tile: 'width:40px;height:40px;flex-shrink:0;border-radius:12px;display:flex;align-items:center;justify-content:center;background:' + tipColors[k] }; });

    var readyTiles = [[t.tTime, 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2', '#E91E63'], [t.tQs, 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4', '#8B5CF6'], [t.tBattery, 'M2 9a15 15 0 0120 0M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M12 20h.01', '#0EA5E9'], [t.tNet, 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4', '#10B981']].map(function (r?: any) {
      return { label: r[0], d: r[1], style: 'display:flex;align-items:center;gap:10px;padding:12px;border-radius:20px;background:#FFFFFF;border:2px solid ' + r[2] + '33;box-shadow:0 4px 0 ' + r[2] + '22', tile: 'width:46px;height:46px;flex-shrink:0;border-radius:14px;display:flex;align-items:center;justify-content:center;background:' + r[2] };
    });
    var testLangChips = [['en', 'English'], ['hi', 'हिंदी'], ['mr', 'मराठी']].map(function (c?: any) {
      var on = c[0] === tl;
      return { label: c[1], pick: function () { self.setState({ testLang: c[0] }); }, style: 'min-height:40px;padding:0 14px;border-radius:999px;cursor:pointer;font-weight:800;font-size:15px;' + (on ? 'background:#E91E63;color:#FFFFFF;border:2px solid #BE185D;' : 'background:#FFFFFF;color:#BE185D;border:2px solid #FBCFE8;') };
    });
    var bars = [0, 1, 2, 3, 4].map(function (k?: any) { return { style: 'width:16px;height:90px;border-radius:8px;transform-origin:bottom;animation-delay:' + (k * 0.15) + 's;background:' + ['#EC4899', '#F59E0B', '#10B981', '#0EA5E9', '#8B5CF6'][k] }; });

    // ---------- rounds ----------
    var isLr = s.round === 'lr';
    var introRows = (isLr ? t.introLr : t.introCfr).map(function (lab?: any, k?: any) {
      var ds = isLr ? ['M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2', 'M4 5h16v10H4zM2 19h20', 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4', 'M2 9a15 15 0 0120 0M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M12 20h.01', 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4']
        : ['M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2', 'M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z', 'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0012 3z'];
      var cols = isLr ? ['#E91E63', '#F59E0B', '#8B5CF6', '#0EA5E9', '#10B981'] : ['#8B5CF6', '#EC4899', '#F59E0B'];
      return { label: lab, d: ds[k], tile: 'width:' + (isLr ? 44 : 54) + 'px;height:' + (isLr ? 44 : 54) + 'px;flex-shrink:0;border-radius:' + (isLr ? 14 : 16) + 'px;display:flex;align-items:center;justify-content:center;background:' + cols[k] };
    });
    var locale = s.lang === 'en' ? 'en-IN' : s.lang + '-IN';
    var base = new Date(); base.setHours(0, 0, 0, 0);
    var TIMES = [[10, 0], [11, 30], [14, 0], [16, 30], [18, 0]];
    var dayList: any[] = [];
    for (i = 1; i <= 7; i++) { var dd = new Date(base.getTime() + i * 86400000); dayList.push(dd); }
    var slotsFor = function (di?: any) { if (di === 3) return []; return TIMES.map(function (tm?: any, k?: any) { return { h: tm[0], m: tm[1], full: (di + k) % 4 === 0 }; }); };
    var accent = isLr ? '#0EA5E9' : '#8B5CF6', accentDark = isLr ? '#0369A1' : '#6D28D9';
    var days = dayList.map(function (dt?: any, di?: any) {
      var sel = di === s.dayIdx, has = slotsFor(di).length > 0;
      return { wd: dt.toLocaleDateString(locale, { weekday: 'short' }), n: dt.getDate(), pick: function () { self.setState({ dayIdx: di, time: null }); self.armIdle(); },
        dotStyle: 'width:6px;height:6px;border-radius:999px;background:' + (has ? (sel ? '#FFFFFF' : '#10B981') : 'transparent'),
        style: 'display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 0;border-radius:16px;cursor:pointer;' + (sel ? 'background:' + accent + ';color:#FFFFFF;border:2px solid ' + accentDark + ';box-shadow:0 4px 0 ' + accentDark + ';' : 'background:#FFFFFF;color:#334155;border:2px solid #E2E8F0;') };
    });
    var fmtTime = function (h?: any, m?: any) { var d0 = new Date(2000, 0, 1, h, m); return d0.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' }); };
    var todaySlots = slotsFor(s.dayIdx);
    var times = todaySlots.map(function (tm?: any) {
      var key = tm.h + ':' + tm.m, sel = s.time === key;
      return { label: tm.full ? fmtTime(tm.h, tm.m) : fmtTime(tm.h, tm.m), full: tm.full,
        pick: function () { if (tm.full) return; self.setState({ time: key }); self.armIdle(); },
        style: "min-height:52px;border-radius:16px;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:17px;cursor:" + (tm.full ? 'not-allowed' : 'pointer') + ';' + (tm.full ? 'background:#F1F5F9;color:#94A3B8;border:2px dashed #CBD5E1;text-decoration:line-through;' : sel ? 'background:' + accent + ';color:#FFFFFF;border:2px solid ' + accentDark + ';box-shadow:0 4px 0 ' + accentDark + ';' : 'background:#FFFFFF;color:#0F172A;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;') };
    });
    var monthLabel = dayList[0].toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    var booked = isLr ? s.bookedLr : s.bookedCfr;
    var slotDate: any = null, tH = 10, tM = 0;
    var tk = (sc === 'booked' && booked) ? booked : { dayIdx: s.dayIdx, time: s.time || '10:0' };
    var tparts = tk.time.split(':'); tH = Number(tparts[0]); tM = Number(tparts[1]);
    slotDate = new Date(dayList[tk.dayIdx].getTime()); slotDate.setHours(tH, tM, 0, 0);
    var until = Math.max(0, slotDate.getTime() - s.now);
    var ticket: any = {
      round: isLr ? t.lr : t.cfr, isBooked: sc === 'booked',
      date: slotDate.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' }),
      time: fmtTime(tH, tM),
      countdown: Math.floor(until / 86400000) + 'd ' + (Math.floor(until / 3600000) % 24) + 'h ' + (Math.floor(until / 60000) % 60) + 'm',
      card: 'position:relative;overflow:hidden;border-radius:24px;padding:18px;display:flex;flex-direction:column;gap:6px;background:linear-gradient(135deg,' + (isLr ? '#38BDF8,#0284C7' : '#A78BFA,#6D28D9') + ');box-shadow:0 8px 0 ' + accentDark + ',0 16px 30px ' + (isLr ? 'rgba(2,132,199,.35)' : 'rgba(109,40,217,.35)')
    };
    var ticketActions = [
      [t.addCal, 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5', function () { self.miniWin(t.addedCal, 0); }, '#0369A1', '#E0F2FE'],
      [t.reschedule, 'M4 4v6h6M20 20v-6h-6M20 10a8 8 0 00-14-4L4 10M4 14a8 8 0 0014 4l2-4', function () { self.go('slot', { time: null }); }, '#92400E', '#FEF3C7'],
      [t.cancel, 'M6 6l12 12M18 6L6 18', function () { self.setState({ dialog: 'cancel', reason: null }); }, '#991B1B', '#FEE2E2']
    ].map(function (a?: any) { return { label: a[0], d: a[1], on: a[2], style: 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:68px;border-radius:18px;cursor:pointer;border:none;color:' + a[3] + ';background:' + a[4] }; });
    var pendingTip = t.pendingTips[isLr ? 0 : 1];

    // offer
    var joinD = new Date(base.getTime() + 21 * 86400000);
    var joinDate = joinD.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    var fullName = (s.first + ' ' + s.last).trim() || nm;
    var checkCols = ['#EC4899', '#0EA5E9', '#F59E0B', '#10B981'];
    var checkDs = ['M9 11a3 3 0 100-6 3 3 0 000 6zM17 11a3 3 0 100-6 3 3 0 000 6zM3 21c.8-3 3-5 6-5s5.2 2 6 5M15 16c2.5 0 4.6 1.6 5.5 5', 'M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6', 'M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10M4 16h16M4 16l-1 4M20 16l1 4M8 20h.01M16 20h.01M4 10h16', 'M6 8h12l-1 13H7zM9 8V6a3 3 0 016 0v2'];
    var checkItems = t.checks.map(function (c?: any, k?: any) {
      var done = s.checks[k];
      return { label: c[0], sub: c[1], d: checkDs[k], done: done, pressed: done ? 'true' : 'false',
        tile: 'width:50px;height:50px;flex-shrink:0;border-radius:16px;display:flex;align-items:center;justify-content:center;background:' + checkCols[k],
        box: 'width:34px;height:34px;flex-shrink:0;border-radius:10px;display:flex;align-items:center;justify-content:center;' + (done ? 'background:#10B981;border:2px solid #059669;' : 'background:#FFFFFF;border:2.5px solid #CBD5E1;'),
        style: 'display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:20px;cursor:pointer;' + (done ? 'background:#F0FDF4;border:2px solid #86EFAC;box-shadow:0 4px 0 #BBF7D0;' : 'background:#FFFFFF;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;'),
        toggle: function () {
          if (k === 2) { self.go('travel'); return; }
          var arr = s.checks.slice(); arr[k] = !arr[k]; self.setState({ checks: arr }); self.armIdle(); if (arr[k]) self.miniWin(k === 1 ? t.docsUp : t.bagPacked, 0);
        }
      };
    });
    checkItems = checkItems.slice(1); // the parent-consent item (index 0) is no longer part of the checklist
    var nChecked = s.checks.slice(1).filter(Boolean).length;
    var checkUi: any = { count: nChecked + '/3', bar: 'height:100%;border-radius:999px;width:' + Math.round(nChecked * 100 / 3) + '%' };
    var batchName = t.batch + ' · ' + campusName;
    var qrPath = '', rx: any, ry: any;
    for (ry = 0; ry < 25; ry++) for (rx = 0; rx < 25; rx++) {
      var fin = function (ox?: any, oy?: any) { var ax = rx - ox, ay = ry - oy; if (ax < 0 || ay < 0 || ax > 6 || ay > 6) return null; return (ax === 0 || ay === 0 || ax === 6 || ay === 6 || (ax >= 2 && ax <= 4 && ay >= 2 && ay <= 4)); };
      var f1 = fin(0, 0), f2 = fin(18, 0), f3 = fin(0, 18);
      var on = f1 !== null ? f1 : f2 !== null ? f2 : f3 !== null ? f3 : (((rx * 7 + ry * 13 + rx * ry) % 5) < 2);
      if (on) qrPath += 'M' + rx + ' ' + ry + 'h1v1h-1z';
    }

    // badges
    var BD = [
      ['#059669', '#D1FAE5', 'M12 22V12M12 12C12 7 8 5 4 5c0 4 3 7 8 7zm0 0c0-4 3-7 8-7 0 5-4 7-8 7'],
      ['#E91E63', '#FCE7F3', 'M13 2L4 14h7l-1 8 9-12h-7z'],
      ['#0284C7', '#E0F2FE', 'M4 5h16v10H4zM2 19h20'],
      ['#7C3AED', '#EDE9FE', 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z'],
      ['#D97706', '#FEF3C7', 'M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.8 5.7 21.1l1.5-7L2 9.3l7-.8z'],
      ['#BE185D', '#FFF1F2', 'M3 10l9-6 9 6M5 10v10h14V10M10 20v-5h4v5']
    ];
    var earned: any = ({ lang: 0, about1: 0, about2: 0, tour: 0, map: [1, 2, 3, 4][s.lvl - 1] } as any)[sc];
    if (earned === undefined) {
      earned = isReg ? 0 : ['ready', 'countdown', 'test', 'submitting', 'fail'].indexOf(sc) >= 0 ? 1 : ['intro', 'slot', 'confirm', 'booked', 'call', 'pending'].indexOf(sc) >= 0 ? (isLr ? 2 : 3) : sc === 'history' ? [1, 2, 3, 4][s.lvl - 1] : ['letter', 'checklist', 'whatsapp', 'consent', 'travel'].indexOf(sc) >= 0 ? 5 : 6;
    }
    if (sc === 'cel') earned = ({ reg: 1, test: 2, lr: 3, cfr: 4, sel: 5, campus: 6 } as any)[s.cel];
    var shelf = BD.map(function (b?: any, k?: any) {
      var got = k < earned;
      return { name: t.badges[k], c1: got ? b[0] : '#CBD5E1', c2: got ? b[1] : '#F1F5F9', d: b[2], svgStyle: got ? '' : 'opacity:.6' };
    });

    // ---------- celebration ----------
    var celDefs: any = {
      reg: [t.celReg, t.tReg + nm + '!', 0, t.seeJourney, function () { self.walkTo(1); }],
      test: [t.celTest, t.tTest, 1, t.seeJourney, function () { self.walkTo(2); }],
      lr: [t.celLr, t.tLr, 2, t.seeJourney, function () { self.walkTo(3); }],
      cfr: [t.celCfr, t.tCfr, 3, t.seeJourney, function () { self.walkTo(4); }],
      sel: [t.celSel, t.tSel, 4, t.seeLetter, function () { self.go('letter'); }],
      campus: [t.celCampus, t.tCampus + nm + '!', 5, t.myJourney, function () { self.go('history'); }]
    };
    var cd0 = celDefs[s.cel] || celDefs.reg;
    var bdef = BD[cd0[2]];
    var cel: any = {
      pill: cd0[0], title: cd0[1], primaryLabel: cd0[3], primaryOn: cd0[4], isCampus: s.cel === 'campus',
      badge: { name: t.badges[cd0[2]], c1: bdef[0], c2: bdef[1], d: bdef[2], r1: bdef[0], r2: '#9D174D' },
      hasChips: s.cel === 'sel' || s.cel === 'test',
      chips: s.cel === 'sel' ? [schoolName, campusName] : s.cel === 'test' ? [s.score + '/5'] : []
    };

    // ---------- map ----------
    var ms = this.mapScale();
    var mw = Math.round(1604 * ms), mh = Math.round(934 * ms);
    var pos = this.walkerPos();
    var ww = D ? 60 : 48, wh = D ? 112 : 90;
    var RINGS = [[250, 440], [710, 420], [1020, 520], [1370, 290]];
    var tourLabels = t.tourLabels;
    var FLAGS = [[245, 205], [760, 205], [1060, 270], [1455, 70]];
    var isTour = sc === 'tour';
    if (isTour) RINGS = [[150, 690], [250, 440], [710, 420], [1020, 520], [1370, 290]];
    var ringC = isTour ? RINGS[s.tourStop] : RINGS[s.lvl - 1];
    var ringSize = Math.round(150 * ms);
    var ringStyle = function (col?: any, delay?: any) { return 'position:absolute;left:' + Math.round(ringC[0] * ms - ringSize / 2) + 'px;top:' + Math.round(ringC[1] * ms - ringSize / 2) + 'px;width:' + ringSize + 'px;height:' + ringSize + 'px;border-radius:999px;border:4px solid ' + col + ';box-sizing:border-box;animation-delay:' + delay + 's'; };
    var badgeSz = D ? 34 : 30;
    var markStyle = function (p?: any, bg?: any) { return 'position:absolute;left:' + Math.round(p[0] * ms - badgeSz / 2) + 'px;top:' + Math.round(p[1] * ms - badgeSz / 2) + 'px;width:' + badgeSz + 'px;height:' + badgeSz + 'px;border-radius:999px;background:' + bg + ';border:2.5px solid #FFFFFF;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,.3);box-sizing:border-box'; };
    var mp: any = {
      inner: 'position:relative;width:' + mw + 'px;height:' + mh + 'px',
      img: 'position:absolute;left:0;top:0;width:' + mw + 'px;height:' + mh + 'px',
      checks: isTour ? [] : [[165, 650]].concat(FLAGS.slice(0, s.lvl - 1)).map(function (p?: any) { return { style: markStyle(p, '#059669') }; }),
      locks: isTour ? [] : FLAGS.slice(s.lvl).map(function (p?: any) { return { style: markStyle(p, 'rgba(71,85,105,.9)') }; }),
      ring1: ringStyle('#F472B6', 0), ring2: ringStyle('#FBBF24', 0.7),
      arrived: isTour ? !s.walking : (!s.walking && s.walkT >= 1),
      hereText: isTour ? tourLabels[s.tourStop] : t.youHere,
      here: "position:absolute;left:" + Math.round(ringC[0] * ms - 60) + 'px;top:' + Math.round(ringC[1] * ms - ringSize / 2 - 30) + "px;width:120px;text-align:center;background:#E91E63;color:#FFFFFF;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:10px;letter-spacing:.12em;padding:4px 0;border-radius:999px;box-shadow:0 4px 12px rgba(233,30,99,.45)",
      walker: 'position:absolute;left:' + Math.round(pos.x - ww / 2) + 'px;top:' + Math.round(pos.y - wh) + 'px;width:' + ww + 'px;height:' + wh + 'px;z-index:3',
      walkerCls: s.walking ? 'asha-walk' : 'asha-idle'
    };
    var lv = Math.max(1, Math.min(4, s.lvl)) - 1;
    var mapCols = ['linear-gradient(135deg,#F472B6,#E91E63)', 'linear-gradient(135deg,#38BDF8,#0284C7)', 'linear-gradient(135deg,#A78BFA,#6D28D9)', 'linear-gradient(135deg,#FBBF24,#D97706)'];
    var mapNext: any = {
      level: t.lvlName[lv], title: t.lvlTitle[lv], chips: [t.chipTest, t.chipLr, t.chipCfr, t.chipOffer][lv],
      card: 'display:flex;flex-direction:column;gap:4px;padding:14px 16px;border-radius:22px;background:' + mapCols[lv] + ';box-shadow:0 6px 0 rgba(0,0,0,.12)'
    };

    // ---------- advance helpers ----------
    function advanceFrom(step?: any, picked?: any) {
      var list = step === 'qual' && picked ? regFor(picked) : REG;
      var idx = list.indexOf(step);
      var nxt = idx < list.length - 1 ? list[idx + 1] : null;
      var extra: any = {};
      if (step === 'gender') extra.section = t.sec1;
      if (step === 'photo') extra.section = t.sec2;
      var msg = step === 'name' ? t.hello + (s.first.trim() || nm) + '!' : step === 'photo' && s.photo === 'done' ? t.nicePhoto : step === 'login' ? t.welcome : cheer(idx);
      if (!nxt) { self.celebrate('reg'); return; }
      if (s.editing) { extra = {}; msg = t.saved; nxt = '@edit'; }
      var EMO: any = { login: '👋', name: '😊', photo: '📸', dob: '🎂', gender: '👍', phone: '📱', sname: '🏫', year: '📅', attend: '🏫', parent: '👨‍👩‍👧', pincode: '📍', status: '⭐', qual: '🎓', medium: '📚', category: '✅', school: '🏫', campus: '🗺️' };
      self.microWin(msg, nxt, extra, 10, EMO[step]);
    }

    // ---------- step config ----------
    var stepsLeft = isReg ? REG.length - regIdx : 0;
    var pillTxt = isReg ? (stepsLeft <= 1 ? t.lastStep : stepsLeft + t.left) : '';
    var pinkPill = "font-family:'JetBrains Mono',monospace;font-weight:700;font-size:11px;letter-spacing:.12em;padding:4px 12px;border-radius:999px;background:#ECFDF5;border:1.5px solid #6EE7B7;color:#047857;white-space:nowrap";
    var cfg: any = { ask: '', sub: '', hasPill: false, pill: '', pillStyle: pinkPill, hasNav: false, navBack: false, navClose: false, hasNavPill: false, navPill: '', navPillStyle: pinkPill,
      hasFooter: false, hasPrimary: false, primaryLabel: t.next, primaryOn: null, primaryDisabled: false, primaryCls: 'glow-btn', hasSecondary: false, secondaryLabel: '', secondaryOn: null,
      secondaryStyle: "height:64px;padding:0 18px;border-radius:999px;border:2px solid #E2E8F0;background:#FFFFFF;color:#334155;font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:18px;cursor:pointer" };
    var regNav = function () { cfg.hasHelp = true; cfg.hasNav = true; cfg.navBack = regIdx > 0; cfg.navClose = true; cfg.hasNavPill = true; cfg.navPill = pillTxt; };
    var footer = function (label?: any, on?: any, disabled?: any) { cfg.hasFooter = true; cfg.hasPrimary = true; cfg.primaryLabel = label; cfg.primaryOn = on; cfg.primaryDisabled = !!disabled; };
    var mapPrimary = [function () { self.go('ready'); }, function () { self.go('intro', { round: 'lr', dayIdx: 0, time: null }); }, function () { self.go('intro', { round: 'cfr', dayIdx: 0, time: null }); }, function () { self.celebrate('sel'); }][lv];
    var nextFor = function (step?: any) { return function () { if (s.toast) return; advanceFrom(step); }; };
    switch (sc) {
      case 'lang': cfg.ask = t.hello1; cfg.sub = t.hello2; break;
      case 'about2': cfg.ask = t.askAbout2; cfg.sub = t.subAbout2; footer(t.wantThis, function () { self.go('about1'); }); cfg.hasSecondary = true; cfg.secondaryLabel = t.skip; cfg.secondaryOn = function () { self.tourGo(0); }; break;
      case 'about1': cfg.ask = t.askAbout1; cfg.sub = t.subAbout1; footer(t.next, function () { self.tourGo(0); }); cfg.hasSecondary = true; cfg.secondaryLabel = t.back; cfg.secondaryOn = function () { self.backToLanding(); }; break;
      case 'login': regNav(); cfg.navBack = false; cfg.hasHelp = false; cfg.ask = t.askLogin; cfg.sub = t.subLogin; if (s.loginDone) footer(t.next, nextFor('login')); break;
      case 'name': regNav(); cfg.ask = t.askName; cfg.sub = t.subName; footer(t.next, nextFor('name'), !s.first.trim()); break;
      case 'photo': regNav(); cfg.ask = t.askPhoto; cfg.sub = t.subPhoto; footer(t.next, nextFor('photo'), s.photo !== 'done'); cfg.hasSecondary = true; cfg.secondaryLabel = t.skip; cfg.secondaryOn = nextFor('photo'); break;
      case 'dob': regNav(); cfg.ask = t.askDob; cfg.sub = t.subDob; footer(t.next, nextFor('dob')); break;
      case 'gender': regNav(); cfg.ask = t.askGender; cfg.sub = t.subGender; if (s.gender) footer(t.next, nextFor('gender')); break;
      case 'phone': regNav(); cfg.ask = t.askPhone; cfg.sub = t.subPhone; footer(t.next, nextFor('phone'), s.phone.replace(/\D/g, '').length < 10); break;
      case 'parent': regNav(); cfg.ask = t.askParent; cfg.sub = t.subParent; footer(t.next, nextFor('parent'), !s.pName.trim()); break;
      case 'pincode': regNav(); cfg.ask = t.askPin; cfg.sub = t.subPin; footer(t.next, nextFor('pincode'), !(s.district && s.stateName)); break;
      case 'status': regNav(); cfg.ask = t.askStatus; cfg.sub = t.subTapOne; break;
      case 'qual': regNav(); cfg.ask = t.askQual; cfg.sub = t.subTapOne; if (s.qual) footer(t.next, nextFor('qual')); break;
      case 'sname': regNav(); cfg.ask = t.askSName; cfg.sub = t.subSName; footer(t.next, nextFor('sname'), !s.sname.trim()); break;
      case 'year': regNav(); cfg.ask = t.askYear; cfg.sub = t.subTapOne; if (s.year) footer(t.next, nextFor('year')); break;
      case 'attend': regNav(); cfg.ask = t.askAttend; cfg.sub = t.subTapOne; if (s.attend) footer(t.next, nextFor('attend')); break;
      case 'medium': regNav(); cfg.ask = t.askMedium; cfg.sub = t.subTapOne; break;
      case 'category': regNav(); cfg.ask = t.askCat; cfg.sub = t.subTapOne; if (s.cat !== null) footer(t.next, nextFor('category')); break;
      case 'school': regNav(); cfg.ask = t.askSchool; cfg.sub = t.subSchool; footer(t.chooseSchool, nextFor('school'), !s.school || noneEligible || schoolOkIds.indexOf(s.school) < 0); break;
      case 'campus': regNav(); cfg.ask = t.pickCampus; cfg.sub = t.subCampus; if (s.campus && campOk(s.campus)) footer(t.next, nextFor('campus')); break;
      case 'tour':
        cfg.ask = t.tour[s.tourStop];
        cfg.hasFooter = true; cfg.hasPrimary = true; cfg.primaryDisabled = s.walking;
        cfg.primaryLabel = s.tourStop === 0 ? t.tourShow : s.tourStop < 4 ? t.next : t.tourStart;
        cfg.primaryOn = function () { if (s.tourStop < 4) self.tourGo(s.tourStop + 1); else self.go('login'); };
        if (s.tourStop === 0) { cfg.hasSecondary = true; cfg.secondaryLabel = t.back; cfg.secondaryOn = function () { self.backToLanding(); }; }
        else if (s.tourStop < 4) { cfg.hasSecondary = true; cfg.secondaryLabel = t.skip; cfg.secondaryOn = function () { self.go('login'); }; }
        break;
      case 'review': regNav(); cfg.ask = t.askReview; cfg.sub = t.subReview; footer(t.looksGood, function () { self.celebrate('reg'); }); break;
      case 'map': cfg.ask = t.mapAsk[lv]; footer(t.lvlBtn[lv], mapPrimary, s.walking); if (s.lvl > 1) { cfg.hasSecondary = true; cfg.secondaryLabel = t.myResults; cfg.secondaryOn = function () { self.go('history'); }; } break;
      case 'ready': cfg.ask = t.askReady; cfg.sub = t.subReady; footer(t.imReady, function () { self.startCountdown(); }); break;
      case 'test':
        cfg.ask = t.testAsk[s.qi]; cfg.hasNav = true; cfg.navClose = true; cfg.hasNavPill = true; cfg.navPill = mm;
        cfg.navPillStyle = "font-family:'JetBrains Mono',monospace;font-weight:700;font-size:16px;letter-spacing:.06em;padding:6px 16px;border-radius:999px;" + (remain < 300 ? 'background:#FEF3C7;border:2px solid #F59E0B;color:#92400E' : 'background:#FDF2F8;border:2px solid #F9A8D4;color:#9D174D');
        cfg.hasPill = true; cfg.pill = qHead; cfg.pillStyle = pinkPill.replace('#ECFDF5', '#FDF2F8').replace('#6EE7B7', '#F9A8D4').replace('#047857', '#BE185D');
        cfg.hasFooter = true;
        if (s.qi > 0) { cfg.hasSecondary = true; cfg.secondaryLabel = t.prev; cfg.secondaryOn = function () { self.setState({ qi: s.qi - 1 }); }; }
        cfg.hasPrimary = true;
        if (s.qi < 4) { cfg.primaryLabel = t.next; cfg.primaryOn = function () { self.setState({ qi: s.qi + 1 }); self.armIdle(); }; }
        else { cfg.primaryLabel = t.submit; cfg.primaryOn = function () { self.setState({ dialog: 'submit' }); }; }
        break;
      case 'submitting': cfg.ask = t.askSubmitting; break;
      case 'fail': cfg.ask = t.askFail; break;
      case 'intro': cfg.ask = isLr ? t.askIntroLr : t.askIntroCfr; cfg.sub = isLr ? t.subIntroLr : t.subIntroCfr; cfg.hasPill = true; cfg.pill = isLr ? t.lr : t.cfr; footer(t.bookSlot, function () { self.go('slot'); }); break;
      case 'slot': cfg.ask = t.askSlot; cfg.hasNav = true; cfg.navBack = true; cfg.hasNavPill = true; cfg.navPill = isLr ? t.lr : t.cfr; footer(t.next, function () { self.go('confirm'); }, !s.time); break;
      case 'confirm': cfg.ask = t.askConfirm; cfg.hasNav = true; cfg.navBack = true; cfg.hasNavPill = true; cfg.navPill = isLr ? t.lr : t.cfr; cfg.hasFooter = true; cfg.hasSecondary = true; cfg.secondaryLabel = t.change; cfg.secondaryOn = function () { self.go('slot'); };
        cfg.hasPrimary = true; cfg.primaryLabel = t.confirm; cfg.primaryOn = function () { var b: any = { dayIdx: s.dayIdx, time: s.time }; var o = isLr ? { bookedLr: b } : { bookedCfr: b }; self.microWin(t.slotBooked, 'booked', o, 25, '📅'); }; break;
      case 'booked': cfg.ask = t.askBooked; cfg.sub = t.subBooked; cfg.hasPill = true; cfg.pill = isLr ? t.lr : t.cfr; footer(t.joinMeetBig, function () { self.microWin(t.callDone, 'pending', {}, 25, '🎤'); }); cfg.primaryCls = 'green-btn'; break;
      case 'call': cfg.ask = isLr ? t.askCallLr : t.askCallCfr; cfg.hasPill = true; cfg.pill = isLr ? t.lr : t.cfr; footer(t.endCall, function () { self.microWin(t.callDone, 'pending', {}, 25, '🎤'); }); break;
      case 'history': cfg.ask = s.joined ? t.askHistoryDone : t.askHistory; cfg.hasNav = true; cfg.navBack = true; cfg.hasNavPill = true; cfg.navPill = t.myResults; if (!s.joined) footer(t.lvlBtn[lv], mapPrimary); break;
      case 'travel': cfg.ask = t.askTravel; cfg.sub = t.subTravel; cfg.hasNav = true; cfg.navBack = true; cfg.hasNavPill = true; cfg.navPill = t.checks[2][0];
        footer(t.savePlan, function () { var arr = s.checks.slice(); arr[2] = true; self.microWin(t.travelDone, 'checklist', { checks: arr }, 20, '🚆'); }, !(s.travelMode && s.travelDay !== null)); break;
      case 'pending': cfg.ask = t.askPending; footer(t.checkResult, function () { self.celebrate(isLr ? 'lr' : 'cfr'); }); break;
      case 'letter': cfg.ask = t.askLetter; cfg.hasNav = true; cfg.hasNavPill = true; cfg.navPill = t.letterHead; footer(t.waBtn, function () { if (!s.offerAccepted) { self.setState({ offerAccepted: true }); self.miniWin(t.offerAccepted, 50); } }); cfg.primaryCls = 'green-btn'; break; // the offer letter is the last page of the journey
      case 'checklist': cfg.ask = nChecked === 3 ? t.allSet : t.askCheck; cfg.sub = nChecked < 3 ? t.subCheck : ''; footer(t.next, function () { self.celebrate('campus'); }, nChecked < 3); break;
      case 'whatsapp': cfg.ask = t.askWa; footer(t.waBtn, function () { self.celebrate('campus'); }); cfg.primaryCls = 'green-btn'; break;
    }
    cfg.hasSub = !!cfg.sub;
    if (P && compact) cfg.hasPill = false;
    this.lastAsk = cfg.ask + (cfg.sub ? '. ' + cfg.sub : '');

    // dialogs
    var dlg: any = { title: '', body: '', primary: '', secondary: '', primaryOn: null, secondaryOn: null, primaryDisabled: false, hasReasons: false, reasons: [] };
    if (s.dialog === 'leave') { dlg.title = t.leaveTitle; dlg.body = t.leaveBody1 + stepsLeft + t.leaveBody2; dlg.primary = t.stay; dlg.primaryOn = function () { self.setState({ dialog: null }); }; dlg.secondary = t.later; dlg.secondaryOn = function () { self.setState(self.fresh()); }; }
    if (s.dialog === 'leaveTest') { dlg.title = t.leaveTestTitle; dlg.body = t.leaveTestBody; dlg.primary = t.stayTest; dlg.primaryOn = function () { self.setState({ dialog: null }); }; dlg.secondary = t.leaveTest; dlg.secondaryOn = function () { self.go('map', { answers: {}, qi: 0 }); }; }
    if (s.dialog === 'submit') { dlg.title = t.submitTitle; dlg.body = t.submitBody1 + answeredCount + t.submitBody2; dlg.primary = t.yesSubmit; dlg.primaryOn = function () { self.submitTest(); }; dlg.secondary = t.goBack; dlg.secondaryOn = function () { self.setState({ dialog: null }); }; }
    if (s.dialog === 'cancel') {
      dlg.title = t.cancelTitle; dlg.body = t.cancelBody; dlg.hasReasons = true;
      dlg.reasons = t.reasons.map(function (r?: any, k?: any) { var sel = s.reason === k; return { label: r, pick: function () { self.setState({ reason: k }); }, style: 'min-height:46px;padding:0 16px;border-radius:999px;cursor:pointer;font-weight:800;font-size:15px;' + (sel ? 'background:#E91E63;color:#FFFFFF;border:2px solid #BE185D;' : 'background:#FFFFFF;color:#334155;border:2px solid #E2E8F0;') }; });
      dlg.primary = t.cancelYes; dlg.primaryDisabled = s.reason === null; dlg.primaryOn = function () { var o = isLr ? { bookedLr: null } : { bookedCfr: null }; self.go('slot', Object.assign({ time: null }, o)); };
      dlg.secondary = t.keep; dlg.secondaryOn = function () { self.setState({ dialog: null }); };
    }

    // jumps
    var demoProfile: any = { first: s.first || 'Ravi', last: s.last || 'Kumar', photo: 'done', gender: s.gender || 'boy', phone: s.phone || '9876543210', pName: s.pName || 'Sunita', pin: s.pin || '411001', pinState: 'done', district: s.district || 'Pune', stateName: s.stateName || 'Maharashtra', status: s.status || 'study', qual: s.qual || '12', medium: s.medium || 'hi', cat: s.cat === null ? 0 : s.cat, school: s.school || 'sob', campus: s.campus || 'Pune', jump: false, toast: null, dialog: null };
    var jumpTo = [
      function () { self.setState(Object.assign(self.fresh(), { lang: s.lang })); },
      function () { self.go('login', { jump: false }); },
      function () { self.walkTo(1); self.setState(demoProfile); },
      function () { self.go('fail', Object.assign({}, demoProfile, { score: 2, failAt: Date.now(), now: Date.now() })); },
      function () { self.walkTo(2); self.setState(Object.assign({}, demoProfile, { score: 4, testAt: Date.now(), passed: { test: true, lr: false, cfr: false } })); },
      function () { self.walkTo(3); self.setState(Object.assign({}, demoProfile, { score: 4, testAt: Date.now(), bookedLr: { dayIdx: 1, time: '11:30' }, passed: { test: true, lr: true, cfr: false } })); },
      function () { self.setState(Object.assign({}, demoProfile, { score: 4, lvl: 4, passed: { test: true, lr: true, cfr: true } })); self.celebrate('sel'); },
      function () { self.setState(Object.assign({}, demoProfile, { score: 4, lvl: 4, testAt: Date.now(), bookedLr: { dayIdx: 1, time: '11:30' }, bookedCfr: { dayIdx: 3, time: '14:0' }, passed: { test: true, lr: true, cfr: true }, offerAccepted: true, checks: [true, true, true, true] })); self.celebrate('campus'); }
    ];
    var jumps = t.jumps.slice(0, 7).map(function (lab?: any, k?: any) { return { n: k + 1, label: lab, go: jumpTo[k] }; });

    var HB = 'M29 44 Q28 20 50 20 Q72 20 71 44 Q66 30 50 30 Q34 30 29 44Z', HL = 'M27 50 Q24 18 50 18 Q76 18 73 50 Q70 28 50 28 Q30 28 27 50Z', HLB = 'M26 44 Q24 80 34 88 L66 88 Q76 80 74 44Z';
    var ALUM = [
      { n: 'Ananya Singh', co: 'Zoho', role: 'Full Stack Dev', pkg: '₹4.5 LPA', batch: 'Batch of 2022', city: 'Chennai', skin: '#C98B5E', shirt: '#E91E63', bg: '#FCE7F3', hair: HL, hairBack: HLB,
        q: { en: I18N.en.extra.alumQuotes[0], hi: I18N.hi.extra.alumQuotes[0], mr: I18N.mr.extra.alumQuotes[0] } },
      { n: 'Rahul Kumar', co: 'Razorpay', role: 'Data Analyst', pkg: '₹4.2 LPA', batch: 'Batch of 2023', city: 'Bengaluru', skin: '#B97A4E', shirt: '#0EA5E9', bg: '#E0F2FE', hair: HB, hairBack: '',
        q: { en: I18N.en.extra.alumQuotes[1], hi: I18N.hi.extra.alumQuotes[1], mr: I18N.mr.extra.alumQuotes[1] } },
      { n: 'Priya Sharma', co: 'Swiggy', role: 'QA Engineer', pkg: '₹3.8 LPA', batch: 'Batch of 2022', city: 'Bengaluru', skin: '#D6976A', shirt: '#10B981', bg: '#DCFCE7', hair: HL, hairBack: HLB,
        q: { en: I18N.en.extra.alumQuotes[2], hi: I18N.hi.extra.alumQuotes[2], mr: I18N.mr.extra.alumQuotes[2] } },
      { n: 'Karan Patel', co: 'Infosys', role: 'Backend Dev', pkg: '₹4.8 LPA', batch: 'Batch of 2021', city: 'Pune', skin: '#A86F45', shirt: '#F59E0B', bg: '#FEF3C7', hair: HB, hairBack: '',
        q: { en: I18N.en.extra.alumQuotes[3], hi: I18N.hi.extra.alumQuotes[3], mr: I18N.mr.extra.alumQuotes[3] } },
      { n: 'Sneha Verma', co: 'TCS', role: 'Frontend Dev', pkg: '₹4.0 LPA', batch: 'Batch of 2023', city: 'Mumbai', skin: '#C98B5E', shirt: '#8B5CF6', bg: '#EDE9FE', hair: HL, hairBack: HLB,
        q: { en: I18N.en.extra.alumQuotes[4], hi: I18N.hi.extra.alumQuotes[4], mr: I18N.mr.extra.alumQuotes[4] } }
    ];
    var bgBanyan = D ? (sc !== 'map' && sc !== 'tour' && !(sc === 'cel' && s.cel === 'campus')) : sc === 'lang';
    // The same round details as the journey map tour, shown again right before each round.
    var riData = sc === 'ready' ? t.tourInfo[1] : sc === 'intro' ? t.tourInfo[s.round === 'lr' ? 2 : 3] : null;
    var roundInfo: any = { has: !!riData, facts: riData ? riData.facts : [], topics: riData ? riData.topics : [], hasTitle: !!(riData && riData.title), title: riData ? riData.title || '' : '',
      box: 'display:flex;flex-direction:column;gap:' + (D ? 10 : 7) + 'px;padding:' + (D ? '16px 18px' : '10px 12px') + ';border-radius:18px;background:#FFFFFF;border:1.5px solid #FBCFE8',
      factStyle: 'font-weight:800;line-height:1.3;white-space:nowrap;border-radius:999px;background:#FDF2F8;border:1.5px solid #F9A8D4;color:#9D174D;font-size:' + (D ? 16 : 13) + 'px;padding:' + (D ? '5px 14px' : '3px 10px'),
      titleStyle: "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;line-height:1.2;color:#0F172A;font-size:" + (D ? 20 : 15) + 'px',
      topicStyle: 'font-weight:700;line-height:1.3;border-radius:999px;background:#F1F5F9;color:#334155;font-size:' + (D ? 15 : 12.5) + 'px;padding:' + (D ? '5px 13px' : '3px 9px') };
    var tourInfo = sc === 'tour' ? t.tourInfo[s.tourStop] : null;
    return {
      D: D, P: P, L: L, t: t, cfg: cfg, dlg: dlg, cel: cel, mp: mp, hud: hud,
      on: {
        bgBanyan: bgBanyan, bgSoft: !bgBanyan && !(sc === 'cel' && s.cel === 'campus'),
        bird: sc === 'lang' || sc === 'about1' || sc === 'about2' || isReg || sc === 'map' || sc === 'tour', hud: sc !== 'lang', bareLogo: sc === 'lang',
        stage: sc !== 'map' && sc !== 'cel' && sc !== 'tour', map: sc === 'map' || sc === 'tour', panel: sc !== 'cel', celebrate: sc === 'cel',
        resting: sc === 'pending'
      },
      is: {
        lang: sc === 'lang', login: sc === 'login', fields: !!fieldDefs[sc], phone: sc === 'phone', photo: sc === 'photo', dob: sc === 'dob',
        choice: !!cs, category: sc === 'category', pincode: sc === 'pincode', school: sc === 'school', review: sc === 'review',
        ready: sc === 'ready', countdown: sc === 'countdown', test: sc === 'test', submitting: sc === 'submitting', fail: sc === 'fail',
        intro: sc === 'intro', slot: sc === 'slot', call: sc === 'call', history: sc === 'history', consent: sc === 'consent', travel: sc === 'travel', ticket: sc === 'confirm' || sc === 'booked', pending: sc === 'pending',
        letter: sc === 'letter', checklist: sc === 'checklist', whatsapp: sc === 'whatsapp', mapCard: sc === 'map', tour: sc === 'tour', campus: sc === 'campus', about1: sc === 'about1', about2: sc === 'about2'
      },
      xp: s.xp, xpCls: s.xpPulse % 2 ? 'xp-bump' : '', xpGain: s.xpGain,
      leaves: leaves, confetti: confetti, langCards: langCards, langChips: langChips,
      fields: fields, waSwitch: waSwitch, waPressed: s.sameWa ? 'true' : 'false', photoUi: photoUi, photoTips: photoTips,
      dobSelects: dobSelects, ageText: ageText, choices: choices, choiceGrid: choiceGrid, catChips: catChips,
      placeBoxes: placeBoxes, schools: schools, schoolsOk: schools.filter(function (x?: any) { return !x.locked; }), schoolsNo: schools.filter(function (x?: any) { return x.locked; }), hasSchoolsOk: schools.some(function (x?: any) { return !x.locked; }), hasSchoolsNo: schools.some(function (x?: any) { return x.locked; }), hasCampus: !!curSchool && curSchool.camp.length > 0, campusChips: campusChips, noCampus: noCampus, reviewRows: reviewRows,
      readyTiles: readyTiles, testLangChips: testLangChips, q: q, optGrid: optGrid, qDots: qDots, qHead: qHead, bars: bars,
      failUi: failUi, tips: tips, roundInfo: roundInfo, introRows: introRows, readyGrid: 'display:grid;gap:10px;grid-template-columns:repeat(' + (D ? 2 : 1) + ',minmax(0,1fr))', days: days, times: times, hasTimes: times.length > 0, noTimes: times.length === 0, monthLabel: monthLabel,
      ticket: ticket, ticketActions: ticketActions, pendingTip: pendingTip,
      fullName: fullName, letterBody: t.letterBody, schoolName: schoolName, campusName: campusName, joinDate: joinDate,
      checkItems: checkItems, checkUi: checkUi, batchName: batchName, qrPath: qrPath, shelf: shelf, mapNext: mapNext,
      hasToast: !!s.toast, toastText: s.toast, toastXp: s.toastXp,
      toastUi: (function () {
        var TC = [['#FDE68A', '#F59E0B', '#FBBF24', '#FCD34D', '#B45309'], ['#FBCFE8', '#EC4899', '#F472B6', '#F9A8D4', '#BE185D'], ['#BAE6FD', '#0EA5E9', '#38BDF8', '#7DD3FC', '#0369A1'], ['#BBF7D0', '#10B981', '#34D399', '#6EE7B7', '#047857'], ['#DDD6FE', '#8B5CF6', '#A78BFA', '#C4B5FD', '#6D28D9'], ['#FED7AA', '#F97316', '#FB923C', '#FDBA74', '#C2410C']][s.toastCol % 6];
        return { emoji: s.toastEmo, aria: s.toast || '', ring1: TC[2], ring2: TC[3], text: TC[4],
          circle: 'position:relative;width:110px;height:110px;border-radius:999px;background:radial-gradient(circle at 35% 30%,#FFFFFF,' + TC[0] + ' 70%);border:4px solid ' + TC[1] + ';display:flex;align-items:center;justify-content:center;box-shadow:0 8px 0 ' + TC[4] + ',0 16px 36px rgba(0,0,0,.18)' };
      })(),
      typing: s.typing, notTyping: !s.typing, parA: s.lineKey % 2 === 0, parB: s.lineKey % 2 === 1,
      ashaCls: s.idle ? 'asha-wiggle' : 'asha-say',
      listenStyle: 'align-self:flex-start;display:flex;align-items:center;gap:6px;border:none;background:linear-gradient(135deg,#E0F2FE,#BAE6FD);color:#075985;border-radius:999px;padding:6px 12px 6px 8px;font-size:13px;font-weight:700;cursor:pointer;min-height:36px;' + (s.idle ? 'box-shadow:0 0 0 4px rgba(14,165,233,.35);' : ''),
      voiceOn: s.voice, voiceOff: !s.voice, voicePressed: s.voice ? 'true' : 'false', voiceAria: t.voiceAria,
      voiceStyle: 'width:32px;height:32px;flex-shrink:0;border-radius:999px;display:flex;align-items:center;justify-content:center;cursor:pointer;' + (s.voice ? 'border:1.5px solid #7DD3FC;background:#E0F2FE;color:#0369A1;' : 'border:1.5px solid #E2E8F0;background:#F8FAFC;color:#94A3B8;'),
      toggleVoice: function () { var v = !s.voice; self.setState({ voice: v }); if (!v) {} else { self.speak(self.lastAsk); } },
      tourUi: {
        stopLabel: t.tourLabels[s.tourStop],
        hasInfo: !!tourInfo, facts: tourInfo ? tourInfo.facts : [], topics: tourInfo ? tourInfo.topics : [], hasTitle: !!(tourInfo && tourInfo.title), title: tourInfo ? tourInfo.title || '' : '',
        box: 'display:flex;flex-direction:column;gap:' + (D ? 10 : 7) + 'px;padding:' + (D ? '16px 18px' : '10px 12px') + ';border-radius:18px;background:#FFFFFF;border:1.5px solid #FBCFE8',
        factStyle: 'font-weight:800;line-height:1.3;white-space:nowrap;border-radius:999px;background:#FDF2F8;border:1.5px solid #F9A8D4;color:#9D174D;font-size:' + (D ? 16 : 13) + 'px;padding:' + (D ? '5px 14px' : '3px 10px'),
        titleStyle: "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;line-height:1.2;color:#0F172A;font-size:" + (D ? 20 : 15) + 'px',
        topicStyle: 'font-weight:700;line-height:1.3;border-radius:999px;background:#F1F5F9;color:#334155;font-size:' + (D ? 15 : 12.5) + 'px;padding:' + (D ? '5px 13px' : '3px 9px'),
        pill: "align-self:flex-start;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:11px;letter-spacing:.14em;padding:4px 12px;border-radius:999px;background:#FDF2F8;border:1.5px solid #F9A8D4;color:#BE185D",
        dots: [0, 1, 2, 3, 4].map(function (k?: any) { return { style: 'height:10px;border-radius:999px;transition:width .3s;width:' + (k === s.tourStop ? 28 : 10) + 'px;background:' + (k <= s.tourStop ? '#E91E63' : '#FBCFE8') }; })
      },
      noneEligible: noneEligible, campusCards: campusCards,
      showLangHint: !s.langSeen && (sc === 'about2' || sc === 'about1'),
      hallLine: t.hallYou1 + fullName + t.hallYou2,
      offerGrid: 'display:grid;grid-template-columns:repeat(' + (D ? 3 : 2) + ',minmax(0,1fr));gap:10px',
      offerTiles: t.offers.map(function (o?: any, k?: any) {
        var cols = ['#0EA5E9', '#F59E0B', '#EC4899', '#8B5CF6', '#10B981', '#EA580C'];
        return { name: o[0], cap: o[1], emo: ['💻', '', '🏠', '', '🧑‍🏫', '💼'][k], isImg: k === 1, isWifi: k === 3, isEmo: k !== 1 && k !== 3,
          style: 'position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px 8px 12px;border-radius:20px;background:#FFFFFF;border:2px solid ' + cols[k] + '44;box-shadow:0 5px 0 ' + cols[k] + '33;animation-delay:' + (0.12 * k).toFixed(2) + 's' };
      }),
      famStats: [['2,000+', t.statPlaced, '#E91E63'], ['₹3.5–8L', t.statSalary, '#059669'], ['100%', t.statFree, '#D97706']].map(function (x?: any, k?: any) {
        return { v: x[0], l: x[1], col: x[2], style: 'display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 4px;border-radius:18px;background:#FFFFFF;border:2px solid ' + x[2] + '33;animation-delay:' + (0.1 * k) + 's' };
      }),
      alumni: ALUM.map(function (a?: any, k?: any) {
        var sel = s.alum === k;
        return { n: a.n.split(' ')[0], co: a.co, aria: a.n + ', ' + a.role + ', ' + a.co, sel: sel,
          bg: a.bg, skin: a.skin, shirt: a.shirt, hair: a.hair, hairBack: a.hairBack,
          pick: function () { self.setState({ alum: k }); self.armIdle(); },
          frame: 'display:flex;flex-direction:column;align-items:center;gap:4px;padding:5px 5px 7px;border-radius:12px;cursor:pointer;border:none;animation-delay:' + (0.1 * k).toFixed(1) + 's;' + (sel ? 'background:linear-gradient(145deg,#FEF3C7,#F59E0B);box-shadow:0 0 0 3px #FBBF24,0 8px 18px rgba(251,191,36,.45);transform:scale(1.04);' : 'background:linear-gradient(145deg,#FDE68A,#B45309);box-shadow:0 4px 10px rgba(0,0,0,.35);')
        };
      }),
      youFrame: { label: s.first.trim() || t.youWord, style: 'display:flex;flex-direction:column;align-items:center;gap:4px;padding:5px 5px 7px;border-radius:12px;background:rgba(0,0,0,.2);animation-delay:.6s' },
      alumQuote: (function () { var a = ALUM[s.alum] || ALUM[0]; return { n: a.n, role: a.role + ' · ' + a.co, pkg: a.pkg, q: (a.q as any)[s.lang], meta: a.batch + ' · ' + a.city,
        card: 'display:flex;flex-direction:column;gap:6px;padding:12px 14px;border-radius:20px;background:#FFFFFF;border:2px solid #FDE68A;box-shadow:0 4px 0 #FDE68A' }; })(),
      companies: ['Zoho', 'Razorpay', 'Swiggy', 'Infosys', 'TCS', 'Freshworks', 'Wipro', 'Accenture'],
      callUi: (function () {
        var sec = Math.max(0, Math.floor((s.now - (s.callStart || s.now)) / 1000));
        var col = isLr ? ['#38BDF8', '#0284C7'] : ['#A78BFA', '#6D28D9'];
        var btn = function (off?: any) { return 'width:58px;height:58px;border-radius:999px;cursor:pointer;display:flex;align-items:center;justify-content:center;' + (off ? 'background:#FEE2E2;color:#B91C1C;border:2px solid #FCA5A5;' : 'background:#FFFFFF;color:#334155;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;'); };
        return {
          clock: String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0'),
          who: isLr ? t.mentorName : t.teamName, initials: isLr ? 'PM' : 'NT',
          box: 'position:relative;height:' + (D ? 300 : 250) + 'px;border-radius:24px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 35%,#334155,#0F172A);box-shadow:0 10px 26px rgba(15,23,42,.35)',
          avatar: "width:" + (D ? 110 : 92) + "px;height:" + (D ? 110 : 92) + "px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:34px;color:#FFFFFF;border:4px solid rgba(255,255,255,.55);background:linear-gradient(145deg," + col[0] + ',' + col[1] + ')',
          self: 'position:absolute;right:10px;bottom:10px;width:' + (D ? 104 : 84) + 'px;height:' + (D ? 128 : 104) + 'px;border-radius:14px;overflow:hidden;border:2px solid #FFFFFF',
          wave: [0, 1, 2, 3, 4].map(function (k?: any) { return { style: 'display:inline-block;width:5px;height:22px;border-radius:4px;background:#FFFFFF;transform-origin:bottom;animation-delay:' + (k * 0.12) + 's' }; }),
          camOn: !s.camOff, camOff: s.camOff, micPressed: s.micOff ? 'true' : 'false', camPressed: s.camOff ? 'true' : 'false',
          micStyle: btn(s.micOff), camStyle: btn(s.camOff)
        };
      })(),
      callTips: t.callTips.map(function (x?: any, k?: any) { return { label: x, emo: ['😊', '🐢', '🙋'][k] }; }),
      toggleMic: function () { self.setState({ micOff: !s.micOff }); },
      toggleCam: function () { self.setState({ camOff: !s.camOff }); },
      historyRows: (function () {
        var fmtD = function (ms?: any) { return ms ? new Date(ms).toLocaleDateString(locale, { day: 'numeric', month: 'short' }) : ''; };
        var bk = function (b?: any) { if (!b) return ''; var d = new Date(dayList[b.dayIdx].getTime()); var pp = b.time.split(':'); return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' }) + ' · ' + fmtTime(Number(pp[0]), Number(pp[1])); };
        var rows = [
          [t.hReg, fullName + ' · ' + schoolName, 'done', 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6'],
          [t.lvlTitle[0], s.passed.test ? t.scoreL + ' ' + s.score + '/5' + (s.testAt ? ' · ' + fmtD(s.testAt) : '') : t.notYet, s.passed.test ? 'done' : 'now', 'M13 2L4 14h7l-1 8 9-12h-7z'],
          [t.lvlTitle[1], s.passed.lr ? t.passTxt : s.bookedLr ? bk(s.bookedLr) : t.notYet, s.passed.lr ? 'done' : s.passed.test ? 'now' : 'lock', 'M4 5h16v10H4zM2 19h20'],
          [t.lvlTitle[2], s.passed.cfr ? t.passTxt : s.bookedCfr ? bk(s.bookedCfr) : t.notYet, s.passed.cfr ? 'done' : s.passed.lr ? 'now' : 'lock', 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z'],
          [t.hOffer, s.offerAccepted ? t.stAccepted : s.passed.cfr ? t.stSent : t.notYet, s.offerAccepted ? 'done' : s.passed.cfr ? 'now' : 'lock', 'M4 4h16v16H4zM4 4l8 7 8-7'],
          [t.hTravel, s.checks[2] ? t.stFinal : t.stPendTravel, s.checks[2] ? 'done' : s.offerAccepted ? 'now' : 'lock', 'M4 16V6a2 2 0 012-2h12a2 2 0 012 2v10M4 16h16M8 20h.01M16 20h.01'],
          [t.hJoined, campusName, s.joined ? 'done' : 'lock', 'M3 10l9-6 9 6M5 10v10h14V10M10 20v-5h4v5']
        ];
        return rows.map(function (r?: any, k?: any) {
          var st = r[2];
          var bg = st === 'done' ? '#10B981' : st === 'now' ? '#E91E63' : '#CBD5E1';
          return {
            title: r[0], sub: r[1], d: r[3],
            status: st === 'done' ? t.chipDone : st === 'now' ? t.chipNow : t.chipLocked,
            chip: 'font-size:12px;font-weight:800;padding:2px 9px;border-radius:999px;' + (st === 'done' ? 'background:#DCFCE7;color:#166534' : st === 'now' ? 'background:#FCE7F3;color:#9D174D' : 'background:#F1F5F9;color:#64748B'),
            dot: 'width:40px;height:40px;border-radius:999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:' + bg + ';' + (st === 'now' ? 'box-shadow:0 0 0 5px rgba(233,30,99,.2);' : ''),
            line: 'flex-grow:1;width:3px;min-height:14px;border-radius:3px;' + (k === rows.length - 1 ? 'background:transparent' : st === 'done' ? 'background:#6EE7B7' : 'background:repeating-linear-gradient(180deg,#CBD5E1 0 4px,transparent 4px 8px)')
          };
        });
      })(),
      consentText: t.consent1 + (s.pName.trim() || t.parentWord) + t.consent2 + fullName + t.consent3 + schoolName + ', ' + campusName + t.consent4,
      consentPoints: t.consentPts, consentPressed: s.consent ? 'true' : 'false',
      parentLine: (s.pName.trim() || t.parentWord) + (s.pPhone ? ' · +91 ' + s.pPhone : ''),
      consentUi: { on: s.consent,
        card: 'display:flex;align-items:center;gap:14px;padding:14px;border-radius:22px;cursor:pointer;' + (s.consent ? 'background:#F0FDF4;border:3px solid #10B981;box-shadow:0 5px 0 #059669;' : 'background:#FFFFFF;border:2px solid #FBCFE8;box-shadow:0 4px 0 #FBCFE8;'),
        box: 'width:40px;height:40px;flex-shrink:0;border-radius:12px;display:flex;align-items:center;justify-content:center;' + (s.consent ? 'background:#10B981;border:2px solid #059669;' : 'background:#FFFFFF;border:2.5px solid #CBD5E1;') },
      toggleConsent: function () { self.setState({ consent: !s.consent }); },
      travelModes: [['train', t.train, '🚆'], ['bus', t.bus, '🚌'], ['other', t.otherTravel, '🛺']].map(function (m?: any) {
        var sel = s.travelMode === m[0];
        return { label: m[1], emo: m[2], pick: function () { self.setState({ travelMode: m[0] }); self.armIdle(); },
          style: 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:112px;border-radius:22px;cursor:pointer;' + (sel ? 'border:3px solid #10B981;box-shadow:0 6px 0 #059669;' : '') };
      }),
      travelDays: [-1, 0, 1].map(function (off?: any, k?: any) {
        var d = new Date(joinD.getTime() + off * 86400000), sel = s.travelDay === k;
        return { label: d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' }), pick: function () { self.setState({ travelDay: k }); self.armIdle(); },
          style: 'min-height:48px;padding:0 16px;border-radius:999px;cursor:pointer;font-weight:800;font-size:15px;' + (sel ? 'background:#0EA5E9;color:#FFFFFF;border:2px solid #0369A1;box-shadow:0 4px 0 #0369A1;' : 'background:#FFFFFF;color:#0F172A;border:2px solid #E2E8F0;box-shadow:0 4px 0 #E2E8F0;') };
      }),
      goQual: function () { self.go('qual'); }, hasMini: !!s.mini, miniText: s.mini,
      hasSection: !!s.section, sectionText: s.section, hasDialog: !!s.dialog, hasJump: s.jump, jumps: jumps,
      cnt: { c3: s.count === 3, c2: s.count === 2, c1: s.count === 1, go: s.count <= 0 },
      idleNudge: cfg.hasPrimary && !cfg.primaryDisabled && !s.toast && !s.dialog,
      mapRef: function (el?: any) { self.mapEl = el; },
      openJump: function () { self.setState({ jump: true }); },
      closeJump: function () { self.setState({ jump: false }); },
      goBack: function () {
        if (sc === 'slot') { self.go('intro'); return; }
        if (sc === 'confirm') { self.go('slot'); return; }
        if (sc === 'history') { if (s.joined) self.go('cel', { cel: 'campus', xpGain: 500 }); else self.go('map', { walking: false, walkT: 1 }); return; }
        if (sc === 'consent' || sc === 'travel') { self.go('checklist'); return; }
        if (s.editing && isReg) { self.go('review', { editing: false }); return; }
        if (regIdx > 0) self.go(REG[regIdx - 1]);
      },
      hasHelp: !!s.help, openHelp: function () { self.setState({ help: true }); }, closeHelp: function () { self.setState({ help: false }); },
      askLeave: function () { self.setState({ dialog: sc === 'test' ? 'leaveTest' : 'leave' }); },
      speakAsk: function () { self.speak(cfg.ask + (cfg.sub ? '. ' + cfg.sub : '')); },
      loginGoogle: function () { self.setState(s.first ? { loginDone: true } : { first: 'Ravi', last: 'Kumar', loginDone: true }); advanceFrom('login'); },
      loginPhone: function () { self.setState({ loginDone: true }); advanceFrom('login'); },
      toggleWa: function () { self.setState({ sameWa: !s.sameWa }); },
      takePhoto: function () { self.setState({ photo: 'done' }); },
      skipWait: function () { self.go('ready', { answers: {}, qi: 0 }); },
      demoDone: function () { self.go('pending'); },
      demoResult: function () { self.celebrate(isLr ? 'lr' : 'cfr'); },
      miniReward: function () { self.miniWin(t.done, 0); }
    };
  }
  startCountdown() {
    var self = this;
    this.go('countdown', { count: 3, answers: {}, qi: 0 });
    [1, 2, 3].forEach(function (k?: any) { self.later(function () { self.setState({ count: 3 - k }); }, k * 900); });
    this.later(function () { self.go('test', { testStart: Date.now(), now: Date.now() }); }, 3500);
  }
  submitTest() {
    var self = this, tl = this.state.testLang || this.state.lang;
    var key = [1, 2, 1, 2, 1];
    var score = 0;
    for (var k = 0; k < 5; k++) if (this.state.answers[k] === key[k]) score++;
    this.go('submitting', { dialog: null, score: score, testAt: Date.now() });
    this.later(function () {
      if (score >= 3) self.celebrate('test');
      else { self.go('fail', { failAt: Date.now(), now: Date.now() }); self.bump(20, 300); }
    }, 2400);
  }
}
