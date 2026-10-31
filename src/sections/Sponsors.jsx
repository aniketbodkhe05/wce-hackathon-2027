import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';
import { ArrowUpRight, ShieldCheck, Building2 } from 'lucide-react';

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="relative section-pad overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(39,220,203,0.04),transparent_55%)]"
      />
      <div className="container-custom relative z-10">
        <SectionHeading
          title="SPONSORS"
          description="Sponsorship opportunities for 2027 are open."
        />

        {/* Sponsorship tiers - unique card design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {eventData.sponsorshipTiers.map((tier, i) => (
            <Reveal key={tier.tier} delay={i * 0.08} y={24}>
              <article className="relative glass-panel tech-corners rounded-sm p-7 h-full flex flex-col group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7547e8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[#7547e8] px-2.5 py-1 bg-[rgba(117,71,232,0.07)] border border-[rgba(117,71,232,0.2)] rounded-sm uppercase">
                      {tier.badge}
                    </span>
                    <span className="status-dot pulse-dot" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-[#f2f5f7] leading-tight mb-2">
                    {tier.tier}
                  </h3>
                  <p className="font-mono text-[11px] text-[#7547e8] tracking-[0.16em] mt-2 uppercase mb-6">
                    {tier.status}
                  </p>
                  <ul className="space-y-3 flex-1">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-[#c7cfd9]">
                        <span className="w-5 h-5 shrink-0 flex items-center justify-center rounded bg-[#7547e8]/10 text-[#7547e8]">
                          <Building2 className="w-3 h-3" strokeWidth={2} />
                        </span>
                        <span className="leading-relaxed">{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:${eventData.contactEmail}?subject=${encodeURIComponent(
                      'WCE Hackathon 2027 — ' + tier.tier
                    )}`}
                    className="mt-7 pt-5 border-t hairline font-mono text-[11px] tracking-[0.18em] uppercase text-[#a3adba] hover:text-[#7547e8] transition-colors flex items-center gap-2 group"
                  >
                    Request prospectus
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7547e8]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            </Reveal>
          ))}
        </div>

        {/* Past Partners - unique layout */}
        <Reveal>
          <div className="glass-panel rounded-sm p-8 sm:p-10">
            <div className="mb-8 border-b hairline pb-6">
              <h4 className="font-display text-2xl font-semibold text-[#f2f5f7] sm:text-3xl">
                Previous Partners
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eventData.pastPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="relative panel-line rounded-sm p-6 flex items-center gap-6 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7547e8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex items-center gap-6 w-full">
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-semibold text-lg text-[#f2f5f7] truncate">
                          {partner.name}
                        </span>
                        <ShieldCheck className="w-4 h-4 text-[#27dccb] shrink-0" />
                      </div>
                      <div className="font-mono text-xs tracking-wide text-[#7547e8]">
                        {partner.role}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7547e8]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}