"use client";

import Link from "next/link";
import ThemeSeg from "@/components/ThemeSeg";
import Logo from "@/components/Logo";

// Onboarding chrome shared by project selection and the new-project wizard.
export default function ObShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="view active" id="onboard">
      <div className="ob-bar">
        <div className="ob-brand">
          <Logo size={32} radius={9} /> פורטל לקוחות
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ThemeSeg />
          <Link href="/login" className="btn ghost sm" style={{ display: "inline-flex", alignItems: "center" }}>יציאה</Link>
        </div>
      </div>
      <div className="ob-body">
        <div className="ob-inner">{children}</div>
      </div>
    </div>
  );
}
