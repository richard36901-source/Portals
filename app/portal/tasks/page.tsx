"use client";

import { useEffect, useState } from "react";
import LogoMark from "@/components/LogoMark";
import { IconInfo } from "@/components/icons";
import { supabase } from "@/lib/supabase";
import { usePortal } from "@/lib/usePortal";
import { money } from "@/lib/format";

type Task = { id: string; title: string; status: string; price: number | null };

function meta(status: string): { ic: string; pill: string } {
  if (status === "הושלם" || status === "בביצוע") return { ic: "good", pill: "good" };
  if (status === "ממתין לאישור") return { ic: "amber", pill: "amber" };
  if (status === "דורש תשלום") return { ic: "red", pill: "red" };
  return { ic: "ink", pill: "ink" };
}

export default function TasksPage() {
  const { demo, loading, provider, project } = usePortal();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const sb = supabase();
    if (!sb || !project) return;
    const { data } = await sb.from("tasks").select("id,title,status,price").eq("project_id", project.id).order("created_at", { ascending: false });
    setTasks((data ?? []) as Task[]);
    setReady(true);
  };

  useEffect(() => {
    if (demo || !project) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, project]);

  const requestTask = async () => {
    const sb = supabase();
    if (!sb || !provider || !project) return;
    const title = window.prompt("מה תרצו שנעשה? (תיאור קצר של המשימה)");
    if (!title || !title.trim()) return;
    setBusy(true);
    const { data: u } = await sb.auth.getUser();
    await sb.from("tasks").insert({
      provider_id: provider.id,
      project_id: project.id,
      title: title.trim(),
      status: "ממתין לאישור",
      requested_by: u.user?.id ?? null,
    });
    await load();
    setBusy(false);
  };

  if (demo) return <DemoTasks />;
  if (loading || (!ready && project)) return <div className="muted" style={{ padding: 40, textAlign: "center" }}>טוען…</div>;

  if (!project) {
    return (
      <section className="panel active" data-name="tasks">
        <div className="card pad" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 12, alignItems: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>אין עדיין פרויקטים משויכים</div>
          <div className="muted" style={{ fontSize: 13.5 }}>משימות מופיעות אחרי שמשויך פרויקט.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel active" data-name="tasks">
      <div className="row"><h3 className="sec" style={{ margin: 0 }}>המשימות שלך</h3><button className="btn sm" onClick={requestTask} disabled={busy} style={{ opacity: busy ? 0.6 : 1 }}>{busy ? "שולח…" : "בקשת משימה חדשה"}</button></div>
      {tasks.length === 0 ? (
        <div className="card pad muted" style={{ fontSize: 13 }}>אין עדיין משימות. לחצו &quot;בקשת משימה חדשה&quot; כדי לפתוח בקשה.</div>
      ) : (
        <div className="card">
          {tasks.map((t) => {
            const m = meta(t.status);
            const payRequired = t.status === "דורש תשלום";
            return (
              <div className="taskbox" key={t.id}>
                <div className="row">
                  <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
                    <div className="li" style={{ padding: 0 }}><div className={`ic ${m.ic}`}><LogoMark /></div></div>
                    <div><div style={{ fontWeight: 600 }}>{t.title}</div><div className="muted" style={{ fontSize: 12.5 }}>{t.status}</div></div>
                  </div>
                  {payRequired ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="tnum" style={{ fontWeight: 700 }}>{money(t.price)}</span><button className="btn red sm">תשלום ואישור</button></div>
                  ) : (
                    <span className={`pill ${m.pill}`}>{t.status}</span>
                  )}
                </div>
                <div className="notes-in"><input className="input" placeholder="הוספת הערה למשימה..." /><button className="btn ghost sm">הערה</button></div>
              </div>
            );
          })}
        </div>
      )}
      <div className="note"><IconInfo /><div>משימה מחוץ למסגרת מציגה כפתור תשלום בסכום שנקבע. לאחר התשלום היא עוברת אוטומטית לביצוע ומופיעה בצ&apos;אט ובעדכונים. הערות על משימה מרוכזות גם הן בצ&apos;אט.</div></div>
    </section>
  );
}

function DemoTasks() {
  return (
    <section className="panel active" data-name="tasks">
      <div className="row"><h3 className="sec" style={{ margin: 0 }}>המשימות שלך</h3><button className="btn sm">בקשת משימה חדשה</button></div>
      <div className="card">
        <div className="taskbox">
          <div className="row">
            <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
              <div className="li" style={{ padding: 0 }}><div className="ic good"><LogoMark /></div></div>
              <div><div style={{ fontWeight: 600 }}>הוספת עמוד &quot;אודות&quot;</div><div className="muted" style={{ fontSize: 12.5 }}>אושר · בביצוע</div></div>
            </div>
            <span className="pill good">אושר</span>
          </div>
          <div className="notes-in"><input className="input" placeholder="הוספת הערה למשימה..." /><button className="btn ghost sm">הערה</button></div>
        </div>
        <div className="taskbox">
          <div className="row">
            <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
              <div className="li" style={{ padding: 0 }}><div className="ic amber"><LogoMark /></div></div>
              <div><div style={{ fontWeight: 600 }}>אינטגרציה למערכת דיוור</div><div className="muted" style={{ fontSize: 12.5 }}>ממתין לאישורך</div></div>
            </div>
            <span className="pill amber">ממתין לאישור</span>
          </div>
          <div className="notes-in"><input className="input" placeholder="הוספת הערה למשימה..." /><button className="btn ghost sm">הערה</button></div>
        </div>
        <div className="taskbox">
          <div className="row">
            <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
              <div className="li" style={{ padding: 0 }}><div className="ic red"><LogoMark /></div></div>
              <div><div style={{ fontWeight: 600 }}>שדרוג אחסון + תוסף מהירות</div><div className="muted" style={{ fontSize: 12.5 }}>מחוץ למסגרת — דורש תשלום לפני אישור</div></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="tnum" style={{ fontWeight: 700 }}>₪780</span><button className="btn red sm">תשלום ואישור</button></div>
          </div>
          <div className="notes-in"><input className="input" placeholder="הוספת הערה למשימה..." /><button className="btn ghost sm">הערה</button></div>
        </div>
      </div>
      <div className="note"><IconInfo /><div>משימה מחוץ למסגרת מציגה כפתור תשלום בסכום שנקבע. לאחר התשלום היא עוברת אוטומטית לביצוע ומופיעה בצ&apos;אט ובעדכונים. הערות על משימה מרוכזות גם הן בצ&apos;אט.</div></div>
    </section>
  );
}
