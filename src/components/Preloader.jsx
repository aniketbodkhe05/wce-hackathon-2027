import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LOGO_SRC = '/logos/hackathon-2027-logo.png';
const SAFETY_MS = 9000;
const STATUS_STEPS = [
  { at: 0, label: 'INITIALIZING EXPERIENCE' },
  { at: 30, label: 'LOADING GEOMETRY SYSTEMS' },
  { at: 62, label: 'CALIBRATING ARENA' },
  { at: 88, label: 'PREPARING THE ARENA' },
  { at: 100, label: 'READY' },
];

function statusFor(p) {
  let label = STATUS_STEPS[0].label;
  for (const s of STATUS_STEPS) if (p >= s.at) label = s.label;
  return label;
}

export function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const numRef = useRef(null);
  const dotRef = useRef(null);
  const [status, setStatus] = useState(STATUS_STEPS[0].label);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = rootRef.current;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setStatus('READY');

      const exit = () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      };

      if (reduced || !root) {
        exit();
        return;
      }

      const tl = gsap.timeline({ onComplete: exit });
      tl.to(root.querySelectorAll('[data-pl-fade]'), {
        y: -18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.in',
      })
        .to(barRef.current, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, '<')
        .to(root, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          pointerEvents: 'none',
        });
    };

    // ---- Cinematic entry reveal ----
    if (!reduced && root) {
      const fades = root.querySelectorAll('[data-pl-fade]');
      const corners = root.querySelectorAll('.pl-corner');
      gsap.set(fades, { opacity: 0, y: 22 });
      gsap.set(corners, { opacity: 0, scale: 0.4 });
      gsap
        .timeline()
        .to(root, { opacity: 1, duration: 0.4, ease: 'power1.out' })
        .to(
          fades,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
          },
          0.1
        )
        .to(
          corners,
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
          },
          0.3
        );
    }

    // ---- Progress driven by real readiness ----
    let target = 0;
    let current = 0;
    let raf;

    const tick = () => {
      // Ease current toward target; cap visual progress until truly ready
      current += (target - current) * 0.08;
      if (target >= 100) current += (100 - current) * 0.12;
      const p = Math.min(100, current);

      if (barRef.current) barRef.current.style.transform = `scaleX(${p / 100})`;
      if (numRef.current) numRef.current.textContent = `${Math.round(p)}`;
      if (dotRef.current) {
        dotRef.current.style.left = `${p}%`;
        dotRef.current.style.opacity = p > 1 && p < 99.5 ? '1' : '0';
      }
      setStatus((prev) => {
        const next = statusFor(p);
        return next === prev ? prev : next;
      });

      if (p >= 99.5) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const setTarget = (v) => {
      target = Math.max(target, v);
    };

    // Staged: DOM mounted -> document readyState -> window load -> asset images
    setTarget(18);
    const t1 = setTimeout(() => setTarget(42), 350);

    if (document.readyState === 'complete') {
      setTarget(72);
    } else {
      const onReady = () => setTarget(72);
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') setTarget(72);
      });
      window.addEventListener('load', onReady, { once: true });
    }

    const preloadImages = () => {
      const srcs = [LOGO_SRC, '/logos/wce-logo.svg', '/acm.png'];
      let loaded = 0;
      if (!srcs.length) return;
      srcs.forEach((src) => {
        const img = new Image();
        const done = () => {
          loaded += 1;
          setTarget(72 + (loaded / srcs.length) * 26);
        };
        img.onload = done;
        img.onerror = done;
        img.src = src;
      });
    };
    preloadImages();

    const t2 = setTimeout(() => setTarget(100), 2600);
    const safety = setTimeout(() => setTarget(100), SAFETY_MS);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(safety);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      gsap.killTweensOf('*');
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#05060b] text-[#f2f5f7]"
      role="status"
      aria-label="Loading WCE Hackathon 2027"
    >
      {/* Background grid + glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 45%, black 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 45%, black 20%, transparent 80%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 42%, rgba(117,71,232,0.16), transparent 70%), radial-gradient(ellipse 40% 30% at 50% 60%, rgba(39,220,203,0.07), transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6">
        {/* Official logo — revealed with a soft sheen sweep */}
        <div data-pl-fade className="relative mb-2 w-full">
          <img
            src={LOGO_SRC}
            alt="WCE Hackathon 2027"
            className="w-full select-none"
            draggable="false"
          />
          <div
            data-pl-fade
            aria-hidden="true"
            className="pl-sheen pointer-events-none absolute inset-0"
          />
        </div>

        {/* Tagline */}
        <div
          data-pl-fade
          className="font-mono text-[11px] uppercase tracking-[0.42em] text-[#7b8494]"
        >
          <span className="text-turquoise">Code</span>
          <span className="mx-2 text-[#3a4150]">|</span>
          <span className="text-lime">Create</span>
          <span className="mx-2 text-[#3a4150]">|</span>
          <span className="text-[#a78bfa]">Conquer</span>
        </div>

        {/* Progress module */}
        <div data-pl-fade className="mt-14 w-full">
          <div className="mb-3 flex items-end justify-between">
            <span
              key={status}
              className="pl-status font-mono text-[10px] uppercase tracking-[0.28em] text-[#7b8494]"
            >
              {status}
            </span>
            <span className="font-mono text-[11px] tabular-nums tracking-[0.1em] text-[#a3adba]">
              <span ref={numRef} className="text-white">
                0
              </span>
              <span className="text-[#3a4150]"> / 100</span>
            </span>
          </div>

          {/* Progress track */}
          <div className="relative h-px w-full bg-white/[0.09]">
            <div
              ref={barRef}
              className="absolute inset-0 origin-left"
              style={{
                transform: 'scaleX(0)',
                background:
                  'linear-gradient(90deg, #7547e8 0%, #315bff 45%, #27dccb 80%, #b9f36b 100%)',
                boxShadow:
                  '0 0 12px rgba(39,220,203,0.55), 0 0 4px rgba(117,71,232,0.6)',
              }}
            />
            <div
              ref={dotRef}
              aria-hidden="true"
              className="pl-dot absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: '#b9f36b',
                boxShadow: '0 0 10px 2px rgba(185,243,107,0.6)',
                opacity: 0,
              }}
            />
          </div>
        </div>
      </div>

      {/* Corner brackets — frame detail */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-5">
        <span className="pl-corner absolute left-0 top-0 border-l border-t border-white/15" />
        <span className="pl-corner absolute right-0 top-0 border-r border-t border-white/15" />
        <span className="pl-corner absolute bottom-0 left-0 border-b border-l border-white/15" />
        <span className="pl-corner absolute bottom-0 right-0 border-b border-r border-white/15" />
      </div>
    </div>
  );
}
