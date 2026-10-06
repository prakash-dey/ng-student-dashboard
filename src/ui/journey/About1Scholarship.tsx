// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// ABOUT 1: SCHOLARSHIP
import { Fragment } from 'preact';
import type { V } from '../types';

export function About1Scholarship({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.about1 ? (
        <>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <div class="pop" style="position: relative; overflow: hidden; border-radius: 24px; padding: 14px 16px; background: linear-gradient(135deg, #FDF2F8, #FFF7ED); border: 2px solid #F9A8D4; display: flex; align-items: center; gap: 14px">
              <div style="width: 92px; height: 92px; flex-shrink: 0; border-radius: 999px; border: 4px dashed #E91E63; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: rotate(-10deg); background: #FFFFFF">
                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 10px; letter-spacing: .14em; color: #BE185D">
                  {v.t.feesWord}
                </span>
                <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 34px; line-height: 1; color: #E91E63">₹0</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 2px">
                <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 22px; line-height: 1.1; color: #0F172A">
                  {v.t.coveredTitle}
                </span>
                <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 22px; line-height: 1.1; color: #E91E63">
                  {v.t.coveredTitle2}
                </span>
              </div>
              <div class="medal-shine" style="position: absolute; top: 0; left: -60%; width: 40%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.7), transparent); transform: skewX(-20deg)" />
            </div>
            <div style={v.offerGrid}>
              {(v.offerTiles || []).map((o: any, i0: number) => (
                <Fragment key={i0}>
                  <div class="pop" style={o.style}>
                    {o.isImg ? (
                      <>
                        <img src="/media/thali.webp" alt="" style="width: 46px; height: 46px" />
                      </>
                    ) : null}
                    {" "}
                    {o.isEmo ? (
                      <>
                        <span style="font-size: 38px; line-height: 1.2" aria-hidden="true">{o.emo}</span>
                      </>
                    ) : null}
                    {" "}
                    {o.isWifi ? (
                      <>
                        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                          <path d="M6 19c10-9.5 26-9.5 36 0" stroke="#C4B5FD" stroke-width="4.5" stroke-linecap="round" />
                          <path d="M12 26c7-6.5 17-6.5 24 0" stroke="#8B5CF6" stroke-width="4.5" stroke-linecap="round" />
                          <path d="M18 33c3.6-3.2 8.4-3.2 12 0" stroke="#6D28D9" stroke-width="4.5" stroke-linecap="round" />
                          <circle cx="24" cy="39.5" r="3.2" fill="#6D28D9" />
                        </svg>
                      </>
                    ) : null}
                    {" "}
                    <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 17px; color: #0F172A; line-height: 1.1; text-align: center">
                      {o.name}
                    </span>
                    {" "}
                    <span style="font-size: 12px; font-weight: 700; color: #64748B; text-align: center; line-height: 1.25">{o.cap}</span>
                    <span style="position: absolute; right: 8px; top: 8px; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 999px; background: #DCFCE7; color: #166534">
                      {v.t.freeChip}
                    </span>
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
