// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// PENDING
import { Fragment } from 'preact';
import type { V } from '../types';

export function Pending({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.pending ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 12px">
            <div style="display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 22px; background: linear-gradient(135deg, #F5F3FF, #EDE9FE); border: 2px solid #DDD6FE">
              <span style="width: 52px; height: 52px; border-radius: 16px; background: #8B5CF6; display: flex; align-items: center; justify-content: center; flex-shrink: 0">
                <svg class="spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" aria-hidden="true" style="animation-duration: 3s">
                  <path d="M12 3a9 9 0 11-9 9" />
                </svg>
              </span>
              <span style="display: flex; flex-direction: column">
                <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 20px; color: #3B0764; line-height: 1.1">{v.t.reviewing}</span>
                <span style="font-weight: 700; font-size: 14px; color: #6D28D9">{v.t.usually}</span>
              </span>
            </div>
            <div class="glass" style="border-radius: 22px; padding: 14px; display: flex; flex-direction: column; gap: 6px">
              <span style="display: flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 11px; letter-spacing: .16em; color: #B45309">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0012 3z" />
                </svg>
                {v.t.tipDay}
              </span>
              <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 19px; color: #0F172A; line-height: 1.25">{v.pendingTip}</span>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
