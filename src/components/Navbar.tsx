import React, { useState, useEffect } from 'react';

const navLinks = [
  { name: 'About',          href: '#about',          id: 'about' },
  { name: 'Projects',       href: '#projects',       id: 'projects' },
  { name: 'Architecture',   href: '#architecture',   id: 'architecture' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section — scroll-based, finds section closest to top of viewport
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.id);

    const getActiveSection = () => {
      const navHeight = 80;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - navHeight <= 80) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', getActiveSection, { passive: true });
    getActiveSection(); // run on mount
    return () => window.removeEventListener('scroll', getActiveSection);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
        <div
          className="h-full bg-white/40 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-10 flex flex-row justify-between items-center transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-black/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_40px_rgba(0,0,0,0.6)]'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex flex-row gap-2.5 items-center group">
          <span
            className="text-[17px] sm:text-[19px] tracking-tight text-white font-bold group-hover:text-white/70 transition-colors duration-300"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Abneesh Singh
          </span>
          <span className="text-[18px] text-white/40 select-none group-hover:text-white/60 transition-colors" style={{ letterSpacing: '-0.02em' }}>
            ✳︎
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-row text-[13px] text-white/50 font-medium items-center gap-8 tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative uppercase tracking-widest text-[11px] font-bold transition-colors duration-200 group ${
                activeSection === link.id ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {link.name}
              {/* Active underline dot */}
              <span
                className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
          <div className="w-[1px] h-4 bg-white/10"></div>
          <div className="px-2.5 py-1 rounded-md border border-white/15 bg-white/[0.04] text-white/40 text-[11px] font-mono tracking-wider flex items-center gap-1.5 cursor-pointer hover:border-white/30 hover:text-white/70 transition-all duration-200">
            <span>⌘</span><span>K</span>
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex flex-row items-center gap-5">
          <a
            href="https://github.com/abneeshsingh21"
            target="_blank"
            rel="noreferrer"
            className="text-white/40 text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/abneeshsingh21"
            target="_blank"
            rel="noreferrer"
            className="text-white/40 text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors duration-200"
          >
            LinkedIn
          </a>

          {/* Premium Hire Me CTA */}
          <a
            href="mailto:singhabneesh250@gmail.com"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden border border-white/20 text-white text-[11px] font-bold px-5 py-2.5 rounded-full tracking-[0.12em] uppercase hover:border-white/50 transition-all duration-300"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            {/* Shimmer sweep on hover */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
              }}
            />
            {/* Green availability dot */}
            <span className="relative w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.8)' }}>
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
            </span>
            <span className="relative">Let's Talk</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] z-20 relative focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></div>
          <div className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></div>
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-[40] flex flex-col justify-center px-10 gap-6 md:hidden transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-[28px] font-bold text-white hover:text-white/50 transition-colors uppercase tracking-widest"
          >
            {link.name}
          </a>
        ))}
        <div className="flex flex-col gap-4 mt-6 border-t border-white/10 pt-8">
          <a href="https://github.com/abneeshsingh21" target="_blank" rel="noreferrer" className="text-[18px] font-bold text-white/60 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>GitHub</a>
          <a href="https://linkedin.com/in/abneeshsingh21" target="_blank" rel="noreferrer" className="text-[18px] font-bold text-white/60 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>LinkedIn</a>
          <a href="mailto:singhabneesh250@gmail.com" className="text-[18px] font-bold text-white hover:text-white/60 transition-colors" onClick={() => setIsOpen(false)}>singhabneesh250@gmail.com</a>
        </div>
      </div>
    </>
  );
}
