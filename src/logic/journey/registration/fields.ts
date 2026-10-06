// Registration: login, and the text-field steps (name, phone + email, school name).
import type { AppState } from '../../state';
import type { Advance } from '../advance';
import type { Ctx } from '../context';

const ICON = {
  person: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6',
  phone: 'M7 2h10v20H7zM11 18h2',
  whatsapp: 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  school: 'M3 21h18M5 21V10l7-5 7 5v11M10 21v-5h4v5',
};

/** [input id, label, state key, icon, inputmode, autocomplete, is phone number] */
type FieldDef = [string, string, keyof AppState, string, string, string, boolean];

function fieldDefs(c: Ctx): Partial<Record<string, FieldDef[]>> {
  const { t, s } = c;
  return {
    sname: [['f7', t.snameLabel, 'sname', ICON.school, 'text', 'organization', false]],
    name: [['f1', t.first, 'first', ICON.person, 'text', 'given-name', false], ['f2', t.last, 'last', ICON.person, 'text', 'family-name', false]],
    phone: [
      ['f3', t.phoneLabel, 'phone', ICON.phone, 'numeric', 'tel-national', true],
      ...(s.sameWa ? [] : [['f4', t.waLabel, 'wa', ICON.whatsapp, 'numeric', 'off', true] as FieldDef]),
      ['f8', t.emailLabel, 'email', ICON.mail, 'email', 'email', false],
    ],
  };
}

export function fieldsVals(c: Ctx, advance: Advance) {
  const { s, t, app } = c;
  const defs = fieldDefs(c)[c.sc];
  return {
    hasFields: !!defs,
    fields: (defs ?? []).map(([id, label, key, d, mode, auto, isPhone]) => ({
      id, label, value: s[key], d, mode, auto, isPhone, ph: isPhone ? '98765 43210' : t.typeHere,
      onChange: (e: Event) => c.act({ [key]: (e.target as HTMLInputElement).value }),
    })),
    waSwitch: {
      track: 'width:52px;height:30px;border-radius:999px;position:relative;flex-shrink:0;transition:background .2s;background:' + (s.sameWa ? '#22C55E' : '#CBD5E1'),
      knob: 'position:absolute;top:3px;width:24px;height:24px;border-radius:999px;background:#FFFFFF;box-shadow:0 2px 4px rgba(0,0,0,.25);transition:left .2s;left:' + (s.sameWa ? 25 : 3) + 'px',
    },
    waPressed: s.sameWa ? 'true' : 'false',
    toggleWa: () => c.set({ sameWa: !s.sameWa }),
    // login: Google fills in a sample name until the real sign-in is wired up
    loginGoogle: () => { app.setState(s.first ? { loginDone: true } : { first: 'Ravi', last: 'Kumar', loginDone: true }); advance('login'); },
    loginPhone: () => { app.setState({ loginDone: true }); advance('login'); },
  };
}
