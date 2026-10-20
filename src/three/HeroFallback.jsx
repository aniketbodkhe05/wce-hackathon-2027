export function HeroFallback() {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center p-8 select-none pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0, 229, 212,0.14),transparent_62%)]" />
      <svg
        className="w-[78%] max-w-[420px] aspect-square spin-slow"
        viewBox="-200 -200 400 400"
        fill="none"
        aria-label="WCE Hackathon crystalline emblem"
      >
        <defs>
          <linearGradient id="fb-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00e5d4" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="fb-violet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#929caa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <circle cx="0" cy="0" r="168" stroke="rgba(0, 229, 212,0.22)" strokeWidth="1" strokeDasharray="4 10" />
        <circle cx="0" cy="0" r="140" stroke="rgba(146, 156, 170,0.16)" strokeWidth="1" />
        <circle cx="0" cy="0" r="112" stroke="rgba(185, 243, 107,0.14)" strokeWidth="1" strokeDasharray="2 14" />

        <polygon points="0,-118 101,-59 101,59 0,118 -101,59 -101,-59" fill="#0b1017" stroke="url(#fb-cyan)" strokeWidth="2" />
        <polygon points="0,-84 72,-42 72,42 0,84 -72,42 -72,-42" fill="#10161f" stroke="url(#fb-violet)" strokeWidth="1.5" />
        <polygon points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23" fill="#00e5d4" fillOpacity="0.12" stroke="#00e5d4" strokeWidth="1" />
        <circle cx="0" cy="0" r="7" fill="#00e5d4" />

        <line x1="-190" y1="0" x2="-158" y2="0" stroke="#00e5d4" strokeWidth="1" />
        <line x1="158" y1="0" x2="190" y2="0" stroke="#00e5d4" strokeWidth="1" />
        <line x1="0" y1="-190" x2="0" y2="-158" stroke="#00e5d4" strokeWidth="1" />
        <line x1="0" y1="158" x2="0" y2="190" stroke="#00e5d4" strokeWidth="1" />
      </svg>
    </div>
  );
}
