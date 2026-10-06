// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// WHATSAPP
import { Fragment } from 'preact';
import type { V } from '../types';

export function Whatsapp({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.whatsapp ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; align-items: center; gap: 14px; padding-top: 6px">
            <div class="pop" style="width: 110px; height: 110px; border-radius: 32px; background: linear-gradient(145deg, #4ADE80, #16A34A); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 0 #166534, 0 16px 30px rgba(22,163,74,.35)">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
              </svg>
            </div>
            <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 20px; color: #14532D; text-align: center">{v.batchName}</span>
            {v.D ? (
              <>
                <div style="display: flex; align-items: center; gap: 14px; padding: 12px; border-radius: 20px; background: #FFFFFF; border: 1.5px solid #E2E8F0">
                  <svg width="120" height="120" viewBox="0 0 25 25" shape-rendering="crispEdges" role="img" aria-label="QR code to join the WhatsApp group">
                    <rect width="25" height="25" fill="#FFFFFF" />
                    <path d={v.qrPath} fill="#0F172A" />
                  </svg>
                  <span style="font-weight: 800; font-size: 15px; color: #334155; max-width: 160px">{v.t.scanQr}</span>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
