import type { Metadata } from "next";
import { CodeLanding } from "@/components/CodeLanding";
import { APP_STORE_URL } from "@/lib/links";

// The party-join landing page. On devices with Miflo installed, iOS opens the
// app directly via Universal Links and this page is never seen — it's the
// fallback for friends without the app (or link previews).
export const metadata: Metadata = {
  title: "Join a party · Miflo",
  description: "You've been invited to a Miflo party. Grab the app and jump in.",
  robots: { index: false },
};

export default async function JoinPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const clean = decodeURIComponent(code).toUpperCase().slice(0, 4);

  return (
    <CodeLanding
      kind="Party code"
      code={clean}
      title="You're invited."
      intro="A friend wants you in their Miflo party. Open the app and enter the code, or tap below if Miflo is already installed."
      deepLink={`miflo://join/${clean}`}
      appStoreUrl={APP_STORE_URL}
    />
  );
}
