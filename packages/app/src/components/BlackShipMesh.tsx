import { Vector3, useLoader } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import blackship from "../assets/spaceship_black.png";
import {
  CHANGE_DURATION,
  CHANGE_START_DELAY,
  COUNTS,
  GEOMETRY_SIZE,
} from "./Screen";

function BlackShipMesh({
  position,
  flipY = true,
}: {
  position?: Vector3;
  flipY?: boolean;
}) {
  const texture = useLoader(TextureLoader, blackship) as THREE.Texture;
  const flippedTexture = texture.clone();
  flippedTexture.flipY = false;

  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    const shipElem = meshRef.current;

    gsap.to(shipElem.position, {
      x: Math.random() * COUNTS - COUNTS / 2,
      y: -COUNTS / 2,
      delay: CHANGE_START_DELAY,
      duration: CHANGE_DURATION,
      ease: "sine.inOut",
    });

    gsap.to(shipElem.rotation, {
      x: Math.PI * Math.random(),
      y: Math.PI * Math.random(),
      z: Math.PI * Math.random(),
      delay: CHANGE_START_DELAY,
      duration: CHANGE_DURATION,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[GEOMETRY_SIZE, GEOMETRY_SIZE]} />
      <meshStandardMaterial
        map={flipY ? texture : flippedTexture}
        transparent={true}
      />
    </mesh>
  );
}

export default BlackShipMesh;
