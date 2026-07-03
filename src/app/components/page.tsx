import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { PhoneFrame, QuizScreen } from "@/components/showcase/PhoneFrame";
import {
  AnsweredDots,
  AnswerOption,
  Avatar,
  CopyCodeButton,
  CorrectToast,
  ICON_REGISTRY,
  NavIsland,
  PlayerJoinedToast,
  RankBadge,
  RoomCodeChip,
  ScorePill,
  Skeleton,
  StreakChip,
  TimerBar,
  TimerRing,
  Toggle,
  WrongToast,
} from "@/components/showcase/parts";
import {
  COLOR_TOKENS,
  MOTION,
  RADII,
  SPACING,
  TIMER_TOKENS,
  TYPE_SCALE,
} from "@/components/showcase/foundations";
import { QuizConfig } from "@/components/showcase/QuizConfig";
import {
  AboutScreen,
  CountdownScreen,
  CreateRoomScreen,
  EmptyLobbyScreen,
  GamesScreen,
  HomeScreen,
  JoinRoomScreen,
  LeaderboardScreen,
  LeaveRoomSheet,
  LoadingScreen,
  LobbyScreen,
  MenuScreen,
  MissingXIConfigScreen,
  MissingXIRevealScreen,
  MissingXIScreen,
  OddOneOutConfigScreen,
  OddOneOutRevealScreen,
  OddOneOutScreen,
  ProfileScreen,
  ReconnectingScreen,
  ResultsScreen,
  RevealScreen,
  RoomFullScreen,
  RoomNotFoundScreen,
  RoundSummaryScreen,
  SettingsScreen,
  StatsScreen,
  ToastDemoScreen,
  WaitingScreen,
} from "@/components/showcase/screens";

export const metadata: Metadata = {
  title: "Components — Miflo",
  description: "The Miflo UI kit: app flow, game screens, states and building blocks.",
};

/* Jump-nav entries — id must match each Section's id. */
const FOUNDATIONS = [
  { id: "colour", label: "Colour" },
  { id: "type", label: "Typography" },
  { id: "shape", label: "Radii & spacing" },
  { id: "iconography", label: "Icons" },
  { id: "motion", label: "Motion" },
];
const APP_FLOW = [
  { id: "home-join", label: "Home & join" },
  { id: "games-hub", label: "Games hub" },
  { id: "game-setup", label: "Game setup" },
  { id: "match-flow", label: "Match flow" },
  { id: "results", label: "Results" },
  { id: "menu", label: "Menu" },
  { id: "system", label: "System states" },
];
const BLOCKS = [
  { id: "nav-island", label: "Nav island" },
  { id: "answers", label: "Answer options" },
  { id: "timers", label: "Timers" },
  { id: "feedback", label: "Feedback" },
  { id: "atoms", label: "Atoms & badges" },
  { id: "lobby", label: "Room & lobby" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "game-screens", label: "Game screens" },
];

/* A numbered gallery section — mirrors the "01 / title" pattern on the games list. */
function Section({
  id,
  index,
  title,
  caption,
  children,
}: {
  id: string;
  index: number;
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-divider py-14">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
        <span className="font-mono text-sm text-accent-ink/60 sm:w-10">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
          {caption && (
            <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
              {caption}
            </p>
          )}
        </div>
      </div>
      <div className="mt-8 sm:pl-[4.5rem]">{children}</div>
    </section>
  );
}

/* A group divider with a big label + a jump nav to its sections. */
function GroupHeading({
  id,
  eyebrow,
  title,
  links,
}: {
  id: string;
  eyebrow: string;
  title: string;
  links: { id: string; label: string }[];
}) {
  return (
    <div id={id} className="scroll-mt-24 pt-16">
      <p className="text-sm font-medium text-accent-ink/80">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="rounded-full border border-divider bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/* A labelled tile so each variant reads with its state name underneath. */
function Swatch({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex items-center justify-center rounded-card border border-divider bg-surface/60 p-5 ${className}`}
      >
        {children}
      </div>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  );
}

/* Caption for a phone-screen tile. */
function PhoneTile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[240px]">
        <PhoneFrame>{children}</PhoneFrame>
      </div>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  );
}

/* The FloatingCard visual without its absolute positioning / entrance anim. */
function FloatingCardStatic({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-card border border-divider bg-surface/90 px-3.5 py-3 shadow-[0_16px_32px_-12px_rgba(20,15,50,0.2)] backdrop-blur">
        {children}
      </div>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  );
}

const TIMER_STOPS = [
  { c: "var(--color-timer-1)", label: "Full" },
  { c: "var(--color-timer-2)", label: "" },
  { c: "var(--color-timer-3)", label: "Half" },
  { c: "var(--color-timer-4)", label: "" },
  { c: "var(--color-timer-5)", label: "Empty" },
];

export default function ComponentsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
          {/* Hero */}
          <p className="text-sm font-medium text-accent-ink/80">UI kit</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
            Miflo components
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Every screen and piece in one place — the full app flow, game states,
            and the building blocks they&apos;re made of. Same tokens, same fonts
            as the app.
          </p>

          {/* ========================== FOUNDATIONS ========================== */}
          <GroupHeading
            id="foundations"
            eyebrow="Design language"
            title="Foundations"
            links={FOUNDATIONS}
          />

          <Section
            id="colour"
            index={1}
            title="Colour"
            caption="The token palette. Reference by name (bg, accent, success…) — never raw hex in components."
          >
            <div className="flex flex-wrap gap-3">
              {COLOR_TOKENS.map((c) => (
                <div key={c.name} className="flex flex-col gap-1.5">
                  <span
                    className="h-14 w-20 rounded-card border border-divider"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[11px] font-medium text-ink">{c.name}</span>
                  <span className="font-mono text-[10px] text-muted">{c.hex}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 mb-2 text-[11px] font-medium text-muted">
              Countdown scale (timer-1 → timer-5)
            </p>
            <div className="flex flex-wrap gap-3">
              {TIMER_TOKENS.map((c) => (
                <div key={c.name} className="flex flex-col gap-1.5">
                  <span
                    className="h-10 w-16 rounded-md"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="font-mono text-[10px] text-muted">
                    {c.name}
                    {c.note && ` · ${c.note}`}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="type"
            index={2}
            title="Typography"
            caption="Satoshi (400 / 500). One scale across the whole product — sizes shown at their real size."
          >
            <div className="flex flex-col divide-y divide-divider">
              {TYPE_SCALE.map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="text-[11px] text-muted sm:w-28 sm:shrink-0">
                    {t.note}
                  </span>
                  <span className={`${t.cls} text-ink`}>{t.label}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="shape"
            index={3}
            title="Radii & spacing"
            caption="Two corner radii do almost everything; spacing follows a 4px rhythm."
          >
            <div className="flex flex-wrap items-end gap-6">
              {RADII.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <span
                    className={`h-16 w-16 border border-divider bg-surface-2 ${r.cls}`}
                  />
                  <span className="text-[11px] font-medium text-ink">{r.name}</span>
                  <span className="font-mono text-[10px] text-muted">{r.note}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {SPACING.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span
                    className="h-3 rounded-sm bg-accent"
                    style={{ width: s.px }}
                  />
                  <span className="font-mono text-[11px] text-muted">
                    {s.name} · {s.px}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="iconography"
            index={4}
            title="Icons"
            caption="Inline SVG, currentColor, sized by a prop. No emojis anywhere — new glyphs get added to the registry."
          >
            <div className="flex flex-wrap gap-3">
              {ICON_REGISTRY.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex w-20 flex-col items-center gap-2 rounded-card border border-divider bg-surface/60 py-4 text-ink"
                >
                  <Icon size={22} />
                  <span className="text-[10px] text-muted">{name}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="motion"
            index={5}
            title="Motion"
            caption="A little motion, hand-rolled in CSS — no animation libraries."
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="animate-rise inline-block rounded-card bg-accent px-4 py-2 text-sm font-medium text-white">
                rise ↑
              </span>
              <span className="animate-float inline-block rounded-card border border-divider bg-surface-2 px-4 py-2 text-sm text-ink">
                float
              </span>
            </div>
            <div className="flex flex-col divide-y divide-divider">
              {MOTION.map((m) => (
                <div
                  key={m.name}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6"
                >
                  <span className="font-mono text-xs text-accent-ink/70 sm:w-32 sm:shrink-0">
                    {m.name}
                  </span>
                  <span className="max-w-md text-sm leading-relaxed text-muted">
                    {m.desc}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* =========================== APP FLOW =========================== */}
          <GroupHeading
            id="app-flow"
            eyebrow="Walkthrough"
            title="App flow"
            links={APP_FLOW}
          />

          <Section
            id="home-join"
            index={1}
            title="Home & join"
            caption="Home has create, join and a scan-to-download QR. Creating or joining always asks for a username."
          >
            <div className="flex flex-wrap items-start gap-x-8 gap-y-10">
              <PhoneTile label="Home">
                <HomeScreen />
              </PhoneTile>
              <PhoneTile label="Create — pick a name">
                <CreateRoomScreen />
              </PhoneTile>
              <PhoneTile label="Join — code + name">
                <JoinRoomScreen />
              </PhoneTile>
            </div>
          </Section>

          <Section
            id="games-hub"
            index={2}
            title="Games hub"
            caption="The three games in one room. Tap one to set it up."
          >
            <PhoneTile label="Games">
              <GamesScreen />
            </PhoneTile>
          </Section>

          <Section
            id="game-setup"
            index={3}
            title="Game setup"
            caption="Football Quiz setup is live — tap the counts and topics. 'All' locks the other topics; unpress it to choose your own and the match count updates. All three games share the pattern."
          >
            <div className="flex flex-wrap items-start gap-x-8 gap-y-10">
              <PhoneTile label="Football Quiz setup · interactive">
                <QuizConfig />
              </PhoneTile>
              <PhoneTile label="Odd One Out setup">
                <OddOneOutConfigScreen />
              </PhoneTile>
              <PhoneTile label="Missing XI setup">
                <MissingXIConfigScreen />
              </PhoneTile>
            </div>
          </Section>

          <Section
            id="match-flow"
            index={4}
            title="Match flow"
            caption="A round from start to reveal: countdown, waiting for players, the answer reveal, and the between-rounds summary — plus the reveal moment for the other two games."
          >
            <div className="flex flex-wrap items-start gap-x-8 gap-y-10">
              <PhoneTile label="Round countdown">
                <CountdownScreen />
              </PhoneTile>
              <PhoneTile label="Waiting for players">
                <WaitingScreen />
              </PhoneTile>
              <PhoneTile label="Answer reveal">
                <RevealScreen />
              </PhoneTile>
              <PhoneTile label="Round summary">
                <RoundSummaryScreen />
              </PhoneTile>
              <PhoneTile label="Odd One Out reveal">
                <OddOneOutRevealScreen />
              </PhoneTile>
              <PhoneTile label="Missing XI reveal">
                <MissingXIRevealScreen />
              </PhoneTile>
            </div>
          </Section>

          <Section
            id="results"
            index={5}
            title="Results"
            caption="The podium always shows the top three. Win and you get the trophy; finish lower and it says where you landed, with your row highlighted below the podium."
          >
            <div className="flex flex-wrap items-start gap-x-8 gap-y-10">
              <PhoneTile label="Winner (1st)">
                <ResultsScreen placement={1} />
              </PhoneTile>
              <PhoneTile label="Finished 7th">
                <ResultsScreen placement={7} yourPoints={940} />
              </PhoneTile>
            </div>
          </Section>

          <Section
            id="menu"
            index={6}
            title="Menu"
            caption="The menu tab and everywhere it leads: profile, stats, settings and about."
          >
            <div className="flex flex-wrap items-start gap-x-8 gap-y-10">
              <PhoneTile label="Menu">
                <MenuScreen />
              </PhoneTile>
              <PhoneTile label="Profile">
                <ProfileScreen />
              </PhoneTile>
              <PhoneTile label="Stats">
                <StatsScreen />
              </PhoneTile>
              <PhoneTile label="Settings">
                <SettingsScreen />
              </PhoneTile>
              <PhoneTile label="About">
                <AboutScreen />
              </PhoneTile>
            </div>
          </Section>

          <Section
            id="system"
            index={7}
            title="System states"
            caption="The moments things aren't perfect: empty room, errors, loading, reconnecting, and the leave-room sheet."
          >
            <div className="flex flex-wrap items-start gap-x-8 gap-y-10">
              <PhoneTile label="Empty lobby">
                <EmptyLobbyScreen />
              </PhoneTile>
              <PhoneTile label="Room not found">
                <RoomNotFoundScreen />
              </PhoneTile>
              <PhoneTile label="Room full">
                <RoomFullScreen />
              </PhoneTile>
              <PhoneTile label="Loading">
                <LoadingScreen />
              </PhoneTile>
              <PhoneTile label="Reconnecting">
                <ReconnectingScreen />
              </PhoneTile>
              <PhoneTile label="Leave room sheet">
                <LeaveRoomSheet />
              </PhoneTile>
            </div>
          </Section>

          {/* ========================= BUILDING BLOCKS ========================= */}
          <GroupHeading
            id="building-blocks"
            eyebrow="The kit"
            title="Building blocks"
            links={BLOCKS}
          />

          <Section
            id="nav-island"
            index={1}
            title="Nav island"
            caption="The app's bottom navigation as a floating pill. The active tab expands to show its label."
          >
            <div className="flex flex-wrap items-center gap-6">
              <Swatch label="Home active">
                <NavIsland active="home" />
              </Swatch>
              <Swatch label="Games active">
                <NavIsland active="games" />
              </Swatch>
              <Swatch label="Menu active">
                <NavIsland active="menu" />
              </Swatch>
            </div>
          </Section>

          <Section
            id="answers"
            index={2}
            title="Answer options"
            caption="One question, every state. 'Locked' is the purple you see before the answer is revealed."
          >
            <div className="max-w-sm">
              <p className="mb-4 text-base font-medium leading-snug">
                Which club did N&apos;Golo Kant&eacute; join in 2016?
              </p>
              <div className="flex flex-col gap-2">
                <AnswerOption label="Leicester City" state="wrong" />
                <AnswerOption label="Chelsea" state="correct" />
                <AnswerOption label="Arsenal" state="dimmed" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2">
                <p className="text-[11px] text-muted">Isolated states</p>
                <AnswerOption label="Default — not chosen" state="default" />
                <AnswerOption label="Locked in — awaiting reveal" state="locked" />
                <AnswerOption label="Correct answer" state="correct" />
                <AnswerOption label="Your wrong pick" state="wrong" />
                <AnswerOption label="Dimmed after reveal" state="dimmed" />
              </div>
            </div>
          </Section>

          <Section
            id="timers"
            index={3}
            title="Timers"
            caption="Linear bar and circular ring. Both step through the countdown scale as time runs out: dark green → light green → yellow → orange → red."
          >
            <div className="mb-8 flex items-center gap-2">
              {TIMER_STOPS.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span
                    className="h-8 w-10 rounded-md"
                    style={{ backgroundColor: s.c }}
                  />
                  <span className="text-[11px] text-muted">{s.label || " "}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-start gap-6">
              <Swatch label="Ring · 90%">
                <TimerRing progress={0.9} seconds={9} />
              </Swatch>
              <Swatch label="Ring · 50%">
                <TimerRing progress={0.5} seconds={5} />
              </Swatch>
              <Swatch label="Ring · 12%">
                <TimerRing progress={0.12} seconds={1} />
              </Swatch>
              <div className="flex min-w-[240px] flex-1 flex-col gap-4">
                <TimerBar progress={0.92} label="Loads of time" seconds="0:09" />
                <TimerBar progress={0.7} label="Time left" seconds="0:07" />
                <TimerBar progress={0.5} label="Time left" seconds="0:05" />
                <TimerBar progress={0.3} label="Getting tight" seconds="0:03" />
                <TimerBar progress={0.12} label="Hurry up!" seconds="0:01" />
              </div>
            </div>
          </Section>

          <Section
            id="feedback"
            index={4}
            title="Feedback toasts"
            caption="In-app toasts (not push notifications) that drop in from the top, under the dynamic island, and auto-dismiss — so they never cover the answers or timer."
          >
            <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
              <div className="flex flex-wrap gap-5">
                {[
                  { label: "Correct + speed bonus", node: <CorrectToast /> },
                  { label: "Too slow", node: <WrongToast /> },
                  { label: "Streak", node: <StreakChip /> },
                  { label: "Player joined", node: <PlayerJoinedToast /> },
                ].map((t) => (
                  <FloatingCardStatic key={t.label} label={t.label}>
                    {t.node}
                  </FloatingCardStatic>
                ))}
              </div>
              <PhoneTile label="In context — top-docked, stacked">
                <ToastDemoScreen />
              </PhoneTile>
            </div>
          </Section>

          <Section
            id="atoms"
            index={5}
            title="Atoms & badges"
            caption="Identity, scores, ranks and the small controls — toggles, copy-code, answered dots and loading skeletons."
          >
            <div className="flex flex-wrap items-start gap-8">
              <Swatch label="Avatars">
                <div className="flex items-center gap-3">
                  <Avatar initials="YO" tone="accent" host />
                  <Avatar initials="SA" tone="soft" />
                  <Avatar initials="PR" tone="surface" />
                </div>
              </Swatch>
              <Swatch label="Room code">
                <div className="flex items-center gap-3">
                  <RoomCodeChip code="ABCD" size="sm" />
                  <CopyCodeButton code="MIFL" />
                </div>
              </Swatch>
              <Swatch label="Score pills">
                <div className="flex items-center gap-2">
                  <ScorePill points={1840} />
                  <ScorePill points={250} />
                </div>
              </Swatch>
              <Swatch label="Rank badges">
                <div className="flex items-center gap-2">
                  <RankBadge place={1} />
                  <RankBadge place={2} />
                  <RankBadge place={3} />
                  <RankBadge place={7} />
                </div>
              </Swatch>
              <Swatch label="Toggles">
                <div className="flex items-center gap-3">
                  <Toggle on={true} />
                  <Toggle on={false} />
                </div>
              </Swatch>
              <Swatch label="Answered dots">
                <AnsweredDots total={4} answered={2} />
              </Swatch>
              <Swatch label="Skeletons" className="min-w-[160px]">
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Swatch>
            </div>
          </Section>

          <Section
            id="lobby"
            index={6}
            title="Room & lobby"
            caption="How a room looks for the host (copy code, kick, start) and for a guest (waiting for host)."
          >
            <div className="flex flex-wrap items-start gap-10">
              <PhoneTile label="Lobby · host">
                <LobbyScreen host />
              </PhoneTile>
              <PhoneTile label="Lobby · guest">
                <LobbyScreen />
              </PhoneTile>
              <div className="flex flex-col gap-4">
                <FloatingCardStatic label="Room-is-live card">
                  <div className="flex items-center gap-3">
                    <RoomCodeChip code="ABCD" size="sm" />
                    <div>
                      <p className="text-xs font-medium text-ink">Room is live</p>
                      <p className="text-[11px] text-muted">4 players joined</p>
                    </div>
                  </div>
                </FloatingCardStatic>
                <FloatingCardStatic label="Player joined">
                  <PlayerJoinedToast />
                </FloatingCardStatic>
              </div>
            </div>
          </Section>

          <Section
            id="leaderboard"
            index={7}
            title="Leaderboard"
            caption="How a leaderboard looks: medals for the top three, you highlighted, movement arrows."
          >
            <div className="flex flex-wrap items-start gap-10">
              <PhoneTile label="Leaderboard screen">
                <LeaderboardScreen />
              </PhoneTile>
              <FloatingCardStatic label="Mini leaderboard (hero)">
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
              </FloatingCardStatic>
            </div>
          </Section>

          <Section
            id="game-screens"
            index={8}
            title="Game screens"
            caption="The live play screen for each of the three games."
          >
            <div className="flex flex-wrap items-start gap-x-8 gap-y-10">
              <PhoneTile label="Football Quiz">
                <QuizScreen />
              </PhoneTile>
              <PhoneTile label="Odd One Out">
                <OddOneOutScreen />
              </PhoneTile>
              <PhoneTile label="Missing XI">
                <MissingXIScreen />
              </PhoneTile>
            </div>
          </Section>
        </div>
      </main>
    </>
  );
}
