"use client";

import { usePathname } from "next/navigation";
import { PageMesh } from "@/components/glass";
import { SiteFooter } from "./SiteFooter";

/**
 * Wraps every page. A single `PageMesh` sits behind *both* the content and the
 * footer, so the page-spanning rainbow flows unbroken through the (transparent)
 * footer — no seam, on every route. Each route gets its own blob pattern via a
 * pathname seed; the homepage keeps its bespoke pattern (no seed).
 *
 * Paint order: an `absolute` element paints above static in-flow siblings, so
 * the content wrapper and the footer are `relative` to sit on top of the mesh.
 */
export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="relative flex flex-1 flex-col">
      <PageMesh seed={pathname === "/" ? undefined : pathname} />
      <div className="relative flex flex-1 flex-col">{children}</div>
      <div className="relative">
        <SiteFooter />
      </div>
    </div>
  );
}
