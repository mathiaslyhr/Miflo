import { AnimatedMeter } from "@/components/ui";
import { HattrickGrid } from "@/components/games/visuals";

/**
 * The hero phone's screen: a Hattrick round mid-play, built in markup rather
 * than shipped as a screenshot.
 *
 * It replaces a PNG of the old light app. Drawing it means it stays sharp at
 * any size, re-tints with the tokens, weighs nothing next to a 1.2 MB capture,
 * and — the part a screenshot can't do — the round timer actually runs.
 */
export function HattrickScreen() {
  return (
    <div className="flex h-full flex-col">
      {/* app header */}
      <div className="flex items-center justify-between">
        <span
          aria-hidden
          className="flex h-6 w-6 items-center justify-center rounded-full border border-rim-2 bg-surface-2 text-muted"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="m15 18-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-[13px] font-medium text-ink">Hattrick</span>
        <span
          aria-hidden
          className="flex h-6 w-6 items-center justify-center rounded-full border border-rim-2 bg-surface-2 text-[10px] text-muted"
        >
          ?
        </span>
      </div>

      {/* Score line — without it the screen is a grid marooned in empty space,
          and it's also the thing that says "this is a match against someone". */}
      <div className="mt-4 flex items-center justify-between rounded-xl border border-rim-2 bg-surface-2 px-3 py-2">
        <div className="text-left">
          <p className="text-[9px] text-faint">You</p>
          <p className="text-sm font-medium text-accent-ink">2</p>
        </div>
        <span className="text-[9px] text-faint">Round 3</span>
        <div className="text-right">
          <p className="text-[9px] text-faint">Sebastian</p>
          <p className="text-sm font-medium text-error">1</p>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] font-medium text-accent-ink">
        Your turn
      </p>

      <div className="mt-3 flex flex-1 items-center">
        <HattrickGrid compact />
      </div>

      <div className="pb-1">
        <div className="flex items-baseline justify-between text-[10px]">
          <span className="text-muted">Time left</span>
          <span className="font-mono text-ink">1:58</span>
        </div>
        <div className="mt-1.5">
          <AnimatedMeter seconds={14} title="Round timer" />
        </div>
      </div>
    </div>
  );
}
