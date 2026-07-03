import type { CSSProperties } from "react";

/*
 * The gradient engine (design.md §4): a light linear-gradient base + four large,
 * heavily-blurred, rounded blobs pinned to the corners, each a tint of the same
 * hue, drifting slowly and out of phase.
 */

export type Blob = { c: string; s: CSSProperties };
export type Palette = { name: string; base: string; blobs: Blob[] };

/** blob factory: colour, size (vmax), anchor position, blur radius. */
export const b = (
  c: string,
  size: string,
  pos: CSSProperties,
  blur = 120,
): Blob => ({
  c,
  s: { width: size, height: size, filter: `blur(${blur}px)`, ...pos },
});

/** A monochrome palette: one hue, four tints spread across the corners. */
export const mono = (name: string, base: string, cs: string[]): Palette => ({
  name,
  base,
  blobs: [
    b(cs[0], "46vmax", { left: "-8%", top: "-6%" }),
    b(cs[1], "40vmax", { right: "-6%", top: "8%" }, 130),
    b(cs[2], "48vmax", { bottom: "-10%", left: "40%" }),
    b(cs[3], "34vmax", { bottom: "2%", left: "6%" }),
  ],
});

export const GRADIENTS: Palette[] = [
  {
    // Lilac keeps its bespoke layout — the signature brand palette.
    name: "Lilac",
    base: "linear-gradient(180deg,#ffffff 0%,#f5f2fc 55%,#ece4fb 100%)",
    blobs: [
      b("rgba(98,96,246,0.35)", "46vmax", { left: "8%", top: "6%" }),
      b("rgba(122,120,248,0.24)", "40vmax", { right: "2%", top: "10%" }, 130),
      b("rgba(98,96,246,0.40)", "52vmax", { bottom: "-8%", left: "46%" }),
      b("rgba(150,140,250,0.22)", "34vmax", { bottom: "4%", left: "10%" }),
    ],
  },
  mono("Rose", "linear-gradient(160deg,#fdf0f4 0%,#fff7f9 52%,#fbe7f0 100%)", [
    "rgba(244,169,204,0.60)",
    "rgba(248,190,214,0.50)",
    "rgba(235,128,178,0.45)",
    "rgba(250,206,224,0.52)",
  ]),
  mono("Coral", "linear-gradient(160deg,#fdeee7 0%,#fff6f2 50%,#fce4da 100%)", [
    "rgba(246,158,138,0.58)",
    "rgba(249,182,158,0.50)",
    "rgba(240,126,104,0.44)",
    "rgba(251,204,186,0.52)",
  ]),
  mono("Peach", "linear-gradient(160deg,#fdf1e6 0%,#fff8f0 52%,#fbe6d4 100%)", [
    "rgba(248,196,150,0.58)",
    "rgba(250,212,178,0.50)",
    "rgba(244,168,116,0.44)",
    "rgba(252,222,194,0.52)",
  ]),
  {
    // Sand keeps its bespoke layout.
    name: "Sand",
    base: "linear-gradient(160deg,#fdf3e2 0%,#fbf6ec 52%,#f6e9d4 100%)",
    blobs: [
      b("rgba(247,214,170,0.60)", "44vmax", { left: "-6%", top: "-6%" }),
      b("rgba(245,205,180,0.50)", "38vmax", { left: "38%", top: "-8%" }),
      b("rgba(244,210,200,0.45)", "34vmax", { right: "4%", top: "6%" }),
      b("rgba(248,228,190,0.50)", "46vmax", { bottom: "-10%", left: "28%" }),
    ],
  },
  mono("Butter", "linear-gradient(160deg,#fdf8e4 0%,#fffdf2 52%,#f8f0cf 100%)", [
    "rgba(246,224,150,0.58)",
    "rgba(250,236,178,0.50)",
    "rgba(238,208,116,0.42)",
    "rgba(252,242,200,0.52)",
  ]),
  mono("Mint", "linear-gradient(160deg,#ecf8f2 0%,#f7fdfa 52%,#e0f2ea 100%)", [
    "rgba(150,224,196,0.55)",
    "rgba(180,232,214,0.50)",
    "rgba(110,208,178,0.44)",
    "rgba(198,238,224,0.52)",
  ]),
  mono("Sky", "linear-gradient(160deg,#eaf3fc 0%,#f6fbff 52%,#dfecfb 100%)", [
    "rgba(150,200,245,0.55)",
    "rgba(182,216,248,0.50)",
    "rgba(110,176,240,0.44)",
    "rgba(202,226,250,0.52)",
  ]),
  mono(
    "Periwinkle",
    "linear-gradient(160deg,#edecfc 0%,#f6f5ff 52%,#e4e4fb 100%)",
    [
      "rgba(150,148,240,0.55)",
      "rgba(182,180,246,0.50)",
      "rgba(120,116,234,0.42)",
      "rgba(202,200,250,0.52)",
    ],
  ),
];

/** Look a palette up by name (falls back to the first). */
export const palette = (name: string): Palette =>
  GRADIENTS.find((g) => g.name === name) ?? GRADIENTS[0];

/** Layered blurred blobs over a base wash — the reusable gradient. */
export function MeshGradient({ palette }: { palette: Palette }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: palette.base }} />
      {palette.blobs.map((bl, i) => (
        <div
          key={i}
          className="drop-blob absolute rounded-full"
          style={{
            background: bl.c,
            ...bl.s,
            animationDuration: `${18 + i * 3}s`,
            animationDelay: `${-i * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

/*
 * PageMesh — one continuous, page-spanning gradient (design.md §4, seamless
 * variant). Instead of one opaque MeshGradient per section (which leaves a hard
 * seam wherever two sections meet), a single layer spans the whole scroll
 * height: one tall vertical base wash flows through the hues, and blobs are
 * distributed down the page — positioned by percentage of the full height so
 * they bleed across the old section boundaries, sweeping a 7-hue rainbow
 * (pink→orange). Render once as the first child of a `relative` container.
 */

/** A blob pinned by page-height percentage; `top` drives the vertical journey. */
const pb = (c: string, size: string, pos: CSSProperties, blur = 140): Blob => ({
  c,
  s: { width: size, height: size, filter: `blur(${blur}px)`, ...pos },
});

/*
 * The vertical colour journey — a full 7-hue rainbow flowing top→bottom:
 * pink → purple → dark blue → light blue → green → yellow → orange (no red).
 * Two blurred blobs per hue, anchored by `top` percentage and overlapping
 * across every boundary so each transition blends (no hard steps). The lowest
 * (orange) blob sits at ~90% so the mesh's very bottom is dominated by the base
 * 100% stop, which matches the footer's top colour for a seamless hand-off.
 */
const HOME_BLOBS: Blob[] = [
  // Pink (top)
  pb("rgba(240,150,190,0.26)", "48vmax", { left: "-6%", top: "-2%" }),
  pb("rgba(244,175,205,0.20)", "40vmax", { right: "-4%", top: "10%" }, 150),
  // Purple
  pb("rgba(120,116,234,0.24)", "48vmax", { right: "0%", top: "24%" }, 150),
  pb("rgba(150,148,240,0.18)", "40vmax", { left: "-6%", top: "31%" }),
  // Dark blue
  pb("rgba(88,142,228,0.26)", "50vmax", { left: "6%", top: "42%" }, 150),
  // Light blue
  pb("rgba(150,200,245,0.24)", "48vmax", { right: "-4%", top: "53%" }),
  pb("rgba(176,214,248,0.18)", "40vmax", { left: "-4%", top: "59%" }, 150),
  // Green
  pb("rgba(90,206,168,0.26)", "54vmax", { right: "-4%", top: "69%" }, 150),
  pb("rgba(130,220,190,0.20)", "44vmax", { left: "-6%", top: "75%" }),
  // Yellow
  pb("rgba(244,220,140,0.26)", "48vmax", { right: "8%", top: "84%" }, 150),
  // Orange (footer region)
  pb("rgba(246,184,132,0.28)", "44vmax", { right: "-4%", top: "94%" }, 150),
];

/*
 * The base wash: one 180deg gradient with closely-spaced, near-white pastel
 * stops (design.md palette tints — Rose/Lilac/Sky/Mint/Butter/Peach) so hues
 * never jump and plenty of white shows between the blooms. The mesh spans the
 * whole page (incl. the footer), so it ends warm at 100% behind the footer.
 */
const HOME_BASE =
  "linear-gradient(180deg," +
  "#fdf2f7 0%," + // pink
  "#f7e5ef 15%," + // rose
  "#ece6f8 30%," + // purple
  "#e1e7f7 44%," + // dark blue
  "#e6f1fb 57%," + // light blue
  "#e2f3ea 70%," + // green
  "#f1f2d8 84%," + // yellow
  "#f9e8d2 100%)"; // orange (behind footer)

/*
 * Per-route pattern generator. The base wash (HOME_BASE) is identical on every
 * page, so all pages read as the same rainbow; only the blob *arrangement*
 * varies by `seed`. Deterministic (FNV-1a hash → mulberry32 PRNG) so SSR and
 * client render the same markup — no hydration mismatch, no Math.random.
 */
function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number): () => number {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The 7 rainbow blooms: rgba prefix, base alpha, nominal vertical centre (%). */
const RAINBOW: { c: string; a: number; at: number }[] = [
  { c: "rgba(240,150,190,", a: 0.26, at: 3 }, // pink
  { c: "rgba(150,148,240,", a: 0.22, at: 20 }, // purple
  { c: "rgba(88,142,228,", a: 0.26, at: 35 }, // dark blue
  { c: "rgba(150,200,245,", a: 0.24, at: 50 }, // light blue
  { c: "rgba(90,206,168,", a: 0.26, at: 66 }, // green
  { c: "rgba(244,220,140,", a: 0.26, at: 82 }, // yellow
  { c: "rgba(246,184,132,", a: 0.28, at: 94 }, // orange (footer region)
];

/** A distinct-but-stable blob pattern for a route. Hues stay in their vertical
 *  band (rainbow order preserved); only side/offset/size/count vary. */
function rainbowBlobs(seed: string): Blob[] {
  const rnd = mulberry32(hashSeed(seed));
  const out: Blob[] = [];
  for (const h of RAINBOW) {
    const size1 = 44 + Math.round(rnd() * 14); // 44–58vmax
    const side1 = rnd() < 0.5 ? "left" : "right";
    const off1 = -8 + Math.round(rnd() * 20); // -8%..+12%
    const top1 = h.at + Math.round((rnd() - 0.5) * 8); // ±4%
    out.push(
      pb(h.c + h.a.toFixed(2) + ")", size1 + "vmax", {
        [side1]: off1 + "%",
        top: top1 + "%",
      }),
    );
    if (rnd() < 0.55) {
      const size2 = 34 + Math.round(rnd() * 10);
      const side2 = side1 === "left" ? "right" : "left";
      const off2 = -6 + Math.round(rnd() * 16);
      const top2 = h.at + Math.round((rnd() - 0.5) * 8);
      out.push(
        pb(h.c + (h.a * 0.72).toFixed(2) + ")", size2 + "vmax", {
          [side2]: off2 + "%",
          top: top2 + "%",
        }),
      );
    }
  }
  return out;
}

export function PageMesh({ seed }: { seed?: string }) {
  const blobs = seed ? rainbowBlobs(seed) : HOME_BLOBS;
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: HOME_BASE }} />
      {blobs.map((bl, i) => (
        <div
          key={i}
          className="drop-blob absolute rounded-full"
          style={{
            background: bl.c,
            ...bl.s,
            animationDuration: `${18 + (i % 4) * 3}s`,
            animationDelay: `${-i * 4}s`,
          }}
        />
      ))}
    </div>
  );
}
