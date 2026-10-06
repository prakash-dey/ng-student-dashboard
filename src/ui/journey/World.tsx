// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// WORLD
import { Fragment } from 'preact';
import type { V } from '../types';

export function World({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.on.bgBanyan ? (
        <>
          <div class="bg-banyan" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%" />
          <div style={v.L.overlay} />
        </>
      ) : null}
      {v.on.bgSoft ? (
        <>
          <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: linear-gradient(180deg, #FFFCF5 0%, #FFF7ED 38%, #FEF3C7 72%, #ECFDF5 100%)" />
          <div class="bg-banyan" style="position: absolute; left: 0; bottom: 0; width: 100%; height: 36%; opacity: .22; -webkit-mask-image: linear-gradient(180deg, transparent, #000 60%); mask-image: linear-gradient(180deg, transparent, #000 60%)" />
        </>
      ) : null}
      {(v.leaves || []).map((lf: any, i0: number) => (
        <Fragment key={i0}>
          <svg class="leaf" width={lf.size} height={lf.size} viewBox="0 0 24 24" style={lf.style} aria-hidden="true">
            <path d="M3 21C3 11 9 4 21 3c-1 12-8 18-18 18z" fill={lf.color} />
            <path d="M4 20L16 8" stroke="rgba(255,255,255,.55)" stroke-width="1.2" fill="none" />
          </svg>
        </Fragment>
      ))}
      {v.on.bird ? (
        <>
          <div class="bird" style={v.L.bird} aria-hidden="true" />
        </>
      ) : null}
    </>
  );
}
