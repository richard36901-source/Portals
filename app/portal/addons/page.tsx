"use client";

import { useState } from "react";
import LogoMark from "@/components/LogoMark";
import { IconBuild, IconChat, IconClockLg, IconRefresh } from "@/components/icons";

const ADDONS = [
  { id: "whatsapp", title: "אוטומציית וואטסאפ", sub: "התראות ותזכורות אוטומטיות ללקוחות שלכם · חודשי", price: 240, icon: <IconChat size={22} /> },
  { id: "landing", title: "דף נחיתה נוסף", sub: "עמוד קמפיין ממותג עם טופס לידים", price: 1200, icon: <IconBuild size={22} /> },
  { id: "hours", title: "חבילת 5 שעות פיתוח", sub: "לשינויים ותוספות קטנות לפי הצורך", price: 1500, icon: <IconClockLg size={22} /> },
  {
    id: "sla", title: "תמיכה בעדיפות (SLA)", sub: "מענה מהיר ותיעדוף פניות · חודשי", price: 350,
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.4L12 21l-5 2.6 1-5.4-4-3.9 5.5-.8L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
  },
  { id: "revision", title: "סבב תיקונים נוסף", sub: "מעבר ל-2 הסבבים הכלולים בפרויקט", price: 450, icon: <IconRefresh size={22} /> },
];

export default function AddonsPage() {
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const items = ADDONS.filter((a) => added[a.id]);
  const total = items.reduce((sum, a) => sum + a.price, 0);
  const count = items.length;

  return (
    <section className="panel active" data-name="addons">
      <div className="card pad hero-grad" style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 46, height: 46, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 2px 12px rgba(58,142,246,.6))" }} />
        </div>
        <div>
          <div style={{ fontWeight: 750, fontSize: 16 }}>שדרגו את הפרויקט</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>תוספות מוכנות להפעלה — הוסיפו לעגלה ושלמו בלחיצה.</div>
        </div>
      </div>
      <div className="card">
        {ADDONS.map((a) => (
          <div key={a.id} className="addon">
            <div className="aic"><LogoMark size={26} /></div>
            <div className="ag"><div className="at">{a.title}</div><div className="as">{a.sub}</div></div>
            <span className="ap">₪{a.price.toLocaleString("en-US")}</span>
            <button className={`addbtn${added[a.id] ? " added" : ""}`} onClick={() => setAdded((prev) => ({ ...prev, [a.id]: !prev[a.id] }))}>
              {added[a.id] ? "✓ נוסף" : "הוספה"}
            </button>
          </div>
        ))}
      </div>
      <div className="cartbar">
        <div>
          <div className="faint" style={{ fontSize: 12 }}>{count} פריטים בעגלה</div>
          <div className="bignum tnum" style={{ fontSize: 22 }}>₪{total.toLocaleString("en-US")}</div>
        </div>
        <button className="btn" disabled={count === 0} style={{ opacity: count === 0 ? 0.5 : 1 }}>
          {count === 0 ? "מעבר לתשלום" : `תשלום ₪${total.toLocaleString("en-US")}`}
        </button>
      </div>
    </section>
  );
}
