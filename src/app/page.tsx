import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DownloadButton } from "@/components/DownloadButton";
import { GAMES, HAS_DOWNLOAD } from "@/lib/links";

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
            className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]"
          />
          <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 px-6 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-rise">
              <p className="text-sm font-medium text-accent-ink/80">
                Multiplayer football party game · iOS
              </p>
              <h1 className="mt-4 text-balance text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
                Football games you play with your mates.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Join a room with a code and settle who really knows their
                football. Three quick games, live scores, zero setup.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <DownloadButton />
                <Link
                  href="#games"
                  className="rounded-button border border-divider px-6 py-3.5 font-medium text-ink transition-colors hover:border-muted"
                >
                  See the games
                </Link>
              </div>
              {!HAS_DOWNLOAD && (
                <p className="mt-4 text-sm text-muted">
                  Public beta opens soon. Leave a note and we&apos;ll send an
                  invite.
                </p>
              )}
            </div>

            <div className="animate-rise [animation-delay:120ms]">
              <QuizMock />
            </div>
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
        <section className="border-t border-divider bg-surface/40">
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

/** A stylised mock of the in-app quiz screen, in the app's own colours. */
function QuizMock() {
  const options = [
    { label: "Leicester City", correct: false },
    { label: "Chelsea", correct: true },
    { label: "Arsenal", correct: false },
    { label: "Everton", correct: false },
  ];
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-[2.2rem] border border-divider bg-surface p-3 shadow-2xl shadow-black/60">
      <div className="rounded-[1.6rem] bg-bg p-5">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="rounded-full bg-surface-2 px-3 py-1 font-mono tracking-widest text-ink">
            ABCD
          </span>
          <span>Question 4 / 10</span>
        </div>

        <p className="mt-6 text-lg font-medium leading-snug">
          Which club did N&apos;Golo Kanté join in 2016?
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          {options.map((o) => (
            <div
              key={o.label}
              className={`flex items-center justify-between rounded-button px-4 py-3 text-sm ${
                o.correct ? "bg-accent text-white" : "bg-surface-2 text-muted"
              }`}
            >
              <span>{o.label}</span>
              {o.correct && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 12.5l4.5 4.5L19 7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-muted">
          <span>+250 speed bonus</span>
          <span className="text-success">You&apos;re 1st</span>
        </div>
      </div>
    </div>
  );
}
