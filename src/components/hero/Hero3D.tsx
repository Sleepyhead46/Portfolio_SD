"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, TorusKnot, Environment } from "@react-three/drei";
import * as THREE from "three";

function WireframeIcosahedron() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.15;
    mesh.current.rotation.y = t * 0.2;
    mesh.current.position.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} position={[2.4, 0.6, 0]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.25} />
      </mesh>
    </Float>
  );
}

function WireframeTorusKnot() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.1;
    mesh.current.rotation.y = t * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={mesh} position={[-2.8, -1, -1]}>
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        <meshBasicMaterial wireframe color="#d9d9d9" transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = Math.sin(t * 0.8) * 0.4;
  });

  return (
    <mesh ref={mesh} position={[0, -1.8, -2]}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <WireframeIcosahedron />
      <WireframeTorusKnot />
      <FloatingSphere />
      <Environment preset="city" />
    </>
  );
}

export function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none"
    >
      <Scene />
    </Canvas>
  );
}
