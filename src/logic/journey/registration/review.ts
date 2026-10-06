// Registration: the review page (every answer with an edit button that jumps back to its step).
import { monthNames } from '../../dates';
import type { Screen } from '../../state';
import type { Ctx } from '../context';

const ICON = {
  phone: 'M7 2h10v20H7zM11 18h2',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  person: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6',
  calendar: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4',
  pin: 'M12 22s7-6.2 7-12a7 7 0 00-14 0c0 5.8 7 12 7 12z',
  list: 'M4 6h16M4 12h16M4 18h10',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5',
  school: 'M3 21h18M5 21V10l7-5 7 5v11M10 21v-5h4v5',
  book: 'M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13',
  camera: 'M3 8h4l2-3h6l2 3h4v12H3zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z',
  home: 'M3 10l9-6 9 6M5 10v10h14V10',
};

export function reviewVals(c: Ctx) {
  const { s, t, app } = c;
  const months = monthNames(s.lang);
  const qual = ({ '12': t.q12, college: t.qCollege, grad: t.qGrad, diploma: t.qDiploma } as Record<string, string>)[s.qual ?? ''] || '—';
  const gender = ({ boy: t.boy, girl: t.girl, other: t.other } as Record<string, string>)[s.gender ?? ''] || '—';
  const year = ({ '1': t.yearOpts[0], '2': t.yearOpts[1], '3': t.yearOpts[2], '4': t.yearOpts[3], final: t.yearOpts[4] } as Record<string, string>)[s.year ?? ''] || '—';
  const attend = s.attend === 'regular' ? t.rv.attendShort[0] : s.attend === 'exams' ? t.rv.attendShort[1] : '—';
  /** [label, value, icon, step to edit] */
  const rows: [string, string, string, Screen][] = [
    [t.rPhone, s.phone ? '+91 ' + s.phone : '—', ICON.phone, 'phone'],
    [t.email, (s.email || '').trim() || '—', ICON.mail, 'phone'],
    [t.rName, (s.first + ' ' + s.last).trim() || '—', ICON.person, 'name'],
    [t.rDob, s.dobD + ' ' + months[Number(s.dobM) - 1] + ' ' + s.dobY, ICON.calendar, 'dob'],
    [t.rv.gender, gender, ICON.person, 'gender'],
    [t.rPlace, s.district ? s.district + ', ' + s.stateName : '—', ICON.pin, 'pincode'],
    [t.rv.cat, s.cat === null || s.cat === undefined ? '—' : t.cats[s.cat], ICON.list, 'category'],
    [t.rv.qual, qual, ICON.cap, 'qual'],
    [t.rv.sname, s.sname.trim() || '—', ICON.school, 'sname'],
    ...(s.qual === 'college' ? [[t.rv.year, year, ICON.calendar, 'year'], [t.rv.attend, attend, ICON.book, 'attend']] as [string, string, string, Screen][] : []),
    [t.rv.photo, s.photo === 'done' ? t.photoAdded : t.rv.noPhoto, ICON.camera, 'photo'],
    [t.rSchool, c.schoolName, ICON.home, 'school'],
    [t.rv.campus, s.campus ? c.campusName : '—', ICON.pin, 'campus'],
  ];
  return {
    reviewRows: rows.map(([label, value, d, step]) => ({ label, value, d, edit: () => app.go(step, { editing: true }) })),
  };
}
