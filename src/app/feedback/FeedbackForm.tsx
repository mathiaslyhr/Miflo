"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedbackAction, type FeedbackState } from "./actions";
import { CTRL, GLASS_INSET } from "@/components/ui";

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "bug", label: "Bug" },
  { value: "idea", label: "Idea" },
] as const;

const initialState: FeedbackState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${CTRL} shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 hover:bg-white/90 disabled:pointer-events-none disabled:opacity-50`}
    >
      {pending ? "Sending…" : "Send feedback"}
    </button>
  );
}

export function FeedbackForm() {
  const [state, formAction] = useActionState(submitFeedbackAction, initialState);
  const [category, setCategory] = useState<string>("general");

  if (state.status === "success") {
    return (
      <div className={`rounded-2xl p-8 text-center ${GLASS_INSET}`}>
        <h2 className="text-2xl font-medium text-ink">Thank you</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Your feedback helps shape Miflo. We read everything.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <fieldset>
        <legend className="mb-3 text-sm text-muted">
          What&apos;s this about?
        </legend>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((c) => {
            const selected = category === c.value;
            return (
              <label
                key={c.value}
                className={`${CTRL} rounded-full border px-4 py-3 text-center text-sm font-medium ${
                  selected
                    ? "border-primary bg-primary text-white"
                    : `${GLASS_INSET} text-muted hover:bg-white/10 hover:text-ink`
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={c.value}
                  checked={selected}
                  onChange={() => setCategory(c.value)}
                  className="sr-only"
                />
                {c.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-3 block text-sm text-muted">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={1000}
          rows={6}
          placeholder="Questions, bugs, or things you'd love to see in Miflo"
          // placeholder:text-muted, not faint: placeholder text has to clear
          // the same 4.5:1 as body copy.
          className={`w-full resize-y rounded-2xl px-4 py-3 text-ink placeholder:text-muted ${GLASS_INSET}`}
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
