import type { Metadata } from "next";
import { CodeLanding } from "@/components/CodeLanding";
import { APP_STORE_URL } from "@/lib/links";

// The add-a-friend landing page. On devices with Miflo installed, iOS opens
// the app directly via Universal Links (the Friends tab auto-sends the
// request) and this page is never seen — it's the fallback for friends
// without the app (or link previews).
export const metadata: Metadata = {
  title: "Add a friend — Miflo",
  description:
    "Someone wants to be your friend on Miflo. Grab the app and add them.",
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
    <CodeLanding
      kind="Friend code"
      code={clean}
      title="Let's be friends."
      intro="Someone wants to add you on Miflo. Open the app and enter their code on the Friends tab, or tap below if Miflo is already installed."
      deepLink={`miflo://add/${clean}`}
      appStoreUrl={APP_STORE_URL}
    />
  );
}
