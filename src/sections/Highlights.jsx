import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';

export function Highlights() {
  return (
    <section
      id="highlights"
      aria-label="Event highlights"
      className="relative section-pad overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(39,220,203,0.04),transparent_55%)]"
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          title="GLIMPSES"
          description="Six essentials for the 24-hour hackathon."
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {eventData.highlights.map((item, i) => (
            <Reveal key={item.code} delay={i * 0.06} y={24}>
              <article className="group relative h-full border hairline rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7547e8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className="font-mono text-[11px] text-[#7547e8] tracking-[0.16em] uppercase shrink-0">
                      {item.metric}
                    </span>
                    <div className="w-12 h-12 rounded-sm bg-white/[0.02] border hairline flex items-center justify-center group-hover:bg-[#7547e8]/10 group-hover:border-[#7547e8]/50 transition-colors duration-500 shrink-0">
                      <span className="font-mono text-[11px] text-[#7547e8]">{item.code}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-xl sm:text-[1.35rem] text-[#f2f5f7] leading-snug group-hover:text-[#7547e8] transition-colors duration-500 pr-12">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a3adba]">
                    {item.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7547e8]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}