// Outbound links + contact, in one place so they're easy to update at launch.

// TestFlight public beta link — paste it here once external testing is set up.
export const TESTFLIGHT_URL = "";
// App Store listing — paste it here once the app is live.
export const APP_STORE_URL = "";

// What the "Get the app" buttons point at: TestFlight while in beta, then the
// App Store. Empty until one exists (the button falls back to the feedback page).
export const DOWNLOAD_URL = TESTFLIGHT_URL || APP_STORE_URL;
export const HAS_DOWNLOAD = DOWNLOAD_URL !== "";

// Public contact for the privacy policy. Set up forwarding for this address (or
// change it) — the in-app/website feedback form is the main channel.
export const CONTACT_EMAIL = "hello@miflo.dk";

export const GAMES = [
  {
    name: "Tic Tac Toe",
    blurb:
      "Football trivia meets tic-tac-toe. Claim a square by naming a player who fits the row and the column — first to three in a row takes it.",
  },
  {
    name: "Tenball",
    blurb:
      "One football prompt, ten right answers. Race your mates to name the top ten before the clock runs out.",
  },
  {
    name: "Heatmap",
    blurb:
      "Build heat across the grid square by square and claim more of the board than everyone else.",
  },
] as const;
