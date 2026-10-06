// Journey, desktop layout (designed at 1440x900): HUD across the top, Asha's stage on the left, the step
// panel as a glass card on the right.
import type { Layout } from '../styles';

export function journeyLayoutDesktop(): Layout {
  const L: Layout = {};
  L.hud = 'position:absolute;left:0;top:0;width:1440px;height:80px;z-index:45;padding:0 28px;box-sizing:border-box;display:flex;align-items:center;background:rgba(255,251,243,.9);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(251,207,232,.7)';
  L.hudRow = 'display:flex;align-items:center;gap:14px;width:100%';
  L.logo = 'height:30px;width:auto';
  L.track = 'position:relative;height:56px;width:620px';
  L.stage = 'position:absolute;left:0;top:80px;width:860px;height:820px;z-index:10';
  L.ashaWrap = 'position:absolute;left:60px;bottom:-4px;width:600px';
  L.asha = 'width:100%;height:auto;display:block';
  L.tourAshaBox = 'width:150px;height:190px;flex-shrink:0;border-radius:26px;overflow:hidden;background:linear-gradient(160deg,#FCE7F3,#FEF3C7);border:3px solid #F9A8D4';
  L.tourAsha = 'width:300px;height:auto;margin-left:-78px;margin-top:0';
  L.tourText = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:26px;line-height:1.2;color:#0F172A";
  L.disc = 'position:absolute;left:170px;bottom:0;width:380px;height:50px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.5),rgba(236,72,153,0) 70%)';
  L.bubble = 'position:absolute;left:470px;top:70px;width:360px;border-radius:30px 30px 30px 8px;padding:20px 22px;display:flex;flex-direction:column;gap:10px;box-sizing:border-box';
  L.askStyle = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:32px;line-height:1.12;color:#0F172A";
  L.subStyle = 'font-size:18px;font-weight:600;color:#475569;line-height:1.35';
  L.tw1 = 'position:absolute;left:120px;top:330px;transform:scale(1.6)'; L.tw2 = 'position:absolute;left:600px;top:520px;animation-delay:.6s';
  L.zzz = 'position:absolute;left:430px;top:300px;transform:scale(1.6)';
  L.panel = 'position:absolute;left:880px;top:108px;width:530px;height:764px;box-sizing:border-box;padding:26px 30px;border-radius:34px;display:flex;flex-direction:column;gap:14px;z-index:10';
  L.panelCls = 'glass';
  L.overlay = 'position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(90deg,rgba(255,251,243,.05) 0%,rgba(255,251,243,.12) 48%,rgba(255,247,237,.7) 62%,rgba(255,251,243,.9) 100%)';
  L.bird = 'position:absolute;left:0;top:190px;z-index:3';
  L.mapTitle = "position:absolute;left:34px;top:100px;font-size:34px;z-index:10";
  L.mapBox = 'position:absolute;left:24px;top:156px;width:820px;height:477px;border-radius:30px;overflow:hidden;box-shadow:0 18px 44px rgba(120,53,15,.3),inset 0 0 0 3px rgba(180,120,60,.35);background:#EAD7AE;z-index:10';
  L.mapScroll = 'width:820px;height:477px;overflow:hidden';
  L.cel = 'position:absolute;left:0;top:80px;width:1440px;height:820px;z-index:12;display:flex;flex-direction:column;align-items:center;padding:14px 0 30px;box-sizing:border-box';
  L.celTitle = "margin-top:8px;font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:48px;color:#0F172A;text-align:center;line-height:1.05";
  L.celStage = 'position:relative;width:640px;height:400px;margin-top:0';
  L.celRays = 'position:absolute;left:70px;top:-60px;width:500px;height:500px';
  L.celAsha = 'position:absolute;left:140px;top:0;width:460px;height:auto';
  L.celBadge = 'position:absolute;left:40px;top:180px;width:176px;height:200px';
  L.celCard = 'margin-top:0;width:520px;border-radius:24px;padding:14px 20px;display:flex;align-items:center;gap:14px;box-sizing:border-box;animation-delay:.4s';
  L.celBtns = 'width:520px;display:flex;flex-direction:row;gap:12px';
  L.campusBg = 'position:absolute;left:0;top:0;width:100%;height:100%;background-size:cover;background-position:95% 20%';
  L.banner = 'position:absolute;left:880px;width:530px;top:96px;z-index:50;box-sizing:border-box;display:flex;align-items:center;gap:10px;padding:14px 20px;border-radius:22px;background:linear-gradient(135deg,#10B981,#047857);box-shadow:0 10px 26px rgba(4,120,87,.4)';
  L.mini = 'position:absolute;right:90px;top:84px;z-index:50;display:flex;align-items:center;gap:6px;background:#0F172A;border-radius:999px;padding:6px 14px 6px 10px;box-shadow:0 6px 16px rgba(15,23,42,.3)';
  L.toastAsha = 'position:absolute;left:120px;bottom:-60px;width:460px;height:auto';
  L.countAsha = 'position:absolute;left:100px;bottom:-60px;width:480px;height:auto';
  L.sheet = 'width:520px;margin-bottom:170px;box-sizing:border-box;background:#FFFFFF;border-radius:32px;padding:0 28px 26px;display:flex;flex-direction:column;align-items:center;gap:12px';
  L.qText = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:26px;line-height:1.25;color:#0F172A";
  return L;
}
