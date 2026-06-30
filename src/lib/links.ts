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
    name: "Football Quiz",
    blurb:
      "Rapid-fire trivia across leagues and eras. Answer fast for the speed bonus, fall behind and you'll feel it.",
  },
  {
    name: "Odd One Out",
    blurb:
      "Four players, one breaks the pattern. Spot the impostor before your mates do.",
  },
  {
    name: "Missing XI",
    blurb:
      "An iconic line-up with one name blanked out. Type the missing player from memory.",
  },
] as const;
