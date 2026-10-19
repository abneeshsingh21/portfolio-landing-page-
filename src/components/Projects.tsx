import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import ProjectVisual from './ProjectVisual';
import { Container, Reveal, SectionHeading } from './ui';
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
    <div className="lg-chip relative flex h-full flex-col rounded-[24px] p-5 sm:p-6">
      <p className="text-[10.5px] font-semibold tracking-[0.22em] text-white/40 uppercase">Compiler pipeline</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {(project.pipeline ?? []).map((s, i, arr) => (
          <span key={s} className="flex items-center gap-2">
            <span className="font-code rounded-xl border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[12px] text-white/85">{s}</span>
            {i < arr.length - 1 && <Icon name="arrowRight" size={13} className="text-white/30" />}
          </span>
        ))}
      </div>
      <div className="my-4 flex items-center gap-2 text-white/25">
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-code text-[10px] tracking-widest uppercase">targets</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {['Interpreter', 'Bytecode VM', 'LLVM native', 'WebAssembly'].map((t) => (
          <span key={t} className="font-code flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-[11.5px] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
            {t}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-end justify-between pt-6">
        <div>
          <p className="font-display text-[44px] leading-none font-semibold tracking-[-0.05em] text-white">4,000+</p>
          <p className="mt-1.5 text-[12px] text-white/50">global downloads</p>
        </div>
        <span className="lg-chip rounded-full px-3 py-1 text-[11px] text-white/60">22-package stdlib</span>
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
          className="lg lg-dim lg-spec lg-glow group relative flex h-full flex-col overflow-hidden rounded-[30px] p-6 sm:p-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full opacity-30 transition-opacity duration-700 group-hover:opacity-80"
            style={{ background: `radial-gradient(circle, ${project.accent}55 0%, transparent 65%)` }}
          />

          <header className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="lg-chip grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ color: project.accent }}>
                <Icon name={project.icon} size={20} />
              </span>
              <div className="leading-tight">
                <p className="font-code text-[11px] text-white/40">
                  {String(index + 1).padStart(2, '0')} · {project.categories.join(' · ')}
                </p>
                <p className="mt-1 text-[12.5px] text-white/60">{project.role}</p>
              </div>
            </div>
            {external ? (
              <a
                href={external}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${project.title} in a new tab`}
                className="lg lg-spec lg-press relative z-[2] grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/80 hover:text-white"
              >
                <Icon name="arrowUpRight" size={16} />
              </a>
            ) : (
              <span className="lg-chip relative z-[2] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-white/60">
                <Icon name="lock" size={12} /> Private
              </span>
            )}
          </header>

          {!featured && (
            <div className="relative mt-6">
              <ProjectVisual project={project} />
            </div>
          )}

          <div className={`relative ${featured ? 'mt-8' : 'mt-6'} flex-1 ${featured ? 'grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-10' : 'flex flex-col'}`}>
            <div className="flex flex-col">
              <h3 className={`font-display font-semibold text-white ${featured ? 'text-[34px] sm:text-[48px]' : 'text-[30px] sm:text-[36px]'} leading-[1.02]`}>
                {project.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.55] text-white/85 sm:text-[17px]">{project.summary}</p>
              <p className={`mt-4 text-[14px] leading-[1.75] text-white/50 ${featured ? '' : 'line-clamp-3'}`}>{project.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold text-[#07070b]" style={{ background: project.accent }}>
                  <Icon name="sparkles" size={12} />
                  {project.impact}
                </span>
                {project.tags.slice(0, featured ? 5 : 4).map((t) => (
                  <span key={t} className="lg-chip rounded-full px-3 py-1.5 text-[11.5px] text-white/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {featured && project.pipeline && <Pipeline project={project} />}
          </div>

          <footer className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">
            <button
              type="button"
              onClick={onOpen}
              data-cursor="View"
              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-white after:absolute after:inset-0 after:z-[1] after:rounded-[30px] after:content-['']"
            >
              Read case study
              <Icon name="arrowRight" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
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
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Selected"
          accent="works."
          description="Languages, AI tooling and commercial platforms — each one designed, engineered and shipped end to end."
          aside={
            <div role="group" aria-label="Filter projects" className="lg flex max-w-full gap-1 overflow-x-auto rounded-full p-1">
              {CATEGORIES.map((c) => {
                const on = filter === c;
                const count = c === 'All' ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(c)}
                    className={`lg-press inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[12.5px] font-medium transition-colors duration-300 ${
                      on ? 'lg-bright' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {c}
                    <span className={`font-code text-[10px] ${on ? 'text-black/45' : 'text-white/30'}`}>{count}</span>
                  </button>
                );
              })}
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
