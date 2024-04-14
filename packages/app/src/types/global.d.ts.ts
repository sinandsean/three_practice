type ShaderMaterial = {} & JSX.IntrinsicElements["shaderMaterial"];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      imageTransitionMaterial: ShaderMaterial;
      transitionShaderMaterial: ShaderMaterial;
    }
  }
}

export {};
