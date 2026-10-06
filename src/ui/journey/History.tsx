// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// HISTORY
import { Fragment } from 'preact';
import type { V } from '../types';

export function History({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.history ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 0">
            {(v.historyRows || []).map((h: any, i0: number) => (
              <Fragment key={i0}>
                <div style="display: flex; gap: 12px">
                  <div style="display: flex; flex-direction: column; align-items: center; width: 44px; flex-shrink: 0">
                    <span style={h.dot}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d={h.d} />
                      </svg>
                    </span>
                    <span style={h.line} />
                  </div>
                  <div style="flex-grow: 1; min-width: 0; padding-bottom: 12px; display: flex; flex-direction: column; gap: 3px">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
                      <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-title); color: #0F172A; line-height: 1.1">
                        {h.title}
                      </span>
                      <span style={h.chip}>{h.status}</span>
                    </div>
                    <span style="font-size: var(--fs-body-s); font-weight: 700; color: #64748B">{h.sub}</span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
