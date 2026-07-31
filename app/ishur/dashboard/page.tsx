"use client";

import { useMemo, useRef, useState } from "react";

type GuestStatus = "coming" | "maybe" | "declined" | "pending" | "unsent";
interface Guest { n: string; p: string; party: number; s: GuestStatus }

const PRICE = 1.2;
const META: Record<GuestStatus, { t: string; c: string }> = {
  coming: { t: "מגיע/ה", c: "good" }, maybe: { t: "אולי", c: "amber" }, declined: { t: "לא מגיע/ה", c: "red" },
  pending: { t: "ממתין/ה", c: "ink" }, unsent: { t: "טרם נשלח", c: "ink" },
};
const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "הכול" }, { key: "coming", label: "מגיעים" }, { key: "maybe", label: "אולי" },
  { key: "declined", label: "לא מגיעים" }, { key: "pending", label: "ממתינים" }, { key: "unsent", label: "טרם נשלח" },
];
const DEMO: Guest[] = [
  { n: "משפחת כהן", p: "050-1234567", party: 4, s: "coming" },
  { n: "דנה לוי", p: "052-2345678", party: 2, s: "coming" },
  { n: "אורי בר", p: "054-3456789", party: 1, s: "declined" },
  { n: "משפחת פרץ", p: "053-4567890", party: 5, s: "coming" },
  { n: "נועה שגיא", p: "058-5678901", party: 2, s: "maybe" },
  { n: "יוסי מזרחי", p: "050-6789012", party: 1, s: "pending" },
  { n: "משפחת אלון", p: "050-1112233", party: 3, s: "maybe" },
  { n: "רות אברהם", p: "052-7890123", party: 3, s: "coming" },
  { n: "גיא דדון", p: "054-8901234", party: 2, s: "declined" },
  { n: "משפחת חן", p: "053-9012345", party: 4, s: "unsent" },
  { n: "ליאת רון", p: "058-0123456", party: 1, s: "unsent" },
];

const initials = (name: string) => {
  const parts = name.replace("משפחת", "").trim().split(" ");
  return (parts[0] || "").slice(0, 1) + (parts[1] || "").slice(0, 1);
};

export default function IshurDashboard() {
  const [guests, setGuests] = useState<Guest[]>(DEMO);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState<string | null>(null);
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [party, setParty] = useState("1");
  const fileRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const stats = useMemo(() => {
    let coming = 0, declined = 0, pending = 0, unsent = 0, maybe = 0, comingRows = 0;
    for (const g of guests) {
      if (g.s === "coming") { coming += g.party; comingRows++; }
      else if (g.s === "declined") declined++;
      else if (g.s === "pending") pending++;
      else if (g.s === "maybe") maybe++;
      else if (g.s === "unsent") unsent++;
    }
    const sent = guests.filter((g) => g.s !== "unsent").length;
    const tot = comingRows + maybe + declined || 1;
    return { coming, declined, pending, unsent, maybe, sent, comingRows, tot };
  }, [guests]);

  const shown = guests.filter((g) => filter === "all" || g.s === filter);

  const addGuest = () => {
    if (!name.trim() || !phone.trim()) return;
    setGuests([{ n: name.trim(), p: phone.trim(), party: parseInt(party, 10) || 1, s: "unsent" }, ...guests]);
    setName(""); setPhone(""); setParty("1"); setFilter("unsent");
  };

  const importFile = (file: File) => {
    const lower = file.name.toLowerCase();
    if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) {
      showToast("קובצי אקסל יעובדו במערכת המלאה — כרגע השתמשו ב-CSV");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const lines = String(ev.target?.result ?? "").split(/\r?\n/).filter((l) => l.trim());
      const added: Guest[] = [];
      lines.forEach((line, i) => {
        const cols = line.split(/[,\t;]/).map((c) => c.trim());
        if (i === 0 && /שם|name|טלפון|phone/i.test(line) && !/\d{3}/.test(cols[1] || "")) return;
        if (cols[0] && cols[1]) added.push({ n: cols[0], p: cols[1], party: parseInt(cols[2], 10) || 1, s: "unsent" });
      });
      setGuests((g) => [...added, ...g]);
      setFilter("unsent");
      showToast(`✓ יובאו ${added.length} מוזמנים`);
    };
    reader.readAsText(file);
  };

  const sendAll = () => {
    if (!stats.unsent) return;
    setGuests(guests.map((g) => (g.s === "unsent" ? { ...g, s: "pending" as GuestStatus } : g)));
    showToast(`✓ ${stats.unsent} הזמנות נשלחו בוואטסאפ · חויב ₪${(stats.unsent * PRICE).toFixed(2)}`);
  };

  return (
    <div className="wrap">
      <header className="top">
        <div>
          <div className="ev">החתונה של דנה ויוסי</div>
          <div className="dt">יום שני · 24 באוגוסט 2026 · אולם &quot;הגן הסודי&quot;</div>
        </div>
        <div className="badge">💌</div>
      </header>

      <div className="icard" style={{ padding: 16 }}>
        <div className="stats">
          <div className="stat good"><span className="num tnum">{stats.coming}</span><span className="cap">מגיעים (אורחים)</span></div>
          <div className="stat red"><span className="num tnum">{stats.declined}</span><span className="cap">לא מגיעים</span></div>
          <div className="stat amber"><span className="num tnum">{stats.pending}</span><span className="cap">ממתינים לתשובה</span></div>
          <div className="stat"><span className="num tnum">{stats.sent}</span><span className="cap">הזמנות שנשלחו</span></div>
        </div>
        <div className="bar">
          <i className="g" style={{ width: `${(stats.comingRows / stats.tot) * 100}%` }} />
          <i className="a" style={{ width: `${(stats.maybe / stats.tot) * 100}%` }} />
          <i className="r" style={{ width: `${(stats.declined / stats.tot) * 100}%` }} />
        </div>
        <div className="legend">
          <span><span className="dot" style={{ background: "var(--i-good)" }} />מגיעים</span>
          <span><span className="dot" style={{ background: "var(--i-red)" }} />לא מגיעים</span>
          <span><span className="dot" style={{ background: "var(--i-amber)" }} />ממתינים</span>
          <span className="ifaint">{[stats.maybe ? `אולי: ${stats.maybe}` : "", stats.unsent ? `טרם נשלחו: ${stats.unsent}` : ""].filter(Boolean).join(" · ")}</span>
        </div>
      </div>

      <div className="sec-h"><h2>הוספת מוזמנים</h2></div>
      <div className="icard addbox">
        <div className="irow">
          <input className="iinput" placeholder="שם המוזמן / משפחה" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="iinput" placeholder="מספר טלפון" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="irow" style={{ alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="ifaint" style={{ fontSize: 13 }}>מס&apos; אורחים</span>
            <input className="iinput" inputMode="numeric" style={{ width: 70, textAlign: "center" }} value={party} onChange={(e) => setParty(e.target.value)} />
          </div>
          <button className="ibtn" style={{ marginInlineStart: "auto" }} onClick={addGuest}>הוספה לרשימה</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 4, borderTop: "1px solid var(--i-line)", marginTop: 2 }}>
          <button className="ibtn ghost sm" onClick={() => fileRef.current?.click()}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: -2 }}><path d="M12 15V4m0 0-4 4m4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 15v4h16v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            {" "}ייבוא מאקסל / CSV
          </button>
          <span className="ifaint" style={{ fontSize: 12 }}>עמודות: שם, טלפון, מס&apos; אורחים</span>
          <input type="file" ref={fileRef} accept=".csv,.xlsx,.xls,text/csv" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) importFile(f); e.target.value = ""; }} />
        </div>
        <div className="ifaint" style={{ fontSize: 12 }}>הזמנות חדשות מסומנות &quot;טרם נשלח&quot;. &quot;שליחה&quot; שולח אותן ב<b>וואטסאפ</b> (ומחייב).</div>
      </div>

      <div className="sec-h"><h2>רשימת המוזמנים</h2><span className="ifaint tnum">{guests.length} רשומות</span></div>
      <div className="chips">
        {FILTERS.map((f) => (
          <button key={f.key} className={`chip${filter === f.key ? " on" : ""}`} onClick={() => setFilter(f.key)}>{f.label}</button>
        ))}
      </div>
      <div className="icard">
        {shown.length === 0 ? (
          <div style={{ padding: 24, textAlign: "center", color: "var(--i-faint)" }}>אין מוזמנים בקטגוריה זו</div>
        ) : shown.map((g, i) => (
          <div className="g-row" key={`${g.p}-${i}`}>
            <div className="g-av">{initials(g.n)}</div>
            <div className="g-info"><div className="n">{g.n}</div><div className="p">{g.p}</div></div>
            {g.s === "coming" && <span className="party">×{g.party}</span>}
            <span className={`ipill ${META[g.s].c}`}>{META[g.s].t}</span>
          </div>
        ))}
      </div>

      <div className={`paybar${stats.unsent > 0 ? " show" : ""}`}>
        <div className="wrap-in">
          <div>
            <div className="lbl">{stats.unsent} הזמנות מוכנות לשליחה · ₪1.20 להזמנה</div>
            <div className="amt tnum">₪{(stats.unsent * PRICE).toFixed(2)}</div>
          </div>
          <button className="ibtn" onClick={sendAll}>שליחה ותשלום</button>
        </div>
      </div>

      <div className={`toast${toast ? " show" : ""}`}>{toast}</div>
    </div>
  );
}
