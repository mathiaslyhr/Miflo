/**
 * Mock data for the showcase screens, centralised so the same players/scores are
 * reused consistently and are easy to expand. Presentational only — none of this
 * is real game data.
 */

export const LOBBY_PLAYERS = [
  { name: "You", initials: "YO", host: true },
  { name: "Sam", initials: "SA", host: false },
  { name: "Priya", initials: "PR", host: false },
  { name: "Jess", initials: "JL", host: false },
];

export const LEADERBOARD = [
  { place: 1, name: "You", points: 1840, you: true, move: "up" },
  { place: 2, name: "Sam", points: 1610, you: false, move: "down" },
  { place: 3, name: "Priya", points: 1455, you: false, move: "up" },
  { place: 4, name: "Jess", points: 1180, you: false, move: "same" },
  { place: 5, name: "Tom", points: 940, you: false, move: "down" },
];

export const PODIUM = [
  { place: 2, name: "Sam", points: 1610, h: "h-16", initials: "SA" },
  { place: 1, name: "You", points: 1840, h: "h-24", initials: "YO" },
  { place: 3, name: "Priya", points: 1455, h: "h-12", initials: "PR" },
];

export const ROUND_STANDINGS = [
  { place: 1, name: "You", points: 1840, gained: 250, move: "up", you: true },
  { place: 2, name: "Sam", points: 1610, gained: 180, move: "down", you: false },
  { place: 3, name: "Priya", points: 1455, gained: 0, move: "same", you: false },
];

/** Odd One Out — the live question round. */
export const ODD_PLAYERS = [
  { name: "Messi", meta: "Argentina", odd: false },
  { name: "Ronaldo", meta: "Portugal", odd: false },
  { name: "Kanté", meta: "France", odd: true },
  { name: "Neymar", meta: "Brazil", odd: false },
];

/** Odd One Out — the reveal round. */
export const ODD_REVEAL = [
  { name: "Messi", meta: "Ballon d'Or", odd: false },
  { name: "Ronaldo", meta: "Ballon d'Or", odd: false },
  { name: "Kanté", meta: "Never won", odd: true },
  { name: "Neymar", meta: "Ballon d'Or", odd: false },
];

export const MENU_ROWS = ["Profile", "Stats", "Settings", "About"];

export const PROFILE_STATS = [
  { k: "Games", v: "142" },
  { k: "Wins", v: "38" },
  { k: "Streak", v: "9" },
];

export const STATS_CARDS = [
  { k: "Games played", v: "142" },
  { k: "Wins", v: "38" },
  { k: "Win rate", v: "27%" },
  { k: "Best streak", v: "9" },
];

export const PER_GAME_ACCURACY = [
  { name: "Football Quiz", v: "62%" },
  { name: "Odd One Out", v: "48%" },
  { name: "Missing XI", v: "41%" },
];
