// src/pages/index.js

import { useEffect, useState } from 'react';

export default function Home() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/api/socket');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'draw') {
        drawOnCanvas(data);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      // 必要に応じてリトライ処理を追加
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const drawOnCanvas = ({ x1, y1, x2, y2, color, size, opacity }) => {
    console.log(`Drawing line from (${x1}, ${y1}) to (${x2}, ${y2})`);
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.globalAlpha = opacity;
    context.strokeStyle = color;
    context.lineWidth = size;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1 && ws) {
      const canvas = e.target;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ws.send(JSON.stringify({
        type: 'draw',
        x1: x,
        y1: y,
        x2: x,
        y2: y,
        color: '#000000',
        size: 5,
        opacity: 1.0
      }));
    }
  };

  return (
    <div>
      <canvas
        id="canvas"
        width="800"
        height="600"
        style={{ border: '1px solid black' }}
        onMouseMove={handleMouseMove}
      ></canvas>
    </div>
  );
}

