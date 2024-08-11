import React from 'react';

const Zoom = ({ canvasRef }) => {
  const handleZoom = (factor) => {
    const context = canvasRef.current.getContext('2d');
    context.scale(factor, factor);
    context.drawImage(canvasRef.current, 0, 0);
  };

  return (
    <div>
      <button onClick={() => handleZoom(1.1)}>Zoom In</button>
      <button onClick={() => handleZoom(0.9)}>Zoom Out</button>
    </div>
  );
};

export default Zoom;

