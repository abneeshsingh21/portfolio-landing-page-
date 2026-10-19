import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import ProjectVisual from './ProjectVisual';
import { Container, GlassLink, Reveal, SectionHeading } from './ui';
import { useTilt } from '../hooks/usePointerFx';
import { timeAgo, useGithubStats } from '../hooks/useGithubStats';
import { CATEGORIES, projects, type Category, type Project } from '../lib/data';
import { EVENTS } from '../lib/site';

// Code-split: the case study only loads when someone opens one
// (prefetched on card hover so it still opens instantly).
const loadModal = () => import('./CaseStudyModal');
const CaseStudyModal = lazy(loadModal);

function RepoMeta({ project }: { project: Project }) {
  const stats = useGithubStats(project.repo);
  if (!stats) return <span className="font-code text-[11px] text-white/30">{project.features.length} highlights</span>;
  return (
    <span className="anim-fade font-code flex items-center gap-3 text-[11px] text-white/50" title="Live from GitHub">
      <span className="inline-flex items-center gap-1">
        <Icon name="star" size={12} /> {stats.stars.toLocaleString()}
      </span>
      <span className="inline-flex items-center gap-1">
        <Icon name="fork" size={12} /> {stats.forks.toLocaleString()}
      </span>
      <span className="hidden text-white/35 sm:inline">pushed {timeAgo(stats.pushedAt)}</span>
    </span>
  );
}

function Pipeline({ project }: { project: Project }) {
  return (
    <div className="lg-chip relative flex h-full flex-col rounded-[20px] p-4 sm:rounded-[24px] sm:p-6">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-white/40 uppercase sm:text-[10.5px]">Compiler pipeline</p>
      <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
        {(project.pipeline ?? []).map((s, i, arr) => (
          <span key={s} className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-code rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.05] px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-[12px] text-white/85">{s}</span>
            {i < arr.length - 1 && <Icon name="arrowRight" size={12} className="text-white/30" />}
          </span>
        ))}
      </div>
      <div className="my-3 sm:my-4 flex items-center gap-2 text-white/25">
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-code text-[9.5px] sm:text-[10px] tracking-widest uppercase">targets</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {['Interpreter', 'Bytecode VM', 'LLVM native', 'WebAssembly'].map((t) => (
          <span key={t} className="font-code flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-white/10 bg-black/20 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10.5px] sm:text-[11.5px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: project.accent }} />
            <span className="truncate">{t}</span>
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-end justify-between pt-4 sm:pt-6">
        <div>
          <p className="font-display text-[32px] sm:text-[44px] leading-none font-semibold tracking-[-0.05em] text-white">4,000+</p>
          <p className="mt-1 text-[11px] sm:text-[12px] text-white/50">global downloads</p>
        </div>
        <span className="lg-chip rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] text-white/60">22-package stdlib</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, featured, onOpen }: { project: Project; index: number; featured: boolean; onOpen: () => void }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  useTilt(tiltRef, featured ? 2.5 : 4);
  const external = project.liveUrl ?? (project.isPrivate ? undefined : project.link);

  return (
    <Reveal delay={(index % 2) * 90} className={`h-full ${featured ? 'md:col-span-2' : ''}`}>
      <div ref={tiltRef} className="h-full">
        <article
          onPointerEnter={() => void loadModal()}
          className="lg lg-dim lg-spec lg-glow group relative flex h-full flex-col overflow-hidden rounded-[22px] p-4.5 sm:rounded-[30px] sm:p-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full opacity-30 transition-opacity duration-700 group-hover:opacity-80"
            style={{ background: `radial-gradient(circle, ${project.accent}55 0%, transparent 65%)` }}
          />

          <header className="relative flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-3.5">
              <span className="lg-chip grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl sm:rounded-2xl" style={{ color: project.accent }}>
                <Icon name={project.icon} size={18} />
              </span>
              <div className="leading-tight">
                <p className="font-code text-[10.5px] sm:text-[11px] text-white/40">
                  {String(index + 1).padStart(2, '0')} · {project.categories.join(' · ')}
                </p>
                <p className="mt-0.5 sm:mt-1 text-[11.5px] sm:text-[12.5px] text-white/60">{project.role}</p>
              </div>
            </div>
            {external ? (
              <GlassLink
                href={external}
                size="icon-sm"
                variant="glass"
                aria-label={`Open ${project.title} in a new tab`}
                className="relative z-[2] sm:h-10 sm:w-10"
                icon="arrowUpRight"
              />
            ) : (
              <span className="lg-chip relative z-[2] inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] sm:text-[11px] text-white/60">
                <Icon name="lock" size={11} /> Private
              </span>
            )}
          </header>

          {!featured && (
            <div className="relative mt-4 sm:mt-6">
              <ProjectVisual project={project} />
            </div>
          )}

          <div className={`relative ${featured ? 'mt-6 sm:mt-8' : 'mt-4 sm:mt-6'} flex-1 ${featured ? 'grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10' : 'flex flex-col'}`}>
            <div className="flex flex-col">
              <h3 className={`font-display font-semibold text-white ${featured ? 'text-[26px] sm:text-[40px] md:text-[48px]' : 'text-[22px] sm:text-[30px] md:text-[36px]'} leading-[1.05]`}>
                {project.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-[14px] leading-[1.55] text-white/85 sm:text-[17px]">{project.summary}</p>
              <p className={`mt-2.5 sm:mt-4 text-[13px] leading-[1.7] text-white/50 sm:text-[14px] ${featured ? '' : 'line-clamp-3'}`}>{project.description}</p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#07070b] sm:px-3 sm:py-1.5 sm:text-[11.5px]" style={{ background: project.accent }}>
                  <Icon name="sparkles" size={11} />
                  {project.impact}
                </span>
                {project.tags.slice(0, featured ? 5 : 4).map((t) => (
                  <span key={t} className="lg-chip rounded-full px-2.5 py-1 text-[11px] text-white/60 sm:px-3 sm:py-1.5 sm:text-[11.5px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {featured && project.pipeline && <Pipeline project={project} />}
          </div>

          <footer className="mt-5 sm:mt-8 flex items-center justify-between border-t border-white/[0.07] pt-3.5 sm:pt-5">
            <button
              type="button"
              onClick={onOpen}
              data-cursor="View"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[12.5px] sm:text-[13.5px] font-semibold text-white after:absolute after:inset-0 after:z-[1] after:rounded-[22px] sm:after:rounded-[30px] after:content-['']"
            >
              Read case study
              <Icon name="arrowRight" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <RepoMeta project={project} />
          </footer>
        </article>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [activeId, setActiveId] = useState<string | null>(null);

  const list = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))), [filter]);
  const active = projects.find((p) => p.id === activeId) ?? null;

  useEffect(() => {
    const onOpen = (e: Event) => setActiveId((e as CustomEvent<string>).detail);
    window.addEventListener(EVENTS.openProject, onOpen);
    return () => window.removeEventListener(EVENTS.openProject, onOpen);
  }, []);

  const navigate = (dir: 1 | -1) => {
    const i = projects.findIndex((p) => p.id === activeId);
    setActiveId(projects[(i + dir + projects.length) % projects.length].id);
  };

  return (
    <section id="projects" className="relative scroll-mt-24 py-12 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Selected"
          accent="works."
          description="Languages, AI tooling and commercial platforms — each one designed, engineered and shipped end to end."
          aside={
            <div className="relative max-w-full">
              <div
                role="group"
                aria-label="Filter projects"
                className="lg lg-spec no-scrollbar flex max-w-full items-center gap-1 overflow-x-auto rounded-full p-1 scroll-smooth overscroll-x-contain [-webkit-overflow-scrolling:touch]"
              >
                {CATEGORIES.map((c) => {
                  const on = filter === c;
                  const count = c === 'All' ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={on}
                      onClick={(e) => {
                        setFilter(c);
                        e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                      }}
                      className={`lg-press inline-flex h-[34px] sm:h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 sm:px-4 text-[12px] sm:text-[12.5px] font-medium transition-all duration-300 select-none ${
                        on
                          ? 'lg-bright shadow-sm font-semibold'
                          : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {c}
                      <span className={`font-code text-[10px] rounded-full px-1.5 py-0.5 ${on ? 'text-black/55 bg-black/10' : 'text-white/40 bg-white/5'}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          }
        />

        <div key={filter} className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {list.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={projects.indexOf(p)}
              featured={filter === 'All' && i === 0}
              onOpen={() => setActiveId(p.id)}
            />
          ))}
        </div>
      </Container>

      {active && (
        <Suspense fallback={null}>
          <CaseStudyModal
            project={active}
            index={projects.indexOf(active)}
            total={projects.length}
            onClose={() => setActiveId(null)}
            onNavigate={navigate}
          />
        </Suspense>
      )}
    </section>
  );
}
