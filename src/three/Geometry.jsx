import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ================================================================== *
 *  Hocus-style geometric structure library.
 *
 *  Isometric-feeling architectural constructions built from chamfered
 *  rectangular beams: impossible frames, bridges, staircases, towers,
 *  trusses and mathematical sculptures. Matte graphite materials,
 *  muted metallic greys, red endpoint markers, occasional teal /
 *  violet detail blocks. No chrome spheres, no neon.
 * ================================================================== */

const X_AXIS = new THREE.Vector3(1, 0, 0);

/* ---------- Shared matte materials (consistent site-wide) ---------- */
const GEOM_MATS = {
  /* MAIN beam surface — medium graphite grey #858B89 */
  graphite: new THREE.MeshStandardMaterial({
    color: '#858b89',
    metalness: 0.22,
    roughness: 0.42,
    envMapIntensity: 1.15,
  }),
  /* SECONDARY/side-facing strips — darker grey #686F6D (never near-black) */
  charcoal: new THREE.MeshStandardMaterial({
    color: '#686f6d',
    metalness: 0.2,
    roughness: 0.5,
    envMapIntensity: 1.0,
  }),
  /* HIGHLIGHT members — soft silver grey #B8BFBD */
  metal: new THREE.MeshStandardMaterial({
    color: '#b8bfbd',
    metalness: 0.45,
    roughness: 0.28,
    envMapIntensity: 1.3,
  }),
  /* Mid-tone grey fill for connectors and cables */
  light: new THREE.MeshStandardMaterial({
    color: '#9aa19f',
    metalness: 0.25,
    roughness: 0.36,
    envMapIntensity: 1.15,
  }),
  /* Accent components — red preserved, brightened slightly for visibility */
  red: new THREE.MeshStandardMaterial({
    color: '#e05a4f',
    emissive: '#a12a22',
    emissiveIntensity: 0.45,
    metalness: 0.2,
    roughness: 0.36,
    envMapIntensity: 1.1,
  }),
  teal: new THREE.MeshStandardMaterial({
    color: '#2bb1a4',
    emissive: '#14655d',
    emissiveIntensity: 0.55,
    metalness: 0.3,
    roughness: 0.4,
    envMapIntensity: 1.1,
  }),
  violet: new THREE.MeshStandardMaterial({
    color: '#7657c9',
    emissive: '#35205c',
    emissiveIntensity: 0.55,
    metalness: 0.3,
    roughness: 0.4,
    envMapIntensity: 1.1,
  }),
};

/* Chamfered unit beam (length along X) â€” extruded rounded profile */
const BEAM_GEO = (() => {
  const shape = new THREE.Shape();
  const r = 0.07;
  shape.moveTo(-r, -r + 0.04);
  shape.lineTo(-r, r - 0.04);
  shape.quadraticCurveTo(-r, r, -r + 0.04, r);
  shape.lineTo(r - 0.04, r);
  shape.quadraticCurveTo(r, r, r, r - 0.04);
  shape.lineTo(r, -r + 0.04);
  shape.quadraticCurveTo(r, -r, r - 0.04, -r);
  shape.lineTo(-r + 0.04, -r);
  shape.quadraticCurveTo(-r, -r, -r, -r + 0.04);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.96,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 2,
    steps: 1,
  });
  geo.center();
  return geo;
})();

const NODE_GEO = new THREE.BoxGeometry(1, 1, 1);

/* One chamfered strut between two points */
/* Beam-wide preference: assemble once on mount unless reduced motion */
const ASSEMBLE =
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Strut({ a, b, thickness = 1, material, caps = 0, capMaterial }) {
  const mesh = useRef();
  const t0 = useRef();

  const { mid, quaternion, length, delay } = useMemo(() => {
    const A = new THREE.Vector3(...a);
    const B = new THREE.Vector3(...b);
    const dir = B.clone().sub(A);
    const len = dir.length();
    dir.normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(X_AXIS, dir);
    let h = 0;
    const key = `${a}|${b}`;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 997;
    return {
      mid: A.add(B).multiplyScalar(0.5),
      quaternion: q,
      length: len,
      delay: ((h % 97) / 97) * 0.9,
    };
  }, [a, b]);

  useFrame((state) => {
    if (!mesh.current || !ASSEMBLE) return;
    if (t0.current === undefined) t0.current = state.clock.elapsedTime + delay;
    const p = Math.min(1, Math.max(0, (state.clock.elapsedTime - t0.current) / 1.15));
    const e = 1 - Math.pow(1 - p, 3);
    mesh.current.scale.x = Math.max(0.001, length * e);
  });

  return (
    <>
      <mesh
        ref={mesh}
        geometry={BEAM_GEO}
        material={material}
        position={mid}
        quaternion={quaternion}
        scale={ASSEMBLE ? [0.001, thickness, thickness] : [length, thickness, thickness]}
      />
      {caps
        ? [a, b].map((p, i) => (
            <mesh
              key={i}
              geometry={NODE_GEO}
              material={capMaterial || material}
              position={p}
              scale={thickness * 0.92}
            />
          ))
        : null}
    </>
  );
}

function Marker({ at, size = 1, material }) {
  return (
    <mesh geometry={NODE_GEO} material={material} position={at} scale={size} />
  );
}

/* Slow drift wrapper â€” gentle rotation + float, site-wide phase offset */
export function GeoFloat({ speed = 0.8, ampY = 0.3, ampX = 0.14, phase = 0, tilt = 0.5, iso = 0.62, children }) {
  const root = useRef();
  useEffect(() => {
    if (!root.current || !tilt) return;
    root.current.rotation.x = -iso;
    root.current.rotation.y = Math.PI / 4 - tilt;
  }, [iso, tilt]);

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    root.current.rotation.y = Math.PI / 4 - tilt + Math.sin(t * 0.5) * 0.22;
    root.current.rotation.x = -iso + Math.sin(t * 0.4) * 0.09;
    root.current.rotation.z = Math.cos(t * 0.33) * 0.05;
    root.current.position.y = Math.sin(t * 1.0) * ampY;
    root.current.position.x = Math.sin(t * 0.5) * ampX;
  });

  return (
    <group ref={root}>
      <group>{children}</group>
    </group>
  );
}

/* ================================================================== *
 *  STRUCTURE 01 â€” ImpossibleCage
 *  Cube frame of beams with three contradictory interior struts
 *  (Penrose-flavoured illusion) + red corner markers.
 * ================================================================== */
export function ImpossibleCage({ size = 1.6, accentCount = 4 }) {
  const inner = useRef();
  const half = size / 2;
  const corners = useMemo(() => {
    const pts = [];
    for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) pts.push([x * half, y * half, z * half]);
    return pts;
  }, [half]);

  const edges = useMemo(() => {
    const list = [];
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        const [cx, cy, cz] = corners[i].map((v, k) => Math.abs(v - corners[j][k]));
        if ((cx > 0) + (cy > 0) + (cz > 0) === 1) list.push([corners[i], corners[j]]);
      }
    }
    return list;
  }, [corners]);

  useFrame((state, delta) => {
    if (inner.current) inner.current.rotation.z += Math.min(delta, 0.05) * 0.14;
  });

  return (
    <GeoFloat speed={0.75} ampY={0.3} phase={0.4}>
      <group>
        {edges.map(([a, b], i) => (
          <Strut key={i} a={a} b={b} thickness={0.42} material={GEOM_MATS.graphite} caps />
        ))}
        {/* impossible interior loop */}
        <group ref={inner} scale={0.42}>
          <Strut a={[half - 0.1, half - 0.1, 0]} b={[-half + 0.1, half - 0.1, half + 0.35]} thickness={1.1} material={GEOM_MATS.metal} />
          <Strut a={[-half + 0.1, half - 0.1, half + 0.35]} b={[-half + 0.1, -half + 0.1, -half + 0.22]} thickness={1.1} material={GEOM_MATS.metal} />
          <Strut a={[-half + 0.1, -half + 0.1, -half + 0.22]} b={[half - 0.1, half - 0.1, 0]} thickness={1.1} material={GEOM_MATS.metal} />
        </group>
        {corners.slice(0, accentCount).map((p, i) => (
          <Marker key={i} at={p} size={0.13 * size} material={GEOM_MATS.red} />
        ))}
        <Marker at={[half, half, half]} size={0.11 * size} material={GEOM_MATS.teal} />
      </group>
    </GeoFloat>
  );
}

/* ================================================================== *
 *  STRUCTURE 02 â€” PenroseStair
 *  Impossible closed staircase loop (Escher-style), four flight runs.
 * ================================================================== */
export function PenroseStair({ size = 1.5 }) {
  const steps = useMemo(() => {
    const arr = [];
    const n = 4, per = 5;
    for (let s = 0; s < n; s++) {
      for (let i = 0; i < per; i++) {
        const k = s * per + i;
        const u = i / per;
        const h = k * 0.16 - 4 * 0.16 * 0.5;
        const leg = Math.floor(s / 2);
        if (s % 2 === 0) {
          const x = (s === 0 ? -1 : 1) * size * (0.5 - u * 0.5);
          arr.push([x * 1.8, h, (leg === 0 ? -1 : 1) * size]);
        } else {
          const z = (s === 1 ? -1 : 1) * size * (0.2 + u * 0.7);
          arr.push([(s === 1 ? -1 : 1) * size, h, z * 1.4]);
        }
      }
    }
    return arr;
  }, [size]);

  const treads = useMemo(() => {
    const list = [];
    for (let i = 0; i < steps.length; i++) {
      const a = steps[i];
      const b = steps[(i + 1) % steps.length];
      list.push({
        a: [a[0], a[1] - 0.14, a[2]],
        b: [b[0], b[1] - 0.14, b[2]],
        riser: [a[0], a[1] - 0.28, a[2]],
        riserB: [a[0], a[1], a[2]],
      });
    }
    return list;
  }, [steps]);

  return (
    <GeoFloat speed={0.85} ampY={0.3} phase={1.7} tilt={1.05} iso={0.55}>
      <group>
        {treads.map((t, i) => (
          <group key={i}>
            <Strut a={t.a} b={t.b} thickness={0.34} material={i % 5 === 0 ? GEOM_MATS.metal : GEOM_MATS.graphite} caps />
            <Strut a={[t.riser[0] - 0.06, t.riser[1] - 0.28, t.riser[2]]} b={t.riserB} thickness={0.3} material={GEOM_MATS.charcoal} />
          </group>
        ))}
        <Marker at={steps[0]} size={0.16} material={GEOM_MATS.red} />
        <Marker at={steps[Math.floor(steps.length / 2)]} size={0.16} material={GEOM_MATS.red} />
        <Marker at={[0, 0.46, 0]} size={0.2} material={GEOM_MATS.teal} />
      </group>
    </GeoFloat>
  );
}

/* ================================================================== *
 *  STRUCTURE 03 â€” BeamBridge
 *  Twin towers, suspended deck, angled support cables.
 * ================================================================== */
export function BeamBridge({ span = 4.2 }) {
  const h = 2.1;
  const towers = [-span / 2, span / 2];
  return (
    <GeoFloat speed={0.7} ampY={0.24} phase={2.9} tilt={0.4} iso={0.72}>
      <group>
        {towers.map((x, i) => (
          <group key={i}>
            <Strut a={[x, -h, 0]} b={[x, h * 0.9, 0]} thickness={0.5} material={GEOM_MATS.charcoal} caps />
            <Marker at={[x, h * 0.9, 0]} size={0.3} material={GEOM_MATS.red} />
          </group>
        ))}
        <Strut a={[-span / 2, h * 0.35, 0]} b={[span / 2, h * 0.35, 0]} thickness={0.55} material={GEOM_MATS.graphite} caps />
        <Strut a={[-span / 2, -h * 0.55, 0]} b={[span / 2, -h * 0.55, 0]} thickness={0.34} material={GEOM_MATS.metal} />
        {[-3, -1.5, 1.5, 3].map((o, i) => (
          <Strut
            key={i}
            a={[o, h * 0.35, 0]}
            b={[o * 0.5, -h * 0.55, 0]}
            thickness={0.16}
            material={GEOM_MATS.light}
          />
        ))}
        <Marker at={[span / 2, -h * 0.55, 0]} size={0.2} material={GEOM_MATS.violet} />
      </group>
    </GeoFloat>
  );
}

/* ================================================================== *
 *  STRUCTURE 04 â€” FrameworkTower
 *  Stacked shrinking frames with alternating accent blocks.
 * ================================================================== */
export function FrameworkTower({ levels = 6, base = 2.6 }) {
  const rings = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    rings.current.forEach((r, i) => {
      if (r) r.rotation.y = Math.sin(t * 0.35 + i * 0.7) * 0.16;
    });
  });

  return (
    <GeoFloat speed={0.8} ampY={0.28} phase={4.2} tilt={0.55} iso={0.6}>
      <group>
        {Array.from({ length: levels }, (_, i) => {
          const s = base * (1 - (i / levels) * 0.62);
          const y = -1.8 + (i / (levels - 1)) * 3.6;
          return (
            <group key={i} position={[0, y, 0]} ref={(el) => (rings.current[i] = el)}>
              <Strut a={[-s / 2, 0, -s / 2]} b={[s / 2, 0, -s / 2]} thickness={0.3} material={GEOM_MATS.graphite} />
              <Strut a={[-s / 2, 0, s / 2]} b={[s / 2, 0, s / 2]} thickness={0.3} material={GEOM_MATS.graphite} />
              <Strut a={[-s / 2, 0, -s / 2]} b={[-s / 2, 0, s / 2]} thickness={0.3} material={GEOM_MATS.graphite} />
              <Strut a={[s / 2, 0, -s / 2]} b={[s / 2, 0, s / 2]} thickness={0.3} material={GEOM_MATS.graphite} />
              <Marker at={[s / 2, 0, -s / 2]} size={0.14} material={i % 2 ? GEOM_MATS.red : GEOM_MATS.teal} />
            </group>
          );
        })}
        <Strut a={[0, -1.8, 0]} b={[0, 1.8, 0]} thickness={0.34} material={GEOM_MATS.charcoal} />
      </group>
    </GeoFloat>
  );
}

/* ================================================================== *
 *  STRUCTURE 05 â€” NestedFrames
 *  Three interpenetrating rectangular frames at different rotations.
 * ================================================================== */
export function NestedFrames({ scale = 1 }) {
  const build = (w, h, d, dirs) => {
    const m = GEOM_MATS;
    return (
      <group>
        {[
          [[-w / 2, h / 2, 0], [w / 2, h / 2, 0]],
          [[-w / 2, -h / 2, 0], [w / 2, -h / 2, 0]],
          [[-w / 2, h / 2, 0], [-w / 2, -h / 2, 0]],
          [[w / 2, h / 2, 0], [w / 2, -h / 2, 0]],
        ].map(([a, b], i) => (
          <Strut key={i} a={a.map((v, k) => v + (k === 2 ? d : 0) * 0)} b={b} thickness={0.3} material={(dirs[i] || 0) % 3 === 0 ? m.metal : m.graphite} />
        ))}
      </group>
    );
  };
  return (
    <GeoFloat speed={0.75} ampY={0.3} phase={5.4} tilt={0.8} iso={0.58}>
      <group scale={scale}>
        {build(2.6, 1.8, 0, [0, 1, 2, 3])}
        <group rotation={[0.35, Math.PI / 2.3, 0.2]}>{build(2.6, 1.8, 0, [1, 2, 3, 0])}</group>
        <group rotation={[-0.2, Math.PI / 3.4, -0.5]}>{build(2.0, 1.4, 0, [2, 3, 0, 1])}</group>
        <Marker at={[1.3, 0.9, 0.15]} size={0.13} material={GEOM_MATS.red} />
        <Marker at={[-1.3, -0.9, -0.15]} size={0.13} material={GEOM_MATS.red} />
      </group>
    </GeoFloat>
  );
}

/* ================================================================== *
 *  STRUCTURE 06 â€” TriadFork
 *  Base slab branching into three rising columns (asymmetrical).
 * ================================================================== */
export function TriadFork({ spread = 2.2, height = 2.6 }) {
  return (
    <GeoFloat speed={0.9} ampY={0.26} phase={6.6} tilt={0.35} iso={0.66}>
      <group>
        <Strut a={[-spread, -1, 0]} b={[spread, -1, 0]} thickness={0.55} material={GEOM_MATS.charcoal} />
        <Strut a={[-spread * 0.55, -1, 0]} b={[-height * 0.32, height * 0.72, 0.4]} thickness={0.38} material={GEOM_MATS.graphite} />
        <Strut a={[0, -1, 0]} b={[0.2, height * 0.95, -0.3]} thickness={0.38} material={GEOM_MATS.graphite} />
        <Strut a={[spread * 0.55, -1, 0]} b={[height * 0.42, height * 0.5, 0.5]} thickness={0.38} material={GEOM_MATS.graphite} />
        <Marker at={[-height * 0.32, height * 0.72, 0.4]} size={0.19} material={GEOM_MATS.red} />
        <Marker at={[0.2, height * 0.95, -0.3]} size={0.19} material={GEOM_MATS.red} />
        <Marker at={[height * 0.42, height * 0.5, 0.5]} size={0.19} material={GEOM_MATS.teal} />
        <Marker at={[-spread, -1, 0]} size={0.17} material={GEOM_MATS.metal} />
      </group>
    </GeoFloat>
  );
}

/* ================================================================== *
 *  STRUCTURE 07 â€” TrussNetwork
 *  Irregular asymmetrical truss connecting floating nodes.
 * ================================================================== */
export function TrussNetwork({ spread = 2.6 }) {
  const nodes = useMemo(
    () => [
      [-spread, 0.8, 0.4],
      [-spread * 0.35, -0.6, -0.6],
      [0.1, 1.4, -0.9],
      [spread * 0.55, -1.2, 0.5],
      [spread * 0.9, 0.5, -0.35],
      [-spread * 0.1, -1.5, 1.0],
      [spread * 0.2, 0.1, 1.2],
    ],
    [spread],
  );
  const links = useMemo(() => [
    [0, 1], [0, 2], [0, 6], [1, 3], [1, 5], [2, 4], [2, 6],
    [3, 4], [3, 5], [4, 6], [5, 6],
  ], []);

  const node = useRef();
  useFrame((state, delta) => {
    if (node.current) node.current.rotation.z += Math.min(delta, 0.05) * 0.25;
  });

  return (
    <GeoFloat speed={0.95} ampY={0.32} phase={7.7} tilt={0.62} iso={0.6}>
      <group>
        {links.map(([i, j], k) => (
          <Strut key={k} a={nodes[i]} b={nodes[j]} thickness={k % 4 === 0 ? 0.2 : 0.13} material={k % 3 === 0 ? GEOM_MATS.metal : GEOM_MATS.graphite} caps />
        ))}
        {nodes.map((p, i) => (
          <group key={i} position={p}>
            <mesh geometry={NODE_GEO} material={i % 3 === 0 ? GEOM_MATS.red : i % 3 === 1 ? GEOM_MATS.teal : GEOM_MATS.light} scale={0.16} />
          </group>
        ))}
      </group>
    </GeoFloat>
  );
}

/* ================================================================== *
 *  STRUCTURE 08 â€” CircleParadox
 *  A "circular" structure built ONLY from short straight beams â€”
 *  straight-segment polygon loop that reads as a circle but is made
 *  of rectangular architecture (keeps geometric identity, avoids the
 *  smooth torus look).
 * ================================================================== */
export function BeamPolygon({ radius = 1.7, segments = 10, twist = 0.5 }) {
  const pts = useMemo(() => {
    const arr = [];
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      arr.push([Math.cos(a) * radius, Math.sin(a) * radius * 0.92, Math.sin(a * 2) * twist]);
    }
    return arr;
  }, [radius, segments, twist]);

  const rot = useRef();
  useFrame((state, delta) => {
    if (rot.current) rot.current.rotation.z -= Math.min(delta, 0.05) * 0.1;
  });

  return (
    <GeoFloat speed={0.8} ampY={0.3} phase={8.8} tilt={1.0} iso={0.68}>
      <group ref={rot}>
        {pts.map((p, i) => (
          <group key={i}>
            <Strut a={p} b={pts[(i + 1) % segments]} thickness={0.3} material={GEOM_MATS.graphite} />
            <Strut a={p} b={pts[(i + 3) % segments]} thickness={0.13} material={i % 2 ? GEOM_MATS.charcoal : GEOM_MATS.metal} />
          </group>
        ))}
        <Marker at={pts[0]} size={0.17} material={GEOM_MATS.red} />
        <Marker at={pts[Math.floor(segments / 2)]} size={0.17} material={GEOM_MATS.red} />
      </group>
    </GeoFloat>
  );
}

/* ================================================================== *
 *  STRUCTURE 09 â€” FloatingStair
 *  Cantilevered floating steps descending through space.
 * ================================================================== */
export function FloatingStair({ steps = 8 }) {
  return (
    <GeoFloat speed={0.85} ampY={0.3} phase={9.6} tilt={0.75} iso={0.55}>
      <group>
        {Array.from({ length: steps }, (_, i) => {
          const t = i / steps;
          return (
            <group
              key={i}
              position={[-1.9 + t * 3.4, 1.6 - t * 3.2 - (i % 2) * 0.14, (i % 3 - 1) * 0.5]}
              rotation={[0, 0.3 - t * 0.6, 0]}
            >
              <Strut a={[0, 0, 0]} b={[0.95, 0, 0]} thickness={0.3} material={i % 3 === 0 ? GEOM_MATS.metal : GEOM_MATS.graphite} />
              <Strut a={[0.1, -0.26, 0]} b={[0.35, -0.26, 0]} thickness={0.24} material={GEOM_MATS.charcoal} />
              <Marker at={[0.95, 0.08, 0]} size={0.1 - t * 0.04} material={i % 4 === 0 ? GEOM_MATS.red : GEOM_MATS.teal} />
            </group>
          );
        })}
      </group>
    </GeoFloat>
  );
}

/* ================================================================== *
 *  STRUCTURE 10 â€” MonolithStack (final section anchor)
 *  Interlocked heavy frames with a single glowing accent block.
 * ================================================================== */
export function MonolithStack({ scale = 1 }) {
  const mid = useRef();
  useFrame((_, delta) => {
    if (mid.current) mid.current.rotation.y += Math.min(delta, 0.05) * 0.22;
  });
  const frame = (w, h, d, mat, key) => (
    <group key={key} rotation={d}>
      <Strut a={[-w / 2, h / 2, 0]} b={[w / 2, h / 2, 0]} thickness={0.32} material={mat} caps />
      <Strut a={[-w / 2, -h / 2, 0]} b={[w / 2, -h / 2, 0]} thickness={0.32} material={mat} caps />
      <Strut a={[-w / 2, -h / 2, 0]} b={[-w / 2, h / 2, 0]} thickness={0.32} material={mat} caps />
      <Strut a={[w / 2, -h / 2, 0]} b={[w / 2, h / 2, 0]} thickness={0.32} material={mat} caps />
    </group>
  );
  return (
    <GeoFloat speed={0.7} ampY={0.34} phase={10.7} tilt={0.45} iso={0.64}>
      <group scale={scale}>
        {frame(3.0, 2.2, [0, 0, 0], GEOM_MATS.charcoal, 'a')}
        <group ref={mid} rotation={[0.4, 0.3, 0.15]}>
          <mesh geometry={NODE_GEO} material={GEOM_MATS.teal} scale={[0.9, 0.34, 0.34]} />
        </group>
        {frame(2.4, 1.7, [0.12, Math.PI / 2, -0.35], GEOM_MATS.graphite, 'b')}
        <Marker at={[1.5, 1.1, 0]} size={0.18} material={GEOM_MATS.red} />
        <Marker at={[-1.5, -1.1, 0]} size={0.18} material={GEOM_MATS.red} />
      </group>
    </GeoFloat>
  );
}
