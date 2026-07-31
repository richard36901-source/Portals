import LogoMark from "@/components/LogoMark";
import { IconInfo } from "@/components/icons";

export default function TasksPage() {
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
