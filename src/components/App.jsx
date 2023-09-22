import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainCanvas from '../pages/MainCanvas';
import Demo1 from '../pages/Demo1';
import Demo2 from '../pages/Demo2';
import Demo3 from '../pages/Demo3';
import Demo4 from '../pages/Demo4';
import Demo5 from '../pages/Demo5';
import Demo6 from '../pages/Demo6';
import Demo7 from '../pages/Demo7';

export default function App() {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedShapeId, setSelectedShapeId] = useState(null);

  const handleStageClick = (e) => {
    // Hide the context menu when clicking outside of a shape
    if (e.target === e.target.getStage()) {
      setContextMenuVisible(false);
      setSelectedShapeId(null);
    }
  };

  const handleContextMenu = (e, shapeId) => {
    e.evt.preventDefault();

    // Show the context menu at the mouse position
    setContextMenuPosition({
      x: e.evt.clientX,
      y: e.evt.clientY,
    });
    setSelectedShapeId(shapeId);
    setContextMenuVisible(true);
  };

  const removeShape = () => {
    if (selectedShapeId !== null) {
      // setShapes(shapes.filter((shape) => shape.id !== selectedShapeId));
      setContextMenuVisible(false);
      setSelectedShapeId(null);
    }
  };

  return (
    <div>
      <h1>React Konva Demo</h1>
      <Routes>
        <Route
          path="/"
          element={
            <MainCanvas
              handleStageClick={handleStageClick}
              handleContextMenu={handleContextMenu}
              contextMenuVisible={contextMenuVisible}
              contextMenuPosition={contextMenuPosition}
              removeShape={removeShape}
            />
          }
        />
        <Route path="/demo1" element={<Demo1 />} />
        <Route path="/demo2" element={<Demo2 />} />
        <Route path="/demo3" element={<Demo3 />} />
        <Route path="/demo4" element={<Demo4 />} />
        <Route path="/demo5" element={<Demo5 />} />
        <Route path="/demo6" element={<Demo6 />} />
        <Route path="/demo7" element={<Demo7 />} />
      </Routes>
    </div>
  );
}