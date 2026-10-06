// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// SCHOOL
import { Fragment } from 'preact';
import type { V } from '../types';

export function School({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.school ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 10px">
            {v.noneEligible ? (
              <>
                <div class="pop" style="display: flex; flex-direction: column; gap: 8px; padding: 14px; border-radius: 20px; background: #FFF7ED; border: 2px solid #FDBA74">
                  <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-label); color: #9A3412; line-height: 1.2">
                    {v.t.noneTitle}
                  </span>
                  <span style="font-weight: 700; font-size: var(--fs-body); color: #7C2D12">{v.t.noneBody}</span>
                  <button class="lift" onClick={v.goQual} style="align-self: flex-start; min-height: 46px; padding: 0 16px; border-radius: 999px; border: 2px solid #EA580C; background: #FFFFFF; color: #C2410C; font-weight: 800; font-size: var(--fs-body); cursor: pointer">
                    {v.t.changeClass}
                  </button>
                </div>
              </>
            ) : null}
            {v.hasSchoolsOk ? (
              <>
                <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: var(--fs-body); color: #166534">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  <span>{v.t.grpOk}</span>
                </div>
              </>
            ) : null}
            {(v.schoolsOk || []).map((sk: any, i0: number) => (
              <Fragment key={i0}>
                <div style={sk.style}>
                  <button onClick={sk.pick} aria-expanded={sk.open} style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; width: 100%; border: none; background: transparent; cursor: pointer; text-align: left">
                    <span style={sk.tile}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d={sk.d} />
                      </svg>
                    </span>
                    <span style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0; gap: 2px">
                      <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-label); color: #0F172A; line-height: 1.15">
                        {sk.interest}
                      </span>
                      <span style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center">
                        <span style={sk.nameStyle}>{sk.name}</span>
                        <span style={sk.eligStyle}>{sk.elig}</span>
                      </span>
                    </span>
                    <span style={sk.chev}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  {sk.open ? (
                    <>
                      <div class="expand" style="padding: 0 12px 12px; display: flex; flex-direction: column; gap: 8px">
                        {(sk.rows || []).map((r: any, i1: number) => (
                          <Fragment key={i1}>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 14px; background: #FFFFFF">
                              <span style={r.tile}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                  <path d={r.d} />
                                </svg>
                              </span>
                              <span style="display: flex; flex-direction: column">
                                <span style="font-size: var(--fs-caption); font-weight: 700; color: #64748B">{r.label}</span>
                                <span style="font-weight: 800; font-size: var(--fs-body); color: #0F172A">{r.value}</span>
                              </span>
                            </div>
                          </Fragment>
                        ))}
                        {sk.lockedFit ? (
                          <>
                            <div style="padding: 10px 12px; border-radius: 14px; background: #FEF2F2; border: 1.5px solid #FECACA; font-weight: 700; font-size: var(--fs-body-s); line-height: 1.3; color: #991B1B">
                              {v.t.lockedFit}
                            </div>
                          </>
                        ) : null}
                        {sk.lockedEdu ? (
                          <>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 14px; background: #FEF2F2; border: 1.5px solid #FECACA">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <rect x="5" y="11" width="14" height="9" rx="2" />
                                <path d="M8 11V8a4 4 0 018 0v3" />
                              </svg>
                              <span style="flex-grow: 1; font-weight: 700; font-size: var(--fs-body-s); color: #991B1B">{v.t.lockedWhy}</span>
                              <button onClick={v.goQual} style="min-height: 40px; padding: 0 12px; border-radius: 999px; border: 1.5px solid #B91C1C; background: #FFFFFF; color: #B91C1C; font-weight: 800; font-size: var(--fs-small); cursor: pointer">
                                {v.t.changeClass}
                              </button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
              </Fragment>
            ))}
            {v.hasSchoolsNo ? (
              <>
                <div style="display: flex; align-items: center; gap: 6px; margin-top: 10px; padding-top: 12px; border-top: 2px dashed #E2E8F0; font-weight: 800; font-size: var(--fs-body); color: #64748B">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 018 0v3" />
                  </svg>
                  <span>{v.t.grpNo}</span>
                </div>
              </>
            ) : null}
            {(v.schoolsNo || []).map((sk: any, i0: number) => (
              <Fragment key={i0}>
                <div style={sk.style}>
                  <button onClick={sk.pick} aria-expanded={sk.open} style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; width: 100%; border: none; background: transparent; cursor: pointer; text-align: left">
                    <span style={sk.tile}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d={sk.d} />
                      </svg>
                    </span>
                    <span style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0; gap: 2px">
                      <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-label); color: #0F172A; line-height: 1.15">
                        {sk.interest}
                      </span>
                      <span style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center">
                        <span style={sk.nameStyle}>{sk.name}</span>
                        <span style={sk.eligStyle}>{sk.elig}</span>
                      </span>
                    </span>
                    <span style={sk.chev}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  {sk.open ? (
                    <>
                      <div class="expand" style="padding: 0 12px 12px; display: flex; flex-direction: column; gap: 8px">
                        {(sk.rows || []).map((r: any, i1: number) => (
                          <Fragment key={i1}>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 14px; background: #FFFFFF">
                              <span style={r.tile}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                  <path d={r.d} />
                                </svg>
                              </span>
                              <span style="display: flex; flex-direction: column">
                                <span style="font-size: var(--fs-caption); font-weight: 700; color: #64748B">{r.label}</span>
                                <span style="font-weight: 800; font-size: var(--fs-body); color: #0F172A">{r.value}</span>
                              </span>
                            </div>
                          </Fragment>
                        ))}
                        {sk.lockedFit ? (
                          <>
                            <div style="padding: 10px 12px; border-radius: 14px; background: #FEF2F2; border: 1.5px solid #FECACA; font-weight: 700; font-size: var(--fs-body-s); line-height: 1.3; color: #991B1B">
                              {v.t.lockedFit}
                            </div>
                          </>
                        ) : null}
                        {sk.lockedEdu ? (
                          <>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 14px; background: #FEF2F2; border: 1.5px solid #FECACA">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <rect x="5" y="11" width="14" height="9" rx="2" />
                                <path d="M8 11V8a4 4 0 018 0v3" />
                              </svg>
                              <span style="flex-grow: 1; font-weight: 700; font-size: var(--fs-body-s); color: #991B1B">{v.t.lockedWhy}</span>
                              <button onClick={v.goQual} style="min-height: 40px; padding: 0 12px; border-radius: 999px; border: 1.5px solid #B91C1C; background: #FFFFFF; color: #B91C1C; font-weight: 800; font-size: var(--fs-small); cursor: pointer">
                                {v.t.changeClass}
                              </button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
