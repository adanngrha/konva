import { useRef, useEffect } from 'react';
import { Stage, Layer, Circle, Text } from 'react-konva';

export default function Demo2() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;

    if (stage) {
      const scaleBy = 1.01;
      stage.on('wheel', (e) => {
        e.evt.preventDefault();

        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        const mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale,
        };

        let direction = e.evt.deltaY > 0 ? 1 : -1;

        if (e.evt.ctrlKey) {
          direction = -direction;
        }

        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        };

        stage.position(newPos);
      });
    }
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
      <Layer>
        <Text text="Try to zoom the stage with mouse wheel or Ctrl + wheel" />
        <Circle
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={50}
          fill="#89b717"
          draggable
        />
      </Layer>
    </Stage>
  );
}