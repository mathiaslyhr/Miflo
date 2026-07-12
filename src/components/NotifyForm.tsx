"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitSignupAction, type SignupState } from "@/lib/signupAction";
import { GlassCard, GlassSurface } from "@/components/glass";

const initialState: SignupState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="tap shrink-0 cursor-pointer select-none rounded-full bg-[#0d0d16] px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_0_1.5px_rgba(255,255,255,0.25),0_10px_24px_-12px_rgba(20,15,50,0.5)] transition-transform duration-200 ease-[cubic-bezier(0.34,1.25,0.64,1)] hover:scale-[1.03] active:scale-[0.96] active:opacity-90 disabled:opacity-50"
    >
      {pending ? "Joining…" : "Join the list"}
    </button>
  );
}

export function NotifyForm() {
  const [state, formAction] = useActionState(submitSignupAction, initialState);

  if (state.status === "success") {
    return (
      <GlassCard className="p-8 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#32c36c] text-white">
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
        <h2 className="mt-4 text-2xl font-medium text-[#0d0d16]">
          You&apos;re on the list
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[#0d0d16]/55">
          We&apos;ll email you about big updates and new games. No spam, ever.
        </p>
      </GlassCard>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label htmlFor="email" className="text-sm text-[#0d0d16]/55">
        Your email
      </label>
      <GlassSurface
        radiusClass="rounded-full"
        className="flex items-center gap-2 p-1.5 pl-5"
      >
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="min-w-0 flex-1 bg-transparent text-sm text-[#0d0d16] placeholder:text-[#0d0d16]/45 focus:outline-none"
        />
        <SubmitButton />
      </GlassSurface>

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

      <span className="text-sm text-[#0d0d16]/45">No account needed.</span>
    </form>
  );
}
