import Icon from './Icon';
import { Monogram } from './Navbar';
import { Container } from './ui';
import { navLinks, projects } from '../lib/data';
import { EMAIL, LINKS, RESUME_URL, openPalette, openProject, scrollToId } from '../lib/site';

const linkCls = 'group inline-flex items-center gap-1.5 py-1 text-[13.5px] text-white/60 transition-colors hover:text-white';

export default function Footer() {
  return (
    <footer className="relative pt-10 pb-8">
      <Container>
        <div className="lg lg-dim rounded-[36px] p-7 sm:p-12">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <Monogram size={44} />
                <div>
                  <p className="font-display text-[19px] font-semibold text-white">Abneesh Singh</p>
                  <p className="text-[12.5px] text-white/50">Agentic AI &amp; Systems Engineer</p>
                </div>
              </div>
              <p className="mt-6 max-w-sm text-[14px] leading-[1.8] text-white/55">
                Building high-performance systems and practical AI applications at the intersection of C++, SQL and Generative AI.
              </p>
              <a href={`mailto:${EMAIL}`} className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white">
                <Icon name="mail" size={15} /> {EMAIL}
              </a>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-white/35 uppercase">Navigate</p>
                <ul className="mt-4 flex flex-col gap-1">
                  {navLinks.map((l) => (
                    <li key={l.id}>
                      <button type="button" onClick={() => scrollToId(l.id)} className={linkCls}>
                        {l.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-white/35 uppercase">Work</p>
                <ul className="mt-4 flex flex-col gap-1">
                  {projects.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => {
                          scrollToId('projects');
                          window.setTimeout(() => openProject(p.id), 450);
                        }}
                        className={linkCls}
                      >
                        {p.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-white/35 uppercase">Elsewhere</p>
                <ul className="mt-4 flex flex-col gap-1">
                  {[
                    { label: 'GitHub', href: LINKS.github },
                    { label: 'LinkedIn', href: LINKS.linkedin },
                    { label: 'ASWorks', href: LINKS.asworks },
                    { label: 'LangShift', href: LINKS.langshift },
                    { label: 'Résumé', href: RESUME_URL },
                  ].map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noreferrer noopener" className={linkCls}>
                        {l.label}
                        <Icon name="arrowUpRight" size={12} className="opacity-40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="hairline my-9" />

          <div className="flex flex-col gap-4 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Abneesh Singh. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Built with React · TypeScript · Vite</span>
              <button type="button" onClick={openPalette} className="lg-chip font-code hidden rounded-lg px-2 py-1 text-[11px] text-white/55 transition-colors hover:text-white sm:inline-block">
                ⌘K
              </button>
            </div>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="font-display pointer-events-none mt-6 text-center text-[clamp(56px,15vw,220px)] leading-[0.85] font-semibold tracking-[-0.06em] select-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 85%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Abneesh Singh
        </p>
      </Container>
    </footer>
  );
}
