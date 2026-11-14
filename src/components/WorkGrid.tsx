import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Megaphone, CalendarDays, Palette, Briefcase, LayoutGrid, ArrowUpRight } from 'lucide-react';

const ICONS: Record<string, any> = { all: LayoutGrid, employer: Users, campaign: Megaphone, event: CalendarDays, branding: Palette, corporate: Briefcase };
const COLS = ['#C8FF00', '#FF3D00'];
export interface Card { slug: string; category: string; cat: string; year: string; title: string; desc: string; tags: string[]; img: { src: string; w: number; h: number } }

export default function WorkGrid({ cards, filters }: { cards: Card[]; filters: string[][] }) {
  const [f, setF] = useState('all');
  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map(([k, n]) => { const Ic = ICONS[k]; return (
          <button key={k} type="button" className="chip" data-f={k} aria-pressed={f === k} onClick={() => setF(k)}><Ic size={15} /> {n}</button>
        ); })}
      </div>
      <motion.div className="cards" layout>
        <AnimatePresence mode="popLayout">
          {cards.map((c, i) => (f === 'all' || c.category === f) && (
            <motion.article key={c.slug} layout className="pcard" data-cat={c.category} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              style={{ ['--c' as any]: COLS[i % COLS.length] }}>
              <a className="proof" href={`/work/${c.slug}/`} aria-label={c.title}><img src={c.img.src} alt="" width={c.img.w} height={c.img.h} loading="lazy" /></a>
              <div className="meta mono"><span>{c.cat}</span><span>{c.year}</span></div>
              <h3 className="display"><a href={`/work/${c.slug}/`} style={{ textDecoration: 'none' }}>{c.title} <ArrowUpRight size={22} /></a></h3>
              <p>{c.desc}</p>
              <ul className="pills">{c.tags.map((t, k) => <li key={t} className={k === 0 ? 'fill' : ''}>{t}</li>)}</ul>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
