import {
  Avatar,
  NavIsland,
  PrimaryButton,
  QrPlaceholder,
  SecondaryButton,
} from "../parts";
import { Field, ScreenTop } from "./shared";

export function HomeScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium tracking-tight text-ink">Miflo</p>
        <Avatar initials="YO" tone="accent" />
      </div>

      <div className="mt-8 flex flex-col gap-2.5">
        <PrimaryButton>Create a room</PrimaryButton>
        <SecondaryButton>Join a room</SecondaryButton>
      </div>

      <div className="mt-auto flex flex-col items-center gap-3 pb-2">
        <QrPlaceholder size={104} />
        <p className="text-[11px] text-muted">Scan to get the app</p>
      </div>

      <NavIsland active="home" />
    </div>
  );
}

export function CreateRoomScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Create a room" title="Pick a name" />
      <div className="mt-8 flex flex-col gap-4">
        <Field label="Your username" value="Mathias" />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted">
        You&apos;ll host the room and share the code with your mates.
      </p>
      <div className="mt-auto pt-6">
        <PrimaryButton>Create room</PrimaryButton>
      </div>
    </div>
  );
}

export function JoinRoomScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Join a room" title="Enter the code" />
      <div className="mt-8 flex flex-col gap-4">
        <Field label="Room code" value="ABCD" mono />
        <Field label="Your username" value="Mathias" />
      </div>
      <div className="mt-auto pt-6">
        <PrimaryButton>Join room</PrimaryButton>
      </div>
    </div>
  );
}
