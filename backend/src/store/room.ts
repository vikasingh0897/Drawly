// Player Model -->
export interface Player {
  socketId: string;
  username: string;
  score: number;
  isHost: boolean;
}

// Room Model -->
export interface Room {
  id: string;
  players: Player[];
  status: 'waiting' | 'playing';
  currentDrawerIndex: number;
  currentWord: string;
  correctGuessers: string[];
  maskedWord: string[];
}

// Array of all created rooms -->
const rooms: Record<string, Room> = {};

// Helper Function to generate room id -->
const generateRoomId = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// Controller to get room by roomId -->
export const getRoom = (roomId: string) => rooms[roomId];

// Controller to create room -->
export const createRoom = (hostSocketId: string, username: string) => {
  const roomId = generateRoomId();
  const host: Player = { socketId: hostSocketId, username, score: 0, isHost: true };

  rooms[roomId] = {
    id: roomId,
    players: [host],
    status: 'waiting',
    currentDrawerIndex: 0,
    currentWord: '',
    correctGuessers: [],
    maskedWord: [],
  };

  return roomId;
};

// Controller to join room by roomId -->
export const joinRoom = (roomId: string, socketId: string, username: string) => {
  const room = rooms[roomId];
  if (!room) return { error: 'Room not found' };
  if (room.status === 'playing') return { error: 'Game already started' };

  const newPlayer: Player = { socketId, username, score: 0, isHost: false };
  room.players.push(newPlayer);

  return { room };
};

// Controller to remove player on disconnect -->
export const removePlayer = (socketId: string) => {
  for (const roomId in rooms) {
    const room = rooms[roomId];
    const playerIndex = room.players.findIndex((p) => p.socketId === socketId);

    if (playerIndex !== -1) {
      const leavingPlayer = room.players[playerIndex];
      room.players.splice(playerIndex, 1);
      if (room.players.length === 0) {
        delete rooms[roomId];
      }
      return { roomId, username: leavingPlayer.username };
    }
  }
  return null;
};
