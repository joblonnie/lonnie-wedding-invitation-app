import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 70;
const COLORS = ["#7daa8a", "#ffffff", "#c4a96a"];

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    const spd = new Float32Array(PARTICLE_COUNT);
    const off = new Float32Array(PARTICLE_COUNT);

    const color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6; // x: [-3, 3]
      pos[i * 3 + 1] = Math.random() * 3.5 - 1; // y: [-1, 2.5]
      pos[i * 3 + 2] = Math.random() * 3 - 2; // z: [-2, 1]

      color.set(COLORS[i % COLORS.length]);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sz[i] = Math.random() * 0.03 + 0.02;
      spd[i] = Math.random() * 0.15 + 0.05;
      off[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, colors: col, sizes: sz, speeds: spd, offsets: off };
  }, []);

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] += Math.sin(t * 0.3 + offsets[i]) * 0.002;
      arr[i * 3 + 1] += speeds[i] * delta;

      if (arr[i * 3 + 1] > 2.5) {
        arr[i * 3 + 1] = -1;
        arr[i * 3] = (Math.random() - 0.5) * 6;
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
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
