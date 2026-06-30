"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitSignupAction, type SignupState } from "@/lib/signupAction";

const initialState: SignupState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-button bg-accent px-5 py-2.5 font-medium text-white transition-opacity duration-200 ease-out-quint hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Joining…" : "Join the list"}
    </button>
  );
}

export function NotifyModal({ onClose }: { onClose: () => void }) {
  const [state, formAction] = useActionState(submitSignupAction, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  // Focus the email field when the modal opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-card border border-divider bg-surface p-6 shadow-2xl shadow-black/60"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {state.status === "success" ? (
          <div className="py-4 text-center">
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
            <h2 id={titleId} className="mt-4 text-xl font-medium tracking-tight">
              You&apos;re on the list
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
              We&apos;ll email you the moment Miflo opens up.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-button border border-divider px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-muted"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId} className="text-xl font-medium tracking-tight">
              Get the beta invite
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Drop your email and we&apos;ll let you know the moment Miflo opens
              up. No spam, just the invite.
            </p>

            <form action={formAction} className="mt-5 flex flex-col gap-3">
              <label htmlFor="signup-email" className="sr-only">
                Email address
              </label>
              <input
                ref={inputRef}
                id="signup-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                className="w-full rounded-button border border-divider bg-bg px-4 py-3 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none"
              />

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

              <div className="mt-1 flex items-center gap-3">
                <SubmitButton />
                <span className="text-xs text-muted">No account needed.</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
