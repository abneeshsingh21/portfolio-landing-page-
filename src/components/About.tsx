import React from 'react';
import FadeIn from './FadeIn';
import { useCountUp } from '../hooks/useCountUp';

const metrics = [
  { target: 4000, prefix: '', suffix: '+', label: 'Global Downloads',    sub: 'EPL Ecosystem' },
  { target: 2500, prefix: '', suffix: '+', label: 'Offline Phrases',     sub: 'NeuroShell Engine' },
  { target: 25,   prefix: '', suffix: '+', label: 'Language Targets',    sub: 'LangShift Transpiler' },
  { target: 100,  prefix: '', suffix: '%', label: 'Live Architecture',   sub: 'asworks.studio & Syting' },
];

const stack = ['C++', 'Python', 'SQL (PostgreSQL)', 'Generative AI', 'Agentic AI', 'Multi-LLM Routing', 'System Design', 'Next.js', 'FastAPI', 'Docker'];

function MetricCard({ target, prefix, suffix, label, sub, isLast }: {
  target: number; prefix: string; suffix: string;
  label: string; sub: string; isLast: boolean;
}) {
  const ref = useCountUp({ target, prefix, suffix });
  return (
    <div className={`flex flex-col p-6 sm:p-8 ${
      !isLast ? 'border-r border-white/10' : ''
    } hover:bg-white/[0.02] transition-colors duration-300`}>
      <span
        ref={ref}
        className="text-white text-[28px] sm:text-[36px] font-bold tracking-tighter mb-1"
        style={{ fontFamily: 'var(--font-heading)' }}
      />
      <span className="text-white/70 text-[13px] font-semibold mb-1">{label}</span>
      <span className="text-white/30 text-[11px] uppercase tracking-wider font-medium">{sub}</span>
    </div>
  );
}

function MetricsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10 rounded-xl overflow-hidden mb-20">
      {metrics.map((m, i) => (
        <MetricCard key={i} {...m} isLast={i === metrics.length - 1} />
      ))}
    </div>
  );
}

export default function About() {
  return (
    <div id="about" className="w-full px-6 sm:px-10 py-32 relative" style={{ scrollMarginTop: '80px' }}>
      <div className="max-w-5xl mx-auto w-full flex flex-col">

        {/* Section Header */}
        <FadeIn>
          <div className="flex items-center gap-5 mb-16">
            <div className="h-[1px] w-10 bg-white/30"></div>
            <span className="text-[11px] font-bold text-white/40 tracking-[0.2em] uppercase">About</span>
          </div>
        </FadeIn>

        {/* Pull Quote */}
        <FadeIn delay={100}>
          <h2
            className="text-[30px] sm:text-[44px] md:text-[52px] font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-4xl text-shadow-lg"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Engineering at the boundary of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
              machine performance
            </span>{' '}
            and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
              human intent.
            </span>
          </h2>
        </FadeIn>

        {/* Metrics Row */}
        <FadeIn delay={150}>
          <MetricsRow />
        </FadeIn>

        {/* 12-Column Bio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-16">

          {/* Left: Identity & Education */}
          <div className="md:col-span-4 flex flex-col">
            <FadeIn delay={200}>
              <h3 className="text-[20px] font-bold text-white mb-1 text-shadow">Abneesh Singh</h3>
              <p className="text-[11px] text-white/50 uppercase tracking-[0.2em] font-bold mb-4 text-shadow">
                Agentic AI &amp; Systems Engineer
              </p>

              {/* Education Box */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] mb-8">
                <p className="text-white/90 text-[12px] font-semibold leading-relaxed">
                  B.Tech in Computer Science
                </p>
                <p className="text-white/50 text-[11px] tracking-wide">
                  Specialization: Artificial Intelligence &amp; Machine Learning
                </p>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1 font-mono">
                  Jagran Lakecity University · Expected 2027
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  'High-Performance C++ Systems',
                  'Generative & Agentic AI',
                  'Relational Databases & SQL',
                  'Developer Tooling & Compilers'
                ].map((s) => (
                  <div key={s} className="flex items-center gap-3 text-[12px] sm:text-[13px] text-white/70 font-medium tracking-wide uppercase text-shadow">
                    <div className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0"></div>
                    {s}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Bio paragraphs */}
          <div className="md:col-span-8 flex flex-col sm:flex-row gap-10">
            <FadeIn delay={300}>
              <div className="flex-1">
                <p className="text-white/90 text-[15px] sm:text-[16px] leading-[1.9] font-light mb-0 text-shadow-lg">
                  I am a software engineer and open-source creator focused on building high-performance systems and practical AI applications. With strong roots in C++, SQL, and modern Generative AI, my goal is to make computing intuitive and accessible. I created EPL (English Programming Language), an open-source language allowing anyone to code in plain English that has reached over 4,000 global downloads, and NeuroShell, an intelligent terminal shell combining a native C++ engine with AI to turn plain English into safe command-line executions.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="flex-1 flex flex-col">
                <p className="text-white/90 text-[15px] sm:text-[16px] leading-[1.9] font-light mb-10 text-shadow-lg">
                  Beyond developer tools, I build and operate production-grade web and mobile platforms. I launched ASWorks (asworks.studio)—a live commercial digital marketplace with secure dual-gateway payments and automated digital fulfillment—and engineered Syting, a privacy-first real-time discovery platform backed by a robust PostgreSQL architecture. Whether designing agentic workflows, optimizing database queries, or writing core systems, I focus on software that is reliable, scalable, and genuinely useful.
                </p>
                <div className="mt-auto">
                  <a
                    href="mailto:singhabneesh250@gmail.com"
                    className="group inline-flex items-center gap-3 text-[13px] text-white font-bold uppercase tracking-widest hover:text-white/60 transition-colors duration-200"
                  >
                    <span className="border-b border-white/30 group-hover:border-transparent transition-colors pb-1">
                      Start a conversation
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Tech Stack */}
        <FadeIn delay={500}>
          <div className="mt-20 pt-12 border-t border-white/10">
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold mb-8">Core Stack</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {stack.map((tech, i) => (
                <div
                  key={tech}
                  className="group flex items-center gap-3 border border-white/[0.07] rounded-xl px-4 py-3 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
                >
                  <span className="text-[10px] font-mono text-white/15 group-hover:text-white/30 transition-colors duration-300 w-4 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/60 text-[12px] font-bold tracking-wider uppercase group-hover:text-white/90 transition-colors duration-300">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
