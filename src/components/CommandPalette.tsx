import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import Icon, { type IconName } from './Icon';
import { useScrollLock } from '../hooks/useScrollLock';
import { projects } from '../lib/data';
import {
  EMAIL,
  EVENTS,
  LINKS,
  RESUME_URL,
  copyEmail,
  openExternal,
  openInstallPrompt,
  openProject,
  scrollToId,
} from '../lib/site';

interface Command {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: IconName;
  keywords?: string;
  run: () => void;
}

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  useScrollLock(open);

  const commands = useMemo<Command[]>(
    () => [
      { id: 'nav-about', group: 'Navigate', label: 'About', icon: 'layers', run: () => scrollToId('about') },
      { id: 'nav-work', group: 'Navigate', label: 'Selected work', icon: 'layers', keywords: 'projects portfolio', run: () => scrollToId('projects') },
      { id: 'nav-arch', group: 'Navigate', label: 'Architecture & competencies', icon: 'layers', run: () => scrollToId('architecture') },
      { id: 'nav-certs', group: 'Navigate', label: 'Credentials', icon: 'layers', keywords: 'certifications', run: () => scrollToId('certifications') },
      { id: 'nav-contact', group: 'Navigate', label: 'Contact', icon: 'layers', keywords: 'hire message', run: () => scrollToId('contact') },
      { id: 'act-copy', group: 'Actions', label: 'Copy email address', hint: EMAIL, icon: 'copy', keywords: 'mail contact', run: () => void copyEmail() },
      { id: 'act-mail', group: 'Actions', label: 'Write an email', icon: 'mail', keywords: 'contact hire', run: () => (window.location.href = `mailto:${EMAIL}`) },
      { id: 'act-resume', group: 'Actions', label: 'Open résumé (PDF)', icon: 'file', keywords: 'cv resume download', run: () => openExternal(RESUME_URL) },
      { id: 'act-install', group: 'Actions', label: 'Install Portfolio App', hint: 'Add to home screen', icon: 'download', keywords: 'pwa mobile application download icon home screen install', run: () => openInstallPrompt() },
      ...projects.map<Command>((p) => ({
        id: `proj-${p.id}`,
        group: 'Case studies',
        label: p.title,
        hint: p.summary,
        icon: p.icon,
        keywords: `${p.tags.join(' ')} ${p.categories.join(' ')}`,
        run: () => {
          scrollToId('projects');
          window.setTimeout(() => openProject(p.id), 450);
        },
      })),
      { id: 'ext-github', group: 'Elsewhere', label: 'GitHub', hint: '@abneeshsingh21', icon: 'github', run: () => openExternal(LINKS.github) },
      { id: 'ext-linkedin', group: 'Elsewhere', label: 'LinkedIn', icon: 'linkedin', run: () => openExternal(LINKS.linkedin) },
      { id: 'ext-asworks', group: 'Elsewhere', label: 'ASWorks Studio', hint: 'asworks.studio', icon: 'bag', run: () => openExternal(LINKS.asworks) },
      { id: 'ext-langshift', group: 'Elsewhere', label: 'LangShift on VS Code Marketplace', icon: 'vscode', run: () => openExternal(LINKS.langshift) },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ''} ${c.keywords ?? ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  const groups = useMemo(() => {
    const map = new Map<string, Command[]>();
    filtered.forEach((c) => map.set(c.group, [...(map.get(c.group) ?? []), c]));
    return Array.from(map.entries());
  }, [filtered]);

  const show = useCallback(() => {
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery('');
    setActive(0);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    restoreRef.current?.focus?.();
  }, []);

  const execute = useCallback(
    (cmd: Command | undefined) => {
      if (!cmd) return;
      hide();
      window.setTimeout(cmd.run, 30);
    },
    [hide],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) hide();
        else show();
      } else if (e.key === '/' && !open && !isTyping(e.target)) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(EVENTS.openPalette, show);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(EVENTS.openPalette, show);
    };
  }, [open, show, hide]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  if (!open) return null;

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(filtered[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hide();
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-[350] flex items-start justify-center px-3 pt-[10vh] sm:px-4 sm:pt-[16vh]" onKeyDown={onKeyDown}>
      <div className="anim-fade absolute inset-0 bg-[#020306]/70 backdrop-blur-2xl" onClick={hide} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="lg-preloader lg-spec anim-pop relative w-full max-w-[600px] overflow-hidden rounded-[26px] shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_1.5px_1px_0_rgba(255,255,255,0.45)] border border-white/20"
      >
        <div className="flex items-center gap-3 px-5">
          <Icon name="search" size={18} className="shrink-0 text-white/40" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search sections, projects, actions…"
            className="h-[60px] w-full bg-transparent text-[16px] text-white outline-none placeholder:text-white/30 sm:text-[15px]"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={filtered[active] ? `cmdk-${filtered[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={hide}
            className="lg-chip font-code shrink-0 rounded-lg px-2 py-1 text-[10.5px] text-white/55 transition-colors hover:text-white"
          >
            ESC
          </button>
        </div>
        <div className="hairline" />

        <div ref={listRef} id="cmdk-list" role="listbox" className="max-h-[min(56vh,420px)] overflow-y-auto overscroll-contain p-2">
          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center text-[13px] text-white/40">
              Nothing matches “{query}”. Try “resume”, “AI” or “email”.
            </div>
          )}
          {groups.map(([group, cmds]) => (
            <div key={group} className="mb-1" role="presentation">
              <div className="px-3 pt-3 pb-1.5 text-[10.5px] font-semibold tracking-[0.18em] text-white/35 uppercase">{group}</div>
              {cmds.map((cmd) => {
                flatIndex++;
                const idx = flatIndex;
                const selected = idx === active;
                return (
                  <div
                    key={cmd.id}
                    id={`cmdk-${cmd.id}`}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => !selected && setActive(idx)}
                    onClick={() => execute(cmd)}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-150 ${
                      selected ? 'bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' : 'text-white/65'
                    }`}
                  >
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${selected ? 'lg-chip text-white' : 'text-white/45'}`}>
                      <Icon name={cmd.icon} size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium">{cmd.label}</span>
                      {cmd.hint && <span className="block truncate text-[12px] text-white/40">{cmd.hint}</span>}
                    </span>
                    {selected && <Icon name="enter" size={14} className="shrink-0 text-white/45" />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="hairline" />
        <div className="font-code flex items-center justify-between px-5 py-3 text-[10.5px] text-white/35">
          <div className="flex items-center gap-4">
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span className="hidden sm:inline">/ or ⌘K anywhere</span>
          </div>
          <span>{filtered.length} results</span>
        </div>
      </div>
    </div>
  );
}
