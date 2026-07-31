"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeSeg from "@/components/ThemeSeg";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

// בחירת סיסמה חדשה (המסך שנפתח מהקישור באימייל).
export default function ResetPasswordPage() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (pw.length < 8) return setError("הסיסמה צריכה להיות באורך 8 תווים לפחות.");
    if (pw !== pw2) return setError("הסיסמאות לא זהות.");
    setError(null);
    const sb = supabase();
    if (sb) {
      const { error } = await sb.auth.updateUser({ password: pw });
      if (error) return setError("עדכון הסיסמה נכשל — יש להיכנס דרך הקישור שנשלח באימייל.");
    }
    setDone(true);
    setTimeout(() => router.replace("/login"), 1800);
  };

  return (
    <div className="view active" id="auth">
      <div className="auth-top"><ThemeSeg /></div>
      <div className="auth-card">
        <div className="auth-brand">
          <Logo size={76} radius={20} />
          <h1>סיסמה חדשה</h1>
          <p>בחרו סיסמה חזקה — לפחות 8 תווים</p>
        </div>
        {!done ? (
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="field" style={{ margin: 0 }}>
              <label className="fl">סיסמה חדשה</label>
              <input className="input" type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} />
            </div>
            <div className="field" style={{ margin: 0 }}>
              <label className="fl">אימות סיסמה</label>
              <input className="input" type="password" placeholder="••••••••" value={pw2} onChange={(e) => setPw2(e.target.value)} />
            </div>
            {error && <div style={{ color: "var(--red)", fontSize: 13, fontWeight: 600 }}>{error}</div>}
            <button className="btn block" onClick={submit}>עדכון הסיסמה</button>
            <div className="faint" style={{ fontSize: 12, textAlign: "center" }}>
              <Link href="/login" className="auth-link">חזרה להתחברות</Link>
            </div>
          </div>
        ) : (
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "center", alignItems: "center" }}>
            <div className="av" style={{ width: 54, height: 54, fontSize: 24 }}>✓</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>הסיסמה עודכנה</div>
            <div className="muted" style={{ fontSize: 13.5 }}>מעבירים אותך להתחברות…</div>
          </div>
        )}
      </div>
    </div>
  );
}
