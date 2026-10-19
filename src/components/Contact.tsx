import { useState, type FormEvent } from 'react';
import Icon, { type IconName } from './Icon';
import { Container, Eyebrow, GlassButton, GlassLink, Reveal } from './ui';
import { EMAIL, LINKS, RESUME_URL, copyEmail } from '../lib/site';
import { toast } from '../lib/toast';

const TOPICS = ['Full-time role', 'Freelance / contract', 'Collaboration', 'Just saying hi'] as const;

const SOCIALS: { label: string; handle: string; href: string; icon: IconName }[] = [
  { label: 'GitHub', handle: '@abneeshsingh21', href: LINKS.github, icon: 'github' },
  { label: 'LinkedIn', handle: 'in/abneesh-singh001', href: LINKS.linkedin, icon: 'linkedin' },
  { label: 'ASWorks Studio', handle: 'asworks.studio', href: LINKS.asworks, icon: 'bag' },
  { label: 'Résumé', handle: 'PDF · one page', href: RESUME_URL, icon: 'file' },
];

export default function Contact() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>(TOPICS[0]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast('Add a short message first', 'info');
      return;
    }
    const subject = `[Portfolio] ${topic}${name.trim() ? ` — ${name.trim()}` : ''}`;
    const body = `${message.trim()}\n\n— ${name.trim() || 'Sent from your portfolio'}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-12 sm:py-20 lg:py-28">
      <Container>
        <Reveal className="lg-prism relative overflow-hidden rounded-[24px] p-5 sm:rounded-[36px] sm:p-10 lg:p-14">
          <span aria-hidden="true" className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(159,208,255,0.35), transparent 65%)' }} />
          <span aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-48 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(199,178,255,0.3), transparent 65%)' }} />

          <div className="relative grid gap-7 sm:gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Pitch */}
            <div className="flex flex-col lg:col-span-6">
              <Eyebrow index="05">Contact</Eyebrow>
              <h2 className="font-display txt-shadow mt-4 sm:mt-6 text-[28px] leading-[1.08] font-semibold text-white sm:text-[44px] lg:text-[58px]">
                Have something ambitious in mind? <span className="font-accent text-iridescent">Let’s build it.</span>
              </h2>
              <p className="mt-3 sm:mt-5 max-w-md text-[14px] leading-[1.65] text-white/60 sm:text-[15.5px]">
                Roles, contracts, collaborations on AI systems or developer tooling — my inbox is open.
              </p>

              <div className="mt-5 sm:mt-8 flex flex-wrap gap-3">
                <GlassButton variant="primary" size="md" icon="copy" onClick={() => void copyEmail()} className="max-w-full sm:h-[52px] sm:px-7">
                  <span className="truncate">{EMAIL}</span>
                </GlassButton>
              </div>

              <ul className="mt-5 sm:mt-8 grid grid-cols-2 gap-2 sm:gap-2.5">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="lg-chip group flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.08] sm:rounded-2xl sm:px-4 sm:py-3.5 border border-white/10"
                    >
                      <Icon name={s.icon} size={16} className="text-white/70 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-semibold text-white sm:text-[13.5px]">{s.label}</span>
                        <span className="block truncate text-[11px] text-white/45 sm:text-[12px]">{s.handle}</span>
                      </span>
                      <Icon name="arrowUpRight" size={13} className="text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white shrink-0 hidden xs:block" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Composer */}
            <form onSubmit={submit} className="lg-preloader lg-spec lg-glow flex flex-col rounded-[20px] p-4 sm:rounded-[28px] sm:p-7 lg:col-span-6 border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]" aria-label="Compose an email">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold text-white sm:text-[15px]">Quick message</p>
                <span className="font-code text-[10.5px] text-white/40 sm:text-[11px]">opens your mail app</span>
              </div>

              <fieldset className="mt-4 sm:mt-5">
                <legend className="text-[10px] font-semibold tracking-[0.2em] text-white/45 uppercase sm:text-[11px]">I’m reaching out about</legend>
                <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                  {TOPICS.map((t) => {
                    const on = topic === t;
                    return (
                      <label key={t} className={`lg-press inline-flex h-8 sm:h-9 cursor-pointer items-center rounded-full px-3 sm:px-4 text-[11.5px] sm:text-[12.5px] font-medium transition-colors ${on ? 'lg-mercury text-white font-semibold shadow-[0_0_14px_rgba(159,208,255,0.3)]' : 'lg-chip text-white/65 hover:text-white border border-white/10'}`}>
                        <input type="radio" name="topic" value={t} checked={on} onChange={() => setTopic(t)} className="sr-only" />
                        {t}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <label className="mt-4 sm:mt-5 block">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-white/45 uppercase sm:text-[11px]">Your name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  className="lg-reservoir mt-1.5 sm:mt-2 h-10 sm:h-12 w-full rounded-xl sm:rounded-2xl px-3.5 sm:px-4 text-[14px] sm:text-[15px] text-white"
                />
              </label>

              <label className="mt-3.5 sm:mt-4 block">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-white/45 uppercase sm:text-[11px]">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A few lines about what you’re building…"
                  rows={3}
                  className="lg-reservoir mt-1.5 sm:mt-2 w-full resize-none rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] leading-relaxed text-white"
                />
              </label>

              <div className="mt-4 sm:mt-5 flex items-center justify-between gap-3">
                <span className="hidden items-center gap-1.5 text-[11.5px] text-white/40 sm:inline-flex">
                  <Icon name="shield" size={13} /> Nothing is stored on this site
                </span>
                <GlassButton type="submit" variant="primary" size="md" iconRight="send" className="w-full sm:w-auto sm:ml-auto">
                  Compose email
                </GlassButton>
              </div>
            </form>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-4 hidden sm:flex justify-center">
          <GlassLink href={`mailto:${EMAIL}`} external={false} variant="ghost" size="sm" icon="mail" magnetic={false}>
            Prefer your own client? Email me directly
          </GlassLink>
        </Reveal>
      </Container>
    </section>
  );
}
