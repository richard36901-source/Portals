import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "פורטל לקוחות · AutoScale",
  description: "AutoScale — פורטל לקוחות",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const themeInit = `try{var t=localStorage.getItem('portal-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
