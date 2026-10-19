import { useSyncExternalStore } from 'react';
import { navLinks } from '../lib/data';

// One shared IntersectionObserver for every consumer (navbar, section rail).
const IDS = ['top', ...navLinks.map((l) => l.id)];
let current = 'top';
let io: IntersectionObserver | null = null;
const subs = new Set<() => void>();

function start() {
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && e.target.id !== current) {
          current = e.target.id;
          subs.forEach((cb) => cb());
        }
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io?.observe(el);
  });
}

function subscribe(cb: () => void) {
  subs.add(cb);
  if (!io) start();
  return () => {
    subs.delete(cb);
    if (!subs.size) {
      io?.disconnect();
      io = null;
    }
  };
}

export function useActiveSection() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => 'top',
  );
}
