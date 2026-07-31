"use client";

/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";
import ObShell from "@/components/ObShell";

export default function ProjectSelectPage() {
  const router = useRouter();
  return (
    <ObShell>
      <div className="ostep active">
        <div className="ob-h">הפרויקטים שלך</div>
        <div className="ob-sub">בחרו פרויקט קיים או פתחו בקשה חדשה.</div>
        <div className="choose">
          <div className="pcard" onClick={() => router.push("/portal/dashboard")}>
            <img src="/logo.png" alt="" className="plogo" />
            <div className="pbody">
              <div className="ct">פרויקט #1 — מיתוג ואתר תדמית</div>
              <div className="pmeta">
                <span className="pill amber">בבנייה</span>
                <span className="pill ink">שלב 2 מתוך 3</span>
                <span className="faint" style={{ fontSize: 12.5 }}>עודכן היום</span>
              </div>
              <div className="track ptrack"><div className="fill" style={{ width: "68%" }} /></div>
              <div className="faint" style={{ fontSize: 12 }}>68% הושלמו</div>
            </div>
            <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>

          <div className="pcard new" onClick={() => router.push("/projects/new")}>
            <div className="plus">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
            </div>
            <div className="pbody">
              <div className="ct">בקשת פרויקט חדש</div>
              <div className="muted" style={{ fontSize: 13 }}>בנייה חדשה, בנק שעות או תחזוקה — הצעת מחיר תוך יום עסקים</div>
            </div>
            <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
    </ObShell>
  );
}
