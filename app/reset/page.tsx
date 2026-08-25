"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeSeg from "@/components/ThemeSeg";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

// בחירת סיסמה חדשה (המסך שנפתח מהקישור באימייל).
// הקישור מגיע עם טוקן ב-hash של ה-URL; יוצרים את הקליינט כבר בטעינת העמוד
// וממתינים שהסשן ייקלט — אחרת עדכון הסיסמה יוצא לפני שיש סשן ונכשל.
export default function ResetPasswordPage() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [link, setLink] = useState<"checking" | "ok" | "missing">("checking");

  useEffect(() => {
    const sb = supabase();
    if (!sb) {
      setLink("ok"); // דמו ללא env
      return;
    }
    let alive = true;
    const { data: sub } = sb.auth.onAuthStateChange((event, session) => {
      if (alive && session && (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        setLink("ok");
      }
    });
    sb.auth.getSession().then(({ data }) => {
      if (alive) setLink(data.session ? "ok" : "missing");
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const submit = async () => {
    if (pw.length < 8) return setError("הסיסמה צריכה להיות באורך 8 תווים לפחות.");
    if (pw !== pw2) return setError("הסיסמאות לא זהות.");
    setError(null);
    const sb = supabase();
    if (sb) {
      setBusy(true);
      const { error } = await sb.auth.updateUser({ password: pw });
      setBusy(false);
      if (error) {
        setError(
          /session|logged|jwt/i.test(error.message)
            ? "הקישור פג תוקף. בקשו קישור איפוס חדש ופתחו אותו מיד."
            : "עדכון הסיסמה נכשל: " + error.message
        );
        return;
      }
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
        {done ? (
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "center", alignItems: "center" }}>
            <div className="av" style={{ width: 54, height: 54, fontSize: 24 }}>✓</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>הסיסמה עודכנה</div>
            <div className="muted" style={{ fontSize: 13.5 }}>מעבירים אותך להתחברות…</div>
          </div>
        ) : link === "missing" ? (
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "center", alignItems: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>הקישור אינו בתוקף</div>
            <div className="muted" style={{ fontSize: 13.5 }}>
              צריך לפתוח את המסך הזה מהקישור שנשלח לאימייל, ובתוך שעה מרגע השליחה.
            </div>
            <Link href="/forgot" className="btn sm" style={{ display: "inline-flex", alignItems: "center" }}>בקשת קישור חדש</Link>
          </div>
        ) : (
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
            <button
              className="btn block"
              onClick={submit}
              disabled={busy || link === "checking"}
              style={{ opacity: busy || link === "checking" ? 0.6 : 1 }}
            >
              {link === "checking" ? "מאמתים את הקישור…" : busy ? "מעדכנים…" : "עדכון הסיסמה"}
            </button>
            <div className="faint" style={{ fontSize: 12, textAlign: "center" }}>
              <Link href="/login" className="auth-link">חזרה להתחברות</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
