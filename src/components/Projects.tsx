import React, { useRef } from 'react';
import FadeIn from './FadeIn';
import CaseStudyModal from './CaseStudyModal';
import { useState } from 'react';

const projects = [
  {
    title: 'EPL Ecosystem',
    role: 'Founder & Lead Architect',
    description: 'An open-source programming language designed so that code reads like natural, plain English sentences. Built to make programming accessible to beginners and powerful for engineers, EPL features a multi-backend compiler and a full standard library with 4,000+ global downloads.',
    problem: 'Programming languages enforce cryptic syntax and symbols that present a steep barrier for beginners, students, and domain experts trying to translate mental logic into runnable code.',
    solution: 'Designed and implemented the EPL compiler pipeline (Lexer, Parser, AST) with multiple compilation targets (Interpreter, Bytecode VM, native LLVM, WebAssembly). Released an official VS Code extension with code assistance, a 22-package standard library, and an automated package registry.',
    impact: '4,000+ Global Downloads',
    features: [
      'Natural Plain-English Syntax Engine',
      'Multi-Backend Compiler (LLVM, Wasm, VM)',
      '22-Package Standard Library Ecosystem',
      'Official VS Code Extension with Diagnostics',
      'Automated Package Registry System',
      'Full Web Documentation & Active Community'
    ],
    tags: ['C++', 'Python', 'LLVM', 'WebAssembly', 'Compiler Design'],
    link: 'https://github.com/abneeshsingh21/EPL',
    liveUrl: 'https://eplang.me'
  },
  {
    title: 'NeuroShell',
    role: 'Founder & Lead Developer',
    description: 'An intelligent terminal shell that allows developers to execute system commands using plain English. Combines a native C++20 engine with multi-LLM routing, 2,500+ offline translation phrases, and a 4-layer Zero-Trust safety shield that blocks destructive commands.',
    problem: 'Terminal environments require memorizing hundreds of obscure commands and flags. Typos break production workflows, and dangerous commands like rm -rf / lack intelligent guardrails, risking catastrophic data loss.',
    solution: 'Engineered a dual-engine architecture: a native C++20 core (FastParser, FuzzyMatcher via pybind11) coupled with Python multi-LLM routing (Ollama, Claude, GPT-4o). Includes a 2,500+ phrase offline dictionary and a 4-layer Zero-Trust safety shield that catches and blocks hazardous operations before shell execution.',
    impact: '2,500+ Offline Phrases',
    features: [
      'Natural English → Shell Command Translation',
      'High-Speed C++20 Core via pybind11',
      '4-Layer Zero-Trust Safety Shield',
      'Multi-LLM Routing (Ollama / Claude / GPT)',
      '100% Offline Mode (2,500+ Dictionary)',
      'Official VS Code 1-Click Terminal Extension'
    ],
    tags: ['C++', 'Python', 'Generative AI', 'pybind11', 'Zero-Trust Shield'],
    link: 'https://github.com/abneeshsingh21/neuroshell',
    liveUrl: 'https://github.com/abneeshsingh21/neuroshell'
  },
  {
    title: 'ASWorks',
    role: 'Founder & Lead Architect',
    description: 'A commercial digital marketplace and SaaS platform (asworks.studio) where software engineers and creators buy, sell, and instantly download verified developer assets, UI components, and web templates.',
    problem: 'Digital creators and developers struggle with high marketplace commission fees, slow asset distribution, unverified listings, and complex multi-currency payment setups.',
    solution: 'Architected and launched a full-stack digital marketplace using Next.js 15, TypeScript, and MongoDB. Integrated dual global payment gateways (Stripe and Razorpay) with automated GST invoicing, creator verification, and instantaneous secure digital file fulfillment.',
    impact: 'Live Commercial Platform',
    features: [
      'Live Commercial Marketplace at asworks.studio',
      'Dual Payment Gateways (Stripe & Razorpay)',
      'Automated Tax/GST Invoice Generation',
      'Instant Secure File Download Delivery',
      'Creator Verification & Asset Review Pipeline',
      'Modern High-Performance Next.js 15 Architecture'
    ],
    tags: ['Next.js 15', 'TypeScript', 'MongoDB', 'Stripe', 'Razorpay'],
    link: 'https://asworks.studio',
    liveUrl: 'https://asworks.studio'
  },
  {
    title: 'Syting',
    role: 'Lead Systems & Database Developer',
    description: 'A real-time cross-platform mobile social discovery platform built with Flutter and Supabase PostgreSQL. Features privacy-first matchmaking, automated spam prevention, and low-latency encrypted messaging channels.',
    problem: 'Modern social and discovery apps frequently expose user privacy prematurely, suffer from laggy messaging infrastructure, and lack robust database-level security against spoofing.',
    solution: 'Designed and deployed the backend architecture on PostgreSQL (SQL) with Row Level Security (RLS) policies, security-definer database triggers, and real-time WebSocket channels for sub-100ms chat latency.',
    impact: 'Real-Time Database Architecture',
    features: [
      'Privacy-First Mutual Discovery System',
      'PostgreSQL Backend with Row Level Security',
      'Sub-100ms Real-Time Chat via WebSockets',
      'Database Triggers for Automated Spam Defense',
      'Optimized Relational Schema & Indexes',
      'Cross-Platform iOS & Android Architecture'
    ],
    tags: ['Flutter', 'PostgreSQL', 'SQL', 'Supabase Realtime', 'System Design'],
    link: '#projects',
    isPrivate: true
  },
  {
    title: 'LangShift',
    role: 'Creator & Developer',
    description: 'A published Visual Studio Code extension that transpiles code across 25+ programming languages. Features automated two-pass AI self-correction, SHA-256 caching, enterprise PII sanitization, and offline LLM execution.',
    problem: 'Web-based code converters require cumbersome copy-pasting, fail to import necessary libraries, produce broken syntax, and leak proprietary IP to third-party web servers.',
    solution: 'Built a native VS Code extension (TypeScript) with a two-pass AI transpilation pipeline (generation followed by compiler verification and self-healing). Routes between 6 AI providers with automatic fallback, SHA-256 caching for zero duplicate calls, and local offline processing via Ollama.',
    impact: 'Published on VS Code Marketplace',
    features: [
      'Transpiles Across 25+ Programming Languages',
      'Two-Pass AI Self-Correction Pipeline',
      'SHA-256 Smart Hash Caching',
      'Zero-Data-Leak PII Sanitization',
      'Local Offline Mode via Ollama Support',
      'Compiler Validation (tsc, javac, rustc)'
    ],
    tags: ['TypeScript', 'VS Code API', 'Generative AI', 'Ollama', 'Compiler Validation'],
    link: 'https://marketplace.visualstudio.com/items?itemName=langshift.langshift',
    liveUrl: 'https://marketplace.visualstudio.com/items?itemName=langshift.langshift'
  }
];

// 3D Tilt card wrapper
function TiltCard({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group w-full text-left block py-12 border-b border-white/10 hover:bg-white/[0.03] hover:pl-6 transition-[background,padding] duration-500 ease-out cursor-none"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease, background 0.5s ease, padding 0.5s ease' }}
    >
      {children}
    </button>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<any>(null);

  return (
    <div id="projects" className="w-full px-5 sm:px-8 md:px-10 py-32 min-h-screen flex flex-col justify-center relative" style={{ scrollMarginTop: '80px' }}>
      <div className="max-w-5xl mx-auto w-full flex flex-col">

        {/* Section Header */}
        <FadeIn>
          <div className="flex items-center gap-6 mb-16">
            <div className="h-[1px] w-12 bg-white/30"></div>
            <h2 className="text-[12px] sm:text-[14px] font-medium text-white/50 tracking-[0.2em] uppercase">
              Portfolio
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h2 className="text-[32px] sm:text-[48px] md:text-[56px] font-bold text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Selected Works.
          </h2>
        </FadeIn>

        <div className="flex flex-col border-t border-white/10 pt-8 mt-12">
          {projects.map((proj, idx) => (
            <FadeIn key={idx} delay={idx * 100}>
              <TiltCard onClick={() => setActiveProject(proj)}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start px-4 md:px-0">

                  {/* Left: Number + Title + Role */}
                  <div className="md:col-span-4 flex flex-col">
                    <span className="text-white/15 text-[11px] font-mono mb-3 tracking-widest">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="text-[24px] sm:text-[32px] font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {proj.title}
                    </h3>
                    <p className="text-white/40 text-[12px] uppercase tracking-widest font-medium">
                      {proj.role}
                    </p>
                  </div>

                  {/* Middle: Description & Tags */}
                  <div className="md:col-span-7 flex flex-col">
                    <p className="text-white/80 text-[15px] sm:text-[16px] leading-relaxed font-light mb-8 group-hover:text-white transition-colors duration-300 text-shadow-lg">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-white/10 text-white/40 text-[11px] font-bold tracking-wider uppercase group-hover:border-white/25 group-hover:text-white/70 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Arrow */}
                  <div className="md:col-span-1 hidden md:flex justify-end items-center opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>

                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        <CaseStudyModal
          project={activeProject}
          isOpen={!!activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </div>
  );
}
