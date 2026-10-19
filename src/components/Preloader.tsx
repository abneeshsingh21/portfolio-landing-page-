import { useEffect, useState } from 'react';
import { SHOW_PRELOADER } from '../lib/site';
import { useScrollLock } from '../hooks/useScrollLock';

const BOOT = [
  'mount  epl.compiler      [llvm · wasm · vm]',
  'link   neuroshell.core   [c++20 · pybind11]',
  'route  llm.gateway       [ollama · claude · gpt]',
  'open   asworks.studio    [stripe · razorpay]',
  'sync   syting.realtime   [postgres · rls]',
  'ready  langshift         [25 targets]',
];

export default function Preloader() {
  const [stage, setStage] = useState<'boot' | 'out' | 'done'>(SHOW_PRELOADER ? 'boot' : 'done');
  const [lines, setLines] = useState(0);
  useScrollLock(stage === 'boot');

  useEffect(() => {
    if (stage !== 'boot') return;
    let n = 0;
    let hold = 0;
    const id = window.setInterval(() => {
      n++;
      setLines(n);
      if (n >= BOOT.length) {
        clearInterval(id);
        hold = window.setTimeout(() => setStage('out'), 380);
      }
    }, 165);
    return () => {
      clearInterval(id);
      clearTimeout(hold);
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== 'out') return;
    try {
      sessionStorage.setItem('as:booted', '1');
    } catch {
      /* storage unavailable */
    }
    const t = window.setTimeout(() => setStage('done'), 650);
    return () => clearTimeout(t);
  }, [stage]);

  if (stage === 'done') return null;
  const pct = Math.round((lines / BOOT.length) * 100);

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[900] flex items-center justify-center bg-[#050507] px-5 transition-opacity duration-[650ms] ${
        stage === 'out' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="orb" style={{ ['--c' as string]: 'rgba(120,170,255,0.9)', ['--o' as string]: 0.35, width: '60vmax', height: '60vmax', top: '-25vmax', left: '-20vmax' }} />
        <div className="orb" style={{ ['--c' as string]: 'rgba(180,140,255,0.9)', ['--o' as string]: 0.28, width: '50vmax', height: '50vmax', bottom: '-25vmax', right: '-15vmax', animationDelay: '-10s' }} />
      </div>

      <div
        className={`lg lg-dim relative w-full max-w-[460px] rounded-[28px] p-6 transition-[scale,translate] duration-[650ms] sm:p-7 ${
          stage === 'out' ? 'scale-[0.97] -translate-y-2' : ''
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="lg-chip font-display grid h-9 w-9 place-items-center rounded-xl text-[13px] font-bold">AS</span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-white">Abneesh Singh</p>
              <p className="font-code text-[10.5px] text-white/45">systems boot</p>
            </div>
          </div>
          <span className="font-code text-[12px] text-white/60 tabular-nums">{String(pct).padStart(3, '0')}%</span>
        </div>

        <div className="font-code min-h-[132px] space-y-1 text-[11px] leading-[1.75] text-white/55 sm:text-[11.5px]">
          {BOOT.slice(0, lines).map((l, i) => (
            <div key={l} className="anim-fade flex gap-2">
              <span className={i === BOOT.length - 1 ? 'text-[#8ff0d6]' : 'text-white/30'}>{i === BOOT.length - 1 ? '✓' : '›'}</span>
              <span className="whitespace-pre">{l}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--ice), var(--lilac), var(--mint))' }}
          />
        </div>
      </div>
    </div>
  );
}
