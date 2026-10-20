import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smoothstep = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/* ------------------------------------------------------------------ *
 *  StellaCore — a compound of two mutually-dual tetrahedra.
 *  A mathematically precise "impossible" solid that reads as a
 *  star when stationary. Metallic dark faces + restrained cyan edges.
 * ------------------------------------------------------------------ */
function StellaCore({ shared }) {
  const aRef = useRef();
  const bRef = useRef();
  const coreRef = useRef();

  const solidGeo = useMemo(() => new THREE.TetrahedronGeometry(1.06, 0), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(solidGeo), [solidGeo]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const reduced = shared.current.reduced;

    if (aRef.current) {
      aRef.current.rotation.y += delta * (reduced ? 0 : 0.15);
      aRef.current.rotation.x = Math.sin(t * 0.18) * (reduced ? 0.06 : 0.12);
    }
    if (bRef.current) {
      bRef.current.rotation.y -= delta * (reduced ? 0 : 0.1);
      bRef.current.rotation.z = Math.cos(t * 0.15) * (reduced ? 0.05 : 0.09);
    }
    if (coreRef.current) {
      const pulse = reduced ? 1 : 1 + Math.sin(t * 1.5) * 0.08;
      coreRef.current.scale.setScalar(pulse);
      coreRef.current.rotation.y += delta * (reduced ? 0 : 0.6);
      coreRef.current.material.emissiveIntensity = reduced ? 0.8 : 0.75 + Math.sin(t * 1.5) * 0.25;
    }
  });

  return (
    <group>
      <group ref={aRef}>
        <mesh geometry={solidGeo}>
          <meshStandardMaterial
            color="#0b1622"
            metalness={0.92}
            roughness={0.26}
            flatShading
            transparent
            opacity={0.92}
          />
        </mesh>
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color="#00e5d4" transparent opacity={0.5} />
        </lineSegments>
      </group>

      {/* Mirrored twin → the dual tetrahedron (stella octangula) */}
      <group ref={bRef} scale={[-1, 1, 1]}>
        <mesh geometry={solidGeo}>
          <meshStandardMaterial
            color="#0b1622"
            metalness={0.92}
            roughness={0.26}
            flatShading
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        </mesh>
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color="#929caa" transparent opacity={0.34} />
        </lineSegments>
      </group>

      {/* Energy nucleus */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.17, 0]} />
        <meshStandardMaterial
          color="#00e5d4"
          emissive="#00e5d4"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.2}
          flatShading
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2.4} distance={7} color="#00e5d4" />
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  LatticeCage — a large, faint icosahedral wireframe that rotates
 *  against the core to create interlocking depth.
 * ------------------------------------------------------------------ */
function LatticeCage({ shared }) {
  const ref = useRef();
  const geo = useMemo(() => new THREE.IcosahedronGeometry(2.0, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  useFrame((state, delta) => {
    if (!ref.current || shared.current.reduced) return;
    ref.current.rotation.y -= delta * 0.045;
    ref.current.rotation.x += delta * 0.018;
  });

  return (
    <group ref={ref}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#16323c" transparent opacity={0.42} />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  Armillary — two tilted precision rings with cyan / lime accents.
 * ------------------------------------------------------------------ */
function Armillary({ shared }) {
  const a = useRef();
  const b = useRef();

  useFrame((state, delta) => {
    const reduced = shared.current.reduced;
    if (a.current) a.current.rotation.z += delta * (reduced ? 0 : 0.11);
    if (b.current) b.current.rotation.x += delta * (reduced ? 0 : 0.08);
  });

  return (
    <group>
      <group ref={a} rotation={[Math.PI / 2.55, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.55, 0.012, 8, 128]} />
          <meshStandardMaterial
            color="#00e5d4"
            emissive="#00e5d4"
            emissiveIntensity={1.1}
            metalness={0.55}
            roughness={0.3}
            transparent
            opacity={0.75}
          />
        </mesh>
      </group>
      <group ref={b} rotation={[-Math.PI / 3.1, 0.4, Math.PI / 5]}>
        <mesh>
          <torusGeometry args={[3.05, 0.009, 8, 128]} />
          <meshStandardMaterial
            color="#b9f36b"
            emissive="#b9f36b"
            emissiveIntensity={0.55}
            metalness={0.55}
            roughness={0.3}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  Satellites — small orbiting solids on independent inclinations.
 * ------------------------------------------------------------------ */
function Satellites({ shared }) {
  const group = useRef();

  const configs = useMemo(() => {
    const radii = [2.78, 3.08, 2.92, 3.22, 2.86, 3.16];
    return radii.map((r, i) => ({
      r,
      speed: (i % 2 === 0 ? 1 : -1) * (0.26 + (i % 3) * 0.05),
      tilt: (i / radii.length) * Math.PI,
      phase: (i / radii.length) * Math.PI * 2,
      size: 0.075 + (i % 3) * 0.02,
      kind: i % 2 === 0 ? 'octa' : 'tetra',
    }));
  }, []);

  useFrame((state, delta) => {
    if (!group.current || shared.current.reduced) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((mesh, i) => {
      const c = configs[i];
      const a = c.phase + t * c.speed;
      mesh.position.set(
        Math.cos(a) * c.r,
        Math.sin(a) * c.r * Math.sin(c.tilt) * 0.55,
        Math.sin(a) * c.r * Math.cos(c.tilt)
      );
      mesh.rotation.x += delta * 1.1;
      mesh.rotation.y += delta * 0.8;
    });
  });

  return (
    <group ref={group}>
      {configs.map((c, i) => (
        <mesh key={i}>
          {c.kind === 'octa' ? (
            <octahedronGeometry args={[c.size, 0]} />
          ) : (
            <tetrahedronGeometry args={[c.size, 0]} />
          )}
          <meshStandardMaterial
            color={i % 3 === 0 ? '#00e5d4' : '#e6fbf6'}
            emissive={i % 3 === 0 ? '#00e5d4' : '#1b2430'}
            emissiveIntensity={1.25}
            metalness={0.7}
            roughness={0.25}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  OuterShell — a whisper-thin glass-like envelope for depth.
 * ------------------------------------------------------------------ */
function OuterShell() {
  const geo = useMemo(() => new THREE.IcosahedronGeometry(2.15, 1), []);
  return (
    <mesh geometry={geo}>
      <meshStandardMaterial
        color="#0a1a22"
        metalness={0.1}
        roughness={0.05}
        transparent
        opacity={0.06}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 *  HeroArtifact — root group: pointer parallax, drag inertia,
 *  hover response, scroll-driven departure, entrance + reduced motion.
 * ------------------------------------------------------------------ */
export function HeroArtifact({ shared, reducedMotion }) {
  const root = useRef();

  const local = useRef({ reduced: false, dx: 0, dy: 0 });

  useEffect(() => {
    local.current.reduced = reducedMotion;
  }, [reducedMotion]);

  useFrame((state) => {
    const r = root.current;
    if (!r) return;
    const s = { ...shared.current, reduced: local.current.reduced };
    const t = state.clock.elapsedTime;
    const reduced = s.reduced;

    const entrance = reduced ? 1 : easeOutExpo(Math.min(1, t / 1.6));

    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = clamp01(window.scrollY / max);
    const leave = smoothstep(0.02, 0.2, progress);

    if (!s.dragging && !reduced) {
      local.current.dx *= 0.94;
      local.current.dy *= 0.94;
    }

    const targetX = (reduced ? 0 : shared.current.px * 0.45) + (reduced ? 0 : local.current.dx);
    const targetY = (reduced ? 0 : shared.current.py * -0.3) + (reduced ? 0 : local.current.dy);

    r.rotation.y += (targetX + t * (reduced ? 0 : 0.05) - r.rotation.y) * 0.06;
    r.rotation.x += (targetY + Math.sin(t * 0.3) * 0.03 - r.rotation.x) * 0.06;

    const baseScale = 0.6 + entrance * 0.4;
    r.scale.setScalar(baseScale * (s.hover ? 1.05 : 1) * (1 - leave * 0.45));

    r.position.y = (1 - entrance) * 1.5 + Math.sin(t * 0.6) * (reduced ? 0 : 0.07) + leave * 5;
    r.position.x = leave * 6;
    r.position.z = -leave * 6;
    r.visible = leave < 0.985;
  });

  return (
    <group ref={root}>
      <StellaCore shared={shared} />
      <LatticeCage shared={shared} />
      <Armillary shared={shared} />
      <Satellites shared={shared} />
      <OuterShell />
    </group>
  );
}
