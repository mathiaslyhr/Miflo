import {
  Avatar,
  CopyCodeButton,
  CrossIcon,
  PrimaryButton,
  RoomCodeChip,
  SecondaryButton,
  ShareIcon,
} from "../parts";
import { LOBBY_PLAYERS } from "../fixtures";
import { ScreenTop } from "./shared";

/**
 * Room lobby. As `host` the room code becomes tap-to-copy and each other player
 * gets a kick control; as a guest it's the shareable code and a "waiting for
 * host" note instead of the start button.
 */
export function LobbyScreen({ host = false }: { host?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Room lobby" title="Waiting to start" exit />

      <div className="mt-6 flex flex-col items-center">
        <p className="text-[11px] text-muted">Room code</p>
        <div className="mt-2">
          {host ? <CopyCodeButton code="ABCD" /> : <RoomCodeChip code="ABCD" />}
        </div>
        <p className="mt-2 text-[11px] text-muted">
          {host ? "Tap to copy and share" : "Share it with your friends"}
        </p>
      </div>

      <p className="mt-6 text-[11px] font-medium text-muted">
        Players · {LOBBY_PLAYERS.length}
      </p>
      <div className="mt-2 flex flex-col gap-2">
        {LOBBY_PLAYERS.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-2.5 rounded-button bg-surface-2 px-3 py-2"
          >
            <Avatar initials={p.initials} tone={p.host ? "accent" : "soft"} />
            <span className="text-sm text-ink">{p.name}</span>
            {p.host ? (
              <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent-ink">
                Host
              </span>
            ) : (
              host && (
                <span className="ml-auto text-muted">
                  <CrossIcon size={14} />
                </span>
              )
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        {host ? (
          <PrimaryButton>Start game</PrimaryButton>
        ) : (
          <p className="text-center text-[11px] text-muted">
            Waiting for the host to start…
          </p>
        )}
      </div>
    </div>
  );
}

export function EmptyLobbyScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Room lobby" title="Waiting to start" />
      <div className="mt-6 flex flex-col items-center">
        <p className="text-[11px] text-muted">Room code</p>
        <div className="mt-2">
          <CopyCodeButton code="ABCD" />
        </div>
      </div>
      <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-2 rounded-card border border-dashed border-divider">
        <Avatar initials="YO" tone="accent" size={36} />
        <p className="text-sm font-medium text-ink">Just you so far</p>
        <p className="text-[11px] text-muted">Share the code to get players in</p>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-muted">
        <ShareIcon size={15} />
        <span className="text-[11px]">Share invite</span>
      </div>
    </div>
  );
}

/**
 * Leave-room confirm sheet — the bottom sheet that appears when you tap the
 * exit chevron in the room header, over a dimmed lobby.
 */
export function LeaveRoomSheet() {
  return (
    <div className="relative flex h-full flex-col">
      {/* dimmed lobby behind */}
      <div className="pointer-events-none opacity-30">
        <ScreenTop eyebrow="Room lobby" title="Waiting to start" exit />
        <div className="mt-6 flex flex-col gap-2">
          {LOBBY_PLAYERS.slice(0, 3).map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2.5 rounded-button bg-surface-2 px-3 py-2"
            >
              <Avatar initials={p.initials} tone={p.host ? "accent" : "soft"} />
              <span className="text-sm text-ink">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* scrim + bottom sheet */}
      <div className="absolute inset-0 rounded-b-[2.05rem] bg-black/50" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-card border-t border-divider bg-surface px-4 pb-6 pt-5">
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-divider" />
        <p className="text-base font-medium text-ink">Leave room?</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted">
          You&apos;ll drop out of the game. The host can carry on without you.
        </p>
        <div className="mt-4 flex gap-2">
          <div className="flex-1">
            <SecondaryButton>Cancel</SecondaryButton>
          </div>
          <div className="flex-1">
            <span className="block rounded-button bg-error px-4 py-2.5 text-center text-sm font-medium text-white">
              Leave
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
