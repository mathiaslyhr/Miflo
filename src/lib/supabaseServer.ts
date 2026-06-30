import { createClient } from "@supabase/supabase-js";

/**
 * Stateless anonymous Supabase client for server-side use (the feedback action).
 * Mirrors the app: anonymous auth, then a write through the submit_feedback RPC.
 * No session is persisted — each request signs in fresh and is thrown away.
 */
export function createAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars are not configured");
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
