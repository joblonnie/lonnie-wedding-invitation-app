import { lazy, Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../hooks/useScrollProgress";

const VINE_COLOR = "#4a7c59";
const LEAF_COLOR = "#6b9e6b";

/* Growing vine that extends with scroll */
function GrowingVine({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { curve, leafPositions } = useMemo(() => {
    const points = [
      new THREE.Vector3(-2, -3, 0),
      new THREE.Vector3(-1.8, -1.5, 0.3),
      new THREE.Vector3(-1.2, 0, -0.2),
      new THREE.Vector3(-0.5, 1.5, 0.2),
      new THREE.Vector3(0.2, 2.5, 0),
      new THREE.Vector3(0.8, 3.5, -0.3),
      new THREE.Vector3(1.2, 4.5, 0.1),
    ];
    const c = new THREE.CatmullRomCurve3(points);
    const leafPosArr: { point: THREE.Vector3; t: number }[] = [];
    for (let t = 0.1; t <= 0.95; t += 0.12) {
      leafPosArr.push({ point: c.getPointAt(t), t });
    }
    return { curve: c, leafPositions: leafPosArr };
  }, []);

  const tubeGeometry = useMemo(() => {
    const visibleLength = Math.max(0.01, progress);
    const partial = new THREE.CatmullRomCurve3(
      curve.getPoints(Math.max(2, Math.floor(50 * visibleLength))).slice(0, Math.max(2, Math.floor(50 * visibleLength))),
    );
    return new THREE.TubeGeometry(partial, 32, 0.015, 8, false);
  }, [curve, progress]);

  const leafGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.03, 0.04, 0.03, 0.1, 0, 0.14);
    shape.bezierCurveTo(-0.03, 0.1, -0.03, 0.04, 0, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <group>
      <mesh ref={meshRef} geometry={tubeGeometry}>
        <meshStandardMaterial color={VINE_COLOR} />
      </mesh>
      {leafPositions.map(
        (leaf, i) =>
          leaf.t <= progress && (
            <mesh
              key={i}
              position={leaf.point}
              rotation={[0, 0, Math.random() * Math.PI - Math.PI / 2]}
              geometry={leafGeo}
              scale={0.8 + Math.random() * 0.4}
            >
              <meshStandardMaterial
                color={LEAF_COLOR}
                side={THREE.DoubleSide}
                transparent
                opacity={Math.min(1, (progress - leaf.t) * 5)}
              />
            </mesh>
          ),
      )}
    </group>
  );
}

/* Floating leaf particles that increase with scroll depth */
function ScrollParticles({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = Math.floor(20 + progress * 40);

  const { positions, speeds, offsets } = useMemo(() => {
    const maxCount = 60;
    const pos = new Float32Array(maxCount * 3);
    const spd = new Float32Array(maxCount);
    const off = new Float32Array(maxCount);

    for (let i = 0; i < maxCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = Math.random() * 10 - 3;
      pos[i * 3 + 2] = Math.random() * 2 - 1;
      spd[i] = Math.random() * 0.1 + 0.02;
      off[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, speeds: spd, offsets: off };
  }, []);

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      arr[i * 3] += Math.sin(t * 0.2 + offsets[i]) * 0.001;
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > 5) {
        arr[i * 3 + 1] = -3;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={VINE_COLOR}
        transparent
        opacity={0.3 + progress * 0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* Inner scene component */
function ScrollSceneInner() {
  const progress = useScrollProgress();

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 4, 2]} intensity={0.5} />
      <GrowingVine progress={progress} />
      <ScrollParticles progress={progress} />
    </>
  );
}

/* Exported lazy-loadable component */
function ScrollSceneCanvas() {
  if (
    typeof navigator !== "undefined" &&
    navigator.hardwareConcurrency != null &&
    navigator.hardwareConcurrency < 4
  ) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ScrollSceneInner />
      </Canvas>
    </div>
  );
}

export const ScrollScene = lazy(() =>
  Promise.resolve({ default: ScrollSceneCanvas }),
);
