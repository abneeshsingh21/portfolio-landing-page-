import { useCallback, useEffect, useState } from 'react';
import Icon from './Icon';
import { GlassButton } from './ui';
import { toast } from '../lib/toast';
import { EVENTS } from '../lib/site';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Lazy-initialize standalone state without calling setState inside an effect
  const [isStandalone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });

  // Detect iOS Safari
  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream
    );
  });

  const triggerInstall = useCallback(async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setVisible(false);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  }, [deferredPrompt, isIOS]);

  useEffect(() => {
    if (isStandalone) return;

    // Listen for Chrome/Edge/Android beforeinstallprompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const dismissed = sessionStorage.getItem('pwa-dismissed');
      if (!dismissed) {
        setTimeout(() => setVisible(true), 3500);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // If on iOS and not dismissed, show prompt after delay
    if (isIOS) {
      const dismissed = sessionStorage.getItem('pwa-dismissed');
      if (!dismissed) {
        setTimeout(() => setVisible(true), 4000);
      }
    }

    // App installed event listener
    const handleAppInstalled = () => {
      setVisible(false);
      setShowIOSGuide(false);
      setDeferredPrompt(null);
      toast('Portfolio App added to your Home Screen!', 'success');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Global listener to trigger from Navbar / Menu / CommandPalette
    const handleOpenTrigger = () => {
      if (isStandalone) {
        toast('You are already using the installed app!', 'info');
        return;
      }
      if (isIOS) {
        setShowIOSGuide(true);
      } else if (deferredPrompt) {
        void triggerInstall();
      } else {
        setShowIOSGuide(true);
      }
    };

    window.addEventListener(EVENTS.openInstallPrompt, handleOpenTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener(EVENTS.openInstallPrompt, handleOpenTrigger);
    };
  }, [deferredPrompt, isIOS, isStandalone, triggerInstall]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('pwa-dismissed', 'true');
  };

  if (isStandalone) return null;

  return (
    <>
      {/* Floating Mobile Bottom Install Banner */}
      {visible && !showIOSGuide && (
        <aside
          aria-label="Install Portfolio App"
          className="anim-drop fixed inset-x-3 bottom-20 z-40 sm:bottom-6 sm:inset-x-auto sm:right-6 sm:w-[380px]"
        >
          <div className="lg lg-strong relative flex items-center justify-between gap-3 rounded-2xl p-3 shadow-2xl backdrop-blur-xl border border-white/15 bg-[#050508]/85">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-md">
                <img
                  src="/icons/icon-192.png"
                  alt="Liquid Glass Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display truncate text-[13px] font-semibold text-white">
                  Install Portfolio App
                </p>
                <p className="truncate text-[11px] text-white/60">
                  {isIOS ? 'Add to Home Screen (iOS)' : '1-Tap instant launch & offline access'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => void triggerInstall()}
                className="lg-press inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-[12px] font-semibold text-black shadow-lg hover:bg-white/90"
              >
                <Icon name="download" size={13} stroke={2.2} />
                Install
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss install banner"
                className="lg-press grid h-7 w-7 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
              >
                <Icon name="x" size={14} />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* iOS "Add to Home Screen" Instructions Modal */}
      {showIOSGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Install on iOS"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md anim-fade"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="lg lg-strong relative w-full max-w-sm rounded-[28px] p-6 text-center border border-white/20 bg-[#090b14]/95 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* App Icon Preview */}
            <div className="mx-auto mb-4 relative h-16 w-16 overflow-hidden rounded-2xl border border-white/25 shadow-xl">
              <img
                src="/icons/icon-512.png"
                alt="Portfolio App Icon"
                className="h-full w-full object-cover"
              />
            </div>

            <h3 className="font-display text-lg font-bold text-white mb-1">
              Install Portfolio App
            </h3>
            <p className="text-[12.5px] text-white/65 mb-6">
              Install this app directly onto your mobile home screen with the custom liquid glass icon.
            </p>

            <div className="space-y-3.5 text-left mb-6">
              <div className="flex items-center gap-3.5 rounded-xl bg-white/[0.05] p-3 border border-white/10">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
                  <Icon name="share" size={16} />
                </span>
                <p className="text-[12px] text-white/90 leading-tight">
                  1. Tap the <strong className="text-white">Share</strong> icon in the Safari bottom toolbar.
                </p>
              </div>

              <div className="flex items-center gap-3.5 rounded-xl bg-white/[0.05] p-3 border border-white/10">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white font-mono text-sm font-bold">
                  +
                </span>
                <p className="text-[12px] text-white/90 leading-tight">
                  2. Scroll down and tap <strong className="text-white">Add to Home Screen</strong>.
                </p>
              </div>
            </div>

            <GlassButton
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setShowIOSGuide(false)}
            >
              Got it
            </GlassButton>
          </div>
        </div>
      )}
    </>
  );
}
