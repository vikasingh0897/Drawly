import { socket } from '../socket';

interface Player {
  socketId: string;
  username: string;
  score: number;
  isHost: boolean;
}

interface LeaderboardProps {
  players: Player[];
}

export default function Leaderboard({ players }: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full lg:w-56 p-2 lg:p-4 bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] rounded-[var(--radius-lg)] shadow-sm order-2 lg:order-1 text-left shrink-0">
      <h3 className="text-xs lg:text-base font-bold text-[var(--color-on-surface)] pb-1 lg:pb-2 mb-1.5 lg:mb-3 border-b border-[var(--color-outline-variant)] hidden lg:block">
        Leaderboard
      </h3>

      {/* Horizontally scrolls on mobile viewports; switches to stacked vertical columns on desktop screens */}
      <ul className="flex flex-row lg:flex-col gap-1.5 list-none p-0 m-0 overflow-x-auto lg:overflow-x-visible overflow-y-hidden lg:overflow-y-visible whitespace-nowrap lg:whitespace-normal [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sortedPlayers.map((p, index) => (
          <li
            key={p.socketId}
            className={`p-1.5 px-2.5 lg:p-2 rounded-[var(--radius-default)] border flex items-center justify-between gap-3 text-[11px] lg:text-sm shrink-0 ${
              p.socketId === socket.id
                ? 'bg-[var(--color-primary-fixed-dim)] border-[var(--color-primary)] font-bold'
                : 'bg-[var(--color-surface-container-lowest)] border-[var(--color-outline-variant)]'
            }`}
          >
            <span className="flex items-center gap-1 truncate max-w-[100px] lg:max-w-none text-[var(--color-on-surface)]">
              <span className="text-[var(--color-on-surface-variant)] text-[9px] font-mono">
                #{index + 1}
              </span>
              {p.isHost && <span>HOST</span>}
              <span className="truncate">{p.username}</span>
            </span>
            <span className="bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] px-1 py-0.2 rounded text-[10px] lg:text-xs font-black font-mono">
              {p.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
