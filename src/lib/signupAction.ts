"use server";

import { createAnonClient } from "@/lib/supabaseServer";
import { notifyNewSignup } from "@/lib/notify";

export type SignupState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// Pragmatic email check — enough to catch typos without rejecting valid edge cases.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Beta waitlist signup. Stores the email in the dedicated `waitlist` table via
 * the `join_waitlist` RPC (SECURITY DEFINER — the anon key can add but never
 * read the list; duplicates are ignored), plus a best-effort owner
 * notification.
 *
 * Requires the `supabase/migrations/20260702_waitlist.sql` migration to be
 * applied first (the DB is not linked locally — apply it via the dashboard).
 */
export async function submitSignupAction(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  // Honeypot: real users never fill the hidden "company" field.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { status: "error", message: "Please enter your email." };
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "That doesn't look like a valid email." };
  }

  try {
    const supabase = createAnonClient();
    const { error: authError } = await supabase.auth.signInAnonymously();
    if (authError) throw authError;

    const { error } = await supabase.rpc("join_waitlist", {
      p_email: email,
      p_source: "web",
    });
    if (error) throw error;

    // Best-effort owner notification; never blocks a successful signup.
    await notifyNewSignup(email);

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
