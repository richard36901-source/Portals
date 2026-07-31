import { IconBell, IconChat, IconDoc, IconGrid, IconHome, IconLock } from "@/components/icons";

// panel = prototype data-panel value (CSS media queries key off it); slug = route segment.
export type NavItem = {
  panel: string;
  slug: string;
  title: string;
  icon: React.ReactNode;
  badge?: number;
};

export const NAV_ITEMS: NavItem[] = [
  { panel: "dash", slug: "dashboard", title: "שלום מאיה 👋", icon: <IconHome /> },
  { panel: "projects", slug: "project", title: "הפרויקט", icon: <IconGrid /> },
  {
    panel: "tasks", slug: "tasks", title: "משימות", badge: 2,
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M8 6h11M8 12h11M8 18h11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><circle cx="4.6" cy="6" r="1.2" fill="currentColor" /><circle cx="4.6" cy="12" r="1.2" fill="currentColor" /><circle cx="4.6" cy="18" r="1.2" fill="currentColor" /></svg>,
  },
  { panel: "invoices", slug: "invoices", title: "חשבוניות ותשלומים", badge: 1, icon: <IconDoc lines /> },
  {
    panel: "addons", slug: "addons", title: "תוספות ושדרוגים",
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M6 7h12l-1 12H7L6 7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.7" /><path d="M12 11v4M10 13h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  },
  {
    panel: "tutorials", slug: "tutorials", title: "מדריכים",
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.7" /><path d="M10 9.5v5l4-2.5-4-2.5Z" fill="currentColor" /></svg>,
  },
  {
    panel: "referrals", slug: "referrals", title: "הפניות ועמלות",
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" /><path d="M3.5 19c.5-3 2.7-4.7 5.5-4.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M17 8v6M14 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  },
  {
    panel: "files", slug: "files", title: "קבצים ומסמכים",
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>,
  },
  { panel: "access", slug: "access", title: "גישות וסיסמאות", icon: <IconLock size={19} /> },
  { panel: "chat", slug: "chat", title: "צ'אט ועדכונים", icon: <IconChat /> },
  { panel: "notifications", slug: "notifications", title: "התראות והגדרות", icon: <IconBell /> },
  {
    panel: "profile", slug: "profile", title: "פרופיל",
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" /><path d="M5.5 20c.6-3.4 3.2-5.4 6.5-5.4S17.9 16.6 18.5 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  },
];

export const TAB_ITEMS: { panel: string; slug: string; label: string; icon: React.ReactNode }[] = [
  { panel: "dash", slug: "dashboard", label: "בית", icon: <IconHome size={21} /> },
  { panel: "projects", slug: "project", label: "פרויקט", icon: <IconGrid size={21} /> },
  { panel: "invoices", slug: "invoices", label: "תשלומים", icon: <IconDoc size={21} /> },
  { panel: "chat", slug: "chat", label: "צ'אט", icon: <IconChat size={21} /> },
  { panel: "notifications", slug: "notifications", label: "עוד", icon: <IconBell size={21} /> },
];
