// Data behind the About pages (courses, campuses, success stories).
import type { Copy } from '../../i18n';

type X = Copy['landing']['x'];

export interface Course {
  code: string; c: string; bg: string; d: string;
  name: string; full: string; sub: string; dur: string; need: string; campus: string;
  elig: string[]; learn: string[]; jobs: string[];
}

/** The four courses on About page 3, with the three tabs of the course sheet (who can join / learn / jobs). */
export const courses = (X: X): Course[] => [
  { code: 'SOP', c: '#2563EB', bg: '#DBEAFE', d: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12', name: X.names[0], full: X.fulls[0], sub: X.subs[0], dur: X.durs[0], need: X.grad, campus: 'Dantewada, Bengaluru, Pune +',
    elig: [X.age, X.mustGrad, X.income, X.coding, X.stay], learn: X.learnTech, jobs: X.jobsTech },
  { code: 'SOB', c: '#059669', bg: '#D1FAE5', d: 'M4 20V10M10 20V4M16 20v-8M22 20H2', name: X.names[1], full: X.fulls[1], sub: X.subs[1], dur: X.durs[1], need: X.twelfth, campus: 'Bengaluru, Jashpur, Dantewada, Pune',
    elig: [X.age, X.must12, X.income, X.comm], learn: X.learnBiz, jobs: ['Marketing Associate', 'Operations Executive', 'Customer Support Executive', X.bizDev] },
  { code: 'SOF', c: '#D97706', bg: '#FEF3C7', d: 'M6 4h12M6 9h12M9 4c4 0 6 2 6 5s-2 5-6 5H7l8 7', name: X.names[2], full: X.fulls[2], sub: X.subs[2], dur: X.durs[2], need: X.twelfth, campus: 'Pune, Maharashtra',
    elig: [X.age, X.must12, X.income, X.numbers], learn: X.learnFin, jobs: ['Accounts Executive', 'Tax Associate', 'Finance Operations Executive', 'Compliance Assistant'] },
  { code: 'BCA', c: '#7C3AED', bg: '#EDE9FE', d: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6', name: X.names[3], full: X.fulls[3], sub: X.subs[3], dur: X.durs[3], need: X.twelfth, campus: 'Himachal',
    elig: [X.age, X.must12, X.income, X.coding, X.stay], learn: X.learnTech, jobs: X.jobsTech },
];

/** One photo per campus, in the order of t.c4.names. */
export const CAMPUS_PHOTOS = ['/media/campus-1.jpg', '/media/campus-2.jpg', '/media/campus-3.jpg', '/media/campus-4.jpg', '/media/campus-5.jpg', '/media/campus-6.jpg'];
/** Campus cards on About page 4: course codes offered and (index into t.c4.only) a residency note. */
export const LANDING_CAMPUSES: { boys?: boolean; courses: string[]; note?: number }[] = [
  { boys: true, courses: ['SOP', 'SOB'] },
  { courses: ['SOP', 'SOB', 'SOF'] },
  { courses: ['SOP', 'SOB'], note: 0 },
  { courses: ['SOP', 'SOB', 'SOF'], note: 1 },
  { courses: ['SOP', 'SOB'] },
  { courses: ['BCA'] },
];
/** Course chip colours: [background, text, index into t.x.names]. */
export const COURSE_CHIP: Record<string, [string, string, number]> = { SOP: ['#DBEAFE', '#1D4ED8', 0], SOB: ['#D1FAE5', '#047857', 1], SOF: ['#FEF3C7', '#92400E', 2], BCA: ['#EDE9FE', '#6D28D9', 3] };

// SAMPLE DATA: invented names, companies, dates, salaries and quotes, with two stand-in photos. Replace before launch.
export const ALUMNI_PHOTOS = ['/media/alumni-1.jpg', '/media/alumni-2.jpg'];
/** [name, company, logo letter, logo colour, joined [month, year], placed [month, year], salary, photo index] */
export const ALUMNI: [string, string, string, string, [number, number], [number, number], string, number][] = [
  ['Rohit K.', 'Brightloop Tech', 'B', '#2563EB', [6, 2022], [3, 2024], '₹4.2 LPA', 0],
  ['Pooja S.', 'Kirana Cloud', 'K', '#059669', [0, 2023], [1, 2024], '₹3.0 LPA', 1],
  ['Anjali R.', 'CodeNest Labs', 'C', '#7C3AED', [8, 2021], [7, 2023], '₹5.5 LPA', 1],
  ['Imran A.', 'PaySetu', 'P', '#D97706', [3, 2023], [0, 2024], '₹2.8 LPA', 0],
  ['Suraj P.', 'Zentra Systems', 'Z', '#0F766E', [10, 2021], [9, 2023], '₹6.0 LPA', 0],
  ['Kavita M.', 'FinSaathi', 'F', '#BE185D', [5, 2022], [4, 2023], '₹3.4 LPA', 1],
];
// SAMPLE DATA: invented hiring companies with letter-tile logos. Replace with the real list and logo files.
export const COMPANIES: [string, string, string][] = [
  ['Brightloop Tech', 'B', '#2563EB'], ['Kirana Cloud', 'K', '#059669'], ['CodeNest Labs', 'C', '#7C3AED'], ['PaySetu', 'P', '#D97706'],
  ['Zentra Systems', 'Z', '#0F766E'], ['FinSaathi', 'F', '#BE185D'], ['Tarang Soft', 'T', '#0369A1'], ['Nimbus Kart', 'N', '#B45309'],
];
