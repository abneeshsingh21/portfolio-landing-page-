import { useEffect, type RefObject } from 'react';
import { canHover, prefersReducedMotion } from '../lib/site';

/** Buttons drift toward the pointer. Uses the `translate` property so it never fights `transform`. */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.28) {
  useEffect(() => {
    const el = ref.current;
    if (!el || strength === 0 || !canHover() || prefersReducedMotion()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };
    const leave = () => {
      el.style.translate = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [ref, strength]);
}

/** Subtle 3D tilt toward the pointer. Apply to a wrapper, not to a glass surface. */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, max = 5) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover() || prefersReducedMotion()) return;
    let raf = 0;
    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1400px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [ref, max]);
}

/**
 * One global listener that feeds pointer coordinates (--mx / --my) to whichever
 * `.lg-spec` glass surface is under the cursor, driving its specular highlight.
 */
export function useSpecularTracking() {
  useEffect(() => {
    if (!canHover()) return;
    let raf = 0;
    let last: PointerEvent | null = null;
    const flush = () => {
      raf = 0;
      if (!last) return;
      const target = last.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>('.lg-spec');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${last.clientX - r.left}px`);
      el.style.setProperty('--my', `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
