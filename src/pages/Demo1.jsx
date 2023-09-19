import { useState } from "react";
import { Stage, Layer, Circle, Arrow, Text } from "react-konva";

const BLUE_DEFAULTS = {
  x: 100,
  y: 100,
  fill: "blue",
  width: 30,
  height: 30,
  draggable: true
};

const RED_DEFAULTS = {
  x: 100,
  y: 300,
  fill: "red",
  width: 30,
  height: 30,
  draggable: true
};

const Edge = ({ node1, node2 }) => {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 20;
  const curvePower = 30;

  const arrowStart = {
    x: node2.x + -radius * Math.cos(angle + Math.PI),
    y: node2.y + radius * Math.sin(angle + Math.PI)
  };

  const arrowEnd = {
    x: node1.x + -radius * Math.cos(angle),
    y: node1.y + radius * Math.sin(angle)
  };

  const arrowCurve = {
    x:
      (arrowStart.x + arrowEnd.x) / 2 +
      curvePower * Math.cos(angle + Math.PI / 2),
    y:
      (arrowStart.y + arrowEnd.y) / 2 +
      curvePower * Math.sin(angle - Math.PI / 2)
  };

  return (
    <Arrow
      tension={0.2}
      points={[
        arrowStart.x,
        arrowStart.y,
        arrowCurve.x,
        arrowCurve.y,
        arrowEnd.x,
        arrowEnd.y
      ]}
      stroke="#000"
      fill="#000"
      strokeWidth={3}
      pointerWidth={6}
    />
  );
};

export default function Demo1() {
  const [blueNode, updateBlueNode] = useState(BLUE_DEFAULTS);
  const [redNode, updateRedNode] = useState(RED_DEFAULTS);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Drag any node to see connections change" />
        <Edge node1={blueNode} node2={redNode} />
        <Edge node1={redNode} node2={blueNode} />
        <Circle
          {...blueNode}
          onDragMove={e => {
            updateBlueNode({ ...blueNode, ...e.target.position() });
          }}
        />
        <Circle
          {...redNode}
          onDragMove={e => {
            updateRedNode({ ...redNode, ...e.target.position() });
          }}
        />
      </Layer>
    </Stage>
  );
}
