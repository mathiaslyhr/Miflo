/*
 * The single palette behind CirclesHero.
 *
 * Three parts, the same shape the gradient study used:
 *   - `bg`     : the page gradient, purely horizontal (90°), dark → light
 *   - `circle` : the gradient inside each circle, diagonal (45°), dark → near-white
 *   - `glow`   : an "r,g,b" triplet (no alpha) for the dark inner shadow in each circle
 *
 * The ramp is built around the app's own primary, #6260ff — deep indigo on the
 * left, the brand purple through the middle, near-white on the right. #8583ff
 * is `--color-primary-ink` in globals.css, so the highlight end of the ramp is
 * the same tone the rest of the site uses for accent text.
 */

export type Palette = {
  bg: string;
  circle: string;
  glow: string;
};

export const MIFLO_PALETTE: Palette = {
  bg: "linear-gradient(90deg, #17123f 0%, #261f80 20%, #3f39c6 40%, #6260ff 60%, #a3a1ff 80%, #efedff 100%)",
  circle:
    "linear-gradient(45deg, #17123f 0%, #1e1857 18%, #2c2489 32%, #3f39c6 46%, #5651ee 58%, #8583ff 72%, #b5b3ff 84%, #e2e1ff 94%, #fbfaff 100%)",
  glow: "35,28,110",
};
