import { SiteHeader } from "@/components/SiteHeader";
import { DownloadButton } from "@/components/DownloadButton";
import { PhoneFrame } from "@/components/showcase/PhoneFrame";
import { FloatingCard } from "@/components/showcase/FloatingCard";
import { HattrickScreen } from "@/components/showcase/HattrickScreen";
import {
  Bento,
  BentoItem,
  Card,
  Chip,
  HeroGlow,
  OutlineButton,
  AnimatedMeter,
} from "@/components/ui";
import {
  HattrickGrid,
  ScoutGuessRow,
  ScoutProgress,
  TopBinsList,
  JourneymanPath,
  TeamSheetFormation,
  OffsideOptions,
  CultHeroAnswers,
  RedCardSuspects,
} from "@/components/games/visuals";
import { GAMES } from "@/lib/links";

const STEPS = [
  {
    title: "Open Miflo",
    body: "No sign-up, no account. Pick a nickname and you're in.",
  },
  {
    title: "Share the code",
    body: "Start a party and drop the four-letter code in the group chat. They join in seconds.",
  },
  {
    title: "Play together",
    body: "Everyone answers live. Fastest correct answer takes the points.",
  },
];

const MOMENTS = [
  {
    label: "Halftime",
    body: "Fifteen minutes, one quick game before the second half.",
  },
  { label: "Pre-match pub", body: "Warm up the table before kickoff." },
  { label: "The group chat", body: "Settle the argument that never dies." },
  { label: "Long away trip", body: "Kill the journey with a running leaderboard." },
];

/** Game copy lives in one place (lib/links.ts); this maps a name to its visual. */
const VISUALS: Record<string, React.ReactNode> = {
  Hattrick: <HattrickGrid />,
  Offside: <OffsideOptions />,
  "Cult Hero": <CultHeroAnswers />,
  "Red Card": <RedCardSuspects />,
  Scout: <ScoutGuessRow />,
  "Top Bins": <TopBinsList />,
  Journeyman: <JourneymanPath />,
  "Team Sheet": <TeamSheetFormation />,
};

const game = (name: string) => GAMES.find((g) => g.name === name)!;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* ------------------------------------------------------------ hero */}
        <section className="relative overflow-hidden">
          <HeroGlow />
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-16 pt-16 text-center sm:pt-24">
            <h1
              className="mx-auto w-full max-w-4xl animate-rise text-balance font-medium leading-[1.04] tracking-tight text-ink [animation-delay:60ms]"
              style={{ fontSize: "clamp(2.5rem,6.5vw,4.5rem)" }}
            >
              The football game app for your group chat.
            </h1>
            <p className="mx-auto mt-5 max-w-xl animate-rise text-lg leading-relaxed text-muted [animation-delay:120ms]">
              Start a party, share the code, and see who really got
              ballknowledge.
            </p>
            <div className="mt-8 flex animate-rise flex-wrap justify-center gap-3 [animation-delay:180ms]">
              <DownloadButton className="text-sm" />
              <OutlineButton href="#games" className="!px-6 !py-3.5">
                See the games
              </OutlineButton>
            </div>

            <Showcase />
          </div>
        </section>

        {/* ----------------------------------------------------------- games */}
        <section id="games" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <h2
              className="max-w-xl font-medium leading-[1.05] tracking-tight text-ink"
              style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}
            >
              Eight games. One party.
            </h2>
            <p className="mt-3 max-w-md text-muted">
              Four to play together, online or passing one phone around. Four
              daily puzzles you play on your own.
            </p>

            <h3 className="mt-14 flex items-center gap-3 text-sm font-medium text-muted">
              Play together
              <span className="h-px flex-1 bg-divider" />
            </h3>

            <Bento className="mt-5">
              <GameTile name="Hattrick" col={2} colSm={4} rowSm={2} featured />
              <GameTile name="Offside" col={1} colSm={2} />
              <GameTile name="Red Card" col={1} colSm={2} />
              <GameTile name="Cult Hero" col={2} colSm={6} wide />
            </Bento>

            <h3 className="mt-12 flex items-center gap-3 text-sm font-medium text-muted">
              Daily, solo
              <span className="h-px flex-1 bg-divider" />
            </h3>

            <Bento className="mt-5">
              <GameTile name="Scout" col={2} colSm={3} progress />
              <GameTile name="Top Bins" col={2} colSm={3} />
              <GameTile name="Journeyman" col={2} colSm={3} />
              <GameTile name="Team Sheet" col={2} colSm={3} />
            </Bento>
          </div>
        </section>

        {/* ---------------------------------------------------- how it works */}
        <section id="how" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <h2
              className="font-medium leading-[1.05] tracking-tight text-ink"
              style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}
            >
              Up and running in seconds.
            </h2>
            {/* A real three-step sequence, so the numbers carry information. */}
            <ol className="mt-10 grid gap-3 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <Card as="li" key={step.title}>
                  <span className="font-mono text-sm text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
                </Card>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- moments */}
        <section id="moments" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <h2
                  className="max-w-md font-medium leading-[1.05] tracking-tight text-ink"
                  style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}
                >
                  Whenever the football&apos;s on.
                </h2>
                <p className="mt-3 max-w-md text-muted">
                  Miflo is for the in-between moments, the ones you already
                  spend arguing about football.
                </p>
              </div>

              {/* One card with four rows, not four cards: these are variations
                  on a single idea, and a grid of equal tiles would flatten
                  them into a spec sheet. */}
              <Card className="!p-0">
                <ul className="divide-y divide-divider">
                  {MOMENTS.map((moment) => (
                    <li key={moment.label} className="flex gap-4 px-5 py-4">
                      <span className="w-28 shrink-0 text-sm font-medium text-ink">
                        {moment.label}
                      </span>
                      <span className="text-sm leading-relaxed text-muted">
                        {moment.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- cta */}
        <section>
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <Card className="!p-10 text-center sm:!p-16">
              <h2
                className="mx-auto max-w-2xl text-balance font-medium leading-[1.05] tracking-tight text-ink"
                style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
              >
                Round up your group chat.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted">
                Miflo is best with a few friends and something to prove.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <DownloadButton className="text-sm" />
                <OutlineButton href="/guide" className="!px-6 !py-3.5">
                  Read the guide
                </OutlineButton>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}

/* ------------------------------------------------------------------ tiles */

/**
 * One game as a bento tile. `featured` gives the visual room to breathe above
 * the copy; `wide` lays copy and visual side by side on a full-width tile.
 */
function GameTile({
  name,
  col,
  colSm,
  rowSm,
  featured = false,
  wide = false,
  progress = false,
}: {
  name: string;
  col: 1 | 2;
  colSm: 1 | 2 | 3 | 4 | 6;
  rowSm?: 1 | 2;
  featured?: boolean;
  wide?: boolean;
  progress?: boolean;
}) {
  const g = game(name);
  const visual = VISUALS[name];

  if (wide) {
    return (
      <BentoItem col={col} colSm={colSm} rowSm={rowSm}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
          <div className="sm:max-w-sm">
            <TileTitle name={g.name} players={g.players} />
            <p className="mt-2 text-sm leading-relaxed text-muted">{g.blurb}</p>
          </div>
          <div className="sm:ml-auto sm:w-56 sm:shrink-0">{visual}</div>
        </div>
      </BentoItem>
    );
  }

  return (
    <BentoItem col={col} colSm={colSm} rowSm={rowSm}>
      <TileTitle name={g.name} players={g.players} />
      <p
        className={`mt-2 text-sm leading-relaxed text-muted ${
          featured ? "max-w-md" : ""
        }`}
      >
        {g.blurb}
      </p>

      {/*
        Tiles in a row stretch to the tallest one, so a short visual pinned
        under its paragraph leaves a hole beneath it. Pushing the visual to the
        bottom instead gives every tile the same shape — copy at the top, game
        at the foot — and the leftover space collects in one deliberate gutter
        rather than a different-sized hole per card. The featured tile centres
        its grid in the space instead, since it has room to spare.
      */}
      <div
        className={
          featured
            ? "flex flex-1 items-center py-8"
            : "mt-auto pt-6"
        }
      >
        {visual}
      </div>

      {featured ? (
        <div>
          <div className="flex items-baseline justify-between text-[11px]">
            <span className="text-muted">Time left</span>
            <span className="font-mono text-ink">1:58</span>
          </div>
          <div className="mt-1.5">
            <AnimatedMeter seconds={14} title="Hattrick round timer" />
          </div>
        </div>
      ) : null}

      {progress ? (
        <div className="pt-5">
          <p className="mb-2 text-[11px] text-muted">Guess 4 of 10</p>
          <ScoutProgress />
        </div>
      ) : null}
    </BentoItem>
  );
}

function TileTitle({ name, players }: { name: string; players: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <h4 className="text-lg font-medium tracking-tight text-ink">{name}</h4>
      <Chip>{players}</Chip>
    </div>
  );
}

/* --------------------------------------------------------------- showcase */

/**
 * The hero showcase: a phone mid-Hattrick, ringed by app components lifted out
 * of context. Three per side, lg+ only, so small screens get just the phone.
 */
function Showcase() {
  return (
    <div className="relative mx-auto mt-14 w-[260px]">
      <div className="relative animate-rise [animation-delay:240ms]">
        {/* room code — the lobby's code tag */}
        <FloatingCard className="-left-72 top-8 hidden xl:block" delay={460}>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-primary/60 bg-primary/15 px-2.5 py-1 font-mono text-sm tracking-widest text-accent-ink">
              ABCD
            </span>
            <div className="text-left">
              <p className="text-xs font-medium text-ink">Party is live</p>
              <p className="text-[11px] text-faint">4 in the party</p>
            </div>
          </div>
        </FloatingCard>

        {/* Scout — the daily game's compare row */}
        <FloatingCard className="-right-80 top-6 hidden xl:block" delay={560}>
          <p className="text-left text-[11px] font-medium text-muted">
            Scout · guess 2 of 10
          </p>
          <p className="mt-1.5 text-left text-xs font-medium text-ink">
            Lamine Yamal
          </p>
          <div className="mt-2 w-48">
            <ScoutGuessRow />
          </div>
        </FloatingCard>

        {/* square-claimed toast */}
        <FloatingCard
          pill
          className="-left-72 top-[42%] hidden -translate-y-1/2 lg:block"
          delay={660}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12.5l4.5 4.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="pr-1 text-xs font-medium text-ink">
              Lionel Messi — square claimed
            </p>
          </div>
        </FloatingCard>

        {/* leaderboard — "you" reads purple, as in the app */}
        <FloatingCard className="-left-80 bottom-32 hidden xl:block" delay={860}>
          <p className="text-left text-[11px] font-medium text-muted">
            Leaderboard
          </p>
          <div className="mt-2 flex w-40 flex-col gap-1.5 text-sm">
            <div className="flex items-center justify-between text-accent-ink">
              <span className="font-medium">1. You</span>
              <span className="font-mono">1,840</span>
            </div>
            {[
              ["2. Sebastian", "1,610"],
              ["3. Oscar", "1,455"],
              ["4. Max", "1,290"],
            ].map(([who, score]) => (
              <div
                key={who}
                className="flex items-center justify-between text-muted"
              >
                <span>{who}</span>
                <span className="font-mono">{score}</span>
              </div>
            ))}
          </div>
        </FloatingCard>

        {/* streak — the daily games' reward loop */}
        <FloatingCard className="-right-80 bottom-10 hidden xl:block" delay={960}>
          <p className="text-left text-[11px] font-medium text-muted">
            Scout streak
          </p>
          <p className="mt-1 text-left text-2xl font-medium text-ink">
            12 <span className="text-sm text-muted">days</span>
          </p>
        </FloatingCard>

        {/* player-joined toast */}
        <FloatingCard
          pill
          className="-right-72 top-1/2 hidden -translate-y-1/2 lg:block"
          delay={760}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-accent-ink">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </span>
            <p className="pr-1 text-xs font-medium text-ink">
              Thomas joined the party
            </p>
          </div>
        </FloatingCard>

        <PhoneFrame>
          <HattrickScreen />
        </PhoneFrame>
      </div>
    </div>
  );
}
