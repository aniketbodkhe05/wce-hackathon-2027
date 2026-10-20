import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  Orbital Structure — Model 03
 *  Third sculpture for timeline/journey section.
 *  Geometric rings, interconnected structural paths, central
 *  abstract component, orbiting elements, fine metallic edges,
 *  restrained luminous details.
 * ------------------------------------------------------------------ */
export function OrbitalStructure({ reduced = false, scale = 1, scrollProgress = 0 }) {
  const root = useRef();
  const centralRef = useRef();
  const ringsRef = useRef();
  const orbitsRef = useRef();

  const centralGeo = useMemo(() => new THREE.IcosahedronGeometry(0.5, 1), []);

  const orbitConfigs = useMemo(() => {
    return [
      { r: 2.4, speed: 0.18, tilt: 0.2, phase: 0, size: 0.08, color: '#00e5d4' },
      { r: 2.0, speed: -0.14, tilt: -0.3, phase: Math.PI / 3, size: 0.06, color: '#b9f36b' },
      { r: 1.7, speed: 0.1, tilt: 0.4, phase: (2 * Math.PI) / 3, size: 0.05, color: '#929caa' },
    ];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!root.current || reduced) return;

    // Scroll-linked orientation
    const tilt = scrollProgress * 0.5;
    root.current.rotation.z = tilt * 0.3;
    root.current.rotation.x = Math.sin(t * 0.1) * 0.05 + tilt * 0.2;

    // Central component slow rotation
    if (centralRef.current) {
      centralRef.current.rotation.y += delta * 0.12;
      centralRef.current.rotation.x += delta * 0.08;
    }

    // Rings rotate independently
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.06;
      ringsRef.current.rotation.x += delta * 0.03;
    }

    // Orbiting elements
    if (orbitsRef.current) {
      orbitsRef.current.children.forEach((mesh, i) => {
        const c = orbitConfigs[i];
        const a = c.phase + t * c.speed;
        mesh.position.set(
          Math.cos(a) * c.r,
          Math.sin(a) * c.r * Math.sin(c.tilt),
          Math.sin(a) * c.r * Math.cos(c.tilt)
        );
        mesh.rotation.x += delta * 1.5;
        mesh.rotation.y += delta * 1.0;
      });
    }
  });

  return (
    <group ref={root} scale={scale}>
      {/* Central abstract component */}
      <group ref={centralRef}>
        <mesh geometry={centralGeo}>
          <meshStandardMaterial
            color="#0b1622"
            metalness={0.92}
            roughness={0.26}
            flatShading
          />
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(centralGeo)}>
          <lineBasicMaterial color="#00e5d4" transparent opacity={0.5} />
        </lineSegments>
        <pointLight position={[0, 0, 0]} intensity={1.5} distance={6} color="#00e5d4" />
      </group>

      {/* Interconnected rings */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, (i / 3) * Math.PI, 0]}>
            <mesh>
              <torusGeometry args={[1.6 + i * 0.4, 0.009, 6, 64]} />
              <meshStandardMaterial
                color={i === 0 ? '#00e5d4' : i === 1 ? '#b9f36b' : '#929caa'}
                emissive={i === 0 ? '#00e5d4' : i === 1 ? '#b9f36b' : '#1b2430'}
                emissiveIntensity={i === 0 ? 1 : 0.5}
                metalness={0.6}
                roughness={0.3}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Orbiting elements */}
      <group ref={orbitsRef}>
        {orbitConfigs.map((c, i) => (
          <mesh key={i}>
            <octahedronGeometry args={[c.size, 0]} />
            <meshStandardMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={1.2}
              metalness={0.7}
              roughness={0.25}
              flatShading
            />
          </mesh>
        ))}
      </group>

      {/* Structural connection paths — thin lines between rings */}
      <group>
        {[0, 1].map((i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    Math.cos((i / 2) * Math.PI) * (1.6 + i * 0.4),
                    Math.sin((i / 2) * Math.PI) * (1.6 + i * 0.4),
                    0,
                    Math.cos(((i + 1) / 2) * Math.PI) * (2.0 + i * 0.4),
                    Math.sin(((i + 1) / 2) * Math.PI) * (2.0 + i * 0.4),
                    0,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00e5d4" transparent opacity={0.3} />
          </line>
        ))}
      </group>
    </group>
  );
}
