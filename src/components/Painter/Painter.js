import { useRef, useEffect, useState } from 'react';
import Controls from './Controls';
import Layers from './Layers';
import Drawing from './Drawing';
import Zoom from './Zoom';
import TextTool from './TextTool';
import { createNewLayer } from './utils';
import ImageInsert from './ImageInsert';  // 画像挿入機能
import TimeLapse from './TimeLapse';  // タイムラプス機能

const Painter = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [pencilColor, setPencilColor] = useState('#000000');
  const [pencilSize, setPencilSize] = useState(3);
  const [pencilOpacity, setPencilOpacity] = useState(1);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [layers, setLayers] = useState([createNewLayer(width, height)]);
  const [timelapseData, setTimelapseData] = useState([]);  // タイムラプス用

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    const handleDraw = Drawing(canvasRef, layers, currentLayer, pencilColor, pencilSize, pencilOpacity);

    canvas.addEventListener('mousedown', handleDraw.onMouseDown);
    canvas.addEventListener('mousemove', handleDraw.onMouseMove);
    canvas.addEventListener('mouseup', handleDraw.onMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleDraw.onMouseDown);
      canvas.removeEventListener('mousemove', handleDraw.onMouseMove);
      canvas.removeEventListener('mouseup', handleDraw.onMouseUp);
    };
  }, [width, height, layers, currentLayer, pencilColor, pencilSize, pencilOpacity]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: '1px solid #000' }}></canvas>
      <Controls
        pencilColor={pencilColor}
        setPencilColor={setPencilColor}
        pencilSize={pencilSize}
        setPencilSize={setPencilSize}
        pencilOpacity={pencilOpacity}
        setPencilOpacity={setPencilOpacity}
        layers={layers}
        setLayers={setLayers}
        currentLayer={currentLayer}
        setCurrentLayer={setCurrentLayer}
        canvasRef={canvasRef}
        timelapseData={timelapseData}  // タイムラプス用
        setTimelapseData={setTimelapseData}  // タイムラプス用
      />
      <Layers
        layers={layers}
        currentLayer={currentLayer}
        setCurrentLayer={setCurrentLayer}
        setLayers={setLayers}
      />
      <TextTool
        canvasRef={canvasRef}
        pencilColor={pencilColor}
        setLayers={setLayers}
        currentLayer={currentLayer}
      />
      <Zoom canvasRef={canvasRef} />
      <ImageInsert
        layers={layers}
        currentLayer={currentLayer}
        setLayers={setLayers}
        canvasRef={canvasRef}
      />
      <TimeLapse
        timelapseData={timelapseData}
        canvasRef={canvasRef}
      />
    </div>
  );
};

export default Painter;

