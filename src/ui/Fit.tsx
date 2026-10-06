// Responsive helper: fills its positioned parent and lays its children out in a design-sized box (`h` px tall,
// full width) anchored to the bottom. When the parent is shorter than `h` the box is scaled down to fit, so
// artwork shrinks on short screens instead of overlapping. At or above the design height it is untouched
// (scale 1), so the design sizes render exactly as drawn. Use it for illustrations only, never for text.
import type { ComponentChildren } from 'preact';
import { useLayoutEffect, useRef, useState } from 'preact/hooks';

export function Fit({ h, origin = '50% 100%', children }: { h: number; origin?: string; children: ComponentChildren }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current!;
    const update = () => setScale(Math.min(1, el.clientHeight / h));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [h]);
  return (
    <div ref={ref} style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none">
      <div style={`position: absolute; left: 0; right: 0; bottom: 0; height: ${h}px; pointer-events: auto; transform-origin: ${origin}${scale < 1 ? `; transform: scale(${scale})` : ''}`}>
        {children}
      </div>
    </div>
  );
}
