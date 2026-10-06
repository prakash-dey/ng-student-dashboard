// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// TOUR CARD
import { Fragment } from 'preact';
import type { V } from '../types';

export function TourCard({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.tour ? (
        <>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <div style="display: flex; align-items: flex-start; gap: 12px">
              <div class={v.ashaCls} style={v.L.tourAshaBox}><img src="/media/asha.webp" alt="Asha" style={v.L.tourAsha} /></div>
              <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 8px; min-width: 0">
                <span style={v.tourUi.pill}>{v.tourUi.stopLabel}</span>
                {v.typing ? (
                  <>
                    <div style="display: flex; gap: 6px; padding: 8px 4px">
                      <span class="dot" />
                      <span class="dot" style="animation-delay: .15s" />
                      <span class="dot" style="animation-delay: .3s" />
                    </div>
                  </>
                ) : null}
                {v.notTyping ? (
                  <>
                    <span class="slide-in" style={v.L.tourText}>{v.cfg.ask}</span>
                  </>
                ) : null}
              </div>
            </div>
            {v.tourUi.hasInfo ? (
              <>
                <div class="slide-in" style={v.tourUi.box}>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px">
                    {(v.tourUi.facts || []).map((fa: any, i0: number) => (
                      <Fragment key={i0}>
                        <span style={v.tourUi.factStyle}>{fa}</span>
                      </Fragment>
                    ))}
                  </div>
                  {v.tourUi.hasTitle ? (
                    <>
                      <span style={v.tourUi.titleStyle}>{v.tourUi.title}</span>
                    </>
                  ) : null}
                  <div style="display: flex; flex-wrap: wrap; gap: 6px">
                    {(v.tourUi.topics || []).map((tp: any, i0: number) => (
                      <Fragment key={i0}>
                        <span style={v.tourUi.topicStyle}>{tp}</span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
            <div style="display: flex; gap: 6px; justify-content: center">
              {(v.tourUi.dots || []).map((d: any, i0: number) => (
                <Fragment key={i0}>
                  <span style={d.style} />
                </Fragment>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
