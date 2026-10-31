import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';
import { Calendar, Zap, Code, Users, Award } from 'lucide-react';

const phaseIcons = {
  '01': Calendar,
  '02': Users,
  '03': Zap,
  '04': Code,
  '05': Award,
};

function PhaseIcon({ step }) {
  const Icon = phaseIcons[step];
  return <Icon className="w-7 h-7 text-[#7547e8]" strokeWidth={1.5} />;
}

function PhaseIconSmall({ step }) {
  const Icon = phaseIcons[step];
  return <Icon className="w-5 h-5 text-[#7547e8]" strokeWidth={1.5} />;
}

export function Timeline() {
  const phases = eventData.timeline;

  return (
    <section id="timeline" aria-label="Event timeline" className="relative section-pad overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(49,91,255,0.05),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(39,220,203,0.04),transparent_60%)]"
      />
      <div className="container-custom relative z-10">
        <SectionHeading
          title="TIMELINE"
          description="From abstract submission to final awards."
        />

        {/* Desktop: Horizontal timeline with connecting line */}
        <div className="relative hidden lg:block mt-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[40px] h-px bg-gradient-to-r from-transparent via-[#7547e8]/50 to-transparent"
          />
          
          <div className="grid grid-cols-5 gap-4">
            {phases.map((phase, i) => (
              <Reveal key={phase.step} delay={i * 0.08} y={20}>
                <article className="group relative">
                  {/* Timeline marker */}
                  <div className="relative flex justify-center mb-6">
                    <div className="relative z-10 flex items-center justify-center w-[80px] h-[80px] rounded-full border-2 border-white/10 bg-[#0b0e18] transition-all duration-500 group-hover:border-[#7547e8]/70 group-hover:scale-110">
                      <span className="font-display text-xl font-semibold text-[#f5f6fa]">
                        {phase.step}
                      </span>
                      <div className="absolute inset-0 rounded-full border border-transparent transition-all duration-500 group-hover:border-[#7547e8]/30 group-hover:scale-125" />
                    </div>
                  </div>

                  {/* Phase label */}
                  <div className="text-center mb-4">
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#7547e8]">
                      {phase.phase}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7547e8]/10 to-[#315bff]/10 border border-white/5 flex items-center justify-center group-hover:border-[#7547e8]/30 transition-all duration-500">
                      <PhaseIcon step={phase.step} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg xl:text-xl font-semibold leading-snug text-[#f5f6fa] text-center group-hover:text-[#7547e8] transition-colors duration-500 mb-3">
                    {phase.title}
                  </h3>
                  
                  {/* Timeframe */}
                  <div className="text-center mb-4">
                    <span className="inline-flex w-fit rounded-sm border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#a5aabd]">
                      {phase.timeframe}
                    </span>
                  </div>

                  {/* Highlights - minimal */}
                  <ul className="space-y-2 px-2">
                    {phase.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="flex items-start justify-center gap-2 text-[13px] leading-relaxed text-[#a3adba]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#315bff]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="relative lg:hidden mt-2">
          <div
            aria-hidden="true"
            className="absolute left-[11px] top-2 bottom-4 w-px bg-gradient-to-b from-transparent via-[#7547e8]/50 to-transparent"
          />
          <div className="space-y-10">
            {phases.map((phase, i) => (
              <Reveal key={phase.step} delay={i * 0.05} x={-18} y={0}>
                <article className="group relative pl-10">
                  {/* Timeline marker */}
                  <div className="absolute left-0 top-2 flex items-center justify-center w-[24px] h-[24px]">
                    <div className="relative z-10 flex items-center justify-center w-[24px] h-[24px] rounded-full border-2 border-white/10 bg-[#0b0e18] transition-all duration-500 group-hover:border-[#7547e8]/70 group-hover:scale-110">
                      <span className="font-display text-[11px] font-semibold text-[#f5f6fa]">
                        {phase.step}
                      </span>
                      <div className="absolute inset-0 rounded-full border border-transparent transition-all duration-500 group-hover:border-[#7547e8]/30 group-hover:scale-125" />
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7547e8]/10 to-[#315bff]/10 border border-white/5 flex items-center justify-center group-hover:border-[#7547e8]/30 transition-all duration-500 shrink-0">
                        <PhaseIconSmall step={phase.step} />
                      </div>
                      <div>
                        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#7547e8] block">
                          {phase.phase}
                        </span>
                        <h3 className="font-display text-xl font-semibold leading-snug text-[#f5f6fa] mt-0.5">
                          {phase.title}
                        </h3>
                      </div>
                    </div>
                    
                    <span className="mb-3 inline-flex rounded-sm border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[#a5aabd]">
                      {phase.timeframe}
                    </span>
                    
                    <ul className="ml-1 space-y-1.5 border-l border-white/10 pl-2">
                      {phase.highlights.slice(0, 2).map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[13px] leading-relaxed text-[#a3adba]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#315bff]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}