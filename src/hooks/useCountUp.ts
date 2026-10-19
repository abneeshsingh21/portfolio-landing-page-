import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/site';

interface UseCountUpOptions {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export function useCountUp({ target, duration = 1800, decimals = 0, prefix = '', suffix = '', delay = 0 }: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) =>
      `${prefix}${n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

    if (prefersReducedMotion()) {
      el.textContent = fmt(target);
      return;
    }

    el.textContent = fmt(0);
    let raf = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(eased * target);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          timer = window.setTimeout(run, delay);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, decimals, prefix, suffix, delay]);

  return ref;
}
