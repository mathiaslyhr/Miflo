"use client";

import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "./SiteFooter";

/**
 * Wraps every page so the white footer sits *behind* the content and is revealed
 * on scroll. The content is an opaque black layer (z-10) with rounded bottom
 * corners; the footer is fixed to the viewport bottom (z-0) and covered until the
 * content scrolls up past it. A spacer the height of the footer gives the page
 * room to scroll far enough to unveil it — measured live so responsive footer
 * heights (column on mobile, row on desktop) stay in sync.
 */
export function RootShell({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const update = () => setFooterHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="relative z-10 flex flex-1 flex-col rounded-b-[28px] bg-bg">
        {children}
      </div>
      {/* reserves scroll room so the fixed footer can be revealed underneath */}
      <div aria-hidden style={{ height: footerHeight }} />
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        <SiteFooter />
      </div>
    </>
  );
}
