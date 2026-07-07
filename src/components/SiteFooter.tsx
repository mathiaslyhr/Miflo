import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/links";

/**
 * Always transparent: the global PageMesh (in RootShell) flows behind the footer
 * on every route, so the rainbow ends here seamlessly — no separate background.
 */
export function SiteFooter() {
  return (
    <footer className="text-[#0d0d16]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-medium tracking-tight text-[#0d0d16]">
            Miflo
          </p>
          <p className="mt-1 text-sm text-[#0d0d16]/55">
            The football game for your group chat.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#0d0d16]/55">
          <Link
            href="/faq"
            className="transition-colors hover:text-[#0d0d16]"
          >
            FAQ
          </Link>
          <Link
            href="/feedback"
            className="transition-colors hover:text-[#0d0d16]"
          >
            Feedback
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-[#0d0d16]"
          >
            Privacy
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-[#0d0d16]"
          >
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 pb-8 text-xs text-[#0d0d16]/45">
        © {new Date().getFullYear()} Miflo
      </div>
    </footer>
  );
}
