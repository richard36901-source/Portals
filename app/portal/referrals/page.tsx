import { IconCheck, IconChat, IconClock } from "@/components/icons";

export default function ReferralsPage() {
  return (
    <section className="panel active" data-name="referrals">
      <div className="grid2">
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>הפניית לקוח חדש</div>
          <div className="field" style={{ margin: 0 }}><label className="fl">שם הלקוח</label><input className="input" placeholder="שם מלא / חברה" /></div>
          <div className="field" style={{ margin: 0 }}><label className="fl">טלפון או אימייל</label><input className="input" placeholder="050-0000000" /></div>
          <button className="btn sm">שליחת הפניה</button>
        </div>
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>פרטי בנק לתשלום עמלה</div>
          <div className="muted" style={{ fontSize: 13 }}>לקבלת עמלות על הפניות מוצלחות.</div>
          <div className="field" style={{ margin: 0 }}><label className="fl">בנק / סניף / חשבון</label><input className="input" placeholder="12 · 345 · 678901" /></div>
          <button className="btn ghost sm">עדכון פרטים</button>
        </div>
      </div>
      <h3 className="sec">הלקוחות שהפניתי</h3>
      <div className="card">
        <div className="li"><div className="ic good"><IconCheck /></div><div className="g"><div className="t">אריק לוי — Levi Studio</div><div className="s">נסגר · עמלה ₪1,200 שולמה</div></div><span className="pill good">שולם</span></div>
        <div className="li"><div className="ic amber"><IconClock /></div><div className="g"><div className="t">דנה כהן — Cohen Fitness</div><div className="s">בפגישת אפיון · עמלה צפויה ₪900</div></div><span className="pill amber">בתהליך</span></div>
        <div className="li"><div className="ic"><IconChat size={18} strokeWidth={1.6} /></div><div className="g"><div className="t">משה בר — Bar Legal</div><div className="s">יצרנו קשר · ממתין לתשובה</div></div><span className="pill ink">נוצר קשר</span></div>
      </div>
    </section>
  );
}
