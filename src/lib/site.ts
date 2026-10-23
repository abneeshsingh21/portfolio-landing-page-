import { toast } from './toast';

export const EMAIL = 'singhabneesh250@gmail.com';

/** Resolve a /public asset against Vite's base URL (works on sub-path hosts). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const SWE_RESUME_URL = asset('resume.pdf');
export const DEVOPS_RESUME_URL = asset('devops-resume.pdf');
export const RESUME_URL = asset('resume.pdf');

export const LINKS = {
  github: 'https://github.com/abneeshsingh21',
  linkedin: 'https://linkedin.com/in/abneesh-singh001',
  asworks: 'https://asworks.studio',
  langshift: 'https://marketplace.visualstudio.com/items?itemName=langshift.langshift',
  epl: 'https://github.com/abneeshsingh21/EPL',
  neuroshell: 'https://github.com/abneeshsingh21/neuroshell',
} as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True only for real hover devices (mouse / trackpad) — touch laptops with a mouse included. */
export const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function scrollToId(id: string) {
  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior });
    history.replaceState(null, '', window.location.pathname + window.location.search);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior, block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

export function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok: boolean;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}

export async function copyEmail() {
  const ok = await copyText(EMAIL);
  if (ok) toast('Email copied to clipboard', 'success');
  else {
    toast('Opening your mail app…', 'info');
    window.location.href = `mailto:${EMAIL}`;
  }
  return ok;
}

/** Cross-component events (palette ⇄ navbar ⇄ projects ⇄ pwa install) */
export const EVENTS = {
  openPalette: 'app:open-palette',
  openProject: 'app:open-project',
  openInstallPrompt: 'app:open-install-prompt',
} as const;

export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENTS.openProject, { detail: id }));
}

export function openPalette() {
  window.dispatchEvent(new Event(EVENTS.openPalette));
}

export function openInstallPrompt() {
  window.dispatchEvent(new Event(EVENTS.openInstallPrompt));
}

/** Preloader shows once per session and never for reduced-motion users.
 * Can be explicitly tested/forced anytime via ?boot or ?preloader in the URL.
 */
export const SHOW_PRELOADER = (() => {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has('boot') || params.has('preloader')) {
      return true;
    }
    return !sessionStorage.getItem('as:booted') && !prefersReducedMotion();
  } catch {
    return false;
  }
})();

/** Base delay (ms) for the hero entrance so it plays as the preloader lifts. */
export const INTRO_DELAY = SHOW_PRELOADER ? 1700 : 120;
