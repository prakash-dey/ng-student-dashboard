// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// DEMO JUMP
import { Fragment } from 'preact';
import type { V } from '../types';

export function DemoJump({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.hasJump ? (
        <>
          <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 70; background: rgba(15,23,42,.5); display: flex; align-items: flex-start; justify-content: flex-end">
            <div class="pop" role="dialog" aria-modal="true" aria-label={v.t.jumpTitle} style={v.L.jump}>
              <div style="display: flex; align-items: center; justify-content: space-between">
                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 11px; letter-spacing: .16em; color: #7E22CE">{v.t.jumpTitle}</span>
                <button onClick={v.closeJump} aria-label="Close" style="width: 34px; height: 34px; border: none; border-radius: 999px; background: #F1F5F9; cursor: pointer; display: flex; align-items: center; justify-content: center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="2.6" stroke-linecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              {(v.jumps || []).map((j: any, i0: number) => (
                <Fragment key={i0}>
                  <button onClick={j.go} style="display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 6px 10px; border-radius: 14px; border: 1.5px solid #F3E8FF; background: #FFFFFF; cursor: pointer; text-align: left">
                    <span style="width: 28px; height: 28px; border-radius: 999px; background: #F3E8FF; color: #7E22CE; font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0">
                      {j.n}
                    </span>
                    <span style="font-weight: 800; font-size: 15px; color: #0F172A">{j.label}</span>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
