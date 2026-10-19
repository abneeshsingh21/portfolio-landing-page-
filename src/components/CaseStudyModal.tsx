import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { GlassLink } from './ui';
import { useScrollLock } from '../hooks/useScrollLock';
import type { Project } from '../lib/data';

interface Props {
  project: Project | null;
  index: number;
  total: number;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function linkLabel(link: string) {
  if (link.includes('github.com')) return 'View on GitHub';
  if (link.includes('marketplace')) return 'VS Code Marketplace';
  return 'Launch platform';
}

export default function CaseStudyModal({ project, index, total, onClose, onNavigate }: Props) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const open = !!project;
  useScrollLock(open);

  const requestClose = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
      restoreRef.current?.focus?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [project?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
      else if (e.key === 'ArrowRight') onNavigate(1);
      else if (e.key === 'ArrowLeft') onNavigate(-1);
      else if (e.key === 'Tab' && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, requestClose, onNavigate]);

  if (!project) return null;
  const secondary = project.liveUrl && project.liveUrl !== project.link;

  return (
    <div className="fixed inset-0 z-[300] flex items-end justify-end sm:items-stretch">
      <div className={`absolute inset-0 bg-black/55 backdrop-blur-[4px] ${closing ? 'anim-fade-out' : 'anim-fade'}`} onClick={requestClose} aria-hidden="true" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className={`lg lg-strong relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-[30px] sm:h-full sm:max-w-[880px] sm:rounded-t-none sm:rounded-l-[34px] ${
          closing ? 'anim-sheet-out' : 'anim-sheet'
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => onNavigate(-1)} aria-label="Previous project" className="lg-press grid h-10 w-10 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white">
              <Icon name="chevronLeft" size={18} />
            </button>
            <span className="font-code px-1 text-[11px] text-white/40 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => onNavigate(1)} aria-label="Next project" className="lg-press grid h-10 w-10 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white">
              <Icon name="chevronRight" size={18} />
            </button>
          </div>
          <button ref={closeRef} type="button" onClick={requestClose} aria-label="Close case study" className="lg lg-spec lg-press grid h-10 w-10 place-items-center rounded-full text-white/80 hover:text-white">
            <Icon name="x" size={17} />
          </button>
        </div>
        <div className="hairline" />

        <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain">
          {/* Hero */}
          <div key={project.id} className="anim-fade relative px-6 pt-10 pb-10 sm:px-12 sm:pt-14">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 -right-32 h-[460px] w-[460px] rounded-full opacity-60"
              style={{ background: `radial-gradient(circle, ${project.accent}40 0%, transparent 65%)` }}
            />
            <div className="relative flex items-center gap-3">
              <span className="lg-chip grid h-12 w-12 place-items-center rounded-2xl" style={{ color: project.accent }}>
                <Icon name={project.icon} size={21} />
              </span>
              <span className="lg-chip rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">{project.role}</span>
            </div>
            <h2 id="case-title" className="font-display relative mt-6 text-[40px] leading-[1.02] font-semibold text-white sm:text-[60px]">
              {project.title}
            </h2>
            <p className="relative mt-4 max-w-xl text-[17px] leading-[1.6] text-white/75 sm:text-[19px]">{project.summary}</p>

            <div className="relative mt-8 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
              <div className="lg-chip rounded-[22px] p-5 sm:p-6">
                <p className="text-[10.5px] font-semibold tracking-[0.22em] text-white/40 uppercase">Executive summary</p>
                <p className="mt-3 text-[14.5px] leading-[1.8] text-white/70">{project.description}</p>
              </div>
              <div className="flex flex-col justify-between rounded-[22px] p-5 sm:p-6" style={{ background: `linear-gradient(160deg, ${project.accent}26, rgba(255,255,255,0.03))`, border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-[10.5px] font-semibold tracking-[0.22em] text-white/50 uppercase">Key metric</p>
                <p className="font-display mt-6 text-[30px] leading-[1.05] font-semibold text-white sm:text-[34px]">{project.impact}</p>
              </div>
            </div>
          </div>

          <div className="hairline" />

          {/* Problem / solution */}
          <div className="grid gap-4 px-6 py-10 sm:grid-cols-2 sm:px-12">
            {[
              { k: 'The problem', v: project.problem, icon: 'zap' as const },
              { k: 'The solution', v: project.solution, icon: 'shield' as const },
            ].map((b) => (
              <div key={b.k} className="lg-chip rounded-[22px] p-5 sm:p-6">
                <p className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.22em] text-white/45 uppercase">
                  <Icon name={b.icon} size={13} /> {b.k}
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.8] text-white/70">{b.v}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="px-6 pb-10 sm:px-12">
            <p className="text-[10.5px] font-semibold tracking-[0.22em] text-white/45 uppercase">Architecture highlights</p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 transition-colors hover:bg-white/[0.06]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: `${project.accent}26`, color: project.accent }}>
                    <Icon name="check" size={12} stroke={2.6} />
                  </span>
                  <span className="text-[13.5px] text-white/80">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack + actions */}
          <div className="flex flex-col gap-6 px-6 pb-12 sm:flex-row sm:items-end sm:justify-between sm:px-12">
            <div>
              <p className="text-[10.5px] font-semibold tracking-[0.22em] text-white/45 uppercase">Core stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="lg-chip rounded-full px-3 py-1.5 text-[12px] text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {project.isPrivate ? (
                <span className="lg-chip inline-flex h-11 items-center gap-2 rounded-full px-5 text-[13px] text-white/70">
                  <Icon name="lock" size={14} /> Private, proprietary platform
                </span>
              ) : (
                <>
                  {secondary && (
                    <GlassLink href={project.liveUrl} variant="primary" size="md" iconRight="arrowUpRight" magnetic={false}>
                      Visit website
                    </GlassLink>
                  )}
                  <GlassLink href={project.link} variant={secondary ? 'glass' : 'primary'} size="md" iconRight="arrowUpRight" magnetic={false}>
                    {linkLabel(project.link)}
                  </GlassLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
