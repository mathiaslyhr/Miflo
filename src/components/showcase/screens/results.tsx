import { Avatar, PrimaryButton, RankBadge, ShareIcon, TimerBar, TrophyIcon } from "../parts";
import { formatNumber } from "@/lib/topics";
import { LEADERBOARD, PODIUM, ROUND_STANDINGS } from "../fixtures";
import { MoveArrow, ordinal, ScreenTop } from "./shared";

export function LeaderboardScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="After round 2" title="Leaderboard" />

      <div className="mt-6 flex flex-col gap-1.5">
        {LEADERBOARD.map((r) => (
          <div
            key={r.name}
            className={`flex items-center gap-2.5 rounded-button px-3 py-2 text-sm ${
              r.you ? "bg-success/15 text-success" : "bg-surface-2 text-ink"
            }`}
          >
            <RankBadge place={r.place} />
            <span className="font-medium">{r.name}</span>
            <span className="ml-auto text-[10px]">
              <MoveArrow move={r.move} />
            </span>
            <span className="font-mono tabular-nums">{formatNumber(r.points)}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <TimerBar progress={0.6} label="Next round" seconds="0:05" />
      </div>
    </div>
  );
}

export function RoundSummaryScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Round 2 of 5" title="Round done" />

      <div className="mt-5 rounded-card bg-accent/10 px-4 py-3 text-center">
        <p className="text-[11px] text-muted">You earned</p>
        <p className="font-mono text-2xl font-medium text-ink">+250</p>
      </div>

      <p className="mt-5 text-[11px] font-medium text-muted">Standings</p>
      <div className="mt-2 flex flex-col gap-1.5">
        {ROUND_STANDINGS.map((r) => (
          <div
            key={r.name}
            className={`flex items-center gap-2.5 rounded-button px-3 py-2 text-sm ${
              r.you ? "bg-success/15 text-success" : "bg-surface-2 text-ink"
            }`}
          >
            <RankBadge place={r.place} />
            <span className="font-medium">{r.name}</span>
            <span className="ml-auto text-[10px]">
              <MoveArrow move={r.move} />
            </span>
            <span className="font-mono tabular-nums">{formatNumber(r.points)}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <TimerBar progress={0.5} label="Next round" seconds="0:03" />
      </div>
    </div>
  );
}

/**
 * Final results. The podium always shows the top three. `placement` is where
 * *you* finished: 1st shows the trophy + "Winner"; anything else shows your
 * position once, and outside the top 3 a highlighted "you" row is added beneath
 * the podium so you can see where you landed.
 */
export function ResultsScreen({
  placement = 1,
  yourPoints = 940,
}: {
  placement?: number;
  yourPoints?: number;
}) {
  const won = placement === 1;
  const offPodium = placement > 3;
  return (
    <div className="flex h-full flex-col">
      <ScreenTop eyebrow="Game over" title="Final results" />

      <div className="mt-5 flex flex-col items-center text-center">
        {won ? (
          <>
            <span className="text-accent">
              <TrophyIcon size={30} />
            </span>
            <p className="mt-2 text-[11px] text-muted">Winner</p>
            <p className="text-2xl font-medium tracking-tight text-ink">You</p>
          </>
        ) : (
          <>
            <p className="font-mono text-4xl font-medium text-accent-ink">
              {ordinal(placement)}
            </p>
            <p className="mt-1 text-[11px] text-muted">You finished</p>
          </>
        )}
      </div>

      <div className="mt-6 flex items-end justify-center gap-2">
        {PODIUM.map((p) => {
          const isYou = won && p.place === 1;
          return (
            <div key={p.name} className="flex flex-1 flex-col items-center">
              <Avatar
                initials={p.initials}
                tone={isYou ? "accent" : "soft"}
                size={p.place === 1 ? 32 : 26}
              />
              <span className="mt-1.5 text-xs font-medium text-ink">{p.name}</span>
              <span className="font-mono text-[11px] text-muted">
                {formatNumber(p.points)}
              </span>
              <div
                className={`mt-2 flex w-full items-start justify-center rounded-t-lg pt-1.5 ${p.h} ${
                  p.place === 1 ? "bg-accent" : "bg-surface-2"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    p.place === 1 ? "text-white" : "text-muted"
                  }`}
                >
                  {p.place}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* your row, when you finished off the podium (no rank number — the
          headline already says where you landed) */}
      {offPodium && (
        <div className="mt-4 flex items-center gap-2.5 rounded-button bg-success/15 px-3 py-2 text-sm text-success">
          <Avatar initials="YO" tone="accent" size={24} />
          <span className="font-medium">You</span>
          <span className="ml-auto font-mono tabular-nums">
            {formatNumber(yourPoints)}
          </span>
        </div>
      )}

      {/* actions */}
      <div className="mt-auto flex gap-2 pt-6">
        <div className="flex-1">
          <PrimaryButton>Play again</PrimaryButton>
        </div>
        <div className="flex items-center justify-center rounded-button bg-surface-2 px-4 text-muted">
          <ShareIcon size={17} />
        </div>
      </div>
    </div>
  );
}
