// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// PANEL
import { Fragment } from 'preact';
import type { V } from '../types';
import { Call } from './Call';
import { Campus } from './Campus';
import { Checklist } from './Checklist';
import { ChoiceGrid } from './ChoiceGrid';
import { ConfirmBookedTicket } from './ConfirmBookedTicket';
import { Dob } from './Dob';
import { Fail } from './Fail';
import { Footer } from './Footer';
import { History } from './History';
import { Letter } from './Letter';
import { Login } from './Login';
import { MapCard } from './MapCard';
import { Pending } from './Pending';
import { Photo } from './Photo';
import { Pincode } from './Pincode';
import { ReadyCheck } from './ReadyCheck';
import { Review } from './Review';
import { RoundIntro } from './RoundIntro';
import { School } from './School';
import { SlotPicker } from './SlotPicker';
import { Submitting } from './Submitting';
import { Test } from './Test';
import { TextFields } from './TextFields';
import { TourCard } from './TourCard';
import { Travel } from './Travel';
import { Whatsapp } from './Whatsapp';

export function Panel({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.on.panel ? (
        <>
          <div class={v.L.panelCls} style={v.L.panel}>
            {v.cfg.hasNav ? (
              <>
                <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0">
                  {v.cfg.navBack ? (
                    <>
                      <button onClick={v.goBack} aria-label={v.t.back} class="soft-btn" style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 999px; border: 1.5px solid #FBCFE8; background: #FFFFFF; color: #BE185D; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M15 6l-6 6 6 6" />
                        </svg>
                      </button>
                    </>
                  ) : null}
                  <div style="flex-grow: 1; min-width: 0; display: flex; justify-content: center">
                    {v.cfg.hasNavPill ? (
                      <>
                        <span style={v.cfg.navPillStyle}>{v.cfg.navPill}</span>
                      </>
                    ) : null}
                  </div>
                  {v.cfg.hasHelp ? (
                    <>
                      <button onClick={v.openHelp} class="soft-btn" style="flex-shrink: 0; min-height: 40px; padding: 0 12px; border-radius: 999px; border: 1.5px solid #BAE6FD; background: #F0F9FF; color: #075985; font-weight: 800; font-size: 13px; white-space: nowrap; cursor: pointer; flex-shrink: 0">
                        {v.t.needHelp}
                      </button>
                    </>
                  ) : null}
                  {v.cfg.navClose ? (
                    <>
                      <button onClick={v.askLeave} aria-label={v.t.saveExit} class="soft-btn" style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 999px; border: 1.5px solid #E2E8F0; background: #FFFFFF; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true">
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </button>
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
            <div class="scroll-y" style="flex-grow: 1; min-height: 0; display: flex; flex-direction: column; gap: 12px; padding: 2px 2px 6px">
              {/* LOGIN */}
              <Login v={v} />
              {/* TEXT FIELDS */}
              <TextFields v={v} />
              {/* PHOTO */}
              <Photo v={v} />
              {/* DOB */}
              <Dob v={v} />
              {/* CHOICE GRID */}
              <ChoiceGrid v={v} />
              {/* CATEGORY CHIPS */}
              {v.is.category ? (
                <>
                  <div class="slide-in" style="display: flex; flex-wrap: wrap; gap: 10px">
                    {(v.catChips || []).map((c: any, i0: number) => (
                      <Fragment key={i0}>
                        <button class="lift" onClick={c.pick} style={c.style}>{c.label}</button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {/* PINCODE */}
              <Pincode v={v} />
              {/* SCHOOL */}
              <School v={v} />
              {/* CAMPUS */}
              <Campus v={v} />
              {/* REVIEW */}
              <Review v={v} />
              {/* READY CHECK */}
              <ReadyCheck v={v} />
              {/* TEST */}
              <Test v={v} />
              {/* SUBMITTING */}
              <Submitting v={v} />
              {/* FAIL */}
              <Fail v={v} />
              {/* ROUND INTRO */}
              <RoundIntro v={v} />
              {/* SLOT PICKER */}
              <SlotPicker v={v} />
              {/* CONFIRM / BOOKED TICKET */}
              <ConfirmBookedTicket v={v} />
              {/* PENDING */}
              <Pending v={v} />
              {/* LETTER */}
              <Letter v={v} />
              {/* CHECKLIST */}
              <Checklist v={v} />
              {/* WHATSAPP */}
              <Whatsapp v={v} />
              {/* TOUR CARD */}
              <TourCard v={v} />
              {/* CALL */}
              <Call v={v} />
              {/* HISTORY */}
              <History v={v} />
              {/* TRAVEL */}
              <Travel v={v} />
              {/* MAP CARD */}
              <MapCard v={v} />
            </div>
            {/* FOOTER */}
            <Footer v={v} />
          </div>
        </>
      ) : null}
    </>
  );
}
