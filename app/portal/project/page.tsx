"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { supabase } from "@/lib/supabase";
import { usePortal } from "@/lib/usePortal";
import { money, hebDate } from "@/lib/format";

type Round = { id: string; number: number | null; title: string; status: string; created_at: string };

function pill(status: string | null): string {
  if (status === "הושלם" || status === "אושר") return "good";
  if (status === "בבנייה" || status === "בבדיקה") return "amber";
  return "ink";
}

export default function ProjectPage() {
  const { demo, loading, project } = usePortal();
  const [rounds, setRounds] = useState<Round[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sb = supabase();
    if (demo || !sb || !project) return;
    let cancelled = false;
    (async () => {
      const { data } = await sb.from("revision_rounds").select("id,number,title,status,created_at").eq("project_id", project.id).order("number", { ascending: true });
      if (cancelled) return;
      setRounds((data ?? []) as Round[]);
      setReady(true);
    })();
    return () => { cancelled = true; };
  }, [demo, project]);

  if (demo) return <DemoProject />;
  if (loading || (!ready && project)) return <div className="muted" style={{ padding: 40, textAlign: "center" }}>טוען…</div>;

  if (!project) {
    return (
      <section className="panel active" data-name="projects">
        <div className="card pad" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 12, alignItems: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>אין עדיין פרויקטים משויכים</div>
          <div className="muted" style={{ fontSize: 13.5, maxWidth: 320 }}>ברגע שנשייך לך פרויקט הוא יופיע כאן.</div>
          <Link href="/projects/new" className="btn sm" style={{ display: "inline-flex", alignItems: "center" }}>בקשת פרויקט</Link>
        </div>
      </section>
    );
  }

  const prog = Math.round(Number(project.progress ?? 0));
  const included = project.rounds_included ?? 0;
  const used = project.rounds_used ?? 0;

  return (
    <section className="panel active" data-name="projects">
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="row">
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{project.title}</div>
            <div className="muted" style={{ fontSize: 13 }}>
              {project.start_date ? `התחיל ${hebDate(project.start_date)}` : ""}
              {project.deadline ? ` · יעד ${hebDate(project.deadline)}` : ""}
            </div>
          </div>
          <span className={`pill ${pill(project.status)}`}>{project.status}</span>
        </div>
        <div className="track"><div className="fill" style={{ width: `${prog}%` }} /></div>
        <div className="grid3">
          <div className="card" style={{ padding: 14 }}><div className="faint" style={{ fontSize: 12 }}>שלב</div><div style={{ fontWeight: 700, marginTop: 2 }}>{project.phase ?? project.status}</div></div>
          <div className="card" style={{ padding: 14 }}><div className="faint" style={{ fontSize: 12 }}>דדליין מעודכן</div><div style={{ fontWeight: 700, marginTop: 2 }}>{hebDate(project.updated_deadline ?? project.deadline) || "—"}</div></div>
          <div className="card" style={{ padding: 14 }}><div className="faint" style={{ fontSize: 12 }}>סבבי תיקונים</div><div style={{ fontWeight: 700, marginTop: 2 }}>{used} / {included} בשימוש</div></div>
        </div>
      </div>

      <h3 className="sec">סבבי תיקונים <span style={{ textTransform: "none", fontWeight: 500, color: "var(--faint)" }}>· {included} כלולים בפרויקט</span></h3>
      {rounds.length === 0 ? (
        <div className="card pad muted" style={{ fontSize: 13 }}>אין עדיין סבבי תיקונים.</div>
      ) : (
        <div className="card">
          {rounds.map((r) => {
            const waiting = r.status.includes("ממתין");
            return (
              <div className="li" key={r.id}>
                <div className={`ic ${waiting ? "amber" : "good"}`}><LogoMark /></div>
                <div className="g"><div className="t">סבב #{r.number ?? ""} — {r.title}</div><div className="s">{r.status}{r.created_at ? ` · ${hebDate(r.created_at)}` : ""}</div></div>
                {waiting ? <button className="btn sm">בדיקה ואישור</button> : <span className="pill good">{r.status}</span>}
              </div>
            );
          })}
        </div>
      )}

      {used >= included && included > 0 && (
        <div className="card pad" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 700 }}>צריך סבב תיקונים נוסף?</div>
            <div className="muted" style={{ fontSize: 13 }}>{included} הסבבים הכלולים נוצלו. סבב נוסף בתשלום.</div>
          </div>
          <div style={{ textAlign: "left" }}><div className="bignum tnum" style={{ fontSize: 20 }}>{money(project.extra_round_price)}</div><div className="faint" style={{ fontSize: 11 }}>לסבב</div></div>
          <button className="btn">רכישת סבב נוסף</button>
        </div>
      )}

      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>בקשת פרויקט חדש</div>
        <div className="muted" style={{ fontSize: 13 }}>פותח את התהליך: תיאור ← הצעת מחיר ← אישור ותשלום.</div>
        <Link href="/projects/new" className="btn sm" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center" }}>התחלת בקשה</Link>
      </div>
    </section>
  );
}

function DemoProject() {
  return (
    <section className="panel active" data-name="projects">
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="row">
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>מיתוג ואתר תדמית</div>
            <div className="muted" style={{ fontSize: 13 }}>התחיל 1 ביולי · יעד 28 באוג׳</div>
          </div>
          <span className="pill amber">בבדיקה</span>
        </div>
        <div className="track"><div className="fill" style={{ width: "68%" }} /></div>
        <div className="grid3">
          <div className="card" style={{ padding: 14 }}><div className="faint" style={{ fontSize: 12 }}>שלב</div><div style={{ fontWeight: 700, marginTop: 2 }}>שלב 2 / 3</div></div>
          <div className="card" style={{ padding: 14 }}><div className="faint" style={{ fontSize: 12 }}>דדליין מעודכן</div><div style={{ fontWeight: 700, marginTop: 2 }}>18 באוג׳</div></div>
          <div className="card" style={{ padding: 14 }}><div className="faint" style={{ fontSize: 12 }}>סבבי תיקונים</div><div style={{ fontWeight: 700, marginTop: 2 }}>1 / 2 בשימוש</div></div>
        </div>
      </div>
      <h3 className="sec">סבבי תיקונים <span style={{ textTransform: "none", fontWeight: 500, color: "var(--faint)" }}>· 2 כלולים בפרויקט</span></h3>
      <div className="card">
        <div className="li"><div className="ic good"><LogoMark /></div><div className="g"><div className="t">סבב #1 — קונספט</div><div className="s">אושר · 10 ביולי</div></div><span className="pill good">אושר</span></div>
        <div className="li"><div className="ic amber"><LogoMark /></div><div className="g"><div className="t">סבב #2 — עיצוב מלא</div><div className="s">ממתין לבדיקתך · הועלה היום (הסבב האחרון הכלול)</div></div><button className="btn sm">בדיקה ואישור</button></div>
      </div>
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>בקשת פרויקט חדש</div>
        <div className="muted" style={{ fontSize: 13 }}>פותח את התהליך: תיאור ← הצעת מחיר ← אישור ותשלום.</div>
        <Link href="/projects/new" className="btn sm" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center" }}>התחלת בקשה</Link>
      </div>
    </section>
  );
}
