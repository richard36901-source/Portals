import Toggle from "@/components/Toggle";
import { IconClock, IconWarnTriangle } from "@/components/icons";

export default function NotificationsPage() {
  return (
    <section className="panel active" data-name="notifications">
      <h3 className="sec">היכן לקבל התראות</h3>
      <div className="card pad tight kv-grid">
        <div className="kv"><div><div style={{ fontWeight: 600 }}>וואטסאפ</div><div className="faint" style={{ fontSize: 12 }}>052-1234567</div></div><Toggle defaultOn /></div>
        <div className="kv"><div><div style={{ fontWeight: 600 }}>אימייל</div><div className="faint" style={{ fontSize: 12 }}>maya@romretail.co.il</div></div><Toggle defaultOn /></div>
        <div className="kv"><div><div style={{ fontWeight: 600 }}>תשלומים וחשבוניות</div><div className="faint" style={{ fontSize: 12 }}>תזכורות לפני מועד</div></div><Toggle defaultOn /></div>
        <div className="kv"><div><div style={{ fontWeight: 600 }}>סבבי תיקונים ומשימות</div><div className="faint" style={{ fontSize: 12 }}>כשנדרשת פעולה</div></div><Toggle defaultOn /></div>
      </div>
      <h3 className="sec">כרטיס אשראי לחיובי וואטסאפ</h3>
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="muted" style={{ fontSize: 13 }}>שמירת כרטיס לחיוב אוטומטי של הודעות וואטסאפ מהמערכת.</div>
        <div className="field" style={{ margin: 0 }}><label className="fl">מספר כרטיס</label><input className="input" placeholder="0000 0000 0000 0000" /></div>
        <div style={{ display: "flex", gap: 12 }}>
          <div className="field" style={{ margin: 0, flex: 1 }}><label className="fl">תוקף</label><input className="input" placeholder="MM/YY" /></div>
          <div className="field" style={{ margin: 0, flex: 1 }}><label className="fl">CVV</label><input className="input" placeholder="123" /></div>
        </div>
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--muted)", cursor: "pointer" }}>
          <input type="checkbox" style={{ marginTop: 3, width: 17, height: 17, accentColor: "var(--accent)" }} /> אני מאשר/ת חיוב אוטומטי עבור הודעות וואטסאפ לפי השימוש בפועל.
        </label>
        <button className="btn sm" style={{ alignSelf: "flex-start" }}>שמירת כרטיס</button>
      </div>
      <h3 className="sec">התראות אחרונות</h3>
      <div className="card">
        <div className="li"><div className="ic red"><IconWarnTriangle strokeWidth={1.6} /></div><div className="g"><div className="t">חשבונית #0148 ממתינה לתשלום</div><div className="s">וואטסאפ + אימייל · היום</div></div></div>
        <div className="li"><div className="ic amber"><IconClock /></div><div className="g"><div className="t">סבב תיקונים #2 ממתין לבדיקה</div><div className="s">וואטסאפ · היום</div></div></div>
      </div>
    </section>
  );
}
