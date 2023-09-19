import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Star, Circle } from 'react-konva';

export default function Demo4() {
  const [starRotation, setStarRotation] = useState(0);
  const [controlled, setControlled] = useState(false);

  useEffect(() => {

    const angularFriction = 0.2;
    const initialAngularVelocity = 6;
    let lastRotation = 0;

    const anim = new Konva.Animation((frame) => {
      const angularVelocityChange =
        (initialAngularVelocity * frame.timeDiff * (1 - angularFriction)) / 1000;
      const newAngularVelocity = initialAngularVelocity - angularVelocityChange;

      if (controlled) {
        const newRotation =
          ((starRotation - lastRotation) * 1000) / frame.timeDiff;
        setStarRotation(newRotation);
      } else {
        setStarRotation((prevRotation) =>
          prevRotation + (frame.timeDiff * newAngularVelocity) / 1000
        );
      }

      lastRotation = starRotation;
    });

    // Wait one second and then start the animation
    setTimeout(() => {
      anim.start();
    }, 1000);

    return () => {
      anim.stop();
    };
  }, [controlled, starRotation]);

  const handleMouseDown = () => {
    setControlled(true);
  };

  const handleMouseUp = () => {
    setControlled(false);
  };

  const handleMouseMove = () => {
    if (controlled) {
      const mousePos = stageRef.getPointerPosition();
      const x = starRef.x() - mousePos.x;
      const y = starRef.y() - mousePos.y;
      let newRotation = 0.5 * Math.PI + Math.atan(y / x);

      if (mousePos.x <= stageRef.width() / 2) {
        newRotation += Math.PI;
      }

      setStarRotation(newRotation);
    }
  };

  const stageRef = React.createRef();
  const starRef = React.createRef();

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMouseMove}
    >
      <Layer>
        <Star
          ref={starRef}
          x={window.innerWidth / 4}
          y={window.innerHeight / 4}
          outerRadius={80}
          innerRadius={40}
          stroke="#005500"
          fill="#b5ff88"
          strokeWidth={4}
          numPoints={5}
          lineJoin="round"
          shadowOffsetX={5}
          shadowOffsetY={5}
          shadowBlur={10}
          shadowColor="black"
          shadowOpacity={0.5}
          opacity={0.8}
          rotation={starRotation}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        />
        <Circle
          x={window.innerWidth / 4}
          y={window.innerHeight / 4}
          radius={3}
          fill="#555"
        />
      </Layer>
    </Stage>
  );
}
