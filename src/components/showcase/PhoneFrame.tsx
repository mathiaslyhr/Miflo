import type { ReactNode } from "react";

/**
 * A stylised iPhone for the marketing showcase. The shell is a titanium-look
 * frame with side buttons and a dynamic island; the screen enforces a real
 * 9 / 19.5 silhouette so `children` fill it like a complete app screen.
 *
 * With `chrome={false}` the drawn status bar + island are omitted and
 * `children` fill the screen edge-to-edge — for real app screenshots that
 * already contain their own status bar.
 */
export function PhoneFrame({
  children,
  chrome = true,
}: {
  children: ReactNode;
  chrome?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[260px]">
      {/* side buttons (silent + volume on the left, power on the right) */}
      <span className="absolute -left-[2px] top-[96px] h-7 w-[3px] rounded-l-sm bg-[#4a4a52]" />
      <span className="absolute -left-[2px] top-[140px] h-12 w-[3px] rounded-l-sm bg-[#4a4a52]" />
      <span className="absolute -left-[2px] top-[196px] h-12 w-[3px] rounded-l-sm bg-[#4a4a52]" />
      <span className="absolute -right-[2px] top-[168px] h-16 w-[3px] rounded-r-sm bg-[#4a4a52]" />

      {/* black titanium frame */}
      <div className="relative rounded-[2.7rem] bg-gradient-to-b from-[#3a3a42] to-[#1d1d22] p-[10px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/10">
        {/* screen */}
        <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[2.05rem] bg-bg">
          {chrome ? (
            <>
              {/* dynamic island */}
              <div className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-6 w-[68px] -translate-x-1/2 rounded-full bg-black" />

              {/* status bar — kept clear of the island so nothing peeks behind it */}
              <div className="flex items-center justify-between px-4 pt-3 text-[11px] font-medium text-ink">
                <span>9:41</span>
                <span className="flex items-center gap-1" aria-hidden>
                  {/* signal */}
                  <svg width="15" height="10" viewBox="0 0 17 11" fill="currentColor">
                    <rect x="0" y="7" width="3" height="4" rx="1" />
                    <rect x="4.5" y="5" width="3" height="6" rx="1" />
                    <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
                    <rect x="13.5" y="0" width="3" height="11" rx="1" />
                  </svg>
                  {/* wifi */}
                  <svg width="14" height="10" viewBox="0 0 16 12" fill="currentColor">
                    <path d="M8 2.2c2.5 0 4.8 1 6.5 2.6l-1.5 1.6A7.1 7.1 0 0 0 8 4.5c-2 0-3.8.8-5 2L1.5 4.8A9.2 9.2 0 0 1 8 2.2Zm0 3.4c1.4 0 2.7.5 3.6 1.5l-1.5 1.5A3 3 0 0 0 8 8c-.8 0-1.6.3-2.1.8L4.4 7.3A5 5 0 0 1 8 5.6Zm0 3.3c.6 0 1.1.2 1.5.6L8 10.8 6.5 9.5c.4-.4.9-.6 1.5-.6Z" />
                  </svg>
                  {/* battery */}
                  <svg width="20" height="10" viewBox="0 0 25 12" fill="none">
                    <rect
                      x="0.5"
                      y="0.5"
                      width="21"
                      height="11"
                      rx="3"
                      stroke="currentColor"
                      strokeOpacity="0.4"
                    />
                    <rect x="2" y="2" width="17" height="8" rx="1.6" fill="currentColor" />
                    <rect
                      x="23"
                      y="4"
                      width="1.5"
                      height="4"
                      rx="0.75"
                      fill="currentColor"
                      fillOpacity="0.4"
                    />
                  </svg>
                </span>
              </div>

              {/* screen content */}
              <div className="flex flex-1 flex-col px-4 pb-5 pt-5">{children}</div>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
