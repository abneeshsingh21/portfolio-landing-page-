import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/site';

interface Options {
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
  startDelay?: number;
}

/** Types, holds, deletes and cycles through phrases. */
export function useTypewriter(
  phrases: readonly string[],
  { typeSpeed = 48, deleteSpeed = 24, hold = 2200, startDelay = 600 }: Options = {},
) {
  const [text, setText] = useState(() => (prefersReducedMotion() ? (phrases[0] ?? '') : ''));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let timer = 0;
    let i = 0;
    let pos = 0;
    let deleting = false;

    const step = () => {
      const phrase = phrases[i] ?? '';
      if (!deleting) {
        pos++;
        setText(phrase.slice(0, pos));
        if (pos >= phrase.length) {
          deleting = true;
          timer = window.setTimeout(step, hold);
          return;
        }
        timer = window.setTimeout(step, typeSpeed + Math.random() * 30);
      } else {
        pos--;
        setText(phrase.slice(0, pos));
        if (pos <= 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
          timer = window.setTimeout(step, 380);
          return;
        }
        timer = window.setTimeout(step, deleteSpeed);
      }
    };

    timer = window.setTimeout(step, startDelay);
    return () => clearTimeout(timer);
  }, [phrases, typeSpeed, deleteSpeed, hold, startDelay]);

  return text;
}
