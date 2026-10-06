// Journey, phone layout (designed at 390x844): HUD on top, Asha's stage below it, then the step panel down to
// the bottom edge. `compact` screens give Asha a smaller stage so the panel has more room.
// Responsive: everything sits in the frame's content column (X0, CW) with the designed gutters; full-bleed
// backdrops span the frame; heights follow the frame (see frame.ts).
import { clamp, shrinkBox } from '../frame';
import { MAP_SIZE } from '../geometry';
import type { Layout } from '../styles';
import type { Ctx } from './context';
import { phoneMapBox } from './mapBox';

const DISPLAY = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;";
const HUD_H = 92;
/** celebration: art cluster (rays + Asha + badge) and the fixed-height parts around it, at the design size */
const CEL_ART = { w: 354, h: 318 }, CEL_REST = 434;

export function journeyLayoutPhone(c: Ctx, compact: boolean): Layout {
  const { s, sc } = c, { W, H, CW, X0 } = c.f;
  const L: Layout = {};
  const big = !compact;
  // compact stage: 150px as designed; on short phones it gives up to 46px to the panel and only Asha's
  // illustration shrinks with it (k), never the bubble text
  const stH = big ? 226 : clamp(H - 510, 104, 150);
  const k = big ? 1 : stH / 150;
  const px = (n: number) => Math.round(n * k) + 'px';
  const pTop = HUD_H + stH;

  // HUD: backdrop across the frame, content in the column (equal gutters both ends)
  L.hud = 'position:absolute;left:0;top:0;width:' + W + 'px;z-index:45;padding:10px ' + (X0 + 14) + 'px 6px;box-sizing:border-box;display:flex;flex-direction:column;gap:6px;background:linear-gradient(180deg,rgba(255,251,243,.97) 70%,rgba(255,251,243,0))';
  L.hudRow = 'display:flex;align-items:center;gap:6px';
  L.logo = 'height:22px;width:auto;min-width:0;flex-shrink:1;object-fit:contain;object-position:left center';
  L.track = 'position:relative;height:38px;width:' + (CW - 28) + 'px';

  // Asha's stage
  L.stage = 'position:absolute;left:' + X0 + 'px;top:' + HUD_H + 'px;width:' + CW + 'px;height:' + stH + 'px;z-index:10';
  L.ashaWrap = big ? 'position:absolute;left:-6px;top:0;width:250px' : 'position:absolute;left:-4px;top:8px;width:' + px(150);
  L.asha = 'width:100%;height:auto;display:block';
  L.disc = big ? 'position:absolute;left:44px;top:192px;width:150px;height:26px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.45),rgba(236,72,153,0) 70%)' : 'position:absolute;left:' + px(26) + ';top:' + px(110) + ';width:' + px(92) + ';height:' + px(16) + ';border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.45),rgba(236,72,153,0) 70%)';
  // the big bubble keeps 166px but never reaches left of Asha's face on narrow phones
  L.bubble = (big ? 'position:absolute;right:14px;top:12px;width:' + clamp(CW - 224, 140, 166) + 'px;' : 'position:absolute;left:' + px(146) + ';right:14px;top:8px;') + 'border-radius:22px 22px 22px 6px;padding:12px;display:flex;flex-direction:column;gap:6px;box-sizing:border-box';
  L.askStyle = DISPLAY + 'font-size:' + (big ? 20 : 18) + 'px;line-height:1.15;color:#0F172A';
  L.subStyle = 'font-size:14px;font-weight:600;color:#475569;line-height:1.3';
  L.tw1 = 'position:absolute;left:24px;top:28px';
  L.tw2 = 'position:absolute;left:' + (big ? '210px' : px(128)) + ';top:' + (big ? '170px' : px(90)) + ';animation-delay:.6s';
  L.zzz = 'position:absolute;left:' + px(112) + ';top:6px';
  L.tourAshaBox = 'width:96px;height:112px;flex-shrink:0;border-radius:22px;overflow:hidden;background:linear-gradient(160deg,#FCE7F3,#FEF3C7);border:2.5px solid #F9A8D4';
  L.tourAsha = 'width:200px;height:auto;margin-left:-52px;margin-top:-2px';
  L.tourText = DISPLAY + 'font-size:18px;line-height:1.22;color:#0F172A';

  // step panel: from below the stage to 18px above the bottom
  L.panel = 'position:absolute;left:' + (X0 + 18) + 'px;width:' + (CW - 36) + 'px;top:' + pTop + 'px;height:' + (H - pTop - 18) + 'px;display:flex;flex-direction:column;gap:10px;z-index:10';
  L.panelCls = '';
  L.overlay = 'position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(180deg,rgba(255,251,243,.25) 0%,rgba(255,251,243,.1) 30%,rgba(255,247,237,.55) 50%,rgba(255,251,243,.94) 70%)';
  L.bird = 'position:absolute;left:0;top:150px;z-index:3';

  // map and tour: map card on top, glass panel at the bottom
  const mb = phoneMapBox(c.f, s);
  L.mapTitle = 'position:absolute;left:' + (X0 + 18) + 'px;top:96px;font-size:24px;z-index:10;display:none';
  L.mapBox = 'position:absolute;left:' + (X0 + 10) + 'px;top:' + mb.mapTop + 'px;width:' + (CW - 20) + 'px;height:' + mb.mapH + 'px;border-radius:26px;overflow:hidden;box-shadow:0 14px 34px rgba(120,53,15,.28),inset 0 0 0 3px rgba(180,120,60,.35);background:#EAD7AE;z-index:10';
  L.mapScroll = 'width:' + (CW - 20) + 'px;height:' + mb.mapH + 'px;overflow-x:auto;overflow-y:hidden';
  if (sc === 'map' || sc === 'tour') {
    L.panel = 'position:absolute;left:' + (X0 + 12) + 'px;width:' + (CW - 24) + 'px;top:' + mb.panelTop + 'px;height:' + mb.panelH + 'px;box-sizing:border-box;padding:14px;border-radius:26px;display:flex;flex-direction:column;gap:10px;z-index:10';
    L.panelCls = 'glass';
  }

  // celebrations: the art cluster keeps its size unless the screen is too narrow or short; the rest stretches
  const celK = clamp(Math.min((CW - 36) / CEL_ART.w, (H - HUD_H - CEL_REST) / CEL_ART.h), 0.55, 1);
  L.cel = 'position:absolute;left:' + X0 + 'px;top:' + HUD_H + 'px;width:' + CW + 'px;height:' + (H - HUD_H) + 'px;z-index:12;display:flex;flex-direction:column;align-items:center;padding:0 18px 22px;box-sizing:border-box' + (H < 844 || (CW - 36) / CEL_ART.w < 1 ? ';overflow-y:auto;overflow-x:hidden;scrollbar-width:none' : '');
  L.celTitle = 'margin-top:8px;' + DISPLAY + 'font-size:30px;color:#0F172A;text-align:center;line-height:1.1';
  L.celStage = 'position:relative;width:' + CEL_ART.w + 'px;height:' + CEL_ART.h + 'px;margin-top:2px;flex-shrink:0' + shrinkBox(CEL_ART.w, CEL_ART.h, celK);
  L.celRays = 'position:absolute;left:7px;top:-12px;width:340px;height:340px';
  L.celAsha = 'position:absolute;left:30px;top:24px;width:320px;height:auto';
  L.celBadge = 'position:absolute;left:0;top:168px;width:128px;height:146px';
  L.celCard = 'margin-top:-4px;width:' + (CW - 36) + 'px;border-radius:22px;padding:12px 16px;display:flex;align-items:center;gap:12px;box-sizing:border-box;animation-delay:.4s;flex-shrink:0';
  // when the celebration has to scroll, its buttons stay in view
  const celScrolls = celK < 1 || H < 844;
  L.celBtns = 'width:' + (CW - 36) + 'px;display:flex;flex-direction:column;gap:10px;flex-shrink:0' + (celScrolls ? ';position:sticky;bottom:0;z-index:2;padding-top:14px;background:linear-gradient(180deg,rgba(255,251,243,0),#FFFBF3 24px)' : '');
  // campus celebration background: the map's campus corner. Height-driven as designed (150% of the frame);
  // on frames wider in proportion than the design it follows the width instead, so the crop stays the same
  const bgByHeight = 1.5 * H * MAP_SIZE.w / MAP_SIZE.h, bgByWidth = W * (1.5 * 844 * MAP_SIZE.w / MAP_SIZE.h / 390);
  L.campusBg = 'position:absolute;left:0;top:0;width:100%;height:100%;background-size:' + (bgByWidth > bgByHeight + 0.5 ? Math.round(bgByWidth) + 'px auto' : 'auto 150%') + ';background-position:88% 12%';

  // feedback overlays
  L.banner = 'position:absolute;left:' + (X0 + 14) + 'px;right:' + (X0 + 14) + 'px;top:96px;z-index:50;display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:20px;background:linear-gradient(135deg,#10B981,#047857);box-shadow:0 10px 26px rgba(4,120,87,.4)';
  L.mini = 'position:absolute;right:' + (X0 + 14) + 'px;top:92px;z-index:50;display:flex;align-items:center;gap:6px;background:#0F172A;border-radius:999px;padding:6px 14px 6px 10px;box-shadow:0 6px 16px rgba(15,23,42,.3)';
  // step-complete toast and countdown: Asha centred on the screen, narrower on small phones
  const toastW = Math.min(300, Math.round(W * 0.77)), countW = Math.min(330, Math.round(W * 0.846));
  L.toastAsha = 'position:absolute;left:' + (Math.round((W - toastW) / 2) + 25) + 'px;bottom:-40px;width:' + toastW + 'px;height:auto';
  L.countAsha = 'position:absolute;left:' + Math.round((W - countW) / 2) + 'px;bottom:-30px;width:' + countW + 'px;height:auto';
  L.sheet = 'width:' + CW + 'px;box-sizing:border-box;background:#FFFFFF;border-radius:30px 30px 0 0;padding:0 20px 22px;display:flex;flex-direction:column;align-items:center;gap:10px';
  L.qText = DISPLAY + 'font-size:22px;line-height:1.25;color:#0F172A';
  return L;
}
