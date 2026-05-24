import Canvas from '../components/Canvas';
import Chat from '../components/Chat';
import Leaderboard from '../components/Leaderboard';
import { socket } from '../socket';

interface GameRoomProps {
  room: any;
  wordChoices: string[];
  roundMessage: string;
  finalLeaderboard: any[] | null;
  hintWord: string[];
  mySelectedWord: string;
  timeLeft: number;
  onStartGame: () => void;
  onWordSelect: (word: string) => void;
  onRevealLetter: (index: number) => void;
}

export default function GameRoom({
  room,
  wordChoices,
  roundMessage,
  finalLeaderboard,
  hintWord,
  mySelectedWord,
  timeLeft,
  onStartGame,
  onWordSelect,
  onRevealLetter,
}: GameRoomProps) {
  const isHost = room.players.find((p: any) => p.socketId === socket.id)?.isHost;
  const isDrawer =
    room.status === 'playing' && room.players[room.currentDrawerIndex]?.socketId === socket.id;

  return (
    <div className="w-full h-[100dvh] lg:h-auto max-w-7xl mx-auto p-2 sm:p-4 lg:p-6 font-sans flex flex-col text-center text-[var(--color-on-background)] overflow-hidden lg:overflow-visible">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 shrink-0">
        <h2 className="text-base sm:text-lg font-bold flex items-center gap-1.5">
          Room:
          <span className="bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] text-[var(--color-primary)] px-2 py-0.5 rounded-[var(--radius-default)] font-mono text-xs sm:text-sm">
            {room.id}
          </span>
        </h2>

        <div className="flex-1 flex items-center justify-end text-right min-h-[32px]">
          {room.status === 'waiting' && !finalLeaderboard ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-on-surface-variant)] animate-pulse hidden sm:inline">
                Waiting for players...
              </span>
              {isHost && (
                <button
                  onClick={onStartGame}
                  disabled={room.players.length < 2}
                  className="py-1 px-3 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--radius-full)] font-semibold shadow transition-all hover:bg-[var(--color-primary-container)] disabled:opacity-50 text-xs cursor-pointer"
                >
                  {room.players.length < 2 ? 'Need 2+ Players' : 'Start'}
                </button>
              )}
            </div>
          ) : (
            <div className="text-xs sm:text-sm font-bold flex items-center">
              {roundMessage && <span className="text-red-500 mr-2">{roundMessage}</span>}
              {!finalLeaderboard && hintWord.length === 0 && (
                <span className="bg-[var(--color-surface-container-low)] py-1 px-3 rounded-full border border-[var(--color-outline-variant)] inline-block">
                  {isDrawer ? 'Picking word...' : 'Drawer picking...'}
                </span>
              )}
              {timeLeft > 0 && !finalLeaderboard && (
                <span
                  className={`ml-3 font-mono font-bold text-lg sm:text-xl transition-colors ${
                    timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-[var(--color-primary)]'
                  }`}
                >
                  ⏱ {timeLeft}s
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {isDrawer && wordChoices.length > 0 && !finalLeaderboard && (
        <div className="mb-3 bg-[var(--color-surface-container-low)] p-2.5 rounded-[var(--radius-lg)] border border-[var(--color-outline-variant)] shrink-0 z-20 shadow-sm animate-fade-in">
          <p className="text-xs font-bold mb-1.5">Select a word to draw:</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {wordChoices.map((word) => (
              <button
                key={word}
                onClick={() => onWordSelect(word)}
                className="py-1 px-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-full text-xs font-semibold shadow transform active:scale-95 transition-all cursor-pointer"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      {hintWord.length > 0 && !finalLeaderboard && (
        <div className="mb-3 bg-[var(--color-surface-container-low)] p-3 sm:p-4 rounded-[var(--radius-lg)] border border-[var(--color-outline-variant)] flex flex-col items-center justify-center shrink-0 shadow-sm">
          {!isDrawer ? (
            <div className="text-2xl sm:text-3xl font-mono font-bold tracking-[0.5em] text-[var(--color-primary)] ml-[0.5em]">
              {hintWord.join('')}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-xs text-[var(--color-on-surface-variant)] mb-2 font-semibold uppercase tracking-wider">
                Click a letter to reveal as a hint
              </p>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
                {mySelectedWord.split('').map((char, index) => {
                  const isRevealed = hintWord[index] !== '_';
                  return (
                    <button
                      key={index}
                      disabled={isRevealed || char === ' '}
                      onClick={() => onRevealLetter(index)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-base font-bold rounded shadow-sm transition-all
                        ${
                          isRevealed
                            ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] opacity-60 cursor-not-allowed'
                            : char === ' '
                              ? 'bg-transparent shadow-none'
                              : 'bg-white text-[var(--color-on-surface)] border border-[var(--color-outline-variant)] hover:-translate-y-0.5 hover:shadow-md cursor-pointer'
                        }`}
                    >
                      {char}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 items-stretch lg:items-start justify-center w-full relative">
        <Leaderboard players={room.players || []} />
        <Canvas roomId={room.id} isDrawer={isDrawer} />
        <Chat roomId={room.id} />

        {finalLeaderboard && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center text-white z-50 p-4 rounded-[var(--radius-lg)] shadow-2xl">
            <h1 className="text-4xl sm:text-6xl font-black mb-2 text-yellow-400 drop-shadow-md animate-bounce">
              🏆 Game Over!
            </h1>

            <h2 className="text-lg sm:text-xl text-neutral-200 text-center mb-6">
              Winner:{' '}
              <span className="text-yellow-300 font-bold">{finalLeaderboard[0]?.username}</span> (
              {finalLeaderboard[0]?.score} pts)
            </h2>

            <div className="bg-white text-neutral-900 p-5 rounded-2xl min-w-[280px] sm:min-w-[360px] shadow-2xl flex flex-col">
              <h3 className="text-lg font-bold text-center pb-3 mb-3 border-b-2 border-neutral-100 text-neutral-600">
                Final Standings
              </h3>
              <ul className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
                {finalLeaderboard.map((p: any, idx: number) => (
                  <li
                    key={p.socketId}
                    className="flex justify-between items-center text-base sm:text-lg"
                  >
                    <span className="font-semibold truncate pr-4 text-neutral-700">
                      <span className="text-neutral-400 mr-2">#{idx + 1}</span>
                      {p.username}
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-mono font-bold shadow-sm border border-blue-100">
                      {p.score} pts
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {isHost ? (
              <button
                onClick={onStartGame}
                className="mt-8 py-3 px-8 bg-green-500 text-white font-bold rounded-full text-lg hover:bg-green-400 hover:scale-105 hover:shadow-lg transition-all cursor-pointer"
              >
                Play Again
              </button>
            ) : (
              <p className="mt-8 text-sm text-neutral-400 bg-neutral-900/50 px-4 py-2 rounded-full">
                Waiting for host to restart...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
