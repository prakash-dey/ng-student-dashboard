// Generated from design-handoff/design/{phone,pc}.dc.html by scripts/dc2tsx.mjs, then maintained by hand.
// CELEBRATION
import { Fragment } from 'preact';
import type { V } from '../types';

export function Celebration({ v }: { v: V }) {
  const isPc = v.D;
  return (
    <>
      {v.on.celebrate ? (
        <>
          {v.cel.isCampus ? (
            <>
              <div class="bg-map" style={v.L.campusBg} />
              <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: linear-gradient(180deg, rgba(255,251,243,1) 0%, rgba(255,251,243,1) 29%, rgba(255,251,243,.3) 46%, rgba(255,251,243,.55) 70%, rgba(255,251,243,.96) 100%)" />
            </>
          ) : null}
          <div style={v.L.cel}>
            <div class="pop" style="display: flex; align-items: center; gap: 8px; background: #FFFFFF; border: 1.5px solid #F9A8D4; border-radius: 999px; padding: 5px 14px">
              <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: var(--fs-micro); letter-spacing: .18em; color: #BE185D">{v.cel.pill}</span>
            </div>
            <div class="pop" style={v.L.celTitle}>{v.cel.title}</div>
            <div style={v.L.celStage}>
              <div class="rays" style={v.L.celRays} />
              <img class="jump" src="/media/asha.webp" alt="Asha cheering" style={v.L.celAsha} />
              <div class="badge-flip" style={v.L.celBadge}>
                <div style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 20px">
                  <svg width="100%" height="100%" viewBox="0 0 132 150" role="img" aria-label={`${v.cel.badge.name} badge`}>
                    <path d="M44 96 L30 146 L52 136 L62 150 L70 104Z" fill={v.cel.badge.r1} />
                    <path d="M88 96 L102 146 L80 136 L70 150 L62 104Z" fill={v.cel.badge.r2} />
                    <circle cx="66" cy="62" r="56" fill="#F59E0B" />
                    <circle cx="66" cy="62" r="48" fill="#FCD34D" />
                    <circle cx="66" cy="62" r="40" fill={v.cel.badge.c2} />
                    <g transform="translate(42 38) scale(2)">
                      <path d={v.cel.badge.d} stroke={v.cel.badge.c1} stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg>
                  <div class="medal-shine" style="position: absolute; top: 0; left: -60%; width: 40%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.7), transparent); transform: skewX(-20deg)" />
                </div>
              </div>
            </div>
            <div class="glass pop" style={v.L.celCard}>
              <div style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0">
                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: var(--fs-micro); letter-spacing: .16em; color: #B45309">
                  {v.t.badgeUnlocked}
                </span>
                <span style="font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: var(--fs-heading); color: #0F172A; line-height: 1.1">{v.cel.badge.name}</span>
                {v.cel.hasChips ? (
                  <>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px">
                      {(v.cel.chips || []).map((c: any, i0: number) => (
                        <Fragment key={i0}>
                          <span style="font-size: var(--fs-caption); font-weight: 800; padding: 3px 9px; border-radius: 999px; background: #FCE7F3; color: #9D174D">{c}</span>
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            {v.cel.isCampus ? (
              <>
                <div class="pop" style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 20px; background: linear-gradient(135deg, #3B1D0F, #5B2E14); box-shadow: inset 0 0 0 2px #B45309; animation-delay: .5s">
                  <div style="width: 50px; height: 56px; flex-shrink: 0; border-radius: 8px; padding: 3px; background: linear-gradient(145deg, #FDE68A, #D97706)">
                    <div style="width: 100%; height: 100%; border-radius: 6px; overflow: hidden; background: #FCE7F3">
                      <svg width="100%" height="100%" viewBox="0 0 100 110" aria-hidden="true">
                        <path d="M18 110 Q20 76 50 74 Q80 76 82 110Z" fill="#EC4899" />
                        <circle cx="50" cy="44" r="21" fill="#D6976A" />
                        <path d="M29 44 Q28 20 50 20 Q72 20 71 44 Q66 30 50 30 Q34 30 29 44Z" fill="#2B1B17" />
                      </svg>
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column">
                    <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: var(--fs-micro); letter-spacing: .16em; color: #FDE68A">
                      {v.t.hallTitle}
                    </span>
                    <span style="font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-label); color: #FFFFFF; line-height: 1.15">
                      {v.hallLine}
                    </span>
                  </div>
                </div>
                <div class="pop" style="display: flex; gap: 6px; justify-content: center; animation-delay: .6s">
                  {(v.shelf || []).map((b: any, i0: number) => (
                    <Fragment key={i0}>
                      <svg width="44" height="44" viewBox="0 0 60 60" aria-label={b.name} role="img">
                        <circle cx="30" cy="30" r="28" fill={b.c1} />
                        <circle cx="30" cy="30" r="22" fill={b.c2} />
                        <g transform="translate(18 18)">
                          <path d={b.d} stroke={b.c1} stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                      </svg>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            <div style="flex-grow: 1" />
            <div style={v.L.celBtns}>
              <button class="glow-btn" onClick={v.cel.primaryOn} style="height: 64px; border: none; border-radius: 999px; color: #FFFFFF; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-button); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; flex-grow: 1">
                {v.cel.primaryLabel}{" "}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <button onClick={v.miniReward} style="height: 56px; border: 2px solid #22C55E; border-radius: 999px; background: #FFFFFF; color: #15803D; font-family: 'Baloo 2', 'Noto Sans Devanagari', sans-serif; font-weight: 800; font-size: var(--fs-button-sm); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 0 #BBF7D0; flex-grow: 1; padding: 0 20px">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#16A34A" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
                </svg>
                {v.t.tellFamily}
              </button>
            </div>
          </div>
          {(v.confetti || []).map((p: any, i0: number) => (
            <Fragment key={i0}>
              <div class="confetti" style={p.style} />
            </Fragment>
          ))}
        </>
      ) : null}
    </>
  );
}
