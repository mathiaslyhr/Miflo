/**
 * Regenerates the site's favicon and Apple touch icon from the brand mark.
 *
 *   node scripts/generate-icons.mjs
 *
 * The mark is the "m." from the app icon, and the geometry here is copied from
 * MifloApp `src/core/ui/AppMark.tsx` — keep the two in step. Drawn on a 1024
 * grid: legs at x=312/504/696, arches spring at y=456, hump radius 96, baseline
 * y=664, and the purple ball is the right leg's terminal at (696,664) r=56.
 *
 * Colours are the app icon's own, sampled from icon-1024.png rather than
 * mapped onto the site tokens. The ball is already the brand primary, so the
 * two agree anyway.
 *
 * The mark sits on transparency — no tile. Two consequences worth knowing:
 * a near-black mark is invisible against a dark browser tab bar, and iOS
 * composites Apple touch icon transparency onto black, so the home-screen
 * icon has the same problem. Give these a tile if either starts to matter.
 * With no tile framing it, the mark is scaled up to fill more of the canvas.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "app");

const INK = "#0a0a0a";
const BALL = "#6260ff"; // == --color-primary

const STROKE = 92;
const M_LEFT = "M 312 664 L 312 456 A 96 96 0 0 1 504 456 L 504 664";
const M_RIGHT = "M 504 456 A 96 96 0 0 1 696 456 L 696 532";

// Tight bounding box of the art: the stroke caps fix left/top, the ball fixes
// right/bottom. Matches AppMark's viewBox maths so the framing is identical.
const VB = { x: 312 - STROKE / 2, y: 360 - STROKE / 2 };
const VB_W = Math.max(696 + STROKE / 2, 752) - VB.x;
const VB_H = Math.max(664 + STROKE / 2, 720) - VB.y;

/**
 * @param size    output square, in px
 * @param inset   fraction of the tile the mark spans (0.62 = 19% margin a side)
 */
function svg(size, inset) {
  const w = size * inset;
  const scale = w / VB_W;
  const h = VB_H * scale;
  const tx = (size - w) / 2;
  const ty = (size - h) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <g transform="translate(${tx} ${ty}) scale(${scale}) translate(${-VB.x} ${-VB.y})">
    <path d="${M_LEFT}" stroke="${INK}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="${M_RIGHT}" stroke="${INK}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="696" cy="664" r="56" fill="${BALL}"/>
  </g>
</svg>`;
}

const targets = [
  // Browser tab / bookmarks. Next serves this for /icon.png.
  { file: "icon.png", size: 512, inset: 0.88 },
  // Apple touch icon. iOS applies its own corner mask, so the art keeps a
  // little more breathing room to survive the crop.
  { file: "apple-icon.png", size: 180, inset: 0.78 },
];

for (const t of targets) {
  const out = join(OUT, t.file);
  await sharp(Buffer.from(svg(t.size, t.inset)))
    .png()
    .toFile(out);
  console.log(`wrote ${t.file} (${t.size}x${t.size})`);
}
