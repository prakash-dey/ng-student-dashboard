// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// headline block
import { Fragment } from 'preact';
import type { V } from '../types';

export function HeadlineBlock({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      <div class="ld-fade" style={v.LD.L.head}>
        <div class="ld-stamp-drop ld-shine" style={v.LD.L.stamp}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#FBBF24" />
          </svg>
          {" "}
          <span style={isPc ? "text-decoration-line: none" : undefined}>{v.LD.t.stamp}</span>
        </div>
        <h1 style="margin: 0; display: flex; flex-direction: column">
          <span class="ld-rise1" style={v.LD.L.h1}>{v.LD.t.h1}</span>
          <span class="ld-rise2" style={v.LD.L.h2}>{v.LD.t.h2}</span>
        </h1>
      </div>
    </>
  );
}
