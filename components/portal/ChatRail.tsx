export default function ChatRail() {
  return (
    <aside className="chatrail">
      <div className="cr-h">
        <span className="t">צ'אט ועדכונים</span>
        <span className="pill ink" style={{ fontSize: 11 }}>חי</span>
      </div>
      <div className="cr-body">
        <div className="bub sys">📌 אבן דרך &quot;קונספט עיצובי&quot; הושלמה · 09:10</div>
        <div className="bub them">היי מאיה, העלינו את סבב תיקונים #2 לבדיקתך 🙂</div>
        <div className="bub-t them">AutoScale · 10:24</div>
        <div className="bub me">מעולה! אבדוק היום. אפשר להגדיל את הלוגו?</div>
        <div className="bub-t me">את · 10:31</div>
        <div className="bub sys">💬 תגובה על &quot;אינטגרציה לדיוור&quot; נוספה</div>
        <div className="bub sys warn">⏱ הדדליין עודכן ל-18 באוג׳ · ממתינים לגישת שרת</div>
        <div className="bub them">שיתפנו לך גישת CMS בעמוד &quot;גישות&quot; ✔</div>
        <div className="bub-t them">AutoScale · 11:05</div>
      </div>
      <div className="cr-in" style={{ flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <input className="input" placeholder="כתבו הודעה..." />
          <button className="btn sm">שליחה</button>
        </div>
        <button className="btn ghost sm" style={{ width: "100%" }}>🤖 שאל AI על הפרויקט</button>
      </div>
    </aside>
  );
}
