import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';

export interface BmStat { value: number; suffix?: string; label: string }

function Count({ s, go }: { s: BmStat; go: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(s.value); return; }
    const c = animate(0, s.value, { duration: 1.5, ease: [0.2, 0.8, 0.2, 1], onUpdate: x => setV(Math.round(x)) });
    return () => c.stop();
  }, [go, s.value]);
  return <b className="bm-num">{(go ? v : s.value).toLocaleString('en-US')}<i>{s.suffix}</i></b>;
}

export default function BmStats({ stats }: { stats: BmStat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <div className="bm-stats" ref={ref}>
      {stats.map(s => <div className="bm-stat" key={s.label}><Count s={s} go={inView} /><span>{s.label}</span></div>)}
    </div>
  );
}
