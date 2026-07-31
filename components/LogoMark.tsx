/* eslint-disable @next/next/no-img-element */

// סמל הלוגו לשימוש בתוך ריבועי סטטוס ואייקונים קטנים.
export default function LogoMark({ size = 20 }: { size?: number }) {
  return <img src="/logo.png" alt="" style={{ width: size, height: size }} />;
}
