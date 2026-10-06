// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// FOOTER
import { Fragment } from 'preact';
import type { V } from '../types';

export function Footer({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.cfg.hasFooter ? (
        <>
          <div style="position: relative; display: flex; gap: 10px; flex-shrink: 0">
            {v.idleNudge ? (
              <>
                <div class="nudge" style="position: absolute; right: 18px; bottom: 76px; display: flex; align-items: center; gap: 6px; background: #0F172A; color: #FFFFFF; font-weight: 800; font-size: 14px; padding: 7px 12px; border-radius: 999px; box-shadow: 0 6px 16px rgba(0,0,0,.25); z-index: 5; pointer-events: none">
                  {v.t.tapHere}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 5v14M6 13l6 6 6-6" />
                  </svg>
                </div>
              </>
            ) : null}
            {v.cfg.hasSecondary ? (
              <>
                <button class="soft-btn" onClick={v.cfg.secondaryOn} style={v.cfg.secondaryStyle}>{v.cfg.secondaryLabel}</button>
              </>
            ) : null}
            {v.cfg.hasPrimary ? (
              <>
                <button class={v.cfg.primaryCls} onClick={v.cfg.primaryOn} disabled={v.cfg.primaryDisabled} style="flex-grow: 1; height: 64px; border: none; border-radius: 999px; color: #FFFFFF; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px">
                  {" "}{v.cfg.primaryLabel}{" "}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
