import { Reveal } from './Reveal';

export function SectionTag({ label }) {
  if (!label) return null;

  return (
    <Reveal>
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-12 bg-gradient-to-r from-[#7547e8] to-transparent" />
        <span className="tick-label">{label}</span>
      </div>
    </Reveal>
  );
}

export function SectionHeading({ kicker, title, accent, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'text-center mx-auto max-w-3xl mb-16' : 'max-w-3xl mb-16'}>
      {kicker && <SectionTag label={kicker} />}
      <Reveal delay={0.08}>
        <h2 className="section-title text-[#f2f5f7]">
          {title} {accent && <span className="text-violet">{accent}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 text-[#a3adba] text-base sm:text-lg leading-relaxed ${
              centered ? 'mx-auto max-w-xl' : 'max-w-2xl'
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
