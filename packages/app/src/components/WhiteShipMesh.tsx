import { Vector3, extend, useLoader } from "@react-three/fiber";
import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import blueship from "../assets/spaceship_blue.png";
import whiteship from "../assets/spaceship_white.png";
import ImageTransitionMaterial from "./ImageTransitionMaterial";
import { CHANGE_DURATION, CHANGE_START_DELAY } from "./Screen";

extend({
  ImageTransitionMaterial,
});

function WhiteShipMesh({ position }: { position?: Vector3 }) {
  const whiteshipTexture = useLoader(TextureLoader, whiteship) as THREE.Texture;
  const blueshipTexture = useLoader(TextureLoader, blueship);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const handleChangeImage = useCallback(() => {
    const materialElem = materialRef.current;
    if (!materialElem) return;

    const { dispFactor, currentImage, nextImage } = materialElem.uniforms;

    gsap.to(dispFactor, {
      value: 1,
      duration: CHANGE_START_DELAY,
      ease: "sine.inOut",
      onStart: () => {
        currentImage.value = new THREE.Texture();
        nextImage.value = whiteshipTexture;
      },
      onComplete: () => {
        dispFactor.value = 0;
      },
    });

    gsap.to(dispFactor, {
      value: 1,
      delay: CHANGE_START_DELAY,
      duration: CHANGE_DURATION,
      ease: "sine.inOut",
      onStart: () => {
        currentImage.value = whiteshipTexture;
        nextImage.value = blueshipTexture;
      },
    });
  }, [blueshipTexture, whiteshipTexture]);

  useEffect(() => {
    handleChangeImage();
  }, [handleChangeImage]);

  return (
    <mesh position={position}>
      <planeGeometry args={[3, 3]} />
      <imageTransitionMaterial ref={materialRef} transparent={true} />
    </mesh>
  );
}

export default WhiteShipMesh;
