import { useEffect, useRef } from 'react';
import Icon from './Icon';
import HeroTerminal from './HeroTerminal';
import { Container, GlassButton, GlassLink } from './ui';
import { useCountUp } from '../hooks/useCountUp';
import { useTypewriter } from '../hooks/useTypewriter';
import { heroStats } from '../lib/data';
import { DEVOPS_PHRASES, devopsHeroStats } from '../lib/devops-data';
import { INTRO_DELAY, LINKS, canHover, copyEmail, prefersReducedMotion, scrollToId } from '../lib/site';
import { usePortfolio } from '../context/PortfolioContext';

const PHRASES = [
  'generative AI & agentic systems.',
  'high-performance C++ engines.',
  'compilers & developer tooling.',
  'scalable production platforms.',
] as const;

const d = (ms: number) => ({ ['--d' as string]: `${INTRO_DELAY + ms}ms` });

function Stat({ stat, index }: { stat: (typeof heroStats)[number]; index: number }) {
  const ref = useCountUp({
    target: stat.value ?? 0,
    decimals: stat.decimals ?? 0,
    suffix: stat.suffix ?? '',
    delay: INTRO_DELAY + 500 + index * 120,
    duration: 1600,
  });
  return (
    <div className="group relative flex flex-col px-4 py-4 sm:px-7 sm:py-6">
      <span className="font-display text-[26px] leading-none font-semibold tracking-[-0.05em] text-white tabular-nums sm:text-[42px]">
        {stat.text ? (
          <span className="inline-flex items-center gap-2 sm:gap-2.5">
            {stat.text}
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400" />
            </span>
          </span>
        ) : (
          <span ref={ref} />
        )}
      </span>
      <span className="mt-2 text-[11.5px] font-medium text-white/80 sm:mt-2.5 sm:text-[12.5px]">{stat.label}</span>
      <span className="mt-0.5 text-[10.5px] text-white/40 sm:text-[11px]">{stat.sub}</span>
    </div>
  );
}

/**
 * Scroll + pointer parallax for the hero. The headline drifts and fades as you
 * scroll away, the live demo floats on its own plane, and a soft light follows
 * the cursor for the glass to refract. Only transform/opacity are written, from
 * a single rAF loop that sleeps once everything has settled.
 */
function useHeroMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;
    const hover = canHover();
    let raf = 0;
    const t = { px: 0, py: 0, lx: window.innerWidth * 0.7, ly: window.innerHeight * 0.35 };
    const c = { ...t };

    const frame = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
      let moving = false;
      for (const k of ['px', 'py', 'lx', 'ly'] as const) {
        const d = t[k] - c[k];
        if (Math.abs(d) > 0.05) {
          c[k] += d * 0.08;
          moving = true;
        }
      }
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(${(c.px * -10).toFixed(2)}px, ${(c.py * -8 - p * 90).toFixed(2)}px, 0)`;
        copyRef.current.style.opacity = String(1 - p * 0.95);
      }
      if (demoRef.current) {
        demoRef.current.style.transform = `translate3d(${(c.px * 16).toFixed(2)}px, ${(c.py * 12 - p * 150).toFixed(2)}px, 0)`;
      }
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${(c.lx - 350).toFixed(1)}px, ${(c.ly - 350).toFixed(1)}px, 0)`;
      }
      if (moving) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onPointer = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      if (r.bottom < 0) return;
      t.px = (e.clientX / window.innerWidth - 0.5) * 2;
      t.py = (e.clientY / window.innerHeight - 0.5) * 2;
      t.lx = e.clientX - r.left;
      t.ly = e.clientY - r.top;
      kick();
    };
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 1.2) kick();
    };

    kick();
    if (hover) window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { sectionRef, copyRef, demoRef, lightRef };
}

export default function Hero() {
  const { isDevOps, resumeUrl } = usePortfolio();
  const phrases = isDevOps ? DEVOPS_PHRASES : PHRASES;
  const typed = useTypewriter(phrases, { startDelay: INTRO_DELAY + 900 });
  const { sectionRef, copyRef, demoRef, lightRef } = useHeroMotion();
  const activeStats = isDevOps ? devopsHeroStats : heroStats;

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-[100svh] flex-col pt-28 pb-10 sm:pt-36 lg:pt-40">
      {/* Cursor-following light the glass refracts */}
      <div
        ref={lightRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -z-10 hidden h-[700px] w-[700px] rounded-full md:block"
        style={{
          background: 'radial-gradient(circle, rgba(159,208,255,0.2) 0%, rgba(199,178,255,0.12) 35%, transparent 68%)',
          transform: 'translate3d(60vw, 0, 0)',
        }}
      />

      <Container className="flex flex-1 flex-col">
        <div className="grid flex-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <div ref={copyRef} style={{ willChange: 'transform' }}>
            <div className="rise" style={d(0)}>
              <span className="lg lg-spec inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5">
                <span className="lg-bright inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[10.5px] font-bold tracking-[0.06em] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Open to work
                </span>
                <span className="text-[12.5px] text-white/75">
                  {isDevOps ? 'DevOps & Cloud Engineering Intern' : 'Agentic AI & Systems Engineer'}
                </span>
              </span>
            </div>

            <h1 className="font-display txt-shadow mt-7 text-[clamp(44px,7.4vw,96px)] leading-[0.98] font-semibold text-white">
              <span className="line-mask">
                <span className="line-rise" style={d(80)}>
                  Architecting
                </span>
              </span>
              <span className="line-mask">
                <span className="line-rise" style={d(170)}>
                  <span className="font-accent text-iridescent">{isDevOps ? 'resilient' : 'intelligent'}</span>{' '}
                  {isDevOps ? 'cloud' : 'systems'}
                </span>
              </span>
              <span className="line-mask">
                <span className="line-rise text-fade" style={d(260)}>
                  at machine speed.
                </span>
              </span>
            </h1>

            <p className="rise mt-7 max-w-[560px] text-[16px] leading-[1.7] text-white/70 sm:text-[18px]" style={d(420)}>
              Hey, I’m <span className="font-semibold text-white">Abneesh Singh</span>. I {isDevOps ? 'engineer' : 'build'}{' '}
              <span className="text-white">
                {typed}
                <span className="caret text-[#9fd0ff]" />
              </span>
              <br className="hidden sm:block" />{' '}
              <span className="text-white/50">{isDevOps ? 'What are we deploying next?' : 'What are we building next?'}</span>
            </p>
            </div>

            <div className="rise mt-6 sm:mt-9 flex flex-wrap items-center gap-2.5 sm:gap-3" style={d(520)}>
              <GlassButton variant="primary" size="md" className="sm:h-[52px] sm:px-7" iconRight="arrowRight" onClick={() => scrollToId('projects')}>
                View projects
              </GlassButton>
              <GlassLink href={resumeUrl} external size="md" className="sm:h-[52px] sm:px-7" icon="download">
                {isDevOps ? 'DevOps Résumé' : 'Résumé'}
              </GlassLink>
              <GlassButton size="md" className="sm:h-[52px] sm:px-7" icon="copy" onClick={() => void copyEmail()} aria-label="Copy email address">
                <span className="hidden sm:inline">Copy email</span>
                <span className="sm:hidden">Email</span>
              </GlassButton>
            </div>

            <div className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-white/45" style={d(620)}>
              {[
                { label: 'GitHub', href: LINKS.github, icon: 'github' as const },
                { label: 'LinkedIn', href: LINKS.linkedin, icon: 'linkedin' as const },
                { label: 'asworks.studio', href: LINKS.asworks, icon: 'globe' as const },
                { label: 'VS Code extension', href: LINKS.langshift, icon: 'vscode' as const },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 py-1 transition-colors hover:text-white"
                >
                  <Icon name={s.icon} size={13} />
                  {s.label}
                  <Icon name="arrowUpRight" size={11} className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-70" />
                </a>
              ))}
            </div>
          </div>

          {/* Live demo */}
          <div className="rise hidden lg:col-span-5 lg:block" style={d(360)}>
            <div ref={demoRef} style={{ willChange: 'transform' }}>
              <HeroTerminal startDelay={INTRO_DELAY} isDevOps={isDevOps} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="rise mt-8 sm:mt-16" style={d(700)}>
          <div className="lg-prism grid grid-cols-2 overflow-hidden rounded-[20px] sm:rounded-[28px] md:grid-cols-4">
            {activeStats.map((s, i) => (
              <div
                key={s.label}
                className={`${i % 2 === 0 ? 'border-r border-white/[0.08]' : ''} ${i < 2 ? 'border-b border-white/[0.08] md:border-b-0' : ''} ${
                  i === 1 ? 'md:border-r md:border-white/[0.08]' : ''
                }`}
              >
                <Stat stat={s} index={i} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
