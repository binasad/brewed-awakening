"use client";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Card({ image, hovered }: { image: string; hovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null!);
  const texture = useLoader(THREE.TextureLoader, image);

  useFrame(() => {
    const target = hovered ? Math.PI : 0;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, target, 0.06);
  });

  return (
    <group ref={meshRef}>
      {/* Card body */}
      <RoundedBox args={[3, 4, 0.15]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color="#151515" roughness={0.8} metalness={0.1} />
      </RoundedBox>
      {/* Front image */}
      <mesh position={[0, 0.3, 0.081]}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {/* Back face */}
      <mesh position={[0, 0, -0.081]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.8, 3.8]} />
        <meshStandardMaterial color="#c8a97e" />
      </mesh>
    </group>
  );
}

export default function MenuCard3D({ image, name, price, desc, detail }: { image: string; name: string; price: string; desc: string; detail: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-[320px] md:h-[400px] cursor-pointer relative"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#c8a97e" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} />
        <Suspense fallback={null}>
          <Card image={image} hovered={flipped} />
        </Suspense>
      </Canvas>
      {/* Front overlay */}
      <div
        className="absolute bottom-4 left-0 right-0 text-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: flipped ? 0 : 1 }}
      >
        <h3 className="font-heading text-xl">{name}</h3>
        <span className="text-gold text-base">{price}</span>
      </div>
      {/* Back overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6 transition-opacity duration-300"
        style={{ opacity: flipped ? 1 : 0 }}
      >
        <h3 className="font-heading text-2xl text-dark font-bold mb-2">{name}</h3>
        <span className="text-dark/80 text-lg font-semibold mb-3">{price}</span>
        <p className="text-dark/70 text-sm leading-relaxed max-w-[220px]">{desc}</p>
        <span className="text-dark/50 text-xs tracking-wider uppercase mt-3">{detail}</span>
      </div>
    </div>
  );
}
