import type { ReactNode } from "react";
import { formatNumber } from "@/lib/topics";
import {
  CheckIcon,
  CopyIcon,
  CrossIcon,
  FlameIcon,
  GamesIcon,
  HomeIcon,
  MenuIcon,
} from "./icons";

// Re-export every icon so existing `@/components/showcase/parts` imports keep working.
export * from "./icons";

/**
 * Small, self-contained app-UI atoms styled with the site design tokens
 * (globals.css `@theme`). These are the pieces that make up the phone screens
 * and the hero floating cards, exported individually so they can be reused or
 * dropped into the marketing showcase. Everything here is presentational and
 * server-renderable — no state, no `"use client"`.
 */

/* -------------------------------------------------------------------------- */
/* Avatar                                                                      */
/* -------------------------------------------------------------------------- */

const AVATAR_TONES = {
  accent: "bg-accent text-white",
  soft: "bg-accent/20 text-accent-ink",
  surface: "bg-surface-2 text-ink",
} as const;

export function Avatar({
  initials,
  tone = "soft",
  host = false,
  size = 28,
}: {
  initials: string;
  tone?: keyof typeof AVATAR_TONES;
  /** Draws an accent ring to mark the room host. */
  host?: boolean;
  size?: number;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-xs font-medium ${AVATAR_TONES[tone]} ${
        host ? "ring-2 ring-accent ring-offset-2 ring-offset-surface" : ""
      }`}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Room code                                                                   */
/* -------------------------------------------------------------------------- */

export function RoomCodeChip({
  code = "ABCD",
  size = "md",
}: {
  code?: string;
  size?: "sm" | "md";
}) {
  const sizing =
    size === "sm" ? "px-2.5 py-1 text-sm" : "px-3 py-1.5 text-base";
  return (
    <span
      className={`inline-block rounded-lg bg-surface-2 font-mono tracking-widest text-ink ${sizing}`}
    >
      {code}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Score + rank                                                                */
/* -------------------------------------------------------------------------- */

export function ScorePill({ points }: { points: number }) {
  return (
    <span className="inline-block rounded-full bg-surface-2 px-2.5 py-1 font-mono text-xs text-ink">
      {formatNumber(points)}
    </span>
  );
}

const MEDAL_TONES: Record<number, string> = {
  1: "bg-[#f5c451] text-black", // gold
  2: "bg-[#cfd3d8] text-black", // silver
  3: "bg-[#d59a63] text-black", // bronze
};

export function RankBadge({ place }: { place: number }) {
  const medal = MEDAL_TONES[place];
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
        medal ?? "bg-surface-2 text-muted"
      }`}
    >
      {place}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Answer option — the multiple-choice row in every state                      */
/* -------------------------------------------------------------------------- */

export type AnswerState =
  | "default" // not yet chosen
  | "locked" // your pick, awaiting reveal (purple)
  | "correct" // revealed correct
  | "wrong" // revealed wrong (your pick)
  | "dimmed"; // a non-answer after reveal

const ANSWER_STYLES: Record<AnswerState, string> = {
  default: "bg-surface-2 text-muted",
  locked: "bg-accent text-white",
  correct: "bg-success/15 text-success ring-1 ring-inset ring-success/40",
  wrong: "bg-error/15 text-error ring-1 ring-inset ring-error/40",
  dimmed: "bg-surface-2/50 text-muted/50",
};

export function AnswerOption({
  label,
  state = "default",
}: {
  label: string;
  state?: AnswerState;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-button px-4 py-2.5 text-sm ${ANSWER_STYLES[state]}`}
    >
      <span>{label}</span>
      {state === "correct" && <CheckIcon size={17} />}
      {state === "wrong" && <CrossIcon size={17} />}
      {state === "locked" && (
        <span className="text-[11px] font-medium text-white/80">Locked in</span>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Timers                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Countdown colour scale, as time runs down: dark green → light green →
 * yellow → orange → red. `progress` is fraction of time remaining (1 → 0).
 */
export function timerColor(progress: number): string {
  if (progress > 0.8) return "var(--color-timer-1)"; // dark green — loads of time
  if (progress > 0.6) return "var(--color-timer-2)"; // light green
  if (progress > 0.4) return "var(--color-timer-3)"; // yellow
  if (progress > 0.2) return "var(--color-timer-4)"; // orange
  return "var(--color-timer-5)"; // red — almost out
}

/** Linear countdown bar — matches the QuizScreen footer. */
export function TimerBar({
  /** 0–1 remaining. */
  progress,
  label,
  seconds,
}: {
  progress: number;
  label?: string;
  seconds?: string;
}) {
  const color = timerColor(progress);
  const critical = progress <= 0.2;
  return (
    <div className="w-full">
      {(label || seconds) && (
        <div className="flex items-center justify-between text-[11px] text-muted">
          <span>{label}</span>
          <span
            className="font-mono"
            style={{ color: critical ? color : undefined }}
          >
            {seconds}
          </span>
        </div>
      )}
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.round(progress * 100)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

/** Circular countdown ring with the seconds in the centre. */
export function TimerRing({
  progress,
  seconds,
  size = 72,
}: {
  progress: number;
  seconds: number | string;
  size?: number;
}) {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = timerColor(progress);
  const critical = progress <= 0.2;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <span
        className="absolute font-mono text-lg font-medium"
        style={{ color: critical ? color : "var(--color-ink)" }}
      >
        {seconds}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Feedback toasts (drop inside FloatingCard on the hero)                      */
/* -------------------------------------------------------------------------- */

export function CorrectToast({
  points = 250,
  note = "Fastest correct answer",
}: {
  points?: number;
  note?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
        <CheckIcon size={15} />
      </span>
      <div>
        <p className="text-xs font-medium text-ink">+{points} speed bonus</p>
        <p className="text-[11px] text-muted">{note}</p>
      </div>
    </div>
  );
}

export function WrongToast({
  title = "Too slow",
  note = "No points this round",
}: {
  title?: string;
  note?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-error/20 text-error">
        <CrossIcon size={15} />
      </span>
      <div>
        <p className="text-xs font-medium text-ink">{title}</p>
        <p className="text-[11px] text-muted">{note}</p>
      </div>
    </div>
  );
}

export function StreakChip({ count = 3 }: { count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent">
        <FlameIcon size={15} />
      </span>
      <p className="text-xs font-medium text-ink">
        {count} in a row
        <span className="ml-1.5 font-normal text-muted">on fire</span>
      </p>
    </div>
  );
}

export function PlayerJoinedToast({
  name = "Jess",
  initials = "JL",
}: {
  name?: string;
  initials?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar initials={initials} />
      <p className="text-xs font-medium text-ink">{name} joined the room</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Buttons                                                                     */
/* -------------------------------------------------------------------------- */

export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <span className="block rounded-button bg-accent px-4 py-2.5 text-center text-sm font-medium text-white">
      {children}
    </span>
  );
}

export function SecondaryButton({ children }: { children: ReactNode }) {
  return (
    <span className="block rounded-button bg-surface-2 px-4 py-2.5 text-center text-sm font-medium text-ink">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Nav island — floating Home / Games / Menu tab bar                           */
/* -------------------------------------------------------------------------- */

export type NavTab = "home" | "games" | "menu";

const NAV_ITEMS: { id: NavTab; label: string; Icon: typeof HomeIcon }[] = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "games", label: "Games", Icon: GamesIcon },
  { id: "menu", label: "Menu", Icon: MenuIcon },
];

/**
 * The app's bottom navigation as a floating pill. Drop it at the end of a
 * screen's flex column (`mt-auto`) — it doesn't need any PhoneFrame change.
 */
export function NavIsland({ active }: { active: NavTab }) {
  return (
    <div className="mt-auto flex justify-center pt-4">
      <div className="flex items-center gap-1 rounded-full border border-divider bg-surface-2/90 p-1 shadow-[0_16px_32px_-12px_rgba(20,15,50,0.22)] backdrop-blur">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const on = id === active;
          return (
            <span
              key={id}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                on ? "bg-accent text-white" : "text-muted"
              }`}
            >
              <Icon size={17} />
              {on && <span>{label}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* QR placeholder                                                              */
/* -------------------------------------------------------------------------- */

/** A finder square for the QR placeholder. */
function QrFinder() {
  return (
    <div className="flex items-center justify-center rounded-[3px] bg-black p-[3px]">
      <div className="flex h-full w-full items-center justify-center rounded-[2px] bg-white p-[2px]">
        <div className="h-full w-full rounded-[1px] bg-black" />
      </div>
    </div>
  );
}

/**
 * A decorative QR code (finder squares + a static module grid). Not scannable —
 * a placeholder for the real App Store / TestFlight QR, swapped in later.
 */
export function QrPlaceholder({ size = 116 }: { size?: number }) {
  // A fixed 9x9 module field so the render is deterministic (no hydration drift).
  const modules =
    "010110100101001011100100010101101011010010110100101101001010010110110100";
  return (
    <div
      className="grid grid-cols-3 grid-rows-3 gap-1 rounded-lg bg-white p-2.5"
      style={{ width: size, height: size }}
    >
      <QrFinder />
      <div className="grid grid-cols-6 grid-rows-6 gap-[2px]">
        {modules.split("").map((m, i) => (
          <div
            key={i}
            className={m === "1" ? "bg-black" : "bg-transparent"}
          />
        ))}
      </div>
      <QrFinder />
      <div className="col-span-3 grid grid-cols-11 grid-rows-2 gap-[2px]">
        {(modules + modules).slice(0, 22).split("").map((m, i) => (
          <div key={i} className={m === "1" ? "bg-black" : "bg-transparent"} />
        ))}
      </div>
      <QrFinder />
      <div className="col-span-2 grid grid-cols-8 grid-rows-3 gap-[2px]">
        {(modules + modules).slice(0, 24).split("").map((m, i) => (
          <div key={i} className={m === "1" ? "bg-black" : "bg-transparent"} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Setup chips + tabs (shared by quiz config + static game configs)            */
/* -------------------------------------------------------------------------- */

/** A count tab (5 / 10 / 15 …) or any small segmented option. */
export function CountTab({
  label,
  selected,
  onClick,
}: {
  label: string | number;
  selected: boolean;
  onClick?: () => void;
}) {
  const cls = `flex-1 rounded-button py-2 text-center text-sm font-medium transition-colors ${
    selected ? "bg-accent text-white" : "bg-surface-2 text-muted"
  }`;
  // Non-interactive (static screens) render a div so there are no dead buttons.
  if (!onClick) return <div className={cls}>{label}</div>;
  return (
    <button type="button" onClick={onClick} className={cls}>
      {label}
    </button>
  );
}

/** A topic pill for the picker; `disabled` dims it (e.g. while "All" is on). */
export function TopicChip({
  label,
  selected,
  disabled = false,
  onClick,
}: {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const cls = `rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
    selected
      ? "bg-accent text-white"
      : disabled
        ? "bg-surface-2/50 text-muted/40"
        : "bg-surface-2 text-muted"
  }`;
  if (!onClick) return <div className={cls}>{label}</div>;
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {label}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Misc atoms — toggle, skeleton, answered dots, copy-code                     */
/* -------------------------------------------------------------------------- */

/** iOS-style switch (presentational). */
export function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-10 items-center rounded-full p-0.5 transition-colors ${
        on ? "bg-accent" : "bg-surface-2"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-white transition-transform ${
          on ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </span>
  );
}

/** Shimmering placeholder block for loading states (Tailwind's animate-pulse). */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span className={`block animate-pulse rounded bg-surface-2 ${className}`} />
  );
}

/** A row of dots showing how many players have locked in an answer. */
export function AnsweredDots({
  total,
  answered,
}: {
  total: number;
  answered: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < answered ? "bg-accent" : "bg-surface-2"
          }`}
        />
      ))}
    </div>
  );
}

/** Room-code chip with a copy affordance (static visual). */
export function CopyCodeButton({ code = "ABCD" }: { code?: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-button bg-surface-2 px-3 py-2">
      <span className="font-mono text-base tracking-widest text-ink">{code}</span>
      <span className="text-muted">
        <CopyIcon size={15} />
      </span>
    </div>
  );
}
