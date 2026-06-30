import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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
      <main className="flex-1">
        <div className="mx-auto w-full max-w-xl px-6 py-16 sm:py-20">
          <h1 className="text-4xl font-medium tracking-tight">
            Feedback, questions, ideas
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
      <SiteFooter />
    </>
  );
}
