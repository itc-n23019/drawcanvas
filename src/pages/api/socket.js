// src/pages/api/socket.js

import { createWebSocketServer } from '../../lib/websocketServer';

export default function handler(req, res) {
  // WebSocketサーバーがすでに起動している場合は、再起動しない
  if (res.socket.server.wss) {
    console.log('WebSocket server already running');
    res.end();
    return;
  }

  // WebSocketサーバーのインスタンスを作成
  const wss = createWebSocketServer(res.socket.server);

  // WebSocketサーバーをHTTPサーバーに紐づけ
  res.socket.server.wss = wss;
  console.log('WebSocket server started');
  res.end();
}

