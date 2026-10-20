import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  InterlockedRings,
  ImpossibleFrames,
  TrefoilTorque,
} from '../three/ImpossibleSculptures';

const clamp01 = (v) => Math.min(1, Math.max(0, v));

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Motes({ count = 90 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const rand = seeded(1337);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 46;
      arr[i * 3 + 1] = rand() * 46 - 30;
      arr[i * 3 + 2] = -20 + rand() * 18;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.006;
      points.current.position.y = Math.sin(state.clock.elapsedTime * 0.05) * 1.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#5a4ce8"
        size={0.045}
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function EnvironmentRig() {
  const env = useRef();
  const look = useRef({ progress: 0, target: 0 });
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();
  const mobile = size.width < 768;

  useEffect(() => {
    const onPointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;
    const d = Math.min(delta, 0.05);

    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const target = clamp01(window.scrollY / max);
    look.current.target = target;
    look.current.progress += (target - look.current.progress) * Math.min(1, d * 3.2);

    const p = look.current.progress;

    if (env.current) {
      env.current.position.y = p * (mobile ? 30 : 31);
      env.current.position.x = Math.sin(p * Math.PI * 1.4) * (mobile ? 0.3 : 0.9);
      env.current.rotation.y = p * 0.14;
      env.current.rotation.z = Math.sin(p * Math.PI) * 0.01;
    }

    camera.position.x +=
      (pointer.current.x * (mobile ? 0.45 : 0.85) + p * 0.35 - camera.position.x) *
      Math.min(1, d * 1.8);
    camera.position.y +=
      (pointer.current.y * -0.35 - p * 0.5 - camera.position.y) * Math.min(1, d * 1.8);
    camera.position.z = 18 - p * 1.4;
    camera.lookAt(0, -p * 0.45, -5);
  });

  return (
    <>
      <fog attach="fog" args={['#05060b', 24, 72]} />

      {/* Cinematic violet / electric-blue studio lighting */}
      <ambientLight intensity={0.5} color="#2a2345" />
      <hemisphereLight args={['#5a4ce8', '#04070c', 1.0]} />

      <directionalLight position={[10, 13, 9]} intensity={2.7} color="#c4ccff" />
      <directionalLight position={[-12, -2, 8]} intensity={1.7} color="#7547e8" />
      <directionalLight position={[0, -11, 6]} intensity={1.4} color="#27dccb" />
      <directionalLight position={[-6, 9, -8]} intensity={1.1} color="#315bff" />

      <group ref={env}>
        <group
          position={mobile ? [1.5, 1.0, -6] : [5.2, 1.4, -3.5]}
          scale={mobile ? 0.62 : 1.35}
        >
          <InterlockedRings accent="#27dccb" />
          <pointLight position={[0, 0, 1.5]} intensity={12} distance={10} decay={2} color="#27dccb" />
        </group>

        <group
          position={mobile ? [-1.2, -14.5, -7] : [-7.8, -13.8, -6.5]}
          scale={mobile ? 0.6 : 1.28}
        >
          <ImpossibleFrames accent="#7547e8" />
          <pointLight position={[0, 0, 1.5]} intensity={12} distance={11} decay={2} color="#7547e8" />
        </group>

        <group
          position={mobile ? [1.4, -27.5, -7] : [2.4, -22.6, -6.5]}
          scale={mobile ? 0.58 : 1.15}
        >
          <TrefoilTorque accent="#315bff" />
          <pointLight position={[0, 0, 1.5]} intensity={12} distance={11} decay={2} color="#315bff" />
        </group>
      </group>

      <Motes />
    </>
  );
}


function ScrollScrim() {
  const ref = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (!ref.current) return;
      const t = Math.min(1, window.scrollY / 620);
      ref.current.style.opacity = String(t * 0.3);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <div ref={ref} className="absolute inset-0 bg-[#05060b] opacity-0" />;
}

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export function GlobalScene() {
  const [supported] = useState(() => detectWebGL());
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onMq);
    return () => mq.removeEventListener?.('change', onMq);
  }, []);

  if (!supported) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_65%_25%,rgba(117,71,232,0.22),transparent_55%),radial-gradient(ellipse_at_25%_75%,rgba(49,91,255,0.18),transparent_55%),radial-gradient(ellipse_at_70%_80%,rgba(39,220,203,0.12),transparent_50%)]"
      />
    );
  }

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_22%,rgba(117,71,232,0.22),transparent_52%),radial-gradient(ellipse_at_22%_68%,rgba(49,91,255,0.17),transparent_50%),radial-gradient(ellipse_at_60%_85%,rgba(39,220,203,0.12),transparent_48%)]" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 18], fov: 46, near: 0.1, far: 90 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        performance={{ min: 0.6 }}
        frameloop={paused || reduced ? 'never' : 'always'}
        style={{ background: 'transparent' }}
      >
        <EnvironmentRig />
      </Canvas>
      <ScrollScrim />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(5,6,11,0.72)_100%)]" />
    </div>
  );
}
