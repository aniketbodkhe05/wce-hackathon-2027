import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment, Lightformer } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sculpture } from '../three/Sculptures3D';
import { MODELS } from '../three/models';
import { drive, TRACK } from '../three/scrollState';

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const damp = Math.min;

function useCinematicDirector() {
  useEffect(() => {
    const el = document.getElementById('main-content');
    const cue = gsap.timeline({
      scrollTrigger: {
        trigger: el || document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: (self) => {
          drive.p = clamp01(self.progress);
        },
      },
    });

    cue
      .to(drive, { camZ: 15.9, rimBoost: 1.15, duration: 1, ease: 'power2.inOut' })
      .to(drive, { camZ: 17.1, rimBoost: 0.96, duration: 1, ease: 'power2.inOut' })
      .to(drive, { camZ: 15.5, rimBoost: 1.2, duration: 1, ease: 'power2.inOut' })
      .to(drive, { camZ: 17.2, rimBoost: 1.0, duration: 1, ease: 'power2.inOut' })
      .to(drive, { camZ: 16.0, rimBoost: 1.12, duration: 1, ease: 'power2.inOut' })
      .to(drive, { camZ: 17.0, rimBoost: 0.98, duration: 1, ease: 'power2.inOut' })
      .to(drive, { camZ: 15.8, rimBoost: 1.16, duration: 1, ease: 'power2.inOut' })
      .to(drive, { camZ: 16.8, rimBoost: 1.0, duration: 1, ease: 'power2.inOut' });

    return () => {
      cue.scrollTrigger?.kill();
      cue.kill();
    };
  }, []);
}

/* One model placed in world space */
function Piece({ model, position, scale, iso = 0.6, yaw = 0.8, speed = 0.5, phase = 0, spin = 0.05, ampY = 0.26, rotation }) {
  const activeFrom = Math.max(0, -position[1] / TRACK - 0.04);
  return (
    <group position={position} rotation={rotation}>
      <Sculpture
        model={model}
        scale={scale}
        iso={iso}
        yaw={yaw}
        speed={speed}
        phase={phase}
        spin={spin}
        ampY={ampY}
        activeFrom={activeFrom}
      />
    </group>
  );
}

function EnvironmentRig() {
  const env = useRef();
  const rim = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();
  const mobile = size.width < 768;

  useCinematicDirector();

  useEffect(() => {
    const onPointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;
    const d = damp(delta, 0.05);
    const t = state.clock.elapsedTime;
    const p = drive.p;

    if (env.current) {
      env.current.position.y = p * TRACK;
      env.current.position.x = Math.sin(p * Math.PI * 1.4) * (mobile ? 0.3 : 0.85);
      env.current.rotation.y = p * 0.1;
    }

    camera.position.x +=
      (pointer.current.x * (mobile ? 0.35 : 0.7) + p * 0.28 - camera.position.x) *
      Math.min(1, d * 1.8);
    camera.position.y +=
      (1.6 + pointer.current.y * -0.28 - p * 0.45 - camera.position.y) * Math.min(1, d * 1.8);
    camera.position.z += (drive.camZ - camera.position.z) * Math.min(1, d * 1.4);
    camera.lookAt(0, -p * 0.4 - 0.35, -5);

    if (rim.current) {
      rim.current.intensity = 1.0 * drive.rimBoost * (0.95 + Math.sin(t * 0.35) * 0.05);
    }
  });

  return (
    <>
      {/* Fog starts well beyond the sculpture band and fades to a lifted
          tone — far models get depth, never dissolve into blackness */}
      <fog attach="fog" args={['#101623', 44, 150]} />

      {/* Cinematic dark-studio rig — cold key, violet/blue gradient fills,
          turquoise rim. Omnidirectional base lift so rotating metals never
          go black: every hemisphere keeps light + env response. */}
      <ambientLight intensity={0.55} color="#2a3a52" />
      <hemisphereLight args={['#3c4d6e', '#1a222e', 0.85]} />

      <directionalLight position={[7, 11, 7]} intensity={1.9} color="#cfdcec" />
      <directionalLight position={[5, -5, 9]} intensity={0.45} color="#4a6fd0" />
      <directionalLight position={[-8, -2, 6]} intensity={0.5} color="#7547e8" />
      <directionalLight ref={rim} position={[-5, 8, -9]} intensity={1.0} color="#7de8dc" />
      <directionalLight position={[0, 7, 11]} intensity={0.35} color="#b9f36b" />
      {/* Under/behind soft fills — cover the remaining dark hemispheres */}
      <directionalLight position={[0, -9, -7]} intensity={0.5} color="#46597c" />
      <directionalLight position={[5, 0, -11]} intensity={0.3} color="#5a4799" />

      <Environment resolution={128} frames={1}>
        {/* Gradient studio: bright chrome strip, violet-to-blue walls moving
            color across chrome/iridescent surfaces as models drift.
            Base dome lifted so shadow-facing metals always reflect light. */}
        <color attach="background" args={['#1a1d26']} />
        <Lightformer intensity={2.6} color="#cdd6e4" position={[0, 7, -8]} scale={[9, 2.6, 1]} />
        <Lightformer intensity={1.5} color="#8b79e6" position={[-7, 1, 4]} scale={[4, 8, 1]} />
        <Lightformer intensity={1.1} color="#3d5cbe" position={[7, -2, 4]} scale={[4, 8, 1]} />
        <Lightformer form="ring" intensity={0.8} color="#4dc0b4" position={[-4, -5, 6]} scale={4} />
        <Lightformer intensity={0.85} color="#3d5468" position={[0, -7, -6]} scale={[9, 6, 1]} />
        <Lightformer intensity={0.6} color="#5b6577" position={[0, -2, 11]} scale={[10, 7, 1]} />
        <Lightformer intensity={0.65} color="#49506a" position={[-9, 6, 0]} scale={[6, 6, 1]} />
        <Lightformer intensity={0.65} color="#4a4a6e" position={[9, 5, 0]} scale={[6, 6, 1]} />
      </Environment>

      <group ref={env}>
        {mobile ? (
          <>
            <Piece model={MODELS.impossibleCube} position={[0.6, 0.6, -6]} scale={0.62} phase={0.2} />
            <Piece model={MODELS.spiralTower} position={[-0.8, -11.2, -6]} scale={0.55} phase={2.1} speed={0.45} />
            <Piece model={MODELS.archBridge} position={[0.4, -22.5, -6]} scale={0.62} phase={3.4} />
            <Piece model={MODELS.trussPyramid} position={[-0.6, -33.7, -6]} scale={0.6} phase={4.8} />
            <Piece model={MODELS.nestedCage} position={[0.4, -45, -6]} scale={0.6} phase={6.1} />
            <Piece model={MODELS.stairLoop} position={[-0.4, -56.2, -6]} scale={0.58} phase={7.4} />
          </>
        ) : (
          <>
            {/* ——— HERO ——— */}
            <Piece model={MODELS.impossibleCube} position={[4.5, 0.7, -7]} scale={1.5} iso={0.55} yaw={0.7} phase={0.2} />
            <Piece model={MODELS.triPortal} position={[-3.1, 3.4, -10]} scale={0.62} iso={0.62} yaw={0.9} phase={1.3} speed={0.42} />
            <Piece model={MODELS.asymFork} position={[8.9, 3.2, -12]} scale={0.7} iso={0.58} yaw={0.5} phase={2.2} speed={0.38} />

            {/* ——— ABOUT ——— */}
            <Piece model={MODELS.spiralTower} position={[-7.5, -6.2, -6]} scale={0.9} iso={0.55} yaw={0.75} phase={2.9} />
            <Piece model={MODELS.opticalFrame} position={[8.3, -8.0, -13]} scale={0.72} iso={0.6} yaw={1.0} phase={3.6} speed={0.4} />

            {/* ——— HIGHLIGHTS ——— */}
            <Piece model={MODELS.archBridge} position={[7.5, -12.5, -6]} scale={0.88} iso={0.6} yaw={0.65} phase={4.4} />
            <Piece model={MODELS.nestedCage} position={[-8.3, -14.5, -13]} scale={0.7} iso={0.62} yaw={0.85} phase={5.1} speed={0.42} />

            {/* ——— CHALLENGES ——— */}
            <Piece model={MODELS.trussPyramid} position={[-7.2, -18.7, -6.5]} scale={0.95} iso={0.58} yaw={0.8} phase={5.9} />
            <Piece model={MODELS.stairLoop} position={[8.0, -20.6, -13]} scale={0.68} iso={0.6} yaw={0.95} phase={6.6} speed={0.4} />

            {/* ——— TIMELINE ——— */}
            <Piece model={MODELS.nestedCage} position={[7.4, -25.0, -6]} scale={0.85} iso={0.55} yaw={0.7} phase={7.3} />
            <Piece model={MODELS.triPortal} position={[-7.8, -26.8, -13]} scale={0.72} iso={0.62} yaw={0.9} phase={8.0} speed={0.38} />

            {/* ——— PRIZES ——— */}
            <Piece model={MODELS.stairLoop} position={[-7.2, -31.2, -6]} scale={0.85} iso={0.6} yaw={0.75} phase={8.7} />
            <Piece model={MODELS.opticalFrame} position={[7.8, -33.0, -13]} scale={0.68} iso={0.58} yaw={1.0} phase={9.4} speed={0.36} />

            {/* ——— SPONSORS / JOURNEY ——— */}
            <Piece model={MODELS.latticeCube} position={[7.6, -37.4, -6.5]} scale={0.82} iso={0.55} yaw={0.7} phase={10.1} />
            <Piece model={MODELS.asymFork} position={[-7.6, -43.7, -13]} scale={0.66} iso={0.6} yaw={0.85} phase={10.8} speed={0.4} />

            {/* ——— FAQ ——— */}
            <Piece model={MODELS.opticalFrame} position={[-7.4, -50.0, -6]} scale={0.8} iso={0.58} yaw={0.8} phase={11.5} />
            <Piece model={MODELS.archBridge} position={[7.4, -51.5, -13]} scale={0.62} iso={0.6} yaw={0.65} phase={12.2} speed={0.38} />

            {/* ——— FINAL CTA ——— */}
            <Piece model={MODELS.impossibleCube} position={[4.5, -56.2, -7.5]} scale={1.35} iso={0.55} yaw={0.7} phase={12.9} />
            <Piece model={MODELS.triPortal} position={[-6.8, -54.8, -12]} scale={0.58} iso={0.62} yaw={0.9} phase={13.6} speed={0.4} />
          </>
        )}
      </group>
    </>
  );
}

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export function GlobalScene() {
  const [supported] = useState(() => detectWebGL());
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onMq);
    return () => mq.removeEventListener?.('change', onMq);
  }, []);

  if (!supported) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: '#05060b',
        }}
      />
    );
  }

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none bg-[#05060b]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 17.4], fov: 44, near: 0.1, far: 130 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.22;
        }}
        performance={{ min: 0.5 }}
        frameloop={paused ? 'never' : reduced ? 'demand' : 'always'}
        style={{ background: 'transparent' }}
      >
        <EnvironmentRig />
      </Canvas>
      {/* Soft compositional vignette — grounds the sculptures and keeps
          foreground cards/headings readable (pure DOM, no render cost) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_62%,rgba(5,6,11,0.32)_100%)]" />
    </div>
  );
}
