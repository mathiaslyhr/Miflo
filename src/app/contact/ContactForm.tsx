"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactAction, type ContactState } from "./actions";
import { CTRL, GLASS_INSET } from "@/components/ui";

const initialState: ContactState = { status: "idle" };

const field =
  `w-full rounded-2xl px-4 py-3 text-ink placeholder:text-muted ${GLASS_INSET}`;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${CTRL} shrink-0 rounded-full bg-white px-6 py-3 font-medium text-neutral-950 hover:bg-white/90 disabled:pointer-events-none disabled:opacity-50`}
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactAction, initialState);

  if (state.status === "success") {
    return (
      <div className={`rounded-2xl p-8 text-center ${GLASS_INSET}`}>
        <h2 className="text-2xl font-medium text-ink">Message sent</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Thanks — it goes straight to a real inbox. You&apos;ll hear back if you
          left an email.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-muted">
            Name
          </label>
          <input id="name" name="name" type="text" maxLength={100} className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            Email <span className="text-faint">— so I can reply</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={200}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          rows={8}
          // placeholder:text-muted rather than faint — placeholder text has to
          // clear the same 4.5:1 as body copy.
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from humans, catches bots. */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-error">
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-4">
        <SubmitButton />
        <span className="text-sm text-muted">No account needed.</span>
      </div>
    </form>
  );
}
