import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { eventData } from '../data/event';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { EASE_OUT_EXPO } from '../lib/easing';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = eventData.navItems.map((i) => i.id);
      const pos = window.scrollY + 260;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= pos) {
          setActive(ids[i]);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#05060b]/85 backdrop-blur-xl border-b hairline py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            aria-label="WCE Hackathon 2027 — home"
          >
            <img
              src="/logos/hackathon-logo.png"
              alt="WCE Hackathon"
              className="w-8 h-8 object-contain"
            />
            <div className="hidden sm:block">
              <div className="font-display font-semibold text-xs tracking-[0.18em] text-white uppercase leading-none group-hover:text-[#7547e8] transition-colors">
                WCE Hackathon
              </div>
              <div className="font-mono text-[10px] text-[#7547e8] tracking-[0.2em] mt-1">
                2027 // VISION
              </div>
            </div>
          </a>

          <nav
            className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full bg-white/[0.03] border hairline backdrop-blur-md"
            aria-label="Primary"
          >
            {eventData.navItems.slice(1, 7).map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`px-4 py-1.5 rounded-full font-mono text-[11px] tracking-[0.08em] uppercase shrink-0 transition-colors duration-300 ${
                  active === item.id
                    ? 'text-[#7547e8] bg-[rgba(117,71,232,0.1)]'
                    : 'text-[#929caa] hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#register" className="btn btn-primary hidden sm:inline-flex !py-2.5 !px-4">
              Register
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-[#929caa] hover:text-white border hairline rounded-sm transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-[#05060b]/95 backdrop-blur-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-custom flex items-center justify-between py-5 border-b hairline">
              <span className="font-display font-semibold text-sm tracking-[0.18em] uppercase">
                WCE Hackathon 2027
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-[#929caa] hover:text-white border hairline rounded-sm transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="container-custom flex-1 flex flex-col justify-center gap-1 overflow-y-auto py-8">
              {eventData.navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.05 * i }}
                  className="group flex items-center justify-between py-4 border-b hairline"
                >
                  <span className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-white group-hover:text-[#7547e8] transition-colors">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-[#5c6673]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="container-custom pb-8">
              <a href="#register" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Register now
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}