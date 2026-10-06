// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// CONFIRM / BOOKED TICKET
import { Fragment } from 'preact';
import type { V } from '../types';

export function ConfirmBookedTicket({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.is.ticket ? (
        <>
          <div class="slide-in" style="display: flex; flex-direction: column; gap: 12px">
            <div style={v.ticket.card}>
              <div style="display: flex; align-items: center; justify-content: space-between">
                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 11px; letter-spacing: .16em; color: rgba(255,255,255,.9)">
                  {v.ticket.round}
                </span>
                {v.ticket.isBooked ? (
                  <>
                    <span style="font-size: 12px; font-weight: 800; background: rgba(255,255,255,.25); color: #FFFFFF; padding: 3px 10px; border-radius: 999px">
                      {v.t.confirmed}
                    </span>
                  </>
                ) : null}
              </div>
              <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 28px; color: #FFFFFF; line-height: 1.1">{v.ticket.date}</span>
              <span style="display: flex; align-items: center; gap: 8px; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 22px; color: #FFFFFF">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {v.ticket.time}
              </span>
              <div style="height: 0; border-top: 2px dashed rgba(255,255,255,.5); margin: 4px -4px" />
              <span style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; color: #FFFFFF">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="2" y="6" width="14" height="12" rx="2" />
                  <path d="M16 10l6-3v10l-6-3" />
                </svg>
                Google Meet
              </span>
              {v.ticket.isBooked ? (
                <>
                  <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,.18); border-radius: 14px; padding: 8px 10px">
                    <span style="font-weight: 700; font-size: 13px; color: rgba(255,255,255,.9)">{v.t.startsIn}</span>
                    <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 18px; color: #FFFFFF">{v.ticket.countdown}</span>
                  </div>
                </>
              ) : null}
            </div>
            {v.ticket.isBooked ? (
              <>
                <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px">
                  {(v.ticketActions || []).map((a: any, i0: number) => (
                    <Fragment key={i0}>
                      <button class="lift" onClick={a.on} style={a.style}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d={a.d} />
                        </svg>
                        {" "}
                        <span style="font-size: 13px; font-weight: 800">{a.label}</span>
                      </button>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
