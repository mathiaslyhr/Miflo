import Link from "next/link";
import { PRESS_BASE } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/links";

/*
 * The frosted pill, centred at the top of every page.
 *
 * It replaces the old full-width sticky header. That header was a solid bar the
 * width of the viewport, which worked when the page beneath it was a flat
 * colour — it can't work now, because the thing beneath it is a moving
 * gradient, and a solid bar would slice the top off it. A floating pill leaves
 * the background whole.
 *
 * The press feel comes from PRESS_BASE (components/ui/motion.ts), the same
 * CSS-only scale-down the rest of the site uses. There is deliberately no
 * Framer-based pressable here: PRESS_BASE already encodes the identical
 * spring, so using it keeps this a server component with no client JS.
 *
 * The pill is dark with white text because it sits over the dark end of the
 * gradient.
 *
 * On density: 55% was enough over the gradient alone, but the pill is fixed and
 * long pages scroll *under* it — at 55% the body text smeared through it as it
 * passed. 85% plus a heavier blur obscures whatever is behind while still
 * reading as frosted rather than solid.
 */

const ITEMS = [
  { label: "Privacy", href: "/privacy" },
  { label: "FAQ", href: "/faq" },
];

const item =
  `${PRESS_BASE} rounded-full px-3.5 py-1.5 tracking-tight ` +
  "text-white/65 hover:text-white";

export function SiteNav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center p-4 sm:p-5">
      <nav
        aria-label="Main"
        className={
          "pointer-events-auto flex items-center gap-0.5 rounded-full border " +
          "border-white/18 bg-neutral-950/85 p-1.5 text-[15px] font-medium " +
          "text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        }
      >
        <Link
          href="/"
          className={`${PRESS_BASE} rounded-full px-3.5 py-1.5 tracking-tight text-white`}
        >
          Miflo
        </Link>

        {ITEMS.map(({ label, href }) => (
          <Link key={href} href={href} className={item}>
            {label}
          </Link>
        ))}

        <a href={`mailto:${CONTACT_EMAIL}`} className={item}>
          Contact
        </a>
      </nav>
    </div>
  );
}
