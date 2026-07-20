import { DOWNLOAD_URL } from "@/lib/links";
import { PRESS_BASE } from "@/components/ui";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

/*
 * White, not purple. The button used to be `bg-primary`, which read clearly
 * against the old flat #0b0b0f page — but the page is now a purple gradient
 * built from that same #6260ff, so a purple button sinks into it. Solid white
 * is the one fill that stays legible across the whole ramp, from the deep
 * indigo end to the near-white end.
 */
const base =
  `${PRESS_BASE} inline-flex items-center justify-center rounded-full ` +
  "bg-white px-6 py-3.5 font-medium text-neutral-950 hover:bg-white/90 " +
  "shadow-[0_8px_30px_rgba(0,0,0,0.25)]";

/**
 * Primary "get the app" CTA. Links to the App Store listing.
 */
export function DownloadButton({ className = "", children }: Props) {
  return (
    <a
      href={DOWNLOAD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`}
    >
      {children ?? "Get the app"}
    </a>
  );
}
