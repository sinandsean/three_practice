import { shaderMaterial } from "@react-three/drei/core/shaderMaterial";
import glsl from "glslify";
import * as THREE from "three";

const ImageTransitionMaterial = shaderMaterial(
  {
    dispFactor: 0,
    currentImage: new THREE.Texture(),
    nextImage: new THREE.Texture(),
  },
  glsl`
	varying vec2 vUv;

	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
  `,
  glsl`
	varying vec2 vUv;

	uniform sampler2D currentImage;
	uniform sampler2D nextImage;
	uniform float dispFactor;
	uniform float opacity;

	void main() {
		vec2 uv = vUv;
		vec4 _currentImage;
		vec4 _nextImage;
		float intensity = 0.01;

		vec4 orig1 = texture2D(currentImage, uv);
		vec4 orig2 = texture2D(nextImage, uv);

		_currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));
		_nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));

		gl_FragColor = mix(_currentImage, _nextImage, dispFactor);
	} 
  `
);

export default ImageTransitionMaterial;
