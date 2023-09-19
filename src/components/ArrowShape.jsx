import { Arrow } from "react-konva";

export default function ArrowShape() {
  return (
    <Arrow
      x={100}
      y={100}
      points={[0, 0, 0, 0, 100, 100]}
      pointerLength={10}
      pointerWidth={10}
      fill="black"
      stroke="black"
      strokeWidth={4}
      draggable
    />
  );
}