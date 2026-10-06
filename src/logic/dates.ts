// Date helpers. "Today" comes from Date (fixed to 2026-10-06 in design-test mode, see designTest.ts).
import type { Lang } from '../i18n';

export const DAY = 86400000;
export const localeFor = (lang: Lang) => (lang === 'en' ? 'en-IN' : lang + '-IN');

/** Short month names in the given language. */
export const monthNames = (lang: Lang) =>
  Array.from({ length: 12 }, (_, i) => new Date(2000, i, 1).toLocaleDateString(localeFor(lang), { month: 'short' }));

/** Midnight today. */
export function today0() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** The 7 bookable interview days, starting tomorrow. */
export const bookableDays = () => Array.from({ length: 7 }, (_, i) => new Date(today0().getTime() + (i + 1) * DAY));

/** Joining date: three weeks from today. */
export const joinDay = () => new Date(today0().getTime() + 21 * DAY);

export const fmtTime = (locale: string, h: number, m: number) =>
  new Date(2000, 0, 1, h, m).toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });

export const pad2 = (n: number) => String(n).padStart(2, '0');

/** "Thursday 8 October": weekday, day and month as the design shows them, without the comma some
 *  browsers' locale data adds after the weekday. */
export const longDate = (locale: string, d: Date) =>
  new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' })
    .formatToParts(d)
    .map((p) => (p.type === 'literal' ? p.value.replace(/,\s*/g, ' ') : p.value))
    .join('')
    .replace(/\s+/g, ' ');
