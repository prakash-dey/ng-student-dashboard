// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// ABOUT 2: HALL OF FAME
import { Fragment } from 'preact';
import type { V } from '../types';

export function About2HallOfFame({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.about2 ? (
        <>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px">
              {(v.famStats || []).map((st: any, i0: number) => (
                <Fragment key={i0}>
                  <div class="pop" style={st.style}>
                    <span style={`font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 22px; line-height: 1; color: ${st.col}`}>{st.v}</span>
                    {" "}
                    <span style="font-size: 12px; font-weight: 800; color: #475569; text-align: center; line-height: 1.2">{st.l}</span>
                  </div>
                </Fragment>
              ))}
            </div>
            <div style="position: relative; border-radius: 24px; padding: 14px 12px 12px; background: linear-gradient(180deg, #3B1D0F, #5B2E14); box-shadow: inset 0 0 0 3px #B45309, 0 10px 26px rgba(91,46,20,.35)">
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 10px">
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#FBBF24" />
                </svg>
                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 12px; letter-spacing: .2em; color: #FDE68A">
                  {v.t.hallTitle}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#FBBF24" />
                </svg>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px">
                {(v.alumni || []).map((a: any, i0: number) => (
                  <Fragment key={i0}>
                    <button class="lift pop" onClick={a.pick} aria-label={a.aria} style={a.frame}>
                      <div style="position: relative; width: 100%; aspect-ratio: 100 / 110; border-radius: 8px; overflow: hidden">
                        <svg width="100%" height="100%" viewBox="0 0 100 110" aria-hidden="true">
                          <rect width="100" height="110" fill={a.bg} />
                          <path d={a.hairBack} fill="#2B1B17" />
                          <path d="M18 110 Q20 76 50 74 Q80 76 82 110Z" fill={a.shirt} />
                          <rect x="44" y="60" width="12" height="14" fill={a.skin} />
                          <circle cx="50" cy="44" r="21" fill={a.skin} />
                          <path d={a.hair} fill="#2B1B17" />
                          <circle cx="42.5" cy="46" r="2.2" fill="#1E293B" />
                          <circle cx="57.5" cy="46" r="2.2" fill="#1E293B" />
                          <path d="M42 54 Q50 61 58 54" stroke="#1E293B" stroke-width="2.2" fill="none" stroke-linecap="round" />
                          <circle cx="37" cy="52" r="3" fill="#F4A38A" opacity=".55" />
                          <circle cx="63" cy="52" r="3" fill="#F4A38A" opacity=".55" />
                        </svg>
                        {a.sel ? (
                          <>
                            <div class="medal-shine" style="position: absolute; top: 0; left: -60%; width: 40%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.75), transparent); transform: skewX(-20deg)" />
                          </>
                        ) : null}
                      </div>
                      <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 13px; color: #FFFBEB; line-height: 1.1; text-align: center">
                        {a.n}
                      </span>
                      {" "}
                      <span style="font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 999px; background: #FDE68A; color: #78350F">
                        {a.co}
                      </span>
                    </button>
                  </Fragment>
                ))}
                <div class="pop" style={v.youFrame.style}>
                  <div class="node-now" style="width: 100%; aspect-ratio: 100 / 110; border-radius: 8px; border: 2px dashed #FBBF24; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; background: rgba(251,191,36,.12)">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
                    </svg>
                    <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 22px; color: #FBBF24; line-height: 1">?</span>
                  </div>
                  <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 13px; color: #FDE68A; line-height: 1.1; text-align: center">
                    {v.youFrame.label}
                  </span>
                  {" "}
                  <span style="font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 999px; background: #E91E63; color: #FFFFFF">
                    {v.t.nextYou}
                  </span>
                </div>
              </div>
            </div>
            <div class="slide-in" style={v.alumQuote.card}>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
                <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 18px; color: #0F172A">{v.alumQuote.n}</span>
                <span style="font-size: 12px; font-weight: 800; padding: 2px 8px; border-radius: 999px; background: #FCE7F3; color: #9D174D">
                  {v.alumQuote.role}
                </span>
                <span style="font-size: 12px; font-weight: 800; padding: 2px 8px; border-radius: 999px; background: #DCFCE7; color: #166534">
                  {v.alumQuote.pkg}
                </span>
              </div>
              <span style="font-size: 15px; font-weight: 600; color: #334155; line-height: 1.45">{"\""}{v.alumQuote.q}{"\""}</span>
              {" "}
              <span style="font-size: 12px; font-weight: 700; color: #94A3B8">{v.alumQuote.meta}</span>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; justify-content: center">
              <span style="width: 100%; text-align: center; font-size: 12px; font-weight: 800; color: #64748B">{v.t.hiringAt}</span>
              {(v.companies || []).map((c: any, i0: number) => (
                <Fragment key={i0}>
                  <span style="font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 999px; background: #FFFFFF; border: 1.5px solid #E2E8F0; color: #334155">
                    {c}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
