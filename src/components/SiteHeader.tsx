import Link from "next/link";
import { BetaBanner } from "./BetaBanner";
import { DownloadButton } from "./DownloadButton";

const NAV = [
  { label: "Games", href: "/#games" },
  { label: "Guide", href: "/guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Feedback", href: "/feedback" },
];

export function SiteHeader() {
  return (
    <>
      <BetaBanner />
      <header className="sticky top-0 z-40 bg-white/45 backdrop-blur-lg shadow-[0_1px_0_0_rgba(255,255,255,0.55),0_12px_30px_-24px_rgba(20,15,50,0.30)]">
        <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
          {/* logo */}
          <Link
            href="/"
            className="text-xl font-medium tracking-tight text-[#0d0d16]"
          >
            Miflo
          </Link>

          {/* centered nav */}
          <nav className="hidden items-center justify-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#0d0d16]/55 transition-colors hover:text-[#0d0d16]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <DownloadButton className="!px-4 !py-2 text-sm" />
            <Link
              href="/#games"
              className="hidden rounded-full border border-[#0d0d16]/20 bg-white/40 px-4 py-2 text-sm font-medium text-[#0d0d16] backdrop-blur-md transition-transform duration-200 ease-[cubic-bezier(0.34,1.25,0.64,1)] hover:scale-[1.03] active:scale-[0.96] sm:inline-flex"
            >
              See the games
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
