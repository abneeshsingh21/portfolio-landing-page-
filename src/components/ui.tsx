import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import Icon, { type IconName } from './Icon';
import { useMagnetic } from '../hooks/usePointerFx';

type Variant = 'primary' | 'glass' | 'ghost';
type Size = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm';

const VARIANTS: Record<Variant, string> = {
  primary: 'lg lg-bright lg-spec lg-refract',
  glass: 'lg lg-spec lg-refract text-white',
  ghost: 'text-white/70 hover:text-white hover:bg-white/[0.07] transition-colors',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-[12.5px]',
  md: 'h-11 px-5 text-[13.5px]',
  lg: 'h-12 sm:h-[52px] px-6 sm:px-7 text-[14px]',
  icon: 'h-11 w-11',
  'icon-sm': 'h-9 w-9',
};

const GAPS: Record<Size, string> = { sm: 'gap-1.5', md: 'gap-2', lg: 'gap-2.5', icon: '', 'icon-sm': '' };

function buttonClass(variant: Variant = 'glass', size: Size = 'md', extra = '') {
  return `group lg-press relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap select-none ${VARIANTS[variant]} ${SIZES[size]} ${extra}`;
}

interface Shared {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  magnetic?: boolean;
  children?: ReactNode;
  className?: string;
}

/** Restart the liquid ripple from the exact press point. */
function ripple(e: ReactPointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--rx', `${e.clientX - r.left}px`);
  el.style.setProperty('--ry', `${e.clientY - r.top}px`);
  el.classList.remove('is-rippling');
  void el.offsetWidth;
  el.classList.add('is-rippling');
}

function Inner({ icon, iconRight, children, size = 'md' }: Pick<Shared, 'icon' | 'iconRight' | 'children' | 'size'>) {
  const iconSize = size === 'lg' ? 17 : size === 'sm' || size === 'icon-sm' ? 14 : 16;
  return (
    <>
      <span className="lg-sheen" aria-hidden="true" />
      <span className="lg-ripple" aria-hidden="true" />
      <span className={`relative z-[1] inline-flex items-center ${GAPS[size]}`}>
        {icon && <Icon name={icon} size={iconSize} />}
        {children}
        {iconRight && (
          <Icon
            name={iconRight}
            size={iconSize}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
          />
        )}
      </span>
    </>
  );
}

export function GlassLink({
  variant,
  size,
  icon,
  iconRight,
  magnetic = true,
  children,
  className = '',
  external,
  onPointerDown,
  ...rest
}: Shared & AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, magnetic ? 0.22 : 0);
  const ext = external ?? /^https?:/.test(rest.href ?? '');
  return (
    <a
      ref={ref}
      className={buttonClass(variant, size, className)}
      {...(ext ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      onPointerDown={(e) => {
        ripple(e);
        onPointerDown?.(e);
      }}
      {...rest}
    >
      <Inner icon={icon} iconRight={iconRight} size={size}>
        {children}
      </Inner>
    </a>
  );
}

export function GlassButton({
  variant,
  size,
  icon,
  iconRight,
  magnetic = true,
  children,
  className = '',
  type = 'button',
  onPointerDown,
  ...rest
}: Shared & ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  useMagnetic(ref, magnetic ? 0.22 : 0);
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClass(variant, size, className)}
      onPointerDown={(e) => {
        ripple(e);
        onPointerDown?.(e);
      }}
      {...rest}
    >
      <Inner icon={icon} iconRight={iconRight} size={size}>
        {children}
      </Inner>
    </button>
  );
}

/** Scroll-triggered entrance. Animates `opacity` + `translate` only, so glass
 *  surfaces keep their backdrop blur and `transform` stays free for tilt. */
export function Reveal({
  delay = 0,
  className = '',
  style,
  children,
  id,
}: {
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ ...style, ['--d' as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Splits a string into masked words that rise in sequence once revealed. */
export function SplitWords({ text, start = 0, step = 45, className = '' }: { text: string; start?: number; step?: number; className?: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="word inline-block mr-[0.28em] last:mr-0">
          <span className={`inline-block ${className}`} style={{ ['--wd' as string]: `${start + i * step}ms` }}>
            {w}
          </span>
        </span>
      ))}
    </>
  );
}

export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <span className="lg-chip inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5">
      {index && <span className="font-code text-[10.5px] text-white/45">{index}</span>}
      {index && <span className="h-3 w-px bg-white/15" />}
      <span className="text-[11px] font-semibold tracking-[0.22em] text-white/75 uppercase">{children}</span>
    </span>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:mb-14 sm:gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="font-display txt-shadow mt-3.5 sm:mt-5 text-[28px] sm:text-[48px] md:text-[64px] leading-[1.06] font-semibold text-white">
            <span className="sr-only">
              {title} {accent}
            </span>
            <span aria-hidden="true" className="inline">
              <SplitWords text={title} start={80} />
              {accent && (
                <>
                  <span className="inline-block w-[0.28em]" aria-hidden="true" />
                  <SplitWords text={accent} start={140 + title.split(' ').length * 45} className="font-accent text-iridescent" />
                </>
              )}
            </span>
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={140}>
            <p className="mt-3 sm:mt-5 max-w-xl text-[13.5px] leading-[1.7] text-white/60 sm:text-[16px]">{description}</p>
          </Reveal>
        )}
      </div>
      {aside && <Reveal delay={180}>{aside}</Reveal>}
    </div>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-8 ${className}`}>{children}</div>;
}
