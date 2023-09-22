import React from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";

export default function KonvaDemo() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const handleSaveClick = () => {
    const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
    downloadURI(dataURL, "stage.png");
  };

  const downloadURI = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stageRef = React.useRef();

  return (
    <div>
      <div id="buttons">
        <button onClick={handleSaveClick}>Save as image</button>
      </div>
      <div id="container">
        <Stage width={width} height={height} ref={stageRef}>
          <Layer>
            <Rect
              x={200}
              y={200}
              width={100}
              height={50}
              fill="#00D2FF"
              stroke="black"
              strokeWidth={4}
              draggable={true}
            />
            <Circle
              x={100}
              y={100}
              radius={50}
              fill="red"
              stroke="black"
              strokeWidth={4}
              draggable={true}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
