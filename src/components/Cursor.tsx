import { useEffect, useRef } from 'react';
import { canHover, prefersReducedMotion } from '../lib/site';

/**
 * Liquid lens cursor: an instant dot plus an inertial glass ring that morphs
 * over interactive elements (and shows a label on `[data-cursor="view"]`).
 * All updates are direct DOM writes — zero React re-renders while moving.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!canHover() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add('has-cursor');
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let state = '';

    const setState = (next: string, text = '') => {
      if (next === state) return;
      state = next;
      ring.dataset.state = next;
      dot.dataset.state = next;
      label.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.opacity = '1';
      dot.style.opacity = '1';
      const t = e.target instanceof Element ? e.target : null;
      const view = t?.closest<HTMLElement>('[data-cursor]');
      if (view) setState('view', view.dataset.cursor ?? 'View');
      else if (t?.closest('input, textarea, select')) setState('text');
      else if (t?.closest('a, button, [role="button"], label, summary')) setState('link');
      else setState('default');
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const hide = () => {
      ring.style.opacity = '0';
      dot.style.opacity = '0';
    };
    const down = () => ring.classList.add('is-down');
    const up = () => ring.classList.remove('is-down');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1000] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }}>
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
    </div>
  );
}
