// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// LOGIN
import { Fragment } from 'preact';
import type { V } from '../types';

export function Login({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.login ? (
        <>
          <div class="rise" style="display: flex; flex-direction: column; gap: 12px">
            <button class="lift" onClick={v.loginGoogle} style="height: 64px; border-radius: 20px; border: 2px solid #E2E8F0; background: #FFFFFF; display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; font-size: 18px; font-weight: 800; color: #0F172A; box-shadow: 0 5px 0 #E2E8F0">
              <svg width="26" height="26" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
              </svg>
              {" "}{v.t.google}
            </button>
            <div style="display: flex; align-items: center; gap: 10px; color: #94A3B8; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .16em; font-weight: 700">
              <span style="flex-grow: 1; height: 1.5px; background: #E2E8F0" />
              {v.t.orText}
              <span style="flex-grow: 1; height: 1.5px; background: #E2E8F0" />
            </div>
            <button class="lift" onClick={v.loginPhone} style="height: 64px; border-radius: 20px; border: 2px solid #FBCFE8; background: #FDF2F8; display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; font-size: 18px; font-weight: 800; color: #9D174D; box-shadow: 0 5px 0 #FBCFE8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="6" y="2" width="12" height="20" rx="2.5" />
                <path d="M11 18h2" />
              </svg>
              {" "}{v.t.phoneLogin}
            </button>
            <span style="margin-top: 8px; font-weight: 800; font-size: 14px; color: #475569; text-align: center">{v.t.needHelp}</span>
            <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px">
              <a href="tel:+919730879683" style="display: flex; align-items: center; justify-content: center; gap: 6px; height: 50px; border-radius: 16px; background: #EFF6FF; color: #1D4ED8; text-decoration: none; font-weight: 800; font-size: 15px">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
                </svg>
                {v.t.call}
              </a>
              <a href="https://wa.me/919730879683" style="display: flex; align-items: center; justify-content: center; gap: 6px; height: 50px; border-radius: 16px; background: #F0FDF4; color: #15803D; text-decoration: none; font-weight: 800; font-size: 15px">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
                </svg>
                WhatsApp
              </a>
              <a href="mailto:admissions@navgurukul.org" style="display: flex; align-items: center; justify-content: center; gap: 6px; height: 50px; border-radius: 16px; background: #FDF2F8; color: #BE185D; text-decoration: none; font-weight: 800; font-size: 15px">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                {v.t.email}
              </a>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
