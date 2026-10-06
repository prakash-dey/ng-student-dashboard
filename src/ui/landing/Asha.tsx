// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// Asha
import { Fragment } from 'preact';
import type { V } from '../types';

export function Asha({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      <div class="ld-fade" style={v.LD.L.ashaZone}>
        {v.LD.walking ? (
          <>
            <div class="ld-walk-in" style={v.LD.L.walker}><div class="ld-asha-walk" /></div>
          </>
        ) : null}
        {v.LD.standing ? (
          <>
            <div style={v.LD.L.disc} />
            <img class="ld-asha-in" src="/media/asha.webp" alt="Asha, your guide" style={v.LD.L.asha} />
            <div class="ld-bubble-in" style={v.LD.L.bubble}><span style={v.LD.L.bubbleText}>{v.LD.t.asha}</span></div>
            <svg class="ld-twinkle" width="16" height="16" viewBox="0 0 24 24" style={v.LD.L.tw} aria-hidden="true">
              <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#FBBF24" />
            </svg>
          </>
        ) : null}
      </div>
    </>
  );
}
