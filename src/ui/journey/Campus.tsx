// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// CAMPUS
import { Fragment } from 'preact';
import type { V } from '../types';

export function Campus({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.campus ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 10px">
            {v.noCampus ? (
              <>
                <div style="padding: 12px 14px; border-radius: 18px; background: #FFF7ED; border: 2px solid #FDBA74; font-weight: 700; font-size: var(--fs-body); line-height: 1.3; color: #7C2D12">
                  {v.t.noCampus}
                </div>
              </>
            ) : null}
            {(v.campusCards || []).map((c: any, i0: number) => (
              <Fragment key={i0}>
                <button class="lift glass" onClick={c.pick} aria-disabled={c.lockedAttr} style={c.style}>
                  <span style={c.tile}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M3 10l9-6 9 6M5 10v10h14V10M10 20v-5h4v5" />
                    </svg>
                  </span>
                  <span style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0; gap: 2px; text-align: left">
                    <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-label); color: #0F172A; line-height: 1.1">
                      {c.city}
                    </span>
                    <span style="font-weight: 700; font-size: var(--fs-small); color: #64748B">{c.state}</span>
                    {c.locked ? (
                      <>
                        <span style="align-self: flex-start; font-size: var(--fs-caption); font-weight: 800; line-height: 1.3; padding: 2px 9px; border-radius: 999px; background: #FEE2E2; color: #991B1B">
                          {c.reason}
                        </span>
                      </>
                    ) : null}
                  </span>
                  {c.near ? (
                    <>
                      <span style="font-size: var(--fs-caption); font-weight: 800; padding: 3px 10px; border-radius: 999px; background: #DCFCE7; color: #166534; white-space: nowrap">
                        {v.t.nearTag}
                      </span>
                    </>
                  ) : null}
                </button>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
