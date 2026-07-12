// Outbound links + contact, in one place so they're easy to update at launch.

// TestFlight public beta link — paste it here once external testing is set up.
export const TESTFLIGHT_URL: string = "";
// App Store listing (id-based link; resolves once the app is approved).
export const APP_STORE_URL: string = "https://apps.apple.com/app/id6786893093";

// What the "Get the app" buttons point at: TestFlight while in beta, then the
// App Store. Empty until one exists (the button falls back to the feedback page).
export const DOWNLOAD_URL = TESTFLIGHT_URL || APP_STORE_URL;
export const HAS_DOWNLOAD = DOWNLOAD_URL !== "";

// Public contact for the privacy policy. Set up forwarding for this address (or
// change it) — the in-app/website feedback form is the main channel.
export const CONTACT_EMAIL = "hello@miflo.dk";

// Names + blurbs mirror the app's live games catalog (MifloApp `gamesCatalog.ts`
// / i18n `games.*`). Only the eight games that actually ship are listed. `type`
// splits the daily solo puzzles from the play-together games; `players` is the
// audience chip the app shows. Order matches the app's hub.
export type GameType = "daily" | "together";

export const GAMES = [
  {
    name: "Scout",
    type: "daily",
    players: "Solo",
    blurb:
      "Guess the daily footballer in ten tries. Every guess lights up green, yellow or grey. A new player drops each day, the same for everyone.",
  },
  {
    name: "Top Bins",
    type: "daily",
    players: "Solo",
    blurb:
      "One football prompt, ten right answers. Race to name the whole top ten before you run out of misses.",
  },
  {
    name: "Journeyman",
    type: "daily",
    players: "Solo",
    blurb:
      "One career path, club by club. Name the player early for more points, and every wrong guess unlocks another hint.",
  },
  {
    name: "Team Sheet",
    type: "daily",
    players: "Solo",
    blurb:
      "A famous lineup with the names missing. Fill in the whole starting eleven from memory.",
  },
  {
    name: "Hattrick",
    type: "together",
    players: "1v1",
    blurb:
      "Football trivia meets three in a row. Claim a square by naming a player who fits both the row and the column, and line up three to win.",
  },
  {
    name: "Offside",
    type: "together",
    players: "2+",
    blurb:
      "Four footballers, three share a hidden link and one doesn't. Spot the odd one out before anyone else.",
  },
  {
    name: "Cult Hero",
    type: "together",
    players: "2+",
    blurb:
      "Everyone's thinking of the same easy answer. The most obscure right answer wins the round.",
  },
  {
    name: "Red Card",
    type: "together",
    players: "3+",
    blurb:
      "One of you is faking it. Everyone else knows the footballer. Ask questions, then vote on who to send off.",
  },
] as const satisfies readonly {
  name: string;
  type: GameType;
  players: string;
  blurb: string;
}[];
