import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { NotifyForm } from "@/components/NotifyForm";
import { Eyebrow } from "@/components/glass";

export const metadata: Metadata = {
  title: "Get notified — Miflo",
  description:
    "Leave your email and we'll let you know about big Miflo updates, new games, and Android.",
};

export default function NotifyPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden">
        <div className="relative mx-auto w-full max-w-xl px-6 py-16 sm:py-24">
          <Eyebrow>Updates</Eyebrow>
          <h1
            className="mt-4 font-medium leading-[1.05] tracking-tight text-[#0d0d16]"
            style={{ fontSize: "clamp(2.25rem,6vw,3.5rem)" }}
          >
            Stay in the loop.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#0d0d16]/55">
            Miflo is out now on iPhone. Leave your email and we&apos;ll let you
            know about big updates, new games, and if Android ever lands.
          </p>
          <div className="mt-10">
            <NotifyForm />
          </div>
        </div>
      </main>
    </>
  );
}
