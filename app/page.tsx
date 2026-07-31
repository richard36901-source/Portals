"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { resolveTenant } from "@/lib/tenant";

// ניתוב לפי דומיין: app.* ← הפורטלים שלי · portal.ishur.io ← RSVP · אחרת ← פורטל AutoScale.
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const t = resolveTenant(location.hostname);
    if (t.mode === "hub") router.replace("/portals");
    else if (t.slug === "ishur") router.replace("/ishur");
    else router.replace("/login");
  }, [router]);
  return null;
}
