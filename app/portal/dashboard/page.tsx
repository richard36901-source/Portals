"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import { IconRefresh } from "@/components/icons";
import { supabase } from "@/lib/supabase";
import { usePortal } from "@/lib/usePortal";
import { money, hebDate } from "@/lib/format";

type Milestone = { id: string; title: string; status: string; due_date: string | null; note: string | null; position: number | null };
type Action = { key: string; tone: "red" | "blue" | "teal"; title: string; sub: string; href: string; cta: string };

function pill(status: string | null): string {
  if (status === "הושלם") return "good";
  if (status === "בבנייה" || status === "בבדיקה") return "amber";
  return "ink";
}

export default function DashboardPage() {
  const { demo, loading, project } = usePortal();
  const [ms, setMs] = useState<Milestone[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sb = supabase();
    if (demo || !sb || !project) return;
    let cancelled = false;
    (async () => {
      const [msRes, invRes, taskRes, rrRes] = await Promise.all([
        sb.from("milestones").select("id,title,status,due_date,note,position").eq("project_id", project.id).order("position", { ascending: true }),
        sb.from("invoices").select("id,number,amount,status").eq("project_id", project.id).eq("status", "לתשלום"),
        sb.from("tasks").select("id,title,status").eq("project_id", project.id).eq("status", "ממתין לאישור"),
        sb.from("revision_rounds").select("id,number,status").eq("project_id", project.id).ilike("status", "%ממתין%"),
      ]);
      if (cancelled) return;
      setMs((msRes.data ?? []) as Milestone[]);
      const acts: Action[] = [];
      (invRes.data ?? []).forEach((i: { id: string; number: string | null; amount: number }) =>
        acts.push({ key: "inv" + i.id, tone: "red", title: `תשלום חשבונית ${i.number ?? ""} — ${money(i.amount)}`, sub: "יש להסדיר כדי להמשיך בפרויקט.", href: "/portal/invoices", cta: "שלם עכשיו" }));
      (rrRes.data ?? []).forEach((r: { id: string; number: number | null }) =>
        acts.push({ key: "rr" + r.id, tone: "teal", title: `סבב תיקונים #${r.number ?? ""} ממתין לבדיקתך`, sub: "העלינו גרסה מעודכנת — לאישור או הערות.", href: "/portal/project", cta: "בדיקה" }));
      (taskRes.data ?? []).forEach((t: { id: string; title: string }) =>
        acts.push({ key: "tk" + t.id, tone: "blue", title: `משימה ממתינה לאישור: ${t.title}`, sub: "יש לאשר כדי שנמשיך בביצוע.", href: "/portal/tasks", cta: "לאישור" }));
      setActions(acts);
      setReady(true);
    })();
    return () => { cancelled = true; };
  }, [demo, project]);

  // ---- דמו (ללא env) — התצוגה המקורית ----
  if (demo) return <DemoDashboard />;
  if (loading || (!ready && project)) return <div className="muted" style={{ padding: 40, textAlign: "center" }}>טוען…</div>;

  // ---- אין פרויקטים משויכים ----
  if (!project) {
    return (
      <section className="panel active" data-name="dash">
        <div className="card pad" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 12, alignItems: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>אין עדיין פרויקטים משויכים</div>
          <div className="muted" style={{ fontSize: 13.5, maxWidth: 320 }}>ברגע שנשייך לך פרויקט הוא יופיע כאן. אפשר גם לפתוח בקשה חדשה.</div>
          <Link href="/projects/new" className="btn sm" style={{ display: "inline-flex", alignItems: "center" }}>בקשת פרויקט</Link>
        </div>
      </section>
    );
  }

  const budget = Number(project.budget ?? 0);
  const paid = Number(project.paid ?? 0);
  const remaining = Math.max(0, budget - paid);
  const pct = budget > 0 ? Math.round((paid / budget) * 100) : 0;
  const prog = Math.round(Number(project.progress ?? 0));
  const doneCount = ms.filter((m) => m.status === "הושלם").length;

  return (
    <section className="panel active" data-name="dash">
      {actions.length > 0 && (
        <div className="todo-card">
          <div className="todo-hd">
            <span style={{ color: "#ff8a8a" }}>●</span> פעולות נדרשות · עד להסדרתן חלק מהאפשרויות נעולות
            <span className="cnt">{actions.length}</span>
          </div>
          {actions.map((a) => (
            <div className="todo-row" key={a.key}>
              <div className={`ti ${a.tone}`}>
                {a.tone === "teal" ? <IconRefresh size={19} /> : (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="16.5" r="1.2" fill="currentColor" /><path d="M12 3 2 20h20L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                )}
              </div>
              <div className="tg">
                <div className="tt">{a.title}</div>
                <div className="td">{a.sub}</div>
              </div>
              <Link href={a.href} className={`btn ${a.tone === "red" ? "red" : "ghost"} sm`} style={{ display: "inline-flex", alignItems: "center" }}>{a.cta}</Link>
            </div>
          ))}
        </div>
      )}

      <div className="grid2">
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 10, padding: "15px 18px" }}>
          <div className="row">
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{project.title}</div>
              <div className="muted" style={{ fontSize: 12.5 }}>{[project.phase, project.status].filter(Boolean).join(" · ")}</div>
            </div>
            <span className={`pill ${pill(project.status)}`}>{project.status}</span>
          </div>
          <div>
            <div className="row" style={{ alignItems: "baseline" }}><span className="bignum tnum" style={{ fontSize: 25 }}><CountUp value={prog} suffix="%" /></span><span className="faint" style={{ fontSize: 12 }}>התקדמות</span></div>
            <div className="track" style={{ marginTop: 6, height: 6 }}><div className="fill" style={{ width: `${prog}%` }} /></div>
          </div>
          {(project.updated_deadline || project.delay_note) && (
            <div className="note">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto", marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div>
                {project.updated_deadline && <><b>דדליין עודכן:</b> {hebDate(project.deadline)} ← <b>{hebDate(project.updated_deadline)}</b>. </>}
                {project.delay_note}
              </div>
            </div>
          )}
        </div>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 9, padding: "15px 18px" }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>סיכום תשלומים</div>
          <div className="row" style={{ alignItems: "baseline" }}>
            <div><div className="faint" style={{ fontSize: 12 }}>שולם עד כה</div><div className="bignum tnum" style={{ fontSize: 22 }}><CountUp value={paid} prefix="₪" /></div></div>
            <div style={{ textAlign: "left" }}><div className="faint" style={{ fontSize: 12 }}>נותר</div><div className="bignum tnum" style={{ fontSize: 22, color: "var(--red)" }}><CountUp value={remaining} prefix="₪" /></div></div>
          </div>
          <div className="track" style={{ height: 6 }}><div className="fill" style={{ width: `${pct}%` }} /></div>
          <div className="faint" style={{ fontSize: 12 }}>{pct}% מתקציב {money(budget)}</div>
          <div className="btnrow">
            <Link href="/portal/invoices" className="btn sm" style={{ display: "inline-flex", alignItems: "center" }}>כל התשלומים</Link>
            <Link href="/portal/invoices" className="btn ghost sm" style={{ display: "inline-flex", alignItems: "center" }}>תשלום מראש</Link>
          </div>
        </div>
      </div>

      <div className="card pad">
        <div className="row" style={{ marginBottom: 6 }}><div style={{ fontWeight: 700 }}>אבני דרך ולוחות זמנים</div><span className="pill ink">{doneCount} / {ms.length} הושלמו</span></div>
        {ms.length === 0 ? (
          <div className="muted" style={{ fontSize: 13, padding: "8px 2px" }}>אין עדיין אבני דרך.</div>
        ) : (
          <div className="ms">
            {ms.map((m) => {
              const cls = m.status === "הושלם" ? "m done" : m.status === "בתהליך" ? "m now" : "m";
              const sub = m.status === "הושלם" ? `הושלם · ${hebDate(m.due_date)}` : m.status === "בתהליך" ? `בתהליך · יעד ${hebDate(m.due_date)}` : `יעד ${hebDate(m.due_date)}`;
              return (
                <div className={cls} key={m.id}>
                  <div className="k"><span className="d" /></div>
                  <div className="info"><div className="t">{m.title}</div><div className="s">{sub}{m.note ? ` · ${m.note}` : ""}</div></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// ---- תצוגת דמו מקורית (ללא env) ----
function DemoDashboard() {
  return (
    <section className="panel active" data-name="dash">
      <div className="todo-card">
        <div className="todo-hd">
          <span style={{ color: "#ff8a8a" }}>●</span> פעולות נדרשות · עד להסדרתן חלק מהאפשרויות נעולות
          <span className="cnt">3</span>
        </div>
        <div className="todo-row">
          <div className="ti red"><svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="16.5" r="1.2" fill="currentColor" /><path d="M12 3 2 20h20L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></div>
          <div className="tg"><div className="tt">תשלום חשבונית #0148 — ₪4,200</div><div className="td">יש להסדיר כדי להמשיך בפרויקט.</div></div>
          <Link href="/portal/invoices" className="btn red sm" style={{ display: "inline-flex", alignItems: "center" }}>שלם עכשיו</Link>
        </div>
        <div className="todo-row">
          <div className="ti blue"><svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M5 5h11l3 3v11H5V5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 13l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <div className="tg"><div className="tt">חתימה על חוזה — הרחבת מערכת</div><div className="td">ההצעה אושרה. נותרה חתימה דיגיטלית.</div></div>
          <button className="btn ghost sm">לחתימה</button>
        </div>
        <div className="todo-row">
          <div className="ti teal"><IconRefresh size={19} /></div>
          <div className="tg"><div className="tt">סבב תיקונים #2 ממתין לבדיקתך</div><div className="td">העלינו גרסה מעודכנת — לאישור או הערות.</div></div>
          <Link href="/portal/project" className="btn ghost sm" style={{ display: "inline-flex", alignItems: "center" }}>בדיקה</Link>
        </div>
      </div>
      <div className="grid2">
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 10, padding: "15px 18px" }}>
          <div className="row">
            <div><div style={{ fontSize: 16, fontWeight: 700 }}>מיתוג ואתר תדמית</div><div className="muted" style={{ fontSize: 12.5 }}>שלב 2 מתוך 3 · בבדיקה</div></div>
            <span className="pill amber">בבדיקה</span>
          </div>
          <div>
            <div className="row" style={{ alignItems: "baseline" }}><span className="bignum tnum" style={{ fontSize: 25 }}><CountUp value={68} suffix="%" /></span><span className="faint" style={{ fontSize: 12 }}>התקדמות</span></div>
            <div className="track" style={{ marginTop: 6, height: 6 }}><div className="fill" style={{ width: "68%" }} /></div>
          </div>
          <div className="note">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto", marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div><b>דדליין עודכן:</b> 12 באוג׳ ← <b>18 באוג׳</b>. העיכוב נגרם כי גישת השרת טרם התקבלה — שיתוף הגישה יאיץ אותנו.</div>
          </div>
        </div>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 9, padding: "15px 18px" }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>סיכום תשלומים</div>
          <div className="row" style={{ alignItems: "baseline" }}>
            <div><div className="faint" style={{ fontSize: 12 }}>שולם עד כה</div><div className="bignum tnum" style={{ fontSize: 22 }}><CountUp value={18600} prefix="₪" /></div></div>
            <div style={{ textAlign: "left" }}><div className="faint" style={{ fontSize: 12 }}>נותר</div><div className="bignum tnum" style={{ fontSize: 22, color: "var(--red)" }}><CountUp value={7400} prefix="₪" /></div></div>
          </div>
          <div className="track" style={{ height: 6 }}><div className="fill" style={{ width: "71%" }} /></div>
          <div className="faint" style={{ fontSize: 12 }}>71% מתקציב ₪26,000</div>
          <div className="btnrow">
            <Link href="/portal/invoices" className="btn sm" style={{ display: "inline-flex", alignItems: "center" }}>כל התשלומים</Link>
            <Link href="/portal/invoices" className="btn ghost sm" style={{ display: "inline-flex", alignItems: "center" }}>תשלום מראש</Link>
          </div>
        </div>
      </div>
      <div className="card pad">
        <div className="row" style={{ marginBottom: 6 }}><div style={{ fontWeight: 700 }}>אבני דרך ולוחות זמנים</div><span className="pill ink">3 / 6 הושלמו</span></div>
        <div className="ms">
          <div className="m done"><div className="k"><span className="d" /></div><div className="info"><div className="t">אפיון ומחקר</div><div className="s">הושלם · 3 ביולי</div></div></div>
          <div className="m done"><div className="k"><span className="d" /></div><div className="info"><div className="t">קונספט עיצובי</div><div className="s">הושלם · 15 ביולי</div></div></div>
          <div className="m now"><div className="k"><span className="d" /></div><div className="info"><div className="t">עיצוב מלא + סבב תיקונים #2</div><div className="s">בתהליך · יעד 6 באוג׳</div></div></div>
          <div className="m"><div className="k"><span className="d" /></div><div className="info"><div className="t">פיתוח האתר</div><div className="s">יעד 18 באוג׳</div></div></div>
          <div className="m"><div className="k"><span className="d" /></div><div className="info"><div className="t">בדיקות והשקה</div><div className="s">יעד 28 באוג׳</div></div></div>
        </div>
      </div>
    </section>
  );
}
