import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createBandGeometry(width, height, depth, segments = 8) {
  const geo = new THREE.BoxGeometry(width, height, depth, segments, segments, segments);
  const positions = geo.attributes.position;
  const newPositions = new Float32Array(positions.count * 3);
  
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    
    const distFromCenter = Math.sqrt(x * x + z * z);
    const wave = Math.sin(distFromCenter * 8 + y * 4) * 0.02;
    const twist = Math.atan2(z, x) * 0.1;
    
    newPositions[i * 3] = x + Math.cos(twist) * wave;
    newPositions[i * 3 + 1] = y + wave * 0.5;
    newPositions[i * 3 + 2] = z + Math.sin(twist) * wave;
  }
  
  geo.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
  geo.computeVertexNormals();
  return geo;
}

function createTwistedTorus(radius, tube, radialSegments, tubularSegments, twists = 1) {
  const geo = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
  const positions = geo.attributes.position;
  const newPositions = new Float32Array(positions.count * 3);
  
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    
    const angle = Math.atan2(y, x);
    const twistAmount = angle * twists;
    const cos = Math.cos(twistAmount);
    const sin = Math.sin(twistAmount);
    
    newPositions[i * 3] = x * cos - z * sin;
    newPositions[i * 3 + 1] = y;
    newPositions[i * 3 + 2] = x * sin + z * cos;
  }
  
  geo.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
  geo.computeVertexNormals();
  return geo;
}

function createMobiusStrip(radius, width, segments, twists = 1) {
  const geo = new THREE.BufferGeometry();
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  
  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    const angle = u * Math.PI * 2;
    
    for (let j = 0; j <= 4; j++) {
      const v = (j - 2) / 2 * width;
      const twist = angle * twists * 0.5;
      
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(twist);
      const sinT = Math.sin(twist);
      
      const x = (radius + v * cosT) * cosA;
      const y = (radius + v * cosT) * sinA;
      const z = v * sinT;
      
      positions.push(x, y, z);
      uvs.push(u, j / 4);
      
      const nx = cosA * cosT;
      const ny = sinA * cosT;
      const nz = sinT;
      normals.push(nx, ny, nz);
    }
  }
  
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < 4; j++) {
      const a = i * 5 + j;
      const b = i * 5 + j + 1;
      const c = ((i + 1) % (segments + 1)) * 5 + j;
      const d = ((i + 1) % (segments + 1)) * 5 + j + 1;
      
      indices.push(a, b, d);
      indices.push(d, c, a);
    }
  }
  
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function ThickTorusRing({ radius, tube, color, emissive, emissiveIntensity, rotation, ...props }) {
  const geo = useMemo(() => new THREE.TorusGeometry(radius, tube, 32, 128), [radius, tube]);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    metalness: 0.95,
    roughness: 0.15,
    emissive,
    emissiveIntensity,
  }), [color, emissive, emissiveIntensity]);
  
  return (
    <mesh
      geometry={geo}
      material={mat}
      rotation={rotation}
      castShadow
      receiveShadow
      {...props}
    />
  );
}

function InterlockingRings() {
  const ringGeo = useMemo(() => createTwistedTorus(2.5, 0.15, 16, 64, 2), []);
  const material1 = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a2e',
    metalness: 0.9,
    roughness: 0.2,
    emissive: '#7547e8',
    emissiveIntensity: 0.3,
    side: THREE.DoubleSide,
  }), []);
  const material2 = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a2e',
    metalness: 0.9,
    roughness: 0.2,
    emissive: '#315bff',
    emissiveIntensity: 0.3,
    side: THREE.DoubleSide,
  }), []);
  const material3 = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a2e',
    metalness: 0.9,
    roughness: 0.2,
    emissive: '#27dccb',
    emissiveIntensity: 0.3,
    side: THREE.DoubleSide,
  }), []);
  
  return (
    <group>
      <mesh geometry={ringGeo} material={material1} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={ringGeo} material={material2} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow />
      <mesh geometry={ringGeo} material={material3} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow />
    </group>
  );
}

export function InterlockedCore({ accent = '#7547e8' }) {
  const root = useRef();
  const inner = useRef();
  const bands = useRef([]);
  
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y += delta * 0.05;
      root.current.rotation.x = 0.15 + Math.sin(t * 0.12) * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.z -= delta * 0.03;
      inner.current.rotation.x += delta * 0.02;
    }
    bands.current.forEach((band, i) => {
      if (band && band.userData.pulse) {
        band.material.emissiveIntensity = band.userData.baseEmissive + Math.sin(t * 2 + i) * 0.3;
      }
    });
  });
  
  return (
    <group ref={root}>
      <group ref={inner}>
        <InterlockingRings />
        
        <group>
          {[
            { rot: [0, 0, 0.3], emissive: accent },
            { rot: [0, 0, -0.3], emissive: '#315bff' },
            { rot: [0.3, 0, 0], emissive: '#27dccb' },
            { rot: [0, 0.3, 0], emissive: '#7547e8' },
          ].map((b, i) => (
            <group key={i} rotation={b.rot}>
              <mesh
                ref={(el) => { if (el) bands.current.push(el); }}
                geometry={createBandGeometry(0.18, 8.5, 0.18, 16)}
                material={new THREE.MeshStandardMaterial({
                  color: '#1a1a2e',
                  metalness: 0.95,
                  roughness: 0.15,
                  emissive: b.emissive,
                  emissiveIntensity: 0.4,
                })}
                userData={{ pulse: true, baseEmissive: 0.4 }}
                position={[0, 0, 0]}
                castShadow
                receiveShadow
              />
            </group>
          ))}
        </group>
        
        <mesh
          geometry={new THREE.OctahedronGeometry(0.8, 1)}
          material={new THREE.MeshStandardMaterial({
            color: '#0d0d1a',
            metalness: 0.98,
            roughness: 0.1,
            emissive: accent,
            emissiveIntensity: 0.5,
            flatShading: true,
          })}
          castShadow
          receiveShadow
        />
        
        {[
          [3, 2, 0], [-3, -2, 0], [-3, 2, 0], [3, -2, 0],
          [0, 3, 1], [0, -3, -1], [2, 0, 2], [-2, 0, -2]
        ].map((pos, i) => (
          <mesh
            key={i}
            position={pos}
            geometry={new THREE.SphereGeometry(0.12, 16, 16)}
            material={new THREE.MeshStandardMaterial({
              color: i < 4 ? accent : '#315bff',
              emissive: i < 4 ? accent : '#315bff',
              emissiveIntensity: 2,
              metalness: 0.9,
              roughness: 0.1,
            })}
            castShadow
          />
        ))}
      </group>
    </group>
  );
}

export function ArchitecturalFrame({ accent = '#315bff' }) {
  const root = useRef();
  const floating = useRef();
  
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y -= delta * 0.035;
      root.current.rotation.z = Math.sin(t * 0.08) * 0.03;
    }
    if (floating.current) {
      floating.current.position.y = Math.sin(t * 0.5) * 0.3;
      floating.current.rotation.y += delta * 0.1;
    }
  });
  
  return (
    <group ref={root}>
      <group position={[0, -2, 0]} rotation={[0.2, 0.3, 0]}>
        <ThickTorusRing radius={2.8} tube={0.18} color="#1a1a2e" emissive={accent} emissiveIntensity={0.4} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      
      <group position={[0, 0.5, 0]} rotation={[0.3, 0.8, 0.1]}>
        <ThickTorusRing radius={2.2} tube={0.16} color="#1a1a2e" emissive="#27dccb" emissiveIntensity={0.35} rotation={[Math.PI / 2, 0.2, 0]} />
      </group>
      
      <group position={[0, 2.5, 0]} rotation={[-0.15, 1.3, 0.05]}>
        <ThickTorusRing radius={1.6} tube={0.14} color="#1a1a2e" emissive="#7547e8" emissiveIntensity={0.3} rotation={[Math.PI / 2, 0.4, 0]} />
      </group>
      
      <group ref={floating} position={[0, 4.2, 0]}>
        <mesh
          geometry={new THREE.IcosahedronGeometry(0.5, 1)}
          material={new THREE.MeshStandardMaterial({
            color: '#0d0d1a',
            metalness: 0.98,
            roughness: 0.08,
            emissive: '#27dccb',
            emissiveIntensity: 0.4,
            flatShading: true,
          })}
          castShadow
          receiveShadow
        />
      </group>
      
      {[
        [-2.8, -2, 0], [2.8, -2, 0], [-2.2, 0.5, 0], [2.2, 0.5, 0],
        [-1.6, 2.5, 0], [1.6, 2.5, 0]
      ].map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          geometry={new THREE.CylinderGeometry(0.08, 0.08, 5.5, 8, 1, true)}
          material={new THREE.MeshStandardMaterial({
            color: '#1a1a2e',
            metalness: 0.95,
            roughness: 0.15,
            emissive: i % 3 === 0 ? accent : (i % 3 === 1 ? '#27dccb' : '#7547e8'),
            emissiveIntensity: 0.5,
          })}
          rotation={[Math.PI / 2, 0, i % 2 === 0 ? 0.3 : -0.3]}
          castShadow
          receiveShadow
        />
      ))}
      
      {[
        { from: [-2.8, -2, 0], to: [0, 2.5, 0] },
        { from: [2.8, -2, 0], to: [0, 2.5, 0] },
        { from: [-2.2, 0.5, 0], to: [1.6, 2.5, 0] },
        { from: [2.2, 0.5, 0], to: [-1.6, 2.5, 0] },
      ].map((b, i) => (
        <mesh
          key={i}
          geometry={createBandGeometry(0.12, 5, 0.12, 12)}
          material={new THREE.MeshStandardMaterial({
            color: '#1a1a2e',
            metalness: 0.95,
            roughness: 0.15,
            emissive: i < 2 ? accent : '#27dccb',
            emissiveIntensity: 0.35,
          })}
          position={[
            (b.from[0] + b.to[0]) / 2,
            (b.from[1] + b.to[1]) / 2,
            (b.from[2] + b.to[2]) / 2
          ]}
          rotation={[
            0,
            0,
            Math.atan2(b.to[1] - b.from[1], b.to[0] - b.from[0])
          ]}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
}

export function OrbitalGeometry({ accent = '#27dccb' }) {
  const root = useRef();
  const rings = useRef([]);
  const cage = useRef();
  const orbitals = useRef([]);
  
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y += delta * 0.025;
      root.current.rotation.x = Math.sin(t * 0.1) * 0.08;
      root.current.position.y = Math.sin(t * 0.15) * 0.2;
    }
    rings.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += delta * (0.05 + i * 0.02);
        ring.rotation.x += delta * (0.02 + i * 0.01);
      }
    });
    if (cage.current) {
      cage.current.rotation.y += delta * 0.02;
      cage.current.rotation.x += delta * 0.015;
    }
    orbitals.current.forEach((orbital) => {
      if (orbital) {
        const config = orbital.userData;
        const angle = t * config.speed + config.phase;
        orbital.position.set(
          Math.cos(angle) * config.radius,
          Math.sin(angle * 0.7) * config.radius * 0.5,
          Math.sin(angle) * config.radius
        );
        orbital.rotation.x += delta * 1.5;
        orbital.rotation.y += delta * 1;
      }
    });
  });
  
  return (
    <group ref={root}>
      <group ref={rings}>
        <ThickTorusRing radius={3.2} tube={0.18} color="#1a1a2e" emissive="#7547e8" emissiveIntensity={0.4} rotation={[1.2, 0.3, 0]} />
        <ThickTorusRing radius={2.6} tube={0.15} color="#1a1a2e" emissive="#315bff" emissiveIntensity={0.35} rotation={[0.2, 0.6, 1.1]} />
        <ThickTorusRing radius={2.0} tube={0.12} color="#1a1a2e" emissive="#27dccb" emissiveIntensity={0.3} rotation={[1.0, 1.1, 0.4]} />
      </group>
      
      <group ref={cage} rotation={[0.3, 0.5, 0.1]}>
        <mesh
          geometry={new THREE.BoxGeometry(3, 3, 3, 4, 4, 4)}
          material={new THREE.MeshStandardMaterial({
            color: '#1a1a2e',
            metalness: 0.9,
            roughness: 0.2,
            emissive: accent,
            emissiveIntensity: 0.2,
            wireframe: true,
            transparent: true,
            opacity: 0.6,
          })}
        />
      </group>
      
      <group rotation={[0.8, 1.1, 0.3]}>
        <mesh
          geometry={createMobiusStrip(1.8, 0.4, 64, 3)}
          material={new THREE.MeshStandardMaterial({
            color: '#0d0d1a',
            metalness: 0.98,
            roughness: 0.1,
            emissive: '#7547e8',
            emissiveIntensity: 0.35,
            side: THREE.DoubleSide,
            flatShading: true,
          })}
          castShadow
          receiveShadow
        />
      </group>
      
      <mesh
        geometry={new THREE.DodecahedronGeometry(0.9, 1)}
        material={new THREE.MeshStandardMaterial({
          color: '#0d0d1a',
          metalness: 0.98,
          roughness: 0.08,
          emissive: '#103040',
          emissiveIntensity: 0.3,
          flatShading: true,
        })}
        castShadow
        receiveShadow
      />
      
      <group>
        {[
          { radius: 3.5, speed: 0.3, phase: 0, color: '#7547e8' },
          { radius: 3.0, speed: -0.25, phase: 2.1, color: '#315bff' },
          { radius: 2.4, speed: 0.2, phase: 4.2, color: '#27dccb' },
          { radius: 3.8, speed: -0.18, phase: 1.0, color: '#b9f36b' },
          { radius: 2.8, speed: 0.22, phase: 3.1, color: '#7547e8' },
          { radius: 3.3, speed: -0.22, phase: 5.2, color: '#27dccb' },
        ].map((config, i) => (
          <mesh
            key={i}
            ref={(el) => { if (el) orbitals.current.push(el); }}
            geometry={new THREE.OctahedronGeometry(0.15, 0)}
            material={new THREE.MeshStandardMaterial({
              color: config.color,
              emissive: config.color,
              emissiveIntensity: 1.8,
              metalness: 0.9,
              roughness: 0.1,
              flatShading: true,
            })}
            userData={config}
            castShadow
          />
        ))}
      </group>
    </group>
  );
}