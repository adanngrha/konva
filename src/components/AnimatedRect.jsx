import { Rect } from 'react-konva';
import { useRef } from 'react';

export default function AnimatedRect() {
  const rectRef = useRef(null);
  const changeSize = () => {
    if (rectRef.current) {
      rectRef.current.to({
        scaleX: Math.random() + 0.8,
        scaleY: Math.random() + 0.8,
        duration: 0.2,
      });
    }
  }

  return (
    <Rect
      ref={rectRef}
      width={50}
      height={50}
      fill="green"
      draggable
      onDragEnd={changeSize}
      onDragStart={changeSize}
    />
  );
}