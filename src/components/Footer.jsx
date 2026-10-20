import { eventData } from '../data/event';
import { Reveal } from './Reveal';
import { ArrowUp, ExternalLink } from 'lucide-react';

const socialIcons = {
  youtube: (
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
  instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  ),
  twitter: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  ),
  linkedin: (
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  ),
};

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t hairline overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(117,71,232,0.08),transparent_65%)]"
      />

      <div className="container-custom relative z-10 pt-16 pb-10">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <img src="/logos/wce-logo.svg" alt="WCE Sangli" className="h-9 object-contain" />
                <div className="h-8 w-px bg-white/10" />
                <img
                  src="/logos/acm-logo.png"
                  alt="WCE ACM Student Chapter"
                  className="h-9 object-contain"
                />
                <div className="h-8 w-px bg-white/10" />
                <img
                  src="/logos/hackathon-logo.png"
                  alt="WCE Hackathon"
                  className="h-9 object-contain"
                />
              </div>
              <div className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight leading-none">
                {eventData.name}
              </div>
              <div className="font-mono text-[11px] text-[#7547e8] tracking-[0.24em] mt-2 uppercase">
                {eventData.tagline}
              </div>

              <div className="flex items-center gap-3 mt-8">
                {Object.entries(eventData.socials).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WCE ACM ${key}`}
                    className="p-2.5 rounded-sm bg-white/[0.03] border hairline hover:border-[#7547e8]/60 hover:text-[#7547e8] transition-all duration-300 text-[#929caa]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      {socialIcons[key]}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <h4 className="font-mono text-[11px] font-semibold text-white tracking-[0.22em] uppercase mb-5">
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {eventData.navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="font-mono text-xs text-[#5c6673] hover:text-[#7547e8] transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#7547e8]/40">›</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="font-mono text-[11px] font-semibold text-white tracking-[0.22em] uppercase mb-5">
                Coordinates
              </h4>
              <div className="panel-line rounded-sm p-5 space-y-4 font-mono text-[11px] leading-relaxed">
                <div>
                  <span className="text-white font-semibold tracking-wider block">
                    {eventData.institution.toUpperCase()}
                  </span>
                  <span className="text-[#5c6673]">
                    A/P Vishrambag, Sangli, Maharashtra 416415
                  </span>
                </div>
                <div className="flex justify-between text-[#5c6673]">
                  <span>CHAPTER</span>
                  <span className="text-[#7547e8]">ACM SC — ACTIVE 2016</span>
                </div>
                <div className="flex justify-between text-[#5c6673]">
                  <span>SYMPOSIUM</span>
                  <span className="text-white">VISION 2027</span>
                </div>
              </div>
              <a
                href={eventData.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-between px-5 py-3.5 rounded-sm bg-[rgba(117,71,232,0.08)] border border-[#7547e8]/25 text-[#7547e8] font-mono text-[11px] tracking-[0.18em] uppercase hover:bg-[rgba(117,71,232,0.14)] transition-colors"
              >
                wcehackathon.in
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="pt-8 border-t hairline flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[#5c6673]">
          <span>© 2027 WCE ACM Student Chapter</span>
          <span className="hidden md:inline">Engineered with precision</span>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 text-[#929caa] hover:text-[#7547e8] transition-colors"
            aria-label="Back to top"
          >
            Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}