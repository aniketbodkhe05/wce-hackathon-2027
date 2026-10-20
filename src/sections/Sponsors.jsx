import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="relative section-pad overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(39,220,203,0.04),transparent_55%)]"
      />
      <div className="container-custom relative z-10">
        <SectionHeading
          index="SEC // 06"
          kicker="Ecosystem"
          title="Partner with the"
          accent="arena."
          description="Sponsorship tiers for 2027 are open."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {eventData.sponsorshipTiers.map((tier, i) => (
            <Reveal key={tier.tier} delay={i * 0.08} y={24}>
              <article className="glass-panel tech-corners rounded-sm p-7 h-full flex flex-col group hover:-translate-y-1 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#7547e8] px-2.5 py-1 bg-[rgba(117,71,232,0.07)] border border-[rgba(117,71,232,0.2)] rounded-sm uppercase">
                    {tier.badge}
                  </span>
                  <span className="status-dot pulse-dot" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-[#f2f5f7] leading-tight">
                  {tier.tier}
                </h3>
                <p className="font-mono text-[11px] text-[#7547e8] tracking-[0.16em] mt-2 uppercase">
                  {tier.status}
                </p>
                <ul className="mt-6 pt-5 border-t hairline space-y-3 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm text-[#c7cfd9]">
                      <span className="text-[#7547e8] mt-px">›</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${eventData.contactEmail}?subject=${encodeURIComponent(
                    'WCE Hackathon 2027 — ' + tier.tier
                  )}`}
                  className="mt-7 pt-5 border-t hairline font-mono text-[11px] tracking-[0.18em] uppercase text-[#929caa] hover:text-[#7547e8] transition-colors flex items-center gap-2"
                >
                  Request prospectus
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass-panel rounded-sm p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-6 border-b hairline">
              <div>
                <span className="font-mono text-[10px] text-[#7547e8] tracking-[0.22em] uppercase block mb-2">
                  // Collaborative Legacy
                </span>
                <h4 className="font-display font-semibold text-2xl sm:text-3xl text-[#f2f5f7]">
                  Past Ecosystem Partners
                </h4>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#5c6673] uppercase shrink-0">
                Verified Collaborators
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eventData.pastPartners.map((partner) => (
                <div key={partner.name} className="panel-line rounded-sm p-6 flex items-center gap-6 group">
                  {partner.logo ? (
                    <div className="w-28 h-14 shrink-0 flex items-center justify-center bg-white/[0.03] border hairline rounded-sm p-3">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-14 shrink-0 flex items-center justify-center bg-white/[0.03] border hairline rounded-sm px-3">
                      <span className="font-display font-semibold text-sm text-white text-center leading-tight">
                        {partner.name}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-lg text-[#f2f5f7]">
                        {partner.name}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#27dccb]" />
                    </div>
                    <div className="font-mono text-[11px] text-[#7547e8] tracking-wide mt-0.5">
                      {partner.role}
                    </div>
                    <div className="text-xs text-[#5c6673] mt-1.5 leading-relaxed">
                      {partner.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}