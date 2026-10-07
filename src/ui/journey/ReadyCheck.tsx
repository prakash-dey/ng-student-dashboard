// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// READY CHECK
import { Fragment } from 'preact';
import type { V } from '../types';

export function ReadyCheck({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.ready ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 12px">
            {v.roundInfo.has ? (
              <>
                <div style={v.roundInfo.box}>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px">
                    {(v.roundInfo.facts || []).map((fa: any, i0: number) => (
                      <Fragment key={i0}>
                        <span style={v.roundInfo.factStyle}>{fa}</span>
                      </Fragment>
                    ))}
                  </div>
                  {v.roundInfo.hasTitle ? (
                    <>
                      <span style={v.roundInfo.titleStyle}>{v.roundInfo.title}</span>
                    </>
                  ) : null}
                  <div style="display: flex; flex-wrap: wrap; gap: 6px">
                    {(v.roundInfo.topics || []).map((tp: any, i0: number) => (
                      <Fragment key={i0}>
                        <span style={v.roundInfo.topicStyle}>{tp}</span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
            <div style={v.readyGrid}>
              {(v.readyTiles || []).map((r: any, i0: number) => (
                <Fragment key={i0}>
                  <div class="pop" style={r.style}>
                    <span style={r.tile}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d={r.d} />
                      </svg>
                    </span>
                    {" "}
                    <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: var(--fs-title); color: #0F172A; line-height: 1.1">{r.label}</span>
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
