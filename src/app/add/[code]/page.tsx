import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Eyebrow } from "@/components/glass";
import { APP_STORE_URL } from "@/lib/links";

// The add-a-friend landing page. On devices with Miflo installed, iOS opens
// the app directly via Universal Links (the Friends tab auto-sends the
// request) and this page is never seen — it's the fallback for friends
// without the app (or link previews).
export const metadata: Metadata = {
  title: "Add a friend — Miflo",
  description: "Someone wants to be your friend on Miflo. Grab the app and add them.",
  robots: { index: false },
};

export default async function AddFriendPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const clean = decodeURIComponent(code).toUpperCase().slice(0, 6);

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden">
        <div className="relative mx-auto w-full max-w-xl px-6 py-16 text-center sm:py-24">
          <Eyebrow>Friend code</Eyebrow>
          <h1
            className="mt-4 font-medium leading-[1.05] tracking-tight text-[#0d0d16]"
            style={{ fontSize: "clamp(2.25rem,6vw,3.5rem)" }}
          >
            Let&apos;s be friends.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#0d0d16]/55">
            Someone wants to add you on Miflo. Open the app and enter their
            code on the Friends tab — or tap below if Miflo is already
            installed.
          </p>

          <div className="mx-auto mt-10 w-fit rounded-full bg-white/60 px-10 py-5 shadow-sm ring-1 ring-black/5 backdrop-blur">
            <p className="text-xs font-medium tracking-[0.2em] text-[#0d0d16]/50">
              FRIEND CODE
            </p>
            <p className="mt-1 text-5xl font-medium tracking-[0.35em] text-[#0d0d16]">
              {clean}
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href={`miflo://add/${clean}`}
              className="w-full max-w-xs rounded-full bg-[#0d0d16] px-8 py-4 text-base font-medium text-white transition hover:bg-[#0d0d16]/85"
            >
              Open in Miflo
            </a>
            <a
              href={APP_STORE_URL}
              className="w-full max-w-xs rounded-full bg-white/60 px-8 py-4 text-base font-medium text-[#0d0d16] ring-1 ring-black/10 transition hover:bg-white/80"
            >
              Get the app
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
