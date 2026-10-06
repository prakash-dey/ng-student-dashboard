// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// DOB
import { Fragment } from 'preact';
import type { V } from '../types';

export function Dob({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.dob ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 14px">
            <div style="display: grid; grid-template-columns: 1fr 1.4fr 1.2fr; gap: 8px">
              {(v.dobSelects || []).map((d: any, i0: number) => (
                <Fragment key={i0}>
                  <div style="display: flex; flex-direction: column; gap: 6px">
                    <label for={d.id} style="font-weight: 700; font-size: 14px; color: #475569; text-align: center">{d.label}</label>
                    <select id={d.id} class="field" onChange={d.onChange} value={d.value} style="height: 64px; border: 2px solid #FBCFE8; border-radius: 18px; padding: 0 8px; font-size: 20px; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; background: #FFFFFF; color: #0F172A; text-align: center; width: 100%">
                      {(d.opts || []).map((o: any, i1: number) => (
                        <Fragment key={i1}>
                          <option value={o.v}>{o.l}</option>
                        </Fragment>
                      ))}
                    </select>
                  </div>
                </Fragment>
              ))}
            </div>
            <div class="pop" style="align-self: center; display: flex; align-items: center; gap: 8px; background: #FEF3C7; border: 2px solid #FCD34D; border-radius: 999px; padding: 8px 18px; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 20px; color: #92400E">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 21h16v-8H4zM4 16c2 0 2-1.5 4-1.5S10 16 12 16s2-1.5 4-1.5 2 1.5 4 1.5M12 13V9M12 6.5a1.5 1.5 0 01-1.5-1.5c0-1 1.5-2.5 1.5-2.5s1.5 1.5 1.5 2.5A1.5 1.5 0 0112 6.5z" />
              </svg>
              {v.ageText}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
