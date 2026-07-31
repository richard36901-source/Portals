"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ObShell from "@/components/ObShell";
import { IconBuild, IconClockLg, IconRefresh, IconInfo, IconUpload } from "@/components/icons";

type Step = "type" | "describe" | "quote" | "pay" | "status";

function Steps({ current }: { current: Step }) {
  const order: { key: Step; label: string; n: number }[] = [
    { key: "type", label: "סוג", n: 1 },
    { key: "describe", label: "תיאור", n: 2 },
    { key: "quote", label: "הצעה", n: 3 },
    { key: "pay", label: "תשלום", n: 4 },
  ];
  const idx = order.findIndex((s) => s.key === current);
  return (
    <div className="steps">
      {order.map((s, i) => (
        <span key={s.key} style={{ display: "contents" }}>
          {i > 0 && <span className="sep" />}
          <span className={`s${i < idx ? " done" : i === idx ? " cur" : ""}`}>
            <span className="n">{i < idx ? "✓" : s.n}</span>
            {s.label}
          </span>
        </span>
      ))}
    </div>
  );
}

const projectTypes = [
  { label: "בניית פרויקט חדש", sub: "אתר, אפליקציה, מערכת — לפי אפיון", icon: <IconBuild size={22} /> },
  { label: "בנק שעות", sub: "חבילת שעות לשינויים ותוספות קטנות", icon: <IconClockLg size={22} /> },
  { label: "תחזוקה חודשית", sub: "עדכונים, גיבויים וזמינות שוטפת", icon: <IconRefresh size={22} /> },
];

export default function NewProjectWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("type");
  const [chosenType, setChosenType] = useState<string | null>(null);

  const go = (s: Step) => {
    setStep(s);
    window.scrollTo(0, 0);
  };

  return (
    <ObShell>
      {step === "type" && (
        <div className="ostep active" data-step="type">
          <Steps current="type" />
          <div className="ob-h">מה תרצו לפתוח?</div>
          <div className="choose">
            {projectTypes.map((t) => (
              <div key={t.label} className={`choice${chosenType === t.label ? " selected" : ""}`} onClick={() => setChosenType(t.label)}>
                <div className="ci">{t.icon}</div>
                <div>
                  <div className="ct">{t.label}</div>
                  <div className="cs">{t.sub}</div>
                </div>
                <span className="cx faint">בחירה</span>
              </div>
            ))}
          </div>
          <div className="btnrow">
            <button className="btn ghost" onClick={() => router.push("/projects")}>חזרה</button>
            <button className="btn" disabled={!chosenType} style={{ opacity: chosenType ? 1 : 0.5 }} onClick={() => go("describe")}>המשך</button>
          </div>
        </div>
      )}

      {step === "describe" && (
        <div className="ostep active" data-step="describe">
          <Steps current="describe" />
          <div className="ob-h">ספרו לנו מה צריך</div>
          <div className="ob-sub">{chosenType ?? "בנייה חדשה"} — כתבו, העלו קובץ, או שניהם.</div>
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="field" style={{ margin: 0 }}>
              <label className="fl">תיאור הבקשה</label>
              <textarea className="input" rows={4} placeholder="לדוגמה: אתר תדמית עם 5 עמודים, טופס יצירת קשר, בעברית ואנגלית..." />
            </div>
            <button className="btn ghost sm" style={{ alignSelf: "flex-start" }}><IconUpload /> העלאת מסמך אפיון (PDF)</button>
          </div>
          <div className="btnrow">
            <button className="btn ghost" onClick={() => go("type")}>חזרה</button>
            <button className="btn" onClick={() => go("quote")}>שליחה לקבלת הצעה</button>
          </div>
        </div>
      )}

      {step === "quote" && (
        <div className="ostep active" data-step="quote">
          <Steps current="quote" />
          <div className="ob-h">הצעת המחיר מוכנה</div>
          <div className="ob-sub">בדקו את הפירוט ואשרו כדי להתחיל.</div>
          <div className="card pad">
            <div className="quote-line"><span>אפיון ועיצוב UX/UI</span><span className="tnum">₪6,500</span></div>
            <div className="quote-line"><span>פיתוח האתר (5 עמודים)</span><span className="tnum">₪11,000</span></div>
            <div className="quote-line"><span>התאמה לנייד + העלאה</span><span className="tnum">₪2,500</span></div>
            <div className="quote-line" style={{ fontWeight: 750, fontSize: 16 }}><span>סה״כ</span><span className="tnum">₪20,000</span></div>
          </div>
          <div className="note"><IconInfo /><div>ההצעה כוללת <b>2 סבבי תיקונים</b>. סבב נוסף בתשלום לפי הצורך.</div></div>
          <div className="btnrow">
            <button className="btn ghost" onClick={() => go("describe")}>יש לי שאלה</button>
            <button className="btn" onClick={() => go("pay")}>אישור ההצעה</button>
          </div>
        </div>
      )}

      {step === "pay" && (
        <div className="ostep active" data-step="pay">
          <Steps current="pay" />
          <div className="ob-h">תשלום מקדמה להתחלה</div>
          <div className="ob-sub">מקדמה של 50% (₪10,000) פותחת את הפרויקט.</div>
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="field" style={{ margin: 0 }}>
              <label className="fl">מספר כרטיס</label>
              <input className="input" placeholder="0000 0000 0000 0000" />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div className="field" style={{ margin: 0, flex: 1 }}><label className="fl">תוקף</label><input className="input" placeholder="MM/YY" /></div>
              <div className="field" style={{ margin: 0, flex: 1 }}><label className="fl">CVV</label><input className="input" placeholder="123" /></div>
            </div>
          </div>
          <div className="btnrow">
            <button className="btn ghost" onClick={() => go("quote")}>חזרה</button>
            <button className="btn" onClick={() => go("status")}>אישור ותשלום ₪10,000</button>
          </div>
        </div>
      )}

      {step === "status" && (
        <div className="ostep active" data-step="status">
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center" }}>
            <div className="av" style={{ width: 60, height: 60, fontSize: 28 }}>✓</div>
            <div className="ob-h">הבקשה אושרה — הפרויקט נפתח!</div>
            <div className="ob-sub" style={{ margin: 0 }}>קיבלתם עדכון בוואטסאפ ובאימייל. אפשר להיכנס לפורטל ולעקוב.</div>
            <div className="ms" style={{ width: "100%", maxWidth: 360, textAlign: "right" }}>
              <div className="m done"><div className="k"><span className="d" /></div><div className="info"><div className="t">הבקשה התקבלה</div></div></div>
              <div className="m done"><div className="k"><span className="d" /></div><div className="info"><div className="t">הצעת מחיר נשלחה ואושרה</div></div></div>
              <div className="m done"><div className="k"><span className="d" /></div><div className="info"><div className="t">מקדמה שולמה</div></div></div>
              <div className="m now"><div className="k"><span className="d" /></div><div className="info"><div className="t">הפרויקט בבנייה</div></div></div>
            </div>
            <button className="btn block" onClick={() => router.push("/portal/dashboard")}>כניסה לפורטל הפרויקט</button>
          </div>
        </div>
      )}
    </ObShell>
  );
}
