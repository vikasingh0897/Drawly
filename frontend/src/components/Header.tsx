import { useState } from 'react';
import { Link } from 'react-router-dom';
import HowToPlay from '../components/HowToPlay';

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-card border-b border-outline-variant/30">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center transition-opacity hover:opacity-80 focus:outline-none"
            aria-label="Go to homepage"
          >
            <img src="/drawly-og-image.png" alt="Drawly Logo" className="h-24 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="items-center gap-[var(--spacing-md)] md:flex">
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer rounded-[var(--radius-lg)] bg-primary px-5 py-2.5 text-on-primary shadow-sm transition-colors hover:bg-primary-container hover:text-on-primary-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              style={{
                fontFamily: 'var(--font-label-md)',
                fontSize: 'var(--text-label-md)',
                fontWeight: 'var(--text-label-md--font-weight)',
              }}
            >
              How To Play
            </button>
          </nav>
        </div>
      </header>

      {/* Render directly without createPortal */}
      {showModal && <HowToPlay onClose={() => setShowModal(false)} />}
    </>
  );
}
