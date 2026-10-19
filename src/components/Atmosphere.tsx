import type { CSSProperties } from 'react';

/**
 * Global visual layers that sit between the background video and the content:
 * the SVG refraction filter used by `.lg-refract`, colour orbs that give the
 * glass something to bend, a vignette and film grain.
 */
export function GlassFilters() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', pointerEvents: 'none' }}
    >
      <defs>
        <filter id="lg-refract" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="11" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="46" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const orb = (c: string, o: number, t: string, extra: CSSProperties): CSSProperties =>
  ({ ['--c' as string]: c, ['--o' as string]: o, ['--t' as string]: t, ...extra }) as CSSProperties;

export function Ambient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {/* Darken + cool the video so white type and glass read cleanly */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(4,6,12,0.32) 0%, rgba(4,6,12,0.15) 40%, rgba(4,6,12,0.42) 100%)' }}
      />

      {/* Primary central-field caustics that shine directly through scrolling glass cards */}
      <div
        className="orb"
        style={orb('rgba(120,190,255,0.95)', 0.38, '32s', { width: '52vmax', height: '52vmax', top: '10vh', left: '5vw' })}
      />
      <div
        className="orb"
        style={orb('rgba(195,145,255,0.9)', 0.34, '38s', { width: '48vmax', height: '48vmax', top: '45vh', right: '5vw', animationDelay: '-10s' })}
      />
      <div
        className="orb"
        style={orb('rgba(130,245,215,0.85)', 0.28, '42s', { width: '44vmax', height: '44vmax', top: '70vh', left: '25vw', animationDelay: '-18s' })}
      />
      <div
        className="orb"
        style={orb('rgba(255,180,130,0.6)', 0.22, '36s', { width: '38vmax', height: '38vmax', top: '-10vmax', right: '15vw', animationDelay: '-6s' })}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* Film grain — desktop only (feTurbulence rasterisation is costly on mobile GPUs) */}
      <div className="absolute inset-0 hidden opacity-[0.04] sm:block" style={{ backgroundImage: GRAIN, backgroundSize: '160px 160px' }} />
    </div>
  );
}
