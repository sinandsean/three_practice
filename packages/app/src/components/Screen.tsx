import { Canvas } from "@react-three/fiber";
import { times } from "lodash";
import BlackShipMesh from "./BlackShipMesh";
import WhiteShipMesh from "./WhiteShipMesh";

export const GEOMETRY_SIZE = 0.9;

const COUNTS = 30;
const FACTOR = COUNTS / 2;

function Screen() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
      }}
    >
      <ambientLight />
      {times(COUNTS, (idx1) =>
        times(COUNTS, (idx2) => (
          <BlackShipMesh
            key={`${idx1}-${idx2}`}
            position={[
              idx2 % 2 === 0
                ? idx1 - FACTOR
                : idx1 - FACTOR - GEOMETRY_SIZE / 2,
              idx2 - FACTOR,
              0,
            ]}
            flipY={(idx1 + idx2) % 2 !== 0}
          />
        ))
      )}
      <WhiteShipMesh position={[0, 0, 0]} />
    </Canvas>
  );
}

export default Screen;
