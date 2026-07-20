import type { Metadata } from "next";
import { Sheet } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/links";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact · Miflo",
  description: "Write a message and it lands in a real inbox.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 px-4 pt-28 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto w-full max-w-3xl">
        <Sheet>
          <h1
            className="font-medium leading-[1.05] tracking-tight text-ink"
            style={{ fontSize: "clamp(2.25rem,6vw,3.5rem)" }}
          >
            Get in touch.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Questions, bugs, or anything else. Write below and it lands in a real
            inbox. Prefer your own mail app?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent-ink underline underline-offset-4 hover:text-ink"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </Sheet>
      </div>
    </main>
  );
}
