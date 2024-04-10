import { Vector3, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import whiteship from "../assets/spaceship_white.png";

const FADE_IN_START_SECONDS = 2;
const SCALE_SIZE = 2;

function WhiteShipMesh({ position }: { position?: Vector3 }) {
  const texture = useLoader(TextureLoader, whiteship) as THREE.Texture;
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state, delta) => {
    const meshScale = meshRef.current.scale.x;
    const { elapsedTime } = state.clock;

    if (elapsedTime < FADE_IN_START_SECONDS) return;

    if (meshScale > SCALE_SIZE) {
      materialRef.current.opacity = 1;
      return;
    }

    meshRef.current.scale.add({ x: delta, y: delta, z: 0 });
    materialRef.current.opacity = meshScale / SCALE_SIZE;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial
        ref={materialRef}
        map={texture}
        transparent={true}
        opacity={0}
      />
    </mesh>
  );
}

export default WhiteShipMesh;
