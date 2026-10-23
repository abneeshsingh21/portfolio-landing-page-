import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { DEVOPS_RESUME_URL, SWE_RESUME_URL } from '../lib/site';

export type PortfolioMode = 'swe' | 'devops';

interface PortfolioContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  isDevOps: boolean;
  resumeUrl: string;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

function detectInitialMode(): PortfolioMode {
  if (typeof window === 'undefined') return 'swe';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = new URLSearchParams(window.location.search).get('mode');

  if (path === '/devops' || path.startsWith('/devops/') || hash === '#devops' || search === 'devops') {
    return 'devops';
  }
  return 'swe';
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>(detectInitialMode);

  useEffect(() => {
    // Listen for browser back/forward buttons
    const handlePopState = () => {
      setModeState(detectInitialMode());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setMode = (newMode: PortfolioMode) => {
    setModeState(newMode);
    const currentPath = window.location.pathname.toLowerCase();
    if (newMode === 'devops' && currentPath !== '/devops') {
      window.history.pushState(null, '', '/devops');
      document.title = 'Abneesh Singh — DevOps & Cloud Engineering';
    } else if (newMode === 'swe' && currentPath !== '/') {
      window.history.pushState(null, '', '/');
      document.title = 'Abneesh Singh — Agentic AI & Systems Engineer';
    }
  };

  useEffect(() => {
    if (mode === 'devops') {
      document.title = 'Abneesh Singh — DevOps & Cloud Engineering';
    } else {
      document.title = 'Abneesh Singh — Agentic AI & Systems Engineer';
    }
  }, [mode]);

  const resumeUrl = mode === 'devops' ? DEVOPS_RESUME_URL : SWE_RESUME_URL;

  return (
    <PortfolioContext.Provider
      value={{
        mode,
        setMode,
        isDevOps: mode === 'devops',
        resumeUrl,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}
