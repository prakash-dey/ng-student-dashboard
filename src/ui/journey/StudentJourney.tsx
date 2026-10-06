// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// ZONE 2: STUDENT JOURNEY
import { Fragment } from 'preact';
import type { V } from '../types';
import { Celebration } from './Celebration';
import { Countdown } from './Countdown';
import { DemoJump } from './DemoJump';
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
          {/* logo when no HUD */}
          {v.on.bareLogo ? (
            <>
              <div style={v.L.bareLogo}>
                <img src="/media/logo.webp" alt="NavGurukul" style={v.L.bareLogoImg} />
                <div class="pop" style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,.9); border: 1.5px solid #F9A8D4; border-radius: 999px; padding: 6px 14px; box-shadow: 0 4px 14px rgba(233,30,99,.18)">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21C3 11 9 4 21 3c-1 12-8 18-18 18z" fill="#059669" /></svg>
                  <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 11px; letter-spacing: .18em; color: #BE185D">{v.t.freeTag}</span>
                </div>
              </div>
            </>
          ) : null}
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
          {/* DEMO JUMP */}
          <DemoJump v={v} />
        </>
      ) : null}
    </>
  );
}
