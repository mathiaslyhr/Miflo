import { CirclesHero } from "./CirclesHero";
import { SiteNav } from "./SiteNav";

/**
 * Wraps every page.
 *
 * The gradient lives here rather than in each page so it is mounted once for
 * the whole app — navigating between the homepage and privacy keeps the same
 * background instance alive, so the circles don't snap back to centre and
 * re-settle on every route change.
 *
 * On z-index: CirclesHero is `fixed z-0` and this content wrapper is
 * `relative z-10` to sit above it. The background deliberately does *not* use a
 * negative z-index — globals.css paints a background colour on <body>, and a
 * negative layer would render behind that and never be seen.
 *
 * The footer is gone. Its links and copyright are now the nav pill and a single
 * line in the corner of the homepage; a full footer bar on a site with three
 * destinations was more chrome than content.
 */
export function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CirclesHero />
      <SiteNav />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </>
  );
}
