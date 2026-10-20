import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';

export function Timeline() {
  const phases = eventData.timeline;

  return (
    <section id="timeline" aria-label="Event timeline" className="relative section-pad overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(49,91,255,0.05),transparent_60%)]"
      />
      <div className="container-custom relative z-10">
        <SectionHeading
          index="SEC // 04"
          kicker="Chronology"
          title="Five phases."
          accent="One conquest."
          description="From abstract submission to the grand jury demo."
        />

        {/* Desktop: horizontal progression */}
        <div className="relative hidden lg:block mt-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[26px] h-px bg-gradient-to-r from-[#7547e8]/70 via-[#315bff]/50 to-[#27dccb]/20"
          />
          <div className="grid grid-cols-5 gap-6">
            {phases.map((phase, i) => (
              <Reveal key={phase.step} delay={i * 0.08} y={20}>
                <article className="group relative flex flex-col">
                  <div className="relative z-10 flex items-center gap-3 mb-6">
                    <span className="relative flex items-center justify-center w-[52px] h-[52px] rounded-full border border-white/15 bg-[#0b0e18] font-display text-xl font-semibold text-[#f5f6fa] transition-colors duration-500 group-hover:border-[#7547e8]/70 group-hover:text-[#7547e8] before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:transition-all before:duration-500 group-hover:before:border-[rgba(117,71,232,0.3)]">
                      {phase.step}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#7547e8]">
                      {phase.phase?.split('//')[1]?.trim() ?? phase.phase}
                    </span>
                  </div>

                  <h3 className="font-display text-lg xl:text-xl font-semibold leading-snug text-[#f5f6fa] group-hover:text-[#7547e8] transition-colors duration-500">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a5aabd]">
                    {phase.description}
                  </p>
                  <span className="mt-4 inline-flex w-fit rounded-sm border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#a5aabd]">
                    {phase.timeframe}
                  </span>
                  <ul className="mt-5 space-y-1.5">
                    {phase.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-[13px] leading-snug text-[#8b93a7]">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#315bff]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical progression */}
        <div className="relative lg:hidden mt-2">
          <div
            aria-hidden="true"
            className="absolute left-[25px] top-2 bottom-4 w-px bg-gradient-to-b from-[#7547e8]/70 via-[#315bff]/40 to-transparent"
          />
          <div className="space-y-9">
            {phases.map((phase, i) => (
              <Reveal key={phase.step} delay={i * 0.05} x={-18} y={0}>
                <article className="group relative pl-16">
                  <span className="absolute left-0 top-0 flex items-center justify-center w-[52px] h-[52px] rounded-full border border-white/15 bg-[#0b0e18] font-display text-lg font-semibold text-[#f5f6fa]">
                    {phase.step}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#7547e8]">
                    {phase.phase?.split('//')[1]?.trim() ?? phase.phase}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-[#f5f6fa]">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#a5aabd]">{phase.description}</p>
                  <span className="mt-3 inline-flex rounded-sm border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#a5aabd]">
                    {phase.timeframe}
                  </span>
                  <ul className="mt-4 space-y-1.5 pl-2 border-l border-white/10">
                    {phase.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-[13px] leading-snug text-[#8b93a7]">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#315bff]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}