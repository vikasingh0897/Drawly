import type { MouseEvent } from 'react';

interface HowToPlayProps {
  onClose: () => void;
}

export default function HowToPlay({ onClose }: HowToPlayProps) {
  const handleModalClick = (e: MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 sm:p-4 md:p-6 backdrop-blur-sm transition-all"
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={handleModalClick}
        className="flex w-full max-w-[512px] max-h-[92dvh] sm:max-h-[85vh] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white p-4 sm:p-5 md:p-6 shadow-2xl"
      >
        {/* Header */}
        <h2 className="shrink-0 border-b-2 border-outline-variant/30 pb-3 font-headline-md text-lg sm:text-xl font-bold leading-tight text-primary">
          How to Play Drawly 🎨
        </h2>

        {/* Scrollable Content */}
        <div className="my-3 flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden pr-2 sm:my-4 sm:gap-5 break-words text-on-surface-variant">
          <section>
            <h3 className="mb-1.5 font-label-md text-base sm:text-lg font-semibold text-on-background">
              ✏️ When You Are Drawing
            </h3>
            <ul className="list-outside list-disc space-y-1.5 pl-5 font-body-md text-sm sm:text-base leading-snug sm:leading-relaxed">
              <li>Select one of the 3 secret words provided.</li>
              <li>
                You have <strong className="font-semibold text-on-background">60 seconds</strong> to
                draw the word.
              </li>
              <li>Use the color picker to change colors.</li>
              <li className="italic">No letters or numbers allowed on the canvas!</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-1.5 font-label-md text-base sm:text-lg font-semibold text-on-background">
              🕵️ When You Are Guessing
            </h3>
            <ul className="list-outside list-disc space-y-1.5 pl-5 font-body-md text-sm sm:text-base leading-snug sm:leading-relaxed">
              <li>Watch the canvas closely as the drawer sketches.</li>
              <li>
                Type your guesses into the{' '}
                <strong className="font-semibold text-on-background">chat box</strong>.
              </li>
              <li>
                If you guess the exact word, you earn{' '}
                <strong className="font-semibold text-on-background">10 points</strong>.
              </li>
              <li>Correct guesses are hidden from the chat so others can still guess!</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-1.5 font-label-md text-base sm:text-lg font-semibold text-on-background">
              🏆 Winning
            </h3>
            <ul className="list-outside list-disc space-y-1.5 pl-5 font-body-md text-sm sm:text-base leading-snug sm:leading-relaxed">
              <li>Everyone gets one turn to be the drawer.</li>
              <li>The player with the most points when the final round ends wins!</li>
            </ul>
          </section>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="mt-2 shrink-0 w-full rounded-lg bg-primary py-3 sm:py-3.5 font-label-md text-sm sm:text-base font-semibold tracking-wide text-on-primary transition-colors hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Got it, let's play!
        </button>
      </div>
    </div>
  );
}
