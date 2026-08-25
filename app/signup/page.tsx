"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeSeg from "@/components/ThemeSeg";
import Logo from "@/components/Logo";
import { supabase, emailRedirect } from "@/lib/supabase";
import { fetchProvider, resolveTenant } from "@/lib/tenant";

// הרשמה: אימייל+סיסמה+שם ← יצירת משתמש, פרופיל, ושיוך לדייר של הדומיין.
export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  const submit = async () => {
    if (pw.length < 8) return setErr("הסיסמה צריכה להיות באורך 8 תווים לפחות.");
    const sb = supabase();
    if (!sb || !email) { router.push("/welcome"); return; }
    setBusy(true); setErr(null);
    const { data, error } = await sb.auth.signUp({
      email, password: pw,
      options: { data: { full_name: name }, emailRedirectTo: emailRedirect("/welcome") },
    });
    if (error) {
      setBusy(false);
      setErr(/registered|exists/i.test(error.message) ? "האימייל כבר רשום — נסו להתחבר או לאפס סיסמה." : "ההרשמה נכשלה: " + error.message);
      return;
    }
    // כשנדרש אישור אימייל, Supabase לא מחזיר סשן. אסור להמשיך כאילו נכנסנו —
    // זה מה שגרם למשתמש להיזרק החוצה ברגע הכניסה לפרויקט.
    if (!data.session) { setBusy(false); setConfirmSent(true); return; }
    // פרופיל + שיוך לדייר הנוכחי (אם ה-RLS מאפשר; אחרת ההזמנה תשויך בצד השרת)
    const user = data.user;
    if (user) {
      try {
        await sb.from("profiles").upsert({ id: user.id, full_name: name });
        const tenant = resolveTenant(location.hostname);
        if (tenant.mode === "tenant") {
          const provider = await fetchProvider(sb, tenant.slug);
          await sb.from("user_providers").upsert({ user_id: user.id, provider_id: provider.id, role: "client" });
        }
      } catch { /* שיוך יושלם דרך קישור הזמנה */ }
    }
    setBusy(false);
    router.push("/welcome");
  };

  return (
    <div className="view active" id="auth">
      <div className="auth-top"><ThemeSeg /></div>
      <div className="auth-card">
        <div className="auth-brand">
          <Logo size={76} radius={20} />
          <h1>יצירת חשבון</h1>
          <p>AutoScale · הצטרפות לפורטל הלקוחות</p>
        </div>
        {confirmSent ? (
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "center", alignItems: "center" }}>
          <div className="av" style={{ width: 54, height: 54, fontSize: 24 }}>✉️</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>נשאר לאמת את האימייל</div>
          <div className="muted" style={{ fontSize: 13.5 }}>
            שלחנו קישור אישור אל <b>{email}</b>. צריך ללחוץ עליו כדי להפעיל את החשבון — עד אז ההתחברות תיחסם. בדקו גם בתיקיית הספאם.
          </div>
          <Link href="/login" className="btn sm" style={{ display: "inline-flex", alignItems: "center" }}>אישרתי — למסך ההתחברות</Link>
        </div>
        ) : (
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="field" style={{ margin: 0 }}>
            <label className="fl">שם מלא</label>
            <input className="input" placeholder="ישראל ישראלי" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label className="fl">אימייל</label>
            <input className="input" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label className="fl">סיסמה</label>
            <input className="input" type="password" placeholder="לפחות 8 תווים" value={pw} onChange={(e) => setPw(e.target.value)} />
          </div>
          {err && <div style={{ color: "var(--red)", fontSize: 13, fontWeight: 600 }}>{err}</div>}
          <button className="btn block" onClick={submit} disabled={busy} style={{ opacity: busy ? 0.6 : 1 }}>{busy ? "יוצרים חשבון..." : "הרשמה"}</button>
          <div className="faint" style={{ fontSize: 12, textAlign: "center" }}>
            כבר יש חשבון? <Link href="/login" className="auth-link">התחברות</Link>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
