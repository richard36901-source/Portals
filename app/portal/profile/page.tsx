import Link from "next/link";
import ThemeSeg from "@/components/ThemeSeg";
import Toggle from "@/components/Toggle";

const languages = [
  { label: "English" },
  { label: "Русский" },
  { label: "Français" },
  { label: "Español" },
  { label: "العربية" },
];

export default function ProfilePage() {
  return (
    <section className="panel active" data-name="profile">
      <div className="card pad" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="av" style={{ width: 64, height: 64, fontSize: 24 }}>מר</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 17 }}>מאיה רון</div>
          <div className="muted" style={{ fontSize: 13 }}>Rom Retail בע&quot;מ</div>
        </div>
        <button className="btn ghost sm">החלפת תמונה</button>
      </div>
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>פרטים אישיים</div>
        <div className="grid2">
          <div className="field"><label className="fl">שם מלא</label><input className="input" defaultValue="מאיה רון" /></div>
          <div className="field"><label className="fl">שם החברה</label><input className="input" defaultValue='Rom Retail בע"מ' /></div>
          <div className="field"><label className="fl">אימייל</label><input className="input" defaultValue="maya@romretail.co.il" /></div>
          <div className="field"><label className="fl">טלפון</label><input className="input" defaultValue="052-1234567" /></div>
        </div>
        <button className="btn sm" style={{ alignSelf: "flex-start" }}>שמירת שינויים</button>
      </div>
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div className="row" style={{ marginBottom: 6 }}><div style={{ fontWeight: 700 }}>חברי צוות בפרויקט</div><button className="btn ghost sm">הזמנת חבר צוות</button></div>
        <div className="kv" style={{ borderTop: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div className="av" style={{ width: 38, height: 38, fontSize: 13 }}>מר</div>
            <div><div style={{ fontWeight: 600 }}>מאיה רון</div><div className="faint" style={{ fontSize: 12 }}>maya@romretail.co.il · מנהלת</div></div>
          </div>
          <span className="pill ink">את/ה</span>
        </div>
        <div className="kv">
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div className="av" style={{ width: 38, height: 38, fontSize: 13 }}>יב</div>
            <div><div style={{ fontWeight: 600 }}>יוסי בר</div><div className="faint" style={{ fontSize: 12 }}>yossi@romretail.co.il · שותף</div></div>
          </div>
          <span className="pill good">פעיל</span>
        </div>
        <div className="faint" style={{ fontSize: 12, marginTop: 4 }}>לכל חבר צוות שם משתמש משלו — שניהם על אותו פרויקט ורואים את אותה שיחה, קבצים והתראות.</div>
      </div>
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontWeight: 700 }}>העדפות</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div>
            <div style={{ fontWeight: 600 }}>שפה</div>
            <div className="faint" style={{ fontSize: 12 }}>לכל חבר צוות שפה משלו — הבחירה שלך לא משפיעה על אחרים.</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button className="langchip on">עברית</button>
            {languages.map((l) => (
              <button key={l.label} className="langchip" disabled>{l.label} <span className="soon">בקרוב</span></button>
            ))}
          </div>
        </div>
        <div className="kv">
          <div><div style={{ fontWeight: 600 }}>ערכת נושא</div><div className="faint" style={{ fontSize: 12 }}>נשלטת מלמעלה — בהיר או כהה</div></div>
          <ThemeSeg plain />
        </div>
      </div>
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontWeight: 700 }}>אבטחה</div>
        <div className="kv"><div><div style={{ fontWeight: 600 }}>סיסמה</div><div className="faint" style={{ fontSize: 12 }}>עודכנה לאחרונה לפני חודשיים</div></div><button className="btn ghost sm">שינוי סיסמה</button></div>
        <div className="kv"><div><div style={{ fontWeight: 600 }}>אימות דו-שלבי (2FA)</div><div className="faint" style={{ fontSize: 12 }}>שכבת הגנה נוספת בכניסה — SMS או אפליקציה</div></div><Toggle /></div>
        <div className="kv"><div><div style={{ fontWeight: 600 }}>מכשירים מחוברים</div><div className="faint" style={{ fontSize: 12 }}>2 מכשירים פעילים</div></div><button className="btn ghost sm">ניהול</button></div>
      </div>
      <Link href="/login" className="btn ghost" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center" }}>התנתקות</Link>
    </section>
  );
}
