import Icon from './Icon';
import { Container } from './ui';
import { stack } from '../lib/data';

function Row({ items, reverse = false, speed = 48 }: { items: string[]; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask py-3.5">
      <ul className="marquee-track items-center" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        {doubled.map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-6 pr-6 text-[13px] font-medium whitespace-nowrap text-white/60 sm:text-[14px]"
          >
            <span>{t}</span>
            <Icon name="sparkles" size={11} className="text-white/25" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Marquee() {
  const half = Math.ceil(stack.length / 2);
  const a = stack.slice(0, half);
  const b = stack.slice(half);
  return (
    <section aria-label="Core stack" className="relative py-6 sm:py-10">
      <Container>
        <div className="lg lg-dim overflow-hidden rounded-[28px]">
          <Row items={[...a, ...b.slice(0, 3)]} speed={46} />
          <div className="hairline" />
          <Row items={[...b, ...a.slice(0, 3)]} reverse speed={54} />
        </div>
      </Container>
    </section>
  );
}
