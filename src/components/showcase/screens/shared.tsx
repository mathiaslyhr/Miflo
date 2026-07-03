import type { ReactNode } from "react";
import { BackIcon, RoomCodeChip, TriangleIcon } from "../parts";

/**
 * Shared helpers for the in-phone screens. Each screen returns the screen
 * *content* only — wrap it in `<PhoneFrame>` for the device chrome. They follow
 * the `QuizScreen` padding contract (`px-4 pb-5 pt-5`). All presentational.
 */

/**
 * In-room header: title + room code. `exit` adds a top-left chevron — that's
 * where "leave room" lives; tapping it opens the leave-confirm sheet.
 */
export function ScreenTop({
  eyebrow,
  title,
  exit = false,
}: {
  eyebrow: string;
  title: string;
  exit?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {exit && (
          <span className="-ml-1 text-muted">
            <BackIcon size={20} />
          </span>
        )}
        <div>
          <p className="text-[11px] text-muted">{eyebrow}</p>
          <p className="text-sm font-medium text-ink">{title}</p>
        </div>
      </div>
      <RoomCodeChip code="ABCD" size="sm" />
    </div>
  );
}

/** Drill-in header with a thin back chevron (menu/settings screens). */
export function BackHeader({
  title,
  trailing,
}: {
  title: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted">
        <BackIcon size={20} />
      </span>
      <p className="text-sm font-medium text-ink">{title}</p>
      {trailing && <span className="ml-auto">{trailing}</span>}
    </div>
  );
}

/** A labelled read-only field mocked as if the user has typed into it. */
export function Field({
  label,
  value,
  mono = false,
  filled = true,
}: {
  label: string;
  value: string;
  mono?: boolean;
  filled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium text-muted">{label}</span>
      <div
        className={`mt-1.5 rounded-button border px-4 py-2.5 text-sm ${
          filled
            ? "border-accent bg-surface-2 text-ink"
            : "border-divider bg-surface-2 text-muted"
        } ${mono ? "font-mono tracking-widest" : ""}`}
      >
        {value}
        {filled && (
          <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-accent align-middle" />
        )}
      </div>
    </label>
  );
}

/** Leaderboard movement indicator (up / down / same). */
export function MoveArrow({ move }: { move: string }) {
  if (move === "same") return <span className="text-muted/50">–</span>;
  const up = move === "up";
  return (
    <span className={up ? "text-success" : "text-error"}>
      <TriangleIcon size={8} down={!up} />
    </span>
  );
}

/** 1 → "1st", 2 → "2nd", 7 → "7th". */
export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}
