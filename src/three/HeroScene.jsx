import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { HeroArtifact } from './HeroArtifact';
import { HeroFallback } from './HeroFallback';

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

/* Camera drifts with the pointer for a cinematic parallax. */
function CameraRig({ shared }) {
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const { camera } = state;
    const t = state.clock.elapsedTime;

    target.current.x += (shared.current.px * 0.75 - target.current.x) * Math.min(1, delta * 2);
    target.current.y += (shared.current.py * -0.45 - target.current.y) * Math.min(1, delta * 2);

    camera.position.x += (target.current.x - camera.position.x) * Math.min(1, delta * 2.4);
    camera.position.y +=
      (target.current.y + Math.sin(t * 0.14) * 0.12 - camera.position.y) * Math.min(1, delta * 2.4);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HeroScene() {
  const wrapRef = useRef(null);
  const shared = useRef({ px: 0, py: 0, dx: 0, dy: 0, hover: false, dragging: false, reduced: false });
  const drag = useRef({ active: false, x: 0, y: 0 });

  const [webglSupported] = useState(() => detectWebGL());
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onMq);
    onMq();
    return () => mq.removeEventListener?.('change', onMq);
  }, []);

  useEffect(() => {
    const onVis = () => setRunning(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = running && !document.hidden && !reducedMotion;

  const onPointerMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    shared.current.px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    shared.current.py = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    if (drag.current.active) {
      shared.current.dx += (e.clientX - drag.current.x) * 0.006;
      shared.current.dy += (e.clientY - drag.current.y) * 0.006;
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;
    }
  };

  const onPointerDown = (e) => {
    drag.current.active = true;
    shared.current.dragging = true;
    drag.current.x = e.clientX;
    drag.current.y = e.clientY;
  };

  const endDrag = () => {
    drag.current.active = false;
    shared.current.dragging = false;
  };

  if (!webglSupported) {
    return (
      <div
        ref={wrapRef}
        className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[620px]"
      >
        <HeroFallback />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[620px] cursor-grab active:cursor-grabbing touch-none"
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={endDrag}
      onPointerLeave={() => {
        shared.current.hover = false;
        endDrag();
      }}
      onPointerEnter={() => {
        shared.current.hover = true;
      }}
      role="img"
      aria-label="Interactive geometric sculpture representing the WCE Hackathon 2027 identity"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.15, 8.6], fov: 38, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={active ? 'always' : 'never'}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} color="#16233d" />
        <directionalLight position={[7, 9, 6]} intensity={2.4} color="#00e5d4" />
        <directionalLight position={[-8, -4, 5]} intensity={1.1} color="#929caa" />
        <directionalLight position={[0, -8, -3]} intensity={0.45} color="#b9f36b" />
        <spotLight
          position={[0, 10, 3]}
          angle={0.5}
          penumbra={1}
          intensity={0.9}
          color="#e6fbf6"
        />
        <CameraRig shared={shared} />
        <HeroArtifact shared={shared} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
