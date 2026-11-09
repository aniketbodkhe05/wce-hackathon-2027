import * as THREE from 'three';

/* ----------------------------------------------------------------------
 *  MATERIAL LIBRARY — art-directed studio palette
 *  Direction: dark cinematic metal (graphite + chrome) with a controlled
 *  accent system. Violet/electric-blue are the dominant color notes,
 *  turquoise is a controlled secondary, lime is a rare compositional pop.
 *  All color comes from light response (env + rig), never flat diffuse.
 * -------------------------------------------------------------------- */
export const MATS = {
  /* Gunmetal: mid-bright metal — shading stays visible at every angle */
  graphite: new THREE.MeshStandardMaterial({
    color: '#4f5a68',
    metalness: 0.35,
    roughness: 0.42,
    envMapIntensity: 1.35,
  }),

  /* Charcoal steel: secondary framing, dark but never black */
  charcoal: new THREE.MeshStandardMaterial({
    color: '#404b5a',
    metalness: 0.3,
    roughness: 0.5,
    envMapIntensity: 1.3,
  }),

  /* Brushed silver: secondary spines / thin structure */
  brushedSteel: new THREE.MeshStandardMaterial({
    color: '#939fae',
    metalness: 1.0,
    roughness: 0.32,
    envMapIntensity: 1.45,
  }),

  /* Chrome: highlight spines — mirror-like, traceable gradients via env */
  chrome: new THREE.MeshStandardMaterial({
    color: '#c9d3dd',
    metalness: 1.0,
    roughness: 0.11,
    envMapIntensity: 1.55,
  }),

  /* Iridescent chrome: violet/blue sheen over polished metal */
  iridescent: new THREE.MeshPhysicalMaterial({
    color: '#dde5ea',
    metalness: 0.7,
    roughness: 0.13,
    iridescence: 0.95,
    iridescenceIOR: 1.55,
    iridescenceThicknessRange: [100, 480],
    envMapIntensity: 1.5,
  }),

  /*glass-like accents */
  glassViolet: new THREE.MeshPhysicalMaterial({
    color: '#8f7ae0',
    emissive: '#3b22a8',
    emissiveIntensity: 0.5,
    metalness: 0.25,
    roughness: 0.12,
    transmission: 0.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.35,
  }),
  glassBlue: new THREE.MeshPhysicalMaterial({
    color: '#5f8cff',
    emissive: '#123f9c',
    emissiveIntensity: 0.55,
    metalness: 0.25,
    roughness: 0.14,
    clearcoat: 0.8,
    clearcoatRoughness: 0.18,
    envMapIntensity: 1.35,
  }),

  /* Controlled turquoise secondary accent */
  turquoise: new THREE.MeshStandardMaterial({
    color: '#27dccb',
    emissive: '#0b6a60',
    emissiveIntensity: 0.5,
    metalness: 0.55,
    roughness: 0.26,
    envMapIntensity: 1.25,
  }),

  /* Rare compositional pop — lime, only one highlight per scene */
  lime: new THREE.MeshStandardMaterial({
    color: '#b9f36b',
    emissive: '#557c26',
    emissiveIntensity: 0.45,
    metalness: 0.45,
    roughness: 0.32,
    envMapIntensity: 1.2,
  }),

  /* --- legacy keys mapped onto the new palette (compat) --- */
  red: new THREE.MeshStandardMaterial({
    color: '#8f7ae0',
    emissive: '#3b22a8',
    emissiveIntensity: 0.5,
    metalness: 0.25,
    roughness: 0.12,
  }),
  cyan: new THREE.MeshStandardMaterial({
    color: '#5f8cff',
    emissive: '#123f9c',
    emissiveIntensity: 0.55,
    metalness: 0.25,
    roughness: 0.14,
  }),
  aluminium: new THREE.MeshStandardMaterial({
    color: '#939fae',
    metalness: 1.0,
    roughness: 0.32,
    envMapIntensity: 1.25,
  }),
  silver: new THREE.MeshStandardMaterial({
    color: '#c9d3dd',
    metalness: 1.0,
    roughness: 0.11,
    envMapIntensity: 1.55,
  }),
};

/* ---------------- Graph validation ---------------- */
export function validateConnectivity(model, name = 'sculpture') {
  const { vertices, edges } = model;
  const problems = [];

  if (!vertices?.length) problems.push('no vertices');

  const seen = new Set();
  edges.forEach(([a, b], i) => {
    if (!vertices[a]) problems.push(`edge ${i} start vertex ${a} missing`);
    if (!vertices[b]) problems.push(`edge ${i} end vertex ${b} missing`);
    if (a === b) problems.push(`edge ${i} is zero-length`);
    seen.add(a);
    seen.add(b);
  });

  vertices.forEach((_, i) => {
    if (!seen.has(i)) problems.push(`vertex ${i} is not connected to any beam`);
  });

  if (edges.length) {
    const adj = vertices.map(() => []);
    edges.forEach(([a, b]) => {
      if (adj[a] && adj[b]) {
        adj[a].push(b);
        adj[b].push(a);
      }
    });
    const visited = new Set([0]);
    const queue = [0];
    while (queue.length) {
      const v = queue.pop();
      for (const n of adj[v]) {
        if (!visited.has(n)) {
          visited.add(n);
          queue.push(n);
        }
      }
    }
    if (visited.size !== vertices.length) {
      problems.push(`disconnected: ${visited.size}/${vertices.length} vertices reachable`);
    }
  }

  if (problems.length && import.meta.env.DEV) {
    console.error(`[sculpture:${name}] ${problems.join('; ')}`);
  }
  return problems.length === 0;
}

/* ==================================================================
 *  MODEL LIBRARY — each entry is one complete connected structure
 * ================================================================== */

/* 1. Impossible cube: full cube frame + centre junction + through
 *    diagonals that meet at the centre vertex (real intersections). */
const impossibleCube = (() => {
  const v = [];
  for (const x of [-1.15, 1.15]) for (const y of [-1.15, 1.15]) for (const z of [-1.15, 1.15]) v.push([x, y, z]);
  const idx = (x, y, z) => (x ? 4 : 0) + (y ? 2 : 0) + (z ? 1 : 0);
  v.push([0, 0, 0]); // centre junction = 8
  const edges = [];
  const add = (a, b, t) => edges.push([a, b, t]);
  for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) add(idx(x, y, 0), idx(x, y, 1), 0);
  for (let x = 0; x < 2; x++) for (let z = 0; z < 2; z++) add(idx(x, 0, z), idx(x, 1, z), 0);
  for (let y = 0; y < 2; y++) for (let z = 0; z < 2; z++) add(idx(0, y, z), idx(1, y, z), 0);
  add(8, idx(0, 0, 0), 2);
  add(8, idx(1, 0, 1), 2);
  add(8, idx(0, 1, 1), 2);
  add(8, idx(1, 1, 0), 2);
  return {
    vertices: v,
    edges,
    joints: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    accents: [{ v: 0, mat: 'chrome' }, { v: 3, mat: 'iridescent' }, { v: 5, mat: 'turquoise' }, { v: 6, mat: 'red' }],
  };
})();

/* 2. Triangular portal: outer triangle, offset inner triangle and
 *    three connectors — one rigid triangular sculpture. */
const triPortal = (() => {
  const outer = [[0, 1.65, 0], [-1.55, -1.05, 0], [1.55, -1.05, 0]];
  const inner = outer.map(([x, y, z]) => [x * 0.55, y * 0.55 + 0.18, z + 0.85]);
  const v = [...outer, ...inner];
  const edges = [
    [0, 1, 0], [1, 2, 0], [2, 0, 0],
    [3, 4, 1], [4, 5, 1], [5, 3, 1],
    [0, 3, 2], [1, 4, 2], [2, 5, 2],
  ];
  return {
    vertices: v,
    edges,
    joints: [0, 1, 2, 3, 4, 5],
    accents: [{ v: 0, mat: 'iridescent' }, { v: 1, mat: 'red' }, { v: 2, mat: 'turquoise' }],
  };
})();

/* 3. Arch bridge: deck chain, two towers anchored to deck nodes,
 *    cross-braced towers and cables running tower-top -> deck. */
const archBridge = (() => {
  const v = [
    [-2.3, 0, 0], [-1.5, 0, 0], [-0.55, 0, 0],
    [0.55, 0, 0], [1.5, 0, 0], [2.3, 0, 0],
    [-1.5, 1.75, 0], [1.5, 1.75, 0],
    [0, 2.05, 0],
  ];
  const edges = [
    [0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 4, 0], [4, 5, 0],
    [1, 6, 0], [4, 7, 0], [6, 8, 1], [7, 8, 1],
    [6, 0, 3], [6, 2, 3], [7, 3, 3], [7, 5, 3],
    [1, 2, 2], [4, 3, 2],
  ];
  return {
    vertices: v,
    edges,
    joints: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    accents: [{ v: 6, mat: 'red' }, { v: 7, mat: 'chrome' }, { v: 8, mat: 'cyan' }],
  };
})();

/* 4. Spiral tower: a central mast with five progressively rotated
 *    square frames, each spoked into the mast. */
const spiralTower = (() => {
  const v = [[0, -2.2, 0]];
  const edges = [];
  const levels = 5;
  const mastIndex = [];
  for (let i = 0; i < levels; i++) {
    const y = -1.7 + i * 0.85;
    v.push([0, y, 0]);
    mastIndex.push(v.length - 1);
  }
  v.push([0, 2.2, 0]);
  const topMast = v.length - 1;
  for (let i = 0; i < levels; i++) {
    edges.push([i === 0 ? 0 : mastIndex[i - 1], mastIndex[i], 0]);
  }
  edges.push([mastIndex[levels - 1], topMast, 0]);

  const frameIdx = [];
  for (let i = 0; i < levels; i++) {
    const y = -1.7 + i * 0.85;
    const s = 1.45 - i * 0.12;
    const a = (i * Math.PI) / 9;
    const corners = [];
    for (let k = 0; k < 4; k++) {
      const ang = a + (k * Math.PI) / 2 + Math.PI / 4;
      v.push([Math.cos(ang) * s * 1.05, y, Math.sin(ang) * s * 1.05]);
      corners.push(v.length - 1);
    }
    frameIdx.push(corners);
    for (let k = 0; k < 4; k++) edges.push([corners[k], corners[(k + 1) % 4], 1]);
    edges.push([corners[0], mastIndex[i], 2]);
    edges.push([corners[2], mastIndex[i], 2]);
  }
  return {
    vertices: v,
    edges,
    joints: [...mastIndex, topMast, ...frameIdx.flat()],
    accents: [
      { v: frameIdx[0][0], mat: 'iridescent' },
      { v: frameIdx[4][1], mat: 'red' },
      { v: topMast, mat: 'lime' },
    ],
  };
})();

/* 5. Nested cage: an outer cube and an inner cube tied by four
 *    corner spokes, so both frames are one rigid body. */
const nestedCage = (() => {
  const cube = (h) => {
    const pts = [];
    for (const x of [-h, h]) for (const y of [-h, h]) for (const z of [-h, h]) pts.push([x, y, z]);
    return pts;
  };
  const outer = cube(1.35);
  const inner = cube(0.62);
  const v = [...outer, ...inner];
  const edges = [];
  const idx = (x, y, z) => (x ? 4 : 0) + (y ? 2 : 0) + (z ? 1 : 0);
  for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) edges.push([idx(x, y, 0), idx(x, y, 1), 0]);
  for (let x = 0; x < 2; x++) for (let z = 0; z < 2; z++) edges.push([idx(x, 0, z), idx(x, 1, z), 0]);
  for (let y = 0; y < 2; y++) for (let z = 0; z < 2; z++) edges.push([idx(0, y, z), idx(1, y, z), 0]);
  for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) edges.push([8 + idx(x, y, 0), 8 + idx(x, y, 1), 1]);
  for (let x = 0; x < 2; x++) for (let z = 0; z < 2; z++) edges.push([8 + idx(x, 0, z), 8 + idx(x, 1, z), 1]);
  for (let y = 0; y < 2; y++) for (let z = 0; z < 2; z++) edges.push([8 + idx(0, y, z), 8 + idx(1, y, z), 1]);
  edges.push([idx(0, 0, 0), 8 + idx(0, 0, 0), 2]);
  edges.push([idx(1, 0, 1), 8 + idx(1, 0, 1), 2]);
  edges.push([idx(0, 1, 1), 8 + idx(0, 1, 1), 2]);
  edges.push([idx(1, 1, 0), 8 + idx(1, 1, 0), 2]);
  return {
    vertices: v,
    edges,
    joints: v.map((_, i) => i),
    accents: [{ v: idx(0, 0, 0), mat: 'turquoise' }, { v: idx(1, 1, 1), mat: 'cyan' }],
  };
})();

/* 6. Truss pyramid: square base triangulated through edge midpoints
 *    into a single apex — every beam ends at a shared junction. */
const trussPyramid = (() => {
  const v = [
    [-1.45, -1.1, -1.45], [1.45, -1.1, -1.45], [1.45, -1.1, 1.45], [-1.45, -1.1, 1.45],
    [0, -1.1, -1.45], [1.45, -1.1, 0], [0, -1.1, 1.45], [-1.45, -1.1, 0],
    [0, 1.55, 0],
  ];
  const edges = [
    [0, 4, 0], [4, 1, 0], [1, 5, 0], [5, 2, 0],
    [2, 6, 0], [6, 3, 0], [3, 7, 0], [7, 0, 0],
    [0, 8, 1], [1, 8, 1], [2, 8, 1], [3, 8, 1],
    [4, 8, 3], [5, 8, 3], [6, 8, 3], [7, 8, 3],
  ];
  return {
    vertices: v,
    edges,
    joints: v.map((_, i) => i),
    accents: [{ v: 8, mat: 'red' }, { v: 0, mat: 'chrome' }, { v: 2, mat: 'iridescent' }],
  };
})();

/* 7. Stair loop: closed staircase ring braced back to a central
 *    hub so the treads and hub form one connected sculpture. */
const stairLoop = (() => {
  const v = [];
  const n = 8;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    v.push([Math.cos(a) * 1.55, ((i % 4) - 1.5) * 0.34, Math.sin(a) * 1.55]);
  }
  v.push([0, 0.1, 0]);
  const hub = v.length - 1;
  const edges = [];
  for (let i = 0; i < n; i++) edges.push([i, (i + 1) % n, 0]);
  for (let i = 0; i < n; i++) edges.push([i, hub, 2]);
  return {
    vertices: v,
    edges,
    joints: v.map((_, i) => i),
    accents: [{ v: 0 }, { v: 4, mat: 'lime' }],
  };
})();

/* 8. Asymmetric fork: a base beam branching into three rising
 *    columns, the outer pair cross-braced. */
const asymFork = (() => {
  const v = [
    [-1.85, -1.15, 0], [0, -1.15, 0], [1.85, -1.15, 0],
    [-1.25, 1.35, 0.45], [0.2, 1.95, -0.35], [1.5, 1.05, 0.55],
  ];
  const edges = [
    [0, 1, 0], [1, 2, 0],
    [0, 3, 0], [1, 4, 0], [2, 5, 0],
    [3, 5, 2], [3, 4, 1], [4, 5, 1],
  ];
  return {
    vertices: v,
    edges,
    joints: [0, 1, 2, 3, 4, 5],
    accents: [{ v: 3, mat: 'chrome' }, { v: 4, mat: 'red' }, { v: 5, mat: 'turquoise' }],
  };
})();

/* 9. Lattice cube: two horizontal grids joined by vertical posts
 *    and face diagonals — a fully connected architectural volume. */
const latticeCube = (() => {
  const coords = [-1.2, 0, 1.2];
  const v = [];
  const at = {};
  for (let zi = 0; zi < 2; zi++) {
    const z = zi ? 0.8 : -0.8;
    for (let xi = 0; xi < 3; xi++) {
      for (let yi = 0; yi < 3; yi++) {
        at[`${xi},${yi},${zi}`] = v.length;
        v.push([coords[xi], coords[yi], z]);
      }
    }
  }
  const edges = [];
  for (let zi = 0; zi < 2; zi++) {
    for (let yi = 0; yi < 3; yi++) {
      for (let xi = 0; xi < 2; xi++) edges.push([at[`${xi},${yi},${zi}`], at[`${xi + 1},${yi},${zi}`], 0]);
    }
    for (let xi = 0; xi < 3; xi++) {
      for (let yi = 0; yi < 2; yi++) edges.push([at[`${xi},${yi},${zi}`], at[`${xi},${yi + 1},${zi}`], 0]);
    }
  }
  for (let xi = 0; xi < 3; xi++) {
    for (let yi = 0; yi < 3; yi++) edges.push([at[`${xi},${yi},0`], at[`${xi},${yi},1`], 1]);
  }
  edges.push([at['0,0,0'], at['1,1,1'], 3]);
  edges.push([at['2,0,0'], at['1,1,1'], 3]);
  edges.push([at['0,2,1'], at['1,1,0'], 3]);
  edges.push([at['2,2,1'], at['1,1,0'], 3]);
  return {
    vertices: v,
    edges,
    joints: v.map((_, i) => i),
    accents: [{ v: at['0,0,0'], mat: 'iridescent' }, { v: at['2,2,1'], mat: 'cyan' }],
  };
})();

/* 10. Optical frame: rectangle with diagonals that genuinely meet at
 *     a shared centre junction, plus iridescent inner chords. */
const opticalFrame = (() => {
  const v = [
    [-1.7, 1.15, 0], [1.7, 1.15, 0], [1.7, -1.15, 0], [-1.7, -1.15, 0],
    [0, 0, 0],
    [0, 0.95, 0.55], [0, -0.95, 0.55],
  ];
  const edges = [
    [0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0],
    [0, 4, 2], [4, 2, 2], [1, 4, 2], [4, 3, 2],
    [5, 6, 4], [5, 0, 3], [5, 1, 3], [6, 2, 3], [6, 3, 3],
  ];
  return {
    vertices: v,
    edges,
    joints: v.map((_, i) => i),
    accents: [{ v: 0, mat: 'red' }, { v: 2, mat: 'chrome' }, { v: 4, mat: 'iridescent' }],
  };
})();

export const MODELS = {
  impossibleCube,
  triPortal,
  archBridge,
  spiralTower,
  nestedCage,
  trussPyramid,
  stairLoop,
  asymFork,
  latticeCube,
  opticalFrame,
};

/* Dev-time report for every model */
if (import.meta.env.DEV) {
  Object.entries(MODELS).forEach(([name, model]) => {
    const ok = validateConnectivity(model, name);
    if (ok) console.info(`[sculpture:${name}] connected graph OK — ${model.vertices.length} joints / ${model.edges.length} beams`);
  });
}
