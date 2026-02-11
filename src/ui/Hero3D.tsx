import { Suspense, useRef, useMemo, useEffect, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { heroContainer } from "./Hero3D.css";
import { FloralScene } from "./three/FloralScene";
import { ParticleField } from "./three/ParticleField";

/* ── GLB Model Character ── */
function GLBCharacter({
  url,
  position,
  scale = 1,
  flipX = false,
}: {
  url: string;
  position: [number, number, number];
  scale?: number;
  flipX?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const { actions } = useAnimations(animations, groupRef);
  const initialY = position[1];

  useEffect(() => {
    const names = Object.keys(actions);
    if (names.length > 0) {
      actions[names[0]]?.reset().fadeIn(0.3).play();
    }
  }, [actions]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        initialY + Math.sin(clock.getElapsedTime() * 1.2) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={flipX ? [-scale, scale, scale] : scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* ── Error Boundary for graceful fallback ── */
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── Primitive fallback characters (improved) ── */
function SmileCurve({ position, width = 0.12 }: { position: [number, number, number]; width?: number }) {
  const lineObj = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, width, width * 0.5, Math.PI * 0.1, Math.PI * 0.9, false, 0);
    const points = curve.getPoints(24);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "#6b4c3b" });
    const line = new THREE.Line(geometry, material);
    line.rotation.set(0, 0, Math.PI);
    return line;
  }, [width]);
  return <primitive object={lineObj} position={position} />;
}

function FallbackCharacter({
  position,
  isGroom,
}: {
  position: [number, number, number];
  isGroom: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const upperBodyRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  const headColor = isGroom ? "#fce4c8" : "#fde8d8";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = initialY + Math.sin(t * 1.2) * 0.03;
    }
    if (upperBodyRef.current) {
      upperBodyRef.current.rotation.x = Math.sin(t * 0.8) * 0.06;
      // Breathing: subtle Y scale change
      const breathe = 1 + Math.sin(t * 1.5) * 0.015;
      upperBodyRef.current.scale.y = breathe;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <group ref={upperBodyRef}>
        {/* Head */}
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.36, 32, 32]} />
          <meshPhysicalMaterial color={headColor} roughness={0.5} clearcoat={0.3} />
        </mesh>
        {/* Hair cap */}
        <mesh position={[0, 0.88, 0]}>
          <sphereGeometry args={[0.34, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshPhysicalMaterial color={isGroom ? "#2a1a0e" : "#3d2010"} roughness={0.5} clearcoat={0.3} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.11, 0.75, 0.35]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.11, 0.75, 0.35]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Cheeks */}
        <mesh position={[-0.20, 0.64, 0.25]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#ffaaaa" transparent opacity={0.35} />
        </mesh>
        <mesh position={[0.20, 0.64, 0.25]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#ffaaaa" transparent opacity={0.35} />
        </mesh>
        <SmileCurve position={[0, 0.60, 0.33]} width={0.09} />

        {/* Body */}
        {isGroom ? (
          /* Groom: suit body (capsule) + bowtie */
          <>
            <mesh position={[0, 0.12, 0]}>
              <capsuleGeometry args={[0.2, 0.28, 8, 16]} />
              <meshPhysicalMaterial color="#1c2833" roughness={0.5} clearcoat={0.3} />
            </mesh>
            {/* Bowtie */}
            <group position={[0, 0.35, 0.19]}>
              <mesh position={[-0.025, 0, 0]} rotation={[0, 0, 0.3]}>
                <boxGeometry args={[0.05, 0.02, 0.015]} />
                <meshStandardMaterial color="#8b0000" />
              </mesh>
              <mesh position={[0.025, 0, 0]} rotation={[0, 0, -0.3]}>
                <boxGeometry args={[0.05, 0.02, 0.015]} />
                <meshStandardMaterial color="#8b0000" />
              </mesh>
              <mesh>
                <sphereGeometry args={[0.01, 8, 8]} />
                <meshStandardMaterial color="#8b0000" />
              </mesh>
            </group>
          </>
        ) : (
          /* Bride: cone dress + translucent veil */
          <>
            <mesh position={[0, -0.02, 0]}>
              <coneGeometry args={[0.32, 0.6, 16]} />
              <meshPhysicalMaterial
                color="#fff8fa"
                roughness={0.5}
                clearcoat={0.3}
              />
            </mesh>
            {/* Veil */}
            <mesh position={[0, 0.92, -0.1]}>
              <planeGeometry args={[0.5, 0.6]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
                roughness={0.3}
              />
            </mesh>
          </>
        )}

        {/* Arms (greeting pose) */}
        <group position={[-0.26, 0.12, 0.05]} rotation={[0.6, 0, 0.6]}>
          <mesh>
            <capsuleGeometry args={[0.045, 0.18, 8, 8]} />
            <meshPhysicalMaterial color={isGroom ? "#1c2833" : "#fff8fa"} roughness={0.5} clearcoat={0.3} />
          </mesh>
        </group>
        <group position={[0.26, 0.12, 0.05]} rotation={[0.6, 0, -0.6]}>
          <mesh>
            <capsuleGeometry args={[0.045, 0.18, 8, 8]} />
            <meshPhysicalMaterial color={isGroom ? "#1c2833" : "#fff8fa"} roughness={0.5} clearcoat={0.3} />
          </mesh>
        </group>
        {/* Clasped hands */}
        <group position={[0, 0.0, 0.22]}>
          <mesh position={[-0.02, 0, 0]} scale={[0.9, 0.7, 0.8]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshPhysicalMaterial color={headColor} roughness={0.5} clearcoat={0.3} />
          </mesh>
          <mesh position={[0.02, 0, 0]} scale={[0.9, 0.7, 0.8]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshPhysicalMaterial color={headColor} roughness={0.5} clearcoat={0.3} />
          </mesh>
        </group>
      </group>

      {/* Shoes */}
      <mesh position={[-0.08, -0.36, 0.03]} scale={[0.9, 0.5, 1.3]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshPhysicalMaterial color={isGroom ? "#1a1a1a" : "#f0a0b0"} roughness={0.5} clearcoat={0.3} />
      </mesh>
      <mesh position={[0.08, -0.36, 0.03]} scale={[0.9, 0.5, 1.3]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshPhysicalMaterial color={isGroom ? "#1a1a1a" : "#f0a0b0"} roughness={0.5} clearcoat={0.3} />
      </mesh>
    </group>
  );
}

/* ── Main export ── */
export function Hero3D() {
  return (
    <div className={heroContainer}>
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 3]} intensity={0.9} />
        <directionalLight position={[-3, 3, 2]} intensity={0.3} color="#ffd0d8" />
        <pointLight position={[0, 2, 2]} intensity={0.3} color="#ffe0e8" />

        {/* Groom */}
        <ModelErrorBoundary
          fallback={<FallbackCharacter position={[-0.55, 0, 0]} isGroom={true} />}
        >
          <Suspense fallback={<FallbackCharacter position={[-0.55, 0, 0]} isGroom={true} />}>
            <GLBCharacter url="/models/groom.glb" position={[-0.55, 0, 0]} scale={0.8} />
          </Suspense>
        </ModelErrorBoundary>

        {/* Bride */}
        <ModelErrorBoundary
          fallback={<FallbackCharacter position={[0.55, 0, 0]} isGroom={false} />}
        >
          <Suspense fallback={<FallbackCharacter position={[0.55, 0, 0]} isGroom={false} />}>
            <GLBCharacter url="/models/bride.glb" position={[0.55, 0, 0]} scale={0.8} />
          </Suspense>
        </ModelErrorBoundary>

        <FloralScene />
        <ParticleField />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Math.PI / 8}
          maxAzimuthAngle={Math.PI / 8}
        />
      </Canvas>
    </div>
  );
}
