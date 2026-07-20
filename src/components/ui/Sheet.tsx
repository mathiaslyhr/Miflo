import type { ReactNode } from "react";
import { GLASS_SHEET } from "./glass";

/*
 * The frosted panel that carries readable text over the moving gradient.
 *
 * Long pages (privacy is the worst case) get one panel around the whole
 * document rather than one per section, so the reader isn't looking through a
 * ladder of stacked scrims.
 *
 * The material itself lives in ./glass — see the note there on why it's tinted
 * rather than neutral black, and why it sits at 85%.
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
      className={`rounded-3xl px-6 py-10 sm:px-12 sm:py-14 ${GLASS_SHEET} ${className}`}
    >
      {children}
    </div>
  );
}
