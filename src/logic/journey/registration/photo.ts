// Registration: profile photo.
import type { Ctx } from '../context';

const TIP_ICONS = [
  'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6',
  'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z',
  'M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5M12 8a4 4 0 100 8 4 4 0 000-8z',
];

export function photoVals(c: Ctx) {
  const { s, t, D } = c, ph = s.photo;
  const ring = ph === 'done' ? 'conic-gradient(#10B981,#34D399,#10B981)' : ph === 'scan' ? 'conic-gradient(#22D3EE,#E0F2FE,#22D3EE)' : 'repeating-conic-gradient(#F9A8D4 0 10deg,#FFFFFF 10deg 20deg)';
  return {
    photoUi: {
      frame: 'position:relative;width:' + (D ? 200 : 170) + 'px;height:' + (D ? 200 : 170) + 'px;border-radius:999px;padding:6px;box-sizing:border-box;background:' + ring + ';overflow:hidden',
      bg: ph === 'done' ? '#D1FAE5' : '#FDF2F8', fg: ph === 'done' ? '#34D399' : ph === 'scan' ? '#67E8F9' : '#F9A8D4',
      scanning: ph === 'scan', done: ph === 'done',
      status: ph === 'done' ? t.photoAdded : t.noPhoto,
      statusStyle: "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;font-size:20px;color:" + (ph === 'done' ? '#047857' : ph === 'scan' ? '#0E7490' : '#94A3B8'),
    },
    photoTips: [t.onlyYou, t.faceClear, t.goodLight].map((label, k) => ({ label, d: TIP_ICONS[k] })),
    takePhoto: () => c.set({ photo: 'done' }),
  };
}
