"use server";

import { Resend } from "resend";
import { createAnonClient } from "@/lib/supabaseServer";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const MESSAGE_MAX = 2000;
const NAME_MAX = 100;
const EMAIL_MAX = 200;

/*
 * A contact message goes two places, on purpose.
 *
 * The email is what the owner actually wants — it lands in a personal inbox
 * with the sender set as reply-to, so a reply is one click. But email is
 * best-effort: it silently no-ops when RESEND_API_KEY isn't configured, and a
 * contact form that quietly drops messages is worse than no contact form. So
 * every message is first written to Supabase through the same `submit_feedback`
 * RPC the app and the feedback page use. If the mail never sends, the message
 * is still recoverable from the dashboard.
 *
 * The submission is only reported as failed if the *durable* write fails.
 */
export async function submitContactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never fill the hidden field. Report success so bots
  // don't learn they were caught.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim().slice(0, NAME_MAX);
  const email = String(formData.get("email") ?? "").trim().slice(0, EMAIL_MAX);
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
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }

  // The RPC takes a single message field, so the sender's details are folded
  // into the body — otherwise a message saved after a mail failure would have
  // no way back to whoever sent it.
  const body =
    `From: ${name || "(no name)"} <${email || "no email given"}>\n\n${message}`;

  try {
    const supabase = createAnonClient();
    const { error: authError } = await supabase.auth.signInAnonymously();
    if (authError) throw authError;

    const { error } = await supabase.rpc("submit_feedback", {
      p_category: "general",
      p_message: body,
      p_app_version: "web",
      p_source: "contact",
    });
    if (error) throw error;
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending that. Please try again.",
    };
  }

  await notifyContact({ name, email, message });
  return { status: "success" };
}

/** Best-effort inbox notification. Never throws; never blocks the submission. */
async function notifyContact({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.FEEDBACK_NOTIFY_TO ?? "mathiaslyhr@outlook.com";
  const from =
    process.env.FEEDBACK_NOTIFY_FROM ?? "Miflo <onboarding@resend.dev>";

  try {
    await new Resend(apiKey).emails.send({
      from,
      to,
      subject: `Miflo contact · ${name || "someone"}`,
      // Reply-to is the sender, not hello@miflo.dk — the whole point is being
      // able to hit reply and reach the person who wrote in.
      ...(email ? { replyTo: email } : {}),
      text: `From: ${name || "(no name)"}\nEmail: ${email || "(none given)"}\n\n${message}\n\n— sent from miflo.dk/contact`,
    });
  } catch {
    // Swallow: the message is already durable in Supabase.
  }
}
