import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { eventData } from '../data/event';
import { SectionHeading } from '../components/SectionTag';
import { Reveal } from '../components/Reveal';
import { EASE_OUT_EXPO } from '../lib/easing';
import { ChevronDown, Mail, HelpCircle } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'tracks', label: 'Tracks' },
  { id: 'rules', label: 'Rules' },
  { id: 'logistics', label: 'Logistics' },
];

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  const contentId = `faq-c-${index}`;
  const headerId = `faq-h-${index}`;

  return (
    <div
      className={`relative rounded-sm border transition-colors duration-500 overflow-hidden group ${
        open ? 'border-[#7547e8]/30 bg-[rgba(117,71,232,0.03)]' : 'hairline bg-white/[0.015] hover:border-white/15'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#7547e8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <h3 className="relative z-10">
        <button
          id={headerId}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={contentId}
          className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${open ? 'text-[#7547e8]' : 'text-[#5c6673]'}`} />
            <span className={`font-display font-semibold text-base sm:text-lg transition-colors duration-300 ${open ? 'text-[#7547e8]' : 'text-white'}`}>
              {item.question}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 shrink-0 text-[#5c6673] transition-transform duration-500 ${open ? 'rotate-180 text-[#7547e8]' : ''}`}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            <div className="relative z-10 px-5 sm:px-6 pb-6 text-sm sm:text-base text-[#929caa] leading-relaxed border-t hairline pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7547e8]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}

export function FAQ() {
  const [category, setCategory] = useState('all');
  const filtered = useMemo(
    () => (category === 'all' ? eventData.faqs : eventData.faqs.filter((f) => f.category === category)),
    [category]
  );

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="relative py-28 sm:py-40 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(49,91,255,0.04),transparent_55%)]"
      />
      <div className="container-custom relative z-10">
        <SectionHeading
          index="SEC // 08"
          kicker="Knowledge Base"
          title="Questions,"
          accent="answered."
          description="Eligibility, rules, logistics."
        />

        <Reveal delay={0.08}>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                aria-pressed={category === cat.id}
                className={`relative px-4 py-2 rounded-sm font-mono text-[11px] tracking-[0.16em] uppercase border transition-all duration-300 overflow-hidden ${
                  category === cat.id
                    ? 'bg-[#7547e8] text-[#05060b] border-[#7547e8] font-bold'
                    : 'hairline text-[#929caa] hover:text-white hover:border-white/20'
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#7547e8]/10 via-transparent to-transparent" />
              </button>
            ))}
          </div>
        </Reveal>

        <div className="max-w-4xl space-y-3">
          {filtered.map((item, i) => (
            <Reveal key={item.question} delay={Math.min(i * 0.05, 0.3)} y={18}>
              <FaqItem item={item} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 max-w-4xl glass-panel rounded-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative font-mono text-xs text-[#929caa] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#7547e8]" />
              <span className="text-white font-bold block mb-1">Unresolved questions?</span>
              <a href={`mailto:${eventData.contactEmail}`} className="text-[#7547e8] hover:underline">
                {eventData.contactEmail}
              </a>
            </div>
            <a
              href={`mailto:${eventData.contactEmail}?subject=${encodeURIComponent('WCE Hackathon 2027 — Query')}`}
              className="btn-secondary shrink-0 !py-3"
            >
              <Mail className="w-4 h-4" />
              Contact Desk
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}