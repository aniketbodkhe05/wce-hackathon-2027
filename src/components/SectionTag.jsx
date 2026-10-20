import { Reveal } from './Reveal';

export function SectionTag({ index, label }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-[11px] text-[#7547e8] tracking-[0.2em]">{index}</span>
        <span className="h-px w-12 bg-gradient-to-r from-[#7547e8] to-transparent" />
        <span className="tick-label">{label}</span>
      </div>
    </Reveal>
  );
}

export function SectionHeading({ index, kicker, title, accent, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'text-center mx-auto max-w-3xl mb-16' : 'max-w-3xl mb-16'}>
      <SectionTag index={index} label={kicker} />
      <Reveal delay={0.08}>
        <h2 className="section-title text-[#f2f5f7]">
          {title} {accent && <span className="text-violet">{accent}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 text-[#929caa] text-base sm:text-lg leading-relaxed ${
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