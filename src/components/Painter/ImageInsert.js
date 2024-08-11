import React from 'react';

const ImageInsert = ({ layers, currentLayer, setLayers, canvasRef }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const layerContext = layers[currentLayer].context;
        layerContext.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        setLayers([...layers]); // レイヤーを更新
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default ImageInsert;

