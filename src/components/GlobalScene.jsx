import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { InterlockedCore, ArchitecturalFrame, OrbitalGeometry } from '../three/Sculptures';

const clamp01 = (v) => Math.min(1, Math.max(0, v));

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Motes({ count = 120 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const rand = seeded(1337);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 42;
      arr[i * 3 + 1] = rand() * 36 - 22;
      arr[i * 3 + 2] = -18 + rand() * 16;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7547e8"
        size={0.04}
        transparent
        opacity={0.28}
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
  const { size } = useThree();
  const mobile = size.width < 768;

  useFrame((state, delta) => {
    const { camera } = state;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const target = clamp01(window.scrollY / max);
    look.current.target = target;
    look.current.progress += (target - look.current.progress) * Math.min(1, delta * 3.5);

    const p = look.current.progress;

    if (env.current) {
      env.current.position.y = p * (mobile ? 28 : 29);
      env.current.position.x = Math.sin(p * Math.PI * 1.5) * (mobile ? 0.5 : 1.3);
      env.current.rotation.y = p * 0.28;
      env.current.rotation.z = Math.sin(p * Math.PI) * 0.012;
      const s = mobile ? 0.8 : 1;
      env.current.scale.setScalar(s);
    }

    camera.position.x += (state.pointer.x * 1.0 + p * 0.5 - camera.position.x) * Math.min(1, delta * 1.8);
    camera.position.y += (state.pointer.y * -0.4 - p * 0.55 - camera.position.y) * Math.min(1, delta * 1.8);
    camera.position.z = 16.5 - p * 1.5;
    camera.lookAt(0, -p * 0.45, -6);
  });

  return (
    <>
      <fog attach="fog" args={['#05060b', 20, 60]} />

      <ambientLight intensity={0.85} color="#3a3458" />
      <hemisphereLight args={['#5a4ce8', '#050810', 1.05]} />

      <directionalLight position={[10, 12, 10]} intensity={2.8} color="#b9c6ff" />
      <directionalLight position={[-11, -3, 8]} intensity={1.3} color="#7547e8" />
      <directionalLight position={[0, -10, 5]} intensity={1.0} color="#27dccb" />
      <pointLight position={[8, 5, 3]} intensity={28} distance={28} decay={2} color="#315bff" />
      <pointLight position={[-9, -7, 3]} intensity={22} distance={26} decay={2} color="#7547e8" />
      <pointLight position={[3, 14, -3]} intensity={18} distance={24} decay={2} color="#27dccb" />

      <group ref={env}>
        <group position={mobile ? [2.0, 0.5, -7] : [4.8, 1.4, -4]} scale={mobile ? 0.75 : 1.5}>
          <InterlockedCore accent="#7547e8" />
        </group>

        <group position={mobile ? [-0.5, -14, -8] : [-5.2, -13.5, -6]} scale={mobile ? 0.82 : 1.4}>
          <ArchitecturalFrame accent="#315bff" />
        </group>

        <group position={mobile ? [1.8, -28.5, -7] : [4.8, -28, -5.5]} scale={mobile ? 0.88 : 1.45}>
          <OrbitalGeometry accent="#27dccb" />
        </group>
      </group>

      <Motes />
    </>
  );
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
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 16.5], fov: 46, near: 0.1, far: 90 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={paused || reduced ? 'never' : 'always'}
        style={{ background: 'transparent' }}
      >
        <EnvironmentRig />
      </Canvas>
      <div className="absolute inset-0 bg-[#05060b]/45 lg:hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,11,0.75)_100%)]" />
    </div>
  );
}