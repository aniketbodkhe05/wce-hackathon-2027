import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';
import { EASE_OUT_EXPO } from '../lib/easing';
import { ArrowUpRight, CircleDot, Terminal } from 'lucide-react';

const tracks = [
  { id: 'novice', name: 'Novice', code: 'TRK-A', audience: '1st & 2nd Year Engineers' },
  { id: 'expert', name: 'Expert', code: 'TRK-B', audience: '3rd & 4th Year + Research Grade' },
];

function DomainArtifact() {
  return (
    <div
      className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-sm border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
      role="img"
      aria-label="Interlocked geometric artifact representing the engineering domains"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(117,71,232,0.22),transparent_60%)]" />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rotate-45 border border-[#27dccb]/40" />
        <div className="absolute inset-8 -rotate-12 border border-[#315bff]/50" />
        <div className="absolute inset-16 rotate-6 rounded-full border border-[#7547e8]/60" />
        <div className="absolute inset-[38%] rounded-lg border border-[#27dccb]/60 bg-[#0a0e18] shadow-[0_0_50px_-8px_rgba(39,220,203,0.55)]" />
      </div>
      <div className="absolute inset-0 animate-[spin-slow_48s_linear_infinite]">
        <div className="absolute left-1/2 top-6 h-2 w-2 -translate-x-1/2 rounded-full bg-[#27dccb] shadow-[0_0_14px_2px_rgba(39,220,203,0.7)]" />
      </div>
    </div>
  );
}

export function Challenges() {
  const [active, setActive] = useState('novice');
  const missions = eventData.domains.filter((d) => d.track === active);

  return (
    <section
      id="domains"
      aria-label="Challenge domains"
      className="relative section-pad overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              index="SEC // 03"
              kicker="Mission Dossiers"
              title="Choose your"
              accent="battlefield."
              description="Nine problem statements across two tracks."
            />

            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mb-14">
                {tracks.map((t) => {
                  const isActive = active === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActive(t.id)}
                      aria-pressed={isActive}
                      className={`group relative text-left px-6 py-5 rounded-sm border transition-all duration-500 ${
                        isActive
                          ? 'border-[#7547e8]/50 bg-[rgba(117,71,232,0.06)]'
                          : 'hairline bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-[10px] tracking-[0.24em] ${
                            isActive ? 'text-[#7547e8]' : 'text-[#5c6673]'
                          }`}
                        >
                          {t.code}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isActive ? 'bg-[#7547e8] pulse-dot' : 'bg-[#1b2430]'
                          }`}
                        />
                      </div>
                      <div
                        className={`font-display font-semibold text-2xl mt-2 transition-colors duration-500 ${
                          isActive ? 'text-white' : 'text-[#929caa] group-hover:text-white'
                        }`}
                      >
                        {t.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#5c6673] tracking-[0.14em] mt-1 uppercase">
                        {t.audience}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {missions.map((m, i) => (
                  <article
                    key={m.id}
                    className="tech-corners glass-panel rounded-sm p-6 sm:p-7 flex flex-col group hover:-translate-y-1.5 transition-transform duration-500"
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-[10px] text-[#7547e8] tracking-[0.2em]">
                        M.SN // 0{i + 1}
                      </span>
                      <div className="flex gap-1.5">
                        {m.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 font-mono text-[9px] tracking-wider text-[#929caa] bg-white/[0.04] border hairline rounded-sm uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#f2f5f7] group-hover:text-[#7547e8] transition-colors duration-500 leading-tight">
                      {m.title}
                    </h3>
                    <p className="font-mono text-[11px] text-[#7547e8] tracking-wide mt-2 flex items-center gap-2">
                      <Terminal className="w-3 h-3 shrink-0" />
                      {m.tagline}
                    </p>
                    <p className="text-sm text-[#929caa] leading-relaxed mt-4 flex-1 line-clamp-2">
                      {m.description}
                    </p>

                    {(m.deliverables || m.sampleIdeas) && (
                      <div className="mt-6 pt-4 border-t hairline space-y-2">
                        {(m.deliverables || m.sampleIdeas).slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-[#c7cfd9]">
                            <CircleDot className="w-3 h-3 text-[#7547e8] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 pt-4 border-t hairline flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#5c6673] uppercase">
                        Brief // 2027
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#7547e8] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-start">
            <Reveal delay={0.2}>
              <div className="w-full mb-5">
                <div className="font-mono text-[10px] text-[#7547e8] tracking-[0.2em] uppercase mb-3">
                  Engineering Sculpture // Model 02
                </div>
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#f2f5f7]">
                  Interlocked Geometric Artifact
                </h3>
              </div>
              <DomainArtifact />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}