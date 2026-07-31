import CountUp from "@/components/CountUp";
import { IconCheck } from "@/components/icons";

export default function InvoicesPage() {
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
