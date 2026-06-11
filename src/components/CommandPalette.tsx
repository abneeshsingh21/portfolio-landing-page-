import React, { useEffect, useState, useRef, useCallback } from 'react';

const commands = [
  { id: 'projects',      group: 'Navigate',  label: 'Go to Projects',         href: '#projects',       icon: '◈' },
  { id: 'about',         group: 'Navigate',  label: 'Go to About',            href: '#about',          icon: '◈' },
  { id: 'architecture',  group: 'Navigate',  label: 'Go to Architecture',     href: '#architecture',   icon: '◈' },
  { id: 'certs',         group: 'Navigate',  label: 'Go to Certifications',   href: '#certifications', icon: '◈' },
  { id: 'epl',           group: 'Projects',  label: 'EPL — English Programming Language', href: 'https://github.com/abneeshsingh21/EPL', icon: '↗' },
  { id: 'langshift',     group: 'Projects',  label: 'LangShift — VS Code Marketplace',   href: 'https://marketplace.visualstudio.com/items?itemName=langshift.langshift', icon: '↗' },
  { id: 'github',        group: 'Social',    label: 'Open GitHub Profile',    href: 'https://github.com/abneeshsingh21',          icon: '↗' },
  { id: 'linkedin',      group: 'Social',    label: 'Open LinkedIn Profile',  href: 'https://linkedin.com/in/abneeshsingh21',     icon: '↗' },
  { id: 'email',         group: 'Contact',   label: 'Send Email',             href: 'mailto:singhabneesh250@gmail.com',           icon: '→' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.group.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {} as Record<string, typeof commands>);

  const flat = Object.values(grouped).flat();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(o => !o);
    }
    if (e.key === 'Escape') setIsOpen(false);
  }, []);

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flat[activeIndex]) {
      const cmd = flat[activeIndex];
      if (cmd.href.startsWith('http') || cmd.href.startsWith('mailto')) {
        window.open(cmd.href, '_blank');
      } else {
        window.location.hash = cmd.href;
      }
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setActiveIndex(0);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  useEffect(() => { setActiveIndex(0); }, [search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4" onKeyDown={handleModalKeyDown}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setIsOpen(false)} />

      {/* Modal */}
      <div
        className="relative w-full max-w-[560px] bg-[#0d0d0d]/95 border border-white/[0.08] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl"
        style={{ animation: 'cmdSlideUp 0.2s cubic-bezier(0.16,1,0.3,1)' }}
      >
        {/* Search Input */}
        <div className="flex items-center px-5 border-b border-white/[0.06]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 flex-shrink-0">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands..."
            className="w-full bg-transparent text-white placeholder-white/25 px-4 py-4 outline-none text-[14px] font-medium tracking-wide"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-[10px] bg-white/5 text-white/30 px-2.5 py-1 rounded-md border border-white/10 hover:bg-white/10 transition-colors font-bold tracking-widest uppercase flex-shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[360px] overflow-y-auto p-2">
          {flat.length === 0 ? (
            <div className="text-center text-white/30 py-10 text-[13px] font-medium">No results found.</div>
          ) : (
            Object.entries(grouped).map(([group, cmds]) => (
              <div key={group} className="mb-1">
                <div className="px-3 py-2 text-[10px] text-white/25 uppercase tracking-[0.18em] font-bold">
                  {group}
                </div>
                {cmds.map((cmd) => {
                  const flatIdx = flat.findIndex(c => c.id === cmd.id);
                  const isActive = flatIdx === activeIndex;
                  return (
                    <a
                      key={cmd.id}
                      href={cmd.href}
                      target={cmd.href.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setActiveIndex(flatIdx)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-100 group ${
                        isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[13px] font-mono w-4 text-center ${isActive ? 'text-white/60' : 'text-white/20'}`}>
                          {cmd.icon}
                        </span>
                        <span className="text-[13px] font-medium tracking-wide">{cmd.label}</span>
                      </div>
                      {isActive && (
                        <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest">↵ Enter</span>
                      )}
                    </a>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-4 text-[10px] text-white/20 font-mono">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[10px] text-white/15 font-mono">{flat.length} results</span>
        </div>
      </div>

      <style>{`
        @keyframes cmdSlideUp {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
