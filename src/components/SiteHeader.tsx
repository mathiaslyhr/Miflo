import Link from "next/link";
import { DownloadButton } from "./DownloadButton";

const NAV = [
  { label: "Games", href: "/#games" },
  { label: "Guide", href: "/guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Feedback", href: "/feedback" },
];

/**
 * Sticky header. Solid rather than frosted: the dark palette expresses
 * elevation as brightness, and a blurred translucent bar would let whatever
 * scrolled beneath it change the header's apparent height in the stack. A flat
 * page-coloured bar with a divider underneath keeps it pinned to the bottom of
 * the ladder, where chrome belongs.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-bg">
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link
          href="/"
          className="justify-self-start text-xl font-medium tracking-tight text-ink"
        >
          Miflo
        </Link>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <DownloadButton className="!px-4 !py-2 text-sm" />
        </div>
      </div>
    </header>
  );
}
