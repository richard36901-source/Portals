import { IconCheck, IconLock } from "@/components/icons";

export default function AccessPage() {
  return (
    <section className="panel active" data-name="access">
      <div className="note">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto", marginTop: 1 }}><rect x="5" y="10" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" strokeWidth="1.7" /></svg>
        <div>שיתוף גישות מוצפן. שתפו לנו מה שצריך — וצפו בגישות שאנחנו פתחנו עבורכם.</div>
      </div>

      <h3 className="sec">מה ביקשנו שתשתפו</h3>
      <div className="card">
        <div className="li"><div className="ic amber"><IconLock withShackle={false} /></div><div className="g"><div className="t">גישת שרת / אחסון (FTP)</div><div className="s">נדרש להעלאת האתר — טרם התקבל</div></div><button className="btn sm">שיתוף גישה</button></div>
        <div className="li"><div className="ic good"><IconCheck /></div><div className="g"><div className="t">גישת Google Analytics</div><div className="s">שותף · 5 ביולי</div></div><span className="pill good">שותף</span></div>
      </div>

      <h3 className="sec">גישות שפתחנו עבורכם</h3>
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="row"><div style={{ fontWeight: 700 }}>מערכת ניהול האתר (CMS)</div><span className="pill ink">מאיתנו</span></div>
        <div className="accfields">
          <div className="field" style={{ margin: 0 }}><label className="fl">קישור</label><input className="input" defaultValue="admin.romretail.co.il" readOnly /></div>
          <div className="field" style={{ margin: 0 }}><label className="fl">שם משתמש</label><input className="input" defaultValue="maya" readOnly /></div>
          <div className="field" style={{ margin: 0 }}><label className="fl">סיסמה</label><input className="input" type="password" defaultValue="123456" readOnly /></div>
          <div className="field" style={{ margin: 0 }}><label className="fl">הערה</label><input className="input" defaultValue="לשנות סיסמה בכניסה ראשונה" readOnly /></div>
        </div>
      </div>
      <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="row"><div style={{ fontWeight: 700 }}>לוח בקרה — אנליטיקס</div><span className="pill ink">קישור בלבד</span></div>
        <div className="field" style={{ margin: 0 }}><label className="fl">קישור</label><input className="input" defaultValue="lookerstudio.google.com/reporting/xyz" readOnly /></div>
      </div>
      <div className="faint" style={{ fontSize: 12, textAlign: "center" }}>כל גישה גמישה: לפעמים רק <b>קישור</b>, ולפעמים קישור · שם משתמש · סיסמה · הערה — מוסיפים רק את השדות שצריך.</div>

      <h3 className="sec">מה שיתפתם</h3>
      <div className="card">
        <div className="li"><div className="ic"><IconLock withShackle={false} /></div><div className="g"><div className="t">כניסה לניהול הדומיין</div><div className="s">שותף · 5 ביולי</div></div><span className="pill ink">פעיל</span></div>
      </div>
    </section>
  );
}
