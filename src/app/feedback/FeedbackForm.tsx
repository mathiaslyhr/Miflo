"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedbackAction, type FeedbackState } from "./actions";
import { GlassCard, GlassSurface } from "@/components/glass";

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
      className="tap shrink-0 cursor-pointer select-none rounded-full bg-[#0d0d16] px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_0_1.5px_rgba(255,255,255,0.25),0_10px_24px_-12px_rgba(20,15,50,0.5)] transition-transform duration-200 ease-[cubic-bezier(0.34,1.25,0.64,1)] hover:scale-[1.03] active:scale-[0.96] active:opacity-90 disabled:opacity-50"
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
      <GlassCard className="p-8 text-center">
        <h2 className="text-2xl font-medium text-[#0d0d16]">Thank you</h2>
        <p className="mx-auto mt-2 max-w-sm text-[#0d0d16]/55">
          Your feedback helps shape Miflo. We read everything.
        </p>
      </GlassCard>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <fieldset>
        <legend className="mb-3 text-sm text-[#0d0d16]/55">
          What&apos;s this about?
        </legend>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((c) => {
            const selected = category === c.value;
            return (
              <label
                key={c.value}
                className={`tap cursor-pointer select-none rounded-full border px-4 py-3 text-center text-sm font-medium transition-transform duration-200 ease-[cubic-bezier(0.34,1.25,0.64,1)] hover:scale-[1.03] active:scale-[0.96] ${
                  selected
                    ? "border-transparent bg-[#0d0d16] text-white"
                    : "border-white/60 bg-white/40 text-[#0d0d16]/60 backdrop-blur-md hover:text-[#0d0d16]"
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
        <label
          htmlFor="message"
          className="mb-3 block text-sm text-[#0d0d16]/55"
        >
          Your message
        </label>
        <GlassSurface radiusClass="rounded-3xl" scale={0.28} className="p-1.5">
          <textarea
            id="message"
            name="message"
            required
            maxLength={1000}
            rows={6}
            placeholder="Questions, bugs, or things you'd love to see in Miflo"
            className="w-full resize-y rounded-3xl bg-transparent px-4 py-3 text-[#0d0d16] placeholder:text-[#0d0d16]/45 focus:outline-none"
          />
        </GlassSurface>
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
        <span className="text-sm text-[#0d0d16]/45">No account needed.</span>
      </div>
    </form>
  );
}
