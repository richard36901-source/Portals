"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// קליינט Supabase לדפדפן — מפתח publishable בלבד. service_role לעולם לא מגיע לכאן.
let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  if (!client) {
    client = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // קישורי איפוס סיסמה ו-OAuth חוזרים עם טוקן ב-hash של ה-URL.
        detectSessionInUrl: true,
        flowType: "implicit",
      },
    });
  }
  return client;
}

// כתובת בסיס לקישורים שמגיעים במייל (אישור הרשמה, איפוס סיסמה).
// חייבת להיות כתובת ציבורית — קישור ל-localhost נשבר כשפותחים את המייל בטלפון.
// OAuth לעומת זאת נשאר על מקור הדפדפן הנוכחי, כי הוא חוזר לאותו מכשיר.
export function emailRedirect(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (base) return base + path;
  return (typeof window !== "undefined" ? window.location.origin : "") + path;
}
