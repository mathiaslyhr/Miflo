import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { GLASS_PILL, PRESS_BASE } from "@/components/ui";

/*
 * Two pieces pinned to the top: the mark in the left corner, and a floating
 * pill of links centred above it.
 *
 * They're separate on purpose. The brand used to be the first item inside the
 * pill, which made it read as another menu entry — one of four things you could
 * click, rather than the thing that owns the page. Out in the corner it's
 * identity; in the middle is navigation.
 *
 * The mark keeps a real hit area and an accessible name even though the glyph
 * itself is decorative: BrandMark is aria-hidden, so the link carries the label.
 *
 * There's deliberately no full-width bar. A solid header would slice the top off
 * the gradient; a floating pill leaves it whole.
 */

const ITEMS = [
  { label: "Privacy", href: "/privacy" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center p-4 sm:p-5">
      <Link
        href="/"
        aria-label="Miflo home"
        className={`${PRESS_BASE} pointer-events-auto rounded-xl p-1`}
      >
        <BrandMark size={30} />
      </Link>

      {/* Centred independently of the mark, so the pill stays optically in the
          middle of the viewport rather than in the middle of the leftover space. */}
      <nav
        aria-label="Main"
        className={`pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 rounded-full p-1.5 text-[15px] font-medium text-white ${GLASS_PILL}`}
      >
        {ITEMS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`${PRESS_BASE} rounded-full px-3.5 py-1.5 tracking-tight text-white/70 hover:text-white`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
