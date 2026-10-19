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
        style={{ background: 'linear-gradient(180deg, rgba(5,5,10,0.35) 0%, rgba(5,5,10,0.18) 40%, rgba(5,5,10,0.48) 100%)' }}
      />

      {/* Light sources for the glass to refract */}
      <div className="orb" style={orb('rgba(120,170,255,0.95)', 0.28, '28s', { width: '55vmax', height: '55vmax', top: '-18vmax', left: '-14vmax' })} />
      <div
        className="orb"
        style={orb('rgba(180,140,255,0.95)', 0.24, '34s', { width: '48vmax', height: '48vmax', top: '30vh', right: '-20vmax', animationDelay: '-8s' })}
      />
      <div
        className="orb"
        style={orb('rgba(110,240,210,0.85)', 0.18, '40s', { width: '40vmax', height: '40vmax', bottom: '-20vmax', left: '20vw', animationDelay: '-16s' })}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.6) 100%)' }}
      />

      {/* Film grain — desktop only (feTurbulence rasterisation is costly on mobile GPUs) */}
      <div className="absolute inset-0 hidden opacity-[0.045] sm:block" style={{ backgroundImage: GRAIN, backgroundSize: '160px 160px' }} />
    </div>
  );
}
