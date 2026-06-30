import { Resend } from "resend";

/**
 * Best-effort "new feedback" notification. Sends an email to the site owner when
 * someone submits the feedback form, so you don't have to watch the dashboard.
 *
 * No-ops if RESEND_API_KEY isn't set, and never throws — notification failure
 * must not break the user's submission. While the Resend domain is unverified,
 * the sender stays `onboarding@resend.dev` and the recipient must be your own
 * Resend account email (FEEDBACK_NOTIFY_TO).
 */
export async function notifyNewFeedback(
  category: string,
  message: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_NOTIFY_TO ?? "mathiaslyhr@outlook.com";
  const from = process.env.FEEDBACK_NOTIFY_FROM ?? "Miflo <onboarding@resend.dev>";
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: `New Miflo feedback · ${category}`,
      replyTo: "hello@miflo.dk",
      text: `Category: ${category}\n\n${message}\n\n— sent from miflo.dk`,
    });
  } catch {
    // Swallow: the feedback is already saved in Supabase; email is a bonus.
  }
}

/**
 * Best-effort "new beta waitlist signup" notification. Sends an email to the
 * site owner when someone leaves their address through the "Get notified" modal.
 * Same constraints as notifyNewFeedback: no-ops without RESEND_API_KEY, never
 * throws, and uses onboarding@resend.dev until the domain is verified.
 */
export async function notifyNewSignup(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_NOTIFY_TO ?? "mathiaslyhr@outlook.com";
  const from = process.env.FEEDBACK_NOTIFY_FROM ?? "Miflo <onboarding@resend.dev>";
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: "New Miflo waitlist signup",
      replyTo: "hello@miflo.dk",
      text: `New beta waitlist signup: ${email}\n\n— sent from miflo.dk`,
    });
  } catch {
    // Swallow: the signup is already saved in Supabase; email is a bonus.
  }
}
