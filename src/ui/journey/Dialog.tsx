// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// DIALOG
import { Fragment } from 'preact';
import type { V } from '../types';

export function Dialog({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.hasDialog ? (
        <>
          <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 60; background: rgba(15,23,42,.55); display: flex; align-items: flex-end; justify-content: center">
            <div class="rise" role="dialog" aria-modal="true" aria-label={v.dlg.title} style={v.L.sheet}>
              <img src="/media/asha.webp" alt="" style="width: 150px; height: auto; margin-top: -96px" />
              {" "}
              <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-heading); color: #0F172A; text-align: center; line-height: 1.15">
                {v.dlg.title}
              </span>
              {" "}
              <span style="font-weight: 700; font-size: var(--fs-body); color: #475569; text-align: center">{v.dlg.body}</span>
              {v.dlg.hasReasons ? (
                <>
                  <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center">
                    {(v.dlg.reasons || []).map((r: any, i0: number) => (
                      <Fragment key={i0}>
                        <button onClick={r.pick} style={r.style}>{r.label}</button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              <div style="display: flex; flex-direction: column; gap: 10px; width: 100%">
                <button class="glow-btn" onClick={v.dlg.primaryOn} disabled={v.dlg.primaryDisabled} style="height: 60px; border: none; border-radius: 999px; color: #FFFFFF; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-button); cursor: pointer">
                  {v.dlg.primary}
                </button>
                <button onClick={v.dlg.secondaryOn} style="height: 52px; border: 2px solid #E2E8F0; border-radius: 999px; background: #FFFFFF; color: #334155; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-button-sm); cursor: pointer">
                  {v.dlg.secondary}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
