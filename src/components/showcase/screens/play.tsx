import {
  AnswerOption,
  AnsweredDots,
  CheckIcon,
  CorrectToast,
  PlayerJoinedToast,
  TimerBar,
} from "../parts";
import { ODD_PLAYERS, ODD_REVEAL } from "../fixtures";
import { ScreenTop } from "./shared";

/* -------------------------------------------------------------------------- */
/* Odd One Out                                                                 */
/* -------------------------------------------------------------------------- */

export function OddOneOutScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Odd One Out" title="Round 1" />

      <p className="mt-6 text-base font-medium leading-snug">
        Three won the Ballon d&apos;Or. Who&apos;s the odd one out?
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {ODD_PLAYERS.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-button px-3 py-3 ${
              p.odd ? "bg-accent text-white" : "bg-surface-2 text-ink"
            }`}
          >
            <span className="text-sm font-medium">{p.name}</span>
            <span
              className={`text-[11px] ${p.odd ? "text-white/70" : "text-muted"}`}
            >
              {p.meta}
            </span>
            {p.odd && (
              <span className="mt-2 text-[10px] font-medium text-white/80">
                Your pick
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <TimerBar progress={0.45} label="Lock in your answer" seconds="0:06" />
      </div>
    </div>
  );
}

export function OddOneOutRevealScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Odd One Out" title="Round 1" />
      <div className="mt-5 grid grid-cols-2 gap-2">
        {ODD_REVEAL.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-button px-3 py-3 ${
              p.odd
                ? "bg-success/15 text-success ring-1 ring-inset ring-success/40"
                : "bg-surface-2 text-muted"
            }`}
          >
            <span className="flex items-center justify-between text-sm font-medium">
              {p.name}
              {p.odd && <CheckIcon size={15} />}
            </span>
            <span className="text-[11px] opacity-80">{p.meta}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-card bg-surface-2 px-4 py-3 text-center">
        <p className="text-sm font-medium text-success">You nailed it</p>
        <p className="mt-0.5 text-[11px] text-muted">
          Kanté is the only one never to win the Ballon d&apos;Or
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Missing XI                                                                  */
/* -------------------------------------------------------------------------- */

/** One player dot in the formation; the missing slot is a purple blank. */
function FormationSlot({ label, missing }: { label: string; missing?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-medium ${
          missing
            ? "border border-dashed border-accent bg-accent/15 text-accent-ink"
            : "bg-surface-2 text-ink"
        }`}
      >
        {missing ? "?" : label.slice(0, 2)}
      </span>
      <span className="text-[9px] text-muted">{missing ? "?" : label}</span>
    </div>
  );
}

export function MissingXIScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Missing XI" title="2005 final" />

      <div className="mt-5 flex flex-1 flex-col justify-center gap-4 rounded-card bg-[radial-gradient(circle_at_50%_20%,rgba(98,96,246,0.12),transparent_70%)] py-4">
        {/* forwards */}
        <div className="flex justify-center gap-8">
          <FormationSlot label="Crespo" />
          <FormationSlot label="Sheva" missing />
        </div>
        {/* mids */}
        <div className="flex justify-center gap-5">
          <FormationSlot label="Kaká" />
          <FormationSlot label="Pirlo" />
          <FormationSlot label="Seedorf" />
        </div>
        {/* defence */}
        <div className="flex justify-center gap-5">
          <FormationSlot label="Maldini" />
          <FormationSlot label="Nesta" />
          <FormationSlot label="Cafu" />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[11px] text-muted">Type the missing player</p>
        <div className="mt-2 flex items-center justify-between rounded-button border border-accent bg-surface-2 px-4 py-2.5">
          <span className="text-sm text-ink">Shevchenko</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
            <CheckIcon size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function MissingXIRevealScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Missing XI" title="2005 final" />
      <div className="mt-5 flex flex-1 flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-xs font-medium text-success ring-1 ring-inset ring-success/40">
            SH
          </span>
          <span className="text-[11px] text-muted">Shevchenko</span>
        </div>
        <div className="flex items-center gap-1.5 text-success">
          <CheckIcon size={16} />
          <span className="text-sm font-medium">Correct — you remembered</span>
        </div>
      </div>
      <div className="rounded-card bg-surface-2 px-4 py-3 text-center text-[11px] text-muted">
        AC Milan&apos;s XI from the 2005 Champions League final
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Match flow                                                                  */
/* -------------------------------------------------------------------------- */

export function CountdownScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Football Quiz" title="Round 2" />
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-accent bg-accent/10">
          <span className="font-mono text-5xl font-medium text-ink">3</span>
        </div>
        <p className="mt-6 text-sm font-medium text-ink">Get ready…</p>
        <p className="mt-1 text-[11px] text-muted">First question coming up</p>
      </div>
    </div>
  );
}

export function RevealScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Football Quiz" title="Round 2" />

      <p className="mt-6 text-base font-medium leading-snug">
        Which club did N&apos;Golo Kant&eacute; join in 2016?
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <AnswerOption label="Leicester City" state="dimmed" />
        <AnswerOption label="Chelsea" state="correct" />
        <AnswerOption label="Arsenal" state="wrong" />
      </div>

      <div className="mt-auto rounded-card bg-surface-2 px-4 py-3 text-center">
        <p className="text-sm font-medium text-ink">3 of 4 got it</p>
        <p className="mt-0.5 text-[11px] text-muted">
          Sam was fastest · +250 speed bonus
        </p>
      </div>
    </div>
  );
}

export function WaitingScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Football Quiz" title="Round 2" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <AnsweredDots total={4} answered={2} />
        <div className="text-center">
          <p className="text-sm font-medium text-ink">Waiting for players</p>
          <p className="mt-1 text-[11px] text-muted">2 of 4 have answered</p>
        </div>
      </div>
      <TimerBar progress={0.35} label="Time left" seconds="0:04" />
    </div>
  );
}

/**
 * How feedback toasts appear in the app: in-app toasts (not OS push) that drop
 * in from the top under the dynamic island and auto-dismiss — docked at the top
 * so they never cover the answers or timer below.
 */
export function ToastDemoScreen() {
  return (
    <div className="relative flex h-full flex-col">
      {/* live game underneath */}
      <ScreenTop eyebrow="Football Quiz" title="Round 2" />
      <p className="mt-6 text-base font-medium leading-snug">
        Which club did N&apos;Golo Kant&eacute; join in 2016?
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <AnswerOption label="Leicester City" state="default" />
        <AnswerOption label="Chelsea" state="locked" />
        <AnswerOption label="Arsenal" state="default" />
      </div>
      <div className="mt-auto">
        <TimerBar progress={0.55} label="Time left" seconds="0:06" />
      </div>

      {/* stacked top-docked toasts */}
      <div className="absolute inset-x-0 top-0 flex flex-col gap-2">
        <div className="rounded-card border border-divider bg-surface/95 px-3.5 py-3 shadow-[0_18px_38px_-14px_rgba(20,15,50,0.28)] backdrop-blur">
          <PlayerJoinedToast />
        </div>
        <div className="mx-2 rounded-card border border-divider bg-surface/90 px-3.5 py-3 opacity-70 shadow-[0_16px_32px_-12px_rgba(20,15,50,0.22)] backdrop-blur">
          <CorrectToast />
        </div>
      </div>
    </div>
  );
}
