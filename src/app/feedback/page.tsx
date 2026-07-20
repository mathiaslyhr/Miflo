import type { Metadata } from "next";
import { Sheet } from "@/components/ui";
import { FeedbackForm } from "./FeedbackForm";

export const metadata: Metadata = {
  title: "Feedback — Miflo",
  description:
    "Send questions, report a bug, or suggest something you'd love to see in Miflo.",
};

/*
 * Deliberately not in the nav — the nav is Privacy / FAQ / Contact.
 *
 * The page stays because the shipped app links straight to it: FEEDBACK_URL in
 * MifloApp `src/core/config.ts` points at https://miflo.dk/feedback. Deleting
 * the route would 404 the feedback button in every copy of the app already on
 * someone's phone, which no site redesign is worth.
 */
export default function FeedbackPage() {
  return (
    <main className="relative flex-1 px-4 pt-28 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto w-full max-w-xl">
        <Sheet>
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
        </Sheet>
      </div>
    </main>
  );
}
