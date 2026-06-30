import Link from "next/link";
import { BetaBanner } from "./BetaBanner";
import { DownloadButton } from "./DownloadButton";

const NAV = [
  { label: "Games", href: "/#games" },
  { label: "How it works", href: "/#how" },
  { label: "Feedback", href: "/feedback" },
];

export function SiteHeader() {
  return (
    <>
      <BetaBanner />
      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
          {/* logo */}
          <Link href="/" className="text-xl font-medium tracking-tight">
            Miflo
          </Link>

          {/* centered nav */}
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

          {/* CTAs */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/#games"
              className="hidden rounded-button border border-accent/60 px-4 py-2 text-sm font-medium text-accent-ink transition-colors hover:border-accent hover:text-ink sm:inline-flex"
            >
              See the games
            </Link>
            <DownloadButton className="!px-4 !py-2 text-sm" />
          </div>
        </div>
      </header>
    </>
  );
}
