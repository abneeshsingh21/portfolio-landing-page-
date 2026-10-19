import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { scrollToId } from '../lib/site';

const R = 21;
const C = 2 * Math.PI * R;

/** Floating glass button with a live scroll-progress ring. */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - p));
      setShow((s) => (s !== window.scrollY > 700 ? !s : s));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => scrollToId('top')}
      className={`lg lg-spec lg-press group fixed right-4 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full text-white transition-opacity duration-300 sm:right-6 sm:bottom-6 ${
        show ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <circle
          ref={ringRef}
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="url(#btt-grad)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
        <defs>
          <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9fd0ff" />
            <stop offset="55%" stopColor="#c7b2ff" />
            <stop offset="100%" stopColor="#8ff0d6" />
          </linearGradient>
        </defs>
      </svg>
      <Icon name="arrowUp" size={17} className="relative transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
