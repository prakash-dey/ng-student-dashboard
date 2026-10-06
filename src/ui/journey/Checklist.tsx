// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// CHECKLIST
import { Fragment } from 'preact';
import type { V } from '../types';

export function Checklist({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.checklist ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 10px">
            <div style="display: flex; align-items: center; gap: 10px">
              <div style="flex-grow: 1; height: 12px; border-radius: 999px; background: #F1F5F9; overflow: hidden">
                <div class="track-fill" style={v.checkUi.bar} />
              </div>
              <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 18px; color: #047857">{v.checkUi.count}</span>
            </div>
            {(v.checkItems || []).map((c: any, i0: number) => (
              <Fragment key={i0}>
                <button class="lift" onClick={c.toggle} aria-pressed={c.pressed} style={c.style}>
                  <span style={c.tile}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d={c.d} />
                    </svg>
                  </span>
                  <span style="display: flex; flex-direction: column; flex-grow: 1; text-align: left">
                    <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 19px; color: #0F172A; line-height: 1.1">{c.label}</span>
                    <span style="font-size: 13px; font-weight: 700; color: #64748B">{c.sub}</span>
                  </span>
                  <span style={c.box}>
                    {c.done ? (
                      <>
                        <svg class="pop" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </>
                    ) : null}
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
