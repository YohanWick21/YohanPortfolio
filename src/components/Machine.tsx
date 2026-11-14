import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, PenTool, Rocket, PartyPopper, Star, Sparkles, Heart, Zap, Check, ArrowUpRight, SkipForward, Wand2, GripHorizontal } from 'lucide-react';
import type { Job } from '../data/site';

const STAGES = [
  { key: 'ideate', word: 'Ideate', no: '01 / 03', at: 0, q: 'What is the one thing this has to make someone do?', color: '#F2EDE4', Icon: Lightbulb },
  { key: 'create', word: 'Create', no: '02 / 03', at: 0.3, q: 'What do they see first, and does it earn the next second?', color: '#C8FF00', Icon: PenTool },
  { key: 'exec', word: 'Execute', no: '03 / 03', at: 0.66, q: 'Does it work in two seconds, on a phone, with no explanation?', color: '#FF3D00', Icon: Rocket },
  { key: 'pub', word: 'Published', no: 'Done', at: 0.985, q: 'What did this job teach me for the next one?', color: '#C8FF00', Icon: PartyPopper },
] as const;
const PUBTEXT = 'Out the door. Most portfolios start here. The thinking above is where I would start on yours.';
const ALLTEXT = 'Every job shipped. That is how each one runs, yours included.';
const STN = [{ label: 'Ideate', p: 0.12, go: 0.14 }, { label: 'Create', p: 0.5, go: 0.52 }, { label: 'Execute', p: 0.82, go: 0.84 }, { label: 'Published', p: 1, go: 1 }];
const sm = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const BURST = [Star, Sparkles, Heart, Zap, PartyPopper];
const BCOL = ['#C8FF00', '#FF3D00', '#F2EDE4'];

function edges(img: HTMLImageElement, w: number, h: number): ImageData | null {
  try {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d')!; x.drawImage(img, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h).data, g = new Float32Array(w * h);
    for (let k = 0; k < w * h; k++) g[k] = 0.299 * d[k * 4] + 0.587 * d[k * 4 + 1] + 0.114 * d[k * 4 + 2];
    const out = x.createImageData(w, h), o = out.data;
    for (let yy = 1; yy < h - 1; yy++) for (let xx = 1; xx < w - 1; xx++) {
      const n = yy * w + xx;
      const gx = -g[n - w - 1] - 2 * g[n - 1] - g[n + w - 1] + g[n - w + 1] + 2 * g[n + 1] + g[n + w + 1];
      const gy = -g[n - w - 1] - 2 * g[n - w] - g[n - w + 1] + g[n + w - 1] + 2 * g[n + w] + g[n + w + 1];
      const a = Math.max(0, Math.min(255, (Math.sqrt(gx * gx + gy * gy) - 70) * 2.4));
      o[n * 4] = 200; o[n * 4 + 1] = 255; o[n * 4 + 2] = 0; o[n * 4 + 3] = a;
    }
    return out;
  } catch { return null; }
}

export default function Machine({ jobs }: { jobs: Job[] }) {
  const [cur, setCur] = useState(0);
  const [p, setP] = useState(0);
  const [shipped, setShipped] = useState<Record<number, boolean>>({});
  const [thud, setThud] = useState(0);
  const [swap, setSwap] = useState(0);
  const [wiggle, setWiggle] = useState(false);
  const touched = useRef(false), tw = useRef(0), drag = useRef<{ x: number; p: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null), bpRef = useRef<HTMLCanvasElement>(null);
  const edgeCache = useRef<Record<number, ImageData | null>>({});
  const reduce = useRef(false);
  const j = jobs[cur];

  const stageIdx = useMemo(() => { let s = 0; STAGES.forEach((t, i) => { if (p >= t.at) s = i; }); return s; }, [p]);
  const S = STAGES[stageIdx];
  const on = p >= 0.985;
  const nShipped = Object.keys(shipped).length;

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try { const s = JSON.parse(sessionStorage.getItem('ywShipped') || '{}'); if (s && typeof s === 'object') setShipped(s); } catch {}
  }, []);

  /* announce shipped count to the nav */
  useEffect(() => { window.dispatchEvent(new CustomEvent('yw:ship', { detail: nShipped })); }, [nShipped]);

  const setPSafe = useCallback((v: number) => setP(Math.max(0, Math.min(1, v))), []);
  const go = useCallback((target: number, dur: number) => {
    cancelAnimationFrame(tw.current);
    if (!dur) { setPSafe(target); return; }
    const t0 = performance.now(); let a = 0; setP(v => { a = v; return v; });
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / dur), e = 1 - Math.pow(1 - t, 3);
      setPSafe(a + (target - a) * e); if (t < 1) tw.current = requestAnimationFrame(step);
    };
    tw.current = requestAnimationFrame(step);
  }, [setPSafe]);

  const loadJob = useCallback((i: number) => {
    cancelAnimationFrame(tw.current); setCur(i); setP(0); setSwap(k => k + 1);
  }, []);

  /* blueprint: the poster's own edges drawn in lime */
  useEffect(() => {
    const cv = bpRef.current; if (!cv) return;
    const w = 540, h = Math.round(540 * j.h / j.w); cv.width = w; cv.height = h;
    const img = new Image(); let dead = false;
    img.onload = () => {
      if (dead) return;
      if (!(cur in edgeCache.current)) edgeCache.current[cur] = edges(img, w, h);
      const data = edgeCache.current[cur], ctx = cv.getContext('2d')!;
      ctx.clearRect(0, 0, w, h);
      if (data) ctx.putImageData(data, 0, 0); else { ctx.globalAlpha = .5; ctx.drawImage(img, 0, 0, w, h); ctx.globalAlpha = 1; }
    };
    img.src = j.img;
    return () => { dead = true; };
  }, [cur, j]);

  /* stamp, thud, ship */
  useEffect(() => {
    if (!on) return;
    if (!reduce.current) setThud(k => k + 1);
    setShipped(s => {
      if (s[cur]) return s;
      const n = { ...s, [cur]: true };
      try { sessionStorage.setItem('ywShipped', JSON.stringify(n)); } catch {}
      return n;
    });
  }, [on, cur]);

  /* teaser nudge */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setWiggle(true);
    let raf = 0;
    const id = setTimeout(() => {
      if (touched.current) return;
      const a = performance.now();
      const nudge = () => {
        if (touched.current) return;
        const t = (performance.now() - a) / 1600;
        if (t >= 1) { setP(0); return; }
        setP(Math.sin(t * Math.PI) * 0.2); raf = requestAnimationFrame(nudge);
      };
      nudge();
    }, 1500);
    return () => { clearTimeout(id); cancelAnimationFrame(raf); };
  }, []);

  const down = (e: React.PointerEvent) => {
    touched.current = true; cancelAnimationFrame(tw.current);
    drag.current = { x: e.clientX, p }; try { (e.currentTarget as Element).setPointerCapture(e.pointerId); } catch {}
  };
  const move = (e: React.PointerEvent) => {
    if (!drag.current || !cardRef.current) return;
    const w = cardRef.current.getBoundingClientRect().width * 1.15;
    setPSafe(drag.current.p + (e.clientX - drag.current.x) / w);
  };
  const end = () => { drag.current = null; };

  const n = 1 - sm(0.16, 0.32, p), q = sm(0.38, 0.84, p), scanOn = q > 0.001 && q < 0.999;
  const bodyText = S.key === 'pub' ? (nShipped === jobs.length ? ALLTEXT : PUBTEXT) : (j as any)[S.key];
  const burst = useMemo(() => Array.from({ length: 16 }, (_, i) => ({ i, Ic: BURST[i % BURST.length], c: BCOL[i % BCOL.length], x: (Math.random() - 0.5) * 520, y: -60 - Math.random() * 260, r: (Math.random() - 0.5) * 540, s: 0.7 + Math.random() * 0.9 })), [thud]);

  return (
    <>
      <div className="queue" role="group" aria-label="Jobs in the queue">
        <span className="label mono">Queue</span>
        {jobs.map((x, i) => (
          <button key={i} type="button" className={'job' + (shipped[i] ? ' done' : '')} aria-pressed={i === cur} onClick={() => { touched.current = true; loadJob(i); }}>
            <i>{shipped[i] && <Check size={10} strokeWidth={4} />}</i>{x.name}
          </button>
        ))}
      </div>

      <div className="machine" style={{ ['--stage' as any]: S.color }}>
        <div className="card-wrap">
          <div key={`${swap}-${thud}`} ref={cardRef} className={'card' + (swap && !thud ? ' swap' : '') + (thud ? ' thud' : '')} id="card" style={{ aspectRatio: `${j.w} / ${j.h}`, touchAction: 'pan-y' }}
            onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} aria-label="The work in progress. Drag sideways to move it along.">
            <div className="layer note" style={{ opacity: n, transform: `translateY(${(1 - n) * -34}px) rotate(${(1 - n) * -5}deg) scale(${1 - (1 - n) * 0.05})` }}>
              <div><span className="k mono">The brief</span><p className="brief">{j.brief}</p></div>
              <hr />
              <div><span className="k mono">The idea</span><h2 className="display idea">{j.idea}</h2></div>
              <div className="foot mono"><span>{j.tag}</span><span>{j.w} × {j.h}</span></div>
            </div>
            <canvas ref={bpRef} className="layer bp" style={{ opacity: sm(0.18, 0.32, p) }} aria-hidden="true" />
            <img className="layer color" src={j.img} alt={`Finished ${j.name} design`} draggable={false} style={{ clipPath: `inset(0 ${(1 - q) * 100}% 0 0)` }} />
            <div className="scan" style={{ left: `calc(${q * 100}% - 1px)`, opacity: scanOn ? 1 : 0 }} />
            <span className="dims mono" style={{ opacity: sm(0.3, 0.4, p) * (1 - sm(0.5, 0.6, p)) }}>LAYOUT {j.w} × {j.h}</span>
            <div className="layer chrome" style={{ opacity: sm(0.86, 0.97, p) }}><span className="pub-pill"><i />Published</span></div>
            <div className={'stamp' + (on ? ' on' : '')}>Published</div>
          </div>
          <AnimatePresence>
            {on && !reduce.current && burst.map(b => (
              <motion.span key={`${thud}-${b.i}`} className="burst" style={{ color: b.c }} initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{ opacity: [1, 1, 0], x: b.x, y: b.y, scale: b.s, rotate: b.r }} transition={{ duration: 1.3, ease: 'easeOut' }}>
                <b.Ic size={26} fill="currentColor" strokeWidth={1.5} />
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <div className="panel swapin" key={`${cur}-${stageIdx}`}>
          <div className="stage-row">
            <span className="stage-no"><S.Icon size={14} /> {S.no}</span>
            <div className="display stage-word" style={{ color: S.color }}>{S.word}</div>
          </div>
          <p className="mono meta">{j.name}  /  {j.tag}  /  {j.meta}</p>
          <div className="qa"><span className="k mono">The question I ask</span><p className="q">{S.q}</p></div>
          <div className="qa"><span className="k mono">What I did on this job</span><p>{bodyText}</p></div>
          {S.key === 'pub' && (
            <div className="after">
              <button className="btn line" type="button" onClick={() => { touched.current = true; loadJob((cur + 1) % jobs.length); }}><SkipForward size={16} /> Next job</button>
              <a className="btn line" href={j.href}>See the full project <ArrowUpRight size={16} /></a>
              <a className="btn" href="/arkive-labs/"><Wand2 size={16} /> Do this for my brand</a>
            </div>
          )}
        </div>
      </div>

      <div className={'rail' + (wiggle ? ' wiggle' : '')}>
        <div className="stations">
          {STN.map((s, i) => (
            <button key={s.label} type="button" className={'station' + (stageIdx === i ? ' on' : '')} style={{ left: `${s.p * 100}%`, transform: i === 0 ? 'translateX(-8%)' : i === 3 ? 'translateX(-92%)' : undefined, color: stageIdx === i ? STAGES[i].color : undefined }}
              onClick={() => { touched.current = true; go(s.go, reduce.current ? 0 : 700); }}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="belt" aria-hidden="true"><div className="fill" style={{ width: `${p * 100}%`, background: S.color }} /></div>
        <label className="sr" htmlFor="run">Move the work along: from idea to published</label>
        <input type="range" id="run" min={0} max={1000} step={1} value={Math.round(p * 1000)} aria-valuetext={S.word}
          onChange={e => { touched.current = true; cancelAnimationFrame(tw.current); setP(+e.target.value / 1000); }} />
        <p className="rail-hint mono"><GripHorizontal size={14} /> Drag the puck, drag the card, or use the arrow keys. Each stage changes what you see.</p>
      </div>
      <p className="sr" aria-live="polite">{S.word}, {j.name}</p>
    </>
  );
}
