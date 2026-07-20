import { DownloadButton } from "@/components/DownloadButton";

/*
 * The homepage is one screen: the gradient (rendered by RootShell), the nav
 * pill, a name, a line, and the App Store button.
 *
 * It used to be a 450-line marketing page — phone mockups, animated game
 * screens, a bento grid of all eight games. All of it existed to explain the
 * app, and all of it had to be re-cut whenever the app changed. The App Store
 * listing already does that job, with screenshots Apple keeps in sync. So this
 * page does the one thing the listing can't: be a link you can send someone.
 *
 * Nothing scrolls here, but the page does not lock scrolling globally — the
 * privacy page is long, and a lock set on <html> would follow the reader there.
 */
export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-medium tracking-tight text-white drop-shadow-[0_2px_20px_rgba(20,10,60,0.45)] sm:text-7xl">
        Miflo
      </h1>

      <p className="mt-4 max-w-md text-lg text-white/80 drop-shadow-[0_1px_12px_rgba(20,10,60,0.5)]">
        Football games for you and your friends. Free on iPhone.
      </p>

      <DownloadButton className="mt-9" />

      {/* pointer-events-none so the corner text can't swallow pointermove
          events and stall the circles when the cursor passes over it. */}
      <p className="pointer-events-none fixed bottom-4 left-4 text-xs text-white/60 sm:bottom-6 sm:left-6">
        © {new Date().getFullYear()} Miflo
      </p>
    </main>
  );
}
