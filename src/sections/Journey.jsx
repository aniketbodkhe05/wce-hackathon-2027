import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';
import { Search, GitBranch, Code2, CheckCircle, Mic } from 'lucide-react';

const stepIcons = {
  '01': Search,
  '02': GitBranch,
  '03': Code2,
  '04': CheckCircle,
  '05': Mic,
};

const stepColors = {
  '01': '#7547e8',
  '02': '#315bff',
  '03': '#27dccb',
  '04': '#b9f36b',
  '05': '#7547e8',
};

function StepIcon({ step, color }) {
  const Icon = stepIcons[step];
  return <Icon className="w-6 h-6" style={{ color }} strokeWidth={1.5} />;
}

export function Journey() {
  return (
    <section id="journey" aria-label="Event journey" className="relative section-pad overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(117,71,232,0.04),transparent_55%)]"
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          index="SEC // 07"
          kicker="The Process"
          title="From idea"
          accent="to arena."
          description="Five stages — discovery, architecture, build, checkpoints, demo."
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#7547e8]/50 to-transparent"
          />

          <div className="space-y-12">
            {eventData.journey.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.05} x={-20} y={0}>
                <div className="relative pl-10 sm:pl-14 group">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-2 w-[24px] h-[24px] rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                      i === 0
                        ? `border-[${stepColors[step.step]}] bg-[${stepColors[step.step]}] shadow-[0_0_16px_${stepColors[step.step]}]`
                        : 'border-[#1b2430] bg-[#07090d] group-hover:border-[#7547e8]/60'
                    }`}
                  >
                    <span className="font-display text-[10px] font-semibold text-[#05060b]">
                      {step.step}
                    </span>
                  </span>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-5 relative">
                      <div className="relative sticky top-24">
                        <div className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center group-hover:border-current/30 transition-all duration-500 mb-6 shrink-0" style={{ background: `linear-gradient(135deg, ${stepColors[step.step]}1a, ${stepColors[step.step]}0d)` }}>
                          <StepIcon step={step.step} color={stepColors[step.step]} />
                        </div>
                        <span className="font-mono text-[11px] text-[#7547e8] tracking-[0.2em] block mb-2">
                          STEP {step.step}
                        </span>
                        <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#f2f5f7] leading-tight mb-3">
                          {step.title}
                        </h3>
                        <p className="font-mono text-[11px] text-[#5c6673] tracking-[0.14em] uppercase">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-7">
                      <div className="relative glass-panel tech-corners rounded-sm p-6 sm:p-7 h-full group overflow-hidden" style={{ '--step-color': stepColors[step.step] }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--step-color)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                          <p className="text-[#929caa] leading-relaxed max-w-2xl mb-5">{step.description}</p>
                          <ul className="space-y-2.5 pt-4 border-t hairline">
                            {step.keyOutputs.map((out) => (
                              <li
                                key={out}
                                className="flex items-start gap-3 text-sm text-[#c7cfd9] group-hover:text-[#f2f5f7] transition-colors"
                              >
                                <span className="w-5 h-5 shrink-0 flex items-center justify-center rounded bg-[#7547e8]/10 text-[#7547e8]">
                                  <CheckCircle className="w-3 h-3" strokeWidth={2.5} />
                                </span>
                                <span className="leading-relaxed">{out}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ opacity: 0.5 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}