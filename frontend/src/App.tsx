import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import GameRoom from './pages/GamePage';
import Landing from './pages/LandingPage';
import { socket } from './socket';

export default function App() {
  const [username, setUsername] = useState('');
  const [roomIdInput, setRoomIdInput] = useState('');

  const [room, setRoom] = useState<any>(null);
  const [wordChoices, setWordChoices] = useState<string[]>([]);
  const [roundMessage, setRoundMessage] = useState('');
  const [finalLeaderboard, setFinalLeaderboard] = useState<any[] | null>(null);

  const [hintWord, setHintWord] = useState<string[]>([]);
  const [mySelectedWord, setMySelectedWord] = useState<string>('');

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [roundEndTime, setRoundEndTime] = useState<number | null>(null);

  useEffect(() => {
    socket.on('room_updated', (updatedRoom) => setRoom(updatedRoom));
    socket.on('players_updated', (players) => setRoom((prev: any) => ({ ...prev, players })));
    socket.on('word_chosen', (words: string[]) => setWordChoices(words));

    socket.on('round_start', ({ drawerName }) => {
      setFinalLeaderboard(null);
      setRoundMessage(`${drawerName} is choosing a word...`);
      setWordChoices([]);
      setHintWord([]);
      setMySelectedWord('');
      setRoundEndTime(null);
    });

    socket.on('round_active', (data) => {
      setRoundMessage('');
      if (data && data.maskedWord) setHintWord(data.maskedWord);
      if (data && data.endTime) setRoundEndTime(data.endTime);
    });

    socket.on('timer_updated', (data) => {
      if (data && data.endTime) setRoundEndTime(data.endTime);
    });

    socket.on('hint_updated', (updatedMask: string[]) => {
      setHintWord(updatedMask);
    });

    socket.on('round_end', ({ wordWas }) => {
      setRoundMessage(`Round over! The word was: ${wordWas}`);
      setRoundEndTime(null);
    });

    socket.on('game_over', (data) => {
      if (data && data.leaderboard) setFinalLeaderboard(data.leaderboard);
      setRoundMessage('Game Over!');
    });

    return () => {
      socket.off('room_updated');
      socket.off('players_updated');
      socket.off('word_chosen');
      socket.off('round_start');
      socket.off('round_active');
      socket.off('timer_updated');
      socket.off('hint_updated');
      socket.off('round_end');
      socket.off('game_over');
    };
  }, []);

  useEffect(() => {
    if (!roundEndTime) {
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((roundEndTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [roundEndTime]);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) socket.emit('create_room', username);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && roomIdInput.trim()) {
      socket.emit('join_room', { roomId: roomIdInput, username });
    }
  };

  const startGame = () => {
    if (room && room.id) socket.emit('start_game', room.id);
  };

  const handleWordSelect = (word: string) => {
    if (room && room.id) {
      setMySelectedWord(word);
      socket.emit('word_selected', { roomId: room.id, word });
      setWordChoices([]);
    }
  };

  const handleRevealLetter = (index: number) => {
    if (room && room.id) {
      socket.emit('reveal_letter', { roomId: room.id, index });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      <Header />
      <main className="flex w-full flex-grow flex-col">
        {!room ? (
          <Landing
            username={username}
            setUsername={setUsername}
            roomIdInput={roomIdInput}
            setRoomIdInput={setRoomIdInput}
            onCreate={handleCreateRoom}
            onJoin={handleJoinRoom}
          />
        ) : (
          <GameRoom
            room={room}
            wordChoices={wordChoices}
            roundMessage={roundMessage}
            finalLeaderboard={finalLeaderboard}
            hintWord={hintWord}
            mySelectedWord={mySelectedWord}
            timeLeft={timeLeft}
            onStartGame={startGame}
            onWordSelect={handleWordSelect}
            onRevealLetter={handleRevealLetter}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
