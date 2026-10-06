// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// PAGE 4: CAMPUSES
import { Fragment } from 'preact';
import type { V } from '../types';

export function Page4Campuses({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.LD.isP4 ? (
        <>
          <div style={v.LD.L.c4head}>
            <h1 style={v.LD.L.c4h}>
              <span class="ld-rise1" style={v.LD.L.c4h1}>{v.LD.t.c4.h1}</span>
              {" "}
              <span class="ld-rise2" style={v.LD.L.c4h2}>{v.LD.t.c4.h2}</span>
            </h1>
          </div>
          <div class={isPc ? undefined : "ld-noscrollbar"} style={v.LD.L.campList}>
            {(v.LD.campuses || []).map((cp: any, i0: number) => (
              <Fragment key={i0}>
                <div class="ld-pagefade" style={v.LD.L.campCard}>
                  <div style="position: relative; flex-shrink: 0">
                    <img loading="lazy" decoding="async" src={cp.photo} alt={cp.name} style={v.LD.L.campPhoto} />
                    {" "}
                    <span style={cp.who}>{cp.whoLabel}</span>
                  </div>
                  <div style={v.LD.L.campBody}>
                    <span style={v.LD.L.campName}>{cp.name}</span>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px">
                      {(cp.chips || []).map((ch: any, i1: number) => (
                        <Fragment key={i1}>
                          <span style={ch.style}>{ch.label}</span>
                        </Fragment>
                      ))}
                    </div>
                    {cp.hasNote ? (
                      <>
                        <div style={v.LD.L.campNote}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true" style="flex-shrink: 0">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 11v6M12 7.5v.5" />
                          </svg>
                          {" "}
                          <span>{cp.note}</span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <div class="ld-pop" style={v.LD.L.c4cta}>
            <button onClick={v.LD.goP3} style={v.LD.L.backBtn}>{v.LD.t.back}</button>
            <div class="nudge" style="position: absolute; right: 18px; bottom: 86px; display: flex; align-items: center; gap: 6px; background: #0F172A; color: #FFFFFF; font-weight: 800; font-size: var(--fs-body-s); padding: 7px 12px; border-radius: 999px; box-shadow: 0 6px 16px rgba(0,0,0,.25); z-index: 5; pointer-events: none">
              {v.t.tapHere}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </div>
            <button class="ld-glow-btn" onClick={v.LD.goP5} style={v.LD.L.cta2}>
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
