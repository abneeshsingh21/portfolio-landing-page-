import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { BeamEffect } from './ui';
import { useTilt } from '../hooks/usePointerFx';
import { prefersReducedMotion } from '../lib/site';

type Kind = 'out' | 'ok' | 'block' | 'info';
interface Scene {
  prompt: string;
  lines: { kind: Kind; text: string }[];
}

const SCENES: Scene[] = [
  {
    prompt: 'compress every log file older than 7 days',
    lines: [
      { kind: 'info', text: 'intent · archive   source · offline dictionary' },
      { kind: 'out', text: 'find . -name "*.log" -mtime +7 -exec gzip {} \\;' },
      { kind: 'ok', text: 'Zero-Trust shield · 4/4 layers passed' },
    ],
  },
  {
    prompt: 'wipe everything from the root directory',
    lines: [
      { kind: 'out', text: 'rm -rf /' },
      { kind: 'block', text: 'Blocked · destructive pattern intercepted' },
    ],
  },
  {
    prompt: 'show the five largest folders here',
    lines: [
      { kind: 'info', text: 'intent · inspect    routed · ollama (local)' },
      { kind: 'out', text: 'du -sh */ | sort -rh | head -5' },
      { kind: 'ok', text: 'Safe · read-only operation' },
    ],
  },
];

const tone: Record<Kind, string> = {
  out: 'text-white',
  info: 'text-white/40',
  ok: 'text-[#8ff0d6]',
  block: 'text-[#ff9d9d]',
};

const glyph: Record<Kind, string> = { out: '→', info: '·', ok: '✓', block: '✕' };

/** Animated NeuroShell session: plain English in, safe shell out. */
export default function HeroTerminal({ startDelay = 0 }: { startDelay?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  useTilt(tiltRef, 6);
  const [scene, setScene] = useState(0);
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? SCENES[0].prompt.length : 0));
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? SCENES[0].lines.length : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let t = 0;
    let s = 0;
    let c = 0;
    let l = 0;
    // Pause the session while it's off-screen or the tab is hidden.
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
    });
    if (rootRef.current) io.observe(rootRef.current);
    const later = (fn: () => void, ms: number) => {
      t = window.setTimeout(() => (onScreen && !document.hidden ? fn() : later(fn, 500)), ms);
    };

    const typeNext = () => {
      const sc = SCENES[s];
      if (c < sc.prompt.length) {
        c++;
        setTyped(c);
        later(typeNext, 32 + Math.random() * 40);
      } else {
        later(showNext, 420);
      }
    };
    const showNext = () => {
      const sc = SCENES[s];
      if (l < sc.lines.length) {
        l++;
        setShown(l);
        later(showNext, l === 1 ? 380 : 520);
      } else {
        later(nextScene, 2600);
      }
    };
    const nextScene = () => {
      s = (s + 1) % SCENES.length;
      c = 0;
      l = 0;
      setScene(s);
      setTyped(0);
      setShown(0);
      later(typeNext, 350);
    };

    later(typeNext, startDelay + 600);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [startDelay]);

  const sc = SCENES[scene];
  const typing = typed < sc.prompt.length;

  return (
    <div ref={rootRef} className="relative">
      <div ref={tiltRef} style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="lg-preloader lg-spec group relative overflow-hidden rounded-[28px] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.8),inset_0_1.5px_1.5px_0_rgba(255,255,255,0.45)]"
          aria-label="NeuroShell demo session"
          role="img"
        >
          {/* Subtle perimeter chromatic beam */}
          <BeamEffect className="lg-beam-active opacity-45 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Title bar */}
          <div className="relative z-[1] flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b] shadow-[0_0_8px_rgba(255,107,107,0.7),inset_0_1px_1px_rgba(255,255,255,0.8)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166] shadow-[0_0_8px_rgba(255,209,102,0.7),inset_0_1px_1px_rgba(255,255,255,0.8)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0] shadow-[0_0_8px_rgba(6,214,160,0.7),inset_0_1px_1px_rgba(255,255,255,0.8)]" />
            </div>
            <span className="font-code text-[11px] text-white/55">neuroshell — ~/projects</span>
            <span className="lg-chip font-code rounded-full px-2.5 py-0.5 text-[10px] text-white/70 border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
              C++20
            </span>
          </div>

          {/* Session */}
          <div className="relative z-[1] font-code min-h-[228px] px-5 py-5 text-[12.5px] leading-[1.9]">
            <div className="flex gap-2">
              <span className="text-[#9fd0ff]">❯</span>
              <span className="text-white/90">
                {sc.prompt.slice(0, typed)}
                {(typing || shown === 0) && <span className="caret text-[#9fd0ff]" />}
              </span>
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              {sc.lines.slice(0, shown).map((line, i) => (
                <div key={`${scene}-${i}`} className={`anim-fade flex gap-2 ${tone[line.kind]}`}>
                  <span className="w-3 shrink-0 text-center opacity-80">{glyph[line.kind]}</span>
                  <span
                    className={
                      line.kind === 'out'
                        ? 'lg-chip rounded-lg px-2.5 py-0.5 break-all border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
                        : line.kind === 'block'
                          ? 'rounded-lg bg-[#ff6b6b]/15 px-2.5 py-0.5 border border-[#ff6b6b]/25'
                          : ''
                    }
                  >
                    {line.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-[1] hairline" />
          <div className="relative z-[1] flex flex-wrap items-center gap-2 px-5 py-3.5">
            {['Plain English', 'Multi-LLM', 'Offline mode', '4-layer shield'].map((c) => (
              <span key={c} className="lg-chip rounded-full px-2.5 py-1 text-[10.5px] font-medium text-white/65 border border-white/10">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating proof points */}
      <div className="lg-prism float-slow absolute top-[calc(100%+14px)] left-0 z-10 hidden items-center gap-3 rounded-2xl py-3 pr-5 pl-3 xl:flex">
        <span className="lg-chip grid h-9 w-9 place-items-center rounded-xl text-[#9fd0ff] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
          <Icon name="book" size={16} />
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold text-white">EPL Ecosystem</span>
          <span className="block text-[11px] text-white/55">4,000+ global downloads</span>
        </span>
      </div>
      <div
        className="lg-prism float-slow absolute bottom-[calc(100%+12px)] right-0 z-10 hidden items-center gap-2 rounded-full py-2 pr-4 pl-2.5 xl:flex"
        style={{ animationDelay: '-3.5s' }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/80" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[12px] font-medium text-white/90">asworks.studio · live</span>
      </div>
    </div>
  );
}
