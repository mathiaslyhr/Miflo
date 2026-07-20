import type { Metadata } from "next";
import { Sheet } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ — Miflo",
  description:
    "Answers to the common questions about Miflo: is it free, what you need to play, how friends work without a login, the games, the daily puzzles, and the players.",
};

const FAQS = [
  {
    q: "Is Miflo free?",
    a: "Yes. Miflo is free to download and play.",
  },
  {
    q: "What do I need to play?",
    a: "An iPhone. The daily games are solo, and the party games are best with a few friends. One person starts a party and shares the four-letter code, and everyone else joins from their own phone.",
  },
  {
    q: "Do I need an account?",
    a: "No. There's no login and no sign-up. Open the app, pick a nickname, and you're in. Your progress lives on your phone rather than in an account.",
  },
  {
    q: "How do I have friends if there's no login?",
    a: "When you turn on Friends, Miflo gives you a personal friend code. Share it, add someone else's code, and once they accept you can see each other's daily results and streaks. Because there's no account, it all lives on your phone, so deleting or reinstalling the app resets your friends, streaks and history. See the guide for the full picture.",
  },
  {
    q: "Which games are there?",
    a: "Eight. Four are daily solo puzzles you play on your own: Scout, Top Bins, Journeyman and Team Sheet. Four are for playing together, online or passing one phone around: Hattrick, Offside, Cult Hero and Red Card. The guide breaks down how each one works.",
  },
  {
    q: "How do the daily games and streaks work?",
    a: "Every day there's one puzzle per daily game, the same for everyone, and your streak grows each day you solve it inside the limit. Keep it clean enough and the streak carries over. The Log in your profile keeps a record of every day you've played.",
  },
  {
    q: "Do you have every footballer? Can I request one?",
    a: "We don't have every player, and we won't pretend to. We focus on well-known players from the top leagues and keep adding more over time. If someone's missing, send us the name through feedback and we'll look at adding them.",
  },
  {
    q: "Do new players and games need an App Store update?",
    a: "Almost never. New players, fixes, and the artwork that goes with them — player pictures, club crests and flags — all reach the app on their own, usually within a minute. Only a brand-new game needs an App Store update.",
  },
  {
    q: "What languages is Miflo in?",
    a: "English and Danish. The app follows your phone's language.",
  },
  {
    q: "Is it on Android?",
    a: "Miflo is iOS only for now. Android may follow later.",
  },
  {
    q: "What data do you collect?",
    a: "As little as possible. No email, no phone number, no real name, no tracking and no ads. The privacy policy explains exactly what the app and this site do with information.",
  },
];

export default function FaqPage() {
  return (
    // pt-28 clears the floating nav pill, which no longer occupies layout space
    // the way the old sticky header did.
    <main className="relative flex-1 px-4 pt-28 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto w-full max-w-5xl">
        <Sheet>
          <h1
            className="font-medium leading-[1.05] tracking-tight text-ink"
            style={{ fontSize: "clamp(2.25rem,6vw,3.5rem)" }}
          >
            Good to know.
          </h1>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-muted">
            Everything you might want to check before you round up the group
            chat.
          </p>

          <div className="mt-12 flex flex-col divide-y divide-white/10 border-t border-white/10">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="shrink-0 text-faint transition-transform duration-300 ease-[cubic-bezier(0.34,1.25,0.64,1)] group-open:rotate-45"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <p className="mt-3 max-w-4xl leading-relaxed text-muted">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Sheet>
      </div>
    </main>
  );
}
