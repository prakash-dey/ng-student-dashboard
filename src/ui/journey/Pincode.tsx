// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// PINCODE
import { Fragment } from 'preact';
import type { V } from '../types';

export function Pincode({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.pincode ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 14px">
            {(v.placeBoxes || []).map((pb: any, i0: number) => (
              <Fragment key={i0}>
                <div style="display: flex; flex-direction: column; gap: 6px">
                  <span id={pb.labelId} style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; color: #475569">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d={pb.d} />
                    </svg>
                    {pb.label}
                  </span>
                  <button onClick={pb.toggle} disabled={pb.disabled} aria-expanded={pb.open} aria-labelledby={pb.labelId} style={pb.btnStyle}>
                    <span style={pb.valStyle}>{pb.shown}</span>
                    {" "}
                    {pb.hasValue ? (
                      <>
                        <svg class="pop" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </>
                    ) : null}
                    {" "}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style={pb.chev}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {pb.open ? (
                    <>
                      <div class="expand" style="border-radius: 18px; border: 2px solid #F9A8D4; background: #FFFFFF; box-shadow: 0 10px 26px rgba(190,24,93,.16); overflow: hidden">
                        <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-bottom: 1.5px solid #FCE7F3; background: #FDF2F8">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BE185D" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="M21 21l-4.5-4.5" />
                          </svg>
                          <input ref={pb.searchRef} type="text" value={pb.query} onInput={pb.onQuery} placeholder={pb.searchPh} aria-label={pb.searchPh} autocomplete="off" style="flex-grow: 1; min-width: 0; height: 44px; border: none; background: transparent; font-size: 18px; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 700; color: #0F172A; outline: none" />
                        </div>
                        <div class="scroll-y" role="listbox" aria-labelledby={pb.labelId} style={pb.listStyle}>
                          {(pb.opts || []).map((op: any, i1: number) => (
                            <Fragment key={i1}>
                              <button role="option" aria-selected={op.sel} onClick={op.pick} style={op.style}>
                                <span style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0; text-align: left">
                                  <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 18px; color: #0F172A; line-height: 1.15">
                                    {op.label}
                                  </span>
                                  {op.hasSub ? (
                                    <>
                                      <span style="font-size: 13px; font-weight: 700; color: #64748B">{op.sub}</span>
                                    </>
                                  ) : null}
                                </span>
                                {op.sel ? (
                                  <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                                    </svg>
                                  </>
                                ) : null}
                              </button>
                            </Fragment>
                          ))}
                          {pb.empty ? (
                            <>
                              <div style="padding: 14px; font-weight: 700; font-size: 15px; color: #64748B; text-align: center">{v.t.noMatch}</div>
                            </>
                          ) : null}
                        </div>
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
