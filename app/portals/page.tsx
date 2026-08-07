"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ObShell from "@/components/ObShell";
import { supabase } from "@/lib/supabase";
import { fetchMyProviders } from "@/lib/tenant";

// דומיין הפלטפורמה (portals.*): "הפורטלים שלי" — כל הדיירים שהמשתמש חבר בהם.
export default function MyPortalsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<{ role: string; providers: { id: string; slug: string; name: string } }[] | null>(null);
  const [needLogin, setNeedLogin] = useState(false);

  useEffect(() => {
    const sb = supabase();
    if (!sb) { setRows([]); return; }
    sb.auth.getUser().then(async ({ data }) => {
      if (!data.user) { setNeedLogin(true); return; }
      try {
        setRows(await fetchMyProviders(sb));
      } catch {
        setRows([]);
      }
    });
  }, []);

  return (
    <ObShell>
      <div className="ostep active">
        <div className="ob-h">הפורטלים שלי</div>
        <div className="ob-sub">כל הפורטלים שיש לך גישה אליהם, במקום אחד.</div>
        <div className="choose">
          {needLogin && (
            <div className="card pad" style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>צריך להתחבר קודם</div>
              <Link href="/login" className="btn sm" style={{ display: "inline-flex", alignItems: "center" }}>מעבר להתחברות</Link>
            </div>
          )}
          {rows?.map((r) => (
            <div key={r.providers.id} className="pcard" onClick={() => router.push("/portal/dashboard")}>
              <img src="/logo.png" alt="" className="plogo" />
              <div className="pbody">
                <div className="ct">{r.providers.name}</div>
                <div className="pmeta"><span className="pill ink">{r.role}</span></div>
              </div>
              <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          ))}
          {rows && rows.length === 0 && !needLogin && (
            <div className="muted" style={{ textAlign: "center", fontSize: 13.5 }}>אין עדיין פורטלים משויכים לחשבון הזה.</div>
          )}
        </div>
      </div>
    </ObShell>
  );
}
