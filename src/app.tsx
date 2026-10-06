import { useEffect, useState } from 'preact/hooks';
import { DesignLogic } from './logic/design';
import type { Device } from './logic/dc';
import { Design } from './ui/Design';
import { designTestOn, freezeClock, installHook } from './designTest';

// Phone layout below 900px, PC layout from 900px (CLAUDE.md "Layout at other screen sizes").
const PC_QUERY = '(min-width: 900px)';
const deviceNow = (): Device => (matchMedia(PC_QUERY).matches ? 'desktop' : 'phone');

if (designTestOn) freezeClock();
const logic = new DesignLogic(deviceNow());
if (designTestOn) installHook(logic);

/** PC: centre the 1440x900 design and scale it down on smaller screens. */
function usePcScale(on: boolean) {
  const calc = () => Math.min(1, innerWidth / 1440, innerHeight / 900);
  const [scale, setScale] = useState(calc);
  useEffect(() => {
    if (!on) return;
    const onResize = () => setScale(calc());
    onResize();
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }, [on]);
  return scale;
}

export function App() {
  const [, setTick] = useState(0);
  const rerender = () => setTick((n) => n + 1);
  useEffect(() => {
    logic.onChange = rerender;
    logic.componentDidMount?.();
    const mq = matchMedia(PC_QUERY);
    const onChange = () => { logic.DEVICE = deviceNow(); rerender(); };
    mq.addEventListener('change', onChange);
    return () => { mq.removeEventListener('change', onChange); logic.componentWillUnmount?.(); logic.onChange = null; };
  }, []);

  const isPc = logic.DEVICE === 'desktop';
  const scale = usePcScale(isPc);
  const v = logic.renderVals();

  if (!isPc) return <Design v={v} />;
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 1440 * scale, height: 900 * scale, flexShrink: 0 }}>
        <div style={{ width: 1440, height: 900, transform: scale === 1 ? undefined : `scale(${scale})`, transformOrigin: '0 0' }}>
          <Design v={v} />
        </div>
      </div>
    </div>
  );
}
