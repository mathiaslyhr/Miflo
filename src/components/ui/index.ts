/*
 * Note on what's missing: there is no `Eyebrow` export any more.
 *
 * The light site put a small uppercase tracked kicker above every section
 * ("THE GAMES", "HOW IT WORKS", "MADE FOR THE MOMENT", "FAQ", "GUIDE"). One
 * named kicker used deliberately is a brand system; one above every heading is
 * scaffolding that adds a line of shouting and no information. Headings carry
 * their own sections now. Reach for a `Chip` if a section genuinely needs a
 * label, not a decorative all-caps line.
 */

export { HeroGlow } from "./HeroGlow";
export { PRESS_BASE, CTRL } from "./motion";
export {
  SolidButton,
  OutlineButton,
  GhostButton,
  Chip,
  Avatar,
  AvatarStack,
  Toggle,
} from "./controls";
export { Card, Raised, CardHeader, CardDivider, CardRow } from "./Card";
export { Meter, AnimatedMeter, SegmentMeter, type MeterTone } from "./Meter";
export { Bento, BentoItem } from "./Bento";
