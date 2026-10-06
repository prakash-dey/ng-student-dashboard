// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// SUBMITTING
import { Fragment } from 'preact';
import type { V } from '../types';

export function Submitting({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.submitting ? (
        <>
          <div style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px">
            <div style="display: flex; align-items: flex-end; gap: 8px; height: 90px">
              {(v.bars || []).map((b: any, i0: number) => (
                <Fragment key={i0}>
                  <div class="bar-grow" style={b.style} />
                </Fragment>
              ))}
            </div>
            <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: var(--fs-heading); color: #0F172A; text-align: center">{v.t.checking}</span>
          </div>
        </>
      ) : null}
    </>
  );
}
