"use client";

import { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";
import { IconCheck } from "@/components/icons";
import { supabase } from "@/lib/supabase";
import { usePortal } from "@/lib/usePortal";
import { money, hebDate } from "@/lib/format";

type Invoice = { id: string; number: string | null; amount: number; status: string; due_date: string | null; description: string | null; pay_link: string | null };

export default function InvoicesPage() {
  const { demo, loading, project } = usePortal();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sb = supabase();
    if (demo || !sb || !project) return;
    let cancelled = false;
    (async () => {
      const { data } = await sb.from("invoices").select("id,number,amount,status,due_date,description,pay_link").eq("project_id", project.id).order("created_at", { ascending: false });
      if (cancelled) return;
      setInvoices((data ?? []) as Invoice[]);
      setReady(true);
    })();
    return () => { cancelled = true; };
  }, [demo, project]);

  if (demo) return <DemoInvoices />;
  if (loading || (!ready && project)) return <div className="muted" style={{ padding: 40, textAlign: "center" }}>טוען…</div>;

  if (!project) {
    return (
      <section className="panel active" data-name="invoices">
        <div className="card pad" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 12, alignItems: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>אין עדיין פרויקטים משויכים</div>
          <div className="muted" style={{ fontSize: 13.5 }}>חשבוניות מופיעות אחרי שמשויך פרויקט.</div>
        </div>
      </section>
    );
  }

  const due = invoices.filter((i) => i.status === "לתשלום");
  const paid = invoices.filter((i) => i.status === "שולם");
  const paidSum = paid.reduce((s, i) => s + Number(i.amount), 0);
  const dueSum = due.reduce((s, i) => s + Number(i.amount), 0);

  return (
    <section className="panel active" data-name="invoices">
      {due.map((i) => (
        <div key={i.id} className="card pad" style={{ borderColor: "color-mix(in srgb,var(--red) 40%, transparent)", background: "var(--red-soft)" }}>
          <div className="row">
            <div>
              <span className="pill red">● לתשלום</span>
              <div className="bignum tnum" style={{ marginTop: 8 }}><CountUp value={Number(i.amount)} prefix="₪" /></div>
              <div style={{ fontSize: 13, color: "color-mix(in srgb,var(--red) 80%, var(--ink))", marginTop: 2 }}>
                חשבונית {i.number ?? ""}{i.description ? ` · ${i.description}` : ""}{i.due_date ? ` · עד ${hebDate(i.due_date)}` : ""}
              </div>
            </div>
            {i.pay_link ? (
              <a className="btn red" href={i.pay_link} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center" }}>שלם חשבונית</a>
            ) : (
              <button className="btn red">שלם חשבונית</button>
            )}
          </div>
        </div>
      ))}

      <div className="grid2">
        <div className="card pad"><div className="faint" style={{ fontSize: 12 }}>שולם עד כה</div><div className="bignum tnum" style={{ fontSize: 24, marginTop: 4 }}><CountUp value={paidSum} prefix="₪" /></div></div>
        <div className="card pad"><div className="faint" style={{ fontSize: 12 }}>נותר לתשלום</div><div className="bignum tnum" style={{ fontSize: 24, marginTop: 4, color: "var(--red)" }}><CountUp value={dueSum} prefix="₪" /></div></div>
      </div>

      <h3 className="sec">אפשרויות תשלום</h3>
      <div className="grid3">
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ fontWeight: 700 }}>תשלום מראש</div><div className="muted" style={{ fontSize: 13, flex: 1 }}>שלמו על שלבים הבאים להתקדמות רציפה.</div><button className="btn sm ghost">בחירת סכום</button></div>
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ fontWeight: 700 }}>תחזוקה חודשית</div><div className="muted" style={{ fontSize: 13, flex: 1 }}>הוראת קבע לתחזוקה ועדכונים.</div><button className="btn sm">הקמת תשלום</button></div>
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ fontWeight: 700 }}>בנק שעות</div><div className="muted" style={{ fontSize: 13, flex: 1 }}>חבילת שעות לשינויים קטנים.</div><button className="btn sm ghost">רכישת שעות</button></div>
      </div>

      <h3 className="sec">היסטוריית תשלומים</h3>
      {paid.length === 0 ? (
        <div className="card pad muted" style={{ fontSize: 13 }}>אין עדיין תשלומים.</div>
      ) : (
        <div className="card">
          {paid.map((i) => (
            <div className="li" key={i.id}>
              <div className="ic good"><IconCheck /></div>
              <div className="g"><div className="t">חשבונית {i.number ?? ""}{i.description ? ` · ${i.description}` : ""}</div><div className="s">שולם{i.due_date ? ` · ${hebDate(i.due_date)}` : ""}</div></div>
              <span className="amt tnum">{money(i.amount)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function DemoInvoices() {
  return (
    <section className="panel active" data-name="invoices">
      <div className="card pad" style={{ borderColor: "color-mix(in srgb,var(--red) 40%, transparent)", background: "var(--red-soft)" }}>
        <div className="row">
          <div>
            <span className="pill red">● לתשלום</span>
            <div className="bignum tnum" style={{ marginTop: 8 }}><CountUp value={4200} prefix="₪" /></div>
            <div style={{ fontSize: 13, color: "color-mix(in srgb,var(--red) 80%, var(--ink))", marginTop: 2 }}>חשבונית #0148 · מקדמה שלב 2 · עד 4 באוג׳</div>
          </div>
          <button className="btn red">שלם חשבונית</button>
        </div>
      </div>
      <div className="grid2">
        <div className="card pad"><div className="faint" style={{ fontSize: 12 }}>שולם עד כה</div><div className="bignum tnum" style={{ fontSize: 24, marginTop: 4 }}><CountUp value={18600} prefix="₪" /></div></div>
        <div className="card pad"><div className="faint" style={{ fontSize: 12 }}>נותר לתשלום</div><div className="bignum tnum" style={{ fontSize: 24, marginTop: 4, color: "var(--red)" }}><CountUp value={7400} prefix="₪" /></div></div>
      </div>
      <h3 className="sec">אפשרויות תשלום</h3>
      <div className="grid3">
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ fontWeight: 700 }}>תשלום מראש</div><div className="muted" style={{ fontSize: 13, flex: 1 }}>שלמו על שלבים הבאים להתקדמות רציפה.</div><button className="btn sm ghost">בחירת סכום</button></div>
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ fontWeight: 700 }}>תחזוקה חודשית</div><div className="muted" style={{ fontSize: 13, flex: 1 }}>הוראת קבע לתחזוקה ועדכונים.</div><button className="btn sm">הקמת תשלום</button></div>
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ fontWeight: 700 }}>בנק שעות</div><div className="muted" style={{ fontSize: 13, flex: 1 }}>חבילת שעות לשינויים קטנים.</div><button className="btn sm ghost">רכישת שעות</button></div>
      </div>
      <h3 className="sec">היסטוריית תשלומים</h3>
      <div className="card">
        <div className="li"><div className="ic good"><IconCheck /></div><div className="g"><div className="t">חשבונית #0142 · מקדמה שלב 1</div><div className="s">שולם · 2 ביולי</div></div><span className="amt tnum">₪10,400</span></div>
        <div className="li"><div className="ic good"><IconCheck /></div><div className="g"><div className="t">חשבונית #0119 · אפיון</div><div className="s">שולם · 20 ביוני</div></div><span className="amt tnum">₪8,200</span></div>
      </div>
    </section>
  );
}
