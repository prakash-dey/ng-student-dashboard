// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// REVIEW
import { Fragment } from 'preact';
import type { V } from '../types';

export function Review({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.review ? (
        <>
          <div class="slide-in glass" style="border-radius: 22px; padding: 6px 14px; display: flex; flex-direction: column">
            {(v.reviewRows || []).map((r: any, i0: number) => (
              <Fragment key={i0}>
                <div style="display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px dashed #FBCFE8">
                  <span style="width: 34px; height: 34px; border-radius: 10px; background: #FDF2F8; display: flex; align-items: center; justify-content: center; flex-shrink: 0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d={r.d} />
                    </svg>
                  </span>
                  <span style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0">
                    <span style="font-size: 12px; font-weight: 700; color: #64748B">{r.label}</span>
                    <span style="font-weight: 800; font-size: 16px; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                      {r.value}
                    </span>
                  </span>
                  <button onClick={r.edit} aria-label={v.t.edit} style="width: 36px; height: 36px; border-radius: 999px; border: none; background: #F1F5F9; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M4 20h4L19 9l-4-4L4 16z" />
                    </svg>
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
