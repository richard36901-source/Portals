"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeSeg from "@/components/ThemeSeg";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

// שחזור סיסמה: מזינים אימייל, נשלח קישור איפוס.
// שליחת האימייל בפועל מתחברת ל-Supabase Auth בשלב חיבור הנתונים.
export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="view active" id="auth">
      <div className="auth-top"><ThemeSeg /></div>
      <div className="auth-card">
        <div className="auth-brand">
          <Logo size={76} radius={20} />
          <h1>איפוס סיסמה</h1>
          <p>נשלח לך קישור לבחירת סיסמה חדשה</p>
        </div>
        {!sent ? (
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="field" style={{ margin: 0 }}>
              <label className="fl">אימייל</label>
              <input className="input" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className="btn block" onClick={async () => {
              const sb = supabase();
              if (sb && email) await sb.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/reset` });
              setSent(true);
            }}>שליחת קישור איפוס</button>
            <div className="faint" style={{ fontSize: 12, textAlign: "center" }}>
              נזכרת בסיסמה? <Link href="/login" className="auth-link">חזרה להתחברות</Link>
            </div>
          </div>
        ) : (
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "center", alignItems: "center" }}>
            <div className="av" style={{ width: 54, height: 54, fontSize: 24 }}>✉️</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>הקישור בדרך אליך</div>
            <div className="muted" style={{ fontSize: 13.5 }}>
              אם קיים חשבון עבור <b>{email || "האימייל שהוזן"}</b>, ישלח אליו ברגעים אלה קישור לאיפוס הסיסמה. הקישור תקף לשעה.
            </div>
            <Link href="/login" className="auth-link" style={{ fontSize: 13 }}>חזרה להתחברות</Link>
          </div>
        )}
      </div>
    </div>
  );
}
