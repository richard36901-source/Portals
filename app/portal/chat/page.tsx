import { IconInfo } from "@/components/icons";

export default function ChatPage() {
  return (
    <section className="panel active" data-name="chat">
      <div className="card" style={{ display: "flex", flexDirection: "column", height: 480 }}>
        <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ alignSelf: "center", fontSize: 12, color: "var(--muted)", background: "var(--surface-2)", padding: "6px 12px", borderRadius: 999 }}>📌 עדכון · אבן דרך &quot;קונספט עיצובי&quot; הושלמה — היום 09:10</div>
          <div style={{ alignSelf: "flex-start", maxWidth: "78%", background: "var(--surface-2)", padding: "11px 14px", borderRadius: "16px 16px 16px 4px", fontSize: 14 }}>היי מאיה, העלינו את סבב תיקונים #2 לבדיקתך 🙂</div>
          <div style={{ alignSelf: "flex-start", fontSize: 11, color: "var(--faint)" }}>AutoScale · 10:24</div>
          <div style={{ alignSelf: "flex-end", maxWidth: "78%", background: "var(--accent)", color: "var(--accent-ink)", padding: "11px 14px", borderRadius: "16px 16px 4px 16px", fontSize: 14 }}>מעולה! אבדוק היום. אפשר להגדיל את הלוגו בעמוד הבית?</div>
          <div style={{ alignSelf: "flex-end", fontSize: 11, color: "var(--faint)" }}>מאיה · 10:31</div>
          <div style={{ alignSelf: "flex-end", maxWidth: "78%", background: "var(--surface-2)", border: "1px solid var(--line)", padding: "11px 14px", borderRadius: "16px 16px 4px 16px", fontSize: 14 }}>אני מוסיף — נצטרך גם עמוד מחירון בבקשה 🙏</div>
          <div style={{ alignSelf: "flex-end", fontSize: 11, color: "var(--faint)" }}>יוסי (שותף) · 10:40</div>
          <div style={{ alignSelf: "center", fontSize: 12, color: "var(--muted)", background: "var(--surface-2)", padding: "6px 12px", borderRadius: 999 }}>💬 תגובה על המשימה &quot;אינטגרציה לדיוור&quot; נוספה לשיחה</div>
          <div style={{ alignSelf: "flex-end", maxWidth: "78%", background: "var(--accent-soft)", color: "var(--ink)", padding: "11px 14px", borderRadius: "16px 16px 4px 16px", fontSize: 14 }}>🤖 שאל AI · מה הדדליין המעודכן וכמה נשאר לשלם?</div>
          <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: "var(--surface-2)", border: "1px dashed var(--line)", padding: "11px 14px", borderRadius: "16px 16px 16px 4px", fontSize: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", marginBottom: 4 }}>🤖 עוזר AI</div>
            הדדליין המעודכן הוא <b>18 באוגוסט</b> (נדחה בשל גישת שרת שטרם התקבלה). נותר לתשלום <b>₪7,400</b> מתוך תקציב ₪26,000. רוצים שאפתח משימה לגישת השרת?
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--line)", padding: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn ghost sm" style={{ whiteSpace: "nowrap" }}>🤖 שאל AI</button>
          <input className="input" placeholder="כתבו הודעה לצוות AutoScale..." />
          <button className="btn sm">שליחה</button>
        </div>
      </div>
      <div className="note"><IconInfo /><div>הצ&apos;אט הוא הדרך הראשית לדבר איתנו. <b>שאל AI</b> הוא עוזר משני — עונה על שאלות על הפרויקט, פותח משימות או שולח הפניה, ומעביר אלינו כשצריך. שני חברי צוות (מאיה ויוסי) על אותו פרויקט ורואים את אותה שיחה.</div></div>
    </section>
  );
}
