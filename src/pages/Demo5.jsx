import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Transformer } from 'react-konva';

export default function Demo5() {
  const stageRef = useRef(null);
  const textRef = useRef(null);
  const trRef = useRef(null);
  const textareaRef = useRef(null);

  const [selectedText, setSelectedText] = useState(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    stageRef.current.width(width);
    stageRef.current.height(height);

    trRef.current.nodes([textRef.current]);

    textRef.current.on('dblclick dbltap', () => {
      // hide text node and transformer:
      textRef.current.hide();
      trRef.current.hide();

      // create textarea over canvas with absolute position
      const textNode = textRef.current;
      const stage = stageRef.current;

      const textPosition = textNode.getAbsolutePosition();
      const areaPosition = {
        x: stage.container().offsetLeft + textPosition.x,
        y: stage.container().offsetTop + textPosition.y,
      };

      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      textarea.value = textNode.text();
      textarea.style.position = 'absolute';
      textarea.style.top = `${areaPosition.y}px`;
      textarea.style.left = `${areaPosition.x}px`;
      textarea.style.width = `${textNode.width() - textNode.padding() * 2}px`;
      textarea.style.height = `${textNode.height() - textNode.padding() * 2 + 5}px`;
      textarea.style.fontSize = `${textNode.fontSize()}px`;
      textarea.style.border = 'none';
      textarea.style.padding = '0px';
      textarea.style.margin = '0px';
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'none';
      textarea.style.outline = 'none';
      textarea.style.resize = 'none';
      textarea.style.lineHeight = textNode.lineHeight();
      textarea.style.fontFamily = textNode.fontFamily();
      textarea.style.transformOrigin = 'left top';
      textarea.style.textAlign = textNode.align();
      textarea.style.color = textNode.fill();
      let rotation = textNode.rotation();
      let transform = '';
      if (rotation) {
        transform += `rotateZ(${rotation}deg)`;
      }

      let px = 0;
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isFirefox) {
        px += 2 + Math.round(textNode.fontSize() / 20);
      }
      transform += `translateY(-${px}px)`;

      textarea.style.transform = transform;

      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 3}px`;

      textarea.focus();

      textarea.addEventListener('keydown', (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
          textNode.text(textarea.value);
          textarea.parentNode.removeChild(textarea);
          textNode.show();
          trRef.current.show();
          trRef.current.forceUpdate();
        }
        if (e.keyCode === 27) {
          textarea.parentNode.removeChild(textarea);
          textNode.show();
          trRef.current.show();
          trRef.current.forceUpdate();
        }
      });

      textarea.addEventListener('keydown', () => {
        const scale = textNode.getAbsoluteScale().x;
        setTextareaWidth(textNode.width() * scale);
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight + textNode.fontSize()}px`;
      });

      function handleOutsideClick(e) {
        if (e.target !== textarea) {
          textNode.text(textarea.value);
          textarea.parentNode.removeChild(textarea);
          textNode.show();
          trRef.current.show();
          trRef.current.forceUpdate();
        }
      }

      window.addEventListener('click', handleOutsideClick);
      setSelectedText(textNode);
    });
  }, []);

  function setTextareaWidth(newWidth) {
    if (!newWidth) {
      newWidth = selectedText.placeholder.length * selectedText.fontSize();
    }
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isSafari || isFirefox) {
      newWidth = Math.ceil(newWidth);
    }

    const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
    if (isEdge) {
      newWidth += 1;
    }
    textareaRef.current.style.width = `${newWidth}px`;
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
      <Layer>
        <Text
          text="Some text here"
          x={50}
          y={80}
          fontSize={20}
          draggable={true}
          width={200}
          ref={textRef}
        />
        <Transformer ref={trRef} enabledAnchors={['middle-left', 'middle-right']} />
      </Layer>
    </Stage>
  );
}
