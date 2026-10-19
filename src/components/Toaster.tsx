import { useEffect, useState } from 'react';
import Icon from './Icon';
import type { ToastDetail } from '../lib/toast';

interface Item extends ToastDetail {
  id: number;
}

export default function Toaster() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let seq = 0;
    const timers = new Set<number>();
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<ToastDetail>).detail;
      const id = ++seq;
      setItems((list) => [...list.slice(-2), { ...detail, id }]);
      const t = window.setTimeout(() => {
        setItems((list) => list.filter((x) => x.id !== id));
        timers.delete(t);
      }, 2600);
      timers.add(t);
    };
    window.addEventListener('app:toast', onToast);
    return () => {
      window.removeEventListener('app:toast', onToast);
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[400] flex flex-col items-center gap-2 px-4">
      {items.map((t) => (
        <div key={t.id} className="lg lg-strong anim-toast flex items-center gap-2.5 rounded-full py-2.5 pr-5 pl-2.5 text-[13px] font-medium text-white">
          <span
            className="grid h-6 w-6 place-items-center rounded-full"
            style={{ background: t.tone === 'success' ? 'rgba(143,240,214,0.18)' : 'rgba(159,208,255,0.18)', color: t.tone === 'success' ? 'var(--mint)' : 'var(--ice)' }}
          >
            <Icon name={t.tone === 'success' ? 'check' : 'mail'} size={13} stroke={2.4} />
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
