import { useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Ambient, GlassFilters } from './components/Atmosphere';
import BackgroundVideo from './components/BackgroundVideo';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import CommandPalette from './components/CommandPalette';
import Toaster from './components/Toaster';
import InstallPrompt from './components/InstallPrompt';
import BackToTop from './components/BackToTop';
import { ScrollProgress, SectionRail } from './components/Chrome';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSpecularTracking } from './hooks/usePointerFx';
import { canHover } from './lib/site';

/** Real backdrop refraction is Chromium-only; enable it on capable desktops. */
function useRefraction() {
  useEffect(() => {
    const ua = navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } };
    const chromium = !!ua.userAgentData?.brands?.some((b) => /Chromium/i.test(b.brand));
    if (chromium && canHover()) document.documentElement.classList.add('refract');
    return () => document.documentElement.classList.remove('refract');
  }, []);
}

function PortfolioApp() {
  useRefraction();
  useSpecularTracking();

  return (
    <div className="relative min-h-screen w-full text-white">
      <GlassFilters />
      <Preloader />
      <Cursor />
      <CommandPalette />
      <Toaster />
      <InstallPrompt />
      <ScrollProgress />

      <BackgroundVideo />
      <Ambient />

      <div className="relative z-10 flex flex-col">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>

      <SectionRail />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
