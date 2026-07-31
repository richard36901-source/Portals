"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeSeg from "@/components/ThemeSeg";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const enter = async () => {
    const sb = supabase();
    if (!sb || !email) { router.push("/welcome"); return; } // דמו כשאין חיבור
    setBusy(true); setErr(null);
    const { error } = await sb.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) { setErr("אימייל או סיסמה שגויים. אפשר לאפס סיסמה בקישור למטה."); return; }
    router.push("/welcome");
  };

  const google = async () => {
    const sb = supabase();
    if (!sb) { router.push("/welcome"); return; }
    await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${location.origin}/welcome` } });
  };
  return (
    <div className="view active" id="auth">
      <div className="auth-top">
        <ThemeSeg />
      </div>
      <div className="auth-card">
        <div className="auth-brand">
          <Logo size={76} radius={20} />
          <h1>פורטל לקוחות</h1>
          <p>AutoScale · כניסה לאזור האישי</p>
        </div>
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="field" style={{ margin: 0 }}>
            <label className="fl">אימייל</label>
            <input className="input" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label className="fl">סיסמה</label>
            <input className="input" type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} />
          </div>
          {err && <div style={{ color: "var(--red)", fontSize: 13, fontWeight: 600 }}>{err}</div>}
          <button className="btn block" onClick={enter} disabled={busy} style={{ opacity: busy ? 0.6 : 1 }}>{busy ? "מתחברים..." : "התחברות"}</button>
          <button className="btn ghost block" onClick={google}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: -3 }}><path d="M21 12.2c0-.6-.05-1.2-.16-1.7H12v3.3h5c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1C19.9 17.5 21 15.1 21 12.2Z" fill="#4285F4" /><path d="M12 21c2.4 0 4.5-.8 6-2.2l-3.1-2.4c-.8.6-1.9.9-2.9.9-2.3 0-4.2-1.5-4.9-3.6H3.9v2.5C5.4 19.2 8.5 21 12 21Z" fill="#34A853" /><path d="M7.1 13.7c-.2-.6-.3-1.1-.3-1.7s.1-1.2.3-1.7V7.8H3.9C3.3 9 3 10.5 3 12s.3 3 1 4.2l3.1-2.5Z" fill="#FBBC05" /><path d="M12 6.6c1.3 0 2.4.5 3.3 1.3l2.5-2.5C16.5 3.9 14.4 3 12 3 8.5 3 5.4 4.8 3.9 7.8L7.1 10.3C7.8 8.1 9.7 6.6 12 6.6Z" fill="#EA4335" /></svg>
            {" "}המשך עם Google
          </button>
          <div className="faint" style={{ fontSize: 12, textAlign: "center" }}>
            <Link href="/forgot" className="auth-link">שכחתם סיסמה?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
