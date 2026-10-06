// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// ZONE 1: ABOUT NAVGURUKUL LANDING PAGES
import { Fragment } from 'preact';
import type { V } from '../types';
import { Asha } from './Asha';
import { Cta } from './Cta';
import { HeadlineBlock } from './HeadlineBlock';
import { Page2 } from './Page2';
import { Page3Courses } from './Page3Courses';
import { Page4Campuses } from './Page4Campuses';
import { Page5SuccessStories } from './Page5SuccessStories';

export function AboutNavgurukulLandingPages({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.inLanding ? (
        <>
          <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden">
            <div class="ld-bg-banyan ld-kenburns" style={v.LD.L.bg} />
            <div style={v.LD.L.overlay} />
            {v.LD.isSoft ? (
              <>
                <div class="ld-pagefade" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: linear-gradient(180deg, #FFFCF5 0%, #FFF7ED 40%, #FEF3C7 78%, #ECFDF5 100%)" />
                <div class="ld-bg-banyan" style="position: absolute; left: 0; bottom: 0; width: 100%; height: 38%; background-position: 38% 100%; opacity: .2; -webkit-mask-image: linear-gradient(180deg, transparent, #000 60%); mask-image: linear-gradient(180deg, transparent, #000 60%)" />
              </>
            ) : null}
            {(v.LD.leaves || []).map((lf: any, i0: number) => (
              <Fragment key={i0}>
                <svg class="ld-leaf" width={lf.size} height={lf.size} viewBox="0 0 24 24" style={lf.style} aria-hidden="true">
                  <path d="M3 21C3 11 9 4 21 3c-1 12-8 18-18 18z" fill={lf.color} />
                </svg>
              </Fragment>
            ))}
            {/* top bar */}
            <div style={v.LD.L.bar}>
              <img src="/media/logo.webp" alt="NavGurukul" style={v.LD.L.logo} />
              <div style="flex-grow: 1" />
              <div style="display: flex; background: #FFFFFF; border: 1.5px solid #FBCFE8; border-radius: 999px; padding: 2px">
                {(v.LD.langChips || []).map((c: any, i0: number) => (
                  <Fragment key={i0}>
                    <button onClick={c.pick} aria-label={c.aria} style={c.style}>{c.label}</button>
                  </Fragment>
                ))}
              </div>
              <button onClick={v.LD.login} style={v.LD.loginStyle}>{v.LD.loginLabel}</button>
            </div>
            {/* headline block + Asha (one column on phone, see L.p1Stack) */}
            <div style={v.LD.L.p1Stack}>
              <HeadlineBlock v={v} />
              <Asha v={v} />
            </div>
            {/* CTA */}
            <Cta v={v} />
            {/* bird flies across page 1 */}
            {v.LD.isP1 ? (
              <>
                <div class="ld-bird-fly" style={v.LD.L.birdPos} aria-hidden="true"><div class="ld-bird" /></div>
              </>
            ) : null}
            {/* PAGE 2 */}
            <Page2 v={v} />
            {/* PAGE 3: COURSES */}
            <Page3Courses v={v} />
            {/* PAGE 4: CAMPUSES */}
            <Page4Campuses v={v} />
            {/* PAGE 5: SUCCESS STORIES */}
            <Page5SuccessStories v={v} />
          </div>
        </>
      ) : null}
    </>
  );
}
