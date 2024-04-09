import { Canvas } from "@react-three/fiber";
import { times } from "lodash";
import BlackShipMesh from "./BlackShipMesh";

function Screen() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
      }}
    >
      <ambientLight />
      {times(20, (idx1) =>
        times(20, (idx2) => (
          <BlackShipMesh
            key={`${idx1}-${idx2}`}
            position={[(idx1 - 10) * 1.1, (idx2 - 10) * 1.1, 0]}
            flipY={(idx1 + idx2) % 2 === 0}
          />
        ))
      )}
    </Canvas>
  );
}

export default Screen;
