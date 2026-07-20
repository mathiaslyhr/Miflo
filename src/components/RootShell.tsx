import { SiteFooter } from "./SiteFooter";

/**
 * Wraps every page.
 *
 * This used to render a page-spanning gradient behind both content and footer,
 * which is why it was a client component (it seeded the blob pattern from the
 * pathname). The dark palette drops that wash — the page is a flat, solid
 * `bg-bg` and only the hero carries a glow, rendered by the page itself. So
 * this is now a plain server component with no pathname dependency.
 */
export function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  );
}
