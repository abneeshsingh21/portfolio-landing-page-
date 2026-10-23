import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { BeamEffect, GlassButton, GlassLink, RippleEffect } from './ui';
import { ripple } from '../hooks/usePointerFx';
import { useScrollLock } from '../hooks/useScrollLock';
import { useActiveSection } from '../hooks/useActiveSection';
import { navLinks } from '../lib/data';
import { EMAIL, LINKS, openInstallPrompt, openPalette, scrollToId } from '../lib/site';
import { usePortfolio } from '../context/PortfolioContext';

export function Monogram({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative grid shrink-0 place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: 'conic-gradient(from 200deg, #9fd0ff, #c7b2ff, #8ff0d6, #ffffff, #9fd0ff)',
        padding: 1.2,
      }}
      aria-hidden="true"
    >
      <span
        className="font-display grid h-full w-full place-items-center rounded-full text-[12px] font-bold text-white"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), rgba(20,22,30,0.92) 60%)',
          fontSize: size * 0.34,
          letterSpacing: '-0.02em',
        }}
      >
        AS
      </span>
    </span>
  );
}

export default function Navbar() {
  const { isDevOps, setMode, resumeUrl } = usePortfolio();
  const section = useActiveSection();
  const active = section === 'top' ? '' : section;
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const linkRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  useScrollLock(menu);

  // Scroll state: glass densifies after the hero, bar tucks away on scroll-down.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > 240);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Liquid indicator follows hover, rests on the active section.
  const measure = useCallback(() => {
    const key = hovered ?? active;
    const el = key ? linkRefs.current[key] : null;
    if (!el) {
      setIndicator((s) => ({ ...s, visible: false }));
      return;
    }
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, [hovered, active]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const go = (id: string) => {
    setMenu(false);
    window.setTimeout(() => scrollToId(id), menu ? 60 : 0);
  };

  const pill = `lg lg-refract lg-prism rounded-full ${scrolled || menu ? 'bg-[#090b16]/70 sm:bg-[#0a0c16]/60 backdrop-blur-2xl border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.45)]' : ''}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !menu ? '-translate-y-[130%]' : 'translate-y-0'
        }`}
      >
        <div className={`mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-3 transition-[padding] duration-500 sm:px-6 ${scrolled ? 'pt-3' : 'pt-4 sm:pt-6'}`}>
          {/* Brand */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go('top');
            }}
            className={`${pill} lg-spec lg-press flex h-12 items-center gap-2.5 pr-4 pl-1.5 sm:pr-5`}
            aria-label="Abneesh Singh — back to top"
          >
            <Monogram size={36} />
            <span className="leading-none">
              <span className="font-display block text-[14px] font-semibold tracking-[-0.02em] text-white">Abneesh Singh</span>
              <span className="mt-1 hidden items-center gap-1.5 text-[10.5px] font-medium text-white/50 sm:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {isDevOps ? 'DevOps & Cloud Intern' : 'Open to opportunities'}
              </span>
            </span>
          </a>

          {/* Center links */}
          <nav aria-label="Primary" className={`${pill} relative hidden h-12 items-center p-1 md:flex`} onMouseLeave={() => setHovered(null)}>
            <span
              aria-hidden="true"
              className="lg-mercury absolute top-1 bottom-1 rounded-full overflow-hidden"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.visible ? 1 : 0,
                transition: 'left 0.45s cubic-bezier(0.34,1.4,0.64,1), width 0.45s cubic-bezier(0.34,1.4,0.64,1), opacity 0.25s ease',
              }}
            >
              <BeamEffect className="lg-beam-active opacity-60" />
            </span>
            {navLinks.map((l) => (
              <button
                key={l.id}
                ref={(el) => {
                  linkRefs.current[l.id] = el;
                }}
                type="button"
                onMouseEnter={() => setHovered(l.id)}
                onFocus={() => setHovered(l.id)}
                onBlur={() => setHovered(null)}
                onPointerDown={ripple}
                onClick={() => go(l.id)}
                aria-current={active === l.id ? 'true' : undefined}
                className={`group lg-press relative z-[1] h-10 rounded-full px-4 text-[13px] font-medium transition-colors duration-300 overflow-hidden lg:px-5 ${
                  active === l.id || hovered === l.id ? 'text-white' : 'text-white/60'
                }`}
              >
                <RippleEffect />
                <span className="relative z-[1]">{l.name}</span>
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mode Switcher Pill */}
            <div className={`${pill} lg-spec relative hidden h-12 items-center rounded-full p-1 sm:flex`}>
              <button
                type="button"
                onClick={() => setMode('swe')}
                aria-label="Switch to Software Engineering Mode"
                className={`relative z-[1] flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-all duration-300 ${
                  !isDevOps ? 'text-white bg-white/15 shadow-[0_0_12px_rgba(159,208,255,0.35)]' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <span>⚡</span>
                <span>SWE</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('devops')}
                aria-label="Switch to DevOps Mode"
                className={`relative z-[1] flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-all duration-300 ${
                  isDevOps ? 'text-emerald-200 bg-emerald-500/25 shadow-[0_0_12px_rgba(143,240,214,0.35)]' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <span>☁️</span>
                <span>DevOps</span>
              </button>
            </div>

            <button
              type="button"
              onClick={openPalette}
              onPointerDown={ripple}
              aria-label="Open command palette"
              className={`${pill} lg-spec lg-press group relative hidden h-12 items-center gap-2 px-4 text-white/70 hover:text-white sm:flex overflow-visible`}
            >
              <BeamEffect />
              <RippleEffect />
              <Icon name="search" size={15} className="relative z-[1]" />
              <span className="font-code relative z-[1] flex items-center gap-0.5 text-[11px]">
                <kbd className="lg-chip rounded-md px-1.5 py-0.5">⌘</kbd>
                <kbd className="lg-chip rounded-md px-1.5 py-0.5">K</kbd>
              </span>
            </button>
            <GlassLink href={`mailto:${EMAIL}`} variant="primary" size="md" className="hidden h-12 lg:inline-flex" external={false}>
              Let’s talk
              <Icon name="arrowUpRight" size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </GlassLink>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              onPointerDown={ripple}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              className={`${pill} lg-press group relative grid h-12 w-12 place-items-center md:hidden overflow-visible`}
            >
              <BeamEffect />
              <RippleEffect />
              <span className="relative z-[1] block h-3 w-[18px]">
                <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-white transition-all duration-300 ${menu ? 'top-[5px] rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-white transition-all duration-300 ${menu ? 'top-[5px] -rotate-45' : 'top-[10px]'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {menu && (
        <>
          <div className="anim-fade fixed inset-0 z-[45] bg-black/45 backdrop-blur-[2px] md:hidden" onClick={() => setMenu(false)} aria-hidden="true" />
          <div id="mobile-menu" className="lg lg-strong anim-drop fixed inset-x-3 top-[76px] z-[46] rounded-[28px] p-2 md:hidden">
            {/* Mobile Mode Switcher */}
            <div className="mx-2 my-1 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-2">
              <span className="text-[12px] font-medium text-white/70 pl-2">Focus Mode</span>
              <div className="flex items-center gap-1 rounded-xl bg-black/40 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode('swe');
                    setMenu(false);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    !isDevOps ? 'bg-white/20 text-white' : 'text-white/40'
                  }`}
                >
                  ⚡ SWE
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('devops');
                    setMenu(false);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    isDevOps ? 'bg-emerald-500/30 text-emerald-300' : 'text-white/40'
                  }`}
                >
                  ☁️ DevOps
                </button>
              </div>
            </div>

            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((l, i) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => go(l.id)}
                  className="rise flex items-center justify-between rounded-2xl px-4 py-3.5 text-left active:bg-white/[0.06]"
                  style={{ ['--d' as string]: `${60 + i * 45}ms` }}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-code text-[11px] text-white/35">0{i + 1}</span>
                    <span className="font-display text-[24px] font-semibold text-white">{l.name}</span>
                  </span>
                  <Icon name="arrowRight" size={16} className={active === l.id ? 'text-white' : 'text-white/35'} />
                </button>
              ))}
            </nav>
            <div className="hairline my-2" />
            <div className="grid grid-cols-2 gap-2 p-2">
              <GlassLink href={resumeUrl} external size="md" icon="file" magnetic={false}>
                {isDevOps ? 'DevOps Résumé' : 'Résumé'}
              </GlassLink>
              <GlassButton
                size="md"
                icon="download"
                magnetic={false}
                onClick={() => {
                  setMenu(false);
                  openInstallPrompt();
                }}
              >
                Install App
              </GlassButton>
              <GlassLink href={LINKS.github} size="md" icon="github" magnetic={false}>
                GitHub
              </GlassLink>
              <GlassLink href={LINKS.linkedin} size="md" icon="linkedin" magnetic={false}>
                LinkedIn
              </GlassLink>
            </div>
            <div className="p-2 pt-0">
              <GlassLink href={`mailto:${EMAIL}`} external={false} variant="primary" size="lg" className="w-full" iconRight="arrowUpRight" magnetic={false}>
                Let’s talk
              </GlassLink>
            </div>
          </div>
        </>
      )}
    </>
  );
}
