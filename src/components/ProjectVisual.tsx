import type { ComponentType, CSSProperties } from 'react';
import type { Project } from '../lib/data';

const vd = (s: number) => ({ ['--vd' as string]: `${s}s` }) as CSSProperties;
const box = 'lg-chip relative h-[136px] overflow-hidden rounded-[22px] p-4';

function NeuroShell() {
  return (
    <div className={`${box} font-code text-[11px]`}>
      <div className="flex gap-2 text-white/80">
        <span className="text-[#9fd0ff]">❯</span> delete everything in /
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {['L1', 'L2', 'L3', 'L4'].map((l, i) => (
          <span
            key={l}
            className="viz-step flex items-center justify-center gap-1 rounded-lg border border-[#8ff0d6]/25 bg-[#8ff0d6]/10 py-1.5 text-[#8ff0d6]"
            style={vd(i * 0.35)}
          >
            {l} <span className="opacity-70">scan</span>
          </span>
        ))}
      </div>
      <div className="viz-step mt-3 flex items-center gap-2 rounded-lg bg-[#ff6b6b]/10 px-2 py-1 text-[#ff9d9d]" style={vd(1.5)}>
        ✕ rm -rf / · blocked before execution
      </div>
    </div>
  );
}

function ASWorks() {
  const steps = ['Checkout', 'Stripe · Razorpay', 'GST invoice', 'Instant download'];
  return (
    <div className={`${box} flex flex-col justify-between`}>
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-code text-white/45">secure checkout</span>
        <span className="inline-flex items-center gap-1.5 text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> live
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {steps.map((s, i) => (
          <span
            key={s}
            className="viz-step rounded-lg border border-white/10 bg-white/[0.05] px-1.5 py-2 text-center text-[10px] leading-tight text-white/80"
            style={vd(i * 0.45)}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="relative h-[3px] rounded-full bg-white/[0.07]">
        <span className="viz-travel -top-[3px] h-[9px] w-[9px] rounded-full bg-[#c7b2ff] shadow-[0_0_14px_#c7b2ff]" />
      </div>
    </div>
  );
}

function Syting() {
  return (
    <div className={`${box} flex flex-col justify-end gap-2`}>
      <div className="absolute top-3 right-3 flex gap-1.5">
        <span className="font-code rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-[#ffc6a8]">&lt;100ms</span>
        <span className="font-code rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-white/60">RLS ✓</span>
      </div>
      <div className="viz-bubble w-fit max-w-[75%] rounded-2xl rounded-bl-md bg-white/[0.08] px-3 py-2 text-[12px] text-white/85" style={vd(0)}>
        It’s a mutual match — say hi
      </div>
      <div
        className="viz-bubble ml-auto w-fit max-w-[75%] rounded-2xl rounded-br-md px-3 py-2 text-[12px] text-[#07070b]"
        style={{ ...vd(0.7), background: '#ffc6a8' }}
      >
        Hey! Loved your profile.
      </div>
    </div>
  );
}

function LangShift() {
  return (
    <div className={`${box} font-code grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[10.5px] leading-relaxed`}>
      <div className="rounded-xl border border-white/10 bg-black/25 p-2.5">
        <p className="mb-1 text-[9.5px] text-white/35">app.ts</p>
        <p className="text-white/75">
          <span className="text-[#c7b2ff]">const</span> add = (a, b) =&gt;
        </p>
        <p className="pl-3 text-white/75">a + b;</p>
      </div>
      <span className="lg-chip rounded-full px-2 py-1 text-[9.5px] text-[#9fd0ff]">2-pass</span>
      <div className="relative overflow-hidden rounded-xl border border-[#9fd0ff]/25 bg-black/25 p-2.5">
        <span
          className="viz-scan pointer-events-none absolute inset-x-0 top-0 h-6"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(159,208,255,0.2), transparent)' }}
        />
        <p className="mb-1 text-[9.5px] text-white/35">app.rs</p>
        <p className="text-white/75">
          <span className="text-[#c7b2ff]">fn</span> add(a: i32, b: i32)
        </p>
        <p className="pl-3 text-white/75">-&gt; i32 {'{ a + b }'}</p>
      </div>
    </div>
  );
}

const MAP: Record<string, ComponentType> = {
  neuroshell: NeuroShell,
  asworks: ASWorks,
  syting: Syting,
  langshift: LangShift,
};

/** Small, illustrative, CSS-animated preview of what each product does. */
export default function ProjectVisual({ project }: { project: Project }) {
  const V = MAP[project.id];
  return V ? (
    <div aria-hidden="true">
      <V />
    </div>
  ) : null;
}
