// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// TRAVEL
import { Fragment } from 'preact';
import type { V } from '../types';

export function Travel({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.travel ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 12px">
            <span style="font-weight: 800; font-size: 15px; color: #475569">{v.t.howCome}</span>
            <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px">
              {(v.travelModes || []).map((m: any, i0: number) => (
                <Fragment key={i0}>
                  <button class="lift glass" onClick={m.pick} style={m.style}>
                    <span style="font-size: 34px; line-height: 1" aria-hidden="true">{m.emo}</span>
                    {" "}
                    <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 17px; color: #0F172A">
                      {m.label}
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
            <span style="font-weight: 800; font-size: 15px; color: #475569">{v.t.whenReach}</span>
            <div style="display: flex; flex-wrap: wrap; gap: 8px">
              {(v.travelDays || []).map((d: any, i0: number) => (
                <Fragment key={i0}>
                  <button class="lift" onClick={d.pick} style={d.style}>{d.label}</button>
                </Fragment>
              ))}
            </div>
            <div style="display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 18px; background: #EFF6FF; border: 1.5px solid #BFDBFE">
              <span style="font-size: 26px; line-height: 1" aria-hidden="true">🧭</span>
              <span style="font-weight: 700; font-size: 14px; color: #1E3A8A">{v.t.travelHelp}</span>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
