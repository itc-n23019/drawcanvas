import React from 'react';

const TimeLapse = ({ timelapseData, canvasRef }) => {
  const handleStartTimelapse = () => {
    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      timelapseData.push(dataURL);
    }, 1000); // 1秒ごとにキャプチャ

    return () => clearInterval(interval); // クリーンアップ用
  };

  const handlePlayTimelapse = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= timelapseData.length) {
        clearInterval(interval);
        return;
      }
      const img = new Image();
      img.src = timelapseData[index];
      img.onload = () => {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      };
      index++;
    }, 500); // 0.5秒ごとに再生

    return () => clearInterval(interval); // クリーンアップ用
  };

  return (
    <div>
      <button onClick={handleStartTimelapse}>Start Timelapse</button>
      <button onClick={handlePlayTimelapse}>Play Timelapse</button>
    </div>
  );
};

export default TimeLapse;

