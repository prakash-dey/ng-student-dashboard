// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// Asha
// Phone: the artwork scales down (Fit) when the column is short; the speech bubble keeps its size.
import type { V } from '../types';
import { Fit } from '../Fit';

function Art({ v }: { v: V }) {
  return (
    <>
      {v.LD.walking ? (
        <>
          <div class="ld-walk-in" style={v.LD.L.walker}><div class="ld-asha-walk" /></div>
        </>
      ) : null}
      {v.LD.standing ? (
        <>
          <div style={v.LD.L.disc} />
          <img class="ld-asha-in" src="/media/asha.webp" alt="Asha, your guide" style={v.LD.L.asha} />
          <svg class="ld-twinkle" width="16" height="16" viewBox="0 0 24 24" style={v.LD.L.tw} aria-hidden="true">
            <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#FBBF24" />
          </svg>
        </>
      ) : null}
    </>
  );
}

function Bubble({ v }: { v: V }) {
  return v.LD.standing ? <div class="ld-bubble-in" style={v.LD.L.bubble}><span style={v.LD.L.bubbleText}>{v.LD.t.asha}</span></div> : null;
}

export function Asha({ v }: { v: V }) {
  if (v.LD.L.ashaFitH) {
    return (
      <div class="ld-fade" style={v.LD.L.ashaZone}>
        <Fit h={v.LD.L.ashaFitH} origin={v.LD.L.ashaFitOrigin}><Art v={v} /></Fit>
        <div style={v.LD.L.bubbleBox}><Bubble v={v} /></div>
      </div>
    );
  }
  return (
    <div class="ld-fade" style={v.LD.L.ashaZone}>
      <Art v={v} />
      <Bubble v={v} />
    </div>
  );
}
