"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// מסך מעבר אחרי התחברות: הלוגו גדל, זוהר בצבעי המותג, ונעלם אל תוך הפורטל.
export default function WelcomeSplash() {
  const router = useRouter();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => router.replace("/projects"), reduced ? 400 : 2300);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div id="splash">
      <div className="halo h1" />
      <div className="halo h2" />
      <div className="slogo"><img src="/logo.png" alt="AutoScale" /></div>
      <div className="sname">AutoScale · פורטל לקוחות</div>
    </div>
  );
}
