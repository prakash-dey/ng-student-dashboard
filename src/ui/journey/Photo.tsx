// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// PHOTO
import { Fragment } from 'preact';
import type { V } from '../types';

export function Photo({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.photo ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; align-items: center; gap: 14px">
            <div style={v.photoUi.frame}>
              <svg width="100%" height="100%" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="50" fill={v.photoUi.bg} />
                <circle cx="50" cy="40" r="17" fill={v.photoUi.fg} />
                <path d="M18 92 Q22 62 50 62 Q78 62 82 92Z" fill={v.photoUi.fg} />
              </svg>
              {v.photoUi.scanning ? (
                <>
                  <div class="scanline" style="position: absolute; left: 6%; width: 88%; height: 4px; border-radius: 4px; background: #22D3EE; box-shadow: 0 0 14px 4px rgba(34,211,238,.7)" />
                </>
              ) : null}
              {v.photoUi.done ? (
                <>
                  <div class="pop" style="position: absolute; right: 2px; bottom: 6px; width: 46px; height: 46px; border-radius: 999px; background: #10B981; border: 4px solid #FFFFFF; display: flex; align-items: center; justify-content: center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </div>
                </>
              ) : null}
            </div>
            <div style={v.photoUi.statusStyle}>{v.photoUi.status}</div>
            <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; width: 100%">
              {(v.photoTips || []).map((p: any, i0: number) => (
                <Fragment key={i0}>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 2px 4px">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d={p.d} />
                    </svg>
                    <span style="font-size: 12.5px; font-weight: 600; color: #64748B; text-align: center">{p.label}</span>
                  </div>
                </Fragment>
              ))}
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; width: 100%">
              <button class="lift" onClick={v.takePhoto} style="height: 56px; border-radius: 18px; border: 2px solid #FBCFE8; background: #FFFFFF; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 800; font-size: 16px; color: #9D174D; cursor: pointer; box-shadow: 0 4px 0 #FBCFE8">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 8h4l2-3h6l2 3h4v12H3z" />
                  <circle cx="12" cy="13" r="3.5" />
                </svg>
                {v.t.takePhoto}
              </button>
              <button class="lift" onClick={v.takePhoto} style="height: 56px; border-radius: 18px; border: 2px solid #E2E8F0; background: #FFFFFF; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 800; font-size: 16px; color: #334155; cursor: pointer; box-shadow: 0 4px 0 #E2E8F0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="9" cy="10" r="2" />
                  <path d="M21 16l-5-5-9 9" />
                </svg>
                {v.t.gallery}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
