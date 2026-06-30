import type { ReactNode } from "react";

/**
 * A stylised iPhone frame for the marketing showcase. Renders the hardware
 * shell, a dynamic island, and a status bar; `children` fill the screen.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[260px] rounded-[2.4rem] border border-divider bg-surface p-2 shadow-2xl shadow-black/60">
      <div className="relative overflow-hidden rounded-[2.1rem] bg-bg">
        {/* dynamic island */}
        <div className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

        {/* status bar */}
        <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-medium text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1.5" aria-hidden>
            {/* signal */}
            <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="7" width="3" height="4" rx="1" />
              <rect x="4.5" y="5" width="3" height="6" rx="1" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" />
            </svg>
            {/* wifi */}
            <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 2.2c2.5 0 4.8 1 6.5 2.6l-1.5 1.6A7.1 7.1 0 0 0 8 4.5c-2 0-3.8.8-5 2L1.5 4.8A9.2 9.2 0 0 1 8 2.2Zm0 3.4c1.4 0 2.7.5 3.6 1.5l-1.5 1.5A3 3 0 0 0 8 8c-.8 0-1.6.3-2.1.8L4.4 7.3A5 5 0 0 1 8 5.6Zm0 3.3c.6 0 1.1.2 1.5.6L8 10.8 6.5 9.5c.4-.4.9-.6 1.5-.6Z" />
            </svg>
            {/* battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect
                x="0.5"
                y="0.5"
                width="21"
                height="11"
                rx="3"
                stroke="currentColor"
                strokeOpacity="0.4"
              />
              <rect x="2" y="2" width="17" height="8" rx="1.6" fill="currentColor" />
              <rect
                x="23"
                y="4"
                width="1.5"
                height="4"
                rx="0.75"
                fill="currentColor"
                fillOpacity="0.4"
              />
            </svg>
          </span>
        </div>

        {/* screen content */}
        <div className="px-4 pb-6 pt-5">{children}</div>
      </div>
    </div>
  );
}

/** The default screen shown inside the phone: a live quiz question. */
export function QuizScreen() {
  const options = [
    { label: "Leicester City", correct: false },
    { label: "Chelsea", correct: true },
    { label: "Arsenal", correct: false },
  ];
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="rounded-full bg-surface-2 px-3 py-1 font-mono tracking-widest text-ink">
          ABCD
        </span>
        <span>Question 4 / 10</span>
      </div>

      <p className="mt-5 text-base font-medium leading-snug">
        Which club did N&apos;Golo Kant&eacute; join in 2016?
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {options.map((o) => (
          <div
            key={o.label}
            className={`flex items-center justify-between rounded-button px-4 py-2.5 text-sm ${
              o.correct ? "bg-accent text-white" : "bg-surface-2 text-muted"
            }`}
          >
            <span>{o.label}</span>
            {o.correct && (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12.5l4.5 4.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
