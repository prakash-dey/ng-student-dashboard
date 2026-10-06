// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// COUNTDOWN
import { Fragment } from 'preact';
import type { V } from '../types';

export function Countdown({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.countdown ? (
        <>
          <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 40; background: radial-gradient(circle at 50% 45%, #FDF2F8 0%, #FCE7F3 40%, #FBCFE8 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
            <div class="rays" style="position: absolute; left: 50%; top: 45%; width: 520px; height: 520px; margin-left: -260px; margin-top: -260px" />
            <span style="position: relative; font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: var(--fs-caption); letter-spacing: .2em; color: #BE185D">
              {v.t.getReady}
            </span>
            {v.cnt.c3 ? (
              <>
                <div class="count-pop" style="position: relative; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 160px; line-height: 1; color: #E91E63; text-shadow: 0 8px 0 #9D174D">
                  3
                </div>
              </>
            ) : null}
            {v.cnt.c2 ? (
              <>
                <div class="count-pop" style="position: relative; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 160px; line-height: 1; color: #F59E0B; text-shadow: 0 8px 0 #B45309">
                  2
                </div>
              </>
            ) : null}
            {v.cnt.c1 ? (
              <>
                <div class="count-pop" style="position: relative; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 160px; line-height: 1; color: #10B981; text-shadow: 0 8px 0 #047857">
                  1
                </div>
              </>
            ) : null}
            {v.cnt.go ? (
              <>
                <div class="count-pop" style="position: relative; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 120px; line-height: 1.1; color: #E91E63; text-shadow: 0 8px 0 #9D174D">
                  {v.t.go}
                </div>
              </>
            ) : null}
            <img class="bob" src="/media/asha.webp" alt="" style={v.L.countAsha} />
          </div>
        </>
      ) : null}
    </>
  );
}
