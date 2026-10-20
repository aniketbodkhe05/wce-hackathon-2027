import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';

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
            className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#7547e8]/60 via-white/10 to-transparent"
          />

          <div className="space-y-12">
            {eventData.journey.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.05} x={-20} y={0}>
                <div className="relative pl-12 sm:pl-16 group">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1.5 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full border-2 transition-all duration-500 ${
                      i === 0
                        ? 'border-[#7547e8] bg-[#7547e8] shadow-[0_0_16px_rgba(117,71,232,0.7)]'
                        : 'border-[#1b2430] bg-[#07090d] group-hover:border-[#7547e8]/60'
                    }`}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-5">
                      <span className="font-mono text-[11px] text-[#7547e8] tracking-[0.2em]">
                        STEP {step.step}
                      </span>
                      <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#f2f5f7] leading-tight mt-2">
                        {step.title}
                      </h3>
                      <p className="font-mono text-[11px] text-[#5c6673] tracking-[0.14em] mt-2 uppercase">
                        {step.subtitle}
                      </p>
                    </div>

                    <div className="lg:col-span-7">
                      <p className="text-[#929caa] leading-relaxed max-w-2xl">{step.description}</p>
                      <ul className="mt-5 pt-4 border-t hairline space-y-2.5">
                        {step.keyOutputs.map((out) => (
                          <li
                            key={out}
                            className="flex items-start gap-3 text-sm text-[#c7cfd9]"
                          >
                            <span className="text-[#7547e8] mt-px">›</span>
                            {out}
                          </li>
                        ))}
                      </ul>
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