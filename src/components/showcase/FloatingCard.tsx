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
      <div
        className={`animate-float border border-white/65 bg-white/55 px-3.5 py-3 shadow-[0_20px_40px_-16px_rgba(20,15,50,0.28)] backdrop-blur-xl ${
          pill ? "rounded-full" : "rounded-card"
        }`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
}
