import React from 'react';

const links = [
  { label: 'Projects',               href: '#projects' },
  { label: 'Architecture',           href: '#architecture' },
  { label: 'Certifications',         href: '#certifications' },
  { label: 'EPL on GitHub',          href: 'https://github.com/abneeshsingh21/EPL' },
  { label: 'LangShift — Marketplace',href: 'https://marketplace.visualstudio.com/items?itemName=langshift.langshift' },
  { label: 'LinkedIn',               href: 'https://linkedin.com/in/abneeshsingh21' },
];

export default function Footer() {
  return (
    <footer className="w-full relative z-10" style={{ background: 'linear-gradient(to top, #000 60%, transparent 100%)' }}>
      {/* Solid black base so text is always readable over the video */}
      <div className="w-full bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-10 py-20">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Left: Identity */}
            <div className="md:col-span-5 flex flex-col">
              <div className="flex items-center gap-2.5 mb-5">
                <span
                  className="text-[22px] font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Abneesh Singh
                </span>
                <span className="text-white/30 text-[18px] select-none">✳︎</span>
              </div>
              <p className="text-white/55 text-[14px] leading-[1.8] font-light max-w-xs mb-8">
                Agentic AI &amp; Product Engineer building offline-first, high-performance systems at the intersection of C++ and ML.
              </p>
              <a
                href="mailto:singhabneesh250@gmail.com"
                className="text-white/70 text-[13px] font-semibold hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/30 hover:decoration-white/80 w-fit"
              >
                singhabneesh250@gmail.com
              </a>
            </div>

            {/* Right: Links */}
            <div className="md:col-span-7 grid grid-cols-2 gap-y-5 gap-x-6 content-start">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-white/55 text-[12px] font-bold uppercase tracking-[0.12em] hover:text-white transition-colors duration-200"
                >
                  <span>{l.label}</span>
                  {l.href.startsWith('http') && (
                    <svg
                      width="9" height="9"
                      viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="opacity-0 group-hover:opacity-60 -translate-y-px group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 border-t border-white/[0.08]">
            <p className="text-white/35 text-[11px] font-medium uppercase tracking-widest">
              © {new Date().getFullYear()} Abneesh Singh. All rights reserved.
            </p>
            <p className="text-white/35 text-[11px] font-medium uppercase tracking-widest">
              Built with React · TypeScript · Vite
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
