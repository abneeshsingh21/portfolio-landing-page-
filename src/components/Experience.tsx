import React from 'react';
import FadeIn from './FadeIn';

const competencies = [
  {
    number: '01',
    title: 'Systems Engineering',
    description: 'Developing incredibly fast, memory-safe backend engines using C++, Rust, and pybind11 interoperability bridges for sub-microsecond execution.',
    tags: ['C++', 'Rust', 'pybind11', 'CMake']
  },
  {
    number: '02',
    title: 'Agentic AI & ML',
    description: 'Orchestrating multi-LLM networks (Ollama, Anthropic, Llama.cpp) for complex, autonomous reasoning tasks that operate entirely offline.',
    tags: ['Ollama', 'LLM', 'Phi-3', 'Mistral']
  },
  {
    number: '03',
    title: 'Zero-Trace Architectures',
    description: 'Designing 100% air-gapped systems that process sensitive telemetry locally via Small Language Models with zero network I/O.',
    tags: ['OSINT', 'FastAPI', 'Privacy', 'SLMs']
  },
  {
    number: '04',
    title: 'Language & Compilers',
    description: 'Parsing natural language into executable ASTs and leveraging LLVM, WebAssembly, Kotlin, and JS targets for universal deployment.',
    tags: ['LLVM', 'WebAssembly', 'AST', 'TF-IDF']
  }
];

const certifications = [
  {
    title: 'Anthropic Claude Code in Action',
    issuer: 'Anthropic',
    year: '2026',
    icon: '◈'
  },
  {
    title: 'AWS EC2 Fundamentals',
    issuer: 'KodeKloud',
    year: '2025',
    icon: '◈'
  },
  {
    title: 'Cloud Computing Fundamentals',
    issuer: 'KodeKloud',
    year: '2025',
    icon: '◈'
  }
];

export default function Experience() {
  return (
    <div className="w-full px-5 sm:px-8 md:px-10 pb-40 relative">
      <div className="max-w-5xl mx-auto w-full flex flex-col">

        {/* ── Architecture Section ── */}
        <FadeIn>
          <div id="architecture" className="py-20 border-t border-white/10" style={{ scrollMarginTop: '80px' }}>

            {/* Section header */}
            <div className="flex items-center gap-6 mb-16">
              <div className="h-[1px] w-12 bg-white/30"></div>
              <span className="text-[12px] font-bold text-white/40 tracking-[0.2em] uppercase">Core Competencies</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              {/* Left: Title + Philosophy */}
              <div className="md:col-span-4 flex flex-col md:sticky md:top-24">
                <h2 className="text-[32px] sm:text-[48px] font-bold text-white tracking-tight mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Architecture.
                </h2>
                <p className="text-white/60 text-[15px] leading-[1.8] font-light text-shadow-lg">
                  I architect highly scalable, zero-latency systems at the intersection of C++/Rust execution speed and Python's ML ecosystem — building autonomous, offline-first workflows that refuse to compromise on privacy or performance.
                </p>
              </div>

              {/* Right: Competency Cards */}
              <div className="md:col-span-8 flex flex-col gap-0 border-t border-white/10">
                {competencies.map((c, i) => (
                  <div
                    key={i}
                    className="group flex flex-col py-10 border-b border-white/10 hover:bg-white/[0.02] hover:px-6 transition-all duration-500 ease-out"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] font-bold text-white/20 tracking-[0.2em] font-mono">{c.number}</span>
                        <h3 className="text-[16px] sm:text-[18px] font-bold text-white uppercase tracking-wider group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
                          {c.title}
                        </h3>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-white/50 flex-shrink-0 mt-1 transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                    <p className="text-white/60 text-[14px] sm:text-[15px] leading-[1.8] font-light mb-6 text-shadow">
                      {c.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {c.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded border border-white/10 text-white/40 text-[11px] font-bold tracking-widest uppercase group-hover:border-white/20 group-hover:text-white/60 transition-colors duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Certifications Section ── */}
        <FadeIn delay={150}>
          <div id="certifications" className="py-20 border-t border-white/10" style={{ scrollMarginTop: '80px' }}>

            <div className="flex items-center gap-6 mb-16">
              <div className="h-[1px] w-12 bg-white/30"></div>
              <span className="text-[12px] font-bold text-white/40 tracking-[0.2em] uppercase">Credentials</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              {/* Left title */}
              <div className="md:col-span-4">
                <h2 className="text-[32px] sm:text-[48px] font-bold text-white tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Certified.
                </h2>
              </div>

              {/* Right: Cert cards */}
              <div className="md:col-span-8 flex flex-col gap-0 border-t border-white/10">
                {certifications.map((cert, i) => (
                  <div key={i} className="group flex items-center justify-between py-8 border-b border-white/10 hover:bg-white/[0.02] hover:px-6 transition-all duration-500 ease-out">
                    <div className="flex items-center gap-6">
                      <span className="text-white/20 text-[20px] group-hover:text-white/50 transition-colors duration-300 font-mono">{cert.icon}</span>
                      <div>
                        <h4 className="text-[16px] sm:text-[18px] font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
                          {cert.title}
                        </h4>
                        <p className="text-[12px] text-white/40 uppercase tracking-widest font-medium">{cert.issuer}</p>
                      </div>
                    </div>
                    <span className="text-[13px] text-white/30 font-mono tracking-widest flex-shrink-0">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
