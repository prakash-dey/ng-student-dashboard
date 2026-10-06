// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// CHOICE GRID
import { Fragment } from 'preact';
import type { V } from '../types';

export function ChoiceGrid({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.choice ? (
        <>
          <div class="slide-in" style={v.choiceGrid}>
            {(v.choices || []).map((o: any, i0: number) => (
              <Fragment key={i0}>
                <button class="lift glass" onClick={o.pick} style={o.style}>
                  {o.isAvatar ? (
                    <>
                      <svg width="72" height="72" viewBox="0 0 76 76" aria-hidden="true">
                        <circle cx="38" cy="38" r="36" fill={o.bg} />
                        <circle cx="38" cy="38" r="36" fill="none" stroke={o.ring} stroke-width="3" />
                        <path d="M16 70 Q18 48 38 47 Q58 48 60 70Z" fill={o.fg} />
                        <circle cx="38" cy="30" r="12" fill="#D6976A" />
                        <path d={o.hair} fill="#2B1B17" />
                        <circle cx="34" cy="31" r="1.5" fill="#1E293B" />
                        <circle cx="42" cy="31" r="1.5" fill="#1E293B" />
                        <path d="M34 36 Q38 39 42 36" stroke="#1E293B" stroke-width="1.6" fill="none" stroke-linecap="round" />
                      </svg>
                    </>
                  ) : null}
                  {" "}
                  {o.isIcon ? (
                    <>
                      <span style={o.tile}>
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={o.fg} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d={o.d} />
                        </svg>
                      </span>
                    </>
                  ) : null}
                  {" "}
                  {o.isGlyph ? (
                    <>
                      <span style={o.tile}>
                        <span style={`font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 26px; color: ${o.fg}`}>{o.glyph}</span>
                      </span>
                    </>
                  ) : null}
                  {" "}
                  <span style={o.labelStyle}>{o.label}</span>
                  {o.sel ? (
                    <>
                      <span class="pop" style="position: absolute; right: 8px; top: 8px; width: 26px; height: 26px; border-radius: 999px; background: #E91E63; display: flex; align-items: center; justify-content: center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </span>
                    </>
                  ) : null}
                </button>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
