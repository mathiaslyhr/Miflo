/**
 * Countdown colour scale, as time runs down: dark green → light green →
 * yellow → orange → red. `progress` is the fraction of time *remaining* (1→0).
 *
 * The canonical copy lives here rather than in showcase/parts.tsx, so the
 * shipping UI doesn't depend on that (currently unused) gallery code. The five
 * bands match the `drainTint` keyframes in globals.css: keep them in step.
 */
export function timerColor(progress: number): string {
  if (progress > 0.8) return "var(--color-timer-1)"; // loads of time
  if (progress > 0.6) return "var(--color-timer-2)";
  if (progress > 0.4) return "var(--color-timer-3)";
  if (progress > 0.2) return "var(--color-timer-4)";
  return "var(--color-timer-5)"; // almost out
}

/*
 * A progress bar whose value rides the end of the fill in a pill, rather than
 * sitting in a corner label. Keeping the number attached to the bar's head is
 * what makes it readable at a glance: the eye lands on the bar and the value
 * at once, instead of pairing them across the card.
 *
 * Every meter on this site shows something the app actually tracks — a round
 * timer, guesses used, a streak, party size. There are no invented figures
 * here, and there shouldn't be: a fake "98% satisfaction" bar is the fastest
 * way to make a real product look like a template.
 */

export type MeterTone = "accent" | "success" | "timer";

function toneColor(tone: MeterTone, value: number): string {
  if (tone === "timer") return timerColor(value);
  return tone === "success" ? "var(--color-success)" : "var(--color-primary)";
}

export function Meter({
  /** 0–1. For `timer`, the fraction *remaining*. */
  value,
  label,
  tone = "accent",
  /** Accessible name. Required: the pill alone doesn't say what's measured. */
  title,
}: {
  value: number;
  label?: string;
  tone?: MeterTone;
  title: string;
}) {
  const pct = Math.max(0, Math.min(1, value));
  const color = toneColor(tone, pct);

  return (
    // py leaves room for the pill, which stands taller than the track.
    <div className="relative py-2.5">
      <div
        className="h-1.5 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-valuenow={Math.round(pct * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={title}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${pct * 100}%`, backgroundColor: color }}
        />
      </div>

      {label ? (
        <span
          aria-hidden
          className="absolute top-1/2 flex -translate-y-1/2 items-center rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums text-bg"
          style={{
            backgroundColor: color,
            // Ride the fill's head, then pull back inside the track at the
            // extremes so the pill never hangs off either end.
            left: `clamp(0%, ${pct * 100}%, 100%)`,
            transform: `translate(${pct > 0.5 ? "-100%" : "0"}, -50%)`,
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

/**
 * The same bar, draining on a loop — a live round timer rather than a
 * snapshot. Pure CSS (see `.drain-bar` in globals.css), so it costs no JS.
 *
 * Under `prefers-reduced-motion` the animation is switched off globally, and
 * the bar falls back to the static base style set here: a part-spent amber
 * timer. That resting state matters — without it the bar would settle at the
 * animation's end value and read as "time already up".
 */
export function AnimatedMeter({
  seconds = 12,
  title,
}: {
  seconds?: number;
  title: string;
}) {
  return (
    <div
      className="h-1.5 overflow-hidden rounded-full bg-surface-2"
      role="progressbar"
      aria-label={title}
      aria-valuetext="Round timer running"
    >
      <div
        className="drain-bar h-full rounded-full"
        style={
          {
            width: "62%",
            backgroundColor: "var(--color-timer-3)",
            "--drain-duration": `${seconds}s`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

/**
 * Discrete progress — "guess 4 of 10" — as filled segments rather than a
 * continuous bar. Correct whenever the underlying quantity is countable: a
 * smooth bar would imply you can be 3.5 guesses in.
 */
export function SegmentMeter({
  used,
  total,
  tone = "accent",
  title,
}: {
  used: number;
  total: number;
  tone?: Exclude<MeterTone, "timer">;
  title: string;
}) {
  const color = toneColor(tone, 1);
  return (
    <div
      className="flex items-center gap-1"
      role="progressbar"
      aria-valuenow={used}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={title}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="h-1.5 flex-1 rounded-full"
          style={{
            backgroundColor: i < used ? color : "var(--color-surface-2)",
          }}
        />
      ))}
    </div>
  );
}
