import Link from "next/link";
import CountUp from "@/components/CountUp";
import { IconInfo, IconRefresh } from "@/components/icons";

export default function DashboardPage() {
  return (
    <section className="panel active" data-name="dash">
      <div className="todo-card">
        <div className="todo-hd">
          <span style={{ color: "#ff8a8a" }}>●</span> פעולות נדרשות · עד להסדרתן חלק מהאפשרויות נעולות
          <span className="cnt">3</span>
        </div>
        <div className="todo-row">
          <div className="ti red"><svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="16.5" r="1.2" fill="currentColor" /><path d="M12 3 2 20h20L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></div>
          <div className="tg">
            <div className="tt">תשלום חשבונית #0148 — ₪4,200</div>
            <div className="td">יש להסדיר כדי להמשיך בפרויקט.</div>
          </div>
          <Link href="/portal/invoices" className="btn red sm" style={{ display: "inline-flex", alignItems: "center" }}>שלם עכשיו</Link>
        </div>
        <div className="todo-row">
          <div className="ti blue"><svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M5 5h11l3 3v11H5V5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 13l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <div className="tg">
            <div className="tt">חתימה על חוזה — הרחבת מערכת</div>
            <div className="td">ההצעה אושרה. נותרה חתימה דיגיטלית.</div>
          </div>
          <button className="btn ghost sm">לחתימה</button>
        </div>
        <div className="todo-row">
          <div className="ti teal"><IconRefresh size={19} /></div>
          <div className="tg">
            <div className="tt">סבב תיקונים #2 ממתין לבדיקתך</div>
            <div className="td">העלינו גרסה מעודכנת — לאישור או הערות.</div>
          </div>
          <Link href="/portal/project" className="btn ghost sm" style={{ display: "inline-flex", alignItems: "center" }}>בדיקה</Link>
        </div>
      </div>

      <div className="grid2">
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 10, padding: "15px 18px" }}>
          <div className="row">
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>מיתוג ואתר תדמית</div>
              <div className="muted" style={{ fontSize: 12.5 }}>שלב 2 מתוך 3 · בבדיקה</div>
            </div>
            <span className="pill amber">בבדיקה</span>
          </div>
          <div>
            <div className="row" style={{ alignItems: "baseline" }}><span className="bignum tnum" style={{ fontSize: 25 }}><CountUp value={68} suffix="%" /></span><span className="faint" style={{ fontSize: 12 }}>התקדמות</span></div>
            <div className="track" style={{ marginTop: 6, height: 6 }}><div className="fill" style={{ width: "68%" }} /></div>
          </div>
          <div className="note">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto", marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div><b>דדליין עודכן:</b> 12 באוג׳ ← <b>18 באוג׳</b>. העיכוב נגרם כי גישת השרת טרם התקבלה — שיתוף הגישה יאיץ אותנו.</div>
          </div>
        </div>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 9, padding: "15px 18px" }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>סיכום תשלומים</div>
          <div className="row" style={{ alignItems: "baseline" }}>
            <div><div className="faint" style={{ fontSize: 12 }}>שולם עד כה</div><div className="bignum tnum" style={{ fontSize: 22 }}><CountUp value={18600} prefix="₪" /></div></div>
            <div style={{ textAlign: "left" }}><div className="faint" style={{ fontSize: 12 }}>נותר</div><div className="bignum tnum" style={{ fontSize: 22, color: "var(--red)" }}><CountUp value={7400} prefix="₪" /></div></div>
          </div>
          <div className="track" style={{ height: 6 }}><div className="fill" style={{ width: "71%" }} /></div>
          <div className="faint" style={{ fontSize: 12 }}>71% מתקציב ₪26,000</div>
          <div className="btnrow">
            <Link href="/portal/invoices" className="btn sm" style={{ display: "inline-flex", alignItems: "center" }}>כל התשלומים</Link>
            <Link href="/portal/invoices" className="btn ghost sm" style={{ display: "inline-flex", alignItems: "center" }}>תשלום מראש</Link>
          </div>
        </div>
      </div>

      <div className="card pad">
        <div className="row" style={{ marginBottom: 6 }}><div style={{ fontWeight: 700 }}>אבני דרך ולוחות זמנים</div><span className="pill ink">3 / 6 הושלמו</span></div>
        <div className="ms">
          <div className="m done"><div className="k"><span className="d" /></div><div className="info"><div className="t">אפיון ומחקר</div><div className="s">הושלם · 3 ביולי</div></div></div>
          <div className="m done"><div className="k"><span className="d" /></div><div className="info"><div className="t">קונספט עיצובי</div><div className="s">הושלם · 15 ביולי</div></div></div>
          <div className="m now"><div className="k"><span className="d" /></div><div className="info"><div className="t">עיצוב מלא + סבב תיקונים #2</div><div className="s">בתהליך · יעד 6 באוג׳</div></div></div>
          <div className="m"><div className="k"><span className="d" /></div><div className="info"><div className="t">פיתוח האתר</div><div className="s">יעד 18 באוג׳ <span className="pill amber" style={{ fontSize: 10, padding: "2px 7px" }}>עודכן</span> · הערה: ממתין לגישת שרת</div></div></div>
          <div className="m"><div className="k"><span className="d" /></div><div className="info"><div className="t">בדיקות והשקה</div><div className="s">יעד 28 באוג׳</div></div></div>
        </div>
      </div>
    </section>
  );
}
