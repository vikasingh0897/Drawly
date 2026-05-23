import { Server, Socket } from 'socket.io';

// Broadcasting Drawing to all players -->
export const registerCanvasHandlers = (io: Server, socket: Socket) => {
  socket.on('draw_data', (data) => {
    const { roomId, x, y, color, type } = data;
    socket.to(roomId).emit('draw_data', { x, y, color, type });
  });

  socket.on('canvas_clear', (roomId) => {
    socket.to(roomId).emit('canvas_clear');
  });
};
