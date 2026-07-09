import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Component candidates — Miflo",
  robots: { index: false, follow: false },
};

/**
 * Temporary gallery of candidate floating components for the hero showcase.
 * Not linked from anywhere and not in the sitemap — visit /test directly.
 * Every piece mirrors a real component in the app (MifloApp src/core/ui and
 * the game screens); delete this page once the picks land in the hero.
 */

/** The FloatingCard glass recipe, minus positioning/animation. */
function Glass({
  children,
  pill = false,
  className = "",
}: {
  children: React.ReactNode;
  pill?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`border border-white/65 bg-white/55 px-3.5 py-3 shadow-[0_20px_40px_-16px_rgba(20,15,50,0.28)] backdrop-blur-xl ${
        pill ? "rounded-full" : "rounded-card"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Scout's Wordle-style guess tiles: green hit / yellow close / grey miss. */
function ScoutGuessRow() {
  const cols = [
    { k: "N", tone: "#4fb477" },
    { k: "L", tone: "#4fb477" },
    { k: "C", tone: "#e0a94a" },
    { k: "P", tone: "#9aa0a8" },
    { k: "A", tone: "#e0a94a" },
  ];
  return (
    <Glass>
      <p className="text-[11px] font-medium text-ink/55">Scout · guess 3 of 6</p>
      <div className="mt-2 flex gap-1.5">
        {cols.map((c, i) => (
          <span
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-white"
            style={{ backgroundColor: c.tone }}
          >
            {c.k}
          </span>
        ))}
      </div>
    </Glass>
  );
}

/** Lobby player tag with the HOST chip straddling the top rim. */
function HostTag() {
  return (
    <div className="relative">
      <Glass pill className="!px-5 !py-2.5">
        <p className="text-sm font-medium text-ink">Sebastian</p>
      </Glass>
      <span className="absolute -top-2 left-4 rounded-full border border-white/65 bg-surface-2 px-2 py-px text-[10px] font-medium tracking-[0.08em] text-accent shadow-[0_3px_6px_rgba(20,15,50,0.1)]">
        HOST
      </span>
    </div>
  );
}

/** The gameplay countdown ring — 5-stop color, snapshotted mid-yellow. */
function CountdownRing() {
  const r = 18;
  const c = 2 * Math.PI * r;
  return (
    <Glass pill className="!p-2.5">
      <div className="relative h-11 w-11">
        <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
          <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(13,13,22,0.1)" strokeWidth="4" />
          <circle
            cx="22"
            cy="22"
            r={r}
            fill="none"
            stroke="#f5c451"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${c * 0.4} ${c}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium text-ink">
          0:12
        </span>
      </div>
    </Glass>
  );
}

/** The app's solid ink pill button (the host's start action in the lobby). */
function StartButton() {
  return (
    <span className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-[0_20px_40px_-16px_rgba(20,15,50,0.4)] ring-1 ring-inset ring-white/25">
      Start Hattrick
    </span>
  );
}

/** Red Card voting: glass name tags, the suspect ringed in error red. */
function RedCardVote() {
  return (
    <Glass>
      <p className="text-[11px] font-medium text-ink/55">
        Red Card · who&apos;s faking it?
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
        <span className="rounded-full border border-white/65 bg-white/55 px-2.5 py-1 text-ink/55">
          Sebastian
        </span>
        <span className="rounded-full border border-[#f0544a] bg-white/55 px-2.5 py-1 font-medium text-ink">
          Oscar
        </span>
        <span className="rounded-full border border-white/65 bg-white/55 px-2.5 py-1 text-ink/55">
          Max
        </span>
      </div>
      <p className="mt-2 text-[11px] text-ink/50">Vote to send off</p>
    </Glass>
  );
}

/** Share card: the lobby QrCard — a mini code + "Share party code". */
function QrShareCard() {
  // A stylised (fake) QR: three finder squares + a deterministic module scatter.
  const modules = [
    [4, 0], [5, 0], [4, 1], [6, 2], [4, 3], [5, 3], [0, 4], [2, 4], [4, 4],
    [6, 4], [8, 4], [1, 5], [3, 5], [5, 5], [8, 5], [0, 6], [4, 6], [7, 6],
    [4, 7], [6, 7], [8, 7], [5, 8], [7, 8],
  ];
  return (
    <Glass>
      <div className="flex items-center gap-3">
        <svg width="56" height="56" viewBox="0 0 9 9" className="rounded-md bg-white p-[3px]" aria-hidden>
          {[[0, 0], [6, 0], [0, 6]].map(([x, y]) => (
            <g key={`${x}${y}`} fill="#0d0d16">
              <path d={`M${x} ${y}h3v3h-${3}z`} />
              <rect x={x + 1} y={y + 1} width="1" height="1" fill="#fff" stroke="#fff" strokeWidth="0.3" />
            </g>
          ))}
          {modules.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#0d0d16" />
          ))}
        </svg>
        <div>
          <p className="text-xs font-medium text-ink">Share party code</p>
          <p className="mt-1 font-mono text-sm tracking-widest text-ink/70">ABCD</p>
        </div>
      </div>
    </Glass>
  );
}

/** Results podium — 2 · 1 · 3 with the winner in accent. */
function Podium() {
  const places = [
    { name: "SE", h: "h-12", label: "2", accent: false },
    { name: "YO", h: "h-16", label: "1", accent: true },
    { name: "OS", h: "h-9", label: "3", accent: false },
  ];
  return (
    <Glass>
      <p className="text-[11px] font-medium text-ink/55">Final standings</p>
      <div className="mt-2 flex items-end gap-1.5">
        {places.map((p) => (
          <div key={p.name} className="flex w-12 flex-col items-center gap-1.5">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ${
                p.accent ? "bg-accent text-white" : "bg-surface-2 text-ink"
              }`}
            >
              {p.name}
            </span>
            <div
              className={`flex w-full items-start justify-center rounded-t-lg pt-1 text-[11px] font-medium ${
                p.accent
                  ? "bg-accent/80 text-white"
                  : "border border-b-0 border-white/65 bg-white/45 text-ink/55"
              } ${p.h}`}
            >
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </Glass>
  );
}

const CANDIDATES = [
  {
    n: 1,
    name: "Scout guess row",
    note: "The daily game's Wordle tiles — shows a second game at a glance.",
    demo: <ScoutGuessRow />,
  },
  {
    n: 2,
    name: "Host player tag",
    note: "Lobby name pill with the HOST chip on the rim.",
    demo: <HostTag />,
  },
  {
    n: 3,
    name: "Countdown ring",
    note: "The gameplay timer, snapshotted mid-yellow.",
    demo: <CountdownRing />,
  },
  {
    n: 4,
    name: "Start button",
    note: "The host's solid “Start Hattrick” action from the lobby.",
    demo: <StartButton />,
  },
  {
    n: 5,
    name: "Red Card vote",
    note: "Vote tags with the suspect ringed in red.",
    demo: <RedCardVote />,
  },
  {
    n: 6,
    name: "QR share card",
    note: "The lobby share card — pairs with the ABCD code card.",
    demo: <QrShareCard />,
  },
  {
    n: 7,
    name: "Results podium",
    note: "Final standings — could replace or join the leaderboard.",
    demo: <Podium />,
  },
];

export default function TestPage() {
  return (
    <main className="relative flex-1">
      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <Link href="/" className="text-sm text-ink/55 hover:text-ink">
          &larr; Home
        </Link>
        <h1 className="mt-4 font-medium leading-[1.05] tracking-tight text-ink" style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}>
          Hero component candidates.
        </h1>
        <p className="mt-3 max-w-md text-ink/55">
          Seven floating-card candidates, each mirroring a real component in
          the app. Pick by number.
        </p>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {CANDIDATES.map((c) => (
            <section key={c.n}>
              <h2 className="text-sm font-medium text-ink">
                <span className="mr-2 font-mono text-ink/45">
                  {String(c.n).padStart(2, "0")}
                </span>
                {c.name}
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/55">{c.note}</p>
              <div className="mt-4 flex min-h-28 items-center">
                <div>{c.demo}</div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
