// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// STAGE: ASHA
import { Fragment } from 'preact';
import type { V } from '../types';

export function StageAsha({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.on.stage ? (
        <>
          <div style={v.L.stage}>
            <div class="glow-disc" style={v.L.disc} />
            {v.parA ? (
              <>
                <div class={v.ashaCls} style={v.L.ashaWrap}><img class="bob" src="/media/asha.webp" alt="Asha, your guide" style={v.L.asha} /></div>
                <div class="bubble-in glass" style={v.L.bubble}>
                  {v.typing ? (
                    <>
                      <div style="display: flex; gap: 6px; padding: 8px 4px" aria-label="Asha is typing">
                        <span class="dot" />
                        <span class="dot" style="animation-delay: .15s" />
                        <span class="dot" style="animation-delay: .3s" />
                      </div>
                    </>
                  ) : null}
                  {v.notTyping ? (
                    <>
                      {v.cfg.hasPill ? (
                        <>
                          <span style={v.cfg.pillStyle}>{v.cfg.pill}</span>
                        </>
                      ) : null}
                      <div style={v.L.askStyle}>{v.cfg.ask}</div>
                      {v.cfg.hasSub ? (
                        <>
                          <div style={v.L.subStyle}>{v.cfg.sub}</div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
            {v.parB ? (
              <>
                <div class={v.ashaCls} style={v.L.ashaWrap}><img class="bob" src="/media/asha.webp" alt="Asha, your guide" style={v.L.asha} /></div>
                <div class="bubble-in glass" style={v.L.bubble}>
                  {v.typing ? (
                    <>
                      <div style="display: flex; gap: 6px; padding: 8px 4px" aria-label="Asha is typing">
                        <span class="dot" />
                        <span class="dot" style="animation-delay: .15s" />
                        <span class="dot" style="animation-delay: .3s" />
                      </div>
                    </>
                  ) : null}
                  {v.notTyping ? (
                    <>
                      {v.cfg.hasPill ? (
                        <>
                          <span style={v.cfg.pillStyle}>{v.cfg.pill}</span>
                        </>
                      ) : null}
                      <div style={v.L.askStyle}>{v.cfg.ask}</div>
                      {v.cfg.hasSub ? (
                        <>
                          <div style={v.L.subStyle}>{v.cfg.sub}</div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
            {v.on.resting ? (
              <>
                <div style={v.L.zzz}>
                  <span class="zzz" style="display: inline-block; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 26px; color: #7C3AED">z</span>
                  <span class="zzz" style="display: inline-block; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 20px; color: #A78BFA; animation-delay: .8s">
                    z
                  </span>
                </div>
              </>
            ) : null}
            <svg class="twinkle" width="16" height="16" viewBox="0 0 24 24" style={v.L.tw1} aria-hidden="true">
              <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#FBBF24" />
            </svg>
            {" "}
            <svg class="twinkle" width="11" height="11" viewBox="0 0 24 24" style={v.L.tw2} aria-hidden="true">
              <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#F472B6" />
            </svg>
          </div>
        </>
      ) : null}
    </>
  );
}
