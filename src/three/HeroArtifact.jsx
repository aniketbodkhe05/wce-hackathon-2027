import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createHeroGeometry() {
  const geo = new THREE.BufferGeometry();
  const positions = [];
  const normals = [];
  const indices = [];
  
  const rings = 3;
  const segments = 64;
  const baseRadius = 2.5;
  const tubeRadius = 0.15;
  
  for (let r = 0; r < rings; r++) {
    const radius = baseRadius - r * 0.7;
    const twist = (r + 1) * 1.5;
    
    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      const angle = u * Math.PI * 2;
      
      for (let j = 0; j <= 8; j++) {
        const v = (j - 4) / 4 * tubeRadius;
        const twistAngle = angle * twist;
        
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const cosT = Math.cos(twistAngle);
        const sinT = Math.sin(twistAngle);
        
        const x = (radius + v * cosT) * cosA;
        const y = (radius + v * cosT) * sinA;
        const z = v * sinT + (r - 1) * 0.3;
        
        positions.push(x, y, z);
        
        const nx = cosA * cosT;
        const ny = sinA * cosT;
        const nz = sinT;
        normals.push(nx, ny, nz);
      }
    }
  }
  
  const vertsPerRing = (segments + 1) * 9;
  for (let r = 0; r < rings; r++) {
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < 8; j++) {
        const a = r * vertsPerRing + i * 9 + j;
        const b = r * vertsPerRing + i * 9 + j + 1;
        const c = r * vertsPerRing + ((i + 1) % (segments + 1)) * 9 + j;
        const d = r * vertsPerRing + ((i + 1) % (segments + 1)) * 9 + j + 1;
        
        indices.push(a, b, d);
        indices.push(d, c, a);
      }
    }
  }
  
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function HeroArtifact({ shared, reducedMotion }) {
  const root = useRef();
  const coreRef = useRef();
  const bandsRef = useRef([]);
  const particlesRef = useRef();
  
  const local = useRef({ reduced: false, dx: 0, dy: 0 });
  
  useEffect(() => {
    local.current.reduced = reducedMotion;
  }, [reducedMotion]);
  
  const solidGeo = useMemo(() => createHeroGeometry(), []);
  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(0.6, 1), []);
  
  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 800;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const offsets = new Float32Array(count * 3);
    
    const rand = seededRandom(42);
    
    for (let i = 0; i < count; i++) {
      const radius = 2 + rand() * 3;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      sizes[i] = rand() * 0.04 + 0.01;
      
      const colorChoice = rand();
      if (colorChoice < 0.33) {
        colors[i * 3] = 117/255; colors[i * 3 + 1] = 71/255; colors[i * 3 + 2] = 232/255;
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 49/255; colors[i * 3 + 1] = 91/255; colors[i * 3 + 2] = 255/255;
      } else {
        colors[i * 3] = 39/255; colors[i * 3 + 1] = 220/255; colors[i * 3 + 2] = 203/255;
      }
      
      offsets[i * 3] = rand() * Math.PI * 2;
      offsets[i * 3 + 1] = rand() * 0.5 + 0.3;
      offsets[i * 3 + 2] = rand() * 0.02 + 0.01;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('offset', new THREE.BufferAttribute(offsets, 3));
    return geo;
  }, []);
  
  const particleMat = useMemo(() => new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  }), []);
  
  useFrame((state, delta) => {
    const r = root.current;
    const c = coreRef.current;
    const p = particlesRef.current;
    if (!r) return;
    
    const s = { ...shared.current, reduced: local.current.reduced };
    const t = state.clock.elapsedTime;
    const reduced = s.reduced;
    
    const entrance = reduced ? 1 : (t >= 1.6 ? 1 : 1 - Math.pow(2, -10 * t / 1.6));
    
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    const leave = progress < 0.02 ? 0 : (progress > 0.2 ? 1 : (progress - 0.02) / 0.18 * (3 - 2 * (progress - 0.02) / 0.18));
    
    if (!s.dragging && !reduced) {
      local.current.dx *= 0.94;
      local.current.dy *= 0.94;
    }
    
    const targetX = (reduced ? 0 : shared.current.px * 0.5) + (reduced ? 0 : local.current.dx);
    const targetY = (reduced ? 0 : shared.current.py * -0.35) + (reduced ? 0 : local.current.dy);
    
    r.rotation.y += (targetX + t * (reduced ? 0 : 0.04) - r.rotation.y) * 0.05;
    r.rotation.x += (targetY + Math.sin(t * 0.25) * 0.04 - r.rotation.x) * 0.05;
    
    const baseScale = 0.5 + entrance * 0.5;
    r.scale.setScalar(baseScale * (s.hover ? 1.08 : 1) * (1 - leave * 0.5));
    
    r.position.y = (1 - entrance) * 2 + Math.sin(t * 0.5) * (reduced ? 0 : 0.08) + leave * 6;
    r.position.x = leave * 8;
    r.position.z = -leave * 8;
    r.visible = leave < 0.99;
    
    if (c && !reduced) {
      c.rotation.y += delta * 0.4;
      c.rotation.x += delta * 0.2;
      c.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
      c.material.emissiveIntensity = 0.6 + Math.sin(t * 2.5) * 0.2;
    }
    
    bandsRef.current.forEach((band, i) => {
      if (band && !reduced) {
        band.rotation.y += delta * (0.02 + i * 0.01);
        band.rotation.x += delta * (0.01 + i * 0.005);
        band.material.emissiveIntensity = band.userData.baseEmissive + Math.sin(t * 1.5 + i) * 0.25;
      }
    });
    
    if (p && !reduced) {
      p.rotation.y += delta * 0.01;
      const posArray = p.geometry.attributes.position.array;
      const offsets = p.geometry.attributes.offset.array;
      
      for (let i = 0; i < posArray.length / 3; i++) {
        const off = offsets[i * 3];
        const speed = offsets[i * 3 + 1];
        const amp = offsets[i * 3 + 2];
        
        posArray[i * 3] += Math.sin(t * speed + off) * amp * 0.5;
        posArray[i * 3 + 1] += Math.cos(t * speed + off) * amp * 0.3;
        posArray[i * 3 + 2] += Math.sin(t * speed * 0.7 + off) * amp * 0.4;
      }
      p.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <group ref={root}>
      <mesh
        ref={coreRef}
        geometry={coreGeo}
        material={new THREE.MeshStandardMaterial({
          color: '#05060b',
          metalness: 0.98,
          roughness: 0.08,
          emissive: '#7547e8',
          emissiveIntensity: 0.6,
          flatShading: true,
        })}
        castShadow
        receiveShadow
      />
      <pointLight position={[0, 0, 0]} intensity={15} distance={15} decay={2} color="#7547e8" />
      
      <group>
        {[
          { rot: [0, 0, 0], color: '#7547e8', emissive: 0.4 },
          { rot: [0.5, 0.8, 0.2], color: '#315bff', emissive: 0.35 },
          { rot: [1.0, 0.3, 0.7], color: '#27dccb', emissive: 0.3 },
        ].map((config, i) => (
          <mesh
            key={i}
            ref={(el) => { if (el) bandsRef.current.push(el); }}
            geometry={solidGeo}
            material={new THREE.MeshStandardMaterial({
              color: '#0a0a15',
              metalness: 0.95,
              roughness: 0.15,
              emissive: config.color,
              emissiveIntensity: config.emissive,
              side: THREE.DoubleSide,
            })}
            rotation={config.rot}
            userData={{ baseEmissive: config.emissive }}
            castShadow
            receiveShadow
          />
        ))}
      </group>
      
      <points
        ref={particlesRef}
        geometry={particleGeo}
        material={particleMat}
      />
      
      <mesh
        geometry={new THREE.SphereGeometry(3.5, 32, 32)}
        material={new THREE.MeshStandardMaterial({
          color: '#05060b',
          metalness: 0.1,
          roughness: 0.9,
          transparent: true,
          opacity: 0.03,
          side: THREE.BackSide,
          depthWrite: false,
        })}
      />
    </group>
  );
}