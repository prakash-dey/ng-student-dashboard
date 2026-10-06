// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// ZONE 2: STUDENT JOURNEY
import { Fragment } from 'preact';
import type { V } from '../types';
import { Celebration } from './Celebration';
import { Countdown } from './Countdown';
import { Dialog } from './Dialog';
import { Hud } from './Hud';
import { MicroWin } from './MicroWin';
import { NeedHelp } from './NeedHelp';
import { Panel } from './Panel';
import { StageAsha } from './StageAsha';
import { StageMap } from './StageMap';
import { World } from './World';

export function StudentJourney({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.inJourney ? (
        <>
          {/* WORLD */}
          <World v={v} />
          {/* HUD */}
          <Hud v={v} />
          {/* STAGE: ASHA */}
          <StageAsha v={v} />
          {/* STAGE: MAP */}
          <StageMap v={v} />
          {/* PANEL */}
          <Panel v={v} />
          {/* CELEBRATION */}
          <Celebration v={v} />
          {/* SECTION BANNER */}
          {v.hasSection ? (
            <>
              <div class="banner-drop" style={v.L.banner}>
                <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="#FBBF24" />
                </svg>
                {" "}
                <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 20px; color: #FFFFFF; flex-grow: 1">{v.sectionText}</span>
              </div>
            </>
          ) : null}
          {/* MINI COIN */}
          {v.hasMini ? (
            <>
              <div class="mini-coin" style={v.L.mini}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {" "}
                <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: 15px; color: #FFFFFF">{v.miniText}</span>
              </div>
            </>
          ) : null}
          {/* MICRO WIN */}
          <MicroWin v={v} />
          {/* COUNTDOWN */}
          <Countdown v={v} />
          {/* DIALOG */}
          <Dialog v={v} />
          {/* NEED HELP */}
          <NeedHelp v={v} />
        </>
      ) : null}
    </>
  );
}
