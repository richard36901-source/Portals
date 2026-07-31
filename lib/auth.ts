/**
 * lib/auth.ts — התחברות (Supabase Auth).
 *
 * שלב הבא (כשמחברים Supabase):
 *   npm install @supabase/supabase-js @supabase/ssr
 * ואז מחליפים את ה-stubs כאן בקריאות אמיתיות:
 *   - signInWithPassword / resetPasswordForEmail / updateUser (שינוי סיסמה)
 *   - MFA (2FA): supabase.auth.mfa.enroll / challenge / verify
 *
 * מיפוי משתמש ← Monday: האימייל של המשתמש מופיע בעמודת "אימיילים של חברי צוות"
 * בפריט הפרויקט בלוח (ראו lib/monday.ts → listProjectsForUser).
 */

export interface PortalUser {
  email: string;
  name: string;
  company: string;
  role: "מנהל" | "שותף" | "צפייה";
}

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY חסרים ב-.env.local");
  }
  return { url, anonKey };
}
