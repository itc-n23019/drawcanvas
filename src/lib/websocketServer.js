// src/lib/websocketServer.js

const WebSocket = require('ws');

function createWebSocketServer(httpServer) {
  const wss = new WebSocket.Server({ server: httpServer });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      const parsedMessage = JSON.parse(message);
      wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      });
    });

    ws.send(JSON.stringify({ type: 'info', message: 'Welcome to the drawing app!' }));
  });

  console.log('WebSocket server started');
  return wss;
}

module.exports = { createWebSocketServer };

