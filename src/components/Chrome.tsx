import { useEffect, useRef } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { navLinks } from '../lib/data';
import { scrollToId } from '../lib/site';

/** Hairline iridescent progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
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
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}

const RAIL = [{ id: 'top', name: 'Intro' }, ...navLinks];

/** Desktop-only vertical section rail with hover labels. */
export function SectionRail() {
  const active = useActiveSection();
  return (
    <nav aria-label="Sections" className="fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 flex-col items-end gap-1 xl:flex">
      {RAIL.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToId(s.id)}
            aria-label={s.name}
            aria-current={on ? 'true' : undefined}
            className="group flex items-center gap-3 py-1.5 pl-6"
          >
            <span
              className="lg-chip translate-x-1 rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white/80 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ background: 'rgba(13,14,20,0.8)' }}
            >
              {s.name}
            </span>
            <span className="rail-dot" data-active={on} />
          </button>
        );
      })}
    </nav>
  );
}
