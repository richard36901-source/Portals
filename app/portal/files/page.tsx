import LogoMark from "@/components/LogoMark";
import { IconUpload } from "@/components/icons";

export default function FilesPage() {
  return (
    <section className="panel active" data-name="files">
      <div className="row">
        <h3 className="sec" style={{ margin: 0 }}>כל הקבצים במקום אחד</h3>
        <button className="btn sm"><IconUpload /> העלאת קובץ</button>
      </div>
      <div className="card">
        <div className="li"><div className="ic red"><LogoMark /></div><div className="g"><div className="t">הצעת מחיר — CRM.pdf</div><div className="s">הועלה על ידינו · 28 ביולי</div></div><span className="pill ink">מאיתנו</span></div>
        <div className="li"><div className="ic"><LogoMark /></div><div className="g"><div className="t">לוגו קיים + מיתוג.zip</div><div className="s">הועלה על ידכם · 4 ביולי</div></div><span className="pill good">מכם</span></div>
        <div className="li"><div className="ic red"><LogoMark /></div><div className="g"><div className="t">חוזה התקשרות.pdf</div><div className="s">הועלה על ידינו · ממתין לחתימה</div></div><span className="pill amber">לחתימה</span></div>
      </div>
    </section>
  );
}
