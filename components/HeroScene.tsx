"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GoldenParticles() {
  const count = 180;
  const ref = useRef<THREE.Points>(null!);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 14 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sz[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, sz];
  }, []);

  useFrame((state, delta) => {
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      // Gentle rise
      posArr[i * 3 + 1] += delta * (0.15 + sizes[i] * 3);
      // Sine drift with unique phase
      posArr[i * 3] += Math.sin(time * 0.5 + i * 0.7) * delta * 0.04;
      posArr[i * 3 + 2] += Math.cos(time * 0.3 + i * 1.1) * delta * 0.02;
      // Reset
      if (posArr[i * 3 + 1] > 9) {
        posArr[i * 3 + 1] = -5;
        posArr[i * 3] = (Math.random() - 0.5) * 12;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    // Subtle global rotation
    ref.current.rotation.y = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d4b896"
        size={0.03}
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.08,
        0.02
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.04,
        0.02
      );
    }
  });

  return (
    <group ref={groupRef}>
      <GoldenParticles />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
