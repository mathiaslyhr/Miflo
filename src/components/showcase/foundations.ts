/**
 * Design-language reference data for the Foundations section of the gallery.
 * Mirrors the tokens in `globals.css` — keep in sync when tokens change.
 */

export const COLOR_TOKENS = [
  { name: "bg", hex: "#ffffff", cls: "bg-bg" },
  { name: "surface", hex: "#ffffff", cls: "bg-surface" },
  { name: "surface-2", hex: "#f1eefb", cls: "bg-surface-2" },
  { name: "divider", hex: "rgba(13,13,22,0.1)", cls: "bg-divider" },
  { name: "ink", hex: "#0d0d16", cls: "bg-ink" },
  { name: "muted", hex: "#5b5b6b", cls: "bg-muted" },
  { name: "accent", hex: "#6260f6", cls: "bg-accent" },
  { name: "accent-ink", hex: "#4a48d6", cls: "bg-accent-ink" },
  { name: "success", hex: "#32c36c", cls: "bg-success" },
  { name: "error", hex: "#f0544a", cls: "bg-error" },
];

export const TIMER_TOKENS = [
  { name: "timer-1", hex: "#32c36c", note: "full" },
  { name: "timer-2", hex: "#7ed99a", note: "" },
  { name: "timer-3", hex: "#f5c451", note: "half" },
  { name: "timer-4", hex: "#f2913d", note: "" },
  { name: "timer-5", hex: "#f0544a", note: "empty" },
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
    name: "toast",
    desc: "In-app toasts drop in from the top under the island, auto-dismiss.",
  },
  {
    name: "sheet",
    desc: "The leave-room confirm slides up from the bottom over a scrim.",
  },
  {
    name: "reduced-motion",
    desc: "All animation is disabled under prefers-reduced-motion (globals.css).",
  },
];
