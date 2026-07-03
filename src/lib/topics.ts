/**
 * Quiz setup data shared by the interactive `QuizConfig` and the static
 * per-game setup screens. Question counts are how many questions a round asks;
 * topic `count`s are how many questions exist for that topic (used for the live
 * "N questions match" line). `All` is derived (sum of every topic), not a row.
 */

export const QUESTION_COUNTS = [5, 10, 15, 20, 25] as const;

export type Topic = { id: string; label: string; count: number };

export const TOPICS: Topic[] = [
  { id: "premier-league", label: "Premier League", count: 480 },
  { id: "la-liga", label: "La Liga", count: 360 },
  { id: "serie-a", label: "Serie A", count: 300 },
  { id: "bundesliga", label: "Bundesliga", count: 240 },
  { id: "ligue-1", label: "Ligue 1", count: 180 },
  { id: "champions-league", label: "Champions League", count: 320 },
  { id: "world-cup", label: "World Cup", count: 260 },
  { id: "ballon-dor", label: "Ballon d'Or", count: 90 },
  { id: "current-stars", label: "Current Stars", count: 210 },
  { id: "legends", label: "Legends", count: 160 },
];

/** Total questions across every topic — the "All" count. */
export const ALL_COUNT = TOPICS.reduce((sum, t) => sum + t.count, 0);

/**
 * Deterministic thousands separator. Used instead of `Number.toLocaleString()`,
 * which is locale-dependent and mismatches between the Node server and the
 * browser (causes React hydration errors in client components).
 */
export function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
