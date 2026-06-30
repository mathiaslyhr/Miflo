"use server";

import { createAnonClient } from "@/lib/supabaseServer";
import { notifyNewFeedback } from "@/lib/notify";

export type FeedbackState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const ALLOWED = ["general", "bug", "idea"];
const MESSAGE_MAX = 1000;

/**
 * Submit website feedback into the shared Supabase `feedback` table via the same
 * `submit_feedback` RPC the iOS app uses (source = "web"). Reuses anonymous auth,
 * so no schema changes are needed.
 */
export async function submitFeedbackAction(
  _prev: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  // Honeypot: real users never fill the hidden "company" field. Silently accept
  // so bots don't learn they were caught.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const rawCategory = String(formData.get("category") ?? "general");
  const category = ALLOWED.includes(rawCategory) ? rawCategory : "general";
  const message = String(formData.get("message") ?? "").trim();

  if (!message) {
    return { status: "error", message: "Please write a message first." };
  }
  if (message.length > MESSAGE_MAX) {
    return {
      status: "error",
      message: `Please keep it under ${MESSAGE_MAX} characters.`,
    };
  }

  try {
    const supabase = createAnonClient();
    const { error: authError } = await supabase.auth.signInAnonymously();
    if (authError) throw authError;

    const { error } = await supabase.rpc("submit_feedback", {
      p_category: category,
      p_message: message,
      p_app_version: "web",
      p_source: "web",
    });
    if (error) throw error;

    // Best-effort owner notification; never blocks a successful submission.
    await notifyNewFeedback(category, message);

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending that. Please try again.",
    };
  }
}
