// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// TEXT FIELDS
import { Fragment } from 'preact';
import type { V } from '../types';

export function TextFields({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.hasFields ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 12px">
            {(v.fields || []).map((f: any, i0: number) => (
              <Fragment key={i0}>
                <div style="display: flex; flex-direction: column; gap: 6px">
                  <label for={f.id} style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: var(--fs-body); color: #475569">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d={f.d} />
                    </svg>
                    {f.label}
                  </label>
                  <div style="display: flex; gap: 8px">
                    {f.isPhone ? (
                      <>
                        <span style="height: 60px; display: flex; align-items: center; padding: 0 14px; border-radius: 18px; background: #FFF7ED; border: 2px solid #FED7AA; font-weight: 800; color: #9A3412; font-size: var(--fs-input)">
                          +91
                        </span>
                      </>
                    ) : null}
                    <input id={f.id} class="field" value={f.value} onInput={f.onChange} placeholder={f.ph} inputmode={f.mode} autocomplete={f.auto} style="flex-grow: 1; min-width: 0; height: 60px; border: 2px solid #FBCFE8; border-radius: 18px; padding: 0 18px; font-size: var(--fs-input); font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 700; background: #FFFFFF; color: #0F172A; box-sizing: border-box" />
                  </div>
                </div>
              </Fragment>
            ))}
            {v.is.phone ? (
              <>
                <button onClick={v.toggleWa} aria-pressed={v.waPressed} class="soft-btn" style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 18px; border: 2px solid #BBF7D0; background: #F0FDF4; cursor: pointer; text-align: left">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#16A34A" aria-hidden="true">
                    <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
                  </svg>
                  <span style="flex-grow: 1; font-weight: 800; font-size: var(--fs-body); color: #14532D">{v.t.sameWa}</span>
                  <span style={v.waSwitch.track}><span style={v.waSwitch.knob} /></span>
                </button>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
