import {
  Award,
  Calendar,
  Landmark,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';

const accents = {
  violet: {
    text: 'text-[#7547e8]',
    icon: 'border-[#7547e8]/30 bg-[#7547e8]/10 text-[#7547e8]',
    glow: 'from-[#7547e8]/10',
    hover: 'hover:border-[#7547e8]/45',
    line: 'via-[#7547e8]/40',
  },
  turquoise: {
    text: 'text-[#27dccb]',
    icon: 'border-[#27dccb]/30 bg-[#27dccb]/10 text-[#27dccb]',
    glow: 'from-[#27dccb]/10',
    hover: 'hover:border-[#27dccb]/45',
    line: 'via-[#27dccb]/40',
  },
};

const blocks = [
  {
    code: '01',
    kicker: 'The Institution',
    title: 'Walchand College of Engineering',
    subtitle: 'Sangli, Maharashtra',
    description:
      "A government-aided institute in Sangli, shaping engineering education through strong academics and a 90+ acre campus.",
    icon: Landmark,
    logo: '/logos/wce-logo.svg',
    logoAlt: 'Walchand College of Engineering Sangli',
    accent: accents.violet,
  },
  {
    code: '02',
    kicker: 'The Chapter',
    title: 'WCE ACM Student Chapter',
    subtitle: 'Authorized March 18, 2016',
    description:
      "The chapter promotes computer science innovation through technical and non-technical activities for students.",
    icon: Users,
    logo: '/logos/acm-logo.png',
    logoAlt: 'WCE ACM Student Chapter',
    accent: accents.turquoise,
  },
];

const stats = [
  { value: '1947', label: 'Established', icon: Calendar },
  { value: '90+', unit: 'Acres', label: 'Campus', icon: MapPin },
  { value: '2016', label: 'WCE ACM Authorized', icon: ShieldCheck },
  { value: '10', unit: 'Years', label: 'of WCE ACM', icon: Award },
];

function InfoCard({ block, delay }) {
  const Icon = block.icon;
  const { accent } = block;

  return (
    <Reveal delay={delay} y={30} className="h-full">
      <article
        className={`group relative h-full overflow-hidden rounded-sm glass-panel tech-corners p-7 sm:p-9 transition-colors duration-500 ${accent.hover}`}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br ${accent.glow} via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border ${accent.icon} transition-transform duration-500 group-hover:-translate-y-1`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </div>

            <img
              src={block.logo}
              alt={block.logoAlt}
              className="h-9 w-9 object-contain opacity-75 transition-opacity duration-500 group-hover:opacity-100"
              loading="lazy"
            />
          </div>

          <span className={`font-mono text-[11px] uppercase tracking-[0.22em] ${accent.text}`}>
            {block.kicker}
          </span>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-[#f2f5f7] sm:text-[1.65rem]">
            {block.title}
          </h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7b8494]">
            {block.subtitle}
          </p>

          <p className="mt-5 text-sm leading-relaxed text-[#a3adba] sm:text-[15px]">
            {block.description}
          </p>
        </div>

        <div
          aria-hidden="true"
          className={`absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent ${accent.line} to-transparent transition-transform duration-500 group-hover:scale-x-100`}
        />
      </article>
    </Reveal>
  );
}

function StatCard({ stat, delay }) {
  const Icon = stat.icon;

  return (
    <Reveal delay={delay} y={24} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-sm border hairline bg-white/[0.02] p-5 transition-colors duration-500 hover:border-[#7547e8]/40 sm:p-6">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#7547e8]/10 via-transparent to-[#27dccb]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#7547e8]/25 bg-[#7547e8]/10 text-[#7547e8] transition-colors duration-500 group-hover:border-[#7547e8]/50 group-hover:bg-[#7547e8]/15">
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </div>

          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-semibold tracking-tight text-white transition-colors duration-500 group-hover:text-[#7547e8] sm:text-4xl">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7547e8]">
                  {stat.unit}
                </span>
              )}
            </div>
            <div className="mt-1.5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[#7b8494]">
              {stat.label}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-label="About WCE Hackathon 2027"
      className="relative section-pad overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(117,71,232,0.07),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(39,220,203,0.05),transparent_60%)]"
      />

      <div className="container-custom relative z-10">
        <div className="mb-14 text-center sm:mb-16">
          <Reveal>
            <h2 className="section-title uppercase text-[#f2f5f7]">ABOUT</h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#a3adba] sm:text-lg">
              WCE Sangli, WCE ACM, and VISION 2027.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {blocks.map((block, i) => (
            <InfoCard key={block.code} block={block} delay={0.1 + i * 0.08} />
          ))}
        </div>

        <Reveal delay={0.14} y={32}>
          <article className="relative mt-5 overflow-hidden rounded-sm border border-[#7547e8]/30 bg-[linear-gradient(125deg,rgba(117,71,232,0.16),rgba(49,91,255,0.07)_42%,rgba(9,11,17,0.92)_78%)]">
            <div
              aria-hidden="true"
              className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-[#7547e8]/20 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-[#27dccb]/10 blur-[90px]"
            />

            <div className="relative z-10 p-7 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="mb-7 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-sm border border-[#b9f36b]/25 bg-[#b9f36b]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#b9f36b]">
                      <span className="status-dot pulse-dot" />
                      VISION 2027 Highlight
                    </span>
                    <img
                      src="/logos/hackathon-2027-logo.png"
                      alt="WCE Hackathon 2027"
                      className="h-6 w-auto object-contain opacity-80"
                      loading="lazy"
                    />
                  </div>

                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#7547e8]/35 bg-[#7547e8]/10 text-[#7547e8]">
                      <Rocket className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7547e8]">
                      The Arena
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-semibold leading-tight text-[#f2f5f7] sm:text-4xl lg:text-5xl">
                    WCE Hackathon{' '}
                    <span className="text-gradient-violet">2027</span>
                  </h3>

                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#c7cfd9] sm:text-base lg:text-lg">
                    The highlight of VISION 2027 brings students together to build solutions around
                    real-world problems.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {['Novice Track', 'Expert Track', 'WCE Sangli'].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#a3adba]"
                      >
                        <Sparkles className="h-3 w-3 text-[#7547e8]" strokeWidth={1.5} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <div
                    aria-hidden="true"
                    className="relative mx-auto flex h-52 w-52 items-center justify-center sm:h-56 sm:w-56"
                  >
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#7547e8]/30 spin-slow">
                      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#27dccb] shadow-[0_0_12px_rgba(39,220,203,0.8)]" />
                    </div>
                    <div className="absolute inset-5 rounded-full border border-[#27dccb]/15" />
                    <div className="absolute inset-10 rounded-full bg-[#7547e8]/5 blur-xl" />

                    <div className="relative flex flex-col items-center text-center">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#a3adba]">
                        Build sprint
                      </span>
                      <span className="font-display text-6xl font-semibold leading-none text-gradient-violet sm:text-7xl">
                        24
                      </span>
                      <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7547e8]">
                        Hours on campus
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-12 sm:mt-14">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7547e8]">
                By the Numbers
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#7547e8]/30 to-transparent" />
            </div>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={0.08 + i * 0.07} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
