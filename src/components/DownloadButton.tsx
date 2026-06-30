"use client";

import { useState } from "react";
import { DOWNLOAD_URL, HAS_DOWNLOAD } from "@/lib/links";
import { NotifyModal } from "./NotifyModal";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-button bg-accent px-6 py-3.5 font-medium text-white transition-opacity duration-200 ease-out-quint hover:opacity-90 cursor-pointer";

/**
 * Primary "get the app" CTA. Links to TestFlight/App Store when a URL exists;
 * until then it opens the beta waitlist signup modal.
 */
export function DownloadButton({ className = "", children }: Props) {
  const [open, setOpen] = useState(false);
  const label = children ?? (HAS_DOWNLOAD ? "Get the beta" : "Get notified");

  if (HAS_DOWNLOAD) {
    return (
      <a
        href={DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`${base} ${className}`}>
        {label}
      </button>
      {open && <NotifyModal onClose={() => setOpen(false)} />}
    </>
  );
}
