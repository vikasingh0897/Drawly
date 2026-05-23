import { Server, Socket } from 'socket.io';
import { getRoom } from '../store/room.js';
import { triggerFastForward } from './gameHandler.js';

// Broadcasting message and answer matcing logic -->
export const registerChatHandlers = (io: Server, socket: Socket) => {
  socket.on('send_message', ({ roomId, text }) => {
    const room = getRoom(roomId);
    if (!room) return;

    const player = room.players.find((p) => p.socketId === socket.id);
    if (!player) return;

    const isPlaying = room.status === 'playing';
    const isDrawer = room.players[room.currentDrawerIndex]?.socketId === socket.id;
    const isExactMatch = text.trim().toLowerCase() === room.currentWord.toLowerCase();

    if (isPlaying && !isDrawer && isExactMatch) {
      if (!room.correctGuessers.includes(socket.id)) {
        room.correctGuessers.push(socket.id);
        player.score += 100;

        io.to(roomId).emit('system_message', {
          text: `${player.username} guessed the word!`,
          color: 'green',
        });

        io.to(roomId).emit('players_updated', room.players);
      }
      if (room.correctGuessers.length === 1) {
        triggerFastForward(io, roomId, room);

        io.to(roomId).emit('system_message', {
          text: `⏱️ Word guessed! 10 seconds remaining!`,
          color: '#ff9800',
        });
      }
    } else if (isPlaying && isDrawer && isExactMatch) {
      socket.emit('system_message', {
        text: `No cheating! You can't type the word.`,
        color: 'red',
      });
    } else {
      io.to(roomId).emit('chat_message', {
        sender: player.username,
        text: text,
      });
    }
  });
};
