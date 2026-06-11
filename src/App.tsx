import React from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import CommandPalette from './components/CommandPalette';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative w-full bg-black">
      <Preloader />
      <Cursor />
      <CommandPalette />
      <BackgroundVideo />

      {/* Vignette layers */}
      <div className="fixed inset-0 z-[2] pointer-events-none bg-black/30 mix-blend-overlay"></div>
      <div className="fixed inset-0 z-[3] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* Grain / noise texture overlay — cinematic premium feel */}
      <div
        className="fixed inset-0 z-[4] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Scrollable Content Layer */}
      <div className="relative z-[10] flex flex-col">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Footer />
      </div>
    </div>
  );
}

export default App;
