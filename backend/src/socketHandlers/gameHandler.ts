import { Server, Socket } from 'socket.io';
import { getRoom } from '../store/room.js';
import { getRandomWords } from '../store/words.js';

// Game Timer record -->
export const roomTimers: Record<string, NodeJS.Timeout> = {};
export const roomEndTimes: Record<string, number> = {};

export const registerGameHandlers = (io: Server, socket: Socket) => {
  socket.on('start_game', (roomId: string) => {
    const room = getRoom(roomId);
    if (!room) return;

    room.status = 'playing';
    room.currentDrawerIndex = 0;

    io.to(roomId).emit('room_updated', room);
    startRound(io, roomId, room);
  });

  socket.on('word_selected', ({ roomId, word }: { roomId: string; word: string }) => {
    const room = getRoom(roomId);
    if (!room) return;

    room.currentWord = word;
    room.maskedWord = word.split('').map((char: string) => (char === ' ' ? ' ' : '_'));

    const endTime = Date.now() + 60000;
    roomEndTimes[roomId] = endTime;

    io.to(roomId).emit('round_active', { endTime, maskedWord: room.maskedWord });

    roomTimers[roomId] = setTimeout(() => {
      endRound(io, roomId, room);
    }, 60000);
  });

  socket.on('reveal_letter', ({ roomId, index }) => {
    const room = getRoom(roomId);
    if (!room || room.status !== 'playing') return;

    const isDrawer = room.players[room.currentDrawerIndex]?.socketId === socket.id;
    if (!isDrawer) return;

    room.maskedWord[index] = room.currentWord[index];
    io.to(roomId).emit('hint_updated', room.maskedWord);
  });
};

const startRound = (io: Server, roomId: string, room: any) => {
  clearTimeout(roomTimers[roomId]);
  room.correctGuessers = [];
  room.currentWord = '';

  io.to(roomId).emit('room_updated', room);

  const drawer = room.players[room.currentDrawerIndex];
  if (!drawer) return;

  io.to(roomId).emit('round_start', { drawerId: drawer.socketId, drawerName: drawer.username });

  const words = getRandomWords(3);
  io.to(drawer.socketId).emit('word_chosen', words);
};

const endRound = (io: Server, roomId: string, room: any) => {
  io.to(roomId).emit('round_end', { wordWas: room.currentWord });
  room.currentDrawerIndex++;

  if (room.currentDrawerIndex >= room.players.length) {
    room.status = 'waiting';

    const sortedLeaderboard = [...room.players].sort((a, b) => b.score - a.score);

    io.to(roomId).emit('room_updated', room);
    io.to(roomId).emit('game_over');
    io.to(roomId).emit('game_over', { leaderboard: sortedLeaderboard });
  } else {
    io.to(roomId).emit('room_updated', room);
    setTimeout(() => {
      startRound(io, roomId, room);
    }, 5000);
  }
};

export const triggerFastForward = (io: any, roomId: string, room: any) => {
  const remainingTime = roomEndTimes[roomId] - Date.now();

  if (remainingTime > 10000) {
    clearTimeout(roomTimers[roomId]);

    const newEndTime = Date.now() + 10000;
    roomEndTimes[roomId] = newEndTime;

    roomTimers[roomId] = setTimeout(() => {
      endRound(io, roomId, room);
    }, 10000);

    io.to(roomId).emit('timer_updated', { endTime: newEndTime });
  }
};
