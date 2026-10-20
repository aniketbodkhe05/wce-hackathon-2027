import { motion } from 'framer-motion';
import { eventData } from '../data/event';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import { EASE_OUT_EXPO } from '../lib/easing';

const lineVariants = {
  hidden: { y: '112%' },
  visible: (i) => ({
    y: '0%',
    transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.3 + i * 0.12 },
  }),
};

function MaskedLine({ children, index }) {
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className="block will-change-transform"
        custom={index}
        variants={lineVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="WCE Hackathon 2027"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(100deg,rgba(5,6,11,0.92)_0%,rgba(5,6,11,0.55)_38%,transparent_64%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(5,6,11,0.8)_0%,transparent_38%,transparent_62%,rgba(5,6,11,0.85)_100%)] lg:hidden"
      />

      <div className="container-custom relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center pt-32 lg:pt-24 pb-16">
        <div className="lg:col-span-7 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.12 }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gradient-to-r from-[#7547e8] to-[#315bff]" />
            <span className="hud-tag">
              {eventData.chapter} // {eventData.edition}
            </span>
          </motion.div>

          <h1 className="hero-title">
            <MaskedLine index={0}>BUILD WHAT</MaskedLine>
            <MaskedLine index={1}>
              <span className="text-gradient-violet">MATTERS.</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.8 }}
            className="mt-7 max-w-md lead"
          >
            One arena. Limitless possibilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.95 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#about" className="btn btn-primary">
              EXPLORE EVENT
              <ArrowDown className="w-4 h-4" />
            </a>
            <a href="#register" className="btn btn-secondary">
              REGISTER NOW
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.15 }}
            className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[11px] tracking-[0.18em] uppercase text-[#5c6673]"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#7547e8]" />
              {eventData.institutionShort}
            </span>
            <span className="hidden sm:inline text-[#1a1f2e]">/</span>
            <span>24 hours</span>
            <span className="hidden sm:inline text-[#1a1f2e]">/</span>
            <span>Dual tracks</span>
            <span className="hidden md:inline text-[#1a1f2e]">/</span>
            <span className="hidden md:inline text-[#b9f36b]">Round 1 free</span>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block pointer-events-none" aria-hidden="true">
          <div className="relative h-[560px] xl:h-[620px]">
            <div className="absolute top-2 right-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8b93a7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7547e8] pulse-dot" />
              FIG. 01 / INTERLOCKED CORE
            </div>
            <div className="absolute bottom-4 left-2 border-l border-[#27dccb]/50 pl-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8b93a7]">
                Interlocking beams // compound sculpture
              </div>
            </div>
          </div>
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.35 }}
        className="container-custom relative z-10 pb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t hairline pt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-[#5c6673]">
          <span>{eventData.tagline}</span>
          <span className="flex items-center gap-2">
            <span className="status-dot pulse-dot" />
            {eventData.registrationStatus}
          </span>
        </div>
      </motion.div>
    </section>
  );
}