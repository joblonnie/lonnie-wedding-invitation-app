import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Single petal using LatheGeometry */
function Petal({
  rotation,
  color,
}: {
  rotation: [number, number, number];
  color: string;
}) {
  const petalShape = useMemo(() => {
    const points = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.04, 0.02),
      new THREE.Vector2(0.06, 0.06),
      new THREE.Vector2(0.05, 0.1),
      new THREE.Vector2(0.03, 0.14),
      new THREE.Vector2(0, 0.16),
    ];
    return new THREE.LatheGeometry(points, 8, 0, Math.PI * 2);
  }, []);

  return (
    <mesh rotation={rotation} geometry={petalShape}>
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/* Full flower with 5 petals */
function Flower({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z =
        Math.sin(clock.getElapsedTime() * 0.5 + position[0] * 2) * 0.08;
      groupRef.current.rotation.x =
        Math.cos(clock.getElapsedTime() * 0.3 + position[1] * 3) * 0.05;
    }
  });

  const petals = useMemo(() => {
    const count = 5;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return [angle, Math.PI / 3, 0] as [number, number, number];
    });
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {petals.map((rot, i) => (
        <Petal key={i} rotation={rot} color={color} />
      ))}
      {/* Center stamen */}
      <mesh>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="#f5e6a3" />
      </mesh>
    </group>
  );
}

/* Leaf using ShapeGeometry */
function Leaf({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const leafRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.04, 0.06, 0.04, 0.14, 0, 0.2);
    shape.bezierCurveTo(-0.04, 0.14, -0.04, 0.06, 0, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  useFrame(({ clock }) => {
    if (leafRef.current) {
      leafRef.current.rotation.z =
        rotation[2] + Math.sin(clock.getElapsedTime() * 0.7 + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={leafRef} position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <meshStandardMaterial color="#6b9e6b" side={THREE.DoubleSide} />
    </mesh>
  );
}

/* Full arch scene */
export function FloralScene({ visible = true }: { visible?: boolean }) {
  if (!visible) return null;

  const archFlowers = useMemo(() => {
    const count = 7;
    const flowers: {
      pos: [number, number, number];
      color: string;
      scale: number;
    }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / (count - 1)) * Math.PI;
      const radius = 1.6;
      const x = Math.cos(angle) * radius;
      const y = 1.6 + Math.sin(angle) * 0.5;
      const z = -0.3 + (Math.random() - 0.5) * 0.2;
      const colors = ["#ffffff", "#fce4ec", "#f8bbd0", "#e8f5e9", "#fff8e1"];
      flowers.push({
        pos: [x, y, z],
        color: colors[i % colors.length],
        scale: 0.8 + Math.random() * 0.4,
      });
    }
    return flowers;
  }, []);

  const archLeaves = useMemo(() => {
    const leaves: {
      pos: [number, number, number];
      rot: [number, number, number];
      scale: number;
    }[] = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i / 9) * Math.PI;
      const radius = 1.7;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
      const y = 1.5 + Math.sin(angle) * 0.5 - Math.random() * 0.2;
      leaves.push({
        pos: [x, y, -0.2],
        rot: [0, 0, angle - Math.PI / 2 + (Math.random() - 0.5) * 0.5],
        scale: 1.5 + Math.random() * 1,
      });
    }
    return leaves;
  }, []);

  return (
    <group>
      {archFlowers.map((f, i) => (
        <Flower key={`f-${i}`} position={f.pos} color={f.color} scale={f.scale} />
      ))}
      {archLeaves.map((l, i) => (
        <Leaf key={`l-${i}`} position={l.pos} rotation={l.rot} scale={l.scale} />
      ))}
    </group>
  );
}
