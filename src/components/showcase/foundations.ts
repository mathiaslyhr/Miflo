/**
 * Design-language reference data for the Foundations section of the gallery.
 * Mirrors the tokens in `globals.css` — keep in sync when tokens change.
 */

export const COLOR_TOKENS = [
  { name: "bg", hex: "#0b0b0f", cls: "bg-bg" },
  { name: "surface", hex: "#17171c", cls: "bg-surface" },
  { name: "surface-2", hex: "#202027", cls: "bg-surface-2" },
  { name: "surface-3", hex: "#2a2a33", cls: "bg-surface-3" },
  { name: "rim", hex: "#262630", cls: "bg-rim" },
  { name: "rim-2", hex: "#33333d", cls: "bg-rim-2" },
  { name: "divider", hex: "#22222b", cls: "bg-divider" },
  { name: "ink", hex: "#f5f5f5", cls: "bg-ink" },
  { name: "muted", hex: "#a3a3a3", cls: "bg-muted" },
  { name: "faint", hex: "#6e6e6e", cls: "bg-faint" },
  { name: "primary", hex: "#6260ff", cls: "bg-primary" },
  { name: "primary-ink", hex: "#8583ff", cls: "bg-primary-ink" },
  { name: "success", hex: "#3fd07c", cls: "bg-success" },
  { name: "error", hex: "#ff6a61", cls: "bg-error" },
  { name: "info", hex: "#5b9cff", cls: "bg-info" },
];

/**
 * The elevation ladder, in order. Three rules, ported from the app:
 * elevation is brightness (not shadow); a rim is always lighter than the
 * surface it sits on; never skip a step.
 */
export const ELEVATION = [
  { step: "page", surface: "#0b0b0f", rim: "—" },
  { step: "card", surface: "#17171c", rim: "#262630" },
  { step: "raised", surface: "#202027", rim: "#33333d" },
  { step: "pressed", surface: "#2a2a33", rim: "#33333d" },
];

/**
 * Text contrast against --color-bg. `faint` clears 3:1 (large text) but not
 * 4.5:1, so it is for non-essential meta only — never body copy.
 */
export const TEXT_TOKENS = [
  { name: "ink", hex: "#f5f5f5", contrast: "18.1:1", use: "headings, body" },
  { name: "muted", hex: "#a3a3a3", contrast: "9.3:1", use: "secondary body" },
  { name: "faint", hex: "#6e6e6e", contrast: "4.0:1", use: "meta, captions" },
];

export const TIMER_TOKENS = [
  { name: "timer-1", hex: "#3fd07c", note: "full" },
  { name: "timer-2", hex: "#7ed99a", note: "" },
  { name: "timer-3", hex: "#f5c451", note: "half" },
  { name: "timer-4", hex: "#f2913d", note: "" },
  { name: "timer-5", hex: "#ff6a61", note: "empty" },
];

export const TYPE_SCALE = [
  { label: "Display / H1", cls: "text-5xl font-medium tracking-tight", note: "48–60px · titles" },
  { label: "Heading / H2", cls: "text-3xl font-medium tracking-tight", note: "30–36px · sections" },
  { label: "Title / H3", cls: "text-2xl font-medium tracking-tight", note: "24px · cards" },
  { label: "Lead", cls: "text-lg leading-relaxed", note: "18px · intros" },
  { label: "Body", cls: "text-base", note: "16px · default" },
  { label: "Small", cls: "text-sm", note: "14px · UI / labels" },
  { label: "Caption", cls: "text-[11px]", note: "11px · meta" },
  { label: "Mono", cls: "font-mono text-base", note: "codes & scores" },
];

export const RADII = [
  { name: "card", cls: "rounded-card", note: "16px" },
  { name: "button", cls: "rounded-button", note: "14px" },
  { name: "full", cls: "rounded-full", note: "pills / avatars" },
];

export const SPACING = [
  { name: "gap-2", px: "8px" },
  { name: "gap-4", px: "16px" },
  { name: "gap-6", px: "24px" },
  { name: "py-8", px: "32px" },
  { name: "py-14", px: "56px" },
];

export const MOTION = [
  {
    name: "rise",
    desc: "Entrance — fade + 18px lift, 0.7s ease-out-quint. Staggered on the hero.",
  },
  { name: "float", desc: "Idle drift for the hero floating cards, 6s loop." },
  {
    name: "drain",
    desc: "Round timer: width runs down while the tint steps through the countdown scale (globals.css `.drain-bar`). Pure CSS.",
  },
  {
    name: "press",
    desc: "Every control: scale 0.96 + slight dim on :active, spring back. Hover brightens one rung instead of growing.",
  },
  {
    name: "reduced-motion",
    desc: "All animation is disabled under prefers-reduced-motion (globals.css). The drain bar falls back to a static part-spent amber timer.",
  },
];
