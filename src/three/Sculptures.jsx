import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);

function Beam({
  from,
  to,
  width = 0.1,
  depth = 0.1,
  color = '#3b4560',
  metalness = 0.92,
  roughness = 0.26,
  emissive = '#000000',
  emissiveIntensity = 0,
}) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = Math.max(dir.length(), 0.0001);
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
    return { position: mid.toArray(), quaternion: quat, length: len };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion} castShadow>
      <boxGeometry args={[width, length, depth]} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

function RectFrame({ w, h, thickness = 0.12, accent = '#27dccb', accentEdges = [] }) {
  const cx = w / 2;
  const cy = h / 2;
  const p = [
    [-cx, -cy],
    [cx, -cy],
    [cx, cy],
    [-cx, cy],
  ];
  return (
    <group>
      {p.map((a, i) => {
        const b = p[(i + 1) % p.length];
        const isAccent = accentEdges.includes(i);
        return (
          <Beam
            key={i}
            from={[a[0], a[1], 0]}
            to={[b[0], b[1], 0]}
            width={isAccent ? thickness * 0.7 : thickness}
            depth={isAccent ? thickness * 0.7 : thickness}
            color={isAccent ? '#2c3448' : '#242c3d'}
            emissive={isAccent ? accent : '#0b0f18'}
            emissiveIntensity={isAccent ? 1.2 : 0}
          />
        );
      })}
    </group>
  );
}

function TriFrame({ r = 1, thickness = 0.1, accent = '#7547e8', accentEdge = 0 }) {
  const pts = [0, 1, 2].map((i) => {
    const ang = (i / 3) * Math.PI * 2 - Math.PI / 2;
    return [Math.cos(ang) * r, Math.sin(ang) * r, 0];
  });
  return (
    <group>
      {pts.map((a, i) => {
        const b = pts[(i + 1) % 3];
        return (
          <Beam
            key={i}
            from={a}
            to={b}
            width={thickness}
            depth={thickness}
            color="#414c68"
            emissive={i === accentEdge ? accent : '#0b0f18'}
            emissiveIntensity={i === accentEdge ? 1.0 : 0}
          />
        );
      })}
    </group>
  );
}

function HexFrame({ r = 1, thickness = 0.09, accent = '#315bff' }) {
  const pts = [0, 1, 2, 3, 4, 5].map((i) => {
    const ang = (i / 6) * Math.PI * 2;
    return [Math.cos(ang) * r, Math.sin(ang) * r, 0];
  });
  return (
    <group>
      {pts.map((a, i) => {
        const b = pts[(i + 1) % 6];
        const isAccent = i % 2 === 0;
        return (
          <Beam
            key={i}
            from={a}
            to={b}
            width={isAccent ? thickness * 0.8 : thickness}
            depth={isAccent ? thickness * 0.8 : thickness}
            color={isAccent ? '#3b4560' : '#242c3d'}
            emissive={isAccent ? accent : '#0b0f18'}
            emissiveIntensity={isAccent ? 0.8 : 0}
          />
        );
      })}
    </group>
  );
}

function Node({ position, size = 0.1, color = '#5c7cff', emissiveColor = '#315bff', intensity = 1.6 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={emissiveColor} emissiveIntensity={intensity} metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

/* MODEL A — Interlocked Core: Three interpenetrating rectangular frames with
   diagonal cross-braces, triangular inserts, and a central compound node.
   Impossible-looking connections, metallic depth, violet accents. */
export function InterlockedCore({ accent = '#7547e8' }) {
  const root = useRef();
  const inner = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y += delta * 0.065;
      root.current.rotation.x = 0.1 + Math.sin(t * 0.14) * 0.06;
    }
    if (inner.current) {
      inner.current.rotation.z -= delta * 0.04;
      inner.current.rotation.x += delta * 0.025;
    }
  });

  return (
    <group ref={root}>
      <group ref={inner}>
        <RectFrame w={3.5} h={2.5} thickness={0.15} accent={accent} accentEdges={[2]} />
        <group rotation={[0.35, 1.15, 0.12]}>
          <RectFrame w={2.7} h={3.3} thickness={0.14} accent="#315bff" accentEdges={[0]} />
        </group>
        <group rotation={[1.02, 0.42, 0.62]}>
          <RectFrame w={3.0} h={2.2} thickness={0.13} accent="#27dccb" accentEdges={[1, 3]} />
        </group>

        <Beam from={[-1.75, -1.25, 0]} to={[1.35, 1.65, 0.5]} width={0.09} depth={0.09} color="#4a5573" />
        <Beam from={[1.75, 1.25, 0]} to={[-1.35, -1.65, -0.5]} width={0.09} depth={0.09} color="#4a5573" />
        <Beam from={[-1.75, 1.25, 0]} to={[0.6, -1.7, 1.1]} width={0.08} depth={0.08} color="#444f6b" />
        <Beam from={[1.75, -1.25, 0]} to={[-0.6, 1.7, -1.1]} width={0.08} depth={0.08} color="#444f6b" />
        <Beam from={[-1.75, -1.25, 0]} to={[0, 0, 1.5]} width={0.07} depth={0.07} color="#5a6588" emissive={accent} emissiveIntensity={0.4} />
        <Beam from={[1.75, 1.25, 0]} to={[0, 0, -1.5]} width={0.07} depth={0.07} color="#5a6588" emissive="#315bff" emissiveIntensity={0.4} />

        <group position={[0, 0.1, 0.45]} rotation={[0.5, 0.3, 0]}>
          <TriFrame r={0.85} thickness={0.09} accent={accent} accentEdge={0} />
        </group>
        <group position={[0.2, -0.35, -0.5]} rotation={[-0.6, 0.9, 0.2]}>
          <TriFrame r={0.65} thickness={0.08} accent="#315bff" accentEdge={2} />
        </group>
        <group position={[-0.3, 0.5, -0.3]} rotation={[0.2, -0.7, 0.4]}>
          <HexFrame r={0.55} thickness={0.07} accent="#27dccb" />
        </group>

        <mesh rotation={[0.3, 0.4, 0.2]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#2a3348" metalness={0.96} roughness={0.18} emissive="#1a1030" emissiveIntensity={0.7} />
        </mesh>

        {[
          [-1.75, -1.25, 0],
          [1.75, 1.25, 0],
          [-1.75, 1.25, 0],
          [1.75, -1.25, 0],
          [1.35, 1.65, 0.5],
          [-1.35, -1.65, -0.5],
        ].map((pos, i) => (
          <Node key={i} position={pos} size={0.07} color="#7547e8" emissiveColor="#7547e8" intensity={1.8} />
        ))}
      </group>
    </group>
  );
}

/* MODEL B — Architectural Frame: Stacked, offset rectangular scaffolds with
   vertical columns, diagonal cross members, and a triangular crown.
   Industrial metallic beams, electric blue accents, dimensional depth. */
export function ArchitecturalFrame({ accent = '#315bff' }) {
  const root = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!root.current) return;
    root.current.rotation.y -= delta * 0.045;
    root.current.rotation.z = Math.sin(t * 0.1) * 0.04;
    root.current.position.y = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <group ref={root}>
      <group position={[0, -1.6, 0]} rotation={[0.15, 0.25, 0]}>
        <RectFrame w={3.6} h={2.0} thickness={0.14} accent={accent} accentEdges={[2]} />
      </group>
      <group position={[0, 0.1, 0.2]} rotation={[0.28, 0.85, 0.08]}>
        <RectFrame w={2.7} h={2.4} thickness={0.13} accent="#27dccb" accentEdges={[0, 2]} />
      </group>
      <group position={[0.15, 1.75, -0.1]} rotation={[-0.2, 1.4, 0.12]}>
        <RectFrame w={2.0} h={1.7} thickness={0.12} accent="#7547e8" accentEdges={[1]} />
      </group>

      {[-1.5, 1.5].map((x, i) => (
        <Beam
          key={`c${i}`}
          from={[x, -1.6, i === 0 ? -0.5 : 0.5]}
          to={[x * 0.55, 1.9, i === 0 ? 0.3 : -0.3]}
          width={0.1}
          depth={0.1}
          color="#46506b"
        />
      ))}

      <Beam from={[-1.7, -1.6, 0.2]} to={[1.2, 1.4, -0.5]} width={0.075} depth={0.075} color="#4c5776" />
      <Beam from={[1.7, -0.6, -0.2]} to={[-1.0, 2.0, 0.4]} width={0.075} depth={0.075} color="#4c5776" />
      <Beam from={[-1.3, 2.1, 0]} to={[1.3, 2.6, -0.2]} width={0.11} depth={0.11} color="#46506b" emissive="#27dccb" emissiveIntensity={0.9} />

      <group position={[0, 2.85, 0]} rotation={[0, 0.4, 0]}>
        <TriFrame r={0.75} thickness={0.09} accent="#27dccb" accentEdge={0} />
      </group>

      {[
        [-1.8, -1.0, 0.2],
        [1.8, -1.0, 0.2],
        [-1.35, 1.2, -0.4],
        [1.35, 1.2, -0.4],
        [0, 2.85, 0],
      ].map((pos, i) => (
        <Node key={i} position={pos} size={0.06} color="#315bff" emissiveColor="#315bff" intensity={1.7} />
      ))}

      <group position={[0, -0.8, 0]} rotation={[0, 0, 0]}>
        <HexFrame r={1.4} thickness={0.08} accent="#315bff" />
      </group>
    </group>
  );
}

/* MODEL C — Orbital Geometry: Intersecting toroidal rings with an inner
   angular cage, polygonal frame, and orbiting nodes. Unusual silhouette,
   turquoise and lime accents, complex depth. */
export function OrbitalGeometry() {
  const root = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  const cageRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y += delta * 0.05;
      root.current.rotation.x = Math.sin(t * 0.12) * 0.1;
      root.current.position.y = Math.sin(t * 0.18 + 1) * 0.18;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.1;
    if (ringB.current) ringB.current.rotation.x += delta * 0.08;
    if (ringC.current) ringC.current.rotation.y -= delta * 0.065;
    if (cageRef.current) {
      cageRef.current.rotation.y += delta * 0.03;
      cageRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={root}>
      <mesh ref={ringA} rotation={[1.35, 0.2, 0]}>
        <torusGeometry args={[2.5, 0.11, 16, 96]} />
        <meshStandardMaterial color="#46506b" metalness={0.92} roughness={0.24} emissive="#7547e8" emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={ringB} rotation={[0.2, 0.5, 1.2]}>
        <torusGeometry args={[3.0, 0.09, 16, 96]} />
        <meshStandardMaterial color="#3b4560" metalness={0.94} roughness={0.22} emissive="#315bff" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ringC} rotation={[1.1, 1.3, 0.5]}>
        <torusGeometry args={[2.1, 0.075, 16, 96]} />
        <meshStandardMaterial color="#2e3750" metalness={0.9} roughness={0.3} emissive="#27dccb" emissiveIntensity={0.55} />
      </mesh>

      <group ref={cageRef} rotation={[0.3, 0.6, 0.1]}>
        <RectFrame w={2.2} h={2.2} thickness={0.12} accent="#27dccb" accentEdges={[0, 2]} />
      </group>
      <group rotation={[0.9, 1.2, 0.4]}>
        <TriFrame r={1.2} thickness={0.1} accent="#7547e8" accentEdge={1} />
      </group>
      <group rotation={[0.5, 0.8, 0.3]}>
        <HexFrame r={1.6} thickness={0.08} accent="#27dccb" />
      </group>

      <mesh>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#2a3348" metalness={0.96} roughness={0.2} flatShading emissive="#103040" emissiveIntensity={0.4} />
      </mesh>

      {[
        [2.5, 0, 0],
        [-2.5, 0, 0],
        [0, 3.0, 0],
        [0, -2.2, 0],
        [1.8, 1.8, 0],
        [-1.8, -1.8, 0],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={i < 3 ? '#5c7cff' : '#b9f36b'} emissive={i < 3 ? '#315bff' : '#b9f36b'} emissiveIntensity={1.8} />
        </mesh>
      ))}

      <group>
        {[0, 1, 2].map((i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    Math.cos((i / 3) * Math.PI * 2) * 2.5,
                    Math.sin((i / 3) * Math.PI * 2) * 2.5,
                    0,
                    Math.cos(((i + 1) / 3) * Math.PI * 2) * 2.5,
                    Math.sin(((i + 1) / 3) * Math.PI * 2) * 2.5,
                    0,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#27dccb" transparent opacity={0.3} />
          </line>
        ))}
      </group>
    </group>
  );
}