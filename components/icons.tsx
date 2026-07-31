// Exact SVG marks from the approved prototype — do not restyle.

export const IconCheck = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const IconClock = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" /></svg>
);

export const IconGrid = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.7" /><rect x="13" y="4" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.7" /><rect x="4" y="13" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.7" /><rect x="13" y="13" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.7" /></svg>
);

export const IconHome = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z" fill="currentColor" /></svg>
);

export const IconDoc = ({ size = 19, lines = false, strokeWidth = 1.7 }: { size?: number; lines?: boolean; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M6 3h9l3 3v15H6V3Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />{lines && <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />}</svg>
);

export const IconChat = ({ size = 19, strokeWidth = 1.7 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v8A1.5 1.5 0 0 1 18.5 16H10l-4 3.5V16H5.5A1.5 1.5 0 0 1 4 14.5Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" /></svg>
);

export const IconBell = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6Z" stroke="currentColor" strokeWidth="1.7" /><path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" /></svg>
);

export const IconLock = ({ size = 18, withShackle = true }: { size?: number; withShackle?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height={withShackle ? 10 : 9} rx="2" stroke="currentColor" strokeWidth="1.7" />{withShackle && <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" strokeWidth="1.7" />}</svg>
);

export const IconPlay = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" /></svg>
);

export const IconPlayCircle = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" /><path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" /></svg>
);

export const IconInfo = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto", marginTop: 1 }}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);

export const IconWarnTriangle = ({ size = 18, strokeWidth = 1.7 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 3 2 20h20L12 3Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" /><path d="M12 9v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="16.5" r="1" fill="currentColor" /></svg>
);

export const IconRefresh = ({ size = 22, strokeWidth = 1.8 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 1 1 2.3 5.6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" /><path d="M4 20v-4h4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const IconUpload = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ verticalAlign: -2 }}><path d="M12 16V4m0 0-4 4m4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 16v3h16v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);

export const IconBuild = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 20V8l8-4 8 4v12" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.7" /></svg>
);

export const IconClockLg = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" /><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
