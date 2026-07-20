import { Meter, SegmentMeter } from "@/components/ui";

/*
 * A small, honest visual for each game.
 *
 * Eight cards carrying an icon, a heading and a paragraph would read as a
 * template no matter how well the type is set — you'd learn nothing from the
 * picture. Each of these shows the actual shape of its game instead: Hattrick's
 * claimed grid, Scout's colour-coded guess row, Team Sheet's gapped formation.
 * Someone can tell the games apart before reading a word.
 *
 * All of it is real game state, drawn with the same tokens the app uses.
 */

/* ------------------------------------------------------------- Hattrick */

const COLS = ["La Liga", "Barça", "Real"];
const ROWS = ["Teammate", "Napoli", "Monaco"];

/** null = unclaimed. "you" reads purple, "rival" reads red, as in the app. */
type Claim = { name: string; by: "you" | "rival" } | null;

const CELLS: Claim[][] = [
  [{ name: "Iniesta", by: "you" }, { name: "Messi", by: "rival" }, null],
  [null, { name: "Maradona", by: "you" }, null],
  [null, { name: "Henry", by: "rival" }, null],
];

export function HattrickGrid({ compact = false }: { compact?: boolean }) {
  const cell = compact ? "h-9 text-[9px]" : "h-11 text-[10px]";
  return (
    <div aria-hidden className="w-full">
      {/* column headers */}
      <div className="grid grid-cols-[3.5rem_repeat(3,1fr)] gap-1">
        <span />
        {COLS.map((c) => (
          <span
            key={c}
            className="pb-1 text-center text-[9px] font-medium text-muted"
          >
            {c}
          </span>
        ))}
      </div>

      {ROWS.map((row, r) => (
        <div
          key={row}
          className="grid grid-cols-[3.5rem_repeat(3,1fr)] gap-1 pb-1"
        >
          <span className="flex items-center text-[9px] font-medium text-muted">
            {row}
          </span>
          {COLS.map((col, c) => {
            const claim = CELLS[r]?.[c];
            if (!claim) {
              return (
                <span
                  key={col}
                  className={`${cell} flex items-center justify-center rounded-lg border border-rim-2 bg-surface-2 text-faint`}
                >
                  +
                </span>
              );
            }
            const you = claim.by === "you";
            return (
              <span
                key={col}
                className={`${cell} flex items-center justify-center rounded-lg px-1 text-center font-medium leading-tight ${
                  you
                    ? "bg-primary/20 text-accent-ink ring-1 ring-inset ring-primary/40"
                    : "bg-error/15 text-error ring-1 ring-inset ring-error/30"
                }`}
              >
                {claim.name}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Scout */

/** Scout scores each guess per column: hit, near, or miss. */
const SCOUT_ROW: ("hit" | "near" | "miss")[] = [
  "hit",
  "miss",
  "near",
  "miss",
  "hit",
];
const SCOUT_LABELS = ["Nation", "Pos", "Club", "League", "No."];

export function ScoutGuessRow() {
  const fill = {
    hit: "bg-success/20 text-success ring-success/40",
    near: "bg-[#e0a94a]/20 text-[#e0a94a] ring-[#e0a94a]/40",
    miss: "bg-surface-2 text-faint ring-rim-2",
  };
  return (
    <div aria-hidden className="w-full">
      <div className="grid grid-cols-5 gap-1">
        {SCOUT_ROW.map((state, i) => (
          <span
            key={i}
            className={`flex h-8 items-center justify-center rounded-lg px-1 text-[9px] font-medium ring-1 ring-inset ${fill[state]}`}
          >
            {SCOUT_LABELS[i]}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Top Bins */

/**
 * A ranked top ten, partly filled in. An abstract bar chart was the first
 * attempt and it was a lie — varying bar heights implied a quantity the game
 * doesn't have. The list says what the game actually is: named slots and
 * blank ones.
 */
const TOP_BINS: (string | null)[] = [
  "Cristiano Ronaldo",
  "Lionel Messi",
  null,
  "Robert Lewandowski",
];

export function TopBinsList() {
  return (
    <div aria-hidden className="w-full">
      <div className="flex flex-col gap-1">
        {TOP_BINS.map((name, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-4 text-right font-mono text-[10px] text-faint">
              {i + 1}
            </span>
            {name ? (
              <span className="flex-1 rounded-md bg-surface-2 px-2 py-1 text-[10px] font-medium text-ink">
                {name}
              </span>
            ) : (
              <span className="flex-1 rounded-md border border-dashed border-rim-2 px-2 py-1 text-[10px] text-faint">
                &nbsp;
              </span>
            )}
          </div>
        ))}
      </div>
      {/* The pill rides the head of the fill rather than sitting off in a
          corner, so the count and the progress read as one object. */}
      {/* mt-2 clears the pill, which stands taller than the track. */}
      <div className="mt-2">
        <Meter
          value={0.6}
          label="6/10"
          tone="success"
          title="Top Bins — six of ten answers named"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Journeyman */

const CAREER = ["Ajax", "Milan", "Madrid", "?"];

export function JourneymanPath() {
  return (
    <div aria-hidden className="flex w-full items-center gap-1.5">
      {CAREER.map((club, i) => (
        <span key={club} className="flex items-center gap-1.5">
          <span
            className={`rounded-md px-1.5 py-1 text-[9px] font-medium ${
              club === "?"
                ? "border border-dashed border-primary/50 bg-primary/10 text-accent-ink"
                : "bg-surface-2 text-muted"
            }`}
          >
            {club}
          </span>
          {i < CAREER.length - 1 ? (
            <span className="text-[9px] text-faint">→</span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ Team Sheet */

/** A 4-3-3 with two names still missing, laid out as it sits on the pitch. */
const FORMATION: { label: string; missing?: boolean }[][] = [
  [{ label: "RVN" }, { label: "", missing: true }, { label: "GIG" }],
  [{ label: "SCH" }, { label: "KEA" }, { label: "", missing: true }],
  [{ label: "IRW" }, { label: "STA" }, { label: "BRU" }, { label: "NEV" }],
];

export function TeamSheetFormation() {
  return (
    <div aria-hidden className="flex w-full flex-col gap-2">
      {FORMATION.map((line, i) => (
        <div key={i} className="flex justify-center gap-2">
          {line.map((slot, j) => (
            <span
              key={j}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-medium ${
                slot.missing
                  ? "border border-dashed border-primary/60 bg-primary/15 text-accent-ink"
                  : "bg-surface-2 text-muted"
              }`}
            >
              {slot.missing ? "?" : slot.label}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- Offside */

const OFFSIDE = [
  { name: "Zidane", odd: false },
  { name: "Ronaldo", odd: false },
  { name: "Kanté", odd: true },
  { name: "Figo", odd: false },
];

export function OffsideOptions() {
  return (
    <div aria-hidden className="grid w-full grid-cols-2 gap-1">
      {OFFSIDE.map((p) => (
        <span
          key={p.name}
          className={`rounded-lg px-2 py-1.5 text-[10px] font-medium ${
            p.odd
              ? "bg-primary/20 text-accent-ink ring-1 ring-inset ring-primary/40"
              : "bg-surface-2 text-muted"
          }`}
        >
          {p.name}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- Cult Hero */

/** The rarer the answer, the better it scores. */
const CULT = [
  { name: "Peter Crouch", pct: 62 },
  { name: "Emile Heskey", pct: 24 },
  { name: "Kevin Davies", pct: 4 },
];

export function CultHeroAnswers() {
  return (
    <div aria-hidden className="flex w-full flex-col gap-1.5">
      {CULT.map((a, i) => {
        const best = i === CULT.length - 1;
        return (
          <div key={a.name} className="flex items-center gap-2">
            <span
              className={`flex-1 truncate text-[10px] font-medium ${
                best ? "text-accent-ink" : "text-muted"
              }`}
            >
              {a.name}
            </span>
            <span className="h-1 w-14 overflow-hidden rounded-full bg-surface-2">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${a.pct}%`,
                  backgroundColor: best
                    ? "var(--color-primary)"
                    : "var(--color-rim-2)",
                }}
              />
            </span>
            <span className="w-7 text-right text-[9px] tabular-nums text-faint">
              {a.pct}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------- Red Card */

const SUSPECTS = ["S", "O", "M", "T"];

export function RedCardSuspects() {
  return (
    <div aria-hidden className="flex w-full items-center gap-2">
      {SUSPECTS.map((s, i) => (
        <span key={s} className="relative">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-medium ${
              i === 2
                ? "bg-error/20 text-error ring-1 ring-inset ring-error/50"
                : "bg-surface-2 text-muted"
            }`}
          >
            {s}
          </span>
          {i === 2 ? (
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2 rounded-[1px] bg-error" />
          ) : null}
        </span>
      ))}
      <span className="ml-1 text-[10px] text-faint">2 votes in</span>
    </div>
  );
}

/* ------------------------------------------------------ shared: progress */

export function ScoutProgress() {
  return (
    <SegmentMeter used={4} total={10} title="Scout — guess 4 of 10" />
  );
}
