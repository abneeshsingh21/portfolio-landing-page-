import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const stats = [
  { value: '4K+', label: 'Global Downloads' },
  { value: '2.5K+', label: 'Offline Phrases' },
  { value: 'Live', label: 'Commercial SaaS' },
  { value: '25+', label: 'Language Targets' },
];

export default function Hero() {
  const { displayed, done } = useTypewriter(
    'Architecting Generative AI & Agentic Systems, High-Performance C++, and Scalable Platforms. What are we building next?'
  );
  const [showContent, setShowContent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('singhabneesh250@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] relative w-full flex flex-col justify-between pt-24 sm:pt-32 pb-10 sm:pb-16 px-5 sm:px-10 z-[5]">
      
      {/* Main content — bottom left */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="max-w-2xl relative z-10">

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Available for opportunities</span>
          </div>

          {/* Identity line - sharp and readable */}
          <div
            className="mb-4 text-white font-bold text-shadow-lg tracking-tight"
            style={{ fontSize: 'clamp(18px, 3.2vw, 24px)', lineHeight: 1.3, opacity: 1 }}
          >
            Hey, I'm <span className="text-white">Abneesh Singh</span> —<br />
            <span className="text-white/80 font-semibold text-[15px] sm:text-[18px]">Agentic AI &amp; Systems Engineer</span>
          </div>

          {/* Typewriter */}
          <p
            className="text-white mb-8 font-medium min-h-[56px] sm:min-h-[64px] text-shadow-lg"
            style={{ fontSize: 'clamp(16px, 3.5vw, 24px)', lineHeight: 1.45 }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px]"
                style={{ animation: 'blink 1s step-end infinite' }}
              ></span>
            )}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-3 mb-8 sm:mb-10"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s 0.2s ease-out, transform 0.6s 0.2s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 bg-white text-black text-[13px] font-bold px-6 py-3 min-h-[44px] rounded-full hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              View Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 text-[13px] font-bold px-6 py-3 min-h-[44px] rounded-full hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Resume
            </a>
            <a
              href="https://asworks.studio"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white/70 border border-white/10 text-[13px] font-medium px-5 py-3 min-h-[44px] rounded-full hover:text-white hover:border-white/30 active:scale-95 transition-all duration-200"
            >
              ASWorks Studio
            </a>
            <a
              href="mailto:singhabneesh250@gmail.com"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white/50 border border-white/10 text-[13px] font-medium px-5 py-3 min-h-[44px] rounded-full hover:text-white hover:border-white/30 active:scale-95 transition-all duration-200"
            >
              {copied ? '✓ Copied!' : 'singhabneesh250@gmail.com'}
            </a>
          </div>

          {/* Social row */}
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6"
            style={{
              opacity: showContent ? 1 : 0,
              transition: 'opacity 0.6s 0.4s ease-out',
            }}
          >
            <a href="https://github.com/abneeshsingh21" target="_blank" rel="noreferrer" className="text-white/35 text-[11px] uppercase tracking-widest font-bold hover:text-white transition-colors duration-200 py-1">GitHub</a>
            <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline-block"></span>
            <a href="https://linkedin.com/in/abneesh-singh001" target="_blank" rel="noreferrer" className="text-white/35 text-[11px] uppercase tracking-widest font-bold hover:text-white transition-colors duration-200 py-1">LinkedIn</a>
            <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline-block"></span>
            <a href="https://asworks.studio" target="_blank" rel="noreferrer" className="text-white/35 text-[11px] uppercase tracking-widest font-bold hover:text-white transition-colors duration-200 py-1">asworks.studio</a>
            <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline-block"></span>
            <a href="https://marketplace.visualstudio.com/items?itemName=langshift.langshift" target="_blank" rel="noreferrer" className="text-white/35 text-[11px] uppercase tracking-widest font-bold hover:text-white transition-colors duration-200 py-1">VS Code Extension</a>
          </div>
        </div>
      </div>

      {/* Stats Panel — responsive 2x2 grid on mobile, continuous row on desktop */}
      <div
        className="relative z-10 mt-12 sm:mt-16 border-t border-white/10"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s 0.5s ease-out, transform 0.6s 0.5s ease-out',
        }}
      >
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 pt-6 pb-2 sm:flex sm:items-stretch sm:divide-x sm:divide-white/10 sm:gap-0 sm:py-6">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col sm:flex-1 sm:pr-8 group">
              <span
                className="text-white text-[28px] sm:text-[40px] font-bold tracking-tighter leading-none mb-1.5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {s.value}
              </span>
              <span className="text-white/40 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-bold">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2" style={{ opacity: 0.25 }}>
        <span className="text-white text-[9px] uppercase tracking-[0.25em] font-bold" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/60 to-transparent"></div>
      </div>
    </div>
  );
}
