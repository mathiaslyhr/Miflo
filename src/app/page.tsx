import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { DownloadButton } from "@/components/DownloadButton";
import { PhoneFrame } from "@/components/showcase/PhoneFrame";
import { FloatingCard } from "@/components/showcase/FloatingCard";
import hattrickShot from "@/components/showcase/assets/hattrick.png";
import { Eyebrow, OutlineButton } from "@/components/glass";
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
  {
    label: "Pre-match pub",
    body: "Warm up the table before kickoff.",
  },
  {
    label: "The group chat",
    body: "Settle the argument that never dies.",
  },
  {
    label: "Long away trip",
    body: "Kill the journey with a running leaderboard.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1">
        {/* The page-spanning gradient (PageMesh) is rendered once in RootShell,
            behind both the content and the footer. Sections stay transparent. */}

        {/* Hero — pink zone */}
        <section className="relative">
          <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col items-center justify-center px-6 py-12 text-center">
            <h1
              className="mx-auto mt-5 w-full max-w-4xl animate-rise text-balance font-medium leading-[1.02] tracking-tight text-[#0d0d16] [animation-delay:60ms]"
              style={{ fontSize: "clamp(2.5rem,6.5vw,4.5rem)" }}
            >
              The football game app for your group chat.
            </h1>
            <p className="mx-auto mt-5 max-w-xl animate-rise text-base leading-relaxed text-[#0d0d16]/55 [animation-delay:120ms] sm:text-lg">
              Start a party, share the code, and see who really got
              ballknowledge.
            </p>

            {/* iPhone showcase + floating app components */}
            <Showcase />
          </div>
        </section>

        {/* Games — periwinkle zone */}
        <section id="games" className="relative scroll-mt-20">
          <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
            <Eyebrow>The games</Eyebrow>
            <h2
              className="mt-4 max-w-xl font-medium leading-[1.05] tracking-tight text-[#0d0d16]"
              style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}
            >
              Five games. One party.
            </h2>
            <p className="mt-3 max-w-md text-[#0d0d16]/55">
              Same party, same mates. Pick a game and pass the phone or play
              from your own.
            </p>

            <div className="mt-12 flex flex-col divide-y divide-[#0d0d16]/10">
              {GAMES.map((game, i) => (
                <article
                  key={game.name}
                  className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-10"
                >
                  <span className="font-mono text-sm text-[#0d0d16] sm:w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight text-[#0d0d16] sm:w-56 sm:shrink-0">
                    {game.name}
                  </h3>
                  <p className="max-w-md leading-relaxed text-[#0d0d16]/55">
                    {game.blurb}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works — sky zone */}
        <section id="how" className="relative scroll-mt-20">
          <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
            <Eyebrow>How it works</Eyebrow>
            <h2
              className="mt-4 font-medium leading-[1.05] tracking-tight text-[#0d0d16]"
              style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}
            >
              Up and running in seconds.
            </h2>
            <ol className="mt-12 grid gap-8 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/50 font-medium text-[#0d0d16] shadow-[0_8px_20px_-10px_rgba(20,15,50,0.25)] backdrop-blur-md">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-[#0d0d16]">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#0d0d16]/55">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Made for the moment — lilac zone */}
        <section id="moments" className="relative scroll-mt-20">
          <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
            <Eyebrow>Made for the moment</Eyebrow>
            <h2
              className="mt-4 max-w-xl font-medium leading-[1.05] tracking-tight text-[#0d0d16]"
              style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}
            >
              Whenever the football&apos;s on.
            </h2>
            <p className="mt-3 max-w-md text-[#0d0d16]/55">
              Miflo is for the in-between moments — the ones you already spend
              arguing about football.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {MOMENTS.map((moment) => (
                <div
                  key={moment.label}
                  className="rounded-2xl border border-white/60 bg-white/40 p-5 shadow-[0_8px_24px_-16px_rgba(20,15,50,0.35)] backdrop-blur-md"
                >
                  <h3 className="text-base font-medium text-[#0d0d16]">
                    {moment.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0d0d16]/55">
                    {moment.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA — sand zone */}
        <section className="relative">
          <div className="relative mx-auto w-full max-w-5xl px-6 py-28 text-center">
            <h2
              className="mx-auto max-w-2xl text-balance font-medium leading-[1.05] tracking-tight text-[#0d0d16]"
              style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}
            >
              Round up your group chat.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[#0d0d16]/55">
              Miflo is best with a few mates and something to prove.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <DownloadButton className="text-sm" />
              <OutlineButton href="/#games" className="!px-6 !py-3.5">
                See the games
              </OutlineButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/**
 * The hero showcase: a phone running Hattrick (a real app screenshot), ringed
 * by "isolated" app components that mirror the app's glass language — glass
 * pills with an accent rim for selected/you, toast pill with a tinted icon
 * chip, solid-accent avatar. The floating cards only appear on lg+ so small
 * screens stay clean (just the phone) without overflow.
 */
function Showcase() {
  return (
    <div className="relative mx-auto mt-12 w-[260px]">
      <div className="relative animate-rise [animation-delay:240ms]">
        {/* room code — lobby glass tag, accent rim like the "you" state */}
        <FloatingCard className="-left-72 top-8 hidden lg:block" delay={460}>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-accent bg-white/55 px-2.5 py-1 font-mono text-sm tracking-widest text-ink">
              ABCD
            </span>
            <div>
              <p className="text-xs font-medium text-ink">Party is live</p>
              <p className="text-[11px] text-ink/50">4 mates joined</p>
            </div>
          </div>
        </FloatingCard>

        {/* square-claimed toast — the app's pill toast with a tinted icon chip */}
        <FloatingCard pill className="-right-72 top-12 hidden lg:block" delay={560}>
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#def5e8] text-success">
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

        {/* game switcher — glass tags, accent rim marks the selected game */}
        <FloatingCard
          className="-left-80 top-1/2 hidden -translate-y-1/2 lg:block"
          delay={660}
        >
          <p className="text-[11px] font-medium text-ink/55">Pick a game</p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
            <span className="rounded-full border border-accent bg-white/55 px-2.5 py-1 font-medium text-ink">
              Hattrick
            </span>
            <span className="rounded-full border border-white/65 bg-surface-2 px-2.5 py-1 text-ink/55">
              Red Card
            </span>
            <span className="rounded-full border border-white/65 bg-surface-2 px-2.5 py-1 text-ink/55">
              Scout
            </span>
          </div>
        </FloatingCard>

        {/* leaderboard — "you" reads in brand purple, like the app */}
        <FloatingCard className="-right-80 bottom-16 hidden lg:block" delay={760}>
          <p className="text-[11px] font-medium text-ink/55">Leaderboard</p>
          <div className="mt-2 flex w-40 flex-col gap-1.5 text-sm">
            <div className="flex items-center justify-between text-accent">
              <span className="font-medium">1. You</span>
              <span className="font-mono">1,840</span>
            </div>
            <div className="flex items-center justify-between text-ink/55">
              <span>2. Sebastian</span>
              <span className="font-mono">1,610</span>
            </div>
            <div className="flex items-center justify-between text-ink/55">
              <span>3. Oscar</span>
              <span className="font-mono">1,455</span>
            </div>
            <div className="flex items-center justify-between text-ink/55">
              <span>4. Max</span>
              <span className="font-mono">1,290</span>
            </div>
          </div>
        </FloatingCard>

        {/* player joined — solid-accent initials avatar (the app's Avatar atom) */}
        <FloatingCard className="-left-56 bottom-6 hidden lg:block" delay={860}>
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-medium text-white">
              TH
            </span>
            <p className="text-xs font-medium text-ink">Thomas joined the party</p>
          </div>
        </FloatingCard>

        <PhoneFrame chrome={false}>
          <Image
            src={hattrickShot}
            alt="A Hattrick round in Miflo — a three-by-three grid of football categories with claimed squares and the timer running"
            fill
            priority
            sizes="240px"
            className="object-cover"
          />
        </PhoneFrame>
      </div>
    </div>
  );
}
