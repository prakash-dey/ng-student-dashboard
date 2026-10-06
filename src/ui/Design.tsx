// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// Root of the design: both zones and the overlays.
import { Fragment } from 'preact';
import type { V } from './types';
import { StudentJourney } from './journey/StudentJourney';
import { AboutNavgurukulLandingPages } from './landing/AboutNavgurukulLandingPages';

export function Design({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      <div style={`width: ${v.W}px; height: ${v.H}px; position: relative; overflow: hidden; background: #FFFBF3; font-size: 17px; line-height: 1.4`}>
        {/* ZONE 1: ABOUT NAVGURUKUL LANDING PAGES */}
        <AboutNavgurukulLandingPages v={v} />
        {/* ZONE 2: STUDENT JOURNEY */}
        <StudentJourney v={v} />
      </div>
    </>
  );
}
