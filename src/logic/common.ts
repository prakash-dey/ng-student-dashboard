// Pieces used by both the About pages and the journey.
import type { Lang } from '../i18n';

/** Falling leaves: deterministic positions/timings spread across the frame width. */
export function leaves(count: number, colors: string[], W: number, zFront: number) {
  return Array.from({ length: count }, (_, i) => ({
    size: 14 + (i * 7) % 16,
    color: colors[i % colors.length],
    style: 'left:' + ((i * 61) % (W - 10)) + 'px;z-index:' + (i % 3 === 0 ? zFront : 5) + ';animation-duration:' + (9 + (i * 13) % 9) + 's;animation-delay:-' + ((i * 1.7) % 11).toFixed(1) + 's',
  }));
}

const LANGS: [Lang, string, string][] = [['en', 'EN', 'English'], ['hi', 'हिं', 'Hindi'], ['mr', 'मरा', 'Marathi']];

/** EN / हिं / मरा switch in the top bar. `size` = [min-width, height, horizontal padding, font size]. */
export function langChips(current: Lang, pick: (lang: Lang) => void, size: [number, number, number, number], activeShadow: string) {
  const [minW, h, padX, font] = size;
  return LANGS.map(([code, label, aria]) => {
    const on = code === current;
    return {
      label, aria, pick: () => pick(code),
      style: 'border:none;border-radius:999px;min-width:' + minW + 'px;height:' + h + 'px;padding:0 ' + padX + 'px;cursor:pointer;font-weight:800;font-size:' + font + 'px;' +
        (on ? 'background:linear-gradient(135deg,#EC4899,#BE185D);color:#FFFFFF;' + activeShadow : 'background:transparent;color:#BE185D;'),
    };
  });
}
