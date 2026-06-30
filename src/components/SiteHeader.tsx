import Link from "next/link";
import { DownloadButton } from "./DownloadButton";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-divider/60 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-medium tracking-tight">
          Miflo
        </Link>
        <nav className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/feedback"
            className="hidden px-2 text-sm text-muted transition-colors hover:text-ink sm:block"
          >
            Feedback
          </Link>
          <DownloadButton className="!px-4 !py-2 text-sm" />
        </nav>
      </div>
    </header>
  );
}
