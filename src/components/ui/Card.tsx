import Link from "next/link";
import type { ReactNode } from "react";
import { PRESS_BASE } from "./motion";

/*
 * The card system, ported from the app's elevation rules.
 *
 * A card is a solid step up from the page (`bg-surface` on `bg-bg`) with a rim
 * one step lighter again (`border-rim`). That rim is the whole trick: on dark,
 * a shadow reads as a smudge, whereas a lighter edge reads as "this catches
 * the light, so it's closer". Cards therefore carry **no shadow at all** —
 * shadow is reserved for chrome that genuinely floats over content
 * (the hero's FloatingCard, sheets, toasts).
 *
 * Don't nest these. A card inside a card puts `bg-surface` on `bg-surface`,
 * which is a skipped rung: the inner one has no way to read as raised. Use
 * `Raised` (surface-2) for the inner tier instead.
 */

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Turns the card into a link, with hover + press feedback. */
  href?: string;
  /** Renders as <li> for use inside a <ul>/<ol>. */
  as?: "div" | "li" | "article";
};

const BASE = "rounded-2xl border border-rim bg-surface p-5";

/** Interactive cards brighten one rung on hover — the same "closer = lighter"
 *  logic, used as feedback rather than as hierarchy. */
const INTERACTIVE = `${PRESS_BASE} block hover:border-rim-2 hover:bg-surface-2`;

export function Card({ children, className = "", href, as = "div" }: CardProps) {
  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const cls = `${BASE} ${INTERACTIVE} ${className}`;
    const inner = isInternal ? (
      <Link href={href} className={cls}>
        {children}
      </Link>
    ) : (
      <a href={href} className={cls}>
        {children}
      </a>
    );
    return as === "li" ? <li className="contents">{inner}</li> : inner;
  }

  const Tag = as;
  return <Tag className={`${BASE} ${className}`}>{children}</Tag>;
}

/**
 * The next rung up, for content nested inside a card: chips, form fields,
 * stat rows, mini-visuals. Rim goes to `rim-2` to stay lighter than its ground.
 */
export function Raised({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-rim-2 bg-surface-2 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card title with optional subtitle and a trailing round icon badge — the
 * badge is what stops a grid of cards reading as an undifferentiated wall.
 */
export function CardHeader({
  title,
  subtitle,
  badge,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <h3 className="text-base font-medium tracking-tight text-ink">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-sm leading-relaxed text-muted">{subtitle}</p>
        ) : null}
      </div>
      {badge ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rim-2 bg-surface-2 text-accent-ink">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

/** Full-bleed hairline between card sections. Assumes the card's `p-5`. */
export function CardDivider({ className = "" }: { className?: string }) {
  return <hr className={`-mx-5 my-4 h-px border-0 bg-divider ${className}`} />;
}

/** Icon + label on the left, value on the right. */
export function CardRow({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: ReactNode;
  value?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      {icon ? (
        <span className="shrink-0 text-faint" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="text-sm text-muted">{label}</span>
      {value ? (
        <span className="ml-auto text-sm font-medium tabular-nums text-ink">
          {value}
        </span>
      ) : null}
    </div>
  );
}
