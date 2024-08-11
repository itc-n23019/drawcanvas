import React from 'react';

const Controls = ({
  pencilColor, setPencilColor,
  pencilSize, setPencilSize,
  pencilOpacity, setPencilOpacity,
  layers, setLayers,
  currentLayer, setCurrentLayer,
  canvasRef, timelapseData, setTimelapseData
}) => {

  const addLayer = () => {
    setLayers([...layers, createNewLayer(canvasRef.current.width, canvasRef.current.height)]);
    setCurrentLayer(layers.length);
  };

  const deleteLayer = () => {
    if (layers.length > 1) {
      const newLayers = [...layers];
      newLayers.splice(currentLayer, 1);
      setLayers(newLayers);
      setCurrentLayer(Math.max(0, currentLayer - 1));
    }
  };

  return (
    <div>
      <div>
        <label>Color: </label>
        <input type="color" value={pencilColor} onChange={e => setPencilColor(e.target.value)} />
      </div>
      <div>
        <label>Size: </label>
        <input type="range" min="1" max="10" value={pencilSize} onChange={e => setPencilSize(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Opacity: </label>
        <input type="range" min="0.1" max="1" step="0.1" value={pencilOpacity} onChange={e => setPencilOpacity(parseFloat(e.target.value))} />
      </div>
      <div>
        <button onClick={addLayer}>Add Layer</button>
        <button onClick={deleteLayer}>Delete Layer</button>
      </div>
      <div>
        <button onClick={() => {
          const dataURL = canvasRef.current.toDataURL();
          const a = document.createElement('a');
          a.href = dataURL;
          a.download = 'canvas.png';
          a.click();
        }}>Download</button>
      </div>
    </div>
  );
};

export default Controls;

