// Journey, desktop layout (designed at 1440x900): HUD across the top, Asha's stage on the left, the step
// panel as a glass card on the right.
// Responsive: content sits in a box up to 1440px wide, centred (frame.ts: DX, DW). The panel keeps its width
// (narrowing a little on small laptops) and is anchored right; the stage takes the rest, and only Asha's
// illustration scales down (k) when the stage is smaller than designed. Heights follow the frame.
import { clamp, shrinkBox, type Frame } from '../frame';
import { MAP_SIZE } from '../geometry';
import type { Layout } from '../styles';
import type { Ctx } from './context';

/** Asha stands fully on screen in the toast and countdown (the design cropped her at the knees; changed on request). */
const ASHA_FOOT = 8;
const DISPLAY = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;";
const HUD_H = 80;
/** design stage size (left of the panel) */
const STAGE = { w: 860, h: 820 };
/** celebration art cluster and the fixed-height parts around it, at the design size */
const CEL_ART = { w: 640, h: 400 }, CEL_REST = 420;

/** Panel width: 530 as designed, down to 460 on small laptops. */
export const panelWidth = (DW: number) => clamp(Math.round(DW * 0.368), 460, 530);

export function journeyLayoutDesktop(c: Ctx): Layout {
  const { H, DX, DW } = c.f;
  const L: Layout = {};
  const panelW = panelWidth(DW);
  const panelL = DX + DW - 30 - panelW;
  const stageW = panelL - DX - 20;
  const stageH = H - HUD_H;
  // Asha's illustration scale (never the bubble text)
  const k = clamp(Math.min(stageW / STAGE.w, stageH / STAGE.h), 0.5, 1);
  const px = (n: number) => Math.round(n * k) + 'px';

  L.hud = 'position:absolute;left:0;top:0;width:100%;height:80px;z-index:45;padding:0 ' + (DX + 28) + 'px;box-sizing:border-box;display:flex;align-items:center;background:rgba(255,251,243,.9);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(251,207,232,.7)';
  L.hudRow = 'display:flex;align-items:center;gap:14px;width:100%';
  L.logo = 'height:30px;width:auto';
  L.track = 'position:relative;height:56px;width:' + trackWidthDesktop(DW) + 'px;flex-shrink:0';

  L.stage = 'position:absolute;left:' + DX + 'px;top:80px;width:' + stageW + 'px;height:' + stageH + 'px;z-index:10';
  L.ashaWrap = 'position:absolute;left:' + px(60) + ';bottom:' + px(-4) + ';width:' + px(600);
  L.asha = 'width:100%;height:auto;display:block';
  L.disc = 'position:absolute;left:' + px(170) + ';bottom:0;width:' + px(380) + ';height:' + px(50) + ';border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.5),rgba(236,72,153,0) 70%)';
  const bubbleL = Math.round(470 * k);
  L.bubble = 'position:absolute;left:' + bubbleL + 'px;top:70px;width:' + clamp(stageW - bubbleL - 20, 260, 360) + 'px;border-radius:30px 30px 30px 8px;padding:20px 22px;display:flex;flex-direction:column;gap:10px;box-sizing:border-box';
  L.askStyle = DISPLAY + 'font-size:32px;line-height:1.12;color:#0F172A';
  L.subStyle = 'font-size:18px;font-weight:600;color:#475569;line-height:1.35';
  L.tw1 = 'position:absolute;left:' + px(120) + ';top:' + px(330) + ';transform:scale(1.6)';
  L.tw2 = 'position:absolute;left:' + px(600) + ';top:' + px(520) + ';animation-delay:.6s';
  L.zzz = 'position:absolute;left:' + px(430) + ';top:' + px(300) + ';transform:scale(1.6)';
  L.tourAshaBox = 'width:150px;height:190px;flex-shrink:0;border-radius:26px;overflow:hidden;background:linear-gradient(160deg,#FCE7F3,#FEF3C7);border:3px solid #F9A8D4';
  L.tourAsha = 'width:300px;height:auto;margin-left:-78px;margin-top:0';
  L.tourText = DISPLAY + 'font-size:26px;line-height:1.2;color:#0F172A';

  L.panel = 'position:absolute;left:' + panelL + 'px;top:108px;width:' + panelW + 'px;height:' + (H - 136) + 'px;box-sizing:border-box;padding:26px 30px;border-radius:34px;display:flex;flex-direction:column;gap:14px;z-index:10';
  L.panelCls = 'glass';
  L.overlay = 'position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(90deg,rgba(255,251,243,.05) 0%,rgba(255,251,243,.12) 48%,rgba(255,247,237,.7) 62%,rgba(255,251,243,.9) 100%)';
  L.bird = 'position:absolute;left:0;top:190px;z-index:3';

  const mb = desktopMapBox(c.f);
  L.mapTitle = 'position:absolute;left:' + (DX + 34) + 'px;top:100px;font-size:34px;z-index:10';
  L.mapBox = 'position:absolute;left:' + (DX + 24) + 'px;top:156px;width:' + mb.w + 'px;height:' + mb.h + 'px;border-radius:30px;overflow:hidden;box-shadow:0 18px 44px rgba(120,53,15,.3),inset 0 0 0 3px rgba(180,120,60,.35);background:#EAD7AE;z-index:10';
  L.mapScroll = 'width:' + mb.w + 'px;height:' + mb.h + 'px;overflow:hidden';

  // celebrations: centred in the content box; the art cluster shrinks only on short screens
  const celK = clamp((H - HUD_H - CEL_REST) / CEL_ART.h, 0.55, 1);
  L.cel = 'position:absolute;left:' + DX + 'px;top:80px;width:' + DW + 'px;height:' + (H - HUD_H) + 'px;z-index:12;display:flex;flex-direction:column;align-items:center;padding:14px 0 30px;box-sizing:border-box' + (celK < 1 ? ';overflow-y:auto;scrollbar-width:none' : '');
  L.celTitle = 'margin-top:8px;' + DISPLAY + 'font-size:48px;color:#0F172A;text-align:center;line-height:1.05';
  L.celStage = 'position:relative;width:640px;height:400px;margin-top:0' + shrinkBox(CEL_ART.w, CEL_ART.h, celK);
  L.celRays = 'position:absolute;left:70px;top:-60px;width:500px;height:500px';
  L.celAsha = 'position:absolute;left:140px;top:0;width:460px;height:auto';
  L.celBadge = 'position:absolute;left:40px;top:180px;width:176px;height:200px';
  L.celCard = 'margin-top:0;width:520px;border-radius:24px;padding:14px 20px;display:flex;align-items:center;gap:14px;box-sizing:border-box;animation-delay:.4s';
  L.celBtns = 'width:520px;display:flex;flex-direction:row;gap:12px';
  L.campusBg = 'position:absolute;left:0;top:0;width:100%;height:100%;background-size:cover;background-position:95% 20%';

  L.banner = 'position:absolute;left:' + panelL + 'px;width:' + panelW + 'px;top:96px;z-index:50;box-sizing:border-box;display:flex;align-items:center;gap:10px;padding:14px 20px;border-radius:22px;background:linear-gradient(135deg,#10B981,#047857);box-shadow:0 10px 26px rgba(4,120,87,.4)';
  L.mini = 'position:absolute;right:' + (DX + 90) + 'px;top:84px;z-index:50;display:flex;align-items:center;gap:6px;background:#0F172A;border-radius:999px;padding:6px 14px 6px 10px;box-shadow:0 6px 16px rgba(15,23,42,.3)';
  L.toastAsha = 'position:absolute;left:' + (DX + 120) + 'px;bottom:' + ASHA_FOOT + 'px;width:460px;height:auto';
  L.countAsha = 'position:absolute;left:' + (DX + 100) + 'px;bottom:' + ASHA_FOOT + 'px;width:480px;height:auto';
  L.sheet = 'width:520px;margin-bottom:170px;box-sizing:border-box;background:#FFFFFF;border-radius:32px;padding:0 28px 26px;display:flex;flex-direction:column;align-items:center;gap:12px';
  L.qText = DISPLAY + 'font-size:26px;line-height:1.25;color:#0F172A';
  return L;
}

/** Map card on the stage: 820x477 as designed; fits the stage width, and the height left below the title. */
export function desktopMapBox(f: Frame) {
  const stageW = f.DX + f.DW - 30 - panelWidth(f.DW) - f.DX - 20;
  let w = stageW - 40;
  let h = Math.round((w * MAP_SIZE.h) / MAP_SIZE.w);
  const maxH = f.H - 156 - 30;
  if (h > maxH) { h = maxH; w = Math.round((h * MAP_SIZE.w) / MAP_SIZE.h); }
  return { w, h };
}

/** HUD progress trail: 620px as designed, narrower when the content box is small. */
export const trackWidthDesktop = (DW: number) => clamp(DW - 420, 420, 620);
