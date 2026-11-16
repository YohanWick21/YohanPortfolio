import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export interface Stat { value: number; suffix?: string; decimals?: number; label: string }

function Count({ stat, go }: { stat: Stat; go: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(stat.value); return; }
    const c = animate(0, stat.value, { duration: 1.6, ease: [0.2, 0.8, 0.2, 1], onUpdate: x => setV(x) });
    return () => c.stop();
  }, [go, stat.value]);
  const shown = go ? v : stat.value;
  return <b>{shown.toLocaleString('en-US', { minimumFractionDigits: stat.decimals ?? 0, maximumFractionDigits: stat.decimals ?? 0 })}{stat.suffix}</b>;
}

export default function StatBand({ stats, caption, href }: { stats: Stat[]; caption: string; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <div className="statband" ref={ref}>
      <div className="statband-grid">
        {stats.map(s => <div className="sb" key={s.label}><Count stat={s} go={inView} /><span>{s.label}</span></div>)}
      </div>
      <p className="mono statband-cap">{caption} <a href={href}>Full breakdown <ArrowUpRight size={13} /></a></p>
    </div>
  );
}
