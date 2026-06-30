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
}: {
  children: ReactNode;
  /** Tailwind positioning utilities, e.g. "left-0 top-10". */
  className?: string;
  /** Stagger, in ms, for entrance + drift. */
  delay?: number;
}) {
  return (
    <div
      className={`absolute z-20 animate-rise ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="animate-float rounded-card border border-divider bg-surface/90 px-3.5 py-3 shadow-xl shadow-black/40 backdrop-blur"
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
}
