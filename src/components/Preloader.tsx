import { useEffect, useState } from 'react';
import { BeamEffect } from './ui';
import { SHOW_PRELOADER } from '../lib/site';
import { useScrollLock } from '../hooks/useScrollLock';

interface BootStep {
  cmd: string;
  target: string;
  meta: string;
  isReady?: boolean;
}

const BOOT_STEPS: BootStep[] = [
  { cmd: 'mount', target: 'epl.compiler', meta: 'llvm · wasm · vm' },
  { cmd: 'link', target: 'neuroshell.core', meta: 'c++20 · pybind11' },
  { cmd: 'route', target: 'llm.gateway', meta: 'ollama · claude · gpt' },
  { cmd: 'open', target: 'asworks.studio', meta: 'stripe · razorpay' },
  { cmd: 'sync', target: 'syting.realtime', meta: 'postgres · rls' },
  { cmd: 'ready', target: 'langshift', meta: '25 targets', isReady: true },
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
      if (n >= BOOT_STEPS.length) {
        clearInterval(id);
        hold = window.setTimeout(() => setStage('out'), 420);
      }
    }, 175);
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
  const pct = Math.round((lines / BOOT_STEPS.length) * 100);

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[900] flex items-center justify-center bg-[#050508]/95 backdrop-blur-2xl px-5 transition-all duration-[650ms] ${
        stage === 'out' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Central luminous caustics orbs positioned directly behind the card */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            ['--c' as string]: 'rgba(120, 170, 255, 0.95)',
            ['--o' as string]: 0.42,
            width: '46vmax',
            height: '46vmax',
          }}
        />
        <div
          className="orb absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            ['--c' as string]: 'rgba(180, 140, 255, 0.85)',
            ['--o' as string]: 0.35,
            width: '38vmax',
            height: '38vmax',
            animationDelay: '-6s',
          }}
        />
        <div
          className="orb absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            ['--c' as string]: 'rgba(140, 240, 210, 0.75)',
            ['--o' as string]: 0.28,
            width: '30vmax',
            height: '30vmax',
            animationDelay: '-12s',
          }}
        />
      </div>

      {/* Floating Liquid Glass Chassis */}
      <div
        className={`lg lg-dim lg-spec group relative w-full max-w-[480px] rounded-[28px] sm:rounded-[32px] p-6 sm:p-7.5 transition-all duration-[650ms] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.8),inset_0_1px_1.5px_0_rgba(255,255,255,0.35)] overflow-visible ${
          stage === 'out' ? 'scale-[1.04] opacity-0 blur-md -translate-y-2' : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Rotating Chromatic Border Beam */}
        <BeamEffect />

        {/* Header: Monogram, Status Heartbeat & Percent */}
        <div className="relative z-[1] mb-5 flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="lg-chip font-display relative grid h-10 w-10 place-items-center rounded-2xl text-[13px] font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]">
              AS
            </span>
            <div className="leading-tight">
              <p className="text-[13.5px] font-semibold text-white tracking-[-0.01em]">Abneesh Singh</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p className="font-code text-[11px] text-white/50">systems boot</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span
              className={`font-code text-[13px] font-semibold tabular-nums transition-colors duration-300 ${
                pct === 100 ? 'text-[#8ff0d6]' : 'text-white/80'
              }`}
            >
              {String(pct).padStart(3, '0')}%
            </span>
            <p className="font-code text-[10px] text-white/35 uppercase tracking-wider">
              {pct === 100 ? 'online' : 'loading'}
            </p>
          </div>
        </div>

        {/* Syntax-Highlighted Boot Matrix */}
        <div className="relative z-[1] font-code min-h-[148px] space-y-1.5 text-[11px] leading-[1.7] sm:text-[11.5px]">
          {BOOT_STEPS.slice(0, lines).map((step, i) => {
            const isLatest = i === lines - 1;
            return (
              <div
                key={step.target}
                className="anim-fade flex items-center justify-between gap-2 rounded-lg px-1.5 py-0.5 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`shrink-0 font-bold ${step.isReady ? 'text-[#8ff0d6]' : isLatest ? 'text-cyan-300' : 'text-white/35'}`}>
                    {step.isReady ? '✓' : '›'}
                  </span>
                  <span className={`font-semibold ${step.isReady ? 'text-[#8ff0d6]' : 'text-cyan-300/90'}`}>
                    {step.cmd}
                  </span>
                  <span className="text-white/90 truncate">{step.target}</span>
                </div>
                <span className="shrink-0 text-[10px] text-purple-200/70 border border-white/10 bg-white/[0.04] rounded-md px-2 py-0.5 tracking-tight">
                  [{step.meta}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Fiber-Optic Liquid Progress Bar with Comet Head */}
        <div className="relative z-[1] mt-5 h-1 w-full overflow-hidden rounded-full bg-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
          <div
            className="relative h-full rounded-full transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #9fd0ff 0%, #c7b2ff 55%, #8cf0d2 100%)' }}
          >
            {/* Comet glowing head */}
            {pct > 0 && pct < 100 && (
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_2px_#8cf0d2,0_0_18px_#9fd0ff]"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
