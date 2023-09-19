import { Stage, Layer, Rect, Line, Text  } from 'react-konva';
import CatImage from '../components/CatImage';
import CustomShape from '../components/CustomShape';
import AnimatedRect from '../components/AnimatedRect';
import CirclesZindex from '../components/CirclesZindex';
import ArrowShape from '../components/ArrowShape';
import { createRef } from 'react';

export default function MainCanvas({ handleStageClick, handleContextMenu, contextMenuVisible, contextMenuPosition, removeShape }) {
  const rectRef = createRef();
  
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={handleStageClick}>
        <Layer>
          <Text text="Some text on canvas" fontSize={15} />
          <Rect
            x={20}
            y={50}
            width={100}
            height={100}
            fill="red"
            shadowBlur={10}
            draggable
            ref={rectRef}
            onClick={() => { 
              console.log('rect clicked');
              if (rectRef.current.attrs.fill == 'blue') {
                rectRef.current.fill("red");
              } else {
                rectRef.current.fill("blue");
              }
              }}
          />
          <Line
            x={20}
            y={200}
            points={[0, 0, 125, 0, 100, 100]}
            tension={0.5}
            closed
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
            draggable
          />
          <CustomShape />
          <CatImage handleContextMenu={handleContextMenu}/>
          <AnimatedRect />
          <CirclesZindex />
          <ArrowShape />
        </Layer>
      </Stage>
      {contextMenuVisible && (
        <div
          style={{
            position: 'absolute',
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            background: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ul>
            <li onClick={removeShape}>Remove</li>
          </ul>
        </div>
      )}
    </div>
  )
}