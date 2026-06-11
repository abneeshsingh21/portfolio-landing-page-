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
        className="relative w-full max-w-[850px] bg-[#050505]/80 backdrop-blur-3xl h-full border-l border-white/10 shadow-2xl flex flex-col overflow-y-auto overflow-x-hidden"
        style={{ animation: 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        {/* Atmospheric Header Component */}
        <div className="relative w-full pt-24 pb-16 px-10 sm:px-16 border-b border-white/5 bg-white/[0.02]">
          {/* Subtle gradient orb in the background, removed overflow-hidden to stop text clipping */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-all p-3 rounded-full hover:bg-white/5 group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="relative z-10 flex flex-col items-start">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 text-white/60 text-[12px] font-bold tracking-[0.2em] uppercase bg-white/[0.02] mb-6">
              {project.role}
            </div>
            {/* Fixed line-height and padding to prevent cut-offs */}
            <h2 className="text-white text-[40px] sm:text-[56px] leading-[1.1] font-bold tracking-tight pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {project.title}
            </h2>
          </div>
        </div>
        
        {/* Main Content Body */}
        <div className="p-10 sm:p-16 flex flex-col gap-16">
          
          {/* Executive Summary & Impact */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
            <div className="md:col-span-7 flex flex-col">
              <h3 className="flex items-center gap-3 text-white/40 text-[12px] font-bold uppercase tracking-[0.15em] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                Executive Summary
              </h3>
              <p className="text-white/80 text-[16px] sm:text-[18px] leading-[1.8] font-light">
                {project.description}
              </p>
            </div>
            
            {project.impact && (
              <div className="md:col-span-5 flex flex-col md:pl-12 md:border-l border-white/5 justify-center">
                <h3 className="flex items-center gap-3 text-white/40 text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  Key Metric
                </h3>
                {/* Premium Gradient Metric */}
                <p className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 text-[32px] sm:text-[40px] leading-tight font-bold tracking-tighter">
                  {project.impact}
                </p>
              </div>
            )}
          </div>
          
          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-16 border-b border-white/5">
            {project.problem && (
              <div className="flex flex-col">
                <h3 className="flex items-center gap-3 text-white/40 text-[12px] font-bold uppercase tracking-[0.15em] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  The Problem
                </h3>
                <p className="text-white/60 text-[15px] sm:text-[16px] leading-[1.8] font-light">
                  {project.problem}
                </p>
              </div>
            )}
            {project.solution && (
              <div className="flex flex-col">
                <h3 className="flex items-center gap-3 text-white/40 text-[12px] font-bold uppercase tracking-[0.15em] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  The Solution
                </h3>
                <p className="text-white/60 text-[15px] sm:text-[16px] leading-[1.8] font-light">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
          
          {/* Features Grid */}
          {project.features && (
            <div className="pb-16 border-b border-white/5">
              <h3 className="flex items-center gap-3 text-white/40 text-[12px] font-bold uppercase tracking-[0.15em] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                Architecture Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 px-6 py-4 rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/80 text-[14px] font-medium tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Tech Stack & Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-4">
            <div className="flex flex-col">
              <h3 className="text-white/40 text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
                Core Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 rounded-lg border border-white/10 text-white/60 text-[12px] font-bold tracking-wider uppercase bg-[#0a0a0a]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <a 
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300"
            >
              View Source
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
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
