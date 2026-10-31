import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';
import { Trophy, Briefcase, Palette, Share2, Award } from 'lucide-react';

const icons = {
  podium: Trophy,
  internships: Briefcase,
  uiux: Palette,
  social: Share2,
  certificates: Award,
};

const prizeAccents = ['#27dccb', '#315bff', '#7547e8', '#27dccb'];

export function Prizes() {
  const [featured, ...rest] = eventData.prizes;

  return (
    <section id="prizes" aria-label="Prizes" className="relative section-pad overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-24 h-[520px] w-[820px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(117,71,232,0.20),rgba(49,91,255,0.08)_45%,transparent_72%)] blur-2xl"
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          title="PRIZES"
          description="Cash prizes, internships, and certificates."
        />

        {/* Flagship award - unique layout */}
        <Reveal>
          <div className="relative mb-10 overflow-hidden rounded-sm border border-white/10 bg-gradient-to-b from-[#12152a]/90 via-[#0c0f1b]/85 to-[#080a12]/90">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(117,71,232,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(49,91,255,0.10)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 lg:p-16">
              <div className="lg:col-span-7 relative z-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#27dccb]">
                  {featured.category}
                </span>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.05] text-[#f5f6fa] sm:text-4xl lg:text-5xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#a5aabd]">
                  {featured.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {featured.perks.slice(0, 3).map((perk) => (
                    <span
                      key={perk}
                      className="rounded-sm border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[#c7cfd9]"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Geometric trophy composition */}
              <div className="lg:col-span-5 flex justify-center relative z-10">
                <div className="relative flex h-64 w-64 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(39,220,203,0.18),transparent_66%)]" />
                  <div className="absolute inset-6 rotate-45 rounded-[18%] border border-[#7547e8]/40" />
                  <div className="absolute inset-10 -rotate-12 rounded-[14%] border border-[#315bff]/50" />
                  <div className="absolute inset-14 rotate-6 rounded-full border border-[#27dccb]/50" />
                  <div className="absolute inset-0 animate-[spin-slow_42s_linear_infinite] rounded-full border border-dashed border-white/10" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-[#27dccb]/40 bg-[#0a0e1a] shadow-[0_0_60px_-10px_rgba(39,220,203,0.6)]">
                    <Trophy className="h-11 w-11 text-[#27dccb]" strokeWidth={1.4} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Supporting awards - unique asymmetric cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {rest.map((prize, i) => {
            const Icon = icons[prize.id] || Award;
            const accent = prizeAccents[i % prizeAccents.length];
            return (
              <Reveal key={prize.id} delay={0.06 + i * 0.06} y={22}>
                <article
                  className={`group relative flex flex-col h-full overflow-hidden rounded-sm border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-white/20 ${
                    i === 0 ? 'md:row-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: accent }}
                  />
                  
                  {i === 0 ? (
                    // Featured wide card
                    <div className="relative z-10 p-7 h-full flex flex-col">
                      <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 mb-4" style={{ background: `${accent}14` }}>
                        <Icon className="h-6 w-6" style={{ color: accent }} strokeWidth={1.7} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-xl font-semibold leading-snug text-[#f5f6fa] mb-2">
                          {prize.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-[#a5aabd]">
                          {prize.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t hairline flex flex-wrap gap-2">
                        {prize.perks.slice(0, 3).map((perk) => (
                          <span key={perk} className="rounded-sm border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#c7cfd9]">
                            {perk}
                          </span>
                        ))}
                      </div>
                      <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7b8494] block">
                        {prize.category}
                      </span>
                    </div>
                  ) : (
                    // Standard cards
                    <div className="relative z-10 p-6 h-full flex flex-col">
                      <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 mb-4" style={{ background: `${accent}14` }}>
                        <Icon className="h-5 w-5" style={{ color: accent }} strokeWidth={1.7} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-lg font-semibold leading-snug text-[#f5f6fa] mb-2">
                          {prize.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-[#a5aabd]">
                          {prize.description}
                        </p>
                      </div>
                      <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7b8494] block">
                        {prize.category}
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ opacity: 0.5 }} />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}