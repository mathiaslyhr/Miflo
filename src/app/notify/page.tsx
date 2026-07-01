import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { NotifyForm } from "@/components/NotifyForm";

export const metadata: Metadata = {
  title: "Get notified — Miflo",
  description:
    "Join the Miflo beta waitlist and we'll email you the moment it opens up.",
};

export default function NotifyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-xl px-6 py-16 sm:py-20">
          <p className="text-sm font-medium text-accent-ink/80">Beta</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight">
            Get the beta invite
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Miflo is in public beta and invites are rolling out. Leave your email
            and we&apos;ll let you know the moment you can play.
          </p>
          <div className="mt-10">
            <NotifyForm />
          </div>
        </div>
      </main>
    </>
  );
}
