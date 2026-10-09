import React, { useEffect } from 'react';

export default function CaseStudyModal({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[300] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-none"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.4s ease-out forwards' }}
      ></div>
      
      {/* Slide-over Panel */}
      <div 
        className="relative w-full max-w-[850px] bg-[#050505]/95 sm:bg-[#050505]/80 backdrop-blur-3xl h-full border-l border-white/10 shadow-2xl flex flex-col overflow-y-auto overflow-x-hidden pb-safe"
        style={{
          animation: 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Atmospheric Header Component */}
        <div className="relative w-full pt-16 sm:pt-24 pb-8 sm:pb-16 px-6 sm:px-16 border-b border-white/5 bg-white/[0.02]">
          {/* Subtle gradient orb in the background */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
          
          <button 
            onClick={onClose}
            aria-label="Close case study"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 text-white/60 hover:text-white transition-all w-11 h-11 rounded-full bg-white/10 sm:bg-transparent hover:bg-white/15 flex items-center justify-center active:scale-90 group z-20"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="relative z-10 flex flex-col items-start pr-12 sm:pr-0">
            <div className="inline-flex items-center justify-center px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/10 text-white/60 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase bg-white/[0.02] mb-4 sm:mb-6">
              {project.role}
            </div>
            {/* Responsive font size and line height */}
            <h2 className="text-white text-[28px] sm:text-[44px] md:text-[56px] leading-[1.15] font-bold tracking-tight pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {project.title}
            </h2>
          </div>
        </div>
        
        {/* Main Content Body */}
        <div className="p-6 sm:p-12 md:p-16 flex flex-col gap-10 sm:gap-16">
          
          {/* Executive Summary & Impact */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-10 sm:pb-16 border-b border-white/5">
            <div className="md:col-span-7 flex flex-col">
              <h3 className="flex items-center gap-2.5 text-white/40 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em] mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                Executive Summary
              </h3>
              <p className="text-white/80 text-[15px] sm:text-[18px] leading-[1.8] font-light">
                {project.description}
              </p>
            </div>
            
            {project.impact && (
              <div className="md:col-span-5 flex flex-col md:pl-12 md:border-l border-white/5 justify-center">
                <h3 className="flex items-center gap-2.5 text-white/40 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em] mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  Key Metric
                </h3>
                {/* Premium Gradient Metric */}
                <p className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 text-[28px] sm:text-[40px] leading-tight font-bold tracking-tighter">
                  {project.impact}
                </p>
              </div>
            )}
          </div>
          
          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 pb-10 sm:pb-16 border-b border-white/5">
            {project.problem && (
              <div className="flex flex-col">
                <h3 className="flex items-center gap-2.5 text-white/40 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em] mb-4 sm:mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  The Problem
                </h3>
                <p className="text-white/60 text-[14px] sm:text-[16px] leading-[1.8] font-light">
                  {project.problem}
                </p>
              </div>
            )}
            {project.solution && (
              <div className="flex flex-col">
                <h3 className="flex items-center gap-2.5 text-white/40 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em] mb-4 sm:mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  The Solution
                </h3>
                <p className="text-white/60 text-[14px] sm:text-[16px] leading-[1.8] font-light">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
          
          {/* Features Grid */}
          {project.features && (
            <div className="pb-10 sm:pb-16 border-b border-white/5">
              <h3 className="flex items-center gap-2.5 text-white/40 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em] mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                Architecture Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {project.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3.5 bg-white/[0.02] border border-white/5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                    <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/5 flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/80 text-[13px] sm:text-[14px] font-medium tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Tech Stack & Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 pt-2 sm:pt-4">
            <div className="flex flex-col">
              <h3 className="text-white/40 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em] mb-3 sm:mb-4">
                Core Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: string) => (
                  <span key={tag} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/10 text-white/60 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase bg-[#0a0a0a]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
              {project.isPrivate ? (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white/70 text-[12px] font-bold tracking-wider uppercase w-full sm:w-auto justify-center">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Private Proprietary Platform
                </div>
              ) : (
                <>
                  {project.liveUrl && project.liveUrl !== project.link && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center justify-center gap-2.5 bg-white text-black px-6 py-3 min-h-[44px] rounded-full font-bold text-[13px] hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
                    >
                      Visit Website
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`group inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[44px] rounded-full font-bold text-[13px] hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto ${
                      project.liveUrl && project.liveUrl !== project.link
                        ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        : 'bg-white text-black'
                    }`}
                  >
                    {project.link.includes('github.com')
                      ? 'View on GitHub'
                      : project.link.includes('marketplace')
                      ? 'VS Code Marketplace'
                      : 'Launch Platform'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
