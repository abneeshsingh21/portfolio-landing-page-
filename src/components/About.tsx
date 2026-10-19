import Icon from './Icon';
import { Monogram } from './Navbar';
import { Container, GlassButton, GlassLink, Reveal, SectionHeading } from './ui';
import { focusAreas } from '../lib/data';
import { LINKS, RESUME_URL, copyEmail, scrollToId } from '../lib/site';

const card = 'lg-prism lg-spec lg-glow rounded-[22px] sm:rounded-[30px] p-4.5 sm:p-7 lg:p-8';

const now = [
  { title: 'Operating ASWorks', body: 'A live commercial marketplace at asworks.studio', live: true, href: LINKS.asworks },
  { title: 'Growing the EPL ecosystem', body: '4,000+ global downloads and counting', href: LINKS.epl },
  { title: 'B.Tech CSE · AI & ML', body: 'Jagran Lakecity University · expected 2027' },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-12 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Engineering at the boundary of"
          accent="machine performance & human intent."
        />

        <div className="grid gap-3 sm:gap-5 lg:grid-cols-12">
          {/* Lead */}
          <Reveal className={`${card} lg:col-span-8`}>
            <p className="text-[16px] leading-[1.65] font-light text-white/85 sm:text-[20px] lg:text-[22px]">
              I’m a software engineer and open-source creator focused on{' '}
              <span className="font-medium text-white">high-performance systems</span> and{' '}
              <span className="font-medium text-white">practical AI</span>. With strong roots in C++, SQL and modern Generative AI,
              my goal is to make computing intuitive and accessible.
            </p>
            <div className="hairline my-4 sm:my-7" />
            <p className="text-[13.5px] leading-[1.75] text-white/60 sm:text-[15.5px] sm:leading-[1.85]">
              I created <span className="text-white">EPL</span> (English Programming Language), an open-source language that lets
              anyone code in plain English and has reached over 4,000 global downloads — and{' '}
              <span className="text-white">NeuroShell</span>, an intelligent terminal that pairs a native C++ engine with AI to turn
              plain English into safe command-line execution.
            </p>
          </Reveal>

          {/* Profile */}
          <Reveal delay={90} className={`${card} flex flex-col lg:col-span-4`}>
            <div className="flex items-center gap-3.5">
              <Monogram size={46} />
              <div>
                <p className="font-display text-[18px] font-semibold text-white sm:text-[20px]">Abneesh Singh</p>
                <p className="text-[11.5px] text-white/50 sm:text-[12.5px]">Agentic AI &amp; Systems Engineer</p>
              </div>
            </div>
            <div className="lg-chip mt-4 sm:mt-6 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <span className="mt-0.5 text-[#c7b2ff]">
                  <Icon name="graduation" size={16} />
                </span>
                <div>
                  <p className="text-[12.5px] font-semibold text-white sm:text-[13.5px]">B.Tech in Computer Science</p>
                  <p className="mt-0.5 text-[11.5px] text-white/55 sm:text-[12.5px]">Specialisation: Artificial Intelligence &amp; Machine Learning</p>
                  <p className="font-code mt-1.5 text-[10px] tracking-wide text-white/35 uppercase sm:text-[10.5px]">Jagran Lakecity University · 2027</p>
                </div>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-4 sm:pt-6">
              <GlassLink href={RESUME_URL} external size="sm" icon="file" magnetic={false}>
                Résumé
              </GlassLink>
              <GlassButton size="sm" variant="ghost" icon="copy" magnetic={false} onClick={() => void copyEmail()}>
                Copy email
              </GlassButton>
            </div>
          </Reveal>

          {/* Right now */}
          <Reveal delay={60} className={`${card} lg:col-span-5`}>
            <p className="text-[10.5px] font-semibold tracking-[0.22em] text-white/45 uppercase sm:text-[11px]">Right now</p>
            <ul className="mt-3.5 sm:mt-5 flex flex-col gap-0.5 sm:gap-1">
              {now.map((n) => {
                const inner = (
                  <>
                    <span className="relative mt-1.5 flex h-2 w-2 shrink-0">
                      {n.live && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />}
                      <span className={`relative h-2 w-2 rounded-full ${n.live ? 'bg-emerald-400' : 'bg-white/30'}`} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-medium text-white sm:text-[15px]">{n.title}</span>
                      <span className="block text-[12px] text-white/50 sm:text-[13px]">{n.body}</span>
                    </span>
                    {n.href && <Icon name="arrowUpRight" size={14} className="mt-1 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />}
                  </>
                );
                return (
                  <li key={n.title}>
                    {n.href ? (
                      <a href={n.href} target="_blank" rel="noreferrer noopener" className="group -mx-2 sm:-mx-3 flex gap-3 sm:gap-4 rounded-xl sm:rounded-2xl px-2.5 sm:px-3 py-2 sm:py-3 transition-colors hover:bg-white/[0.05]">
                        {inner}
                      </a>
                    ) : (
                      <div className="-mx-2 sm:-mx-3 flex gap-3 sm:gap-4 px-2.5 sm:px-3 py-2 sm:py-3">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Platforms */}
          <Reveal delay={120} className={`${card} flex flex-col lg:col-span-7`}>
            <p className="text-[13.5px] leading-[1.75] text-white/65 sm:text-[15.5px] sm:leading-[1.85]">
              Beyond developer tools, I build and operate production-grade web and mobile platforms. I launched{' '}
              <span className="text-white">ASWorks</span> — a live commercial marketplace with secure dual-gateway payments and
              automated digital fulfilment — and engineered <span className="text-white">Syting</span>, a privacy-first real-time
              discovery platform on a robust PostgreSQL architecture.
            </p>
            <p className="mt-3 text-[13.5px] leading-[1.75] text-white/65 sm:mt-4 sm:text-[15.5px] sm:leading-[1.85]">
              Whether designing agentic workflows, optimising queries or writing core systems, I focus on software that is reliable,
              scalable and genuinely useful.
            </p>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="group mt-auto inline-flex w-fit items-center gap-2 pt-4 sm:pt-7 text-[13px] sm:text-[14px] font-semibold text-white"
            >
              <span className="border-b border-white/25 pb-0.5 transition-colors group-hover:border-white">Start a conversation</span>
              <Icon name="arrowRight" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>

          {/* Focus areas */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:col-span-12 lg:grid-cols-4">
            {focusAreas.map((f, i) => (
              <Reveal key={f.title} delay={i * 70} className="lg lg-dim lg-spec lg-glow group rounded-[20px] p-3.5 sm:rounded-[26px] sm:p-6">
                <span className="lg-chip grid h-9 w-9 sm:h-11 sm:w-11 place-items-center rounded-xl sm:rounded-2xl text-white/80 transition-colors duration-300 group-hover:text-white">
                  <Icon name={f.icon} size={17} />
                </span>
                <p className="mt-3 text-[13px] font-semibold text-white sm:mt-5 sm:text-[15.5px]">{f.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-white/50 sm:mt-1 sm:text-[13px]">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
