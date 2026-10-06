// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// CALL
import { Fragment } from 'preact';
import type { V } from '../types';

export function Call({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.call ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 10px">
            <div style={v.callUi.box}>
              <div style="position: absolute; left: 12px; top: 12px; display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,.45); color: #FFFFFF; border-radius: 999px; padding: 4px 10px; font-size: 13px; font-weight: 800">
                <span class="node-now" style="width: 9px; height: 9px; border-radius: 999px; background: #EF4444" />
                {v.t.live}{" · "}{v.callUi.clock}
              </div>
              <div style="position: absolute; right: 12px; top: 12px; display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,.18); color: #FFFFFF; border-radius: 999px; padding: 4px 10px; font-size: 12px; font-weight: 800">
                Google Meet
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                <div class="bob" style={v.callUi.avatar}>{v.callUi.initials}</div>
                <span style="color: #FFFFFF; font-weight: 800; font-size: 17px">{v.callUi.who}</span>
                <div style="display: flex; gap: 4px; align-items: flex-end; height: 22px">
                  {(v.callUi.wave || []).map((w: any, i0: number) => (
                    <Fragment key={i0}>
                      <span class="bar-grow" style={w.style} />
                    </Fragment>
                  ))}
                </div>
              </div>
              <div style={v.callUi.self}>
                {v.callUi.camOn ? (
                  <>
                    <svg width="100%" height="100%" viewBox="0 0 100 120" aria-hidden="true">
                      <rect width="100" height="120" fill="#FCE7F3" />
                      <circle cx="50" cy="46" r="20" fill="#D6976A" />
                      <path d="M30 44 Q28 22 50 22 Q72 22 70 44 Q66 30 50 30 Q34 30 30 44Z" fill="#2B1B17" />
                      <path d="M14 120 Q18 78 50 76 Q82 78 86 120Z" fill="#EC4899" />
                    </svg>
                  </>
                ) : null}
                {v.callUi.camOff ? (
                  <>
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #334155; color: #CBD5E1; font-weight: 800; font-size: 13px">
                      {v.t.camOffTxt}
                    </div>
                  </>
                ) : null}
                <span style="position: absolute; left: 6px; bottom: 4px; font-size: 11px; font-weight: 800; color: #FFFFFF; background: rgba(0,0,0,.45); padding: 1px 6px; border-radius: 999px">
                  {v.t.you}
                </span>
              </div>
            </div>
            <div style="display: flex; gap: 12px; justify-content: center">
              <button onClick={v.toggleMic} aria-pressed={v.callUi.micPressed} aria-label={v.t.mic} style={v.callUi.micStyle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3zM19 10v1a7 7 0 01-14 0v-1M12 18v4" />
                </svg>
              </button>
              <button onClick={v.toggleCam} aria-pressed={v.callUi.camPressed} aria-label={v.t.cam} style={v.callUi.camStyle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 6h14v12H2zM16 10l6-3v10l-6-3" />
                </svg>
              </button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px">
              {(v.callTips || []).map((c: any, i0: number) => (
                <Fragment key={i0}>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; border-radius: 16px; background: #FFFFFF; border: 1.5px solid #FDE68A">
                    <span style="font-size: 24px; line-height: 1" aria-hidden="true">{c.emo}</span>
                    <span style="font-size: 13px; font-weight: 800; color: #78350F; text-align: center">{c.label}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
