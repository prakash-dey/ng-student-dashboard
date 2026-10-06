// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// SLOT PICKER
import { Fragment } from 'preact';
import type { V } from '../types';

export function SlotPicker({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.slot ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 12px">
            <span style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 15px; color: #475569">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              {v.monthLabel}
            </span>
            <div style="display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px">
              {(v.days || []).map((d: any, i0: number) => (
                <Fragment key={i0}>
                  <button onClick={d.pick} style={d.style}>
                    <span style="font-size: 12px; font-weight: 800">{d.wd}</span>
                    {" "}
                    <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 22px; line-height: 1">{d.n}</span>
                    {" "}
                    <span style={d.dotStyle} />
                  </button>
                </Fragment>
              ))}
            </div>
            <span style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 15px; color: #475569">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {v.t.pickTime}
            </span>
            {v.hasTimes ? (
              <>
                <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px">
                  {(v.times || []).map((m: any, i0: number) => (
                    <Fragment key={i0}>
                      <button onClick={m.pick} disabled={m.full} style={m.style}>{m.label}</button>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            {v.noTimes ? (
              <>
                <div style="display: flex; align-items: center; gap: 10px; padding: 14px; border-radius: 18px; background: #F8FAFC; border: 2px dashed #CBD5E1; color: #475569; font-weight: 700">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 10h18M9 14l6 5M15 14l-6 5" />
                  </svg>
                  {v.t.noSlots}
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
