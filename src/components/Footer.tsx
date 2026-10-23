import Icon from './Icon';
import { Monogram } from './Navbar';
import { Container } from './ui';
import { navLinks, projects } from '../lib/data';
import { devopsProjects } from '../lib/devops-data';
import { EMAIL, LINKS, openPalette, openProject, scrollToId } from '../lib/site';
import { usePortfolio } from '../context/PortfolioContext';

const linkCls = 'group inline-flex items-center gap-1 py-0.5 text-[12px] text-white/60 transition-colors hover:text-white sm:gap-1.5 sm:py-1 sm:text-[13.5px]';

export default function Footer() {
  const { isDevOps, resumeUrl } = usePortfolio();
  const activeProjects = isDevOps ? devopsProjects : projects;

  return (
    <footer className="relative pt-6 pb-6 sm:pt-10 sm:pb-8">
      <Container>
        <div className="lg lg-dim rounded-[24px] p-5 sm:rounded-[36px] sm:p-12">
          <div className="grid gap-7 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <Monogram size={38} />
                <div>
                  <p className="font-display text-[17px] font-semibold text-white sm:text-[19px]">Abneesh Singh</p>
                  <p className="text-[11.5px] text-white/50 sm:text-[12.5px]">
                    {isDevOps ? 'DevOps & Cloud Engineering Intern' : 'Agentic AI & Systems Engineer'}
                  </p>
                </div>
              </div>
              <p className="mt-3.5 sm:mt-6 max-w-sm text-[13px] leading-[1.65] text-white/55 sm:text-[14px] sm:leading-[1.8]">
                {isDevOps
                  ? 'Engineering automated CI/CD pipelines, hardened container runtimes and resilient cloud infrastructure on Azure.'
                  : 'Building high-performance systems and practical AI applications at the intersection of C++, SQL and Generative AI.'}
              </p>
              <a href={`mailto:${EMAIL}`} className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white">
                <Icon name="mail" size={14} /> {EMAIL}
              </a>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-3 gap-2.5 sm:gap-8 md:col-span-7">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35 uppercase sm:text-[11px]">Navigate</p>
                <ul className="mt-2.5 sm:mt-4 flex flex-col gap-0.5 sm:gap-1">
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
                <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35 uppercase sm:text-[11px]">Work</p>
                <ul className="mt-2.5 sm:mt-4 flex flex-col gap-0.5 sm:gap-1">
                  {activeProjects.map((p) => (
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
                <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35 uppercase sm:text-[11px]">Elsewhere</p>
                <ul className="mt-2.5 sm:mt-4 flex flex-col gap-0.5 sm:gap-1">
                  {[
                    { label: 'GitHub', href: LINKS.github },
                    { label: 'LinkedIn', href: LINKS.linkedin },
                    { label: 'ASWorks', href: LINKS.asworks },
                    { label: 'LangShift', href: LINKS.langshift },
                    { label: isDevOps ? 'DevOps Résumé' : 'Résumé', href: resumeUrl },
                  ].map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noreferrer noopener" className={linkCls}>
                        {l.label}
                        <Icon name="arrowUpRight" size={11} className="opacity-40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="hairline my-6 sm:my-9" />

          <div className="flex flex-col gap-3 text-[11px] sm:text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
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
