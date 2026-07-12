import {
  Avatar,
  BellIcon,
  ChevronIcon,
  GearIcon,
  NavIsland,
  PencilIcon,
  SecondaryButton,
  SoundIcon,
  Toggle,
} from "../parts";
import { CONTACT_EMAIL } from "@/lib/links";
import {
  MENU_ROWS,
  PER_GAME_ACCURACY,
  PROFILE_STATS,
  STATS_CARDS,
} from "../fixtures";
import { BackHeader } from "./shared";

export function MenuScreen() {
  return (
    <div className="flex h-full flex-col">
      <p className="text-lg font-medium tracking-tight text-ink">Menu</p>

      <div className="mt-6 flex items-center gap-3 rounded-card border border-divider bg-surface-2 p-3.5">
        <Avatar initials="YO" tone="accent" size={40} />
        <div>
          <p className="text-sm font-medium text-ink">Mathias</p>
          <p className="text-[11px] text-muted">142 games · 38 wins</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col overflow-hidden rounded-card border border-divider divide-y divide-divider">
        {MENU_ROWS.map((row) => (
          <div
            key={row}
            className="flex items-center justify-between bg-surface-2 px-4 py-3 text-sm text-ink"
          >
            <span>{row}</span>
            <span className="text-muted">
              <ChevronIcon size={16} />
            </span>
          </div>
        ))}
      </div>

      <NavIsland active="menu" />
    </div>
  );
}

export function ProfileScreen() {
  return (
    <div className="flex h-full flex-col">
      <BackHeader title="Profile" />
      <div className="mt-6 flex flex-col items-center">
        <Avatar initials="ML" tone="accent" size={64} />
        <div className="mt-3 flex items-center gap-1.5">
          <p className="text-lg font-medium text-ink">Mathias</p>
          <span className="text-muted">
            <PencilIcon size={14} />
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-muted">Playing since 2024</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        {PROFILE_STATS.map((s) => (
          <div key={s.k} className="rounded-card bg-surface-2 py-3">
            <p className="font-mono text-lg font-medium text-ink">{s.v}</p>
            <p className="text-[11px] text-muted">{s.k}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-card bg-surface-2 px-4 py-3 text-sm">
        <span className="text-muted">Favourite game</span>
        <span className="font-medium text-ink">Football Quiz</span>
      </div>
    </div>
  );
}

export function StatsScreen() {
  return (
    <div className="flex h-full flex-col">
      <BackHeader title="Stats" />
      <div className="mt-6 grid grid-cols-2 gap-2">
        {STATS_CARDS.map((c) => (
          <div key={c.k} className="rounded-card bg-surface-2 px-4 py-3">
            <p className="font-mono text-xl font-medium text-ink">{c.v}</p>
            <p className="mt-0.5 text-[11px] text-muted">{c.k}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[11px] font-medium text-muted">Accuracy by game</p>
      <div className="mt-2 flex flex-col gap-2">
        {PER_GAME_ACCURACY.map((g) => (
          <div
            key={g.name}
            className="flex items-center justify-between rounded-button bg-surface-2 px-3 py-2.5 text-sm"
          >
            <span className="text-ink">{g.name}</span>
            <span className="font-mono text-muted">{g.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsScreen() {
  const toggles = [
    { label: "Sound", Icon: SoundIcon, on: true },
    { label: "Notifications", Icon: BellIcon, on: false },
    { label: "Haptics", Icon: GearIcon, on: true },
  ];
  return (
    <div className="flex h-full flex-col">
      <BackHeader title="Settings" />

      <p className="mt-6 text-[11px] font-medium text-muted">Preferences</p>
      <div className="mt-2 flex flex-col overflow-hidden rounded-card divide-y divide-divider">
        {toggles.map((t) => (
          <div
            key={t.label}
            className="flex items-center gap-3 bg-surface-2 px-4 py-3 text-sm text-ink"
          >
            <span className="text-muted">
              <t.Icon size={18} />
            </span>
            <span>{t.label}</span>
            <span className="ml-auto">
              <Toggle on={t.on} />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-card bg-surface-2 px-4 py-3 text-sm">
        <span className="text-muted">Nickname</span>
        <span className="font-medium text-ink">Mathias</span>
      </div>

      <div className="mt-auto pt-6">
        <SecondaryButton>Sign out</SecondaryButton>
      </div>
    </div>
  );
}

export function AboutScreen() {
  return (
    <div className="flex h-full flex-col">
      <BackHeader title="About" />
      <div className="mt-8 flex flex-col items-center text-center">
        <p className="text-3xl font-medium tracking-tight text-ink">Miflo</p>
        <p className="mt-1 text-[11px] text-muted">Version 1.0</p>
        <p className="mt-4 max-w-[200px] text-[11px] leading-relaxed text-muted">
          Football games you play with your friends. Made for the group chat.
        </p>
      </div>

      <div className="mt-6 flex flex-col overflow-hidden rounded-card divide-y divide-divider">
        {["Privacy", "Feedback", "Rate Miflo"].map((row) => (
          <div
            key={row}
            className="flex items-center justify-between bg-surface-2 px-4 py-3 text-sm text-ink"
          >
            <span>{row}</span>
            <span className="text-muted">
              <ChevronIcon size={16} />
            </span>
          </div>
        ))}
      </div>

      <p className="mt-auto pt-6 text-center text-[11px] text-muted">
        {CONTACT_EMAIL}
      </p>
    </div>
  );
}
