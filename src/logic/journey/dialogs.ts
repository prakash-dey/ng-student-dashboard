// Confirmation dialogs: leave registration, leave the test, submit the test, cancel an interview slot.
import type { Ctx } from './context';

export function dialogVals(c: Ctx, stepsLeft: number, answered: number) {
  const { s, t, app, isLr } = c;
  const close = () => c.set({ dialog: null });
  const dlg: Record<string, any> = { title: '', body: '', primary: '', secondary: '', primaryOn: null, secondaryOn: null, primaryDisabled: false, hasReasons: false, reasons: [] };
  switch (s.dialog) {
    case 'leave':
      Object.assign(dlg, { title: t.leaveTitle, body: t.leaveBody1 + stepsLeft + t.leaveBody2, primary: t.stay, primaryOn: close, secondary: t.later, secondaryOn: () => app.saveAndExit() });
      break;
    case 'leaveTest':
      Object.assign(dlg, { title: t.leaveTestTitle, body: t.leaveTestBody, primary: t.stayTest, primaryOn: close, secondary: t.leaveTest, secondaryOn: () => app.go('map', { answers: {}, qi: 0 }) });
      break;
    case 'submit':
      Object.assign(dlg, { title: t.submitTitle, body: t.submitBody1 + answered + t.submitBody2, primary: t.yesSubmit, primaryOn: () => app.submitTest(), secondary: t.goBack, secondaryOn: close });
      break;
    case 'cancel':
      Object.assign(dlg, {
        title: t.cancelTitle, body: t.cancelBody, hasReasons: true,
        reasons: t.reasons.map((label, k) => ({
          label, pick: () => c.set({ reason: k }),
          style: 'min-height:46px;padding:0 16px;border-radius:999px;cursor:pointer;font-weight:800;font-size:15px;' + (s.reason === k ? 'background:#E91E63;color:#FFFFFF;border:2px solid #BE185D;' : 'background:#FFFFFF;color:#334155;border:2px solid #E2E8F0;'),
        })),
        primary: t.cancelYes, primaryDisabled: s.reason === null,
        primaryOn: () => app.go('slot', { time: null, ...(isLr ? { bookedLr: null } : { bookedCfr: null }) }),
        secondary: t.keep, secondaryOn: close,
      });
      break;
  }
  return dlg;
}
