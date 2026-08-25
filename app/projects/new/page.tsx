"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ObShell from "@/components/ObShell";
import LogoMark from "@/components/LogoMark";
import { IconBuild, IconClockLg, IconRefresh, IconInfo, IconUpload } from "@/components/icons";
import { PRODUCTS, GROUPS, HOUR_PACKS, VAT_NOTE, HOURS_BANK_URL, whatsappLink, type Product } from "@/lib/products";

type Step = "type" | "describe" | "summary" | "status";

function Steps({ current }: { current: Step }) {
  const order: { key: Step; label: string; n: number }[] = [
    { key: "type", label: "בחירה", n: 1 },
    { key: "describe", label: "פרטים", n: 2 },
    { key: "summary", label: "שליחה", n: 3 },
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

function icon(key: string) {
  if (key === "project") return <IconBuild size={22} />;
  if (key === "hours") return <IconClockLg size={22} />;
  if (key === "maintenance") return <IconRefresh size={22} />;
  return <LogoMark size={22} />;
}

export default function NewProjectWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("type");
  const [chosen, setChosen] = useState<Product | null>(null);

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
          <div className="ob-sub">בחרו מוצר או מסלול עבודה. נשלח אליכם הצעה מותאמת — אין תשלום בשלב הזה.</div>
          {GROUPS.map((g) => (
            <div key={g} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 className="sec">{g}</h3>
              <div className="choose">
                {PRODUCTS.filter((p) => p.group === g).map((p) => (
                  <div
                    key={p.key}
                    className={`choice${chosen?.key === p.key ? " selected" : ""}`}
                    onClick={() => setChosen(p)}
                  >
                    <div className="ci">{icon(p.key)}</div>
                    <div style={{ minWidth: 0 }}>
                      <div className="ct">
                        {p.name}
                        {p.badge && <span className="pill ink" style={{ marginInlineStart: 8, fontSize: 11 }}>{p.badge}</span>}
                      </div>
                      <div className="cs">{p.tagline}</div>
                      <div className="cs" style={{ color: "var(--accent)", fontWeight: 600 }}>
                        {p.price} <span className="faint" style={{ fontWeight: 400 }}>{p.priceNote}</span>
                      </div>
                    </div>
                    <span className="cx faint">בחירה</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="note"><IconInfo /><div>{VAT_NOTE}</div></div>
          <div className="btnrow">
            <button className="btn ghost" onClick={() => router.push("/projects")}>חזרה</button>
            <button className="btn" disabled={!chosen} style={{ opacity: chosen ? 1 : 0.5 }} onClick={() => go("describe")}>המשך</button>
          </div>
        </div>
      )}

      {step === "describe" && chosen && (
        <div className="ostep active" data-step="describe">
          <Steps current="describe" />
          <div className="ob-h">ספרו לנו מה צריך</div>
          <div className="ob-sub">{chosen.name} — כתבו, העלו קובץ, או שניהם.</div>
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="field" style={{ margin: 0 }}>
              <label className="fl">תיאור הבקשה</label>
              <textarea className="input" rows={4} placeholder="לדוגמה: אתר תדמית עם 5 עמודים, טופס יצירת קשר, בעברית ואנגלית..." />
            </div>
            <button className="btn ghost sm" style={{ alignSelf: "flex-start" }}><IconUpload /> העלאת מסמך אפיון (PDF)</button>
          </div>
          <div className="btnrow">
            <button className="btn ghost" onClick={() => go("type")}>חזרה</button>
            <button className="btn" onClick={() => go("summary")}>המשך</button>
          </div>
        </div>
      )}

      {step === "summary" && chosen && (
        <div className="ostep active" data-step="summary">
          <Steps current="summary" />
          <div className="ob-h">{chosen.name}</div>
          <div className="ob-sub">{chosen.tagline}</div>

          <div className="card pad">
            <div className="quote-line" style={{ fontWeight: 750, fontSize: 16 }}>
              <span>{chosen.price}</span>
              <span className="faint" style={{ fontWeight: 400, fontSize: 13 }}>{chosen.priceNote}</span>
            </div>
            {chosen.features.map((f) => (
              <div className="quote-line" key={f}><span>{f}</span><span className="faint">כלול</span></div>
            ))}
            {chosen.monthly && (
              <div className="quote-line"><span>{chosen.monthly}</span><span className="faint">אופציונלי</span></div>
            )}
          </div>

          {chosen.buyable ? (
            <>
              <h3 className="sec">חבילות בנק שעות</h3>
              <div className="card pad">
                {HOUR_PACKS.map((h) => (
                  <div className="quote-line" key={h.hours}>
                    <span>{h.hours} שעות <span className="faint" style={{ fontSize: 12.5 }}>· {h.perHour}</span></span>
                    <span className="tnum">{h.price}</span>
                  </div>
                ))}
              </div>
              <div className="note"><IconInfo /><div>
                כל המחירים <b>אינם כוללים מע״מ</b>. השעות תקפות ל-<b>12 חודשים</b> מיום הרכישה ומנוכות לפי זמן עבודה בפועל, בעיגול ל-15 דקות. דיווח שימוש נשלח מדי חודש.
              </div></div>
              <div className="btnrow">
                <a className="btn" href={HOURS_BANK_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center" }}>
                  רכישת בנק שעות באתר
                </a>
                <a className="btn ghost" href={whatsappLink(chosen.name)} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center" }}>
                  שיחה בוואטסאפ עם דונה
                </a>
                <button className="btn ghost" onClick={() => go("describe")}>חזרה</button>
              </div>
            </>
          ) : (
            <>
              <div className="note"><IconInfo /><div>
                {VAT_NOTE} המחיר הסופי נקבע לפי היקף העבודה ויישלח אליכם לאישור לפני שמתחילים. <b>אין חיוב בשלב הזה</b>.
              </div></div>
              <div className="btnrow">
                <button className="btn" onClick={() => go("status")}>שליחת בקשה</button>
                <a className="btn ghost" href={whatsappLink(chosen.name)} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center" }}>
                  שאלה בוואטסאפ
                </a>
                <button className="btn ghost" onClick={() => go("describe")}>חזרה</button>
              </div>
            </>
          )}
        </div>
      )}

      {step === "status" && chosen && (
        <div className="ostep active" data-step="status">
          <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center" }}>
            <div className="av" style={{ width: 60, height: 60, fontSize: 28 }}>✓</div>
            <div className="ob-h">הבקשה נשלחה</div>
            <div className="ob-sub" style={{ margin: 0 }}>נחזור אליכם עם הצעה מותאמת ל{chosen.name}, בדרך כלל תוך כמה שעות בימי עסקים.</div>
            <div className="ms" style={{ width: "100%", maxWidth: 360, textAlign: "right" }}>
              <div className="m done"><div className="k"><span className="d" /></div><div className="info"><div className="t">הבקשה התקבלה</div></div></div>
              <div className="m now"><div className="k"><span className="d" /></div><div className="info"><div className="t">מכינים הצעת מחיר</div></div></div>
              <div className="m"><div className="k"><span className="d" /></div><div className="info"><div className="t">אישור ותחילת עבודה</div></div></div>
            </div>
            <button className="btn block" onClick={() => router.push("/portal/dashboard")}>חזרה לפורטל</button>
          </div>
        </div>
      )}
    </ObShell>
  );
}
