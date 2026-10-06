// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// HUD
import { Fragment } from 'preact';
import type { V } from '../types';

export function Hud({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.on.hud ? (
        <>
          <div style={v.L.hud}>
            <div style={v.L.hudRow}>
              <img src="/media/logo.webp" alt="NavGurukul" style={v.L.logo} />
              {v.D ? (
                <>
                  <div style="flex-grow: 1; display: flex; justify-content: center">
                    <div style={v.L.track}>
                      <div style={v.L.trackDash} />
                      <div class="track-fill" style={v.hud.fillStyle} />
                      {(v.hud.nodes || []).map((h: any, i0: number) => (
                        <Fragment key={i0}>
                          <div class={h.cls} style={h.style} title={h.title}>
                            <svg width={h.icon} height={h.icon} viewBox="0 0 24 24" fill="none" stroke={h.stroke} stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                              <path d={h.d} />
                            </svg>
                            {" "}
                            <span style={h.labelStyle}>{h.title}</span>
                          </div>
                        </Fragment>
                      ))}
                      <div class="rocket" style={v.hud.rocketStyle} aria-hidden="true">
                        <svg class="rocket-body" width="42" height="26" viewBox="0 0 42 26">
                          <g class="flame">
                            <ellipse cx="6" cy="13" rx="7" ry="4.2" fill="#F59E0B" />
                            <ellipse cx="8" cy="13" rx="4" ry="2.4" fill="#FEF3C7" />
                          </g>
                          <path d="M12 13 L14 4 L20 8Z" fill="#BE185D" />
                          <path d="M12 13 L14 22 L20 18Z" fill="#BE185D" />
                          <path d="M11 13 C11 7 20 5 30 6 C36 7 40 10 41 13 C40 16 36 19 30 20 C20 21 11 19 11 13Z" fill="#E91E63" />
                          <path d="M30 6 C36 7 40 10 41 13 C40 16 36 19 30 20 C32 16 32 10 30 6Z" fill="#FBBF24" />
                          <circle cx="23" cy="13" r="4.2" fill="#E0F2FE" stroke="#FFFFFF" stroke-width="1.6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {v.P ? (
                <>
                  <div style="flex-grow: 1" />
                </>
              ) : null}
              <div style="position: relative; display: flex; background: #FFFFFF; border: 1.5px solid #FBCFE8; border-radius: 999px; padding: 2px">
                {(v.langChips || []).map((c: any, i0: number) => (
                  <Fragment key={i0}>
                    <button onClick={c.pick} aria-label={c.aria} style={c.style}>{c.label}</button>
                  </Fragment>
                ))}
                {v.showLangHint ? (
                  <>
                    <div class="nudge" style="position: absolute; top: calc(100% + 10px); left: 50%; margin-left: -80px; width: 160px; box-sizing: border-box; padding: 7px 10px; border-radius: 14px; background: #0F172A; color: #FFFFFF; font-size: 13px; font-weight: 800; text-align: center; line-height: 1.25; box-shadow: 0 8px 20px rgba(15,23,42,.3); pointer-events: none; z-index: 60">
                      <span style="position: absolute; top: -6px; left: 50%; margin-left: -6px; width: 12px; height: 12px; background: #0F172A; transform: rotate(45deg)" />
                      <span style="position: relative">Change language · भाषा बदलें · भाषा बदला</span>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            {v.P ? (
              <>
                <div style={v.L.track}>
                  <div style={v.L.trackDash} />
                  <div class="track-fill" style={v.hud.fillStyle} />
                  {(v.hud.nodes || []).map((h: any, i0: number) => (
                    <Fragment key={i0}>
                      <div class={h.cls} style={h.style} title={h.title}>
                        <svg width={h.icon} height={h.icon} viewBox="0 0 24 24" fill="none" stroke={h.stroke} stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d={h.d} />
                        </svg>
                      </div>
                    </Fragment>
                  ))}
                  <div class="rocket" style={v.hud.rocketStyle} aria-hidden="true">
                    <svg class="rocket-body" width="42" height="26" viewBox="0 0 42 26">
                      <g class="flame">
                        <ellipse cx="6" cy="13" rx="7" ry="4.2" fill="#F59E0B" />
                        <ellipse cx="8" cy="13" rx="4" ry="2.4" fill="#FEF3C7" />
                      </g>
                      <path d="M12 13 L14 4 L20 8Z" fill="#BE185D" />
                      <path d="M12 13 L14 22 L20 18Z" fill="#BE185D" />
                      <path d="M11 13 C11 7 20 5 30 6 C36 7 40 10 41 13 C40 16 36 19 30 20 C20 21 11 19 11 13Z" fill="#E91E63" />
                      <path d="M30 6 C36 7 40 10 41 13 C40 16 36 19 30 20 C32 16 32 10 30 6Z" fill="#FBBF24" />
                      <circle cx="23" cy="13" r="4.2" fill="#E0F2FE" stroke="#FFFFFF" stroke-width="1.6" />
                    </svg>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
