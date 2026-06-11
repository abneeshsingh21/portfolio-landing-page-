import React, { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'hover' | 'drag';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('default');

  useEffect(() => {
    // Touch devices — skip
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }

      // Detect cursor context
      const target = e.target as HTMLElement;
      const isLink = target.closest('a') || target.closest('button') || target.closest('[role="button"]');
      const isDraggable = target.closest('[data-drag]');

      if (isDraggable) setCursorState('drag');
      else if (isLink) setCursorState('hover');
      else setCursorState('default');
    };

    // Ring follows with inertia
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Hide on touch
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const isHover = cursorState === 'hover';
  const isDrag = cursorState === 'drag';

  return (
    <>
      {/* Dot — instant, mix-blend-mode for inversion effect */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[1000]"
        style={{
          width: isHover ? '0px' : '6px',
          height: isHover ? '0px' : '6px',
          borderRadius: '50%',
          backgroundColor: 'white',
          mixBlendMode: 'difference',
          transition: 'width 0.2s ease, height 0.2s ease',
          willChange: 'transform',
        }}
      />

      {/* Ring — inertia follower */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        style={{
          width: isDrag ? '64px' : isHover ? '44px' : '32px',
          height: isDrag ? '64px' : isHover ? '44px' : '32px',
          borderRadius: '50%',
          border: isHover ? '1.5px solid rgba(255,255,255,0.9)' : '1px solid rgba(255,255,255,0.35)',
          backgroundColor: isHover ? 'rgba(255,255,255,0.08)' : 'transparent',
          backdropFilter: isHover ? 'blur(4px)' : 'none',
          mixBlendMode: isHover ? 'normal' : 'normal',
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border 0.2s ease, background-color 0.2s ease',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isDrag && (
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            DRAG
          </span>
        )}
      </div>
    </>
  );
}
