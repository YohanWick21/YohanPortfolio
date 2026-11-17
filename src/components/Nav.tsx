import { useEffect, useState } from 'react';
import { Menu, X, Trophy, ArrowUpRight } from 'lucide-react';

const LINKS = [['Work', '/work/', 'work'], ['Writing', '/blog/', 'blog'], ['Arkive Labs', '/work/arkive-labs/', 'arkive'], ['About', '/about/', 'about']];

export default function Nav({ current, total }: { current?: string; total?: number }) {
  const [open, setOpen] = useState(false);
  const [n, setN] = useState(0);
  useEffect(() => {
    try { setN(Object.keys(JSON.parse(sessionStorage.getItem('ywShipped2') || '{}')).length); } catch {}
    const h = (e: Event) => setN((e as CustomEvent).detail);
    window.addEventListener('yw:ship', h); return () => window.removeEventListener('yw:ship', h);
  }, []);
  useEffect(() => { document.body.classList.toggle('menu-open', open); }, [open]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  return (
    <header className={'top' + (open ? ' menu-open' : '')}>
      <a className="mark" href="/" aria-label="Yohan Wickramasinghe, home">YW</a>
      <button className="menu-btn" type="button" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(o => !o)}>
        {open ? <X size={16} /> : <Menu size={16} />} {open ? 'Close' : 'Menu'}
      </button>
      <nav id="nav" aria-label="Main" data-lenis-prevent onClick={() => setOpen(false)}>
        <div className="links">
          {LINKS.map(([name, href, key]) => <a key={key} href={href} aria-current={current === key ? 'page' : undefined}>{name}</a>)}
        </div>
        <div className="cta-group">
          {total ? <span className="tally" aria-live="polite"><Trophy size={13} /> {n} of {total} shipped</span> : null}
          <a className="btn nav-cta" href="/contact/" aria-current={current === 'contact' ? 'page' : undefined}>Contact <ArrowUpRight size={16} /></a>
        </div>
      </nav>
    </header>
  );
}
