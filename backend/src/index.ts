import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { registerCanvasHandlers } from './socketHandlers/canvasHandler.js';
import { registerChatHandlers } from './socketHandlers/chatHandler.js';
import { registerGameHandlers } from './socketHandlers/gameHandler.js';
import { registerRoomHandlers } from './socketHandlers/roomHandler.js';

// PORT initilization -->
const PORT = process.env.PORT || 5000;

// http sever using  express app -->
const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_URL
      ? [process.env.CORS_URL, 'http://localhost:5173']
      : 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Centralized webSocket management
io.on('connection', (socket) => {
  console.log(`Client attached: ${socket.id}`);

  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected: ${socket.id} (Reason: ${reason})`);
  });
});

// Server listening -->
server.listen(PORT, () => {
  console.log(`🚀 Drawly backend engine running securely on port ${PORT}`);
});
