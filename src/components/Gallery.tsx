import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

export interface Item { src: string; w: number; h: number; tag: string }
export default function Gallery({ items }: { items: Item[] }) {
  const [i, setI] = useState<number | null>(null);
  const step = useCallback((d: number) => setI(v => v === null ? v : (v + d + items.length) % items.length), [items.length]);
  useEffect(() => {
    if (i === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setI(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [i, step]);
  const it = i === null ? null : items[i];
  return (
    <>
      <div className="gallery">
        {items.map((g, k) => (
          <motion.button key={g.src} className="g-item" type="button" onClick={() => setI(k)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.5, delay: (k % 3) * 0.07 }}>
            <img src={g.src} alt={g.tag} width={g.w} height={g.h} loading="lazy" />
            <span className="mono"><Expand size={12} /> {g.tag}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {it && (
          <motion.div className="lb open" role="dialog" aria-modal="true" aria-label="Image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setI(null)}>
            <button className="x" type="button" aria-label="Close" onClick={() => setI(null)}><X size={20} /></button>
            <button className="pv" type="button" aria-label="Previous image" onClick={e => { e.stopPropagation(); step(-1); }}><ChevronLeft size={22} /></button>
            <motion.img key={it.src} src={it.src} alt={it.tag} initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }} onClick={e => e.stopPropagation()} />
            <button className="nx" type="button" aria-label="Next image" onClick={e => { e.stopPropagation(); step(1); }}><ChevronRight size={22} /></button>
            <p className="mono">{it.tag} ({i! + 1} of {items.length})</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
