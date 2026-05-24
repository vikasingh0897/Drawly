export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--color-outline-variant)] bg-[var(--color-surface)]/80 py-[var(--spacing-md)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-[var(--spacing-md)] px-[var(--spacing-margin-mobile)] md:flex-row md:px-[var(--spacing-margin-desktop)]">
        {/* Copyright & Developer Text */}
        <div className="flex flex-col items-center gap-2 md:items-start text-[var(--color-on-surface-variant)] text-[length:var(--text-label-md)] font-[var(--text-body-md--font-weight)]">
          <p>© {currentYear} Drawly | All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <span className="text-[var(--color-error)]" aria-label="love">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 animate-pulse"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </span>
            <span>by</span>
            <a
              href="https://github.com/vikasingh0897"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--text-label-md--font-weight)] text-[var(--color-on-surface)] transition-colors hover:text-[var(--color-primary)]"
            >
              vikasingh0897
            </a>
          </div>
        </div>

        {/* Social & Support Links */}
        <div className="flex flex-col items-center gap-[var(--spacing-sm)] md:flex-row md:gap-[var(--spacing-md)]">
          {/* Buy Me A Coffee Button */}
          <a
            href="https://www.buymeacoffee.com/vikasingh0897"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-[var(--radius-full)] bg-[#FFDD00] px-4 py-2 text-[length:var(--text-label-md)] font-[var(--text-label-md--font-weight)] text-[#000000] transition-transform duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            aria-label="Buy me a coffee"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Coffee"
              className="h-4 w-4"
            />
            Buy me a coffee
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-[var(--spacing-sm)]">
            <a
              href="https://github.com/vikasingh0897"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-on-surface-variant)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--color-on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-full p-1"
              aria-label="GitHub Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 md:h-6 md:w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/vikasingh0897"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-on-surface-variant)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#0A66C2] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-full p-1"
              aria-label="LinkedIn Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 md:h-6 md:w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
