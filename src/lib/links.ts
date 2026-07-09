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

// Names + blurbs mirror the app's games catalog (MifloApp i18n `games.*`).
export const GAMES = [
  {
    name: "Hattrick",
    blurb:
      "Football trivia meets tic-tac-toe. Claim a square by naming a player who fits the row and the column — first to three in a row takes it.",
  },
  {
    name: "Red Card",
    blurb:
      "One of you is faking it. Everyone else knows the footballer — question each other, vote on who to send off.",
  },
  {
    name: "Scout",
    blurb:
      "Guess the daily footballer in six tries. Every guess lights up green, yellow or grey — a new player drops each day, the same for everyone.",
  },
  {
    name: "Top Bins",
    blurb:
      "One football prompt, ten right answers. Race your mates to name the top ten before the clock runs out.",
  },
  {
    name: "Possession",
    blurb:
      "Claim the pitch square by square and hold more of the board than everyone else when the whistle goes.",
  },
  {
    name: "Matchday",
    blurb:
      "Everyone gets a card of football facts. Tick them off as the answers land — first full row wins.",
  },
  {
    name: "Journeyman",
    blurb:
      "One career path, club by club. The earlier you name the player, the more it's worth.",
  },
  {
    name: "Teamsheet",
    blurb:
      "A famous lineup with names missing. Fill in the teamsheet before your mates do.",
  },
  {
    name: "Offside",
    blurb:
      "Four players, one doesn't belong. Spot who's offside and say why.",
  },
  {
    name: "Cult Hero",
    blurb:
      "Everyone's thinking of the same easy answer — the most obscure right answer wins the round.",
  },
] as const;
