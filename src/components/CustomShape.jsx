import { Shape } from 'react-konva';

export default function CustomShape() {
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(20, 50);
        context.lineTo(220, 80);
        context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
      }}
      fill="#00D2FF"
      stroke="black"
      strokeWidth={4}
      draggable
    />
  )
}