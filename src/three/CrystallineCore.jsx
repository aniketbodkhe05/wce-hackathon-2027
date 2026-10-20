import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  Crystalline Core — Model 01
 *  Primary hero sculpture. Interlocking dual-tetrahedron compound
 *  (stella octangula) with a central octahedral nucleus, metallic
 *  faces, restrained cyan edge lighting, small lime accents, and
 *  thin structural connections.
 * ------------------------------------------------------------------ */
function CrystallineCoreModel({ shared, reduced, scale = 1 }) {
  const root = useRef();
  const coreRef = useRef();
  const aRef = useRef();
  const bRef = useRef();

  const solidGeo = useMemo(() => new THREE.TetrahedronGeometry(1.06, 0), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(solidGeo), [solidGeo]);
  const nucleusGeo = useMemo(() => new THREE.OctahedronGeometry(0.17, 0), []);

  const local = useRef({ dx: 0, dy: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!root.current || reduced) return;

    const entrance = Math.min(1, t / 1.6);

    // Slow continuous rotation
    if (aRef.current) {
      aRef.current.rotation.y += delta * 0.15;
      aRef.current.rotation.x = Math.sin(t * 0.18) * 0.12;
    }
    if (bRef.current) {
      bRef.current.rotation.y -= delta * 0.1;
      bRef.current.rotation.z = Math.cos(t * 0.15) * 0.09;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.08;
      coreRef.current.scale.setScalar(pulse);
      coreRef.current.rotation.y += delta * 0.6;
      if (coreRef.current.material) {
        coreRef.current.material.emissiveIntensity = 0.75 + Math.sin(t * 1.5) * 0.25;
      }
    }

    // Pointer parallax using local ref
    local.current.dx *= 0.94;
    local.current.dy *= 0.94;
    const targetX = shared.current.px * 0.45 + local.current.dx;
    const targetY = shared.current.py * -0.3 + local.current.dy;

    root.current.rotation.y += (targetX + t * 0.05 - root.current.rotation.y) * 0.06;
    root.current.rotation.x += (targetY + Math.sin(t * 0.3) * 0.03 - root.current.rotation.x) * 0.06;

    root.current.scale.setScalar(scale * (0.6 + entrance * 0.4));
    root.current.position.y = (1 - entrance) * 1.5 + Math.sin(t * 0.6) * 0.07;
  });

  return (
    <group ref={root}>
      {/* Dual tetrahedron A */}
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

      {/* Dual tetrahedron B (mirrored) */}
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

      {/* Central energy nucleus */}
      <mesh ref={coreRef} geometry={nucleusGeo}>
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

      {/* Thin structural connection accents — lime */}
      <group>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i}>
              <cylinderGeometry args={[0.008, 0.008, 1.4, 6]} />
              <meshStandardMaterial color="#b9f36b" emissive="#b9f36b" emissiveIntensity={0.4} transparent opacity={0.4} />
              <mesh
                position={[Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, 0]}
                rotation={[0, 0, angle]}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  LatticeCage — faint icosahedral wireframe for depth
 * ------------------------------------------------------------------ */
function LatticeCage({ reduced }) {
  const ref = useRef();
  const geo = useMemo(() => new THREE.IcosahedronGeometry(2.0, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  useFrame((state, delta) => {
    if (!ref.current || reduced) return;
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
 *  Armillary — tilted precision rings with cyan / lime accents
 * ------------------------------------------------------------------ */
function Armillary({ reduced }) {
  const a = useRef();
  const b = useRef();

  useFrame((state, delta) => {
    if (reduced) return;
    if (a.current) a.current.rotation.z += delta * 0.11;
    if (b.current) b.current.rotation.x += delta * 0.08;
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
 *  Satellites — small orbiting solids
 * ------------------------------------------------------------------ */
function Satellites({ reduced }) {
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
    if (!group.current || reduced) return;
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
 *  OuterShell — whisper-thin glass envelope
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
 *  CrystallineCore — exported root component
 * ------------------------------------------------------------------ */
export function CrystallineCore({ reduced = false, scale = 1 }) {
  return (
    <group>
      <CrystallineCoreModel shared={{ current: { px: 0, py: 0, dx: 0, dy: 0, dragging: false, hover: false, reduced } }} reduced={reduced} scale={scale} />
      <LatticeCage reduced={reduced} />
      <Armillary reduced={reduced} />
      <Satellites reduced={reduced} />
      <OuterShell />
    </group>
  );
}
