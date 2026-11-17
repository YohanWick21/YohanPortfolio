import { useRef, useState } from 'react';
import { Quote, X, ArrowUpRight } from 'lucide-react';

export interface BmQuote { name: string; role: string; preview: string; paragraphs: string[] }

export default function BmTestimonials({ items }: { items: BmQuote[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<BmQuote | null>(null);
  const show = (q: BmQuote) => { setOpen(q); requestAnimationFrame(() => { ref.current?.showModal(); document.documentElement.style.overflow = 'hidden'; }); };
  const hide = () => { ref.current?.close(); };
  const onClose = () => { document.documentElement.style.overflow = ''; setOpen(null); };
  return (
    <>
      <div className={`bm-quotes${items.length === 1 ? ' one' : ''}`}>
        {items.map(q => (
          <figure className="bm-quote" key={q.name}>
            <Quote size={28} className="bm-q" aria-hidden="true" />
            <blockquote>{q.preview}</blockquote>
            <button type="button" className="bm-more" onClick={() => show(q)} aria-haspopup="dialog">Read the full testimonial <ArrowUpRight size={16} /></button>
            <figcaption><b>{q.name}</b><small>{q.role}</small></figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={ref} className="bm-dialog" data-lenis-prevent aria-labelledby="bm-dlg-name" onClose={onClose} onClick={e => { if (e.target === ref.current) hide(); }}>
        {open && (
          <div className="bm-dlg-in">
            <button type="button" className="bm-dlg-x" onClick={hide} aria-label="Close testimonial"><X size={22} /></button>
            <header><b id="bm-dlg-name">{open.name}</b><small>{open.role}</small></header>
            <div className="bm-dlg-body">{open.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
        )}
      </dialog>
    </>
  );
}
