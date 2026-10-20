import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  Interlocked Geometric Artifact — Model 02
 *  Secondary sculpture for domains/highlights section.
 *  Interlocking metallic geometric structures with open frames
 *  and solid components, isometric mathematical geometry,
 *  restrained cyan illumination.
 * ------------------------------------------------------------------ */
export function InterlockedArtifact({ shared, reduced = false, scale = 1, hover = false }) {
  const root = useRef();
  const frameRef = useRef();
  const solidRef = useRef();

  const frameGeo = useMemo(() => new THREE.BoxGeometry(1, 1, 1, 2, 2, 2), []);
  const frameEdges = useMemo(() => new THREE.EdgesGeometry(frameGeo), [frameGeo]);
  const solidGeo = useMemo(() => new THREE.OctahedronGeometry(0.85, 1), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!root.current || reduced) return;

    const hoverLift = hover ? Math.sin(t * 2) * 0.05 : 0;

    // Slow independent rotation
    root.current.rotation.y += delta * 0.08;
    root.current.rotation.x = Math.sin(t * 0.12) * 0.06 + hoverLift;
    root.current.rotation.z = Math.cos(t * 0.1) * 0.04;

    // Frame (open wireframe cube)
    if (frameRef.current) {
      frameRef.current.rotation.y += delta * 0.04;
      frameRef.current.rotation.x += delta * 0.02;
    }

    // Solid component counter-rotation
    if (solidRef.current) {
      solidRef.current.rotation.y -= delta * 0.05;
      solidRef.current.rotation.z += delta * 0.03;
    }

    // Pointer response
    const targetX = shared.current.px * 0.3;
    const targetY = shared.current.py * -0.2;
    root.current.rotation.y += (targetX - root.current.rotation.y) * 0.04;
    root.current.rotation.x += (targetY - root.current.rotation.x) * 0.04;
  });

  return (
    <group ref={root} scale={scale}>
      {/* Open frame — large wireframe cube */}
      <group ref={frameRef} position={[0, 0, 0]}>
        <lineSegments geometry={frameEdges}>
          <lineBasicMaterial color="#00e5d4" transparent opacity={0.45} />
        </lineSegments>
        {/* Frame faces — subtle solid */}
        <mesh geometry={frameGeo}>
          <meshStandardMaterial
            color="#0b1622"
            metalness={0.9}
            roughness={0.3}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Interlocking solid — octahedron at center */}
      <group ref={solidRef} position={[0.4, -0.4, 0.2]}>
        <mesh geometry={solidGeo}>
          <meshStandardMaterial
            color="#0b1622"
            metalness={0.94}
            roughness={0.22}
            flatShading
          />
        </mesh>
        <lineSegments geometry={new THREE.EdgesGeometry(solidGeo)}>
          <lineBasicMaterial color="#b9f36b" transparent opacity={0.35} />
        </lineSegments>
      </group>

      {/* Secondary interlocking frame — rotated */}
      <group
        position={[-0.3, 0.3, -0.2]}
        rotation={[Math.PI / 6, Math.PI / 4, 0]}
      >
        <lineSegments geometry={frameEdges}>
          <lineBasicMaterial color="#929caa" transparent opacity={0.25} />
        </lineSegments>
      </group>

      {/* Small cyan accent nodes at vertices */}
      <group>
        {[
          [1, 1, 1],
          [-1, 1, -1],
          [1, -1, -1],
          [-1, -1, 1],
        ].map((pos, i) => (
          <mesh key={i}>
            <octahedronGeometry args={[0.06, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00e5d4' : '#b9f36b'}
              emissive={i % 2 === 0 ? '#00e5d4' : '#b9f36b'}
              emissiveIntensity={1.2}
              metalness={0.6}
              roughness={0.2}
            />
            <mesh
              position={[pos[0] * 0.55, pos[1] * 0.55, pos[2] * 0.55]}
            />
          </mesh>
        ))}
      </group>

      {/* Connecting thin rods */}
      <group>
        {[
          [[0, 0, 0], [0.55, 0.55, 0.55]],
          [[0, 0, 0], [-0.55, 0.55, -0.55]],
        ].map((pts, i) => (
          <mesh key={i}>
            <cylinderGeometry args={[0.01, 0.01, 1.2, 6]} />
            <meshStandardMaterial color="#00e5d4" transparent opacity={0.4} />
            <mesh position={[pts[1][0] / 2, pts[1][1] / 2, pts[1][2] / 2]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
