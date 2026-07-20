import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/links";

const LINKS = [
  { href: "/guide", label: "Guide" },
  { href: "/faq", label: "FAQ" },
  { href: "/feedback", label: "Feedback" },
  { href: "/privacy", label: "Privacy" },
];

/**
 * The footer used to be transparent so the page-spanning rainbow could flow
 * through it. That mesh is gone, so it needs its own top divider to separate
 * from the last section.
 */
export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-divider">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-medium tracking-tight text-ink">Miflo</p>
          <p className="mt-1 text-sm text-muted">
            The football game for your group chat.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-ink"
          >
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 pb-8 text-xs text-faint">
        © {new Date().getFullYear()} Miflo
      </div>
    </footer>
  );
}
