import Toggle from "@/components/Toggle";
import LogoMark from "@/components/LogoMark";
import { IconInfo, IconPlayCircle } from "@/components/icons";

const portalVideos = [
  { title: "סיור בפורטל", length: "2:40" },
  { title: "אישור סבב תיקונים", length: "1:55" },
  { title: "תשלום חשבונית", length: "1:10" },
];

export default function TutorialsPage() {
  return (
    <section className="panel active" data-name="tutorials">
      <h3 className="sec">שימוש בפורטל</h3>
      <div className="vidgrid">
        {portalVideos.map((v) => (
          <div key={v.title} className="video">
            <div className="thumb"><IconPlayCircle /></div>
            <div className="vb"><span className="vt">{v.title}</span><span className="faint" style={{ fontSize: 12 }}>{v.length}</span></div>
          </div>
        ))}
      </div>

      <div className="row">
        <h3 className="sec" style={{ margin: 0 }}>מדריכי הפרויקט שלך — CRM</h3>
        <button className="btn sm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: -2 }}><path d="M8 12h8M13 8l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M11 6H6v12h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
          {" "}שיתוף קישור לצוות
        </button>
      </div>
      <div className="card">
        <div className="li">
          <div className="ic"><LogoMark /></div>
          <div className="g"><div className="t">הוספת ליד חדש למערכת</div><div className="s">הוכן במיוחד עבורכם · 3:20</div></div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="faint" style={{ fontSize: 12 }}>בקישור</span><Toggle defaultOn /></div>
        </div>
        <div className="li">
          <div className="ic"><LogoMark /></div>
          <div className="g"><div className="t">הפקת דוח מכירות חודשי</div><div className="s">הוכן במיוחד עבורכם · 4:05</div></div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="faint" style={{ fontSize: 12 }}>בקישור</span><Toggle /></div>
        </div>
      </div>
      <div className="note"><IconInfo /><div>הקישור המשותף מציג לצוות רק את הסרטונים שהמתג שלהם דולק. &quot;שיתוף קישור לצוות&quot; יוצר לינק לצפייה בלבד.</div></div>
    </section>
  );
}
