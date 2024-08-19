import React from 'react';

const Layers = ({ layers, currentLayer, setCurrentLayer, setLayers }) => {
  return (
    <div>
      <label>Layers: </label>
      <select value={currentLayer} onChange={e => setCurrentLayer(parseInt(e.target.value))}>
        {layers && layers.map((layer, index) => (
  <option key={index} value={index}>
    {`Layer ${index + 1}`}
  </option>
))}
      </select>
    </div>
  );
};

export default Layers;

