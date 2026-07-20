import { DOWNLOAD_URL } from "@/lib/links";
import { PRESS_BASE } from "@/components/ui";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const base =
  `${PRESS_BASE} inline-flex items-center justify-center rounded-full ` +
  "bg-primary px-6 py-3.5 font-medium text-white hover:bg-primary-ink";

/**
 * Primary "get the app" CTA. Links to the App Store listing (the link resolves
 * once the app is approved and live).
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
