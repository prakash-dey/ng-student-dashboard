// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// PAGE 2
import { Fragment } from 'preact';
import type { V } from '../types';
import { AshaCorner } from './AshaCorner';

export function Page2({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.LD.isP2 ? (
        <>
          {/* phone: one column (see L.p2stack); PC: children are absolutely positioned */}
          <div style={v.LD.L.p2stack}>
            <div style={v.LD.L.p2headBox}>
              <div style={v.LD.L.p2head}>
                <div class="ld-stamp-drop" style={v.LD.L.fee}>
                  <span style={v.LD.L.feeSmall}>{v.LD.t.fees}</span>
                  {" "}
                  <span style={v.LD.L.feeBig}>₹0</span>
                </div>
                <h1 style="margin: 0; display: flex; flex-direction: column">
                  <span class="ld-rise1" style={v.LD.L.p2h1}>{v.LD.t.p2h1}</span>
                  <span class="ld-rise2" style={v.LD.L.p2h2}>{v.LD.t.p2h2}</span>
                </h1>
              </div>
            </div>
            <div style={v.LD.L.cards}>
              {(v.LD.cards || []).map((cd: any, i0: number) => (
                <Fragment key={i0}>
                  <div class="ld-pop" style={cd.style}>
                    <span style="position: relative; display: inline-flex; align-items: center; justify-content: center">
                      {cd.isEmo ? (
                        <>
                          <span style={v.LD.L.icon} aria-hidden="true">{cd.emo}</span>
                        </>
                      ) : null}
                      {cd.isImg ? (
                        <>
                          <img src="/media/thali.webp" alt="" style={v.LD.L.thali} />
                        </>
                      ) : null}
                      {cd.isWifi ? (
                        <>
                          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" style={v.LD.L.thali}>
                            <path d="M6 19c10-9.5 26-9.5 36 0" stroke="#C4B5FD" stroke-width="4.5" stroke-linecap="round" />
                            <path d="M12 26c7-6.5 17-6.5 24 0" stroke="#8B5CF6" stroke-width="4.5" stroke-linecap="round" />
                            <path d="M18 33c3.6-3.2 8.4-3.2 12 0" stroke="#6D28D9" stroke-width="4.5" stroke-linecap="round" />
                            <circle cx="24" cy="39.5" r="3.2" fill="#6D28D9" />
                          </svg>
                        </>
                      ) : null}
                    </span>
                    {" "}
                    <span class="ld-tag-pop" style={cd.tick}><span style={v.LD.L.stampInner}>{v.LD.t.freeTag}</span></span>
                    {" "}
                    <span style={v.LD.L.cardLabel}>{cd.label}</span>
                  </div>
                </Fragment>
              ))}
            </div>
            <AshaCorner v={v} zone="asha2Zone" text={v.LD.t.asha2} />
          </div>
          <div class="ld-pop" style={v.LD.L.cta2Wrap}>
            <button onClick={v.LD.goP1} style={v.LD.L.backBtn}>{v.LD.t.back}</button>
            {v.LD.showNudge ? (
              <div class="nudge" style="position: absolute; right: 18px; bottom: 86px; display: flex; align-items: center; gap: 6px; background: #0F172A; color: #FFFFFF; font-weight: 800; font-size: var(--fs-body-s); padding: 7px 12px; border-radius: 999px; box-shadow: 0 6px 16px rgba(0,0,0,.25); z-index: 5; pointer-events: none">
                {v.t.tapHere}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </div>
            ) : null}
            <button class="ld-glow-btn" onClick={v.LD.goP3} style={v.LD.L.cta2}>
              {v.LD.t.next}{" "}
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
