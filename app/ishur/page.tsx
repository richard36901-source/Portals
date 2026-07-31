"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ishur: כניסה בטלפון + קוד חד-פעמי בוואטסאפ.
// שליחת הקוד בפועל תחובר ל-WhatsApp API (Supabase phone OTP) בשלב האינטגרציה.
export default function IshurLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="login-inner">
      <div className="login-card">
        <div className="badge2">💌</div>
        <div>
          <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-.02em" }}>כניסה לפורטל</div>
          <div className="ifaint" style={{ fontSize: 13 }}>אישורי הגעה · ishur</div>
        </div>
        <div className="icard" style={{ padding: 18 }}>
          {step === "phone" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ textAlign: "right" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--i-muted)", display: "block", marginBottom: 6 }}>מספר טלפון</label>
                <input className="iinput" placeholder="050-0000000" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <button className="ibtn" onClick={() => phone.trim() && setStep("otp")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: -3 }}><path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v8A1.5 1.5 0 0 1 18.5 16H10l-4 3.5V16H5.5A1.5 1.5 0 0 1 4 14.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                {" "}שליחת קוד בוואטסאפ
              </button>
              <div className="ifaint" style={{ fontSize: 12 }}>נשלח אליך קוד חד-פעמי בהודעת וואטסאפ.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="ifaint" style={{ fontSize: 13 }}>הזן את הקוד שנשלח בוואטסאפ אל <b>{phone}</b></div>
              <input className="iinput" placeholder="——" inputMode="numeric" maxLength={6} style={{ textAlign: "center", fontSize: 24, letterSpacing: ".5em" }} value={otp} onChange={(e) => setOtp(e.target.value)} autoFocus />
              <button className="ibtn" onClick={() => router.push("/ishur/dashboard")}>אימות וכניסה</button>
              <button className="ibtn ghost sm" onClick={() => setStep("phone")}>החלפת מספר</button>
            </div>
          )}
        </div>
        <div className="ifaint" style={{ fontSize: 11 }}>חיבור ה-WhatsApp יופעל עם הטוקן הרשמי</div>
      </div>
    </div>
  );
}
