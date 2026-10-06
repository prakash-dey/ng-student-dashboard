// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// STAGE: MAP
import { Fragment } from 'preact';
import type { V } from '../types';

export function StageMap({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.on.map ? (
        <>
          <div style={v.L.mapTitle}>
            <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #0F172A">{v.t.mapTitle}{" "}</span>
            <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #E91E63">{v.t.mapTitle2}</span>
          </div>
          <div style={v.L.mapBox}>
            <div ref={v.mapRef} style={v.L.mapScroll}>
              <div style={v.mp.inner}>
                <img src="/media/map.webp" alt="Admission journey map: Start, Level 1 Screening Test, Level 2 Learning Round, Level 3 Culture-fit Round, Final Destination Campus Welcome" style={v.mp.img} />
                {(v.mp.checks || []).map((k: any, i0: number) => (
                  <Fragment key={i0}>
                    <div class="pop" style={k.style}>
                      <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </div>
                  </Fragment>
                ))}
                {(v.mp.locks || []).map((k: any, i0: number) => (
                  <Fragment key={i0}>
                    <div style={k.style}>
                      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="9" rx="2" />
                        <path d="M8 11V8a4 4 0 018 0v3" />
                      </svg>
                    </div>
                  </Fragment>
                ))}
                <div class="ripple" style={v.mp.ring1} />
                <div class="ripple" style={v.mp.ring2} />
                {v.mp.arrived ? (
                  <>
                    <div class="pop" style={v.mp.here}>{v.mp.hereText}</div>
                  </>
                ) : null}
                <div style={v.mp.walker}>
                  <div class={v.mp.walkerCls} />
                  <div style="position: absolute; left: 15%; bottom: -4%; width: 70%; height: 8%; border-radius: 50%; background: rgba(60,30,10,.28)" />
                </div>
              </div>
            </div>
            {v.P ? (
              <>
                <div class="hand-swipe" style="position: absolute; right: 12px; bottom: 12px; display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,.92); border-radius: 999px; padding: 5px 10px; font-size: var(--fs-caption); font-weight: 700; color: #7C2D12; box-shadow: 0 4px 12px rgba(0,0,0,.18); pointer-events: none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                  {v.t.swipe}
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
