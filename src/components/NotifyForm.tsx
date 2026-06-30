"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitSignupAction, type SignupState } from "@/lib/signupAction";

const initialState: SignupState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-button bg-accent px-6 py-3.5 font-medium text-white transition-opacity duration-200 ease-out-quint hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Joining…" : "Join the list"}
    </button>
  );
}

export function NotifyForm() {
  const [state, formAction] = useActionState(submitSignupAction, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-card border border-divider bg-surface p-8 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12.5l4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-2xl font-medium">You&apos;re on the list</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          We&apos;ll email you the moment Miflo opens up. No spam, just the invite.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="mb-3 block text-sm text-muted">
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="w-full rounded-button border border-divider bg-surface px-4 py-3.5 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none"
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
