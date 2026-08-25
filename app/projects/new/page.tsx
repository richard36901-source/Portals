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
  { key: "build", label: "בניית פרויקט חדש", sub: "אתר, אפליקציה, מערכת — לפי אפיון", price: "החל מ-₪2,500 · הצעה ספציפית לפי היקף", icon: <IconBuild size={22} /> },
  { key: "hours", label: "בנק שעות", sub: "קונים שעות מראש ומושכים לפי הצורך", price: "₪270–300 לשעה · ניכוי אוטומטי מהבנק", icon: <IconClockLg size={22} /> },
  { key: "maintenance", label: "תחזוקה חודשית", sub: "ריטיינר לתמיכה, עדכונים, תיקונים ופיתוח מתמשך", price: "החל מ-₪400 לחודש · כולל תמיכה ושדרוגים", icon: <IconRefresh size={22} /> },
];

// חבילות בנק השעות — לפי המחירון באתר autoscalehq.io. כל המחירים אינם כוללים מע״מ.
const HOUR_PACKS = [
  { hours: 5, price: "₪1,500", perHour: "₪300 לשעה" },
  { hours: 10, price: "₪2,900", perHour: "₪290 לשעה" },
  { hours: 20, price: "₪5,600", perHour: "₪280 לשעה" },
  { hours: 40, price: "₪10,800", perHour: "₪270 לשעה" },
];

export default function NewProjectWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("type");
  const [chosenType, setChosenType] = useState<string | null>(null);
  const [chosenKey, setChosenKey] = useState<string | null>(null);

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
              <div key={t.label} className={`choice${chosenType === t.label ? " selected" : ""}`} onClick={() => { setChosenType(t.label); setChosenKey(t.key); }}>
                <div className="ci">{t.icon}</div>
                <div>
                  <div className="ct">{t.label}</div>
                  <div className="cs">{t.sub}</div>
                  <div className="cs" style={{ color: "var(--accent)", fontWeight: 600 }}>{t.price}</div>
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

      {step === "quote" && chosenKey === "hours" && (
        <div className="ostep active" data-step="quote">
          <Steps current="quote" />
          <div className="ob-h">חבילות בנק שעות</div>
          <div className="ob-sub">ככל שקונים יותר, המחיר לשעה יורד. בוחרים חבילה וממשיכים לתשלום.</div>
          <div className="card pad">
            {HOUR_PACKS.map((h) => (
              <div className="quote-line" key={h.hours}>
                <span>{h.hours} שעות <span className="faint" style={{ fontSize: 12.5 }}>· {h.perHour}</span></span>
                <span className="tnum">{h.price}</span>
              </div>
            ))}
          </div>
          <div className="note"><IconInfo /><div>
            כל המחירים <b>אינם כוללים מע״מ</b>. השעות תקפות ל-<b>12 חודשים</b> מיום הרכישה, ומנוכות לפי זמן עבודה בפועל בעיגול ל-15 דקות הקרובות. דיווח שימוש נשלח מדי חודש.
          </div></div>
          <div className="btnrow">
            <button className="btn ghost" onClick={() => go("describe")}>יש לי שאלה</button>
            <button className="btn" onClick={() => go("pay")}>המשך לתשלום</button>
          </div>
        </div>
      )}

      {step === "quote" && chosenKey === "maintenance" && (
        <div className="ostep active" data-step="quote">
          <Steps current="quote" />
          <div className="ob-h">תחזוקה שוטפת</div>
          <div className="ob-sub">ריטיינר חודשי שמחזיק את המערכות שלכם פעילות ומעודכנות.</div>
          <div className="card pad">
            <div className="quote-line"><span>ריטיינר חודשי</span><span className="tnum">החל מ-₪400 לחודש</span></div>
            <div className="quote-line"><span>תמיכה ותיעדוף פניות דחופות</span><span className="faint">כלול</span></div>
            <div className="quote-line"><span>עדכונים, תיקונים ופיתוח מתמשך</span><span className="faint">כלול</span></div>
            <div className="quote-line"><span>ניטור המערכות</span><span className="faint">כלול</span></div>
          </div>
          <div className="note"><IconInfo /><div>
            המחיר הסופי נקבע לפי היקף המערכות והתמיכה הנדרשת, ואינו כולל מע״מ. נשלח הצעה מותאמת אחרי שנקרא את הבקשה.
          </div></div>
          <div className="btnrow">
            <button className="btn ghost" onClick={() => go("describe")}>יש לי שאלה</button>
            <button className="btn" onClick={() => go("pay")}>המשך להקמת התשלום</button>
          </div>
        </div>
      )}

      {step === "quote" && chosenKey !== "hours" && chosenKey !== "maintenance" && (
        <div className="ostep active" data-step="quote">
          <Steps current="quote" />
          <div className="ob-h">הבקשה התקבלה</div>
          <div className="ob-sub">נכין הצעת מחיר ספציפית לפי האפיון שלכם.</div>
          <div className="card pad">
            <div className="quote-line"><span>פרויקט חד-פעמי</span><span className="tnum">החל מ-₪2,500</span></div>
            <div className="quote-line"><span>היקף ולוח זמנים</span><span className="faint">נסגרים מראש</span></div>
            <div className="quote-line"><span>מדריכי וידאו והדרכה</span><span className="faint">לפי הצורך</span></div>
          </div>
          <div className="note"><IconInfo /><div>
            ההצעה כוללת <b>2 סבבי תיקונים</b>; סבב נוסף בתשלום לפי הצורך. המחיר נקבע לפי היקף הפרויקט ואינו כולל מע״מ, ויישלח אליכם לאישור לפני שמתחילים.
          </div></div>
          <div className="btnrow">
            <button className="btn ghost" onClick={() => go("describe")}>יש לי שאלה</button>
            <button className="btn" onClick={() => go("pay")}>אישור ההצעה</button>
          </div>
        </div>
      )}

      {step === "pay" && (
        <div className="ostep active" data-step="pay">
          <Steps current="pay" />
          <div className="ob-h">{chosenKey === "maintenance" ? "הקמת התשלום החודשי" : "תשלום להתחלה"}</div>
          <div className="ob-sub">
            {chosenKey === "hours"
              ? "התשלום מפעיל את בנק השעות מיד עם האישור."
              : chosenKey === "maintenance"
              ? "הוראת קבע חודשית שניתן לעצור בכל שלב."
              : "מקדמה פותחת את הפרויקט; היתרה נפרסת לפי אבני הדרך שבהצעה."}
          </div>
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
            <button className="btn" onClick={() => go("status")}>אישור ותשלום</button>
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
