import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Bento, BentoItem, Card, Chip, SolidButton } from "@/components/ui";
import { GAMES } from "@/lib/links";

export const metadata: Metadata = {
  title: "Guide — Miflo",
  description:
    "How Miflo works, top to bottom: the eight games, the daily puzzles and streaks, how friends work without a login, your profile and picture, notifications, and how the player data stays up to date.",
};

// Streak rules per daily game (mirrors the app's rules copy). Kept here because
// the guide is the one place we explain them in full.
const DAILY_RULES: Record<string, string> = {
  Scout: "Solve it in ten guesses or fewer to keep your streak.",
  "Top Bins": "Finish with ten misses or fewer to keep your streak.",
  Journeyman: "Solve it in ten guesses or fewer to keep your streak.",
  "Team Sheet": "Finish with five misses or fewer to keep your streak.",
};

const CONTENTS = [
  { href: "#games", label: "The games" },
  { href: "#daily", label: "Daily games and streaks" },
  { href: "#friends", label: "Friends" },
  { href: "#profile", label: "Your profile" },
  { href: "#notifications", label: "Notifications" },
  { href: "#players", label: "The players" },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-14">
      <h2 className="flex items-baseline gap-3 text-xl font-medium tracking-tight text-ink">
        <span aria-hidden className="h-4 w-0.5 shrink-0 rounded bg-primary" />
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

function GameTile({
  name,
  players,
  blurb,
  note,
}: {
  name: string;
  players: string;
  blurb: string;
  note?: string;
}) {
  return (
    <BentoItem col={2} colSm={3}>
      <div className="flex items-center gap-2.5">
        <h3 className="text-lg font-medium tracking-tight text-ink">{name}</h3>
        <Chip>{players}</Chip>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
      {note ? (
        <p className="mt-auto pt-4 text-sm text-accent-ink">{note}</p>
      ) : null}
    </BentoItem>
  );
}

export default function GuidePage() {
  const dailies = GAMES.filter((g) => g.type === "daily");
  const together = GAMES.filter((g) => g.type === "together");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="relative mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
            <h1
              className="text-balance font-medium leading-[1.05] tracking-tight text-ink"
              style={{ fontSize: "clamp(2.5rem,6vw,3.75rem)" }}
            >
              How Miflo works.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Everything in the app and where to find it: the games, the daily
              puzzles, how friends work without a login, and how the football
              data stays fresh.
            </p>

            {/* Contents */}
            <nav className="mt-10 flex flex-wrap gap-2">
              {CONTENTS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-rim-2 bg-surface-2 px-3.5 py-1.5 text-sm text-muted transition-colors hover:bg-surface-3 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <article className="mx-auto w-full max-w-3xl px-6 pb-20">
          <Section id="games" title="The games">
            <p>
              Miflo has eight games. You find them all on the Games tab. Four are
              daily puzzles you play on your own, and four are for playing
              together, either online or by passing one phone around. To play a
              party game on a single phone, swipe its card to the right and pick
              &ldquo;On this phone&rdquo;.
            </p>

            <div className="pt-4">
              <h3 className="flex items-center gap-3 text-sm font-medium text-muted">
                A new puzzle every day
                <span className="h-px flex-1 bg-divider" />
              </h3>
              <Bento className="mt-4">
                {dailies.map((g) => (
                  <GameTile
                    key={g.name}
                    name={g.name}
                    players={g.players}
                    blurb={g.blurb}
                    note={DAILY_RULES[g.name]}
                  />
                ))}
              </Bento>
            </div>

            <div className="pt-6">
              <h3 className="flex items-center gap-3 text-sm font-medium text-muted">
                Play together
                <span className="h-px flex-1 bg-divider" />
              </h3>
              <Bento className="mt-4">
                {together.map((g) => (
                  <GameTile
                    key={g.name}
                    name={g.name}
                    players={g.players}
                    blurb={g.blurb}
                  />
                ))}
              </Bento>
            </div>
          </Section>

          <Section id="daily" title="Daily games and streaks">
            <p>
              Every day, each daily game has one puzzle, and it&apos;s the same
              puzzle for everyone. Solve it inside the limit and your streak
              grows by one. Miss the limit and the streak resets, so the run is
              yours to protect.
            </p>
            <p>
              Scout and Journeyman ask you to solve in ten guesses or fewer. Top
              Bins gives you room for ten misses, and Team Sheet for five. Your
              guesses and streaks are stored on your phone, so nobody sees the
              answer you were chasing, only whether you got there.
            </p>
            <p>
              The Log, in your profile, keeps a running record of every day
              you&apos;ve played across all four daily games, so you can see your
              history and streaks at a glance.
            </p>
          </Section>

          <Section id="friends" title="Friends">
            <p>
              Miflo has no login, so a fair question is: how can I have friends
              at all? Your phone holds an anonymous identity for you. When you
              turn on Friends, we give you a personal friend code that&apos;s
              yours to share.
            </p>
            <p>
              To add someone, enter their friend code. They get a request and,
              once they accept, you&apos;re connected. From then on you can see
              each other&apos;s daily results and streaks, and invite each other
              to a party. You can remove a friend any time.
            </p>

            <Card>
              <div className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-error/15 text-error">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.42 0Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-ink">
                    No account means no backup
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Because there&apos;s no login, everything lives on this
                    phone. If you delete the app, reinstall it or move to a new
                    phone, it all resets: your friend code, your friends, your
                    picture, and your streaks and history. There&apos;s no way to
                    recover it, and your old friend code stops working. If you
                    plan to switch phones, keep that in mind.
                  </p>
                </div>
              </div>
            </Card>
          </Section>

          <Section id="profile" title="Your profile">
            <p>
              Your profile is where your nickname, your friend code and your
              stats live. You can change your display name whenever you like.
            </p>
            <p>
              Adding a profile picture is optional. Tap your avatar and the app
              asks to open your photo library so you can pick an image. Only the
              photo you choose is used, and your friends and anyone in a party
              with you can see it, so pick something you&apos;re happy to share.
              You can remove it just as easily.
            </p>
          </Section>

          <Section id="notifications" title="Notifications">
            <p>
              Notifications are opt in. If you turn them on, Miflo can let you
              know when someone sends you a friend request, accepts yours, or
              invites you to a party.
            </p>
            <p>
              There are also two gentle daily nudges: a reminder to play the
              day&apos;s puzzles and a streak saver in the evening if you
              haven&apos;t played yet. Both are scheduled by the app on your
              phone, and you can switch them off in settings.
            </p>
          </Section>

          <Section id="players" title="The players">
            <p>
              Miflo runs on a hand-built database of over 1,300 footballers from
              around the world, with every question and puzzle built on real
              career facts. We don&apos;t have every player, and we won&apos;t
              pretend to. We focus on well-known names from the top leagues so
              the games stay recognisable, and we add more all the time.
            </p>
            <p>
              New players and fixes reach the app on their own, usually within a
              minute, with no update to install. Player pictures, club crests and
              flags are the exception: those come with an app update, so a
              brand-new player might arrive with a placeholder until the next
              release.
            </p>
            <p>Miflo is available in English and Danish.</p>
            <p>
              Someone missing, or a detail wrong? Tell us. We take requests, and
              a quick note through{" "}
              <Link
                href="/feedback"
                className="text-accent-ink underline underline-offset-4 hover:text-ink"
              >
                feedback
              </Link>{" "}
              is the fastest way to get a player looked at.
            </p>
          </Section>

          <Card className="mt-16 !p-8 text-center">
            <h2 className="text-xl font-medium tracking-tight text-ink">
              Still stuck, or missing something?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Questions, bugs and player requests all land with the people making
              Miflo.
            </p>
            <div className="mt-5 flex justify-center">
              <SolidButton href="/feedback">Send feedback</SolidButton>
            </div>
          </Card>
        </article>
      </main>
    </>
  );
}
