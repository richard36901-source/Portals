"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// מסך מעבר אחרי התחברות: הלוגו גדל, זוהר בצבעי המותג, ונעלם אל תוך הפורטל.
export default function WelcomeSplash() {
  const router = useRouter();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // מגיעים לכאן גם מקישור אימות אימייל ומחזרת Google — הטוקן יושב ב-hash.
    // ממתינים שהקליינט יקלוט אותו לפני שממשיכים, אחרת הסשן אובד בניווט.
    const sb = supabase();
    const session = sb ? sb.auth.getSession().then(() => undefined) : Promise.resolve(undefined);
    const timer = new Promise<void>((r) => setTimeout(r, reduced ? 400 : 2300));
    let cancelled = false;
    Promise.all([session, timer]).then(() => { if (!cancelled) router.replace("/projects"); });
    return () => { cancelled = true; };
  }, [router]);

  return (
    <div id="splash">
      <div className="halo h1" />
      <div className="halo h2" />
      <div className="slogo"><img src="/logo.png" alt="AutoScale" /></div>
      <div className="sname">AutoScale · פורטל לקוחות</div>
    </div>
  );
}
