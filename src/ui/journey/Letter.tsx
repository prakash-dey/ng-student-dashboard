// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// LETTER
import { Fragment } from 'preact';
import type { V } from '../types';

export function Letter({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.letter ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 10px">
            <div style="position: relative; background: #FFFEF8; border-radius: 18px; padding: 18px 18px 16px; box-shadow: 0 10px 28px rgba(120,53,15,.18); border: 1.5px solid #F5E6C8; display: flex; flex-direction: column; gap: 8px">
              <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #FBCFE8; padding-bottom: 8px">
                <img src="/media/logo.webp" alt="NavGurukul" style="height: 22px; width: auto" />
                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 10px; letter-spacing: .14em; color: #BE185D">
                  {v.t.letterHead}
                </span>
              </div>
              <span style="font-weight: 800; font-size: 16px; color: #0F172A">{v.t.dear}{" "}{v.fullName},</span>
              <span style="font-size: 15px; color: #334155; line-height: 1.5">{v.letterBody}</span>
              <div style="display: flex; flex-wrap: wrap; gap: 6px">
                <span style="font-size: 13px; font-weight: 800; padding: 4px 10px; border-radius: 999px; background: #FCE7F3; color: #9D174D">
                  {v.schoolName}
                </span>
                <span style="font-size: 13px; font-weight: 800; padding: 4px 10px; border-radius: 999px; background: #FFF7ED; color: #9A3412">
                  {v.campusName}
                </span>
                <span style="font-size: 13px; font-weight: 800; padding: 4px 10px; border-radius: 999px; background: #ECFDF5; color: #065F46">
                  {v.t.joinDate}{": "}{v.joinDate}
                </span>
              </div>
              <span style="font-size: 14px; color: #334155; font-weight: 600">{v.t.freeLine}</span>
              <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-top: 4px">
                <span style="display: flex; flex-direction: column">
                  <span style="font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 20px; color: #1E3A8A; font-style: italic">NavGurukul</span>
                  <span style="font-size: 12px; font-weight: 700; color: #64748B">{v.t.signed}</span>
                </span>
                <svg width="58" height="58" viewBox="0 0 60 60" aria-hidden="true">
                  <circle cx="30" cy="30" r="27" fill="none" stroke="#E91E63" stroke-width="2.5" stroke-dasharray="4 3" />
                  <circle cx="30" cy="30" r="20" fill="#FCE7F3" />
                  <path d="M30 18l3.5 7.5 8 .9-6 5.5 1.7 8L30 36l-7.2 3.9 1.7-8-6-5.5 8-.9z" fill="#E91E63" />
                </svg>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
              <button class="lift" onClick={v.miniReward} style="height: 50px; border-radius: 16px; border: 2px solid #BFDBFE; background: #EFF6FF; color: #1D4ED8; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 800; font-size: 15px; cursor: pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
                </svg>
                {v.t.download}
              </button>
              <button class="lift" onClick={v.miniReward} style="height: 50px; border-radius: 16px; border: 2px solid #BBF7D0; background: #F0FDF4; color: #15803D; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 800; font-size: 15px; cursor: pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
                </svg>
                {v.t.share}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
