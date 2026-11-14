import { motion } from 'motion/react';
import { Lightbulb, PenTool, Rocket, Sparkles, Heart, Zap, Palette, Megaphone } from 'lucide-react';

const ITEMS = [
  { Ic: Lightbulb, c: '#FFC83D', x: '70%', y: '6%', r: -12, d: 0 },
  { Ic: PenTool, c: '#FF5CAA', x: '90%', y: '10%', r: 14, d: 0.4 },
  { Ic: Rocket, c: '#3DD9FF', x: '80%', y: '15%', r: 10, d: 0.8 },
  { Ic: Sparkles, c: '#C8FF00', x: '86%', y: '3%', r: -8, d: 1.2 },
  { Ic: Palette, c: '#8B5CFF', x: '95%', y: '20%', r: 8, d: 1.6 },
  { Ic: Megaphone, c: '#FF6B2C', x: '76%', y: '2%', r: -14, d: 0.2 },
];

/* Floating icon stickers behind the hero. Decorative only. */
export default function Stickers() {
  return (
    <div className="stickers" aria-hidden="true">
      {ITEMS.map(({ Ic, c, x, y, r, d }, i) => (
        <motion.span key={i} className="sticker" style={{ left: x, top: y, background: c }}
          initial={{ scale: 0, rotate: r - 30 }} animate={{ scale: 1, rotate: r, y: [0, -12, 0] }}
          transition={{ scale: { type: 'spring', delay: 0.3 + d * 0.3 }, rotate: { type: 'spring', delay: 0.3 + d * 0.3 }, y: { duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: d } }}
          whileHover={{ scale: 1.2, rotate: r + 12 }}>
          <Ic size={22} strokeWidth={2.4} />
        </motion.span>
      ))}
    </div>
  );
}
