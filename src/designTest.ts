// Dev-only test hook (CLAUDE.md "Test hook"): with ?designTest=1, expose window.__setDesignState and fix
// "today" to 2026-10-06 so dates and countdowns match the reference screenshots. Stripped from production builds.
import type { AppLogic } from './logic/app';
import { fresh } from './logic/state';
import { I18N, type Lang } from './i18n';

const FIXED_NOW = new Date(2026, 9, 6, 10, 0, 0).getTime();

export const designTestOn = import.meta.env.DEV && new URLSearchParams(location.search).get('designTest') === '1';

/** Freeze the clock. Call before the logic is created (fresh() reads Date.now()). */
export function freezeClock() {
  const RealDate = Date;
  class FixedDate extends RealDate {
    constructor(...args: any[]) {
      if (args.length) super(...(args as [any])); else super(FIXED_NOW);
    }
    static now() { return FIXED_NOW; }
  }
  globalThis.Date = FixedDate as DateConstructor;
}

export function installHook(logic: AppLogic) {
  (window as any).__setDesignState = (state: Record<string, unknown>) => {
    logic.clearTimers();
    // states.json placeholders: "__now" = the moment of the screenshot, "__<key>" = that journey copy key
    const copy = I18N[((state.lang as Lang) || 'en')].journey as Record<string, unknown>;
    const patch = JSON.parse(JSON.stringify(state), (_k, val) =>
      val === '__now' ? Date.now() : typeof val === 'string' && val.startsWith('__') && val.slice(2) in copy ? copy[val.slice(2)] : val);
    logic.setState({ ...fresh(), ...patch });
  };
}
