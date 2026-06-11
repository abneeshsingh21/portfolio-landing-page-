import React, { useEffect, useRef } from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp({ target, duration = 1800, prefix = '', suffix = '' }: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true;
          let start = 0;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            if (el) el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observerRef.current.observe(el);

    // Set initial value
    el.textContent = `${prefix}0${suffix}`;

    return () => observerRef.current?.disconnect();
  }, [target, duration, prefix, suffix]);

  return ref;
}
