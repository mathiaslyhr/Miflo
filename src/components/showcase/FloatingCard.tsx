import type { ReactNode } from "react";

/**
 * An "isolated" app-component card that floats around the phone in the hero.
 * Outer element handles absolute positioning + the entrance animation; the
 * inner element handles the gentle idle drift so the two transforms don't
 * fight. `prefers-reduced-motion` (globals.css) disables both.
 */
export function FloatingCard({
  children,
  className = "",
  delay = 0,
  pill = false,
}: {
  children: ReactNode;
  /** Tailwind positioning utilities, e.g. "left-0 top-10". */
  className?: string;
  /** Stagger, in ms, for entrance + drift. */
  delay?: number;
  /** Fully-round corners — the app's toast silhouette (radii.pill). */
  pill?: boolean;
}) {
  return (
    <div
      className={`absolute z-20 animate-rise ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/*
        The one place on the site that keeps a shadow. Cards are flat, because
        on dark a shadow reads as a smudge and brightness carries elevation —
        but these genuinely hover off the page beside the phone, and the drop
        shadow is what sells that. Same exception the app makes for its nav
        island, sheets and toasts.
      */}
      <div
        className={`animate-float border border-rim-2 bg-surface px-3.5 py-3 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.65)] ${
          pill ? "rounded-full" : "rounded-card"
        }`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
}
