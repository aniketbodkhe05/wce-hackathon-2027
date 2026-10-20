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
          index="SEC // 02"
          kicker="The Arena"
          title="Built for"
          accent="builders."
          description="Six commitments that define the 24-hour crucible at WCE Sangli."
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {eventData.highlights.map((item, i) => (
            <Reveal key={item.code} delay={i * 0.06} y={24}>
              <article className="group relative h-full border hairline p-7 sm:p-8 hover:bg-white/[0.015] transition-colors duration-500">
                <div className="absolute top-6 right-6 w-12 h-12 rounded-sm bg-white/[0.02] border hairline flex items-center justify-center group-hover:bg-[#7547e8]/10 transition-colors">
                  <span className="font-mono text-[10px] text-[#7547e8]">{item.code}</span>
                </div>
                <div className="mb-6 relative z-10">
                  <span className="font-mono text-[10px] text-[#7547e8] tracking-[0.16em] uppercase">
                    {item.metric}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl sm:text-[1.35rem] text-[#f2f5f7] leading-snug group-hover:text-[#7547e8] transition-colors duration-500 relative z-10">
                  {item.title}
                </h3>
                <p className="text-sm text-[#929caa] leading-relaxed mt-3 relative z-10 line-clamp-2">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}