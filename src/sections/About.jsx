import { eventData } from '../data/event';
import { Reveal } from '../components/Reveal';

const stats = [
  { value: '24', unit: 'HRS', label: 'Non-stop build sprint' },
  { value: '02', unit: 'TRACKS', label: 'Novice & Expert' },
  { value: '09', unit: 'MISSIONS', label: 'Across both tiers' },
  { value: '₹0', unit: 'ROUND 1', label: 'Free entry' },
];

export function About() {
  return (
    <section
      id="about"
      aria-label="About WCE Hackathon 2027"
      className="relative section-pad overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(117,71,232,0.06),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(49,91,255,0.04),transparent_60%)]"
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-7 relative">
            <div className="relative tech-corners">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[11px] text-[#7547e8] tracking-[0.2em]">
                    SEC // 01
                  </span>
                  <span className="h-px w-12 bg-gradient-to-r from-[#7547e8] to-transparent" />
                  <span className="tick-label">The Institution</span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="section-title text-[#f2f5f7]">
                  Where engineering discipline meets{' '}
                  <span className="text-violet">raw ambition.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-8 max-w-xl text-[#929caa] text-base sm:text-lg leading-relaxed">
                  24-hour hackathon under VISION. Dual tracks, two audits, one arena.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-3 panel-line rounded-sm group hover:border-[#7547e8]/50 transition-colors">
                    <img src="/logos/wce-logo.svg" alt="WCE Sangli" className="w-8 h-8 object-contain" />
                    <div className="font-mono text-[10px] leading-tight">
                      <div className="text-white font-semibold tracking-wider">WCE SANGLI</div>
                      <div className="text-[#5c6673] tracking-[0.18em]">EST. 1947</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 panel-line rounded-sm group hover:border-[#7547e8]/50 transition-colors">
                    <img
                      src="/logos/acm-logo.png"
                      alt="WCE ACM Student Chapter"
                      className="w-8 h-8 object-contain"
                    />
                    <div className="font-mono text-[10px] leading-tight">
                      <div className="text-white font-semibold tracking-wider">WCE ACM SC</div>
                      <div className="text-[#5c6673] tracking-[0.18em]">CHARTERED 2016</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.08} y={24}>
                  <div className="relative tech-corners glass-panel p-6 sm:p-7 h-full rounded-sm group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7547e8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="font-display font-semibold text-4xl sm:text-5xl text-white group-hover:text-[#7547e8] transition-colors duration-500">
                        {s.value}
                      </div>
                      <div className="font-mono text-[10px] text-[#7547e8] tracking-[0.22em] mt-1">
                        {s.unit}
                      </div>
                      <div className="text-xs text-[#5c6673] leading-relaxed mt-3">{s.label}</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7547e8]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.4}>
              <p className="mt-6 font-mono text-[10px] tracking-[0.2em] uppercase text-[#5c6673]">
                {eventData.chapterCharter}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}