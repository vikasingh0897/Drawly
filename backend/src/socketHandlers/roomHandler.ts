import { Server, Socket } from 'socket.io';
import { createRoom, getRoom, joinRoom, removePlayer } from '../store/room.js';

// Controller for create, join and delete room -->
export const registerRoomHandlers = (io: Server, socket: Socket) => {
  // Create room -->
  socket.on('create_room', (username: string) => {
    const roomId = createRoom(socket.id, username);
    socket.join(roomId);

    const room = getRoom(roomId);
    io.to(roomId).emit('room_updated', room);

    io.to(roomId).emit('system_message', {
      text: `${username} Created the room!`,
      color: '#888',
    });

    console.log(`${username} created room ${roomId}`);
  });

  // Join room -->
  socket.on('join_room', ({ roomId, username }: { roomId: string; username: string }) => {
    const newPlayer = joinRoom(roomId, socket.id, username);

    if (newPlayer.error) {
      socket.emit('error', newPlayer.error);
      return;
    }

    socket.join(roomId);
    io.to(roomId).emit('room_updated', newPlayer.room);

    io.to(roomId).emit('system_message', {
      text: `👋 ${username} joined the room!`,
      color: '#888',
    });

    console.log(`👋 ${username} joined room ${roomId}`);
  });

  // Remove player and Delete Room logic -->
  socket.on('disconnect', () => {
    const result = removePlayer(socket.id);

    if (result) {
      const { roomId, username } = result;
      const room = getRoom(roomId);
      if (room) {
        socket.to(roomId).emit('player_left', room.players);

        socket.to(roomId).emit('system_message', {
          text: `${username} left the room.`,
          color: '#888',
        });
      }
    }
  });
};
