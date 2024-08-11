import React from 'react';

const Layers = ({ layers, currentLayer, setCurrentLayer, setLayers }) => {
  return (
    <div>
      <label>Layers: </label>
      <select value={currentLayer} onChange={e => setCurrentLayer(parseInt(e.target.value))}>
        {layers.map((_, i) => (
          <option key={i} value={i}>{`Layer ${i + 1}`}</option>
        ))}
      </select>
    </div>
  );
};

export default Layers;

