// About pages, phone layout. Designed at 390x844: content sits in the frame's column (18px gutters), bottom
// buttons are anchored to the bottom edge, and Asha takes whatever height is left (see frame.ts, ui/Fit.tsx).
import type { Frame } from '../frame';
import { FONT_DISPLAY as disp, type Layout } from '../styles';

export function landingLayoutPhone(f: Frame, hide: string, stamp: string): Layout {
  const { W, H, CW, X0, scrollCol } = f;
  const L: Layout = {};
  L.bg = 'position:absolute;left:0;top:0;width:100%;height:100%;background-position:38% 50%';
  L.overlay = 'position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(180deg,rgba(255,251,243,.96) 0%,rgba(255,251,243,.9) 26%,rgba(255,251,243,.35) 44%,rgba(255,251,243,.1) 62%,rgba(255,251,243,.75) 86%,rgba(255,251,243,.95) 100%)';
  // top bar: full width, content aligned to the column (equal gutters both ends)
  L.bar = 'position:absolute;left:0;top:0;width:' + W + 'px;box-sizing:border-box;padding:12px ' + (X0 + 14) + 'px;display:flex;align-items:center;gap:8px;z-index:20';
  L.logo = 'height:26px;width:auto;min-width:0;flex-shrink:1;object-fit:contain;object-position:left center'; // only the logo gives way on very narrow screens
  // page 1: heading and Asha share one column between the top bar and the CTA; Asha takes what is left
  L.p1Stack = 'position:absolute;left:' + X0 + 'px;width:' + CW + 'px;top:78px;bottom:144px;display:flex;flex-direction:column;z-index:10;pointer-events:none';
  L.head = 'position:relative;margin:0 18px;flex-shrink:0;display:flex;flex-direction:column;gap:14px;' + hide;
  L.stamp = stamp;
  L.h1 = disp + 'font-size:31px;line-height:1.12;color:#0F172A;text-align:center';
  L.h2 = disp + 'font-size:31px;line-height:1.12;color:#E91E63;text-align:center';
  L.ashaZone = 'position:relative;flex:1 1 0;min-height:0;' + hide;
  L.ashaFitH = 330; L.ashaFitOrigin = '30% 100%';
  L.bubbleBox = 'position:absolute;left:0;right:0;bottom:0;height:min(330px,100%)';
  L.walker = 'position:absolute;left:36px;top:60px;width:132px;height:250px';
  L.asha = 'position:absolute;left:-22px;top:56px;width:300px;height:auto';
  L.disc = 'position:absolute;left:44px;top:288px;width:170px;height:28px;border-radius:50%;background:radial-gradient(ellipse,rgba(236,72,153,.5),rgba(236,72,153,0) 70%)';
  L.bubble = 'position:absolute;right:14px;top:0;width:' + Math.min(214, CW - 154) + 'px;box-sizing:border-box;padding:14px 16px;border-radius:24px 24px 24px 6px;background:rgba(255,255,255,.94);border:1.5px solid #FFFFFF;box-shadow:0 10px 30px rgba(190,24,93,.18)';
  L.bubbleText = disp + 'font-size:19px;line-height:1.22;color:#0F172A';
  L.tw = 'position:absolute;left:26px;top:70px';
  L.ctaPos = 'position:absolute;left:' + (X0 + 20) + 'px;width:' + (CW - 44) + 'px;bottom:34px';
  L.cta = "width:100%;height:68px;border:none;border-radius:999px;color:#FFFFFF;" + disp + 'font-size:25px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px';
  L.birdPos = 'position:absolute;left:0;top:268px;z-index:9';
  // page 2: header box keeps the designed 116px to the cards (more only if the header needs it), Asha takes the rest
  L.p2stack = scrollCol(70, 98);
  L.p2headBox = 'flex-shrink:0;box-sizing:border-box;min-height:116px;padding:0 18px 10px';
  L.p2head = 'display:flex;align-items:center;gap:14px';
  L.fee = 'width:92px;height:92px;flex-shrink:0;border-radius:999px;border:4px dashed #E91E63;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(233,30,99,.2)';
  L.feeSmall = "font-family:'JetBrains Mono','Noto Sans Devanagari',monospace;font-weight:700;letter-spacing:.14em;color:#BE185D;font-size:11px"; L.feeBig = disp + 'line-height:1;color:#E91E63;font-size:36px';
  L.p2h1 = disp + 'font-size:24px;line-height:1.15;color:#0F172A';
  L.p2h2 = disp + 'font-size:24px;line-height:1.15;color:#E91E63';
  L.cards = 'flex-shrink:0;margin:0 18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;z-index:10';
  L.icon = 'font-size:44px;line-height:1.15'; L.thali = 'width:52px;height:52px';
  L.cardLabel = disp + 'font-size:19px;line-height:1.1;color:#0F172A;text-align:center';
  L.asha2Zone = 'position:relative;flex:1 0 110px'; L.asha2ZoneFitH = 150;
  L.asha2 = 'position:absolute;left:-8px;top:0;width:176px;height:auto';
  L.bubble2 = 'position:absolute;left:150px;right:16px;top:26px;box-sizing:border-box;padding:12px 14px;border-radius:22px 22px 22px 6px;background:rgba(255,255,255,.95);border:1.5px solid #FFFFFF;box-shadow:0 10px 26px rgba(190,24,93,.16)';
  L.bubble2Text = disp + 'font-size:18px;line-height:1.2;color:#0F172A';
  L.cta2Wrap = 'position:absolute;left:' + (X0 + 18) + 'px;bottom:22px;width:' + (CW - 36) + 'px;display:flex;gap:10px;z-index:12;animation-delay:1.4s';
  L.p3stack = scrollCol(66, 92);
  L.p3headBox = 'flex-shrink:0;box-sizing:border-box;min-height:110px;padding:0 18px 10px';
  L.p3head = 'display:flex;flex-direction:column;gap:8px';
  L.commonChip = 'font-size:12px;font-weight:800;padding:3px 10px;border-radius:999px;background:#FFFFFF;border:1.5px solid #FBCFE8;color:#9D174D';
  L.courseGrid = 'flex-shrink:0;margin:0 18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;z-index:10';
  L.courseName = disp + 'font-size:20px;line-height:1.1;color:#0F172A;text-align:center';
  L.miniChip = 'display:flex;align-items:center;gap:3px;font-size:11.5px;font-weight:800;padding:2px 7px;border-radius:999px;background:#F1F5F9;color:#334155;white-space:nowrap';
  L.asha3Zone = 'position:relative;flex:1 0 110px'; L.asha3ZoneFitH = 140;
  L.cta3Wrap = 'position:absolute;left:' + (X0 + 18) + 'px;bottom:22px;width:' + (CW - 36) + 'px;display:flex;gap:10px;z-index:12;animation-delay:.9s';
  L.scrim = 'position:absolute;left:0;top:0;width:100%;height:100%;z-index:40;background:rgba(15,23,42,.55);display:flex;align-items:flex-end;justify-content:center';
  L.sheet = 'width:' + CW + 'px;max-height:' + Math.min(760, H - 40) + 'px;overflow-y:auto;scrollbar-width:none;box-sizing:border-box;background:#FFFFFF;border-radius:30px 30px 0 0;padding:18px 18px 20px;display:flex;flex-direction:column;gap:12px';
  L.factChip = 'display:flex;align-items:center;gap:5px;font-size:13px;font-weight:800;padding:4px 10px;border-radius:999px;background:#FFF7ED;border:1.5px solid #FED7AA;color:#9A3412';
  L.backBtn = "height:66px;padding:0 20px;border-radius:999px;border:2px solid #E2E8F0;background:#FFFFFF;color:#334155;" + disp + 'font-size:18px;cursor:pointer';
  L.cta2 = "flex-grow:1;height:66px;border:none;border-radius:999px;color:#FFFFFF;" + disp + 'font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px';
  return L;
}
