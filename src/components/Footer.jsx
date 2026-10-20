import { eventData } from '../data/event';
import { Reveal } from './Reveal';
import { ArrowUp, ExternalLink, MapPin, Mail, Phone, Globe } from 'lucide-react';

const socialIcons = {
  youtube: (
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
  instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  ),
  twitter: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  ),
  linkedin: (
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  ),
};

const footerLinks = {
  navigate: [
    { label: 'Overview', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Domains', href: '#domains' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'Journey', href: '#journey' },
    { label: 'FAQ', href: '#faq' },
  ],
  resources: [
    { label: 'Official Website', href: eventData.officialWebsite, external: true },
    { label: 'Registration Portal', href: '#register' },
    { label: 'Problem Statements', href: '#domains' },
    { label: 'Past Editions', href: '#sponsors' },
    { label: 'Contact', href: `mailto:${eventData.contactEmail}` },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Code of Conduct', href: '#' },
  ],
};

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t hairline overflow-hidden">
      {/* Atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(117,71,232,0.08),transparent_65%)]"
      />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7547e8]/30 to-transparent" />

      <div className="container-custom relative z-10 pt-16 pb-10">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
            {/* Brand column - wider */}
            <div className="lg:col-span-2 relative">
              <div className="flex items-center gap-4 mb-6 group">
                <img src="/logos/wce-logo.svg" alt="WCE Sangli" className="h-10 object-contain group-hover:scale-105 transition-transform" />
                <div className="w-px h-10 bg-white/10" />
                <img
                  src="/logos/acm-logo.png"
                  alt="WCE ACM Student Chapter"
                  className="h-10 object-contain group-hover:scale-105 transition-transform"
                />
                <div className="w-px h-10 bg-white/10" />
                <img
                  src="/logos/hackathon-logo.png"
                  alt="WCE Hackathon"
                  className="h-10 object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight leading-none mb-4">
                {eventData.name}
              </div>
              <div className="font-mono text-[11px] text-[#7547e8] tracking-[0.24em] mb-6 uppercase">
                {eventData.tagline}
              </div>
              <p className="text-[#929caa] text-sm leading-relaxed max-w-xs mb-8">
                24-hour national-level hackathon under VISION symposium at Walchand College of Engineering, Sangli.
              </p>
              <div className="flex items-center gap-3">
                {Object.entries(eventData.socials).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WCE ACM ${key}`}
                    className="relative p-2.5 rounded-sm bg-white/[0.03] border hairline hover:border-[#7547e8]/60 hover:text-[#7547e8] hover:bg-[#7547e8]/5 transition-all duration-300 text-[#929caa] group"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      {socialIcons[key]}
                    </svg>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-mono bg-[#0a0a15] border hairline rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigate */}
            <div>
              <h4 className="font-mono text-[11px] font-semibold text-white tracking-[0.22em] uppercase mb-5">
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.navigate.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="relative font-mono text-xs text-[#5c6673] hover:text-[#7547e8] transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-[#7547e8]/40 group-hover:text-[#7547e8] transition-colors">›</span>
                      {item.label}
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7547e8]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-mono text-[11px] font-semibold text-white tracking-[0.22em] uppercase mb-5">
                Resources
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="relative font-mono text-xs text-[#5c6673] hover:text-[#7547e8] transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-[#7547e8]/40 group-hover:text-[#7547e8] transition-colors">›</span>
                      {item.label}
                      {item.external && <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7547e8]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-[11px] font-semibold text-white tracking-[0.22em] uppercase mb-5">
                Contact
              </h4>
              <div className="space-y-4">
                <a
                  href={`mailto:${eventData.contactEmail}`}
                  className="flex items-center gap-3 p-4 panel-line rounded-sm group hover:border-[#7547e8]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#7547e8]/10 border border-[#7547e8]/20 flex items-center justify-center shrink-0 group-hover:border-[#7547e8]/50 transition-colors">
                    <Mail className="w-5 h-5 text-[#7547e8]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#5c6673] uppercase tracking-[0.14em]">Email Us</div>
                    <div className="text-sm text-[#f2f5f7] truncate max-w-[200px]">{eventData.contactEmail}</div>
                  </div>
                </a>
                <a
                  href="tel:+918459039945"
                  className="flex items-center gap-3 p-4 panel-line rounded-sm group hover:border-[#7547e8]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#315bff]/10 border border-[#315bff]/20 flex items-center justify-center shrink-0 group-hover:border-[#315bff]/50 transition-colors">
                    <Phone className="w-5 h-5 text-[#315bff]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#5c6673] uppercase tracking-[0.14em]">Call Us</div>
                    <div className="text-sm text-[#f2f5f7]">+91 84590 39945</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-4 panel-line rounded-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#27dccb]/10 border border-[#27dccb]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#27dccb]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#5c6673] uppercase tracking-[0.14em]">Visit Us</div>
                    <div className="text-sm text-[#f2f5f7] max-w-[200px]">{eventData.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Divider with pattern */}
        <div className="relative mb-8">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="relative flex justify-center">
            <div className="bg-[#05060b] px-6">
              <div className="flex items-center gap-4 text-[#5c6673] font-mono text-[10px] tracking-[0.18em] uppercase">
                <span>© 2027 WCE ACM Student Chapter</span>
                <span className="w-px h-4 bg-white/10" />
                <span>Engineered with precision</span>
                <span className="w-px h-4 bg-white/10" />
                <span>VISION 2027 Symposium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[#5c6673]">
          <div className="flex items-center gap-4">
            <button
              onClick={scrollTop}
              className="flex items-center gap-2 text-[#929caa] hover:text-[#7547e8] transition-colors group"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <span className="w-px h-4 bg-white/10 hidden sm:block" />
            <a href={eventData.officialWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#7547e8] transition-colors group">
              <Globe className="w-3.5 h-3.5" />
              wcehackathon.in
              <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline">Made with</span>
            <span className="text-[#e84d4d]">♥</span>
            <span className="hidden lg:inline">by WCE ACM SC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}