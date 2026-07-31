import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ייצוא סטטי — Cloudflare Pages מגיש את out/ ישירות.
  // צד-שרת עתידי (Monday proxy, webhooks) ייכנס כ-Cloudflare Pages Functions בתיקיית functions/.
  output: "export",
};

export default nextConfig;
