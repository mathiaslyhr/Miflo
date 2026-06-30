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
 * Beta waitlist signup. Until we have a real newsletter, the email is stored
 * through the same `submit_feedback` RPC the iOS app and feedback form use
 * (tagged so it's easy to filter), plus a best-effort owner notification. No
 * schema change needed — this gets swapped for a dedicated signups table later.
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

    const { error } = await supabase.rpc("submit_feedback", {
      p_category: "general",
      p_message: `Beta waitlist signup: ${email}`,
      p_app_version: "web-signup",
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
