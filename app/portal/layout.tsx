"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ThemeSeg from "@/components/ThemeSeg";
import Logo from "@/components/Logo";
import ChatRail from "@/components/portal/ChatRail";
import { NAV_ITEMS, TAB_ITEMS } from "@/components/portal/nav";
import { IconBell } from "@/components/icons";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const activeSlug = pathname.split("/")[2] ?? "dashboard";
  const active = NAV_ITEMS.find((n) => n.slug === activeSlug) ?? NAV_ITEMS[0];

  useEffect(() => {
    document.body.classList.remove("menu-open");
    window.scrollTo(0, 0);
  }, [pathname]);

  // שמירת גישה: ללא סשן → /login. גם מטפל בחזרת OAuth (detectSessionInUrl).
  // ללא env (דמו) — לא מפנים, כדי לשמור על תצוגת הדמו.
  useEffect(() => {
    const sb = supabase();
    if (!sb) return;
    let active = true;
    sb.auth.getSession().then(({ data }) => {
      if (active && !data.session) router.replace("/login");
    });
    // מפנים רק ביציאה מפורשת — לא על אירועי אתחול חולפים שבהם עוד אין סשן
    const { data: sub } = sb.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") router.replace("/login");
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="view active" id="appview">
      <div className="scrim" onClick={() => document.body.classList.remove("menu-open")} />
      <div className="app">
        <aside className="sidebar">
          <div className="brand">
            <Logo size={38} radius={11} />
            <div>
              <div className="n">AutoScale</div>
              <div className="s">פורטל לקוחות</div>
            </div>
          </div>
          <button className="switcher" onClick={() => router.push("/projects")}>
            <div>
              <div className="faint" style={{ fontSize: 11 }}>פרויקט נוכחי</div>
              <div className="pn">מיתוג ואתר תדמית</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 9l4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          {NAV_ITEMS.map((item) => (
            <Link key={item.panel} href={`/portal/${item.slug}`} className={`nav${item.slug === activeSlug ? " active" : ""}`} data-panel={item.panel}>
              {item.icon}
              {item.panel === "dash" ? "לוח בקרה" : item.title}
              {item.badge != null && <span className="badge">{item.badge}</span>}
            </Link>
          ))}
          <div className="side-foot"><span className="bd"><img src="/logo.png" alt="" /></span> מופעל על ידי AutoScale</div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="iconbtn menubtn" aria-label="תפריט" onClick={() => document.body.classList.toggle("menu-open")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
              <span className="ttl">{active.title}</span>
            </div>
            <div className="right">
              <ThemeSeg icons />
              <Link href="/portal/notifications" className="iconbtn" aria-label="התראות">
                <IconBell size={20} />
                <span className="dot" />
              </Link>
              <Link href="/portal/profile" className="who">
                <div className="av">מר</div>
                <div>
                  <div className="nm">מאיה רון</div>
                  <div className="rl">Rom Retail בע&quot;מ</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="content">{children}</div>
        </main>

        <ChatRail />
      </div>

      <nav className="tabbar">
        {TAB_ITEMS.map((t) => (
          <Link key={t.panel} href={`/portal/${t.slug}`} className={`tb${t.slug === activeSlug ? " active" : ""}`} data-panel={t.panel} style={{ textDecoration: "none" }}>
            {t.icon}
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
