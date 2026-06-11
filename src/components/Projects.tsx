import React, { useRef } from 'react';
import FadeIn from './FadeIn';
import CaseStudyModal from './CaseStudyModal';
import { useState } from 'react';

const projects = [
  {
    title: 'EPL Ecosystem',
    role: 'Founder & Lead Architect',
    description: 'EPL (English Programming Language) is a fully-featured programming language where every keyword is natural English. Build web apps, REST APIs, AI pipelines, and cloud-native services — in syntax anyone can read.',
    problem: 'Every programming language forces developers to learn cryptic symbols, rigid syntax, and language-specific idioms before writing a single line of useful logic. This creates an enormous barrier between ideas and execution.',
    solution: 'Designed EPL with a multi-backend architecture: source code flows through a Lexer → Parser → AST, then targets an Interpreter, Bytecode VM, LLVM native compiler, or WebAssembly. Ships with a 22-package official ecosystem and a VS Code extension.',
    impact: '4,000+ PyPI Downloads',
    features: ['LLVM Native Compilation', 'WebAssembly & Kotlin Targets', 'Bytecode VM Engine', '22-Package Ecosystem', 'VS Code Extension', 'REST API & Web Support'],
    tags: ['Python', 'LLVM', 'WebAssembly', 'Bytecode VM', 'Kotlin'],
    link: 'https://github.com/abneeshsingh21/EPL'
  },
  {
    title: 'NeuroShell',
    role: 'Lead Developer',
    description: 'The Ultimate AI-Powered Intelligent Terminal. Type plain English, get shell commands. Auto-fixes errors, works 100% offline with a 2,500+ phrase dictionary, and supports 6 LLM providers via a native C++ hybrid engine.',
    problem: 'Traditional terminals require memorizing hundreds of cryptic commands and flags. A single typo crashes a workflow, errors are opaque, and there is no safety net against catastrophically destructive commands like `rm -rf /`.',
    solution: 'Built a terminal replacement with a C++ hybrid engine (FastParser, FuzzyMatcher, MarkovEngine via pybind11) and a 2,500+ offline phrase dictionary for instant English→Shell translation. A 4-layer safety system blocks dangerous commands and 25+ auto-fix patterns repair errors without internet.',
    impact: '2,500+ Offline Phrases',
    features: ['Natural Language → Shell Commands', 'C++ Hybrid Engine via pybind11', '4-Layer Safety System (blocks rm -rf /)', '2,500+ Offline Dictionary (No LLM needed)', '6 LLM Providers (Ollama, Claude, GPT-4o)', 'Desktop GUI + Mission Control HUD'],
    tags: ['Python', 'C++', 'pybind11', 'Ollama', 'TF-IDF', 'NLP'],
    link: 'https://github.com/abneeshsingh21'
  },
  {
    title: 'GHOST',
    role: 'Creator',
    description: 'GHOST (Grey Hat Operational Security Tool) is a full-spectrum cybersecurity platform combining a local LLM (Ollama/Qwen) with a Python backend and a real-time web dashboard for grey-hat security operations.',
    problem: 'Security professionals lack a unified, AI-assisted tool that can reason about threats, run operational modes (Teaching → Autonomous → Stealth), and keep all data fully local without cloud dependencies.',
    solution: 'Built a Flask/SocketIO server that bridges a local Ollama LLM with a Kali Linux subsystem. Supports 4 operational modes (TEACHING, SUPERVISED, AUTONOMOUS, STEALTH) with a real-time cockpit dashboard and zero-trace shadow mode.',
    impact: 'Full Spectrum Security',
    features: ['4 Operational Modes (Teaching → Stealth)', 'Local LLM via Ollama (Qwen 3)', 'Real-time Cockpit Dashboard', 'Zero-Trace Shadow Mode', 'Kali Linux Subsystem Bridge', 'Network Packet Capture'],
    tags: ['Python', 'Ollama', 'Flask', 'SocketIO', 'Cybersecurity'],
    link: 'https://github.com/abneeshsingh21'
  },
  {
    title: 'IRA',
    role: 'Lead Architect',
    description: 'IRA is a personal, emotionally intelligent voice assistant with a C++ reflex system and a Python AI brain. Features wake word detection, speaker voice authentication, emotion awareness, and a natural Hinglish personality.',
    problem: 'Cloud voice assistants like Siri and Cortana require constant internet connectivity, collect user data, and lack genuine emotional awareness or cultural context for Indian users.',
    solution: 'Designed a dual-layer architecture: a C++ core (built with CMake) handles ultra-low latency wake word detection and system reflexes, while the Python brain (Phi-3 Mini / Mistral 7B) provides personality, STT (Whisper), and TTS (Edge TTS Swara Neural).',
    impact: 'Emotionally Intelligent AI',
    features: ['"Hey IRA" Wake Word (Vosk C++)', 'Speaker Voice Auth (SpeechBrain)', 'Real-time Emotion Detection', 'Hinglish Personality & Conversation', 'Android Companion App', 'Full Offline Operation'],
    tags: ['C++', 'Python', 'pybind11', 'Whisper', 'Phi-3', 'SpeechBrain'],
    link: 'https://github.com/abneeshsingh21'
  },
  {
    title: 'LangShift',
    role: 'Creator',
    description: 'LangShift is a VS Code extension that converts code between 25+ programming languages with a single file rename. Powered by 6 AI providers, smart SHA-256 caching, PII scrubbing, and full offline support via Ollama.',
    problem: 'Existing code translators are web-based toys — developers copy-paste into a browser UI, receive broken output without imports, and must manually fix it for every file. There is no workflow-native, enterprise-safe solution.',
    solution: 'Built a VS Code extension (TypeScript) with a two-pass AI conversion pipeline: AI generates code, then reviews and self-corrects its output. Routes between 6 providers (Claude, GPT-4o, Gemini, Ollama, LM Studio) with automatic fallback chains and compiler validation.',
    impact: 'Published on VS Code Marketplace',
    features: ['25+ Language Support', 'Two-Pass AI Self-Correction', '6 AI Providers + Offline (Ollama)', 'PII Scrubbing (HIPAA/GDPR)', 'SHA-256 Smart Caching', 'Compiler Validation (tsc, javac, rustc)'],
    tags: ['TypeScript', 'VS Code API', 'Ollama', 'Claude', 'GPT-4o'],
    link: 'https://marketplace.visualstudio.com/items?itemName=langshift.langshift'
  },
  {
    title: 'N-CIIA',
    role: 'Lead Systems Architect',
    description: 'N-CIIA (National Cyber Investigation & Intelligence Assistant) is a multi-module intelligence platform for OSINT ingestion, digital persona reconstruction, threat scoring, and ML-based behavioral analysis.',
    problem: 'Cybercrime investigators lack a unified, AI-assisted tool that can ingest OSINT data, reconstruct a suspect\'s digital persona, score threat levels, and package court-ready evidence — all from a single platform.',
    solution: 'Built a FastAPI-powered intelligence engine with dedicated modules for OSINT ingestion, behavioral analysis, LLM integration, and evidence packaging. Features a real-time performance dashboard and a web cockpit for case management.',
    impact: 'Multi-Module Intelligence Platform',
    features: ['OSINT Data Ingestion', 'Digital Persona Reconstruction', 'ML-Based Threat Scoring', 'LLM Integration (FastAPI)', 'Evidence Packaging', 'Real-time Performance Dashboard'],
    tags: ['Python', 'FastAPI', 'spaCy', 'ML', 'OSINT'],
    link: 'https://github.com/abneeshsingh21'
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
