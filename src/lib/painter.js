// src/lib/painter.js

class Painter {
  constructor(canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');
    this.x = null;
    this.y = null;
    this.penColor = '#000000';
    this.penSize = 5;
    this.penOpacity = 1.0;
    this.zoomLevel = 1;

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseup', this.drawFinish);
    this.canvas.addEventListener('mouseleave', this.drawFinish);
  }

  setPenColor(color) {
    this.penColor = color;
  }

  setPenSize(size) {
    this.penSize = size;
  }

  setPenOpacity(opacity) {
    this.penOpacity = opacity;
  }

  zoom(scale) {
    this.zoomLevel *= scale;
    this.canvas.style.transform = `scale(${this.zoomLevel})`;
  }

  calcCoordinate(e) {
    const rect = e.target.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / this.zoomLevel, y: (e.clientY - rect.top) / this.zoomLevel };
  }

  onMouseDown = (e) => {
    if (e.button !== 0) return; // 左クリックのみ処理
    const { x, y } = this.calcCoordinate(e);
    this.x = x;
    this.y = y;
  }

  onMouseMove = (e) => {
    if (e.buttons !== 1) return; // 左クリックを保持している場合のみ処理
    const { x, y } = this.calcCoordinate(e);
    this.draw({ x, y });
  }

  drawFinish = () => {
    this.x = null;
    this.y = null;
  }

  draw({ x: toX, y: toY }) {
    const { x: fromX = toX, y: fromY = toY } = this;
    this.context.globalAlpha = this.penOpacity;
    this.context.strokeStyle = this.penColor;
    this.context.lineWidth = this.penSize;
    this.context.lineCap = 'round';
    this.context.beginPath();
    this.context.moveTo(fromX, fromY);
    this.context.lineTo(toX, toY);
    this.context.stroke();
    this.x = toX;
    this.y = toY;
  }
}

export default Painter;

