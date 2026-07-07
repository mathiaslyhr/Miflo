import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { NotifyForm } from "@/components/NotifyForm";
import { Eyebrow } from "@/components/glass";

export const metadata: Metadata = {
  title: "Get notified — Miflo",
  description:
    "Join the Miflo beta waitlist and we'll email you the moment it opens up.",
};

export default function NotifyPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden">
        <div className="relative mx-auto w-full max-w-xl px-6 py-16 sm:py-24">
          <Eyebrow>Beta</Eyebrow>
          <h1
            className="mt-4 font-medium leading-[1.05] tracking-tight text-[#0d0d16]"
            style={{ fontSize: "clamp(2.25rem,6vw,3.5rem)" }}
          >
            Get the beta invite.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#0d0d16]/55">
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
