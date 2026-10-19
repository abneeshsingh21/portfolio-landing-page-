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
      className={`fixed inset-0 z-[900] flex items-center justify-center bg-[#04060c]/82 backdrop-blur-xl px-5 transition-all duration-[650ms] ${
        stage === 'out' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Central luminous caustics orbs positioned directly behind the card */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center">
        <div
          className="orb absolute"
          style={{
            ['--c' as string]: 'rgba(100, 180, 255, 0.95)',
            ['--o' as string]: 0.55,
            width: '48vmax',
            height: '48vmax',
          }}
        />
        <div
          className="orb absolute"
          style={{
            ['--c' as string]: 'rgba(195, 145, 255, 0.88)',
            ['--o' as string]: 0.45,
            width: '40vmax',
            height: '40vmax',
            animationDelay: '-6s',
          }}
        />
        <div
          className="orb absolute"
          style={{
            ['--c' as string]: 'rgba(135, 250, 215, 0.82)',
            ['--o' as string]: 0.38,
            width: '32vmax',
            height: '32vmax',
            animationDelay: '-12s',
          }}
        />
      </div>

      {/* Floating Liquid Glass Chassis */}
      <div
        className={`lg-preloader lg-spec group relative w-full max-w-[480px] rounded-[28px] sm:rounded-[32px] p-6 sm:p-7.5 transition-all duration-[650ms] overflow-visible ${
          stage === 'out' ? 'scale-[1.04] opacity-0 blur-md -translate-y-2' : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Rotating Chromatic Border Beam — Always active and spinning */}
        <BeamEffect className="lg-beam-active" />

        {/* Header: Monogram, Status Heartbeat & Percent */}
        <div className="relative z-[1] mb-5 flex items-center justify-between border-b border-white/[0.12] pb-4">
          <div className="flex items-center gap-3">
            <span className="lg-chip font-display relative grid h-10 w-10 place-items-center rounded-2xl text-[13px] font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] border border-white/25">
              AS
            </span>
            <div className="leading-tight">
              <p className="text-[13.5px] font-semibold text-white tracking-[-0.01em]">Abneesh Singh</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/80" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p className="font-code text-[11px] text-white/60">systems boot</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span
              className={`font-code text-[14px] font-semibold tabular-nums transition-colors duration-300 ${
                pct === 100 ? 'text-[#8ff0d6]' : 'text-white/90'
              }`}
            >
              {String(pct).padStart(3, '0')}%
            </span>
            <p className="font-code text-[10px] text-white/40 uppercase tracking-wider">
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
                className="anim-fade flex items-center justify-between gap-2 rounded-lg px-2 py-0.5 transition-colors duration-300 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05]"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`shrink-0 font-bold ${step.isReady ? 'text-[#8ff0d6]' : isLatest ? 'text-cyan-300' : 'text-white/40'}`}>
                    {step.isReady ? '✓' : '›'}
                  </span>
                  <span className={`font-semibold tracking-wide ${step.isReady ? 'text-[#8ff0d6]' : 'text-cyan-300'}`}>
                    {step.cmd}
                  </span>
                  <span className="text-white/90 truncate">{step.target}</span>
                </div>
                <span className="shrink-0 text-[10px] text-purple-200/90 border border-white/15 bg-white/[0.06] rounded-md px-2 py-0.5 tracking-tight shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  [{step.meta}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Fiber-Optic Liquid Progress Bar with Comet Head */}
        <div className="relative z-[1] mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.1] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] border border-white/10">
          <div
            className="relative h-full rounded-full transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #9fd0ff 0%, #c7b2ff 55%, #8cf0d2 100%)' }}
          >
            {/* Comet glowing head */}
            {pct > 0 && pct < 100 && (
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-[0_0_12px_3px_#8cf0d2,0_0_22px_#9fd0ff]"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
