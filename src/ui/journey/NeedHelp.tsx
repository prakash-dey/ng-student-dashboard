// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// NEED HELP
import { Fragment } from 'preact';
import type { V } from '../types';

export function NeedHelp({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.hasHelp ? (
        <>
          <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 62; background: rgba(15,23,42,.55); display: flex; align-items: flex-end; justify-content: center">
            <div class="rise" role="dialog" aria-modal="true" aria-label={v.t.needHelp} style={v.L.sheet}>
              <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-heading); color: #0F172A; text-align: center; line-height: 1.15">
                {v.t.needHelp}
              </span>
              {" "}
              <span style="font-weight: 700; font-size: var(--fs-body); color: #475569; text-align: center">{v.t.helpBody}</span>
              <div style="display: flex; flex-direction: column; gap: 10px; width: 100%">
                <a href="tel:+919730879683" style="display: flex; align-items: center; gap: 12px; min-height: 60px; padding: 8px 16px; border-radius: 18px; text-decoration: none; text-align: left; background: #EFF6FF; color: #1D4ED8">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0">
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
                  </svg>
                  <span style="display: flex; flex-direction: column">
                    <span style="font-size: var(--fs-small); font-weight: 700">{v.t.call}</span>
                    <span style="font-size: var(--fs-body-l); font-weight: 800; color: #0F172A">+91 97308 79683</span>
                  </span>
                </a>
                <a href="https://wa.me/919730879683" style="display: flex; align-items: center; gap: 12px; min-height: 60px; padding: 8px 16px; border-radius: 18px; text-decoration: none; text-align: left; background: #F0FDF4; color: #15803D">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0">
                    <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
                  </svg>
                  <span style="display: flex; flex-direction: column">
                    <span style="font-size: var(--fs-small); font-weight: 700">WhatsApp</span>
                    <span style="font-size: var(--fs-body-l); font-weight: 800; color: #0F172A">+91 97308 79683</span>
                  </span>
                </a>
                <a href="mailto:admissions@navgurukul.org" style="display: flex; align-items: center; gap: 12px; min-height: 60px; padding: 8px 16px; border-radius: 18px; text-decoration: none; text-align: left; background: #FDF2F8; color: #BE185D">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <span style="display: flex; flex-direction: column; min-width: 0">
                    <span style="font-size: var(--fs-small); font-weight: 700">{v.t.email}</span>
                    <span style="font-size: var(--fs-body); font-weight: 800; color: #0F172A; overflow-wrap: anywhere">admissions@navgurukul.org</span>
                  </span>
                </a>
                <button onClick={v.closeHelp} style="height: 52px; border: 2px solid #E2E8F0; border-radius: 999px; background: #FFFFFF; color: #334155; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-button-sm); cursor: pointer">
                  {v.t.helpClose}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
