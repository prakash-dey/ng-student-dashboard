// Asha with a speech bubble at the foot of About pages 2 and 3.
// Phone: the zone takes the height left in the page column; the artwork scales down (Fit) when that is less
// than designed, the bubble keeps its size. PC: absolutely positioned as designed.
import type { V } from '../types';
import { Fit } from '../Fit';

export function AshaCorner({ v, zone, text }: { v: V; zone: string; text: string }) {
  const L = v.LD.L;
  const img = <img class="ld-asha-in" src="/media/asha.webp" alt="Asha" style={L.asha2} />;
  const bubble = <div class="ld-bubble-in" style={L.bubble2}><span style={L.bubble2Text}>{text}</span></div>;
  const fitH = L[zone + 'FitH'];
  if (!fitH) return <div style={L[zone]}>{img}{bubble}</div>;
  return (
    <div style={L[zone]}>
      <Fit h={fitH} origin="0% 100%">{img}</Fit>
      <div style={`position: absolute; left: 0; right: 0; bottom: 0; height: min(${fitH}px, 100%)`}>{bubble}</div>
    </div>
  );
}
