
import React from 'react';

const TextTool = ({ canvasRef, pencilColor, setLayers, currentLayer }) => {
  const addText = (text) => {
    if (!text) return;

    const context = canvasRef.current.getContext('2d');
    context.font = '30px Arial';
    context.fillStyle = pencilColor;
    context.fillText(text, 50, 50); // テキストの位置は自由に調整
    setLayers(prevLayers => {
      const newLayers = [...prevLayers];
      newLayers[currentLayer].context = context;
      return newLayers;
    });
  };

  return (
    <div>
      <input type="text" placeholder="Enter text" onBlur={e => addText(e.target.value)} />
    </div>
  );
};

export default TextTool;

