import React, { useState } from 'react';

interface LandingProps {
  username: string;
  setUsername: (name: string) => void;
  roomIdInput: string;
  setRoomIdInput: (id: string) => void;
  onCreate: (e: React.FormEvent) => void;
  onJoin: (e: React.FormEvent) => void;
}

type ViewState = 'menu' | 'create' | 'join';

export default function Landing({
  username,
  setUsername,
  roomIdInput,
  setRoomIdInput,
  onCreate,
  onJoin,
}: LandingProps) {
  const [view, setView] = useState<ViewState>('menu');

  return (
    /* Changed min-h-screen to min-h-[80vh] to control height while keeping flex centering */
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[var(--color-background)] canvas-grid">
      <div className="glass-card w-full max-w-[650px] p-6 sm:p-10 md:p-12 rounded-[var(--radius-xl)] shadow-2xl border border-[var(--color-surface-variant)] text-[var(--color-on-background)] transition-all">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10 w-full">
          <h1 className="text-4xl sm:text-5xl font-[var(--text-headline-xl--font-weight)] tracking-[var(--text-headline-xl--letter-spacing)] text-[var(--color-primary)] mb-3 drop-shadow-sm">
            🎨 Draw & Guess
          </h1>
          <p className="w-full max-w-[500px] mx-auto text-sm sm:text-base text-[var(--color-on-surface-variant)] leading-relaxed px-4">
            Unleash your creativity. Choose an option below to start playing!
          </p>
        </div>

        {/* Dynamic View Logic */}
        {view === 'menu' && (
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-stretch">
            {/* Create Option Card */}
            <button
              onClick={() => setView('create')}
              className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container-high)] rounded-[var(--radius-lg)] border border-[var(--color-outline-variant)] shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">✨</div>
              <h3 className="text-lg font-bold text-[var(--color-on-surface)] mb-1">Create Room</h3>
              <p className="text-xs text-[var(--color-on-surface-variant)]">
                Host a brand new game
              </p>
            </button>

            {/* Join Option Card */}
            <button
              onClick={() => setView('join')}
              className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container-high)] rounded-[var(--radius-lg)] border border-[var(--color-outline-variant)] shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🔑</div>
              <h3 className="text-lg font-bold text-[var(--color-on-surface)] mb-1">Join Room</h3>
              <p className="text-xs text-[var(--color-on-surface-variant)]">
                Enter an existing room code
              </p>
            </button>
          </div>
        )}

        {view === 'create' && (
          <form
            onSubmit={onCreate}
            className="w-full max-w-[440px] mx-auto flex flex-col gap-4 bg-[var(--color-surface-container-low)] p-6 rounded-[var(--radius-lg)] border border-[var(--color-outline-variant)] shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-outline-variant)] pb-3 mb-1">
              <button
                type="button"
                onClick={() => setView('menu')}
                className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-container)] cursor-pointer flex items-center gap-1 transition-colors"
              >
                ← Back
              </button>
              <h3 className="text-lg font-bold text-[var(--color-on-surface)]">
                Create a New Game
              </h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] rounded-[var(--radius-default)] border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-fixed)] transition-all outline-none text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-6 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--radius-full)] font-[var(--text-label-md--font-weight)] text-[length:var(--text-label-md)] hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)] transition-all cursor-pointer shadow-md active:scale-[0.98]"
            >
              Start Game As Host
            </button>
          </form>
        )}

        {view === 'join' && (
          <form
            onSubmit={onJoin}
            className="w-full max-w-[440px] mx-auto flex flex-col gap-4 bg-[var(--color-surface-container-low)] p-6 rounded-[var(--radius-lg)] border border-[var(--color-outline-variant)] shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-outline-variant)] pb-3 mb-1">
              <button
                type="button"
                onClick={() => setView('menu')}
                className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-container)] cursor-pointer flex items-center gap-1 transition-colors"
              >
                ← Back
              </button>
              <h3 className="text-lg font-bold text-[var(--color-on-surface)]">
                Join Existing Game
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] rounded-[var(--radius-default)] border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-fixed)] transition-all outline-none text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1">
                  Room ID
                </label>
                <input
                  type="text"
                  placeholder="Room ID"
                  value={roomIdInput}
                  onChange={(e) => setRoomIdInput(e.target.value)}
                  required
                  className="w-full p-3 bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] rounded-[var(--radius-default)] border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-fixed)] transition-all outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-6 bg-[var(--color-secondary)] text-[var(--color-on-secondary)] rounded-[var(--radius-full)] font-[var(--text-label-md--font-weight)] text-[length:var(--text-label-md)] hover:bg-[var(--color-secondary-container)] hover:text-[var(--color-on-secondary-container)] transition-all cursor-pointer shadow-md active:scale-[0.98]"
            >
              Enter Room
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
