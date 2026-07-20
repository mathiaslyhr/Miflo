import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { FeedbackForm } from "./FeedbackForm";

export const metadata: Metadata = {
  title: "Feedback — Miflo",
  description:
    "Send questions, report a bug, or suggest something you'd love to see in Miflo.",
};

export default function FeedbackPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden">
        <div className="relative mx-auto w-full max-w-xl px-6 py-16 sm:py-24">
          <h1
            className="font-medium leading-[1.05] tracking-tight text-ink"
            style={{ fontSize: "clamp(2.25rem,6vw,3.5rem)" }}
          >
            Feedback, questions, ideas.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Tell us what to fix or what to build next. Everything you send goes
            straight to the people making Miflo.
          </p>
          <div className="mt-10">
            <FeedbackForm />
          </div>
        </div>
      </main>
    </>
  );
}
