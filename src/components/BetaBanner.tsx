"use client";

import Link from "next/link";
import { useState } from "react";
import { HAS_DOWNLOAD } from "@/lib/links";

/**
 * Full-width purple beta notice across the very top of the site. Dismissible,
 * and hidden once the app actually ships (HAS_DOWNLOAD).
 */
export function BetaBanner() {
  const [open, setOpen] = useState(true);

  if (HAS_DOWNLOAD || !open) return null;

  return (
    <div className="bg-accent text-white">
      <div className="relative mx-auto flex h-10 w-full max-w-5xl items-center justify-center gap-3 px-6 text-sm">
        <p className="truncate">
          Miflo is in public beta — invites are rolling out.{" "}
          <Link
            href="/feedback"
            className="font-medium underline underline-offset-2 hover:no-underline"
          >
            Get an invite →
          </Link>
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss"
          className="absolute right-6 flex h-6 w-6 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
