import {
  ChevronIcon,
  CountTab,
  NavIsland,
  PrimaryButton,
  RoomCodeChip,
  TopicChip,
} from "../parts";
import { TOPICS } from "@/lib/topics";
import { GAMES } from "@/lib/links";
import { ScreenTop } from "./shared";

export function GamesScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium tracking-tight text-ink">Games</p>
        <RoomCodeChip code="ABCD" size="sm" />
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        {GAMES.map((game, i) => (
          <div
            key={game.name}
            className={`flex items-start gap-3 rounded-card border p-3.5 ${
              i === 0
                ? "border-accent bg-accent/10"
                : "border-divider bg-surface-2"
            }`}
          >
            <span className="font-mono text-sm text-accent-ink/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{game.name}</p>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted">
                {game.blurb}
              </p>
            </div>
            <span className="ml-auto self-center text-muted">
              <ChevronIcon size={16} />
            </span>
          </div>
        ))}
      </div>

      <NavIsland active="games" />
    </div>
  );
}

/** Static topic picker snapshot (All selected) for the non-quiz setups. */
function TopicPickerStatic() {
  return (
    <>
      <p className="mt-6 text-[11px] font-medium text-muted">Topics</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <TopicChip label="All" selected />
        {TOPICS.map((t) => (
          <TopicChip key={t.id} label={t.label} selected={false} disabled />
        ))}
      </div>
    </>
  );
}

function GameConfigScreen({
  eyebrow,
  title,
  countLabel,
  rounds,
  selectedRounds,
}: {
  eyebrow: string;
  title: string;
  countLabel: string;
  rounds: number[];
  selectedRounds: number;
}) {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow={eyebrow} title={title} />
      <p className="mt-6 text-[11px] font-medium text-muted">{countLabel}</p>
      <div className="mt-2 flex gap-1.5">
        {rounds.map((n) => (
          <CountTab key={n} label={n} selected={n === selectedRounds} />
        ))}
      </div>
      <TopicPickerStatic />
      <div className="mt-auto pt-6">
        <PrimaryButton>Start game</PrimaryButton>
      </div>
    </div>
  );
}

export function OddOneOutConfigScreen() {
  return (
    <GameConfigScreen
      eyebrow="New game"
      title="Odd One Out"
      countLabel="Rounds"
      rounds={[5, 8, 10, 12]}
      selectedRounds={8}
    />
  );
}

export function MissingXIConfigScreen() {
  return (
    <GameConfigScreen
      eyebrow="New game"
      title="Missing XI"
      countLabel="Line-ups"
      rounds={[3, 5, 8, 10]}
      selectedRounds={5}
    />
  );
}
