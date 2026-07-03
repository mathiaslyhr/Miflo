import {
  AlertIcon,
  AnswerOption,
  PrimaryButton,
  Skeleton,
  WifiOffIcon,
} from "../parts";
import { ScreenTop } from "./shared";

export function MessageScreen({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-error/15 text-error">
          <AlertIcon size={26} />
        </span>
        <p className="mt-4 text-base font-medium text-ink">{title}</p>
        <p className="mt-1.5 max-w-[210px] text-[11px] leading-relaxed text-muted">
          {body}
        </p>
      </div>
      <PrimaryButton>{action}</PrimaryButton>
    </div>
  );
}

export function RoomNotFoundScreen() {
  return (
    <MessageScreen
      title="Room not found"
      body="That code doesn't match an open room. Check it and try again."
      action="Try another code"
    />
  );
}

export function RoomFullScreen() {
  return (
    <MessageScreen
      title="Room is full"
      body="This room has hit its player limit. Ask the host to start or make a new room."
      action="Back to home"
    />
  );
}

export function LoadingScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <div className="mt-6 flex flex-col gap-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 rounded-button bg-surface-2/60 px-3 py-2.5"
          >
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-4 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReconnectingScreen() {
  return (
    <div className="relative flex h-full flex-col">
      {/* dimmed board behind */}
      <div className="pointer-events-none opacity-30">
        <ScreenTop eyebrow="Football Quiz" title="Round 2" />
        <div className="mt-6 flex flex-col gap-2">
          <AnswerOption label="Leicester City" state="default" />
          <AnswerOption label="Chelsea" state="default" />
          <AnswerOption label="Arsenal" state="default" />
        </div>
      </div>
      {/* reconnect banner */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div className="mx-auto flex w-fit flex-col items-center gap-2 rounded-card border border-divider bg-surface px-6 py-5 text-center shadow-[0_16px_32px_-12px_rgba(20,15,50,0.22)]">
          <span className="text-accent-ink">
            <WifiOffIcon size={26} />
          </span>
          <p className="text-sm font-medium text-ink">Reconnecting…</p>
          <p className="text-[11px] text-muted">Hang tight, we&apos;ll be right back</p>
        </div>
      </div>
    </div>
  );
}
