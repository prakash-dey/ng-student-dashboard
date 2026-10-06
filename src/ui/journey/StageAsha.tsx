// STAGE: ASHA — Asha with her speech bubble (or typing dots), sparkles, and "zzz" while waiting for a result.
import type { V } from '../types';

function Twinkle({ size, fill, style }: { size: number; fill: string; style: string }) {
  return (
    <svg class="twinkle" width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill={fill} />
    </svg>
  );
}

/** Asha and her line. Re-mounted on every new line (key) so the entrance animation plays again. */
function AshaLine({ v }: { v: V }) {
  return (
    <>
      <div class={v.ashaCls} style={v.L.ashaWrap}><img class="bob" src="/media/asha.webp" alt="Asha, your guide" style={v.L.asha} /></div>
      <div class="bubble-in glass" style={v.L.bubble}>
        {v.typing ? (
          <div style="display: flex; gap: 6px; padding: 8px 4px" aria-label="Asha is typing">
            <span class="dot" />
            <span class="dot" style="animation-delay: .15s" />
            <span class="dot" style="animation-delay: .3s" />
          </div>
        ) : (
          <>
            {v.cfg.hasPill ? <span style={v.cfg.pillStyle}>{v.cfg.pill}</span> : null}
            <div style={v.L.askStyle}>{v.cfg.ask}</div>
            {v.cfg.hasSub ? <div style={v.L.subStyle}>{v.cfg.sub}</div> : null}
          </>
        )}
      </div>
    </>
  );
}

export function StageAsha({ v }: { v: V }) {
  if (!v.on.stage) return null;
  return (
    <div style={v.L.stage}>
      <div class="glow-disc" style={v.L.disc} />
      <AshaLine key={v.parA ? 'a' : 'b'} v={v} />
      {v.on.resting ? (
        <div style={v.L.zzz}>
          <span class="zzz" style="display: inline-block; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 26px; color: #7C3AED">z</span>
          <span class="zzz" style="display: inline-block; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 20px; color: #A78BFA; animation-delay: .8s">z</span>
        </div>
      ) : null}
      <Twinkle size={16} fill="#FBBF24" style={v.L.tw1} />{' '}
      <Twinkle size={11} fill="#F472B6" style={v.L.tw2} />
    </div>
  );
}
