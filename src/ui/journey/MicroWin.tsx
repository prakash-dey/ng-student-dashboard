// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// MICRO WIN
import { Fragment } from 'preact';
import type { V } from '../types';

export function MicroWin({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.hasToast ? (
        <>
          <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 40; background: radial-gradient(circle at 50% 42%, rgba(255,255,255,.96) 0%, rgba(255,251,243,.9) 45%, rgba(255,247,237,.84) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; box-sizing: border-box">
            <div style="position: relative; width: 150px; height: 150px; display: flex; align-items: center; justify-content: center">
              <div class="rays" style="position: absolute; left: -95px; top: -95px; width: 340px; height: 340px" />
              <div class="ripple" style={`position: absolute; left: 25px; top: 25px; width: 100px; height: 100px; border-radius: 999px; border: 4px solid ${v.toastUi.ring1}`} />
              <div class="ripple" style={`position: absolute; left: 25px; top: 25px; width: 100px; height: 100px; border-radius: 999px; border: 4px solid ${v.toastUi.ring2}; animation-delay: .4s`} />
              <div class="pop" style={v.toastUi.circle}>
                <div class="bird-swoop" role="img" aria-label={v.toastUi.aria}><div class="bob" style="animation-duration: 1.2s"><div class="bird-big" /></div></div>
                <span class="emoji-pop" style="position: absolute; right: -6px; bottom: -6px; width: 40px; height: 40px; border-radius: 999px; background: #10B981; border: 3px solid #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(5,150,105,.4); animation-delay: .55s">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
              </div>
              <svg class="twinkle" width="22" height="22" viewBox="0 0 24 24" style="position: absolute; left: -10px; top: 6px" aria-hidden="true">
                <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#FBBF24" />
              </svg>
              <svg class="twinkle" width="16" height="16" viewBox="0 0 24 24" style="position: absolute; right: -6px; top: 110px; animation-delay: .5s" aria-hidden="true">
                <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#F472B6" />
              </svg>
            </div>
            <div class="pop" style={`margin-top: 26px; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 32px; line-height: 1.15; color: ${v.toastUi.text}; text-align: center; padding: 0 28px; animation-delay: .1s`}>
              {v.toastText}
            </div>
            <img class="rise" src="/media/asha.webp" alt="" style={v.L.toastAsha} />
          </div>
        </>
      ) : null}
    </>
  );
}
