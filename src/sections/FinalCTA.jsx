import { ArrowUpRight, Sparkles } from 'lucide-react';
import { eventData } from '../data/event';
import { Reveal } from '../components/Reveal';

export function FinalCTA() {
  const unstopUrl = eventData.unstopUrl;

  return (
    <section
      id="register"
      aria-label="Register"
      className="relative py-28 sm:py-36 lg:py-40 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(117,71,232,0.14),transparent_55%),radial-gradient(ellipse_at_20%_10%,rgba(39,220,203,0.05),transparent_50%)]"
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center">
            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[1.02] text-4xl sm:text-5xl lg:text-6xl">
              Ready to
              <br />
              <span className="text-gradient-violet">build?</span>
            </h2>
            <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-[#a3adba]">
              Have an idea? Bring your team and turn it into reality at WCE
              Hackathon 2027.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="relative mt-12 tech-corners glass-panel rounded-sm px-6 py-10 sm:px-12 sm:py-14 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#7547e8]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#7547e8]/5 via-transparent to-[#27dccb]/3 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center gap-8">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-sm border border-[#b9f36b]/25 bg-[#b9f36b]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#b9f36b]">
                    <span className="status-dot pulse-dot" />
                    Pre-registration open
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-sm border hairline bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#a3adba]">
                    <Sparkles className="h-3 w-3 text-[#7547e8]" strokeWidth={2} />
                    Round 1 entry — 100% free
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-white">
                  WCE Hackathon 2027
                </h3>

                {unstopUrl ? (
                  <a
                    href={unstopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Register on Unstop (opens in a new tab)"
                    className="btn-primary btn-lg group min-h-[48px] px-8 sm:px-10 text-base"
                  >
                    REGISTER ON UNSTOP
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span
                    className="btn-primary btn-lg min-h-[48px] px-8 sm:px-10 text-base opacity-70 cursor-not-allowed select-none"
                    aria-disabled="true"
                  >
                    REGISTER ON UNSTOP
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">{eventData.registrationStatus}</span>
                  </span>
                )}

                <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#7b8494] leading-relaxed max-w-md">
                  Official registration and further participation details are
                  available on Unstop.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
