import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MATS, validateConnectivity } from './models';
import { drive } from './scrollState';

/* Edge type index -> material + thickness (models reference these by number) */
const EDGE_TYPES = [
  { material: MATS.graphite, thickness: 0.34 },      // heavy structural
  { material: MATS.charcoal, thickness: 0.24 },      // dark framing
  { material: MATS.brushedSteel, thickness: 0.17 },  // thin brushed spines
  { material: MATS.chrome, thickness: 0.11 },        // mirror chords
  { material: MATS.iridescent, thickness: 0.16 },    // iridescent inner accents
];

/* ==================================================================
 *  CONNECTED SCULPTURE RENDERER
 *
 *  Models arrive as validated graphs (see ./models.js):
 *    vertices -> structural junctions
 *    edges    -> beams spanning two existing vertices
 *
 *  Beams are generated from their two anchor points, so both ends
 *  land exactly on a joint. Joints are placed at every vertex.
 * ================================================================== */

const X_AXIS = new THREE.Vector3(1, 0, 0);

const ASSEMBLE =
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Chamfered beam geometry ---------------- */
const BEAM_GEO = (() => {
  const r = 0.5;
  const b = 0.06;
  const shape = new THREE.Shape();
  shape.moveTo(-r, -r + b);
  shape.lineTo(-r, r - b);
  shape.quadraticCurveTo(-r, r, -r + b, r);
  shape.lineTo(r - b, r);
  shape.quadraticCurveTo(r, r, r, r - b);
  shape.lineTo(r, -r + b);
  shape.quadraticCurveTo(r, -r, r - b, -r);
  shape.lineTo(-r + b, -r);
  shape.quadraticCurveTo(-r, -r, -r, -r + b);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.9,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2,
    curveSegments: 2,
    steps: 1,
  });
  geo.center();
  return geo;
})();

const JOINT_GEO = BEAM_GEO;

function beamFrame(a, b) {
  const A = new THREE.Vector3(...a);
  const B = new THREE.Vector3(...b);
  const dir = B.clone().sub(A);
  const len = dir.length();
  dir.normalize();
  return {
    mid: A.add(B).multiplyScalar(0.5),
    quat: new THREE.Quaternion().setFromUnitVectors(X_AXIS, dir),
    dir,
    len,
  };
}

/* Beam slides in along its own axis, then locks onto both anchors */
function Beam({ a, b, thickness, material, delay = 0, activeFrom = 0 }) {
  const mesh = useRef();
  const t0 = useRef();
  const { mid, quat, dir, len } = useMemo(() => beamFrame(a, b), [a, b]);

  useFrame((state) => {
    if (!mesh.current || !ASSEMBLE || drive.p < activeFrom) return;
    if (t0.current === undefined) t0.current = state.clock.elapsedTime + delay;
    const p = Math.min(1, Math.max(0, (state.clock.elapsedTime - t0.current) / 1.5));
    const e = 1 - Math.pow(1 - p, 3);
    const slide = (1 - e) * 1.35;
    mesh.current.position.set(
      mid.x + dir.x * slide,
      mid.y + dir.y * slide,
      mid.z + dir.z * slide,
    );
    mesh.current.scale.x = len * Math.max(0.001, e);
  });

  return (
    <mesh
      ref={mesh}
      geometry={BEAM_GEO}
      material={material}
      position={mid}
      quaternion={quat}
      scale={ASSEMBLE ? [0.001, thickness, thickness] : [len, thickness, thickness]}
    />
  );
}

/* Joint block pops in after its beams land */
function Joint({ at, size, material = MATS.graphite, delay = 0, activeFrom = 0 }) {
  const mesh = useRef();
  const t0 = useRef();

  useFrame((state) => {
    if (!mesh.current || !ASSEMBLE || drive.p < activeFrom) return;
    if (t0.current === undefined) t0.current = state.clock.elapsedTime + delay;
    const p = Math.min(1, Math.max(0, (state.clock.elapsedTime - t0.current) / 0.5));
    const e = 1 - Math.pow(1 - p, 3);
    mesh.current.scale.setScalar(Math.max(0.001, size * e));
  });

  return (
    <mesh
      ref={mesh}
      geometry={JOINT_GEO}
      material={material}
      position={at}
      scale={ASSEMBLE ? 0.001 : size}
    />
  );
}

/* ---------------- Model renderer ---------------- */
export function Sculpture({
  model,
  scale = 1,
  iso = 0.62,
  yaw = 0.78,
  speed = 0.5,
  phase = 0,
  spin = 0.05,
  ampY = 0.28,
  showJoints = true,
  activeFrom = 0,
}) {
  const root = useRef();
  const { vertices, edges, joints, accents } = model;

  const ok = useMemo(() => validateConnectivity(model), [model]);

  /* Joint size derives from beam count + thickest beam at the vertex */
  const jointSize = useMemo(() => {
    const degree = new Array(vertices.length).fill(0);
    edges.forEach(([a, b]) => {
      degree[a] += 1;
      degree[b] += 1;
    });
    return vertices.map((_, i) => {
      const maxT = edges.reduce(
        (m, [a, b, t]) => (a === i || b === i ? Math.max(m, t || 0) : m),
        0,
      );
      return 0.34 + Math.min(degree[i], 6) * 0.045 + maxT * 0.06;
    });
  }, [vertices, edges]);

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    root.current.rotation.y = yaw + Math.sin(t * 0.45) * 0.18 + t * spin;
    root.current.rotation.x = -iso + Math.sin(t * 0.35) * 0.06;
    root.current.rotation.z = Math.cos(t * 0.28) * 0.03;
    root.current.position.y = Math.sin(t * 0.9) * ampY;
  });

  if (!ok) return null;

  return (
    <group ref={root} scale={scale}>
      {edges.map(([a, b, type = 0], i) => {
        const spec = EDGE_TYPES[type] || EDGE_TYPES[0];
        return (
          <Beam
            key={`e${i}`}
            a={vertices[a]}
            b={vertices[b]}
            thickness={spec.thickness}
            material={spec.material}
            delay={(i % 11) * 0.09}
            activeFrom={activeFrom}
          />
        );
      })}

      {showJoints &&
        joints.map((v, i) => (
          <Joint
            key={`j${i}`}
            at={vertices[v]}
            size={jointSize[v]}
            delay={0.45 + (i % 7) * 0.08}
            activeFrom={activeFrom}
          />
        ))}

      {accents?.map(({ v, mat = 'turquoise' }, i) => (
        <Joint
          key={`a${i}`}
          at={vertices[v]}
          size={jointSize[v] * 1.22}
          material={MATS[mat]}
          delay={0.75 + i * 0.1}
          activeFrom={activeFrom}
        />
      ))}
    </group>
  );
}
