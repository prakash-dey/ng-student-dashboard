// Registration: address as two searchable dropdowns, State then District (the district list depends on the state).
import { GEO } from '../../data/geo';
import type { Ctx } from '../context';
import { FS } from '../../styles';

const norm = (x: string) => String(x).toLowerCase().replace(/\s+/g, ' ').trim();
const optStyle = (sel: boolean) => 'display:flex;align-items:center;gap:10px;width:100%;min-height:50px;padding:6px 14px;border:none;border-bottom:1px solid #FCE7F3;cursor:pointer;text-align:left;background:' + (sel ? '#F0FDF4' : '#FFFFFF');
interface Option { v: string; label: string; sub: string; hay: string }

export function placeVals(c: Ctx) {
  const { s, t, D, app } = c;
  const geoRow = GEO.find((g) => g[0] === s.stateName);
  const boxes = [
    { key: 'state' as const, label: t.stateL, d: 'M4 5l5-2 6 2 5-2v16l-5 2-6-2-5 2zM9 3v16M15 5v16', value: s.stateName, ph: t.chooseState, disabled: false,
      all: GEO.map((g): Option => ({ v: g[0], label: g[0], sub: s.lang === 'en' ? '' : g[1], hay: norm(g[0] + ' ' + g[1]) })),
      shown: geoRow && s.lang !== 'en' ? geoRow[1] : s.stateName },
    { key: 'district' as const, label: t.district, d: 'M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6', value: s.district, ph: geoRow ? t.chooseDistrict : t.stateFirst, disabled: !geoRow,
      all: (geoRow ? geoRow[2] : []).map((d): Option => ({ v: d, label: d, sub: '', hay: norm(d) })), shown: s.district },
  ];
  const placeBoxes = boxes.map((b) => {
    const open = s.placeOpen === b.key && !b.disabled;
    const q = norm(s.placeQuery || '');
    const list = open ? b.all.filter((o) => !q || o.hay.includes(q)) : [];
    return {
      labelId: 'lbl-' + b.key, label: b.label, d: b.d, open, disabled: b.disabled, hasValue: !!b.value,
      shown: b.value ? b.shown : b.ph, query: s.placeQuery || '', searchPh: t.searchPh, empty: open && list.length === 0,
      toggle: () => c.act({ placeOpen: open ? null : b.key, placeQuery: '' }),
      onQuery: (e: Event) => c.act({ placeQuery: (e.target as HTMLInputElement).value }),
      // focus the search box once each time a list opens
      searchRef: (el: HTMLInputElement | null) => {
        if (el && app._focusKey !== b.key + ':' + s.lineKey) {
          app._focusKey = b.key + ':' + s.lineKey;
          try { el.focus({ preventScroll: true }); } catch { /* old browsers */ }
        }
      },
      valStyle: "flex-grow:1;min-width:0;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:" + FS.input + ";color:" + (b.value ? '#0F172A' : '#94A3B8'),
      chev: 'flex-shrink:0;transition:transform .2s;transform:rotate(' + (open ? 180 : 0) + 'deg);' + (b.disabled ? 'opacity:.35;' : ''),
      btnStyle: 'display:flex;align-items:center;gap:10px;height:62px;width:100%;box-sizing:border-box;padding:0 16px 0 18px;border-radius:18px;cursor:' + (b.disabled ? 'not-allowed' : 'pointer') + ';' + (b.disabled ? 'background:#F8FAFC;border:2px dashed #CBD5E1;' : open ? 'background:#FFFFFF;border:2px solid #E91E63;box-shadow:0 0 0 5px rgba(233,30,99,.16);' : b.value ? 'background:#F0FDF4;border:2px solid #6EE7B7;' : 'background:#FFFFFF;border:2px solid #FBCFE8;box-shadow:0 4px 0 #FBCFE8;'),
      listStyle: 'max-height:' + (D ? 280 : 228) + 'px;display:flex;flex-direction:column',
      opts: list.map((o) => {
        const sel = o.v === b.value;
        return {
          label: o.label, sub: o.sub, hasSub: !!o.sub, sel, style: optStyle(sel),
          pick: () => {
            app._focusKey = null;
            // picking a state opens the district list next
            if (b.key === 'state') c.act({ stateName: o.v, district: o.v === s.stateName ? s.district : '', placeOpen: 'district', placeQuery: '' });
            else c.act({ district: o.v, placeOpen: null, placeQuery: '' });
          },
        };
      }),
    };
  });
  return { placeBoxes };
}
