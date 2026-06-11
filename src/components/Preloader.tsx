import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [stage, setStage] = useState<'booting' | 'fading' | 'done'>('booting');
  const [text, setText] = useState('');
  
  const bootSequence = [
    '> LOADING EPL COMPILER RUNTIME v9.4.0...',
    '> MOUNTING NEUROSHELL HYBRID ENGINE [C++ + Python]...',
    '> INITIALIZING GHOST v6 OPERATIONAL KERNEL...',
    '> LINKING IRA VOICE AUTHENTICATION MODULE...',
    '> LANGSHIFT TRANSPILER READY — 25 LANGUAGE TARGETS...',
    '> ALL SYSTEMS NOMINAL. WELCOME.',
  ];

  useEffect(() => {
    let currentLine = 0;
    
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setText(prev => prev + (prev ? '\n' : '') + bootSequence[currentLine]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStage('fading');
          document.body.style.overflow = ''; // Unlock scrolling
        }, 600); // Hold final text briefly
      }
    }, 150); // Fast print speed

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (stage === 'fading') {
      const t = setTimeout(() => setStage('done'), 800); // matches CSS transition
      return () => clearTimeout(t);
    }
  }, [stage]);

  if (stage === 'done') return null;

  return (
    <div 
      className={`fixed inset-0 z-[999] bg-[#050505] flex flex-col justify-end p-8 sm:p-12 font-mono text-[13px] sm:text-[15px] leading-loose transition-opacity duration-700 ease-in-out cursor-none ${stage === 'fading' ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="whitespace-pre-line text-white/60 font-medium tracking-wide">
        {text}
        <span className="animate-pulse ml-2 inline-block w-2.5 h-4 bg-white/60 translate-y-0.5"></span>
      </div>
    </div>
  );
}
