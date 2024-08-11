// src/js/layeredPainter.js
class LayeredPainter {
  constructor(canvasId, width, height, numLayers = 3) {
    this.canvasContainer = document.getElementById(canvasId);
    this.width = width;
    this.height = height;
    this.numLayers = numLayers;
    this.contexts = [];
    this.currentLayer = 0;
    this.initLayers();
  }

  initLayers() {
    // レイヤー数分のCanvasを作成
    for (let i = 0; i < this.numLayers; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      this.canvasContainer.appendChild(canvas);
      this.contexts[i] = canvas.getContext('2d');
    }
    this.setupEventListeners();
  }

  setLayer(layerIndex) {
    if (layerIndex < 0 || layerIndex >= this.numLayers) {
      throw new Error('Invalid layer index');
    }
    this.currentLayer = layerIndex;
  }

  setupEventListeners() {
    this.canvasContainer.addEventListener('mousedown', this.onMouseDown);
    this.canvasContainer.addEventListener('mousemove', this.onMouseMove);
    this.canvasContainer.addEventListener('mouseup', this.drawFinish);
    this.canvasContainer.addEventListener('mouseleave', this.drawFinish);
  }

  onMouseDown = (e) => {
    if (e.button !== 0) return;
    const { x, y } = this.calcCoordinate(e);
    this.startX = x;
    this.startY = y;
  }

  onMouseMove = (e) => {
    if (e.buttons !== 1) return;
    const { x, y } = this.calcCoordinate(e);
    this.draw({ x, y });
  }

  drawFinish = () => {
    this.startX = null;
    this.startY = null;
  }

  calcCoordinate(e) {
    const rect = this.canvasContainer.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  draw({ x: toX, y: toY }) {
    const { x: fromX = toX, y: fromY = toY } = this;
    const ctx = this.contexts[this.currentLayer];
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    this.startX = toX;
    this.startY = toY;
  }
}

const painter = new LayeredPainter('canvas-container', 800, 600);
painter.setLayer(0); // レイヤー0に描画

