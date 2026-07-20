import type { ReactNode } from "react";

/*
 * The frosted panel that carries readable text over the moving gradient.
 *
 * Same material as the nav pill, but much denser, and that difference matters.
 * The pill only ever sits over the dark left end of the gradient, so 55% works
 * there. A page panel spans the whole viewport, including the near-white right
 * end, where white text on a 55% scrim drops to roughly 1.8:1 — unreadable.
 * At 80% the text clears 4.5:1 anywhere on the ramp. It still reads as frosted;
 * it just isn't transparent enough for the background to break legibility.
 *
 * Long pages (privacy is the worst case) get one panel around the whole
 * document rather than one per section, so the reader isn't looking through a
 * ladder of stacked scrims.
 */

export function Sheet({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-3xl border border-white/15 bg-neutral-950/80 " +
        "shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl " +
        `px-6 py-10 sm:px-10 sm:py-12 ${className}`
      }
    >
      {children}
    </div>
  );
}
