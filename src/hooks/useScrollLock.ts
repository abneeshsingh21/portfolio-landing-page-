import { useEffect } from 'react';

// Ref-counted so overlapping overlays (preloader, menu, modal, palette) never
// unlock the page while another one is still open.
let locks = 0;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (locks === 0) {
      const gap = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    }
    locks++;
    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [active]);
}
