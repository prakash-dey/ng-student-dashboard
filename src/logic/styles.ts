// Style fragments shared across screens (exact strings from the design).
export const FONT_DISPLAY = "font-family:'Baloo 2','Noto Sans Devanagari',sans-serif;font-weight:800;";
export const FONT_BODY = "font-family:'Plus Jakarta Sans','Noto Sans Devanagari',sans-serif;";
export const FONT_MONO = "font-family:'JetBrains Mono','Noto Sans Devanagari',monospace;";
/** Layout values for one screen: style strings, plus a few numbers (e.g. Fit heights). */
export type Layout = Record<string, any>;

/** Type scale roles (CSS variables in src/styles.css; fluid on phone, fixed on PC). Use these, not px. */
export const FS = {
  hero: 'var(--fs-hero)', display: 'var(--fs-display)', heading: 'var(--fs-heading)', button: 'var(--fs-button)',
  title: 'var(--fs-title)', input: 'var(--fs-input)', label: 'var(--fs-label)', buttonSm: 'var(--fs-button-sm)',
  bodyL: 'var(--fs-body-l)', body: 'var(--fs-body)', bodyS: 'var(--fs-body-s)', small: 'var(--fs-small)',
  caption: 'var(--fs-caption)', micro: 'var(--fs-micro)',
} as const;
