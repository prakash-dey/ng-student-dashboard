import { useEffect, useState } from 'preact/hooks';
import { AppLogic } from './logic/app';
import type { Device } from './logic/dc';
import { Design } from './ui/Design';
import { designTestOn, freezeClock, installHook } from './designTest';
import { fromSaved, toSaved } from './logic/persist';
import type { AppState } from './logic/state';
import { saveProgress } from './storage/progress';

// Phone layout below 900px, PC layout from 900px. Within each, the layout reflows to the viewport
// (see logic/frame.ts); nothing is scaled.
const PC_QUERY = '(min-width: 900px)';
const deviceNow = (): Device => (matchMedia(PC_QUERY).matches ? 'desktop' : 'phone');
// clientWidth/innerHeight: the visible area without a vertical scrollbar
const viewNow = () => [document.documentElement.clientWidth, window.innerHeight] as const;

if (designTestOn) freezeClock();
const logic = new AppLogic(deviceNow());
logic.setView(...viewNow());
if (designTestOn) installHook(logic);

/** Resume saved progress (never in design-test mode, which always starts from fresh()). */
export function resume(saved: Partial<AppState> | null) {
  if (saved && !designTestOn) logic.state = fromSaved(saved);
}

export function App() {
  const [, setTick] = useState(0);
  const rerender = () => setTick((n) => n + 1);
  useEffect(() => {
    logic.onChange = () => {
      rerender();
      if (!designTestOn) saveProgress(toSaved(logic.state));
    };
    logic.componentDidMount?.();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        logic.DEVICE = deviceNow();
        logic.setView(...viewNow());
        rerender();
      });
    };
    addEventListener('resize', onResize);
    return () => { removeEventListener('resize', onResize); logic.componentWillUnmount?.(); logic.onChange = null; };
  }, []);

  return <Design v={logic.renderVals()} />;
}
