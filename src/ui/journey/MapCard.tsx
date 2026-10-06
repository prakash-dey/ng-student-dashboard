// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// MAP CARD
import { Fragment } from 'preact';
import type { V } from '../types';

export function MapCard({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.mapCard ? (
        <>
          <div class="rise" style="display: flex; flex-direction: column; gap: 10px">
            <div style="display: flex; align-items: center; gap: 10px">
              <div style="width: 54px; height: 54px; border-radius: 999px; overflow: hidden; background: linear-gradient(135deg, #FCE7F3, #FEF3C7); border: 2.5px solid #F9A8D4; flex-shrink: 0">
                <img src="/media/asha.webp" alt="" style="width: 118px; height: auto; margin-left: -34px; margin-top: -4px" />
              </div>
              <div style="flex-grow: 1; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: var(--fs-title); line-height: 1.2; color: #0F172A">
                {v.cfg.ask}
              </div>
            </div>
            <div style={v.mapNext.card}>
              <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: var(--fs-micro); letter-spacing: .16em; color: rgba(255,255,255,.92)">
                {v.mapNext.level}
              </span>
              {" "}
              <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: var(--fs-heading); color: #FFFFFF; line-height: 1.1">{v.mapNext.title}</span>
              <div style="display: flex; gap: 6px; flex-wrap: wrap">
                {(v.mapNext.chips || []).map((c: any, i0: number) => (
                  <Fragment key={i0}>
                    <span style="font-size: var(--fs-small); font-weight: 800; padding: 3px 10px; border-radius: 999px; background: rgba(255,255,255,.25); color: #FFFFFF">
                      {c}
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
            {v.D ? (
              <>
                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: var(--fs-micro); letter-spacing: .16em; color: #92400E; margin-top: 6px">
                  {v.t.myBadges}
                </span>
                <div style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px">
                  {(v.shelf || []).map((b: any, i0: number) => (
                    <Fragment key={i0}>
                      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px" title={b.name}>
                        <svg width="52" height="52" viewBox="0 0 60 60" aria-hidden="true" style={b.svgStyle}>
                          <circle cx="30" cy="30" r="28" fill={b.c1} />
                          <circle cx="30" cy="30" r="22" fill={b.c2} />
                          <g transform="translate(18 18)">
                            <path d={b.d} stroke={b.c1} stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                        </svg>
                        <span style="font-size: var(--fs-micro); font-weight: 800; color: #475569; text-align: center; line-height: 1.1">{b.name}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
