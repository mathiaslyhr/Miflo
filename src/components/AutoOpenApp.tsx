"use client";

import { useEffect } from "react";

/**
 * Bounces straight into the Miflo app on mount.
 *
 * Tapping https://miflo.dk/join/<code> in Messages or WhatsApp should never
 * reach this page at all — iOS opens the app via Universal Links and the web
 * page stays unseen. But iOS deliberately refuses Universal Links in some
 * contexts (a URL typed into Safari, some in-app browsers), and there the page
 * is all a friend gets. Firing the custom scheme covers those cases so the
 * visible page stays a true fallback.
 *
 * Guarded two ways, both load-bearing:
 *  - iOS only. The scheme means nothing on desktop/Android, where the attempt
 *    would only ever produce an error.
 *  - Once per href per tab session. Without the app installed iOS shows a
 *    "Cannot Open Page" alert; the sessionStorage key keeps that to a single
 *    alert instead of one on every bounce back to this page.
 */
export function AutoOpenApp({ href }: { href: string }) {
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      // iPadOS 13+ reports itself as a Mac; touch points give it away.
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (!isIOS) return;

    const key = `miflo:autoopen:${href}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode / storage disabled: attempting once is still better than
      // stranding someone who has the app on a page they shouldn't be seeing.
    }

    window.location.replace(href);
  }, [href]);

  return null;
}
