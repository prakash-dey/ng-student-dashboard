// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// PAGE 3: COURSES
import { Fragment } from 'preact';
import type { V } from '../types';
import { AshaCorner } from './AshaCorner';

export function Page3Courses({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.LD.isP3 ? (
        <>
          {/* phone: one column (see L.p3stack); PC: children are absolutely positioned */}
          <div style={v.LD.L.p3stack}>
            <div style={v.LD.L.p3headBox}>
              <div style={v.LD.L.p3head}>
                <h1 style="margin: 0; display: flex; flex-direction: column">
                  <span class="ld-rise1" style={v.LD.L.p2h1}>{v.LD.t.p3h1}</span>
                  <span class="ld-rise2" style={v.LD.L.p2h2}>{v.LD.t.p3h2}</span>
                </h1>
                <div class="ld-rise2" style="display: flex; flex-wrap: wrap; gap: 6px">
                  {(v.LD.commonChips || []).map((cc: any, i0: number) => (
                    <Fragment key={i0}>
                      <span style={v.LD.L.commonChip}>{cc}</span>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div style={v.LD.L.courseGrid}>
              {(v.LD.courseCards || []).map((cc: any, i0: number) => (
                <Fragment key={i0}>
                  <button class="ld-pop ld-lift" onClick={cc.open} aria-label={cc.aria} style={cc.style}>
                    <span style={cc.tile}>
                      <svg width={cc.iconSize} height={cc.iconSize} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d={cc.d} />
                      </svg>
                    </span>
                    {" "}
                    <span style={v.LD.L.courseName}>{cc.name}</span>
                    {" "}
                    <span style={cc.codeStyle}>{cc.code}</span>
                    <span style="display: flex; flex-wrap: wrap; gap: 5px; justify-content: center">
                      <span style={v.LD.L.miniChip}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                        {cc.dur}
                      </span>
                      <span style={v.LD.L.miniChip}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5" />
                        </svg>
                        {cc.need}
                      </span>
                    </span>
                    <span style={cc.more}>
                      {v.LD.t.tapMore}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
            <AshaCorner v={v} zone="asha3Zone" text={v.LD.t.asha3} />
          </div>
          <div class="ld-pop" style={v.LD.L.cta3Wrap}>
            <button onClick={v.LD.goP2} style={v.LD.L.backBtn}>{v.LD.t.back}</button>
            <div class="nudge" style="position: absolute; right: 18px; bottom: 86px; display: flex; align-items: center; gap: 6px; background: #0F172A; color: #FFFFFF; font-weight: 800; font-size: var(--fs-body-s); padding: 7px 12px; border-radius: 999px; box-shadow: 0 6px 16px rgba(0,0,0,.25); z-index: 5; pointer-events: none">
              {v.t.tapHere}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </div>
            <button class="ld-glow-btn" onClick={v.LD.goP4} style={v.LD.L.cta2}>
              {v.LD.t.next}{" "}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          {v.LD.hasSheet ? (
            <>
              <div style={v.LD.L.scrim}>
                <div class="ld-sheet-in" role="dialog" aria-modal="true" aria-label={v.LD.sheet.full} style={v.LD.L.sheet}>
                  <div style="display: flex; align-items: center; gap: 12px">
                    <span style={v.LD.sheet.tile}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d={v.LD.sheet.d} />
                      </svg>
                    </span>
                    <span style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0">
                      <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-heading); line-height: 1.1; color: #0F172A">
                        {v.LD.sheet.full}
                      </span>
                      <span style={v.LD.sheet.subStyle}>{v.LD.sheet.sub}</span>
                    </span>
                    <button onClick={v.LD.closeSheet} aria-label={v.LD.t.close} style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 999px; border: none; background: #F1F5F9; color: #334155; display: flex; align-items: center; justify-content: center; cursor: pointer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px">
                    <span style={v.LD.L.factChip}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                      {v.LD.sheet.dur}
                    </span>
                    <span style={v.LD.L.factChip}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 22s7-6.2 7-12a7 7 0 00-14 0c0 5.8 7 12 7 12z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {v.LD.sheet.campus}
                    </span>
                  </div>
                  <div role="tablist" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; background: #F1F5F9; border-radius: 18px; padding: 4px">
                    {(v.LD.sheet.tabs || []).map((tb: any, i0: number) => (
                      <Fragment key={i0}>
                        <button role="tab" aria-selected={tb.sel} onClick={tb.pick} style={tb.style}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d={tb.d} />
                          </svg>
                          {" "}
                          <span>{tb.label}</span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                  <div style={v.LD.L.sheetRows}>
                    {(v.LD.sheet.rows || []).map((rw: any, i0: number) => (
                      <Fragment key={i0}>
                        <div class="ld-slide-row" style={rw.style}>
                          <span style={rw.dot}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                              <path d="M5 12.5l4.5 4.5L19 7.5" />
                            </svg>
                          </span>
                          {" "}
                          <span style="font-weight: 700; font-size: var(--fs-body); color: #0F172A; line-height: 1.3">{rw.text}</span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <button class="ld-glow-btn" onClick={v.LD.closeSheet} style="height: 58px; border: none; border-radius: 999px; color: #FFFFFF; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-button); cursor: pointer; animation: none">
                    {v.LD.t.gotIt}
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}
