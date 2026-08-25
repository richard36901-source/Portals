"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

function applyTheme(mode: Mode) {
  document.documentElement.setAttribute("data-theme", mode);
  try {
    localStorage.setItem("portal-theme", mode);
  } catch {}
  window.dispatchEvent(new CustomEvent<Mode>("portal-theme", { detail: mode }));
}

function useThemeMode(): [Mode, (m: Mode) => void] {
  const [mode, setMode] = useState<Mode>("light");
  useEffect(() => {
    // ללא בחירה שמורה — נגזר פעם אחת מהמכשיר, ומכאן ואילך הבחירה מפורשת
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("portal-theme");
    } catch {}
    if (saved === "light" || saved === "dark") setMode(saved);
    else setMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const onChange = (e: Event) => setMode((e as CustomEvent<Mode>).detail);
    window.addEventListener("portal-theme", onChange);
    return () => window.removeEventListener("portal-theme", onChange);
  }, []);
  return [mode, applyTheme];
}

const sunIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
);
const moonIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
);
const modes: { mode: Mode; label: string; icon: React.ReactNode; title: string }[] = [
  { mode: "light", label: "בהיר", icon: sunIcon, title: "בהיר" },
  { mode: "dark", label: "כהה", icon: moonIcon, title: "כהה" },
];

export default function ThemeSeg({ icons = false, plain = false }: { icons?: boolean; plain?: boolean }) {
  const [mode, setTheme] = useThemeMode();
  return (
    <div className="seg" data-themeseg="">
      {modes.map((m) => (
        <button key={m.mode} className={mode === m.mode ? "on" : undefined} title={icons ? m.title : undefined} onClick={() => setTheme(m.mode)}>
          {icons && m.icon}
          {plain ? m.label : <span className="lbl">{m.label}</span>}
        </button>
      ))}
    </div>
  );
}
