import { Vector3, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import blackship from "../assets/spaceship_black.png";

function BlackShipMesh({
  position,
  flipY = true,
}: {
  position?: Vector3;
  flipY?: boolean;
}) {
  const texture = useLoader(TextureLoader, blackship) as THREE.Texture;
  const flippedTexture = texture.clone();

  useEffect(() => {
    flippedTexture.flipY = false;
  }, [flippedTexture]);

  return (
    <mesh position={position}>
      <planeGeometry args={[0.9, 0.9]} />
      <meshStandardMaterial
        map={flipY ? texture : flippedTexture}
        transparent={true}
      />
    </mesh>
  );
}

export default BlackShipMesh;
