"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedbackAction, type FeedbackState } from "./actions";

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
      className="rounded-button bg-accent px-6 py-3.5 font-medium text-white transition-opacity duration-200 ease-out-quint hover:opacity-90 disabled:opacity-50"
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
      <div className="rounded-card border border-divider bg-surface p-8 text-center">
        <h2 className="text-2xl font-medium">Thank you</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Your feedback helps shape Miflo. We read everything.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <fieldset>
        <legend className="mb-3 text-sm text-muted">What&apos;s this about?</legend>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((c) => {
            const selected = category === c.value;
            return (
              <label
                key={c.value}
                className={`cursor-pointer rounded-button px-4 py-3 text-center transition-colors duration-150 ${
                  selected
                    ? "bg-accent text-white"
                    : "bg-surface text-muted hover:text-ink"
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
          className="w-full resize-y rounded-button border border-divider bg-surface px-4 py-3.5 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none"
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
