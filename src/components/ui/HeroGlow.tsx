import type { CSSProperties } from "react";

/*
 * The one gradient left on the site.
 *
 * The old light theme ran a seven-hue rainbow mesh down every page. The dark
 * palette can't carry that: every surface is now a solid step on an elevation
 * ladder, and a wash behind them would break the "elevation is brightness"
 * reading — a card would look raised or sunk depending on what colour happened
 * to sit behind it. So the gradient survives in exactly one place, as
 * atmosphere behind the hero, where there are no cards to confuse.
 *
 * Two blurred purple blooms over the page colour, drifting out of phase.
 * Purely decorative, so it's aria-hidden and sits behind everything.
 */

type Bloom = { c: string; s: CSSProperties };

/*
 * Kept deliberately weak. The first pass ran these at 0.22/0.14 across most of
 * the viewport, which lifted the whole top of the page to a washed navy and
 * cost the palette its near-black ground — the cards stopped reading as the
 * lightest thing on screen. These sit lower in opacity and higher up the page,
 * so the glow is something you notice behind the headline rather than a
 * coloured background.
 */
const BLOOMS: Bloom[] = [
  {
    c: "rgba(98,96,255,0.16)",
    s: {
      width: "46vmax",
      height: "46vmax",
      left: "-4%",
      top: "-30%",
      filter: "blur(130px)",
    },
  },
  {
    c: "rgba(133,131,255,0.10)",
    s: {
      width: "38vmax",
      height: "38vmax",
      right: "-2%",
      top: "-22%",
      filter: "blur(150px)",
    },
  },
];

/**
 * Renders as the first child of a `relative` container. The container needs
 * `overflow-hidden`, or the blooms widen the page on small viewports.
 */
export function HeroGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {BLOOMS.map((bloom, i) => (
        <div
          key={i}
          className="drop-blob absolute rounded-full"
          style={{
            background: bloom.c,
            ...bloom.s,
            animationDuration: `${20 + i * 4}s`,
            animationDelay: `${-i * 5}s`,
          }}
        />
      ))}
      {/* Fades the blooms into the page colour so there's no visible edge. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
