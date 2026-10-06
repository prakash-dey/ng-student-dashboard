// Registration: date of birth (three dropdowns) and the "you are N years, M months, D days" line.
import { monthNames } from '../../dates';
import type { AppState } from '../../state';
import type { Ctx } from '../context';

const range = (a: number, b: number, label?: (k: number) => string) =>
  Array.from({ length: b - a + 1 }, (_, i) => ({ v: String(a + i), l: label ? label(a + i) : String(a + i) }));

/** Age in whole years, months and days on `today`. */
export function ageParts(s: Pick<AppState, 'dobD' | 'dobM' | 'dobY'>, today = new Date()) {
  const d = Number(s.dobD), m = Number(s.dobM), y = Number(s.dobY);
  const years = today.getFullYear() - y - (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d) ? 1 : 0);
  let months = today.getMonth() + 1 - m, days = today.getDate() - d;
  if (days < 0) { months -= 1; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
  if (months < 0) months += 12;
  return { years, months, days };
}

export function dobVals(c: Ctx) {
  const { s, t } = c, months = monthNames(s.lang);
  const onChange = (key: 'dobD' | 'dobM' | 'dobY') => (e: Event) => c.act({ [key]: (e.target as HTMLSelectElement).value });
  const age = ageParts(s);
  return {
    dobSelects: [
      { id: 'dobD', label: t.day, value: s.dobD, opts: range(1, 31), onChange: onChange('dobD') },
      { id: 'dobM', label: t.month, value: s.dobM, opts: range(1, 12, (k) => months[k - 1]), onChange: onChange('dobM') },
      { id: 'dobY', label: t.year, value: s.dobY, opts: range(1990, 2010).reverse(), onChange: onChange('dobY') },
    ],
    ageText: t.youAre + age.years + t.ageParts[0] + age.months + t.ageParts[1] + age.days + t.ageParts[2],
  };
}
