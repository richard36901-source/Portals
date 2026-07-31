import Link from "next/link";
import LogoMark from "@/components/LogoMark";

export default function ProjectPage() {
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
          <div className="card" style={{ padding: 14 }}><div className="faint" style={{ fontSize: 12 }}>סטטוס</div><div style={{ fontWeight: 700, marginTop: 2 }}>שלב 2 / 3</div></div>
          <div className="card" style={{ padding: 14 }}><div className="faint" style={{ fontSize: 12 }}>דדליין מעודכן</div><div style={{ fontWeight: 700, marginTop: 2 }}>18 באוג׳</div></div>
          <div className="card" style={{ padding: 14 }}><div className="faint" style={{ fontSize: 12 }}>סבבי תיקונים</div><div style={{ fontWeight: 700, marginTop: 2 }}>1 / 2 בשימוש</div></div>
        </div>
      </div>

      <h3 className="sec">סבבי תיקונים <span style={{ textTransform: "none", fontWeight: 500, color: "var(--faint)" }}>· 2 כלולים בפרויקט</span></h3>
      <div className="card">
        <div className="li">
          <div className="ic good"><LogoMark /></div>
          <div className="g"><div className="t">סבב #1 — קונספט</div><div className="s">אושר · 10 ביולי</div></div>
          <span className="pill good">אושר</span>
        </div>
        <div className="li">
          <div className="ic amber"><LogoMark /></div>
          <div className="g"><div className="t">סבב #2 — עיצוב מלא</div><div className="s">ממתין לבדיקתך · הועלה היום (הסבב האחרון הכלול)</div></div>
          <button className="btn sm">בדיקה ואישור</button>
        </div>
      </div>
      <div className="card pad" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 700 }}>צריך סבב תיקונים נוסף?</div>
          <div className="muted" style={{ fontSize: 13 }}>2 הסבבים הכלולים נוצלו. סבב נוסף בתשלום.</div>
        </div>
        <div style={{ textAlign: "left" }}><div className="bignum tnum" style={{ fontSize: 20 }}>₪450</div><div className="faint" style={{ fontSize: 11 }}>לסבב</div></div>
        <button className="btn">רכישת סבב נוסף</button>
      </div>

      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>בקשת פרויקט חדש</div>
        <div className="muted" style={{ fontSize: 13 }}>פותח את התהליך: תיאור ← הצעת מחיר ← אישור ותשלום.</div>
        <Link href="/projects/new" className="btn sm" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center" }}>התחלת בקשה</Link>
      </div>
    </section>
  );
}
