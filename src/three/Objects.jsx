import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  Floating 3D object library — chrome, glass, silicon, holograms.
 *  Every object is a real Three.js mesh with physically based
 *  materials, animated with slow cinematic drift.
 * ------------------------------------------------------------------ */

const damp = Math.min;

function FloatDrift({ speed = 1, ampY = 0.3, ampX = 0.15, ampZ = 0.4, spin = 0.15, phase = 0, children }) {
  const root = useRef();
  useFrame((state, delta) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    const d = damp(delta, 0.05);
    root.current.rotation.y += d * spin;
    root.current.rotation.x = Math.sin(t * 0.9) * 0.12;
    root.current.rotation.z = Math.cos(t * 0.7) * 0.08;
    root.current.position.y = Math.sin(t * 1.15) * ampY;
    root.current.position.x = Math.sin(t * 0.55) * ampX;
    root.current.position.z = Math.cos(t * 0.8) * ampZ;
  });
  return <group ref={root}>{children}</group>;
}

/* ---------- 01 — Large chrome torus with orbiting satellites ---------- */
export function ChromeTorus({ accent = '#27dccb', scale = 1 }) {
  const sat = useRef();
  const torusGeo = useMemo(() => new THREE.TorusGeometry(1.7, 0.34, 40, 140), []);
  const innerGeo = useMemo(() => new THREE.TorusGeometry(1.7, 0.1, 24, 140), []);
  const satGeo = useMemo(() => new THREE.SphereGeometry(0.13, 24, 24), []);

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c9d2dd',
        metalness: 1,
        roughness: 0.09,
        envMapIntensity: 1.6,
      }),
    [],
  );
  const accentMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1030',
        emissive: accent,
        emissiveIntensity: 1.1,
        metalness: 0.7,
        roughness: 0.25,
      }),
    [accent],
  );

  useFrame((state, delta) => {
    if (sat.current) {
      sat.current.rotation.z += damp(delta, 0.05) * 0.4;
      sat.current.rotation.x = 0.6;
    }
  });

  return (
    <FloatDrift speed={0.8} ampY={0.32} spin={0.09} phase={1.2}>
      <group scale={scale}>
        <mesh geometry={torusGeo} material={chrome} rotation={[Math.PI / 2.4, 0.3, 0]} />
        <mesh geometry={innerGeo} material={accentMetal} rotation={[Math.PI / 2.4, 0.3, 0]} />
        <group ref={sat} rotation={[0.6, 0, 0]}>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              geometry={satGeo}
              material={chrome}
              position={[
                Math.cos((i / 3) * Math.PI * 2) * 1.7,
                Math.sin((i / 3) * Math.PI * 2) * 1.7,
                0,
              ]}
            />
          ))}
        </group>
      </group>
    </FloatDrift>
  );
}

/* ---------- 02 — Glass sphere with glowing core ---------- */
export function GlassSphere({ accent = '#7547e8', radius = 0.9, coreEmissive = 2.2 }) {
  const core = useRef();
  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(radius * 0.42, 1), [radius]);

  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        transmission: 1,
        thickness: radius * 0.85,
        roughness: 0.04,
        ior: 1.5,
        metalness: 0,
        color: '#eef4ff',
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 2,
        transparent: true,
        attenuationColor: new THREE.Color(accent),
        attenuationDistance: radius * 2.4,
      }),
    [radius, accent],
  );
  const coreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0b1030',
        emissive: accent,
        emissiveIntensity: coreEmissive,
        metalness: 0.6,
        roughness: 0.3,
      }),
    [accent, coreEmissive],
  );

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.y += damp(delta, 0.05) * 0.5;
      core.current.rotation.x += damp(delta, 0.05) * 0.22;
      core.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.035);
    }
  });

  return (
    <FloatDrift speed={1.05} ampY={0.28} spin={0.06} phase={2.4}>
      <group>
        <mesh>
          <sphereGeometry args={[radius, 48, 48]} />
          <primitive object={glass} attach="material" />
        </mesh>
        <mesh ref={core} geometry={coreGeo} material={coreMat} />
      </group>
    </FloatDrift>
  );
}

/* ---------- 03 — Futuristic processor chip with pin field ---------- */
export function ProcessorChip({ accent = '#315bff', size = 1.2, pinRows = 7 }) {
  const traces = useRef();
  const dieGlow = useRef();
  const half = size / 2;
  const pinLen = size * 0.16;

  const dieMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0e1526',
        metalness: 0.55,
        roughness: 0.32,
      }),
    [],
  );
  const capMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b9c4d1',
        metalness: 1,
        roughness: 0.14,
        envMapIntensity: 1.8,
      }),
    [],
  );
  const pinMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#aab6c4',
        metalness: 1,
        roughness: 0.22,
      }),
    [],
  );
  const glowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({ color: accent, toneMapped: false, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    [accent],
  );

  const pins = useMemo(() => {
    const arr = [];
    const step = (size * 0.7) / (pinRows - 1);
    for (let i = 0; i < pinRows; i++) {
      const o = -size * 0.35 + i * step;
      arr.push({ pos: [o, -(half + pinLen / 2), 0], rot: [0, 0, Math.PI / 2], len: pinLen });
      arr.push({ pos: [o, half + pinLen / 2, 0], rot: [0, 0, -Math.PI / 2], len: pinLen });
      arr.push({ pos: [-(half + pinLen / 2), o, 0], rot: [0, 0, 0], len: pinLen });
      arr.push({ pos: [half + pinLen / 2, o, 0], rot: [0, 0, Math.PI], len: pinLen });
    }
    return arr;
  }, [size, pinRows, half, pinLen]);

  useFrame((state) => {
    if (dieGlow.current) {
      const t = state.clock.elapsedTime;
      dieGlow.current.material.opacity = 0.55 + Math.sin(t * 2.1) * 0.45;
    }
  });

  return (
    <FloatDrift speed={0.9} ampY={0.24} spin={0.11} ampZ={0.3} phase={4.1}>
      <group>
        <mesh material={dieMat}>
          <boxGeometry args={[size, size, size * 0.16]} />
        </mesh>
        <mesh material={dieMat} position={[0, 0, size * 0.045]}>
          <boxGeometry args={[size * 0.78, size * 0.78, size * 0.07]} />
        </mesh>
        <mesh material={capMat} position={[0, 0, -size * 0.09]}>
          <boxGeometry args={[size * 0.97, size * 0.97, size * 0.03]} />
        </mesh>
        {/* glowing die core */}
        <mesh ref={dieGlow} position={[0, 0, size * 0.082]}>
          <planeGeometry args={[size * 0.42, size * 0.42]} />
          <primitive object={glowMat} attach="material" />
        </mesh>
        {/* emissive circuit traces on die surface */}
        <group ref={traces} position={[0, 0, size * 0.084]}>
          {[
            [0, 0, size * 0.2, size * 0.02],
            [0, 0, size * 0.02, size * 0.2],
            [size * 0.08, size * 0.08, size * 0.12, size * 0.015],
            [-size * 0.09, size * 0.06, size * 0.1, size * 0.015],
            [size * 0.06, -size * 0.09, size * 0.015, size * 0.1],
          ].map(([x, y, w, h], i) => (
            <mesh key={i} position={[x, y, 0]}>
              <planeGeometry args={[w, h]} />
              <primitive object={glowMat} attach="material" />
            </mesh>
          ))}
        </group>
        {/* pin field */}
        {pins.map((pin, i) => (
          <mesh
            key={i}
            material={pinMat}
            position={pin.pos}
            rotation={pin.rot}
          >
            <boxGeometry args={[pin.len, size * 0.055, size * 0.055]} />
          </mesh>
        ))}
      </group>
    </FloatDrift>
  );
}

/* ---------- 04 — Interlocked cube cluster (chrome + violet + glass) ---------- */
export function CubeCluster({ accent = '#7547e8', scale = 1 }) {
  const spinA = useRef();
  const spinB = useRef();

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#cfd8e2',
        metalness: 1,
        roughness: 0.12,
        envMapIntensity: 1.8,
      }),
    [],
  );
  const violetMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#241243',
        emissive: accent,
        emissiveIntensity: 0.7,
        metalness: 0.8,
        roughness: 0.2,
      }),
    [accent],
  );
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        transmission: 0.92,
        thickness: 0.5,
        roughness: 0.08,
        ior: 1.45,
        color: '#dcebff',
        envMapIntensity: 1.6,
        transparent: true,
      }),
    [],
  );

  useFrame((state, delta) => {
    const d = damp(delta, 0.05);
    if (spinA.current) spinA.current.rotation.x += d * 0.22;
    if (spinB.current) spinB.current.rotation.y -= d * 0.18;
  });

  return (
    <FloatDrift speed={0.95} ampY={0.3} spin={0.13} phase={0.6}>
      <group scale={scale}>
        <group ref={spinA}>
          <mesh material={chrome}>
            <boxGeometry args={[1.0, 1.0, 1.0]} />
          </mesh>
        </group>
        <group ref={spinB} rotation={[Math.PI / 3.6, Math.PI / 4.4, Math.PI / 5.4]}>
          <mesh material={violetMetal} scale={[1.02, 1.02, 1.02]}>
            <boxGeometry args={[1.0, 1.0, 1.0]} />
          </mesh>
        </group>
        <mesh material={glass} rotation={[Math.PI / 5, -Math.PI / 4, 0]} scale={0.5}>
          <boxGeometry args={[1.7, 1.7, 1.7]} />
        </mesh>
      </group>
    </FloatDrift>
  );
}

/* ---------- 05 — Holographic ring (additive, volumetric feel) ---------- */
export function HoloRing({ accent = '#27dccb', scale = 1 }) {
  const root = useRef();
  const arc = useRef();
  const geo = useMemo(() => new THREE.TorusGeometry(1, 0.045, 12, 120), []);
  const arcGeo = useMemo(() => new THREE.RingGeometry(0.82, 1.14, 90, 1, 0, Math.PI * 1.55), []);
  const glow = useMemo(
    () => new THREE.MeshBasicMaterial({ color: accent, toneMapped: false, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    [accent],
  );
  const soft = useMemo(
    () => new THREE.MeshBasicMaterial({ color: accent, toneMapped: false, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    [accent],
  );

  useFrame((state, delta) => {
    if (!root.current) return;
    const d = damp(delta, 0.05);
    const t = state.clock.elapsedTime;
    root.current.rotation.y += d * 0.35;
    root.current.rotation.z = Math.sin(t * 0.5) * 0.25;
    if (arc.current) {
      arc.current.material.opacity = 0.12 + Math.sin(t * 1.6) * 0.07;
    }
  });

  return (
    <group ref={root} scale={scale}>
      <mesh ref={arc} geometry={arcGeo} material={soft} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={geo} material={glow} rotation={[Math.PI / 2.6, 0.4, 0]} />
      <group rotation={[Math.PI / 2.6 + 0.5, -0.3, 0.2]}>
        <mesh geometry={geo} material={soft} scale={0.72} />
      </group>
    </group>
  );
}

/* ---------- 06 — Faceted crystal shard (glass / chrome finish) ---------- */
export function CrystalShard({ accent = '#8fd8ff', scale = 1 }) {
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        transmission: 0.95,
        thickness: 1.0,
        roughness: 0.02,
        ior: 1.7,
        color: '#e6f4ff',
        envMapIntensity: 2.2,
        attenuationColor: new THREE.Color(accent),
        attenuationDistance: 2.2,
        transparent: true,
      }),
    [accent],
  );

  return (
    <FloatDrift speed={1.2} ampY={0.36} spin={0.28} phase={3.3}>
      <group scale={scale} rotation={[0.4, 0.8, 0.25]}>
        <mesh material={glass}>
          <octahedronGeometry args={[0.7, 0]} />
        </mesh>
      </group>
    </FloatDrift>
  );
}

/* ---------- 07 — Small chrome polyhedron satellite ---------- */
export function ChromeNode({ scale = 1 }) {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#cdd7e1',
        metalness: 1,
        roughness: 0.15,
        envMapIntensity: 1.7,
      }),
    [],
  );
  return (
    <FloatDrift speed={1.35} ampY={0.2} spin={0.4} phase={5}>
      <group scale={scale} rotation={[0.7, 0.3, 0]}>
        <mesh material={mat}>
          <dodecahedronGeometry args={[1, 0]} />
        </mesh>
      </group>
    </FloatDrift>
  );
}

/* ---------- 08 — Gyroscope: three nested rotational axes + core ---------- */
export function Gyroscope({ accent = '#27dccb', scale = 1 }) {
  const g1 = useRef();
  const g2 = useRef();
  const g3 = useRef();
  const core = useRef();

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ccd6e0',
        metalness: 1,
        roughness: 0.1,
        envMapIntensity: 2,
      }),
    [],
  );
  const darkMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#101a33',
        emissive: accent,
        emissiveIntensity: 0.55,
        metalness: 0.85,
        roughness: 0.22,
      }),
    [accent],
  );
  const coreMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({ color: accent, toneMapped: false }),
    [accent],
  );

  useFrame((state, delta) => {
    const d = damp(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (g1.current) g1.current.rotation.x += d * 0.4;
    if (g2.current) g2.current.rotation.y -= d * 0.31;
    if (g3.current) g3.current.rotation.z += d * 0.23;
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.12);
    }
  });

  return (
    <FloatDrift speed={0.85} ampY={0.26} spin={0.07} phase={1.9}>
      <group scale={scale}>
        <group ref={g1} rotation={[0.4, 0, 0.2]}>
          <mesh material={chrome}>
            <torusGeometry args={[1.5, 0.055, 14, 110]} />
          </mesh>
        </group>
        <group ref={g2} rotation={[0, 0.35, 0.7]}>
          <mesh material={chrome}>
            <torusGeometry args={[1.2, 0.05, 14, 110]} />
          </mesh>
        </group>
        <group ref={g3} rotation={[0.9, 0.2, 0]}>
          <mesh material={darkMetal}>
            <torusGeometry args={[0.9, 0.045, 12, 100]} />
          </mesh>
        </group>
        <mesh ref={core} material={coreMat}>
          <sphereGeometry args={[0.26, 24, 24]} />
        </mesh>
        {/* gimbal crosses */}
        <mesh material={chrome} rotation={[0.4, 0, 0.2]}>
          <boxGeometry args={[3.06, 0.075, 0.075]} />
        </mesh>
        <mesh material={chrome} rotation={[0, 0.35, 0.7]}>
          <boxGeometry args={[2.46, 0.07, 0.07]} />
        </mesh>
      </group>
    </FloatDrift>
  );
}

/* ---------- 09 — Twist knot + twisted loop library (fractal-like) ---------- */
export function TwistedLoop({ accent = '#315bff', scale = 1 }) {
  const inner = useRef();
  const geo = useMemo(() => new THREE.TorusKnotGeometry(1.05, 0.3, 200, 28, 2, 3), []);
  const haloGeo = useMemo(() => new THREE.TorusGeometry(1.75, 0.06, 12, 120), []);

  const liquid = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#aeb9c6',
        metalness: 1,
        roughness: 0.07,
        envMapIntensity: 2.2,
      }),
    [],
  );
  const haloMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0e1a3f',
        emissive: accent,
        emissiveIntensity: 1.1,
        metalness: 0.8,
        roughness: 0.2,
      }),
    [accent],
  );

  useFrame((state, delta) => {
    if (inner.current) inner.current.rotation.z += damp(delta, 0.05) * 0.16;
  });

  return (
    <FloatDrift speed={0.8} ampY={0.3} spin={0.11} phase={3.7}>
      <group scale={scale}>
        <mesh geometry={geo} material={liquid} />
        <group ref={inner} rotation={[Math.PI / 2.2, 0.4, 0]}>
          <mesh geometry={haloGeo} material={haloMat} />
        </group>
      </group>
    </FloatDrift>
  );
}

/* ---------- 10 — Iridescent glass prism cube ---------- */
export function IridescentPrism({ scale = 1 }) {
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        transmission: 0.85,
        thickness: 0.7,
        roughness: 0.03,
        ior: 1.55,
        metalness: 0,
        color: '#eaf2ff',
        iridescence: 1,
        iridescenceIOR: 1.65,
        iridescenceThicknessRange: [140, 640],
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 2.2,
        transparent: true,
      }),
    [],
  );

  return (
    <FloatDrift speed={1.1} ampY={0.34} spin={0.3} ampZ={0.5} phase={2.6}>
      <group scale={scale} rotation={[0.5, 0.7, 0.2]}>
        <mesh material={mat}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
        </mesh>
      </group>
    </FloatDrift>
  );
}
