// Falling leaves on the journey background and confetti on celebrations.
import { leaves } from '../common';
import type { Ctx } from './context';

const LEAF_COLORS = ['#10B981', '#34D399', '#059669', '#F59E0B', '#FBBF24', '#86EFAC', '#D97706'];
const CONFETTI_COLORS = ['#F59E0B', '#EC4899', '#10B981', '#0EA5E9', '#FBBF24', '#A855F7', '#F43F5E'];

export function effectsVals(c: Ctx) {
  const { D } = c, W = c.f.W;
  const confetti = Array.from({ length: D ? 60 : 30 }, (_, i) => {
    const w = i % 3 === 0 ? 12 : 8, h = i % 3 === 0 ? 7 : 13;
    return { style: 'left:' + ((i * 37) % (W - 4)) + 'px;width:' + w + 'px;height:' + h + 'px;border-radius:' + (i % 4 === 0 ? '50%' : '2px') + ';background:' + CONFETTI_COLORS[i % 7] + ';animation-duration:' + (2.4 + (i % 5) * 0.45).toFixed(2) + 's;animation-delay:-' + ((i * 0.29) % 3).toFixed(2) + 's;z-index:25' };
  });
  return { leaves: leaves(D ? 20 : 14, LEAF_COLORS, W, 35), confetti };
}
