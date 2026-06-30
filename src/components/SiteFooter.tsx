import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/links";

export function SiteFooter() {
  return (
    <footer className="border-t border-divider">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-medium tracking-tight">Miflo</p>
          <p className="mt-1 text-sm text-muted">
            Football games to play with your mates.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
          <Link href="/feedback" className="transition-colors hover:text-ink">
            Feedback
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-ink">
            Privacy
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-ink"
          >
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 pb-8 text-xs text-muted/70">
        © {new Date().getFullYear()} Miflo
      </div>
    </footer>
  );
}
