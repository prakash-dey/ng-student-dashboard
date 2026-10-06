// One-time codegen: design-handoff/design/{phone,pc}.dc.html templates -> src/ui/**/*.tsx
// The two templates are structurally identical; where an attribute differs we emit `isPc ? pc : phone`.
// Holes {{a.b}} become `v.a.b` (or the loop variable inside <sc-for>), <sc-if> a conditional, <sc-for> a map.
// Comment-delimited sections longer than a few lines are split into their own component files.
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'src/ui';
// Sections removed on purpose (CLAUDE.md): never generate them.
const SKIP = /DEMO JUMP/;
const VOID = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source']);
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) =>
  e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : +e.slice(1)) : ENT[e] ?? m);

// ---------- parse (strict, keeps the authored structure; no HTML-parser fix-ups) ----------
function parse(src) {
  let i = 0;
  const root = { tag: '#root', attrs: [], children: [] };
  const stack = [root];
  const top = () => stack[stack.length - 1];
  while (i < src.length) {
    if (src.startsWith('<!--', i)) {
      const e = src.indexOf('-->', i);
      top().children.push({ type: 'comment', text: src.slice(i + 4, e).trim() });
      i = e + 3;
    } else if (src.startsWith('</', i)) {
      const e = src.indexOf('>', i);
      const tag = src.slice(i + 2, e).trim();
      const el = stack.pop();
      if (el.tag !== tag) throw new Error(`mismatched </${tag}>, open <${el.tag}> at ${i}`);
      i = e + 1;
    } else if (src[i] === '<') {
      const m = /^<([a-zA-Z][\w-]*)/.exec(src.slice(i, i + 40));
      let j = i + m[0].length;
      const attrs = [];
      for (;;) {
        while (/\s/.test(src[j])) j++;
        if (src[j] === '>' || src.startsWith('/>', j)) break;
        const an = /^[^\s=>/]+/.exec(src.slice(j))[0];
        j += an.length;
        let val = '';
        if (src[j] === '=') {
          const q = src[j + 1];
          const e = src.indexOf(q, j + 2);
          val = decode(src.slice(j + 2, e));
          j = e + 1;
        }
        attrs.push([an, val]);
      }
      const selfClose = src.startsWith('/>', j);
      i = j + (selfClose ? 2 : 1);
      const el = { type: 'el', tag: m[1], attrs, children: [] };
      top().children.push(el);
      if (!selfClose && !VOID.has(el.tag)) stack.push(el);
    } else {
      const e = src.indexOf('<', i);
      const end = e < 0 ? src.length : e;
      top().children.push({ type: 'text', text: decode(src.slice(i, end)) });
      i = end;
    }
  }
  if (stack.length !== 1) throw new Error('unclosed <' + top().tag + '>');
  return root;
}

function template(device) {
  const html = fs.readFileSync(`design-handoff/design/${device}.dc.html`, 'utf8');
  const a = html.indexOf('</helmet>') + '</helmet>'.length;
  const b = html.indexOf('<script type="text/x-dc"');
  const body = html.slice(a, b).replace(/<\/x-dc>[\s\S]*$/, '');
  return parse(body);
}

// ---------- merge phone + pc ----------
function merge(p, d, where = 'root') {
  if (p.type !== d.type || p.tag !== d.tag) throw new Error(`structure differs at ${where}`);
  if (p.type === 'text' || p.type === 'comment') {
    if (p.text !== d.text) throw new Error(`text differs at ${where}: ${p.text} | ${d.text}`);
    return p;
  }
  const names = [...new Set([...p.attrs.map((x) => x[0]), ...d.attrs.map((x) => x[0])])];
  const get = (n, list) => list.find((x) => x[0] === n)?.[1];
  const attrs = names.map((n) => ({ name: n, ph: get(n, p.attrs), pc: get(n, d.attrs) }));
  if (p.children.length !== d.children.length) throw new Error(`child count differs at ${where}`);
  return { ...p, attrs, children: p.children.map((c, k) => merge(c, d.children[k], `${where}>${p.tag}[${k}]`)) };
}

// ---------- emit ----------
const pascal = (s) => s.replace(/[^A-Za-z0-9]+/g, ' ').trim().split(' ').map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');

function holeExpr(p, scope) {
  const segs = p.trim().split('.');
  const head = scope.includes(segs[0]) ? segs[0] : 'v.' + segs[0];
  return head + segs.slice(1).map((s) => (/^\d+$/.test(s) ? `[${s}]` : /^[A-Za-z_$][\w$]*$/.test(s) ? '.' + s : `[${JSON.stringify(s)}]`)).join('');
}
const asset = (s) => s.replace(/\.\.\/assets\//g, '/media/');

// value string -> JS expression
function valueExpr(val, scope) {
  if (val === undefined) return 'undefined';
  const parts = asset(val).split(/(\{\{[^}]*\}\})/).filter((x) => x !== '');
  if (parts.length === 1 && parts[0].startsWith('{{')) return holeExpr(parts[0].slice(2, -2), scope);
  if (!parts.some((x) => x.startsWith('{{'))) return JSON.stringify(parts.join(''));
  return '`' + parts.map((x) => (x.startsWith('{{') ? '${' + holeExpr(x.slice(2, -2), scope) + '}' : x.replace(/[`\\$]/g, '\\$&'))).join('') + '`';
}

function attrJsx(el, a, scope) {
  if (a.name.startsWith('hint-placeholder')) return null;
  let name = a.name;
  if (name === 'onChange' && el.tag === 'input') name = 'onInput'; // React-style onChange = every keystroke
  const same = a.ph === a.pc;
  if (same) {
    const val = a.ph;
    if (!val.includes('{{') && !/["\\]/.test(val)) return `${name}="${asset(val)}"`;
    return `${name}={${valueExpr(val, scope)}}`;
  }
  return `${name}={isPc ? ${valueExpr(a.pc, scope)} : ${valueExpr(a.ph, scope)}}`;
}

const attr = (el, n) => el.attrs?.find((a) => a.name === n);
const isWs = (n) => n.type === 'text' && /^\s*$/.test(n.text);
// Can whitespace-only text directly inside this element never render? (flex/grid containers, SVG, selects)
function wsInert(el) {
  if (!el || el.tag === '#root') return true;
  if (['svg', 'g', 'select', 'option'].includes(el.tag)) return true;
  const st = attr(el, 'style');
  if (st && st.ph === st.pc && !st.ph.includes('{{') && /(^|;)\s*display:\s*(inline-)?(flex|grid)/.test(st.ph)) return true;
  return false;
}

// Could this node produce an inline-level box? (only then does whitespace next to it render)
const INLINE_TAGS = new Set(['span', 'a', 'label', 'b', 'i', 'em', 'strong', 'small', 'img', 'svg', 'button', 'input', 'select']);
function maybeInline(n) {
  if (n.type === 'text') return true;
  if (n.tag === 'sc-if' || n.tag === 'sc-for') return n.children.some((c) => !isWs(c) && c.type !== 'comment' && maybeInline(c));
  const st = attr(n, 'style');
  const lit = st && st.ph === st.pc && !st.ph.includes('{{') ? st.ph : null;
  if (lit && /position:\s*(absolute|fixed)/.test(lit)) return false;
  if (lit && /(^|;)\s*display:\s*inline/.test(lit)) return true;
  if (lit && /(^|;)\s*display:\s*(block|flex|grid)/.test(lit)) return false;
  return INLINE_TAGS.has(n.tag);
}

let files = new Map();
let usedNames = new Set();

function emitChildren(children, ctx, ind) {
  // ctx: { scope, flowParent (element whose box the children flow in), zone }
  const out = [];
  const inert = wsInert(ctx.flowParent);
  // group by comments so long sections can become components
  const segs = [];
  let cur = { comment: null, nodes: [] };
  for (const c of children) {
    if (c.type === 'comment') { segs.push(cur); cur = { comment: c.text, nodes: [] }; }
    else cur.nodes.push(c);
  }
  segs.push(cur);
  const flat = children.filter((c) => c.type !== 'comment');
  segs.forEach((seg) => {
    if (seg.comment && SKIP.test(seg.comment)) return;
    const lines = [];
    seg.nodes.forEach((c) => {
      if (isWs(c)) {
        const k = flat.indexOf(c);
        const prev = flat.slice(0, k).reverse().find((x) => !isWs(x));
        const next = flat.slice(k + 1).find((x) => !isWs(x));
        if (inert || !prev || !next || !maybeInline(prev) || !maybeInline(next)) return;
        lines.push(ind + '{" "}');
        return;
      }
      lines.push(...emitNode(c, ctx, ind));
    });
    let zone = ctx.zone;
    if (seg.comment && /ZONE 1/.test(seg.comment)) zone = 'landing';
    if (seg.comment && /ZONE 2/.test(seg.comment)) zone = 'journey';
    if (zone !== ctx.zone && seg.comment) {
      // zone sections: re-emit with zone set (needed so nested components land in the right folder)
      lines.length = 0;
      seg.nodes.forEach((c) => { if (!isWs(c)) lines.push(...emitNode(c, { ...ctx, zone }, ind)); });
    }
    if (seg.comment) {
      const clean = seg.comment.replace(/[#=]+/g, '').replace(/\(.*?\)/g, '').trim();
      const extract = lines.length > 12 && ctx.scope.length === 0 && zone;
      if (extract) {
        let name = pascal(clean.replace(/^(ZONE \d:|STAGE:)/, (m) => (m.startsWith('STAGE') ? 'Stage ' : '')));
        if (/^\d/.test(name)) name = 'S' + name;
        while (usedNames.has(name)) name += '2';
        usedNames.add(name);
        const dir = zone;
        const body = lines.map((l) => l.slice(ind.length));
        files.set(`${dir}/${name}.tsx`, { name, body, comment: clean });
        out.push(`${ind}{/* ${clean} */}`, `${ind}<${name} v={v} />`);
        ctx.imports.add(`${dir}/${name}`);
      } else {
        out.push(`${ind}{/* ${clean} */}`, ...lines);
      }
    } else out.push(...lines);
  });
  return out;
}

function textJsx(t) {
  const s = t.replace(/\s+/g, ' ');
  const parts = s.split(/(\{\{[^}]*\}\})/).filter((x) => x !== '');
  return parts.map((x) => (x.startsWith('{{') ? { hole: x.slice(2, -2) } : { lit: x }));
}

function emitNode(n, ctx, ind) {
  if (n.type === 'text') {
    return [ind + textJsx(n.text).map((p) => (p.hole ? `{${holeExpr(p.hole, ctx.scope)}}`
      : /[{}<>"]|^ | $/.test(p.lit) ? `{${JSON.stringify(p.lit)}}` : p.lit)).join('')];
  }
  if (n.type === 'comment') return [`${ind}{/* ${n.text} */}`];
  if (n.tag === 'sc-if') {
    const cond = valueExpr(attr(n, 'value').ph, ctx.scope);
    const inner = emitChildren(n.children, { ...ctx, inSc: true }, ind + '    ');
    if (!inner.length) return [];
    return [`${ind}{${cond} ? (`, `${ind}  <>`, ...inner, `${ind}  </>`, `${ind}) : null}`];
  }
  if (n.tag === 'sc-for') {
    const list = valueExpr(attr(n, 'list').ph, ctx.scope);
    const as = attr(n, 'as').ph;
    const idx = `i${ctx.scope.length}`;
    const inner = emitChildren(n.children, { ...ctx, scope: [...ctx.scope, as], inSc: true }, ind + '    ');
    return [`${ind}{(${list} || []).map((${as}: any, ${idx}: number) => (`, `${ind}  <Fragment key={${idx}}>`, ...inner, `${ind}  </Fragment>`, `${ind}))}`];
  }
  const attrs = n.attrs.map((a) => attrJsx(n, a, ctx.scope)).filter(Boolean);
  const open = `<${n.tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
  if (!n.children.length) return [`${ind}${open} />`];
  const kids = emitChildren(n.children, { ...ctx, flowParent: n, inSc: false }, ind + '  ');
  if (!kids.length) return [`${ind}${open} />`];
  if (kids.length === 1 && (ind + open + kids[0].trim()).length < 160 && !kids[0].trim().startsWith('{/*')) return [`${ind}${open}>${kids[0].trim()}</${n.tag}>`];
  return [`${ind}${open}>`, ...kids, `${ind}</${n.tag}>`];
}

function fileSource(name, body, imports, comment, rel) {
  const imp = [...imports].sort().map((p) => {
    const nm = path.basename(p);
    let r = path.relative(rel, p);
    if (!r.startsWith('.')) r = './' + r;
    return `import { ${nm} } from '${r}';`;
  });
  return `// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
${comment ? `// ${comment}\n` : ''}import { Fragment } from 'preact';
import type { V } from '${path.relative(rel, 'types') .startsWith('.') ? path.relative(rel, 'types') : './' + path.relative(rel, 'types')}';
${imp.join('\n')}${imp.length ? '\n' : ''}
export function ${name}({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
${body.map((l) => '      ' + l).join('\n')}
    </>
  );
}
`;
}

// ---------- run ----------
const tree = merge(template('phone'), template('pc'));
const rootImports = new Set();
const rootLines = emitChildren(tree.children, { scope: [], flowParent: tree, zone: null, imports: rootImports }, '');

// nested components: each extracted section may itself contain extracted sections; re-run per file to collect imports
fs.rmSync(OUT + '/landing', { recursive: true, force: true });
fs.rmSync(OUT + '/journey', { recursive: true, force: true });
for (const [file, f] of files) {
  const dir = path.dirname(file);
  const imports = new Set([...f.body.join('\n').matchAll(/<([A-Z]\w+) v=\{v\} \/>/g)].map((m) => {
    const hit = [...files].find(([, g]) => g.name === m[1]);
    return hit[0].replace(/\.tsx$/, '');
  }));
  fs.mkdirSync(path.join(OUT, dir), { recursive: true });
  fs.writeFileSync(path.join(OUT, file), fileSource(f.name, f.body, imports, f.comment, dir));
}
const rootUsed = new Set([...rootLines.join('\n').matchAll(/<([A-Z]\w+) v=\{v\} \/>/g)].map((m) => [...files].find(([, g]) => g.name === m[1])[0].replace(/\.tsx$/, '')));
fs.writeFileSync(path.join(OUT, 'Design.tsx'), fileSource('Design', rootLines, rootUsed, 'Root of the design: both zones and the overlays.', '.'));
console.log('wrote', files.size + 1, 'components');
