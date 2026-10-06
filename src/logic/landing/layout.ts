// About pages layout: the per-device blocks plus the parts shared by both (pages 4 and 5 lists, tags).
import type { Frame } from '../frame';
import { FONT_DISPLAY as disp, FONT_MONO, type Layout } from '../styles';
import { landingLayoutPhone } from './layoutPhone';
import { landingLayoutDesktop } from './layoutDesktop';
import { clamp, DESIGN } from '../frame';

/**
 * PC: the About pages are composed as one picture (headline beside Asha, cards against the art), so the page
 * content scales as a whole to fit the screen, centred; backgrounds, leaves and the bird stay full-bleed.
 * At 1440x900 nothing is added.
 */
function desktopFit(f: Frame, hasSheet: boolean): Layout {
  const { w, h } = DESIGN.desktop;
  const s = clamp(Math.min(f.W / w, f.H / h), 0.6, 1.25);
  const left = Math.round((f.W - w * s) / 2), top = Math.round((f.H - h * s) / 2);
  if (s === 1 && left === 0 && top === 0) return { content: '' };
  // stacking: above the bird and back leaves (z 9/5), below front leaves (z 16) unless the course sheet is open
  return {
    content: `position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;transform:scale(${Math.round(s * 10000) / 10000});transform-origin:0 0;z-index:${hasSheet ? 41 : 9}`,
    // the course sheet's backdrop still covers the whole screen (in the scaled box's coordinates)
    scrim: `position:absolute;left:${-left / s}px;top:${-top / s}px;width:${f.W / s}px;height:${f.H / s}px;z-index:40;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center`,
  };
}

export function landingLayout(D: boolean, f: Frame, page: number, hasSheet: boolean): Layout {
  const { X0, CW, col } = f;
  // page 1's heading and Asha fade out on the other pages
  const hide = page > 1 ? 'opacity:0;pointer-events:none;' : 'opacity:1;';
  const stamp = 'align-self:' + (D ? 'flex-start' : 'center') + ';display:flex;align-items:center;gap:8px;padding:' + (D ? '10px 22px' : '8px 16px') + ';border-radius:999px;background:#FFFFFF;border:2.5px dashed #E91E63;color:#BE185D;' + FONT_MONO + 'font-weight:700;letter-spacing:.14em;box-shadow:0 8px 22px rgba(233,30,99,.22);font-size:' + (D ? 16 : 13) + 'px';
  const L = D ? landingLayoutDesktop(hide, stamp) : landingLayoutPhone(f, hide, stamp);
  if (D) Object.assign(L, desktopFit(f, hasSheet));

  L.stampInner = 'flex-grow:1;border-radius:999px;border:1px dashed #86C79B;display:flex;align-items:center;justify-content:center;color:#15803D;' + FONT_MONO + 'font-weight:700;letter-spacing:.04em;line-height:1;font-size:' + (D ? 11 : 10) + 'px';

  // page 4: campuses
  L.c4head = D ? 'position:absolute;left:90px;top:88px;width:1260px;z-index:10' : 'position:absolute;left:' + (X0 + 18) + 'px;top:66px;width:' + (CW - 36) + 'px;z-index:10';
  L.c4h = 'margin:0;display:flex;' + (D ? 'flex-direction:row;align-items:baseline;gap:14px' : 'flex-direction:column');
  L.c4h1 = disp + 'font-size:' + (D ? 40 : 24) + 'px;line-height:1.15;color:#0F172A';
  L.c4h2 = disp + 'font-size:' + (D ? 40 : 24) + 'px;line-height:1.15;color:#E91E63';
  L.campList = D ? 'position:absolute;left:90px;top:156px;width:1260px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;z-index:10'
    : col(130, 98) + 'box-sizing:border-box;padding:4px 18px 16px;overflow-y:auto;scrollbar-width:none;display:flex;flex-direction:column;gap:16px;z-index:10';
  L.c4cta = D ? 'position:absolute;left:760px;top:798px;width:590px;display:flex;gap:14px;z-index:12;animation-delay:.6s' : L.cta3Wrap;
  L.campCard = 'display:flex;flex-direction:column;flex-shrink:0;border-radius:20px;overflow:hidden;background:#FFFFFF;border:1px solid #F1E7D6;box-shadow:0 8px 24px rgba(15,23,42,.08)';
  L.campPhoto = 'display:block;width:100%;height:' + (D ? 144 : 168) + 'px;object-fit:cover;flex-shrink:0;background:#E2E8F0';
  L.campBody = 'display:flex;flex-direction:column;gap:8px;box-sizing:border-box;padding:' + (D ? '14px 18px 16px' : '12px 16px 14px');
  L.campName = disp + 'font-size:' + (D ? 22 : 20) + 'px;line-height:1.15;color:#0F172A';
  L.campMeta = 'font-size:' + (D ? 15 : 14) + 'px;font-weight:600;line-height:1.35;color:#475569';
  L.campNote = 'display:flex;align-items:flex-start;gap:8px;padding:8px 10px;border-radius:14px;background:#FFF7ED;border:1.5px solid #FED7AA;color:#9A3412;font-weight:700;line-height:1.25;font-size:13px';

  // page 5: success stories
  L.alCard = L.campCard + ';box-sizing:border-box;gap:12px;margin-right:' + (D ? 20 : 14) + 'px;width:' + (D ? 400 : 322) + 'px;padding:' + (D ? '18px 20px' : '16px');
  L.s5 = D ? 'position:absolute;left:0;top:150px;width:1440px;z-index:10' : col(130, 98) + 'box-sizing:border-box;padding-bottom:16px;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;z-index:10';
  L.alWrap = 'width:100%;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;display:flex;flex-direction:column;gap:' + (D ? 0 : 2) + 'px';
  L.alRow = 'padding:6px 0 16px';
  L.alLogo = 'width:22px;height:22px;flex-shrink:0;box-sizing:border-box;border-radius:6px;border:1.5px dashed #94A3B8;background:#F8FAFC';
  L.alCompany = 'font-size:14px;font-weight:700;line-height:1.3;color:#475569';
  L.alSalary = 'align-self:flex-start;flex-shrink:0;font-size:12.5px;font-weight:800;line-height:1.3;padding:4px 10px;border-radius:999px;white-space:nowrap;background:#D1FAE5;color:#047857';
  L.alTimeline = 'display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:#FFF7ED';
  L.alLabel = 'font-size:12px;font-weight:700;line-height:1.3;color:#64748B';
  L.alValue = 'font-size:14px;font-weight:800;line-height:1.3;color:#0F172A';
  L.alQuote2 = 'margin:0;font-size:' + (D ? 17 : 16) + 'px;font-weight:500;font-style:italic;line-height:1.45;color:#334155';
  L.alQuote = 'margin:0;font-size:14px;font-weight:500;font-style:italic;line-height:1.4;color:#475569';
  L.alAvatar = 'width:56px;height:56px;flex-shrink:0;border-radius:999px;object-fit:cover;object-position:50% 20%;background:#E2E8F0';
  L.coHead = disp + 'line-height:1.2;color:#0F172A;' + (D ? 'margin:30px 90px 14px;font-size:28px' : 'margin:28px 18px 12px;font-size:19px');
  L.coGrid = 'display:grid;' + (D ? 'margin:0 90px;grid-template-columns:repeat(8,minmax(0,1fr));gap:12px' : 'margin:0 18px;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px');
  L.coTile = 'display:flex;align-items:center;gap:9px;box-sizing:border-box;min-width:0;padding:' + (D ? '10px 12px' : '9px 10px') + ';border-radius:16px;background:#FFFFFF;border:1px solid #F1E7D6;box-shadow:0 4px 14px rgba(15,23,42,.06)';
  L.coName = 'min-width:0;font-weight:800;line-height:1.2;color:#0F172A;font-size:14px';
  return L;
}
