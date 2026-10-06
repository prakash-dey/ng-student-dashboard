// Schools (courses) and campuses used by the registration steps "Choose school" and "Choose campus".

export interface School {
  id: 'sop' | 'sob' | 'sof' | 'bca';
  /** duration in months (shown with t.months), or durText for BCA */
  dur: string;
  durText?: string;
  /** minimum qualification: 'grad' or '12' */
  need: 'grad' | '12';
  /** campuses offering it, first = default */
  camp: string[];
  /** icon path and colour */
  d: string;
  c: string;
}

export const SCHOOLS: School[] = [
  { id: 'sop', dur: '20–24', need: 'grad', camp: ['Dharamshala', 'Pune', 'Jashpur', 'Dantewada', 'Bengaluru'], d: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12', c: '#2563EB' },
  { id: 'sob', dur: '12–18', need: '12', camp: ['Dharamshala', 'Pune', 'Jashpur', 'Dantewada', 'Bengaluru'], d: 'M4 20V10M10 20V4M16 20v-8M22 20H2', c: '#059669' },
  { id: 'sof', dur: '8–12', need: '12', camp: ['Pune', 'Dantewada'], d: 'M6 4h12M6 9h12M9 4c4 0 6 2 6 5s-2 5-6 5H7l8 7', c: '#D97706' },
  { id: 'bca', dur: '36', need: '12', camp: ['Himachal'], d: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6', c: '#7C3AED' },
];

export interface Campus {
  id: string;
  /** who can stay there */
  who: 'boy' | 'girl';
  /** schools offered */
  courses: School['id'][];
  /** state the student must be from */
  only?: string;
}

export const CAMPUSES: Campus[] = [
  { id: 'Dharamshala', who: 'boy', courses: ['sop', 'sob'] },
  { id: 'Pune', who: 'girl', courses: ['sop', 'sob', 'sof'] },
  { id: 'Jashpur', who: 'girl', courses: ['sop', 'sob'], only: 'Chhattisgarh' },
  { id: 'Dantewada', who: 'girl', courses: ['sop', 'sob', 'sof'], only: 'Chhattisgarh' },
  { id: 'Bengaluru', who: 'girl', courses: ['sop', 'sob'] },
  { id: 'Himachal', who: 'girl', courses: ['bca'] },
];

/** Campus place names: [state en, state hi, state mr, city hi, city mr]. */
export const CAMPUS_NAMES: Record<string, string[]> = {
  Dantewada: ['Chhattisgarh', 'छत्तीसगढ़', 'छत्तीसगड', 'दंतेवाड़ा', 'दंतेवाडा'],
  Dharamshala: ['Himachal Pradesh', 'हिमाचल प्रदेश', 'हिमाचल प्रदेश', 'धर्मशाला', 'धर्मशाळा'],
  Bengaluru: ['Karnataka', 'कर्नाटक', 'कर्नाटक', 'सरजापुर – बेंगलुरु', 'सर्जापूर – बेंगळुरू'],
  Pune: ['Maharashtra', 'महाराष्ट्र', 'महाराष्ट्र', 'पुणे', 'पुणे'],
  Jashpur: ['Chhattisgarh', 'छत्तीसगढ़', 'छत्तीसगड', 'जशपुर', 'जशपूर'],
  Himachal: ['Himachal Pradesh', 'हिमाचल प्रदेश', 'हिमाचल प्रदेश', 'हिमाचल – इटरनल यूनिवर्सिटी', 'हिमाचल – इटर्नल युनिव्हर्सिटी'],
};
/** English city names where they differ from the id. */
export const CAMPUS_EN: Record<string, string> = { Bengaluru: 'Sarjapur – Bangalore', Himachal: 'Himachal – Eternal University' };
