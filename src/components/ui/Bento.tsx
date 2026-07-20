import Link from "next/link";
import type { ReactNode } from "react";
import { PRESS_BASE } from "./motion";

/*
 * A bento grid: a 6-column grid whose children claim different spans, so the
 * layout has a focal point instead of reading as an undifferentiated wall of
 * equal cards. Size carries meaning here — the tile that gets four columns is
 * the one we want read first.
 *
 * A BentoItem *is* a card (solid surface, lighter rim), so don't put a `Card`
 * inside one. Use `Raised` from Card.tsx for anything nested.
 *
 * Tailwind can't see class names built by interpolation (`col-span-${n}`), so
 * the spans are looked up from complete, statically-written strings.
 */

const COL: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-6",
};

const COL_SM: Record<number, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  6: "sm:col-span-6",
};

const ROW: Record<number, string> = {
  1: "row-span-1",
  2: "sm:row-span-2",
};

export function Bento({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-6 ${className}`}>
      {children}
    </div>
  );
}

export function BentoItem({
  children,
  /** Columns on mobile (of 2). */
  col = 2,
  /** Columns from `sm` up (of 6). */
  colSm = 2,
  /** Rows from `sm` up. */
  rowSm = 1,
  href,
  className = "",
}: {
  children: ReactNode;
  col?: 1 | 2;
  colSm?: 1 | 2 | 3 | 4 | 6;
  rowSm?: 1 | 2;
  href?: string;
  className?: string;
}) {
  const span = `${COL[col]} ${COL_SM[colSm]} ${ROW[rowSm]}`;
  const surface =
    "flex flex-col rounded-2xl border border-rim bg-surface p-5 overflow-hidden";

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const cls = `${span} ${surface} ${PRESS_BASE} hover:border-rim-2 hover:bg-surface-2 ${className}`;
    return isInternal ? (
      <Link href={href} className={cls}>
        {children}
      </Link>
    ) : (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return <div className={`${span} ${surface} ${className}`}>{children}</div>;
}
