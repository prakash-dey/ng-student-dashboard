// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// PAGE 5: SUCCESS STORIES
import { Fragment } from 'preact';
import type { V } from '../types';

export function Page5SuccessStories({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.LD.isP5 ? (
        <>
          <div style={v.LD.L.c4head}>
            <h1 style={v.LD.L.c4h}>
              <span class="ld-rise1" style={v.LD.L.c4h1}>{v.LD.t.c5.h1}</span>
              {" "}
              <span class="ld-rise2" style={v.LD.L.c4h2}>{v.LD.t.c5.h2}</span>
            </h1>
          </div>
          <div class="ld-noscrollbar" style={v.LD.L.s5}>
            <div class="ld-marq-wrap" style={v.LD.L.alWrap}>
              <div class="ld-marq" style={v.LD.L.alRow}>
                {(v.LD.alumniA || []).map((al: any, i0: number) => (
                  <Fragment key={i0}>
                    <div style={v.LD.L.alCard}>
                      <div style="display: flex; align-items: center; gap: 12px">
                        <img loading="lazy" decoding="async" src={al.photo} alt={al.name} style={v.LD.L.alAvatar} />
                        <div style="display: flex; flex-direction: column; gap: 4px; flex-grow: 1; min-width: 0">
                          <span style={v.LD.L.campName}>{al.name}</span>
                          <span style="display: flex; align-items: center; gap: 7px">
                            <span aria-hidden="true" style={al.logo}>{al.logoText}</span>
                            <span style={v.LD.L.alCompany}>{al.company}</span>
                          </span>
                        </div>
                        <span style={v.LD.L.alSalary}>{al.salary}</span>
                      </div>
                      <div style={v.LD.L.alTimeline}>
                        <div style="display: flex; flex-direction: column; gap: 1px; flex-grow: 1; min-width: 0">
                          <span style={v.LD.L.alLabel}>{v.LD.t.c5.joined}</span>
                          <span style={v.LD.L.alValue}>{al.joined}</span>
                        </div>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E91E63" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                        <div style="display: flex; flex-direction: column; gap: 1px; flex-grow: 1; min-width: 0">
                          <span style={v.LD.L.alLabel}>{v.LD.t.c5.placed}</span>
                          <span style={v.LD.L.alValue}>{al.placed}</span>
                        </div>
                      </div>
                      <p style={v.LD.L.alQuote}>{al.quote}</p>
                    </div>
                  </Fragment>
                ))}
              </div>
              <div class="ld-marq ld-marq-rev" style={v.LD.L.alRow}>
                {(v.LD.alumniB || []).map((al: any, i0: number) => (
                  <Fragment key={i0}>
                    <div style={v.LD.L.alCard}>
                      <div style="display: flex; align-items: center; gap: 12px">
                        <img loading="lazy" decoding="async" src={al.photo} alt={al.name} style={v.LD.L.alAvatar} />
                        <div style="display: flex; flex-direction: column; gap: 4px; flex-grow: 1; min-width: 0">
                          <span style={v.LD.L.campName}>{al.name}</span>
                          <span style="display: flex; align-items: center; gap: 7px">
                            <span aria-hidden="true" style={al.logo}>{al.logoText}</span>
                            <span style={v.LD.L.alCompany}>{al.company}</span>
                          </span>
                        </div>
                        <span style={v.LD.L.alSalary}>{al.salary}</span>
                      </div>
                      <div style={v.LD.L.alTimeline}>
                        <div style="display: flex; flex-direction: column; gap: 1px; flex-grow: 1; min-width: 0">
                          <span style={v.LD.L.alLabel}>{v.LD.t.c5.joined}</span>
                          <span style={v.LD.L.alValue}>{al.joined}</span>
                        </div>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E91E63" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                        <div style="display: flex; flex-direction: column; gap: 1px; flex-grow: 1; min-width: 0">
                          <span style={v.LD.L.alLabel}>{v.LD.t.c5.placed}</span>
                          <span style={v.LD.L.alValue}>{al.placed}</span>
                        </div>
                      </div>
                      <p style={v.LD.L.alQuote}>{al.quote}</p>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <h2 class="ld-rise2" style={v.LD.L.coHead}>{v.LD.t.c5.hiring}</h2>
            <div style={v.LD.L.coGrid}>
              {(v.LD.companies || []).map((co: any, i0: number) => (
                <Fragment key={i0}>
                  <div style={v.LD.L.coTile}>
                    <span aria-hidden="true" style={co.logo}>{co.letter}</span>
                    {" "}
                    <span style={v.LD.L.coName}>{co.name}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div class="ld-pop" style={v.LD.L.c4cta}>
            <button onClick={v.LD.goP4} style={v.LD.L.backBtn}>{v.LD.t.back}</button>
            <div class="nudge" style="position: absolute; right: 18px; bottom: 86px; display: flex; align-items: center; gap: 6px; background: #0F172A; color: #FFFFFF; font-weight: 800; font-size: var(--fs-body-s); padding: 7px 12px; border-radius: 999px; box-shadow: 0 6px 16px rgba(0,0,0,.25); z-index: 5; pointer-events: none">
              {v.t.tapHere}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </div>
            <button class="ld-glow-btn" onClick={v.LD.replay} style={v.LD.L.cta2}>
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
