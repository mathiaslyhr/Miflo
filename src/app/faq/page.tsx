import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Eyebrow } from "@/components/glass";

export const metadata: Metadata = {
  title: "FAQ — Miflo",
  description:
    "Answers to the common questions about Miflo — is it free, what you need to play, how many can join, and whether it's on Android.",
};

const FAQS = [
  {
    q: "Is Miflo free?",
    a: "Yes — Miflo is free while it's in public beta. Get on the list and start a party.",
  },
  {
    q: "What do I need to play?",
    a: "An iPhone and a few mates. One person starts a party and shares the four-letter code; everyone else joins from their own phone.",
  },
  {
    q: "Do I need to sign up?",
    a: "No account, no sign-up. Open the app, pick a nickname, and you're in.",
  },
  {
    q: "How many people can play?",
    a: "It's built for a group. Start with two and add as many mates as you can round up — perfect for a full group chat.",
  },
  {
    q: "Which games are there?",
    a: "Three right now: Tic Tac Toe, Tenball, and Heatmap. More are on the way.",
  },
  {
    q: "Is it on Android?",
    a: "Miflo is iOS-only for now. Want it on Android? Get on the list and we'll let you know.",
  },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1">
        <section className="relative">
          <div className="relative mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
            <Eyebrow>FAQ</Eyebrow>
            <h1
              className="mt-4 font-medium leading-[1.05] tracking-tight text-[#0d0d16]"
              style={{ fontSize: "clamp(2.25rem,6vw,3.5rem)" }}
            >
              Good to know.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#0d0d16]/55">
              Everything you might want to check before you round up the group
              chat.
            </p>

            <div className="mt-12 flex flex-col divide-y divide-[#0d0d16]/10 border-t border-[#0d0d16]/10">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-[#0d0d16] [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="shrink-0 text-[#0d0d16]/40 transition-transform duration-300 ease-[cubic-bezier(0.34,1.25,0.64,1)] group-open:rotate-45"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-[#0d0d16]/55">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
