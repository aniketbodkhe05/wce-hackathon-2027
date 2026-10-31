import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TOTAL_STEPS = 4;
const TIMEOUT_MS = 3500;

export function Preloader({ onComplete }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Simulate asset loading steps
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + 1, TOTAL_STEPS);
      setStep(current);
      if (current >= TOTAL_STEPS) {
        clearInterval(interval);
        if (!reduced) {
          // Brief pause to let the final step register
          timerRef.current = setTimeout(() => {
            setDone(true);
            if (onComplete) onComplete();
          }, 400);
        } else {
          setDone(true);
          if (onComplete) onComplete();
        }
      }
    }, reduced ? 100 : 300);

    // Safety timeout — never stay stuck
    timerRef.current = setTimeout(() => {
      setDone(true);
      if (onComplete) onComplete();
    }, TIMEOUT_MS);

    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onComplete]);

  if (done) return null;

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#05060b] text-[#f2f5f7] flex flex-col items-center justify-center"
      aria-label="Loading WCE Hackathon 2027"
    >
      {/* Geometric mark — SVG inspired by crystalline core */}
      <div className="relative w-32 h-32 mb-8">
        <svg
          className="w-full h-full"
          viewBox="-60 -60 120 120"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="preloader-violet" x1="-50" y1="-50" x2="50" y2="50">
              <stop offset="0%" stopColor="#7547e8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#315bff" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Outer structural lines */}
          <motion.path
            d="M -40,-40 L 40,-40 L 40,40 L -40,40 Z"
            stroke="rgba(117,71,232,0.15)"
            strokeWidth="1"
            className="motion-path"
          />
          <motion.path
            d="M -30,-30 L 30,-30 L 30,30 L -30,30 Z"
            stroke="rgba(117,71,232,0.25)"
            strokeWidth="1"
            className="motion-path"
          />

          {/* Rotating inner diamond */}
          <motion.path
            d="M 0,-32 L 32,0 L 0,32 L -32,0 Z"
            stroke="url(#preloader-violet)"
            strokeWidth="2"
            className="motion-path"
          />

          {/* Central node */}
          <motion.circle
            cx="0"
            cy="0"
            r="4"
            fill="#7547e8"
            className="motion-path"
          />

          {/* Fine accent lines */}
          <path
            d="M -52,-52 L -38,-38"
            stroke="#b9f36b"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <path
            d="M 52,52 L 38,38"
            stroke="#b9f36b"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* Branding */}
      <div className="text-center mb-6">
        <div className="font-mono text-[11px] text-[#7547e8] tracking-[0.24em] uppercase mb-1">
          WCE HACKATHON 2027
        </div>
        <div className="font-display font-semibold text-xs tracking-[0.18em] text-white uppercase">
          Loading event information
        </div>
      </div>

      {/* Loading indicator */}
      <div className="w-48 h-1 bg-white/[0.08] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#7547e8] to-[#315bff] rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {step > 0 && (
        <div className="mt-4 font-mono text-[11px] text-[#7b8494] tracking-[0.2em] uppercase">
          {progress}% loaded
        </div>
      )}
    </div>
  );
}