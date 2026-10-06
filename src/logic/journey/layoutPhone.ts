// Journey, phone layout (designed at 390x844): HUD on top, Asha's stage below it, then the step panel down to
// the bottom edge. `compact` screens give Asha a smaller stage so the panel has more room.
import type { Layout } from '../styles';
import type { Ctx } from './context';

export function journeyLayoutPhone(c: Ctx, compact: boolean): Layout {
  const { s, sc } = c, H = c.f.H;
  const L: Layout = {};
  const stTop = 92, stH = compact ? 150 : 226;
  const pTop = stTop + stH;
  L.hud = 'position:absolute;left:0;top:0;width:390px;z-index:45;padding:10px 14px 6px;box-sizing:border-box;display:flex;flex-direction:column;gap:6px;background:linear-gradient(180deg,rgba(255,251,243,.97) 70%,rgba(255,251,243,0))';
  L.hudRow = 'display:flex;align-items:center;gap:6px';
  L.logo = 'height:22px;width:auto';
  L.track = 'position:relative;height:38px;width:362px';
  L.stage = 'position:absolute;left:0;top:' + stTop + 'px;width:390px;height:' + stH + 'px;z-index:10';
  const big = !compact;
  L.ashaWrap = big ? 'position:absolute;left:-6px;top:0;width:250px' : 'position:absolute;left:-4px;top:8px;width:150px';
  L.asha = 'width:100%;height:auto;display:block';
  L.tourAshaBox = 'width:96px;height:112px;flex-shrink:0;border-radius:22px;overflow:hidden;background:linear-gradient(160deg,#FCE7F3,#FEF3C7);border:2.5px solid #F9A8D4';
  L.tourAsha = 'width:200px;height:auto;margin-left:-52px;margin-top:-2px';
  L.tourText = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:18px;line-height:1.22;color:#0F172A";
  L.disc = big ? 'position:absolute;left:44px;top:192px;width:150px;height:26px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.45),rgba(236,72,153,0) 70%)' : 'position:absolute;left:26px;top:110px;width:92px;height:16px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.45),rgba(236,72,153,0) 70%)';
  L.bubble = (big ? 'position:absolute;right:14px;top:12px;width:166px;' : 'position:absolute;left:146px;right:14px;top:8px;') + 'border-radius:22px 22px 22px 6px;padding:12px;display:flex;flex-direction:column;gap:6px;box-sizing:border-box';
  L.askStyle = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:" + (big ? 20 : 18) + 'px;line-height:1.15;color:#0F172A';
  L.subStyle = 'font-size:14px;font-weight:600;color:#475569;line-height:1.3';
  L.tw1 = 'position:absolute;left:24px;top:28px'; L.tw2 = 'position:absolute;left:' + (big ? 210 : 128) + 'px;top:' + (big ? 170 : 90) + 'px;animation-delay:.6s';
  L.zzz = 'position:absolute;left:112px;top:6px';
  L.panel = 'position:absolute;left:18px;width:354px;top:' + pTop + 'px;height:' + (H - pTop - 18) + 'px;display:flex;flex-direction:column;gap:10px;z-index:10';
  L.panelCls = '';
  L.overlay = 'position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(180deg,rgba(255,251,243,.25) 0%,rgba(255,251,243,.1) 30%,rgba(255,247,237,.55) 50%,rgba(255,251,243,.94) 70%)';
  L.bird = 'position:absolute;left:0;top:150px;z-index:3';
  L.mapTitle = 'position:absolute;left:18px;top:96px;font-size:24px;z-index:10;display:none';
  L.mapBox = 'position:absolute;left:10px;top:100px;width:370px;height:446px;border-radius:26px;overflow:hidden;box-shadow:0 14px 34px rgba(120,53,15,.28),inset 0 0 0 3px rgba(180,120,60,.35);background:#EAD7AE;z-index:10';
  L.mapScroll = 'width:370px;height:446px;overflow-x:auto;overflow-y:hidden';
  if (sc === 'map' || sc === 'tour') L.panel = 'position:absolute;left:12px;width:366px;top:560px;height:268px;box-sizing:border-box;padding:14px;border-radius:26px;display:flex;flex-direction:column;gap:10px;z-index:10', L.panelCls = 'glass';
  if (sc === 'tour' && s.tourStop >= 1 && s.tourStop <= 3) L.panel = L.panel.replace('top:560px;height:268px', s.tourStop === 1 ? 'top:400px;height:428px' : 'top:432px;height:396px');
  L.cel = 'position:absolute;left:0;top:92px;width:390px;height:752px;z-index:12;display:flex;flex-direction:column;align-items:center;padding:0 18px 22px;box-sizing:border-box';
  L.celTitle = "margin-top:8px;font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:30px;color:#0F172A;text-align:center;line-height:1.1";
  L.celStage = 'position:relative;width:354px;height:318px;margin-top:2px';
  L.celRays = 'position:absolute;left:7px;top:-12px;width:340px;height:340px';
  L.celAsha = 'position:absolute;left:30px;top:24px;width:320px;height:auto';
  L.celBadge = 'position:absolute;left:0;top:168px;width:128px;height:146px';
  L.celCard = 'margin-top:-4px;width:354px;border-radius:22px;padding:12px 16px;display:flex;align-items:center;gap:12px;box-sizing:border-box;animation-delay:.4s';
  L.celBtns = 'width:354px;display:flex;flex-direction:column;gap:10px';
  L.campusBg = 'position:absolute;left:0;top:0;width:100%;height:100%;background-size:auto 150%;background-position:88% 12%';
  L.banner = 'position:absolute;left:14px;right:14px;top:96px;z-index:50;display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:20px;background:linear-gradient(135deg,#10B981,#047857);box-shadow:0 10px 26px rgba(4,120,87,.4)';
  L.mini = 'position:absolute;right:14px;top:92px;z-index:50;display:flex;align-items:center;gap:6px;background:#0F172A;border-radius:999px;padding:6px 14px 6px 10px;box-shadow:0 6px 16px rgba(15,23,42,.3)';
  L.toastAsha = 'position:absolute;left:70px;bottom:-40px;width:300px;height:auto';
  L.countAsha = 'position:absolute;left:30px;bottom:-30px;width:330px;height:auto';
  L.sheet = 'width:390px;box-sizing:border-box;background:#FFFFFF;border-radius:30px 30px 0 0;padding:0 20px 22px;display:flex;flex-direction:column;align-items:center;gap:10px';
  L.qText = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:22px;line-height:1.25;color:#0F172A";
  return L;
}
