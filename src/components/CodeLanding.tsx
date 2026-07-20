import { SiteHeader } from "@/components/SiteHeader";
import { AutoOpenApp } from "@/components/AutoOpenApp";
import { Card, HeroGlow, OutlineButton, SolidButton } from "@/components/ui";

/**
 * The shared layout behind /join/<code> and /add/<code>.
 *
 * On a device with Miflo installed, iOS follows the Universal Link straight
 * into the app and this page is never seen. It exists for everyone else:
 * friends without the app, desktop, and link previews. So the code itself is
 * the page — big enough to read off someone else's screen and type in by hand,
 * because that's the fallback path when the deep link doesn't fire.
 */
export function CodeLanding({
  kind,
  code,
  title,
  intro,
  deepLink,
  appStoreUrl,
}: {
  kind: "Party code" | "Friend code";
  code: string;
  title: string;
  intro: string;
  deepLink: string;
  appStoreUrl: string;
}) {
  return (
    <>
      <AutoOpenApp href={deepLink} />
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden">
        <HeroGlow />
        <div className="relative mx-auto w-full max-w-xl px-6 py-16 text-center sm:py-24">
          <h1
            className="font-medium leading-[1.05] tracking-tight text-ink"
            style={{ fontSize: "clamp(2.25rem,6vw,3.5rem)" }}
          >
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
            {intro}
          </p>

          <Card className="mx-auto mt-10 w-fit !px-10 !py-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-faint">
              {kind}
            </p>
            <p className="mt-2 font-mono text-5xl font-medium tracking-[0.28em] text-ink">
              {/* Trailing letter-spacing would push the code off-centre. */}
              <span className="-mr-[0.28em]">{code}</span>
            </p>
          </Card>

          <div className="mx-auto mt-10 flex w-full max-w-xs flex-col gap-3">
            <SolidButton href={deepLink} className="!py-4 !text-base">
              Open in Miflo
            </SolidButton>
            <OutlineButton
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="!py-4 !text-base"
            >
              Get the app
            </OutlineButton>
          </div>
        </div>
      </main>
    </>
  );
}
