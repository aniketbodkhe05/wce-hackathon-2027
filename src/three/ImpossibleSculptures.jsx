import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  Impossible sculptures — the site-wide background art direction.
 *
 *  Three solid, thick, interlocking forms built from real Three.js
 *  geometry (torus, tube, box, polyhedra). No wireframes, no billboards,
 *  no random sticks. Materials are shared per sculpture and animated
 *  with slow rotation, floating and depth drift.
 * ------------------------------------------------------------------ */

const NODE_GEO = new THREE.OctahedronGeometry(1, 0);

function useSculptureMaterial({ body, emissive, emissiveIntensity = 0.4, roughness = 0.24, metalness = 0.94 }) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: body,
        metalness,
        roughness,
        emissive,
        emissiveIntensity,
      }),
    [body, emissive, emissiveIntensity, roughness, metalness],
  );
}

function AccentNodes({ positions, color, scale = 0.1 }) {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 2.4,
        metalness: 0.8,
        roughness: 0.2,
      }),
    [color],
  );

  return (
    <group>
      {positions.map((position, i) => (
        <mesh
          key={i}
          geometry={NODE_GEO}
          material={material}
          position={position}
          scale={scale}
        />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  01 — Triad of interlocking solid rings (dark teal)
 * ------------------------------------------------------------------ */
export function InterlockedRings({ accent = '#27dccb' }) {
  const root = useRef();
  const rings = useRef([]);

  const ringGeo = useMemo(() => new THREE.TorusGeometry(2.05, 0.38, 22, 128), []);
  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(0.52, 1), []);

  const ringMaterial = useSculptureMaterial({
    body: '#082a2c',
    emissive: '#147268',
    emissiveIntensity: 0.5,
    roughness: 0.2,
  });

  const coreMaterial = useSculptureMaterial({
    body: '#04191c',
    emissive: accent,
    emissiveIntensity: 0.9,
    roughness: 0.12,
  });

  const rings3 = useMemo(
    () => [
      { rotation: [Math.PI / 2, 0, 0], position: [0, 0, 0], speed: 0.045, axis: 'x' },
      { rotation: [0, Math.PI / 2, 0], position: [0.34, 0.16, 0.1], speed: -0.038, axis: 'y' },
      { rotation: [Math.PI / 3.2, Math.PI / 4, Math.PI / 5], position: [-0.26, 0.22, 0.18], speed: 0.032, axis: 'z' },
    ],
    [],
  );

  useFrame((state, delta) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);

    root.current.rotation.y += d * 0.085;
    root.current.rotation.x = Math.sin(t * 0.14) * 0.16;
    root.current.rotation.z = Math.cos(t * 0.11) * 0.1;
    root.current.position.y = Math.sin(t * 0.42) * 0.34;
    root.current.position.z = Math.sin(t * 0.24) * 0.55;

    rings.current.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation[rings3[i].axis] += d * rings3[i].speed;
    });
  });

  return (
    <group ref={root}>
      {rings3.map((ring, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) rings.current[i] = el;
          }}
          geometry={ringGeo}
          material={ringMaterial}
          rotation={ring.rotation}
          position={ring.position}
        />
      ))}

      <mesh geometry={coreGeo} material={coreMaterial} />

      <AccentNodes
        color={accent}
        scale={0.115}
        positions={[
          [2.05, 0, 0],
          [-2.05, 0, 0],
          [0, 2.05, 0],
          [0, -2.05, 0],
          [0, 0, 2.05],
          [0, 0, -2.05],
        ]}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  02 — Interpenetrating solid frames (deep violet)
 * ------------------------------------------------------------------ */
function SolidFrame({ horizontalGeo, verticalGeo, material, bar = 0.46, width = 4.2, height = 3.0 }) {
  const halfW = width / 2 - bar / 2;
  const halfH = height / 2 - bar / 2;

  return (
    <group>
      <mesh geometry={horizontalGeo} material={material} position={[0, halfH, 0]} />
      <mesh geometry={horizontalGeo} material={material} position={[0, -halfH, 0]} />
      <mesh geometry={verticalGeo} material={material} position={[halfW, 0, 0]} />
      <mesh geometry={verticalGeo} material={material} position={[-halfW, 0, 0]} />
    </group>
  );
}

export function ImpossibleFrames({ accent = '#7547e8' }) {
  const root = useRef();
  const frameA = useRef();
  const frameB = useRef();
  const core = useRef();

  const bar = 0.44;
  const width = 4.2;
  const height = 3.0;

  const horizontalGeo = useMemo(
    () => new THREE.BoxGeometry(width, bar, bar, 1, 1, 1),
    [width, bar],
  );
  const verticalGeo = useMemo(
    () => new THREE.BoxGeometry(bar, height, bar, 1, 1, 1),
    [height, bar],
  );
  const coreGeo = useMemo(() => new THREE.DodecahedronGeometry(0.72, 0), []);

  const frameMaterial = useSculptureMaterial({
    body: '#1b0f38',
    emissive: '#4b2b8f',
    emissiveIntensity: 0.4,
    roughness: 0.22,
  });

  const coreMaterial = useSculptureMaterial({
    body: '#0d0720',
    emissive: accent,
    emissiveIntensity: 0.85,
    roughness: 0.14,
  });

  useFrame((state, delta) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);

    root.current.rotation.y -= d * 0.075;
    root.current.rotation.x = Math.sin(t * 0.13 + 1.4) * 0.17;
    root.current.rotation.z = Math.cos(t * 0.1) * 0.1;
    root.current.position.y = Math.sin(t * 0.37 + 1.6) * 0.32;
    root.current.position.z = Math.sin(t * 0.21 + 0.8) * 0.6;

    if (frameA.current) {
      frameA.current.rotation.z += d * 0.018;
      frameA.current.rotation.y += d * 0.012;
    }
    if (frameB.current) {
      frameB.current.rotation.z -= d * 0.016;
      frameB.current.rotation.x += d * 0.013;
    }
    if (core.current) {
      core.current.rotation.y += d * 0.22;
      core.current.rotation.x += d * 0.12;
    }
  });

  return (
    <group ref={root}>
      <group ref={frameA} rotation={[0.18, 0.06, 0.04]}>
        <SolidFrame
          horizontalGeo={horizontalGeo}
          verticalGeo={verticalGeo}
          material={frameMaterial}
          bar={bar}
          width={width}
          height={height}
        />
      </group>

      <group ref={frameB} rotation={[0.14, Math.PI / 2 + 0.1, -0.08]}>
        <SolidFrame
          horizontalGeo={horizontalGeo}
          verticalGeo={verticalGeo}
          material={frameMaterial}
          bar={bar}
          width={width}
          height={height}
        />
      </group>

      <group rotation={[0.35, 0.4, 0.1]}>
        <SolidFrame
          horizontalGeo={horizontalGeo}
          verticalGeo={verticalGeo}
          material={frameMaterial}
          bar={bar}
          width={width * 0.74}
          height={height * 0.54}
        />
      </group>

      <mesh ref={core} geometry={coreGeo} material={coreMaterial} />

      <AccentNodes
        color={accent}
        scale={0.1}
        positions={[
          [width / 2, height / 2, 0],
          [-width / 2, height / 2, 0],
          [0, height / 2, -width / 2],
          [0, -height / 2, width / 2],
        ]}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  03 — Trefoil torque with interlocking collar (electric blue)
 * ------------------------------------------------------------------ */
export function TrefoilTorque({ accent = '#315bff' }) {
  const root = useRef();
  const knot = useRef();
  const collar = useRef();
  const core = useRef();

  const knotGeo = useMemo(() => {
    const points = [];
    const samples = 220;
    for (let i = 0; i < samples; i++) {
      const t = (i / samples) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          (Math.sin(t) + 2 * Math.sin(2 * t)) * 0.78,
          (Math.cos(t) - 2 * Math.cos(2 * t)) * 0.78,
          -Math.sin(3 * t) * 1.05,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal');
    return new THREE.TubeGeometry(curve, 240, 0.33, 16, true);
  }, []);

  const collarGeo = useMemo(() => new THREE.TorusGeometry(2.35, 0.3, 20, 128), []);
  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(0.46, 1), []);

  const knotMaterial = useSculptureMaterial({
    body: '#0a1740',
    emissive: '#1d3f9e',
    emissiveIntensity: 0.45,
    roughness: 0.18,
  });

  const collarMaterial = useSculptureMaterial({
    body: '#0a1740',
    emissive: accent,
    emissiveIntensity: 0.42,
    roughness: 0.18,
  });

  const coreMaterial = useSculptureMaterial({
    body: '#07102e',
    emissive: accent,
    emissiveIntensity: 0.95,
    roughness: 0.1,
  });

  useFrame((state, delta) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);

    root.current.rotation.y += d * 0.07;
    root.current.rotation.x = Math.sin(t * 0.15 + 2.2) * 0.15;
    root.current.rotation.z = Math.cos(t * 0.12 + 0.6) * 0.1;
    root.current.position.y = Math.sin(t * 0.39 + 2.8) * 0.34;
    root.current.position.z = Math.sin(t * 0.23 + 1.9) * 0.58;

    if (knot.current) {
      knot.current.rotation.z += d * 0.03;
      knot.current.rotation.x += d * 0.014;
    }
    if (collar.current) {
      collar.current.rotation.x -= d * 0.045;
      collar.current.rotation.y += d * 0.03;
    }
    if (core.current) {
      core.current.rotation.y -= d * 0.25;
      core.current.rotation.z += d * 0.15;
    }
  });

  return (
    <group ref={root}>
      <group ref={knot}>
        <mesh geometry={knotGeo} material={knotMaterial} />
      </group>

      <group ref={collar} rotation={[Math.PI / 2.3, 0.45, 0.7]}>
        <mesh geometry={collarGeo} material={collarMaterial} />
      </group>

      <mesh ref={core} geometry={coreGeo} material={coreMaterial} />

      <AccentNodes
        color={accent}
        scale={0.105}
        positions={[
          [0.7, 2.5, 0.4],
          [-2.1, -1.15, 0.3],
          [1.7, -1.6, -0.5],
        ]}
      />
    </group>
  );
}
