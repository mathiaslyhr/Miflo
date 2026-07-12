import Link from "next/link";
import { DOWNLOAD_URL, HAS_DOWNLOAD } from "@/lib/links";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const base =
  "tap inline-flex cursor-pointer select-none items-center justify-center rounded-full bg-[#0d0d16] px-6 py-3.5 font-medium text-white " +
  "shadow-[0_0_0_1.5px_rgba(255,255,255,0.25),0_14px_30px_-12px_rgba(20,15,50,0.4)] " +
  "transition-transform duration-200 ease-[cubic-bezier(0.34,1.25,0.64,1)] hover:scale-[1.03] active:scale-[0.96] active:opacity-90";

/**
 * Primary "get the app" CTA. Links to TestFlight/App Store when a URL exists;
 * until then it routes to the /notify beta waitlist page.
 */
export function DownloadButton({ className = "", children }: Props) {
  const label = children ?? (HAS_DOWNLOAD ? "Get the app" : "Get notified");

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
    <Link href="/notify" className={`${base} ${className}`}>
      {label}
    </Link>
  );
}
