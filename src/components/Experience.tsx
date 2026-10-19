import Icon from './Icon';
import { Container, Reveal, SectionHeading } from './ui';
import { certifications, competencies, principles } from '../lib/data';

export default function Experience() {
  return (
    <>
      {/* Architecture */}
      <section id="architecture" className="relative scroll-mt-24 py-20 sm:py-28">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Core competencies"
            title="Architecture,"
            accent="by design."
            description="I architect reliable, high-performance systems at the intersection of modern C++ efficiency, relational database design and Generative AI workflows — building intuitive developer tools and scalable platforms with real-world impact."
          />

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {competencies.map((c, i) => (
              <Reveal key={c.number} delay={(i % 2) * 90} className="lg lg-dim lg-spec lg-glow group relative flex flex-col overflow-hidden rounded-[30px] p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="lg-chip grid h-12 w-12 place-items-center rounded-2xl text-white/85 transition-transform duration-500 group-hover:scale-105">
                    <Icon name={c.icon} size={21} />
                  </span>
                  <span className="font-display text-[44px] leading-none font-semibold tracking-[-0.05em] text-white/[0.08] transition-colors duration-500 group-hover:text-white/20">
                    {c.number}
                  </span>
                </div>
                <h3 className="font-display mt-8 text-[22px] leading-tight font-semibold text-white sm:text-[26px]">{c.title}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.8] text-white/55">{c.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  {c.tags.map((t) => (
                    <span key={t} className="lg-chip rounded-full px-3 py-1.5 text-[11.5px] text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Principles */}
          <Reveal className="lg lg-dim lg-glow relative mt-4 overflow-hidden rounded-[30px] p-6 sm:mt-5 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-white/45 uppercase">How I build</p>
              <span className="font-code text-[11px] text-white/30">04 principles</span>
            </div>
            <div className="relative mt-7">
              <span aria-hidden="true" className="hairline absolute top-[15px] right-0 left-0 hidden lg:block" />
              <ol className="relative grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {principles.map((p, i) => (
                  <li key={p.title} className="relative">
                    <span
                      className="font-code relative grid h-[30px] w-[30px] place-items-center rounded-full text-[11px] text-[#07070b]"
                      style={{ background: ['#9fd0ff', '#8ff0d6', '#c7b2ff', '#ffc6a8'][i], boxShadow: '0 0 0 5px rgba(13,14,20,0.9)' }}
                    >
                      {i + 1}
                    </span>
                    <p className="font-display mt-4 text-[18px] font-semibold text-white">{p.title}</p>
                    <p className="mt-1.5 text-[13.5px] leading-[1.7] text-white/55">{p.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Credentials */}
      <section id="certifications" className="relative scroll-mt-24 py-20 sm:py-28">
        <Container>
          <SectionHeading index="04" eyebrow="Credentials" title="Always" accent="learning." />
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} className="lg lg-dim lg-spec lg-glow group flex flex-col rounded-[28px] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="lg-chip grid h-11 w-11 place-items-center rounded-2xl text-[#c7b2ff]">
                    <Icon name="award" size={19} />
                  </span>
                  <span className="font-code lg-chip rounded-full px-2.5 py-1 text-[11px] text-white/55">{c.year}</span>
                </div>
                <p className="mt-8 text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">{c.issuer}</p>
                <h3 className="font-display mt-2 text-[21px] leading-snug font-semibold text-white">{c.title}</h3>
                <div className="mt-auto flex items-center gap-2 pt-6 text-[12px] text-white/45">
                  <Icon name="check" size={13} stroke={2.4} className="text-[#8ff0d6]" />
                  Certification completed
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
