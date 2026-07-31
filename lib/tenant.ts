import type { SupabaseClient } from "@supabase/supabase-js";

// ריבוי-דיירים לפי דומיין.
// דומיין מותאם (portal.X) ← דייר אחד, כניסה ישירה לפורטל שלו.
// דומיין פלטפורמה (app.*) ← מסך "הפורטלים שלי" עם כל הדיירים של המשתמש.
// כל שאילתה מסוננת לפי provider_id של הדייר שנפתר מה-hostname.

const DOMAIN_TO_SLUG: Record<string, string> = {
  "portal.autoscalehq.io": "autoscale",
  "portal.ishur.io": "ishur",
  localhost: "autoscale", // פיתוח מקומי
};

export type TenantResolution =
  | { mode: "tenant"; slug: string }
  | { mode: "hub" };

export function resolveTenant(hostname: string): TenantResolution {
  const host = hostname.split(":")[0].toLowerCase();
  if (host.startsWith("app.")) return { mode: "hub" };
  const slug = DOMAIN_TO_SLUG[host];
  if (slug) return { mode: "tenant", slug };
  // portal.<domain> לא מוכר — ברירת מחדל לדייר הראשי עד שיוגדר במפה
  return { mode: "tenant", slug: "autoscale" };
}

/** provider לפי slug — לקרוא פעם אחת ולסנן איתו כל שאילתה. */
export async function fetchProvider(sb: SupabaseClient, slug: string) {
  const { data, error } = await sb.from("providers").select("id, slug, name").eq("slug", slug).single();
  if (error) throw error;
  return data as { id: string; slug: string; name: string };
}

/** הדיירים שהמשתמש המחובר חבר בהם — למסך "הפורטלים שלי" בדומיין הפלטפורמה. */
export async function fetchMyProviders(sb: SupabaseClient) {
  const { data, error } = await sb
    .from("user_providers")
    .select("role, providers ( id, slug, name )");
  if (error) throw error;
  return (data ?? []) as unknown as { role: string; providers: { id: string; slug: string; name: string } }[];
}
