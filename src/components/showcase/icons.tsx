/**
 * Inline SVG icons for the showcase. One component per icon, `currentColor` +
 * `aria-hidden`, sized by a `size` prop. No emojis anywhere in the app — add new
 * glyphs here and register them in ICON_REGISTRY so they appear in the
 * Foundations icon grid automatically.
 */

type IconProps = { size?: number };

export function CheckIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrossIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small solid triangle for leaderboard movement (up/down). */
export function TriangleIcon({
  size = 9,
  down = false,
}: {
  size?: number;
  down?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="currentColor"
      aria-hidden
      className={down ? "rotate-180" : ""}
    >
      <path d="M5 1l4 7H1z" />
    </svg>
  );
}

export function FlameIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.4 1.6c.3 2.6-1 4.2-2.4 5.7-1.4 1.6-2.9 3.1-2.9 5.6a5 5 0 0 0 .8 2.7 3 3 0 0 1-.5-1.7c0-1.4.9-2.4 1.8-3.3.2 2 1.3 2.9 2.2 3.8.9.9 1.6 1.9 1.6 3.4a3.4 3.4 0 0 1-.7 2.1 5.5 5.5 0 0 0 4-5.3c0-4.6-3.9-6.4-4.6-11.4-.2-1.4-1.2-2.4-2.4-2.4.9.9 1.3 2 1.2 3.1a3 3 0 0 1-.6 1.6c.6-1.6.9-3.6-.1-5.4z" />
    </svg>
  );
}

export function TrophyIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4h10v4a5 5 0 0 1-10 0V4zM7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3M9 15h6M12 13v2M8.5 20h7M10 18h4v2h-4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GamesIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 8h10a4 4 0 0 1 4 4v.5a3.5 3.5 0 0 1-6.3 2.1L14 14h-4l-.7.6A3.5 3.5 0 0 1 3 12.5V12a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M7 11v2M6 12h2M15.5 11.5h.01M17.5 13.5h.01"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Back chevron (points left) — thin, per the app header convention. */
export function BackIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CopyIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 15V6.5A1.5 1.5 0 0 1 6.5 5H15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShareIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v12M12 3 8 7M12 3l4 4M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GearIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BellIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6ZM10 19a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SoundIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9v6h3l5 4V5L7 9H4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M16 9.5a3.5 3.5 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function PencilIcon({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20h4L19 9l-4-4L4 16v4ZM13.5 6.5l4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AlertIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5v5.5M12 16.3v.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function WifiOffIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 8a15 15 0 0 1 6-3.4M15 4.6A15 15 0 0 1 21 8M6.5 11.5A10 10 0 0 1 9.5 9.7M14.5 9.7a10 10 0 0 1 3 1.8M9.5 15a5 5 0 0 1 5 0M12 19h.01M4 4l16 16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Every icon, for the Foundations grid. Add new icons here too. */
export const ICON_REGISTRY: { name: string; Icon: (p: IconProps) => React.JSX.Element }[] = [
  { name: "Check", Icon: CheckIcon },
  { name: "Cross", Icon: CrossIcon },
  { name: "Chevron", Icon: ChevronIcon },
  { name: "Back", Icon: BackIcon },
  { name: "Home", Icon: HomeIcon },
  { name: "Games", Icon: GamesIcon },
  { name: "Menu", Icon: MenuIcon },
  { name: "Trophy", Icon: TrophyIcon },
  { name: "Flame", Icon: FlameIcon },
  { name: "Copy", Icon: CopyIcon },
  { name: "Share", Icon: ShareIcon },
  { name: "Gear", Icon: GearIcon },
  { name: "Bell", Icon: BellIcon },
  { name: "Sound", Icon: SoundIcon },
  { name: "Pencil", Icon: PencilIcon },
  { name: "Alert", Icon: AlertIcon },
  { name: "WifiOff", Icon: WifiOffIcon },
];
