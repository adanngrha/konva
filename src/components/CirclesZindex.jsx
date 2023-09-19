import { useState } from "react";
import { Circle } from "react-konva";
import Konva from "konva";

function generateItems() {
  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: 'node-' + i,
      color: Konva.Util.getRandomColor(),
    });
  }
  return items;
}

export default function CirclesZindex() {
  const [items, setItems] = useState(generateItems());

  const handleDragStart = (e) => {
    const id = e.target.name();
    const updatedItems = [...items];
    const item = updatedItems.find((i) => i.id === id);
    const index = updatedItems.indexOf(item);
    // remove from the list:
    updatedItems.splice(index, 1);
    // add to the top
    updatedItems.push(item);
    setItems(updatedItems);
  };

  const handleDragEnd = (e) => {
    const id = e.target.name();
    const updatedItems = [...items];
    const item = updatedItems.find((i) => i.id === id);
    const index = updatedItems.indexOf(item);
    // update item position
    updatedItems[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y(),
    };
    setItems(updatedItems);
  };

  return (
    items.map((item) => (
      <Circle
        key={item.id}
        name={item.id}
        draggable
        x={item.x}
        y={item.y}
        fill={item.color}
        radius={50}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    ))
  )
}