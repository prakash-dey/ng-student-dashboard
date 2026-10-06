// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// LANGUAGE
import { Fragment } from 'preact';
import type { V } from '../types';

export function Language({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.lang ? (
        <>
          <div class="rise" style="display: flex; flex-direction: column; gap: 10px">
            {(v.langCards || []).map((l: any, i0: number) => (
              <Fragment key={i0}>
                <button class="lift glass" onClick={l.pick} style="display: flex; align-items: center; gap: 14px; border-radius: 22px; padding: 12px 16px 12px 12px; cursor: pointer; min-height: 74px; text-align: left">
                  <span style={l.glyphStyle}>{l.glyph}</span>
                  <span style="flex-grow: 1; display: flex; flex-direction: column">
                    <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 24px; color: #0F172A; line-height: 1.1">{l.name}</span>
                    <span style="font-size: 13px; font-weight: 600; color: #64748B">{l.sub}</span>
                  </span>
                  <span style="width: 40px; height: 40px; border-radius: 999px; background: #FCE7F3; display: flex; align-items: center; justify-content: center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
