// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// CTA
import { Fragment } from 'preact';
import type { V } from '../types';

export function Cta({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.LD.showCta ? (
        <>
          <div class="ld-pop" style={isPc ? "position: absolute; left: 84px; top: 484px; width: 330px" : "position: absolute; left: 20px; top: 742px; width: 346px"}>
            <div class="nudge" style="position: absolute; right: 18px; bottom: 86px; display: flex; align-items: center; gap: 6px; background: #0F172A; color: #FFFFFF; font-weight: 800; font-size: 14px; padding: 7px 12px; border-radius: 999px; box-shadow: 0 6px 16px rgba(0,0,0,.25); z-index: 5; pointer-events: none">
              {v.t.tapHere}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </div>
            <button class="ld-glow-btn" onClick={v.LD.reveal} style={v.LD.L.cta}>
              {v.LD.t.cta}{" "}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
