// One-time port of the design logic (design-handoff/design/*.dc.html <script>) into src/logic/design.ts.
// Phone branches come from phone.dc.html, desktop branches from pc.dc.html (the files differ only there).
import fs from 'node:fs';
const read = (f) => fs.readFileSync(`design-handoff/design/${f}.dc.html`, 'utf8').split('\n');
const ph = read('phone'), pc = read('pc');
const start = ph.findIndex((l) => l.startsWith('<script type="text/x-dc"')) + 1;
const end = ph.findIndex((l, i) => i > start && l.startsWith('</script>'));
const lines = [];
for (let i = start; i < end; i++) {
  const rel = i - start + 2; // 1-based line within the <script> block (line 1 = the <script> tag)
  lines.push(rel >= 264 && rel <= 269 ? pc[i] : ph[i]);
}
let src = lines.join('\n');

// copy: swap the embedded text tables for the i18n JSON (verified identical)
const swapBlock = (from, to, repl) => {
  const a = src.indexOf(from); if (a < 0) throw new Error('missing ' + from);
  const b = src.indexOf(to, a); if (b < 0) throw new Error('missing end ' + to);
  src = src.slice(0, a) + repl + src.slice(b + to.length);
};
swapBlock('  ldTexts() {\n    return {', '}[this.state.lang];\n  }', '  ldTexts() {\n    return I18N[this.state.lang as Lang].landing;\n  }');
swapBlock('    var TX = {', '\n    };\n    var t = TX[s.lang];', '\n    var t = I18N[s.lang as Lang].journey;');
src = src.replace("{ en: 'Login', hi: 'लॉगिन', mr: 'लॉगिन' }[this.state.lang]", 'I18N[this.state.lang as Lang].extra.login');
src = src.replace("(s.lang === 'en' ? 'Friend' : s.lang === 'hi' ? 'दोस्त' : 'मित्रा')", 'I18N[s.lang as Lang].extra.friend');
src = src.replace('class Component extends DCLogic {', 'export class DesignLogic extends DCLogic {');
fs.writeFileSync('src/logic/design.ts', src + '\n');
console.log('lines', lines.length);

// ---- move the remaining inline copy (quiz, alumni quotes) into src/i18n/<lang>.json under `extra` ----
let out = fs.readFileSync('src/logic/design.ts', 'utf8');
const qa = out.indexOf('    var QB = {'), qb = out.indexOf('\n    };', qa) + '\n    };'.length;
const QB = new Function('return ' + out.slice(qa + '    var QB = '.length, qb - 1))();
out = out.slice(0, qa) + '    var QB = { en: I18N.en.extra.quiz, hi: I18N.hi.extra.quiz, mr: I18N.mr.extra.quiz } as Record<string, any[]>;' + out.slice(qb);
const quotes = { en: [], hi: [], mr: [] };
let k = 0;
out = out.replace(/q: (\{ en: '(?:[^'\\]|\\.)*', hi: '(?:[^'\\]|\\.)*', mr: '(?:[^'\\]|\\.)*' \})/g, (_, lit) => {
  const q = new Function('return ' + lit)();
  for (const l of ['en', 'hi', 'mr']) quotes[l].push(q[l]);
  return `q: { en: I18N.en.extra.alumQuotes[${k}], hi: I18N.hi.extra.alumQuotes[${k}], mr: I18N.mr.extra.alumQuotes[${k++}] }`;
});
if (k !== 5) throw new Error('expected 5 alumni quotes, got ' + k);
fs.writeFileSync('src/logic/design.ts', out);
const extraLogin = { en: 'Login', hi: 'लॉगिन', mr: 'लॉगिन' }, extraFriend = { en: 'Friend', hi: 'दोस्त', mr: 'मित्रा' };
for (const l of ['en', 'hi', 'mr']) {
  const base = JSON.parse(fs.readFileSync(`design-handoff/i18n/${l}.json`, 'utf8'));
  base.extra = { login: extraLogin[l], friend: extraFriend[l], quiz: QB[l], alumQuotes: quotes[l] };
  fs.writeFileSync(`src/i18n/${l}.json`, JSON.stringify(base, null, 1) + '\n');
}
console.log('i18n written');

// ---- voice / text-to-speech is out of scope (CLAUDE.md): drop the speechSynthesis calls ----
out = fs.readFileSync('src/logic/design.ts', 'utf8');
out = out.replace(/ *try \{ (?:if \(window\.speechSynthesis\) )?window\.speechSynthesis\.cancel\(\); \} catch \(e\) \{\} ?/g, (m) => (m.startsWith('    ') ? '' : ''));
out = out.replace(/\n\s*\n(\s*this\.setState\(\{ zone)/g, '\n$1');
out = out.replace(
  "    if (prevState && this.state.lineKey !== prevState.lineKey) {\n\n      if (this.state.voice) {\n        var key = this.state.lineKey;\n        this.later(function () { if (self.state.lineKey === key && self.state.voice) self.speak(self.lastAsk); }, 600);\n      }\n    }\n",
  '',
);
out = out.replace("toggleVoice: function () { var v = !s.voice; self.setState({ voice: v }); if (!v) { } else { self.speak(self.lastAsk); } },", 'toggleVoice: function () {},');
if (/speechSynthesis/.test(out)) throw new Error('speechSynthesis left: ' + out.match(/.*speechSynthesis.*/)[0]);
out = out.replace("  constructor(props) {\n    super(props);\n    this.DEVICE = 'phone';", "  constructor(device: Device) {\n    super();\n    this.DEVICE = device;");
out = `// The design's app logic, ported from design-handoff/design/{phone,pc}.dc.html (<script> block).
// fresh() = state shape, regFor() = registration order, ldVals()/jvVals()/renderVals() = what each screen shows.
// Keep it in step with the design; copy comes from src/i18n, not from literals here.
import { DCLogic, type Device } from './dc';
import { I18N, type Lang } from '../i18n';

${out}`;
fs.writeFileSync('src/logic/design.ts', out);
console.log('done');

// ---- loose TypeScript annotations (the design code is untyped ES5) ----
out = fs.readFileSync('src/logic/design.ts', 'utf8');
const annot = (params) => params.split(',').map((p) => p.trim()).filter(Boolean).map((p) => (p.includes(':') ? p : p + '?: any')).join(', ');
out = out.replace(/function( \w+)? ?\(([^)]*)\)/g, (_, name, ps) => `function${name || ' '}(${annot(ps)})`.replace('function (', 'function ('));
out = out.replace(/^  (?!constructor)(\w+)\(([^)]*)\) \{/gm, (_, name, ps) => `  ${name}(${annot(ps)}) {`);
out = out.replace(/\bvar (\w+) = \{\}/g, 'var $1: any = {}');
out = out.replace(/\bvar (\w+) = \[\]/g, 'var $1: any[] = []');
out = out.replace('export class DesignLogic extends DCLogic {', 'export class DesignLogic extends DCLogic {\n  [key: string]: any;');
fs.writeFileSync('src/logic/design.ts', out);
out = fs.readFileSync('src/logic/design.ts', 'utf8');
out = out.replace(/\bvar (\w+) = \{(?!\})/g, 'var $1: any = {');
out = out.replace(/\bvar (\w+) = null\b/g, 'var $1: any = null');
out = out.replace(/\bvar (\w+), (\w+);/g, 'var $1: any, $2: any;');
out = out.replace(/\bvar (\w+);/g, 'var $1: any;');
fs.writeFileSync('src/logic/design.ts', out);
out = fs.readFileSync('src/logic/design.ts', 'utf8');
out = out.replace(/\{ ([^{}\n]*) \}\[(s\.\w+|sc)\]/g, '({ $1 } as any)[$2]');
out = out.replace('    var v = this.jvVals();\n    var LD = this.ldVals();', '    var v: any = this.jvVals();\n    var LD: any = this.ldVals();');
out = out.replace("(geoRow ? geoRow[2] : []).map(", '((geoRow ? geoRow[2] : []) as string[]).map(');
out = out.replace("var qrPath = '', rx, ry;", "var qrPath = '', rx: any, ry: any;");
out = out.replace('q: a.q[s.lang],', 'q: (a.q as any)[s.lang],');
fs.writeFileSync('src/logic/design.ts', out);
out = fs.readFileSync('src/logic/design.ts', 'utf8');
out = out.replace('    var cur = s.course === null ? null : COURSES[s.course];', '    var cur: any = s.course === null ? null : COURSES[s.course];');
fs.writeFileSync('src/logic/design.ts', out);
out = fs.readFileSync('src/logic/design.ts', 'utf8');
out = out.replace(/\.\.\/assets\//g, '/media/'); // artwork is served from public/media (-> design-handoff/assets)
fs.writeFileSync('src/logic/design.ts', out);
