// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// TEST
import { Fragment } from 'preact';
import type { V } from '../types';

export function Test({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.test ? (
        <>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <div style="display: flex; gap: 6px; justify-content: center">
              {(v.qDots || []).map((d: any, i0: number) => (
                <Fragment key={i0}>
                  <button onClick={d.go} aria-label={d.aria} style={d.style}>{d.n}</button>
                </Fragment>
              ))}
            </div>
            <div class="slide-in glass" style="border-radius: 24px; padding: 16px; display: flex; flex-direction: column; gap: 6px">
              <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 11px; letter-spacing: .14em; color: #BE185D">{v.qHead}</span>
              <span style={v.L.qText}>{v.q.text}</span>
            </div>
            <div style={v.optGrid}>
              {(v.q.opts || []).map((o: any, i0: number) => (
                <Fragment key={i0}>
                  <button class="lift" onClick={o.pick} style={o.style}>
                    <span style={o.letterStyle}>{o.letter}</span>
                    {" "}
                    <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 20px; color: #0F172A; text-align: left">
                      {o.label}
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
