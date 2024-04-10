import { Vector3, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import whiteship from "../assets/spaceship_white.png";

function WhiteShipMesh({ position }: { position?: Vector3 }) {
  const texture = useLoader(TextureLoader, whiteship) as THREE.Texture;
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (state.clock.elapsedTime < 2) return;
    if (meshRef.current.scale.x > 2) return;
    meshRef.current.scale.add({ x: delta, y: delta, z: 0 });
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial map={texture} transparent={true} />
    </mesh>
  );
}

export default WhiteShipMesh;
