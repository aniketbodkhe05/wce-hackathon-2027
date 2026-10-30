import { eventData } from '../data/event';
import { Reveal } from './Reveal';
import { Heart, Mail, MapPin } from 'lucide-react';

const MAP_QUERY = 'Walchand College of Engineering, Sangli, Maharashtra, India';
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
const ACM_WEBSITE = 'https://wce.acm.org';

const navigationColumns = [
  [
    { label: 'Home', href: '#hero' },
    { label: 'Glimpses', href: '#highlights' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Organizers', href: '#about' },
  ],
  [
    { label: 'About', href: '#about' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'Tracks', href: '#domains' },
  ],
];

const socialIcons = {
  youtube: (
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
  instagram: (
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
  ),
  twitter: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  ),
  linkedin: (
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  ),
};

const socialLinks = [
  { key: 'youtube', label: 'WCE ACM on YouTube', href: eventData.socials.youtube },
  { key: 'instagram', label: 'WCE ACM on Instagram', href: eventData.socials.instagram },
  { key: 'twitter', label: 'WCE ACM on X', href: eventData.socials.twitter },
  { key: 'linkedin', label: 'WCE ACM on LinkedIn', href: eventData.socials.linkedin },
  { key: 'email', label: 'Email WCE ACM', href: `mailto:${eventData.contactEmail}` },
];

export function Footer() {
  return (
    <footer
      id="footer"
      aria-label="Footer"
      className="relative overflow-hidden border-t border-white/10 bg-black"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-44 left-1/2 h-[420px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,191,255,0.09),transparent_65%)]"
      />

      <div className="container-custom relative z-10 pb-10 pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          <Reveal className="w-full">
            <div>
              <div className="overflow-hidden rounded-lg border border-white/10 bg-[#080b10]">
                <iframe
                  src={MAP_EMBED_URL}
                  title="Map showing Walchand College of Engineering, Sangli"
                  className="h-48 w-full opacity-90 transition-opacity duration-500 hover:opacity-100 sm:h-52"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-start gap-2 text-sm text-[#d1d5db] transition-colors duration-300 hover:text-[#00BFFF]"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00BFFF]" strokeWidth={1.7} />
                <span>Walchand College of Engineering, Sangli</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="w-full">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <img
                src="/logos/acm-logo.png"
                alt="WCE ACM Student Chapter"
                className="h-24 w-auto max-w-full object-contain"
                loading="lazy"
              />
              <h3 className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
                WCE ACM Student Chapter
              </h3>
              <a
                href={ACM_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 font-mono text-xs tracking-[0.12em] text-[#9ca3af] transition-colors duration-300 hover:text-[#00BFFF]"
              >
                wce.acm.org
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="w-full md:col-span-2 lg:col-span-1">
            <div className="w-full md:mx-auto md:max-w-md lg:mx-0 lg:max-w-none">
              <h3 className="bg-gradient-to-r from-[#00BFFF] via-[#27dccb] to-[#b9f36b] bg-clip-text text-center font-display text-2xl font-bold uppercase tracking-tight text-transparent lg:text-left">
                WCE Hackathon 2026
              </h3>

              <nav
                aria-label="Footer navigation"
                className="mx-auto mt-6 grid w-fit grid-cols-2 gap-x-10 gap-y-3 text-left sm:gap-x-14 lg:mx-0 lg:w-full"
              >
                {navigationColumns.map((column, columnIndex) => (
                  <ul key={columnIndex} className="space-y-3">
                    {column.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="group inline-flex items-center gap-2 text-sm text-[#9ca3af] transition-colors duration-300 hover:text-[#00BFFF]"
                        >
                          <span className="h-px w-0 bg-[#00BFFF] transition-all duration-300 group-hover:w-3" />
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </nav>

              <div className="mt-8">
                <h4 className="text-center font-mono text-[10px] uppercase tracking-[0.35em] text-[#9ca3af] lg:text-left">
                  Follow Us
                </h4>
                <div className="mt-4 flex items-center justify-center gap-2.5 lg:justify-start">
                  {socialLinks.map((social) => (
                    <a
                      key={social.key}
                      href={social.href}
                      target={social.key === 'email' ? undefined : '_blank'}
                      rel={social.key === 'email' ? undefined : 'noopener noreferrer'}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#9ca3af] transition-all duration-300 hover:-translate-y-1 hover:border-[#00BFFF]/50 hover:bg-[#00BFFF]/5 hover:text-[#00BFFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFFF]"
                    >
                      {social.key === 'email' ? (
                        <Mail className="h-4 w-4" strokeWidth={1.8} />
                      ) : (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          {socialIcons[social.key]}
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-[#9ca3af] sm:text-[13px]">
            <span>Designed and Developed with</span>
            <Heart
              className="h-3.5 w-3.5 fill-[#ef4444] text-[#ef4444]"
              aria-hidden="true"
            />
            <span className="sr-only">love</span>
            <span>by</span>
            <span className="font-medium text-[#00BFFF]">WCE ACM Web Developers</span>
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">
            © WCE ACM HACKATHON 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
