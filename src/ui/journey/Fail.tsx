// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// FAIL
import { Fragment } from 'preact';
import type { V } from '../types';

export function Fail({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.fail ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 12px">
            <div class="glass" style="border-radius: 22px; padding: 14px; display: flex; align-items: center; gap: 14px">
              <div style={`width: 76px; height: 76px; border-radius: 999px; background: conic-gradient(#F59E0B ${v.failUi.deg}deg, #FEF3C7 0deg); display: flex; align-items: center; justify-content: center; flex-shrink: 0`}>
                <div style="width: 60px; height: 60px; border-radius: 999px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: var(--fs-title); color: #92400E">
                  {v.failUi.score}
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 2px">
                <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: var(--fs-heading); color: #0F172A; line-height: 1.1">{v.t.failTitle}</span>
                <span style="font-weight: 700; color: #047857; font-size: var(--fs-body)">{v.t.effortNote}</span>
              </div>
            </div>
            <div style="border-radius: 22px; padding: 14px; background: linear-gradient(135deg, #EEF2FF, #F5F3FF); border: 2px solid #C7D2FE; display: flex; flex-direction: column; gap: 6px; align-items: center">
              <span style="font-weight: 800; font-size: var(--fs-body-s); color: #4338CA">{v.t.retestIn}</span>
              <div style="display: flex; gap: 8px">
                {(v.failUi.clock || []).map((c: any, i0: number) => (
                  <Fragment key={i0}>
                    <div style="display: flex; flex-direction: column; align-items: center; background: #FFFFFF; border-radius: 14px; padding: 6px 10px; min-width: 50px; box-shadow: 0 3px 0 #C7D2FE">
                      <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 24px; color: #312E81">{c.v}</span>
                      <span style="font-size: var(--fs-micro); font-weight: 800; color: #6366F1">{c.u}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: var(--fs-title); color: #0F172A">{v.t.tipsTitle}</span>
            {(v.tips || []).map((p: any, i0: number) => (
              <Fragment key={i0}>
                <div style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 18px; background: #FFFFFF; border: 1.5px solid #FDE68A">
                  <span style={p.tile}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d={p.d} />
                    </svg>
                  </span>
                  <span style="font-weight: 800; font-size: var(--fs-body); color: #0F172A">{p.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
