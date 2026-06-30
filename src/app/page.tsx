import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DownloadButton } from "@/components/DownloadButton";
import { PhoneFrame, QuizScreen } from "@/components/showcase/PhoneFrame";
import { FloatingCard } from "@/components/showcase/FloatingCard";
import { GAMES } from "@/lib/links";

const STEPS = [
  {
    title: "Open Miflo",
    body: "No sign-up, no account. Pick a nickname and you're in.",
  },
  {
    title: "Share the code",
    body: "Host a room and send mates the four-letter code. They join in seconds.",
  },
  {
    title: "Play together",
    body: "Everyone answers live. Fastest correct answer takes the points.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* accent glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-accent/25 blur-[130px]"
          />
          <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col items-center justify-center px-6 py-12 text-center">
            <p className="animate-rise text-sm font-medium text-accent-ink/80">
              Multiplayer football party game · iOS
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl animate-rise text-balance text-5xl font-medium leading-[1.04] tracking-tight [animation-delay:60ms] sm:text-6xl">
              Football games you play with your mates.
            </h1>
            <p className="mx-auto mt-5 max-w-xl animate-rise text-lg leading-relaxed text-muted [animation-delay:120ms]">
              Join a room with a code and settle who really knows their football.
              Three quick games, live scores, zero setup.
            </p>

            {/* iPhone showcase + floating app components */}
            <Showcase />
          </div>
        </section>

        {/* Games */}
        <section id="games" className="scroll-mt-20 border-t border-divider">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <h2 className="max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
              Three games. One room.
            </h2>
            <p className="mt-3 max-w-md text-muted">
              Same lobby, same friends. Pick a game and pass the phone or play
              from your own.
            </p>

            <div className="mt-12 flex flex-col divide-y divide-divider">
              {GAMES.map((game, i) => (
                <article
                  key={game.name}
                  className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-10"
                >
                  <span className="font-mono text-sm text-accent-ink/60 sm:w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight sm:w-56 sm:shrink-0">
                    {game.name}
                  </h3>
                  <p className="max-w-md leading-relaxed text-muted">
                    {game.blurb}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-20 border-t border-divider bg-surface/40">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Up and running in seconds
            </h2>
            <ol className="mt-12 grid gap-8 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 font-medium text-accent-ink">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-divider">
          <div className="mx-auto w-full max-w-5xl px-6 py-20 text-center">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-medium tracking-tight sm:text-4xl">
              Round up your group chat.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Miflo is best with a few mates and something to prove.
            </p>
            <div className="mt-8 flex justify-center">
              <DownloadButton />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/**
 * The hero showcase: a phone running the quiz, ringed by "isolated" app
 * components. The floating cards only appear on lg+ so small screens stay
 * clean (just the phone) without overflow.
 */
function Showcase() {
  return (
    <div className="relative mx-auto mt-12 w-[260px]">
      <div className="relative animate-rise [animation-delay:240ms]">
        {/* room code */}
        <FloatingCard className="-left-72 top-8 hidden lg:block" delay={460}>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-surface-2 px-2.5 py-1 font-mono text-sm tracking-widest text-ink">
              ABCD
            </span>
            <div>
              <p className="text-xs font-medium text-ink">Room is live</p>
              <p className="text-[11px] text-muted">4 players joined</p>
            </div>
          </div>
        </FloatingCard>

        {/* correct-answer toast */}
        <FloatingCard className="-right-72 top-12 hidden lg:block" delay={560}>
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12.5l4.5 4.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <p className="text-xs font-medium text-ink">+250 speed bonus</p>
              <p className="text-[11px] text-muted">Fastest correct answer</p>
            </div>
          </div>
        </FloatingCard>

        {/* game switcher */}
        <FloatingCard
          className="-left-80 top-1/2 hidden -translate-y-1/2 lg:block"
          delay={660}
        >
          <p className="text-[11px] font-medium text-muted">Pick a game</p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
            <span className="rounded-full bg-accent px-2.5 py-1 font-medium text-white">
              Quiz
            </span>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-muted">
              Odd One Out
            </span>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-muted">
              Missing XI
            </span>
          </div>
        </FloatingCard>

        {/* leaderboard */}
        <FloatingCard className="-right-80 bottom-16 hidden lg:block" delay={760}>
          <p className="text-[11px] font-medium text-muted">Leaderboard</p>
          <div className="mt-2 flex w-40 flex-col gap-1.5 text-sm">
            <div className="flex items-center justify-between text-success">
              <span className="font-medium">1. You</span>
              <span className="font-mono">1,840</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>2. Sam</span>
              <span className="font-mono">1,610</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>3. Priya</span>
              <span className="font-mono">1,455</span>
            </div>
          </div>
        </FloatingCard>

        {/* player joined */}
        <FloatingCard
          className="-left-56 bottom-6 hidden lg:block"
          delay={860}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent-ink">
              JL
            </span>
            <p className="text-xs font-medium text-ink">Jess joined the room</p>
          </div>
        </FloatingCard>

        <PhoneFrame>
          <QuizScreen />
        </PhoneFrame>
      </div>
    </div>
  );
}
